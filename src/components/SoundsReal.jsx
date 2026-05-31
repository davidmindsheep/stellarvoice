import React from 'react';
import { Link } from 'react-router-dom';
import './SoundsReal.css';
import useScrollReveal from '../hooks/useScrollReveal';

// Brief Sec 3.6: rewritten with positive framing. Opens with capability
// and proof, not with the "AI sounds robotic" objection. Closes with a
// performance-pricing tie-in.
const SoundsReal = () => {
    const ref = useScrollReveal();
    return (
        <section id="sounds-real" className="sounds-real-section">
            <div className="container">
                <div ref={ref} className="reveal sounds-real-content">
                    <h2 className="section-title">Hear what natural AI voice actually sounds like.</h2>
                    <p>
                        Stellar's voice agents sound natural because we invest in the details that matter most:
                        warm pacing, natural hesitation, the ability to handle interruptions without losing the
                        conversation, and the focus to stay on track toward one goal. Figuring out if this lead
                        is real and getting them booked in with you.
                    </p>
                    <p>
                        Before our first client sent a single real lead through the system, he tested the voice
                        himself. He called in, asked the kind of curveball questions a real customer would ask,
                        and reacted in the moment. His verdict:
                    </p>
                    <blockquote className="sounds-real-quote">
                        "That's just so unreal, well done!"
                        <cite>Denes Aldott, EasyStart Homes</cite>
                    </blockquote>
                    <p>
                        That client, Denes Aldott from EasyStart Homes, has now been live for over 6 months.
                        His leads do not realise they are talking to AI.
                    </p>
                    <p className="sounds-real-close">
                        This is also why we are confident enough to tie our pricing to results. When the AI sounds
                        this natural, leads engage. When leads engage, they qualify. When they qualify, they book.
                        We built a system that works, and we priced it so you only pay when it does.
                    </p>
                    <div className="sounds-real-ctas">
                        <Link to="/case-studies/denes-aldott" className="btn-primary">
                            Read the Full Case Study
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SoundsReal;
