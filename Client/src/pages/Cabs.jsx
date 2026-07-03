import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Unav from '../components/Unav';

export default function Cabs() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    axios.get('http://localhost:8000/api/cars')
      .then(r => { setCars(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const types = ['All', 'Mini', 'Sedan', 'SUV'];
  const filtered = filter === 'All' ? cars : cars.filter(c => c.cartype === filter);

  return (
    <>
      <Unav />
      <div className="page">
        <div className="page-action-bar">
          <h2>Available Cabs 🚖</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            {types.map(t => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`btn btn-sm ${filter === t ? 'btn-primary' : 'btn-secondary'}`}
              >{t}</button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="loading"><div className="spinner" /></div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🚗</div>
            <p>No cabs available right now. Check back soon!</p>
          </div>
        ) : (
          <div className="cabs-grid">
            {filtered.map(car => (
              <div className="cab-card" key={car._id}>
                {car.carImage ? (
                  <img src={`http://localhost:8000/uploads/${car.carImage}`} alt={car.carname} />
                ) : (
                  <div className="img-placeholder">🚗</div>
                )}
                <div className="cab-card-body">
                  <span className="cab-badge">{car.cartype}</span>
                  <h3>{car.carname}</h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: 4 }}>
                    Driver: {car.drivername}
                  </p>
                  <p style={{ color: '#94a3b8', fontSize: '0.82rem' }}>Reg: {car.carno}</p>
                  <div className="cab-card-footer">
                    <span className="cab-price">₹{car.price}/km</span>
                    <Link to={`/bookcab/${car._id}`}>
                      <button className="btn btn-primary btn-sm">Book Now</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
