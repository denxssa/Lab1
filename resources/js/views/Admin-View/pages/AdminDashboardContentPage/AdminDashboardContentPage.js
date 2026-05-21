import React from 'react';
import AdminDashboardContent from '../../components/pages/AdminDashboardContent/AdminDashboardContent';
import AdminSideBar from '../../components/shared/Sidebar/AdminSidebar';
import LinksTable from '../../components/pages/LinksTable/LinksTable';

const AdminDashboardContentPage = () => {
    return (
        <div>
            <AdminSideBar/>
            <AdminDashboardContent />
            <LinksTable/>
        </div>
    );
};

export default AdminDashboardContentPage;