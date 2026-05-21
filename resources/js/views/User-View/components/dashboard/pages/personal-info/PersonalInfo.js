import React from 'react';
import { FiEdit2, FiMail, FiPhone, FiMapPin, FiCalendar, FiFlag } from 'react-icons/fi';
import './PersonalInfo.scss';

export default function PersonalInfo({ form, onChange }) {
    const field = (key) => ({
        value: form[key] ?? '',
        onChange: (e) => onChange(key, e.target.value),
    });

    return (
        <div className="personal-info">
            <div className="personal-info__header">
                <div className="personal-info__icon">
                    <FiEdit2 size={18} />
                </div>
                <div>
                    <h3 className="personal-info__title">Personal information</h3>
                    <p className="personal-info__subtitle">Basic details about you</p>
                </div>
            </div>
            <div className="personal-info__body">
                <div className="personal-info__grid">
                    <div className="personal-info__field">
                        <label>First name</label>
                        <input type="text" {...field('firstName')} />
                    </div>
                    <div className="personal-info__field">
                        <label>Last name</label>
                        <input type="text" {...field('lastName')} />
                    </div>
                    <div className="personal-info__field">
                        <label><FiMail size={13} /> Email</label>
                        <input type="email" {...field('email')} />
                    </div>
                    <div className="personal-info__field">
                        <label><FiPhone size={13} /> Phone</label>
                        <input type="tel" {...field('phone')} />
                    </div>
                    <div className="personal-info__field">
                        <label><FiMapPin size={13} /> Location</label>
                        <input type="text" {...field('location')} />
                    </div>
                    <div className="personal-info__field">
                        <label><FiCalendar size={13} /> Date of birth</label>
                        <input type="date" {...field('dateOfBirth')} />
                    </div>
                    <div className="personal-info__field">
                        <label><FiFlag size={13} /> Nationality</label>
                        <input type="text" {...field('nationality')} />
                    </div>
                </div>
            </div>
        </div>
    );
}