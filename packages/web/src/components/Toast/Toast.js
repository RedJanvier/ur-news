import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";

import "./Toast.css";

const Toast = ({ text, type, duration }) => {
  const { cleanError } = useContext(GlobalContext);
  const [displayed, toggleDisplay] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      toggleDisplay(false);
      cleanError();
    }, duration * 1000);
  }, [displayed, duration, cleanError]);
  return (
    <div className="toast">{displayed && <p className={type}>{text}</p>}</div>
  );
};

Toast.defaultProps = {
  text: "Unknown Error occurred!",
  type: "error",
  duration: 10,
};

export default Toast;
