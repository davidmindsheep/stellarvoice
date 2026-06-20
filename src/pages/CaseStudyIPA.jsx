import React, { useEffect, useState } from 'react';
import './CaseStudyIPA.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { openCalendly } from '../lib/calendly';
import { track } from '../lib/analytics';
import { Linkedin, Twitter, Mail, Link as LinkIcon, Check, X as CloseIcon } from 'lucide-react';

const PAGE_URL = 'https://www.stellarvoiceagents.com/case-studies/ipa-lead-reactivation';
const SHARE_TEXT = 'How an AI voice agent turned an 11-month-old dead lead into a confirmed $500K property buyer.';
const CASE = 'ipa-lead-reactivation';

// ─── Data ────────────────────────────────────────────────────
const HERO_METRICS = [
    { value: '6%', label: 'reactivation rate on 11-month-old leads' },
    { value: '$500K', label: 'confirmed property buyer' },
    { value: '0%', label: 'of leads knew they spoke to an AI' },
];

const NUMBERS = [
    { value: '~100', label: 'leads in the batch' },
    { value: '11 mo', label: 'average lead age' },
    { value: '6', label: 'leads came back warm' },
    { value: '1', label: 'confirmed buyer' },
    { value: '< 4 wks', label: 'from call to confirmed visit' },
    { value: '$500K', label: 'estimated property value (AUD)' },
];

const WHY = [
    { h: 'Dead leads are not dead', b: 'Leads do not expire the way sales teams think. The buyer here had enquired 11 months earlier. His interest did not disappear. It just was not being tracked. Research shows 63% of people who enquire eventually buy, just not on the timeline the sales team expects.' },
    { h: 'AI makes the economics work', b: 'No human team will call through 100 leads that are 11 months old. The expected return is too low. An AI agent makes those calls in hours, at a fraction of the cost, with zero fatigue. Even if 99 calls return nothing, the one $500K sale pays for the campaign many times over.' },
    { h: 'Speed and consistency', b: 'Sophie called every lead with the same energy and the same structured qualifying process. No bad days. No rushing at 4pm on a Friday. No skipping leads because the name looked unfamiliar.' },
    { h: 'The sales team gets better leads', b: 'IPA\'s team did not waste time on 100 cold calls. They received 6 pre-qualified warm leads, including one red-hot prospect with a confirmed date and budget. The AI does the filtering. The humans do the closing.' },
    { h: 'Sales leadership can trust the AI', b: 'Phil\'s vetting proved AI voice agents are not a black box. They can be tested, refined, and approved by the same leaders who would evaluate a human hire. Once trust is earned, the AI becomes a scalable extension of the team.' },
    { h: 'The handoff works', b: 'The buyer had no idea he spoke to an AI. When IPA\'s director called him back, the transition was seamless. No awkward reveal, no loss of trust. The AI started the relationship. The human deepened it.' },
    { h: 'Even AI sceptics get converted', b: 'Andy, IPA\'s Managing Director, openly admitted he was not an AI fan. After seeing the results, he changed his mind entirely. When a seasoned MD who has worked with dozens of vendors is won over, the technology has crossed a credibility threshold.' },
];

const NAV = [
    { id: 'problem', label: 'The Problem' },
    { id: 'approval', label: 'The Approval' },
    { id: 'call', label: 'The Result' },
    { id: 'handoff', label: 'The Handoff' },
    { id: 'numbers', label: 'The Numbers' },
    { id: 'why', label: 'Why It Matters' },
    { id: 'cta', label: 'Get Started' },
];

// ─── Helpers ─────────────────────────────────────────────────
function ShareRow({ position }) {
    const u = encodeURIComponent(PAGE_URL);
    const t = encodeURIComponent(SHARE_TEXT);
    const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${u}`;
    const x = `https://twitter.com/intent/tweet?url=${u}&text=${t}`;
    const email = `mailto:?subject=${encodeURIComponent('Stellar Voice Agents — IPA lead reactivation case study')}&body=${t}%0A%0A${u}`;
    const [copied, setCopied] = useState(false);
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(PAGE_URL);
            setCopied(true);
            track('case_study_share', { case: CASE, channel: 'copy', position });
            setTimeout(() => setCopied(false), 1500);
        } catch { /* ignore */ }
    };
    const onClick = (channel) => () => track('case_study_share', { case: CASE, channel, position });
    return (
        <div className={`ipa-share ipa-share-${position}`}>
            <span className="ipa-share-label">Share this case study</span>
            <div className="ipa-share-icons">
                <a href={linkedin} target="_blank" rel="noopener noreferrer" onClick={onClick('linkedin')} aria-label="Share on LinkedIn"><Linkedin size={20} /></a>
                <a href={x} target="_blank" rel="noopener noreferrer" onClick={onClick('x')} aria-label="Share on X"><Twitter size={20} /></a>
                <a href={email} onClick={onClick('email')} aria-label="Share via email"><Mail size={20} /></a>
                <button type="button" onClick={copy} aria-label="Copy link">{copied ? <Check size={20} /> : <LinkIcon size={20} />}</button>
            </div>
        </div>
    );
}

function FloatingCta() {
    const [visible, setVisible] = useState(false);
    const [dismissed, setDismissed] = useState(false);
    useEffect(() => {
        const onScroll = () => {
            if (dismissed) return;
            const cta = document.querySelector('#cta');
            const nearBottom = cta && cta.getBoundingClientRect().top < window.innerHeight - 100;
            setVisible(window.scrollY > 700 && !nearBottom);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, [dismissed]);
    if (dismissed || !visible) return null;
    return (
        <div className="ipa-floating">
            <button type="button" className="ipa-floating-btn" onClick={() => { track('case_study_cta_floating_click', { case: CASE }); openCalendly(undefined, 'case-ipa-floating'); }}>Book a call</button>
            <button type="button" className="ipa-floating-dismiss" onClick={() => setDismissed(true)} aria-label="Dismiss"><CloseIcon size={14} strokeWidth={2.25} /></button>
        </div>
    );
}

export default function CaseStudyIPA() {
    const book = (source) => { track('case_study_cta', { case: CASE, source }); openCalendly(undefined, source); };

    useEffect(() => {
        const prevTitle = document.title;
        document.title = 'IPA Lead Reactivation: A Dead Lead to a $500K Buyer | Stellar Voice Agents';
        const desc = document.querySelector('meta[name="description"]');
        const prevDesc = desc?.getAttribute('content');
        const description = 'AI voice agent case study: Stellar Voice Agents called 100 of International Property Alerts\' aged leads. Six came back warm and one became a confirmed $500K property buyer who had no idea he spoke to an AI.';
        if (desc) desc.setAttribute('content', description);
        const tags = [
            { property: 'og:title', content: 'From a Dead Database to a $500K Property Buyer' },
            { property: 'og:description', content: description },
            { property: 'og:type', content: 'article' },
            { property: 'og:url', content: PAGE_URL },
            { property: 'og:image', content: 'https://www.stellarvoiceagents.com/logo.webp' },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: 'From a Dead Database to a $500K Property Buyer' },
            { name: 'twitter:description', content: description },
        ];
        const created = tags.map((tg) => {
            const m = document.createElement('meta');
            if (tg.property) m.setAttribute('property', tg.property);
            if (tg.name) m.setAttribute('name', tg.name);
            m.setAttribute('content', tg.content);
            document.head.appendChild(m);
            return m;
        });
        const ld = document.createElement('script');
        ld.type = 'application/ld+json';
        ld.text = JSON.stringify({
            '@context': 'https://schema.org', '@type': 'Article',
            headline: 'From a Dead Database to a $500K Property Buyer',
            datePublished: '2026-06-19',
            author: { '@type': 'Organization', name: 'Stellar Voice Agents', url: 'https://www.stellarvoiceagents.com' },
            publisher: { '@type': 'Organization', name: 'Stellar Voice Agents', logo: { '@type': 'ImageObject', url: 'https://www.stellarvoiceagents.com/logo.png' } },
            about: { '@type': 'Organization', name: 'International Property Alerts' },
            description, mainEntityOfPage: PAGE_URL,
        });
        document.head.appendChild(ld);
        track('case_study_view', { case: CASE });
        return () => {
            document.title = prevTitle;
            if (desc && prevDesc) desc.setAttribute('content', prevDesc);
            created.forEach((m) => document.head.removeChild(m));
            document.head.removeChild(ld);
        };
    }, []);

    return (
        <>
            <Navbar />
            <FloatingCta />
            <main className="ipa-page">
                {/* HERO */}
                <section className="ipa-hero">
                    <div className="container ipa-hero-inner">
                        <p className="ipa-tag">Case Study · 6 min read</p>
                        <h1>From a dead database to a $500K property buyer.</h1>
                        <p className="ipa-hero-sub">
                            How Stellar Voice Agents reactivated an 11-month-old lead for International Property Alerts.
                            The buyer had no idea he spoke to an AI.
                        </p>
                        <button type="button" className="ipa-btn" onClick={() => book('case-ipa-hero')}>Book a call to scope yours</button>
                        <ShareRow position="top" />
                    </div>
                </section>

                {/* FEATURED QUOTE — Andy */}
                <section className="ipa-featured-quote">
                    <div className="container">
                        <blockquote>
                            <p>&ldquo;I'm not an AI fan, but you have changed my mind.&rdquo;</p>
                            <cite>Andy, Managing Director, International Property Alerts</cite>
                        </blockquote>
                    </div>
                </section>

                {/* AT A GLANCE + CLIENT */}
                <section className="ipa-section">
                    <div className="container ipa-glance-grid">
                        <div className="ipa-glance">
                            <h2 className="ipa-eyebrow">At a glance</h2>
                            <dl>
                                <div><dt>Client</dt><dd>International Property Alerts (IPA)</dd></div>
                                <div><dt>Challenge</dt><dd>Hundreds of aged leads from Facebook ads sitting untouched for months.</dd></div>
                                <div><dt>Result</dt><dd>6% reactivation rate from 11-month-old leads. One confirmed $500K buyer with a trip booked.</dd></div>
                            </dl>
                        </div>
                        <div className="ipa-client-card">
                            <p className="ipa-client-name">International Property Alerts</p>
                            <p className="ipa-client-role">Global Property Investment Platform · Founder Chris White</p>
                            <div className="ipa-client-meta">
                                <span><strong>Industry</strong>International real estate</span>
                                <span><strong>Product</strong>Outbound lead reactivation</span>
                                <span><strong>Live since</strong>June 2026</span>
                                <span><strong>Volume</strong>~100 aged leads (AU batch)</span>
                                <span><strong>Reactivation</strong>6%</span>
                                <span><strong>Hot conversion</strong>1% (confirmed buyer)</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* STICKY NAV */}
                <nav className="ipa-nav">
                    <div className="container ipa-nav-inner">
                        {NAV.map((n) => <a key={n.id} href={`#${n.id}`}>{n.label}</a>)}
                    </div>
                </nav>

                {/* THE PROBLEM */}
                <section className="ipa-section ipa-grey" id="problem">
                    <div className="container ipa-prose">
                        <h2>The problem: leads do not expire the way sales teams think</h2>
                        <p>Every property company has the same issue. Leads come in through ads, downloads, and enquiries. The sales team follows up on the fresh ones. Anything older than a few weeks gets pushed down the list. After a few months, those leads are considered dead.</p>
                        <p>IPA had accumulated hundreds of these dead leads from their Australian market alone. People who had downloaded their Bali Buyer's Guide, expressed interest in Bali property, and then never heard from anyone again. The sales team had moved on. The leads were sitting in a spreadsheet. Nobody was calling them.</p>
                        <p className="ipa-pull">The assumption was simple: if they were interested, they would have called back. That assumption was wrong.</p>
                    </div>
                </section>

                {/* THE APPROVAL */}
                <section className="ipa-section" id="approval">
                    <div className="container ipa-prose">
                        <h2>The approval: IPA's best salesperson tested her first</h2>
                        <p>Before Stellar Voice Agents' AI agent, Sophie, was let loose on IPA's database, she had to pass a critical test. Phil, IPA's Sales Director and a highly respected figure within the organisation, personally put the AI through a rigorous evaluation. He pushed her with the tough, real-world scenarios experienced sales professionals throw at new hires: objection handling, brand representation, and whether the conversation felt natural rather than robotic.</p>
                        <p>This mattered. IPA was trusting an AI to speak on behalf of their brand to real prospects, and Phil's approval was not given lightly. Once he signed off, the doors opened.</p>
                        <p className="ipa-pull">When your best salesperson tests the AI and says "yes, this is good enough to represent us," you know the technology is ready. Getting buy-in from sales leadership is not a hurdle. It is a feature.</p>
                    </div>
                </section>

                {/* THE NUMBERS */}
                <section className="ipa-section ipa-grey" id="numbers">
                    <div className="container">
                        <h2 className="ipa-h2-center">The numbers</h2>
                        <div className="ipa-metrics">
                            {HERO_METRICS.map((m) => (
                                <div key={m.label} className="ipa-metric">
                                    <span className="ipa-metric-v">{m.value}</span>
                                    <span className="ipa-metric-l">{m.label}</span>
                                </div>
                            ))}
                        </div>
                        <div className="ipa-numgrid">
                            {NUMBERS.map((n) => (
                                <div key={n.label} className="ipa-num">
                                    <span className="ipa-num-v">{n.value}</span>
                                    <span className="ipa-num-l">{n.label}</span>
                                </div>
                            ))}
                        </div>
                        <p className="ipa-context">
                            A 6% reactivation rate from 11-month-old leads is significant. These were leads that had been completely written off. For comparison, industry data shows fewer than 2% of aged leads (6+ months) are ever re-contacted, and of those, conversion is typically under 1%. Six warm responses and one confirmed buyer from 100 calls outperforms most fresh-lead campaigns.
                        </p>
                    </div>
                </section>

                {/* THE RESULT */}
                <section className="ipa-section" id="call">
                    <div className="container ipa-prose">
                        <h2>The result: a dead lead, reactivated</h2>
                        <p>One of the leads in that Australian batch was a property investor who had downloaded IPA's Bali Buyer's Guide through a Facebook campaign roughly 11 months earlier. Nobody had followed up. When Sophie called, he was not only still interested, he was actively planning to buy.</p>
                        <p>In a single call of under three minutes, Sophie confirmed his interest, established that he was buying for investment, learned his budget was around half a million dollars, found he was an experienced overseas buyer, and discovered he had a trip booked within weeks specifically to purchase. She booked him a follow-up with IPA's specialist team.</p>
                        <p>Was the call perfect? No. The close could have been smoother. But that is not the point. Sophie's job was to find out whether he was worth a salesperson's time and gather enough detail to hand over a qualified lead. She did exactly that. The AI is not trying to replace a salesperson. It is trying to find the people worth a salesperson's time.</p>
                    </div>
                </section>

                {/* THE HANDOFF */}
                <section className="ipa-section ipa-grey" id="handoff">
                    <div className="container ipa-prose">
                        <h2>The handoff: the human takes over</h2>
                        <p>Phil, IPA's Sales Director, personally called the lead back. He walked him through IPA's current Bali portfolio, talked through options that matched what he was after, and confirmed the details of his upcoming visit.</p>
                        <p>The most telling part: the buyer confirmed he had no idea his first call was with an AI. As far as he was concerned, he had spoken to a friendly IPA representative who followed up on his interest. The handoff from AI to human was seamless.</p>
                        <p className="ipa-pull">A serious, repeat investor with a clear budget and a confirmed travel date. The kind of lead sales teams dream about. And he had been sitting in a spreadsheet for 11 months.</p>
                    </div>
                </section>

                {/* QUOTES */}
                <section className="ipa-section">
                    <div className="container">
                        <h2 className="ipa-h2-center">The reaction from IPA</h2>
                        <div className="ipa-quotes">
                            <blockquote className="ipa-quote">
                                <p>&ldquo;I'm not an AI fan, but you have changed my mind. I think you're a game changer for us.&rdquo;</p>
                                <cite>Andy &middot; Managing Director, IPA</cite>
                            </blockquote>
                            <blockquote className="ipa-quote">
                                <p>&ldquo;That is brilliant. We're scaling at a skyrocket rate... well done... We're going to go for it.&rdquo;</p>
                                <cite>Chris White &middot; Founder, IPA</cite>
                            </blockquote>
                            <blockquote className="ipa-quote">
                                <p>&ldquo;Phil, IPA's toughest closer, stress-tested Sophie and said, &lsquo;she's good enough to represent us.&rsquo; That's when I knew.&rdquo;</p>
                                <cite>David Taylor &middot; Co-Founder, Stellar Voice Agents</cite>
                            </blockquote>
                        </div>
                    </div>
                </section>

                {/* WHY IT MATTERS */}
                <section className="ipa-section ipa-grey" id="why">
                    <div className="container">
                        <h2 className="ipa-h2-center">Why this matters</h2>
                        <div className="ipa-why-grid">
                            {WHY.map((w, i) => (
                                <div key={w.h} className="ipa-why">
                                    <span className="ipa-why-n">{i + 1}</span>
                                    <h3>{w.h}</h3>
                                    <p>{w.b}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ONBOARDING */}
                <section className="ipa-section" id="onboarding">
                    <div className="container ipa-prose">
                        <h2>Getting started is the easy part</h2>
                        <p>One of the most common worries we hear is that an AI voice system will be complicated to stand up. It is not. Stellar Voice Agents does the heavy lifting. We build the agent, configure it to your business, and test it with your team before it makes a single call. You hand over the leads that have gone cold, approve the agent, and it gets to work. The lift on your side is minimal.</p>
                    </div>
                    <div className="container">
                        <div className="ipa-quotes">
                            <blockquote className="ipa-quote ipa-quote-feature">
                                <p>&ldquo;Their onboarding process is second to none.&rdquo;</p>
                                <cite>Chris White &middot; Founder, International Property Alerts</cite>
                            </blockquote>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="ipa-cta" id="cta">
                    <div className="container ipa-cta-inner">
                        <h2>How many leads are sitting in your database right now?</h2>
                        <p>Your sales team will never make those calls, the economics do not justify it for humans. An AI voice agent works through every lead in the database, tirelessly and at scale. And it only takes one buyer like this to make the entire campaign worth it many times over.</p>
                        <button type="button" className="ipa-btn ipa-btn-lg" onClick={() => book('case-ipa-final')}>Book a call to scope yours</button>
                        <ShareRow position="bottom" />
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
