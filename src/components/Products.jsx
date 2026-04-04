import React from 'react';
import './Products.css';

const products = [
    {
        name: 'AI Receptionist',
        tagline: 'Your 24/7 Front Desk That Never Misses a Call.',
        icon: '\ud83e\udd16',
        features: [
            'Answers every inbound call instantly, day or night',
            'Blocks spam and sales calls \u2014 only real customers get through',
            'Routes calls intelligently based on intent',
            'Provides call summaries and transcripts'
        ],
        color: '#7868f8'
    },
    {
        name: 'ClosedLoop Callback',
        tagline: 'Form Fill to Phone Call in Under 5 Seconds.',
        icon: '\u26a1',
        features: [
            'Instant callback when someone fills out your web form',
            'Catches leads while they are still on your website',
            'Integrates with Google Ads, Meta Ads, and any CRM',
            'Custom qualification questions on every call'
        ],
        color: '#b168f8'
    },
    {
        name: 'ClosedLoop Outbound',
        tagline: 'Turn Your Database Into Booked Appointments.',
        icon: '\ud83d\udcde',
        features: [
            'AI-powered outbound calls to your existing contacts',
            'Re-engage cold leads that never converted',
            'Automated campaign scheduling and management',
            'Detailed analytics on every conversation'
        ],
        color: '#00d2ff'
    }
];

const Products = () => {
    return (
        <section id="products" className="products-section">
            <div className="container">
                <h2 className="section-title text-gradient">Our Products</h2>
                <p className="section-subtitle">Three powerful AI voice solutions, each designed to capture revenue you are currently leaving on the table.</p>
                <div className="products-grid">
                    {products.map((product, index) => (
                        <div key={index} className="product-card glass-card" style={{'--card-accent': product.color}}>
                            <div className="product-icon">{product.icon}</div>
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-tagline">{product.tagline}</p>
                            <ul className="product-features">
                                {product.features.map((feature, i) => (
                                    <li key={i}><span className="check">\u2713</span> {feature}</li>
                                ))}
                            </ul>
                            <a href="https://calendly.com/garysarco1/30min" target="_blank" rel="noopener noreferrer" className="product-cta">Learn More \u2192</a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Products;
