import { useEffect, useState } from 'react';
import axios from 'axios';
import Unav from '../components/Unav';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8000/api/bookings/user', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => { setBookings(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

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
                <div className="booking-route">
                  <span>{b.selectedPickupCity}</span>
                  <span className="arrow">→</span>
                  <span>{b.selectedDropCity}</span>
                </div>
                <div>
                  <span className="cab-badge">{b.cartype}</span>
                </div>
                <div className="booking-meta">
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
