import React from 'react';
import './Industries.css';
import useScrollReveal, { useCardReveal } from '../hooks/useScrollReveal';
import { Home, Sun, Stethoscope, DollarSign, Scale, Wrench, Leaf, Shield } from 'lucide-react';

const industries = [
    { name: 'Real Estate', Icon: Home, desc: 'Speed-to-lead wins listings. Our AI calls Zillow and Realtor.com leads before they tab away.' },
    { name: 'Solar Energy', Icon: Sun, desc: 'Solar leads have a 5-minute window. We call, qualify for roof type and bill size, and book the site survey.' },
    { name: 'Healthcare', Icon: Stethoscope, desc: "Patients don't leave voicemails \u2014 they call the next clinic. Our AI books appointments 24/7 so you never lose a patient." },
    { name: 'Finance', Icon: DollarSign, desc: 'Pre-qualify loan and insurance leads automatically. Ask the right questions before a human ever picks up.' },
    { name: 'Legal', Icon: Scale, desc: 'A missed call could be a $50K case. Our AI captures intent, urgency, and contact details after hours.' },
    { name: 'Home Services', Icon: Wrench, desc: 'Your team is on a roof. A $15K job calls. Our AI answers, qualifies, and books the estimate before they call your competitor.' },
    { name: 'Landscaping', Icon: Leaf, desc: 'Spring means 200 calls a week. Our AI handles the surge, qualifies the jobs, and books estimates while your crew works.' },
    { name: 'Insurance', Icon: Shield, desc: 'Engage and qualify insurance leads with personalized AI calls. Ask about coverage needs, timeline, and budget automatically.' }
];

const Industries = () => {
    const titleRef = useScrollReveal();
    const gridRef = useCardReveal();
    return (
        <section id="industries" className="industries-section bg-alt">
            <div className="container">
                <div ref={titleRef} className="reveal">
                    <h2 className="section-title text-gradient">Industries We Serve</h2>
                    <p className="section-subtitle">If your business lives or dies by how fast you respond to leads, we built this for you.</p>
                </div>
                <div className="industries-grid" ref={gridRef}>
                    {industries.map((ind, i) => (
                        <div key={i} className="industry-card glass-card reveal-card">
                            <div className="industry-icon-wrap">
                                <ind.Icon size={28} strokeWidth={1.5} color="var(--primary)" />
                            </div>
                            <h4>{ind.name}</h4>
                            <p>{ind.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Industries;
