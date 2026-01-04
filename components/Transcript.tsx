
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
          label: 'CUSTOMER',
          icon: <User className="w-5 h-5" />,
          avatarClass: 'bg-white/10 text-white/40 border border-white/20 w-16 h-16 rounded-2xl',
          contentClass: 'text-white/90 font-medium bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md border-l-4 border-l-white/20'
        };
      case 'agent':
        const isMike = persona === 'mike';
        return {
          label: isMike ? 'DISPATCH: MIKE' : 'ADVISOR: SARAH',
          icon: isMike ? <Zap className="w-5 h-5 fill-current" /> : <Headset className="w-5 h-5" />,
          avatarClass: isMike 
            ? 'bg-rose-600 text-white shadow-xl w-16 h-16 rounded-2xl' 
            : 'bg-blue-600 text-white shadow-xl w-16 h-16 rounded-2xl',
          contentClass: isMike
            ? 'text-white bg-rose-950/20 border border-rose-500/30 p-10 rounded-3xl border-l-[12px] border-l-rose-600'
            : 'text-white bg-blue-950/20 border border-blue-500/30 p-10 rounded-3xl border-l-[12px] border-l-blue-600'
        };
      case 'system':
        return {
          label: 'LOG',
          icon: <Info className="w-3.5 h-3.5" />,
          avatarClass: 'bg-white/5 text-white/20 border border-white/10 w-10 h-10 rounded-xl mt-2',
          contentClass: 'text-white/30 font-sans text-xs pl-6 border-l-2 border-white/10 py-1'
        };
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto px-12 py-12 space-y-12 custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center space-y-6 opacity-20">
             <Activity className="w-12 h-12 text-white" />
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white">READY FOR INPUT</span>
          </div>
        )}
        
        {messages.map((msg) => {
          const config = getRoleConfig(msg.role);
          const isAgent = msg.role === 'agent';
          const isSystem = msg.role === 'system';
          const isMike = persona === 'mike';

          return (
            <div key={msg.id} className={`flex gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 ${isSystem ? 'opacity-50' : ''}`}>
              <div className="flex flex-col items-center pt-2 shrink-0">
                 <div className={`relative flex items-center justify-center transition-all ${config.avatarClass}`}>
                   {isAgent && (
                     <div className={`absolute -top-2 -right-2 p-1.5 bg-white rounded-lg shadow-xl flex items-center justify-center`}>
                       {isMike ? <AlertTriangle className="w-3.5 h-3.5 text-rose-600" /> : <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />}
                     </div>
                   )}
                   <div className="relative z-10">
                    {config.icon}
                   </div>
                 </div>
              </div>
              
              <div className="flex-1">
                <div className={`flex items-center justify-between mb-4`}>
                   <div className="flex items-center gap-4">
                      <span className={`text-[10px] font-black uppercase tracking-widest ${
                        isAgent ? (isMike ? 'text-rose-400' : 'text-blue-400') : 
                        isSystem ? 'text-white/20' : 'text-white/40'
                      }`}>
                        {config.label}
                      </span>
                      {isAgent && (
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 transition-all ${isMike ? 'bg-rose-500/10' : 'bg-blue-500/10'}`}>
                           <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isMike ? 'bg-rose-500' : 'bg-blue-500'}`} />
                           <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">TRANSMITTING</span>
                        </div>
                      )}
                   </div>
                   <span className="text-[9px] text-white/10 font-bold uppercase tracking-widest tabular-nums">
                     {new Date(msg.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}
                   </span>
                </div>
                
                <div className={`transition-all duration-700 relative ${
                  isSystem ? '' : 'text-2xl leading-relaxed shadow-xl'
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
