import React from 'react';

const HeroSection = () => {
  return (
    <div className="flex-1 space-y-8 max-w-2xl py-12">
      <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Truth Engine</span>
      
      <h1 className="text-6xl md:text-7xl font-serif text-gray-900 leading-[1.1]">
        Analyze News. <br />
        <span className="italic">Discover Truth.</span>
      </h1>
      
      <p className="text-gray-600 text-lg max-w-lg leading-relaxed font-light">
        Leverage machine learning and AI to detect bias, emotional manipulation, and credibility issues in news articles. 
        Get objective analysis backed by three layers of intelligence.
      </p>

      {/* Feature Bullets */}
      <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-500 pt-4">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-900"></span> ML Sentiment Analysis
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-900"></span> AI Reasoning
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-900"></span> Interactive Chat
        </span>
      </div>
    </div>
  );
};

export default HeroSection;