import React from 'react';
import './Team.css';

const team = [
    {
        name: 'Gary Sarco',
        role: 'CEO & Founder',
        image: 'https://www.stellarvoiceagents.com/garysarco.jpg',
        bio: 'With 7 years in cybersecurity, 4 years in IT operations, and 6 years in real estate, Gary built Stellar Voice Agents to solve the problem he saw every day: leads falling through the cracks because businesses couldn\'t respond fast enough. That multi-industry background drives his obsession with systems that capture every opportunity and never let one slip.'
    },
    {
        name: 'David Taylor',
        role: 'Co-Founder & CTO',
        image: 'https://www.stellarvoiceagents.com/davidtaylor.jpg',
        bio: 'David brings deep expertise in AI automation, conversational systems, and digital infrastructure. As CEO of Mindsheep Marketing and co-founder of AI to the World, he ensures Stellar\'s voice agents are technically advanced, reliable at scale, and simple for businesses to deploy.'
    }
];

const Team = () => {
    return (
        <section id="team" className="team-section">
            <div className="container">
                <h2 className="section-title text-gradient">Meet The Founders</h2>
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
