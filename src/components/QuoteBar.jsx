import React from 'react';
import { Link } from 'react-router-dom';
import './QuoteBar.css';

// Social proof quote bar (blueprint Section 3.3). Shipped with Denes quotes
// only because we have implicit publication approval (already live on the
// case study). The full primary selection (Gabriella, Dave Roe, Sean De Luna)
// is staged below as commented-out objects, ready to drop into the array as
// each written approval lands.
//
// Approval log lives in _approvals/<name-slug>.txt — once a file exists for
// a quoted speaker, uncomment their object and ship.
const quotes = [
    {
        text: "That's just so unreal, well done!",
        attribution: 'Denes Aldott',
        company: 'EasyStart Homes',
        context: 'After testing the voice himself',
        href: '/case-studies/denes-aldott'
    },
    {
        text: "Dave, I am absolutely mind blown, this is amazing.",
        attribution: 'Denes Aldott',
        company: 'EasyStart Homes',
        context: 'After seeing the full system in action',
        href: '/case-studies/denes-aldott'
    }
    // ---- AWAITING WRITTEN APPROVAL ---------------------------------------
    // {
    //     text: "I've talked to many AI and all the virtual systems. We've never, I've never heard anything like that.",
    //     attribution: 'Gabriella',
    //     company: 'Physical Therapy Business Owner',
    //     context: 'After hearing a live SVA demo'
    // },
    // {
    //     text: "I was concerned about that. But I guess that's an older generation of AI voice that is in my mind.",
    //     attribution: 'Dave Roe',
    //     company: 'Google Ads Agency Owner',
    //     context: 'Skeptic-to-believer moment'
    // },
    // {
    //     text: "That was impressive to hear. That's higher order. That wasn't happening two years ago.",
    //     attribution: 'Sean De Luna',
    //     company: 'VA Staffing Business Owner',
    //     context: 'Compared to the human agents he staffs professionally'
    // }
];

const QuoteBar = () => {
    return (
        <section className="quote-bar">
            <div className="container">
                <div className={`quote-bar-grid quote-bar-grid-${quotes.length}`}>
                    {quotes.map((q, i) => (
                        <figure key={i} className="quote-card glass-card">
                            <blockquote>"{q.text}"</blockquote>
                            <figcaption>
                                <strong>{q.attribution}</strong>
                                <span>{q.company}</span>
                                <em>{q.context}</em>
                                {q.href && (
                                    <Link to={q.href} className="quote-card-link">
                                        See the engagement &rarr;
                                    </Link>
                                )}
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default QuoteBar;
