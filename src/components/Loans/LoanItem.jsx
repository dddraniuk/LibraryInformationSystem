
import React from 'react';
import Card from '../UI/Card';
import Badge from '../UI/Badge';
import Button from '../UI/Button';
import './LoanItem.css';

function LoanItem({
  loan,
  book,
  reader,
  onReturn,
  operationType = 'Видача',
  operationDate
}) {
  const isIssue = operationType === 'Видача';

  return (
    <Card>
      <div className="loan-item">
        <div className="loan-info">
          <h3>
            {isIssue ? 'Видача:' : 'Повернення:'} {book.title}
          </h3>

          <p>Читач: {reader.name}</p>
          <p>Дата операції: {operationDate}</p>

          {isIssue && (
            <>
              <p>Заплановане повернення: {loan.returnDate}</p>
              <p>Статус: {loan.status}</p>
            </>
          )}

          {!isIssue && (
            <p>Книгу успішно повернено до бібліотеки.</p>
          )}

          <p>Примітка: {loan.note}</p>

          {isIssue && loan.status === 'Видана' && (
            <Button onClick={onReturn}>
              Повернути книгу
            </Button>
          )}
        </div>

        <Badge variant={isIssue ? 'warning' : 'success'}>
          {operationType}
        </Badge>
      </div>
    </Card>
  );
}

export default LoanItem;
