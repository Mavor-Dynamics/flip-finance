import { useState, useEffect, useRef } from 'react';
import PreQualifyModal from './components/ContactModal';
import SubmitPropertyModal from './components/FinancingForm';
import './App.scss';

function App() {
  const [showPreQualify, setShowPreQualify] = useState(false);
  const [showSubmitProperty, setShowSubmitProperty] = useState(false);
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const mainSiteUrl = import.meta.env.VITE_MAIN_SITE_URL || 'https://wealth-by-real-estate-production.up.railway.app/#platforms';

  useEffect(() => {
    const handleScroll = () => {
      if (textRef.current) {
        const scrollY = window.scrollY;
        textRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      <section className="hero" ref={heroRef}>
        <div className="hero__top">
          <img src="/images/logo.webp" alt="Flip Finance" className="hero__logo" />
          <p className="hero__tagline">Private Capital Built for Seasoned Fix &amp; Flip Investors</p>
          <div className="hero__actions">
            <button className="btn" onClick={() => setShowPreQualify(true)}>
              Pre Qualify
            </button>
            <button className="btn btn--outline" onClick={() => setShowSubmitProperty(true)}>
              Submit a Property
            </button>
          </div>
        </div>

        <h1 className="hero__title" ref={textRef}>
          <span>Flip</span>
          <span>Finance</span>
        </h1>

        <img src="/images/mountain-banner.webp" alt="" className="hero__mountain" />
      </section>

      <section className="section section--money">
        <div className="section__image">
          <img src="/images/monkey.webp" alt="The Money" />
        </div>
        <div className="section__content">
          <h2 className="section__title">The <span className="gold">Money</span></h2>
          <p>
            Flip Finance is built for real estate investors who move fast.
          </p>
          <p>
            Unlike traditional hard money lenders that operate like banks — with rigid underwriting, committees, and slow approvals — Flip Finance provides private capital designed specifically for fix-and-flip investors.
          </p>
          <p>
            Our funding comes from private capital sources, which allows us to focus on the deal itself, not just paperwork and red tape. That means faster decisions, flexible structures, and funding that moves at the speed real estate investors actually operate.
          </p>
          <p>
            Where hard money lenders often feel like dealing with another bank, Flip Finance acts more like a capital partner — providing straightforward financing so you can secure opportunities, renovate quickly, and exit profitably.
          </p>
          <div className="section__taglines">
            <span>Less bureaucracy.</span>
            <span>More speed.</span>
            <span>Capital built for flippers.</span>
          </div>
          <button className="btn" onClick={() => setShowPreQualify(true)}>
            Apply
          </button>
        </div>
      </section>

      <section className="section section--investor">
        <div className="section__content">
          <h2 className="section__title">The <span className="gold">Investor</span></h2>
          <p>
            Flip Finance is built for real estate investors who move fast.
          </p>
          <p>
            Unlike traditional hard money lenders that operate like banks — with rigid underwriting, committees, and slow approvals — Flip Finance provides private capital designed specifically for fix-and-flip investors.
          </p>
          <p>
            Our funding comes from private capital sources, which allows us to focus on the deal itself, not just paperwork and red tape. That means faster decisions, flexible structures, and funding that moves at the speed real estate investors actually operate.
          </p>
          <p>
            Where hard money lenders often feel like dealing with another bank, Flip Finance acts more like a capital partner — providing straightforward financing so you can secure opportunities, renovate quickly, and exit profitably.
          </p>
          <div className="section__taglines">
            <span>Less bureaucracy.</span>
            <span>More speed.</span>
            <span>Capital built for flippers.</span>
          </div>
          <button className="btn" onClick={() => setShowSubmitProperty(true)}>
            Fund a Project
          </button>
        </div>
        <div className="section__image">
          <img src="/images/investor.webp" alt="The Investor" />
        </div>
      </section>

      <footer className="footer">
        <img src="/images/logo.webp" alt="Flip Finance" className="footer__logo" />
        <div className="footer__actions">
          <button className="btn" onClick={() => setShowPreQualify(true)}>Pre Qualify</button>
          <button className="btn btn--outline" onClick={() => setShowSubmitProperty(true)}>Submit a Property</button>
          <a href={mainSiteUrl} className="btn btn--outline">Visit Our Website</a>
        </div>
        <p className="footer__copy">&copy; {new Date().getFullYear()} Flip Finance. All rights reserved.</p>
      </footer>

      {showPreQualify && <PreQualifyModal onClose={() => setShowPreQualify(false)} />}
      {showSubmitProperty && <SubmitPropertyModal onClose={() => setShowSubmitProperty(false)} />}
    </div>
  );
}

export default App;
