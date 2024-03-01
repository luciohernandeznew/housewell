// stolen from https://stackoverflow.com/a/74216229
import { useState, useEffect } from 'react';

// Hook
export default function useWindowSize(isDesktop?: boolean) {

    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
        width: isDesktop ? 1500: 0,
        height: isDesktop ? 1500: 0,
    });
    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        // Add event listener
        window.addEventListener('resize', handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}

const small = 1100;

export function isLarge(width: number) {
    return width >= small;
}

export type ResponsiveProps = {
    width: number
}