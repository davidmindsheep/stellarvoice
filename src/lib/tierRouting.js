// Tier routing per the 31 May 2026 Developer Brief (Sec 2.5).
//
// Recommend SCALE if:
//   - missed calls 30+ per week, OR
//   - customer value $5,000+ (l or xl), OR
//   - pain "speed" + lead volume 100+, OR
//   - industry Real Estate or Finance + customer value $5,000+
// Recommend GROWTH if:
//   - missed calls 15-30 per week, OR
//   - customer value $1,500-$5,000 (m), OR
//   - pain "speed" + lead volume 50-100 (m), OR
//   - pain "afterHours" + afterHoursChannel "both"
// Recommend STARTER otherwise.
//
// Enterprise overlay: $15,000+ value, 500+ leads/mo, or 100+ missed/wk
// flips the prospect to enterprise (custom call) regardless of tier.

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

// "Speed" pain branch maps to the `speed` answer ID on the pain question.
// "After-hours" pain branch maps to `afterHours`.
function isPain(answers, painId) {
    return answers.pain === painId;
}

function isHighValueIndustry(answers) {
    return ['realEstate', 'finance'].includes(answers.industry);
}

// Enterprise overlay. Either of these on its own is enough.
function isEnterprise(answers) {
    if (customerValue(answers) >= 15000) return true;
    if (monthlyLeads(answers) >= 500) return true;
    if (weeklyMissed(answers) >= 100) return true;
    return false;
}

export function routeTier(answers) {
    if (isEnterprise(answers)) return 'enterprise';

    const value = customerValue(answers);
    const leads = monthlyLeads(answers);
    const missed = weeklyMissed(answers);

    // Check SCALE conditions first. If any are met, route up.
    const scaleConditions = [
        missed >= 30,                                          // 30+ missed calls/wk (tons)
        value >= 5000,                                          // $5k+ customer value (l, xl)
        isPain(answers, 'speed') && leads >= 100,              // speed pain + 100+ leads (l)
        isHighValueIndustry(answers) && value >= 5000          // real estate/finance + $5k+
    ];
    if (scaleConditions.some(Boolean)) return 'scale';

    // Then GROWTH conditions.
    const growthConditions = [
        missed >= 15 && missed < 30,                           // 15-30 missed/wk (lots)
        value >= 1500 && value < 5000,                         // $1.5k-$5k (m)
        isPain(answers, 'speed') && leads >= 50 && leads < 100, // speed + 50-100 leads (m)
        isPain(answers, 'afterHours') && answers.afterHoursChannel === 'both'
    ];
    if (growthConditions.some(Boolean)) return 'growth';

    // Default: STARTER.
    return 'starter';
}

// Returns true when the quiz answers indicate enterprise.
// Exposed so the calculator can branch the UI to the enterprise message.
export function isEnterpriseAnswers(answers) {
    return isEnterprise(answers);
}
