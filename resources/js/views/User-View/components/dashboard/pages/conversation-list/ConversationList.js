import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './ConversationList.scss';

const conversations = [
    { id: 1, name: 'TechCorp HR', lastMessage: 'We would love to schedule an interview...', time: '10:30', unread: 2, initials: 'TC' },
    { id: 2, name: 'StartupXYZ', lastMessage: 'Thank you for applying!', time: '09:15', unread: 0, initials: 'SX' },
    { id: 3, name: 'Google Recruiting', lastMessage: 'Please complete the assessment.', time: 'Yesterday', unread: 1, initials: 'GR' },
    { id: 4, name: 'Meta Careers', lastMessage: 'Your application is under review.', time: 'Yesterday', unread: 0, initials: 'MC' },
    { id: 5, name: 'Amazon Jobs', lastMessage: 'Hi! We reviewed your profile...', time: 'Mon', unread: 0, initials: 'AJ' },
];

export default function ConversationList({ selected, onSelect }) {
    const [search, setSearch] = useState('');

    const filtered = conversations.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="conversation-list">
            <div className="conversation-list__header">
                <h2 className="conversation-list__title">Messages</h2>
            </div>
            <div className="conversation-list__search">
                <FiSearch size={16} className="conversation-list__search-icon" />
                <input
                    type="text"
                    placeholder="Search conversations..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            <ul className="conversation-list__items">
                {filtered.map(c => (
                    <li
                        key={c.id}
                        className={`conversation-list__item ${selected?.id === c.id ? 'conversation-list__item--active' : ''}`}
                        onClick={() => onSelect(c)}
                    >
                        <div className="conversation-list__avatar">{c.initials}</div>
                        <div className="conversation-list__info">
                            <div className="conversation-list__top">
                                <span className="conversation-list__name">{c.name}</span>
                                <span className="conversation-list__time">{c.time}</span>
                            </div>
                            <div className="conversation-list__bottom">
                                <span className="conversation-list__preview">{c.lastMessage}</span>
                                {c.unread > 0 && (
                                    <span className="conversation-list__badge">{c.unread}</span>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}