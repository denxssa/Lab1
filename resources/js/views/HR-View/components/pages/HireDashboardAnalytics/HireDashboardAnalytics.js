import React, { useState } from 'react';
import { FaBriefcase, FaClock, FaPercent, FaUsers } from 'react-icons/fa';
import './HireDashboardAnalytics.scss';

const stats = [
  { label: 'Total Applications', value: '48',   change: '+12%',  up: true,  icon: FaUsers     },
  { label: 'Conversion Rate',    value: '6.3%',  change: '+2.1%', up: true,  icon: FaPercent   },
  { label: 'Avg. Time to Hire',  value: '18d',   change: '-3d',   up: true,  icon: FaClock     },
  { label: 'Active Jobs',        value: '16',    change: '+4',    up: true,  icon: FaBriefcase },
];

const byJob = [
  { title: 'Senior Frontend Dev', apps: 12 },
  { title: 'UX/UI Designer',      apps: 9  },
  { title: 'Backend Engineer',    apps: 8  },
  { title: 'Data Scientist',      apps: 7  },
  { title: 'DevOps Engineer',     apps: 5  },
  { title: 'Marketing Manager',   apps: 4  },
  { title: 'Financial Analyst',   apps: 3  },
];

const funnel = [
  { label: 'Applied',     value: 48 },
  { label: 'Shortlisted', value: 18 },
  { label: 'Interviewed', value: 12 },
  { label: 'Hired',       value: 3  },
];

const monthly = [
  { month: 'Dec', apps: 4  },
  { month: 'Jan', apps: 7  },
  { month: 'Feb', apps: 9  },
  { month: 'Mar', apps: 13 },
  { month: 'Apr', apps: 18 },
  { month: 'May', apps: 11 },
];

const maxApps    = Math.max(...byJob.map(j => j.apps));
const maxMonthly = Math.max(...monthly.map(m => m.apps));


const HireDashboardAnalytics = () => {
  const [range, setRange] = useState('6mo');

  return (
    <section className="hire-analytics-section">
      <div className="hire-analytics-wrapper">

        <div className="hire-analytics-header">
          <div>
            <h1>Analytics</h1>
            <p>Track your hiring performance and trends.</p>
          </div>
          <div className="hire-analytics-range">
            {['30d', '3mo', '6mo', '1yr'].map(r => (
              <button
                key={r}
                className={`hire-range-btn${range === r ? ' active' : ''}`}
                onClick={() => setRange(r)}
              >{r}</button>
            ))}
          </div>
        </div>

        {/* ── Stat cards ── */}
        <div className="hire-analytics-stats">
          {stats.map((s) => (
            <div key={s.label} className="hire-analytics-stat">
              <div className="hire-analytics-stat-top">
                <span className="hire-analytics-stat-label">{s.label}</span>
                <div className="hire-analytics-stat-icon">
                  <s.icon aria-hidden="true" />
                </div>
              </div>
              <span className="hire-analytics-stat-value">{s.value}</span>
              <span className={`hire-analytics-stat-change ${s.up ? 'up' : 'down'}`}>
                {s.up ? '↑' : '↓'} {s.change} vs last month
              </span>
            </div>
          ))}
        </div>

        <div className="hire-analytics-row">

          {/* ── Applications by Job ── */}
          <div className="hire-analytics-card">
            <h3>Applications by Job</h3>
            <div className="hire-bar-chart">
              {byJob.map((j) => (
                <div key={j.title} className="hire-bar-row">
                  <span className="hire-bar-label">{j.title}</span>
                  <div className="hire-bar-track">
                    <div
                      className={`hire-bar-fill${j.apps === maxApps ? ' peak' : ''}`}
                      style={{ width: `${(j.apps / maxApps) * 100}%` }}
                    />
                  </div>
                  <span className="hire-bar-value">{j.apps}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Hiring Funnel ── */}
          <div className="hire-analytics-card">
            <h3>Hiring Funnel</h3>
            <div className="hire-funnel">
              {funnel.map((f, i) => (
                <div key={f.label} className="hire-funnel-step">
                  <div className="hire-funnel-row-header">
                    <span className="hire-funnel-label">{f.label}</span>
                    <span className="hire-funnel-count">{f.value}</span>
                  </div>
                  <div className="hire-funnel-track">
                    <div
                      className={`hire-funnel-fill step-${i}`}
                      style={{ width: `${(f.value / funnel[0].value) * 100}%` }}
                    />
                  </div>
                  {i < funnel.length - 1 && (
                    <span className="hire-funnel-pct">
                      {Math.round((funnel[i + 1].value / f.value) * 100)}% moved to next stage
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── Applications Over Time ── */}
        <div className="hire-analytics-card hire-analytics-card--full">
          <h3>Applications Over Time</h3>
          <div className="hire-trend-chart">
            {monthly.map((m, i) => {
              const isCurrent = i === monthly.length - 1;
              return (
                <div key={m.month} className={`hire-trend-col${isCurrent ? ' current' : ''}`}>
                  <span className="hire-trend-value">{m.apps}</span>
                  <div className="hire-trend-track">
                    <div
                      className="hire-trend-fill"
                      style={{ height: `${(m.apps / maxMonthly) * 100}%` }}
                    />
                  </div>
                  <span className="hire-trend-month">{m.month}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HireDashboardAnalytics;
