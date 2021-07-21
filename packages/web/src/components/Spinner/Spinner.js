import React from "react";

import "./Spinner.css";

const Spinner = ({ color }) => {
  const styles = color
    ? { color: "var(--bg-secondary)", background: "var(--bg-secondary)" }
    : {};
  return (
    <div className="spinner" style={styles}>
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
