import { useEffect, useState } from 'react';
import axios from 'axios';
import Unav from '../components/Unav';
import API_BASE_URL from '../config';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${API_BASE_URL}/api/bookings/user`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => { setBookings(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return <span className="badge badge-success">🟢 Confirmed</span>;
      case 'Rejected':
        return <span className="badge badge-danger">🔴 Rejected</span>;
      default:
        return <span className="badge badge-warning">🟡 Pending Approval</span>;
    }
  };

  return (
    <>
      <Unav />
      <div className="page">
        <div className="dash-header">
          <h1>My Bookings 📋</h1>
          <p>All your past and upcoming rides</p>
        </div>

        {loading ? (
          <div className="loading"><div className="spinner" /></div>
        ) : bookings.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <p>No bookings yet. Book your first cab!</p>
          </div>
        ) : (
          <div className="bookings-grid">
            {bookings.map(b => (
              <div className="booking-card" key={b._id}>
                <div className="booking-route" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span>{b.selectedPickupCity}</span>
                    <span className="arrow">→</span>
                    <span>{b.selectedDropCity}</span>
                  </div>
                  <div>
                    {getStatusBadge(b.status || 'Pending')}
                  </div>
                </div>
                <div style={{ marginTop: 8 }}>
                  <span className="cab-badge">{b.cartype}</span>
                </div>
                <div className="booking-meta" style={{ marginTop: 12 }}>
                  <span>🚗 {b.carname}</span>
                  <span>🔢 {b.carno}</span>
                  <span>📅 {b.pickupdate} at {b.pickuptime}</span>
                  <span>💰 ₹{b.fare}/km</span>
                  <span>🗓️ Booked: {b.bookeddate}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
