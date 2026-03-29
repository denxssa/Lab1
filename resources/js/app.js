import React from 'react';
import { IntlProvider } from 'react-intl';
import Home from './pages/Home/Home';

export default function App() {
    return (
        <IntlProvider locale="en" messages={{}}>
            <Home/>
        </IntlProvider>
    );
}
