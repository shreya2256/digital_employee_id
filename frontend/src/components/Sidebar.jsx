// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';


export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li><NavLink to="/dashboard" className={({isActive}) => isActive ? 'active' : ''}>Dashboard</NavLink></li>
          <li><NavLink to="/admin" className={({isActive}) => isActive ? 'active' : ''}>Admin Login</NavLink></li>
          <li><NavLink to="/create" className={({isActive}) => isActive ? 'active' : ''}>Create Employee</NavLink></li>
          <li><NavLink to="/search" className={({isActive}) => isActive ? 'active' : ''}>Search Employee</NavLink></li>
        </ul>
      </nav>
    </aside>
  );
}
