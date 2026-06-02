<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Your BeeHired Verification Code</title>
  <style>
    body { margin: 0; padding: 0; background-color: #f0ede8; }
    table { border-collapse: collapse; }
    @media only screen and (max-width: 600px) {
      .email-wrapper { width: 100% !important; }
      .email-body    { padding: 28px 20px !important; }
      .code-display  { font-size: 52px !important; letter-spacing: 0.3em !important; }
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
            <td style="background:#111111;padding:32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <p style="margin:0;font-size:22px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:#fdd535;line-height:1;">BEE HIRED</p>
                    <p style="margin:6px 0 0;font-size:12px;font-weight:500;color:#6b6b6b;letter-spacing:0.04em;text-transform:uppercase;">Security Verification</p>
                  </td>
                  <td align="right">
                    <div style="background:#1e1e1e;border:1px solid #333;border-radius:10px;padding:8px 14px;display:inline-block;">
                      <span style="font-size:11px;font-weight:600;color:#fdd535;letter-spacing:0.06em;">VERIFY NOW</span>
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
              <p style="margin:0 0 6px;font-size:26px;font-weight:800;color:#111111;line-height:1.25;letter-spacing:-0.01em;">Verify your identity</p>
              <p style="margin:0 0 32px;font-size:14px;color:#7a746d;line-height:1.7;">
                Hi <strong style="color:#111111;">{{ $hr->name }}</strong>, use the code below to complete your BeeHired account setup. This code is valid for <strong style="color:#111111;">10 minutes</strong>.
              </p>

              {{-- Code display --}}
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;" role="presentation">
                <tr>
                  <td align="center">
                    <table cellpadding="0" cellspacing="0" border="0" style="background:#fafaf8;border:2px solid #111111;border-radius:20px;padding:32px 48px;" role="presentation">
                      <tr>
                        <td align="center">
                          <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#b0a89e;">Your Verification Code</p>
                          <p class="code-display" style="margin:0;font-family:'Courier New',Courier,monospace;font-size:64px;font-weight:900;color:#111111;letter-spacing:0.4em;line-height:1;">{{ $code }}</p>
                          <table cellpadding="0" cellspacing="0" border="0" style="margin-top:14px;" role="presentation">
                            <tr>
                              <td style="background:#fdd535;border-radius:8px;padding:6px 14px;">
                                <span style="font-size:12px;font-weight:700;color:#111111;letter-spacing:0.04em;">Expires in 10 minutes</span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              {{-- Instructions --}}
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;" role="presentation">
                <tr>
                  <td style="background:#fafaf8;border:1px solid #e7dfd4;border-radius:14px;padding:18px 22px;">
                    <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#b0a89e;">How to use this code</p>
                    <p style="margin:0 0 6px;font-size:13px;color:#7a746d;line-height:1.6;">
                      ① Return to the BeeHired account setup page in your browser.
                    </p>
                    <p style="margin:0;font-size:13px;color:#7a746d;line-height:1.6;">
                      ② Enter the <strong style="color:#111111;">{{ $code }}</strong> code in the verification field and click <strong style="color:#111111;">Verify code</strong>.
                    </p>
                  </td>
                </tr>
              </table>

              {{-- Security warning --}}
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;" role="presentation">
                <tr>
                  <td style="background:#fffbeb;border:1px solid #fde68a;border-radius:12px;padding:14px 18px;">
                    <p style="margin:0;font-size:12px;color:#92400e;line-height:1.65;">
                      <strong>⚠ Security notice:</strong> BeeHired will never ask for this code via phone or chat. If you did not request this code, please ignore this email and contact your administrator immediately.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:12px;color:#b0a89e;line-height:1.7;">
                If the code has expired, return to the account setup page and click <strong style="color:#7a746d;">"Resend code"</strong> to receive a new one.
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
                      &copy; {{ date('Y') }} BeeHired &nbsp;&middot;&nbsp; This is an automated security message.
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
