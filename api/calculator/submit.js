// Vercel Serverless Function — receives quiz submissions and sends two emails
// via Resend: one internal alert, one client confirmation.
//
// Required env vars (set in Vercel dashboard → Project → Settings → Env Vars):
//   RESEND_API_KEY        — your Resend API key (server-only)
//   INTERNAL_EMAILS       — comma-separated, e.g. "gary@svca.com,david@mindsheep.com.au"
//   FROM_EMAIL            — verified Resend sender, e.g. "Stellar Voice Agents <hello@stellarvoiceagents.com>"
//   REPLY_TO_EMAIL        — optional, where client replies should land (default = first internal email)

import { Resend } from 'resend';

// Inlined from src/calculator/questions.js + calc.js
// (Vercel serverless functions only bundle files inside api/, can't import from src/)
const QUESTIONS = {
    pain: { id: 'pain', kind: 'choice', prompt: "What's costing you the most right now?", options: [
        { id: 'missed', label: "I'm missing calls and losing potential customers" },
        { id: 'speed', label: 'Leads are going cold before I can get back to them' },
        { id: 'afterHours', label: 'After-hours enquiries are slipping through the cracks' },
        { id: 'timeDrain', label: "I'm spending too much time on calls instead of growing" }
    ]},
    missedVolume: { id: 'missedVolume', kind: 'choice', prompt: 'Roughly how many calls do you miss in an average week?', options: [
        { id: 'few', label: '1–5 a week', meta: { weekly: 3 } },
        { id: 'some', label: '5–15 a week', meta: { weekly: 10 } },
        { id: 'lots', label: '15–30 a week', meta: { weekly: 22 } },
        { id: 'tons', label: '30+ a week', meta: { weekly: 40 } }
    ]},
    responseTime: { id: 'responseTime', kind: 'choice', prompt: 'How long does it take to call a new lead back?', options: [
        { id: 'under5', label: 'Under 5 minutes', meta: { lift: 1.0 } },
        { id: 'under1h', label: 'Within an hour', meta: { lift: 1.3 } },
        { id: 'sameDay', label: 'Same day', meta: { lift: 1.8 } },
        { id: 'nextDay', label: 'Next day or later', meta: { lift: 2.2 } },
        { id: 'patchy', label: "Honestly, it's patchy", meta: { lift: 2.0 } }
    ]},
    leadVolume: { id: 'leadVolume', kind: 'choice', prompt: 'How many web or form leads come in each month?', options: [
        { id: 'xs', label: 'Under 20', meta: { monthly: 10 } },
        { id: 's', label: '20–50', meta: { monthly: 35 } },
        { id: 'm', label: '50–100', meta: { monthly: 75 } },
        { id: 'l', label: '100+', meta: { monthly: 150 } }
    ]},
    afterHoursChannel: { id: 'afterHoursChannel', kind: 'choice', prompt: 'What kind of after-hours enquiries are you missing?', options: [
        { id: 'calls', label: 'Phone calls' }, { id: 'forms', label: 'Website forms' }, { id: 'both', label: 'Both, honestly' }
    ]},
    afterHoursConversion: { id: 'afterHoursConversion', kind: 'choice', prompt: 'If you got through first thing the next day, do they still buy?', options: [
        { id: 'yes', label: 'Yes, most of them', meta: { retention: 0.7 } },
        { id: 'half', label: 'About half', meta: { retention: 0.45 } },
        { id: 'few', label: 'Only a few — they shop around', meta: { retention: 0.2 } },
        { id: 'unsure', label: 'Not sure', meta: { retention: 0.4 } }
    ]},
    callsHandledBy: { id: 'callsHandledBy', kind: 'choice', prompt: 'Who handles the phones today?', options: [
        { id: 'me', label: 'Mostly me' }, { id: 'receptionist', label: 'A receptionist or admin' },
        { id: 'shared', label: 'Whoever is free' }, { id: 'voicemail', label: 'Voicemail, mostly' }
    ]},
    hoursOnPhone: { id: 'hoursOnPhone', kind: 'choice', prompt: 'How many hours a week does your team burn on the phone?', options: [
        { id: 'light', label: 'Under 5 hrs', meta: { hours: 3 } },
        { id: 'medium', label: '5–15 hrs', meta: { hours: 10 } },
        { id: 'heavy', label: '15–30 hrs', meta: { hours: 22 } },
        { id: 'buried', label: '30+ hrs', meta: { hours: 40 } }
    ]},
    customerValue: { id: 'customerValue', kind: 'choice', prompt: "What's one customer worth to you on average?", options: [
        { id: 'xs', label: 'Under $500', meta: { value: 350 } },
        { id: 's', label: '$500 – $1,500', meta: { value: 1000 } },
        { id: 'm', label: '$1,500 – $5,000', meta: { value: 3000 } },
        { id: 'l', label: '$5,000 – $15,000', meta: { value: 9000 } },
        { id: 'xl', label: '$15,000+', meta: { value: 25000 } }
    ]},
    industry: { id: 'industry', kind: 'choice', prompt: "What's your industry?", options: [
        { id: 'realEstate', label: 'Real Estate' }, { id: 'health', label: 'Health / clinic' },
        { id: 'finance', label: 'Finance / advisory' }, { id: 'trades', label: 'Trades / home services' },
        { id: 'auto', label: 'Auto / retail' }, { id: 'professional', label: 'Professional services' },
        { id: 'other', label: 'Something else' }
    ]},
    businessName: { id: 'businessName', kind: 'text', prompt: 'Last two — what should we call your business?' },
    contact: { id: 'contact', kind: 'text', prompt: 'Where should we send your results?' }
};

const SVA_MONTHLY_FEE = 600;

function meta(answers, qid) {
    const q = QUESTIONS[qid];
    const answerId = answers[qid];
    if (!q?.options || !answerId) return {};
    return q.options.find(o => o.id === answerId)?.meta ?? {};
}

function calculate(answers) {
    const value = Number(meta(answers, 'customerValue').value ?? 1500);
    const weeklyMissed = Number(meta(answers, 'missedVolume').weekly ?? 0);
    const missedCallsMonthly = weeklyMissed * 4.33 * 0.60 * 0.40 * 0.30 * value;

    const monthlyLeads = Number(meta(answers, 'leadVolume').monthly ?? 0);
    const lift = Number(meta(answers, 'responseTime').lift ?? 0);
    const speedUplift = Math.max(0, lift - 1.0) * 0.10;
    const speedToLeadMonthly = monthlyLeads * speedUplift * value;

    const channel = answers.afterHoursChannel;
    const retention = Number(meta(answers, 'afterHoursConversion').retention ?? 0);
    const baselineWeeklyCalls = weeklyMissed || 15;
    const afterHoursShare = channel === 'both' ? 0.35 : 0.25;
    const afterHoursMonthly = channel
        ? baselineWeeklyCalls * 4.33 * afterHoursShare * retention * 0.30 * value
        : 0;

    const hoursOnPhone = Number(meta(answers, 'hoursOnPhone').hours ?? 0);
    const timeSavedMonthly = hoursOnPhone * 4.33 * 45 * 0.6;

    const monthlyRevenue = missedCallsMonthly + speedToLeadMonthly + afterHoursMonthly + timeSavedMonthly;
    const drivers = [
        ['missedCallsMonthly', missedCallsMonthly, 'Missed calls we engage, qualify, and book'],
        ['speedToLeadMonthly', speedToLeadMonthly, 'Web leads reached under 60 seconds'],
        ['afterHoursMonthly', afterHoursMonthly, 'After-hours enquiries captured'],
        ['timeSavedMonthly', timeSavedMonthly, 'Hours your team gets back']
    ];
    const primary = drivers.reduce((a, b) => (b[1] > a[1] ? b : a));

    return {
        monthlyRevenue: Math.round(monthlyRevenue),
        annualRevenue: Math.round(monthlyRevenue * 12),
        roiMultiple: Math.round((monthlyRevenue / SVA_MONTHLY_FEE) * 100) / 100,
        primaryDriverLabel: primary[2],
        breakdown: {
            missedCallsMonthly: Math.round(missedCallsMonthly),
            speedToLeadMonthly: Math.round(speedToLeadMonthly),
            afterHoursMonthly: Math.round(afterHoursMonthly),
            timeSavedMonthly: Math.round(timeSavedMonthly)
        },
        sva: { monthlyFee: SVA_MONTHLY_FEE }
    };
}

const fmt = (n) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(n);

// Look up the human-readable label for an answer ID
function answerLabel(qid, answerId) {
    const q = QUESTIONS[qid];
    if (!q) return answerId;
    if (q.kind === 'text') return answerId;
    return q.options?.find((o) => o.id === answerId)?.label ?? answerId;
}

function isProbablyEmail(s) {
    return typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function buildInternalHtml(answers, result, contactKind) {
    const breakdownRows = Object.entries(result.breakdown)
        .filter(([, v]) => v > 0)
        .map(([k, v]) => `<li><strong>${k}:</strong> ${fmt(v)}/mo</li>`)
        .join('');

    const answerRows = Object.entries(answers)
        .filter(([k]) => k !== 'contact')
        .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#555;font-size:13px">${k}</td><td style="padding:6px 0;font-size:13px"><strong>${answerLabel(k, v)}</strong></td></tr>`)
        .join('');

    return `
<!DOCTYPE html>
<html><body style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;background:#F5F2FF;padding:24px;color:#1A1A1A">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 18px rgba(37,0,93,0.08)">
    <div style="background:linear-gradient(180deg,#473D92 0%,#7868F8 100%);color:#fff;padding:24px;text-align:center">
      <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;opacity:0.85">New lead from quiz</p>
      <p style="margin:0;font-size:34px;font-weight:900">${fmt(result.monthlyRevenue)}<span style="font-size:14px;font-weight:600;opacity:0.85">/mo · ${fmt(result.annualRevenue)}/yr</span></p>
    </div>
    <div style="padding:24px">
      <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#473D92;font-weight:800">Contact</p>
      <p style="margin:0 0 4px;font-size:18px;font-weight:800;color:#25005D">${answers.businessName ?? '(no name)'}</p>
      <p style="margin:0 0 20px;font-size:15px"><a href="${contactKind === 'email' ? 'mailto:' + answers.contact : 'tel:' + answers.contact}" style="color:#7868F8;text-decoration:none">${answers.contact}</a> <span style="color:#888;font-size:12px">(${contactKind})</span></p>

      <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#473D92;font-weight:800">Where the revenue is coming from</p>
      <ul style="margin:0 0 20px;padding-left:18px;font-size:14px;color:#1A1A1A">${breakdownRows || '<li>No primary driver — answers were minimal.</li>'}</ul>

      <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#473D92;font-weight:800">All answers</p>
      <table style="width:100%;border-collapse:collapse"><tbody>${answerRows}</tbody></table>

      <div style="margin-top:24px;padding:14px;background:#F5F2FF;border-radius:10px;font-size:13px;color:#473D92">
        <strong>ROI:</strong> $${result.roiMultiple.toFixed(2)} returned per $1 of SVA spend (vs $${result.sva.monthlyFee}/mo fee).
      </div>
    </div>
  </div>
  <p style="text-align:center;margin:16px 0 0;font-size:11px;color:#888">Submitted ${new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })} PT</p>
</body></html>`;
}

function buildClientHtml(answers, result) {
    const annual = fmt(result.annualRevenue);
    const monthly = fmt(result.monthlyRevenue);
    const businessName = answers.businessName ?? 'your business';

    return `
<!DOCTYPE html>
<html><body style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;background:#F5F2FF;padding:24px;color:#1A1A1A">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 18px rgba(37,0,93,0.08)">
    <div style="background:linear-gradient(180deg,#473D92 0%,#7868F8 100%);color:#fff;padding:32px 24px;text-align:center">
      <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;opacity:0.9">Your hidden revenue, monthly</p>
      <p style="margin:0;font-size:48px;font-weight:900;line-height:1">${monthly}</p>
      <p style="margin:8px 0 0;font-size:15px;opacity:0.9">or <strong>${annual}</strong> a year</p>
    </div>
    <div style="padding:28px 24px">
      <p style="margin:0 0 16px;font-size:16px;line-height:1.55">Thanks for taking the test. Based on your answers, that's roughly what slow follow-up, missed calls, and after-hours enquiries are quietly costing ${businessName} every month.</p>

      <p style="margin:0 0 16px;font-size:16px;line-height:1.55">Here's the next step: a 30-minute call with Gary. He'll walk you through exactly how a Stellar voice agent would engage, qualify, and book that revenue back — using your real numbers, not estimates.</p>

      <div style="text-align:center;margin:28px 0">
        <a href="https://calendly.com/garysarco1/30min" style="display:inline-block;background:#25005D;color:#fff;padding:16px 36px;border-radius:999px;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;font-size:14px;text-decoration:none">Book a Demo with Gary →</a>
      </div>

      <p style="margin:0;font-size:13px;color:#777;line-height:1.55">Estimates use the SVA pillar metrics: 3× speed-to-lead, 80% follow-up consistency, +45% coverage uplift. We'll tune them to your actual data on the call.</p>
    </div>
    <div style="padding:18px 24px;background:#F3F3F3;text-align:center;font-size:12px;color:#888">
      Stellar Voice Agents · stellarvoiceagents.com
    </div>
  </div>
</body></html>`;
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ ok: false, error: 'Method not allowed' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const internalEmails = (process.env.INTERNAL_EMAILS ?? '').split(',').map((s) => s.trim()).filter(Boolean);
    const fromEmail = process.env.FROM_EMAIL;
    const replyTo = process.env.REPLY_TO_EMAIL || internalEmails[0];

    if (!apiKey || !fromEmail || internalEmails.length === 0) {
        console.error('[calculator/submit] missing env vars', {
            hasApiKey: !!apiKey,
            hasFromEmail: !!fromEmail,
            internalCount: internalEmails.length
        });
        return res.status(500).json({ ok: false, error: 'Server email not configured' });
    }

    let answers;
    try {
        answers = req.body;
        if (typeof answers === 'string') answers = JSON.parse(answers);
    } catch (e) {
        return res.status(400).json({ ok: false, error: 'Invalid JSON' });
    }

    if (!answers || typeof answers !== 'object' || !answers.contact || !answers.businessName) {
        return res.status(400).json({ ok: false, error: 'Missing contact or businessName' });
    }

    const result = calculate(answers);
    const contactKind = isProbablyEmail(answers.contact) ? 'email' : 'phone';

    const resend = new Resend(apiKey);
    const subject = `[SVA] New lead — ${fmt(result.monthlyRevenue)}/mo · ${answers.businessName}`;

    // Send internal + client in parallel; do not fail the request if client email can't be sent
    const internalSend = resend.emails.send({
        from: fromEmail,
        to: internalEmails,
        replyTo: contactKind === 'email' ? answers.contact : replyTo,
        subject,
        html: buildInternalHtml(answers, result, contactKind)
    });

    const clientSend = contactKind === 'email'
        ? resend.emails.send({
            from: fromEmail,
            to: [answers.contact],
            replyTo,
            subject: `Your hidden revenue: ${fmt(result.monthlyRevenue)}/mo`,
            html: buildClientHtml(answers, result)
        })
        : Promise.resolve({ skipped: 'phone-only contact' });

    const [internalRes, clientRes] = await Promise.allSettled([internalSend, clientSend]);

    if (internalRes.status === 'rejected') {
        console.error('[calculator/submit] internal email failed', internalRes.reason);
    }
    if (clientRes.status === 'rejected') {
        console.error('[calculator/submit] client email failed', clientRes.reason);
    }

    return res.status(200).json({
        ok: true,
        internalEmailSent: internalRes.status === 'fulfilled',
        clientEmailSent: clientRes.status === 'fulfilled' && contactKind === 'email',
        contactKind
    });
}
