import React from 'react';
import './QuoteBar.css';

// A single big pull quote sits between the hero stats bar and the
// "But does it actually sound like a person?" section. The quote was
// originally "Dave, I am absolutely mind blown, this is amazing." sent
// by Denes to David Taylor — David's name has been removed so the
// quote reads as a clean, universal reaction.
const QuoteBar = () => {
    return (
        <section className="pull-quote">
            <div className="container">
                <figure className="pull-quote-figure">
                    <span className="pull-quote-mark" aria-hidden="true">&ldquo;</span>
                    <blockquote>
                        I am absolutely mind blown, this is amazing.
                    </blockquote>
                    <figcaption>
                        <span className="pull-quote-name">Denes Aldott</span>
                        <span className="pull-quote-company">EasyStart Homes</span>
                    </figcaption>
                </figure>
            </div>
        </section>
    );
};

export default QuoteBar;
