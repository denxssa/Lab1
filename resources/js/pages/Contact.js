import React, { useState } from 'react';

const accentColor = '#f7c842';
const accentSoft = '#ffe8a2';

const contactHighlights = [
    'Tell us what you are building or hiring for.',
    'We will point you to the right team quickly.',
    'Expect a clean and simple response flow.',
];

const MailIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M20 6H4a2 2 0 0 0-2 2v.35l10 5.88 10-5.88V8a2 2 0 0 0-2-2Zm0 4.67-7.5 4.41a1 1 0 0 1-1 0L4 10.67V16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5.33Z" />
    </svg>
);

const UserIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" />
    </svg>
);

const NoteIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M6 4h9l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm8 1.5V10h4.5" />
    </svg>
);

export default function Contact() {
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        notes: '',
    });
    const [errors, setErrors] = useState({});
    const [showFeedback, setShowFeedback] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        const nextValues = { ...values, [name]: value };
        setValues(nextValues);
        setErrors(validate(nextValues));
        setShowFeedback(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const nextErrors = validate(values);
        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            setShowFeedback(false);
            return;
        }

        setShowFeedback(true);
        setValues({
            firstName: '',
            lastName: '',
            email: '',
            notes: '',
        });
        setErrors({});
    };

    return (
        <>
            <style>{styles}</style>
            <div className="contact-shell">
                <div className="contact-layout">
                    <section className="contact-hero">
                        <div className="contact-avatar-row" aria-hidden="true">
                            <span className="contact-avatar avatar-one" />
                            <span className="contact-avatar avatar-two" />
                            <span className="contact-avatar avatar-three" />
                        </div>

                        <div className="contact-card">
                            <div className="contact-card-copy">
                                <p className="contact-kicker">Contact Us</p>
                                <h1>Let&apos;s talk about what you need.</h1>
                                <p className="contact-intro">
                                    Reach out with a question, project idea, or hiring need. We kept
                                    this form simple so it feels quick to use.
                                </p>
                            </div>

                            <form className="contact-form" onSubmit={handleSubmit} noValidate>
                                <div className="contact-row">
                                    <label className={`contact-field ${errors.firstName ? 'is-error' : ''}`} htmlFor="contact-first-name">
                                        <span className="contact-field-label">First name</span>
                                        <div className="contact-field-box">
                                            <span className="contact-field-icon"><UserIcon /></span>
                                            <input id="contact-first-name" name="firstName" type="text" placeholder="First name" value={values.firstName} onChange={handleChange} />
                                        </div>
                                        <span className="contact-error">{errors.firstName ?? ''}</span>
                                    </label>

                                    <label className={`contact-field ${errors.lastName ? 'is-error' : ''}`} htmlFor="contact-last-name">
                                        <span className="contact-field-label">Last name</span>
                                        <div className="contact-field-box">
                                            <span className="contact-field-icon"><UserIcon /></span>
                                            <input id="contact-last-name" name="lastName" type="text" placeholder="Last name" value={values.lastName} onChange={handleChange} />
                                        </div>
                                        <span className="contact-error">{errors.lastName ?? ''}</span>
                                    </label>
                                </div>

                                <label className={`contact-field ${errors.email ? 'is-error' : ''}`} htmlFor="contact-email">
                                    <span className="contact-field-label">Email address</span>
                                    <div className="contact-field-box">
                                        <span className="contact-field-icon"><MailIcon /></span>
                                        <input id="contact-email" name="email" type="email" placeholder="Email" value={values.email} onChange={handleChange} />
                                    </div>
                                    <span className="contact-error">{errors.email ?? ''}</span>
                                </label>

                                <label className={`contact-field ${errors.notes ? 'is-error' : ''}`} htmlFor="contact-notes">
                                    <span className="contact-field-label">Notes</span>
                                    <div className="contact-field-box textarea-box">
                                        <span className="contact-field-icon"><NoteIcon /></span>
                                        <textarea id="contact-notes" name="notes" placeholder="Tell us a bit about your question" value={values.notes} onChange={handleChange} />
                                    </div>
                                    <span className="contact-error">{errors.notes ?? ''}</span>
                                </label>

                                <button type="submit" className="contact-submit">Send Message</button>

                                <div className={`contact-feedback ${showFeedback ? 'is-visible' : ''}`} role="status" aria-live="polite">
                                    Your message looks ready to send.
                                </div>
                            </form>
                        </div>
                    </section>

                    <aside className="contact-side-panel">
                        <div className="contact-side-card">
                            <p className="contact-side-kicker">Why Contact</p>
                            <h2>Simple, clear, and fast.</h2>
                            <p>
                                The layout takes cues from the reference, but shifts to a lighter
                                honey tone and a cleaner card structure.
                            </p>

                            <div className="contact-highlight-list">
                                {contactHighlights.map((item) => (
                                    <div key={item} className="contact-highlight">
                                        <span className="contact-highlight-dot" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="contact-note-box">
                                <strong>Quick note</strong>
                                <p>You can use this section later for contact details, support hours, or a short FAQ.</p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </>
    );
}

function validate(values) {
    const errors = {};

    if (!values.firstName.trim()) {
        errors.firstName = 'First name is required.';
    }

    if (!values.lastName.trim()) {
        errors.lastName = 'Last name is required.';
    }

    if (!values.email.trim()) {
        errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'Enter a valid email address.';
    }

    if (!values.notes.trim()) {
        errors.notes = 'Please add a short message.';
    }

    return errors;
}

const styles = `
    .contact-shell { min-height: 100vh; padding: 42px 20px; background: linear-gradient(180deg, #f9f7ef 0%, #fffdf6 42%, #f7f3e8 100%); }
    .contact-layout { width: min(1280px, 100%); margin: 0 auto; display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(320px, 0.75fr); gap: 28px; align-items: start; }
    .contact-hero { position: relative; padding: 86px 26px 30px; border-radius: 36px; background: linear-gradient(180deg, #5f667c 0%, #555d73 100%); overflow: hidden; box-shadow: 0 28px 70px rgba(69, 63, 45, 0.12); }
    .contact-hero::before { content: ""; position: absolute; inset: 0; background: radial-gradient(circle at top left, rgba(247, 200, 66, 0.18), transparent 24%), radial-gradient(circle at 88% 14%, rgba(255,255,255,0.12), transparent 16%), linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.08) 100%); pointer-events: none; }
    .contact-avatar-row { position: absolute; top: 22px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; }
    .contact-avatar { width: 64px; height: 64px; border-radius: 50%; border: 4px solid #fff8dc; box-shadow: 0 10px 22px rgba(0,0,0,0.15); background-size: cover; background-position: center; }
    .contact-avatar + .contact-avatar { margin-left: -10px; }
    .avatar-one { background: linear-gradient(135deg, #f8cb57, #ffe9a8); }
    .avatar-two { background: linear-gradient(135deg, #ffffff, #e6e1cf); }
    .avatar-three { background: linear-gradient(135deg, #b5e0d2, #fef7cf); }
    .contact-card { position: relative; z-index: 1; background: #fffdf8; border-radius: 28px; padding: 42px 42px 36px; box-shadow: 0 24px 50px rgba(30, 23, 11, 0.14); }
    .contact-card-copy { text-align: center; max-width: 620px; margin: 0 auto 28px; }
    .contact-kicker { margin: 0 0 10px; color: #a98300; font-size: 0.92rem; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 700; }
    .contact-card-copy h1 { margin: 0; font-size: clamp(2.2rem, 4vw, 3.6rem); line-height: 1.02; color: #1f2330; }
    .contact-intro { margin: 14px 0 0; color: #676e7d; font-size: 1.02rem; line-height: 1.75; }
    .contact-form { display: grid; gap: 12px; }
    .contact-row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
    .contact-field { display: block; }
    .contact-field-label { display: block; margin: 0 0 7px; color: #505564; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; }
    .contact-field-box { display: flex; align-items: center; gap: 12px; min-height: 56px; padding: 0 16px; border-radius: 15px; border: 1px solid rgba(72, 76, 90, 0.14); background: #fff; transition: border-color 0.2s ease, box-shadow 0.2s ease; }
    .contact-field-box:focus-within { border-color: rgba(247, 200, 66, 0.92); box-shadow: 0 0 0 5px rgba(247, 200, 66, 0.16); }
    .contact-field.is-error .contact-field-box { border-color: #d49500; }
    .contact-field-icon { color: #9398a3; display: inline-flex; align-items: center; justify-content: center; }
    .contact-field input, .contact-field textarea { width: 100%; border: 0; outline: none; background: transparent; color: #21242e; font-size: 1rem; font-family: inherit; }
    .contact-field input::placeholder, .contact-field textarea::placeholder { color: #999ea7; }
    .textarea-box { align-items: flex-start; padding-top: 15px; padding-bottom: 15px; }
    .contact-field textarea { min-height: 122px; resize: vertical; }
    .contact-error { display: block; min-height: 20px; padding: 6px 4px 0; color: #c78600; font-size: 0.9rem; }
    .contact-submit { margin-top: 6px; border: 0; min-height: 58px; border-radius: 16px; background: linear-gradient(90deg, #f7c842 0%, #ffe06b 100%); color: #352900; font-size: 1.08rem; font-weight: 800; cursor: pointer; box-shadow: 0 18px 32px rgba(247, 200, 66, 0.28); }
    .contact-feedback { min-height: 24px; color: #6c7d28; font-weight: 600; opacity: 0; transition: opacity 0.2s ease; }
    .contact-feedback.is-visible { opacity: 1; }
    .contact-side-panel { display: flex; align-items: stretch; }
    .contact-side-card { width: 100%; border-radius: 32px; padding: 34px 30px; background: linear-gradient(180deg, #fffbee 0%, #fff6cf 100%); box-shadow: 0 24px 56px rgba(109, 88, 17, 0.1); border: 1px solid rgba(247, 200, 66, 0.24); }
    .contact-side-kicker { margin: 0 0 10px; color: #aa8400; font-size: 0.84rem; letter-spacing: 0.14em; text-transform: uppercase; font-weight: 700; }
    .contact-side-card h2 { margin: 0; font-size: 2rem; line-height: 1.08; color: #283044; }
    .contact-side-card > p { margin: 14px 0 0; color: #696450; line-height: 1.75; }
    .contact-highlight-list { display: grid; gap: 14px; margin-top: 28px; }
    .contact-highlight { display: flex; align-items: center; gap: 12px; color: #414657; line-height: 1.6; }
    .contact-highlight-dot { width: 12px; height: 12px; flex: 0 0 12px; border-radius: 50%; background: linear-gradient(180deg, ${accentColor} 0%, ${accentSoft} 100%); box-shadow: 0 0 0 7px rgba(247, 200, 66, 0.14); }
    .contact-note-box { margin-top: 30px; border-radius: 22px; padding: 20px 18px; background: rgba(255,255,255,0.72); border: 1px solid rgba(89, 95, 113, 0.1); }
    .contact-note-box strong { display: block; color: #273147; font-size: 1rem; }
    .contact-note-box p { margin: 8px 0 0; color: #636b77; line-height: 1.7; }
    @media (max-width: 1024px) { .contact-layout { grid-template-columns: 1fr; } .contact-side-panel { order: -1; } }
    @media (max-width: 720px) { .contact-shell { padding: 20px 14px; } .contact-hero { padding: 84px 16px 18px; border-radius: 28px; } .contact-card { padding: 28px 18px 24px; border-radius: 22px; } .contact-row { grid-template-columns: 1fr; } .contact-side-card { border-radius: 24px; padding: 24px 20px; } .contact-avatar { width: 54px; height: 54px; } }
`;
