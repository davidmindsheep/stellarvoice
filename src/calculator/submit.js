// Lead capture. v1: console-log + optional webhook env var.
// TODO(david): wire LEAD_WEBHOOK_URL to HubSpot / Airtable / Make.

const WEBHOOK_URL = import.meta.env.VITE_LEAD_WEBHOOK_URL;

export async function submitLead(answers) {
    const payload = {
        ...answers,
        submittedAt: new Date().toISOString(),
        source: 'stellarvoice-website-quiz'
    };

    console.log('[calculator] new lead', payload);

    if (!WEBHOOK_URL) return { ok: true, stubbed: true };

    try {
        const res = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        return { ok: res.ok };
    } catch (err) {
        console.error('[calculator] submit failed', err);
        return { ok: false, error: String(err) };
    }
}
