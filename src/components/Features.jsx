import React from 'react';
import './Features.css';

const features = [
    {
        title: 'Instant Speed-to-Lead',
        description: 'Calls new leads within seconds of form submission, engaging them while they’re still hot.',
        icon: 'https://www.stellarvoiceagents.com/whyusicons/Staff.png'
    },
    {
        title: 'Consistent Follow-up',
        description: 'Never miss a lead again: your AI calls, texts, or re-tries automatically until contact is made.',
        icon: 'https://www.stellarvoiceagents.com/whyusicons/New%20Message.png'
    },
    {
        title: 'Smart Qualification',
        description: 'Separate the closers from the tire-kickers. Each call asks 4-5 custom questions to identify serious intent.',
        icon: 'https://www.stellarvoiceagents.com/whyusicons/Settings.png'
    },
    {
        title: '24/7 Coverage',
        description: 'Provide instant responses even at 3 AM. Your automated sales team never takes a holiday.',
        icon: 'https://www.stellarvoiceagents.com/whyusicons/Clock.png'
    },
    {
        title: 'Human-Grade Voice',
        description: 'Uncannily human interaction that builds trust and rapport without the robotic feel.',
        icon: 'https://www.stellarvoiceagents.com/whyusicons/Audio%20Wave.png'
    },
    {
        title: 'Conversion Analytics',
        description: 'Track every interaction and outcome with data-driven insights to optimize your sales funnel.',
        icon: 'https://www.stellarvoiceagents.com/whyusicons/Bar%20Chart.png'
    }
];

const Features = () => {
    return (
        <section id="features" className="features-section">
            <div className="container">
                <h2 className="section-title text-gradient">Why Choose Stellar?</h2>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card glass-card">
                            <div className="feature-icon">
                                <img src={feature.icon} alt={feature.title} style={{ width: '50px', height: '50px' }} />
                            </div>
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
