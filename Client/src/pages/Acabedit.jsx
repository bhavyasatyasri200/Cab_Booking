import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Anav from '../components/Anav';

export default function Acabedit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ drivername: '', carname: '', cartype: 'Mini', price: '', carno: '' });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8000/api/cars/${id}`)
      .then(r => setForm({ drivername: r.data.drivername, carname: r.data.carname, cartype: r.data.cartype, price: r.data.price, carno: r.data.carno }));
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault(); setLoading(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (image) fd.append('carImage', image);
    const token = localStorage.getItem('adminToken');
    await axios.put(`http://localhost:8000/api/cars/${id}`, fd, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } });
    setSuccess('Cab updated!');
    setTimeout(() => navigate('/admin/cabs'), 1500);
    setLoading(false);
  };

  return (
    <>
      <Anav />
      <div className="page">
        <div className="form-page">
          <div className="dash-header"><h1>Edit Cab</h1><p>Update cab details</p></div>
          {success && <div className="alert alert-success">{success}</div>}
          <form onSubmit={handleSubmit} className="card">
            {[['drivername', 'Driver Name', 'text'], ['carname', 'Car Name', 'text'], ['price', 'Price per km (₹)', 'number'], ['carno', 'Registration No.', 'text']].map(([name, label, type]) => (
              <div className="form-group" key={name}>
                <label>{label}</label>
                <input type={type} value={form[name]} onChange={e => setForm({ ...form, [name]: e.target.value })} required />
              </div>
            ))}
            <div className="form-group">
              <label>Car Type</label>
              <select value={form.cartype} onChange={e => setForm({ ...form, cartype: e.target.value })}>
                <option>Mini</option><option>Sedan</option><option>SUV</option>
              </select>
            </div>
            <div className="form-group">
              <label>Car Image (optional)</label>
              <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])}
                style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', color: 'var(--text)' }} />
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Changes'}</button>
              <button className="btn btn-secondary" type="button" onClick={() => navigate('/admin/cabs')}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
