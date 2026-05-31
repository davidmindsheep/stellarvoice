// Single source of truth for tier pricing. Used by:
//   - src/pages/PricingPage.jsx (the 3-tier page)
//   - src/components/Calculator/QuoteScreen.jsx (printable quote)
//   - src/calculator/calc.js (ROI anchor)
//   - src/lib/tierRouting.js (tier selection)
//
// Per the 31 May 2026 Developer Brief: per-booking fees DECREASE with tier
// commitment ($35 / $25 / $20) so the more the client commits, the lower
// their per-booking rate. Monthly retainers unchanged at $497 / $997 / $2,497.
// All "appointment" / "appt" terminology has been replaced with "booking".

export const TIERS = {
    starter: {
        id: 'starter',
        name: 'Starter',
        baseRetainer: 497,
        perBooking: 35,
        guarantee: 25, // expected qualified bookings / month
        setupFee: 1500,
        setupWaiverMonths: 3,
        minCommitment: '1 month',
        aiAgents: '1 agent',
        crmIntegrations: '1 integration',
        accent: '#7868F8',
        // Brief Sec CR-2: one-line summary shown directly under the price.
        tierSummary: 'Inbound AI voice agent for your business line',
        // Expected additional monthly revenue at this tier. Based on typical
        // close rates (25-30%) and average deal sizes seen in this band.
        revenueLift: { low: 8000, high: 20000 },
        // Brief CR-1: ClosedLoop wording removed — clients did not know what
        // it meant. Plain-English feature copy below.
        headlineFeatures: [
            'Inbound call handling and lead qualification',
            'Automatic callback to every new lead (9 attempts over 6 days)',
            'SMS follow-up messaging on every lead',
            'Booking direct to your calendar',
            'Live dashboard + monthly summary'
        ]
    },
    growth: {
        id: 'growth',
        name: 'Growth',
        baseRetainer: 997,
        perBooking: 25,
        guarantee: 50,
        setupFee: 3500,
        setupWaiverMonths: 3,
        minCommitment: '3 months',
        aiAgents: '2 agents',
        crmIntegrations: 'Up to 3',
        accent: '#473D92',
        recommended: true, // default popular tier when no quiz answer set
        tierSummary: 'Inbound + outbound AI voice agents',
        revenueLift: { low: 25000, high: 70000 },
        headlineFeatures: [
            'Everything in Starter, plus:',
            'Outbound calling to your lead lists',
            'SMS + WhatsApp messaging',
            'Multi-source lead handling + up to 3 CRM integrations',
            'Weekly digest report'
        ]
    },
    scale: {
        id: 'scale',
        name: 'Scale',
        baseRetainer: 2497,
        perBooking: 20,
        guarantee: 100,
        setupFee: 5000,
        setupWaiverMonths: 6,
        minCommitment: '6 months',
        aiAgents: '3+ agents',
        crmIntegrations: 'Unlimited',
        accent: '#25005D',
        tierSummary: 'Full suite: inbound, outbound, multi-line, custom workflows',
        revenueLift: { low: 80000, high: 200000 },
        headlineFeatures: [
            'Everything in Growth, plus:',
            'Dedicated outbound campaign assistant + multi-line support',
            'Custom agent personas + custom workflows',
            'Weekly strategy call with Gary + custom KPI reports',
            'White label option',
            'Unlimited integrations'
        ]
    }
};

export const TIER_ORDER = ['starter', 'growth', 'scale'];

// Universal performance guarantee, shipped on every tier card.
export const PERFORMANCE_GUARANTEE =
    'Performance guarantee: Full refund of first month if zero qualified bookings in your first month.';

// Setup fee line: rendered on each tier card and in the matrix.
export function setupFeeLine(tier) {
    const t = TIERS[tier];
    if (!t) return null;
    const waiver = t.setupWaiverMonths;
    return `One-time setup: $${t.setupFee.toLocaleString()}. Waived when you pay ${waiver} months upfront.`;
}

// Expected total used by ROI math (anchor for the calculator quote screen).
// = base + (guarantee × per-booking fee).
export function expectedMonthlyTotal(tier) {
    const t = TIERS[tier];
    if (!t) return null;
    return t.baseRetainer + t.guarantee * t.perBooking;
}

// Full feature matrix used on the pricing page.
// Each row: { feature, category, starter, growth, scale }.
// "✓" / "✗" / a string render as ticks, crosses, or detail values.
export const FEATURE_MATRIX = [
    { category: 'Pricing' },
    { feature: 'Base Retainer', starter: '$497/mo', growth: '$997/mo', scale: '$2,497/mo' },
    { feature: 'Per-Booking Fee', starter: '$35/booking', growth: '$25/booking', scale: '$20/booking' },
    { feature: 'Setup Fee', starter: '$1,500 (waived at 3mo)', growth: '$3,500 (waived at 3mo)', scale: '$5,000 (waived at 6mo)' },
    { feature: 'Minimum Commitment', starter: '1 month', growth: '3 months', scale: '6 months' },
    { feature: 'Performance Guarantee', starter: '✓', growth: '✓', scale: '✓' },

    { category: 'Lead Callback and Follow-Up' },
    { feature: 'Speed-to-lead callback (under 60 seconds)', starter: '✓', growth: '✓', scale: '✓' },
    { feature: 'Automatic lead callback', starter: '✓', growth: '✓', scale: '✓' },
    { feature: 'Lead qualification on every call', starter: '✓', growth: '✓', scale: '✓' },
    { feature: 'Callback scheduling on no-answer', starter: '✓', growth: '✓', scale: '✓' },
    { feature: 'Smart retry (9 attempts over 6 days)', starter: '✓', growth: '✓', scale: '✓' },
    { feature: 'SMS messaging', starter: '✓', growth: '✓', scale: '✓' },
    { feature: 'WhatsApp messaging', starter: '✗', growth: '✓', scale: '✓' },
    { feature: 'Outbound email', starter: '✗', growth: '✓', scale: '✓' },
    { feature: 'Outbound campaigns via list upload', starter: '✓', growth: '✓', scale: '✓' },
    { feature: 'Dedicated outbound campaign assistant (separate agent)', starter: '✗', growth: '✗', scale: '✓' },
    { feature: 'Multi-line support', starter: '✗', growth: '✗', scale: '✓' },

    { category: 'Lead Sources' },
    { feature: 'Handling one lead source', starter: '✓', growth: '✓', scale: '✓' },
    { feature: 'Multi-source lead handling', starter: '✗', growth: '✓', scale: '✓' },

    { category: 'AI Agents' },
    { feature: 'AI agents included', starter: '1 agent', growth: '2 agents', scale: '3+ agents' },
    { feature: 'Custom agent personas', starter: '✗', growth: '✗', scale: '✓' },

    { category: 'Integrations' },
    { feature: 'CRM integrations', starter: '1 integration', growth: 'Up to 3', scale: 'Unlimited' },
    { feature: 'Calendar integration + appointment booking', starter: '✓', growth: '✓', scale: '✓' },
    { feature: 'Custom workflows', starter: '✗', growth: '✗', scale: '✓' },

    { category: 'Reporting & Support' },
    { feature: 'Call recording + transcript', starter: '✓', growth: '✓', scale: '✓' },
    { feature: 'Live dashboard', starter: '✓', growth: '✓', scale: '✓' },
    { feature: 'Monthly summary email', starter: '✓', growth: '✓', scale: '✓' },
    { feature: 'Weekly digest report', starter: '✗', growth: '✓', scale: '✓' },
    { feature: 'Custom KPI reports', starter: '✗', growth: '✗', scale: '✓' },
    { feature: 'Strategy call with Gary', starter: '✗', growth: '✗', scale: 'Weekly' }
];
