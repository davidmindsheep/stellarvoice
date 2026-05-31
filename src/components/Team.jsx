import React from 'react';
import './Team.css';
import useScrollReveal from '../hooks/useScrollReveal';

// Brief Sec 3.16: section headline + authority-anchored bios + expanded
// credential pills.
const team = [
    {
        name: 'Gary Sarco',
        role: 'CEO & Founder',
        image: '/garysarco.jpg',
        // Brief CR-3 (May 31 2026): Gary's career history corrected.
        // Six years real estate as a mortgage loan officer, four years IT,
        // and the past seven years in cybersecurity.
        bio: [
            'Gary spent six years in real estate as a mortgage loan officer in sales, four years in IT, and the past seven years in cybersecurity. His cybersecurity work includes a role as Cyber Threat Intelligence Analyst at Leidos, one of the largest US defense contractors. He holds a Certified Ethical Hacker (CEH) certification, CompTIA Security+, and a Bachelor of Science in Cybersecurity earned while working full time.',
            'Across his real estate and mortgage years he watched leads slip through the cracks every single day. Not because the product was wrong, but because nobody picked up the phone fast enough.',
            'He built Stellar to fix that. His security background means the tech is built right. His sales background means the AI actually knows how to qualify and close. Gary personally builds every client\'s qualification playbook and runs weekly strategy calls on the Scale tier.',
            'Gary has completed 50+ Business Network International (BNI) meetings and is an active networker across professional verticals.'
        ],
        credentials: ['Leidos', 'CEH', 'CompTIA Security+', 'BS Cybersecurity', '50+ BNI Meetings', '6 Years Real Estate Sales']
    },
    {
        name: 'David Taylor',
        role: 'Co-Founder & CTO',
        image: '/davidtaylor.jpg',
        bio: [
            'David runs the technical engine behind Stellar. As CEO of Mindsheep Marketing and co-founder of AI to the World, he has spent years building AI systems that work at scale across multiple industries.',
            'David built the entire SVA platform from the ground up. He selects and integrates the voice AI stack, designs the conversation logic, and makes sure every deployment sounds natural, connects to your CRM, and never goes down.',
            'His philosophy: "Any time someone needs to call someone, the AI should be calling them first." David\'s job is to make sure that call sounds so good your leads do not realise it is AI.'
        ],
        credentials: ['Mindsheep Marketing (CEO)', 'AI to the World (Co-Founder)', 'Full-Stack AI Platform Builder']
    }
];

const Team = () => {
    const ref = useScrollReveal();
    return (
        <section id="team" className="team-section">
            <div className="container">
                <div ref={ref} className="reveal">
                    <h2 className="section-title text-gradient">Built by people who understand sales. Not just AI.</h2>
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
                                {member.bio.map((para, j) => (
                                    <p key={j} className="bio">{para}</p>
                                ))}
                                {member.credentials && (
                                    <ul className="team-credentials">
                                        {member.credentials.map((c, i) => (
                                            <li key={i}>{c}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;
