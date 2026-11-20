
import React, { useState } from 'react';
import BookItem from './BookItem';
import Input from '../UI/Input';
import './BookList.css';

function BookList({ books }) {
  const [search, setSearch] = useState('');

  const filteredBooks = books.filter((book) => {
    const searchValue = search.toLowerCase();

    return (
      book.title.toLowerCase().includes(searchValue) ||
      book.author.toLowerCase().includes(searchValue) ||
      book.category.toLowerCase().includes(searchValue)
    );
  });

  return (
    <div className="book-list-container">
      <div className="book-search">
        <Input
          id="book-search"
          label="Пошук книг"
          placeholder="Введіть назву, автора або категорію..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {filteredBooks.length > 0 ? (
        <div className="book-list">
          {filteredBooks.map((book) => (
            <BookItem key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <p className="no-books">
          За вашим запитом книг не знайдено.
        </p>
      )}
    </div>
  );
}

export default BookList;
