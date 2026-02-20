import React from 'react';
import { Sparkles } from 'lucide-react';

const AIAnalysis = ({ reasoning, rewrite }) => {
  return (
    <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2 tracking-wide">
           Layer 2: AI Reasoning
        </h3>
        <span className="px-3 py-1 bg-purple-500/10 text-purple-400 text-xs font-bold rounded-full tracking-wider flex items-center gap-1">
          <Sparkles size={12} /> GEMINI
        </span>
      </div>
      
      <div className="space-y-6">
        {/* Reasoning Block */}
        <div>
          <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Bias Detection</h4>
          <p className="text-zinc-300 text-sm leading-7 bg-zinc-950 p-6 rounded-xl border-l-4 border-purple-500">
            {reasoning}
          </p>
        </div>

        {/* Rewrite Block */}
        <div>
          <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Neutral Rewrite</h4>
          <div className="relative">
             <div className="absolute top-0 left-0 w-1 h-full bg-gray-200 rounded-full"></div>
             <p className="text-zinc-300 text-sm leading-7 pl-6 italic border-l-4 border-green-500">
              "{rewrite}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalysis;