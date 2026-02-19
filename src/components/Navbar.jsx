import React from 'react';
import './Navbar.css';

const Navbar = ({ onBookClick }) => {
    return (
        <nav className="navbar glass-card">
            <div className="nav-container">
                <div className="logo">
                    <img src="https://www.stellarvoiceagents.com/logo.webp" alt="Stellar Voice" style={{ height: '40px' }} />
                </div>
                <ul className="nav-links">
                    <li><a href="#features">Features</a></li>
                    <li><a href="#demos">Demos</a></li>
                    <li><a href="#team">Team</a></li>
                    <li><a href="#faq">FAQ</a></li>
                </ul>
                <div className="nav-cta">
                    <button className="btn-primary small" onClick={onBookClick}>Book a Call</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
