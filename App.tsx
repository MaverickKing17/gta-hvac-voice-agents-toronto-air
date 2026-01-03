
import React, { useState, useEffect } from 'react';
import { useGeminiLive } from './hooks/useGeminiLive';
import { WaveVisualizer } from './components/WaveVisualizer';
import { InfoPanel } from './components/InfoPanel';
import { Transcript } from './components/Transcript';
import { DashboardCharts } from './components/DashboardCharts';
import { LeadDetails } from './types';
import { MicOff, PhoneCall, AlertCircle, Snowflake, Loader2, Activity, Globe, Shield, Clock, BarChart3 } from 'lucide-react';

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
    error,
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
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-200/50 overflow-hidden relative">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-600 z-[60]" />
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-indigo-100/30 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Clean Glass Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl px-10 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-6">
           <div className="relative">
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-xl blur opacity-25"></div>
              <div className="relative w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg border border-white/20">
                 <Snowflake className="w-6 h-6 text-white" />
              </div>
           </div>
           
           <div className="flex flex-col">
              <h1 className="text-lg font-black tracking-tight text-slate-900 uppercase italic leading-none">
                  Toronto Air <span className="text-blue-600 font-medium tracking-normal not-italic">Systems</span>
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Melissa Intelligence Core v2.5</span>
              </div>
           </div>
        </div>

        <div className="flex items-center gap-8">
           {isConnected && (
             <div className="flex items-center gap-8 pr-8 border-r border-slate-200">
                <div className="flex flex-col items-end">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5 flex items-center gap-1.5">
                      <Clock className="w-2.5 h-2.5 text-blue-500" /> Active Uplink
                    </span>
                    <span className="text-sm font-mono font-bold text-blue-600 tabular-nums">
                      {formatDuration(sessionDuration)}
                    </span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5 flex items-center gap-1.5">
                      <Shield className="w-2.5 h-2.5 text-emerald-500" /> Status
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-600 uppercase">Secure</span>
                </div>
             </div>
           )}

           <button 
              disabled={isConnecting}
              onClick={() => isConnected ? disconnect() : connect()}
              className={`group relative flex items-center gap-3 px-8 py-3 rounded-full font-black text-[11px] transition-all active:scale-95 uppercase tracking-[0.15em] overflow-hidden ${
                  isConnected 
                  ? 'bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100' 
                  : isConnecting
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-slate-900 text-white shadow-xl hover:shadow-blue-200/50'
              }`}
           >
              {!isConnected && !isConnecting && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {isConnecting ? <Loader2 className="w-4 h-4 animate-spin" /> : isConnected ? <MicOff className="w-4 h-4" /> : <PhoneCall className="w-4 h-4" />}
                {isConnecting ? 'Initializing...' : isConnected ? 'End Session' : 'Establish Dispatch'}
              </span>
           </button>
        </div>
      </header>

      <main className="pt-20 h-screen flex relative z-10">
        
        {/* Left: Operations & Log */}
        <section className="flex-1 flex flex-col border-r border-slate-200/60 overflow-hidden bg-white/30">
            
            {/* Visualizer Section */}
            <div className="h-[35%] relative flex items-center justify-center overflow-hidden border-b border-slate-100 bg-slate-50/30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05)_0%,transparent_70%)]" />
                <div className="w-full h-full max-w-2xl">
                    <WaveVisualizer isConnected={isConnected} isSpeaking={isSpeaking} volume={volume} />
                </div>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-2.5 bg-white/80 border border-white rounded-full shadow-xl backdrop-blur-xl">
                   <Activity className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                   <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Prismatic Signal Monitor</span>
                </div>
            </div>

            {/* Transcription Log */}
            <div className="flex-1 flex flex-col min-h-0">
                <Transcript messages={messages} />
            </div>
        </section>

        {/* Right: Intelligence & Data */}
        <aside className="w-[520px] flex flex-col bg-white/60 backdrop-blur-sm border-l border-slate-200 shadow-[-20px_0_50px_-30px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <InfoPanel lead={leadDetails} isConnected={isConnected} />
                
                {/* Visual Data Layer */}
                <div className="px-12 pb-12">
                   <div className="p-8 bg-slate-900 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-1000" />
                      <DashboardCharts />
                   </div>
                   
                   <div className="mt-8 flex items-center justify-between p-6 bg-blue-50/50 rounded-3xl border border-blue-100">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg">
                          <BarChart3 className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-0.5">Fleet Efficiency</div>
                          <div className="text-sm font-bold text-slate-900">98.4% Optimization</div>
                        </div>
                      </div>
                      <div className="h-2 w-24 bg-blue-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 w-[92%] shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                      </div>
                   </div>
                </div>
            </div>
        </aside>

      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.08); border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.15); }
      `}</style>
    </div>
  );
};

export default App;
