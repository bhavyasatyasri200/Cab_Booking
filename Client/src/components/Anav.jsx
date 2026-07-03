import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Anav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
    navigate('/admin/login');
  };

  const isActive = path => pathname === path ? 'active' : '';

  return (
    <div className="navbar">
      <Link to="/admin/home" className="logo">🚖 Ucab Admin</Link>
      <nav>
        <Link to="/admin/home" className={isActive('/admin/home')}>Dashboard</Link>
        <Link to="/admin/users" className={isActive('/admin/users')}>Users</Link>
        <Link to="/admin/bookings" className={isActive('/admin/bookings')}>Bookings</Link>
        <Link to="/admin/cabs" className={isActive('/admin/cabs')}>Cabs</Link>
        <Link to="/admin/cabs/add" className={isActive('/admin/cabs/add')}>
          <button className="btn btn-primary btn-sm">+ Add Cab</button>
        </Link>
        <button onClick={logout} className="btn btn-danger btn-sm">Logout</button>
      </nav>
    </div>
  );
}
