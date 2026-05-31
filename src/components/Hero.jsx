import React from 'react';
import './Hero.css';
import { openCalendly } from '../lib/calendly';

const Hero = ({ onOpenCalculator }) => {
    return (
        <section id="hero" className="hero">
            <div className="hero-content container">
                <h1 className="hero-title">
                    Never lose<br />another lead.
                </h1>
                <p className="hero-subtitle">
                    AI voice agents that qualify your leads and book your appointments. You only pay when we deliver.
                </p>
                <div className="hero-cta-group">
                    <button type="button" onClick={onOpenCalculator} className="btn-primary">Take the 30-Sec Test</button>
                    <button type="button" onClick={() => openCalendly(undefined, 'hero')} className="btn-secondary">Book a Demo</button>
                </div>
                <a href="#demos" className="hero-tertiary-link">
                    <span aria-hidden="true">&#9658;</span> Hear a Real Call
                </a>

                <div className="hero-stats">
                    <div className="stat-item">
                        <h3>&lt;5s</h3>
                        <p>Form to Call Response</p>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <h3>17-25%</h3>
                        <p>Booking Rate on Cold Leads</p>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <h3>24/7</h3>
                        <p>Always-On Coverage</p>
                    </div>
                </div>
            </div>

            <div className="wave" aria-hidden="true">
                {[...Array(14)].map((_, i) => (
                    <div key={i} style={{ animationDelay: `${i * 0.1}s` }}></div>
                ))}
            </div>
        </section>
    );
};

export default Hero;
