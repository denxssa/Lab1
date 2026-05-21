import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiMail } from 'react-icons/fi';
import '../../shared/AdminShared.scss';
import './TopBar.scss';

const names = {
  '/admin-dashboard': 'Admin Overview',
  '/admin-dashboard/content': 'Content',
  '/admin-dashboard/users': 'HR Profiles',
  '/admin-dashboard/reports': 'Reports',
  '/admin-dashboard/logs': 'Activity Logs',
  '/admin-dashboard/settings': 'Platform Settings',
  '/admin-dashboard/team': 'Team Members',
  '/admin-dashboard/pricing': 'Pricing Plans',
};

const backLinks = {
  '/admin-dashboard/team': { label: 'About Us', path: '/admin-dashboard/content' },
  '/admin-dashboard/pricing': { label: 'Pricing', path: '/admin-dashboard/content' },
};

const TopBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const back = backLinks[location.pathname];

  return (
    <header className="admin-topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {back && (
          <button className="admin-btn admin-btn-light" onClick={() => navigate(back.path)} style={{ padding: '6px 12px' }}>
            <FiArrowLeft />
          </button>
        )}
        <span className="admin-topbar-page">{names[location.pathname] || 'Admin Dashboard'}</span>
      </div>
      <button className="admin-btn admin-btn-accent" onClick={() => navigate('/admin-dashboard/users')}>
        <FiMail />
        Invite HR
      </button>
    </header>
  );
};

export default TopBar;
