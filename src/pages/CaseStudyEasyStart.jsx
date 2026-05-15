import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './CaseStudyEasyStart.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { openCalendly } from '../lib/calendly';
import { track } from '../lib/analytics';
import {
    Mic, Calendar, LayoutDashboard, PhoneCall, Play, Pause,
    Phone, MessageSquare, Mail, Upload, ListChecks, Star
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// Status: INTERNAL DRAFT — Denes Aldott / EasyStart Homes
// Per the build brief: do not publicly link or index until quotes
// and stats are approved by Denes. <meta name="robots" content="noindex,nofollow">
// is set below. Page is reachable via direct URL only.
//
// Asset placeholders flagged inline as [PLACEHOLDER] — swap before launch.
// Audio sample uses /public/audio/agent-realestate.mp3 (the real Denes call).
// ─────────────────────────────────────────────────────────────

const pilotStats = [
    { value: '60', label: 'leads contacted' },
    { value: 'up to 6', label: 'calls per lead' },
    { value: '10', label: 'qualified bookings' },
    { value: '~1 in 6', label: 'converted to a real conversation' },
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
    { Icon: Mic, title: 'A natural-sounding voice agent', body: "She introduces herself, qualifies the lead, books a follow-up time, or politely closes the call." },
    { Icon: Calendar, title: 'A multi-day contact rhythm', body: "Up to 9 touches per lead across 6 days — calls, SMS reminders, and emails at varied hours so leads who don't pick up at 8am get a fair go at 12pm and 5pm." },
    { Icon: LayoutDashboard, title: 'A client dashboard', body: "Denes uploads new leads, listens to recordings, reads written summaries, and grades the quality of every booked lead so we keep improving." },
    { Icon: PhoneCall, title: 'Caller ID on Denes’s own number', body: "When a lead misses the call and rings back, they reach Denes directly. Not a random number, not a generic call centre." },
];

const liveStats = [
    { value: '50–100', label: 'leads / month' },
    { value: '17–25%', label: 'booking rate' },
    { value: '9', label: 'contact attempts per lead' },
    { value: 'almost 6 mo', label: 'live engagement' },
];

function StatGrid({ items, size = 'lg' }) {
    return (
        <div className={`cs-stat-grid ${size}`}>
            {items.map((s, i) => (
                <div key={i} className="cs-stat-tile">
                    <div className="cs-stat-value">{s.value}</div>
                    <div className="cs-stat-label">{s.label}</div>
                </div>
            ))}
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

function AudioSample() {
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
        <div className="cs-audio-wrap">
            <div className="cs-audio-card">
                <button className="cs-audio-btn" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
                    {playing ? <Pause size={28} strokeWidth={2.25} /> : <Play size={28} strokeWidth={2.25} />}
                </button>
                <div className="cs-audio-body">
                    <p className="cs-audio-title">A real outbound call placed on behalf of EasyStart Homes</p>
                    <p className="cs-audio-caption">Edited for length and to anonymize the lead. No other changes.</p>
                </div>
                <audio ref={ref} src="/audio/agent-realestate.mp3" onEnded={() => setPlaying(false)} preload="none" />
            </div>
            <button className="cs-transcript-toggle" onClick={() => setShowTranscript(v => !v)}>
                {showTranscript ? 'Hide transcript' : 'View transcript'}
            </button>
            {showTranscript && (
                <div className="cs-transcript">
                    <p><em>[Transcript pending — generate from the approved audio sample once Denes signs off.]</em></p>
                </div>
            )}
        </div>
    );
}

export default function CaseStudyEasyStart() {
    useEffect(() => {
        const prevTitle = document.title;
        document.title = 'EasyStart Homes Case Study | Stellar Voice Agents';

        const desc = document.querySelector('meta[name="description"]');
        const prevDesc = desc?.getAttribute('content');
        if (desc) desc.setAttribute('content', 'A 6-month case study of how EasyStart Homes uses Stellar’s ClosedLoop Outbound to call, qualify, and book up to 1 in 4 leads — with an AI voice so natural the leads don’t realise.');

        track('case_study_view', { case: 'easystart-homes' });

        return () => {
            document.title = prevTitle;
            if (desc && prevDesc) desc.setAttribute('content', prevDesc);
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
                {/* ─── Section 1: Hero ─────────────────────────────────────── */}
                <section className="cs-hero">
                    <div className="container cs-hero-inner">
                        <p className="cs-eyebrow">Case Study</p>
                        <h1 className="cs-h1">From a 60-lead pilot to a 6-month outbound engine</h1>
                        <p className="cs-hero-sub">
                            How EasyStart Homes uses Stellar&rsquo;s ClosedLoop Outbound to qualify and book 17&ndash;25% of inbound leads &mdash; with a voice so natural the leads don&rsquo;t realise they&rsquo;re talking to AI.
                        </p>
                        <div className="cs-hero-cta">
                            <button type="button" onClick={handleCTA('primary')} className="cs-btn-primary">
                                Book a call to scope yours
                            </button>
                        </div>
                    </div>
                    <div className="cs-hero-wave" aria-hidden="true">
                        {[...Array(14)].map((_, i) => (
                            <div key={i} style={{ animationDelay: `${i * 0.1}s` }}></div>
                        ))}
                    </div>
                </section>

                {/* ─── Section 2: Client snapshot ──────────────────────────── */}
                <section className="cs-section cs-snapshot-section">
                    <div className="container">
                        <div className="cs-snapshot">
                            <div className="cs-snapshot-logo">
                                {/* [PLACEHOLDER] Drop /public/easystart-logo.png and replace this div */}
                                <span>EasyStart Homes</span>
                            </div>
                            <ul className="cs-snapshot-meta">
                                <li><strong>Client</strong>Denes Aldott</li>
                                <li><strong>Industry</strong>Residential home building (AU)</li>
                                <li><strong>Product</strong>ClosedLoop Outbound</li>
                                <li><strong>Live since</strong>January 2026</li>
                                <li><strong>Volume</strong>50&ndash;100 leads / mo</li>
                                <li><strong>Booking rate</strong>17&ndash;25%</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ─── Section 3: The problem ──────────────────────────────── */}
                <section className="cs-section">
                    <div className="container cs-prose">
                        <h2 className="cs-h2">The leads were already paid for. Most never got a real conversation.</h2>
                        <p>
                            Denes runs sales for EasyStart Homes. Every inbound lead represents real ad spend and real intent &mdash; somebody who has put their hand up and said they want to build a new home. The problem was simple and very common in builder sales: a single human caller can only chase a lead so many times before they move on, and a lead that isn&rsquo;t reached within hours of inquiry goes cold fast.
                        </p>
                        <p>
                            The team needed a way to call every lead, multiple times, across multiple days, at different times &mdash; without burning out a sales person or losing the personal feel of being called by Denes himself.
                        </p>
                        <p>
                            There was also a measurement problem. There was no shared place to see which leads had been called, what they said, which ones turned hot, and which ones politely asked to be left alone.
                        </p>
                    </div>
                </section>

                {/* ─── Section 4: The December pilot ───────────────────────── */}
                <section className="cs-section cs-section-alt">
                    <div className="container cs-prose">
                        <h2 className="cs-h2">A 60-lead pilot in December</h2>
                        <p>
                            In December 2025 we ran a deliberately small pilot. We took 60 of Denes&rsquo;s existing leads &mdash; leads that had inquired about building a new home and then gone quiet &mdash; and we put them through Stellar&rsquo;s outbound system. Each lead was given a fair chance to be reached: up to 6 calls spread across the working week, plus follow-up SMS, all coming from Denes&rsquo;s branded caller ID.
                        </p>
                        <p>
                            The goal wasn&rsquo;t to book a stadium full of appointments. It was to prove the system worked on real leads, with a real voice, for a real Australian home builder.
                        </p>
                        <StatGrid items={pilotStats} size="sm" />
                    </div>
                </section>

                {/* ─── Section 5: "But does it actually sound like a person?" ── */}
                <section className="cs-section">
                    <div className="container cs-prose cs-audio-section">
                        <h2 className="cs-h2">But does it actually sound like a person?</h2>
                        <p>
                            The first question every prospect asks us is some version of: &ldquo;AI voice still sounds like a robot, right?&rdquo; It&rsquo;s a fair question. Most AI voice you&rsquo;ve heard does sound like a robot.
                        </p>
                        <p>
                            Stellar&rsquo;s voice agent doesn&rsquo;t. Before Denes agreed to put a single real lead through the system, he tested her himself. He called in, listened, asked the kind of curveball questions a real customer would ask, and reacted in the moment.
                        </p>

                        <blockquote className="cs-quote-inline">
                            <p>&ldquo;That&rsquo;s just so unreal, well done!&rdquo;</p>
                            <cite>Denes Aldott, after testing the AI voice agent himself (10 December 2025)</cite>
                        </blockquote>

                        <p>
                            What makes the voice work isn&rsquo;t a single trick. It&rsquo;s the combination of natural pacing, a warm Australian-friendly tone, the ability to handle interruptions and &ldquo;ums&rdquo; without losing the thread, and the discipline to keep the conversation focused on one thing: figuring out whether this is a real lead and, if so, getting them booked in with Denes.
                        </p>
                        <p>
                            The voice introduces herself by name. She says she&rsquo;s calling on behalf of Denes from EasyStart Homes. If the lead says they&rsquo;re not interested, she politely closes the call. If they are interested, she qualifies their plans for a new build, books a follow-up time that suits them, and confirms it back by SMS.
                        </p>

                        <AudioSample />
                    </div>
                </section>

                {/* ─── Section 6: Decision to go live ──────────────────────── */}
                <section className="cs-section cs-section-alt">
                    <div className="container cs-prose">
                        <h2 className="cs-h2">Pilot in December. Live in January.</h2>
                        <p>
                            The pilot did two things. It confirmed the system worked, and it surfaced the small adjustments needed before scaling. Those refinements were folded into the live build &mdash; tighter qualification logic, an improved confirmation SMS, daily summaries for Denes.
                        </p>
                        <p>
                            On 14 January 2026 the live engagement started. As of May 2026 we&rsquo;ve been running for almost 6 months.
                        </p>
                    </div>
                </section>

                {/* ─── Section 7: Four pillars ─────────────────────────────── */}
                <section className="cs-section">
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

                {/* ─── Section 8: Cadence timeline ─────────────────────────── */}
                <section className="cs-section cs-section-alt">
                    <div className="container">
                        <h2 className="cs-h2 cs-h2-center">Nine touches, six days, varied hours</h2>
                        <p className="cs-prose-lead">
                            Most outbound dies after two call attempts. Stellar&rsquo;s doesn&rsquo;t give up. We also don&rsquo;t hammer. Every lead gets up to 9 contact attempts spread across 6 days, with the hours varied so a lead that doesn&rsquo;t pick up at 8am gets a fresh chance at 12pm and 5pm.
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
                    </div>
                </section>

                {/* ─── Section 9: Caller ID rotation ───────────────────────── */}
                <section className="cs-section">
                    <div className="container cs-prose">
                        <h2 className="cs-h2">When they call back, they call Denes</h2>
                        <p>
                            We register Denes&rsquo;s own mobile number as the caller ID for outbound calls. When a lead sees a missed call and decides to ring back, they reach Denes directly. They never hit a &ldquo;this number is not in service&rdquo; message or a generic call centre.
                        </p>
                        <p>
                            That single change lifted return-call activity noticeably. It&rsquo;s also a piece of operational sophistication that most providers don&rsquo;t bother with &mdash; and it&rsquo;s one of the cleanest pieces of feedback Denes has given us.
                        </p>
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

                {/* ─── Section 10: Client dashboard ────────────────────────── */}
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

                {/* ─── Section 11: Results stat grid ───────────────────────── */}
                <section className="cs-section">
                    <div className="container cs-prose">
                        <h2 className="cs-h2 cs-h2-center">Six months in</h2>
                        <p className="cs-prose-lead">
                            Volumes are deliberately moderate. Denes runs a plan that lets us send roughly 50&ndash;100 leads through the system every month. From that volume, the system is booking <strong>17&ndash;25%</strong> of leads into a real conversation with him.
                        </p>
                        <p>
                            That booking rate is not the highest number on the internet, and we&rsquo;re not going to pretend it is. The leads in this dataset are typical builder leads &mdash; many inquired weeks ago, many are still researching, and a meaningful share will never qualify for finance. What matters is that the same leads, left to a single human caller, weren&rsquo;t getting reached at all. We&rsquo;re extracting bookings from a list that would otherwise mostly sit cold.
                        </p>
                        <StatGrid items={liveStats} size="lg" />
                    </div>
                </section>

                {/* ─── Section 12: Hero quote ──────────────────────────────── */}
                <section className="cs-hero-quote">
                    <div className="container">
                        <blockquote className="cs-hero-quote-inner">
                            <p>&ldquo;Dave, I am absolutely mind blown, this is amazing.&rdquo;</p>
                            <cite>Denes Aldott, EasyStart Homes &middot; December 2025</cite>
                        </blockquote>
                    </div>
                </section>

                {/* ─── Section 13: CTA ─────────────────────────────────────── */}
                <section className="cs-cta-section">
                    <div className="container cs-cta-inner">
                        <h2 className="cs-h2-cta">Want this for your business?</h2>
                        <p>
                            If you live or die by inbound leads and you know most of them aren&rsquo;t getting reached, we should talk. ClosedLoop Outbound is built for businesses doing 50&ndash;1,000 leads a month who want every single one of them called, qualified, and booked &mdash; without burning out a sales team and without sounding like a robot.
                        </p>
                        <div className="cs-cta-buttons">
                            <button type="button" onClick={handleCTA('primary-bottom')} className="cs-btn-primary">
                                Book a 20-minute call
                            </button>
                            <Link to="/#products" className="cs-btn-secondary">
                                See how ClosedLoop Outbound works
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Related case studies row — reserved, hidden until a 2nd case study lands */}
                <div data-future-section="related-case-studies" style={{ display: 'none' }} />
            </main>

            <Footer />
        </>
    );
}
