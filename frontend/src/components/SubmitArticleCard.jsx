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
    if (inputValue.trim()) {
      navigate('/results', { state: { content: inputValue, type: activeTab } });
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl shadow-gray-200/50 border border-gray-100 w-full max-w-xl">
      <h2 className="text-3xl font-serif text-gray-900 mb-6">Submit Article</h2>
      
      {/* Custom Tabs */}
      <div className="flex bg-gray-50 p-1 rounded-lg mb-6 border border-gray-100">
        <button 
          onClick={() => setActiveTab('text')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all ${activeTab === 'text' ? 'bg-white shadow-sm text-gray-900 border border-gray-100' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <FileText size={16} /> Paste Text
        </button>
        <button 
          onClick={() => setActiveTab('url')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all ${activeTab === 'url' ? 'bg-white shadow-sm text-gray-900 border border-gray-100' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <LinkIcon size={16} /> URL
        </button>
      </div>

      {/* Input Area */}
      <div className="mb-6">
        {activeTab === 'text' ? (
          <textarea 
            className="w-full h-48 p-4 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-900/10 focus:border-green-900 transition-all resize-none text-gray-700 placeholder-gray-400 font-sans text-base leading-relaxed"
            placeholder="Paste your article text here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        ) : (
          <div className="space-y-3">
            <input 
              type="url" 
              className="w-full p-4 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-900/10 focus:border-green-900 transition-all text-gray-700 placeholder-gray-400 font-sans"
              placeholder="https://example.com/article"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 p-3 rounded border border-gray-100">
              <AlertCircle size={14} className="text-gray-400"/>
              <span>We'll extract and analyze the article content automatically</span>
            </div>
          </div>
        )}
      </div>

      <Button onClick={handleAnalyze} disabled={!inputValue.trim()}>
        Analyze Article
      </Button>
    </div>
  );
};

export default SubmitArticleCard;