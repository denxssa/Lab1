import React from 'react';
import Home from './pages/Home/Home';
import Jobs from './pages/Jobs/Jobs';
import About from './pages/About/About';
import Pricing from './pages/Pricing/Pricing';

export default function App() {
    const pathname = window.location.pathname;

    if (pathname === '/about-us') {
        return <About />;
    }

    if (pathname === '/jobs') {
        return <Jobs />;
    }

    if (pathname === '/pricing') {
        return <Pricing />;
    }

    return <Home />;
}
