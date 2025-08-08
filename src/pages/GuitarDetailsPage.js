import { useQuery, gql } from '@apollo/client';
import { useParams,useNavigate  } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next'; 
import './style/GuitarDetailsPage.css'; 

const GET_GUITAR_DETAILS = gql`
  query GetGuitarDetails($brandId: ID!, $modelId: ID!) {
    findUniqueModel(brandId: $brandId, modelId: $modelId) {
      name
      description
      image
      specs {
        bodyWood
        neckWood
        fingerboardWood
        pickups
        tuners
        scaleLength
        bridge
      }
      musicians {
        name
        musicianImage
      }
    }
  }
`;


export default function GuitarDetailsPage() {
  const { modelId, brandId } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState('specs');
  const [visibleMusicians, setVisibleMusicians] = useState(2);
  const { t, i18n } = useTranslation();


  const { data, loading, error } = useQuery(GET_GUITAR_DETAILS, {
    variables: { brandId, modelId }
  });

  if (loading) return <p>{t('Loading guitar details...')}</p>;
  if (error) return <p>{t('Error loading guitar')}</p>;

  const model = data.findUniqueModel;

  return (
    <div className="guitar-page">
      {/* Back Button + Branding */}
      <header className="top-header">
      <div className="top-bar">
        <button onClick={() => navigate(-1)} className="back-btn">{t('← Back To List')}</button>
         </div>
        <div className="logo-bar">
          <img src="/logo.png" alt="VibeStrings Logo" className="model-top-logo" />
    <span className="brand-text">VibeStrings</span>
      </div>
      </header>
         {/* Hero Section */}
      <section className="guitar-hero">
        <div className="guitar-info">
          <h1 className="hero-title">
            {model.name.includes(' ') ? (
              <>
                {model.name.split(' ').slice(0, 2).join(' ')}<br />
                {model.name.split(' ').slice(2).join(' ')}
              </>
            ) : model.name}
          </h1>
        </div>
        <div className="guitar-image-curve">
          <img src={model.image} alt={model.name} />
        </div>
      </section>

      {/* Tabs */}
      <div className="guitar-tabs">
        <button
          className={tab === 'specs' ? 'active' : ''}
          onClick={() => setTab('specs')}
        >
         {t('Specification')}
        </button>
        <button
          className={tab === 'musicians' ? 'active' : ''}
          onClick={() => setTab('musicians')}
        >
         {t('Who plays it?')}
        </button>
      </div>

      {/* Content */}
      <div className="guitar-content">
        {tab === 'specs' && (
          <div className="specs-tab">
            <p className="description">{model.description}</p>
            <ul>
              <li>{t('Body Wood')}: {model.specs.bodyWood}</li>
              <li>{t('Neck Wood')}: {model.specs.neckWood}</li>
              <li>{t('Fingerboard')}: {model.specs.fingerboardWood}</li>
              <li>{t('Pickups')}: {model.specs.pickups}</li>
              <li>{t('Tuners')}: {model.specs.tuners}</li>
              <li>{t('Scale Length')}: {model.specs.scaleLength}</li>
              <li>{t('Bridge')}: {model.specs.bridge}</li>
            </ul>
          </div>
        )}

      {tab === 'musicians' && (
          <div className="musician-grid">
            {model.musicians.slice(0, visibleMusicians).map((musician, idx) => (
              <div className="musician-card" key={idx}>
                <img src={musician.musicianImage || "/default-avatar.png"} alt={musician.name} />
                <p>{musician.name}</p>
              </div>
            ))}
            {visibleMusicians < model.musicians.length && (
              <button onClick={() => setVisibleMusicians(prev => prev + 4)}>
                {t('Show More')}
              </button>
            )}
          </div>
        )}

      </div>
    {/* Footer Section */}
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

    {/* Product */}
    <div className="footer-col">
      <h4>{t('PRODUCT')}</h4>
      <ul>
        <li>{t('Terms')}</li>
        <li>{t('Privacy Policy')}</li>
        <li>{t('Copyright')}</li>
      </ul>
    </div>

    {/* Social */}
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