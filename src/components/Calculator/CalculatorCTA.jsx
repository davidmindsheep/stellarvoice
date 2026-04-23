import React from 'react';
import './CalculatorCTA.css';
import { Calculator as CalcIcon } from 'lucide-react';

export default function CalculatorCTA({ onOpen }) {
    return (
        <section className="calc-cta-section">
            <div className="container">
                <div className="calc-cta-card" onClick={onOpen} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(); } }}>
                    <div className="calc-cta-icon">
                        <CalcIcon size={32} strokeWidth={1.75} color="#7868F8" />
                    </div>
                    <div className="calc-cta-body">
                        <p className="calc-cta-eyebrow">30-second test</p>
                        <h2 className="calc-cta-headline">How much revenue is your phone leaking?</h2>
                        <p className="calc-cta-sub">
                            Take the quick test and see — to the dollar — what slow follow-up, missed calls, and after-hours enquiries are costing your business every month.
                        </p>
                    </div>
                    <button className="calc-cta-btn" onClick={(e) => { e.stopPropagation(); onOpen(); }}>
                        Find My Number →
                    </button>
                </div>
            </div>
        </section>
    );
}
