import React from 'react';
import AdminSideBar from '../../components/shared/Sidebar/AdminSidebar';
import CreateHRProfile from '../../components/pages/CreateProfile/CreateHRProfile';
import CreateUser from '../../components/pages/CreateUser/CreateUser';
const AdminDashboardUsersPage = () => {
    return (
        <div>
            <AdminSideBar/>
            <CreateHRProfile/>
            <CreateUser/>
        </div>
    );
};

export default AdminDashboardUsersPage;