import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-bg-glow"></div>
            <img src="https://www.stellarvoiceagents.com/background.png" className="hero-bg-image" alt="" />
            <div className="container hero-content">
                <h1 className="hero-title text-gradient">
                    NEVER LET A <br /> LEAD GO COLD AGAIN.
                </h1>
                <p className="hero-subtitle">
                    Your 24/7 AI Sales Team That Never Sleeps, <br />
                    Never Quits, and Always Closes.
                </p>
                <div className="hero-cta-group">
                    <button className="btn-primary">Get Started Now</button>
                    <button className="btn-secondary">Watch Demo</button>
                </div>

                <div className="hero-stats glass-card">
                    <div className="stat-item">
                        <h3>24/7</h3>
                        <p>Coverage</p>
                    </div>
                    <div className="stat-item">
                        <h3>&lt; 5s</h3>
                        <p>Speed-to-Lead</p>
                    </div>
                    <div className="stat-item">
                        <h3>100%</h3>
                        <p>Automated</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
