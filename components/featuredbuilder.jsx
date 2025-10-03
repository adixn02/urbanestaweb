"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
// Fallback logo - used when a builder has no logo imported
import LogoFallback from "../public/img/logo.jpg";
import Link from "next/link";
import { propertiesAPI, buildersAPI } from "@/lib/api";
import PropertyCard from "./PropertyCard";
import FeaturedSkeleton from "./FeaturedSkeleton";

// Fallback data for when API is not available
const getFallbackData = () => ({
    builders: [
        {
            _id: 'fallback-builder-1',
            name: 'DLF Limited',
            logo: '/img/dlf_logo.jpg'
        },
        {
            _id: 'fallback-builder-2',
            name: 'Emaar India', 
            logo: '/img/emarLogo.jpg'
        }
    ],
    properties: [
        {
            _id: 'fallback-prop-1',
            type: 'builder',
            projectName: 'DLF The Aralias',
            builder: { name: 'DLF Limited', logo: '/img/dlf_logo.jpg' },
            city: { name: 'Gurgaon' },
            minPrice: 5000000,
            maxPrice: 15000000,
            displayImage: '/img/dlf_background.jpg',
            propertyAction: 'Sale',
            subcategoryName: 'Apartment',
            possessionDate: '2025'
        },
        {
            _id: 'fallback-prop-2',
            type: 'builder',
            projectName: 'Emaar Palm Heights',
            builder: { name: 'Emaar India', logo: '/img/emarLogo.jpg' },
            city: { name: 'Gurgaon' },
            minPrice: 8000000,
            maxPrice: 20000000,
            displayImage: '/img/emar_background.jpg',
            propertyAction: 'Sale',
            subcategoryName: 'Villa',
            possessionDate: '2026'
        }
    ]
});

export default function FeaturedListings() {
  const [builders, setBuilders] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates after unmount
    
    const fetchData = async () => {
      try {
        if (isMounted) setLoading(true);
        const [buildersResponse, propertiesResponse] = await Promise.all([
          buildersAPI.getAll(),
          propertiesAPI.getAll({ type: 'builder', limit: 20 })
        ]);

        // Only update state if component is still mounted
        if (isMounted) {
          // Handle both old and new response formats
          if (buildersResponse.error || buildersResponse.fallback) {
            console.warn('Builders API unavailable, using fallback data:', buildersResponse.error);
            const fallbackData = getFallbackData();
            setBuilders(fallbackData.builders);
          } else {
            setBuilders(buildersResponse.data || buildersResponse || []);
          }

          if (propertiesResponse.error || propertiesResponse.fallback) {
            console.warn('Properties API unavailable, using fallback data:', propertiesResponse.error);
            const fallbackData = getFallbackData();
            setProjects(fallbackData.properties);
          } else {
            setProjects(propertiesResponse.data || propertiesResponse || []);
          }
        }
      } catch (error) {
        console.error('Error fetching data for featured listings:', error);
        // Fallback to sample data if API fails
        if (isMounted) {
          const fallbackData = getFallbackData();
          setBuilders(fallbackData.builders);
          setProjects(fallbackData.properties);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    fetchData();
    
    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []);

  // Normalizer to avoid mismatches like extra spaces or different casing
  const normalize = (s) => (s || "").toString().trim().toLowerCase();

  // Group projects by normalized builder name for fast lookup
  const projectsByBuilder = new Map();
  for (const p of projects) {
    // Handle both object and string builder references
    const builderName = typeof p.builder === 'object' ? p.builder?.name : p.builder;
    const key = normalize(builderName || "");
    if (!projectsByBuilder.has(key)) projectsByBuilder.set(key, []);
    projectsByBuilder.get(key).push(p);
  }

  // Map of known builders by normalized name
  const knownBuilders = new Map();
  for (const b of builders) {
    knownBuilders.set(normalize(b.name), b);
  }

  // Decide which builder rows to render.
  // Option A (shows only builders that have projects):
  // const keys = Array.from(new Set([...projectsByBuilder.keys()]));
  // Option B (shows all known builders + any new builders found in projects):
  const keys = Array.from(new Set([...projectsByBuilder.keys(), ...knownBuilders.keys()]));

  // Build an array of builder objects to display (use the known data when available,
  // otherwise create a dynamic builder entry using the project's builder name)
  const mergedBuilders = keys.map((key, idx) => {
    const known = knownBuilders.get(key);
    if (known) return known;

    // If not a known builder, create a lightweight object using the case-sensitive
    // builder name from the first project for nicer display
    const projectsForKey = projectsByBuilder.get(key) || [];
    const firstProject = projectsForKey[0];
    const displayName = firstProject ? 
      (typeof firstProject.builder === 'object' ? firstProject.builder?.name : firstProject.builder) : 
      key;
    return {
      id: `dyn-${idx}-${key}`,
      name: displayName,
      logo: null,
      background: null,
    };
  });

  // Helper to get an image source string (handles imported modules or plain strings)
  const getImgSrc = (img) => {
    if (!img) return LogoFallback.src || "/logo.jpg"; // fallback path if using public/
    if (typeof img === "string") return img;
    // If img is an imported module (Next.js Image import), try to read .src
    if (img && img.src) return img.src;
    return LogoFallback.src || "/logo.jpg";
  };

  return (
    <section className="p-4 py-md-5 bg-light rounded-5 my-5">
      <div className="container px-3 px-md-0">
        <div className="text-center mb-4 mb-md-5">
          <h2 className="display-6 display-md-5 fw-bold text-dark mb-3">FEATURED LISTINGS IN GURGAON</h2>
          <div className="d-flex flex-wrap justify-content-center gap-2 gap-md-3 mb-4">
            <span className="badge bg-primary">Featured</span>
            <span className="badge bg-secondary">Premium</span>
            <span className="badge bg-success">Luxury</span>
          </div>
        </div>

        {/* For each builder render one horizontal row of cards */}
        {loading ? (
          // Skeleton loading
          <FeaturedSkeleton />
        ) : mergedBuilders.length > 0 ? (
          mergedBuilders.map((builder) => {
          const key = normalize(builder.name);
          const builderProjects = projectsByBuilder.get(key) || [];

          return (
            <div key={builder._id || builder.id || builder.name} className="mb-5">
              {/* Builder header */}
              <div className="d-flex align-items-center mb-3">
                {builder.logo && (
                  <Image
                    src={getImgSrc(builder.logo)}
                    alt={builder.name}
                    width={60}
                    height={60}
                    style={{ objectFit: "cover", borderRadius: 8 }}
                    className="me-3"
                    loading="lazy"
                    quality={85}
                  />
                )}

                <h4 className="mb-0">{builder.name}</h4>

                <div className="ms-auto">
                  <button className="btn btn-sm btn-outline-primary">View All</button>
                </div>
              </div>

              {/* Horizontal scroll list of project cards for this builder */}
              {builderProjects.length > 0 ? (
                <div
                  className="d-flex"
                  style={{
                    gap: 16,
                    overflowX: "auto",
                    paddingBottom: 8,
                    WebkitOverflowScrolling: "touch",
                  }}
                >
                  {builderProjects.map((listing) => (
                    <div key={listing._id || listing.id} className="flex-shrink-0" style={{ width: 320 }}>
                      <PropertyCard property={listing} showBuilder={false} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted small">No listings for this builder yet.</p>
              )}
            </div>
          );
        })
        ) : (
          // Empty state
          <div className="text-center py-5">
            <p className="text-muted">No featured listings available at the moment.</p>
          </div>
        )}

        {/* Optional full listings button */}
        <div className="text-center mt-4 mt-md-5">
          <Link href="/property" className="btn btn-primary">View All</Link>
        </div>
      </div>
    </section>
  );
}
