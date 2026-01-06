import React from 'react';
import Header from './Header';
import SentimentBreakdown from './SentimentBreakdown';
import AIAnalysis from './AIAnalysis';
import ChatPanel from './ChatPanel';

const AnalysisPage = () => {
  // Mock Data
  const mockData = {
    sentiment: "Negative",
    biasScore: 78,
    reasoning: "The article uses emotionally charged language ('disastrous', 'catastrophe') to frame the policy change negatively without providing balanced data. It heavily relies on anecdotal evidence rather than statistical proof.",
    rewrite: "The recent policy change has sparked debate. Opponents argue it may lead to economic challenges, while proponents suggest it is a necessary long-term adjustment. Early indicators show mixed results."
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-6 py-8 overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-6 h-[calc(100vh-140px)]">
          
          {/* Left Column: Static Analysis (Scrollable) */}
          <div className="lg:col-span-7 h-full overflow-y-auto custom-scrollbar pr-2 pb-10">
            <SentimentBreakdown 
              sentiment={mockData.sentiment} 
              biasScore={mockData.biasScore} 
            />
            <AIAnalysis 
              reasoning={mockData.reasoning} 
              rewrite={mockData.rewrite} 
            />
          </div>

          {/* Right Column: Chat (Fixed) */}
          <div className="lg:col-span-5 h-full pb-6">
            <ChatPanel />
          </div>

        </div>
      </main>
    </div>
  );
};

export default AnalysisPage;