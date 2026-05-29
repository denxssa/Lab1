import React from 'react';

import { JOB_LISTING_TYPES } from '../../../../../api/jobsApi';

import './JobsFilters.scss';



const JobsFilters = ({

  activeFilters,

  onFilterToggle,
  onFilterSelect,

  totalJobs,

  filteredCount,

  page,

  totalPages,

  jobsPerPage,

}) => {

  const filterButtons = ['All Types', ...JOB_LISTING_TYPES];

  const start = filteredCount === 0 ? 0 : (page - 1) * jobsPerPage + 1;

  const end = Math.min(page * jobsPerPage, filteredCount);

  const activeLabel = activeFilters.length === 0

    ? 'All Types'

    : activeFilters.join(', ');



  return (

    <section className="jobs-filters" data-aos="fade-up" data-aos-delay="100">

      <div className="jobs-filters-top">

        <select

          className="jobs-select"

          value={activeLabel}

          onChange={(e) => onFilterSelect(e.target.value)}

        >

          <option value="All Types">All Types ({totalJobs})</option>

          {JOB_LISTING_TYPES.map((button) => (

            <option key={button} value={button}>{button}</option>

          ))}

        </select>

      </div>



      <div className="jobs-filter-buttons">

        {filterButtons.map((button) => {

          const isActive = button === 'All Types'

            ? activeFilters.length === 0

            : activeFilters.includes(button);



          return (

            <button

              key={button}

              type="button"

              className={isActive ? 'filter-btn active' : 'filter-btn'}

              onClick={() => onFilterToggle(button)}

            >

              {button}

            </button>

          );

        })}

      </div>



      <div className="jobs-filters-info">

        <p>

          Showing <strong>{filteredCount === 0 ? 0 : `${start}–${end}`}</strong> of <strong>{filteredCount}</strong> jobs

          {filteredCount !== totalJobs && (

            <> (from {totalJobs} total)</>

          )}

        </p>

        <p>

          {activeFilters.length > 0

            ? `Matching all: ${activeFilters.join(', ')} · `

            : ''}

          Page {filteredCount === 0 ? 0 : page} of {totalPages}

        </p>

      </div>

    </section>

  );

};



export default JobsFilters;


