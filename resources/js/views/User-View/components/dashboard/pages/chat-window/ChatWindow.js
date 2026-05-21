import React, { useState } from 'react';
import { FiSend, FiMessageSquare } from 'react-icons/fi';
import './ChatWindow.scss';

const staticMessages = {
    1: [
        { id: 1, from: 'them', text: 'Hi Vesa! We reviewed your application and we are impressed.', time: '10:20' },
        { id: 2, from: 'me', text: 'Thank you! I am very excited about this opportunity.', time: '10:22' },
        { id: 3, from: 'them', text: 'We would love to schedule an interview with you. Are you available this week?', time: '10:30' },
    ],
    2: [
        { id: 1, from: 'them', text: 'Thank you for applying to StartupXYZ!', time: '09:10' },
        { id: 2, from: 'them', text: 'We will get back to you shortly.', time: '09:15' },
    ],
    3: [
        { id: 1, from: 'them', text: 'Hello! Please complete the technical assessment sent to your email.', time: 'Yesterday' },
    ],
    4: [
        { id: 1, from: 'them', text: 'Your application is currently under review.', time: 'Yesterday' },
    ],
    5: [
        { id: 1, from: 'them', text: 'Hi! We reviewed your profile and think you could be a great fit.', time: 'Mon' },
    ],
};

export default function ChatWindow({ conversation }) {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState(staticMessages);

    if (!conversation) {
        return (
            <div className="chat-window chat-window--empty">
                <FiMessageSquare size={48} />
                <p>Select a conversation to start messaging</p>
            </div>
        );
    }

    const currentMessages = messages[conversation.id] || [];

    const handleSend = () => {
        if (!input.trim()) return;
        const newMessage = {
            id: currentMessages.length + 1,
            from: 'me',
            text: input.trim(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => ({
            ...prev,
            [conversation.id]: [...(prev[conversation.id] || []), newMessage],
        }));
        setInput('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="chat-window">
            <div className="chat-window__header">
                <div className="chat-window__avatar">{conversation.initials}</div>
                <div>
                    <h3 className="chat-window__name">{conversation.name}</h3>
                    <p className="chat-window__status">Active now</p>
                </div>
            </div>
            <div className="chat-window__messages">
                {currentMessages.map(msg => (
                    <div
                        key={msg.id}
                        className={`chat-window__message chat-window__message--${msg.from}`}
                    >
                        <div className="chat-window__bubble">{msg.text}</div>
                        <span className="chat-window__time">{msg.time}</span>
                    </div>
                ))}
            </div>
            <div className="chat-window__input-wrap">
                <input
                    type="text"
                    className="chat-window__input"
                    placeholder="Type a message..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button className="chat-window__send" onClick={handleSend}>
                    <FiSend size={18} />
                </button>
            </div>
        </div>
    );
}