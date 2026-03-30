import React from 'react';
import './AboutTeam.scss';

const members = [
    { name: 'Vesa Susuri', role: 'Product Manager' },
    { name: 'Migjen Prenaj', role: 'HR Process Lead' },
    { name: 'Denisa Gjuraj', role: 'Data & Analytics Lead' },
    { name: 'Rige Qerimi', role: 'Engineering Lead' },
];

const AboutTeam = () => {
    return (
        <section className="about-team">
            <div className="about-container">
                <h3 className="about-team__title">Leadership Team</h3>
                <div className="about-team__grid">
                    {members.map((member) => (
                        <article className="about-team__member" key={member.name}>
                            <div className="about-team__photo" />
                            <div className="about-team__content">
                                <h5>{member.name}</h5>
                                <p>{member.role}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutTeam;
