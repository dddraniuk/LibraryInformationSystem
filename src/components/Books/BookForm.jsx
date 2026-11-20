
import React, { useState } from 'react';
import Input from '../UI/Input';
import Button from '../UI/Button';
import './BookForm.css';

function BookForm({ onAdd, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    year: '',
    category: ''
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
      !formData.title.trim() ||
      !formData.author.trim() ||
      !formData.year.trim() ||
      !formData.category.trim()
    ) {
      setError('Заповніть усі поля форми.');
      return;
    }

    const year = Number(formData.year);

    if (
      !Number.isInteger(year) ||
      year < 1 ||
      year > new Date().getFullYear()
    ) {
      setError('Введіть коректний рік видання.');
      return;
    }

    const newBook = {
      id: Date.now(),
      title: formData.title.trim(),
      author: formData.author.trim(),
      year,
      category: formData.category.trim(),
      available: true
    };

    onAdd(newBook);

    setFormData({
      title: '',
      author: '',
      year: '',
      category: ''
    });

    setError('');
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h3>Додавання нової книги</h3>

      <Input
        id="book-title"
        label="Назва книги"
        placeholder="Наприклад, Кобзар"
        value={formData.title}
        onChange={handleChange('title')}
      />

      <Input
        id="book-author"
        label="Автор"
        placeholder="Тарас Шевченко"
        value={formData.author}
        onChange={handleChange('author')}
      />

      <Input
        id="book-year"
        label="Рік видання"
        type="number"
        placeholder="1840"
        value={formData.year}
        onChange={handleChange('year')}
      />

      <Input
        id="book-category"
        label="Категорія"
        placeholder="Поезія"
        value={formData.category}
        onChange={handleChange('category')}
      />

      {error && <p className="book-form-error">{error}</p>}

      <div className="book-form-actions">
        <Button type="submit">
          Додати книгу
        </Button>

        <Button variant="secondary" onClick={onCancel}>
          Скасувати
        </Button>
      </div>
    </form>
  );
}

export default BookForm;
