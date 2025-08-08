import { useQuery, gql } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next'; 
import './ModelsPage.css';

const GET_MODELS_BY_BRAND = gql`
  query GetModels($id: ID!, $sortBy: sortBy!) {
    findBrandModels(id: $id, sortBy: $sortBy) {
      id
      name
      image
      type
    }
  }
`;

export default function ModelsPage() {
const { brandId } = useParams();
const navigate = useNavigate();

const brandNameMap = {
  1: 'Fender',
  2: 'Ibanez',
  3: 'Gibson',
  4: 'PRS',
  5: 'Martin',
  6: 'Yamaha',
  7: 'Gretsch',
  8: 'Epiphone',
  9: 'Jackson',
  10: 'Music Man',
  // Add more mappings as needed
};

const brandName = brandNameMap[brandId] || 'Unknown';
const normalizedBrandName = brandName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z]/gi, '');



  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);
  const { t, i18n } = useTranslation();


  const { data, loading, error } = useQuery(GET_MODELS_BY_BRAND, {
    variables: {
      id: brandId,
      sortBy: { field: "name", order: "DESC" }
    }
  });
  const loadMoreRef = useRef();

 // Infinite scroll trigger
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisibleCount((prev) => prev + 6);
      }
    }, { threshold: 1 });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, []);

  if (loading) return <p>{t('Loading models...')}</p>;
  if (error) return <p>{t('Error loading models')}</p>;



    const filteredModels = data.findBrandModels.filter((model) => {
    const matchesSearch = model.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter ? model.type.toUpperCase() === typeFilter.toUpperCase() : true;
    return matchesSearch && matchesType;
  });

const modelsToShow = filteredModels.slice(0, visibleCount);
   return (
    <div className="models-page">
 {/* Top Navigation */}
<header className="top-header">
  <div className="back-wrapper">
    <button className="back-button" onClick={() => navigate(-1)}>
     {t('← Back to Home')}
    </button>
  </div>

  <div className="model-logo-wrapper">
    <img src="/logo.png" alt="VibeStrings Logo" className="model-top-logo" />
    <span className="model-top-brand-text">VibeStrings</span>
  </div>
</header>


      {/* Hero Section */}
      <section className="brand-hero">
        <div className="brand-hero-text">
          <h1>
            {t('Play like a')} <span className="highlight">{t('Rock star')}</span>
          </h1>
          <p>
            {t('With a legacy dating back to the 1950s, {{brandId}} guitars blend expert craftsmanship and cutting-edge innovation to deliver guitars that inspire creativity and elevate your performance. Trusted by top artists worldwide, {{brandId}} guitars are built to play fast, sound bold, and stand out on any stage.', { brandId })}

          </p>
        </div>
   <div className="brand-logo-circle">
          <img
            src={`/logos/${normalizedBrandName}.png`}
            alt={`${brandName} logo`}
            className="brand-logo-img"
          />
        </div>


      </section>

      {/* Filter Section */}
      <div className="model-filters">
        <h2>{t('Check out the')} <span className="highlight">{t('Selection')}</span></h2>
        <div className="filters-controls">
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="">{t('Filter by type')}</option>
          <option value="ELECTRIC">{t('Electric')}</option>
          <option value="ACOUSTIC">{t('Acoustic')}</option>
          <option value="BASS">{t('Bass')}</option>
        </select>

          <input
            type="text"
            placeholder={t('Search by name')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Guitar Grid */}
      <div className="models-grid">
      {modelsToShow.map((model) => (
          <div
            key={model.id}
            className="model-card"
            onClick={() => navigate(`/guitar/${brandId}/${model.id}`)}
          >
            <img src={model.image} alt={model.name} />
            <p className="model-name">{model.name}</p>
            <p className="model-price">$2,999.00</p> {/* Placeholder - replace with model.price */}
          </div>
        ))}
      </div>

   {/* Infinite Scroll Trigger */}
      <div ref={loadMoreRef} style={{ height: "40px", marginTop: "20px" }} />

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