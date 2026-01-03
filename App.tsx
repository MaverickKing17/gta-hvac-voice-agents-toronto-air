
import React, { useState, useEffect } from 'react';
import { useGeminiLive } from './hooks/useGeminiLive';
import { WaveVisualizer } from './components/WaveVisualizer';
import { InfoPanel } from './components/InfoPanel';
import { Transcript } from './components/Transcript';
import { LeadDetails } from './types';
import { 
  MicOff, 
  PhoneCall, 
  Snowflake, 
  Loader2, 
  Activity, 
  ShieldCheck, 
  Clock, 
  UserCircle2,
  AlertTriangle,
  Building2,
  Home,
  Globe,
  Radio,
  Navigation,
  Signal,
  Wifi,
  Cpu,
  Zap,
  ChevronRight
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

  const isEmergency = leadDetails.agentPersona === 'mike' || leadDetails.type === 'emergency';

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

  const togglePersona = (persona: 'sarah' | 'mike') => {
    setLeadDetails(prev => ({ ...prev, agentPersona: persona }));
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 font-sans selection:bg-blue-500/30 overflow-hidden relative ${isEmergency ? 'bg-[#050000]' : 'bg-[#00050a]'}`}>
      
      {/* Background Cinematic Atmosphere */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '32px 32px' }} />
        <div className={`absolute top-[-20%] left-[-10%] w-[60%] h-[60%] blur-[160px] rounded-full transition-all duration-1000 ${isEmergency ? 'bg-rose-900/20' : 'bg-blue-900/20'}`} />
        <div className={`absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] blur-[160px] rounded-full transition-all duration-1000 ${isEmergency ? 'bg-rose-800/10' : 'bg-blue-800/10'}`} />
        
        {/* Scanning Line Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent h-24 w-full animate-scan pointer-events-none" />
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-white/5 bg-black/40 backdrop-blur-3xl px-8 flex items-center justify-between shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-8">
           <div className="flex items-center gap-4 pr-8 border-r border-white/10">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-2xl transition-all duration-700 relative overflow-hidden group ${isEmergency ? 'bg-rose-600 scale-110' : 'bg-blue-700'}`}>
                 <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
                 {isEmergency ? <AlertTriangle className="w-7 h-7 text-white animate-pulse relative z-10" /> : <Zap className="w-7 h-7 text-white relative z-10" />}
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-black tracking-tighter text-white uppercase italic leading-none flex items-center gap-2">
                    Toronto Air <span className={`${isEmergency ? 'text-rose-500' : 'text-blue-400'} font-bold tracking-normal not-italic`}>Systems</span>
                </h1>
                <div className="flex items-center gap-2 mt-1.5">
                   <div className={`flex items-center gap-2 px-2 py-0.5 rounded border text-[9px] font-black uppercase tracking-widest transition-all duration-500 ${
                     isConnected ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' : 'bg-white/5 border-white/10 text-white/30'
                   }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-white/10'}`} />
                      {isConnected ? 'Signal Verified' : 'Standby'}
                   </div>
                   <span className="text-[8px] font-mono font-bold text-white/20 tracking-widest">UPLINK ALPHA-01</span>
                </div>
              </div>
           </div>
           
           {/* INTERACTIVE AGENT SWITCHER - High Fidelity Toggle */}
           <div className="flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/10 shadow-inner">
              <button 
                onClick={() => togglePersona('sarah')}
                className={`flex items-center gap-3 px-6 py-2.5 rounded-xl transition-all duration-500 relative overflow-hidden group ${
                  leadDetails.agentPersona === 'sarah' 
                  ? 'bg-white text-slate-950 shadow-xl scale-105 z-10' 
                  : 'text-white/30 hover:text-white/60 hover:bg-white/5'
                }`}
              >
                <UserCircle2 className={`w-4 h-4 transition-colors ${leadDetails.agentPersona === 'sarah' ? 'text-blue-600' : 'text-current'}`} />
                <div className="flex flex-col items-start leading-none">
                   <span className="text-[10px] font-black uppercase tracking-wider">Sarah</span>
                   <span className={`text-[7px] font-bold uppercase tracking-widest mt-0.5 ${leadDetails.agentPersona === 'sarah' ? 'text-blue-600/60' : 'text-white/20'}`}>Advisory</span>
                </div>
              </button>
              
              <div className="flex items-center justify-center w-6 opacity-20">
                <ChevronRight className="w-3 h-3 text-white" />
              </div>

              <button 
                onClick={() => togglePersona('mike')}
                className={`flex items-center gap-3 px-6 py-2.5 rounded-xl transition-all duration-500 relative overflow-hidden group ${
                  leadDetails.agentPersona === 'mike' 
                  ? 'bg-rose-600 text-white shadow-[0_0_20px_rgba(225,29,72,0.4)] scale-105 z-10' 
                  : 'text-white/30 hover:text-white/60 hover:bg-white/5'
                }`}
              >
                <Radio className={`w-4 h-4 transition-colors ${leadDetails.agentPersona === 'mike' ? 'text-white' : 'text-current'}`} />
                <div className="flex flex-col items-start leading-none">
                   <span className="text-[10px] font-black uppercase tracking-wider">Mike</span>
                   <span className={`text-[7px] font-bold uppercase tracking-widest mt-0.5 ${leadDetails.agentPersona === 'mike' ? 'text-white/60' : 'text-white/20'}`}>Critical</span>
                </div>
              </button>
           </div>
        </div>

        <div className="flex items-center gap-8">
           {isConnected && (
             <div className="flex items-center gap-8 pr-8 border-r border-white/10">
                <div className="text-right flex flex-col items-end">
                    <div className="text-[8px] font-black text-white/30 uppercase tracking-[0.3em] mb-1 flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-white/20" /> Active Session
                    </div>
                    <div className="text-xl font-mono font-black text-white tabular-nums tracking-tighter">
                      {formatDuration(sessionDuration)}
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <div className="text-[8px] font-black text-white/30 uppercase tracking-[0.3em] mb-1 flex items-center gap-1.5">
                      <Globe className="w-3 h-3 text-white/20" /> Region
                    </div>
                    <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-wider transition-all duration-700 ${isEmergency ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' : 'bg-blue-500/10 border-blue-500/30 text-blue-400'}`}>
                      GTA-SOUTH
                    </div>
                </div>
             </div>
           )}

           <button 
              disabled={isConnecting}
              onClick={() => isConnected ? disconnect() : connect()}
              className={`group relative flex items-center gap-4 px-10 py-4 rounded-xl font-black text-[11px] transition-all active:scale-95 uppercase tracking-[0.25em] shadow-2xl overflow-hidden ${
                  isConnected 
                  ? 'bg-black text-rose-500 border border-rose-500/30 hover:bg-rose-950/20 shadow-rose-900/20' 
                  : isConnecting
                    ? 'bg-white/5 text-white/20 cursor-not-allowed border-white/5 border'
                    : 'bg-white text-slate-950 hover:bg-slate-100'
              }`}
           >
              {isConnecting ? <Loader2 className="w-4 h-4 animate-spin" /> : isConnected ? <MicOff className="w-4 h-4" /> : <PhoneCall className="w-4 h-4" />}
              {isConnecting ? 'Linking...' : isConnected ? 'Kill Uplink' : 'Establish Uplink'}
           </button>
        </div>
      </header>

      <main className="pt-20 h-screen flex relative z-10">
        
        {/* Communication Hub */}
        <section className="flex-1 flex flex-col bg-black/40 backdrop-blur-sm border-r border-white/5">
            
            {/* Audio Visualization - Cinematic Field */}
            <div className={`h-[45%] relative flex items-center justify-center overflow-hidden border-b border-white/5 transition-all duration-1000 ${isEmergency ? 'bg-rose-950/10' : 'bg-blue-950/10'}`}>
                {/* Visualizer Grid Decoration */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
                
                <div className="w-full h-full relative z-10">
                    <WaveVisualizer isConnected={isConnected} isSpeaking={isSpeaking} volume={volume} isEmergency={isEmergency} />
                </div>
                
                {/* Visual Telemetry Overlays */}
                <div className="absolute top-8 left-8 flex flex-col gap-3">
                   <div className={`flex items-center gap-3 px-4 py-2 rounded-lg backdrop-blur-2xl border ${isEmergency ? 'bg-rose-500/10 border-rose-500/20' : 'bg-blue-500/10 border-blue-500/30'}`}>
                      <Activity className={`w-3.5 h-3.5 animate-pulse ${isEmergency ? 'text-rose-500' : 'text-blue-400'}`} />
                      <span className="text-[9px] font-black text-white uppercase tracking-[0.4em]">Intercept Active</span>
                   </div>
                </div>

                <div className="absolute bottom-8 right-8 flex flex-col items-end gap-2">
                   <div className="flex items-center gap-2">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className={`w-1 rounded-full transition-all duration-300 ${isSpeaking ? (isEmergency ? 'bg-rose-500' : 'bg-blue-400') : 'bg-white/10'}`} style={{ height: `${8 + Math.random() * 20}px`, opacity: 0.3 + Math.random() * 0.7 }} />
                      ))}
                   </div>
                   <div className="text-[8px] font-black text-white/20 uppercase tracking-[0.5em]">Neural Load</div>
                </div>
            </div>

            {/* Live Transcript Stream */}
            <div className="flex-1 flex flex-col min-h-0 bg-black/20 overflow-hidden">
                <Transcript messages={messages} persona={leadDetails.agentPersona} />
            </div>
            
            {/* Command Ticker */}
            <footer className="h-10 bg-black/60 border-t border-white/5 flex items-center overflow-hidden">
               <div className="flex items-center gap-12 animate-marquee whitespace-nowrap px-8">
                  <TickerItem label="MISSISSAUGA" status="Optimal" />
                  <TickerItem label="BRAMPTON" status="Emergency Units Deployed" />
                  <TickerItem label="GEORGETOWN" status="Grid Stable" />
                  <TickerItem label="EAST YORK" status="Peak Efficiency" />
                  <TickerItem label="ETOBICOKE" status="Commercial Grid Heavy" />
                  <TickerItem label="SCARBOROUGH" status="Signal Clear" />
               </div>
            </footer>
        </section>

        {/* Lead Intelligence Terminal - REPOSITIONED AND REFINED */}
        <aside className="w-[520px] flex flex-col bg-[#fcfdfe] z-20 overflow-hidden shadow-[-10px_0_50px_rgba(0,0,0,0.4)] border-l border-slate-200">
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <InfoPanel lead={leadDetails} isConnected={isConnected} />
                
                {/* Secondary HUD Analytics Widget */}
                <div className="px-8 pb-12 pt-0">
                   <div className="p-8 bg-slate-950 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-100" />
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                           <div>
                              <div className="text-[8px] font-black text-blue-500 uppercase tracking-[0.5em] mb-1">Fleet Dynamics</div>
                              <h4 className="text-lg font-black text-white italic tracking-tighter uppercase leading-none">Regional Context</h4>
                           </div>
                           <Navigation className="w-5 h-5 text-white/20" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                           <div className="bg-white/[0.03] p-5 rounded-2xl border border-white/5 backdrop-blur-md">
                              <div className="text-[7px] font-black text-white/30 uppercase tracking-widest mb-2">Dispatcher ETA</div>
                              <div className="text-2xl font-black text-white font-mono tracking-tighter italic">38m <span className="text-[9px] text-emerald-400 not-italic tracking-normal font-bold">ALPHA</span></div>
                           </div>
                           <div className="bg-white/[0.03] p-5 rounded-2xl border border-white/5 backdrop-blur-md">
                              <div className="text-[7px] font-black text-white/30 uppercase tracking-widest mb-2">Active Nodes</div>
                              <div className="text-2xl font-black text-white font-mono tracking-tighter italic">14 <span className="text-[9px] text-blue-400 not-italic tracking-normal font-bold">STABLE</span></div>
                           </div>
                        </div>
                      </div>
                   </div>
                </div>
            </div>
        </aside>

      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }

        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        .animate-scan {
          animation: scan 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

const TickerItem = ({ label, status }: any) => (
  <div className="flex items-center gap-3">
    <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest">{label}:</span>
    <span className="text-[8px] font-bold text-white/30 uppercase tracking-tight">{status}</span>
    <div className="w-1 h-1 rounded-full bg-white/10" />
  </div>
);

export default App;
