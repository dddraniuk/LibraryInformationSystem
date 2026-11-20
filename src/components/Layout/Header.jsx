import React from 'react';
import { Library } from 'lucide-react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <Library size={30} />
        <h1>Бібліотечна інформаційна система</h1>
      </div>

      <div className="header-user">
        <span className="user-name">Адміністратор</span>
        <div className="user-avatar">А</div>
      </div>
    </header>
  );
}

export default Header;