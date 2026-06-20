import React, { useEffect, useRef, useState } from 'react';
import './CaseStudyIPA.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { openCalendly } from '../lib/calendly';
import { track } from '../lib/analytics';
import {
    Linkedin, Twitter, Mail, Link as LinkIcon, Check, X as CloseIcon, Bot, User
} from 'lucide-react';

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

const TRANSCRIPT = [
    { s: 'sophie', t: "Hi, it's Sophie from International Property Alerts. You downloaded our Bali Buyer's Guide a while ago, and I just wanted to check whether Bali is still something you're considering." },
    { s: 'mark', t: 'Yes.' },
    { s: 'sophie', t: "That's great to hear. Whereabouts in Australia are you based, which state?" },
    { s: 'mark', t: 'Gold Coast, Queensland.' },
    { s: 'sophie', t: 'Perfect. And are you mainly looking for personal use, investment, or both?' },
    { s: 'mark', t: 'Mainly investment.' },
    { s: 'sophie', t: "Got it. And is it specifically Bali you're focused on, or open to other locations as well?" },
    { s: 'mark', t: 'Bali, and perhaps Lombok and Vietnam.' },
    { s: 'sophie', t: "Great, Bali sounds like the main focus. And what's the most you'd be looking to spend?" },
    { s: 'mark', t: 'Half a million.' },
    { s: 'sophie', t: 'Excellent. Have you bought overseas before, or would Bali be your first...' },
    { s: 'mark', t: 'Yes. Quite a few properties in Bali.' },
    { s: 'sophie', t: 'Excellent, so you know how it works. And in terms of timing, next few months, or still in the research stage?' },
    { s: 'mark', t: 'Yes, visiting Bali early July. The purpose of buying more property.' },
    { s: 'sophie', t: 'Got it. And are you looking to use cash, or equity?' },
    { s: 'mark', t: 'Yes.' },
    { s: 'sophie', t: "And is there anything specific you're looking for, any special requests?" },
    { s: 'mark', t: "Seminyak, on the way to Canggu, in that area, and Uluwatu. No more than five minutes' walk to the beach and having some sea view." },
    { s: 'sophie', t: "Listen, based on what you've told me, we've actually got some really strong Bali options that could work well for you. What I'd suggest is jumping on a quick call with one of our specialists, about fifteen to twenty minutes. What does your schedule look like over the next couple of days?" },
    { s: 'mark', t: "That's fine." },
];

const UNCOVERED = [
    { k: 'Location', v: 'Gold Coast, Queensland, Australia' },
    { k: 'Investment focus', v: 'Primarily Bali, with secondary interest in Lombok and Vietnam' },
    { k: 'Budget', v: 'Approximately AUD $500,000' },
    { k: 'Experience', v: 'Has purchased multiple properties in Bali before. Familiar with the process.' },
    { k: 'Preferred areas', v: 'Seminyak, Canggu, or Uluwatu. Within a 5-minute walk to the beach, preferably a sea view.' },
    { k: 'Timeline', v: 'Visiting Bali in early July with the intention of buying more property' },
    { k: 'Status', v: 'Confirmed visit. This is not a "maybe." He is coming.' },
];

const WHY = [
    { h: 'Dead leads are not dead', b: 'Leads do not expire the way sales teams think. Mark downloaded a guide 11 months ago. His interest did not disappear. It just was not being tracked. Research shows 63% of people who enquire eventually buy, just not on the timeline the sales team expects.' },
    { h: 'AI makes the economics work', b: 'No human team will call through 100 leads that are 11 months old. The expected return is too low. An AI agent makes those calls in hours, at a fraction of the cost, with zero fatigue. Even if 99 calls return nothing, the one $500K sale pays for the campaign many times over.' },
    { h: 'Speed and consistency', b: 'Sophie called every lead with the same energy and the same structured qualifying process. No bad days. No rushing at 4pm on a Friday. No skipping leads because the name looked unfamiliar.' },
    { h: 'The sales team gets better leads', b: 'IPA\'s team did not waste time on 100 cold calls. They received 6 pre-qualified warm leads, including one red-hot prospect with a confirmed date, budget, and preferences. The AI does the filtering. The humans do the closing.' },
    { h: 'Sales leadership can trust the AI', b: 'Phil\'s vetting proved AI voice agents are not a black box. They can be tested, refined, and approved by the same leaders who would evaluate a human hire. Once trust is earned, the AI becomes a scalable extension of the team.' },
    { h: 'The handoff works', b: 'Mark had no idea he spoke to an AI. When Phil called him back, the transition was seamless. No awkward reveal, no loss of trust. The AI started the relationship. The human deepened it.' },
    { h: 'Even AI sceptics get converted', b: 'Andy, IPA\'s Managing Director, openly admitted he was not an AI fan. After seeing the results, he changed his mind entirely. When a seasoned MD who has worked with dozens of vendors is won over, the technology has crossed a credibility threshold.' },
];

const TECH = [
    ['AI Voice Platform', 'ElevenLabs Conversational AI'],
    ['Voice', 'Australian female ("Sophie"), natural and warm'],
    ['Calling Infrastructure', 'Telnyx (Australian numbers for local caller ID)'],
    ['Dashboard', 'Custom SVA dashboard for batch calling, lead tracking, and status'],
    ['CRM Integration', 'Lead status synced via Supabase with call tracking'],
    ['Call Management', 'Batch calling, timezone-aware scheduling, 6-attempt cap, de-duplication'],
    ['Post-Call Processing', 'Automatic summaries, lead qualification scoring, warm-lead alerts'],
];

const NEXT = [
    ['UK leads', 'British-accent agent covering UK buyers interested in Bali, Portugal, Spain, Croatia, and Cyprus.'],
    ['US / Canada leads', 'Agent targeting American and Canadian buyers for Bali, Florida, Georgia, Thailand, and Cambodia.'],
    ['Currency exchange upsell', 'Integration with First Class Currency for VIP rates, adding a second revenue stream per lead.'],
    ['Mortgage / finance qualification', 'The AI now asks cash vs equity, enabling warm handoffs to qualified mortgage brokers.'],
    ['Masterclass promotion', "AI agents drive registrations for IPA's property investment masterclasses."],
];

const NAV = [
    { id: 'problem', label: 'The Problem' },
    { id: 'approval', label: 'The Approval' },
    { id: 'call', label: 'The Call' },
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
        const description = 'AI voice agent case study: Stellar Voice Agents called 100 of International Property Alerts\' aged leads. Six came back warm and one became a confirmed $500K Bali property buyer. The buyer had no idea he spoke to an AI.';
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
                        <p className="ipa-tag">Case Study · 8 min read</p>
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
                                <div><dt>Result</dt><dd>6% reactivation rate from 11-month-old leads. One confirmed $500K buyer visiting Bali in July.</dd></div>
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
                <section className="ipa-section" id="problem">
                    <div className="container ipa-prose">
                        <h2>The problem: leads do not expire the way sales teams think</h2>
                        <p>Every property company has the same issue. Leads come in through ads, downloads, and enquiries. The sales team follows up on the fresh ones. Anything older than a few weeks gets pushed down the list. After a few months, those leads are considered dead.</p>
                        <p>IPA had accumulated hundreds of these dead leads from their Australian market alone. People who had downloaded their Bali Buyer's Guide, expressed interest in Bali property, and then never heard from anyone again. The sales team had moved on. The leads were sitting in a spreadsheet. Nobody was calling them.</p>
                        <p className="ipa-pull">The assumption was simple: if they were interested, they would have called back. That assumption was wrong.</p>
                    </div>
                </section>

                {/* THE APPROACH + SCRIPT */}
                <section className="ipa-section ipa-grey">
                    <div className="container ipa-prose">
                        <h2>The approach: an AI named Sophie</h2>
                        <p>Stellar Voice Agents deployed an AI voice agent named "Sophie" to call through IPA's aged Australian leads. Sophie's job was not to close deals. It was to answer one question: is this person still interested in buying property? If yes, qualify them and hand the lead to a human. If no, move on. The AI handles the volume. The humans handle the selling.</p>
                        <p>Her opening line was tailored for aged leads, powered by ElevenLabs' conversational AI with an Australian accent to match the audience:</p>
                        <blockquote className="ipa-script">
                            "Hi [Name], it's Sophie from International Property Alerts. A little while back you downloaded our Bali buyer's guide. I just wanted to check in and see if Bali is still on your radar."
                        </blockquote>
                        <p>No hard sell. No pressure. On each call Sophie introduced herself, referenced the original download, gauged current intent, and gathered the qualifying detail that matters: location, investment vs personal use, budget, preferred areas, timeline, and cash vs equity. Then she booked a follow-up with IPA's human team for qualified leads. The whole call typically ran 2 to 4 minutes. Long enough to qualify. Short enough to respect the person's time.</p>
                    </div>
                </section>

                {/* THE APPROVAL */}
                <section className="ipa-section" id="approval">
                    <div className="container ipa-prose">
                        <h2>The approval: IPA's best salesperson tested her first</h2>
                        <p>Before Sophie was let loose on IPA's database, she had to pass a critical test. Phil, IPA's Sales Director and a highly respected figure within the organisation, personally put the AI through a rigorous evaluation. He pushed her with the tough, real-world scenarios experienced sales professionals throw at new hires: objection handling, brand representation, and whether the conversation felt natural rather than robotic.</p>
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

                {/* THE CALL + TRANSCRIPT */}
                <section className="ipa-section" id="call">
                    <div className="container ipa-prose">
                        <h2>The call: Mark Meallin</h2>
                        <p>Mark Meallin is an experienced property investor based on the Gold Coast, Queensland. He had downloaded IPA's Bali Buyer's Guide through a Facebook campaign roughly 11 months before Sophie's call. Nobody had followed up. When Sophie called, Mark was not only still interested, he was actively planning to buy.</p>
                        <p>Below is the real transcript. This is an AI talking to a real person about a real half-million-dollar property purchase.</p>
                    </div>
                    <div className="container ipa-transcript-wrap">
                        <div className="ipa-transcript">
                            <div className="ipa-transcript-head">
                                <span className="ipa-tx-dot" /> Live call · Sophie (AI) &times; Mark · ~3 min
                            </div>
                            {TRANSCRIPT.map((line, i) => (
                                <div key={i} className={`ipa-bubble-row ipa-${line.s}`}>
                                    <span className="ipa-bubble-avatar" aria-hidden>
                                        {line.s === 'sophie' ? <Bot size={16} /> : <User size={16} />}
                                    </span>
                                    <div className="ipa-bubble">
                                        <span className="ipa-bubble-name">{line.s === 'sophie' ? 'Sophie · AI agent' : 'Mark · lead'}</span>
                                        <p>{line.t}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="container ipa-prose">
                        <h3>What stands out</h3>
                        <p>In under three minutes, Sophie confirmed interest, qualified his location, established his intent (investment), found his budget ($500K), uncovered his experience (multiple Bali properties), locked his timeline (a confirmed early-July visit), gathered specific preferences (the Seminyak-to-Canggu corridor and Uluwatu, beachside, sea view), and suggested a follow-up with IPA's specialists.</p>
                        <p>Was the call perfect? No. The close could have been smoother. But that is not the point. Sophie's job was to find out whether Mark was worth a salesperson's time and gather enough detail to hand over a qualified lead. She did exactly that. The AI is not trying to replace a salesperson. It is trying to find the people worth a salesperson's time.</p>
                    </div>
                </section>

                {/* THE HANDOFF */}
                <section className="ipa-section ipa-grey" id="handoff">
                    <div className="container ipa-prose">
                        <h2>The handoff: the human takes over</h2>
                        <p>Phil, IPA's Sales Director, personally called Mark back. He walked him through IPA's current Bali portfolio, discussed options matching his criteria, and confirmed the details of his early-July visit. During that conversation, Mark confirmed he had no idea his initial call with Sophie was with an AI. As far as he was concerned, he had spoken to a friendly IPA representative who followed up on his interest. The handoff from AI to human was seamless.</p>
                        <h3>What the AI uncovered</h3>
                        <p>Here is what Sophie extracted from that single conversation, ready to hand to the sales team:</p>
                        <ul className="ipa-uncovered">
                            {UNCOVERED.map((u) => <li key={u.k}><strong>{u.k}:</strong> {u.v}</li>)}
                        </ul>
                        <p>Mark is not a tyre-kicker. He is a repeat investor with a clear budget, specific preferences, and a confirmed travel date. The kind of lead sales teams dream about. And he had been sitting in a spreadsheet for 11 months.</p>
                    </div>
                </section>

                {/* QUOTES */}
                <section className="ipa-section">
                    <div className="container">
                        <h2 className="ipa-h2-center">The reaction from IPA</h2>
                        <div className="ipa-quotes">
                            <blockquote className="ipa-quote ipa-quote-feature">
                                <p>&ldquo;I'm not an AI fan, but you have changed my mind. I think you're a game changer for us. We've already got a potential sale from this.&rdquo;</p>
                                <cite>Andy &middot; Managing Director, IPA</cite>
                            </blockquote>
                            <blockquote className="ipa-quote">
                                <p>&ldquo;That is a brilliant scaling... well done mate... if anyone gives you any roadblocks let me know, so we're gonna go for it.&rdquo;</p>
                                <cite>Chris White &middot; Founder, IPA</cite>
                            </blockquote>
                            <blockquote className="ipa-quote">
                                <p>&ldquo;This is a red hot lead!&rdquo;</p>
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

                {/* TECH + NEXT */}
                <section className="ipa-section">
                    <div className="container ipa-twocol">
                        <div>
                            <h2>The technology</h2>
                            <table className="ipa-table">
                                <tbody>
                                    {TECH.map(([k, v]) => <tr key={k}><th>{k}</th><td>{v}</td></tr>)}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <h2>What happens next</h2>
                            <p className="ipa-next-lead">IPA and SVA are now scaling the system across IPA's entire global database of aged leads:</p>
                            <ul className="ipa-next">
                                {NEXT.map(([k, v]) => <li key={k}><strong>{k}.</strong> {v}</li>)}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="ipa-cta" id="cta">
                    <div className="container ipa-cta-inner">
                        <h2>How many leads are sitting in your database right now?</h2>
                        <p>Your sales team will never make those calls, the economics do not justify it for humans. For an AI voice agent, every call costs pennies and takes minutes. And it only takes one Mark Meallin.</p>
                        <button type="button" className="ipa-btn ipa-btn-lg" onClick={() => book('case-ipa-final')}>Book a call to scope yours</button>
                        <ShareRow position="bottom" />
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
