
import React from 'react';
import Navbar from '../../components/shared/navbar/Navbar';
import JobsHero from '../../components/pages/JobsHero/JobsHero';
import JobsFilters from '../../components/pages/JobsFilters/JobsFilters';
import JobsCards from '../../components/pages/JobsCards/JobsCards';
import Footer from '../../components/shared/footer/Footer';



const Jobs = () => {
  return (
    <div className="jobs-page">
      <Navbar />
      <JobsHero />
      <JobsFilters />
      <JobsCards />
      <Footer/>
    </div>
  );
};

export default Jobs;