import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section id="hero" className="hero">
            <div className="hero-bg-glow"></div>
            <div className="hero-particles">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="particle" style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${3 + Math.random() * 4}s`
                    }}></div>
                ))}
            </div>
            <div className="container hero-content">
                <div className="hero-badge">Trusted by 15+ Businesses Across 8 Industries</div>
                <h1 className="hero-title text-gradient">
                    AI Voice Agents That Call, Qualify & Book &mdash; So You Don't Have To.
                </h1>
                <p className="hero-subtitle">
                    Our AI calls your leads in under 5 seconds, qualifies them with your questions, and books straight to your calendar. 24/7. No missed calls. No cold leads.
                </p>
                <div className="hero-cta-group">
                    <a href="#demos" className="btn-primary">Hear a Live Demo</a>
                    <a href="https://calendly.com/garysarco1/30min" target="_blank" rel="noopener noreferrer" className="btn-secondary">Book a Strategy Call</a>
                </div>
                <div className="hero-stats glass-card">
                    <div className="stat-item">
                        <h3>24/7</h3>
                        <p>Always-On Coverage</p>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <h3>&lt; 5s</h3>
                        <p>Speed-to-Lead</p>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <h3>10x</h3>
                        <p>More Bookings</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
