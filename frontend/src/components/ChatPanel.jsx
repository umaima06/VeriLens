import React, { useState, useRef } from 'react';
import { MessageSquare, Send, User, Bot } from 'lucide-react';
import { chatWithArticle } from "../services/api";

const ChatPanel = ({ articleText }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "I've analyzed the content. I can help you verify claims or explain the bias further. What would you like to know?"
    }
  ]);
  const [input, setInput] = useState('');
  const sessionIdRef = useRef(
  Math.random().toString(36).substring(2) + Date.now().toString(36)
);

  const handleSend = async () => {
  if (!input.trim()) return;

  const userMsg = { id: Date.now(), sender: 'user', text: input };
  setMessages(prev => [...prev, userMsg]);
  setInput('');

  try {
    const res = await chatWithArticle({
      article_text: articleText,
      user_question: input,
      session_id: sessionIdRef.current
    });

    setMessages(prev => [...prev, {
      id: Date.now() + 1,
      sender: 'bot',
      text: res.answer || res.response || "I couldn't find a clear answer."
    }]);
  } catch (err) {
    setMessages(prev => [...prev, {
      id: Date.now() + 2,
      sender: 'bot',
      text: "Something went wrong while analyzing. Please try again."
    }]);
  }
};

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
        <div>
          <h3 className="font-serif text-lg">Layer 3: Investigator</h3>
          <p className="text-xs text-gray-500">Interactive Analysis</p>
        </div>
        <MessageSquare size={18} className="text-gray-400"/>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-2 max-w-[90%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                msg.sender === 'user'
                  ? 'bg-green-900 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {msg.sender === 'user' ? <User size={14}/> : <Bot size={14}/>}
              </div>
              <div className={`p-3 rounded-2xl text-sm border ${
                msg.sender === 'user'
                  ? 'bg-green-50 text-green-900 rounded-tr-none'
                  : 'bg-gray-50 text-gray-700 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white">
        <div className="flex items-center gap-2 relative">
          <input
            type="text"
            placeholder="Ask about this article..."
            className="flex-1 p-3 pr-12 bg-gray-50 border rounded-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="absolute right-2 p-1.5 bg-green-900 text-white rounded-md"
          >
            <Send size={16}/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
