import React from "react";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import city from '../../public/img/download.svg'
import Neighbourhood from "@/components/neighbourhood";

export default function City() {
    return (
        <div>
            <Header/>
            {/* city hero section */}
               <div className="cityherosection d-flex mt-5 pt-5">
                             <p className="pepsiback m-2 p-3 fs-3 fw-bold rounded-4 text-center d-flex align-items-center">Explore the country’s most dynamic communities.</p>
                             <Image 
                                src={city} 
                                alt="Pepsi" 
                                className="w-100" 
                                style={{height: "300px", objectFit: "cover"}} 
                                loading="lazy"
                                quality={85}
                                placeholder="blur"
                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                             />
                </div>

                    <Neighbourhood/>
            <Footer/>
        </div>
    )
}