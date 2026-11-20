import React from 'react';
import Card from '../UI/Card';
import Badge from '../UI/Badge';
import './BookItem.css';

function BookItem({ book }) {
  return (
    <Card>
      <div className="book-item">
        <div className="book-info">
          <h3>{book.title}</h3>

          <p>Автор: {book.author}</p>
          <p>Рік видання: {book.year}</p>
          <p>Категорія: {book.category}</p>
        </div>

        <Badge variant={book.available ? 'success' : 'warning'}>
          {book.available ? 'Доступна' : 'Видана'}
        </Badge>
      </div>
    </Card>
  );
}

export default BookItem;