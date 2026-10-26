import { useEffect } from 'react'
import { useLocation } from 'react-router'

const HIDDEN_CLASS = 'page-loader--hidden';
// On route changes, only show the loader if images are still loading after this long,
// so cached pages don't flash it
const SHOW_DELAY_MS = 200;
// Never keep the user stuck behind the loader on a slow or broken asset
const MAX_WAIT_MS = 6000;

function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth;
}

// Shows the #page-loader overlay (in index.html) until the current page's images are loaded
export default function usePageLoader() {
    const { pathname } = useLocation();

    useEffect(() => {
        const loader = document.getElementById('page-loader');
        if (!loader) return;

        let cancelled = false;
        // Off-screen lazy images don't load until scrolled to, so waiting on them would keep the loader up
        const pending = [...document.querySelectorAll('#root img')]
            .filter((img) => !img.complete && (img.loading !== 'lazy' || isInViewport(img)));
        const imagesLoaded = pending.map((img) => new Promise((resolve) => {
            img.addEventListener('load', resolve, { once: true });
            img.addEventListener('error', resolve, { once: true });
        }));
        const timeout = new Promise((resolve) => setTimeout(resolve, MAX_WAIT_MS));

        // The loader is visible from the start on first load; afterwards, show it after a delay
        const showTimer = setTimeout(() => {
            if (pending.some((img) => !img.complete)) loader.classList.remove(HIDDEN_CLASS);
        }, SHOW_DELAY_MS);

        Promise.race([Promise.all([...imagesLoaded, document.fonts.ready]), timeout]).then(() => {
            if (cancelled) return;
            clearTimeout(showTimer);
            loader.classList.add(HIDDEN_CLASS);
        });

        return () => {
            cancelled = true;
            clearTimeout(showTimer);
        };
    }, [pathname]);
}
