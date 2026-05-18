// Homepage pricing preview. Shows the 3 service tiers (Starter / Growth /
// Scale) with the base retainer + per-appointment headline. The full feature
// matrix lives on /pricing.

import React from 'react';
import { Link } from 'react-router-dom';
import './Pricing.css';
import useScrollReveal, { useCardReveal } from '../hooks/useScrollReveal';
import { TIERS, TIER_ORDER, expectedMonthlyTotal } from '../lib/pricingConfig';
import { openCalendly } from '../lib/calendly';

const fmt = (n) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(n);

const Pricing = () => {
    const titleRef = useScrollReveal();
    const gridRef = useCardReveal();
    return (
        <section id="pricing" className="pricing-section bg-alt bg-glow">
            <div className="container">
                <div ref={titleRef} className="reveal">
                    <h2 className="section-title">Pricing built around results</h2>
                    <p className="section-subtitle">
                        Low base retainer. Per-appointment fee only when we deliver. Your downside is capped at the base.
                    </p>
                </div>
                <div className="pricing-grid" ref={gridRef}>
                    {TIER_ORDER.map((id) => {
                        const tier = TIERS[id];
                        const expected = expectedMonthlyTotal(id);
                        return (
                            <div key={id} className="pricing-card glass-card reveal-card" style={{'--card-accent': tier.accent}}>
                                <h3 className="pricing-name">{tier.name}</h3>
                                <div className="pricing-amount">
                                    <span className="from">starting</span>
                                    <span className="price">{fmt(tier.baseRetainer)}</span>
                                    <span className="period">/mo base</span>
                                </div>
                                <p className="pricing-perappt">+ {fmt(tier.perAppt)} per qualified booked appointment</p>
                                <p className="pricing-expected">Expected ~{fmt(expected)}/mo at ~{tier.guarantee} appts</p>
                                <ul className="pricing-features">
                                    {tier.headlineFeatures.slice(0, 4).map((f, j) => (
                                        <li key={j}><span className="check" style={{color: tier.accent}}>✓</span> {f}</li>
                                    ))}
                                </ul>
                                <Link to={`/pricing?plan=${id}`} className="btn-primary">
                                    See {tier.name} details
                                </Link>
                            </div>
                        );
                    })}
                </div>
                <p className="pricing-fineprint">
                    Setup fees and add-ons not included.{' '}
                    <Link to="/pricing">Compare every feature on the full pricing page</Link>, or{' '}
                    <button type="button" className="pricing-inline-btn" onClick={() => openCalendly(undefined, 'pricing-section')}>book a demo</button>.
                </p>
            </div>
        </section>
    );
};

export default Pricing;
