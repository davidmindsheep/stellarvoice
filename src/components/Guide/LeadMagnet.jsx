import React, { useState } from 'react';
import './LeadMagnet.css';
import { GUIDE_INDUSTRIES } from '../../data/guides';
import GuideRequestModal from './GuideRequestModal';
import { track } from '../../lib/analytics';

// Homepage / section lead magnet: pick your industry, get the guide emailed.
export default function LeadMagnet({
    eyebrow = 'Free industry guides',
    headline = 'How to use AI voice in your industry',
    sub = "Pick your industry and we'll email you a practical playbook: where the revenue leaks, what to fix first, and what good looks like."
}) {
    const [openId, setOpenId] = useState(null); // industryId when modal open, else null

    const openFor = (id) => {
        track('guide_picker_clicked', { industry: id });
        setOpenId(id);
    };

    return (
        <section className="lm" id="guides">
            <div className="container lm-inner">
                <p className="lm-eyebrow">{eyebrow}</p>
                <h2 className="lm-headline">{headline}</h2>
                <p className="lm-sub">{sub}</p>

                <div className="lm-grid">
                    {GUIDE_INDUSTRIES.map((i) => (
                        <button key={i.id} className="lm-tile" onClick={() => openFor(i.id)}>
                            <span className="lm-tile-icon" aria-hidden>{i.icon}</span>
                            <span className="lm-tile-label">{i.label}</span>
                            <span className="lm-tile-cta">Get the guide &rarr;</span>
                        </button>
                    ))}
                </div>
            </div>

            {openId !== null && (
                <GuideRequestModal initialIndustryId={openId} onClose={() => setOpenId(null)} />
            )}
        </section>
    );
}
