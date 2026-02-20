import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import SubmitArticleCard from './components/SubmitArticleCard';
import LayersSection from './components/LayersSection';
import AnalysisPage from "./pages/AnalysisPage";

// Home Page Component (Internal)
const Home = () => (
  <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-zinc-900 text-white flex flex-col">

    <Header />

    <main className="flex-grow flex flex-col items-center justify-center px-6 text-center">

      <div className="max-w-3xl space-y-8">

        <span className="text-xs tracking-[0.3em] uppercase text-green-400">
          Truth Engine
        </span>

        <h1 className="text-6xl md:text-7xl font-bold leading-tight tracking-tight">
          Decode Media.
          <br />
          <span className="text-green-400 drop-shadow-[0_0_20px_rgba(34,197,94,0.4)]">Reveal Perspective.</span>
        </h1>

        <p >
          VeriLens analyzes news using machine learning and AI reasoning
          to uncover bias, emotional framing, and narrative gaps —
          so you can read intelligently.
        </p>

        <div className="pt-6">
          <SubmitArticleCard />
        </div>

      </div>

    </main>

  </div>
);
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analysis" element={<AnalysisPage />} />
      </Routes>
    </Router>
  );
}

export default App;
