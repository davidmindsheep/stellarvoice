import React from 'react';
import './CalculatorCTA.css';
import { Calculator as CalcIcon } from 'lucide-react';

// Reusable CTA card that opens the quiz. Defaults to the "revenue leak"
// framing for the top-of-page slot; pass props to retarget it (e.g. the
// plan-finder CTA that replaces the homepage pricing section).
export default function CalculatorCTA({
    onOpen,
    id,
    eyebrow = '30-second test',
    headline = 'How much revenue is your phone leaking?',
    sub = "Take the quick test and see — to the dollar — what slow follow-up, missed calls, and after-hours enquiries are costing your business every month.",
    buttonText = 'Take The Quiz →'
}) {
    return (
        <section id={id} className="calc-cta-section">
            <div className="container">
                <div
                    className="calc-cta-card"
                    onClick={onOpen}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(); } }}
                >
                    <div className="calc-cta-icon">
                        <CalcIcon size={32} strokeWidth={1.75} color="#7868F8" />
                    </div>
                    <div className="calc-cta-body">
                        <p className="calc-cta-eyebrow">{eyebrow}</p>
                        <h2 className="calc-cta-headline">{headline}</h2>
                        <p className="calc-cta-sub">{sub}</p>
                    </div>
                    <button className="calc-cta-btn" onClick={(e) => { e.stopPropagation(); onOpen(); }}>
                        {buttonText}
                    </button>
                </div>
            </div>
        </section>
    );
}
