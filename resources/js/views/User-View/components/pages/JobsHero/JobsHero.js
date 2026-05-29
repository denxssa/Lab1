import React from 'react';
import './JobsHero.scss';

const JobsHero = ({ searchQuery, onSearchChange, totalJobs, filteredCount }) => {
  const countLabel = filteredCount === totalJobs
    ? `${totalJobs} job${totalJobs === 1 ? '' : 's'}`
    : `${filteredCount} of ${totalJobs}`;

  return (
    <section className="jobs-hero" data-aos="fade-up">
      <div className="blur-circle left" />
      <div className="blur-circle right" />

      <div className="jobs-hero-content">
        <h1>
          Find Your Next{' '}
          <span>Opportunity</span>
        </h1>

        <p>
          Browse {totalJobs > 0 ? `${totalJobs}+` : ''} open positions across top companies. Your dream job is one search away.
        </p>

        <div className="jobs-hero-search-row">
          <div className="jobs-search-box">
            <input
              type="text"
              placeholder="Search jobs, companies, or skills..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <div className="jobs-count-box">
            <span>{countLabel}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobsHero;
