
import React, { useState, useEffect } from 'react';
import { useGeminiLive } from './hooks/useGeminiLive';
import { WaveVisualizer } from './components/WaveVisualizer';
import { InfoPanel } from './components/InfoPanel';
import { Transcript } from './components/Transcript';
import { LeadDetails } from './types';
import { 
  PhoneCall, 
  Loader2, 
  Activity, 
  Radio, 
  Navigation, 
  Signal, 
  Headset, 
  Power, 
  ShieldCheck, 
  ShieldAlert,
  Circle
} from 'lucide-react';

const App: React.FC = () => {
  const [leadDetails, setLeadDetails] = useState<Partial<LeadDetails>>({
    agentPersona: 'sarah',
    marketType: 'residential'
  });
  const [sessionDuration, setSessionDuration] = useState<number>(0);
  
  const handleLeadUpdate = (details: Partial<LeadDetails>) => {
    setLeadDetails(prev => ({ ...prev, ...details }));
  };

  const { 
    connect, 
    disconnect, 
    isConnected, 
    isConnecting,
    isSpeaking, 
    volume, 
    messages
  } = useGeminiLive({
    onLeadCaptured: handleLeadUpdate
  });

  const isMarcus = leadDetails.agentPersona === 'marcus';
  const isEmergency = isMarcus || leadDetails.type === 'emergency';
  const currentAgentName = leadDetails.agentPersona === 'sarah' ? 'SARAH' : 'MARCUS';

  useEffect(() => {
    let interval: number | undefined;
    if (isConnected) {
      const startTime = Date.now();
      interval = window.setInterval(() => {
        setSessionDuration(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    } else {
      setSessionDuration(0);
      if (interval) clearInterval(interval);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isConnected]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePersona = (persona: 'sarah' | 'marcus') => {
    setLeadDetails(prev => ({ ...prev, agentPersona: persona }));
  };

  const agentAvatarUrl = isMarcus 
    ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=120&h=120&auto=format&fit=crop" 
    : "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=120&h=120&auto=format&fit=crop";

  return (
    <div className={`h-screen flex flex-col transition-all duration-1000 font-sans selection:bg-blue-500/30 overflow-hidden relative ${isEmergency ? 'bg-[#0a0202]' : 'bg-[#000814]'}`}>
      
      {/* Background - Professional Atmosphere */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02]" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '60px 60px' }} />
        <div className={`absolute top-[-10%] left-[-5%] w-[70%] h-[70%] blur-[150px] rounded-full transition-all duration-1000 ${isEmergency ? 'bg-rose-900/30' : 'bg-blue-900/30'}`} />
      </div>

      <header className="h-28 border-b border-white/30 bg-black/95 backdrop-blur-3xl px-12 flex items-center justify-between shadow-2xl z-50 shrink-0">
        <div className="flex items-center gap-12">
           <div className="flex items-center gap-8 pr-12 border-r border-white/20">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-700 relative overflow-hidden group ${isEmergency ? 'bg-rose-600 shadow-rose-900/50' : 'bg-blue-600 shadow-blue-900/50'}`}>
                 <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
                 {isEmergency ? <ShieldAlert className="w-10 h-10 text-white animate-pulse relative z-10" /> : <ShieldCheck className="w-10 h-10 text-white relative z-10" />}
              </div>
              <div className="flex flex-col">
                <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic leading-none">
                    TORONTO AIR <span className={`${isEmergency ? 'text-rose-500' : 'text-blue-400'} not-italic`}>SYSTEMS</span>
                </h1>
                
                <div className="flex items-center gap-4 mt-2">
                   {/* Agent Status Display */}
                   <div className={`flex items-center gap-4 px-4 py-2 rounded-xl border-2 transition-all duration-700 ${
                     isConnected 
                      ? (isEmergency ? 'bg-rose-600 border-rose-400 text-white shadow-lg' : 'bg-emerald-600 border-emerald-400 text-white shadow-lg')
                      : 'bg-white/10 border-white/20 text-white/80'
                   }`}>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img src={agentAvatarUrl} alt={currentAgentName} className="w-8 h-8 rounded-lg object-cover border border-white/30" />
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-black ${isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[14px] font-black uppercase tracking-widest leading-none mb-1">
                            {currentAgentName}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                            {isConnected ? 'ONLINE' : 'AVAILABLE'}
                          </span>
                        </div>
                      </div>
                   </div>
                   <div className="flex items-center gap-2">
                      <Signal className={`w-4 h-4 ${isConnected ? 'text-emerald-400' : 'text-white/40'}`} />
                      <span className="text-[11px] font-mono font-bold text-white/60 uppercase tracking-widest">SECURE LINK</span>
                   </div>
                </div>
              </div>
           </div>
           
           <div className="flex flex-col gap-2">
              <span className="text-[11px] font-black text-white/60 uppercase tracking-[0.4em] pl-1 drop-shadow-md">DEPT. CONTROL</span>
              <div className="flex items-center gap-4 bg-black/60 p-2 rounded-2xl border-2 border-white/10 shadow-2xl">
                  <button 
                    onClick={() => togglePersona('sarah')}
                    className={`flex items-center gap-4 px-10 py-3 rounded-xl transition-all duration-500 border-2 ${
                      leadDetails.agentPersona === 'sarah' 
                      ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_30px_rgba(37,99,235,0.4)] scale-105 z-10' 
                      : 'bg-transparent border-transparent text-white/50 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Headset className="w-5 h-5" />
                    <span className="text-sm font-black uppercase tracking-widest">SALES</span>
                  </button>
                  
                  <button 
                    onClick={() => togglePersona('marcus')}
                    className={`flex items-center gap-4 px-10 py-3 rounded-xl transition-all duration-500 border-2 ${
                      leadDetails.agentPersona === 'marcus' 
                      ? 'bg-rose-600 border-rose-400 text-white shadow-[0_0_50px_rgba(225,29,72,0.6)] scale-105 z-10' 
                      : 'bg-transparent border-transparent text-white/50 hover:text-rose-400 hover:bg-rose-500/10'
                    }`}
                  >
                    <Radio className="w-5 h-5" />
                    <span className="text-sm font-black uppercase tracking-widest">EMERGENCY</span>
                  </button>
              </div>
           </div>
        </div>

        <div className="flex items-center gap-10">
           {isConnected && (
             <div className="flex items-center gap-10 pr-10 border-r border-white/20">
                <div className="text-right">
                    <div className="text-[11px] font-black text-white/60 uppercase tracking-widest mb-1">ELAPSED TIME</div>
                    <div className="text-3xl font-mono font-black text-white tabular-nums leading-none tracking-tighter">{formatDuration(sessionDuration)}</div>
                </div>
                <div>
                    <div className="text-[11px] font-black text-white/60 uppercase tracking-widest mb-1">LOCAL HUB</div>
                    <div className="text-base font-black text-blue-400 bg-blue-500/10 px-5 py-2 rounded-lg border-2 border-blue-500/40 leading-none uppercase tracking-tight">GTA-C-01</div>
                </div>
             </div>
           )}

           <button 
              disabled={isConnecting}
              onClick={() => isConnected ? disconnect() : connect()}
              className={`group relative flex items-center gap-6 px-14 py-6 rounded-2xl font-black text-base transition-all active:scale-95 uppercase tracking-[0.25em] shadow-2xl overflow-hidden border-2 ${
                  isConnected 
                  ? 'bg-rose-900 text-white border-rose-500 shadow-rose-950' 
                  : isConnecting
                    ? 'bg-white/10 text-white/80 border-white/40'
                    : 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-blue-400 hover:scale-105 shadow-blue-900/40'
              }`}
           >
              {isConnecting ? <Loader2 className="w-6 h-6 animate-spin" /> : isConnected ? <Power className="w-6 h-6" /> : <PhoneCall className="w-6 h-6" />}
              <span>{isConnecting ? 'LINKING...' : isConnected ? 'HANG UP' : 'START LINK'}</span>
           </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        <section className="flex-1 flex flex-col bg-black/40 backdrop-blur-sm border-r border-white/20 overflow-hidden">
            <div className={`h-[35%] relative flex items-center justify-center overflow-hidden border-b border-white/20 transition-all duration-1000 ${isEmergency ? 'bg-rose-950/30' : 'bg-blue-950/30'}`}>
                <div className="w-full h-full relative z-10">
                    <WaveVisualizer isConnected={isConnected} isSpeaking={isSpeaking} volume={volume} isEmergency={isEmergency} />
                </div>
                
                <div className="absolute top-8 left-8">
                   <div className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-black/80 border-2 border-white/50 backdrop-blur-xl shadow-2xl">
                      <Activity className={`w-6 h-6 ${isEmergency ? 'text-rose-500' : 'text-blue-400'}`} />
                      <span className="text-[14px] font-black text-white uppercase tracking-[0.3em]">Vocal Neural Link</span>
                   </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col min-h-0 bg-black/30 overflow-hidden">
                <Transcript messages={messages} persona={leadDetails.agentPersona} />
            </div>
            
            <footer className="h-16 bg-black/95 border-t border-white/30 flex items-center overflow-hidden shrink-0">
               <div className="flex items-center gap-24 animate-marquee whitespace-nowrap px-12">
                  <TickerItem label="MISSISSAUGA" status="TECH READY" />
                  <TickerItem label="BRAMPTON" status="2H RESPONSE" />
                  <TickerItem label="GEORGETOWN" status="TECH READY" />
                  <TickerItem label="ETOBICOKE" status="TECH READY" />
                  <TickerItem label="DOWNTOWN" status="4H RESPONSE" />
                  <TickerItem label="NORTH YORK" status="UPLINK STABLE" />
               </div>
            </footer>
        </section>

        <aside className="w-[520px] flex-shrink-0 flex flex-col bg-white z-20 overflow-hidden shadow-[-40px_0_80px_rgba(0,0,0,0.6)]">
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <InfoPanel lead={leadDetails} isConnected={isConnected} />
            </div>
        </aside>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 20px; border: 2px solid #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }

        @keyframes pulse-subtle {
          0%, 100% { transform: scale(1.05); }
          50% { transform: scale(1.08); }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

const TickerItem = ({ label, status }: any) => (
  <div className="flex items-center gap-6">
    <span className="text-[13px] font-black text-white uppercase tracking-widest">{label}</span>
    <span className="text-[14px] font-black text-blue-400 uppercase tracking-tighter">{status}</span>
    <div className="w-2 h-2 rounded-full bg-white/40 shadow-sm" />
  </div>
);

export default App;
