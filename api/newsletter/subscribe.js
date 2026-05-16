// Lightweight newsletter capture for the case study "Notify me" form.
// Sends an internal alert to INTERNAL_EMAILS so we know a subscriber landed.
// No CRM yet — when one's wired, swap the body of this function.

import { Resend } from 'resend';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ ok: false, error: 'Method not allowed' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const internalEmails = (process.env.INTERNAL_EMAILS ?? '').split(',').map(s => s.trim()).filter(Boolean);
    const fromEmail = process.env.FROM_EMAIL;

    if (!apiKey || !fromEmail || internalEmails.length === 0) {
        console.error('[newsletter/subscribe] missing env vars');
        return res.status(500).json({ ok: false, error: 'Server email not configured' });
    }

    let body;
    try {
        body = req.body;
        if (typeof body === 'string') body = JSON.parse(body);
    } catch {
        return res.status(400).json({ ok: false, error: 'Invalid JSON' });
    }

    const email = (body?.email ?? '').trim();
    const source = body?.source ?? 'unknown';

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ ok: false, error: 'Invalid email' });
    }

    const resend = new Resend(apiKey);
    try {
        await resend.emails.send({
            from: fromEmail,
            to: internalEmails,
            replyTo: email,
            subject: `[SVA] Newsletter signup — ${email}`,
            html: `<!DOCTYPE html>
<html><body style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;background:#F5F2FF;padding:24px;color:#1A1A1A">
  <div style="max-width:480px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 18px rgba(37,0,93,0.08)">
    <div style="background:linear-gradient(180deg,#473D92 0%,#7868F8 100%);color:#fff;padding:22px;text-align:center">
      <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;opacity:0.85">Newsletter signup</p>
      <p style="margin:0;font-size:18px;font-weight:800">${email}</p>
    </div>
    <div style="padding:20px;font-size:14px;color:#444">
      <p style="margin:0 0 8px"><strong>Source:</strong> ${source}</p>
      <p style="margin:0;color:#666;font-size:12px">Hit reply to this email and it goes straight to the subscriber.</p>
    </div>
  </div>
</body></html>`,
        });
        return res.status(200).json({ ok: true });
    } catch (err) {
        console.error('[newsletter/subscribe] send failed', err);
        return res.status(500).json({ ok: false });
    }
}
