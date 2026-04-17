import React, { useState } from 'react';
import heroImage from '../assets/home/images.jpeg';

const featureItems = [
    'Build a profile that recruiters can review quickly',
    'Save roles and track every application in one place',
    'Receive updates that match your career interests',
];

const iconColor = '#f7c842';

const WalletIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
        <path fill={iconColor} d="M18 7V6a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h12a1 1 0 0 1 1 1v1h-2a3 3 0 0 0 0 6h2v1a2 2 0 0 1-2 2H6a3 3 0 0 1-3-3V7.83A4 4 0 0 0 5 8h13Zm1 7h-3a1 1 0 0 0 0 2h3v-2Z" />
    </svg>
);

const UserIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" />
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

const BulletIcon = ({ children }) => <span className="signup-bullet-icon">{children}</span>;

export default function Signup() {
    const [values, setValues] = useState({
        full_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        terms: false,
        newsletter: false,
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
        setValues({
            full_name: '',
            email: '',
            password: '',
            password_confirmation: '',
            terms: false,
            newsletter: false,
        });
        setErrors({});
    };

    return (
        <>
            <style>{styles}</style>
            <div className="signup-shell">
                <div className="signup-layout">
                    <section className="signup-visual" aria-hidden="true" data-aos="fade-up">
                        <div className="signup-visual-overlay" />
                        <div className="signup-visual-content">
                            <div className="signup-logo-chip" data-aos="fade-up" data-aos-delay="80">
                                <WalletIcon />
                            </div>
                            <div className="signup-copy" data-aos="fade-up" data-aos-delay="160">
                                <p className="signup-eyebrow">Create Your Space</p>
                                <h1>Step into your next career move.</h1>
                                <p>Build your account, organize your search, and keep every opportunity within reach from one polished dashboard.</p>
                            </div>
                            <div className="signup-bullets" data-aos="fade-up" data-aos-delay="240">
                                {featureItems.map((item, index) => (
                                    <div key={item} className="signup-bullet">
                                        <BulletIcon>{index + 1}</BulletIcon>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="signup-form-panel">
                        <div className="signup-form-card" data-aos="fade-up" data-aos-delay="140">
                            <div className="signup-form-head" data-aos="fade-up" data-aos-delay="200">
                                <h2>Create Account</h2>
                                <p>Create your free account and start managing your applications</p>
                            </div>

                            <form className="signup-form" data-aos="fade-up" data-aos-delay="280" onSubmit={handleSubmit} noValidate>
                                <label className={`signup-field ${errors.full_name ? 'is-error' : ''}`} htmlFor="full-name">
                                    <span className="signup-field-icon"><UserIcon /></span>
                                    <input id="full-name" name="full_name" type="text" placeholder="Full name" value={values.full_name} onChange={handleChange} />
                                </label>
                                <span className="signup-error">{errors.full_name ?? ''}</span>

                                <label className={`signup-field ${errors.email ? 'is-error' : ''}`} htmlFor="signup-email">
                                    <span className="signup-field-icon"><MailIcon /></span>
                                    <input id="signup-email" name="email" type="email" placeholder="Email Address" value={values.email} onChange={handleChange} />
                                </label>
                                <span className="signup-error">{errors.email ?? ''}</span>

                                <label className={`signup-field ${errors.password ? 'is-error' : ''}`} htmlFor="signup-password">
                                    <span className="signup-field-icon"><LockIcon /></span>
                                    <input id="signup-password" name="password" type="password" placeholder="Password" value={values.password} onChange={handleChange} />
                                    <span className="signup-field-trailing">
                                        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fill="currentColor" d="M12 5c-7 0-10 7-10 7s1.74 4.06 5.72 6.11l-1.42 1.42 1.41 1.41 14-14-1.41-1.41-2.18 2.18A10.78 10.78 0 0 0 12 5Zm0 14c-1.12 0-2.16-.24-3.1-.67l1.67-1.67A3 3 0 0 0 14.34 12L16.5 9.84A8.96 8.96 0 0 1 20 12s-3 7-8 7Zm0-10a3 3 0 0 0-3 3c0 .32.05.63.14.91l3.77-3.77A2.9 2.9 0 0 0 12 9Z" />
                                        </svg>
                                    </span>
                                </label>
                                <span className="signup-error">{errors.password ?? ''}</span>

                                <label className={`signup-field ${errors.password_confirmation ? 'is-error accent-error' : ''}`} htmlFor="signup-password-confirmation">
                                    <span className="signup-field-icon"><LockIcon /></span>
                                    <input id="signup-password-confirmation" name="password_confirmation" type="password" placeholder="Confirm Password" value={values.password_confirmation} onChange={handleChange} />
                                    <span className="signup-field-trailing">
                                        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fill="currentColor" d="M12 5c-7 0-10 7-10 7s1.74 4.06 5.72 6.11l-1.42 1.42 1.41 1.41 14-14-1.41-1.41-2.18 2.18A10.78 10.78 0 0 0 12 5Zm0 14c-1.12 0-2.16-.24-3.1-.67l1.67-1.67A3 3 0 0 0 14.34 12L16.5 9.84A8.96 8.96 0 0 1 20 12s-3 7-8 7Zm0-10a3 3 0 0 0-3 3c0 .32.05.63.14.91l3.77-3.77A2.9 2.9 0 0 0 12 9Z" />
                                        </svg>
                                    </span>
                                </label>
                                <span className="signup-error">{errors.password_confirmation ?? ''}</span>

                                <label className="signup-check" htmlFor="terms">
                                    <input id="terms" name="terms" type="checkbox" checked={Boolean(values.terms)} onChange={handleChange} />
                                    <span>I agree to the Terms &amp; Conditions and Privacy Policy</span>
                                </label>
                                <span className="signup-error">{errors.terms ?? ''}</span>

                                <label className="signup-check" htmlFor="newsletter">
                                    <input id="newsletter" name="newsletter" type="checkbox" checked={Boolean(values.newsletter)} onChange={handleChange} />
                                    <span>Sign up for email updates and hiring news</span>
                                </label>

                                <button type="submit" className="signup-submit">Sign Up</button>

                                <div className={`signup-feedback ${showFeedback ? 'is-visible' : ''}`} role="status" aria-live="polite">
                                    Your details look good.
                                </div>
                            </form>

                            <p className="signup-switch" data-aos="fade-up" data-aos-delay="400">Already an account? <a href="/login">Log in</a></p>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

function validate(values) {
    const errors = {};
    if (!values.full_name.trim()) {
        errors.full_name = 'Full name is required.';
    }
    if (!values.email.trim()) {
        errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'Enter a valid email address.';
    }
    if (!values.password.trim()) {
        errors.password = 'Password is required.';
    } else if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters.';
    }
    if (!values.password_confirmation.trim()) {
        errors.password_confirmation = 'Please confirm your password.';
    } else if (values.password_confirmation !== values.password) {
        errors.password_confirmation = 'Passwords do not match.';
    }
    if (!values.terms) {
        errors.terms = 'You must agree before continuing.';
    }
    return errors;
}

const styles = `
    .signup-shell { min-height: 100vh; padding: 32px 20px; background: radial-gradient(circle at top right, rgba(244, 90, 42, 0.16), transparent 28%), linear-gradient(140deg, #fff8f2 0%, #fffdfb 48%, #f6f2eb 100%); display: flex; align-items: center; justify-content: center; }
    .signup-layout { width: min(1340px, 100%); display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 36px; align-items: stretch; }
    .signup-visual { position: relative; min-height: 780px; border-radius: 34px; overflow: hidden; background: linear-gradient(180deg, rgba(35, 23, 18, 0.38), rgba(14, 11, 9, 0.7)), url(${heroImage}); background-size: cover; background-position: center; box-shadow: 0 26px 60px rgba(46, 30, 20, 0.18); }
    .signup-visual-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.5)), radial-gradient(circle at 72% 20%, rgba(255, 255, 255, 0.08), transparent 20%); }
    .signup-visual-content { position: relative; z-index: 1; height: 100%; display: flex; flex-direction: column; justify-content: center; gap: 34px; padding: 58px 54px; color: #fff; }
    .signup-logo-chip { width: 84px; height: 84px; border-radius: 24px; background: rgba(255, 255, 255, 0.94); display: inline-flex; align-items: center; justify-content: center; box-shadow: 0 20px 45px rgba(0, 0, 0, 0.2); }
    .signup-copy { max-width: 470px; }
    .signup-eyebrow { margin: 0 0 12px; font-size: 0.88rem; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255, 255, 255, 0.74); }
    .signup-copy h1 { margin: 0; font-size: clamp(2.1rem, 3vw, 3.25rem); line-height: 1.08; font-weight: 700; }
    .signup-copy p { margin: 16px 0 0; font-size: 1rem; line-height: 1.8; color: rgba(255, 255, 255, 0.82); }
    .signup-bullets { display: grid; gap: 18px; max-width: 450px; }
    .signup-bullet { display: flex; align-items: center; gap: 16px; color: rgba(255, 255, 255, 0.88); font-size: 1rem; }
    .signup-bullet-icon { width: 38px; height: 38px; flex: 0 0 38px; border-radius: 50%; background: rgba(255, 255, 255, 0.94); color: ${iconColor}; display: inline-flex; align-items: center; justify-content: center; font-size: 0.98rem; font-weight: 700; box-shadow: 0 10px 22px rgba(0, 0, 0, 0.16); }
    .signup-form-panel { display: flex; align-items: center; justify-content: center; }
    .signup-form-card { width: min(100%, 640px); background: rgba(255, 255, 255, 0.96); border-radius: 30px; padding: 42px 44px 32px; box-shadow: 0 24px 50px rgba(71, 43, 23, 0.1); border: 1px solid rgba(244, 90, 42, 0.08); }
    .signup-form-head h2 { margin: 0; color: #171717; font-size: 2rem; font-weight: 700; }
    .signup-form-head p { margin: 12px 0 0; color: #6d6861; font-size: 1.08rem; line-height: 1.6; }
    .signup-form { margin-top: 28px; }
    .signup-field { display: flex; align-items: center; gap: 14px; min-height: 62px; padding: 0 20px; border-radius: 999px; background: #fff; border: 1px solid rgba(37, 32, 27, 0.12); transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease; }
    .signup-field:focus-within { border-color: rgba(244, 90, 42, 0.72); box-shadow: 0 0 0 6px rgba(244, 90, 42, 0.09); transform: translateY(-1px); }
    .signup-field.is-error, .signup-field.accent-error { border-color: rgba(244, 90, 42, 0.92); }
    .signup-field input { flex: 1; border: 0; outline: none; background: transparent; color: #222; font-size: 1.02rem; }
    .signup-field input::placeholder { color: #8e8a85; }
    .signup-field-icon, .signup-field-trailing { color: #98938d; display: inline-flex; align-items: center; justify-content: center; }
    .signup-error { display: block; min-height: 22px; margin: 8px 8px 4px 18px; color: #de5a37; font-size: 0.92rem; }
    .signup-check { display: flex; align-items: flex-start; gap: 12px; margin: 8px 4px 0; color: #26221f; font-size: 0.98rem; line-height: 1.6; }
    .signup-check input { width: 18px; height: 18px; margin-top: 3px; accent-color: ${iconColor}; }
    .signup-submit { width: 100%; margin-top: 16px; border: 0; border-radius: 999px; min-height: 58px; background: linear-gradient(90deg, #f7c842 0%, #ffe06b 100%); color: #342600; font-size: 1.18rem; font-weight: 700; cursor: pointer; box-shadow: 0 18px 34px rgba(247, 200, 66, 0.24); }
    .signup-feedback { min-height: 24px; margin-top: 14px; color: #1b8a44; font-weight: 600; opacity: 0; transition: opacity 0.2s ease; }
    .signup-feedback.is-visible { opacity: 1; }
    .signup-switch { margin: 24px 0 0; text-align: center; color: #7d7770; font-size: 1rem; }
    .signup-switch a { color: ${iconColor}; text-decoration: none; font-weight: 700; }
    @media (max-width: 1080px) { .signup-layout { grid-template-columns: 1fr; } .signup-visual { min-height: 560px; } }
    @media (max-width: 680px) { .signup-shell { padding: 16px; } .signup-visual-content, .signup-form-card { padding: 28px 22px; } .signup-visual { min-height: 520px; border-radius: 28px; } .signup-form-card { border-radius: 26px; } }
`;
