import React from 'react';
import './CTABanner.css';

const CTABanner = () => {
    return (
        <section className="cta-banner-section">
            <div className="container cta-banner-content">
                <h2 className="text-gradient">Ready to Never Miss a Lead Again?</h2>
                <p>Book a 30-minute strategy call with Gary and hear exactly how AI voice agents can transform your lead conversion.</p>
                <div className="cta-banner-buttons">
                    <a href="https://calendly.com/garysarco1/30min" target="_blank" rel="noopener noreferrer" className="btn-primary">Book a Strategy Call</a>
                    <a href="#demos" className="btn-secondary">Listen to Demos First</a>
                </div>
            </div>
        </section>
    );
};

export default CTABanner;
