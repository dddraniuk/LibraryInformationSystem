
import React from 'react';
import LoanList from '../components/Loans/LoanList';
import './Loans.css';

function Loans() {
  return (
    <div className="loans-page">
      <div className="page-heading">
        <h2>Видача та повернення</h2>
        <p>Облік виданих і повернених книг бібліотеки</p>
      </div>

      <LoanList />
    </div>
  );
}

export default Loans;
