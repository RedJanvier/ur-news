import React from 'react';
import classes from '../styles/Tag.module.css';

const Tag = ({ type, children }) => (
  <span className={`${classes.tag} ${classes[type]}`}>{children}</span>
);

export default Tag;
