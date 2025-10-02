'use client';

import React, { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-5 pb-4 bg-primary text-white mt-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <h1 className="display-4 fw-bold mb-4">
                Contact Us
              </h1>
              <p className="lead text-light">
                We&apos;re here to help you with all your real estate needs. Get in touch with our expert team today.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {/* Contact Form */}
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h2 className="h3 fw-bold text-dark mb-4">Send us a Message</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label fw-medium">Full Name *</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your full name"
                            className="form-control py-3"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label fw-medium">Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                            className="form-control py-3"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label fw-medium">Phone Number</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            className="form-control py-3"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label fw-medium">Subject *</label>
                          <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="form-select py-3"
                          >
                            <option value="">Select a subject</option>
                            <option value="buying">Buying Property</option>
                            <option value="selling">Selling Property</option>
                            <option value="renting">Renting Property</option>
                            <option value="agent">Find an Agent</option>
                            <option value="support">General Support</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-medium">Message *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="Tell us how we can help you..."
                        className="form-control py-3"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-lg w-100 mt-4 py-3 fw-medium"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="col-lg-6">
              <div className="ps-lg-4">
                <h2 className="h3 fw-bold text-dark mb-4">Get in Touch</h2>
                
                <div className="vstack gap-4">
                  {/* Office Address */}
                  <div className="d-flex align-items-start gap-3">
                    <div className="bg-light rounded-circle p-3 flex-shrink-0">
                      <i className="bi bi-geo-alt-fill text-primary fs-5"></i>
                    </div>
                    <div>
                      <h3 className="h5 fw-semibold text-dark mb-2">Office Address</h3>
                      <p className="text-muted mb-0">
                        Urbanesta Tower, Block A-1<br />
                        Sector 62, Noida, UP 201309<br />
                        Delhi NCR, India
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="d-flex align-items-start gap-3">
                    <div className="bg-light rounded-circle p-3 flex-shrink-0">
                      <i className="bi bi-telephone-fill text-primary fs-5"></i>
                    </div>
                    <div>
                      <h3 className="h5 fw-semibold text-dark mb-2">Phone Numbers</h3>
                      <p className="text-muted mb-0">
                        Sales: +91 9876543210<br />
                        Support: +91 9876543211<br />
                        Toll Free: 1800-123-4567
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="d-flex align-items-start gap-3">
                    <div className="bg-light rounded-circle p-3 flex-shrink-0">
                      <i className="bi bi-envelope-fill text-primary fs-5"></i>
                    </div>
                    <div>
                      <h3 className="h5 fw-semibold text-dark mb-2">Email Addresses</h3>
                      <p className="text-muted mb-0">
                        General: info@urbanesta.in<br />
                        Sales: sales@urbanesta.in<br />
                        Support: support@urbanesta.in
                      </p>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="d-flex align-items-start gap-3">
                    <div className="bg-light rounded-circle p-3 flex-shrink-0">
                      <i className="bi bi-clock-fill text-primary fs-5"></i>
                    </div>
                    <div>
                      <h3 className="h5 fw-semibold text-dark mb-2">Business Hours</h3>
                      <p className="text-muted mb-0">
                        Monday - Friday: 9:00 AM - 7:00 PM<br />
                        Saturday: 10:00 AM - 6:00 PM<br />
                        Sunday: 11:00 AM - 4:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}