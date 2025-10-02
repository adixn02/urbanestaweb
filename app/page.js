import Header from "@/components/header";
import Footer from "@/components/footer";
import Hero from "@/components/hero.jsx";
import FeaturedBuilder from "@/components/featuredbuilder";
import Topbuilder from "@/components/topbuilder";
import Neighbourhood from "@/components/neighbourhood";
import Testimonial from "@/components/testmonial";
import ErrorBoundary from "@/components/ErrorBoundary";
import Link from "next/link";


export default async function Home() {


  return (
    <>
       <Header />
      {/* Hero Section with Search Bar */}
      <Hero />
      {/* top builder section */}
      <ErrorBoundary>
        <Topbuilder />
      </ErrorBoundary>
         
.

   
    <div className="container">
               <Link href="/builder" className="btn btn-primary">View More Builders </Link>

      {/* featured builder section */}
      <ErrorBoundary>
        <FeaturedBuilder />
      </ErrorBoundary>
      {/* neighbourhood section */}
      {/* Section Header */}
      <div className="container">
        <h2 className="display-6 display-md-5 fw-bold text-dark mb-3">Find the Neighborhood For You</h2>
        <p className="text-muted">The neighborhoods best suited to your lifestyle, and the agents who know them best.</p>
      </div>
      <ErrorBoundary>
        <Neighbourhood />
      </ErrorBoundary>
      {/* View All Button */}
      <div >
        <Link href="/city" className="btn btn-primary">View More Neighbourhood </Link>
      </div>
      {/* testomonial section */}
      <ErrorBoundary>
        <Testimonial />
      </ErrorBoundary>



    </div>

      <Footer />
     </>
  );
}
