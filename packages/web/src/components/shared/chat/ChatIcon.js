import React from "react";
import classes from "../../styles/ChatIcon.module.css";

const ChatIcon = ({ clickHandler }) => {
  return (
    <button onClick={clickHandler} className={classes.icon}>
      <i class="fa fa-comment"></i>
    </button>
  );
};

export default ChatIcon;
