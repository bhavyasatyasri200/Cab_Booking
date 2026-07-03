import { Link } from 'react-router-dom';
import Unav from '../components/Unav';

export default function Uhome() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <>
      <Unav />
      <div className="page">
        <div className="dash-header">
          <h1>Welcome back, {user.name?.split(' ')[0] || 'Rider'} 👋</h1>
          <p>Ready for your next ride? Book a cab in seconds.</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🚖</div>
            <div className="stat-value">∞</div>
            <div className="stat-label">Rides Available</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📍</div>
            <div className="stat-value">Live</div>
            <div className="stat-label">Real-Time Tracking</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💳</div>
            <div className="stat-value">Auto</div>
            <div className="stat-label">Payment</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-value">4.9</div>
            <div className="stat-label">App Rating</div>
          </div>
        </div>

        <h2 style={{ marginBottom: 14, fontSize: '1.1rem', color: '#94a3b8' }}>Quick Actions</h2>
        <div className="quick-links">
          <Link to="/cabs" style={{ textDecoration: 'none' }}>
            <div className="quick-link">
              <div className="ql-icon">🚗</div>
              <span>Book a Cab</span>
            </div>
          </Link>
          <Link to="/mybookings" style={{ textDecoration: 'none' }}>
            <div className="quick-link">
              <div className="ql-icon">📋</div>
              <span>My Bookings</span>
            </div>
          </Link>
          <Link to="/track" style={{ textDecoration: 'none' }}>
            <div className="quick-link">
              <div className="ql-icon">🗺️</div>
              <span>Track Ride</span>
            </div>
          </Link>
          <Link to="/offers" style={{ textDecoration: 'none' }}>
            <div className="quick-link">
              <div className="ql-icon">🎁</div>
              <span>Offers</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
