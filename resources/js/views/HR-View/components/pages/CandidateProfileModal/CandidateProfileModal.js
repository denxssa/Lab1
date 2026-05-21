import React from 'react';
import './CandidateProfileModal.scss';

const CandidateProfileModal = ({ candidate, onClose, onSchedule, onOffer, onReject }) => {
  if (!candidate) return null;

  const stageIcon = (stage) => {
    if (stage === 'Applied')     return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
    );
    if (stage === 'Reviewed')    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
    );
    if (stage === 'Shortlisted') return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    );
    if (stage === 'Hired')       return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
    );
    if (stage === 'Rejected')    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    );
    return <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />;
  };

  return (
    <div className="cpm-overlay" onClick={onClose}>
      <div className="cpm-modal" onClick={(e) => e.stopPropagation()}>

        {/* ── Header ── */}
        <div className="cpm-header">
          <div className="cpm-avatar">{candidate.initials}</div>
          <div className="cpm-identity">
            <h2>{candidate.name}</h2>
            <p>{candidate.role} · {candidate.company}</p>
            <span className={`cpm-status-badge status-${candidate.status.toLowerCase()}`}>
              {candidate.status}
            </span>
          </div>
          <button className="cpm-close" onClick={onClose}>✕</button>
        </div>

        <div className="cpm-body">

          {/* ── Left column ── */}
          <div className="cpm-left">

            <div className="cpm-section">
              <h4>Contact</h4>
              <div className="cpm-contact-list">
                <div className="cpm-contact-row">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <span>{candidate.email}</span>
                </div>
                <div className="cpm-contact-row">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.85a16 16 0 0 0 6.07 6.07l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <span>{candidate.phone}</span>
                </div>
                <div className="cpm-contact-row">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>{candidate.location}</span>
                </div>
                <div className="cpm-contact-row">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  <span>{candidate.linkedin}</span>
                </div>
              </div>
            </div>

            <div className="cpm-section">
              <h4>Experience</h4>
              <p className="cpm-experience">{candidate.experience} experience</p>
            </div>

            <div className="cpm-section">
              <h4>Skills</h4>
              <div className="cpm-skills">
                {candidate.skills.map((s) => (
                  <span key={s} className="cpm-skill">{s}</span>
                ))}
              </div>
            </div>

            <div className="cpm-section">
              <h4>Application Timeline</h4>
              <div className="cpm-timeline">
                {(candidate.history || []).map((h, i) => (
                  <div key={i} className="cpm-timeline-row">
                    <div className="cpm-timeline-icon-wrap">{stageIcon(h.stage)}</div>
                    <div className="cpm-timeline-info">
                      <span className="cpm-timeline-stage">{h.stage}</span>
                      <span className="cpm-timeline-date">{h.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── Right column ── */}
          <div className="cpm-right">

            <div className="cpm-section">
              <h4>About</h4>
              <p className="cpm-summary">{candidate.summary}</p>
            </div>

            <div className="cpm-section">
              <h4>Resume Highlights</h4>
              <div className="cpm-resume-block">
                <div className="cpm-resume-item">
                  <div className="cpm-resume-dot" />
                  <span>Applied for <strong>{candidate.appliedRole}</strong></span>
                </div>
                <div className="cpm-resume-item">
                  <div className="cpm-resume-dot" />
                  <span>{candidate.experience} of relevant industry experience</span>
                </div>
                {candidate.skills.slice(0, 3).map((s) => (
                  <div key={s} className="cpm-resume-item">
                    <div className="cpm-resume-dot" />
                    <span>Proficient in <strong>{s}</strong></span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── Actions ── */}
        <div className="cpm-footer">
          <button className="cpm-action-secondary" onClick={onSchedule}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Schedule Interview
          </button>
          <button className="cpm-action-offer" onClick={onOffer}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Send Offer
          </button>
          <button className="cpm-action-reject" onClick={onReject}>
            Send Rejection
          </button>
        </div>

      </div>
    </div>
  );
};

export default CandidateProfileModal;
