import Header from "@/components/header";
import Footer from "@/components/footer";
import React from "react";
import Link from "next/link";
import { propertiesAPI } from "@/lib/api";

// Fetch property from API
async function getProperty(id) {
  try {
    const response = await propertiesAPI.getById(id);
    return response.data || response;
  } catch (error) {
    console.error('Error fetching property:', error);
    return null;
  }
}

export default async function PropertyDetailPage({ params }) {
  const { slug } = await params;
  const property = await getProperty(slug);

  if (!property) {
    return (
      <>
        <Header />
        <div className="container mt-5 pt-5 text-center">
          <h2>Property Not Found</h2>
          <Link href="/property" className="btn btn-primary mt-3">
            Back to Properties
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const isBuilder = property.type === 'builder';
  const displayPrice = isBuilder 
    ? `₹${property.minPrice?.toLocaleString()} - ₹${property.maxPrice?.toLocaleString()}`
    : `₹${property.price?.toLocaleString()}`;

  return (
    <>
      <Header />
      
      {/* Property Hero Section */}
      <div className="container-fluid px-0">
        <div className="row g-0">
          <div className="col-12">
            <img 
              src={isBuilder ? property.wallpaperImage : property.projectImages?.[0]} 
              className="w-100 property-hero-image"
              style={{ height: '400px', objectFit: 'cover' }}
              alt={isBuilder ? property.projectName : property.title}
            />
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="container mt-4">
        <div className="row">
          {/* Main Content - 70% */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-3">
              <div className="card-body">
                {/* Property Header */}
                <div className="d-flex justify-content-between align-items-start mb-4">
                  <div>
                    <h1 className="h2 fw-bold text-dark mb-2">
                      {isBuilder ? property.projectName : property.title}
                    </h1>
                    <div className="d-flex align-items-center text-muted mb-3">
                      <i className="bi bi-geo-alt-fill me-2"></i>
                      <span>
                        {typeof property.location === 'object' ? property.location?.name : property.location || 
                         typeof property.locality === 'object' ? property.locality?.name : property.locality ||
                         typeof property.city === 'object' ? property.city?.name : property.city || 'Location'}
                      </span>
                    </div>
                  </div>
                  <div className="text-end">
                    <h3 className="text-primary fw-bold">{displayPrice}</h3>
                    <span className={`badge ${property.propertyAction === 'Sale' ? 'bg-success' : 'bg-primary'} rounded-pill`}>
                      {property.propertyAction}
                    </span>
                  </div>
                </div>

                {/* Builder Info */}
                {isBuilder && property.projectLogo && (
                  <div className="d-flex align-items-center mb-4 p-3 bg-light rounded-3">
                    <img 
                      src={property.projectLogo} 
                      alt="Builder Logo" 
                      className="rounded-circle me-3"
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                    <div>
                      <h6 className="fw-bold mb-1">Builder Project</h6>
                      <p className="text-muted mb-0">
                        {typeof property.builder === 'object' ? property.builder?.name : property.builder}
                      </p>
                    </div>
                  </div>
                )}

                {/* Image Gallery */}
                <div className="mb-4">
                  <h4 className="fw-bold mb-3">Gallery</h4>
                  <div className="row g-2">
                    {(property.projectImages || []).slice(0, 4).map((image, index) => (
                      <div key={index} className="col-6 col-md-3">
                        <img 
                          src={image} 
                          alt={`Gallery ${index + 1}`}
                          className="img-fluid rounded-2"
                          style={{ height: '120px', width: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Property Description */}
                <div className="mb-4">
                  <h4 className="fw-bold mb-3">Description</h4>
                  <p className="text-muted">{property.description || property.about || 'No description available.'}</p>
                </div>

                {/* Builder Specific Details */}
                {isBuilder && (
                  <>
                    {/* Highlights */}
                    {property.highlights && property.highlights.length > 0 && (
                      <div className="mb-4">
                        <h4 className="fw-bold mb-3">Highlights</h4>
                        <div className="row">
                          {property.highlights.map((highlight, index) => (
                            <div key={index} className="col-md-6 mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              {highlight}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Possession Date */}
                    {property.possessionDate && (
                      <div className="mb-4">
                        <h4 className="fw-bold mb-3">Possession Date</h4>
                        <p className="text-muted">{property.possessionDate}</p>
                      </div>
                    )}

                    {/* RERA Number */}
                    {property.reraNo && (
                      <div className="mb-4">
                        <h4 className="fw-bold mb-3">RERA Number</h4>
                        <p className="text-muted">{property.reraNo}</p>
                      </div>
                    )}
                  </>
                )}

                {/* Regular Property Details */}
                {!isBuilder && (
                  <div className="mb-4">
                    <h4 className="fw-bold mb-3">Property Details</h4>
                    <div className="row">
                      <div className="col-md-6">
                        <p><strong>Type:</strong> {property.subcategoryName}</p>
                      </div>
                      <div className="col-md-6">
                        <p><strong>Status:</strong> {property.status}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - 30% */}
          <div className="col-lg-4">
            {/* Contact/Enquiry Card */}
            <div className="card border-0 shadow-sm rounded-3 mb-4">
              <div className="card-body">
                <h5 className="fw-bold mb-3">Enquire About This Property</h5>
                <form>
                  <div className="mb-3">
                    <input type="text" className="form-control rounded-2" placeholder="Your Name" />
                  </div>
                  <div className="mb-3">
                    <input type="email" className="form-control rounded-2" placeholder="Your Email" />
                  </div>
                  <div className="mb-3">
                    <input type="tel" className="form-control rounded-2" placeholder="Your Phone" />
                  </div>
                  <div className="mb-3">
                    <textarea className="form-control rounded-2" placeholder="Your Message" rows={3}></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 rounded-2 fw-semibold">
                    Send Enquiry
                  </button>
                </form>
              </div>
            </div>

            {/* Quick Details */}
            <div className="card border-0 shadow-sm rounded-3">
              <div className="card-body">
                <h5 className="fw-bold mb-3">Quick Details</h5>
                <div className="row">
                  <div className="col-6 mb-3">
                    <small className="text-muted d-block">Type</small>
                    <strong>{property.subcategoryName}</strong>
                  </div>
                  <div className="col-6 mb-3">
                    <small className="text-muted d-block">Status</small>
                    <strong className="text-capitalize">{property.status}</strong>
                  </div>
                  {isBuilder && (
                    <>
                      <div className="col-6 mb-3">
                        <small className="text-muted d-block">Unit Type</small>
                        <strong>{property.unitType}</strong>
                      </div>
                      <div className="col-6 mb-3">
                        <small className="text-muted d-block">Area Type</small>
                        <strong>{property.areaType}</strong>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Properties */}
        <div className="row mt-5">
          <div className="col-12">
            <h3 className="fw-bold mb-4">Related Properties</h3>
            <div className="row g-4">
              {/* This would be populated with related properties from your API */}
              <div className="col-md-6 col-lg-4">
                <div className="card border-0 shadow-sm rounded-3 text-center py-4">
                  <div className="card-body">
                    <p className="text-muted">More properties coming soon</p>
                    <Link href="/property" className="btn btn-outline-primary">
                      Browse All Properties
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}