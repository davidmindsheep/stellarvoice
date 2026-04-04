import React, { useState, useRef } from 'react';
import './Demos.css';

const demoAgents = [
    { industry: 'Solar Energy', name: 'Celestial Solar \u2014 High Bill', status: 'ClosedLoop Callback Demo', audio: '/audio/demo-solar-billing.wav', description: 'AI calls a homeowner who submitted a form about reducing their electricity bill.' },
    { industry: 'Solar Energy', name: 'Celestial Solar \u2014 EV Owner', status: 'ClosedLoop Callback Demo', audio: '/audio/demo-solar-ev.wav', description: 'AI qualifies a Tesla owner interested in home solar and EV charging.' },
    { industry: 'Bookkeeping', name: 'Details Matter Advisory', status: 'AI Receptionist Demo', audio: null, description: 'AI receptionist handles an inbound call for a bookkeeping firm.' }
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
                <h2 className="section-title text-gradient">Hear Our Agents In Action</h2>
                <p className="section-subtitle">These are real AI voice demos we built for actual clients. Press play and judge for yourself.</p>
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
                            {agent.audio ? (
                                <>
                                    <audio ref={el => audioRefs.current[index] = el} src={agent.audio} onEnded={handleEnded} preload="none" />
                                    <button className="play-button" onClick={() => togglePlay(index)}>
                                        <span className="icon">{playing === index ? '\u23f8' : '\u25b6'}</span>
                                        {playing === index ? 'Pause' : 'Listen to Demo'}
                                    </button>
                                </>
                            ) : (
                                <a href="https://calendly.com/garysarco1/30min" target="_blank" rel="noopener noreferrer" className="play-button">
                                    <span className="icon">\ud83d\udcde</span> Request Demo
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Demos;
