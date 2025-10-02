'use client';

import Header from "@/components/header";
import Footer from "@/components/footer";
import React, { useState, useEffect } from "react";
import { propertiesAPI, buildersAPI, citiesAPI, categoriesAPI } from "@/lib/api";
import PropertyCard from "@/components/PropertyCard";

export default function PropertyPage() {
  // State management
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [builders, setBuilders] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [filters, setFilters] = useState({
    priceRange: { min: '', max: '', unit: 'lakhs' },
    category: '',
    subcategory: '',
    city: '',
    locality: '',
    builder: '',
    propertyType: ''
  });

  // Fetch all data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [propertiesRes, buildersRes, citiesRes, categoriesRes] = await Promise.all([
          propertiesAPI.getAll(),
          buildersAPI.getAll(),
          citiesAPI.getAll(),
          categoriesAPI.getAll()
        ]);

        const propertiesData = propertiesRes.data || propertiesRes || [];
        const buildersData = buildersRes.data || buildersRes || [];
        const citiesData = citiesRes.data || citiesRes || [];
        const categoriesData = categoriesRes.data || categoriesRes || [];

        setProperties(propertiesData);
        setFilteredProperties(propertiesData);
        setBuilders(buildersData);
        setCities(citiesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply filters whenever filter state changes
  useEffect(() => {
    let filtered = [...properties];

    // Price filter
    if (filters.priceRange.min || filters.priceRange.max) {
      const multiplier = filters.priceRange.unit === 'crores' ? 10000000 : 100000;
      const minPrice = filters.priceRange.min ? parseFloat(filters.priceRange.min) * multiplier : 0;
      const maxPrice = filters.priceRange.max ? parseFloat(filters.priceRange.max) * multiplier : Infinity;

      filtered = filtered.filter(property => {
        let propertyPrice = 0;
        
        if (property.type === 'builder') {
          // For builder properties, use minPrice if available, otherwise use maxPrice, otherwise 0
          propertyPrice = property.minPrice || property.maxPrice || 0;
        } else {
          // For regular properties, use the price field
          propertyPrice = property.price || 0;
        }
        
        return propertyPrice >= minPrice && propertyPrice <= maxPrice;
      });
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(property => 
        property.category && 
        (typeof property.category === 'object' ? property.category._id === filters.category : property.category === filters.category)
      );
    }

    // Subcategory filter
    if (filters.subcategory) {
      filtered = filtered.filter(property => {
        // Handle subcategory matching for both ID and name
        return property.subcategory === filters.subcategory || 
               property.subcategoryName === filters.subcategory ||
               (typeof property.subcategory === 'object' && property.subcategory._id === filters.subcategory);
      });
    }

    // City filter
    if (filters.city) {
      filtered = filtered.filter(property => 
        property.city && 
        (typeof property.city === 'object' ? property.city._id === filters.city : property.city === filters.city)
      );
    }

    // Builder filter
    if (filters.builder) {
      filtered = filtered.filter(property => 
        property.builder && 
        (typeof property.builder === 'object' ? property.builder._id === filters.builder : property.builder === filters.builder)
      );
    }

    // Property type filter
    if (filters.propertyType) {
      filtered = filtered.filter(property => property.type === filters.propertyType);
    }

    setFilteredProperties(filtered);
  }, [filters, properties]);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Handle price range change
  const handlePriceRangeChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [type]: value
      }
    }));
  };

  // Get subcategories for selected category
  const getSubcategories = () => {
    if (!filters.category) return [];
    const selectedCategory = categories.find(cat => cat._id === filters.category);
    return selectedCategory?.deepSubcategories || [];
  };

  // Get localities for selected city
  const getLocalities = () => {
    if (!filters.city) return [];
    const selectedCity = cities.find(city => city._id === filters.city);
    return selectedCity?.localities || [];
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      priceRange: { min: '', max: '', unit: 'lakhs' },
      category: '',
      subcategory: '',
      city: '',
      locality: '',
      builder: '',
      propertyType: ''
    });
  };
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <div className="container mt-5 pt-5 pepsiback rounded-4 text-center text-white pb-3">
        <h2 className="display-6 display-md-5 fw-bold mb-3">Discover Property Near You</h2>
        <p>The neighborhoods best suited to your lifestyle, and the agents who know them best.</p>
      </div>

      {/* Main Content */}
      <div className="container mt-4 mt-md-5">
        <div className="row">
          {/* Filter Section - 30% */}
          <div className="col-lg-3 col-md-4 mb-4">
            <div className="card shadow-sm border-0 rounded-3">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="card-title fw-bold mb-0">Filter Properties</h5>
                  <button 
                    type="button" 
                    onClick={clearFilters}
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Clear All
                  </button>
                </div>
                
                {/* Price Range Filter */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Price Range</label>
                  
                  {/* Unit Selection */}
                  <div className="d-flex gap-2 mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="priceUnit"
                        id="lakhs"
                        checked={filters.priceRange.unit === 'lakhs'}
                        onChange={() => handlePriceRangeChange('unit', 'lakhs')}
                      />
                      <label className="form-check-label" htmlFor="lakhs">Lakhs</label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="priceUnit"
                        id="crores"
                        checked={filters.priceRange.unit === 'crores'}
                        onChange={() => handlePriceRangeChange('unit', 'crores')}
                      />
                      <label className="form-check-label" htmlFor="crores">Crores</label>
                    </div>
                  </div>

                  {/* Dual Range Slider Container */}
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge bg-primary">
                        ₹{filters.priceRange.min || 0} {filters.priceRange.unit === 'lakhs' ? 'L' : 'Cr'}
                      </span>
                      <span className="badge bg-success">
                        ₹{filters.priceRange.max || 100} {filters.priceRange.unit === 'lakhs' ? 'L' : 'Cr'}
                      </span>
                    </div>
                    
                    {/* Custom Dual Range Slider */}
                    <div className="dual-range-slider position-relative">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={filters.priceRange.min || 0}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (parseInt(value) <= (parseInt(filters.priceRange.max) || 100)) {
                            handlePriceRangeChange('min', value === '0' ? '' : value);
                          }
                        }}
                        className="range-slider range-slider-min"
                      />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={filters.priceRange.max || 100}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (parseInt(value) >= (parseInt(filters.priceRange.min) || 0)) {
                            handlePriceRangeChange('max', value === '100' ? '' : value);
                          }
                        }}
                        className="range-slider range-slider-max"
                      />
                      <div className="slider-track"></div>
                      <div 
                        className="slider-range"
                        style={{
                          left: `${(filters.priceRange.min || 0)}%`,
                          width: `${(filters.priceRange.max || 100) - (filters.priceRange.min || 0)}%`
                        }}
                      ></div>
                    </div>
                    
                    <div className="d-flex justify-content-between small text-muted mt-1">
                      <span>0</span>
                      <span>25</span>
                      <span>50</span>
                      <span>75</span>
                      <span>100</span>
                    </div>
                  </div>

                  {/* Manual Input Fields */}
                  <div className="row g-2">
                    <div className="col-6">
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        placeholder="Min"
                        min="0"
                        max="100"
                        value={filters.priceRange.min}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (!value || (parseInt(value) <= (parseInt(filters.priceRange.max) || 100))) {
                            handlePriceRangeChange('min', value);
                          }
                        }}
                      />
                    </div>
                    <div className="col-6">
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        placeholder="Max"
                        min="0"
                        max="100"
                        value={filters.priceRange.max}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (!value || (parseInt(value) >= (parseInt(filters.priceRange.min) || 0))) {
                            handlePriceRangeChange('max', value);
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* Price Range Display */}
                  {(filters.priceRange.min || filters.priceRange.max) && (
                    <div className="mt-2 text-center">
                      <small className="text-success fw-medium">
                        Range: ₹{filters.priceRange.min || 0} - ₹{filters.priceRange.max || 100} {filters.priceRange.unit === 'lakhs' ? 'Lakhs' : 'Crores'}
                      </small>
                    </div>
                  )}
                </div>

                <style jsx>{`
                  .dual-range-slider {
                    height: 6px;
                    position: relative;
                    margin: 15px 0;
                  }

                  .range-slider {
                    position: absolute;
                    width: 100%;
                    height: 6px;
                    outline: none;
                    background: transparent;
                    pointer-events: none;
                    -webkit-appearance: none;
                  }

                  .range-slider::-webkit-slider-thumb {
                    height: 18px;
                    width: 18px;
                    border-radius: 50%;
                    background: #007bff;
                    border: 2px solid #fff;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                    cursor: pointer;
                    pointer-events: all;
                    -webkit-appearance: none;
                    position: relative;
                    z-index: 2;
                  }

                  .range-slider::-moz-range-thumb {
                    height: 18px;
                    width: 18px;
                    border-radius: 50%;
                    background: #007bff;
                    border: 2px solid #fff;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                    cursor: pointer;
                    pointer-events: all;
                  }

                  .range-slider-max::-webkit-slider-thumb {
                    background: #28a745;
                  }

                  .range-slider-max::-moz-range-thumb {
                    background: #28a745;
                  }

                  .slider-track {
                    position: absolute;
                    width: 100%;
                    height: 6px;
                    background: #e9ecef;
                    border-radius: 3px;
                  }

                  .slider-range {
                    position: absolute;
                    height: 6px;
                    background: linear-gradient(90deg, #007bff, #28a745);
                    border-radius: 3px;
                  }

                  .range-slider:focus {
                    outline: none;
                  }

                  .range-slider:focus::-webkit-slider-thumb {
                    box-shadow: 0 2px 8px rgba(0,123,255,0.3);
                  }

                  .range-slider:focus::-moz-range-thumb {
                    box-shadow: 0 2px 8px rgba(0,123,255,0.3);
                  }
                `}</style>

                {/* Category Filter */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Category</label>
                  <select 
                    className="form-select rounded-2"
                    value={filters.category}
                    onChange={(e) => {
                      handleFilterChange('category', e.target.value);
                      // Clear subcategory when category changes
                      handleFilterChange('subcategory', '');
                    }}
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subcategory Filter - Always show if there are subcategories */}
                {categories.length > 0 && (
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Subcategory
                      {filters.category && (
                        <small className="text-muted ms-1">
                          (for {categories.find(cat => cat._id === filters.category)?.name})
                        </small>
                      )}
                    </label>
                    <select 
                      className="form-select rounded-2"
                      value={filters.subcategory}
                      onChange={(e) => handleFilterChange('subcategory', e.target.value)}
                    >
                      <option value="">All Subcategories</option>
                      {filters.category ? (
                        // Show subcategories for selected category
                        getSubcategories().map((subcategory) => (
                          <option key={subcategory._id} value={subcategory._id}>
                            {subcategory.name}
                          </option>
                        ))
                      ) : (
                        // Show all subcategories from all categories if no category selected
                        categories.flatMap(category => 
                          (category.deepSubcategories || []).map(subcategory => (
                            <option key={`${category._id}-${subcategory._id}`} value={subcategory._id}>
                              {category.name} - {subcategory.name}
                            </option>
                          ))
                        )
                      )}
                    </select>
                  </div>
                )}

                {/* City Filter */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">City</label>
                  <select 
                    className="form-select rounded-2"
                    value={filters.city}
                    onChange={(e) => handleFilterChange('city', e.target.value)}
                  >
                    <option value="">All Cities</option>
                    {cities.map((city) => (
                      <option key={city._id} value={city._id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Locality Filter */}
                {filters.city && getLocalities().length > 0 && (
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Locality</label>
                    <select 
                      className="form-select rounded-2"
                      value={filters.locality}
                      onChange={(e) => handleFilterChange('locality', e.target.value)}
                    >
                      <option value="">All Localities</option>
                      {getLocalities().map((locality) => (
                        <option key={locality._id} value={locality._id}>
                          {locality.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Builder Filter */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Builder</label>
                  <select 
                    className="form-select rounded-2"
                    value={filters.builder}
                    onChange={(e) => handleFilterChange('builder', e.target.value)}
                  >
                    <option value="">All Builders</option>
                    {builders.map((builder) => (
                      <option key={builder._id} value={builder._id}>
                        {builder.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Property Type Filter */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Property Type</label>
                  <select 
                    className="form-select rounded-2"
                    value={filters.propertyType}
                    onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                  >
                    <option value="">All Types</option>
                    <option value="regular">Regular Properties</option>
                    <option value="builder">Builder Projects</option>
                  </select>
                </div>

                {/* Results Count */}
                <div className="mt-4 text-center">
                  <small className="text-muted">
                    Showing {filteredProperties.length} of {properties.length} properties
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* Property Cards Section - 70% */}
          <div className="col-lg-9 col-md-8">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading properties...</p>
              </div>
            ) : filteredProperties.length > 0 ? (
              <div className="row g-4">
                {filteredProperties.map((property) => (
                  <div key={property._id} className="col-xl-4 col-lg-6 col-md-6">
                    <PropertyCard property={property} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5">
                <div className="mb-4">
                  <i className="bi bi-search" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
                </div>
                <h4 className="text-muted">No Properties Found</h4>
                <p className="text-muted">
                  Try adjusting your filters or clearing them to see more results.
                </p>
                <button 
                  onClick={clearFilters}
                  className="btn btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}