import React, { useState, useRef } from 'react';
import './Demos.css';
import { track } from '../lib/analytics';

// Brief Sec 3.8: every description includes "qualifies" + a booking
// reference. EasyStart Homes gets a "REAL CLIENT CALL" badge.
const demoAgents = [
    { industry: 'Solar Energy', name: 'Celestial Solar - High Bill', status: 'Outbound Sales Qualifier Demo', audio: '/audio/agent1.mp3', description: 'AI calls a homeowner who submitted a form about their electricity bill. Qualifies them on roof type, bill amount, and timeline. Books the site survey.' },
    { industry: 'Solar Energy', name: 'Celestial Solar - EV Owner', status: 'Outbound Sales Qualifier Demo', audio: '/audio/agent2.mp3', description: 'AI calls a Tesla owner interested in home solar and EV charging. Qualifies them on home setup and budget. Books the assessment.' },
    { industry: 'Insurance', name: 'Juliet - Life Insurance', status: 'Outbound Sales Qualifier Demo', audio: '/audio/agent-insurance.mp3', description: 'AI engages a life insurance lead. Qualifies on coverage needs, dependants, and budget. Books the consult.' },
    { industry: 'Marketing', name: 'Plush Marketing', status: 'Inbound Sales Qualifier Demo', audio: '/audio/agent-marketing.mp3', description: 'AI handles a discovery call for a marketing agency. Qualifies fit on budget, timeline, and growth goals. Books the strategy session.' },
    { industry: 'Bookkeeping', name: 'Details Matter Advisory', status: 'Inbound Sales Qualifier Demo', audio: '/audio/agent3.mp3', description: 'AI handles an inbound call for a bookkeeping firm. Qualifies on business size and service need. Books the consultation.' },
    { industry: 'Real Estate', name: 'Easy Start Homes', status: 'REAL CLIENT CALL', isReal: true, audio: '/audio/agent-realestate.mp3', description: 'This is a genuine outbound call placed by our AI on behalf of EasyStart Homes. Not a demo. Not a script. A real call. The AI qualifies the homebuyer on budget and timeline, then books the showing.' }
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
        else {
            audio.play();
            setPlaying(index);
            track('demo_audio_played', { industry: demoAgents[index].industry, name: demoAgents[index].name });
        }
    };

    const handleEnded = () => setPlaying(null);

    return (
        <section id="demos" className="demos-section">
            <div className="container">
                <h2 className="section-title">Hear Our Agents In Action</h2>
                <p className="section-subtitle">Real AI voice demos across real estate, insurance, marketing, solar, and bookkeeping. Press play and judge for yourself.</p>
                <div className="demos-grid">
                    {demoAgents.map((agent, index) => (
                        <div key={index} className={`demo-card glass-card ${playing === index ? 'is-playing' : ''} ${agent.isReal ? 'is-real-call' : ''}`}>
                            <div className="industry-tag">{agent.industry}</div>
                            {agent.isReal && <div className="demo-real-badge">REAL CLIENT CALL</div>}
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
