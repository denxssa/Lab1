import React from 'react';
import './JobDetail.scss';


const JobDetail = ({ job, onBack, relatedJobs, onSelectJob }) => {
  return (

    <div className="job-detail-page">

      <button className="back-btn" onClick={onBack}>
        ← Back to Jobs
      </button>

      <div className="job-detail-header">
        <div className="job-detail-initials">{job.initials}</div>
        <div className="job-detail-title">
          <h1>{job.title}</h1>
          <p>{job.company}</p>
        </div>

        {job.featured && (
          <div className="job-detail-featured">☆ Featured</div>
        )}
      </div>


      <div className="job-detail-meta">
        <span>Location: {job.location}</span>
        <span>Type: {job.type}</span>
        <span>Salary: {job.salary}</span>
        <span>Posted: {job.time}</span>
      </div>

      <div className="job-detail-tags">
        {job.tags.map((tag) => (
          <div key={tag} className="job-detail-tag">{tag}</div>
        ))}
      </div>

      <h2>About the Role</h2>
      <p>
        We're looking for a talented {job.title} to join {job.company}.
        This is a {job.type} position based in {job.location}.
        You'll work alongside a passionate team building products that make a real impact.
      </p>

      <h2>Requirements</h2>
      <ul>
        {job.tags.map((tag) => (
          <li key={tag}>Experience with {tag}</li>
        ))}
        <li>Strong communication and collaboration skills</li>
        <li>Passion for continuous learning and growth</li>
      </ul>

      <h2>What We Offer</h2>
      <ul>
        <li>Competitive salary: {job.salary}</li>
        <li>Comprehensive health, dental, and vision benefits</li>
        <li>Flexible work arrangements</li>
        <li>Professional development budget</li>
      </ul>

      <div className="job-detail-actions">
        <button className="apply-btn">↗ Apply Now</button>
        <button className="save-btn">Save Job</button>
      </div>

      <div className="job-detail-related">
        <h2>More Jobs</h2>

        <div className="related-cards">
          {relatedJobs.map((related) => (

            <div
              key={related.id}
              className="related-card"
              onClick={() => onSelectJob(related)}
              style={{ cursor: 'pointer' }}
            >
              {related.featured && (
                <div className="related-featured">☆ Featured</div>
              )}

              <div className="related-initials">{related.initials}</div>
              <h3>{related.title}</h3>
              <p>{related.company}</p>

              <span>{related.location}</span>
              <span>{related.salary}</span>
              <span>{related.time}</span>

              <div className="related-tags">
                {related.tags.map((tag) => (
                  <div key={tag} className="related-tag">{tag}</div>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default JobDetail;