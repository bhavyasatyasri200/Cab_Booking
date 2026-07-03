import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Aregister() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:8000/api/admin/register', form);
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('admin', JSON.stringify(data.admin));
      navigate('/admin/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-logo">🛡️ Admin</div>
        <h2>Create Admin</h2>
        <p>Set up the admin account</p>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          {['name', 'email', 'password'].map(field => (
            <div className="form-group" key={field}>
              <label style={{ textTransform: 'capitalize' }}>{field}</label>
              <input type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                placeholder={field === 'name' ? 'Admin Name' : field === 'email' ? 'admin@ucab.com' : '••••••••'}
                value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })} required />
            </div>
          ))}
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px' }} disabled={loading}>
            {loading ? 'Creating...' : 'Create Admin Account'}
          </button>
        </form>
        <div className="auth-link">Already have admin account? <Link to="/admin/login">Login</Link></div>
      </div>
    </div>
  );
}
