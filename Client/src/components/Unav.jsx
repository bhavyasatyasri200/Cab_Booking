import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Unav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const isActive = path => pathname === path ? 'active' : '';

  return (
    <div className="navbar">
      <Link to="/uhome" className="logo">🚖 Ucab</Link>
      <nav>
        <Link to="/uhome" className={isActive('/uhome')}>Home</Link>
        <Link to="/cabs" className={isActive('/cabs')}>Cabs</Link>
        <Link to="/mybookings" className={isActive('/mybookings')}>My Bookings</Link>
        <span style={{ color: '#94a3b8', fontSize: '0.85rem', marginLeft: 4 }}>Hi, {user.name?.split(' ')[0] || 'User'}</span>
        <button onClick={logout} className="btn btn-danger btn-sm">Logout</button>
      </nav>
    </div>
  );
}
