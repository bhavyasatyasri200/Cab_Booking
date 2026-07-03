import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Anav from '../components/Anav';

export default function Ahome() {
  const [counts, setCounts] = useState({ users: 0, bookings: 0, cars: 0 });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const h = { headers: { Authorization: `Bearer ${token}` } };
    Promise.all([
      axios.get('http://localhost:8000/api/users/all', h),
      axios.get('http://localhost:8000/api/bookings/all', h),
      axios.get('http://localhost:8000/api/cars'),
    ]).then(([u, b, c]) => setCounts({ users: u.data.length, bookings: b.data.length, cars: c.data.length }))
      .catch(() => {});
  }, []);

  const admin = JSON.parse(localStorage.getItem('admin') || '{}');

  return (
    <>
      <Anav />
      <div className="page">
        <div className="dash-header">
          <h1>Admin Dashboard 🛡️</h1>
          <p>Welcome back, {admin.name || 'Admin'}! Here's your overview.</p>
        </div>

        <div className="stats-grid">
          {[
            { icon: '👥', value: counts.users, label: 'Total Users' },
            { icon: '🚖', value: counts.bookings, label: 'Total Bookings' },
            { icon: '🚗', value: counts.cars, label: 'Total Cabs' },
            { icon: '💰', value: `₹${counts.bookings * 250}`, label: 'Est. Revenue' },
          ].map(s => (
            <div className="stat-card" key={s.label}>
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <h2 style={{ marginBottom: 14, fontSize: '1.1rem', color: '#94a3b8' }}>Quick Actions</h2>
        <div className="quick-links">
          <Link to="/admin/users" style={{ textDecoration: 'none' }}><div className="quick-link"><div className="ql-icon">👥</div><span>Manage Users</span></div></Link>
          <Link to="/admin/bookings" style={{ textDecoration: 'none' }}><div className="quick-link"><div className="ql-icon">📋</div><span>All Bookings</span></div></Link>
          <Link to="/admin/cabs" style={{ textDecoration: 'none' }}><div className="quick-link"><div className="ql-icon">🚗</div><span>Manage Cabs</span></div></Link>
          <Link to="/admin/cabs/add" style={{ textDecoration: 'none' }}><div className="quick-link"><div className="ql-icon">➕</div><span>Add New Cab</span></div></Link>
        </div>
      </div>
    </>
  );
}
