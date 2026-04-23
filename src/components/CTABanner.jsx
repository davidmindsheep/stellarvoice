import React from 'react';
import './CTABanner.css';
import useScrollReveal from '../hooks/useScrollReveal';

const CTABanner = () => {
    const ref = useScrollReveal();
    return (
        <section className="cta-banner-section">
            <div className="container cta-banner-content reveal" ref={ref}>
                <h2>Never lose another lead.</h2>
                <p>Book a 30-minute demo with Gary and hear exactly how AI voice agents can engage, qualify, and book appointments for your team — 24/7.</p>
                <div className="cta-banner-buttons">
                    <a href="https://calendly.com/garysarco1/30min" target="_blank" rel="noopener noreferrer" className="btn-primary">Book a Demo</a>
                    <a href="#demos" className="btn-secondary">Hear a Live Call</a>
                </div>
            </div>
        </section>
    );
};

export default CTABanner;
