import React, { useState } from 'react';
import heroImage from '../assets/home/images.jpeg';

const featureItems = [
    'Get instant access to your account activity',
    'Track saved jobs and application progress',
    'Manage your profile from one clean workspace',
];

const socialItems = [
    {
        label: 'Google',
        accent: '#ea4335',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M21.81 12.23c0-.72-.06-1.25-.19-1.8H12v3.39h5.65c-.11.84-.68 2.1-1.94 2.95l-.02.11 2.82 2.18.2.02c1.86-1.71 3.1-4.23 3.1-7.85Z" />
                <path fill="#34A853" d="M12 22c2.76 0 5.08-.91 6.77-2.48l-3.23-2.5c-.86.6-2.01 1.02-3.54 1.02-2.7 0-4.99-1.78-5.81-4.23l-.1.01-2.93 2.27-.03.1A10.23 10.23 0 0 0 12 22Z" />
                <path fill="#FBBC05" d="M6.19 13.81A6.13 6.13 0 0 1 5.85 12c0-.63.12-1.23.32-1.81l-.01-.12-2.97-2.3-.1.05A10 10 0 0 0 2 12c0 1.61.38 3.13 1.05 4.48l3.14-2.67Z" />
                <path fill="#EA4335" d="M12 5.96c1.93 0 3.23.83 3.97 1.52l2.89-2.82C17.07 3 14.76 2 12 2a10.23 10.23 0 0 0-8.91 4.82l3.08 2.37C7.01 7.74 9.3 5.96 12 5.96Z" />
            </svg>
        ),
    },
    {
        label: 'Facebook',
        accent: '#1877f2',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M13.5 22v-8.2h2.76l.41-3.2H13.5V8.55c0-.93.26-1.56 1.59-1.56h1.7V4.13c-.82-.09-1.64-.13-2.46-.12-2.44 0-4.11 1.49-4.11 4.23v2.36H7.5v3.2h2.72V22h3.28Z" />
            </svg>
        ),
    },
    {
        label: 'Twitter',
        accent: '#1d9bf0',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M18.9 2H22l-6.77 7.73L23.2 22h-6.26l-4.9-6.43L6.4 22H3.3l7.24-8.27L.8 2H7.2l4.42 5.88L18.9 2Zm-1.1 18h1.73L6.27 3.9H4.42L17.8 20Z" />
            </svg>
        ),
    },
];

const iconColor = '#f45a2a';

const WalletIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
        <path fill={iconColor} d="M18 7V6a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h12a1 1 0 0 1 1 1v1h-2a3 3 0 0 0 0 6h2v1a2 2 0 0 1-2 2H6a3 3 0 0 1-3-3V7.83A4 4 0 0 0 5 8h13Zm1 7h-3a1 1 0 0 0 0 2h3v-2Z" />
    </svg>
);

const MailIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M20 6H4a2 2 0 0 0-2 2v.35l10 5.88 10-5.88V8a2 2 0 0 0-2-2Zm0 4.67-7.5 4.41a1 1 0 0 1-1 0L4 10.67V16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5.33Z" />
    </svg>
);

const LockIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M17 9h-1V7a4 4 0 1 0-8 0v2H7a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2Zm-7-2a2 2 0 1 1 4 0v2h-4V7Zm7 12H7v-8h10v8Z" />
    </svg>
);

const BulletIcon = ({ children }) => <span className="login-bullet-icon">{children}</span>;

export default function Login() {
    const [values, setValues] = useState({
        email: '',
        password: '',
        remember: false,
    });
    const [errors, setErrors] = useState({});
    const [showFeedback, setShowFeedback] = useState(false);

    const handleChange = (event) => {
        const { name, type, checked, value } = event.target;
        const nextValues = {
            ...values,
            [name]: type === 'checkbox' ? checked : value,
        };

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
        setValues({ email: '', password: '', remember: false });
        setErrors({});
    };

    return (
        <>
            <style>{styles}</style>
            <div className="login-shell">
                <div className="login-layout">
                    <section className="login-visual" aria-hidden="true">
                        <div className="login-visual-overlay" />
                        <div className="login-visual-content">
                            <div className="login-logo-chip">
                                <WalletIcon />
                            </div>
                            <div className="login-copy">
                                <p className="login-eyebrow">Member Access</p>
                                <h1>Hello, welcome back.</h1>
                                <p>Sign in to continue exploring opportunities, saved listings, and your latest account activity.</p>
                            </div>
                            <div className="login-bullets">
                                {featureItems.map((item, index) => (
                                    <div key={item} className="login-bullet">
                                        <BulletIcon>{index + 1}</BulletIcon>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="login-social-strip">
                                {socialItems.map((item) => (
                                    <span key={item.label} className="login-social-chip" style={{ color: item.accent }}>
                                        {item.icon}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="login-form-panel">
                        <div className="login-form-card">
                            <div className="login-form-head">
                                <h2>Log In</h2>
                                <p>Welcome back to your account</p>
                            </div>

                            <form className="login-form" onSubmit={handleSubmit} noValidate>
                                <label className={`login-field ${errors.email ? 'is-error' : ''}`} htmlFor="login-email">
                                    <span className="login-field-icon"><MailIcon /></span>
                                    <input id="login-email" name="email" type="email" placeholder="Email" value={values.email} onChange={handleChange} />
                                </label>
                                <span className="login-error">{errors.email ?? ''}</span>

                                <label className={`login-field ${errors.password ? 'is-error' : ''}`} htmlFor="login-password">
                                    <span className="login-field-icon"><LockIcon /></span>
                                    <input id="login-password" name="password" type="password" placeholder="Password" value={values.password} onChange={handleChange} />
                                    <span className="login-field-trailing">
                                        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fill="currentColor" d="M12 5c-7 0-10 7-10 7s1.74 4.06 5.72 6.11l-1.42 1.42 1.41 1.41 14-14-1.41-1.41-2.18 2.18A10.78 10.78 0 0 0 12 5Zm0 14c-1.12 0-2.16-.24-3.1-.67l1.67-1.67A3 3 0 0 0 14.34 12L16.5 9.84A8.96 8.96 0 0 1 20 12s-3 7-8 7Zm0-10a3 3 0 0 0-3 3c0 .32.05.63.14.91l3.77-3.77A2.9 2.9 0 0 0 12 9Z" />
                                        </svg>
                                    </span>
                                </label>
                                <span className="login-error">{errors.password ?? ''}</span>

                                <div className="login-inline-row">
                                    <label className="login-check" htmlFor="remember-me">
                                        <input id="remember-me" name="remember" type="checkbox" checked={Boolean(values.remember)} onChange={handleChange} />
                                        <span>Remember me</span>
                                    </label>
                                    <a href="#" className="login-link">Forgot Password ?</a>
                                </div>

                                <button type="submit" className="login-submit">Log In</button>

                                <div className={`login-feedback ${showFeedback ? 'is-visible' : ''}`} role="status" aria-live="polite">
                                    Login details look good.
                                </div>
                            </form>

                            <p className="login-switch">Don't have an account? <a href="/signup">Register</a></p>
                            <div className="login-divider">Continue with</div>
                            <div className="login-social-actions">
                                {socialItems.map((item) => (
                                    <button key={item.label} type="button" className="login-social-action">
                                        <span className="login-social-action-icon" style={{ color: item.accent }}>{item.icon}</span>
                                        <span>{item.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

function validate(values) {
    const errors = {};
    if (!values.email.trim()) {
        errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'Enter a valid email address.';
    }
    if (!values.password.trim()) {
        errors.password = 'Password is required.';
    } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters.';
    }
    return errors;
}

const styles = `
    .login-shell { min-height: 100vh; padding: 32px 20px; background: radial-gradient(circle at top left, rgba(244, 90, 42, 0.18), transparent 32%), linear-gradient(135deg, #fff8f4 0%, #fffdfb 45%, #f7f4ef 100%); display: flex; align-items: center; justify-content: center; }
    .login-layout { width: min(1320px, 100%); display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 36px; align-items: stretch; }
    .login-visual { position: relative; min-height: 760px; border-radius: 34px; overflow: hidden; background: linear-gradient(180deg, rgba(29, 23, 18, 0.42), rgba(16, 13, 10, 0.68)), url(${heroImage}); background-size: cover; background-position: center; box-shadow: 0 26px 60px rgba(46, 30, 20, 0.18); }
    .login-visual-overlay { position: absolute; inset: 0; background: radial-gradient(circle at 25% 22%, rgba(255, 255, 255, 0.08), transparent 24%), linear-gradient(180deg, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.44)); }
    .login-visual-content { position: relative; z-index: 1; height: 100%; display: flex; flex-direction: column; justify-content: space-between; padding: 58px 54px 48px; color: #fff; }
    .login-logo-chip { width: 84px; height: 84px; border-radius: 24px; background: rgba(255, 255, 255, 0.94); display: inline-flex; align-items: center; justify-content: center; box-shadow: 0 20px 45px rgba(0, 0, 0, 0.2); }
    .login-copy { max-width: 440px; margin-top: auto; margin-bottom: 36px; }
    .login-eyebrow { margin: 0 0 12px; font-size: 0.88rem; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255, 255, 255, 0.74); }
    .login-copy h1 { margin: 0; font-size: clamp(2.1rem, 3vw, 3.35rem); line-height: 1.05; font-weight: 700; }
    .login-copy p { margin: 16px 0 0; font-size: 1rem; line-height: 1.75; color: rgba(255, 255, 255, 0.82); }
    .login-bullets { display: grid; gap: 18px; max-width: 440px; }
    .login-bullet { display: flex; align-items: center; gap: 16px; font-size: 1rem; color: rgba(255, 255, 255, 0.88); }
    .login-bullet-icon { width: 38px; height: 38px; flex: 0 0 38px; border-radius: 50%; background: rgba(255, 255, 255, 0.94); color: ${iconColor}; display: inline-flex; align-items: center; justify-content: center; font-size: 0.98rem; font-weight: 700; box-shadow: 0 10px 22px rgba(0, 0, 0, 0.16); }
    .login-social-strip { display: flex; gap: 18px; margin-top: 36px; }
    .login-social-chip { width: 64px; height: 64px; border-radius: 50%; background: rgba(255, 255, 255, 0.97); display: inline-flex; align-items: center; justify-content: center; box-shadow: 0 14px 28px rgba(0, 0, 0, 0.18); }
    .login-form-panel { display: flex; align-items: center; justify-content: center; }
    .login-form-card { width: min(100%, 620px); background: rgba(255, 255, 255, 0.96); border-radius: 30px; padding: 44px 46px 34px; box-shadow: 0 24px 50px rgba(71, 43, 23, 0.1); border: 1px solid rgba(244, 90, 42, 0.08); }
    .login-form-head h2 { margin: 0; color: #171717; font-size: 2.2rem; font-weight: 700; }
    .login-form-head p { margin: 12px 0 0; color: #5f5b57; font-size: 1.15rem; }
    .login-form { margin-top: 34px; }
    .login-field { display: flex; align-items: center; gap: 14px; min-height: 64px; padding: 0 20px; border-radius: 999px; background: #fff; border: 1px solid rgba(37, 32, 27, 0.12); transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease; }
    .login-field:focus-within { border-color: rgba(244, 90, 42, 0.72); box-shadow: 0 0 0 6px rgba(244, 90, 42, 0.09); transform: translateY(-1px); }
    .login-field.is-error { border-color: rgba(244, 90, 42, 0.92); }
    .login-field input { flex: 1; border: 0; outline: none; background: transparent; color: #222; font-size: 1.03rem; }
    .login-field input::placeholder { color: #8e8a85; }
    .login-field-icon, .login-field-trailing { color: #98938d; display: inline-flex; align-items: center; justify-content: center; }
    .login-inline-row { display: flex; align-items: center; justify-content: space-between; gap: 18px; margin: 10px 4px 24px; flex-wrap: wrap; }
    .login-check { display: inline-flex; align-items: center; gap: 12px; color: #24211e; font-size: 1rem; font-weight: 600; }
    .login-check input { width: 18px; height: 18px; accent-color: ${iconColor}; }
    .login-link { color: #3a47ff; text-decoration: none; font-weight: 600; }
    .login-submit { width: 100%; border: 0; border-radius: 999px; min-height: 58px; background: linear-gradient(90deg, #f45a2a 0%, #ff6b2d 100%); color: #fff; font-size: 1.2rem; font-weight: 700; cursor: pointer; box-shadow: 0 18px 34px rgba(244, 90, 42, 0.22); }
    .login-feedback { min-height: 24px; margin-top: 14px; color: #1b8a44; font-weight: 600; opacity: 0; transition: opacity 0.2s ease; }
    .login-feedback.is-visible { opacity: 1; }
    .login-error { display: block; min-height: 22px; margin: 8px 8px 4px 18px; color: #de5a37; font-size: 0.92rem; }
    .login-switch { margin: 28px 0 0; text-align: center; color: #7d7770; font-size: 1.02rem; }
    .login-switch a { color: ${iconColor}; text-decoration: none; font-weight: 700; }
    .login-divider { margin: 20px 0 18px; text-align: center; color: #7d7770; font-size: 1rem; }
    .login-social-actions { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
    .login-social-action { min-height: 60px; border-radius: 999px; border: 1px solid rgba(37, 32, 27, 0.12); background: #fff; display: inline-flex; align-items: center; justify-content: center; gap: 12px; color: #221f1c; font-size: 1rem; font-weight: 700; cursor: pointer; }
    .login-social-action-icon { display: inline-flex; align-items: center; justify-content: center; }
    @media (max-width: 1080px) { .login-layout { grid-template-columns: 1fr; } .login-visual { min-height: 560px; } }
    @media (max-width: 680px) { .login-shell { padding: 16px; } .login-visual-content, .login-form-card { padding: 28px 22px; } .login-visual { min-height: 520px; border-radius: 28px; } .login-form-card { border-radius: 26px; } .login-social-actions { grid-template-columns: 1fr; } }
`;
