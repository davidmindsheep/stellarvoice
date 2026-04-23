// Lazy-loaded Calendly popup widget. Booking CTAs call openCalendly()
// which loads the script on first use, then overlays Calendly's iframe
// modal on the current page (no navigation, no new tab).

const CALENDLY_CSS = 'https://assets.calendly.com/assets/external/widget.css';
const CALENDLY_JS = 'https://assets.calendly.com/assets/external/widget.js';
const DEFAULT_URL = 'https://calendly.com/garysarco1/30min';

let loadPromise = null;

function loadAssets() {
    if (loadPromise) return loadPromise;
    loadPromise = new Promise((resolve) => {
        if (window.Calendly) return resolve();
        if (!document.querySelector(`link[href="${CALENDLY_CSS}"]`)) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = CALENDLY_CSS;
            document.head.appendChild(link);
        }
        if (!document.querySelector(`script[src="${CALENDLY_JS}"]`)) {
            const script = document.createElement('script');
            script.src = CALENDLY_JS;
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => resolve(); // fail open — fall back to nothing
            document.body.appendChild(script);
        } else {
            const tick = setInterval(() => {
                if (window.Calendly) { clearInterval(tick); resolve(); }
            }, 50);
            setTimeout(() => { clearInterval(tick); resolve(); }, 5000);
        }
    });
    return loadPromise;
}

export async function openCalendly(url = DEFAULT_URL) {
    await loadAssets();
    if (window.Calendly) {
        window.Calendly.initPopupWidget({ url });
    } else {
        // Hard fallback: open in new tab if Calendly script never loaded
        window.open(url, '_blank', 'noopener,noreferrer');
    }
}
