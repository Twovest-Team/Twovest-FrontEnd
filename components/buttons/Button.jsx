import Link from "next/link";
import React from "react";
import PropTypes from "prop-types";

const Button = (props) => {
  const {
    type, // Defines button type
    href, // Will turn the button into a link
    onClick, // Onclick function
    ariaLabel,
    disabled,
    className, // For additional, custom styling
    width,
    height,
    radius,
    justify,
    padding,
    onlyIcon,
    children, // For button content, including icons
  } = props;

  const defaultStyles = `font-semibold transition-colors duration-200 whitespace-nowrap flex items-center gap-1.5`;

  const buttonWidth = width ? "w-" + width : "w-fit";

  const borderRadius = radius ? "rounded-" + radius : "rounded";

  const buttonHeight = onlyIcon
    ? "aspect-square"
    : height
      ? "h-" + height
      : "h-14";

  const justifyContent =
    !onlyIcon &&
    `justify-${
      justify === "between" ? "between px-6" : (justify || "center")
    }`;

  const buttonPadding = padding ? 'px-' + padding : 'px-9'

  const disabledStyles = disabled ? "opacity-50 pointer-events-none" : "";

  let mainStyles;

  switch (type) {
    default:
    case "primary":
      mainStyles = "bg-primary_main hover:bg-primary_dark text-white";
      break;

    case "black":
      mainStyles = "bg-black hover:bg-dark_gray text-white";
      break;

    case "black-outlined":
      mainStyles =
        "border-2 border-black hover:bg-black text-black hover:text-white";
      break;

    case "white-outlined":
      mainStyles =
        "border-2 border-white hover:bg-white text-white hover:text-black";
      break;

    case "white":
      mainStyles = "bg-white hover:bg-grey_opacity_50 text-black";
      break;

    case "grey":
      mainStyles = "bg-grey_opacity_50 hover:bg-grey text-secondary";
      break;

    case "error":
      mainStyles = "bg-error_main hover:bg-error_dark text-white";
      break;

    case "warning":
      mainStyles = "bg-warning_main hover:bg-warning_dark text-white";
      break;
  }

  if (href) {
    return (
      <Link
        href={href}
        className={`${
          className || ""
        } ${defaultStyles} ${mainStyles} ${buttonWidth} ${borderRadius} ${buttonHeight} ${justifyContent} ${buttonPadding} ${disabledStyles}`}
        aria-label={ariaLabel}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <button
        className={`${
          className || ""
        } ${defaultStyles} ${mainStyles} ${buttonWidth} ${borderRadius} ${buttonHeight} ${justifyContent} ${buttonPadding} ${disabledStyles}`}
        aria-label={ariaLabel}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
};

Button.propTypes = {
  type: PropTypes.oneOf([
    "primary",
    "black",
    "black-outlined",
    "white",
    "white-outlined",
    "grey",
    "error",
    "warning",
  ]).isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  radius: PropTypes.string,
  justify: PropTypes.string,
  padding: PropTypes.string,
  onlyIcon: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
};

export default Button;
