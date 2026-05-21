import React from 'react';
import { FiClipboard, FiInbox, FiCalendar, FiCheckCircle } from 'react-icons/fi';
import { usePlatformAdmin } from '../../../../../context/PlatformAdminContext';
import './HireDashboardStats.scss';

const iconMap = { FiClipboard, FiInbox, FiCalendar, FiCheckCircle };

const HireDashboardStats = ({ setActiveTab }) => {
  const { data } = usePlatformAdmin();
  const stats = data.hireDashboardCards.map((item, index) => {
    const Icon = iconMap[item.icon] || FiClipboard;
    return {
      ...item,
      action: index === 0 ? 'listings' : index === 1 ? 'all' : 'shortlisted',
      icon: <Icon color="#ffffff" size={22} />,
    };
  });

  const handleClick = (action) => {
    if (action === 'listings') {
      document.getElementById('hire-listings-anchor')?.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'all') {
      setActiveTab('All');
      document.getElementById('hire-applications-anchor')?.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'shortlisted') {
      setActiveTab('Shortlisted');
      document.getElementById('hire-applications-anchor')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hire-dashboard-stats-section">
      <div className="hire-stats-wrapper">
        {stats.map((s) => (
          <div key={s.label} className="hire-stat-card" onClick={() => handleClick(s.action)}>
            <div className="hire-stat-icon">{s.icon}</div>
            <div className="hire-stat-info">
              <div className="hire-stat-value">{s.value}</div>
              <div className="hire-stat-label">{s.label}</div>
              <div className="hire-stat-sub">{s.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HireDashboardStats;