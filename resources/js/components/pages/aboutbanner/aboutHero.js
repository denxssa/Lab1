import React from 'react';
import './aboutHero.scss';

const AboutHero = () => {
    return (
        <section className="about-hero">
            <div className="about-hero__wrap">
                <div className="about-hero__copy">
                    <h1>
                        People hire people.
                        <br />
                        <span className="about-hero__accent">BeeHired</span> keeps it fair.
                    </h1>
                    <p>
                        From the first announcement to the final shortlist, every step stays visible,
                        structured, and easy for teams to manage together.
                    </p>
                    <a className="about-hero__cta" href="#about-story">
                        Read About BeeHired <span>→</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default AboutHero;
