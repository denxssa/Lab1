import React, { useMemo, useState } from 'react';

const googleIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#4285F4" d="M21.81 12.23c0-.72-.06-1.25-.19-1.8H12v3.39h5.65c-.11.84-.68 2.1-1.94 2.95l-.02.11 2.82 2.18.2.02c1.86-1.71 3.1-4.23 3.1-7.85Z" />
        <path fill="#34A853" d="M12 22c2.76 0 5.08-.91 6.77-2.48l-3.23-2.5c-.86.6-2.01 1.02-3.54 1.02-2.7 0-4.99-1.78-5.81-4.23l-.1.01-2.93 2.27-.03.1A10.23 10.23 0 0 0 12 22Z" />
        <path fill="#FBBC05" d="M6.19 13.81A6.13 6.13 0 0 1 5.85 12c0-.63.12-1.23.32-1.81l-.01-.12-2.97-2.3-.1.05A10 10 0 0 0 2 12c0 1.61.38 3.13 1.05 4.48l3.14-2.67Z" />
        <path fill="#EA4335" d="M12 5.96c1.93 0 3.23.83 3.97 1.52l2.89-2.82C17.07 3 14.76 2 12 2a10.23 10.23 0 0 0-8.91 4.82l3.08 2.37C7.01 7.74 9.3 5.96 12 5.96Z" />
    </svg>
);

const renderField = (field, values, errors, onChange) => (
    <div key={field.name} className={`field-group${errors[field.name] ? ' has-error' : ''}`} data-field={field.name}>
        <label className="field-label" htmlFor={field.id}>{field.label}</label>
        <input
            className="field-input"
            id={field.id}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={values[field.name] ?? ''}
            onChange={onChange}
        />
        <span className="field-error">{errors[field.name] ?? ''}</span>
    </div>
);

export default function AuthPage({
    mode,
    title,
    message,
    fields,
    validator,
    successMessage,
    alternateHref,
    alternatePrompt,
    alternateLinkLabel,
}) {
    const initialValues = useMemo(
        () => fields.reduce((accumulator, field) => ({ ...accumulator, [field.name]: '' }), { terms: false, remember: false }),
        [fields],
    );
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [showFeedback, setShowFeedback] = useState(false);

    const handleChange = (event) => {
        const { name, type, checked, value } = event.target;
        const nextValues = {
            ...values,
            [name]: type === 'checkbox' ? checked : value,
        };

        setValues(nextValues);
        setErrors(validator(nextValues));
        setShowFeedback(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const nextErrors = validator(values);
        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            setShowFeedback(false);
            return;
        }

        setShowFeedback(true);
        setValues(initialValues);
        setErrors({});
    };

    return (
        <div className="auth-shell">
            <main className="auth-card">
                <div className="auth-header">
                    <h2 className="auth-title">{title}</h2>
                    <p className="auth-message">{message}</p>
                </div>

                {mode === 'login' && (
                    <>
                        <button type="button" className="social-button" aria-label="Sign in with Google">
                            {googleIcon}
                            <span>Sign in with Google</span>
                        </button>

                        <div className="auth-divider"><span>or continue with email</span></div>
                    </>
                )}

                <form className="auth-form" onSubmit={handleSubmit} noValidate>
                    {mode === 'signup' ? (
                        <div className="field-row">
                            {fields.slice(0, 2).map((field) => renderField(field, values, errors, handleChange))}
                        </div>
                    ) : null}

                    {fields.slice(mode === 'signup' ? 2 : 0).map((field) => renderField(field, values, errors, handleChange))}

                    {mode === 'login' && (
                        <div className="form-row">
                            <label className="checkbox" htmlFor="remember-me">
                                <input
                                    id="remember-me"
                                    name="remember"
                                    type="checkbox"
                                    checked={Boolean(values.remember)}
                                    onChange={handleChange}
                                />
                                <span>Remember Me</span>
                            </label>

                            <a href="#" className="form-link">Forgot Password?</a>
                        </div>
                    )}

                    {mode === 'signup' && (
                        <>
                            <label className="checkbox" htmlFor="terms">
                                <input
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                    checked={Boolean(values.terms)}
                                    onChange={handleChange}
                                />
                                <span>I agree to the terms and privacy policy.</span>
                            </label>

                            <div className={`field-group${errors.terms ? ' has-error' : ''}`} data-field="terms" style={{ gap: 0 }}>
                                <span className="field-error">{errors.terms ?? ''}</span>
                            </div>
                        </>
                    )}

                    <button type="submit" className="submit-button">
                        {mode === 'login' ? 'Login' : 'Create account'}
                    </button>

                    <div className={`auth-feedback${showFeedback ? ' is-visible' : ''}`} role="status" aria-live="polite">
                        {successMessage}
                    </div>
                </form>

                <p className="auth-switch">
                    {alternatePrompt}{' '}
                    <a href={alternateHref} className="form-link">{alternateLinkLabel}</a>
                </p>
            </main>
        </div>
    );
}
