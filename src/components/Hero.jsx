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
                    AI voice agents that engage, qualify, and book appointments 24/7 — for Real Estate, Health, and Finance.
                </p>
                <div className="hero-cta-group">
                    <button type="button" onClick={onOpenCalculator} className="btn-primary">Take the 30-Sec Test</button>
                    <button type="button" onClick={() => openCalendly()} className="btn-secondary">Book a Demo</button>
                </div>

                <div className="hero-stats">
                    <div className="stat-item">
                        <h3>3×</h3>
                        <p>Speed-to-Lead</p>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <h3>+120%</h3>
                        <p>Qualified Leads</p>
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
