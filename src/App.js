import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BrandsPage from './pages/BrandsPage';
import ModelsPage from './pages/ModelsPage';
import GuitarDetailsPage from './pages/GuitarDetailsPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BrandsPage />} />
        <Route path="/models/:brandId" element={<ModelsPage />} />
 <Route path="/guitar/:brandId/:modelId" element={<GuitarDetailsPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
