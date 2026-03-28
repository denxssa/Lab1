import React from 'react'
import Navbar from '../../components/shared/navbar/Navbar'
import Banner from '../../components/pages/homebanner/banner'
import Carusel from '../../components/pages/carusel/Carusel'

const Home = () => {
    return (
        <div className='home-page'>
            <Navbar />
            <Banner />
            <Carusel />
        </div>
    )
}

export default Home