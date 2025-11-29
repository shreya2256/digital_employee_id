// src/pages/SearchEmployee.jsx
import "../App.css";
import React, { useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

export default function SearchEmployee() {
  const [name, setName] = useState('');
  const [results, setResults] = useState([]);
  const [msg, setMsg] = useState('');

  const search = async (e) => {
    e.preventDefault();
    try {
      const res = await api.get(`/employee/name/${encodeURIComponent(name)}`);
      setResults(res.data);
      setMsg('');
      if (res.data.length === 0) setMsg('No matches');
    } catch (err) {
      setMsg('Error searching');
    }
  };

  return (
    <div>
      <h2>Find your ID card</h2>
      <form onSubmit={search} className="form-inline">
        <input placeholder="Enter full name" value={name} onChange={e=>setName(e.target.value)} required />
        <button type="submit">Search</button>
      </form>

      <div className="results">
        {results.map(r => (
          <div className="employee-card" key={r._id}>
            <img className="employee-photo" src={r.photoUrl ? `${process.env.REACT_APP_API_URL.replace('/api','')}${r.photoUrl}` : 'https://via.placeholder.com/120x140'} alt="photo" />
            <div>
              <div><strong>{r.name}</strong></div>
              <div>{r.designation} — {r.department}</div>
              <div>Employee ID: {r.employeeId}</div>
              <div><Link to={`/employee/${r._id}`}>View ID</Link></div>
            </div>
          </div>
        ))}
      </div>

      {msg && <p className="muted">{msg}</p>}
    </div>
  );
}
