import React, { MouseEventHandler } from 'react';
import './Modal.css';

const Modal: React.FC<{
  title: string;
  onCancel?: MouseEventHandler<HTMLButtonElement>;
  onConfirm?: MouseEventHandler<HTMLButtonElement>;
  confirmText?: string;
  confirmable?: boolean;
  cancelable?: boolean;
  disabled?: boolean;
}> = ({
  children,
  title,
  onCancel,
  onConfirm,
  confirmText = 'Accept',
  confirmable = false,
  cancelable = false,
}) => {
  return (
    <div className='modal'>
      <div className='modal__header'>
        <h2>{title}</h2>
      </div>
      <div className='modal__body'>{children}</div>
      <div className='modal__footer'>
        {!confirmable && !cancelable && <p>&copy; All Rights Reserved</p>}
        {confirmable && (
          <button className='btn' onClick={onConfirm}>
            {confirmText}
          </button>
        )}
        {cancelable && (
          <button
            className='btn'
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              color: '#111',
            }}
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
