import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Link as LinkIcon, AlertCircle } from 'lucide-react';
// Import Button from the same directory
import Button from './Button'; 

const SubmitArticleCard = () => {
  const [activeTab, setActiveTab] = useState('text'); 
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleAnalyze = () => {
    if (!inputValue.trim()) return;
    
    navigate("/analysis", {
      state: {
        content: inputValue,
        type: activeTab
      }
    });
  };

  return (
  <div className="relative bg-zinc-900/40 backdrop-blur-xl border border-emerald-500/20 p-10 rounded-3xl shadow-lg shadow-emerald-500/5 w-full max-w-xl">

    <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/20 blur-3xl rounded-full"></div>

    <div className="relative z-10">

      <h2 className="text-3xl font-bold mb-8">
        Analyze an Article
      </h2>

      {/* Tabs */}
      <div className="flex bg-zinc-800/60 p-1 rounded-xl mb-8">
        <button
          onClick={() => setActiveTab("text")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
            activeTab === "text"
              ? "bg-emerald-500 text-black"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          Paste Text
        </button>

        <button
          onClick={() => setActiveTab("url")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
            activeTab === "url"
              ? "bg-emerald-500 text-black"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          URL
        </button>
      </div>

      {/* Input */}
      {activeTab === "text" ? (
        <textarea
          className="w-full h-52 p-5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
          placeholder="Paste your article text here..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      ) : (
        <input
          type="url"
          className="w-full p-4 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="https://example.com/article"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      )}

      {/* CTA */}
      <button
        onClick={handleAnalyze}
        disabled={!inputValue.trim()}
        className="w-full mt-8 py-4 rounded-xl font-semibold transition bg-emerald-500 text-black hover:bg-emerald-400 disabled:opacity-40"
      >
        Analyze Article →
      </button>

    </div>
  </div>
);};

export default SubmitArticleCard;