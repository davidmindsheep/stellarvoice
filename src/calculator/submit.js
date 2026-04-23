// POSTs the completed quiz to the Vercel Serverless Function which
// fans out two emails via Resend (internal alert + client confirmation).

export async function submitLead(answers) {
    const payload = {
        ...answers,
        submittedAt: new Date().toISOString(),
        source: 'stellarvoice-website-quiz'
    };

    try {
        const res = await fetch('/api/calculator/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            console.error('[calculator] submit failed', res.status, data);
            return { ok: false, status: res.status };
        }
        return { ok: true, ...data };
    } catch (err) {
        console.error('[calculator] submit error', err);
        return { ok: false, error: String(err) };
    }
}
