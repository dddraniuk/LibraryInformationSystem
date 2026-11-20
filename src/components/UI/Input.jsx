import React from 'react';
import './Input.css';

function Input({
  label,
  type = 'text',
  placeholder,
  value = '',
  onChange,
  id
}) {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;