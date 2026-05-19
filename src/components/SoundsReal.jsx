import React from 'react';
import { Link } from 'react-router-dom';
import './SoundsReal.css';
import useScrollReveal from '../hooks/useScrollReveal';

// Section 3.4 of the v2.7 blueprint. Directly confronts the #1 objection
// ("AI sounds robotic") immediately under the social proof bar.
const SoundsReal = () => {
    const ref = useScrollReveal();
    return (
        <section id="sounds-real" className="sounds-real-section">
            <div className="container">
                <div ref={ref} className="reveal sounds-real-content">
                    <h2 className="section-title">But does it actually sound like a person?</h2>
                    <p className="sounds-real-lead">
                        Fair question. Most AI voice you have heard does sound robotic.
                        Flat tone, awkward pauses, zero personality.
                    </p>
                    <p className="sounds-real-lead sounds-real-lead-bold">
                        That is not what we built.
                    </p>
                    <p>
                        Stellar's voice agents sound natural because we obsess over the details most providers
                        skip: warm pacing, natural hesitation, the ability to handle interruptions without losing
                        the conversation, and the discipline to stay focused on one thing, figuring out if a lead
                        is real and getting them booked in with you.
                    </p>
                    <p>
                        Before our first client agreed to send a single real lead through the system, he tested
                        the voice himself. He called in, asked the kind of curveball questions a real customer
                        would ask, and reacted in the moment. His verdict:
                    </p>
                    <blockquote className="sounds-real-quote">
                        "That's just so unreal, well done!"
                        <cite>Denes Aldott, EasyStart Homes</cite>
                    </blockquote>
                    <p>
                        Denes has now been live for 6 months. His leads do not realise they are talking to AI.
                    </p>
                    <div className="sounds-real-ctas">
                        <Link to="/case-studies/denes-aldott" className="btn-primary">
                            Read the Full Case Study
                        </Link>
                        {/* "Hear Our Demos" button removed — the demos section
                         * is literally the next section, and the white-on-white
                         * btn-secondary styling made it nearly invisible. */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SoundsReal;
