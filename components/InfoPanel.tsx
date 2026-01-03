import React from 'react';
import { LeadDetails } from '../types';
import { CheckCircle, Clock, Thermometer, User, Phone, ClipboardList, MapPin, Zap, ShieldCheck } from 'lucide-react';

interface InfoPanelProps {
  lead: Partial<LeadDetails>;
  isConnected: boolean;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ lead, isConnected }) => {
  return (
    <div className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-3xl h-full flex flex-col shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] relative overflow-hidden">
      {/* Sentient Aura Background Glow */}
      <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[100px] transition-colors duration-1000 ${isConnected ? 'bg-sky-500/10' : 'bg-slate-800/20'}`} />
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <h3 className="text-xl font-bold text-white flex items-center gap-3">
          <div className="p-2 bg-sky-500/10 rounded-xl border border-sky-500/20">
               <ClipboardList className="w-5 h-5 text-sky-400" />
          </div>
          Session Intelligence
        </h3>
        {isConnected && (
          <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Live Sync</span>
          </div>
        )}
      </div>

      <div className="space-y-4 flex-1 relative z-10">
        {/* Verification Status */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center justify-between group hover:bg-white/[0.04] transition-all">
           <div className="flex items-center gap-3">
             <ShieldCheck className="w-5 h-5 text-sky-400" />
             <div className="flex flex-col">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">AI Verification</span>
               <span className="text-[10px] text-slate-500 font-mono">2026 Heritage Compliance Mode</span>
             </div>
           </div>
           <Zap className={`w-4 h-4 ${isConnected ? 'text-sky-400 animate-pulse' : 'text-slate-700'}`} />
        </div>

        {/* Data Fields with Glow Effect */}
        <div className="space-y-3 pt-4">
            <DataField 
              label="Lead Identity" 
              value={lead.name} 
              icon={<User className="w-4 h-4" />} 
              verified={!!lead.name}
            />
            <DataField 
              label="Contact Uplink" 
              value={lead.phone} 
              icon={<Phone className="w-4 h-4" />} 
              verified={!!lead.phone}
            />
            <DataField 
              label="Deployment Site" 
              value={lead.address} 
              icon={<MapPin className="w-4 h-4" />} 
              verified={!!lead.address}
            />
            
            <div className="grid grid-cols-2 gap-3">
                 <div className={`p-4 rounded-2xl border transition-all duration-500 ${lead.type ? 'bg-sky-500/10 border-sky-500/30' : 'bg-white/[0.02] border-white/5'}`}>
                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Inquiry Vector</div>
                    <div className="text-sm font-bold text-white capitalize truncate">
                      {lead.type || <span className="text-slate-700">Waiting...</span>}
                    </div>
                 </div>
                 <div className={`p-4 rounded-2xl border transition-all duration-500 ${lead.heatingSource ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-white/[0.02] border-white/5'}`}>
                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Thermal Source</div>
                    <div className="text-sm font-bold text-white capitalize truncate">
                      {lead.heatingSource || <span className="text-slate-700">Detecting...</span>}
                    </div>
                 </div>
            </div>
        </div>
      </div>
      
      {/* Rebate Footer: Bento Style */}
      <div className="mt-8 p-6 bg-gradient-to-br from-sky-500/20 to-indigo-500/20 border border-white/10 rounded-3xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
          <Zap className="w-8 h-8 text-sky-400" />
        </div>
        <div className="text-xs font-black text-sky-400 uppercase tracking-[0.2em] mb-2">Estimated Allocation</div>
        <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">$7,500</span>
            <span className="text-xs text-slate-400 font-bold">2026 HRS Rebate</span>
        </div>
        <div className="mt-3 w-full bg-black/20 h-1.5 rounded-full overflow-hidden">
            <div className="bg-sky-400 h-full w-3/4 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

const DataField = ({ label, value, icon, verified }: { label: string, value?: string, icon: React.ReactNode, verified: boolean }) => (
    <div className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-700 ${verified ? 'bg-slate-800/60 border-sky-500/40 shadow-[0_0_20px_rgba(14,165,233,0.1)]' : 'bg-white/[0.02] border-transparent'}`}>
        <div className="flex items-center gap-4">
            <div className={`p-2.5 rounded-xl transition-colors ${verified ? 'bg-sky-500/20 text-sky-400' : 'bg-slate-800 text-slate-600'}`}>
                {icon}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
              <span className={`text-sm font-semibold transition-all ${verified ? 'text-white translate-x-0' : 'text-slate-700 -translate-x-1'}`}>
                  {value || 'Awaiting Input...'}
              </span>
            </div>
        </div>
        {verified && (
          <CheckCircle className="w-4 h-4 text-emerald-400 animate-in zoom-in duration-500" />
        )}
    </div>
);