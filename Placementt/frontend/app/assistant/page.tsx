'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, RefreshCcw, Sparkles } from 'lucide-react';

export default function AssistantPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initial greeting
  useEffect(() => {
    setMessages([
      {
        role: 'ai',
        content: 'Hello! I am your AI Career Assistant powered by NVIDIA. I can help you with resume reviews, interview tips, or general career guidance. What would you like to discuss today?'
      }
    ]);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setLoading(true);

    try {
      // In a real app, you might pass the entire history
      const res = await fetch('http://localhost:5001/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, context: 'Act as a helpful career counselor.' }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setMessages([...newMessages, { role: 'ai', content: data.response }]);
      } else {
        setMessages([...newMessages, { role: 'ai', content: 'Oops, I encountered an error. Please try again later.' }]);
      }
    } catch (error) {
       setMessages([...newMessages, { role: 'ai', content: 'Failed to connect to the AI server.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto h-[calc(100vh-100px)] flex flex-col animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
        <div className="w-12 h-12 rounded-2xl primary-gradient flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-white">Career Assistant</h1>
          <p className="text-slate-400">Ask anything about your placement journey.</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mb-6 pr-4 space-y-6 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
             <div className="flex gap-4 max-w-[80%]">
                {msg.role === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-indigo-400" />
                  </div>
                )}
                
                <div className={`p-4 rounded-2xl text-[15px] leading-relaxed ${
                  msg.role === 'ai' 
                  ? 'bg-slate-900/50 border border-white/5 text-slate-300 rounded-tl-sm' 
                  : 'primary-gradient text-white rounded-tr-sm shadow-md'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4 text-indigo-400" />
                  </div>
                )}
             </div>
          </div>
        ))}
        
        {loading && (
           <div className="flex justify-start">
             <div className="flex gap-4 max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center shrink-0 mt-1 animate-pulse">
                  <Bot className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="p-5 rounded-2xl bg-slate-900/50 border border-white/5 rounded-tl-sm flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                   <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                   <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
             </div>
           </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="relative">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          placeholder="Type your question..."
          className="w-full bg-slate-900/80 border border-white/10 rounded-2xl pl-5 pr-16 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 resize-none h-16 shadow-inner transition-all"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className="absolute right-3 top-3 p-2 rounded-xl primary-gradient text-white disabled:opacity-30 hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all"
        >
          {loading ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
