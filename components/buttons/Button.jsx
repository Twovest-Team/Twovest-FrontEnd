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
    scroll, // To change the scroll behaviour when linking to other route
  } = props;

  const styles = {
    width: width || 'fit-content',
    height: height || '3.5rem',
    borderRadius: radius || '5px',
    justifyContent: !onlyIcon && justify || 'center',
    padding: padding ? padding : justify === 'space-between' ? '0 1.5rem' : '0 2.25rem',
  }


  const defaultStyles = `font-semibold transition-colors duration-200 whitespace-nowrap flex items-center gap-1.5`;

  const disabledStyles = disabled ? "opacity-50 pointer-events-none" : "";

  let mainStyles;

  switch (type) {
    default:
    case "primary":
      mainStyles = "bg-primary_main hover:bg-primary_dark text-white";
      break;

    case "info":
    mainStyles = "bg-info_main hover:bg-info_dark text-white";
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
        scroll={scroll}
        href={href}
        style={styles}
        className={`${className || ""} ${defaultStyles} ${mainStyles} ${disabledStyles}`}
        ariaLabel={ariaLabel}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <button
      style={styles}
        className={`${className || ""} ${defaultStyles} ${mainStyles} ${disabledStyles}`}
        ariaLabel={ariaLabel}
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
  children: PropTypes.any,
  scroll: PropTypes.bool
};

export default Button;
