
import React, { useState } from 'react';
import { readers as initialReaders } from '../data/mockData';

import ReaderList from '../components/Readers/ReaderList';
import ReaderForm from '../components/Readers/ReaderForm';
import Button from '../components/UI/Button';

import './Readers.css';

function Readers() {
  const [readers, setReaders] = useState(() => {
    try {
      const savedReaders = localStorage.getItem('libraryReaders');

      return savedReaders
        ? JSON.parse(savedReaders)
        : initialReaders;
    } catch {
      return initialReaders;
    }
  });

  const [showForm, setShowForm] = useState(false);

  const handleAddReader = (newReader) => {
  const updatedReaders = [...readers, newReader];

  try {
    localStorage.setItem(
      'libraryReaders',
      JSON.stringify(updatedReaders)
    );

    setReaders(updatedReaders);
    setShowForm(false);

    window.dispatchEvent(new Event('readersUpdated'));
  } catch (error) {
    alert('Не вдалося зберегти читача.');
  }
};

  return (
    <div className="readers-page">
      <div className="page-heading">
        <h2>Читачі</h2>
        <p>Перегляд та додавання користувачів бібліотеки</p>
      </div>

      <div className="readers-actions">
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Закрити форму' : 'Додати читача'}
        </Button>
      </div>

      {showForm && (
        <ReaderForm
          onAdd={handleAddReader}
          onCancel={() => setShowForm(false)}
        />
      )}

      <ReaderList readers={readers} />
    </div>
  );
}

export default Readers;
