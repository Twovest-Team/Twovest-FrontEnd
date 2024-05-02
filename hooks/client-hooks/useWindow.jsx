import { useEffect, useState } from "react";

const useWindow = () => {

  let lastScrollTop = 0

  const [windowSize, setWindowSize] = useState({
    width: null,
    height: null,
    isMobile: null,
    isSm: null,
    isMd: null,
    isLg: null,
    isXl: null,
    is2Xl: null,
    scrollDirection: null,
  });

  const handleSize = () => {
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;

    setWindowSize({
      ...windowSize,
      width: innerWidth,
      height: innerHeight,
      isMobile: innerWidth < 640,
      isSm: innerWidth >= 640 && innerWidth < 768,
      isMd: innerWidth >= 768 && innerWidth < 1024,
      isLg: innerWidth >= 1024 && innerWidth < 1280,
      isXl: innerWidth >= 1280 && innerWidth < 1536,
      is2Xl: innerWidth >= 1536,
    });
  };

  const handleScroll = () => {
    let scrollDirection = 'up'
    let st = window.scrollY || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      scrollDirection='down'
    } else if (st < lastScrollTop) {
      scrollDirection='up'
    }

    lastScrollTop = st <= 0 ? 0 : st;

    setWindowSize((prevWindowSize) => ({
      ...prevWindowSize,
      scrollDirection: scrollDirection,
    }));
  };

  useEffect(() => {
    handleSize();
    handleScroll();

    window.addEventListener("resize", handleSize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleSize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return windowSize;
};

export default useWindow;
