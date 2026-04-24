import React from 'react';
import './Footer.css';
import { openCalendly } from '../lib/calendly';

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <img src="/footer-logo.png" alt="Stellar Voice Agents" style={{ height: '36px', marginBottom: '12px' }} />
                        <p>AI voice agents that call, qualify, and book appointments 24/7 for lead-driven businesses.</p>
                    </div>
                    <div className="footer-links">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="#hero">Home</a></li>
                            <li><a href="#products">Products</a></li>
                            <li><a href="#demos">Demos</a></li>
                            <li><a href="#industries">Industries</a></li>
                            <li><a href="#faq">FAQ</a></li>
                        </ul>
                    </div>
                    <div className="footer-products">
                        <h4>Products</h4>
                        <ul>
                            <li><a href="#products">AI Receptionist</a></li>
                            <li><a href="#products">ClosedLoop</a></li>
                            <li><a href="#products">Dead Lead Revival</a></li>
                        </ul>
                    </div>
                    <div className="footer-contact">
                        <h4>Get In Touch</h4>
                        <p>Email: garysarco1@gmail.com</p>
                        <button type="button" onClick={() => openCalendly()} className="btn-primary small" style={{ marginTop: '12px' }}>Book a Call</button>
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
