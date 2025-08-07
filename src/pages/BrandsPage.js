import './BrandsPage.css';
import { useQuery, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const GET_BRANDS = gql`
  query GetBrands {
    findAllBrands {
      id
      name
    }
  }
`;

export default function BrandsPage() {
  const { loading, error, data } = useQuery(GET_BRANDS);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading brands</p>;

  return (
    <div className="brands-page">
        {/* Logo Header */}
<header className="top-header">
  <img src="/logo.png" alt="VibeStrings Logo" className="top-logo" />
  <span className="top-brand-text">VibeStrings</span>
</header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>
            {t('Browse top quality')} <span className="highlight">{t('Guitars')}</span> {t('online')}
          </h1>
          <p>
            {t('Explore 60k+ limited collections of branded guitars online with VibeStrings.')}       
          </p>
        </div>
        <div className="hero-image-wrapper">
          <img className="hero-image" src="/guitar-hero.jpg" alt="Guitar on amp" />
        </div>
      </section>

      {/* Brand Section */}
      <section className="brands-grid-section">
        <h2>
          {t('Featuring the')} <span className="highlight">{t('Best Brands')}</span>
        </h2>
        <p>{t('Select your preferred brand and explore our collection')}</p>

       <div className="brands-grid">
  {data.findAllBrands.map((brand) => (
    <div
      key={brand.id}
      className="brand-logo-wrapper"
      onClick={() => navigate(`/models/${brand.id}`)}
    >
      <img
        src={brand.logoUrl || `/logos/${brand.name.toLowerCase()}.png`} // fallback
        alt={brand.name}
        className="brand-logo"
      />
    </div>
  ))}
</div>


      </section>

      {/* Benefits Section */}
      <section className="footer-section">
  <h2 className="footer-heading">
   {t('Why try')} <span className="highlight">{t('VibeStrings?')}</span>
  </h2>
  <div className="footer-columns">
    <div className="footer-col">
      <div className="footer-icon">🔲</div>
      <h3>{t('SMOOTH BROWSING')}</h3>
 <p>{t('Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.')}</p>
    </div>
    <div className="footer-col">
      <div className="footer-icon">🚚</div>
       <h3>{t('EASY DELIVERY')}</h3>
    <p>{t('Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.')}</p>
    </div>
    <div className="footer-col">
      <div className="footer-icon">💳</div>
  <h3>{t('SWIFT PAYMENTS')}</h3>
            <p>{t('Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.')}</p>
    </div>
  </div>
</section>
   {/* Mobile App Promo Section */}
      <section className="mobile-app">
        <div className="app-text">
          <h2>
           {t('Browse and buy your')} <span className="highlight">{t('favorite guitars')}</span> {t('with VibeStrings.')}
          </h2>
          <div className="app-buttons">
            <img src="/google-play.png" alt="Google Play" />
            <img src="/app-store.png" alt="App Store" />
          </div>
        </div>
        <div className="app-mockups">
          <img src="/app-mockup-1.png" alt="App Preview 1" />
        </div>
      </section>

     <section className="main-footer">
  <div className="footer-content">
    {/* Left Column */}
    <div className="footer-left">
      <div className="logo-text">
        <img src="/logo.png" alt="VibeStrings Logo" />
        <span>VibeStrings</span>
      </div>
      <div className="footer-contact">
        <p><i className="fa fa-envelope"></i> Enquiry@VibeStrings.com</p>
        <p><i className="fa fa-map-marker-alt"></i> San Francisco</p>
      </div>
    </div>

    {/* Pages */}
    <div className="footer-col">
            <h4>{t('PAGES')}</h4>
            <ul>
              <li>{t('Store')}</li>
              <li>{t('Collections')}</li>
              <li>{t('Support')}</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>{t('PRODUCT')}</h4>
            <ul>
              <li>{t('Terms')}</li>
              <li>{t('Privacy Policy')}</li>
              <li>{t('Copyright')}</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>{t('FOLLOW US')}</h4>
            <div className="footer-socials">
              <span><i className="fab fa-facebook-f"></i></span>
              <span><i className="fab fa-twitter"></i></span>
              <span><i className="fab fa-instagram"></i></span>
            </div>

            {/* ✅ Language Switcher */}
            <div className="language-switcher">
              <button onClick={() => i18n.changeLanguage('en')}>EN</button>
              <button onClick={() => i18n.changeLanguage('mk')}>MK</button>
              <button onClick={() => i18n.changeLanguage('sq')}>SQ</button>
            </div>
          </div>
        </div>

  {/* Bottom Line */}
  <div className="footer-bottom">
    © 2022 Copyright. VibeStrings
  </div>
</section>
    </div>
  );
}

