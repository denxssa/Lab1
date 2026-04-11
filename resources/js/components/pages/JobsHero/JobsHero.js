import React from 'react';
import './JobsHero.scss';

const JobsHero = () => {
  return (
    <section className="jobs-hero" data-aos="fade-up">
      <div className="blur-circle left"></div>
      <div className="blur-circle right"></div>

      <div className="jobs-hero-content">
        <h1>
          Find Your Next{' '}
          <span>Opportunity</span>
        </h1>

        <p>Browse 20+ open positions across top companies. Your dream job is one search away.</p>

        <div className="jobs-hero-search-row">
          <div className="jobs-search-box">
            <input type="text" placeholder="Search jobs, companies, or skills..." />
          </div>
          <div className="jobs-count-box">
            <span>20+ jobs</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobsHero;