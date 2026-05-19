import React from 'react';
import UserDashboardLayout from '../../../components/dashboard/shared/UserDashboardLayout/UserDashboardLayout';
import UnfinishedJobs from '../../../components/dashboard/pages/unfinished-jobs/UnfinishedJobs';


const UnfinishedJob = () => {
    return (
        <UserDashboardLayout>
            <UnfinishedJobs/>
        </UserDashboardLayout>
    );
};

export default UnfinishedJob;
