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
      
      {/* Top Builder Section */}
      <ErrorBoundary>
        <Topbuilder />
      </ErrorBoundary>
      
      {/* View More Builders Button */}
      <div className="container text-center my-4">
        <Link href="/builder" className="btn btn-primary btn-lg">View More Builders</Link>
      </div>

      {/* Featured Builder Section */}
      <ErrorBoundary>
        <FeaturedBuilder />
      </ErrorBoundary>
      
      {/* Neighbourhood Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-6 display-md-5 fw-bold text-dark mb-3">Find the Neighborhood For You</h2>
            <p className="text-muted fs-5">The neighborhoods best suited to your lifestyle, and the agents who know them best.</p>
          </div>
          
          <ErrorBoundary>
            <Neighbourhood />
          </ErrorBoundary>
          
          {/* View All Neighbourhoods Button */}
          <div className="text-center mt-4">
            <Link href="/city" className="btn btn-primary btn-lg">View More Neighbourhoods</Link>
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <ErrorBoundary>
        <Testimonial />
      </ErrorBoundary>

      <Footer />
    </>
  );
}
