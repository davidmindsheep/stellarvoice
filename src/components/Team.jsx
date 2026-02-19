import React from 'react';
import './Team.css';

const team = [
    {
        name: 'Gary Sarco',
        role: 'CEO & Founder',
        image: 'https://www.stellarvoiceagents.com/garysarco.jpg',
        bio: 'Visionary leader helping construction and real estate firms scale through AI automation.'
    },
    {
        name: 'David Taylor',
        role: 'Co-Founder',
        image: 'https://www.stellarvoiceagents.com/davidtaylor.jpg',
        bio: 'Expert in maximizing lead conversion rates for high-volume brokerage teams.'
    }
];

const Team = () => {
    return (
        <section id="team" className="team-section">
            <div className="container">
                <h2 className="section-title text-gradient">Meet The Leaders</h2>
                <div className="team-grid">
                    {team.map((member, index) => (
                        <div key={index} className="team-card glass-card">
                            <div className="team-image">
                                <img src={member.image} alt={member.name} />
                            </div>
                            <div className="team-info">
                                <h3>{member.name}</h3>
                                <p className="role">{member.role}</p>
                                <p className="bio">{member.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;
