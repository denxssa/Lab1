import React from 'react';
import { Outlet } from 'react-router-dom';
import { HireDashboardProvider } from './HireDashboardContext';
import HireDashboardSidebar from './components/pages/HireDashboardSidebar/HireDashboardSidebar';
import HireDashboardTopBar from './components/pages/HireDashboardTopBar/HireDashboardTopBar';

const HRViewLayout = () => {
  return (
    <HireDashboardProvider>
      <div className="hire-layout">
        <HireDashboardSidebar />
        <div className="hire-layout-content">
          <HireDashboardTopBar />
          <Outlet />
        </div>
      </div>
    </HireDashboardProvider>
  );
};

export default HRViewLayout;
