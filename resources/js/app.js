import React from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import Jobs from './pages/Jobs/Jobs';
import Pricing from './pages/Pricing/Pricing';
import Login from './pages/Login';
import Signup from './pages/Signup';

export default function App() {
    return (
        <IntlProvider locale="en" messages={{}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about-us" element={<About />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </BrowserRouter>
        </IntlProvider>
    );
}
