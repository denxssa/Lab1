import React from 'react';
import { FiBriefcase, FiDollarSign, FiClock, FiMonitor } from 'react-icons/fi';
import './JobPreferences.scss';

const JOB_TYPES = ['Remote', 'On-site', 'Hybrid'];
const AVAILABILITY = ['Immediately', '1 week notice', '2 weeks notice', '1 month notice'];

export default function JobPreferences({ form, onChange }) {
    return (
        <div className="job-preferences">
            <div className="job-preferences__header">
                <div className="job-preferences__icon">
                    <FiBriefcase size={18} />
                </div>
                <div>
                    <h3 className="job-preferences__title">Job preferences</h3>
                    <p className="job-preferences__subtitle">What you're looking for</p>
                </div>
            </div>
            <div className="job-preferences__body">
                <div className="job-preferences__badges">
                    {form.jobType && (
                        <span className="job-preferences__badge">
                            <FiMonitor size={12} /> {form.jobType}
                        </span>
                    )}
                    {form.expectedSalary && (
                        <span className="job-preferences__badge">
                            ${Number(form.expectedSalary).toLocaleString()}+ / yr
                        </span>
                    )}
                    {form.availability && (
                        <span className="job-preferences__badge job-preferences__badge--outline">
                            {form.availability}
                        </span>
                    )}
                </div>
                <div className="job-preferences__grid">
                    <div className="job-preferences__field">
                        <label><FiBriefcase size={13} /> Desired role</label>
                        <input
                            type="text"
                            value={form.desiredRole ?? ''}
                            onChange={(e) => onChange('desiredRole', e.target.value)}
                            placeholder="e.g. Senior Frontend Developer"
                        />
                    </div>
                    <div className="job-preferences__field">
                        <label>Job type</label>
                        <select
                            value={form.jobType ?? ''}
                            onChange={(e) => onChange('jobType', e.target.value)}
                        >
                            {JOB_TYPES.map(t => <option key={t}>{t}</option>)}
                        </select>
                    </div>
                    <div className="job-preferences__field">
                        <label><FiDollarSign size={13} /> Expected salary (USD/yr)</label>
                        <input
                            type="number"
                            value={form.expectedSalary ?? ''}
                            onChange={(e) => onChange('expectedSalary', e.target.value)}
                            placeholder="45000"
                        />
                    </div>
                    <div className="job-preferences__field">
                        <label><FiClock size={13} /> Availability</label>
                        <select
                            value={form.availability ?? ''}
                            onChange={(e) => onChange('availability', e.target.value)}
                        >
                            {AVAILABILITY.map(a => <option key={a}>{a}</option>)}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}