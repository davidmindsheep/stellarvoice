import React from 'react';
import './SocialProof.css';

const stats = [
    { value: '50,000+', label: 'AI Calls Made' },
    { value: '15+', label: 'Businesses Trust Stellar' },
    { value: '4.8s', label: 'Avg Speed-to-Lead' },
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
