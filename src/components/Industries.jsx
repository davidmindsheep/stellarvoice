import React from 'react';
import './Industries.css';

const industries = [
    { name: 'Real Estate', icon: '\ud83c\udfe0', desc: 'Capture every buyer and seller lead the moment they inquire.' },
    { name: 'Solar Energy', icon: '\u2600\ufe0f', desc: 'Qualify homeowners for solar installs before they go cold.' },
    { name: 'Healthcare', icon: '\ud83c\udfe5', desc: 'Book patient appointments and handle after-hours calls.' },
    { name: 'Finance', icon: '\ud83d\udcb0', desc: 'Pre-qualify loan and insurance leads automatically.' },
    { name: 'Legal', icon: '\u2696\ufe0f', desc: 'Never miss a potential client call \u2014 even on weekends.' },
    { name: 'Home Services', icon: '\ud83d\udd27', desc: 'HVAC, plumbing, roofing \u2014 answer while your crew is in the field.' },
    { name: 'Landscaping', icon: '\ud83c\udf3f', desc: 'Convert seasonal leads when your team is too busy to answer.' },
    { name: 'Insurance', icon: '\ud83d\udee1\ufe0f', desc: 'Engage and qualify insurance leads with personalized AI calls.' }
];

const Industries = () => {
    return (
        <section id="industries" className="industries-section">
            <div className="container">
                <h2 className="section-title text-gradient">Industries We Serve</h2>
                <p className="section-subtitle">If your business lives or dies by how fast you respond to leads, we built this for you.</p>
                <div className="industries-grid">
                    {industries.map((ind, i) => (
                        <div key={i} className="industry-card glass-card">
                            <span className="industry-icon">{ind.icon}</span>
                            <h4>{ind.name}</h4>
                            <p>{ind.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Industries;
