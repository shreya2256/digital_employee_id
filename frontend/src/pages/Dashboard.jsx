// src/pages/Dashboard.jsx
import "../App.css";
import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // fetch all employees (admin-protected)
  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const res = await api.get('/employee'); // protected route
        setEmployees(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to fetch employees. Make sure you are logged in as admin.');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      {loading && <p>Loading employees...</p>}
      {error && <p className="error">{error}</p>}

      <div className="dashboard-grid">
        {employees.map(emp => (
          <div className="dash-card" key={emp._id}>
            <img className="dash-photo" src={emp.photoUrl ? `${process.env.REACT_APP_API_URL.replace('/api','')}${emp.photoUrl}` : 'https://via.placeholder.com/120x140'} alt={emp.name} />
            <div className="dash-info">
              <h3>{emp.name}</h3>
              <p className="muted">{emp.designation} — {emp.department}</p>
              <p>Employee ID: <strong>{emp.employeeId}</strong></p>
              <Link to={`/employee/${emp._id}`} className="link">View ID</Link>
            </div>
          </div>
        ))}
      </div>

      {employees.length === 0 && !loading && !error && (
        <p>No employees found yet.</p>
      )}
    </div>
  );
}
