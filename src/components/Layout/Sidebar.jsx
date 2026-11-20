
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Users, Repeat } from 'lucide-react';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-title">
        Меню
      </div>

      <nav className="sidebar-nav">
        <Link
          to="/"
          className={`sidebar-link ${location.pathname === '/' ? 'active' : ''}`}
        >
          <Home size={20} />
          Головна
        </Link>

        <Link
          to="/books"
          className={`sidebar-link ${location.pathname === '/books' ? 'active' : ''}`}
        >
          <BookOpen size={20} />
          Книги
        </Link>

        <Link
          to="/readers"
          className={`sidebar-link ${location.pathname === '/readers' ? 'active' : ''}`}
        >
          <Users size={20} />
          Читачі
        </Link>

        <Link
          to="/loans"
          className={`sidebar-link ${location.pathname === '/loans' ? 'active' : ''}`}
        >
          <Repeat size={20} />
          Видача та повернення
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
