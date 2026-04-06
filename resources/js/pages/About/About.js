import React from 'react';
import Navbar from '../../components/shared/navbar/Navbar';
import AboutHero from '../../components/pages/aboutbanner/aboutHero';
import AboutOverview from '../../components/pages/aboutoverview/aboutOverview';
import AboutTeam from '../../components/shared/teams/AboutTeam';
import Footer from '../../components/shared/footer/Footer';

const About = () => {
    return (
        <div className="about-page">
            <Navbar />
            <AboutHero />
            <AboutOverview />
            <AboutTeam />
            <Footer />
        </div>
    );
};

export default About;
