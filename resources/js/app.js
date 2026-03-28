import React from 'react';
import Home from './pages/Home/Home';
const appRoot = document.getElementById('app');
const appName = appRoot?.dataset?.appName ?? 'Laravel';

export default function App() {
    return (
        <>
            <Home/>
            <main className="app-main">
               
            </main>
        </>
    );
}
