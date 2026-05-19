import React, { useState } from "react";
import { FiBriefcase, FiBookmark } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";

import "./SavedJobs.scss";
import { jobs } from "./data";

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState(jobs);

  const handleUnsave = (jobId) => {
    setSavedJobs((currentJobs) => currentJobs.filter((job) => job.id !== jobId));
  };

  return (
    <main className="applied">
      <h1 className="applied-title">Saved Jobs</h1>

      <div className="jobs-list">
        {savedJobs.map((job) => (
          <section className="job-card" key={job.id}>
            <div className="job-body">
              <div className="job-top">
                <div className="job-icon">
                  <FiBriefcase />
                </div>
                <button type="button" className="job-status saved saved-toggle" onClick={() => handleUnsave(job.id)}>
                  <FiBookmark />
                  <span>Saved</span>
                </button>
              </div>

              <h2 className="job-name">{job.title}</h2>
              <div className="job-details">
                <p className="job-text"><b>{job.company}</b></p>
                <p className="job-text"><b>Saved Date:</b> {job.date}</p>
                <p className="job-text"><b>No of vacancies:</b> {job.vacancies}</p>
              </div>

              <a href="/" className="banner-btn2">
                <span>View Job Description</span>
                <span className="btn-arrow">
                  <FaArrowRight />
                </span>
              </a>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

export default SavedJobs;
