import React, { useState } from 'react';
import './JobsCards.scss';
import { useNavigate } from 'react-router-dom';
import jobsData from '../../../data/jobsData';


const JobsCards = () => {

  const jobsPerPage = 15;
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const start = (page - 1) * jobsPerPage;
  const visibleJobs = jobsData.slice(start, start + jobsPerPage);
  const totalPages = Math.ceil(jobsData.length / jobsPerPage);

  return (
    <section className="jobs-cards-section">
      <div className="jobs-cards-wrapper">

        {visibleJobs.map((job) => (
          <div
            key={job.id}
            className={job.featured ? 'job-card featured' : 'job-card'}
            onClick={() => navigate(`/jobs/${job.id}`)}
            style={{ cursor: 'pointer' }}
          >
            {job.featured && <div className="featured-badge">Featured</div>}

            <div className="job-card-top">
              <div className="job-initials">{job.initials}</div>

              <div className="job-card-content">
                <div className="job-title-row">
                  <div className="job-title-text">
                    <h3>{job.title}</h3>
                    <p>{job.company}</p>
                  </div>
                  <div className="job-type">{job.type}</div>
                </div>

                <div className="job-details">
                  <span>{job.location}</span>
                  <span>{job.salary}</span>
                  <span>{job.time}</span>
                </div>

                <div className="job-tags">
                  {job.tags.map((tag) => (
                    <div key={tag} className="job-tag">{tag}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {jobsData.length > jobsPerPage && (
        <div className="jobs-pagination">
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>{'<'}</button>
          <button className={page === 1 ? 'active-page' : ''} onClick={() => setPage(1)}>1</button>
          <button className={page === 2 ? 'active-page' : ''} onClick={() => setPage(2)}>2</button>
          <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>{'>'}</button>
        </div>
      )}
    </section>
  );
};

export default JobsCards;