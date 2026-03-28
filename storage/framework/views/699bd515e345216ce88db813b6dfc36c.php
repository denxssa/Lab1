<!DOCTYPE html>
<html lang="<?php echo e(str_replace('_', '-', app()->getLocale())); ?>">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">
        <title><?php echo $__env->yieldContent('title', 'Auth'); ?> - <?php echo e(config('app.name', 'App')); ?></title>

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />

        <style>
            :root {
                color-scheme: light;
                --bg: #f5f7fb;
                --card: #ffffff;
                --text: #111827;
                --muted: #6b7280;
                --border: #dbe2ea;
                --primary: #2563eb;
                --primary-dark: #1d4ed8;
                --danger: #dc2626;
                --success-bg: #ecfdf5;
                --success-text: #047857;
                --shadow: 0 20px 45px rgba(15, 23, 42, 0.08);
            }

            * {
                box-sizing: border-box;
            }

            body {
                margin: 0;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 24px;
                font-family: "Instrument Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
                color: var(--text);
                background: var(--bg);
            }

            a {
                color: inherit;
            }

            .auth-card {
                width: min(100%, 420px);
                padding: 32px;
                border: 1px solid var(--border);
                border-radius: 20px;
                background: var(--card);
                box-shadow: var(--shadow);
            }

            .auth-header {
                margin-bottom: 24px;
                text-align: center;
            }

            .auth-title {
                margin: 0 0 8px;
                font-size: 1.9rem;
                font-weight: 700;
            }

            .auth-message {
                margin: 0;
                color: var(--muted);
                font-size: 0.95rem;
            }

            .social-button,
            .submit-button {
                width: 100%;
                border: 0;
                border-radius: 12px;
                font: inherit;
                font-weight: 600;
                cursor: pointer;
            }

            .social-button {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                padding: 14px 16px;
                color: var(--text);
                background: #fff;
                border: 1px solid var(--border);
            }

            .auth-divider {
                position: relative;
                margin: 18px 0;
                text-align: center;
                color: var(--muted);
                font-size: 0.9rem;
            }

            .auth-divider::before {
                content: "";
                position: absolute;
                top: 50%;
                left: 0;
                right: 0;
                height: 1px;
                background: var(--border);
            }

            .auth-divider span {
                position: relative;
                padding: 0 12px;
                background: var(--card);
            }

            .auth-form {
                display: grid;
                gap: 16px;
            }

            .field-group {
                display: grid;
                gap: 6px;
            }

            .field-row {
                display: grid;
                grid-template-columns: repeat(2, minmax(0, 1fr));
                gap: 12px;
            }

            .field-label {
                font-size: 0.92rem;
                font-weight: 600;
            }

            .field-input {
                width: 100%;
                padding: 12px 14px;
                border: 1px solid var(--border);
                border-radius: 12px;
                background: #fff;
                color: var(--text);
                font: inherit;
                outline: none;
            }

            .field-input:focus {
                border-color: var(--primary);
                box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
            }

            .field-error {
                display: none;
                color: var(--danger);
                font-size: 0.82rem;
            }

            .field-group.has-error .field-input {
                border-color: var(--danger);
            }

            .field-group.has-error .field-error {
                display: block;
            }

            .form-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 12px;
                color: var(--muted);
                font-size: 0.9rem;
            }

            .checkbox {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                cursor: pointer;
            }

            .checkbox input {
                width: 16px;
                height: 16px;
                accent-color: var(--primary);
            }

            .form-link {
                color: var(--primary);
                text-decoration: none;
                font-weight: 600;
            }

            .form-link:hover {
                color: var(--primary-dark);
            }

            .submit-button {
                padding: 13px 16px;
                color: #fff;
                background: var(--primary);
            }

            .submit-button:hover {
                background: var(--primary-dark);
            }

            .auth-feedback {
                display: none;
                padding: 12px 14px;
                border-radius: 12px;
                background: var(--success-bg);
                color: var(--success-text);
                font-size: 0.9rem;
            }

            .auth-feedback.is-visible {
                display: block;
            }

            .auth-switch {
                margin: 20px 0 0;
                text-align: center;
                color: var(--muted);
                font-size: 0.92rem;
            }

            @media (max-width: 520px) {
                body {
                    padding: 16px;
                }

                .auth-card {
                    padding: 24px;
                }

                .field-row,
                .form-row {
                    grid-template-columns: 1fr;
                    flex-direction: column;
                    align-items: flex-start;
                }
            }
        </style>
    </head>
    <body>
        <main class="auth-card">
            <?php echo $__env->yieldContent('content'); ?>
        </main>

        <?php echo $__env->yieldContent('scripts'); ?>
    </body>
</html>
<?php /**PATH C:\xampp\htdocs\lab1\resources\views/layouts/auth.blade.php ENDPATH**/ ?>