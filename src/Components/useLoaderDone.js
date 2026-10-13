import { useEffect, useState } from 'react'

const HIDDEN_CLASS = 'page-loader--hidden';

// True once the #page-loader overlay (in index.html) is hidden, so entrance
// animations don't play unseen behind it
export default function useLoaderDone() {
    const [done, setDone] = useState(() => {
        const loader = document.getElementById('page-loader');
        return !loader || loader.classList.contains(HIDDEN_CLASS);
    });

    useEffect(() => {
        if (done) return;
        const loader = document.getElementById('page-loader');
        const observer = new MutationObserver(() => {
            if (loader.classList.contains(HIDDEN_CLASS)) setDone(true);
        });
        observer.observe(loader, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, [done]);

    return done;
}
