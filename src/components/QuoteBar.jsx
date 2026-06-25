import React from 'react';
import { Link } from 'react-router-dom';
import { track } from '../lib/analytics';
import './QuoteBar.css';

// A single big pull quote directly under the hero. It now features the
// latest case study (IPA): the strongest line from the engagement, with
// attribution and a link to read the full story. Replaced the earlier
// Denes / EasyStart "mind blown" quote once the IPA quotes landed.
const QuoteBar = () => {
    return (
        <section className="pull-quote">
            <div className="container">
                <figure className="pull-quote-figure">
                    <span className="pull-quote-mark" aria-hidden="true">&ldquo;</span>
                    <blockquote>
                        I'm not an AI fan, but you have changed my mind.
                    </blockquote>
                    <figcaption>
                        <span className="pull-quote-name">Andy</span>
                        <span className="pull-quote-company">Managing Director, International Property Alerts</span>
                    </figcaption>
                    <Link
                        to="/case-studies/ipa-lead-reactivation"
                        className="pull-quote-link"
                        onClick={() => track('home_latest_case_study_click', { case: 'ipa-lead-reactivation' })}
                    >
                        Read our latest case study &rarr;
                    </Link>
                </figure>
            </div>
        </section>
    );
};

export default QuoteBar;
