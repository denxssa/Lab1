import React, { useState } from 'react';
import UserDashboardLayout from '../../../components/dashboard/shared/UserDashboardLayout/UserDashboardLayout';
import ProfileHero from '../../../components/dashboard/pages/profile-hero/ProfileHero';
import PersonalInfo from '../../../components/dashboard/pages/personal-info/PersonalInfo';
import AboutMe from '../../../components/dashboard/pages/about-me/AboutMe';
import SocialLinks from '../../../components/dashboard/pages/social-links/SocialLinks';
import JobPreferences from '../../../components/dashboard/pages/job-preferences/JobPreferences';

const ProfilePage = () => {
    const [form, setForm] = useState({
        firstName: 'Vesa',
        lastName: 'Susuri',
        email: 'vesa.susuri@beehired.com',
        phone: '+383 44 123 456',
        location: 'Prishtina, Kosovo',
        dateOfBirth: '1998-12-06',
        nationality: 'Kosovar',
        jobTitle: 'Senior Frontend Developer',
        linkedin: 'linkedin.com/in/vesasusuri',
        github: 'github.com/vesasusuri',
        portfolio: 'vesasusuri.dev',
        desiredRole: 'Senior Frontend Developer',
        jobType: 'Remote',
        expectedSalary: '45000',
        availability: '2 weeks notice',
        about: 'Passionate frontend developer with 5+ years of experience crafting delightful user experiences.',
    });

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    return (
        <UserDashboardLayout>
            <div className="profile-page">
                <ProfileHero form={form} />
                <div className="profile-page__body">
                    <div className="profile-page__left">
                        <SocialLinks form={form} onChange={handleChange} />
                    </div>
                    <div className="profile-page__right">
                        <PersonalInfo form={form} onChange={handleChange} />
                        <AboutMe value={form.about} onChange={val => handleChange('about', val)} />
                        <JobPreferences form={form} onChange={handleChange} />
                        <div className="profile-page__actions">
                            <button className="profile-page__cancel">Cancel</button>
                            <button className="profile-page__save">💾 Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </UserDashboardLayout>
    );
};

export default ProfilePage;
