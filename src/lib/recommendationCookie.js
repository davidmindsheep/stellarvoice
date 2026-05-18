// Cookie persistence for quiz-driven tier recommendation.
// Spec: sva_recommended_tier, 90-day expiry, site-wide path, JSON payload.

const COOKIE_NAME = 'sva_recommended_tier';
const EXPIRY_DAYS = 90;

function writeCookie(name, value, days) {
    if (typeof document === 'undefined') return;
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    const encoded = encodeURIComponent(value);
    document.cookie = `${name}=${encoded}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

function readCookie(name) {
    if (typeof document === 'undefined') return null;
    const cookies = document.cookie ? document.cookie.split('; ') : [];
    for (const c of cookies) {
        const [k, ...rest] = c.split('=');
        if (k === name) return decodeURIComponent(rest.join('='));
    }
    return null;
}

export function setRecommendation(payload) {
    try {
        const body = {
            tier: payload.tier,
            revenue_leak: payload.revenue_leak ?? 0,
            revenue_annual: payload.revenue_annual ?? 0,
            customer_value: payload.customer_value ?? null,
            lead_volume: payload.lead_volume ?? null,
            timestamp: Date.now()
        };
        writeCookie(COOKIE_NAME, JSON.stringify(body), EXPIRY_DAYS);
    } catch (err) {
        // Cookie writes can fail in private mode or with disabled storage; we
        // silently accept the loss rather than crash the quiz flow.
        if (typeof console !== 'undefined') console.warn('[recommendationCookie] write failed', err);
    }
}

export function getRecommendation() {
    const raw = readCookie(COOKIE_NAME);
    if (!raw) return null;
    try {
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed.tier !== 'string') return null;
        return parsed;
    } catch {
        return null;
    }
}

export function clearRecommendation() {
    writeCookie(COOKIE_NAME, '', -1);
}

// Read a tier from ?plan=starter|growth|scale|enterprise (URL takes precedence
// over cookie per the blueprint).
export function getTierFromUrl(search) {
    if (typeof search !== 'string') {
        if (typeof window === 'undefined') return null;
        search = window.location.search;
    }
    const params = new URLSearchParams(search);
    const tier = params.get('plan');
    if (!tier) return null;
    const allowed = ['starter', 'growth', 'scale', 'enterprise'];
    return allowed.includes(tier) ? tier : null;
}
