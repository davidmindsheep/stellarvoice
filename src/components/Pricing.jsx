import React from 'react';
import './Pricing.css';
import useScrollReveal, { useCardReveal } from '../hooks/useScrollReveal';
import { Bot, Zap, PhoneOutgoing } from 'lucide-react';
import { openCalendly } from '../lib/calendly';

const plans = [
    {
        name: 'AI Receptionist',
        price: '$597',
        unit: '/mo',
        Icon: Bot,
        features: ['2 agents — one for calls, one for text', 'Unlimited inbound calls', 'CRM integration, recordings & transcripts'],
        color: '#25005D'
    },
    {
        name: 'ClosedLoop',
        price: '$10',
        unit: '/lead',
        Icon: Zap,
        features: ['Form-to-call in under 5 seconds', 'Google & Meta Ads integration', 'Custom qualification scripts on every call'],
        color: '#7868F8'
    },
    {
        name: 'Dead Lead Revival',
        price: '$10',
        unit: '/lead',
        Icon: PhoneOutgoing,
        features: ['We work your aged-lead database', 'Qualifies and re-books ready-to-move prospects', 'Detailed call analytics'],
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
                    <p className="section-subtitle">No hidden fees. Just results.</p>
                    <div className="pricing-promo">
                        <span className="promo-badge">Free Setup</span>
                        <span className="promo-text">White-glove agent build, normally $1,500 — included free<sup>*</sup></span>
                    </div>
                </div>
                <div className="pricing-grid" ref={gridRef}>
                    {plans.map((plan, i) => (
                        <div key={i} className="pricing-card glass-card reveal-card" style={{'--card-accent': plan.color}}>
                            <div className="pricing-icon-wrap" style={{background: `${plan.color}15`}}>
                                <plan.Icon size={28} strokeWidth={1.75} color={plan.color} />
                            </div>
                            <h3 className="pricing-name">{plan.name}</h3>
                            <div className="pricing-amount">
                                <span className="from">starting</span>
                                <span className="price">{plan.price}</span>
                                <span className="period">{plan.unit}</span>
                            </div>
                            <ul className="pricing-features">
                                {plan.features.map((f, j) => (
                                    <li key={j}><span className="check" style={{color: plan.color}}>✓</span> {f}</li>
                                ))}
                            </ul>
                            <button type="button" onClick={() => openCalendly()} className="btn-primary">Get a Custom Quote</button>
                        </div>
                    ))}
                </div>
                <p className="pricing-note">All plans include a 14-day pilot. Cancel anytime.</p>
                <p className="pricing-fineprint"><sup>*</sup>Free setup applies to plans with a 3-month minimum commitment. Set up fee and add-ons not included in the listed prices.</p>
            </div>
        </section>
    );
};

export default Pricing;
