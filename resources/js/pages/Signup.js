import React from 'react';
import AuthPage from '../components/shared/AuthPage';

const fields = [
    {
        id: 'first-name',
        name: 'first_name',
        label: 'First name',
        type: 'text',
        placeholder: 'John',
    },
    {
        id: 'last-name',
        name: 'last_name',
        label: 'Last name',
        type: 'text',
        placeholder: 'Doe',
    },
    {
        id: 'signup-email',
        name: 'email',
        label: 'Email address',
        type: 'email',
        placeholder: 'you@example.com',
    },
    {
        id: 'signup-password',
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Create a password',
    },
    {
        id: 'signup-password-confirmation',
        name: 'password_confirmation',
        label: 'Confirm password',
        type: 'password',
        placeholder: 'Repeat your password',
    },
];

const validate = (values) => {
    const errors = {};

    if (!values.first_name.trim()) {
        errors.first_name = 'First name is required.';
    }

    if (!values.last_name.trim()) {
        errors.last_name = 'Last name is required.';
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
};

export default function Signup() {
    return (
        <AuthPage
            mode="signup"
            title="Sign Up"
            message="Welcome. Create your account below."
            fields={fields}
            validator={validate}
            successMessage="Your details look good."
            alternateHref="/login"
            alternatePrompt="Already have an account?"
            alternateLinkLabel="Login instead"
        />
    );
}
