import { useState } from 'react';
import './Modal.scss';

function PreQualifyModal({ onClose }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    experience_level: '',
    estimated_budget: '',
    markets: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/prequalify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>&times;</button>
        {submitted ? (
          <div className="modal__success">
            <h2>Application Received!</h2>
            <p>We'll have you prequalified within hours of your completed application.</p>
            <button className="btn" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <h2 className="modal__title">Pre Qualify</h2>
            <p className="modal__desc">
              Need to have funds available for future projects? Fill out the application and we will get you prequalified within hours of your completed application.
            </p>
            <form className="modal__form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
              />
              <select
                name="experience_level"
                value={form.experience_level}
                onChange={handleChange}
              >
                <option value="">Investment Experience</option>
                <option value="first_time">First Time Investor</option>
                <option value="1_5_deals">1-5 Deals Completed</option>
                <option value="5_plus">5+ Deals Completed</option>
              </select>
              <input
                type="text"
                name="estimated_budget"
                placeholder="Estimated Project Budget"
                value={form.estimated_budget}
                onChange={handleChange}
              />
              <input
                type="text"
                name="markets"
                placeholder="Target Markets / Locations"
                value={form.markets}
                onChange={handleChange}
              />
              <textarea
                name="message"
                placeholder="Additional Details"
                value={form.message}
                onChange={handleChange}
                rows={3}
              />
              <button type="submit" className="btn" disabled={loading}>
                {loading ? 'Submitting...' : 'Apply'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default PreQualifyModal;
