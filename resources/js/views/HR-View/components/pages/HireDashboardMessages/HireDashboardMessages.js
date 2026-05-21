import React, { useEffect, useRef, useState } from 'react';
import './HireDashboardMessages.scss';

const conversations = [
  {
    id: 1, initials: 'AR', name: 'Alex Rivera', role: 'Senior Frontend Dev',
    time: '10:42', unread: 2, active: true,
    messages: [
      { id: 1, from: 'them', text: 'Hi, I wanted to follow up on my application.', time: '10:30' },
      { id: 2, from: 'them', text: 'Is there any update on the interview schedule?', time: '10:31' },
      { id: 3, from: 'me',   text: 'Hi Alex! Yes, we\'d love to move forward. Are you available this week?', time: '10:40' },
      { id: 4, from: 'them', text: 'Absolutely, Thursday or Friday works great for me.', time: '10:42' },
    ],
  },
  {
    id: 2, initials: 'FA', name: 'Fatima Al-Zahra', role: 'Data Scientist',
    time: '09:15', unread: 0, active: false,
    messages: [
      { id: 1, from: 'me',   text: 'Hi Fatima, thank you for applying to the Data Scientist role.', time: '09:00' },
      { id: 2, from: 'them', text: 'Thank you! I\'m very excited about the opportunity.', time: '09:15' },
    ],
  },
  {
    id: 3, initials: 'LN', name: 'Liam Nguyen', role: 'Mobile App Developer',
    time: 'Yesterday', unread: 1, active: false,
    messages: [
      { id: 1, from: 'them', text: 'Hello, I completed the technical assessment you sent.', time: 'Yesterday' },
      { id: 2, from: 'me',   text: 'Great work Liam, we\'ll review it and get back to you soon.', time: 'Yesterday' },
      { id: 3, from: 'them', text: 'Thank you, looking forward to hearing from you!', time: 'Yesterday' },
    ],
  },
  {
    id: 4, initials: 'PS', name: 'Priya Sharma', role: 'UX/UI Designer',
    time: 'Yesterday', unread: 0, active: false,
    messages: [
      { id: 1, from: 'me',   text: 'Hi Priya, your portfolio is impressive. We\'d love to schedule a call.', time: 'Yesterday' },
      { id: 2, from: 'them', text: 'That sounds wonderful, I\'m available anytime next week.', time: 'Yesterday' },
    ],
  },
  {
    id: 5, initials: 'JO', name: "James O'Brien", role: 'Backend Engineer',
    time: 'Mon', unread: 0, active: false,
    messages: [
      { id: 1, from: 'them', text: 'Hi, I saw the Backend Engineer role and I\'m very interested.', time: 'Mon' },
      { id: 2, from: 'me',   text: 'Hi James, your experience looks like a great fit. Let\'s connect.', time: 'Mon' },
    ],
  },
];

const HireDashboardMessages = () => {
  const [search,       setSearch]       = useState('');
  const [activeId,     setActiveId]     = useState(1);
  const [allConvos,    setAllConvos]    = useState(conversations);
  const [input,        setInput]        = useState('');
  const bottomRef = useRef(null);

  const active = allConvos.find((c) => c.id === activeId);

  const filtered = allConvos.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.role.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeId, active?.messages?.length]);

  const openConvo = (id) => {
    setActiveId(id);
    setAllConvos((prev) =>
      prev.map((c) => c.id === id ? { ...c, unread: 0 } : c)
    );
  };

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const newMsg = { id: Date.now(), from: 'me', text, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) };
    setAllConvos((prev) =>
      prev.map((c) => c.id === activeId
        ? { ...c, messages: [...c.messages, newMsg], time: newMsg.time }
        : c
      )
    );
    setInput('');
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <section className="hire-messages-section">
      <div className="hire-messages-wrapper">

        {/* ── Left panel ── */}
        <div className="hire-messages-left">
          <div className="hire-messages-left-header">
            <h2>Messages</h2>
            <span className="hire-messages-total">{allConvos.reduce((a, c) => a + c.unread, 0) > 0 && allConvos.reduce((a, c) => a + c.unread, 0)}</span>
          </div>

          <div className="hire-messages-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              type="text"
              placeholder="Search conversations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="hire-messages-list">
            {filtered.map((c) => (
              <div
                key={c.id}
                className={`hire-messages-item${c.id === activeId ? ' active' : ''}`}
                onClick={() => openConvo(c.id)}
              >
                <div className="hire-msg-avatar">{c.initials}</div>
                <div className="hire-msg-info">
                  <div className="hire-msg-top">
                    <span className="hire-msg-name">{c.name}</span>
                    <span className="hire-msg-time">{c.time}</span>
                  </div>
                  <div className="hire-msg-bottom">
                    <span className="hire-msg-preview">{c.messages[c.messages.length - 1]?.text}</span>
                    {c.unread > 0 && <span className="hire-msg-badge">{c.unread}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right panel ── */}
        {active ? (
          <div className="hire-messages-right">
            <div className="hire-messages-thread-header">
              <div className="hire-msg-avatar">{active.initials}</div>
              <div>
                <div className="hire-thread-name">{active.name}</div>
                <div className="hire-thread-role">{active.role}</div>
              </div>
            </div>

            <div className="hire-messages-thread">
              {active.messages.map((msg) => (
                <div key={msg.id} className={`hire-bubble-wrap ${msg.from === 'me' ? 'me' : 'them'}`}>
                  <div className="hire-bubble">{msg.text}</div>
                  <div className="hire-bubble-time">{msg.time}</div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            <div className="hire-messages-input-bar">
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
              />
              <button type="button" className="hire-send-btn" onClick={send} disabled={!input.trim()}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="hire-messages-right hire-messages-empty-state">
            <p>Select a conversation to start messaging</p>
          </div>
        )}

      </div>
    </section>
  );
};

export default HireDashboardMessages;
