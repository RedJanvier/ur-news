import React from 'react';
import './Spinner.css';

const Spinner: React.FC<{ color?: boolean }> = ({ color }) => {
  const styles = color
    ? { color: 'var(--secondary-color)', background: 'var(--secondary-color)' }
    : {};
  return (
    <div className='spinner' style={styles}>
      <div className='lds-ellipsis'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
