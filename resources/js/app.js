import React from 'react';
// import Navbar from './components/shared/navbar/Navbar';
import Home from './pages/Home/Home';
const appRoot = document.getElementById('app');
const appName = appRoot?.dataset?.appName ?? 'Laravel';

export default function App() {
    return (
        <>
            {/* <Navbar brand={appName} /> */}
            <Home/>
            <main className="app-main">
               
            </main>
        </>
    );
}
