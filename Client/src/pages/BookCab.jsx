import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Unav from '../components/Unav';

export default function BookCab() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [form, setForm] = useState({
    selectedPickupCity: '', selectedPickupState: '',
    selectedDropCity: '', pickupdate: '', pickuptime: '',
    dropdate: '', droptime: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8000/api/cars/${id}`).then(r => setCar(r.data));
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8000/api/bookings', {
        ...form,
        fare: car.price,
        cartype: car.cartype,
        carname: car.carname,
        carno: car.carno,
      }, { headers: { Authorization: `Bearer ${token}` } });
      setSuccess('Cab booked successfully! 🎉');
      setTimeout(() => navigate('/mybookings'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
    } finally { setLoading(false); }
  };

  if (!car) return <><Unav /><div className="loading"><div className="spinner" /></div></>;

  return (
    <>
      <Unav />
      <div className="page">
        <div className="form-page">
          <div className="dash-header">
            <h1>Book Your Cab</h1>
            <p>Fill in the details to complete your booking</p>
          </div>

          {/* Car info */}
          <div className="card" style={{ marginBottom: 24, display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ fontSize: '2.5rem' }}>🚗</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{car.carname}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{car.cartype} · Driver: {car.drivername}</div>
              <div style={{ color: '#f59e0b', fontWeight: 700 }}>₹{car.price}/km</div>
            </div>
          </div>

          {success && <div className="alert alert-success">{success}</div>}
          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit} className="card">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
              <div className="form-group">
                <label>Pickup City</label>
                <input name="selectedPickupCity" placeholder="e.g. Mumbai" value={form.selectedPickupCity} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Pickup State</label>
                <input name="selectedPickupState" placeholder="e.g. Maharashtra" value={form.selectedPickupState} onChange={handleChange} required />
              </div>
              <div className="form-group" style={{ gridColumn: '1/-1' }}>
                <label>Drop City</label>
                <input name="selectedDropCity" placeholder="e.g. Pune" value={form.selectedDropCity} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Pickup Date</label>
                <input type="date" name="pickupdate" value={form.pickupdate} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Pickup Time</label>
                <input type="time" name="pickuptime" value={form.pickuptime} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Drop Date</label>
                <input type="date" name="dropdate" value={form.dropdate} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Drop Time</label>
                <input type="time" name="droptime" value={form.droptime} onChange={handleChange} required />
              </div>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px', marginTop: 8 }} disabled={loading}>
              {loading ? 'Booking...' : '🚖 Confirm Booking'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
