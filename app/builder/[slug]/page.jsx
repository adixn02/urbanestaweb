// app/builder/[slug]/page.jsx
import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { buildersAPI, propertiesAPI } from "@/lib/api";
import PropertyCard from "@/components/PropertyCard";

export default async function Builder({params}) {
    const {slug} = await params;

  // Fetch builder from API
  let builder = null;
  let properties = [];
  
  try {
    const response = await buildersAPI.getBySlug(slug);
    builder = response.data || response;
    
    // If builder found, fetch their properties
    if (builder && builder._id) {
      const propertiesResponse = await propertiesAPI.getAll({ type: 'builder' });
      const allBuilderProperties = propertiesResponse.data || propertiesResponse || [];
      
      // Filter properties to only include those that belong to this specific builder
      properties = allBuilderProperties.filter(property => {
        // Check if builder field exists and matches
        if (property.builder && typeof property.builder === 'object') {
          return property.builder._id === builder._id;
        } else if (property.builder && typeof property.builder === 'string') {
          return property.builder === builder._id;
        }
        return false;
      });
    }
  } catch (error) {
    console.error('Error fetching builder:', error);
    builder = null;
    properties = [];
  }

  if(!builder){
    return <p className="text-center mt-5">Builder not found</p>
  }

    return (
        <div>
            <Header/>
            
            {/* Hero Section with Background - 75% Screen Height */}
            <div className="builder-hero-section position-relative">
                <div className="builder-hero-background">
                    {builder.backgroundImage && (
                        <Image 
                            src={builder.backgroundImage} 
                            alt={`${builder.name} background`} 
                            fill
                            style={{ objectFit: "cover" }}
                            priority
                        />
                    )}
                </div>
                
                {/* Builder Info Card - Blur Card with Transparent Background */}
                <div className="builder-info-overlay">
                    <div className="builder-info-card">
                                    {/* Builder Name and Logo Row */}
                                    <div className="builder-header d-flex align-items-center justify-content-between">
                                        <h1 className="builder-name mb-0">{builder.name}</h1>
                                        <div className="builder-logo">
                                            {builder.logo && (
                                                <Image 
                                                    src={builder.logo} 
                                                    alt={`${builder.name} logo`}
                                                    width={80}
                                                    height={80}
                                                    style={{ objectFit: "contain", borderRadius: "5px" }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* Dynamic Info Row */}
                                    <div className="builder-details">
                                        <div className="row g-3">
                                            <div className="col-md-4">
                                                <div className="detail-item">
                                                    <span className="detail-value">📍 {builder.headquarters || 'India'}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="detail-item">
                                                    <span className="detail-value">🏡 Established {builder.establishedYear || 'N/A'}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                               {builder.website && (
                                                    <Link 
                                                        href={builder.website} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="detail-link"
                                                    >
                                                       🌎 Visit Website
                                                    </Link>
                                               )}
                                            </div>
                                        </div>
                                    </div>
                    </div>
                </div>
            </div>
            
            {/* Properties Section */}
            <div className="builder-properties-section py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="section-title text-center mb-5">Properties by {builder.name}</h2>
                            <p className="properties-description text-center mb-5">
                                {builder.description || `Discover premium properties and developments by ${builder.name}, 
                                one of India's leading real estate developers. Explore luxury homes, 
                                commercial spaces, and innovative projects that redefine modern living.`}
                            </p>
                        </div>
                    </div>
                    
                    {/* Properties Grid */}
                    <div className="row">
                        {properties.length > 0 ? (
                            properties.map((property) => (
                                <div key={property._id} className="col-lg-4 col-md-6 mb-4">
                                    <PropertyCard property={property} />
                                </div>
                            ))
                        ) : (
                            <div className="col-12">
                                <div className="text-center py-5">
                                    <div className="mb-4">
                                        <i className="bi bi-house-door" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
                                    </div>
                                    <h4 className="text-muted">No Properties Available</h4>
                                    <p className="text-muted">
                                        {builder.name} currently has no properties listed. 
                                        Please check back later for new developments.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            <Footer/>
        </div>
    )
}