import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Anav from '../components/Anav';

export default function Addcar() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ drivername: '', carname: '', cartype: 'Mini', price: '', carno: '' });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async e => {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (image) fd.append('carImage', image);
      const token = localStorage.getItem('adminToken');
      await axios.post('http://localhost:8000/api/cars', fd, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });
      setSuccess('Cab added successfully! 🎉');
      setTimeout(() => navigate('/admin/cabs'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add cab');
    } finally { setLoading(false); }
  };

  return (
    <>
      <Anav />
      <div className="page">
        <div className="form-page">
          <div className="dash-header"><h1>Add New Cab 🚗</h1><p>Fill in the details to add a new cab to the fleet</p></div>
          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <form onSubmit={handleSubmit} className="card">
            {[['drivername', 'Driver Name', 'text', 'e.g. Ramesh Kumar'],
              ['carname', 'Car Name', 'text', 'e.g. Honda City'],
              ['price', 'Price per km (₹)', 'number', 'e.g. 12'],
              ['carno', 'Registration No.', 'text', 'e.g. MH12AB1234']
            ].map(([name, label, type, placeholder]) => (
              <div className="form-group" key={name}>
                <label>{label}</label>
                <input type={type} placeholder={placeholder} value={form[name]}
                  onChange={e => setForm({ ...form, [name]: e.target.value })} required />
              </div>
            ))}
            <div className="form-group">
              <label>Car Type</label>
              <select value={form.cartype} onChange={e => setForm({ ...form, cartype: e.target.value })}>
                <option>Mini</option><option>Sedan</option><option>SUV</option>
              </select>
            </div>
            <div className="form-group">
              <label>Car Image</label>
              <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])}
                style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', color: 'var(--text)' }} />
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <button className="btn btn-primary" type="submit" disabled={loading} style={{ flex: 1, justifyContent: 'center' }}>
                {loading ? 'Adding Cab...' : '+ Add Cab'}
              </button>
              <button className="btn btn-secondary" type="button" onClick={() => navigate('/admin/cabs')}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
