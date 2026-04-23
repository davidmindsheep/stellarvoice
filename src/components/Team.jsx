import React from 'react';
import './Team.css';
import useScrollReveal from '../hooks/useScrollReveal';

const team = [
    {
        name: 'Gary Sarco',
        role: 'CEO & Founder',
        image: '/garysarco.jpg',
        bio: "After 6 years selling real estate, Gary watched leads slip through the cracks every single day \u2014 not because the product was wrong, but because nobody picked up the phone fast enough. He built Stellar to fix that. His background in cybersecurity and IT operations means the tech is rock-solid, and his sales experience means the AI actually knows how to close."
    },
    {
        name: 'David Taylor',
        role: 'Co-Founder & CTO',
        image: '/davidtaylor.jpg',
        bio: "David runs the technical engine behind Stellar. As CEO of Mindsheep Marketing and co-founder of AI to the World, he's spent years building AI-powered systems that work at scale. His job: make sure your voice agent sounds human, integrates seamlessly, and never goes down."
    }
];

const Team = () => {
    const ref = useScrollReveal();
    return (
        <section id="team" className="team-section">
            <div className="container">
                <div ref={ref} className="reveal">
                    <h2 className="section-title text-gradient">Meet The Founders</h2>
                </div>
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
