import React from 'react';
import Navbar from './Navbar';

const appRoot = document.getElementById('app');
const appName = appRoot?.dataset?.appName ?? 'Laravel';

export default function App() {
    return (
        <>
            <Navbar brand={appName} />
            <main className="app-main">
                <h1 className="app-main__title">Laravel + React (Laravel Mix)</h1>
                <p className="app-main__lead">
                    Simple navbar styles live in SCSS and compile through Webpack.
                </p>
            </main>
        </>
    );
}
