
import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  User, 
  Zap, 
  Waves, 
  Minimize2, 
  Maximize2,
  Clock,
  CheckCheck
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'agent' | 'user';
  text: string;
  timestamp: Date;
  persona: 'sarah' | 'marcus';
}

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentPersona, setCurrentPersona] = useState<'sarah' | 'marcus'>('sarah');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting
      setTimeout(() => {
        addAgentMessage("Hi! I'm Sarah, your Toronto Air Systems comfort advisor. Are you looking for a new heat pump quote or calling about an emergency repair?");
      }, 500);
    }
    scrollToBottom();
  }, [isOpen, messages]);

  const addAgentMessage = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const newMessage: ChatMessage = {
        id: Math.random().toString(36).substr(2, 9),
        role: 'agent',
        text,
        timestamp: new Date(),
        persona: currentPersona,
      };
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      role: 'user',
      text: inputValue,
      timestamp: new Date(),
      persona: currentPersona,
    };

    setMessages(prev => [...prev, userMsg]);
    const userText = inputValue.toLowerCase();
    setInputValue('');

    // Simulated Logic
    if (userText.includes('emergency') || userText.includes('broken') || userText.includes('gas')) {
      setCurrentPersona('marcus');
      addAgentMessage("That sounds urgent. I'm Marcus from Dispatch. I've marked your location as High Priority. Please provide your address and phone number so I can send a tech immediately.");
    } else if (userText.includes('rebate') || userText.includes('price') || userText.includes('cost')) {
      addAgentMessage("Great news! You may qualify for up to $10,000 in Ontario energy rebates. Are you currently an Enbridge customer?");
    } else {
      addAgentMessage("I've received your request. One of our specialists will get back to you within 60 minutes. Is there anything else I can help with today?");
    }
  };

  const isMike = currentPersona === 'marcus';

  return (
    <div className="fixed bottom-8 left-8 z-[100] font-sans">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center w-16 h-16 bg-[#003366] text-white rounded-2xl shadow-[0_20px_50px_rgba(0,51,102,0.3)] hover:bg-[#d6001c] hover:scale-110 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4"
        >
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 rounded-full border-2 border-white animate-pulse" />
          <MessageSquare className="w-8 h-8 group-hover:rotate-12 transition-transform" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          className={`flex flex-col bg-white rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.2)] border border-gray-100 overflow-hidden transition-all duration-500 origin-bottom-left ${
            isMinimized ? 'h-20 w-72' : 'h-[600px] w-[400px] sm:w-[450px]'
          }`}
        >
          {/* Header */}
          <div className={`p-6 flex items-center justify-between transition-colors duration-1000 ${isMike ? 'bg-rose-950 text-white' : 'bg-[#003366] text-white'}`}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl overflow-hidden border-2 border-white/20 relative ${isMike ? 'animate-pulse' : ''}`}>
                <img 
                  src={isMike 
                    ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=240&h=240&auto=format&fit=crop" 
                    : "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=240&h=240&auto=format&fit=crop"
                  } 
                  className="w-full h-full object-cover"
                  alt="Agent"
                />
              </div>
              <div>
                <h4 className="font-black uppercase tracking-tighter italic leading-none">{isMike ? 'MARCUS' : 'SARAH'}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Live Assistant</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-[#f8f9fa] custom-scrollbar">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}
                  >
                    <div className={`max-w-[85%] space-y-2`}>
                      <div className={`p-5 rounded-3xl text-sm font-medium leading-relaxed shadow-sm ${
                        msg.role === 'user' 
                          ? 'bg-[#003366] text-white rounded-br-none' 
                          : 'bg-white text-slate-800 rounded-bl-none border border-gray-100'
                      }`}>
                        {msg.text}
                      </div>
                      <div className={`flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <Clock className="w-3 h-3" />
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {msg.role === 'user' && <CheckCheck className="w-3 h-3 text-blue-500" />}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                      <div className="w-2 h-2 bg-slate-200 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-slate-200 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <form onSubmit={handleSend} className="p-6 bg-white border-t border-gray-100 flex items-center gap-4">
                <input 
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-slate-50 border-2 border-transparent focus:border-[#003366] focus:bg-white rounded-2xl px-6 py-4 text-sm font-medium outline-none transition-all"
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="w-14 h-14 bg-[#003366] text-white rounded-2xl flex items-center justify-center hover:bg-[#d6001c] disabled:opacity-50 disabled:hover:bg-[#003366] transition-all active:scale-90 shadow-lg"
                >
                  <Send className="w-6 h-6" />
                </button>
              </form>
            </>
          )}
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
};
