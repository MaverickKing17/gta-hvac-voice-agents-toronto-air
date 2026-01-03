
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
          icon: <User className="w-6 h-6" />,
          avatarClass: 'bg-white/5 text-white/60 border-2 border-white/10 shadow-2xl ring-2 ring-white/5',
          contentClass: 'text-white/90 font-medium bg-white/5 border-2 border-white/10 p-10 rounded-[2.5rem] backdrop-blur-xl shadow-2xl border-l-8 border-l-white/20'
        };
      case 'agent':
        const isMike = persona === 'mike';
        return {
          label: isMike ? 'OPS DISPATCH: MIKE' : 'ADVISOR: SARAH',
          icon: isMike ? <Zap className="w-6 h-6 fill-current" /> : <Headset className="w-6 h-6" />,
          avatarClass: isMike 
            ? 'bg-gradient-to-tr from-rose-950 via-rose-600 to-rose-400 text-white shadow-[0_0_40px_rgba(225,29,72,0.8)] border-2 border-rose-400/60 animate-emergency-strobe' 
            : 'bg-gradient-to-tr from-[#001f3f] via-[#0056b3] to-[#00d4ff] text-white shadow-[0_0_40px_rgba(0,153,255,0.6)] border-2 border-blue-400/50 animate-calm-glow',
          contentClass: isMike
            ? 'text-white font-black bg-gradient-to-r from-rose-950/40 to-black/20 border-2 border-rose-500/30 p-12 rounded-[3rem] shadow-2xl border-l-[16px] border-l-rose-600 relative group overflow-hidden'
            : 'text-white font-bold bg-gradient-to-r from-blue-950/30 to-black/20 border-2 border-blue-500/30 p-12 rounded-[3rem] shadow-2xl border-l-[16px] border-l-blue-600 relative group overflow-hidden'
        };
      case 'system':
        return {
          label: 'SYSTEM KERNEL',
          icon: <Hash className="w-4 h-4" />,
          avatarClass: 'bg-white/5 text-white/30 border border-white/10',
          contentClass: 'text-white/40 italic font-mono text-xs pl-8 border-l-4 border-white/10 uppercase tracking-[0.3em] py-4'
        };
    }
  };

  return (
    <div className="h-full flex flex-col font-mono overflow-hidden">
      <div className="flex-1 overflow-y-auto px-16 py-16 space-y-20 custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center space-y-10 opacity-30">
             <div className="relative">
                <Terminal className="w-20 h-20 text-white" />
                <div className="absolute inset-0 animate-ping opacity-50"><Terminal className="w-20 h-20 text-white" /></div>
             </div>
             <span className="text-sm font-black uppercase tracking-[1.5em] text-white text-center ml-[1.5em]">AWAITING NEURAL SYNC</span>
          </div>
        )}
        
        {messages.map((msg) => {
          const config = getRoleConfig(msg.role);
          const isAgent = msg.role === 'agent';
          const isMike = persona === 'mike';

          return (
            <div key={msg.id} className="flex gap-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
              <div className="flex flex-col items-center pt-3 shrink-0">
                 <div className={`relative flex items-center justify-center w-20 h-20 rounded-[1.8rem] transition-all duration-700 ${config.avatarClass}`}>
                   {isAgent && (
                     <>
                        {/* High Vis HUD Frame */}
                        <div className={`absolute -inset-4 border-[4px] rounded-[2.5rem] opacity-30 transition-all duration-500 ${isMike ? 'border-rose-500 animate-pulse' : 'border-blue-500 opacity-20'}`} />
                        <div className={`absolute -top-3 -right-3 p-2 bg-white rounded-full shadow-2xl ring-6 ring-black/90 flex items-center justify-center`}>
                          {isMike ? <AlertTriangle className="w-5 h-5 text-rose-600" /> : <ShieldCheck className="w-5 h-5 text-blue-600" />}
                        </div>
                        {/* Tactical Badge */}
                        <div className="absolute -bottom-3 px-3 py-1 bg-black/80 backdrop-blur-2xl border border-white/20 rounded-lg shadow-xl">
                           <span className="text-[9px] font-black uppercase tracking-widest text-white">
                             {isMike ? 'CRITICAL' : 'ADVISORY'}
                           </span>
                        </div>
                     </>
                   )}
                   <div className="relative z-10">
                    {config.icon}
                   </div>
                 </div>
              </div>
              
              <div className="flex-1 pb-6">
                <div className="flex items-center justify-between mb-6">
                   <div className="flex items-center gap-6">
                      <span className={`text-sm font-black uppercase tracking-[0.5em] ${msg.role === 'agent' ? (isMike ? 'text-rose-400' : 'text-blue-400') : 'text-white/50'}`}>
                        {config.label}
                      </span>
                      {isAgent && (
                        <div className={`flex items-center gap-3 px-5 py-1.5 rounded-full border-2 transition-all ${isMike ? 'bg-rose-500/20 border-rose-500/50 shadow-rose-900/30' : 'bg-blue-500/20 border-blue-500/50 shadow-blue-900/30'}`}>
                           <Activity className={`w-4 h-4 animate-pulse ${isMike ? 'text-rose-500' : 'text-blue-400'}`} />
                           <span className={`text-[10px] font-black uppercase tracking-widest ${isMike ? 'text-rose-400' : 'text-blue-300'}`}>TX ACTIVE</span>
                        </div>
                      )}
                      {msg.role === 'user' && (
                        <div className="flex items-center gap-3 px-5 py-1.5 rounded-full bg-white/5 border-2 border-white/10">
                          <PhoneForwarded className="w-4 h-4 text-white/40" />
                          <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">UPLINK STABLE</span>
                        </div>
                      )}
                   </div>
                   <span className="text-xs text-white/20 font-black uppercase tracking-[0.4em] font-mono tabular-nums">
                     {new Date(msg.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                   </span>
                </div>
                
                <div className={`text-[28px] leading-[1.5] transition-all duration-1000 shadow-[0_30px_100px_rgba(0,0,0,0.7)] relative ${config.contentClass}`}>
                  {isAgent && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2.8rem]">
                       <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-[140px] -mr-40 -mt-40 opacity-25 transition-all duration-1000 ${isMike ? 'bg-rose-500' : 'bg-blue-500'}`} />
                       <div className="absolute top-10 right-12 opacity-[0.05] group-hover:opacity-15 transition-opacity">
                         <Sparkles className={`w-32 h-32 ${isMike ? 'text-rose-200' : 'text-blue-200'}`} />
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
        @keyframes emergency-strobe {
          0%, 100% { transform: scale(1); box-shadow: 0 0 30px rgba(225, 29, 72, 0.6); filter: brightness(1); }
          50% { transform: scale(1.08); box-shadow: 0 0 70px rgba(225, 29, 72, 1); filter: brightness(1.3); }
        }
        @keyframes calm-glow {
          0%, 100% { box-shadow: 0 0 25px rgba(37, 99, 235, 0.4); transform: scale(1); }
          50% { box-shadow: 0 0 60px rgba(37, 99, 235, 0.7); transform: scale(1.04); }
        }
        .animate-emergency-strobe {
          animation: emergency-strobe 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .animate-calm-glow {
          animation: calm-glow 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
