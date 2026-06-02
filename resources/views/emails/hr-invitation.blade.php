<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>You've been invited to BeeHired</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
  <style>
    body { margin: 0; padding: 0; background-color: #f0ede8; }
    table { border-collapse: collapse; }
    img   { border: 0; display: block; }
    a     { text-decoration: none; }
    @media only screen and (max-width: 600px) {
      .email-wrapper  { width: 100% !important; }
      .email-body     { padding: 24px 20px !important; }
      .email-header   { padding: 28px 24px !important; }
      .cred-table td  { padding: 16px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f0ede8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f0ede8;padding:48px 16px;" role="presentation">
    <tr>
      <td align="center">
        <table class="email-wrapper" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;border-radius:20px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.10);" role="presentation">

          {{-- ══ HEADER ══ --}}
          <tr>
            <td class="email-header" style="background:#111111;padding:32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <p style="margin:0;font-size:22px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:#fdd535;line-height:1;">BEE HIRED</p>
                    <p style="margin:6px 0 0;font-size:12px;font-weight:500;color:#6b6b6b;letter-spacing:0.04em;text-transform:uppercase;">HR Platform Invitation</p>
                  </td>
                  <td align="right">
                    <div style="background:#1e1e1e;border:1px solid #333;border-radius:10px;padding:8px 14px;display:inline-block;">
                      <span style="font-size:11px;font-weight:600;color:#fdd535;letter-spacing:0.06em;">NEW ACCOUNT</span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          {{-- ══ BODY ══ --}}
          <tr>
            <td class="email-body" style="background:#ffffff;padding:40px 40px 32px;">

              {{-- Greeting --}}
              <p style="margin:0 0 6px;font-size:26px;font-weight:800;color:#111111;line-height:1.25;letter-spacing:-0.01em;">Welcome, {{ $hr->name }}!</p>
              <p style="margin:0 0 32px;font-size:14px;color:#7a746d;line-height:1.7;">
                You've been invited to join <strong style="color:#111111;">BeeHired</strong> as an HR user. Sign in with the credentials below, then complete a quick verification to activate your account.
              </p>

              {{-- Credentials card --}}
              <table class="cred-table" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fafaf8;border:1px solid #e7dfd4;border-radius:16px;margin-bottom:28px;" role="presentation">
                <tr>
                  <td style="padding:24px 28px 20px;">
                    <p style="margin:0 0 3px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#b0a89e;">Your Login Email</p>
                    <p style="margin:0 0 22px;font-size:15px;font-weight:600;color:#111111;">{{ $hr->email }}</p>

                    <p style="margin:0 0 3px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#b0a89e;">Temporary Password</p>
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background:#111111;border-radius:10px;padding:10px 18px;">
                          <span style="font-family:monospace;font-size:18px;font-weight:700;letter-spacing:0.08em;color:#fdd535;">{{ $tempPassword }}</span>
                        </td>
                      </tr>
                    </table>
                    <p style="margin:12px 0 0;font-size:12px;color:#b0a89e;line-height:1.6;">This temporary password expires in <strong style="color:#7a746d;">48 hours</strong>.</p>
                  </td>
                </tr>
              </table>

              {{-- Steps --}}
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;" role="presentation">
                <tr>
                  <td style="background:#fafaf8;border-radius:14px;border:1px solid #e7dfd4;padding:20px 24px;">
                    <p style="margin:0 0 14px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#b0a89e;">How to get started</p>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      @foreach([
                        ['01', 'Sign in', "Go to <a href=\"".url('/login')."\" style=\"color:#111111;font-weight:600;\">beehired.com/login</a> with your email and the temporary password above."],
                        ['02', 'Verify your email', 'A 4-digit verification code will be sent to this email address after you sign in.'],
                        ['03', 'Set your password', 'Create a strong new password to secure your account and gain full access.'],
                      ] as $i => [$num, $title, $desc])
                      <tr>
                        <td style="padding-bottom:{{ $i < 2 ? '14px' : '0' }};">
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td width="32" valign="top">
                                <div style="width:24px;height:24px;background:#111111;border-radius:6px;display:inline-flex;align-items:center;justify-content:center;">
                                  <span style="font-size:10px;font-weight:800;color:#fdd535;line-height:24px;display:block;text-align:center;width:24px;">{{ $num }}</span>
                                </div>
                              </td>
                              <td style="padding-left:10px;vertical-align:top;">
                                <p style="margin:0 0 2px;font-size:13px;font-weight:700;color:#111111;">{{ $title }}</p>
                                <p style="margin:0;font-size:12px;color:#7a746d;line-height:1.55;">{!! $desc !!}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      @endforeach
                    </table>
                  </td>
                </tr>
              </table>

              {{-- CTA --}}
              <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;" role="presentation">
                <tr>
                  <td style="background:#fdd535;border-radius:14px;">
                    <a href="{{ url('/login') }}" style="display:inline-block;padding:15px 36px;font-size:15px;font-weight:800;color:#111111;text-decoration:none;letter-spacing:0.01em;line-height:1;">
                      Sign In to BeeHired →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:12px;color:#b0a89e;line-height:1.7;">
                If you were not expecting this invitation, you can safely ignore this email.<br>
                Need help? Contact your platform administrator.
              </p>

            </td>
          </tr>

          {{-- ══ FOOTER ══ --}}
          <tr>
            <td style="background:#fafaf8;border-top:1px solid #e7dfd4;padding:20px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <p style="margin:0;font-size:11px;color:#c0b9b2;line-height:1.7;">
                      &copy; {{ date('Y') }} BeeHired &nbsp;&middot;&nbsp; This is an automated message, please do not reply.
                    </p>
                  </td>
                  <td align="right">
                    <p style="margin:0;font-size:11px;color:#c0b9b2;">
                      <a href="{{ url('/') }}" style="color:#c0b9b2;text-decoration:none;">BeeHired.com</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
