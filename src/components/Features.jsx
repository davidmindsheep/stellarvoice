import React from 'react';
import './Features.css';

const features = [
    {
        title: 'Instant Speed-to-Lead',
        description: 'We call new inquiries within seconds. Be the first agent to make contact and secure 35-50% of the business automatically.',
        icon: 'https://www.stellarvoiceagents.com/whyusicons/Staff.png'
    },
    {
        title: 'Persistent Follow-up',
        description: 'Most sales agents quit after 1 call. Stellar calls 6+ times, reaching the 93% of leads that others miss.',
        icon: 'https://www.stellarvoiceagents.com/whyusicons/New%20Message.png'
    },
    {
        title: 'No More Tire Kickers',
        description: 'Stop driving to sites for unqualified leads. Stellar vets every caller for budget and timeline before they get to you.',
        icon: 'https://www.stellarvoiceagents.com/whyusicons/Settings.png'
    },
    {
        title: '24/7 Site Coverage',
        description: 'Whether they call at 2 PM or 2 AM, your "always-on" agent is ready to answer questions and book estimates.',
        icon: 'https://www.stellarvoiceagents.com/whyusicons/Clock.png'
    },
    {
        title: 'Perfect Pre-Qualification',
        description: 'We ask the hard questions: Budget, Timeline, and Financing. You obtain a full profile before you ever pick up the phone.',
        icon: 'https://www.stellarvoiceagents.com/whyusicons/Audio%20Wave.png'
    },
    {
        title: 'Scale Without Hiring',
        description: 'Handle 10 leads or 10,000. Stellar scales instantly to meet demand without the overhead of expanding your team.',
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
