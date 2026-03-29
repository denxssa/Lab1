
import React, { useState } from 'react';
import './JobsCards.scss';

const JobsCards = () => {
  const jobs = [
    {
      id: 1,
      initials: 'TH',
      title: 'Senior Frontend Developer',
      company: 'TechHive',
      location: 'San Francisco, CA',
      salary: '$120k - $160k',
      time: '2 days ago',
      type: 'Full-time',
      featured: true,
      tags: ['React', 'TypeScript', 'Tailwind'],
    },

    {
      id: 2,
      initials: 'DB',
      title: 'UX/UI Designer',
      company: 'DesignBuzz',
      location: 'Remote',
      salary: '$90k - $120k',
      time: '1 day ago',
      type: 'Full-time',
      featured: true,
      tags: ['Figma', 'User Research', 'Prototyping'],
    },

    {
      id: 3,
      initials: 'GN',
      title: 'Digital Marketing Manager',
      company: 'GrowthNest',
      location: 'New York, NY',
      salary: '$85k - $110k',
      time: '3 days ago',
      type: 'Full-time',
      featured: false,
      tags: ['SEO', 'Google Ads', 'Analytics'],
    },

    {
      id: 4,
      initials: 'CW',
      title: 'Financial Analyst',
      company: 'CapitalWing',
      location: 'Chicago, IL',
      salary: '$75k - $95k',
      time: '5 days ago',
      type: 'Full-time',
      featured: false,
      tags: ['Excel', 'Financial Modeling', 'SQL'],
    },

    {
      id: 5,
      initials: 'CP',
      title: 'Registered Nurse',
      company: 'CarePoint Health',
      location: 'Boston, MA',
      salary: '$70k - $90k',
      time: '1 day ago',
      type: 'Full-time',
      featured: false,
      tags: ['Patient Care', 'EMR', 'Critical Care'],
    },

    {
      id: 6,
      initials: 'CF',
      title: 'Backend Engineer',
      company: 'CloudForge',
      location: 'Austin, TX',
      salary: '$130k - $170k',
      time: '4 hours ago',
      type: 'Remote',
      featured: true,
      tags: ['Node.js', 'AWS', 'PostgreSQL'],
    },

    {
      id: 7,
      initials: 'PC',
      title: 'Product Design Intern',
      company: 'PixelCraft',
      location: 'Los Angeles, CA',
      salary: '$25/hr',
      time: '6 days ago',
      type: 'Internship',
      featured: false,
      tags: ['UI Design', 'Sketch', 'Design Systems'],
    },

    {
      id: 8,
      initials: 'BP',
      title: 'High School Math Teacher',
      company: 'BrightPath Academy',
      location: 'Denver, CO',
      salary: '$55k - $72k',
      time: '2 days ago',
      type: 'Full-time',
      featured: false,
      tags: ['Curriculum', 'STEM', 'Mentoring'],
    },

    {
      id: 9,
      initials: 'IW',
      title: 'Mechanical Engineer',
      company: 'IronWorks Co',
      location: 'Detroit, MI',
      salary: '$85k - $105k',
      time: '1 week ago',
      type: 'Full-time',
      featured: false,
      tags: ['CAD', 'SolidWorks', 'Manufacturing'],
    },

    {
      id: 10,
      initials: 'DS',
      title: 'Sales Development Rep',
      company: 'DealStream',
      location: 'Remote',
      salary: '$55k - $75k + Commission',
      time: '3 days ago',
      type: 'Full-time',
      featured: false,
      tags: ['B2B', 'CRM', 'Outbound'],
    },

    {
      id: 11,
      initials: 'IC',
      title: 'DevOps Engineer',
      company: 'InfraCore',
      location: 'Seattle, WA',
      salary: '$140k - $180k',
      time: '12 hours ago',
      type: 'Contract',
      featured: false,
      tags: ['Docker', 'Kubernetes', 'CI/CD'],
    },

    {
      id: 12,
      initials: 'BP',
      title: 'Content Marketing Specialist',
      company: 'BrandPulse',
      location: 'Remote',
      salary: '$40/hr',
      time: '4 days ago',
      type: 'Part-time',
      featured: false,
      tags: ['Copywriting', 'Social Media', 'Strategy'],
    },

    {
      id: 13,
      initials: 'DM',
      title: 'Data Scientist',
      company: 'DataMinds',
      location: 'Seattle, WA',
      salary: '$130k - $165k',
      time: '1 day ago',
      type: 'Full-time',
      featured: true,
      tags: ['Python', 'Machine Learning', 'TensorFlow'],
    },

    {
      id: 14,
      initials: 'VS',
      title: 'Graphic Designer',
      company: 'VividStudio',
      location: 'Portland, OR',
      salary: '$50/hr',
      time: '3 days ago',
      type: 'Contract',
      featured: false,
      tags: ['Illustrator', 'Branding', 'Typography'],
    },

    {
      id: 15,
      initials: 'SF',
      title: 'Account Executive',
      company: 'SalesForce Pro',
      location: 'Dallas, TX',
      salary: '$80k - $120k + Commission',
      time: '2 days ago',
      type: 'Full-time',
      featured: false,
      tags: ['Enterprise Sales', 'Negotiation', 'Pipeline'],
    },

    {
      id: 16,
      initials: 'AX',
      title: 'Mobile App Developer',
      company: 'AppAxis',
      location: 'Miami, FL',
      salary: '$100k - $130k',
      time: '1 day ago',
      type: 'Full-time',
      featured: false,
      tags: ['React Native', 'iOS', 'Android'],
    },
  ];


  const jobsPerPage = 15;

  const [page, setPage] = useState(1);

  const start = (page - 1) * jobsPerPage;


  const visibleJobs = jobs.slice(start, start + jobsPerPage);

  
  const totalPages = Math.ceil(jobs.length / jobsPerPage);


  return (

    <section className="jobs-cards-section">
      <div className="jobs-cards-wrapper">

        {visibleJobs.map((job) => (
          <div
            key={job.id}
            className={job.featured ? 'job-card featured' : 'job-card'}
          >
            {job.featured && <div className="featured-badge">Featured</div>}
            <div className="job-card-top">
              <div className="job-initials">
                {job.initials}
              </div>

              <div className="job-card-content">
                <div className="job-title-row">
                  <div className="job-title-text">
                    <h3>{job.title}</h3>
                    <p>{job.company}</p>
                  </div>

                  <div className="job-type">
                    {job.type}
                  </div>
                </div>

                <div className="job-details">
                  <span>{job.location}</span>
                  <span>{job.salary}</span>
                  <span>{job.time}</span>
                </div>

                <div className="job-tags">
                  {job.tags.map((tag) => (
                    <div key={tag} className="job-tag">
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {jobs.length > jobsPerPage && (
        <div className="jobs-pagination">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            {'<'}
          </button>

          <button
            className={page === 1 ? 'active-page' : ''}
            onClick={() => setPage(1)}
          >
            1
          </button>

          <button
            className={page === 2 ? 'active-page' : ''}
            onClick={() => setPage(2)}
          >
            2
          </button>

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            {'>'}
          </button>
        </div>
      )}
    </section>
  );
};


export default JobsCards;