import React from 'react';
import './Products.css';
import useScrollReveal, { useCardReveal } from '../hooks/useScrollReveal';
import { Bot, Zap, PhoneOutgoing } from 'lucide-react';

const products = [
    {
        name: 'AI Receptionist',
        tagline: 'Every inbound call answered in under 1 second. Day or night.',
        Icon: Bot,
        features: [
            'Answers every inbound call instantly, day or night',
            'Blocks spam and sales calls — only real customers get through',
            'Routes calls intelligently based on intent',
            'Provides call summaries and transcripts'
        ],
        color: '#25005D'
    },
    {
        name: 'ClosedLoop Callback',
        tagline: 'Form Fill to Phone Call in Under 5 Seconds.',
        Icon: Zap,
        features: [
            'Instant callback when someone fills out your web form',
            'Catches leads while they are still on your website',
            'Integrates with Google Ads, Meta Ads, and any CRM',
            'Custom qualification questions on every call'
        ],
        color: '#7868F8'
    },
    {
        name: 'ClosedLoop Outbound',
        tagline: 'Turn Your Database Into Booked Appointments.',
        Icon: PhoneOutgoing,
        features: [
            'AI-powered outbound calls to your existing contacts',
            'Re-engage cold leads that never converted',
            'Automated campaign scheduling and management',
            'Detailed analytics on every conversation'
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
                            <a href="https://calendly.com/garysarco1/30min" target="_blank" rel="noopener noreferrer" className="product-cta">Learn More →</a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Products;
