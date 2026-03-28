import React from 'react';

const links = [
    { href: '#', label: 'Home', active: true },
    { href: '#', label: 'About' },
    { href: '#', label: 'Contact' },
];

export default function Navbar({ brand }) {
    return (
        <header className="navbar" role="banner">
            <a className="navbar__brand" href="/">
                {brand}
            </a>
            <nav aria-label="Primary">
                <ul className="navbar__links">
                    {links.map(({ href, label, active }) => (
                        <li key={label}>
                            <a
                                href={href}
                                className={
                                    active
                                        ? 'navbar__link navbar__link--active'
                                        : 'navbar__link'
                                }
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
