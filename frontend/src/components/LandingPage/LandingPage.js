import React from "react";
import { Header, Footer, FeaturedListing, HeroSection } from "../index";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <>
      <Header onPage="home" />
      <HeroSection />

      {/* Featured Listing */}
      <div className="card-container">
        <h1 className="featured-listing-title">
          Here are some of featured listings
        </h1>
        <FeaturedListing />
      </div>

      <Footer />
    </>
  );
};

export default LandingPage;
