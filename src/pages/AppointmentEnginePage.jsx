import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { openCalendly } from '../lib/calendly';
import { track } from '../lib/analytics';
import './AppointmentEnginePage.css';

const PAGE_URL = 'https://www.stellarvoiceagents.com/appointment-engine';

const PROBLEMS = [
    {
        icon: '💸',
        title: 'Setter teams are expensive and fragile',
        body: 'A team of 4 to 5 SDRs costs six figures a year. Training takes weeks, turnover is constant, and one resignation drops your pipeline overnight.'
    },
    {
        icon: '🧊',
        title: 'Leads go cold in hours',
        body: 'The average business takes 47 hours to follow up. By then your lead has forgotten they enquired, or already booked with a competitor who called first.'
    },
    {
        icon: '📅',
        title: 'Your closers are ready, the calendar is not',
        body: 'The bottleneck is almost never the close. It is the front of the funnel. Fix the appointment flow and everything downstream improves.'
    }
];

const STEPS = [
    { n: '1', label: 'Prospect', body: 'We build your ideal-buyer list and target the people most likely to need what you sell.' },
    { n: '2', label: 'Attract', body: 'We run your Google Ads to capture high-intent buyers actively searching for your service right now.' },
    { n: '3', label: 'Call', body: 'Your AI voice agent calls every lead within 30 seconds. It qualifies, handles objections, and books the appointment.' },
    { n: '4', label: 'Close', body: 'A qualified, booked appointment lands in your calendar. Your team just closes the deal.' }
];

const INCLUDED = [
    { title: 'AI Prospecting Agent', body: 'Builds your Ideal Customer Profile, researches target buyers, and generates lead lists for ads and outbound.' },
    { title: 'Google Ads, fully managed', body: 'Fully managed for you: campaign strategy, build, keyword research, ad copy, A/B testing, and ongoing bid optimization.' },
    { title: 'Landing pages and lead magnets', body: 'Built per campaign and designed to pre-qualify the lead before the call ever happens.' },
    { title: 'AI Voice SDR (the core engine)', body: 'Calls within 30 seconds, qualifies on your criteria, handles objections, books the appointment, and stays compliant by region.' },
    { title: 'CRM, automation and follow-up', body: 'Works with your CRM or we set one up. SMS, email and WhatsApp sequences, plus a no-show agent that re-engages misses.' },
    { title: 'Reporting and support', body: 'A monthly report on the numbers that matter, plus a direct WhatsApp line. No tickets, no waiting.' }
];

const VERSUS = [
    { h: 'vs a human SDR team', body: '30 seconds, not hours. A fraction of the cost. No training, no turnover, no sick days. Scales the moment you want it to.' },
    { h: 'vs offshore call centers', body: 'Consistent quality on every call. No accent or timezone gaps. Available 24/7, and it gets better over time, not worse.' },
    { h: 'vs other AI voice tools', body: 'They hand you a voice agent and wish you luck. We deliver the whole system, from prospecting to booked appointment, fully managed.' }
];

const FAQS = [
    { q: 'What do I actually have to do?', a: 'Almost nothing. You approve the setup, fund your own Google ad budget, and show up to the appointments we book. We run the rest.' },
    { q: 'Who pays for the ads?', a: 'You do, directly to Google, so you own the ad account. We build and manage the campaigns. Minimum ad spend is set per industry.' },
    { q: 'How fast will I see results?', a: 'AI calling is live within days. The 2-week pilot is built to produce booked, qualified appointments inside 14 days.' },
    { q: "What if it doesn't work?", a: 'If the pilot books zero qualified appointments in 14 days, you get your pilot fee back. That is how confident we are in speed-to-lead.' },
    { q: 'Will the AI sound robotic?', a: 'No. The voice is natural enough that one client\'s leads have not realised they were speaking with AI across 6+ months live. It engages, qualifies, and books like a great human setter.' }
];

export default function AppointmentEnginePage() {
    useEffect(() => {
        const prevTitle = document.title;
        document.title = 'AI Appointment Engine | Done-For-You Booked Appointments | Stellar Voice Agents';

        const desc = document.querySelector('meta[name="description"]');
        const prevDesc = desc?.getAttribute('content');
        const description = 'A done-for-you AI appointment engine: we find your buyers, run your Google Ads, and call every lead within 30 seconds, then book qualified appointments straight into your calendar. 2-week pilots, booked appointments in 14 days or your money back.';
        if (desc) desc.setAttribute('content', description);

        const tags = [
            { property: 'og:title', content: 'The SVA Appointment Engine — Done-For-You Booked Appointments' },
            { property: 'og:description', content: description },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: PAGE_URL },
            { property: 'og:image', content: 'https://www.stellarvoiceagents.com/logo.webp' },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: 'The SVA Appointment Engine' },
            { name: 'twitter:description', content: description },
        ];
        const created = tags.map((t) => {
            const m = document.createElement('meta');
            if (t.property) m.setAttribute('property', t.property);
            if (t.name) m.setAttribute('name', t.name);
            m.setAttribute('content', t.content);
            document.head.appendChild(m);
            return m;
        });

        const ld = document.createElement('script');
        ld.type = 'application/ld+json';
        ld.text = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'SVA Appointment Engine',
            serviceType: 'Done-for-you AI appointment setting and lead generation',
            provider: { '@type': 'Organization', name: 'Stellar Voice Agents', url: 'https://www.stellarvoiceagents.com' },
            areaServed: 'Worldwide',
            description,
            url: PAGE_URL,
        });
        document.head.appendChild(ld);

        return () => {
            document.title = prevTitle;
            if (desc && prevDesc) desc.setAttribute('content', prevDesc);
            created.forEach((m) => document.head.removeChild(m));
            document.head.removeChild(ld);
        };
    }, []);

    const book = (source) => {
        track('appointment_engine_cta', { source });
        openCalendly(undefined, source);
    };

    return (
        <>
            <Navbar />
            <main className="ae-page">
                {/* HERO */}
                <section className="ae-hero">
                    <div className="container ae-hero-inner">
                        <p className="ae-eyebrow">Done-for-you appointment engine</p>
                        <h1>Your team should do one thing. Close.</h1>
                        <p className="ae-hero-sub">
                            The SVA Appointment Engine finds your buyers, runs your ads, and calls every lead within
                            30 seconds, then books qualified appointments straight into your calendar. Your closers
                            never chase a cold lead again.
                        </p>
                        <div className="ae-hero-cta">
                            <button type="button" className="ae-btn-primary" onClick={() => book('appointment-engine-hero')}>
                                Book a pilot call
                            </button>
                            <a href="#how" className="ae-btn-ghost">See how it works</a>
                        </div>
                        <p className="ae-hero-teaser">
                            2-week pilots from <strong>$2,500</strong>. Booked appointments in 14 days, or your money back.
                        </p>
                    </div>
                </section>

                {/* PROBLEM */}
                <section className="ae-section">
                    <div className="container">
                        <h2 className="ae-h2">Why your calendar is empty</h2>
                        <div className="ae-cards-3">
                            {PROBLEMS.map((p) => (
                                <div key={p.title} className="ae-card">
                                    <span className="ae-card-icon" aria-hidden>{p.icon}</span>
                                    <h3>{p.title}</h3>
                                    <p>{p.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* HOW IT WORKS */}
                <section className="ae-section ae-how" id="how">
                    <div className="container">
                        <p className="ae-eyebrow ae-eyebrow-dark">How it works</p>
                        <h2 className="ae-h2">Prospect. Attract. Call. Close.</h2>
                        <div className="ae-steps">
                            {STEPS.map((s) => (
                                <div key={s.n} className="ae-step">
                                    <span className="ae-step-n">{s.n}</span>
                                    <h3>{s.label}</h3>
                                    <p>{s.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* WHAT'S INCLUDED */}
                <section className="ae-section">
                    <div className="container">
                        <h2 className="ae-h2">The whole front of your funnel, handled</h2>
                        <p className="ae-lead">
                            This is not just a voice agent. It is a complete machine: prospecting, ads, landing pages,
                            instant calling, CRM, follow-up, and reporting. Fully managed.
                        </p>
                        <div className="ae-cards-2">
                            {INCLUDED.map((c) => (
                                <div key={c.title} className="ae-inc">
                                    <span className="ae-inc-check" aria-hidden>✓</span>
                                    <div>
                                        <h3>{c.title}</h3>
                                        <p>{c.body}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* WHY GOOGLE ADS */}
                <section className="ae-band">
                    <div className="container ae-band-inner">
                        <h2 className="ae-h2 ae-h2-light">We buy intent, not attention.</h2>
                        <p>
                            When someone searches "HVAC repair near me" or "commercial loan broker," they are looking
                            for a solution right now. We capture them at that exact moment, then your AI agent calls in
                            30 seconds while they are still on their phone. That is the most convertible lead there is.
                        </p>
                    </div>
                </section>

                {/* PILOT + GUARANTEE */}
                <section className="ae-section">
                    <div className="container">
                        <div className="ae-pilot">
                            <div className="ae-pilot-text">
                                <p className="ae-eyebrow ae-eyebrow-dark">The 2-week pilot</p>
                                <h2 className="ae-h2">Prove it before you commit.</h2>
                                <p className="ae-lead">
                                    We build the full system, get your AI agent calling within days, and run it for two
                                    weeks. Booked qualified appointments in 14 days, or your money back. No long
                                    contracts, cancel anytime after month 3.
                                </p>
                                <p className="ae-pilot-price">
                                    Pilots from <strong>$2,500</strong>. Then a simple monthly that lands well under the
                                    cost of a single SDR, let alone a team of them.
                                </p>
                                <button type="button" className="ae-btn-primary" onClick={() => book('appointment-engine-pilot')}>
                                    Book a pilot call
                                </button>
                            </div>
                            <ul className="ae-pilot-list">
                                <li>Full system setup: agent, scripts, qualification, ads, landing page, CRM</li>
                                <li>AI calling live within the first few days</li>
                                <li>Booked appointments inside 14 days, guaranteed</li>
                                <li>You own your ad account and your data</li>
                                <li>No long-term contract</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* VS ALTERNATIVES */}
                <section className="ae-section ae-grey">
                    <div className="container">
                        <h2 className="ae-h2">Why it beats the alternatives</h2>
                        <div className="ae-cards-3">
                            {VERSUS.map((v) => (
                                <div key={v.h} className="ae-card ae-card-versus">
                                    <h3>{v.h}</h3>
                                    <p>{v.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* VERTICALS */}
                <section className="ae-section">
                    <div className="container ae-verticals">
                        <h2 className="ae-h2">Built for sales-led service businesses</h2>
                        <p className="ae-lead">
                            We focus on verticals where one booked appointment is worth real money and speed-to-lead
                            decides the sale.
                        </p>
                        <div className="ae-vert-tags">
                            {['Home services', 'Healthcare', 'Real estate', 'Financial services', 'Solar', 'Hospitality'].map((v) => (
                                <span key={v} className="ae-vert-tag">{v}</span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="ae-section ae-grey">
                    <div className="container ae-faq">
                        <h2 className="ae-h2">Questions, answered</h2>
                        {FAQS.map((f) => (
                            <div key={f.q} className="ae-faq-item">
                                <h3>{f.q}</h3>
                                <p>{f.a}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FINAL CTA */}
                <section className="ae-final">
                    <div className="container ae-final-inner">
                        <h2>Hand your team a full calendar.</h2>
                        <p>Start with a 2-week pilot. Booked appointments in 14 days, or your money back.</p>
                        <button type="button" className="ae-btn-primary ae-btn-lg" onClick={() => book('appointment-engine-final')}>
                            Book a pilot call
                        </button>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
