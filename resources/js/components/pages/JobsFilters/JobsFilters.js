
import React, { useState } from 'react';
import './JobsFilters.scss';

const JobsFilters = () => {
  const filterButtons = [
    'All Types',
    'Full-time',
    'Part-time',
    'Contract',
    'Internship',
    'Remote',
  ];

  const [activeFilter, setActiveFilter] = useState('All Types');

  return (
    <section className="jobs-filters">
      <div className="jobs-filters-top">
        <select className="jobs-select">
          <option>All (20)</option>
        </select>
      </div>

      <div className="jobs-filter-buttons">
        {filterButtons.map((button) => (
          <button
            key={button}
            className={activeFilter === button ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setActiveFilter(button)}
          >
            {button}
          </button>
        ))}
      </div>

      <div className="jobs-filters-info">
        <p>
          Showing <strong>15</strong> of <strong>20</strong> jobs
        </p>

        <p>Page 1 of 2</p>
      </div>
    </section>
  );
};

export default JobsFilters;