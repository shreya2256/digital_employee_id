import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import CreateEmployee from './components/CreateEmployee';
import SearchEmployee from './components/SearchEmployee';
import EmployeeCard from './components/EmployeeCard';
import { setAuthToken } from './api';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  if (token) setAuthToken(token);

  return (
    <Router>
      <div className="container">
        <header>
          <h1>Digital Employee ID System</h1>
          <nav>
            <Link to="/">Search</Link> |{' '}
            <Link to="/admin">Admin Login</Link> |{' '}
            <Link to="/create">Create Employee</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<SearchEmployee />} />
            <Route path="/admin" element={<AdminLogin setToken={t => { setToken(t); localStorage.setItem('token', t); setAuthToken(t); }} />} />
            <Route path="/create" element={<CreateEmployee />} />
            <Route path="/employee/:id" element={<EmployeeCard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
