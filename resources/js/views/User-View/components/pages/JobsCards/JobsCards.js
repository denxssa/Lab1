import React, { useEffect, useState } from 'react';
import './JobsCards.scss';
import { useNavigate } from 'react-router-dom';
import { listJobListings, mapJobListing } from '../../../../../api/jobsApi';

const JobsCards = () => {
  const jobsPerPage = 6;
  const [page, setPage] = useState(1);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await listJobListings();
        if (!cancelled) {
          setJobs((data.jobs || []).map(mapJobListing));
        }
      } catch {
        if (!cancelled) setError('Could not load jobs. Please try again later.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const start = (page - 1) * jobsPerPage;
  const visibleJobs = jobs.slice(start, start + jobsPerPage);
  const totalPages = Math.ceil(jobs.length / jobsPerPage) || 1;

  if (loading) {
    return (
      <section className="jobs-cards-section">
        <div className="jobs-cards-wrapper">
          <p>Loading jobs…</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="jobs-cards-section">
        <div className="jobs-cards-wrapper">
          <p>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="jobs-cards-section">
      <div className="jobs-cards-wrapper">
        {visibleJobs.map((job, index) => (
          <div
            key={job.id}
            className={job.featured ? 'job-card featured' : 'job-card'}
            onClick={() => navigate(`/jobs/${job.id}`)}
            style={{ cursor: 'pointer' }}
            data-aos="fade-up"
            data-aos-delay={index * 80}
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

      {jobs.length > jobsPerPage && (
        <div className="jobs-pagination">
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>{'<'}</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              className={page === pageNum ? 'active-page' : ''}
              onClick={() => setPage(pageNum)}
            >
              {pageNum}
            </button>
          ))}
          <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>{'>'}</button>
        </div>
      )}
    </section>
  );
};

export default JobsCards;
