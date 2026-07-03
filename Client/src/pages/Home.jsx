import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      {/* Navbar */}
      <div className="navbar">
        <span className="logo">🚖 Ucab</span>
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/register">
            <button className="btn btn-primary btn-sm">Get Started</button>
          </Link>
          <Link to="/admin/login" style={{ fontSize: '0.8rem' }}>Admin</Link>
        </nav>
      </div>

      {/* Hero */}
      <section className="hero">
        <div>
          <h1>Your Ride,<br /><span>Your Way</span></h1>
          <p>
            Book a cab in seconds. Choose your cab type, track your ride in real-time,
            and pay seamlessly. Ucab makes every journey stress-free.
          </p>
          <div className="hero-btns">
            <Link to="/register"><button className="btn btn-primary" style={{ fontSize: '1rem', padding: '14px 32px' }}>Book a Ride</button></Link>
            <Link to="/login"><button className="btn btn-secondary" style={{ fontSize: '1rem', padding: '14px 32px' }}>Sign In</button></Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <h2>Why Choose Ucab?</h2>
        <p className="features-sub">Everything you need for a comfortable journey</p>
        <div className="features-grid">
          {[
            { icon: '⚡', title: 'Instant Booking', desc: 'Book a cab in under 30 seconds, anytime, anywhere.' },
            { icon: '🗺️', title: 'Real-Time Tracking', desc: 'Track your driver on the map and know your ETA.' },
            { icon: '💳', title: 'Easy Payments', desc: 'Secure, cashless payments with saved methods.' },
            { icon: '🚗', title: 'Multiple Cab Types', desc: 'Choose from Mini, Sedan, or SUV based on your need.' },
            { icon: '📋', title: 'Booking History', desc: 'View all past rides, fares, and receipts easily.' },
            { icon: '🛡️', title: 'Safe & Reliable', desc: 'Verified drivers and rated vehicles for your safety.' },
          ].map(f => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer>© 2024 Ucab — Simple, Reliable, Stress-Free Travel</footer>
    </>
  );
}
