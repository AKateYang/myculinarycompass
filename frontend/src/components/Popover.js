import React from "react";
import "./css/popover.css"; // Assuming you have a separate CSS file for styles

const Popover = ({ children, className }) => {
  return <div className={`popover ${className}`}>{children}</div>;
};

export default Popover;
