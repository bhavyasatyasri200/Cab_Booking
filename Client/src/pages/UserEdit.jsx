import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Anav from '../components/Anav';

export default function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    axios.get('http://localhost:8000/api/users/all', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => {
        const user = r.data.find(u => u._id === id);
        if (user) setForm({ name: user.name, email: user.email });
      });
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault(); setLoading(true);
    const token = localStorage.getItem('adminToken');
    await axios.put(`http://localhost:8000/api/users/${id}`, form, { headers: { Authorization: `Bearer ${token}` } });
    setSuccess('User updated!');
    setTimeout(() => navigate('/admin/users'), 1500);
    setLoading(false);
  };

  return (
    <>
      <Anav />
      <div className="page">
        <div className="form-page">
          <div className="dash-header">
            <h1>Edit User</h1>
            <p>Update user details</p>
          </div>
          {success && <div className="alert alert-success">{success}</div>}
          <form onSubmit={handleSubmit} className="card">
            <div className="form-group">
              <label>Name</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Changes'}</button>
              <button className="btn btn-secondary" type="button" onClick={() => navigate('/admin/users')}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
