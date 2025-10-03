import React from "react";
import Image from "next/image";
import heroImage from '../public/img/heroImage.jpg'

export default function Hero() {
    return (
        <main className="heroSection position-relative overflow-hidden">
        <Image
          src={heroImage}
          alt="Hero Image"
          fill
          className="object-fit-cover"
          priority
          loading="eager"
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
        <div className="heroSearch position-absolute top-50 start-50 translate-middle w-100 px-3 px-md-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-8 col-lg-6">
                <div className="searchContainer rounded-4 shadow-lg p-4 p-md-5">
                  {/* Single Search Input */}
                  <div className="input-group mb-3">
                    <span className="input-group-text bg-transparent border-end-0 border-white text-white">
                      <i className="bi bi-geo-alt-fill"></i>
                    </span>
                    <input 
                      type="text" 
                      className="form-control border-start-0 border-white bg-transparent text-white" 
                      placeholder="Enter location"
                      style={{borderLeft: 'none'}}
                    />
                  </div>
                  
                  {/* Property Type Dropdown */}
                  <div className="input-group mb-4">
                    <span className="input-group-text bg-transparent border-end-0 border-white text-white">
                      <i className="bi bi-building"></i>
                    </span>
                    <select className="form-select border-start-0 border-white bg-transparent text-white">
                      <option className="text-dark">Property Type</option>
                      <option className="text-dark">Apartment</option>
                      <option className="text-dark">Villa</option>
                      <option className="text-dark">Builder Floor</option>
                      <option className="text-dark">Commercial</option>
                    </select>
                  </div>
                  
                  {/* Search Button */}
                  <button className="btn btn-danger w-100 py-2 d-flex align-items-center justify-content-center gap-2">
                    <i className="bi bi-search"></i>
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
}