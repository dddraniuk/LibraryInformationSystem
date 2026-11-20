
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Footer from './components/Layout/Footer';

import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import Readers from './pages/Readers';
import Loans from './pages/Loans';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />

        <div className="app-body">
          <Sidebar />

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/books" element={<Books />} />
              <Route path="/readers" element={<Readers />} />
              <Route path="/loans" element={<Loans />} />
            </Routes>
          </main>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
