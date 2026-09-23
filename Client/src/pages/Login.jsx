import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import API_BASE_URL from '../config';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [wakingUp, setWakingUp] = useState(true);
  const navigate = useNavigate();

  // Ping server on page load to wake Render from sleep
  useEffect(() => {
    axios.get(`${API_BASE_URL}/`, { timeout: 60000 })
      .catch(() => {})
      .finally(() => setWakingUp(false));
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/users/login`, form, { timeout: 30000 });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/uhome');
    } catch (err) {
      if (err.response?.data?.requiresOtp) {
        navigate('/verify-otp', { state: { email: err.response.data.email } });
      } else {
        setError(err.response?.data?.message || 'Login failed');
      }
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-logo">🚖 Ucab</div>
        <h2>Welcome back</h2>
        <p>Sign in to your account to continue</p>
        {wakingUp && (
          <div className="alert" style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 12, fontSize: 13, textAlign: 'center' }}>
            ⏳ Connecting to server, please wait...
          </div>
        )}
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="••••••••" value={form.password} onChange={handleChange} required />
          </div>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px' }} disabled={loading || wakingUp}>
            {wakingUp ? 'Connecting...' : loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className="auth-link">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}
