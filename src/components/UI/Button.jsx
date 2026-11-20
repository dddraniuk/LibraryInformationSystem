import React from 'react';
import './Button.css';

function Button({ children, onClick, type = 'button', variant = 'primary' }) {
  return (
    <button
      className={`button button-${variant}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;