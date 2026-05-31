import React from 'react';
import { Target, TrendingUp, Cpu } from 'lucide-react';
import './WhyDifferent.css';
import useScrollReveal from '../hooks/useScrollReveal';

// Brief Sec 3.4: three-card "Why We Are Different" section.
const cards = [
    {
        Icon: Target,
        title: 'Focused on sales qualification. Nothing else.',
        body: 'Every agent we build is purpose-built for one thing: qualifying your inbound and outbound leads and booking the real buyers onto your calendar. Every prompt, every script, every call flow is built around sales qualification. That singular focus is why our booking rates are 2x to 5x what generalist AI platforms deliver.'
    },
    {
        Icon: TrendingUp,
        title: 'Performance-based pricing. We earn when you earn.',
        body: 'Our pricing has a low monthly retainer plus a per-booking fee. The majority of what you pay only kicks in when we put a qualified meeting on your calendar.'
    },
    {
        Icon: Cpu,
        title: 'Premium tech stack. Full flexibility.',
        body: 'We use the most advanced voice AI technology available today. Natural voices with warm pacing, real hesitation, and the ability to handle interruptions. Most people on the other end of the call cannot tell they are talking to AI. We pair that with deep CRM integration, real-time analytics, and full call recording and transcription. Every call is logged, scored, and available for you to review.'
    }
];

const WhyDifferent = () => {
    const titleRef = useScrollReveal();
    return (
        <section className="why-different">
            <div className="container">
                <div ref={titleRef} className="reveal">
                    <h2 className="section-title why-different-title">
                        Here is why businesses choose Stellar.
                    </h2>
                </div>
                <div className="why-different-grid">
                    {cards.map((card, i) => (
                        <div key={i} className="why-different-card">
                            <div className="why-different-icon">
                                <card.Icon size={28} strokeWidth={2} aria-hidden="true" />
                            </div>
                            <h3>{card.title}</h3>
                            <p>{card.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyDifferent;
