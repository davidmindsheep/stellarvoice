import React from 'react';
import './Demos.css';

const demoAgents = [
    { industry: 'Real Estate', name: 'Elite Realty Bot', status: 'Inbound Inquiries' },
    { industry: 'Healthcare', name: 'Patient Link AI', status: 'Appointment Booking' },
    { industry: 'Finance', name: 'Capital Flow Agent', status: 'Lead Qualification' }
];

const Demos = () => {
    return (
        <section id="demos" className="demos-section">
            <div className="container">
                <h2 className="section-title text-gradient">Hear Our Agents In Action</h2>
                <div className="demos-grid">
                    {demoAgents.map((agent, index) => (
                        <div key={index} className="demo-card glass-card">
                            <img src="https://www.stellarvoiceagents.com/audio-background.png" className="demo-bg" alt="" />
                            <div className="industry-tag">{agent.industry}</div>
                            <h3>{agent.name}</h3>
                            <p className="status">{agent.status}</p>

                            <div className="waveform">
                                {[...Array(12)].map((_, i) => (
                                    <div key={i} className="bar" style={{ animationDelay: `${i * 0.1}s` }}></div>
                                ))}
                            </div>

                            <button className="play-button">
                                <span className="icon">▶</span> Listen to Demo
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Demos;
