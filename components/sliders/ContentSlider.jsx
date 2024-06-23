'use client'

import React, { useRef, useState, useEffect } from "react";

const ContentSlider = ({
  children,
  disableGradient,
  className,
  fixedElement,
  noScrollbar
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;

    const handleMouseDown = (e) => {
      setIsDragging(true);
      setStartX(e.pageX - slider.offsetLeft);
      setScrollLeft(slider.scrollLeft);
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; // scroll-fast
      slider.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleTouchStart = (e) => {
      setIsDragging(true);
      setStartX(e.touches[0].pageX - slider.offsetLeft);
      setScrollLeft(slider.scrollLeft);
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      const x = e.touches[0].pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; // scroll-fast
      slider.scrollLeft = scrollLeft - walk;
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    slider.addEventListener("mousedown", handleMouseDown);
    slider.addEventListener("mousemove", handleMouseMove);
    slider.addEventListener("mouseup", handleMouseUp);
    slider.addEventListener("mouseleave", handleMouseUp);
    slider.addEventListener("touchstart", handleTouchStart);
    slider.addEventListener("touchmove", handleTouchMove);
    slider.addEventListener("touchend", handleTouchEnd);

    return () => {
      slider.removeEventListener("mousedown", handleMouseDown);
      slider.removeEventListener("mousemove", handleMouseMove);
      slider.removeEventListener("mouseup", handleMouseUp);
      slider.removeEventListener("mouseleave", handleMouseUp);
      slider.removeEventListener("touchstart", handleTouchStart);
      slider.removeEventListener("touchmove", handleTouchMove);
      slider.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, startX, scrollLeft]);

  if (!fixedElement) {
    return (
      <div className={`w-full ${className || ""}`}>
        <div className="container">
          <ul
            ref={sliderRef}
            className={`${noScrollbar ? 'scroll_bar-invisible cursor-grab' : 'pb-6 contentSlider'} flex flex-row gap-4 overflow-x-auto select-none`}
          >
            {children}
          </ul>
        </div>
      </div>
    );
  } else if (fixedElement) {
    return (
      <div className={`relative w-full ${className || ""}`}>
        <div className="container">
          <ul
            ref={sliderRef}
            className="flex flex-row gap-4 scroll_bar-invisible overflow-x-scroll"
          >
            {React.Children.map(children, (child) => (
              <li className="flex-none">{child}</li>
            ))}
          </ul>

          <div
            className={`absolute right-0 bg-gradient-to-l ${
              disableGradient
                ? "from-white w-20 h-full top-0 pointer-events-none"
                : ""
            }`}
          />
        </div>
      </div>
    );
  }
};

export default ContentSlider;
