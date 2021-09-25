import React, { useState, useEffect, useContext } from 'react';
import './Toast.css';

const { GlobalContext } = require('../../context/GlobalState');

interface IProps {
  text: string;
  type?: 'success' | 'error';
  duration?: number;
}

const Toast: React.FC<IProps> = ({ text, type = 'error', duration = 4 }) => {
  const { cleanError } = useContext(GlobalContext);
  const [displayed, toggleDisplay] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      toggleDisplay(false);
      cleanError();
    }, duration * 1000);
  }, [displayed, duration, cleanError]);
  return (
    <div className='toast'>{displayed && <p className={type}>{text}</p>}</div>
  );
};

Toast.defaultProps = {
  text: 'Unknown Error occurred!',
  type: 'error',
  duration: 10,
};

export default Toast;
