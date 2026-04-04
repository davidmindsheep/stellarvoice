import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar glass-card ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <div className="logo">
                    <img src="https://www.stellarvoiceagents.com/logo.webp" alt="Stellar Voice Agents" style={{ height: '40px' }} />
                </div>
                <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                    <span></span><span></span><span></span>
                </button>
                <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    <li><a href="#products" onClick={() => setMenuOpen(false)}>Products</a></li>
                    <li><a href="#demos" onClick={() => setMenuOpen(false)}>Demos</a></li>
                    <li><a href="#industries" onClick={() => setMenuOpen(false)}>Industries</a></li>
                    <li><a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a></li>
                    <li><a href="#team" onClick={() => setMenuOpen(false)}>Team</a></li>
                </ul>
                <div className="nav-cta">
                    <a href="https://calendly.com/garysarco1/30min" target="_blank" rel="noopener noreferrer" className="btn-primary small">Book a Call</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
