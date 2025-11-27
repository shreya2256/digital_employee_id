import React, { useState } from 'react';
import API from '../api';

export default function AdminLogin({ setToken }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [msg, setMsg] = useState('');

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/admin/login', form);
      setToken(res.data.token);
      setMsg('Logged in');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={submit}>
        <input placeholder="Username" value={form.username} onChange={e => setForm({...form, username:e.target.value})} required />
        <input placeholder="Password" type="password" value={form.password} onChange={e => setForm({...form, password:e.target.value})} required />
        <button className='login-btn' type="submit">Login</button>
      </form>
      {!!msg && <p>{msg}</p>}
    </div>
  );
}
