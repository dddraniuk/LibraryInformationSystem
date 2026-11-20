
import React, { useState } from 'react';
import { books as initialBooks } from '../data/mockData';

import BookList from '../components/Books/BookList';
import BookForm from '../components/Books/BookForm';
import Button from '../components/UI/Button';

import './Books.css';

function Books() {
  const [books, setBooks] = useState(() => {
    try {
      const savedBooks = localStorage.getItem('libraryBooks');

      return savedBooks
        ? JSON.parse(savedBooks)
        : initialBooks;
    } catch {
      return initialBooks;
    }
  });

  const [showForm, setShowForm] = useState(false);

  const handleAddBook = (newBook) => {
    const updatedBooks = [...books, newBook];

    try {
      localStorage.setItem(
        'libraryBooks',
        JSON.stringify(updatedBooks)
      );

      setBooks(updatedBooks);

      window.dispatchEvent(new Event('booksUpdated'));

      setShowForm(false);
    } catch (error) {
      alert('Не вдалося зберегти книгу.');
    }
  };

  return (
    <div className="books-page">
      <div className="page-heading">
        <h2>Книги</h2>
        <p>Перегляд книг, зареєстрованих у бібліотеці</p>
      </div>

      <div className="books-actions">
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Закрити форму' : 'Додати книгу'}
        </Button>
      </div>

      {showForm && (
        <BookForm
          onAdd={handleAddBook}
          onCancel={() => setShowForm(false)}
        />
      )}

      <BookList books={books} />
    </div>
  );
}

export default Books;
