import React from 'react';
import { LeadDetails } from '../types';
import { CheckCircle, ShieldCheck, User, Phone, ClipboardList, MapPin, Zap, AlertCircle } from 'lucide-react';

interface InfoPanelProps {
  lead: Partial<LeadDetails>;
  isConnected: boolean;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ lead, isConnected }) => {
  return (
    <div className="bg-[#0f172a]/60 border border-white/5 rounded-[3.5rem] p-10 backdrop-blur-3xl h-full flex flex-col shadow-3xl relative overflow-hidden group">
      {/* Dynamic Background Glow */}
      <div className={`absolute -top-32 -right-32 w-80 h-80 rounded-full blur-[120px] transition-colors duration-1000 ${isConnected ? 'bg-sky-500/10' : 'bg-slate-800/10'}`} />
      
      <div className="flex items-center justify-between mb-10 relative z-10">
        <h3 className="text-xl font-black text-white flex items-center gap-4 uppercase tracking-tighter">
          <div className="p-3 bg-sky-500/10 rounded-2xl border border-sky-500/20 shadow-inner">
               <ClipboardList className="w-6 h-6 text-sky-400" />
          </div>
          Intelligence Unit
        </h3>
        {isConnected && (
          <div className="flex items-center gap-2.5 px-4 py-1.5 bg-sky-500/10 border border-sky-500/20 rounded-full shadow-lg">
            <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
            <span className="text-[10px] font-black text-sky-400 uppercase tracking-[0.2em]">Real-Time Sync</span>
          </div>
        )}
      </div>

      <div className="space-y-5 flex-1 relative z-10">
        {/* Verification Status Banner */}
        <div className="bg-black/40 border border-white/10 rounded-3xl p-5 flex items-center justify-between transition-all hover:border-sky-500/30">
           <div className="flex items-center gap-4">
             <div className="p-2.5 bg-emerald-500/10 rounded-xl">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
             </div>
             <div className="flex flex-col">
               <span className="text-xs font-black text-slate-300 uppercase tracking-tighter">Identity Match</span>
               <span className="text-[10px] text-slate-500 font-mono font-bold">256-BIT SECURE HANDSHAKE</span>
             </div>
           </div>
           {isConnected ? (
             <span className="text-[10px] font-black text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">SECURE</span>
           ) : (
             <span className="text-[10px] font-black text-slate-600 bg-slate-800 px-2 py-1 rounded">PENDING</span>
           )}
        </div>

        {/* Tactical Data Hub */}
        <div className="space-y-4 pt-6">
            <DataField 
              label="Subject Identity" 
              value={lead.name} 
              icon={<User className="w-5 h-5" />} 
              verified={!!lead.name}
              placeholder="Awaiting Voice Input..."
            />
            <DataField 
              label="Communication Link" 
              value={lead.phone} 
              icon={<Phone className="w-5 h-5" />} 
              verified={!!lead.phone}
              placeholder="Listening for Contact..."
            />
            <DataField 
              label="Deployment Sector" 
              value={lead.address} 
              icon={<MapPin className="w-5 h-5" />} 
              verified={!!lead.address}
              placeholder="Scanning Location..."
            />
            
            <div className="grid grid-cols-2 gap-4">
                 <div className={`p-5 rounded-3xl border transition-all duration-700 ${lead.type ? 'bg-sky-500/10 border-sky-500/40 shadow-xl' : 'bg-white/[0.03] border-white/5'}`}>
                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] mb-2">Priority</div>
                    <div className={`text-sm font-black uppercase tracking-tight ${lead.type === 'emergency' ? 'text-rose-400' : 'text-white'}`}>
                      {lead.type || <span className="text-slate-700">None</span>}
                    </div>
                 </div>
                 <div className={`p-5 rounded-3xl border transition-all duration-700 ${lead.heatingSource ? 'bg-indigo-500/10 border-indigo-500/40 shadow-xl' : 'bg-white/[0.03] border-white/5'}`}>
                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] mb-2">Thermal</div>
                    <div className="text-sm font-black text-white uppercase tracking-tight">
                      {lead.heatingSource || <span className="text-slate-700">Detecting</span>}
                    </div>
                 </div>
            </div>
        </div>
      </div>
      
      {/* Demo Footer: The "Closer" */}
      <div className="mt-10 p-8 bg-gradient-to-br from-sky-600/20 to-indigo-600/20 border border-white/10 rounded-[2.5rem] relative overflow-hidden group/footer">
        <div className="absolute top-0 right-0 p-5 opacity-10 group-hover/footer:opacity-40 transition-opacity">
          <Zap className="w-12 h-12 text-sky-400" />
        </div>
        <div className="text-[10px] font-black text-sky-400 uppercase tracking-[0.3em] mb-3">Qualified Rebate Estimate</div>
        <div className="flex items-baseline gap-3 mb-4">
            <span className="text-4xl font-black text-white tracking-tighter">$7,500.00</span>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">HRS FUNDING</span>
        </div>
        <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden p-[2px]">
            <div className={`bg-sky-400 h-full transition-all duration-1000 ${lead.heatingSource ? 'w-full shadow-[0_0_10px_#0ea5e9]' : 'w-1/3'}`} />
        </div>
      </div>
    </div>
  );
};

const DataField = ({ label, value, icon, verified, placeholder }: { label: string, value?: string, icon: React.ReactNode, verified: boolean, placeholder: string }) => (
    <div className={`group flex items-center justify-between p-5 rounded-[1.75rem] border transition-all duration-700 ${verified ? 'bg-slate-800/80 border-sky-500/50 shadow-2xl scale-[1.02]' : 'bg-white/[0.03] border-transparent'}`}>
        <div className="flex items-center gap-5">
            <div className={`p-3 rounded-2xl transition-all ${verified ? 'bg-sky-500/20 text-sky-400 shadow-[0_0_15px_rgba(14,165,233,0.3)]' : 'bg-slate-800 text-slate-600'}`}>
                {icon}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">{label}</span>
              <span className={`text-base font-bold transition-all truncate max-w-[180px] ${verified ? 'text-white' : 'text-slate-700 italic'}`}>
                  {value || placeholder}
              </span>
            </div>
        </div>
        {verified ? (
          <CheckCircle className="w-6 h-6 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)] animate-in zoom-in duration-500" />
        ) : (
          <div className="w-6 h-6 rounded-full border-2 border-slate-800 border-dashed" />
        )}
    </div>
);