"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from '../Assets/logo.jpg'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState("Gurgaon");
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    return(
        <>
        <header ref={menuRef} className=" bg-white  d-flex justify-content-between align-items-center border-bottom fixed-top px-3 px-md-4">
                {/* Logo */}
                <Link href="/" className="d-flex align-items-center">
                    <Image 
                        src={Logo} 
                        alt="urbanestaLogo" 
                        width={60} 
                        height={60} 
                        className="d-md-none" 
                        priority
                        loading="eager"
                        quality={90}
                    />
                    <Image 
                        src={Logo} 
                        alt="urbanestaLogo" 
                        width={80} 
                        height={80} 
                        className="d-none d-md-block" 
                        priority
                        loading="eager"
                        quality={90}
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="d-none d-lg-block">
                    <ul className="d-flex list-unstyled gap-4 mb-0">
                        <li>
                            <Link href="/properties" className="text-decoration-none text-black fs-5">Residential</Link>
                        </li>
                        <li>
                            <Link href="/properties" className="text-decoration-none text-black fs-5">Commercial</Link>
                        </li>
                        <li>
                            <Link href="/properties" className="text-decoration-none text-black fs-5">Rentals</Link>
                        </li>
                        <li>
                            <Link href="/properties" className="text-decoration-none text-black fs-5">Investments</Link>
                        </li>
                       
                    </ul>
                </nav>

                {/* Desktop Actions */}
                <div className="d-none d-lg-flex gap-3 align-items-center">
                    {/* Location Selector with Icon */}
                    <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-geo-alt-fill text-primary"></i>
                        <select 
                            className="form-select border-0 bg-transparent p-1" 
                            style={{width: 'auto'}}
                            value={selectedLocation}
                            onChange={(e) => setSelectedLocation(e.target.value)}
                        >                        
                            <option value="gurgaon">Gurgaon</option>
                            <option value="noida">Noida</option>
                            <option value="delhi">Delhi</option>
                        </select>
                    </div>
                    {/* <button className="btn btn-danger btn-sm">Post Property</button> */}
                    <button className="btn btn-primary btn-sm">Sign In</button>
                </div>

                {/* Mobile Menu Button */}
                <button 
                    className="btn d-lg-none border border-dark bg-white text-dark rounded-2"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Hamburger clicked, current state:', isMenuOpen);
                        setIsMenuOpen(!isMenuOpen);
                    }}
                    aria-label="Toggle menu"
                    style={{
                        padding: '8px 12px',
                        minWidth: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}
                >
                    <i className={`bi ${isMenuOpen ? 'bi-x-lg' : 'bi-list'}`} style={{fontSize: '1.2rem', fontWeight: 'bold'}}></i>
                </button>
                
        </header>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
            <div className="d-lg-none position-fixed start-0 w-100 bg-white border-bottom shadow-lg mobile-menu-dropdown" style={{zIndex: 1050, top: '70px'}}>
                <nav className="p-3">
                    {/* Navigation Links */}
                    <ul className="list-unstyled mb-3">
                        <li className="mb-2">
                            <Link 
                                href="/property" 
                                className="text-decoration-none text-black d-block p-3 rounded hover-bg-light" 
                                onClick={() => setIsMenuOpen(false)}
                                style={{transition: 'background-color 0.2s ease'}}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            >
                                Residential
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link 
                                href="/property" 
                                className="text-decoration-none text-black d-block p-3 rounded hover-bg-light" 
                                onClick={() => setIsMenuOpen(false)}
                                style={{transition: 'background-color 0.2s ease'}}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            >
                             Commercial
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link 
                                href="/property" 
                                className="text-decoration-none text-black d-block p-3 rounded hover-bg-light" 
                                onClick={() => setIsMenuOpen(false)}
                                style={{transition: 'background-color 0.2s ease'}}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            >
                                Rentals
                            </Link>
                        </li>
                    </ul>
                    
                    {/* Separator */}
                    <div className="border-top pt-3">
                        {/* Mobile Location Selector */}
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <i className="bi bi-geo-alt-fill text-primary"></i>
                            <select 
                                className="form-select"
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                            >                        
                                <option value="gurgaon">Gurgaon</option>
                                <option value="noida">Noida</option>
                                <option value="delhi">Delhi</option>
                            </select>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="d-grid gap-2">
                            <button className="btn btn-danger">Post Property</button>
                            <button className="btn btn-primary">Sign In</button>
                        </div>
                    </div>
                </nav>
            </div>
        )}
        </>
    )
}