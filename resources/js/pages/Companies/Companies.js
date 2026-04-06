import React from 'react';
import CompaniesCards from '../../components/pages/companiesCards/CompaniesCards';
import Footer from '../../components/shared/footer/Footer';
import Navbar from '../../components/shared/navbar/Navbar';

const Companies = () => {
    return (
        <div className="companies-page">
            <Navbar />
            <CompaniesCards />
            <Footer />
        </div>
    );
};

export default Companies;
