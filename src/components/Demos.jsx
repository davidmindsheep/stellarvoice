import React, { useState, useRef } from 'react';
import './Demos.css';

const demoAgents = [
    { industry: 'Solar Energy', name: 'Celestial Solar — High Bill', status: 'ClosedLoop Demo', audio: '/audio/agent1.mp3', description: 'AI calls a homeowner who submitted a form about reducing their electricity bill.' },
    { industry: 'Solar Energy', name: 'Celestial Solar — EV Owner', status: 'ClosedLoop Demo', audio: '/audio/agent2.mp3', description: 'AI qualifies a Tesla owner interested in home solar and EV charging.' },
    { industry: 'Insurance', name: 'Juliet — Life Insurance', status: 'ClosedLoop Demo', audio: '/audio/agent-insurance.mp3', description: 'AI engages a life insurance lead, asks about coverage needs and dependants, books the consult.' },
    { industry: 'Marketing', name: 'Plush Marketing', status: 'AI Receptionist Demo', audio: '/audio/agent-marketing.mp3', description: 'AI receptionist handles a discovery call for a marketing agency, qualifies fit, schedules a strategy session.' },
    { industry: 'Bookkeeping', name: 'Details Matter Advisory', status: 'AI Receptionist Demo', audio: '/audio/agent3.mp3', description: 'AI receptionist handles an inbound call for a bookkeeping firm.' },
    { industry: 'Real Estate', name: 'Easy Start Homes', status: 'ClosedLoop Demo', audio: '/audio/agent-realestate.mp3', description: 'AI calls a homebuyer who enquired about a listing, qualifies budget and timeline, books the showing.' }
];

const Demos = () => {
    const [playing, setPlaying] = useState(null);
    const audioRefs = useRef({});

    const togglePlay = (index) => {
        Object.values(audioRefs.current).forEach((audio, i) => {
            if (audio && i !== index) { audio.pause(); audio.currentTime = 0; }
        });
        const audio = audioRefs.current[index];
        if (!audio) return;
        if (playing === index) { audio.pause(); setPlaying(null); }
        else { audio.play(); setPlaying(index); }
    };

    const handleEnded = () => setPlaying(null);

    return (
        <section id="demos" className="demos-section">
            <div className="container">
                <h2 className="section-title">Hear Our Agents In Action</h2>
                <p className="section-subtitle">Real AI voice demos across real estate, insurance, marketing, solar, and bookkeeping. Press play and judge for yourself.</p>
                <div className="demos-grid">
                    {demoAgents.map((agent, index) => (
                        <div key={index} className={`demo-card glass-card ${playing === index ? 'is-playing' : ''}`}>
                            <div className="industry-tag">{agent.industry}</div>
                            <h3>{agent.name}</h3>
                            <p className="demo-description">{agent.description}</p>
                            <div className="waveform">
                                {[...Array(16)].map((_, i) => (
                                    <div key={i} className="bar" style={{ animationDelay: `${i * 0.08}s` }}></div>
                                ))}
                            </div>
                            <audio ref={el => audioRefs.current[index] = el} src={agent.audio} onEnded={handleEnded} preload="none" />
                            <button className="play-button" onClick={() => togglePlay(index)}>
                                <span className="icon">{playing === index ? '⏸' : '▶'}</span>
                                {playing === index ? 'Pause' : 'Listen to Demo'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Demos;
