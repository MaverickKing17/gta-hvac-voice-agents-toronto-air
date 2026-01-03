
import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import { 
  User, 
  Terminal, 
  Hash, 
  Headset, 
  Zap, 
  Activity,
  ShieldCheck,
  PhoneForwarded,
  Sparkles,
  AlertTriangle
} from 'lucide-react';

interface TranscriptProps {
  messages: Message[];
  persona?: 'sarah' | 'mike';
}

export const Transcript: React.FC<TranscriptProps> = ({ messages, persona }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getRoleConfig = (role: 'user' | 'agent' | 'system') => {
    switch (role) {
      case 'user':
        return {
          label: 'INCOMING CALLER',
          icon: <User className="w-5 h-5" />,
          avatarClass: 'bg-white/5 text-white/60 border border-white/10 shadow-inner ring-1 ring-white/5',
          contentClass: 'text-white/80 font-medium bg-white/5 border border-white/10 p-7 rounded-3xl backdrop-blur-md shadow-lg border-l-4 border-l-white/20'
        };
      case 'agent':
        const isMike = persona === 'mike';
        return {
          label: isMike ? 'DISPATCH: MIKE' : 'ADVISOR: SARAH',
          icon: isMike ? <Zap className="w-5 h-5 fill-current" /> : <Headset className="w-5 h-5" />,
          avatarClass: isMike 
            ? 'bg-gradient-to-tr from-rose-900 via-rose-600 to-rose-400 text-white shadow-[0_0_30px_rgba(225,29,72,0.6)] border border-rose-400/40 animate-critical-pulse' 
            : 'bg-gradient-to-tr from-blue-900 via-blue-600 to-blue-400 text-white shadow-[0_0_30px_rgba(37,99,235,0.5)] border border-blue-400/40 animate-advisory-glow',
          contentClass: isMike
            ? 'text-white font-black bg-gradient-to-r from-rose-950/20 to-transparent border border-rose-500/20 p-8 rounded-[2.5rem] shadow-2xl border-l-[10px] border-l-rose-600 relative group'
            : 'text-white font-bold bg-gradient-to-r from-blue-950/20 to-transparent border border-blue-500/20 p-8 rounded-[2.5rem] shadow-2xl border-l-[10px] border-l-blue-600 relative group'
        };
      case 'system':
        return {
          label: 'SYSTEM KERNEL',
          icon: <Hash className="w-3.5 h-3.5" />,
          avatarClass: 'bg-white/5 text-white/20 border border-white/5',
          contentClass: 'text-white/30 italic font-mono text-[10px] pl-6 border-l-2 border-white/5 uppercase tracking-[0.2em] py-2'
        };
    }
  };

  return (
    <div className="h-full flex flex-col font-mono overflow-hidden">
      <div className="flex-1 overflow-y-auto px-10 py-12 space-y-12 custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center space-y-6 opacity-20">
             <div className="relative">
                <Terminal className="w-12 h-12 text-white" />
                <div className="absolute inset-0 animate-ping opacity-50"><Terminal className="w-12 h-12 text-white" /></div>
             </div>
             <span className="text-[10px] font-black uppercase tracking-[1em] text-white">Standby for Intercept</span>
          </div>
        )}
        
        {messages.map((msg) => {
          const config = getRoleConfig(msg.role);
          const isAgent = msg.role === 'agent';
          const isMike = persona === 'mike';

          return (
            <div key={msg.id} className="flex gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="flex flex-col items-center pt-2 shrink-0">
                 <div className={`relative flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-700 ${config.avatarClass}`}>
                   {isAgent && (
                     <>
                        {/* HUD Decorations */}
                        <div className={`absolute -inset-2 border-2 rounded-[1.4rem] opacity-20 transition-colors ${isMike ? 'border-rose-500' : 'border-blue-500'}`} />
                        <div className={`absolute -top-1.5 -right-1.5 p-1 bg-white rounded-full shadow-lg scale-[0.85] ring-4 ring-black/50`}>
                          {isMike ? <AlertTriangle className="w-3.5 h-3.5 text-rose-600" /> : <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />}
                        </div>
                     </>
                   )}
                   <div className="relative z-10 flex flex-col items-center">
                    {config.icon}
                   </div>
                 </div>
              </div>
              
              <div className="flex-1 pb-4">
                <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-4">
                      <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${msg.role === 'agent' ? (isMike ? 'text-rose-400' : 'text-blue-400') : 'text-white/40'}`}>
                        {config.label}
                      </span>
                      {isAgent && (
                        <div className={`flex items-center gap-2 px-2.5 py-0.5 rounded-full border transition-all ${isMike ? 'bg-rose-500/10 border-rose-500/30' : 'bg-blue-500/10 border-blue-500/30'}`}>
                           <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isMike ? 'bg-rose-500' : 'bg-blue-400'}`} />
                           <span className={`text-[8px] font-black uppercase tracking-widest ${isMike ? 'text-rose-400' : 'text-blue-300'}`}>Transmitting</span>
                        </div>
                      )}
                      {msg.role === 'user' && (
                        <div className="flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                          <PhoneForwarded className="w-3 h-3 text-white/30" />
                          <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">Active Link</span>
                        </div>
                      )}
                   </div>
                   <span className="text-[9px] text-white/10 font-black uppercase tracking-[0.3em] font-mono tabular-nums">
                     {new Date(msg.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                   </span>
                </div>
                
                <div className={`text-[20px] leading-[1.6] transition-all duration-1000 shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative ${config.contentClass}`}>
                  {isAgent && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2.2rem]">
                       <div className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-[100px] -mr-24 -mt-24 opacity-20 ${isMike ? 'bg-rose-400' : 'bg-blue-400'}`} />
                       <div className="absolute top-4 right-6 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                         <Sparkles className={`w-14 h-14 ${isMike ? 'text-rose-200' : 'text-blue-200'}`} />
                       </div>
                    </div>
                  )}
                  <span className="relative z-10 tracking-tight font-sans font-medium">{msg.text}</span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <style>{`
        @keyframes critical-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(225, 29, 72, 0.4); }
          50% { transform: scale(1.03); box-shadow: 0 0 40px rgba(225, 29, 72, 0.6); }
        }
        @keyframes advisory-glow {
          0%, 100% { box-shadow: 0 0 15px rgba(37, 99, 235, 0.3); filter: brightness(1); }
          50% { box-shadow: 0 0 35px rgba(37, 99, 235, 0.5); filter: brightness(1.1); }
        }
        .animate-critical-pulse {
          animation: critical-pulse 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .animate-advisory-glow {
          animation: advisory-glow 4s ease-in-out infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.01);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};
