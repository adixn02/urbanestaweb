import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import { citiesAPI } from "@/lib/api";

export default async function CityPage({ params }) {
  const { slug } = await params;

  // Fetch city from API
  let city = null;
  try {
    const response = await citiesAPI.getAll();
    const cities = response.data || response || [];
    city = cities.find((c) => c.slug === slug);
  } catch (error) {
    console.error('Error fetching cities:', error);
    city = null;
  }

  if (!city) {
    return <p className="text-center mt-5">City not found</p>;
  }

  return (
    <div>
      <Header />
      
      {/* City Hero Section with Background - 75% Screen Height */}
      <div className="city-hero-section position-relative">
        <div className="city-hero-background">
          <Image 
            src={city.citybackground} 
            alt={`${city.location} background`} 
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        
        {/* City Name Overlay - Bottom Left */}
        <div className="city-name-overlay">
          <h1 className="city-name">{city.name}</h1>
          <p className="city-subtitle">Discover the best properties in {city.name}</p>
        </div>
      </div>
      
      {/* Properties Section */}
      <div className="city-properties-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="section-title text-center mb-5">Properties in {city.name}</h2>
              <p className="properties-description text-center">
                Explore premium residential and commercial properties in {city.name}. 
                Find your dream home or investment opportunity in one of India's most 
                sought-after locations.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
