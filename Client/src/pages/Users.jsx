import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Anav from '../components/Anav';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUsers = () => {
    const token = localStorage.getItem('adminToken');
    axios.get('http://localhost:8000/api/users/all', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => { setUsers(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchUsers(); }, []);

  const deleteUser = async id => {
    if (!window.confirm('Delete this user?')) return;
    const token = localStorage.getItem('adminToken');
    await axios.delete(`http://localhost:8000/api/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchUsers();
  };

  return (
    <>
      <Anav />
      <div className="page">
        <div className="page-action-bar">
          <h2>All Users 👥</h2>
        </div>
        {loading ? <div className="loading"><div className="spinner" /></div> : (
          <div className="card table-wrap">
            <table>
              <thead>
                <tr><th>#</th><th>Name</th><th>Email</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={u._id}>
                    <td>{i + 1}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td style={{ display: 'flex', gap: 8 }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => navigate(`/admin/users/edit/${u._id}`)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => deleteUser(u._id)}>Delete</button>
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
