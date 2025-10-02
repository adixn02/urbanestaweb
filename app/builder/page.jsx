// app/builder/page.jsx
import Header from '@/components/header';
import Footer from '@/components/footer';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { buildersAPI } from '@/lib/api';

export default async function BuilderPage() {
  // Fetch builders from API
  let builders = [];
  
  try {
    const response = await buildersAPI.getAll();
    builders = response.data || response || [];
  } catch (error) {
    console.error('Error fetching builders:', error);
    // Fallback to empty array if API fails
    builders = [];
  }

    return (
        <>
           <div>
            <Header/>
              <div className="buildersection mt-5 pt-5 fs-3 fw-bold text-center">

                <div className='container pepsiback p-5 rounded-4 d-flex justify-content-center align-items-center'>
                    <div>
                        Explore Builders – one of the country’s most dynamic communities.
                    </div>
                </div>

{/* builder cards in list style  */}
            <div className="container mt-4 mt-md-5 px-0">
                <div className="d-flex flex-wrap justify-content-center align-items-center gap-3 gap-md-4 px-3 px-md-0">
                    {builders.map((builder) => (
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
                    ))}
                </div>
            </div>





              </div>
            <Footer/>
           </div>
        </>
    );
}