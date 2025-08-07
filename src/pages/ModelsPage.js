import { useQuery, gql } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
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
console.log("Raw brandId:", brandId);
console.log("Mapped brand name:", brandName);
console.log("Normalized brand name:", normalizedBrandName);


  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const { data, loading, error } = useQuery(GET_MODELS_BY_BRAND, {
    variables: {
      id: brandId,
      sortBy: { field: "name", order: "DESC" }
    }
  });

  console.log("Raw brandId:", brandId);
  console.log("Mapped brand name:", brandName);
  console.log("Normalized brand name:", normalizedBrandName);
  console.log("Fetched models:", data?.findBrandModels);

  if (loading) return <p>Loading models...</p>;
  if (error) return <p>Error loading models</p>;



  const filteredModels = data.findBrandModels.filter((model) => {
    const matchesSearch = model.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter ? model.type.toUpperCase() === typeFilter.toUpperCase() : true;
    return matchesSearch && matchesType;
  });

   return (
    <div className="models-page">
 {/* Top Navigation */}
<header className="top-header">
  <div className="back-wrapper">
    <button className="back-button" onClick={() => navigate(-1)}>
      ← Back to Home
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
            Play like a <span className="highlight">Rock star</span>
          </h1>
          <p>
            With a legacy dating back to the 1950s, {brandId} guitars blend expert craftsmanship and cutting-edge
            innovation to deliver guitars that inspire creativity and elevate your performance.
            Trusted by top artists worldwide, {brandId} guitars are built to play fast, sound bold, and stand out on any stage.
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
        <h2>Check out the <span className="highlight">Selection</span></h2>
        <div className="filters-controls">
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="">Filter by type</option>
          <option value="ELECTRIC">Electric</option>
          <option value="ACOUSTIC">Acoustic</option>
          <option value="BASS">Bass</option>
        </select>

          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Guitar Grid */}
      <div className="models-grid">
        {filteredModels.map((model) => (
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
      <h4>PAGES</h4>
      <ul>
        <li>Store</li>
        <li>Collections</li>
        <li>Support</li>
      </ul>
    </div>

    {/* Product */}
    <div className="footer-col">
      <h4>PRODUCT</h4>
      <ul>
        <li>Terms</li>
        <li>Privacy Policy</li>
        <li>Copyright</li>
      </ul>
    </div>

    {/* Social */}
<div className="footer-col">
  <h4>FOLLOW US</h4>
  <div className="footer-socials">
    <span><i className="fab fa-facebook-f"></i></span>
    <span><i className="fab fa-twitter"></i></span>
    <span><i className="fab fa-instagram"></i></span>
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