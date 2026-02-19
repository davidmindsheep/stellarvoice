import React, { useState, useRef } from 'react';
import './Demos.css';

const demoAgents = [
    {
        industry: 'Real Estate',
        name: 'Real Estate Assistant 01',
        status: 'Recorded Call',
        audioSrc: '/audio/agent1.mp3',
        description: "Experience a natural, latency-free conversation with a Stellar Voice agent."
    },
    {
        industry: 'Real Estate',
        name: 'Real Estate Assistant 02',
        status: 'Recorded Call',
        audioSrc: '/audio/agent2.mp3',
        description: "Hear how our AI handles complex inquiries and objections professionally."
    },
    {
        industry: 'Real Estate',
        name: 'Real Estate Assistant 03',
        status: 'Recorded Call',
        audioSrc: '/audio/agent3.mp3',
        description: "Listen to seamless appointment setting and lead qualification in real-time."
    }
];

const Demos = () => {
    const [playingIndex, setPlayingIndex] = useState(null);
    const audioRefs = useRef([]);

    const togglePlay = (index) => {
        const audio = audioRefs.current[index];

        if (playingIndex === index) {
            audio.pause();
            setPlayingIndex(null);
        } else {
            // Stop currently playing
            if (playingIndex !== null) {
                audioRefs.current[playingIndex].pause();
                audioRefs.current[playingIndex].currentTime = 0;
            }
            audio.play();
            setPlayingIndex(index);
        }
    };

    const handleEnded = () => {
        setPlayingIndex(null);
    };

    return (
        <section id="demos" className="demos-section">
            <div className="container">
                <h2 className="section-title text-gradient">Hear Our Real Estate Agents In Action</h2>
                <div className="demos-grid">
                    {demoAgents.map((agent, index) => (
                        <div key={index} className={`demo-card glass-card ${playingIndex === index ? 'playing' : ''}`}>
                            <div className="industry-tag">{agent.industry}</div>
                            <h3>{agent.name}</h3>
                            <p className="status">{agent.status}</p>

                            <div className={`waveform ${playingIndex === index ? 'active' : ''}`}>
                                {[...Array(12)].map((_, i) => (
                                    <div key={i} className="bar" style={{ animationDelay: `${i * 0.1}s` }}></div>
                                ))}
                            </div>

                            <audio
                                ref={el => audioRefs.current[index] = el}
                                src={agent.audioSrc}
                                onEnded={handleEnded}
                            />

                            <button
                                className={`play-button ${playingIndex === index ? 'active' : ''}`}
                                onClick={() => togglePlay(index)}
                            >
                                <span className="icon">{playingIndex === index ? '⏸' : '▶'}</span>
                                {playingIndex === index ? 'Pause Demo' : 'Listen to Demo'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Demos;
