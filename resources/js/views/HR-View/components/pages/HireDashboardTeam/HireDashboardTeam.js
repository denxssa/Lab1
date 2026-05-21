import React, { useState } from 'react';
import './HireDashboardTeam.scss';

const AVATAR_COLORS = ['#111111', '#3b5bdb', '#2d7a5a', '#9a7000', '#c0392b', '#6741d9'];

const PinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 2a4 4 0 0 0-3.95 4.57L6 13H3.5a.5.5 0 0 0-.35.85l3 3a.5.5 0 0 0 .35.15H9v4.5a.5.5 0 0 0 1 0V17h2.5a.5.5 0 0 0 .35-.15l.92-.92A4 4 0 1 0 16 2z"/>
  </svg>
);

const HireDashboardTeam = () => {
  // ── Hiring Team ──────────────────────────────────────────────────────
  const [team, setTeam] = useState([
    { id: 1, name: 'Sarah Mitchell', role: 'HR Manager',         initials: 'SM', photo: null },
    { id: 2, name: 'James Park',     role: 'Talent Acquisition', initials: 'JP', photo: null },
    { id: 3, name: 'Elena Rossi',    role: 'Recruiter',          initials: 'ER', photo: null },
  ]);
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMember,     setNewMember]     = useState({ name: '', role: '', photo: null });
  const [removingId,    setRemovingId]    = useState(null);

  const handleMemberPhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setNewMember(prev => ({ ...prev, photo: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const addMember = () => {
    if (!newMember.name.trim()) return;
    const initials = newMember.name.trim().split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    setTeam([...team, {
      id: Date.now(),
      name: newMember.name.trim(),
      role: newMember.role.trim() || 'Team Member',
      initials,
      photo: newMember.photo || null,
    }]);
    setNewMember({ name: '', role: '', photo: null });
    setShowAddMember(false);
  };

  const removeMember = (id) => {
    setRemovingId(id);
    setTimeout(() => { setTeam(prev => prev.filter(m => m.id !== id)); setRemovingId(null); }, 280);
  };

  // ── Team Notes ───────────────────────────────────────────────────────
  const [notes, setNotes] = useState([
    { id: 1, from: 'Sarah', to: 'James', content: 'Review shortlisted candidates for the Frontend role before Friday.', done: false },
    { id: 2, from: 'Elena', to: 'Sarah', content: 'Can you schedule the panel interview for Fatima Al-Zahra?',          done: false },
    { id: 3, from: 'James', to: 'Elena', content: 'Reminder: send rejection emails to candidates from last week.',      done: true  },
    { id: 4, from: 'Sarah', to: 'All',   content: 'Weekly sync moved to Thursday 2 PM this week.',                      done: false },
  ]);
  const [showAddNote, setShowAddNote] = useState(false);
  const [newNote,     setNewNote]     = useState({ from: '', to: '', content: '' });

  const addNote = () => {
    if (!newNote.content.trim()) return;
    setNotes([{ id: Date.now(), from: newNote.from.trim(), to: newNote.to.trim(), content: newNote.content.trim(), done: false }, ...notes]);
    setNewNote({ from: '', to: '', content: '' });
    setShowAddNote(false);
  };

  const toggleDone = (id) => setNotes(prev => prev.map(n => n.id === id ? { ...n, done: !n.done } : n));
  const deleteNote = (id) => setNotes(prev => prev.filter(n => n.id !== id));

  return (
    <section className="hire-team-section">
      <div className="hire-team-wrapper">

        {/* ── Page header ── */}
        <div className="hire-team-page-header">
          <h1>Team</h1>
          <p>Manage your hiring team and leave notes for your coworkers.</p>
        </div>

        {/* ── Two-column layout ── */}
        <div className="hire-team-columns">

          {/* LEFT — Hiring Team */}
          <div className="hire-team-block">
            <div className="hire-team-block-header">
              <div>
                <h2>Hiring Team</h2>
                <p>Members of your recruiting team.</p>
              </div>
              <button className="hire-team-add-btn" onClick={() => setShowAddMember(v => !v)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add
              </button>
            </div>

            {showAddMember && (
              <div className="hire-team-add-form">
                {/* Photo upload */}
                <label className="hire-member-photo-upload">
                  {newMember.photo
                    ? <img src={newMember.photo} className="hire-member-photo-preview" alt="preview" />
                    : (
                      <div className="hire-member-photo-placeholder">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                          <circle cx="12" cy="13" r="4"/>
                        </svg>
                        <span>Add Photo</span>
                      </div>
                    )
                  }
                  <input type="file" accept="image/*" onChange={handleMemberPhoto} style={{ display: 'none' }} />
                </label>

                <input
                  placeholder="Full name"
                  value={newMember.name}
                  onChange={e => setNewMember({ ...newMember, name: e.target.value })}
                  onKeyDown={e => e.key === 'Enter' && addMember()}
                  autoFocus
                />
                <input
                  placeholder="Role (e.g. Recruiter)"
                  value={newMember.role}
                  onChange={e => setNewMember({ ...newMember, role: e.target.value })}
                  onKeyDown={e => e.key === 'Enter' && addMember()}
                />
                <div className="hire-team-form-btns">
                  <button className="hire-team-confirm" onClick={addMember}>Add Member</button>
                  <button className="hire-team-cancel"  onClick={() => { setShowAddMember(false); setNewMember({ name: '', role: '', photo: null }); }}>Cancel</button>
                </div>
              </div>
            )}

            <div className="hire-team-grid">
              {team.map((member, i) => (
                <div
                  key={member.id}
                  className={`hire-member-card${removingId === member.id ? ' removing' : ''}`}
                >
                  {/* Avatar / photo */}
                  <div className="hire-mc-photo-zone">
                    {member.photo
                      ? <img className="hire-mc-photo" src={member.photo} alt={member.name} />
                      : <div className="hire-mc-initials" style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}>{member.initials}</div>
                    }
                  </div>

                  {/* Name + role */}
                  <div className="hire-mc-banner">
                    <div className="hire-mc-name">{member.name}</div>
                    <div className="hire-mc-role">{member.role}</div>
                  </div>

                  <button className="hire-member-remove" onClick={() => removeMember(member.id)} type="button">✕</button>
                </div>
              ))}

              {/* Add member card */}
              <button className="hire-member-card hire-member-add-card" onClick={() => setShowAddMember(true)} type="button">
                <div className="hire-mc-add-content">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  <span>Add Member</span>
                </div>
              </button>
            </div>
          </div>

          {/* RIGHT — Team Notes */}
          <div className="hire-team-block">
            <div className="hire-team-block-header">
              <div>
                <h2>Team Notes</h2>
                <p>Leave notes for your HR coworkers.</p>
              </div>
              <button className="hire-team-add-btn" onClick={() => setShowAddNote(v => !v)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                New Note
              </button>
            </div>

            {showAddNote && (
              <div className="hire-team-add-form">
                <div className="hire-note-form-row">
                  <input placeholder="From" value={newNote.from} onChange={e => setNewNote({ ...newNote, from: e.target.value })} />
                  <input placeholder="To"   value={newNote.to}   onChange={e => setNewNote({ ...newNote, to:   e.target.value })} />
                </div>
                <textarea
                  placeholder="Write your note…"
                  value={newNote.content}
                  onChange={e => setNewNote({ ...newNote, content: e.target.value })}
                  rows={3}
                  autoFocus
                />
                <div className="hire-team-form-btns">
                  <button className="hire-team-confirm" onClick={addNote}>Post Note</button>
                  <button className="hire-team-cancel"  onClick={() => setShowAddNote(false)}>Cancel</button>
                </div>
              </div>
            )}

            <div className="hire-notes-grid">
              {notes.map((note) => (
                <div key={note.id} className={`hire-note-card${note.done ? ' done' : ''}`}>
                  <div className="hire-note-pin"><PinIcon /></div>
                  <button className="hire-note-delete" onClick={() => deleteNote(note.id)} type="button">✕</button>
                  <div className="hire-note-meta">
                    {note.from && <span><strong>From:</strong> {note.from}</span>}
                    {note.to   && <span><strong>To:</strong> {note.to}</span>}
                  </div>
                  <p className="hire-note-content">{note.content}</p>
                  <div className="hire-note-footer">
                    <label className="hire-note-check">
                      <input type="checkbox" checked={note.done} onChange={() => toggleDone(note.id)} />
                      <span>{note.done ? 'Done ✓' : 'Mark as done'}</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HireDashboardTeam;
