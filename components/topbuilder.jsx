"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { buildersAPI } from "@/lib/api";
import BuilderSkeleton from "./BuilderSkeleton";

export default function Topbuilder() {
    const [builders, setBuilders] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        let isMounted = true; // Flag to prevent state updates after unmount
        
        const fetchBuilders = async () => {
            try {
                if (isMounted) setLoading(true);
                const response = await buildersAPI.getAll();
                
                // Only update state if component is still mounted
                if (isMounted) {
                    // Handle both old and new response formats
                    if (response.error) {
                        console.error('Error fetching builders:', response.error);
                        setBuilders([]);
                    } else {
                        setBuilders(response.data || response || []);
                    }
                }
            } catch (error) {
                console.error('Error fetching builders:', error);
                // Fallback to empty array if API fails
                if (isMounted) {
                    setBuilders([]);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };
        
        fetchBuilders();
        
        // Fallback timeout to prevent infinite loading
        const fallbackTimeout = setTimeout(() => {
            if (isMounted) {
                console.warn('Builders API timeout - showing fallback');
                setLoading(false);
                setBuilders([]);
            }
        }, 10000); // 10 second fallback timeout
        
        // Cleanup function
        return () => {
            isMounted = false;
            clearTimeout(fallbackTimeout);
        };
    }, []);
   
   


    return(
        <>
        {/* ================================
             TRUSTED BUILDERS SECTION
             ================================ */}
        <section className="topBuilderSection py-4 py-md-5">
            
            {/* Section Header Content */}
            <div className="container text-center px-3 px-md-0">
                {/* Main Heading */}
                <p className="fs-6 fs-md-5 text-dark mx-auto mb-4 fw-bold" style={{ maxWidth: "720px" }}>
                    Trusted partners in building your dream home across India
                </p>

                {/* Feature Highlights */}
                <div className="d-flex flex-wrap justify-content-center align-items-center gap-3 gap-md-4 text-secondary small">
                    <span className="d-flex align-items-center">
                        <span className="text-success me-1">✓</span> Premium Quality
                    </span>
                    <span className="d-flex align-items-center">
                        <span className="text-success me-1">✓</span> Trusted Partners
                    </span>
                    <span className="d-flex align-items-center">
                        <span className="text-success me-1">✓</span> Pan India Presence
                    </span>
                </div>
            </div>

            {/* Builder Cards with Horizontal Scroll */}
            <div className="container mt-4 mt-md-5 px-0">
                <div className="builderCards d-flex gap-3 gap-md-4 px-3 px-md-0">
                    {loading ? (
                        // Skeleton loading
                        <>
                            <BuilderSkeleton />
                            <BuilderSkeleton />
                            <BuilderSkeleton />
                        </>
                    ) : builders.length > 0 ? (
                        builders.map((builder) => (
                        <Link href={`/builder/${builder.slug}`} key={builder._id || builder.id} className="flex-shrink-0" style={{ width: "500px" }}>
                            <div className="card builder-card h-100 border-0 shadow-sm overflow-hidden">
                                {/* Builder Background Image */}
                                <div className="position-relative" style={{ height: "250px" }}>
                                    {builder.backgroundImage && (
                                        <Image 
                                            src={builder.backgroundImage} 
                                            alt={`${builder.name} background`}
                                            fill
                                            style={{ objectFit: "cover" }}
                                            loading="lazy"
                                            quality={80}
                                            placeholder="blur"
                                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                                        />
                                    )}
                                    
                                    {/* Overlay with Logo and Name */}
                                    <div className="position-absolute bottom-0 start-0 w-100 p-3" 
                                         style={{ 
                                             background: "linear-gradient(transparent, rgba(32, 24, 24, 0.7))",
                                             color: "white"
                                         }}>
                                        <div className="d-flex align-items-center">
                                            {/* Builder Logo */}
                                            <div style={{ 
                                                width: "40px", 
                                                height: "40px", 
                                                backgroundColor: "white", 
                                                borderRadius: "5px", 
                                                marginRight: "10px",
                                                padding: "3px"
                                            }}>
                                                {builder.logo && (
                                                    <Image 
                                                        src={builder.logo} 
                                                        alt={`${builder.name} logo`}
                                                        width={34}
                                                        height={34}
                                                        style={{ objectFit: "contain" }}
                                                        loading="lazy"
                                                        quality={90}
                                                    />
                                                )}
                                            </div>
                                            {/* Builder Name */}
                                            <h6 className="mb-0 fw-bold">{builder.name}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        ))
                    ) : (
                        // Empty state
                        <div className="col-12 text-center py-5">
                            <p className="text-muted">No builders available at the moment.</p>
                        </div>
                    )}
                </div>
            </div>

        </section>
        </>
    )
}