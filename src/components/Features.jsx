import React from 'react';
import './Features.css';

const features = [
    { title: 'Instant Speed-to-Lead', description: 'Calls new leads within seconds of form submission, engaging them while they are still on your website.', icon: '\u26a1' },
    { title: 'Consistent Follow-up', description: 'Never miss a lead again. Your AI calls, texts, or re-tries automatically until contact is made.', icon: '\ud83d\udd04' },
    { title: 'Smart Qualification', description: 'Separate closers from tire-kickers. Each call asks 4-5 custom questions to identify serious intent.', icon: '\ud83c\udfaf' },
    { title: '24/7 Coverage', description: 'Your AI sales team never sleeps, never takes holidays, and provides instant responses even at 3 AM.', icon: '\ud83c\udf19' },
    { title: 'Human-Grade Voice', description: 'Uncannily natural interaction that builds trust and rapport \u2014 most callers cannot tell it is AI.', icon: '\ud83d\udde3\ufe0f' },
    { title: 'Conversion Analytics', description: 'Track every call, outcome, and insight. See exactly what drives bookings and optimize your funnel.', icon: '\ud83d\udcca' }
];

const Features = () => {
    return (
        <section id="features" className="features-section">
            <div className="container">
                <h2 className="section-title text-gradient">Why Choose Stellar?</h2>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card glass-card">
                            <div className="feature-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
