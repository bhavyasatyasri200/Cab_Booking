import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import API_BASE_URL from '../config';

async function registerWithRetry(form) {
  try {
    return await axios.post(`${API_BASE_URL}/api/users/register`, form, { timeout: 60000 });
  } catch (err) {
    if (err.code === 'ECONNABORTED' || !err.response) {
      // Server was cold starting - wait 2 seconds then retry once
      await new Promise(r => setTimeout(r, 2000));
      return await axios.post(`${API_BASE_URL}/api/users/register`, form, { timeout: 60000 });
    }
    throw err;
  }
}

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  // Silently ping server on page load to start warming it up
  useEffect(() => {
    axios.get(`${API_BASE_URL}/`, { timeout: 60000 }).catch(() => {});
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError(''); setStatus(''); setLoading(true);
    try {
      setStatus('Creating your account...');
      const { data } = await registerWithRetry(form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/uhome');
    } catch (err) {
      setStatus('');
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-logo">🚖 Ucab</div>
        <h2>Create account</h2>
        <p>Join Ucab and start booking rides today</p>
        {status && (
          <div className="alert" style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 12, fontSize: 13, textAlign: 'center' }}>
            ⏳ {status}
          </div>
        )}
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" placeholder="Sarah Johnson" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="Min. 6 characters" value={form.password} onChange={handleChange} required minLength={6} />
          </div>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px' }} disabled={loading}>
            {loading ? 'Please wait...' : 'Create Account'}
          </button>
        </form>
        <div className="auth-link">
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
