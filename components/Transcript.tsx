import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import { Bot, User, Terminal, Sparkles } from 'lucide-react';

interface TranscriptProps {
  messages: Message[];
}

export const Transcript: React.FC<TranscriptProps> = ({ messages }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="h-full flex flex-col font-mono text-sm overflow-hidden bg-transparent">
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6 custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-slate-600 gap-4 opacity-30">
            <Sparkles className="w-12 h-12" />
            <span className="text-xs font-bold uppercase tracking-[0.3em]">Initialize Uplink</span>
          </div>
        )}
        
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col gap-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`flex items-center gap-2 mb-1 opacity-50 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className="w-5 h-5 rounded flex items-center justify-center bg-white/5 border border-white/5">
                {msg.role === 'user' ? <User className="w-3 h-3" /> : msg.role === 'system' ? <Terminal className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">
                {msg.role === 'user' ? 'Caller' : msg.role === 'system' ? 'Kernel' : 'Marcus AI'}
              </span>
            </div>
            
            <div className={`max-w-[85%] px-5 py-3 rounded-2xl transition-all duration-500 animate-in fade-in slide-in-from-bottom-2 ${
              msg.role === 'user' 
                ? 'bg-sky-500/10 text-sky-100 border border-sky-500/20 rounded-tr-none' 
                : msg.role === 'system' 
                  ? 'bg-transparent text-slate-500 text-xs italic'
                  : 'bg-white/5 text-slate-200 border border-white/10 rounded-tl-none backdrop-blur-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};