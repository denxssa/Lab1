import React from "react";
import { FiBriefcase } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";

import "./AppliedJobs.scss";
import { jobs } from "./data.js";

function AppliedJobs() {
  return (
    <main className="applied">
      <h1 className="applied-title">Applied Jobs</h1>

      <div className="jobs-list">
        {jobs.map((job) => (
          <section className="job-card" key={job.id}>
            <div className="job-body">
              <div className="job-top">
                <div className="job-icon">
                  <FiBriefcase />
                </div>
                <span
                  className={`job-status ${
                    job.status === "Accepted"
                      ? "success"
                      : job.status === "Pending"
                      ? "pending"
                      : "rejected"
                  }`}
                >
                  {job.status}
                </span>
              </div>

              <h2 className="job-name">{job.title}</h2>
              <div className="job-details">
                <p className="job-text"><b>{job.company}</b></p>
                <p className="job-text"><b>Applied Date:</b> {job.date}</p>
                <p className="job-text"><b>No of vacancies:</b> {job.vacancies}</p>
              </div>

              <a href="/" className="banner-btn2">
                <span>View job description</span>
                <span className="btn-arrow"><FaArrowRight /></span>
              </a>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

export default AppliedJobs;
