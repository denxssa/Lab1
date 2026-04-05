import React from 'react';
import AuthPage from '../components/shared/AuthPage';

const fields = [
    {
        id: 'login-email',
        name: 'email',
        label: 'Email address',
        type: 'email',
        placeholder: 'you@example.com',
    },
    {
        id: 'login-password',
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Enter your password',
    },
];

const validate = (values) => {
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
};

export default function Login() {
    return (
        <AuthPage
            mode="login"
            title="Login"
            message="Welcome back. Please enter your details."
            fields={fields}
            validator={validate}
            successMessage="Login details look good."
            alternateHref="/signup"
            alternatePrompt="Don't have an account?"
            alternateLinkLabel="Create one"
        />
    );
}
