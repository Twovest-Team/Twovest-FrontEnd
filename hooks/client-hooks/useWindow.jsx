
import { useEffect, useState } from "react";

const useWindow = () => {
  const [windowSize, setWindowSize] = useState({
    width: null,
    height: null,
    isMobile: null,
    isSm: null,
    isMd: null,
    isLg: null,
    isXl: null,
    is2Xl: null,
  });

  const handleSize = () => {

    const innerWidth = window.innerWidth
    const innerHeight = window.innerHeight

    setWindowSize({
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

  useEffect(() => {
    handleSize();

    window.addEventListener("resize", handleSize);

    return () => window.removeEventListener("resize", handleSize);
  }, []);

  return windowSize;
};

export default useWindow;