// src/pages/EmployeeCard.jsx
import "../App.css";
import React, { useEffect, useState } from 'react';
import api from '../api';
import { useParams } from 'react-router-dom';

export default function EmployeeCard() {
  const { id } = useParams();
  const [emp, setEmp] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        // Try to fetch by mongo _id via admin list (protected)
        const res = await api.get('/employee');
        const found = res.data.find(e => e._id === id);
        setEmp(found || null);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  if (!emp) return <div><p>Employee not found or no permission to view.</p></div>;

  return (
    <div>
      <h2>ID Card</h2>
      <div className="id-card-box">
        <img className="id-photo" src={emp.photoUrl ? `${process.env.REACT_APP_API_URL.replace('/api','')}${emp.photoUrl}` : 'https://via.placeholder.com/120x140'} alt="photo" />
        <div className="id-details">
          <strong>{emp.name}</strong>
          <div className="muted">{emp.designation}</div>
          <div>Department: {emp.department}</div>
          <div>Employee ID: {emp.employeeId}</div>
          <div>Phone: {emp.phone}</div>
          <div>Email: {emp.email}</div>
          <div>Joining Date: {emp.joiningDate ? new Date(emp.joiningDate).toLocaleDateString() : '-'}</div>
        </div>
      </div>
    </div>
  );
}
