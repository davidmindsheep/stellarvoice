// Thin wrapper over window.dataLayer for GTM events. Safe to call even
// before GTM loads — pushes are queued by the GTM snippet's array stub.

export function track(event, props = {}) {
    if (typeof window === 'undefined') return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...props });
}
