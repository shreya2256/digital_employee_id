import React, { useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

export default function SearchEmployee() {
  const [name, setName] = useState('');
  const [results, setResults] = useState([]);
  const [msg, setMsg] = useState('');

  const search = async (e) => {
    e.preventDefault();
    try {
      const res = await API.get(`/employee/name/${encodeURIComponent(name)}`);
      setResults(res.data);
      if (res.data.length === 0) setMsg('No matches');
      else setMsg('');
    } catch (err) {
      setMsg('Error');
    }
  };

  return (
    <div>
      <h2>Find your ID card</h2>
      <form onSubmit={search}>
        <input placeholder="Enter full name (case-insensitive)" value={name} onChange={e=>setName(e.target.value)} required />
        <button  className="search-btn" type="submit">Search</button>
      </form>

      {msg && <p>{msg}</p>}
      <div style={{marginTop:12}}>
        {results.map(r => (
          <div key={r._id} className="employee-card">
            <img className="employee-photo" src={r.photoUrl ? `http://localhost:5000${r.photoUrl}` : 'https://via.placeholder.com/120x140'} alt="photo" />
            <div>
              <div><strong>{r.name}</strong></div>
              <div>{r.designation} — {r.department}</div>
              <div>Employee ID: {r.employeeId}</div>
              <div><Link to={`/employee/${r._id}`}>View ID</Link></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
