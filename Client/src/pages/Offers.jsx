import { useState } from 'react';
import Unav from '../components/Unav';

export default function Offers() {
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState('');
  const [donated, setDonated] = useState(false);
  const [cart, setCart] = useState([]);

  // Offers list
  const activeOffers = [
    { code: 'UCAB50', discount: '50% Off', desc: 'Save 50% on your next 3 rides. Max discount up to ₹100.', validity: 'Valid till 31st July' },
    { code: 'GREENRIDE', discount: 'Free Tree Planting', desc: 'We will plant a sapling on your behalf for this ride.', validity: 'Always Active' },
    { code: 'WIFI24', discount: 'Free Car WiFi', desc: 'Get password to hyper-fast in-cab WiFi for the entire ride.', validity: 'Today only' }
  ];

  // Refreshment list
  const refreshments = [
    { id: 1, name: 'Chilled Water Bottle (1L)', price: 20, emoji: '💧' },
    { id: 2, name: 'Diet Coke (Can)', price: 40, emoji: '🥤' },
    { id: 3, name: 'Peanut Crunchy Pack', price: 30, emoji: '🥜' },
    { id: 4, name: 'Sour Gummy Worms', price: 50, emoji: '🍬' }
  ];

  const applyPromo = () => {
    const found = activeOffers.find(o => o.code.toUpperCase() === promoInput.trim().toUpperCase());
    if (found) {
      setPromoMessage(`Success! Code ${found.code} applied. Discount: ${found.discount}.`);
    } else {
      setPromoMessage('Invalid promo code. Please check and try again.');
    }
  };

  const handleDonate = () => {
    setDonated(true);
    alert('Thank you! ₹10 will be added to your current booking as a donation to Green Roads Fund.');
  };

  const addRefreshment = (item) => {
    setCart([...cart, item]);
    alert(`${item.name} added to your cab! Driver will keep it ready.`);
  };

  const totalCartValue = cart.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <>
      <Unav />
      <div className="page">
        <div className="dash-header">
          <h1>Offers & Ride Perks 🎁</h1>
          <p>Discounts, green donations, and in-cab refreshments</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          
          {/* Left Column: Promo Codes & Donation */}
          <div style={{ display: 'flex', flexType: 'column', flexDirection: 'column', gap: 24 }}>
            {/* Promo Codes */}
            <div className="card">
              <h3 style={{ marginBottom: 12, fontSize: '1.1rem', fontWeight: 700 }}>Promo Codes & Discounts</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 16 }}>Apply a code to automatically reduce your cab fare:</p>
              
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <input
                  placeholder="Enter Promo Code e.g. UCAB50"
                  value={promoInput}
                  onChange={e => setPromoInput(e.target.value)}
                  style={{
                    flex: 1, background: 'var(--bg3)', border: '1px solid var(--border)',
                    borderRadius: 8, padding: '10px 14px', color: 'var(--text)', outline: 'none'
                  }}
                />
                <button onClick={applyPromo} className="btn btn-primary btn-sm">Apply</button>
              </div>

              {promoMessage && (
                <div className={`alert ${promoMessage.includes('Success') ? 'alert-success' : 'alert-error'}`} style={{ marginBottom: 20 }}>
                  {promoMessage}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {activeOffers.map(o => (
                  <div key={o.code} style={{ padding: 12, border: '1px dashed var(--border)', borderRadius: 8, background: 'rgba(255,255,255,0.01)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ color: 'var(--primary)' }}>{o.code}</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{o.validity}</span>
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '0.88rem', margin: '4px 0' }}>{o.discount}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{o.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Donation */}
            <div className="card">
              <h3 style={{ marginBottom: 12, fontSize: '1.1rem', fontWeight: 700 }}>🌱 Go Green Donation</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: 16 }}>
                Ucab partners with CleanSky to offset 100% of cab emissions. Help us build a greener environment by contributing a small amount.
              </p>
              {donated ? (
                <div className="alert alert-success">Thank you for donating to green initiatives! 🌳</div>
              ) : (
                <button onClick={handleDonate} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                  Donate ₹10 to Green Roads Fund
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Refreshments */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>🥤 In-Cab Refreshments</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 4 }}>
                Buy items to enjoy during your ride. Driver will stock them in the back seat before picking you up. Include them in your final bill.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
              {refreshments.map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12, background: 'var(--bg3)', borderRadius: 8, border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: '1.8rem' }}>{item.emoji}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.name}</div>
                      <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', marginTop: 2 }}>₹{item.price}</div>
                    </div>
                  </div>
                  <button onClick={() => addRefreshment(item)} className="btn btn-secondary btn-sm" style={{ border: '1px solid var(--primary)' }}>+ Add</button>
                </div>
              ))}
            </div>

            {cart.length > 0 && (
              <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.95rem' }}>
                  <span>Refreshments Total ({cart.length} items):</span>
                  <span style={{ color: 'var(--primary)' }}>₹{totalCartValue}</span>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4 }}>
                  This amount will be added to the final ride fare summary.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
