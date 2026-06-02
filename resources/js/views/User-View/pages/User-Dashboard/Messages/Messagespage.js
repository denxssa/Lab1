import React from 'react';
import UserDashboardLayout from '../../../components/dashboard/shared/UserDashboardLayout/UserDashboardLayout';
import UserDashboardMessages from '../../../components/dashboard/pages/messages/UserDashboardMessages';

const MessagesPage = () => {
    return (
        <UserDashboardLayout>
            <UserDashboardMessages />
        </UserDashboardLayout>
    );
};

export default MessagesPage;
