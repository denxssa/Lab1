import React from 'react';
import { FaArrowRight, FaLocationDot, FaUsers } from 'react-icons/fa6';
import './companiesCards.scss';

import borek from '../../../assets/logos/borek.png';
import munda from '../../../assets/logos/munda.png';
import nfon from '../../../assets/logos/nfon.png';
import outsorcy from '../../../assets/logos/outsorcy.png';
import shd from '../../../assets/logos/shd.png';
import speex from '../../../assets/logos/speex.png';

const companies = [
    {
        id: 1,
        name: 'NFON',
        logo: nfon,
        employees: '900+ employees',
        location: 'Belgrade, Serbia',
        openRoles: '12 open roles',
        industry: 'Cloud Communications',
        description: 'Build scalable communication tools used by modern distributed teams.',
    },
    {
        id: 2,
        name: 'Outsorcy',
        logo: outsorcy,
        employees: '150+ employees',
        location: 'Pristina, Kosovo',
        openRoles: '8 open roles',
        industry: 'Outsourcing & Support',
        description: 'Fast-moving support and operations teams with strong growth across Europe.',
    },
    {
        id: 3,
        name: 'Borek',
        logo: borek,
        employees: '300+ employees',
        location: 'Prizren, Kosovo',
        openRoles: '6 open roles',
        industry: 'Food & Retail',
        description: 'Well-known regional brand expanding its operations, logistics, and customer teams.',
    },
    {
        id: 4,
        name: 'Munda',
        logo: munda,
        employees: '120+ employees',
        location: 'Pristina, Kosovo',
        openRoles: '5 open roles',
        industry: 'Digital Product Studio',
        description: 'Product-focused company shipping design and development work for international clients.',
    },
    {
        id: 5,
        name: 'Speeex',
        logo: speex,
        employees: '80+ employees',
        location: 'Remote First',
        openRoles: '4 open roles',
        industry: 'Language Services',
        description: 'Remote-friendly teams building communication and localization services at speed.',
    },
    {
        id: 6,
        name: 'Shkolla Digjitale',
        logo: shd,
        employees: '60+ employees',
        location: 'Pristina, Kosovo',
        openRoles: '7 open roles',
        industry: 'Education',
        description: 'Education and technology teams helping the next generation build practical digital skills.',
    },
];

const CompaniesCards = () => {
    return (
        <section className="companies-section" data-aos="zoom-in-up">
            <div className="companies-section-header">
                <div>
                    <p className="companies-section-eyebrow">Top employers</p>
                    <h2 className="companies-section-title">Discover companies hiring right now</h2>
                    <p className="companies-section-description">
                        Explore standout companies, compare team size and location, and find the places where your next role could start.
                    </p>
                </div>

                <a href="/companies" className="companies-section-link">
                    Browse companies <FaArrowRight aria-hidden />
                </a>
            </div>

            <div className="companies-grid">
                {companies.map((company) => (
                    <article key={company.id} className="company-card">
                        <div className="company-card-top">
                            <div className="company-logo-wrap">
                                <img src={company.logo} alt={`${company.name} logo`} className="company-logo" />
                            </div>

                            <span className="company-industry">{company.industry}</span>
                        </div>

                        <div className="company-card-body">
                            <h3>{company.name}</h3>
                            <p>{company.description}</p>
                        </div>

                        <div className="company-meta">
                            <span>
                                <FaUsers aria-hidden />
                                {company.employees}
                            </span>
                            <span>
                                <FaLocationDot aria-hidden />
                                {company.location}
                            </span>
                        </div>

                        <div className="company-card-footer">
                            <span className="company-open-roles">{company.openRoles}</span>
                            <a href="/companies">View company</a>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default CompaniesCards;
