import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component that resets scroll position to top on route changes
 * This ensures every page navigation starts from scroll position 0
 */
export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Scroll to top immediately on route change
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
