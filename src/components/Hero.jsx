import React from 'react';
import './Hero.css';

const Hero = ({ onBookClick }) => {
    return (
        <section className="hero">
            <div className="hero-bg-glow"></div>
            <img src="https://www.stellarvoiceagents.com/background.png" className="hero-bg-image" alt="" />
            <div className="container hero-content">
                <h1 className="hero-title text-gradient">
                    Automate Your Construction <br /> & Real Estate Lead Intake
                </h1>
                <p className="hero-subtitle">
                    Stop chasing tire-kickers. Let AI qualify every inbound call 24/7, booking only the serious leads directly to your calendar.
                </p>
                <div className="hero-cta-group">
                    <button className="btn-primary" onClick={onBookClick}>Get More Leads</button>
                    <button className="btn-secondary">Hear Samples</button>
                </div>

                <div className="hero-stats glass-card">
                    <div className="stat-item">
                        <h3>&lt; 5m</h3>
                        <p>Response Time</p>
                    </div>
                    <div className="stat-item">
                        <h3>21x</h3>
                        <p>More Conversions</p>
                    </div>
                    <div className="stat-item">
                        <h3>24/7</h3>
                        <p>Lead Coverage</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
