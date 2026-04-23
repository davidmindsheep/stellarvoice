import React from 'react';
import './Pricing.css';
import useScrollReveal, { useCardReveal } from '../hooks/useScrollReveal';
import { Bot, Zap, PhoneOutgoing } from 'lucide-react';

const plans = [
    {
        name: 'AI Receptionist',
        price: '$297',
        Icon: Bot,
        features: ['Unlimited inbound calls', 'CRM integration', 'Call recordings & transcripts'],
        color: '#25005D'
    },
    {
        name: 'ClosedLoop Callback',
        price: '$497',
        Icon: Zap,
        features: ['Form-to-call in <5 seconds', 'Google & Meta Ads integration', 'Custom qualification scripts'],
        color: '#7868F8'
    },
    {
        name: 'ClosedLoop Outbound',
        price: '$697',
        Icon: PhoneOutgoing,
        features: ['AI outbound campaigns', 'Database re-engagement', 'Detailed call analytics'],
        color: '#473D92'
    }
];

const Pricing = () => {
    const titleRef = useScrollReveal();
    const gridRef = useCardReveal();
    return (
        <section id="pricing" className="pricing-section bg-alt bg-glow">
            <div className="container">
                <div ref={titleRef} className="reveal">
                    <h2 className="section-title">Simple, Transparent Pricing</h2>
                    <p className="section-subtitle">No per-minute charges. No hidden fees. Just results.</p>
                </div>
                <div className="pricing-grid" ref={gridRef}>
                    {plans.map((plan, i) => (
                        <div key={i} className="pricing-card glass-card reveal-card" style={{'--card-accent': plan.color}}>
                            <div className="pricing-icon-wrap" style={{background: `${plan.color}15`}}>
                                <plan.Icon size={28} strokeWidth={1.75} color={plan.color} />
                            </div>
                            <h3 className="pricing-name">{plan.name}</h3>
                            <div className="pricing-amount">
                                <span className="from">from</span>
                                <span className="price">{plan.price}</span>
                                <span className="period">/mo</span>
                            </div>
                            <ul className="pricing-features">
                                {plan.features.map((f, j) => (
                                    <li key={j}><span className="check" style={{color: plan.color}}>✓</span> {f}</li>
                                ))}
                            </ul>
                            <a href="https://calendly.com/garysarco1/30min" target="_blank" rel="noopener noreferrer" className="btn-primary">Get a Custom Quote</a>
                        </div>
                    ))}
                </div>
                <p className="pricing-note">All plans include a 14-day pilot. Cancel anytime.</p>
            </div>
        </section>
    );
};

export default Pricing;
