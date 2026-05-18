import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { openCalendly } from '../lib/calendly';

const Navbar = ({ onOpenCalculator }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const close = () => setMenuOpen(false);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <Link to="/" className="logo" onClick={close}>
                    <img src="/logo.webp" alt="Stellar Voice Agents" className="logo-img" />
                </Link>
                <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                    <span></span><span></span><span></span>
                </button>
                <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    <li><a href="/#products" onClick={close}>Products</a></li>
                    <li><a href="/#demos" onClick={close}>Demos</a></li>
                    <li><a href="/#industries" onClick={close}>Industries</a></li>
                    <li><Link to="/case-studies/denes-aldott" onClick={close}>Case Study</Link></li>
                    <li><Link to="/pricing" onClick={close}>Pricing</Link></li>
                    <li><a href="/#faq" onClick={close}>FAQ</a></li>
                </ul>
                <div className="nav-cta">
                    {onOpenCalculator ? (
                        <button type="button" onClick={onOpenCalculator} className="btn-primary small">Take the Test</button>
                    ) : (
                        <button type="button" onClick={() => openCalendly(undefined, 'navbar-case-study')} className="btn-primary small">Book a Demo</button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
