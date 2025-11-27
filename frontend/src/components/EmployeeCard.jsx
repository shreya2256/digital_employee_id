import React, { useEffect, useState } from 'react';
import API from '../api';
import { useParams } from 'react-router-dom';

export default function EmployeeCard() {
  const { id } = useParams();
  const [emp, setEmp] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        // first try getting by _id via admin list (we didn't create an endpoint for getByDbId -- use id route by employeeId or modify)
        // But in our flow, CreateEmployee navigates to /employee/:_id and backend returned emp._id; so we can call admin list (or add endpoint). Simpler: call GET /api/employee to find by _id (but protected)
        // To avoid needing admin token, front-end fetches /api/employee (admin protected) would fail. So here we will call the id endpoint by employeeId if we have it; if not, call all and find _id (we'll attempt both).
        // We'll first try to fetch by ID path param as employeeId:
        let res = null;
        if (id.startsWith('EMP')) {
          res = await API.get(`/employee/id/${id}`);
          setEmp(res.data);
        } else {
          // if id is Mongo _id, try public search by name? But we can call /api/employee (admin) if token set.
          // Simpler: call admin-protected list if token exists
          res = await API.get(`/employee`); // requires admin token
          const found = res.data.find(e => e._id === id);
          setEmp(found || null);
        }
      } catch (err) {
        // fallback: no permission or not found
        console.error(err);
      }
    })();
  }, [id]);

  if (!emp) return <div><p>Employee not found or no permission (if viewing after create, navigate should have employeeId). Try searching by name from home.</p></div>;

  return (
    <div>
      <h2>ID Card</h2>
      <div className="employee-card">
        <img className="employee-photo" src={emp.photoUrl ? `http://localhost:5000${emp.photoUrl}` : 'https://via.placeholder.com/120x140'} alt="photo" />
        <div>
          <h3>{emp.name}</h3>
          <div><strong>{emp.designation}</strong></div>
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
