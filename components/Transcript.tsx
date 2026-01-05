
import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import { 
  User, 
  Terminal, 
  Headset, 
  Zap, 
  Activity,
  ShieldCheck,
  PhoneForwarded,
  Sparkles,
  AlertTriangle,
  Info
} from 'lucide-react';

interface TranscriptProps {
  messages: Message[];
  persona?: 'sarah' | 'marcus';
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
          label: 'CUSTOMER',
          icon: <User className="w-6 h-6" />,
          avatarUrl: null,
          avatarClass: 'bg-white/30 text-white border-2 border-white/50 w-16 h-16 rounded-2xl shadow-xl',
          contentClass: 'text-white font-semibold bg-white/10 border-2 border-white/30 p-8 rounded-3xl backdrop-blur-md border-l-8 border-l-white/60 shadow-2xl'
        };
      case 'agent':
        const isMarcus = persona === 'marcus';
        return {
          label: isMarcus ? 'DISPATCH: MARCUS' : 'ADVISOR: SARAH',
          icon: isMarcus ? <Zap className="w-4 h-4 fill-current" /> : <Headset className="w-4 h-4" />,
          // Professional persona images from Unsplash
          avatarUrl: isMarcus 
            ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop" 
            : "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop",
          avatarClass: isMarcus 
            ? 'border-2 border-rose-500 shadow-[0_0_20px_rgba(225,29,72,0.4)] w-20 h-20 rounded-2xl overflow-hidden' 
            : 'border-2 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.4)] w-20 h-20 rounded-2xl overflow-hidden',
          contentClass: isMarcus
            ? 'text-white font-bold bg-rose-950/50 border-2 border-rose-500/60 p-10 rounded-3xl border-l-[16px] border-l-rose-600 shadow-2xl'
            : 'text-white font-bold bg-blue-950/50 border-2 border-blue-500/60 p-10 rounded-3xl border-l-[16px] border-l-blue-600 shadow-2xl'
        };
      case 'system':
        return {
          label: 'SYSTEM LOG',
          icon: <Info className="w-4 h-4" />,
          avatarUrl: null,
          avatarClass: 'bg-white/20 text-white border border-white/40 w-10 h-10 rounded-xl mt-2',
          contentClass: 'text-white font-sans text-sm pl-6 border-l-4 border-white/50 py-3 italic bg-white/10 rounded-r-2xl shadow-lg'
        };
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto px-12 py-12 space-y-12 custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center space-y-8 opacity-60">
             <Activity className="w-20 h-20 text-white animate-pulse" />
             <span className="text-[14px] font-black uppercase tracking-[0.8em] text-white ml-[0.8em]">AWAITING TRANSMISSION</span>
          </div>
        )}
        
        {messages.map((msg) => {
          const config = getRoleConfig(msg.role);
          const isAgent = msg.role === 'agent';
          const isSystem = msg.role === 'system';
          const isMarcus = persona === 'marcus';

          return (
            <div key={msg.id} className={`flex gap-8 animate-in fade-in slide-in-from-bottom-10 duration-700 ${isSystem ? 'opacity-100 scale-[0.98]' : ''}`}>
              <div className="flex flex-col items-center pt-2 shrink-0">
                 <div className={`relative flex items-center justify-center transition-all bg-black ${config.avatarClass}`}>
                   {config.avatarUrl ? (
                     <img 
                       src={config.avatarUrl} 
                       alt={config.label} 
                       className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                     />
                   ) : (
                     <div className="relative z-10">
                      {config.icon}
                     </div>
                   )}
                   
                   {isAgent && (
                     <div className={`absolute -top-3 -right-3 p-2 rounded-xl shadow-2xl flex items-center justify-center ring-4 ring-black/60 z-20 ${isMarcus ? 'bg-rose-600' : 'bg-blue-600'}`}>
                       <span className="text-white">
                         {config.icon}
                       </span>
                     </div>
                   )}
                 </div>
              </div>
              
              <div className="flex-1">
                <div className={`flex items-center justify-between mb-4`}>
                   <div className="flex items-center gap-4">
                      <span className={`text-[12px] font-black uppercase tracking-widest ${
                        isAgent ? (isMarcus ? 'text-rose-400' : 'text-blue-300') : 
                        isSystem ? 'text-white/90' : 'text-white'
                      }`}>
                        {config.label}
                      </span>
                      {isAgent && (
                        <div className={`flex items-center gap-3 px-4 py-1.5 rounded-full border-2 border-white/30 transition-all ${isMarcus ? 'bg-rose-500/40' : 'bg-blue-500/40'}`}>
                           <div className={`w-2 h-2 rounded-full animate-pulse ${isMarcus ? 'bg-rose-400' : 'bg-blue-400'}`} />
                           <span className="text-[10px] font-black text-white uppercase tracking-widest">LIVE AUDIO</span>
                        </div>
                      )}
                   </div>
                   <span className="text-[11px] text-white/70 font-black uppercase tracking-widest tabular-nums">
                     {new Date(msg.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                   </span>
                </div>
                
                <div className={`transition-all duration-700 relative ${
                  isSystem ? '' : 'text-3xl leading-snug'
                } ${config.contentClass}`}>
                  <span className="relative z-10">{msg.text}</span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
