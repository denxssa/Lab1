import React from 'react';
import Navbar from '../../components/shared/navbar/Navbar';
import JobsHero from '../../components/pages/jobsComps/JobsHero';
import JobsFilters from '../../components/pages/jobsComps/JobsFilters';

const Jobs = () => {
    return (
        <div className='jobs-page'>
            <Navbar />
            <JobsHero />
            <JobsFilters />
        </div>
    );
};

export default Jobs;