import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JobDetail from '../../components/pages/JobDetail/JobDetail';
import Navbar from '../../components/shared/navbar/Navbar';
import Footer from '../../components/shared/footer/Footer';
import { getJobListing, listJobListings, mapJobListing } from '../../../../api/jobsApi';

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const [jobRes, listRes] = await Promise.all([
          getJobListing(id),
          listJobListings(),
        ]);

        if (cancelled) return;

        const mapped = mapJobListing(jobRes.job);
        const allJobs = (listRes.jobs || []).map(mapJobListing);
        setJob(mapped);
        setRelatedJobs(
          allJobs
            .filter((j) => j.id !== mapped.id && j.type === mapped.type)
            .slice(0, 3),
        );
      } catch {
        if (!cancelled) setError('Job not found.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <p style={{ padding: '2rem' }}>Loading job…</p>
        <Footer />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div>
        <Navbar />
        <p style={{ padding: '2rem' }}>{error || 'Job not found.'}</p>
        <Footer />
      </div>
    );
  }

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
