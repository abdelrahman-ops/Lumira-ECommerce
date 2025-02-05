import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const location = useLocation(); // Get current location (path)

    useLayoutEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on route change
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [location]); // Trigger on location change

    return null; // No UI rendered, just a functional component
};

export default ScrollToTop;
