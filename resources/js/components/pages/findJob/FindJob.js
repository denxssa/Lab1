import React from 'react';

import './findjob.scss';
import { FaArrowRight } from "react-icons/fa";


const FindJob = () => {
  return (
    <section className="jobs-hero">

      {/* blur circles */}
      <div className="blur-circle left"></div>
      <div className="blur-circle right"></div>

      <div className="jobs-hero-content">

        <h1>
          Find Your Next{' '}
          <span>Opportunity</span>
        </h1>

        <p>Browse 20+ open positions across top companies. Your dream job is one search away.</p>

        <a href="/" className="banner-btn">
                            <span>Explore the job market</span>
                            <span className="btn-arrow">
                                <FaArrowRight />
                            </span>
                        </a>
      </div>
    </section>
  );
};

export default FindJob;