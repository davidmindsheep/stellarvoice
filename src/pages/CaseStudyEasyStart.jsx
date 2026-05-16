import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './CaseStudyEasyStart.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { openCalendly } from '../lib/calendly';
import { track } from '../lib/analytics';
import {
    Mic, Calendar, LayoutDashboard, PhoneCall, Play, Pause,
    Phone, MessageSquare, Mail, Upload, ListChecks, Star,
    Linkedin, Twitter, Link as LinkIcon, ArrowRight, Check, X as CloseIcon
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// CLIENT FRAMING (from the v2 blueprint):
//   Stellar's client is DENES ALDOTT personally. Denes is a sales
//   consultant who works for EasyStart Homes — he is NOT the owner.
//   EasyStart Homes is the CONTEXT (where the leads come from), not
//   the client. Throughout this page, Denes is positioned as the
//   client; EasyStart Homes is mentioned only as his employer.
//   Do not link to easystarthomes.com.au or display their logo
//   prominently.
//
// Audio sample uses /public/audio/agent-realestate.mp3 (the real call).
// Asset placeholders flagged inline as [PLACEHOLDER].
// ─────────────────────────────────────────────────────────────

const PAGE_URL = 'https://www.stellarvoiceagents.com/case-studies/denes-aldott';
const SHARE_TEXT = 'How Denes Aldott books 17–25% of his inbound leads with AI voice that sounds human.';

const pilotStats = [
    { value: '60', label: 'leads contacted' },
    { value: 'up to 6', label: 'calls per lead' },
    { value: '10', label: 'qualified bookings' },
    { value: '1 in 6', label: 'converted to a real conversation' },
];

const cadence = [
    { day: 'Day 1', items: [
        { kind: 'call', time: '8am' }, { kind: 'call', time: '12pm' }, { kind: 'call', time: '5pm' },
    ]},
    { day: 'Day 2', items: [{ kind: 'sms', time: '8am' }] },
    { day: 'Day 3', items: [
        { kind: 'call', time: '8am' }, { kind: 'email', time: '8am' }, { kind: 'call', time: '5pm' },
    ]},
    { day: 'Day 4', items: [{ kind: 'call', time: '8am' }, { kind: 'call', time: '5pm' }] },
    { day: 'Day 5', items: [{ kind: 'sms', time: '8am' }, { kind: 'email', time: '8am' }] },
    { day: 'Day 6', items: [{ kind: 'call', time: '8am' }, { kind: 'call', time: '5pm' }] },
];

const pillars = [
    { Icon: Mic, title: 'A natural-sounding voice agent', body: 'She introduces herself, qualifies the lead, books a follow-up time, or politely closes the call.' },
    { Icon: Calendar, title: 'A multi-day contact rhythm', body: "Up to 9 touches per lead across 6 days. Calls, SMS reminders, and emails at varied hours. So leads who don't pick up at 8am get a fair go at 12pm and 5pm." },
    { Icon: LayoutDashboard, title: 'A client dashboard', body: 'Denes uploads new leads, listens to recordings, reads written summaries, and grades the quality of every booked lead. That feedback loop is how we keep improving.' },
    { Icon: PhoneCall, title: 'Caller ID on Denes’s own number', body: 'When a lead misses the call and rings back, they reach Denes directly. Not a random number, not a generic call centre.' },
];

const liveStats = [
    { value: '50–100', label: 'leads / month' },
    { value: '17–25%', label: 'booking rate' },
    { value: '9', label: 'contact attempts per lead' },
    { value: '6 months', label: 'live engagement' },
];

const beforeAfter = [
    { before: 'Manual dialling by Denes alone', after: 'AI agent + branded caller ID' },
    { before: '1–2 call attempts per lead', after: 'Up to 9 touches across 6 days' },
    { before: 'Leads contacted within days (if at all)', after: 'First contact within hours' },
    { before: 'No tracking of call outcomes', after: 'Dashboard with recordings + summaries' },
    { before: 'Unknown booking rate', after: '17–25% booking rate' },
];

// ─── Helper: animated count-up for stat tiles ────────────────
function useCountUp(target, duration = 1200) {
    const [val, setVal] = useState(0);
    const [done, setDone] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!Number.isFinite(target)) return;
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting && !done) {
                const start = performance.now();
                const tick = (now) => {
                    const t = Math.min(1, (now - start) / duration);
                    const eased = 1 - Math.pow(1 - t, 3);
                    setVal(Math.round(target * eased));
                    if (t < 1) requestAnimationFrame(tick); else setDone(true);
                };
                requestAnimationFrame(tick);
                obs.disconnect();
            }
        }, { threshold: 0.4 });
        obs.observe(el);
        return () => obs.disconnect();
    }, [target, duration, done]);

    return { val, ref };
}

// Parse a leading prefix (+, -, ~) + digits from a stat string like "~1 in 6"
// or "+120%" or "50–100". parseFloat('~1') returns NaN, so we strip the prefix
// before parsing.
function parseLeadingNumber(value) {
    if (typeof value !== 'string') return null;
    const m = value.match(/^([+\-~])?(\d+(?:\.\d+)?)/);
    if (!m) return null;
    const numeric = parseFloat(m[2]);
    if (!Number.isFinite(numeric)) return null;
    return { prefix: m[1] ?? '', numeric, fullMatch: m[0] };
}

function StatTile({ value, label }) {
    const parsed = parseLeadingNumber(value);
    const { val, ref } = useCountUp(parsed?.numeric ?? 0);
    const displayed = parsed
        ? value.replace(parsed.fullMatch, `${parsed.prefix}${Math.round(val)}`)
        : value;

    return (
        <div className="cs-stat-tile" ref={ref}>
            <div className="cs-stat-value">{displayed}</div>
            <div className="cs-stat-label">{label}</div>
        </div>
    );
}

function StatGrid({ items, size = 'lg' }) {
    return (
        <div className={`cs-stat-grid ${size}`}>
            {items.map((s, i) => <StatTile key={i} value={s.value} label={s.label} />)}
        </div>
    );
}

function CadenceDot({ kind }) {
    const Icon = kind === 'call' ? Phone : kind === 'sms' ? MessageSquare : Mail;
    return (
        <span className={`cs-cadence-dot cs-cadence-dot-${kind}`} title={kind}>
            <Icon size={14} strokeWidth={2} />
        </span>
    );
}

// ─── Prominent audio section ─────────────────────────────────
function AudioFeature() {
    const ref = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [showTranscript, setShowTranscript] = useState(false);

    const toggle = () => {
        const a = ref.current;
        if (!a) return;
        if (playing) { a.pause(); setPlaying(false); }
        else {
            a.play();
            setPlaying(true);
            track('case_study_audio_play', { case: 'easystart-homes' });
        }
    };

    return (
        <section id="audio" className="cs-audio-feature">
            <div className="container">
                <p className="cs-audio-eyebrow">Listen to a Real Call</p>
                <h2 className="cs-audio-headline">Press play. Decide for yourself.</h2>
                <p className="cs-audio-teaser">A genuine outbound call placed on behalf of Denes. Edited for length and to anonymise the lead.</p>

                <div className="cs-audio-feature-card">
                    <button className={`cs-audio-feature-btn ${playing ? 'is-playing' : ''}`} onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
                        {playing ? <Pause size={36} strokeWidth={2.25} /> : <Play size={36} strokeWidth={2.25} fill="currentColor" />}
                    </button>
                    <div className="cs-audio-waveform" aria-hidden="true">
                        {[...Array(28)].map((_, i) => (
                            <span
                                key={i}
                                className={`cs-audio-bar ${playing ? 'is-playing' : ''}`}
                                style={{
                                    height: `${20 + Math.abs(Math.sin(i * 0.7)) * 60}%`,
                                    animationDelay: `${i * 0.05}s`,
                                }}
                            />
                        ))}
                    </div>
                </div>

                <audio ref={ref} src="/audio/agent-realestate.mp3" onEnded={() => setPlaying(false)} preload="none" />

                <button className="cs-transcript-toggle" onClick={() => setShowTranscript(v => !v)}>
                    {showTranscript ? 'Hide transcript' : 'View transcript'}
                </button>
                {showTranscript && (
                    <div className="cs-transcript">
                        <p><em>[Transcript pending — generate from the approved audio sample.]</em></p>
                    </div>
                )}
            </div>
        </section>
    );
}

// ─── Floating "Book a Call" button (fixed bottom-right) ──────
function FloatingCTA() {
    const [visible, setVisible] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (dismissed) return;
            const scrolled = window.scrollY > 600;
            // Hide when the bottom CTA section is in view
            const footerCta = document.querySelector('.cs-cta-section');
            const nearBottom = footerCta && footerCta.getBoundingClientRect().top < window.innerHeight - 100;
            setVisible(scrolled && !nearBottom);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, [dismissed]);

    if (dismissed || !visible) return null;

    return (
        <div className="cs-floating-cta" role="complementary">
            <button
                type="button"
                className="cs-floating-btn"
                onClick={() => {
                    track('case_study_cta_floating_click', { case: 'easystart-homes' });
                    openCalendly(undefined, 'case-study-easystart-floating');
                }}
            >
                Book a Call
            </button>
            <button
                type="button"
                className="cs-floating-dismiss"
                onClick={() => setDismissed(true)}
                aria-label="Dismiss"
            >
                <CloseIcon size={14} strokeWidth={2.25} />
            </button>
        </div>
    );
}

// ─── Social share row ────────────────────────────────────────
function ShareRow({ position }) {
    const u = encodeURIComponent(PAGE_URL);
    const t = encodeURIComponent(SHARE_TEXT);
    const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${u}`;
    const x = `https://twitter.com/intent/tweet?url=${u}&text=${t}`;
    const email = `mailto:?subject=${encodeURIComponent('Stellar Voice Agents — EasyStart case study')}&body=${t}%0A%0A${u}`;
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(PAGE_URL);
            setCopied(true);
            track('case_study_share', { case: 'easystart-homes', channel: 'copy', position });
            setTimeout(() => setCopied(false), 1500);
        } catch {}
    };

    const onClick = (channel) => () => track('case_study_share', { case: 'easystart-homes', channel, position });

    return (
        <div className={`cs-share cs-share-${position}`}>
            <span className="cs-share-label">Share</span>
            <a href={linkedin} target="_blank" rel="noopener noreferrer" onClick={onClick('linkedin')} aria-label="Share on LinkedIn"><Linkedin size={18} /></a>
            <a href={x} target="_blank" rel="noopener noreferrer" onClick={onClick('x')} aria-label="Share on X"><Twitter size={18} /></a>
            <a href={email} onClick={onClick('email')} aria-label="Share via email"><Mail size={18} /></a>
            <button type="button" onClick={copy} aria-label="Copy link">
                {copied ? <Check size={18} /> : <LinkIcon size={18} />}
            </button>
        </div>
    );
}

// ─── Newsletter / "notify on next case study" form ──────────
function NotifyForm() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle | sending | sent | error
    const [msg, setMsg] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        const trimmed = email.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
            setStatus('error');
            setMsg('Please enter a valid email.');
            return;
        }
        setStatus('sending');
        try {
            const res = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: trimmed, source: 'case-study-easystart' }),
            });
            if (res.ok) {
                setStatus('sent');
                setMsg("You're on the list. We'll email when the next case study lands.");
                track('case_study_newsletter_signup', { case: 'easystart-homes' });
                setEmail('');
            } else {
                setStatus('error');
                setMsg("Something went wrong. Try again in a moment.");
            }
        } catch {
            setStatus('error');
            setMsg("Couldn't reach the server. Try again.");
        }
    };

    return (
        <form className="cs-notify" onSubmit={submit}>
            <p className="cs-notify-label">Get notified when we publish the next case study.</p>
            <div className="cs-notify-row">
                <input
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="Email address"
                    disabled={status === 'sending' || status === 'sent'}
                />
                <button type="submit" disabled={status === 'sending' || status === 'sent'}>
                    {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Done' : 'Notify me'}
                </button>
            </div>
            {msg && <p className={`cs-notify-msg cs-notify-msg-${status}`}>{msg}</p>}
        </form>
    );
}

export default function CaseStudyEasyStart() {
    useEffect(() => {
        const prevTitle = document.title;
        document.title = 'How Denes Aldott Books 17–25% of Leads with AI Voice | Stellar Voice Agents';

        const desc = document.querySelector('meta[name="description"]');
        const prevDesc = desc?.getAttribute('content');
        if (desc) desc.setAttribute('content', "How Denes Aldott uses Stellar's ClosedLoop Outbound to book 17–25% of his inbound leads. The leads don't realise they're talking to AI.");

        // OG / Twitter meta — Denes-centred per blueprint
        const ogTags = [
            { property: 'og:title', content: 'How Denes Aldott Books 17–25% of Leads with AI Voice' },
            { property: 'og:description', content: 'A 6-month case study of how Denes Aldott books up to 1 in 4 inbound leads using Stellar Voice Agents.' },
            { property: 'og:type', content: 'article' },
            { property: 'og:url', content: PAGE_URL },
            { property: 'og:image', content: 'https://www.stellarvoiceagents.com/logo.webp' },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: 'How Denes Aldott Books 17–25% of Leads with AI Voice' },
            { name: 'twitter:description', content: 'A 6-month case study of how Denes Aldott books up to 1 in 4 inbound leads using Stellar Voice Agents.' },
        ];
        const created = ogTags.map(t => {
            const m = document.createElement('meta');
            if (t.property) m.setAttribute('property', t.property);
            if (t.name) m.setAttribute('name', t.name);
            m.setAttribute('content', t.content);
            document.head.appendChild(m);
            return m;
        });

        // JSON-LD: Article schema
        const ld = document.createElement('script');
        ld.type = 'application/ld+json';
        ld.text = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'How Denes Aldott Books 17–25% of Leads with AI Voice',
            datePublished: '2026-05-15',
            author: { '@type': 'Organization', name: 'Stellar Voice Agents', url: 'https://www.stellarvoiceagents.com' },
            publisher: {
                '@type': 'Organization',
                name: 'Stellar Voice Agents',
                logo: { '@type': 'ImageObject', url: 'https://www.stellarvoiceagents.com/logo.png' },
            },
            about: { '@type': 'Person', name: 'Denes Aldott', jobTitle: 'Sales Consultant' },
            image: 'https://www.stellarvoiceagents.com/logo.webp',
            mainEntityOfPage: PAGE_URL,
        });
        document.head.appendChild(ld);

        track('case_study_view', { case: 'easystart-homes' });

        return () => {
            document.title = prevTitle;
            if (desc && prevDesc) desc.setAttribute('content', prevDesc);
            created.forEach(m => document.head.removeChild(m));
            document.head.removeChild(ld);
        };
    }, []);

    const handleCTA = (label) => () => {
        track(`case_study_cta_${label}_click`, { case: 'easystart-homes' });
        openCalendly(undefined, `case-study-easystart-${label}`);
    };

    return (
        <>
            <Navbar />

            <main className="cs-main">
                {/* ─── Section 1: Hero ─────────────────────────────────── */}
                <section className="cs-hero">
                    <div className="cs-hero-pattern" aria-hidden="true" />
                    <div className="container cs-hero-inner">
                        <p className="cs-eyebrow">Case Study · 5 min read</p>
                        <h1 className="cs-h1">From a 60-lead pilot to a 6-month outbound engine</h1>
                        <p className="cs-hero-sub">
                            How Denes Aldott uses Stellar&rsquo;s ClosedLoop Outbound to qualify and book 17&ndash;25% of his inbound leads. The leads don&rsquo;t realise they&rsquo;re talking to AI.
                        </p>
                        <div className="cs-hero-cta">
                            <button type="button" onClick={handleCTA('primary')} className="cs-btn-primary">
                                Book a call to scope yours
                            </button>
                        </div>
                        <ShareRow position="top" />
                    </div>
                    <div className="cs-hero-wave" aria-hidden="true">
                        {[...Array(14)].map((_, i) => (
                            <div key={i} style={{ animationDelay: `${i * 0.1}s` }}></div>
                        ))}
                    </div>
                </section>

                {/* ─── TL;DR box ───────────────────────────────────────── */}
                <section className="cs-tldr-section">
                    <div className="container">
                        <div className="cs-tldr">
                            <p className="cs-tldr-label">TL;DR</p>
                            <ul>
                                <li><strong>Client</strong> Denes Aldott, Sales Consultant (EasyStart Homes)</li>
                                <li><strong>Challenge</strong> Inbound leads going cold because one person couldn&rsquo;t reach them all</li>
                                <li><strong>Result</strong> 17&ndash;25% of leads now booked into real conversations. Running for 6 months.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ─── Section 2: Client snapshot (Denes-centred) ──────── */}
                <section className="cs-section cs-snapshot-section">
                    <div className="container">
                        <div className="cs-snapshot">
                            <div className="cs-snapshot-id">
                                <img
                                    src="/denes-aldott.jpg"
                                    alt="Denes Aldott"
                                    className="cs-snapshot-avatar"
                                    width="76"
                                    height="76"
                                />
                                <div>
                                    <p className="cs-snapshot-name">Denes Aldott</p>
                                    <p className="cs-snapshot-role">Sales Consultant, EasyStart Homes</p>
                                </div>
                            </div>
                            <ul className="cs-snapshot-meta">
                                <li><strong>Industry</strong>Residential home building (AU)</li>
                                <li><strong>Product</strong>ClosedLoop Outbound</li>
                                <li><strong>Live since</strong>January 2026</li>
                                <li><strong>Volume</strong>50&ndash;100 leads / mo</li>
                                <li><strong>Booking rate</strong>17&ndash;25%</li>
                                <li><strong>Engagement</strong>6 months</li>
                            </ul>
                        </div>
                        <p className="cs-context-line">
                            Denes is a sales consultant who manages lead follow-up for EasyStart Homes, a residential home builder in Australia.
                        </p>
                    </div>
                </section>

                {/* ─── Jump links ──────────────────────────────────────── */}
                <nav className="cs-toc" aria-label="Jump to section">
                    <div className="container">
                        <a href="#problem">The Problem</a>
                        <a href="#pilot">The Pilot</a>
                        <a href="#audio">The Voice</a>
                        <a href="#how">How It Works</a>
                        <a href="#results">Results</a>
                        <a href="#get-started">Get Started</a>
                    </div>
                </nav>

                {/* ─── Section 3: The problem ──────────────────────────── */}
                <section id="problem" className="cs-section">
                    <div className="container cs-prose">
                        <h2 className="cs-h2">The leads were already paid for. Most never got a real conversation.</h2>
                        <p>Denes runs sales for EasyStart Homes. Every inbound lead is real ad spend and real intent. Somebody put their hand up and said they want to build a new home.</p>
                        <p>The problem is common in builder sales. A single human caller can only chase a lead so many times. And if a lead isn&rsquo;t reached within hours of inquiry, it goes cold fast.</p>
                        <p>Denes needed a way to call every lead, multiple times, across multiple days, at different times. Without burning out. Without losing the personal feel of being called by Denes himself.</p>
                        <p>There was also a measurement problem. No shared place to see which leads had been called, what they said, which ones turned hot, and which ones politely asked to be left alone.</p>
                    </div>
                </section>

                {/* ─── Section 4: The December pilot ───────────────────── */}
                <section id="pilot" className="cs-section cs-section-alt">
                    <div className="container cs-prose">
                        <h2 className="cs-h2">A 60-lead pilot in December</h2>
                        <p>In December 2025 we ran a deliberately small pilot. We took 60 of Denes&rsquo;s existing leads. Leads that had inquired about building a new home and gone quiet.</p>
                        <p>We put them through Stellar&rsquo;s outbound system. Each lead got a fair chance to be reached. Up to 6 calls spread across the working week, plus follow-up SMS, all from Denes&rsquo;s branded caller ID.</p>
                        <p>The goal wasn&rsquo;t to book a stadium full of appointments. The goal was to prove the system worked on real leads, with a real voice, for a real Australian home builder.</p>
                        <StatGrid items={pilotStats} size="sm" />
                    </div>
                </section>

                {/* ─── Section 5: Inline quote + intro to audio ────────── */}
                <section className="cs-section">
                    <div className="container cs-prose">
                        <h2 className="cs-h2">But does it actually sound like a person?</h2>
                        <p>The first question every prospect asks is some version of: &ldquo;AI voice still sounds like a robot, right?&rdquo; Fair question. Most AI voice you&rsquo;ve heard does sound like a robot.</p>
                        <p>Stellar&rsquo;s voice agent doesn&rsquo;t. Before Denes agreed to put a single real lead through the system, he tested her himself. He called in, asked the kind of curveball questions a real customer would ask, and reacted in the moment.</p>
                        <blockquote className="cs-quote-inline">
                            <p>&ldquo;That&rsquo;s just so unreal, well done!&rdquo;</p>
                            <cite>Denes Aldott, after testing the AI voice agent himself &middot; 10 December 2025</cite>
                        </blockquote>
                        <p>The voice introduces herself by name. She says she&rsquo;s calling on behalf of Denes from EasyStart Homes. If the lead says they&rsquo;re not interested, she politely closes the call. If they are, she qualifies their plans, books a follow-up time, and confirms it back by SMS.</p>
                    </div>
                </section>

                {/* ─── Audio feature (prominent, full-width) ───────────── */}
                <AudioFeature />

                {/* ─── Mid-page soft CTA ───────────────────────────────── */}
                <section className="cs-mid-cta">
                    <div className="container">
                        <p>
                            Ready to hear what this sounds like for your business?{' '}
                            <button type="button" onClick={handleCTA('mid')} className="cs-mid-cta-link">
                                Book a 20-minute scoping call <ArrowRight size={16} strokeWidth={2.5} />
                            </button>
                        </p>
                    </div>
                </section>

                {/* ─── Section 6: Decision to go live ──────────────────── */}
                <section className="cs-section cs-section-alt">
                    <div className="container cs-prose">
                        <h2 className="cs-h2">Pilot in December. Live in January.</h2>
                        <p>The pilot did two things. It confirmed the system worked. And it surfaced the small adjustments needed before scaling.</p>
                        <p>Those refinements were folded into the live build. Tighter qualification logic. An improved confirmation SMS. Daily summaries for Denes.</p>
                        <p>On 14 January 2026 the live engagement started. As of May 2026 we&rsquo;ve been running for almost 6 months.</p>
                    </div>
                </section>

                {/* ─── Section 7: Four pillars ─────────────────────────── */}
                <section id="how" className="cs-section">
                    <div className="container">
                        <h2 className="cs-h2 cs-h2-center">Four moving parts, one operational system</h2>
                        <p className="cs-prose-lead">
                            Stellar&rsquo;s ClosedLoop Outbound product wraps four parts into a single engagement that runs in the background of Denes&rsquo;s business.
                        </p>
                        <div className="cs-pillars-grid">
                            {pillars.map((p, i) => (
                                <div key={i} className="cs-pillar">
                                    <div className="cs-pillar-icon">
                                        <p.Icon size={26} strokeWidth={1.75} color="var(--electric-violet)" />
                                    </div>
                                    <h3 className="cs-pillar-title">{p.title}</h3>
                                    <p className="cs-pillar-body">{p.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── Section 8: Cadence timeline ─────────────────────── */}
                <section className="cs-section cs-section-alt">
                    <div className="container">
                        <h2 className="cs-h2 cs-h2-center">Nine touches, six days, varied hours</h2>
                        <p className="cs-prose-lead">
                            Most outbound dies after two call attempts. Stellar&rsquo;s doesn&rsquo;t give up. We also don&rsquo;t hammer. Every lead gets up to 9 contact attempts spread across 6 days. The hours vary so a lead who doesn&rsquo;t pick up at 8am gets a fresh chance at 12pm and 5pm.
                        </p>
                        <div className="cs-cadence">
                            {cadence.map((d) => (
                                <div key={d.day} className="cs-cadence-day" tabIndex={0}>
                                    <div className="cs-cadence-daylabel">{d.day}</div>
                                    <div className="cs-cadence-dots">
                                        {d.items.map((it, idx) => (
                                            <div key={idx} className="cs-cadence-dotrow">
                                                <CadenceDot kind={it.kind} />
                                                <span className="cs-cadence-time">{it.time}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="cs-callout">
                            When a lead replies to a booking confirmation SMS, the system reads the reply and updates the booking automatically. Replies as simple as &ldquo;OK&rdquo;, &ldquo;CANCEL&rdquo;, or &ldquo;RESCHEDULE Tuesday 3pm&rdquo; all work. If they don&rsquo;t reply within a few hours, the voice agent calls them back to lock the time in.
                        </div>
                        <div className="cs-compliance">
                            <strong>Opt-outs are absolute.</strong> If a lead says they&rsquo;re not interested or asks not to be contacted, the system flags them immediately and stops all future contact. No exceptions. We take compliance seriously because Denes&rsquo;s reputation is on the line with every call.
                        </div>
                    </div>
                </section>

                {/* ─── Section 9: Caller ID rotation ───────────────────── */}
                <section className="cs-section">
                    <div className="container cs-prose">
                        <h2 className="cs-h2">When they call back, they call Denes</h2>
                        <p>We register Denes&rsquo;s own mobile number as the caller ID for outbound calls. When a lead sees a missed call and decides to ring back, they reach Denes directly. They never hit a &ldquo;this number is not in service&rdquo; message or a generic call centre.</p>
                        <p>That single change lifted return-call activity noticeably. It&rsquo;s a piece of operational sophistication most providers don&rsquo;t bother with. And it&rsquo;s one of the cleanest pieces of feedback Denes has given us.</p>
                        <div className="cs-callerid-diagram">
                            <div className="cs-callerid-panel">
                                <PhoneCall size={32} color="var(--electric-violet)" />
                                <h4>Stellar calls the lead</h4>
                                <p>Outbound placed on Denes&rsquo;s behalf. Lead&rsquo;s phone displays <strong>Denes&rsquo;s number</strong>.</p>
                            </div>
                            <div className="cs-callerid-arrow" aria-hidden="true">→</div>
                            <div className="cs-callerid-panel">
                                <Phone size={32} color="var(--electric-violet)" />
                                <h4>Lead calls back</h4>
                                <p>They press &ldquo;return call&rdquo; and it rings <strong>Denes&rsquo;s actual phone</strong>.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── Section 10: Client dashboard ────────────────────── */}
                <section className="cs-section cs-section-alt">
                    <div className="container">
                        <h2 className="cs-h2 cs-h2-center">One place to upload, track, and grade every lead</h2>
                        <div className="cs-dashboard-grid">
                            <div className="cs-dashboard-image">
                                {/* [PLACEHOLDER] Drop annotated dashboard screenshot at /public/easystart-dashboard.png */}
                                <div className="cs-placeholder-frame">
                                    <span className="cs-placeholder-label">Dashboard screenshot &mdash; pending</span>
                                </div>
                            </div>
                            <div className="cs-dashboard-features">
                                <div className="cs-dashboard-feature">
                                    <Upload size={22} color="var(--electric-violet)" />
                                    <div>
                                        <h4>Upload leads</h4>
                                        <p>Drop in new numbers as they arrive. The system picks them up automatically.</p>
                                    </div>
                                </div>
                                <div className="cs-dashboard-feature">
                                    <ListChecks size={22} color="var(--electric-violet)" />
                                    <div>
                                        <h4>Watch them run</h4>
                                        <p>See where each lead is in the contact sequence. Listen to recordings, read written summaries.</p>
                                    </div>
                                </div>
                                <div className="cs-dashboard-feature">
                                    <Star size={22} color="var(--electric-violet)" />
                                    <div>
                                        <h4>Grade the result</h4>
                                        <p>After speaking to a booked lead, Denes tags how good the lead actually was. That feedback loop is how we keep refining the way the voice agent qualifies.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── Before / After comparison (replaces white-gap) ───── */}
                <section className="cs-section">
                    <div className="container">
                        <h2 className="cs-h2 cs-h2-center">Before Stellar vs. with Stellar</h2>
                        <div className="cs-ba-grid">
                            <div className="cs-ba-col cs-ba-before">
                                <p className="cs-ba-head">Before</p>
                                <ul>
                                    {beforeAfter.map((row, i) => <li key={i}>{row.before}</li>)}
                                </ul>
                            </div>
                            <div className="cs-ba-divider" aria-hidden="true">
                                <ArrowRight size={28} strokeWidth={2.5} />
                            </div>
                            <div className="cs-ba-col cs-ba-after">
                                <p className="cs-ba-head">With Stellar</p>
                                <ul>
                                    {beforeAfter.map((row, i) => <li key={i}><Check size={16} strokeWidth={2.5} />{row.after}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── Section 11: Results stat grid ───────────────────── */}
                <section id="results" className="cs-section cs-section-alt">
                    <div className="container cs-prose">
                        <h2 className="cs-h2 cs-h2-center">Six months in</h2>
                        <p className="cs-prose-lead">
                            Volumes are deliberately moderate. Denes runs a plan that lets us send roughly 50&ndash;100 leads through the system every month. From that volume, the system is booking <strong>17&ndash;25%</strong> of leads into a real conversation with him.
                        </p>
                        <p>
                            That booking rate isn&rsquo;t the highest number on the internet. We&rsquo;re not going to pretend it is. The leads in this dataset are typical builder leads. Many inquired weeks ago. Many are still researching. A meaningful share will never qualify for finance. What matters is this: the same leads, left to a single human caller, weren&rsquo;t getting reached at all. We&rsquo;re extracting bookings from a list that would otherwise sit cold.
                        </p>
                        <StatGrid items={liveStats} size="lg" />
                        <p className="cs-data-note">
                            All figures are based on data from the Stellar client dashboard, January to May 2026. Booking rate varies month to month based on lead quality and volume.
                        </p>
                    </div>
                </section>

                {/* ─── Section 12: Hero quote ──────────────────────────── */}
                <section className="cs-hero-quote">
                    <div className="container">
                        <blockquote className="cs-hero-quote-inner">
                            <p>&ldquo;Dave, I am absolutely mind blown, this is amazing.&rdquo;</p>
                            <cite>Denes Aldott &middot; December 2025</cite>
                        </blockquote>
                    </div>
                </section>

                {/* ─── Section 13: CTA ─────────────────────────────────── */}
                <section id="get-started" className="cs-cta-section">
                    <div className="container cs-cta-inner">
                        <h2 className="cs-h2-cta">Your leads are going cold right now</h2>
                        <p>
                            If you live or die by inbound leads and you know most of them aren&rsquo;t getting reached, we should talk. ClosedLoop Outbound is built for businesses doing 50&ndash;1,000 leads a month who want every single one of them called, qualified, and booked. Without burning out a sales team. Without sounding like a robot.
                        </p>
                        <div className="cs-cta-buttons">
                            <button type="button" onClick={handleCTA('primary-bottom')} className="cs-btn-primary">
                                Book a 20-minute call
                            </button>
                            <Link to="/#products" className="cs-btn-secondary">
                                See how ClosedLoop Outbound works
                            </Link>
                        </div>
                        <ShareRow position="bottom" />
                        <div className="cs-notify-wrap">
                            <NotifyForm />
                        </div>
                    </div>
                </section>

                {/* Related case studies row — reserved, hidden until a 2nd case study lands */}
                <div data-future-section="related-case-studies" style={{ display: 'none' }} />
            </main>

            <FloatingCTA />
            <Footer />
        </>
    );
}
