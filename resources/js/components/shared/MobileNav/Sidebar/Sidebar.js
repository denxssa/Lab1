import React from "react";
import { CgClose } from "react-icons/cg";
import {BiSupport } from "react-icons/bi";
import { RiInformationFill } from "react-icons/ri";
import { FaHome, FaBuilding, FaMoneyBill } from "react-icons/fa";
import { MdWork } from "react-icons/md";

const Sidebar = (props) => {
  return (
    <div className="mobile-sidebar">
      <div className="sidebar-logo-row">
        <a href="/">
          <div className="mobile-logo-container"></div>
        </a>
        <button onClick={props.click}>
          <CgClose />{" "}
        </button>
      </div>

      <div className="mobile-sidebar-links">
        <div className="sidebar-dropdown">
          <div className="nav-sidebar-link">
            <a href="/" className="nav-anchor">
              <FaHome />
              Home
            </a>
          </div>
        </div>

        <div className="nav-sidebar-link">
          <a href="/about-us" className="nav-anchor">
            <RiInformationFill />
            About Us
          </a>
        </div>

        <div className="nav-sidebar-link">
          <a href="/jobs" className="nav-anchor">
            <MdWork />
            Jobs
          </a>
        </div>

        <div className="nav-sidebar-link">
          <a href="/" className="nav-anchor">
            <FaBuilding />
            Companies
          </a>
        </div>

        <div className="nav-sidebar-link">
          <a href="/pricing" className="nav-anchor">
            <FaMoneyBill />
            Pricing
          </a>
        </div>

        <div className="nav-sidebar-link">
          <a href="/" className="nav-anchor">
            <BiSupport />
            Contact Us
          </a>
        </div>
      </div>

      <div className="sidebar-auth">
        <a href="/" className="contact-us">
          Log In
        </a>
      </div>

      <div className="space"></div>
    </div>
  );
};

export default Sidebar;
