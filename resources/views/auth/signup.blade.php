@extends('layouts.auth')

@section('title', 'Signup')
@section('content')
    <div class="auth-header">
        <h2 class="auth-title">Sign Up</h2>
        <p class="auth-message">Welcome. Create your account below.</p>
    </div>

    <form class="auth-form" id="signupForm" novalidate>
        <div class="field-row">
            <div class="field-group" data-field="first_name">
                <label class="field-label" for="first-name">First name</label>
                <input class="field-input" id="first-name" name="first_name" type="text" placeholder="John" />
                <span class="field-error"></span>
            </div>

            <div class="field-group" data-field="last_name">
                <label class="field-label" for="last-name">Last name</label>
                <input class="field-input" id="last-name" name="last_name" type="text" placeholder="Doe" />
                <span class="field-error"></span>
            </div>
        </div>

        <div class="field-group" data-field="email">
            <label class="field-label" for="signup-email">Email address</label>
            <input class="field-input" id="signup-email" name="email" type="email" placeholder="you@example.com" />
            <span class="field-error"></span>
        </div>

        <div class="field-group" data-field="password">
            <label class="field-label" for="signup-password">Password</label>
            <input class="field-input" id="signup-password" name="password" type="password" placeholder="Create a password" />
            <span class="field-error"></span>
        </div>

        <div class="field-group" data-field="password_confirmation">
            <label class="field-label" for="signup-password-confirmation">Confirm password</label>
            <input class="field-input" id="signup-password-confirmation" name="password_confirmation" type="password" placeholder="Repeat your password" />
            <span class="field-error"></span>
        </div>

        <label class="checkbox" for="terms">
            <input id="terms" name="terms" type="checkbox" />
            <span>I agree to the terms and privacy policy.</span>
        </label>

        <div class="field-group" data-field="terms" style="gap: 0;">
            <span class="field-error"></span>
        </div>

        <button type="submit" class="submit-button">Create account</button>
    </form>

    <p class="auth-switch">
        Already have an account?
        <a href="{{ route('login') }}" class="form-link">Login instead</a>
    </p>
@endsection
