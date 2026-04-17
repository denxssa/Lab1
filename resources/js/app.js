import React, { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Aos from 'aos';
import "aos/dist/aos.css";
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Companies from './pages/Companies/Companies';
import Jobs from './pages/Jobs/Jobs';
import JobDetailPage from './pages/JobDetailPage/JobDetailPage';
import Pricing from './pages/Pricing/Pricing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Contact from './pages/Contact';

export default function App() {
    useEffect(() => {
        Aos.init({
          duration:1250,
          once: true
        })
    }, [])
    return (
        <IntlProvider locale="en" messages={{}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about-us" element={<About />} />
                    <Route path="/companies" element={<Companies />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/contact-us" element={<Contact />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/jobs/:id" element={<JobDetailPage />} />
                </Routes>
            </BrowserRouter>
        </IntlProvider>
    );
}
