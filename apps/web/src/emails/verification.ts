export function emailVerificationHtml(otp: string) {
  return `
   <div style="background:#f8fafc;padding:40px 16px;font-family:Inter,Arial,sans-serif">
    
    <div style="
      max-width:420px;
      margin:0 auto;
    ">

      <h2 style="
        margin:0 0 6px;
        color:#0f172a;
        font-size:24px;
        font-weight:600;
      ">
        Verify your devkit email
      </h2>

      <p style="
        margin:0 0 12px;
        color:#475569;
        font-size:14px;
        line-height:18px;
      ">
        Use the verification code below to continue signing in to your account.
      </p>

      <div style="text-align:center;margin:28px 0">

        <div style="
          display:inline-block;
          padding:14px 24px;
          background:#f1f5f9;
          border-radius:8px;
          font-size:30px;
          font-weight:700;
          letter-spacing:8px;
          color:#0f172a;
        ">
          ${otp}
        </div>

      </div>

      <p style="
        margin:24px 0 3px;
        color:#64748b;
        font-size:13px;
        line-height:22px;
      ">
        This code will expire in 15 minutes.
      </p>

      <p style="
        margin:0;
        color:#94a3b8;
        font-size:12px;
        line-height:20px;
      ">
        If you didn’t request this email, you can safely ignore it.
      </p>

    </div>

  </div>
  `;
}
