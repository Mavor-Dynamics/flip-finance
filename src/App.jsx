import { useState } from 'react';
import ContactModal from './components/ContactModal';
import FinancingForm from './components/FinancingForm';
import './App.scss';

function App() {
  const [showContact, setShowContact] = useState(false);
  const [showFinancing, setShowFinancing] = useState(false);
  const mainSiteUrl = import.meta.env.VITE_MAIN_SITE_URL || '#';

  return (
    <div className="app">
      <header className="header">
        <div className="header__logo">Flip Finance</div>
        <nav className="header__nav">
          <a href={mainSiteUrl} className="header__link">Back to Main Site</a>
        </nav>
      </header>

      <main className="hero">
        <h1 className="hero__title">Real Estate Financing<br />Made Simple</h1>
        <p className="hero__subtitle">
          Get the funding you need to close your next deal. Fast approvals, competitive rates, flexible terms.
        </p>
        <div className="hero__actions">
          <button className="btn" onClick={() => setShowFinancing(true)}>
            Apply for Financing
          </button>
          <button className="btn btn--outline" onClick={() => setShowContact(true)}>
            Get in Touch
          </button>
          <a href={mainSiteUrl} className="btn btn--outline">
            Visit Our Website
          </a>
        </div>
      </main>

      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
      {showFinancing && <FinancingForm onClose={() => setShowFinancing(false)} />}
    </div>
  );
}

export default App;
