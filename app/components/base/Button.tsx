import React from "react";

const ReusableButton = ({
  type = "button",
  onClick,
  disabled = false,
  children,
  ariaLabel,
  tabIndex,
  ...props
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      tabIndex={tabIndex}
      {...props}
    >
      {children}
    </button>
  );
};

export default ReusableButton;
