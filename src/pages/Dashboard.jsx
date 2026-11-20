
import React, { useState, useEffect } from 'react';
import {
  LibraryBig,
  Users,
  BookCheck,
  BookMarked
} from 'lucide-react';

import {
  books as initialBooks,
  readers as initialReaders,
  loans as initialLoans
} from '../data/mockData';

import StatCard from '../components/Dashboard/StatCard';
import RecentActivity from '../components/Dashboard/RecentActivity';

import './Dashboard.css';

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

function Dashboard() {
  const [books, setBooks] = useState(() => {
    try {
      const savedBooks = localStorage.getItem('libraryBooks');
      return savedBooks ? JSON.parse(savedBooks) : initialBooks;
    } catch {
      return initialBooks;
    }
  });

  const [readers, setReaders] = useState(() => {
    try {
      const savedReaders = localStorage.getItem('libraryReaders');
      return savedReaders ? JSON.parse(savedReaders) : initialReaders;
    } catch {
      return initialReaders;
    }
  });

  const [loans, setLoans] = useState(() => {
    try {
      const savedLoans = localStorage.getItem('libraryLoans');
      return savedLoans ? JSON.parse(savedLoans) : initialLoans;
    } catch {
      return initialLoans;
    }
  });

  useEffect(() => {
    const updateBooks = () => {
      try {
        const savedBooks = localStorage.getItem('libraryBooks');
        setBooks(savedBooks ? JSON.parse(savedBooks) : initialBooks);
      } catch {
        setBooks(initialBooks);
      }
    };

    const updateReaders = () => {
      try {
        const savedReaders = localStorage.getItem('libraryReaders');
        setReaders(savedReaders ? JSON.parse(savedReaders) : initialReaders);
      } catch {
        setReaders(initialReaders);
      }
    };

    const updateLoans = () => {
      try {
        const savedLoans = localStorage.getItem('libraryLoans');
        setLoans(savedLoans ? JSON.parse(savedLoans) : initialLoans);
      } catch {
        setLoans(initialLoans);
      }
    };

    window.addEventListener('booksUpdated', updateBooks);
    window.addEventListener('readersUpdated', updateReaders);
    window.addEventListener('loansUpdated', updateLoans);

    return () => {
      window.removeEventListener('booksUpdated', updateBooks);
      window.removeEventListener('readersUpdated', updateReaders);
      window.removeEventListener('loansUpdated', updateLoans);
    };
  }, []);

  const availableBooks = books.filter(
    (book) => book.available
  ).length;

  const issuedBooks = loans.filter(
    (loan) => loan.status === 'Видана'
  ).length;

  const activities = loans.flatMap((loan, index) => {
    const book = books.find(
      (item) => item.id === loan.bookId
    );

    const reader = readers.find(
      (item) => item.id === loan.readerId
    );

    if (!book || !reader) {
      return [];
    }

    const issueActivity = {
      id: `${loan.id}-issue`,
      title: `Видача: ${book.title}`,
      description: `Читач: ${reader.name}`,
      date: loan.issueDate,
      type: 'Видача',
      sortTime: getSortTime(
        loan.issuedAt,
        loan.issueDate
      ),
      originalOrder: index
    };

    const result = [issueActivity];

    if (loan.status === 'Повернена' && loan.actualReturnDate) {
      const returnActivity = {
        id: `${loan.id}-return`,
        title: `Повернення: ${book.title}`,
        description: `Читач: ${reader.name}`,
        date: loan.actualReturnDate,
        type: 'Повернення',
        sortTime: getSortTime(
          loan.returnedAt,
          loan.actualReturnDate
        ),
        originalOrder: index
      };

      result.push(returnActivity);
    }

    return result;
  });

  const sortedActivities = activities.sort((a, b) => {
    if (b.sortTime !== a.sortTime) {
      return b.sortTime - a.sortTime;
    }

    if (a.type !== b.type) {
      return a.type === 'Повернення' ? -1 : 1;
    }

    return a.originalOrder - b.originalOrder;
  });

  return (
    <div className="dashboard">
      <div className="page-heading">
        <h2>Головна панель</h2>
        <p>Загальна інформація про роботу бібліотеки</p>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Усього книг"
          value={books.length}
          description="Книги в бібліотеці"
          icon={<LibraryBig size={24} />}
          color="blue"
        />

        <StatCard
          title="Читачі"
          value={readers.length}
          description="Зареєстровані читачі"
          icon={<Users size={24} />}
          color="green"
        />

        <StatCard
          title="Видані книги"
          value={issuedBooks}
          description="Очікують повернення"
          icon={<BookCheck size={24} />}
          color="orange"
        />

        <StatCard
          title="Доступні книги"
          value={availableBooks}
          description="Можна видати читачам"
          icon={<BookMarked size={24} />}
          color="purple"
        />
      </div>

      <div className="dashboard-activity">
        <RecentActivity activities={sortedActivities} />
      </div>
    </div>
  );
}

export default Dashboard;
