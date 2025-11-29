// src/pages/AdminLogin.jsx
import "../App.css";
import React, { useState } from 'react';
import api, { setAuthToken } from '../api';

export default function AdminLogin() {
  const [form, setForm] = useState({ username:'admin', password:'' });
  const [msg, setMsg] = useState('');

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/admin/login', form);
      const token = res.data.token;
      localStorage.setItem('token', token);
      setAuthToken(token);
      setMsg('Logged in');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form className="form-card" onSubmit={submit}>
        <input placeholder="Username" type="text" value={form.username} onChange={e=>setForm({...form,username:e.target.value})} required />
        <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />
        <button type="submit">Login</button>
        {msg && <p className="msg">{msg}</p>}
      </form>
    </div>
  );
}
