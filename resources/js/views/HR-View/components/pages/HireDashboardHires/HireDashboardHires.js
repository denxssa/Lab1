import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import {
  FaBuilding, FaMapMarkerAlt, FaClock, FaDollarSign,
  FaCalendarAlt, FaUserTie,
  FaEnvelope, FaUserCircle, FaCheckCircle, FaRegCircle,
  FaChevronDown, FaTrash,
} from 'react-icons/fa';
import CandidateProfileModal from '../CandidateProfileModal/CandidateProfileModal';
import './HireDashboardHires.scss';

const DEFAULT_STEPS = [
  { id: 's1', label: 'Send onboarding email',  done: false },
  { id: 's2', label: 'Set up equipment',        done: false },
  { id: 's3', label: 'Schedule team intro',     done: false },
];

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function groupByMonth(hires) {
  const groups = {};
  hires.forEach((h) => {
    const label = h.hired_at
      ? new Date(h.hired_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      : 'Unknown';
    if (!groups[label]) groups[label] = [];
    groups[label].push(h);
  });
  return Object.entries(groups).map(([month, items]) => ({ month, hires: items }));
}

const HireDashboardHires = () => {
  const [hires,       setHires]       = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [sort,        setSort]        = useState('newest');
  const [openMonth,   setOpenMonth]   = useState(null);
  const [steps,       setSteps]       = useState({});
  const [profileFor,  setProfileFor]  = useState(null);
  const [removing,    setRemoving]    = useState(null);

  useEffect(() => {
    axios.get('/api/hires')
      .then((res) => {
        const data = res.data.hires ?? [];
        setHires(data);
        if (data.length > 0) {
          const first = groupByMonth([...data].sort((a, b) => new Date(b.hired_at) - new Date(a.hired_at)));
          setOpenMonth(first[0]?.month ?? null);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const sorted = useMemo(() => {
    const copy = [...hires];
    if (sort === 'newest') return copy.sort((a, b) => new Date(b.hired_at) - new Date(a.hired_at));
    if (sort === 'oldest') return copy.sort((a, b) => new Date(a.hired_at) - new Date(b.hired_at));
    if (sort === 'az')     return copy.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'za')     return copy.sort((a, b) => b.name.localeCompare(a.name));
    return copy;
  }, [hires, sort]);

  const historyGroups = useMemo(() => {
    const byNewest = [...hires].sort((a, b) => new Date(b.hired_at) - new Date(a.hired_at));
    return groupByMonth(byNewest);
  }, [hires]);

  const totalHired   = hires.length;
  const startingSoon = hires.filter((h) => h.status === 'Starting Soon').length;
  const active       = hires.filter((h) => h.status === 'Active').length;

  const getSteps = (id) => steps[id] ?? DEFAULT_STEPS;

  const toggleStep = (hireId, stepId) => {
    setSteps((prev) => {
      const current = prev[hireId] ?? DEFAULT_STEPS;
      return {
        ...prev,
        [hireId]: current.map((s) => s.id === stepId ? { ...s, done: !s.done } : s),
      };
    });
  };

  const removeHire = async (hire) => {
    if (!window.confirm(`Remove ${hire.name} from hires?`)) return;
    setRemoving(hire.id);
    try {
      await axios.delete(`/api/hires/${hire.id}`);
      setHires((prev) => prev.filter((h) => h.id !== hire.id));
    } finally {
      setRemoving(null);
    }
  };

  const openProfile = (hire) => {
    const nameParts = hire.name.split(' ');
    setProfileFor({
      initials: hire.initials,
      name:     hire.name,
      role:     hire.role,
      company:  hire.company,
      email:    hire.email,
      phone:    null,
      status:   'Hired',
      location: hire.location,
      skills:   [],
      timeline: [],
      about:    null,
    });
  };

  if (loading) {
    return (
      <section className="hire-dashboard-hires-section">
        <div className="hire-hires-wrapper">
          <p style={{ color: '#7a746d', fontSize: 14 }}>Loading hires…</p>
        </div>
      </section>
    );
  }

  return (
    <section className="hire-dashboard-hires-section">
      <div className="hire-hires-wrapper">

        {/* ── Header ── */}
        <div className="hire-hires-header">
          <div>
            <h2>Hires</h2>
            <p>{totalHired} {totalHired === 1 ? 'candidate' : 'candidates'} successfully hired</p>
          </div>
          <div className="hire-hires-stats">
            <div className="hire-hires-stat">
              <span className="hire-hires-stat-num">{totalHired}</span>
              <span className="hire-hires-stat-label">Total hired</span>
            </div>
            <div className="hire-hires-stat-divider" />
            <div className="hire-hires-stat">
              <span className="hire-hires-stat-num starting">{startingSoon}</span>
              <span className="hire-hires-stat-label">Starting soon</span>
            </div>
            <div className="hire-hires-stat-divider" />
            <div className="hire-hires-stat">
              <span className="hire-hires-stat-num active">{active}</span>
              <span className="hire-hires-stat-label">Active</span>
            </div>
          </div>
        </div>

        {/* ── Sort filter ── */}
        <div className="hire-hires-toolbar">
          <select
            className="hire-hires-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Most recent first</option>
            <option value="oldest">Oldest first</option>
            <option value="az">Name A–Z</option>
            <option value="za">Name Z–A</option>
          </select>
        </div>

        {/* ── Cards ── */}
        {sorted.length === 0 ? (
          <p className="hire-hires-empty">No hires yet.</p>
        ) : (
          <div className="hire-hires-list">
            {sorted.map((hire) => {
              const hireSteps = getSteps(hire.id);
              const doneCount = hireSteps.filter((s) => s.done).length;
              const progress  = Math.round((doneCount / hireSteps.length) * 100);

              return (
                <div key={hire.id} className="hire-hire-card">

                  <div className="hire-hire-banner">
                    <div className="hire-hire-avatar">{hire.initials}</div>
                  </div>

                  <div className="hire-hire-card-body">
                    <div className="hire-hire-card-top">
                      <div className="hire-hire-identity">
                        <div className="hire-hire-name">{hire.name}</div>
                        <div className="hire-hire-role">{hire.role}</div>
                      </div>
                      <div className={`hire-hire-status status-${hire.status.toLowerCase().replace(' ', '-')}`}>
                        {hire.status}
                      </div>
                    </div>

                    <div className="hire-hire-divider" />

                    <div className="hire-hire-section">
                      <div className="hire-hire-section-title">Role Details</div>
                      <ul className="hire-hire-detail-list">
                        <li><FaBuilding     className="hire-hire-detail-icon" aria-hidden="true" />{hire.company}</li>
                        <li><FaMapMarkerAlt className="hire-hire-detail-icon" aria-hidden="true" />{hire.location}</li>
                        <li><FaClock        className="hire-hire-detail-icon" aria-hidden="true" />{hire.employment_type}</li>
                        <li><FaDollarSign   className="hire-hire-detail-icon" aria-hidden="true" />{hire.salary}</li>
                      </ul>
                    </div>

                    <div className="hire-hire-divider" />

                    <div className="hire-hire-section">
                      <div className="hire-hire-section-title">Hire Info</div>
                      <ul className="hire-hire-detail-list">
                        <li><FaCalendarAlt className="hire-hire-detail-icon" aria-hidden="true" />Hired: {formatDate(hire.hired_at)}</li>
                        <li><FaUserTie     className="hire-hire-detail-icon" aria-hidden="true" />Hired by {hire.hired_by}</li>
                      </ul>
                    </div>

                    <div className="hire-hire-divider" />

                    <div className="hire-hire-section">
                      <div className="hire-hire-section-title-row">
                        <span className="hire-hire-section-title">Next Steps</span>
                        <span className="hire-hire-progress-label">{doneCount}/{hireSteps.length}</span>
                      </div>
                      <div className="hire-hire-progress-bar">
                        <div className="hire-hire-progress-fill" style={{ width: `${progress}%` }} />
                      </div>
                      <ul className="hire-hire-steps-list">
                        {hireSteps.map((step) => (
                          <li
                            key={step.id}
                            className={step.done ? 'done' : ''}
                            onClick={() => toggleStep(hire.id, step.id)}
                          >
                            {step.done
                              ? <FaCheckCircle className="step-icon checked" aria-hidden="true" />
                              : <FaRegCircle   className="step-icon"         aria-hidden="true" />
                            }
                            {step.label}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="hire-hire-actions">
                      <button
                        className="hire-hire-action-btn"
                        type="button"
                        onClick={() => openProfile(hire)}
                      >
                        <FaUserCircle aria-hidden="true" /> View profile
                      </button>
                      <button
                        className="hire-hire-action-btn"
                        type="button"
                        onClick={() => window.location.href = `mailto:${hire.email}`}
                      >
                        <FaEnvelope aria-hidden="true" /> Email
                      </button>
                      <button
                        className="hire-hire-action-btn danger"
                        type="button"
                        disabled={removing === hire.id}
                        onClick={() => removeHire(hire)}
                      >
                        <FaTrash aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* ── Hiring History ── */}
        {historyGroups.length > 0 && (
          <div className="hire-history">
            <div className="hire-history-header">
              <h3>Hiring History</h3>
              <p>Record of all hires grouped by month</p>
            </div>

            <div className="hire-history-list">
              {historyGroups.map((group) => {
                const isOpen = openMonth === group.month;
                return (
                  <div key={group.month} className={`hire-history-group ${isOpen ? 'open' : ''}`}>
                    <button
                      className="hire-history-month-row"
                      type="button"
                      onClick={() => setOpenMonth(isOpen ? null : group.month)}
                    >
                      <div className="hire-history-month-left">
                        <span className="hire-history-month-name">{group.month}</span>
                        <span className="hire-history-month-count">
                          {group.hires.length} {group.hires.length === 1 ? 'hire' : 'hires'}
                        </span>
                      </div>
                      <FaChevronDown className="hire-history-chevron" aria-hidden="true" />
                    </button>

                    {isOpen && (
                      <div className="hire-history-rows">
                        {group.hires.map((hire) => (
                          <div key={hire.id} className="hire-history-row">
                            <div className="hire-history-initials">{hire.initials}</div>
                            <div className="hire-history-info">
                              <span className="hire-history-name">{hire.name}</span>
                              <span className="hire-history-role">{hire.role}</span>
                            </div>
                            <div className="hire-history-meta">
                              <span><FaBuilding   aria-hidden="true" /> {hire.company}</span>
                              <span><FaDollarSign aria-hidden="true" /> {hire.salary}</span>
                            </div>
                            <div className="hire-history-meta">
                              <span><FaCalendarAlt aria-hidden="true" /> {formatDate(hire.hired_at)}</span>
                              <span><FaUserTie     aria-hidden="true" /> {hire.hired_by}</span>
                            </div>
                            <span className={`hire-history-status status-${hire.status.toLowerCase().replace(' ', '-')}`}>
                              {hire.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {profileFor && (
        <CandidateProfileModal
          candidate={profileFor}
          onClose={() => setProfileFor(null)}
        />
      )}
    </section>
  );
};

export default HireDashboardHires;
