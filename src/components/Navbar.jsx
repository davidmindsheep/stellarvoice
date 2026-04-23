import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ onOpenCalculator }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <div className="logo">
                    <img src="/logo.webp" alt="Stellar Voice Agents" style={{ height: '36px' }} />
                </div>
                <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                    <span></span><span></span><span></span>
                </button>
                <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    <li><a href="#products" onClick={() => setMenuOpen(false)}>Products</a></li>
                    <li><a href="#demos" onClick={() => setMenuOpen(false)}>Demos</a></li>
                    <li><a href="#industries" onClick={() => setMenuOpen(false)}>Industries</a></li>
                    <li><a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a></li>
                    <li><a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a></li>
                </ul>
                <div className="nav-cta">
                    {onOpenCalculator ? (
                        <button type="button" onClick={onOpenCalculator} className="btn-primary small">Take the Test</button>
                    ) : (
                        <a href="https://calendly.com/garysarco1/30min" target="_blank" rel="noopener noreferrer" className="btn-primary small">Book a Demo</a>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
