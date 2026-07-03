import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Uhome from './pages/Uhome';
import Cabs from './pages/Cabs';
import BookCab from './pages/BookCab';
import MyBookings from './pages/MyBookings';
import TrackRide from './pages/TrackRide';
import Offers from './pages/Offers';
import Alogin from './pages/Alogin';
import Aregister from './pages/Aregister';
import Ahome from './pages/Ahome';
import Users from './pages/Users';
import UserEdit from './pages/UserEdit';
import Bookings from './pages/Bookings';
import Acabs from './pages/Acabs';
import Acabedit from './pages/Acabedit';
import Addcar from './pages/Addcar';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  return token ? children : <Navigate to="/admin/login" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User protected */}
        <Route path="/uhome" element={<PrivateRoute><Uhome /></PrivateRoute>} />
        <Route path="/cabs" element={<PrivateRoute><Cabs /></PrivateRoute>} />
        <Route path="/bookcab/:id" element={<PrivateRoute><BookCab /></PrivateRoute>} />
        <Route path="/mybookings" element={<PrivateRoute><MyBookings /></PrivateRoute>} />
        <Route path="/track" element={<PrivateRoute><TrackRide /></PrivateRoute>} />
        <Route path="/offers" element={<PrivateRoute><Offers /></PrivateRoute>} />

        {/* Admin */}
        <Route path="/admin/login" element={<Alogin />} />
        <Route path="/admin/register" element={<Aregister />} />
        <Route path="/admin/home" element={<AdminRoute><Ahome /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><Users /></AdminRoute>} />
        <Route path="/admin/users/edit/:id" element={<AdminRoute><UserEdit /></AdminRoute>} />
        <Route path="/admin/bookings" element={<AdminRoute><Bookings /></AdminRoute>} />
        <Route path="/admin/cabs" element={<AdminRoute><Acabs /></AdminRoute>} />
        <Route path="/admin/cabs/edit/:id" element={<AdminRoute><Acabedit /></AdminRoute>} />
        <Route path="/admin/cabs/add" element={<AdminRoute><Addcar /></AdminRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
