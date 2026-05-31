import React from 'react';
import './Industries.css';
import useScrollReveal, { useCardReveal } from '../hooks/useScrollReveal';
import { Home, Sun, Stethoscope, DollarSign, Scale, Shield } from 'lucide-react';

// Six professional verticals. Trades (Home Services, Landscaping) were
// dropped Jun 2026 to align with SVA's positioning on higher-ticket,
// qualification-heavy sales cycles. Every description ends with a
// reference to paying only for qualified bookings.
const industries = [
    { name: 'Real Estate', Icon: Home, desc: 'Speed-to-lead wins listings. Our AI calls your leads within seconds, qualifies them on budget and timeline, and books the showing. You only pay for qualified bookings.' },
    { name: 'Solar Energy', Icon: Sun, desc: 'Solar leads have a 5-minute window. We call, qualify for roof type and bill size, and book the site survey. You only pay for qualified bookings.' },
    { name: 'Healthcare', Icon: Stethoscope, desc: 'Patients do not leave voicemails, they call the next clinic. Our AI books appointments 24/7 so you never lose a patient. You only pay for qualified bookings.' },
    { name: 'Finance', Icon: DollarSign, desc: 'Pre-qualify loan and advisory leads automatically. Ask the right questions before a human ever picks up. You only pay for qualified bookings.' },
    { name: 'Legal', Icon: Scale, desc: 'A missed call could be a $50K case. Our AI captures intent, urgency, and contact details after hours, then books the consult. You only pay for qualified bookings.' },
    { name: 'Insurance', Icon: Shield, desc: 'Engage and qualify insurance leads with personalised AI calls. Ask about coverage needs, timeline, and budget automatically. You only pay for qualified bookings.' }
];

const Industries = () => {
    const titleRef = useScrollReveal();
    const gridRef = useCardReveal();
    return (
        <section id="industries" className="industries-section bg-alt">
            <div className="container">
                <div ref={titleRef} className="reveal">
                    <h2 className="section-title">Industries We Serve</h2>
                    <p className="section-subtitle">If your business lives or dies by how fast you respond to leads, we built this for you.</p>
                </div>
                <div className="industries-grid" ref={gridRef}>
                    {industries.map((ind, i) => (
                        <div key={i} className="industry-card glass-card reveal-card">
                            <div className="industry-icon-wrap">
                                <ind.Icon size={26} strokeWidth={1.75} color="var(--deep-purple)" />
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
