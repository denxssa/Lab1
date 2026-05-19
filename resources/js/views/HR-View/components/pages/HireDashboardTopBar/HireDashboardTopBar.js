import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './HireDashboardTopBar.scss';
import PostJobModal from '../PostJobModal/PostJobModal';
import { useHireDashboard } from '../../../HireDashboardContext';

const PAGE_NAMES = {
  '/hire-dashboard':                  'Overview',
  '/hire-dashboard/applications':     'Applications',
  '/hire-dashboard/listings':         'Active Listings',
  '/hire-dashboard/interviews':       'Interviews',
  '/hire-dashboard/hires':            'Hires',
  '/hire-dashboard/analytics':        'Analytics',
  '/hire-dashboard/messages':         'Messages',
  '/hire-dashboard/team':             'Team',
  '/hire-dashboard/settings':         'Settings',
};

const SEED_NOTIFS = [
  { id: 1, icon: '📄', text: 'Alex Rivera applied to Senior Frontend Dev',        time: '2m ago',  read: false },
  { id: 2, icon: '📅', text: 'Interview with Fatima Al-Zahra scheduled for 3 PM', time: '15m ago', read: false },
  { id: 3, icon: '💬', text: 'New message from Liam Nguyen',                       time: '1h ago',  read: false },
  { id: 4, icon: '👥', text: '3 new applications for UX Designer role',            time: '2h ago',  read: true  },
  { id: 5, icon: '✅', text: 'Priya Sharma accepted the offer letter',             time: '1d ago',  read: true  },
];

const BellIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

const HireDashboardTopBar = () => {
  const { refreshListings } = useHireDashboard();
  const location   = useLocation();
  const [notifs,       setNotifs]       = useState(SEED_NOTIFS);
  const [bellOpen,     setBellOpen]     = useState(false);
  const [showPostJob,  setShowPostJob]  = useState(false);
  const dropRef = useRef(null);
  const pageName = PAGE_NAMES[location.pathname] || 'Dashboard';
  const unread   = notifs.filter((n) => !n.read).length;

  // close dropdown on outside click
  useEffect(() => {
    if (!bellOpen) return;
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setBellOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [bellOpen]);

  const markRead = (id) => setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  const markAll  = ()   => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <>
      <div className="hire-topbar">
        <span className="hire-topbar-page">{pageName}</span>

        <div className="hire-topbar-right">
          {/* Bell */}
          <div className="hire-topbar-bell-wrap" ref={dropRef}>
            <button
              className={`hire-topbar-bell${bellOpen ? ' active' : ''}`}
              onClick={() => setBellOpen((o) => !o)}
              aria-label="Notifications"
            >
              <BellIcon />
              {unread > 0 && <span className="hire-bell-badge">{unread}</span>}
            </button>

            {bellOpen && (
              <div className="hire-notif-dropdown">
                <div className="hire-notif-head">
                  <span>Notifications</span>
                  {unread > 0 && (
                    <button className="hire-notif-mark-all" onClick={markAll}>
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="hire-notif-list">
                  {notifs.map((n) => (
                    <div
                      key={n.id}
                      className={`hire-notif-item${n.read ? '' : ' unread'}`}
                      onClick={() => markRead(n.id)}
                    >
                      <span className="hire-notif-icon">{n.icon}</span>
                      <div className="hire-notif-body">
                        <p>{n.text}</p>
                        <span>{n.time}</span>
                      </div>
                      {!n.read && <span className="hire-notif-dot" />}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Post a Job */}
          <button className="hire-topbar-post-btn" onClick={() => setShowPostJob(true)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Post a Job
          </button>
        </div>
      </div>

      {showPostJob && (
        <PostJobModal
          onClose={() => setShowPostJob(false)}
          onPosted={refreshListings}
        />
      )}
    </>
  );
};

export default HireDashboardTopBar;
