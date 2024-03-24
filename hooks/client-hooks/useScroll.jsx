'use effect'

import { useEffect, useState } from 'react';

const useScroll = () => {
    const [scrollX, setScrollX] = useState(0);
    const [scrollY, setScrollY] = useState(0);

    const handleScrollChange = () => {
        if (typeof window !== 'undefined') {
            setScrollX(window.scrollX || window.pageXOffset);
            setScrollY(window.scrollY || window.pageYOffset);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScrollChange);

        return () => {
            window.removeEventListener('scroll', handleScrollChange);
        };
    }, []);

    return [scrollX, scrollY];
};

export default useScroll;
