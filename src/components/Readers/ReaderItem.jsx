
import React from 'react';
import Card from '../UI/Card';
import './ReaderItem.css';

function ReaderItem({ reader }) {
  return (
    <Card>
      <div className="reader-item">
        <div className="reader-avatar">
          {reader.name.charAt(0)}
        </div>

        <div className="reader-info">
          <h3>{reader.name}</h3>
          <p>Email: {reader.email}</p>
          <p>Телефон: {reader.phone}</p>
        </div>
      </div>
    </Card>
  );
}

export default ReaderItem;
