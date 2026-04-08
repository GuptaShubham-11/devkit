export function emailVerificationHtml(otp: string) {
  return `
  <div style="font-family:sans-serif;background:#f8fafc;padding:20px;text-align:center">
    
    <div style="background:#fff;padding:24px;border-radius:8px;max-width:400px;margin:auto;border:1px solid #e2e8f0">
      
      <h2 style="margin-bottom:16px;color:#334155">Verify Email</h2>

      <div style="font-size:22px;font-weight:bold;letter-spacing:4px;background:#f1f5f9;padding:12px 20px;border-radius:6px;display:inline-block;margin-bottom:16px">
        ${otp}
      </div>

      <p style="font-size:14px;color:#64748b;margin-bottom:8px">
        Expires in 15 minutes
      </p>

      <p style="font-size:12px;color:#94a3b8">
        Keep this code private
      </p>

    </div>

  </div>
  `;
}
