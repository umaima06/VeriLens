import React, { useState, useRef } from 'react';
import { Send, User, Bot } from 'lucide-react';
import { chatWithArticle } from "../services/api";

const ChatPanel = ({ articleText }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Ask anything about this article — bias, claims, context."
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

    } catch {
      setMessages(prev => [...prev, {
        id: Date.now() + 2,
        sender: 'bot',
        text: "Something went wrong. Try again."
      }]);
    }
  };

  return (
    <div className="h-[650px] flex flex-col bg-zinc-900/40 backdrop-blur-xl rounded-3xl border border-emerald-500/20 shadow-lg shadow-emerald-500/5">

      {/* Messages */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>

            <div className={`max-w-[85%] flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>

              <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                msg.sender === 'user'
                  ? 'bg-emerald-500 text-black'
                  : 'bg-zinc-800 text-emerald-400'
              }`}>
                {msg.sender === 'user' ? <User size={14}/> : <Bot size={14}/>}
              </div>

              <div className={`px-4 py-3 rounded-2xl text-sm ${
                msg.sender === 'user'
                  ? 'bg-emerald-500 text-black rounded-tr-none'
                  : 'bg-zinc-800 text-zinc-200 rounded-tl-none'
              }`}>
                {msg.text}
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-zinc-800 bg-zinc-950">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Ask about bias, claims, or context..."
            className="flex-1 p-3 bg-zinc-800 border border-zinc-700 rounded-xl text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />

          <button
            onClick={handleSend}
            className="p-3 bg-emerald-500 text-black rounded-xl hover:bg-emerald-400 transition"
          >
            <Send size={16}/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;