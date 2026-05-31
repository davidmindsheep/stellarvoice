// The quiz result rendered as a printable, shareable quote.
// Shows 3 tier cards with the recommended tier highlighted + a per-booking
// commit callout (Brief Sec 2.4 to 2.7).

import React from 'react';
import { Printer, Share2 } from 'lucide-react';
import { TIERS, TIER_ORDER } from '../../lib/pricingConfig';
import { openCalendly } from '../../lib/calendly';
import { track } from '../../lib/analytics';
import './QuoteScreen.css';

const fmt = (n) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(n);

const fmt2 = (n) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(n);

const today = () =>
    new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

function handlePrintOrShare() {
    track('quote_printed', { source: 'quote_screen' });
    const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(ua);
    if (isMobile && typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({
            title: 'My SVA Quote',
            text: 'My personalised quote from Stellar Voice Agents.',
            url: typeof window !== 'undefined' ? window.location.href : 'https://www.stellarvoiceagents.com/'
        }).catch(() => {
            if (typeof window !== 'undefined') window.print();
        });
    } else if (typeof window !== 'undefined') {
        window.print();
    }
}

// Compact tier card for the quote screen. The recommended tier gets a
// badge; the others render in a muted layout. The personalised revenue
// number lives in the leak panel above this row — duplicating it (or
// showing a hardcoded range that contradicts it) creates confusion.
function QuoteTierCard({ tier, isRecommended }) {
    return (
        <div
            className={`qts-tier ${isRecommended ? 'is-recommended' : ''}`}
            style={{ '--tier-accent': tier.accent }}
        >
            {isRecommended && <span className="qts-tier-badge">RECOMMENDED FOR YOU</span>}
            <p className="qts-tier-name">{tier.name}</p>
            <p className="qts-tier-base">
                <strong>{fmt(tier.baseRetainer)}</strong>
                <span>/mo base</span>
            </p>
            <p className="qts-tier-fee">+ {fmt(tier.perBooking)}/booking</p>
        </div>
    );
}

export default function QuoteScreen({ result, businessName }) {
    const recommendedId = result.plan.id;
    const tier = TIERS[recommendedId];
    const monthlyRevenue = result.monthlyRevenue;
    const annualRevenue = result.annualRevenue;
    const baseRetainer = tier.baseRetainer;
    const perBooking = tier.perBooking;
    const guarantee = tier.guarantee;
    const performanceFee = guarantee * perBooking;
    const expectedCost = baseRetainer + performanceFee;
    const monthlyProfit = monthlyRevenue - expectedCost;
    const annualProfit = monthlyProfit * 12;
    const roi = expectedCost > 0 ? monthlyRevenue / expectedCost : 0;
    const paybackDays = monthlyRevenue > 0 ? expectedCost / (monthlyRevenue / 30) : null;

    const handleBookDemo = () => {
        track('book_demo_clicked', { source: 'quote_screen', tier: tier.id, monthly_revenue: monthlyRevenue });
        openCalendly(undefined, `quote-${tier.id}`);
    };

    return (
        <div className="quote-screen">
            {/* HEADER */}
            <header className="quote-header">
                <img src="/logo.webp" alt="Stellar Voice Agents" className="quote-logo" />
                <p className="quote-title">Your Custom AI Voice Quote</p>
                <p className="quote-date">{today()}</p>
            </header>

            <button type="button" className="quote-print-btn no-print" onClick={handlePrintOrShare}>
                <Printer size={16} aria-hidden="true" />
                <span className="desktop-only">Print This Quote</span>
                <span className="mobile-only"><Share2 size={16} aria-hidden="true" /> Share</span>
            </button>

            {/* REVENUE LEAK */}
            <section className="quote-leak">
                <p className="quote-leak-label">{businessName ? `${businessName}, you're` : 'You are'} currently losing</p>
                <p className="quote-leak-number">{fmt(monthlyRevenue)}<span>/mo</span></p>
                <p className="quote-leak-annual">
                    That is <strong>{fmt(annualRevenue)} per year</strong> walking out the door.
                </p>
            </section>

            {/* TIER CARDS (Brief Sec 2.4 + 2.6) */}
            <section className="qts-tiers">
                <h3>Your recommended plan</h3>
                <div className="qts-tiers-grid">
                    {TIER_ORDER.map((id) => (
                        <QuoteTierCard
                            key={id}
                            tier={TIERS[id]}
                            isRecommended={id === recommendedId}
                        />
                    ))}
                </div>
            </section>

            {/* COMMIT CALLOUT (Brief Sec 2.7) */}
            <section className="qts-commit">
                <p>
                    <strong>The more you commit, the less you pay per booking.</strong>{' '}
                    Starter: $35. Growth: $25. Scale: $20. We reward commitment.
                </p>
            </section>

            {/* WHAT YOU GET */}
            <section className="quote-features">
                <h3>What {tier.name} includes</h3>
                <ul>
                    {tier.headlineFeatures.map((f, i) => (
                        <li key={i}><span className="check">✓</span> {f}</li>
                    ))}
                </ul>
            </section>

            {/* THE NUMBERS */}
            <section className="quote-numbers">
                <h3>The numbers</h3>
                <table>
                    <tbody>
                        <tr>
                            <td>Monthly revenue recovered</td>
                            <td className="num">{fmt(monthlyRevenue)}</td>
                        </tr>
                        <tr>
                            <td>Annual revenue recovered</td>
                            <td className="num">{fmt(annualRevenue)}</td>
                        </tr>
                        <tr>
                            <td>Base retainer</td>
                            <td className="num neg">- {fmt(baseRetainer)}</td>
                        </tr>
                        <tr>
                            <td>Expected per-booking fees</td>
                            <td className="num neg">- {fmt(performanceFee)}</td>
                        </tr>
                        <tr className="row-cost">
                            <td>Expected monthly cost</td>
                            <td className="num">{fmt(expectedCost)}</td>
                        </tr>
                        <tr className="row-profit">
                            <td><strong>Monthly profit</strong></td>
                            <td className="num profit"><strong>{fmt(monthlyProfit)}</strong></td>
                        </tr>
                        <tr>
                            <td>Annual profit</td>
                            <td className="num profit">{fmt(annualProfit)}</td>
                        </tr>
                        <tr className="row-roi">
                            <td><strong>ROI</strong></td>
                            <td className="num roi"><strong>{fmt2(roi)}</strong> back per $1 invested</td>
                        </tr>
                        {paybackDays !== null && Number.isFinite(paybackDays) && (
                            <tr>
                                <td>Payback period</td>
                                <td className="num">~{Math.max(1, Math.round(paybackDays * 10) / 10)} days</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>

            {/* PERFORMANCE GUARANTEE NOTE */}
            <section className="quote-pilot">
                <p>
                    <strong>Performance guarantee:</strong> Full refund of your first month if we deliver
                    zero qualified bookings in your first month. That is how confident we are.
                </p>
            </section>

            {/* NEXT STEP */}
            <section className="quote-cta no-print-borders">
                <p className="quote-cta-label">Ready to stop losing {fmt(monthlyRevenue)} every month?</p>
                <button type="button" className="quote-cta-primary" onClick={handleBookDemo}>
                    Book a Demo with Gary
                </button>
                <p className="quote-cta-secondary">
                    Or{' '}
                    <a href={`/pricing?plan=${tier.id}`}>view your full plan details</a>.
                </p>
                <p className="quote-print-url">
                    Calendar: calendly.com/garysarco1/30min · Plan details: stellarvoiceagents.com/pricing
                </p>
            </section>

            <button type="button" className="quote-print-btn quote-print-btn-bottom no-print" onClick={handlePrintOrShare}>
                <Printer size={16} aria-hidden="true" /> Print This Quote
            </button>

            <footer className="quote-footer">
                This quote was generated based on your quiz answers on {today()}.
                Figures are estimates based on the information you provided.
                Quote valid for 30 days.
                Stellar Voice Agents · stellarvoiceagents.com
            </footer>
        </div>
    );
}

export function EnterpriseQuoteScreen({ result, businessName }) {
    const monthlyRevenue = result.monthlyRevenue;
    const annualRevenue = result.annualRevenue;

    const handleBookCall = () => {
        track('enterprise_redirect', { source: 'quote_screen', clicked_book_call: true, monthly_revenue: monthlyRevenue });
        openCalendly(undefined, 'quote-enterprise');
    };

    return (
        <div className="quote-screen quote-enterprise">
            <header className="quote-header">
                <img src="/logo.webp" alt="Stellar Voice Agents" className="quote-logo" />
                <p className="quote-title">Your Custom AI Voice Quote</p>
                <p className="quote-date">{today()}</p>
            </header>

            <section className="quote-leak">
                <p className="quote-leak-label">{businessName ? `${businessName}, you're` : 'You are'} currently losing</p>
                <p className="quote-leak-number">{fmt(monthlyRevenue)}<span>/mo</span></p>
                <p className="quote-leak-annual">
                    Estimated annual revenue at risk: <strong>{fmt(annualRevenue)}</strong>.
                </p>
            </section>

            <section className="quote-enterprise-card">
                <h3>Enterprise Partnership</h3>
                <p>
                    At your volume and deal size, a standard plan doesn&apos;t do justice to the opportunity.
                    We build custom Enterprise partnerships with dedicated account management,
                    unlimited agents, and SLA guarantees.
                </p>
                <ul>
                    <li>Dedicated account manager and onboarding team</li>
                    <li>Unlimited AI agents and CRM integrations</li>
                    <li>Custom workflows, custom personas, custom KPIs</li>
                    <li>SLA-backed uptime and response guarantees</li>
                    <li>Weekly strategy reviews with Gary</li>
                </ul>
                <button type="button" className="quote-cta-primary" onClick={handleBookCall}>
                    Book a Call with Gary
                </button>
                <p className="quote-print-url">
                    Calendar: calendly.com/garysarco1/30min
                </p>
            </section>

            <footer className="quote-footer">
                This quote was generated based on your quiz answers on {today()}.
                Figures are estimates based on the information you provided.
                Stellar Voice Agents · stellarvoiceagents.com
            </footer>
        </div>
    );
}
