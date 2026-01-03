import React, { useState } from 'react';
import { useGeminiLive } from './hooks/useGeminiLive';
import { WaveVisualizer } from './components/WaveVisualizer';
import { InfoPanel } from './components/InfoPanel';
import { DashboardCharts } from './components/DashboardCharts';
import { Transcript } from './components/Transcript';
import { LeadDetails } from './types';
import { MicOff, PhoneCall, AlertCircle, Snowflake, Activity, Sliders, Cpu, History } from 'lucide-react';

const App: React.FC = () => {
  const [leadDetails, setLeadDetails] = useState<Partial<LeadDetails>>({});
  
  const handleLeadUpdate = (details: Partial<LeadDetails>) => {
    setLeadDetails(prev => ({ ...prev, ...details }));
  };

  const { 
    connect, 
    disconnect, 
    isConnected, 
    isSpeaking, 
    volume, 
    error,
    micSensitivity,
    setMicSensitivity,
    messages
  } = useGeminiLive({
    onLeadCaptured: handleLeadUpdate
  });

  return (
    <div className="min-h-screen bg-[#050810] text-slate-200 font-sans selection:bg-sky-500/30 overflow-hidden relative">
      
      {/* 2026 Neural Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-tr from-sky-900/10 via-transparent to-indigo-900/10 pointer-events-none" />

      {/* Modern Floating Header */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50">
        <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] px-8 h-20 flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-5">
             <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.3)] group cursor-pointer hover:rotate-12 transition-transform">
                <Snowflake className="w-7 h-7 text-white" />
             </div>
             <div>
                <h1 className="text-xl font-black tracking-tight text-white uppercase italic">
                    Toronto Air <span className="text-sky-400">Systems</span>
                </h1>
                <div className="flex items-center gap-2">
                   <div className="flex items-center gap-1.5 px-2 py-0.5 bg-sky-500/10 rounded border border-sky-500/20">
                      <Cpu className="w-3 h-3 text-sky-400" />
                      <span className="text-[10px] font-bold text-sky-400 uppercase tracking-tighter">Marcus Core v2.6</span>
                   </div>
                </div>
             </div>
          </div>

          <div className="hidden lg:flex items-center gap-8">
             <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Global Dispatch Status</span>
                <span className="text-xs font-mono text-emerald-400">ALL SYSTEMS NOMINAL</span>
             </div>
             <div className="h-8 w-px bg-white/10" />
             <button 
                onClick={() => isConnected ? disconnect() : connect()}
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg active:scale-95 ${
                    isConnected 
                    ? 'bg-rose-500/10 border border-rose-500/50 text-rose-400 hover:bg-rose-500/20' 
                    : 'bg-sky-500 text-white hover:bg-sky-400 hover:shadow-sky-500/20'
                }`}
             >
                {isConnected ? <MicOff className="w-4 h-4" /> : <PhoneCall className="w-4 h-4" />}
                {isConnected ? 'Terminate Feed' : 'Establish Link'}
             </button>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-8 px-6 max-w-[1800px] mx-auto h-screen flex flex-col gap-6 relative z-10">
        
        {error && (
            <div className="absolute top-32 left-1/2 -translate-x-1/2 z-50 bg-rose-500/20 border border-rose-500/50 text-rose-100 px-8 py-3 rounded-2xl backdrop-blur-xl flex items-center gap-3 shadow-2xl animate-in zoom-in slide-in-from-top-4">
                <AlertCircle className="w-5 h-5 text-rose-400" />
                <span className="font-bold text-sm tracking-tight">{error}</span>
            </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
            
            {/* MAIN INTERACTIVE CORE */}
            <div className="lg:col-span-8 flex flex-col gap-6 h-full">
                
                {/* Visualizer Bento Box */}
                <div className="relative flex-[1.4] bg-slate-900/40 border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl backdrop-blur-md group">
                    <div className="absolute top-8 left-10 z-20">
                       <span className="text-[10px] font-black text-sky-500/50 uppercase tracking-[0.3em] block mb-2">Neural Interface</span>
                       <div className="flex items-center gap-3">
                          <Activity className={`w-5 h-5 ${isSpeaking ? 'text-sky-400 animate-pulse' : 'text-slate-600'}`} />
                          <h2 className="text-2xl font-black text-white tracking-tighter italic">
                             {isSpeaking ? 'MARCUS ACTIVE' : isConnected ? 'LISTENING' : 'STANDBY'}
                          </h2>
                       </div>
                    </div>

                    {/* Sensitivity Control: Minimalist HUD */}
                    <div className="absolute top-8 right-10 z-20 flex flex-col items-end gap-2 group/sens">
                        <div className="flex items-center gap-3 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/5 transition-all group-hover/sens:border-sky-500/30">
                            <Sliders className="w-3.5 h-3.5 text-slate-400" />
                            <input 
                                type="range" min="0" max="1" step="0.01" value={micSensitivity}
                                onChange={(e) => setMicSensitivity(parseFloat(e.target.value))}
                                className="w-24 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-sky-400 [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                            />
                        </div>
                        <span className="text-[10px] font-bold text-slate-600 tracking-widest opacity-0 group-hover/sens:opacity-100 transition-opacity uppercase">Input Gain</span>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <WaveVisualizer isConnected={isConnected} isSpeaking={isSpeaking} volume={volume} />
                    </div>

                    {/* Quick Stats Overlay */}
                    <div className="absolute bottom-10 left-10 flex gap-10">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Model Latency</span>
                            <span className="text-lg font-mono font-bold text-white">42ms</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Memory Usage</span>
                            <span className="text-lg font-mono font-bold text-white">1.2GB</span>
                        </div>
                    </div>
                </div>

                {/* Lower Bento Grid */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[280px]">
                     <div className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-md overflow-hidden flex flex-col">
                        <DashboardCharts />
                     </div>
                     <div className="h-full bg-slate-900/40 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-md">
                        <div className="h-full flex flex-col">
                           <div className="px-8 py-4 bg-white/5 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                 <History className="w-4 h-4 text-sky-400" />
                                 <span className="text-xs font-black uppercase tracking-widest text-slate-400">Live Transcript</span>
                              </div>
                              <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                           </div>
                           <div className="flex-1 overflow-hidden">
                              <Transcript messages={messages} />
                           </div>
                        </div>
                     </div>
                </div>
            </div>

            {/* INTELLIGENCE PANEL */}
            <div className="lg:col-span-4 h-full">
                <InfoPanel lead={leadDetails} isConnected={isConnected} />
            </div>
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
        @keyframes neural-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default App;