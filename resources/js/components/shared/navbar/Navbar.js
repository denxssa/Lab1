import React, { useState, useEffect } from "react";
import "./navbar.scss";
import MobileNav from "../MobileNav/MobileNav";

const Navbar = (props) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const nav = document.querySelector(".nav");
    if (!nav) {
      return undefined;
    }

    const handleScroll = () => {
      const scrollHeight = window.pageYOffset;
      setIsSticky(scrollHeight > 25);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="navbar"
      className={`nav ${props.styles ?? ""} ${isSticky ? "nav__sticky" : ""}`.trim()}
    >
      <div className="left-side">
        <a href="/" className="nav-logo">
          <div className="logo-container"></div>
        </a>
      </div>

      <div className="nav-links">
        <div className="nav-link home-link">
          <a href="/" className="inner-nav-link">Home</a>
          <div className="line"></div>
        </div>

        <div className="nav-link about-us-link">
          <a href="/about-us" className="inner-nav-link">About Us</a>
          <div className="line"></div>
        </div>

        <div className="nav-link jobs-link">
          <a href="/jobs" className="inner-nav-link">Jobs</a>
          <div className="line"></div>
        </div>

        <div className="nav-link companies-link">
          <a href="/" className="inner-nav-link">Companies</a>
          <div className="line"></div>
        </div>

        <div className="nav-link pricing-link">
          <a href="/" className="inner-nav-link">Pricing</a>
          <div className="line"></div>
        </div>

        <div className="nav-link contact-us">
          <a href="/" className="inner-nav-link">Contact Us</a>
          <div className="line"></div>
        </div>
      </div>

      <div className="nav-auth">
        <a href="/" className="contact-us">Login</a>
      </div>
      <MobileNav />
    </div>
  );
};

export default Navbar;
