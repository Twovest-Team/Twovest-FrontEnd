import React from "react";

const ContentSlider = ({
  children,
  disableGradient,
  className,
  fixedElement,
}) => {
  if (!fixedElement) {
    return (
      <div className={`relative w-full ${className || ""}`}>
        <div className="container">
          <ul className="flex flex-row gap-4 scroll_bar-invisible overflow-x-scroll">
            {children}
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
  } else if (fixedElement) {
    return (
      <div className={`relative w-full ${className || ""}`}>
        <div className="container">
          <ul className="flex flex-row gap-4 scroll_bar-invisible overflow-x-scroll">
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
