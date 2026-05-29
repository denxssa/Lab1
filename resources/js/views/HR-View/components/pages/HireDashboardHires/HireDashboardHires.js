import React, { useEffect, useMemo, useState } from 'react';
import { useHireDashboard } from '../../../HireDashboardContext';
import CandidateProfileModal from '../CandidateProfileModal/CandidateProfileModal';
import {
  FaBuilding, FaMapMarkerAlt, FaDollarSign,
  FaCalendarAlt,
  FaEnvelope, FaUserCircle, FaCheckCircle, FaRegCircle,
  FaChevronDown, FaSearch,
} from 'react-icons/fa';
import { fetchHrHires } from '../../../../../api/hrApi';
import './HireDashboardHires.scss';

const DEFAULT_NEXT_STEPS = [
  { id: 'a', label: 'Send onboarding email',  done: false },
  { id: 'b', label: 'Set up equipment',        done: false },
  { id: 'c', label: 'Schedule team intro',     done: false },
];

const HireDashboardHires = () => {
  const { hiresVersion } = useHireDashboard();
  const [hires,        setHires]        = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [openMonth,    setOpenMonth]    = useState(null);
  const [search,       setSearch]       = useState('');
  const [steps,        setSteps]        = useState({});
  const [profileHire,  setProfileHire]  = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchHrHires()
      .then((data) => {
        setHires(data);
        const init = {};
        data.forEach((h) => {
          init[h.id] = (steps[h.id] || DEFAULT_NEXT_STEPS.map((s) => ({ ...s, id: `${h.id}-${s.id}` })));
        });
        setSteps(init);
      })
      .catch(() => setHires([]))
      .finally(() => setLoading(false));
  }, [hiresVersion]);

  const toggleStep = (hireId, stepId) => {
    setSteps((prev) => ({
      ...prev,
      [hireId]: (prev[hireId] || []).map((s) =>
        s.id === stepId ? { ...s, done: !s.done } : s
      ),
    }));
  };

  const filteredHires = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return hires;
    return hires.filter(
      (h) =>
        h.name?.toLowerCase().includes(q) ||
        h.role?.toLowerCase().includes(q) ||
        h.dept?.toLowerCase().includes(q)
    );
  }, [hires, search]);

  const totalHired   = hires.length;
  const startingSoon = 0; // not tracked yet
  const active       = hires.length;

  if (loading) {
    return (
      <section className="hire-dashboard-hires-section">
        <div className="hire-hires-wrapper">
          <p className="hire-hires-empty">Loading hires…</p>
        </div>
      </section>
    );
  }

  return (
    <>
    <section className="hire-dashboard-hires-section">
      <div className="hire-hires-wrapper">

        {/* ── Header ── */}
        <div className="hire-hires-header">
          <div>
            <h2>Hires</h2>
            <p>{totalHired} candidate{totalHired !== 1 ? 's' : ''} successfully hired</p>
          </div>
          <div className="hire-hires-stats">
            <div className="hire-hires-stat">
              <span className="hire-hires-stat-num">{totalHired}</span>
              <span className="hire-hires-stat-label">Total hired</span>
            </div>
            <div className="hire-hires-stat-divider" />
            <div className="hire-hires-stat">
              <span className="hire-hires-stat-num active">{active}</span>
              <span className="hire-hires-stat-label">Active</span>
            </div>
          </div>
        </div>

        <div className="hire-list-search">
          <FaSearch className="hire-search-icon" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search by name, role, or department…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button type="button" className="hire-search-clear" onClick={() => setSearch('')}>✕</button>
          )}
        </div>

        {hires.length === 0 && (
          <p className="hire-hires-empty">No hires yet. Candidates marked as hired will appear here.</p>
        )}

        {hires.length > 0 && filteredHires.length === 0 && (
          <p className="hire-hires-empty">No hires match your search.</p>
        )}

        <div className="hire-hires-list">
          {filteredHires.map((hire) => {
            const hireSteps = steps[hire.id] || [];
            const doneCount = hireSteps.filter((s) => s.done).length;
            const progress  = hireSteps.length > 0 ? Math.round((doneCount / hireSteps.length) * 100) : 0;

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
                    <div className="hire-hire-status status-active">{hire.status}</div>
                  </div>

                  <div className="hire-hire-divider" />

                  <div className="hire-hire-section">
                    <div className="hire-hire-section-title">Role Details</div>
                    <ul className="hire-hire-detail-list">
                      <li><FaBuilding     className="hire-hire-detail-icon" aria-hidden="true" /> {hire.dept}</li>
                      <li><FaMapMarkerAlt className="hire-hire-detail-icon" aria-hidden="true" /> {hire.location}</li>
                      <li><FaDollarSign   className="hire-hire-detail-icon" aria-hidden="true" /> {hire.salary}</li>
                    </ul>
                  </div>

                  <div className="hire-hire-divider" />

                  <div className="hire-hire-section">
                    <div className="hire-hire-section-title">Hire Info</div>
                    <ul className="hire-hire-detail-list">
                      <li><FaCalendarAlt className="hire-hire-detail-icon" aria-hidden="true" /> Hired: {hire.hiredDate}</li>
                    </ul>
                  </div>

                    <div className="hire-hire-divider" />

                  <div className="hire-hire-section">
                    <div className="hire-hire-section-title-row">
                      <span className="hire-hire-section-title">Next Steps</span>
                      <span className="hire-hire-progress-label">{doneCount}/{hireSteps.length}</span>
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
                    <button className="hire-hire-action-btn" type="button">
                      <FaEnvelope aria-hidden="true" /> Email
                    </button>
                    <button className="hire-hire-action-btn primary" type="button" onClick={() => setProfileHire(hire)}>
                      <FaUserCircle aria-hidden="true" /> View profile
                    </button>
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

        {/* ── Hiring History (grouped by month from real data) ── */}
        {hires.length > 0 && (
          <div className="hire-history">
            <div className="hire-history-header">
              <h3>Hiring History</h3>
              <p>Record of all hired candidates</p>
            </div>
            <div className="hire-history-list">
              {Object.entries(
                hires.reduce((acc, h) => {
                  const month = h.hiredDate
                    ? new Date(h.hiredDate).toLocaleString('en-US', { month: 'long', year: 'numeric' })
                    : 'Unknown';
                  if (!acc[month]) acc[month] = [];
                  acc[month].push(h);
                  return acc;
                }, {})
              ).map(([month, monthHires]) => {
                const isOpen = openMonth === month;
                return (
                  <div key={month} className={`hire-history-group ${isOpen ? 'open' : ''}`}>
                    <button
                      className="hire-history-month-row"
                      type="button"
                      onClick={() => setOpenMonth(isOpen ? null : month)}
                    >
                      <div className="hire-history-month-left">
                        <span className="hire-history-month-name">{month}</span>
                        <span className="hire-history-month-count">
                          {monthHires.length} {monthHires.length === 1 ? 'hire' : 'hires'}
                        </span>
                      </div>
                      <FaChevronDown className="hire-history-chevron" aria-hidden="true" />
                    </button>
                    {isOpen && (
                      <div className="hire-history-rows">
                        {monthHires.map((h) => (
                          <div key={h.id} className="hire-history-row">
                            <div className="hire-history-initials">{h.initials}</div>
                            <div className="hire-history-info">
                              <span className="hire-history-name">{h.name}</span>
                              <span className="hire-history-role">{h.role}</span>
                            </div>
                            <div className="hire-history-meta">
                              <span><FaBuilding aria-hidden="true" /> {h.dept}</span>
                              <span><FaDollarSign aria-hidden="true" /> {h.salary}</span>
                            </div>
                            <div className="hire-history-meta">
                              <span><FaCalendarAlt aria-hidden="true" /> {h.hiredDate}</span>
                            </div>
                            <span className="hire-history-status">Active</span>
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

    {profileHire && (
      <CandidateProfileModal
        candidate={{
          ...profileHire,
          company:    profileHire.dept,
          status:     'Hired',
          skills:     profileHire.skills     ?? [],
          history:    profileHire.history    ?? [{ stage: 'Applied', date: '—' }, { stage: 'Hired', date: profileHire.hiredDate ?? '—' }],
          summary:    profileHire.summary    ?? '',
          experience: profileHire.experience ?? '—',
          email:      profileHire.email      ?? '—',
        }}
        onClose={() => setProfileHire(null)}
      />
    )}
    </>
  );
};

export default HireDashboardHires;
