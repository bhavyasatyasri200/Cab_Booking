import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();

  const [email] = useState(location.state?.email || '');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleVerify = async e => {
    e.preventDefault();
    setError(''); setMessage(''); setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:8000/api/users/verify-otp', { email, otp });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setMessage('Verification successful! Redirecting...');
      setTimeout(() => navigate('/uhome'), 1200);
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError(''); setMessage(''); setResending(true);
    try {
      const { data } = await axios.post('http://localhost:8000/api/users/resend-otp', { email });
      setMessage(data.message || 'OTP resent to your email.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setResending(false);
    }
  };

  if (!email) {
    return (
      <div className="auth-wrapper">
        <div className="auth-card" style={{ textAlign: 'center' }}>
          <h2>No Email Provided</h2>
          <p>Please register or sign in first.</p>
          <Link to="/register"><button className="btn btn-primary">Go to Register</button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-logo">🚖 Ucab</div>
        <h2>Verify Email OTP</h2>
        <p>We sent a 6-digit code to <strong>{email}</strong></p>
        
        {error && <div className="alert alert-error">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        <form onSubmit={handleVerify}>
          <div className="form-group">
            <label>6-Digit OTP Code</label>
            <input
              type="text"
              placeholder="e.g. 123456"
              maxLength={6}
              value={otp}
              onChange={e => setOtp(e.target.value)}
              style={{ letterSpacing: '4px', fontSize: '1.2rem', textAlign: 'center' }}
              required
            />
          </div>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px' }} disabled={loading}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        <div style={{ marginTop: 20, textAlign: 'center', fontSize: '0.88rem' }}>
          <span>Didn't receive the code? </span>
          <button
            onClick={handleResend}
            disabled={resending}
            style={{ background: 'none', border: 'none', color: '#f59e0b', cursor: 'pointer', fontWeight: 600, textDecoration: 'underline' }}
          >
            {resending ? 'Resending...' : 'Resend OTP'}
          </button>
        </div>
      </div>
    </div>
  );
}
