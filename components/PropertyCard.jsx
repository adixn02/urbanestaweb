import React from "react";
import Image from "next/image";
import Link from "next/link";

const PropertyCard = ({ property, className = "", showBuilder = true }) => {
  if (!property) return null;

  // Determine display values based on property type
  const displayPrice = property.type === 'builder' 
    ? `₹${property.minPrice?.toLocaleString()} - ₹${property.maxPrice?.toLocaleString()}`
    : `₹${property.price?.toLocaleString()}`;

  const displayImage = property.type === 'builder' 
    ? property.wallpaperImage || property.displayImage || property.projectImages?.[0]
    : property.displayImage || property.projectImages?.[0];

  const displayTitle = property.type === 'builder' 
    ? property.projectName || property.title
    : property.title;

  const displayLocation = property.city?.name || property.location || property.locality;

  return (
    <Link href={`/properties/${property._id}`} className={`text-decoration-none ${className}`}>
      <div className="card property-card shadow-sm border-0 rounded-3 h-100 hover-effect">
        <div className="position-relative">
          {displayImage && (
            <Image 
              src={displayImage} 
              className="card-img-top rounded-top-3 property-image" 
              alt={displayTitle}
              width={400}
              height={200}
              style={{ objectFit: 'cover', width: '100%', height: '200px' }}
            />
          )}
          
          {/* Builder Logo for builder properties */}
          {property.type === 'builder' && property.builder?.logo && showBuilder && (
            <div className="position-absolute top-0 start-0 m-3">
              <Image 
                src={property.builder.logo} 
                alt="Builder Logo" 
                className="rounded-circle"
                width={50}
                height={50}
                style={{ objectFit: "cover", border: "2px solid white" }}
              />
            </div>
          )}
          
          {/* Property Action Badge */}
          <div className="position-absolute top-0 end-0 m-3">
            <span className={`badge ${property.propertyAction === 'Sale' ? 'bg-success' : 'bg-primary'} rounded-pill`}>
              {property.propertyAction}
            </span>
          </div>
        </div>
        
        <div className="card-body">
          <h6 className="card-title fw-bold text-dark mb-2">{displayTitle}</h6>
          
          <div className="mb-2">
            <small className="text-muted">
              <i className="bi bi-geo-alt-fill me-1"></i>
              {displayLocation}
            </small>
          </div>

          {property.type === 'builder' && property.possessionDate && (
            <div className="mb-2">
              <small className="text-muted">
                <i className="bi bi-calendar-check me-1"></i>
                Possession: {property.possessionDate}
              </small>
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center mt-3">
            <h6 className="text-primary fw-bold mb-0">{displayPrice}</h6>
            <small className="text-muted">{property.subcategoryName}</small>
          </div>

          {property.type === 'builder' && showBuilder && (
            <div className="mt-2">
              <small className="text-success fw-semibold">
                <i className="bi bi-building me-1"></i>
                {property.builder?.name || 'Builder Project'}
              </small>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
