import React from 'react';
import { FiCamera, FiMapPin, FiMail } from 'react-icons/fi';
import './ProfileHero.scss';

export default function ProfileHero({ form }) {
    const initials = `${form.firstName?.[0] ?? ''}${form.lastName?.[0] ?? ''}`.toUpperCase();

    return (
        <div className="profile-hero">
            <div className="profile-hero__banner" />
            <div className="profile-hero__card">
                <div className="profile-hero__avatar-wrap">
                    <div className="profile-hero__avatar">{initials}</div>
                    <button className="profile-hero__camera" aria-label="Upload photo">
                        <FiCamera size={14} />
                    </button>
                </div>
                <div className="profile-hero__info">
                    <h2 className="profile-hero__name">
                        {form.firstName} {form.lastName}
                        <span className="profile-hero__verified">✔</span>
                    </h2>
                    <p className="profile-hero__title">{form.jobTitle}</p>
                    <p className="profile-hero__meta">
                        <FiMapPin size={13} /> {form.location}
                        <span className="profile-hero__dot">•</span>
                        <FiMail size={13} /> {form.email}
                    </p>
                </div>
            </div>
        </div>
    );
}