import React from 'react';
import './CTABanner.css';
import useScrollReveal from '../hooks/useScrollReveal';

const CTABanner = () => {
    const ref = useScrollReveal();
    return (
        <section className="cta-banner-section">
            <div className="container cta-banner-content" ref={ref} style={{opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.7s ease, transform 0.7s ease'}}>
                <h2 className="text-gradient">Ready to Never Miss a Lead Again?</h2>
                <p>Book a free 30-minute strategy call. Gary will map out exactly how AI voice agents would work for your business &mdash; with a custom demo using your real scripts.</p>
                <div className="cta-banner-buttons">
                    <a href="https://calendly.com/garysarco1/30min" target="_blank" rel="noopener noreferrer" className="btn-primary">Book a Strategy Call</a>
                    <a href="#demos" className="btn-secondary">Listen to Demos First</a>
                </div>
            </div>
        </section>
    );
};

export default CTABanner;
