import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router'

// Client-side navigation keeps the old scroll position, so jump back to the top on each route change
export default function useScrollToTop() {
    const { pathname } = useLocation();

    useLayoutEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [pathname]);
}
