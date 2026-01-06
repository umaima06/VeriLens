import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import SubmitArticleCard from './components/SubmitArticleCard';
import LayersSection from './components/LayersSection';
import AnalysisPage from './components/AnalysisPage';

// Home Page Component (Internal)
const Home = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
    <Header />
    <main className="flex-grow container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12 py-10">
      <HeroSection />
      <SubmitArticleCard />
    </main>
    <LayersSection />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<AnalysisPage />} />
      </Routes>
    </Router>
  );
}

export default App;