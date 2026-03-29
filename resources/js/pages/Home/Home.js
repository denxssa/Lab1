import React from 'react'
import Navbar from '../../components/shared/navbar/Navbar';
import Banner from '../../components/pages/homebanner/banner';
import Carusel from '../../components/pages/carusel/Carusel';
import Categories from '../../components/pages/categories/Categories';
import FindJob from '../../components/pages/findJob/FindJob';
import Testimonials from '../../components/shared/testimonals/Testimonal';
import Footer from '../../components/shared/footer/Footer';
const Home = () => {
    return (
        <div className='home-page'>
            <Navbar />
            <Banner />
            <Carusel />
            <br/>
            <Categories />
            <FindJob/>
            <Testimonials/>
            <Footer/>
        </div>
    )
}

export default Home
