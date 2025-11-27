import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function CreateEmployee() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', department:'', designation:'', joiningDate:'' });
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const create = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/employee', form); // admin required - ensure token is set
      const emp = res.data;
      if (file) {
        const fd = new FormData();
        fd.append('file', file);
        await API.post(`/employee/upload/${emp._id}`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      setMsg('Employee created');
      navigate(`/employee/${emp._id}`);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error creating');
    }
  };

  return (
    <div>
      <h2>Create Employee (Admin)</h2>
      <form onSubmit={create}>
        <input placeholder="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        <input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
        <input placeholder="Department" value={form.department} onChange={e=>setForm({...form,department:e.target.value})} />
        <input placeholder="Designation" value={form.designation} onChange={e=>setForm({...form,designation:e.target.value})} />
        <label>Joining Date</label>
        <input type="date" value={form.joiningDate} onChange={e=>setForm({...form,joiningDate:e.target.value})} />
        <label>Photo (optional)</label>
        <input type="file" accept="image/*" onChange={e=>setFile(e.target.files[0])} />
        <button className='create-btn' type="submit">Create</button>
      </form>
      {!!msg && <p>{msg}</p>}
    </div>
  );
}
