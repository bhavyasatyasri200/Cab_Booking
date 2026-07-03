import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Alogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:8000/api/admin/login', form);
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('admin', JSON.stringify(data.admin));
      navigate('/admin/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-logo">🛡️ Admin</div>
        <h2>Admin Login</h2>
        <p>Access the Ucab control panel</p>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" placeholder="admin@ucab.com" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="••••••••" value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })} required />
          </div>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px' }} disabled={loading}>
            {loading ? 'Signing in...' : 'Admin Sign In'}
          </button>
        </form>
        <div className="auth-link">No account? <Link to="/admin/register">Register Admin</Link></div>
      </div>
    </div>
  );
}
