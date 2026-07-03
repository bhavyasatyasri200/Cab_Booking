import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Anav from '../components/Anav';

export default function Acabs() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCars = () => {
    axios.get('http://localhost:8000/api/cars')
      .then(r => { setCars(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchCars(); }, []);

  const deleteCar = async id => {
    if (!window.confirm('Delete this cab?')) return;
    const token = localStorage.getItem('adminToken');
    await axios.delete(`http://localhost:8000/api/cars/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchCars();
  };

  return (
    <>
      <Anav />
      <div className="page">
        <div className="page-action-bar">
          <h2>Manage Cabs 🚗</h2>
          <button className="btn btn-primary" onClick={() => navigate('/admin/cabs/add')}>+ Add Cab</button>
        </div>
        {loading ? <div className="loading"><div className="spinner" /></div> : (
          <div className="card table-wrap">
            <table>
              <thead>
                <tr><th>#</th><th>Car Name</th><th>Driver</th><th>Type</th><th>Price/km</th><th>Reg No.</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {cars.map((c, i) => (
                  <tr key={c._id}>
                    <td>{i + 1}</td>
                    <td>{c.carname}</td>
                    <td>{c.drivername}</td>
                    <td><span className="cab-badge">{c.cartype}</span></td>
                    <td>₹{c.price}</td>
                    <td>{c.carno}</td>
                    <td style={{ display: 'flex', gap: 8 }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => navigate(`/admin/cabs/edit/${c._id}`)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => deleteCar(c._id)}>Delete</button>
                    </td>
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
