import React, { useEffect, useState } from 'react';
import { fetchHrTeam, addHrTeamMember, removeHrTeamMember } from '../../../../../api/hrApi';
import './HireDashboardTeam.scss';

const AVATAR_COLORS = ['#111111', '#3b5bdb', '#2d7a5a', '#9a7000', '#c0392b', '#6741d9'];

const DEFAULT_MEMBERS = [
  { id: 'default-1', name: 'Denisa Gjuraj',  title: 'HR Manager',         initials: 'DG', photo: null, isDefault: true },
  { id: 'default-2', name: 'Migjen Prenaj',  title: 'Talent Acquisition', initials: 'MP', photo: null, isDefault: true },
  { id: 'default-3', name: 'John Doe',       title: 'Recruiter',          initials: 'JD', photo: null, isDefault: true },
];

const PinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 2a4 4 0 0 0-3.95 4.57L6 13H3.5a.5.5 0 0 0-.35.85l3 3a.5.5 0 0 0 .35.15H9v4.5a.5.5 0 0 0 1 0V17h2.5a.5.5 0 0 0 .35-.15l.92-.92A4 4 0 1 0 16 2z"/>
  </svg>
);

const getInitials = (name) =>
  (name || '?').trim().split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

const HireDashboardTeam = () => {
  // ── Hiring Team ──────────────────────────────────────────────────────
  const [team,          setTeam]          = useState(DEFAULT_MEMBERS);
  const [teamLoaded,    setTeamLoaded]    = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMember,     setNewMember]     = useState({ name: '', title: '', photo: null, file: null });
  const [saving,        setSaving]        = useState(false);
  const [removingId,    setRemovingId]    = useState(null);

  useEffect(() => {
    fetchHrTeam()
      .then((data) => {
        // Use DB data if any exists; otherwise keep the defaults
        if (Array.isArray(data) && data.length > 0) {
          setTeam(data.map((m) => ({
            id:       m.id,
            name:     m.name,
            title:    m.title,
            initials: getInitials(m.name),
            photo:    m.photo || null,
          })));
        }
        setTeamLoaded(true);
      })
      .catch(() => setTeamLoaded(true));
  }, []);

  const handleMemberPhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setNewMember((prev) => ({ ...prev, photo: ev.target.result, file }));
    reader.readAsDataURL(file);
  };

  const addMember = async () => {
    if (!newMember.name.trim()) return;
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('name',  newMember.name.trim());
      formData.append('title', newMember.title.trim() || 'Team Member');
      if (newMember.file) formData.append('photo', newMember.file);

      const saved = await addHrTeamMember(formData);
      setTeam((prev) => [
        // If defaults are still showing, replace them with real data on first add
        ...(prev[0]?.isDefault ? [] : prev),
        {
          id:       saved.id,
          name:     saved.name,
          title:    saved.title,
          initials: getInitials(saved.name),
          photo:    saved.photo || null,
        },
      ]);
      setNewMember({ name: '', title: '', photo: null, file: null });
      setShowAddMember(false);
    } catch {
      // keep current state on error
    } finally {
      setSaving(false);
    }
  };

  const removeMember = async (id) => {
    if (String(id).startsWith('default-')) {
      // Just remove from local state — defaults aren't in the DB
      setTeam((prev) => prev.filter((m) => m.id !== id));
      return;
    }
    setRemovingId(id);
    try {
      await removeHrTeamMember(id);
      setTimeout(() => {
        setTeam((prev) => prev.filter((m) => m.id !== id));
        setRemovingId(null);
      }, 280);
    } catch {
      setRemovingId(null);
    }
  };

  // ── Team Notes (local — not persisted) ───────────────────────────────
  const [notes, setNotes] = useState([
    { id: 1, from: 'Denisa', to: 'Migjen', content: 'Review shortlisted candidates for the Frontend role before Friday.', done: false },
    { id: 2, from: 'John',   to: 'Denisa', content: 'Can you schedule the panel interview for the Data Scientist role?',  done: false },
    { id: 3, from: 'Migjen', to: 'John',   content: 'Reminder: send rejection emails to candidates from last week.',      done: true  },
    { id: 4, from: 'Denisa', to: 'All',    content: 'Weekly sync moved to Thursday 2 PM this week.',                      done: false },
  ]);
  const [showAddNote, setShowAddNote] = useState(false);
  const [newNote,     setNewNote]     = useState({ from: '', to: '', content: '' });

  const addNote = () => {
    if (!newNote.content.trim()) return;
    setNotes([{ id: Date.now(), ...newNote, done: false }, ...notes]);
    setNewNote({ from: '', to: '', content: '' });
    setShowAddNote(false);
  };

  const toggleDone = (id) => setNotes((prev) => prev.map((n) => n.id === id ? { ...n, done: !n.done } : n));
  const deleteNote = (id) => setNotes((prev) => prev.filter((n) => n.id !== id));

  return (
    <section className="hire-team-section">
      <div className="hire-team-wrapper">

        <div className="hire-team-page-header">
          <h1>Team</h1>
          <p>Manage your hiring team and leave notes for your coworkers.</p>
        </div>

        <div className="hire-team-columns">

          {/* LEFT — Hiring Team */}
          <div className="hire-team-block">
            <div className="hire-team-block-header">
              <div>
                <h2>Hiring Team</h2>
                <p>Members of your recruiting team.</p>
              </div>
              <button className="hire-team-add-btn" onClick={() => setShowAddMember((v) => !v)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add
              </button>
            </div>

            {showAddMember && (
              <div className="hire-team-add-form">
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
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && addMember()}
                  autoFocus
                />
                <input
                  placeholder="Title (e.g. Recruiter)"
                  value={newMember.title}
                  onChange={(e) => setNewMember({ ...newMember, title: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && addMember()}
                />
                <div className="hire-team-form-btns">
                  <button className="hire-team-confirm" onClick={addMember} disabled={saving}>
                    {saving ? 'Saving…' : 'Add Member'}
                  </button>
                  <button className="hire-team-cancel" onClick={() => { setShowAddMember(false); setNewMember({ name: '', title: '', photo: null, file: null }); }}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="hire-team-grid">
              {team.map((member, i) => (
                <div
                  key={member.id}
                  className={`hire-member-card${removingId === member.id ? ' removing' : ''}`}
                >
                  <div className="hire-mc-photo-zone">
                    {member.photo
                      ? <img className="hire-mc-photo" src={member.photo} alt={member.name} />
                      : <div className="hire-mc-initials" style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}>{member.initials}</div>
                    }
                  </div>
                  <div className="hire-mc-banner">
                    <div className="hire-mc-name">{member.name}</div>
                    <div className="hire-mc-role">{member.title}</div>
                  </div>
                  <button className="hire-member-remove" onClick={() => removeMember(member.id)} type="button">✕</button>
                </div>
              ))}

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
              <button className="hire-team-add-btn" onClick={() => setShowAddNote((v) => !v)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                New Note
              </button>
            </div>

            {showAddNote && (
              <div className="hire-team-add-form">
                <div className="hire-note-form-row">
                  <input placeholder="From" value={newNote.from} onChange={(e) => setNewNote({ ...newNote, from: e.target.value })} />
                  <input placeholder="To"   value={newNote.to}   onChange={(e) => setNewNote({ ...newNote, to:   e.target.value })} />
                </div>
                <textarea
                  placeholder="Write your note…"
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
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
