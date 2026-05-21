import React from 'react';
import { Outlet } from 'react-router-dom';
import './components/shared/AdminShared.scss';
import TopBar from './components/shared/TopBar/TopBar';
import AdminSideBar from './components/shared/Sidebar/AdminSidebar';

const AdminViewLayout = () => {
  return (
    <div className="admin-layout">
      <AdminSideBar />
      <div className="admin-layout-content">
        <TopBar />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminViewLayout;
