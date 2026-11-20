
import React, { useState } from 'react';
import ReaderItem from './ReaderItem';
import Input from '../UI/Input';
import './ReaderList.css';

function ReaderList({ readers }) {
  const [search, setSearch] = useState('');

  const filteredReaders = readers.filter((reader) => {
    const searchValue = search.toLowerCase();

    return (
      reader.name.toLowerCase().includes(searchValue) ||
      reader.email.toLowerCase().includes(searchValue) ||
      reader.phone.includes(searchValue)
    );
  });

  return (
    <div className="reader-list-container">
      <div className="reader-search">
        <Input
          id="reader-search"
          label="Пошук читачів"
          placeholder="Введіть ім'я, email або номер телефону..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {filteredReaders.length > 0 ? (
        <div className="reader-list">
          {filteredReaders.map((reader) => (
            <ReaderItem key={reader.id} reader={reader} />
          ))}
        </div>
      ) : (
        <p className="no-readers">
          За вашим запитом читачів не знайдено.
        </p>
      )}
    </div>
  );
}

export default ReaderList;
