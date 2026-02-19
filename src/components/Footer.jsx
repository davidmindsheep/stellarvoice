import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <h2 className="logo text-gradient-light">STELLAR VOICE</h2>
                        <p>Modernizing lead engagement with high-performance AI voice agents.</p>
                    </div>

                    <div className="footer-links">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="#hero">Home</a></li>
                            <li><a href="#features">Features</a></li>
                            <li><a href="#demos">Demos</a></li>
                            <li><a href="#faq">FAQ</a></li>
                        </ul>
                    </div>

                    <div className="footer-contact">
                        <h4>Get In Touch</h4>
                        <button className="btn-primary">Book a Consultation</button>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Stellar Voice Agents. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
