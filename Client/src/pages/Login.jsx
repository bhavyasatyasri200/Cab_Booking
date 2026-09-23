import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import API_BASE_URL from '../config';

async function loginWithRetry(form) {
  try {
    return await axios.post(`${API_BASE_URL}/api/users/login`, form, { timeout: 60000 });
  } catch (err) {
    if (err.code === 'ECONNABORTED' || !err.response) {
      await new Promise(r => setTimeout(r, 2000));
      return await axios.post(`${API_BASE_URL}/api/users/login`, form, { timeout: 60000 });
    }
    throw err;
  }
}

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_BASE_URL}/`, { timeout: 60000 }).catch(() => {});
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const { data } = await loginWithRetry(form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/uhome');
    } catch (err) {
      if (err.response?.data?.requiresOtp) {
        navigate('/verify-otp', { state: { email: err.response.data.email } });
      } else {
        setError(err.response?.data?.message || 'Login failed. Please try again.');
      }
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-logo">🚖 Ucab</div>
        <h2>Welcome back</h2>
        <p>Sign in to your account to continue</p>
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
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px' }} disabled={loading}>
            {loading ? 'Please wait...' : 'Sign In'}
          </button>
        </form>
        <div className="auth-link">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}
