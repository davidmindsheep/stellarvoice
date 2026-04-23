import React from 'react';
import './Features.css';
import useScrollReveal, { useCardReveal } from '../hooks/useScrollReveal';
import { DollarSign, Headphones, MessageSquare, Eye, Layers, Rocket } from 'lucide-react';

const features = [
    { title: 'No Per-Minute Billing', description: 'Flat monthly plans. No surprise charges after a 12-minute call. You know exactly what you pay.', Icon: DollarSign },
    { title: 'White-Glove Setup', description: 'We build your agent for you. No prompt engineering or tech skills needed. Just tell us about your business.', Icon: Headphones },
    { title: 'Real Objection Handling', description: "Our agents don't just read scripts. They pivot, handle pushback, and keep the conversation moving toward a booking.", Icon: MessageSquare },
    { title: 'Full Transparency', description: 'Every call recorded, transcribed, and scored. You hear exactly what your AI is saying to your leads.', Icon: Eye },
    { title: 'Multi-Channel Follow-up', description: 'Not just calls. SMS, email, and voicemail drops — all from one platform.', Icon: Layers },
    { title: 'Live in 5–7 Days', description: 'Most agencies take weeks. We go from kickoff to live calls in under a week.', Icon: Rocket }
];

const Features = () => {
    const titleRef = useScrollReveal();
    const gridRef = useCardReveal();
    return (
        <section id="features" className="features-section">
            <div className="container">
                <div ref={titleRef} className="reveal">
                    <h2 className="section-title">What Makes Stellar Different</h2>
                </div>
                <div className="features-grid" ref={gridRef}>
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card glass-card reveal-card">
                            <div className="feature-icon-wrap">
                                <feature.Icon size={24} strokeWidth={1.75} color="var(--electric-violet)" />
                            </div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
