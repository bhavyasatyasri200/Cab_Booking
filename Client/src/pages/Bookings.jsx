import { useEffect, useState } from 'react';
import axios from 'axios';
import Anav from '../components/Anav';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [cleaning, setCleaning] = useState(false);

  const fetchBookings = () => {
    const token = localStorage.getItem('adminToken');
    axios.get('http://localhost:8000/api/bookings/all', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => { setBookings(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const token = localStorage.getItem('adminToken');
    setUpdatingId(id);
    axios.put(`http://localhost:8000/api/bookings/${id}/status`, { status: newStatus }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setBookings(prev => prev.map(b => b._id === id ? { ...b, status: res.data.status } : b));
        setUpdatingId(null);
      })
      .catch(err => {
        alert(err.response?.data?.message || err.message || 'Failed to update status');
        setUpdatingId(null);
      });
  };

  const handleDeleteBooking = (id) => {
    if (!window.confirm('Are you sure you want to delete this booking entry?')) return;
    const token = localStorage.getItem('adminToken');
    setUpdatingId(id);
    axios.delete(`http://localhost:8000/api/bookings/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        setBookings(prev => prev.filter(b => b._id !== id));
        setUpdatingId(null);
      })
      .catch(err => {
        alert(err.response?.data?.message || 'Failed to delete booking');
        setUpdatingId(null);
      });
  };

  const handleCleanDeletedUserBookings = () => {
    if (!window.confirm('Clear all bookings belonging to deleted users?')) return;
    const token = localStorage.getItem('adminToken');
    setCleaning(true);
    axios.delete('http://localhost:8000/api/bookings/orphaned', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        alert(res.data.message);
        fetchBookings();
      })
      .catch(err => {
        alert(err.response?.data?.message || 'Failed to clean bookings');
      })
      .finally(() => setCleaning(false));
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Confirmed': return 'badge-success';
      case 'Rejected': return 'badge-danger';
      default: return 'badge-warning';
    }
  };

  const hasDeletedUsers = bookings.some(b => !b.userid);

  return (
    <>
      <Anav />
      <div className="page">
        <div className="page-action-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2>All Bookings 📋</h2>
            <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
              {bookings.length} total | {bookings.filter(b => (b.status || 'Pending') === 'Pending').length} Pending Requests
            </span>
          </div>
          {hasDeletedUsers && (
            <button
              onClick={handleCleanDeletedUserBookings}
              className="btn btn-danger"
              disabled={cleaning}
              style={{ fontSize: '0.82rem', padding: '8px 14px' }}
            >
              {cleaning ? 'Cleaning...' : '🗑️ Delete All Deleted User Bookings'}
            </button>
          )}
        </div>

        {loading ? <div className="loading"><div className="spinner" /></div> : (
          <div className="card table-wrap">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Route</th>
                  <th>Cab</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, i) => {
                  const currentStatus = b.status || 'Pending';
                  const isDeletedUser = !b.userid;

                  return (
                    <tr key={b._id} style={isDeletedUser ? { background: 'rgba(239, 68, 68, 0.05)' } : {}}>
                      <td>{i + 1}</td>
                      <td>
                        {b.userid?.name || b.userName || 'Deleted User'}
                        {isDeletedUser && <span style={{ color: '#ef4444', fontSize: '0.72rem', marginLeft: '6px' }}>(Deleted)</span>}
                        <br />
                        <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>{b.userid?.email || b.userEmail || '—'}</span>
                      </td>
                      <td>{b.selectedPickupCity} → {b.selectedDropCity}</td>
                      <td>{b.carname}</td>
                      <td><span className="cab-badge">{b.cartype}</span></td>
                      <td>{b.pickupdate}</td>
                      <td>
                        <span className={`badge ${getStatusBadgeClass(currentStatus)}`}>
                          {currentStatus}
                        </span>
                      </td>
                      <td>
                        {updatingId === b._id ? (
                          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Processing...</span>
                        ) : (
                          <div style={{ display: 'flex', gap: '6px' }}>
                            {currentStatus !== 'Confirmed' && (
                              <button
                                onClick={() => handleStatusChange(b._id, 'Confirmed')}
                                className="btn btn-success btn-sm"
                                style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                              >
                                Approve
                              </button>
                            )}
                            {currentStatus !== 'Rejected' && (
                              <button
                                onClick={() => handleStatusChange(b._id, 'Rejected')}
                                className="btn btn-danger btn-sm"
                                style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                              >
                                Reject
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteBooking(b._id)}
                              className="btn btn-sm"
                              title="Delete Booking Entry"
                              style={{ padding: '4px 8px', fontSize: '0.75rem', background: '#334155', color: '#fff' }}
                            >
                              🗑️
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
