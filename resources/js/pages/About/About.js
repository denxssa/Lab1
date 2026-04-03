import React from 'react';
import Navbar from '../../components/shared/navbar/Navbar';
import AboutHero from '../../components/pages/aboutbanner/AboutHero';
import AboutOverview from '../../components/pages/Aboutoverview/AboutOverview';
import AboutTeam from '../../components/shared/teams/AboutTeam';

const About = () => {
    return (
        <div className="about-page">
            <Navbar />
            <AboutHero />
            <AboutOverview />
            <AboutTeam />
        </div>
    );
};

export default About;
