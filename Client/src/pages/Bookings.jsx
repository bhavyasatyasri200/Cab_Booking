import { useEffect, useState } from 'react';
import axios from 'axios';
import Anav from '../components/Anav';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    axios.get('http://localhost:8000/api/bookings/all', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => { setBookings(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <Anav />
      <div className="page">
        <div className="page-action-bar">
          <h2>All Bookings 📋</h2>
          <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{bookings.length} total</span>
        </div>
        {loading ? <div className="loading"><div className="spinner" /></div> : (
          <div className="card table-wrap">
            <table>
              <thead>
                <tr>
                  <th>#</th><th>User</th><th>Route</th><th>Cab</th>
                  <th>Type</th><th>Date</th><th>Fare</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, i) => (
                  <tr key={b._id}>
                    <td>{i + 1}</td>
                    <td>{b.userid?.name || '—'}<br /><span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>{b.userid?.email}</span></td>
                    <td>{b.selectedPickupCity} → {b.selectedDropCity}</td>
                    <td>{b.carname}</td>
                    <td><span className="cab-badge">{b.cartype}</span></td>
                    <td>{b.pickupdate}</td>
                    <td>₹{b.fare}/km</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
