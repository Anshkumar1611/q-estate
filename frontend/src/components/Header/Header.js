import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = ({ onPage }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="header">
        <div className="logo" onClick={() => navigate("/")}>
          QEstate
        </div>
        {onPage === "home" ? (
          <div className="nav-link" onClick={() => navigate("/listings")}>
            <span>Explore</span>
          </div>
        ) : (
          <div className="nav-link" onClick={() => navigate("/")}>
            <span>FeaturedListing</span>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
