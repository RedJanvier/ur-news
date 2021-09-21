import React from 'react';

const Backdrop = () => {
  return (
    <div
      style={{
        background: 'rgba(0,0,0,0.8)',
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    ></div>
  );
};

export default Backdrop;
