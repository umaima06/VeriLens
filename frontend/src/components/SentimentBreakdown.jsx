import React from 'react';
import { AlertTriangle, CheckCircle, BarChart2 } from 'lucide-react';

const SentimentBreakdown = ({ sentiment, biasScore }) => {
  // ✅ FIX: convert sentiment OBJECT → readable label
  const sentimentLabel =
    sentiment?.compound < -0.05
      ? "Negative"
      : sentiment?.compound > 0.05
      ? "Positive"
      : "Neutral";

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-xl text-gray-900">Layer 1: Objective Signals</h3>
        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full tracking-wider">ML MODEL</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Sentiment */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Sentiment</p>
          <div className="flex items-center gap-2 text-gray-900">
            {sentimentLabel === "Negative" ? (
              <AlertTriangle className="text-red-500" size={20} />
            ) : (
            <CheckCircle className="text-green-500" size={20} />
            )}

<span className="text-lg font-bold">{sentimentLabel}</span>

          </div>
        </div>
        
        {/* Bias Score */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Bias Level</p>
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <span className="text-2xl font-bold text-gray-900">{biasScore}%</span>
              <span className="text-xs text-gray-500 mb-1">Probability</span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
              className="h-full bg-red-500 rounded-full"
              style={{ width: `${Math.min(Math.max(biasScore || 0, 0), 100)}%` }}
              ></div>
  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentBreakdown;