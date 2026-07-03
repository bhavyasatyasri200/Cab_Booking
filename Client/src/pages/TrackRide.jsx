import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Unav from '../components/Unav';

export default function TrackRide() {
  const [latestBooking, setLatestBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [eta, setEta] = useState(15); // mock initial ETA in minutes
  const [status, setStatus] = useState('Driver is arriving'); // mock status
  const [progress, setProgress] = useState(10); // progress bar percentage

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8000/api/bookings/user', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => {
        if (r.data && r.data.length > 0) {
          setLatestBooking(r.data[0]); // get most recent booking
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Mock simulation of driver traveling
  useEffect(() => {
    if (!latestBooking) return;

    const interval = setInterval(() => {
      setEta(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setStatus('Arrived at your location! 🚖');
          setProgress(100);
          return 0;
        }
        const nextEta = prev - 1;
        if (nextEta === 10) setStatus('Driver is 2 km away');
        if (nextEta === 5) setStatus('Driver is turning the corner');
        setProgress(p => Math.min(p + 6, 95));
        return nextEta;
      });
    }, 10000); // speed up time for demonstration (every 10 seconds counts down ETA)

    return () => clearInterval(interval);
  }, [latestBooking]);

  const handleCancel = async () => {
    if (window.confirm('Are you sure you want to cancel this ride?')) {
      alert('Ride canceled successfully. Refund will be processed automatically.');
      setLatestBooking(null);
    }
  };

  return (
    <>
      <Unav />
      <div className="page">
        <div className="dash-header">
          <h1>Track Ride 🗺️</h1>
          <p>Real-time updates on your current journey</p>
        </div>

        {loading ? (
          <div className="loading"><div className="spinner" /></div>
        ) : !latestBooking ? (
          <div className="empty-state">
            <div className="empty-icon font-size-3">📍</div>
            <p style={{ marginTop: 12, marginBottom: 20 }}>No active rides to track right now.</p>
            <Link to="/cabs"><button className="btn btn-primary">Book a Ride</button></Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 380px', gap: 24, alignItems: 'start' }}>
            
            {/* Left: Map & Route Visualization */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="cab-badge" style={{ fontSize: '0.85rem' }}>{status}</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>ETA: <strong style={{ color: 'var(--primary)' }}>{eta} mins</strong></span>
              </div>
              
              {/* Modern CSS Simulated Map */}
              <div style={{
                height: 280, background: '#13131e', borderRadius: 'var(--radius)',
                border: '1px solid var(--border)', position: 'relative', overflow: 'hidden'
              }}>
                {/* Simulated Roads/Grid lines */}
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 12, background: '#252538', transform: 'translateY(-50%)' }} />
                <div style={{ position: 'absolute', left: '40%', top: 0, bottom: 0, width: 12, background: '#252538' }} />
                <div style={{ position: 'absolute', left: '80%', top: 0, bottom: 0, width: 12, background: '#252538' }} />
                
                {/* Source marker */}
                <div style={{
                  position: 'absolute', left: '10%', top: '50%', transform: 'translate(-50%, -50%)',
                  background: 'var(--success)', color: '#000', width: 28, height: 28, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyOrigin: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.78rem'
                }}>A</div>

                {/* Destination marker */}
                <div style={{
                  position: 'absolute', left: '90%', top: '50%', transform: 'translate(-50%, -50%)',
                  background: 'var(--primary)', color: '#000', width: 28, height: 28, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyOrigin: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.78rem'
                }}>B</div>

                {/* Simulated car moving along the road */}
                <div style={{
                  position: 'absolute', top: '50%', left: `${10 + (progress * 0.8)}%`, transform: 'translate(-50%, -50%)',
                  fontSize: '2rem', transition: 'left 1s ease-in-out'
                }}>
                  🚖
                </div>
              </div>

              {/* Progress bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 6 }}>
                  <span>Pickup: {latestBooking.selectedPickupCity}</span>
                  <span>Destination: {latestBooking.selectedDropCity}</span>
                </div>
                <div style={{ background: 'var(--bg3)', height: 8, borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: `${progress}%`, background: 'var(--primary)', height: '100%', transition: 'width 1s ease' }} />
                </div>
              </div>
            </div>

            {/* Right: Driver and Booking Info */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Ride Information</h3>
              <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 15 }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>VEHICLE</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: 4 }}>{latestBooking.carname}</div>
                <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', marginTop: 2 }}>{latestBooking.cartype} · {latestBooking.carno}</div>
              </div>

              <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 15 }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>FARE ESTIMATE</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, marginTop: 4 }}>₹{latestBooking.fare}/km</div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Tolling & Taxes included. Saved payment method will charge automatically.</span>
              </div>

              <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 15 }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>DRIVER PAIRED</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 6 }}>
                  <div style={{ fontSize: '2rem' }}>👨🏻‍✈️</div>
                  <div>
                    <div style={{ fontWeight: 600 }}>Parmeet Singh</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>⭐ 4.95 Rating · Verified</div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <button onClick={handleCancel} className="btn btn-danger" style={{ flex: 1, justifyContent: 'center' }}>Cancel Ride</button>
                <button onClick={() => alert('Feature coming soon! Call Driver at +91 98765 43210')} className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>Call Driver</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
