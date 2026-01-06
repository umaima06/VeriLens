import React, { useState } from 'react';
import { MessageSquare, Send, User, Bot } from 'lucide-react';

const ChatPanel = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: "I've analyzed the content. I can help you verify specific claims or explain the bias further. What would you like to know?" }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), sender: 'user', text: input };
    setMessages([...messages, userMsg]);
    setInput('');
    
    // Simulate response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        sender: 'bot', 
        text: "Based on the linguistic patterns, the author uses emotive adjectives to sway opinion rather than presenting raw data." 
      }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
        <div>
          <h3 className="font-serif text-lg text-gray-900">Layer 3: Investigator</h3>
          <p className="text-xs text-gray-500">Interactive Analysis</p>
        </div>
        <MessageSquare size={18} className="text-gray-400"/>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-white custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-2 max-w-[90%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-green-900 text-white' : 'bg-gray-100 text-gray-600'}`}>
                 {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                msg.sender === 'user' ? 'bg-green-50 text-green-900 rounded-tr-none border border-green-100' : 'bg-gray-50 text-gray-700 rounded-tl-none border border-gray-100'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-100 bg-white">
        <div className="flex items-center gap-2 relative">
          <input 
            type="text" 
            placeholder="Ask about this article..." 
            className="flex-1 p-3 pr-12 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-900 focus:bg-white transition-all text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            className="absolute right-2 p-1.5 bg-green-900 text-white rounded-md hover:bg-green-800 transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;