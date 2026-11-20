
import React, { useState } from 'react';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Card from '../UI/Card';
import './LoanForm.css';

function LoanForm({ books, readers, onAdd, onCancel }) {
  const [bookId, setBookId] = useState('');
  const [readerId, setReaderId] = useState('');
  const [issueDate, setIssueDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [returnDate, setReturnDate] = useState('');
  const [note, setNote] = useState('');

  const availableBooks = books.filter(
    (book) => book.available
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!bookId || !readerId || !issueDate || !returnDate) {
      alert('Заповніть усі обов’язкові поля.');
      return;
    }

    if (returnDate <= issueDate) {
      alert('Дата повернення повинна бути пізніше дати видачі.');
      return;
    }

    const newLoan = {
      id: Date.now(),
      bookId: Number(bookId),
      readerId: Number(readerId),
      issueDate,
      returnDate,
      actualReturnDate: null,
      status: 'Видана',
      note: note.trim() || 'Книга перебуває у читача'
    };

    onAdd(newLoan);
  };

  return (
    <Card>
      <form className="loan-form" onSubmit={handleSubmit}>
        <h3>Оформлення видачі книги</h3>

        <div className="loan-form-group">
          <label htmlFor="loan-reader">Читач</label>

          <select
            id="loan-reader"
            value={readerId}
            onChange={(event) => setReaderId(event.target.value)}
            required
          >
            <option value="">Оберіть читача</option>

            {readers.map((reader) => (
              <option key={reader.id} value={reader.id}>
                {reader.name}
              </option>
            ))}
          </select>
        </div>

        <div className="loan-form-group">
          <label htmlFor="loan-book">Книга</label>

          <select
            id="loan-book"
            value={bookId}
            onChange={(event) => setBookId(event.target.value)}
            required
          >
            <option value="">Оберіть книгу</option>

            {availableBooks.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title} — {book.author}
              </option>
            ))}
          </select>

          {availableBooks.length === 0 && (
            <p>Наразі немає доступних книг.</p>
          )}
        </div>

        <Input
          id="loan-issue-date"
          label="Дата видачі"
          inputType="date"
          value={issueDate}
          onChange={(event) => setIssueDate(event.target.value)}
          required
        />

        <Input
          id="loan-return-date"
          label="Дата запланованого повернення"
          inputType="date"
          value={returnDate}
          onChange={(event) => setReturnDate(event.target.value)}
          required
        />

        <Input
          id="loan-note"
          label="Примітка"
          placeholder="Додаткова інформація..."
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />

        <div className="loan-form-actions">
          <Button type="submit">
            Оформити видачу
          </Button>

          <Button type="button" variant="secondary" onClick={onCancel}>
            Скасувати
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default LoanForm;
