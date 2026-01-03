
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
  Map as MapIcon,
  Navigation,
  HardHat
} from 'lucide-react';

const App: React.FC = () => {
  const [leadDetails, setLeadDetails] = useState<Partial<LeadDetails>>({});
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

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-[#001f3f] font-sans selection:bg-blue-100 overflow-hidden relative">
      
      {/* Brand Accent Bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#003366] via-[#004d99] to-[#cc0000] z-[60]" />
      
      {/* Stylized GTA Grid Map Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style={{ 
        backgroundImage: `radial-gradient(#003366 1px, transparent 1px)`, 
        backgroundSize: '40px 40px' 
      }} />

      {/* Corporate Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-24 border-b border-slate-200 bg-white/95 backdrop-blur-md px-12 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-8">
           <div className="flex items-center gap-4 border-r border-slate-200 pr-8">
              <div className="w-12 h-12 rounded-xl bg-[#003366] flex items-center justify-center shadow-lg">
                 <Snowflake className="w-7 h-7 text-white" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-black tracking-tight text-[#003366] uppercase italic leading-none">
                    Toronto Air <span className="text-[#cc0000] font-bold tracking-normal not-italic">Systems</span>
                </h1>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1.5">Heritage Home Specialist</span>
              </div>
           </div>
           
           <div className="hidden lg:flex items-center gap-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider">Melissa Core v2.5 Online</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <MapIcon className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Active in: GTA & Golden Horseshoe</span>
              </div>
           </div>
        </div>

        <div className="flex items-center gap-6">
           {isConnected && (
             <div className="flex items-center gap-10 pr-10 border-r border-slate-200">
                <div className="text-right">
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center justify-end gap-1.5">
                      <Clock className="w-3 h-3 text-[#003366]" /> Call Timer
                    </div>
                    <div className="text-lg font-mono font-bold text-[#003366] tabular-nums">
                      {formatDuration(sessionDuration)}
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center justify-end gap-1.5">
                      <ShieldCheck className="w-3 h-3 text-emerald-500" /> Security
                    </div>
                    <div className="text-sm font-bold text-emerald-600 uppercase">Encrypted</div>
                </div>
             </div>
           )}

           <button 
              disabled={isConnecting}
              onClick={() => isConnected ? disconnect() : connect()}
              className={`group flex items-center gap-3 px-10 py-4 rounded-full font-black text-[12px] transition-all active:scale-95 uppercase tracking-[0.2em] shadow-xl ${
                  isConnected 
                  ? 'bg-white text-[#cc0000] border-2 border-[#cc0000] hover:bg-[#cc0000]/5' 
                  : isConnecting
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-[#003366] text-white hover:bg-[#002244] hover:shadow-[#003366]/30'
              }`}
           >
              {isConnecting ? <Loader2 className="w-4 h-4 animate-spin" /> : isConnected ? <MicOff className="w-4 h-4" /> : <PhoneCall className="w-4 h-4" />}
              {isConnecting ? 'Initializing Link...' : isConnected ? 'Disconnect Agent' : 'Establish Dispatch Link'}
           </button>
        </div>
      </header>

      <main className="pt-24 h-screen flex relative z-10">
        
        {/* Left: Dispatch Center */}
        <section className="flex-1 flex flex-col border-r border-slate-200 bg-white/40">
            
            {/* Precision Oscilloscope Section */}
            <div className="h-[40%] relative flex items-center justify-center overflow-hidden border-b border-slate-200 bg-[#001f3f]">
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ 
                  backgroundImage: `linear-gradient(#ffffff11 1px, transparent 1px), linear-gradient(90deg, #ffffff11 1px, transparent 1px)`, 
                  backgroundSize: '20px 20px' 
                }} />
                
                <div className="w-full h-full relative z-10">
                    <WaveVisualizer isConnected={isConnected} isSpeaking={isSpeaking} volume={volume} />
                </div>
                
                <div className="absolute top-6 left-8 flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-lg backdrop-blur-md">
                   <Activity className="w-4 h-4 text-[#0099cc] animate-pulse" />
                   <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.3em]">Signal Diagnostic</span>
                </div>

                <div className="absolute bottom-6 right-8 flex items-center gap-6">
                    <div className="flex flex-col items-end">
                      <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Gain Level</span>
                      <div className="h-1 w-24 bg-white/10 rounded-full mt-1 overflow-hidden">
                        <div className="h-full bg-[#0099cc]" style={{ width: `${Math.min(100, volume * 1.5)}%` }} />
                      </div>
                    </div>
                </div>
            </div>

            {/* Live Transcription Log */}
            <div className="flex-1 flex flex-col min-h-0 bg-white/80">
                <Transcript messages={messages} />
            </div>
        </section>

        {/* Right: Technical Lead & Fleet Data */}
        <aside className="w-[580px] flex flex-col bg-[#f8fafc] border-l border-slate-200 shadow-2xl z-20 overflow-hidden">
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <InfoPanel lead={leadDetails} isConnected={isConnected} />
                
                {/* Fleet & Logistics Widget */}
                <div className="px-12 pb-12">
                   <div className="p-8 bg-[#001f3f] rounded-3xl shadow-2xl relative overflow-hidden group border border-[#003366]">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-[60px]" />
                      
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-8">
                           <div>
                              <h4 className="text-[10px] font-black text-[#0099cc] uppercase tracking-[0.3em] mb-2">Fleet Intelligence</h4>
                              <div className="text-xl font-bold text-white uppercase italic tracking-tighter">GTA Logistics Status</div>
                           </div>
                           <HardHat className="w-8 h-8 text-white/10" />
                        </div>
                        
                        <div className="space-y-6">
                           <LogisticItem label="Available Technicians" value="14 Units" progress={85} color="emerald" />
                           <LogisticItem label="Emergency Response Load" value="High" progress={70} color="amber" />
                           <LogisticItem label="Avg. Arrival Window" value="2.4 Hours" progress={92} color="blue" />
                        </div>
                      </div>
                   </div>
                   
                   <div className="mt-8 flex items-center justify-between p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-[#003366] rounded-xl text-white">
                          <Navigation className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-[10px] font-black text-[#003366] uppercase tracking-widest mb-0.5">Coverage Lock</div>
                          <div className="text-sm font-bold text-slate-600">All GTA Zones Active</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Live 24/7</span>
                   </div>
                </div>
            </div>
        </aside>

      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
};

const LogisticItem = ({ label, value, progress, color }: any) => {
  const colors: any = {
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    blue: 'bg-blue-500'
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-end">
        <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">{label}</span>
        <span className="text-xs font-bold text-white">{value}</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full transition-all duration-1000 ${colors[color]}`} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export default App;
