import React from 'react';
import './JobDetail.scss';

const JobDetail = ({ job, onBack, relatedJobs, onSelectJob }) => {
  return (
    <div className="job-detail-page">

      <button className="back-btn" onClick={onBack}>
        ← Back to Jobs
      </button>

      <div className="job-detail-header" data-aos="fade-up">
        <div className="job-detail-initials">{job.initials}</div>
        <div className="job-detail-title">
          <h1>{job.title}</h1>
          <p>{job.company}</p>
        </div>
        {job.featured && (
          <div className="job-detail-featured">☆ Featured</div>
        )}
      </div>

      <div className="job-detail-meta" data-aos="fade-up" data-aos-delay="100">
        <span>Location: {job.location}</span>
        <span>Type: {job.type}</span>
        <span>Salary: {job.salary}</span>
        <span>Posted: {job.time}</span>
      </div>

      <div className="job-detail-tags" data-aos="fade-up" data-aos-delay="150">
        {job.tags.map((tag) => (
          <div key={tag} className="job-detail-tag">{tag}</div>
        ))}
      </div>

      <h2 data-aos="fade-up">About the Role</h2>
      <p data-aos="fade-up">
        We're looking for a talented {job.title} to join {job.company}.
        This is a {job.type} position based in {job.location}.
        You'll work alongside a passionate team building products that make a real impact.
      </p>

      <h2 data-aos="fade-up">Requirements</h2>
      <ul data-aos="fade-up">
        {job.tags.map((tag) => (
          <li key={tag}>Experience with {tag}</li>
        ))}
        <li>Strong communication and collaboration skills</li>
        <li>Passion for continuous learning and growth</li>
      </ul>

      <h2 data-aos="fade-up">What We Offer</h2>
      <ul data-aos="fade-up">
        <li>Competitive salary: {job.salary}</li>
        <li>Comprehensive health, dental, and vision benefits</li>
        <li>Flexible work arrangements</li>
        <li>Professional development budget</li>
      </ul>

      <div className="job-detail-actions" data-aos="fade-up">
        <button className="apply-btn">↗ Apply Now</button>
        <button className="save-btn">Save Job</button>
      </div>

      <div className="job-detail-related" data-aos="fade-up">
        <h2>More Jobs</h2>
        <div className="related-cards">
          {relatedJobs.map((related, index) => (
            <div
              key={related.id}
              className="related-card"
              onClick={() => onSelectJob(related)}
              style={{ cursor: 'pointer' }}
              data-aos="fade-up"
              data-aos-delay={index * 80}
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