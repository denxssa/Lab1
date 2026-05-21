import React, { useState } from 'react';
import {
  FaBuilding, FaMapMarkerAlt, FaClock, FaDollarSign,
  FaCalendarAlt, FaUserTie, FaStar,
  FaEnvelope, FaUserCircle, FaCheckCircle, FaRegCircle,
  FaChevronDown,
} from 'react-icons/fa';
import './HireDashboardHires.scss';

const historyData = [
  {
    month: 'April 2026',
    count: 2,
    hires: [
      { id: 'h1', initials: 'MC', name: 'Marcus Chen',   role: 'DevOps Engineer',            hiredBy: 'Sarah K.', date: 'Apr 18, 2026', dept: 'Engineering dept.', salary: '$128k / yr' },
      { id: 'h2', initials: 'SI', name: 'Sofia Iannone', role: 'Digital Marketing Manager',  hiredBy: 'James R.', date: 'Apr 7, 2026',  dept: 'Marketing dept.',   salary: '$95k / yr'  },
    ],
  },
  {
    month: 'March 2026',
    count: 3,
    hires: [
      { id: 'h3', initials: 'PW', name: 'Patrick Walsh',   role: 'Backend Engineer',     hiredBy: 'Mike T.',   date: 'Mar 24, 2026', dept: 'Engineering dept.', salary: '$132k / yr' },
      { id: 'h4', initials: 'YK', name: 'Yuki Kobayashi',  role: 'Product Designer',     hiredBy: 'Sarah K.',  date: 'Mar 14, 2026', dept: 'Design dept.',      salary: '$110k / yr' },
      { id: 'h5', initials: 'OA', name: 'Olivia Adams',    role: 'Data Analyst',          hiredBy: 'James R.',  date: 'Mar 3, 2026',  dept: 'Data dept.',        salary: '$98k / yr'  },
    ],
  },
  {
    month: 'February 2026',
    count: 1,
    hires: [
      { id: 'h6', initials: 'RB', name: 'Rafael Branco', role: 'iOS Developer', hiredBy: 'Mike T.', date: 'Feb 19, 2026', dept: 'Engineering dept.', salary: '$120k / yr' },
    ],
  },
];

const initialHires = [
  {
    id: 1,
    name: 'Alex Rivera',
    role: 'Senior Frontend Developer',
    initials: 'AR',
    status: 'Starting Soon',
    details: [
      { icon: FaBuilding,      label: 'Engineering dept.' },
      { icon: FaMapMarkerAlt,  label: 'Remote' },
      { icon: FaClock,         label: 'Full-time' },
      { icon: FaDollarSign,    label: '$140k / yr' },
    ],
    offer: [
      { icon: FaCalendarAlt,  label: 'Start date: May 5, 2026' },
      { icon: FaUserTie,      label: 'Hired by Sarah K.' },
      { icon: FaStar,         label: '6 years experience' },
    ],
    nextSteps: [
      { id: 'a1', label: 'Send onboarding email',  done: false },
      { id: 'a2', label: 'Set up equipment',        done: false },
      { id: 'a3', label: 'Schedule team intro',     done: false },
    ],
  },
  {
    id: 2,
    name: 'Fatima Al-Zahra',
    role: 'Data Scientist',
    initials: 'FA',
    status: 'Starting Soon',
    details: [
      { icon: FaBuilding,      label: 'Data dept.' },
      { icon: FaMapMarkerAlt,  label: 'New York, NY' },
      { icon: FaClock,         label: 'Full-time' },
      { icon: FaDollarSign,    label: '$148k / yr' },
    ],
    offer: [
      { icon: FaCalendarAlt,  label: 'Start date: May 12, 2026' },
      { icon: FaUserTie,      label: 'Hired by Mike T.' },
      { icon: FaStar,         label: '4 years experience' },
    ],
    nextSteps: [
      { id: 'b1', label: 'Send onboarding email',  done: false },
      { id: 'b2', label: 'Arrange office access',  done: false },
      { id: 'b3', label: 'Assign mentor',           done: false },
    ],
  },
  {
    id: 3,
    name: 'Liam Nguyen',
    role: 'Mobile App Developer',
    initials: 'LN',
    status: 'Active',
    details: [
      { icon: FaBuilding,      label: 'Engineering dept.' },
      { icon: FaMapMarkerAlt,  label: 'Austin, TX' },
      { icon: FaClock,         label: 'Full-time' },
      { icon: FaDollarSign,    label: '$115k / yr' },
    ],
    offer: [
      { icon: FaCalendarAlt,  label: 'Started: Apr 14, 2026' },
      { icon: FaUserTie,      label: 'Hired by Sarah K.' },
      { icon: FaStar,         label: '3 years experience' },
    ],
    nextSteps: [
      { id: 'c1', label: 'Complete onboarding docs', done: true },
      { id: 'c2', label: 'First sprint assigned',    done: true },
      { id: 'c3', label: 'Meet the team',             done: true },
    ],
  },
];

const HireDashboardHires = () => {
  const [hires, setHires] = useState(initialHires);
  const [openMonth, setOpenMonth] = useState('April 2026');

  const toggleStep = (hireId, stepId) => {
    setHires((prev) =>
      prev.map((h) =>
        h.id !== hireId ? h : {
          ...h,
          nextSteps: h.nextSteps.map((s) =>
            s.id === stepId ? { ...s, done: !s.done } : s
          ),
        }
      )
    );
  };

  const totalHired    = hires.length;
  const startingSoon  = hires.filter((h) => h.status === 'Starting Soon').length;
  const active        = hires.filter((h) => h.status === 'Active').length;

  return (
    <section className="hire-dashboard-hires-section">
      <div className="hire-hires-wrapper">

        <div className="hire-hires-header">
          <div>
            <h2>Hires This Month</h2>
            <p>{totalHired} candidates successfully hired</p>
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

        <div className="hire-hires-list">
          {hires.map((hire) => {
            const doneCount = hire.nextSteps.filter((s) => s.done).length;
            const progress  = Math.round((doneCount / hire.nextSteps.length) * 100);

            return (
              <div key={hire.id} className="hire-hire-card">

                <div className="hire-hire-banner">
                  <div className="hire-hire-avatar">
                    {hire.initials}
                  </div>
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
                      {hire.details.map((item, i) => (
                        <li key={i}>
                          <item.icon className="hire-hire-detail-icon" aria-hidden="true" />
                          {item.label}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="hire-hire-divider" />

                  <div className="hire-hire-section">
                    <div className="hire-hire-section-title">Hire Info</div>
                    <ul className="hire-hire-detail-list">
                      {hire.offer.map((item, i) => (
                        <li key={i}>
                          <item.icon className="hire-hire-detail-icon" aria-hidden="true" />
                          {item.label}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="hire-hire-divider" />

                  <div className="hire-hire-section">
                    <div className="hire-hire-section-title-row">
                      <span className="hire-hire-section-title">Next Steps</span>
                      <span className="hire-hire-progress-label">{doneCount}/{hire.nextSteps.length}</span>
                    </div>
                    <div className="hire-hire-progress-bar">
                      <div className="hire-hire-progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                    <ul className="hire-hire-steps-list">
                      {hire.nextSteps.map((step) => (
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
                    <button className="hire-hire-action-btn primary" type="button">
                      <FaUserCircle aria-hidden="true" /> View profile
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        <div className="hire-history">
          <div className="hire-history-header">
            <h3>Hiring History</h3>
            <p>Record of all past hires by month</p>
          </div>

          <div className="hire-history-list">
            {historyData.map((month) => {
              const isOpen = openMonth === month.month;
              return (
                <div key={month.month} className={`hire-history-group ${isOpen ? 'open' : ''}`}>
                  <button
                    className="hire-history-month-row"
                    type="button"
                    onClick={() => setOpenMonth(isOpen ? null : month.month)}
                  >
                    <div className="hire-history-month-left">
                      <span className="hire-history-month-name">{month.month}</span>
                      <span className="hire-history-month-count">{month.count} {month.count === 1 ? 'hire' : 'hires'}</span>
                    </div>
                    <FaChevronDown className="hire-history-chevron" aria-hidden="true" />
                  </button>

                  {isOpen && (
                    <div className="hire-history-rows">
                      {month.hires.map((hire) => (
                        <div key={hire.id} className="hire-history-row">
                          <div className="hire-history-initials">{hire.initials}</div>
                          <div className="hire-history-info">
                            <span className="hire-history-name">{hire.name}</span>
                            <span className="hire-history-role">{hire.role}</span>
                          </div>
                          <div className="hire-history-meta">
                            <span><FaBuilding aria-hidden="true" /> {hire.dept}</span>
                            <span><FaDollarSign aria-hidden="true" /> {hire.salary}</span>
                          </div>
                          <div className="hire-history-meta">
                            <span><FaCalendarAlt aria-hidden="true" /> {hire.date}</span>
                            <span><FaUserTie aria-hidden="true" /> {hire.hiredBy}</span>
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

      </div>
    </section>
  );
};

export default HireDashboardHires;
