// Single source of truth for tier pricing. Used by:
//   - src/pages/PricingPage.jsx (the new 3-tier page)
//   - src/components/Pricing.jsx (homepage teaser)
//   - src/components/Calculator/QuoteScreen.jsx (printable quote)
//   - src/calculator/calc.js (ROI anchor)
//   - src/lib/tierRouting.js (tier selection)
//
// Update these numbers in ONE place — they propagate everywhere.

export const TIERS = {
    starter: {
        id: 'starter',
        name: 'Starter',
        baseRetainer: 497,
        perAppt: 25,
        guarantee: 25, // expected qualified booked appointments / month
        setupFee: 1000,
        pilotBase: 247,
        minCommitment: '1 month',
        aiAgents: '1 agent',
        crmIntegrations: '1 integration',
        accent: '#7868F8',
        headlineFeatures: [
            'Speed-to-lead via direct CRM integration (under 60 seconds)',
            'ClosedLoop callback to every new lead (one attempt)',
            'Appointment booking direct to your calendar',
            'Live dashboard + monthly summary'
        ]
    },
    growth: {
        id: 'growth',
        name: 'Growth',
        baseRetainer: 997,
        perAppt: 30,
        guarantee: 50,
        setupFee: 2000,
        pilotBase: 497,
        minCommitment: '3 months',
        aiAgents: '2 agents',
        crmIntegrations: 'Up to 3',
        accent: '#473D92',
        recommended: true, // visually emphasized as the default popular tier
        headlineFeatures: [
            'Everything in Starter, plus:',
            'Smart retry (9 attempts over 6 days, time-of-day optimised)',
            'Multi-source lead handling + up to 3 CRM integrations',
            'Weekly digest report'
        ]
    },
    scale: {
        id: 'scale',
        name: 'Scale',
        baseRetainer: 2497,
        perAppt: 45,
        guarantee: 100,
        setupFee: 3500,
        pilotBase: 1247,
        minCommitment: '6 months',
        aiAgents: '3+ agents',
        crmIntegrations: 'Unlimited',
        accent: '#25005D',
        headlineFeatures: [
            'Everything in Growth, plus:',
            'Dedicated outbound campaign assistant + multi-line support',
            'Custom agent personas + custom workflows',
            'Fortnightly strategy call with Gary + custom KPI reports'
        ]
    }
};

export const TIER_ORDER = ['starter', 'growth', 'scale'];

// Expected total = base + (guarantee × perAppt).
export function expectedMonthlyTotal(tier) {
    const t = TIERS[tier];
    if (!t) return null;
    return t.baseRetainer + t.guarantee * t.perAppt;
}

// Full feature matrix used on the pricing page.
// Each row: { feature, category, starter, growth, scale }.
// "✓" / "✗" / a string render as ticks, crosses, or detail values.
export const FEATURE_MATRIX = [
    { category: 'Pricing' },
    { feature: 'Base Retainer', starter: '$497/mo', growth: '$997/mo', scale: '$2,497/mo' },
    { feature: 'Performance Fee', starter: '$25/appt', growth: '$30/appt', scale: '$45/appt' },
    { feature: 'Expected Monthly Total', starter: '~$1,122/mo', growth: '~$2,497/mo', scale: '~$6,997/mo' },
    { feature: 'Setup Fee', starter: '$1,000', growth: '$2,000', scale: '$3,500' },
    { feature: 'Minimum Commitment', starter: '1 month', growth: '3 months', scale: '6 months' },

    { category: 'Outbound Engine' },
    { feature: 'Speed-to-lead callback (under 60 seconds)', starter: '✓', growth: '✓', scale: '✓' },
    { feature: 'ClosedLoop callback (system calls them back at least once)', starter: '✓', growth: '✓', scale: '✓' },
    { feature: 'Lead qualification on every call', starter: '✓', growth: '✓', scale: '✓' },
    { feature: 'Callback scheduling on no-answer', starter: '✓', growth: '✓', scale: '✓' },
    { feature: 'Smart retry (9 attempts over 6 days, time-of-day optimised)', starter: '✗', growth: '✓', scale: '✓' },
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
    { feature: 'SMS integration', starter: '✗', growth: '✓', scale: '✓' },
    { feature: 'Email integration', starter: '✗', growth: '✓', scale: '✓' },
    { feature: 'Calendar integration + appointment booking', starter: '✓', growth: '✓', scale: '✓' },
    { feature: 'Custom workflows', starter: '✗', growth: '✗', scale: '✓' },

    { category: 'Reporting & Support' },
    { feature: 'Call recording + transcript', starter: '✓', growth: '✓', scale: '✓' },
    { feature: 'Live dashboard', starter: '✓', growth: '✓', scale: '✓' },
    { feature: 'Monthly summary email', starter: '✓', growth: '✓', scale: '✓' },
    { feature: 'Weekly digest report', starter: '✗', growth: '✓', scale: '✓' },
    { feature: 'Custom KPI reports', starter: '✗', growth: '✗', scale: '✓' },
    { feature: 'Strategy call with Gary', starter: '✗', growth: '✗', scale: 'Fortnightly' }
];

// (ROI examples removed — we only publish real engagement data on the site.
// The DENES case study at /case-studies/denes-aldott is the proof point.)
