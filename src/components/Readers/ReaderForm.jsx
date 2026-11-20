
import React, { useState } from 'react';
import Input from '../UI/Input';
import Button from '../UI/Button';
import './ReaderForm.css';

function ReaderForm({ onAdd, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [error, setError] = useState('');

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value
    }));

    setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim()
    ) {
      setError('Заповніть усі поля форми.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setError('Введіть коректну електронну пошту.');
      return;
    }

    const newReader = {
      id: Date.now(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim()
    };

    onAdd(newReader);

    setFormData({
      name: '',
      email: '',
      phone: ''
    });

    setError('');
  };

  return (
    <form className="reader-form" onSubmit={handleSubmit}>
      <h3>Додавання нового читача</h3>

      <Input
        id="reader-name"
        label="Повне ім'я"
        placeholder="Іван Петренко"
        value={formData.name}
        onChange={handleChange('name')}
      />

      <Input
        id="reader-email"
        label="Електронна пошта"
        type="email"
        placeholder="ivan@gmail.com"
        value={formData.email}
        onChange={handleChange('email')}
      />

      <Input
        id="reader-phone"
        label="Номер телефону"
        placeholder="+380501234567"
        value={formData.phone}
        onChange={handleChange('phone')}
      />

      {error && <p className="reader-form-error">{error}</p>}

      <div className="reader-form-actions">
        <Button type="submit">
          Додати читача
        </Button>

        <Button variant="secondary" onClick={onCancel}>
          Скасувати
        </Button>
      </div>
    </form>
  );
}

export default ReaderForm;
