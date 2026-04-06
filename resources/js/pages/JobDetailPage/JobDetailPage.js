import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JobDetail from '../../components/pages/JobDetail/JobDetail';
import Navbar from '../../components/shared/navbar/Navbar';
import Footer from '../../components/shared/footer/Footer';
import jobsData from '../../data/jobsData';


const JobDetailPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const job = jobsData.find((j) => j.id === Number(id));

  if (!job) {
    return <p>Job not found.</p>;
  }

  const relatedJobs = jobsData
    .filter((j) => j.id !== job.id && j.type === job.type)
    .slice(0, 3);

  return (
    <div>
      <Navbar />
      <JobDetail
        job={job}
        onBack={() => navigate('/jobs')}
        relatedJobs={relatedJobs}
        onSelectJob={(related) => navigate(`/jobs/${related.id}`)}
      />
      <Footer />
    </div>
  );
};

export default JobDetailPage;