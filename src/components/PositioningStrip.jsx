import React from 'react';
import { Target, TrendingUp, ShieldCheck } from 'lucide-react';
import './PositioningStrip.css';

// Brief Sec 3.2: narrow, high-contrast band with three "why us" points.
// Sits between the hero and the next homepage section.
const items = [
    {
        Icon: Target,
        text: 'Focused on sales qualification. Nothing else.'
    },
    {
        Icon: TrendingUp,
        text: 'Performance pricing. You pay per qualified booking.'
    },
    {
        Icon: ShieldCheck,
        text: "We de-risk it. If we don't book, you barely pay."
    }
];

const PositioningStrip = () => {
    return (
        <section className="positioning-strip" aria-label="Why Stellar">
            <div className="container">
                <div className="ps-grid">
                    {items.map((item, i) => (
                        <div key={i} className="ps-item">
                            <item.Icon size={22} strokeWidth={2.25} aria-hidden="true" />
                            <span>{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PositioningStrip;
