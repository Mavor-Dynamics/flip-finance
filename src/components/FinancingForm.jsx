import { useState } from 'react';
import './Modal.scss';

function FinancingForm({ onClose }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    property_address: '',
    loan_amount: '',
    property_type: '',
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
      await fetch('/api/financing', {
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
            <h2>Application Received!</h2>
            <p>Our team will review your information and get back to you shortly.</p>
            <button className="btn" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <h2 className="modal__title">Apply for Financing</h2>
            <p className="modal__desc">Fill out the details below and our team will follow up.</p>
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
              />
              <input
                type="text"
                name="loan_amount"
                placeholder="Desired Loan Amount"
                value={form.loan_amount}
                onChange={handleChange}
              />
              <select
                name="property_type"
                value={form.property_type}
                onChange={handleChange}
              >
                <option value="">Select Property Type</option>
                <option value="single_family">Single Family</option>
                <option value="multi_family">Multi Family</option>
                <option value="commercial">Commercial</option>
                <option value="land">Land</option>
                <option value="other">Other</option>
              </select>
              <textarea
                name="message"
                placeholder="Additional Details"
                value={form.message}
                onChange={handleChange}
                rows={4}
              />
              <button type="submit" className="btn" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default FinancingForm;
