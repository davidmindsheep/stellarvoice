import React from 'react';
import './Products.css';
import useScrollReveal, { useCardReveal } from '../hooks/useScrollReveal';
import { Bot, Zap, PhoneOutgoing } from 'lucide-react';
import { openCalendly } from '../lib/calendly';

const products = [
    {
        name: 'AI Receptionist',
        tagline: 'Your 24/7 front desk. Never miss a call.',
        Icon: Bot,
        features: [
            'Answers every incoming call instantly, day or night',
            'Qualifies each caller against your custom questions',
            'Books the appointment straight into your calendar',
            'Delivers call summaries and transcripts to your team'
        ],
        color: '#25005D'
    },
    {
        name: 'ClosedLoop',
        tagline: 'Instant lead response. Seconds, not hours.',
        Icon: Zap,
        features: [
            'The moment someone responds to your ad, we call them',
            'Beats every competitor to the phone — engage while hot',
            'Qualifies them on the call against your criteria',
            'Books them into your calendar before they shop around'
        ],
        color: '#7868F8'
    },
    {
        name: 'Dead Lead Revival',
        tagline: 'Your old database, worth real money again.',
        Icon: PhoneOutgoing,
        features: [
            'We call your aged-lead database on your behalf',
            'Identifies who\'s ready to move — now',
            'Puts re-activated prospects back on your calendar',
            'Full analytics on every conversation'
        ],
        color: '#473D92'
    }
];

const Products = () => {
    const titleRef = useScrollReveal();
    const gridRef = useCardReveal();
    return (
        <section id="products" className="products-section bg-alt bg-glow">
            <div className="container">
                <div ref={titleRef} className="reveal">
                    <h2 className="section-title">Our Products</h2>
                    <p className="section-subtitle">Three AI voice products. One goal: make sure you never lose a lead to slow response time again.</p>
                </div>
                <div className="products-grid" ref={gridRef}>
                    {products.map((product, index) => (
                        <div key={index} className="product-card glass-card reveal-card" style={{'--card-accent': product.color}}>
                            <div className="product-icon-wrap" style={{background: `${product.color}15`}}>
                                <product.Icon size={28} strokeWidth={1.75} color={product.color} />
                            </div>
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-tagline">{product.tagline}</p>
                            <ul className="product-features">
                                {product.features.map((feature, i) => (
                                    <li key={i}><span className="check">✓</span> {feature}</li>
                                ))}
                            </ul>
                            <button type="button" onClick={() => openCalendly()} className="product-cta">Learn More →</button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Products;
