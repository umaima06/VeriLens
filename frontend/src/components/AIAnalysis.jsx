import React from 'react';
import { Sparkles } from 'lucide-react';

const AIAnalysis = ({ reasoning, rewrite }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-xl text-gray-900 flex items-center gap-2">
           Layer 2: AI Reasoning
        </h3>
        <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded-full tracking-wider flex items-center gap-1">
          <Sparkles size={12} /> GEMINI
        </span>
      </div>
      
      <div className="space-y-6">
        {/* Reasoning Block */}
        <div>
          <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Bias Detection</h4>
          <p className="text-gray-600 text-sm leading-7 bg-gray-50 p-5 rounded-lg border-l-4 border-purple-400">
            {reasoning}
          </p>
        </div>

        {/* Rewrite Block */}
        <div>
          <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Neutral Rewrite</h4>
          <div className="relative">
             <div className="absolute top-0 left-0 w-1 h-full bg-gray-200 rounded-full"></div>
             <p className="text-gray-600 text-sm leading-7 pl-6 italic">
              "{rewrite}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalysis;