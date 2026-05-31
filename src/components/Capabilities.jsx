import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck, MessageSquareText, Lightbulb, Mic, Clock4 } from 'lucide-react';
import './Capabilities.css';
import useScrollReveal, { useCardReveal } from '../hooks/useScrollReveal';
import { openCalendly } from '../lib/calendly';

// Brief Sec 3.5: "An AI that books revenue. Not just calls."
// Capability 1 is the hero capability (full-width). Capabilities 2-5
// render in a 2x2 grid below.
const hero = {
    Icon: CalendarCheck,
    title: 'Books qualified meetings that generate real revenue',
    sub: 'Revenue on your calendar. Every day.',
    body: 'Your AI voice agent calls every lead, qualifies them on budget, timeline, and fit, and books the real buyers directly onto your calendar. Every booking is a revenue opportunity you would have missed. Our clients see 17 to 25% booking rates on leads that were sitting cold and uncontacted. With speed-to-lead (calling within 5 seconds of a new enquiry), those rates climb higher. The AI runs 24/7. Weekends, holidays, 2am. Every lead gets a call. Every qualified buyer gets booked.',
    proof: '17 to 25% booking rate. 6+ months in continuous production. EasyStart Homes, Australia.',
    ctaLabel: 'See the Full Case Study',
    ctaHref: '/case-studies/denes-aldott'
};

const others = [
    {
        Icon: MessageSquareText,
        title: 'Handles complex conversations naturally',
        sub: 'Real conversations. Not scripted menus.',
        body: 'Your AI agent holds genuine two-way conversations. It asks qualifying questions, listens to the answers, and adjusts the dialogue based on what the caller says. If a caller has detailed questions about pricing, timelines, coverage areas, or service specifics, the agent handles them intelligently. It draws on your business knowledge, your qualification criteria, and your FAQ to deliver answers that are accurate, relevant, and on-brand.'
    },
    {
        Icon: Lightbulb,
        title: 'Thinks on its feet and guides every conversation to a booking',
        sub: 'Adaptable. Resourceful. Goal-oriented.',
        body: 'Callers do not follow scripts. They change subjects. They ask questions out of order. They bring up personal situations. Your AI agent adapts to all of it. It acknowledges what the caller said, adjusts the conversation naturally, and steers back toward the goal: qualifying the lead and booking the appointment. We have seen our agents handle callers who brought up health issues mid-conversation. The AI expressed genuine empathy, suggested a better time to reconnect, and followed up later.'
    },
    {
        Icon: Mic,
        title: 'Natural-sounding voices indistinguishable from human conversation',
        sub: 'Sub-2-second responses. Warm tone. Real pacing.',
        body: 'Your AI agent responds in under two seconds. Every time. The voice carries natural pacing, warm tone, and real hesitation. It pauses when it thinks. It adjusts its energy to match the caller. Conversations flow the way they do between two people who are genuinely talking. Our longest-running client has been live for over 6 months. His leads do not realise they are talking to AI.',
        ctaLabel: 'Hear a Real Call',
        ctaHref: '#demos'
    },
    {
        Icon: Clock4,
        title: 'Saves you time and money while increasing capacity',
        sub: 'Your team talks to buyers. Not tire-kickers.',
        body: "Every hour your team spends on unqualified calls is an hour they are not closing deals. Your AI agent handles the first conversation with every lead, filters out the people who are not ready, and passes only the qualified buyers through to your team. The result: your salespeople spend 100% of their time on prospects who have already been vetted on budget, timeline, and fit.",
        proof: 'Under 5 seconds from form submission to AI callback. 24/7/365 coverage. Zero missed leads.'
    }
];

const Capabilities = () => {
    const titleRef = useScrollReveal();
    const gridRef = useCardReveal();
    return (
        <section id="capabilities" className="capabilities">
            <div className="container">
                <div ref={titleRef} className="reveal">
                    <h2 className="section-title capabilities-title">
                        An AI that books revenue. Not just calls.
                    </h2>
                </div>

                {/* Hero capability (full-width) */}
                <div className="cap-hero">
                    <div className="cap-hero-icon">
                        <hero.Icon size={32} strokeWidth={2} aria-hidden="true" />
                    </div>
                    <div className="cap-hero-body">
                        <p className="cap-sub">{hero.sub}</p>
                        <h3>{hero.title}</h3>
                        <p>{hero.body}</p>
                        <p className="cap-proof"><strong>Proof:</strong> {hero.proof}</p>
                        <Link to={hero.ctaHref} className="cap-link">{hero.ctaLabel} &rarr;</Link>
                    </div>
                </div>

                {/* Capabilities 2-5 in a 2x2 grid */}
                <div className="cap-grid" ref={gridRef}>
                    {others.map((cap, i) => (
                        <div key={i} className="cap-card reveal-card">
                            <div className="cap-card-icon">
                                <cap.Icon size={26} strokeWidth={2} aria-hidden="true" />
                            </div>
                            <p className="cap-sub">{cap.sub}</p>
                            <h3>{cap.title}</h3>
                            <p>{cap.body}</p>
                            {cap.proof && <p className="cap-proof"><strong>Proof:</strong> {cap.proof}</p>}
                            {cap.ctaLabel && cap.ctaHref && (
                                <a href={cap.ctaHref} className="cap-link">{cap.ctaLabel} &rarr;</a>
                            )}
                        </div>
                    ))}
                </div>

                {/* CTA bar */}
                <div className="cap-cta-bar">
                    <button
                        type="button"
                        className="btn-primary"
                        onClick={() => openCalendly(undefined, 'capabilities')}
                    >
                        Book a Demo
                    </button>
                    <a href="#demos" className="btn-secondary">Hear Our Agents in Action</a>
                </div>
            </div>
        </section>
    );
};

export default Capabilities;
