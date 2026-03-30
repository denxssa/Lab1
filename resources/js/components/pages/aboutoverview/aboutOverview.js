import React from 'react';
import './AboutOverview.scss';

const stats = [
    ['2.5K+', 'Applications Processed'],
    ['340+', 'Positions Published'],
    ['120+', 'Organizations'],
    ['99.9%', 'Platform Uptime'],
];

const steps = [
    {
        step: 'STEP 01',
        title: 'Publish Clearly',
        text: 'Create openings with deadlines, requirements, and transparent criteria from day one.',
    },
    {
        step: 'STEP 02',
        title: 'Review Consistently',
        text: 'Guide applications through structured stages so reviewers stay aligned and accountable.',
    },
    {
        step: 'STEP 03',
        title: 'Decide with Record',
        text: 'Finalize selections with full traceability, making every decision easy to justify later.',
    },
];

const AboutOverview = () => {
    return (
        <section id="about-story" className="about-overview">
            <div className="about-container">
                <div className="about-overview__grid">
                    <article className="about-overview__panel">
                        <h3>What BeeHired Solves</h3>
                        <p>
                            Recruitment is often fragmented across email, spreadsheets, and disconnected
                            tools. BeeHired consolidates announcements, applications, evaluations, and decisions
                            in one secure platform.
                        </p>
                    </article>
                    <article className="about-overview__panel">
                        <h3>Why Organizations Use It</h3>
                        <p>
                            Faster processing, better visibility, and consistent candidate handling. Teams can
                            collaborate efficiently while maintaining professional standards and audit-ready
                            records.
                        </p>
                    </article>
                </div>

                <div className="about-overview__stats">
                    {stats.map(([value, label]) => (
                        <div className="about-overview__stat" key={label}>
                            <strong>{value}</strong>
                            {label}
                        </div>
                    ))}
                </div>

                <div className="about-overview__journey">
                    <h3>How BeeHired Works</h3>
                    <div className="about-overview__journey-grid">
                        {steps.map((item) => (
                            <article className="about-overview__journey-item" key={item.step}>
                                <b>{item.step}</b>
                                <h4>{item.title}</h4>
                                <p>{item.text}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutOverview;
