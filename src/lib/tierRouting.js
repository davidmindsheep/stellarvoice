// Tier routing logic per the SVA pricing blueprint v1.0 (Phase 2).
// Maps a completed quiz answer set to one of four outcomes:
//   - 'starter' | 'growth' | 'scale' | 'enterprise'
//
// Tie-breaker: when signals match multiple tiers, route UP. The base +
// performance model caps client downside, and a demo call can always
// step down. Routing too low loses the deal.

import { QUESTIONS } from '../calculator/questions';

function meta(answers, qid) {
    const q = QUESTIONS[qid];
    const answerId = answers[qid];
    if (!q?.options || !answerId) return {};
    return q.options.find((o) => o.id === answerId)?.meta ?? {};
}

function customerValue(answers) {
    return Number(meta(answers, 'customerValue').value ?? 0);
}

function monthlyLeads(answers) {
    return Number(meta(answers, 'leadVolume').monthly ?? 0);
}

function weeklyMissed(answers) {
    return Number(meta(answers, 'missedVolume').weekly ?? 0);
}

function isHighValueIndustry(answers) {
    // Real estate, health, finance, and commercial services tend toward higher
    // average deal sizes and longer sales cycles where tier 3 features pay off.
    return ['realEstate', 'health', 'finance'].includes(answers.industry);
}

// Heuristics for enterprise. Either of these on its own is enough.
function isEnterprise(answers) {
    if (customerValue(answers) >= 15000) return true;
    if (monthlyLeads(answers) >= 500) return true;
    if (weeklyMissed(answers) >= 100) return true;
    return false;
}

export function routeTier(answers) {
    if (isEnterprise(answers)) return 'enterprise';

    // Score each tier from the captured signals. Highest score wins; ties go
    // to the higher tier.
    const score = { starter: 0, growth: 0, scale: 0 };

    const value = customerValue(answers);
    const leads = monthlyLeads(answers);
    const missed = weeklyMissed(answers);

    // Customer value bands.
    if (value <= 3000) score.starter += 2;
    else if (value <= 8000) score.growth += 2;
    else score.scale += 2;

    // Lead volume bands.
    if (leads === 0) {
        // Unknown - assume small.
        score.starter += 1;
    } else if (leads < 100) {
        score.starter += 1;
    } else if (leads < 300) {
        score.growth += 2;
    } else {
        score.scale += 2;
    }

    // Missed-call volume bands.
    if (missed >= 25) score.growth += 1;
    if (missed >= 50) score.scale += 1;

    // Pain branches that imply more complex needs.
    if (answers.pain === 'missed' || answers.pain === 'afterHours') {
        score.starter += 1;
    }
    if (answers.pain === 'speed') {
        // Speed-to-lead is included in all tiers, but it really shines with
        // smart retry (growth+) and outbound (growth+).
        score.growth += 1;
    }

    // After-hours channel = both phone AND forms implies more lines / volume.
    if (answers.afterHoursChannel === 'both') score.growth += 1;

    // Multiple lead sources / high-value industries push toward scale.
    if (isHighValueIndustry(answers)) score.growth += 1;
    if (isHighValueIndustry(answers) && (leads >= 100 || value >= 5000)) score.scale += 1;

    // Pick the winner. Tie-breaker: higher tier wins.
    const ordered = ['scale', 'growth', 'starter'];
    let best = 'starter';
    let bestScore = -1;
    for (const tier of ordered) {
        if (score[tier] > bestScore) {
            bestScore = score[tier];
            best = tier;
        }
    }
    return best;
}

// Returns true when the quiz answers indicate enterprise without routing.
// Exposed so the calculator can branch the UI to the enterprise message.
export function isEnterpriseAnswers(answers) {
    return isEnterprise(answers);
}
