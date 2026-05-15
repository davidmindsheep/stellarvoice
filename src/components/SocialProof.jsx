import React from 'react';
import './SocialProof.css';

const stats = [
    { value: '<5s', label: 'Form-to-Call Response' },
    { value: '24/7', label: 'Always-On Coverage' },
    { value: '5–7 days', label: 'From Kickoff to Live' },
    { value: '8', label: 'Industries Served' },
];

const SocialProof = () => {
    return (
        <section className="social-proof">
            <div className="container social-proof-inner">
                {stats.map((s, i) => (
                    <div key={i} className="proof-stat">
                        <span className="proof-value text-gradient">{s.value}</span>
                        <span className="proof-label">{s.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SocialProof;
