
import React, { useState } from 'react';

import {
  loans as initialLoans,
  books as initialBooks,
  readers as initialReaders
} from '../../data/mockData';

import LoanItem from './LoanItem';
import LoanForm from './LoanForm';
import Input from '../UI/Input';
import Button from '../UI/Button';

import './LoanList.css';

function getSortTime(dateTime, fallbackDate) {
  if (dateTime) {
    const parsedTime = new Date(dateTime).getTime();

    if (!Number.isNaN(parsedTime)) {
      return parsedTime;
    }
  }

  if (!fallbackDate) {
    return -Infinity;
  }

  const dateString = String(fallbackDate).trim();

  const isoMatch = dateString.match(
    /^(\d{4})-(\d{2})-(\d{2})$/
  );

  if (isoMatch) {
    return new Date(
      Number(isoMatch[1]),
      Number(isoMatch[2]) - 1,
      Number(isoMatch[3])
    ).getTime();
  }

  const localMatch = dateString.match(
    /^(\d{2})[./](\d{2})[./](\d{4})$/
  );

  if (localMatch) {
    return new Date(
      Number(localMatch[3]),
      Number(localMatch[2]) - 1,
      Number(localMatch[1])
    ).getTime();
  }

  const parsedDate = new Date(dateString).getTime();

  return Number.isNaN(parsedDate) ? -Infinity : parsedDate;
}

function LoanList() {
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);

  const [loans, setLoans] = useState(() => {
    try {
      const savedLoans = localStorage.getItem('libraryLoans');
      return savedLoans ? JSON.parse(savedLoans) : initialLoans;
    } catch {
      return initialLoans;
    }
  });

  const [books, setBooks] = useState(() => {
    try {
      const savedBooks = localStorage.getItem('libraryBooks');
      return savedBooks ? JSON.parse(savedBooks) : initialBooks;
    } catch {
      return initialBooks;
    }
  });

  const [readers] = useState(() => {
    try {
      const savedReaders = localStorage.getItem('libraryReaders');
      return savedReaders ? JSON.parse(savedReaders) : initialReaders;
    } catch {
      return initialReaders;
    }
  });

  const handleAddLoan = (newLoan) => {
    const loanWithTimestamp = {
      ...newLoan,
      issuedAt: new Date().toISOString()
    };

    const updatedLoans = [loanWithTimestamp, ...loans];

    const updatedBooks = books.map((book) =>
      book.id === loanWithTimestamp.bookId
        ? { ...book, available: false }
        : book
    );

    try {
      localStorage.setItem(
        'libraryLoans',
        JSON.stringify(updatedLoans)
      );

      localStorage.setItem(
        'libraryBooks',
        JSON.stringify(updatedBooks)
      );

      setLoans(updatedLoans);
      setBooks(updatedBooks);

      window.dispatchEvent(new Event('booksUpdated'));
      window.dispatchEvent(new Event('loansUpdated'));

      setShowForm(false);
    } catch {
      alert('Не вдалося зберегти операцію.');
    }
  };

  const handleReturnLoan = (loanId) => {
    const loan = loans.find((item) => item.id === loanId);

    if (!loan || loan.status !== 'Видана') {
      return;
    }

    const today = new Date();

    const actualReturnDate = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, '0'),
      String(today.getDate()).padStart(2, '0')
    ].join('-');

    let returnNote = '';

    if (actualReturnDate === loan.returnDate) {
      returnNote = 'Книгу повернено вчасно';
    } else if (actualReturnDate < loan.returnDate) {
      returnNote = 'Книгу повернено раніше терміну';
    } else {
      returnNote = 'Книгу повернено пізніше терміну';
    }

    const updatedLoans = loans.map((item) =>
      item.id === loanId
        ? {
            ...item,
            status: 'Повернена',
            actualReturnDate,
            returnedAt: today.toISOString(),
            note: returnNote
          }
        : item
    );

    const updatedBooks = books.map((book) =>
      book.id === loan.bookId
        ? { ...book, available: true }
        : book
    );

    try {
      localStorage.setItem(
        'libraryLoans',
        JSON.stringify(updatedLoans)
      );

      localStorage.setItem(
        'libraryBooks',
        JSON.stringify(updatedBooks)
      );

      setLoans(updatedLoans);
      setBooks(updatedBooks);

      window.dispatchEvent(new Event('booksUpdated'));
      window.dispatchEvent(new Event('loansUpdated'));
    } catch {
      alert('Не вдалося зберегти повернення книги.');
    }
  };

  const operations = loans.flatMap((loan, index) => {
    const book = books.find(
      (item) => item.id === loan.bookId
    );

    const reader = readers.find(
      (item) => item.id === loan.readerId
    );

    if (!book || !reader) {
      return [];
    }

    const issueOperation = {
      id: `${loan.id}-issue`,
      loan,
      book,
      reader,
      type: 'Видача',
      date: loan.issueDate,
      sortTime: getSortTime(
        loan.issuedAt,
        loan.issueDate
      ),
      originalOrder: index
    };

    const result = [issueOperation];

    if (loan.actualReturnDate) {
      result.push({
        id: `${loan.id}-return`,
        loan,
        book,
        reader,
        type: 'Повернення',
        date: loan.actualReturnDate,
        sortTime: getSortTime(
          loan.returnedAt,
          loan.actualReturnDate
        ),
        originalOrder: index
      });
    }

    return result;
  });

  const filteredOperations = operations
    .filter((operation) => {
      const searchValue = search.toLowerCase();

      return (
        operation.book.title.toLowerCase().includes(searchValue) ||
        operation.reader.name.toLowerCase().includes(searchValue) ||
        operation.type.toLowerCase().includes(searchValue) ||
        operation.loan.status.toLowerCase().includes(searchValue)
      );
    })
    .sort((a, b) => {
      if (b.sortTime !== a.sortTime) {
        return b.sortTime - a.sortTime;
      }

      if (a.type !== b.type) {
        return a.type === 'Повернення' ? -1 : 1;
      }

      return a.originalOrder - b.originalOrder;
    });

  return (
    <div className="loan-list-container">
      <div className="loan-actions">
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Закрити форму' : 'Оформити видачу'}
        </Button>
      </div>

      {showForm && (
        <LoanForm
          books={books}
          readers={readers}
          onAdd={handleAddLoan}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="loan-search">
        <Input
          id="loan-search"
          label="Пошук операцій"
          placeholder="Введіть назву книги, ім'я читача або тип операції..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {filteredOperations.length > 0 ? (
        <div className="loan-list">
          {filteredOperations.map((operation) => (
            <LoanItem
              key={operation.id}
              loan={operation.loan}
              book={operation.book}
              reader={operation.reader}
              operationType={operation.type}
              operationDate={operation.date}
              onReturn={() =>
                handleReturnLoan(operation.loan.id)
              }
            />
          ))}
        </div>
      ) : (
        <p className="no-loans">
          За вашим запитом операцій не знайдено.
        </p>
      )}
    </div>
  );
}

export default LoanList;
