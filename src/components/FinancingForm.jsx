import { useState } from 'react';
import './Modal.scss';

function SubmitPropertyModal({ onClose }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    property_address: '',
    purchase_price: '',
    rehab_budget: '',
    arv: '',
    property_type: '',
    timeline: '',
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
      await fetch('/api/submit-property', {
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
      <div className="modal modal--wide" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>&times;</button>
        {submitted ? (
          <div className="modal__success">
            <h2>Property Submitted!</h2>
            <p>Our underwriting team will have you approved within hours.</p>
            <button className="btn" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <h2 className="modal__title">Submit a Property</h2>
            <p className="modal__desc">
              Have a property you need funding on ASAP? Submit an application and our underwriting team will have you approved within hours.
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
              <input
                type="text"
                name="property_address"
                placeholder="Property Address"
                value={form.property_address}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="purchase_price"
                placeholder="Purchase Price"
                value={form.purchase_price}
                onChange={handleChange}
              />
              <input
                type="text"
                name="rehab_budget"
                placeholder="Estimated Rehab Budget"
                value={form.rehab_budget}
                onChange={handleChange}
              />
              <input
                type="text"
                name="arv"
                placeholder="After Repair Value (ARV)"
                value={form.arv}
                onChange={handleChange}
              />
              <select
                name="property_type"
                value={form.property_type}
                onChange={handleChange}
              >
                <option value="">Property Type</option>
                <option value="single_family">Single Family</option>
                <option value="multi_family">Multi Family</option>
                <option value="commercial">Commercial</option>
                <option value="land">Land</option>
                <option value="other">Other</option>
              </select>
              <select
                name="timeline"
                value={form.timeline}
                onChange={handleChange}
              >
                <option value="">Funding Timeline</option>
                <option value="asap">ASAP</option>
                <option value="1_2_weeks">1-2 Weeks</option>
                <option value="30_days">30 Days</option>
                <option value="flexible">Flexible</option>
              </select>
              <textarea
                name="message"
                placeholder="Additional Details"
                value={form.message}
                onChange={handleChange}
                rows={3}
              />
              <button type="submit" className="btn" disabled={loading}>
                {loading ? 'Submitting...' : 'Fund a Project'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default SubmitPropertyModal;
