
import React from 'react';
import { LeadDetails } from '../types';
import { ShieldCheck, User, Phone, MapPin, Database, Zap, Cpu, ArrowRight, Info, CheckCircle2, TrendingUp } from 'lucide-react';

interface InfoPanelProps {
  lead: Partial<LeadDetails>;
  isConnected: boolean;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ lead, isConnected }) => {
  return (
    <div className="p-12 pb-6 relative overflow-hidden">
      
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]" />
            <h3 className="text-[11px] font-black text-blue-600 uppercase tracking-[0.4em]">Dispatch Analytics</h3>
        </div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none italic">
            Live Acquisition
        </h2>
      </div>

      <div className="space-y-1 mb-10 pr-2">
        <LeadField 
          label="Subject Identity" 
          value={lead.name} 
          icon={<User className="w-5 h-5" />} 
          active={isConnected}
          color="blue"
        />
        <LeadField 
          label="Secure Contact Link" 
          value={lead.phone} 
          icon={<Phone className="w-5 h-5" />} 
          active={isConnected}
          color="indigo"
        />
        <LeadField 
          label="Geospatial Address" 
          value={lead.address} 
          icon={<MapPin className="w-5 h-5" />} 
          active={isConnected}
          color="cyan"
        />

        <div className="pt-8 grid grid-cols-2 gap-4">
             <div className={`group p-6 rounded-3xl border transition-all duration-700 relative overflow-hidden ${lead.type ? 'bg-blue-50/50 border-blue-200' : 'bg-slate-50 border-slate-100'}`}>
                {lead.type && <div className="absolute top-0 right-0 w-16 h-16 bg-blue-600/5 rounded-full -mr-8 -mt-8" />}
                <div className="flex items-center gap-2 mb-2 relative z-10">
                   <Database className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                   <div className="text-[9px] text-slate-400 uppercase font-black tracking-widest">Priority Class</div>
                </div>
                <div className={`text-base font-black uppercase tracking-tight relative z-10 ${lead.type === 'emergency' ? 'text-rose-600' : lead.type ? 'text-slate-900' : 'text-slate-300 italic'}`}>
                  {lead.type || 'Standby'}
                </div>
             </div>
             
             <div className={`group p-6 rounded-3xl border transition-all duration-700 relative overflow-hidden ${lead.heatingSource ? 'bg-amber-50/50 border-amber-200' : 'bg-slate-50 border-slate-100'}`}>
                {lead.heatingSource && <div className="absolute top-0 right-0 w-16 h-16 bg-amber-600/5 rounded-full -mr-8 -mt-8" />}
                <div className="flex items-center gap-2 mb-2 relative z-10">
                   <Zap className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-500 transition-colors" />
                   <div className="text-[9px] text-slate-400 uppercase font-black tracking-widest">Energy Vector</div>
                </div>
                <div className={`text-base font-black uppercase tracking-tight relative z-10 ${lead.heatingSource ? 'text-slate-900' : 'text-slate-300 italic'}`}>
                  {lead.heatingSource || 'Awaiting'}
                </div>
             </div>
        </div>
      </div>

      {/* Verified Rebate Visualization */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">GTA Subsidy Performance</span>
          </div>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Live Market Sync</span>
        </div>
        
        <div className="space-y-4">
          <RebateCard 
            title="HRS Primary Grant"
            amount="$7,500"
            sources="Electric / Oil"
            isSelected={lead.heatingSource === 'electric' || lead.heatingSource === 'oil'}
            color="emerald"
          />
          <RebateCard 
            title="Efficiency Rebate"
            amount="$2,000"
            sources="Natural Gas"
            isSelected={lead.heatingSource === 'gas'}
            color="blue"
          />
        </div>
      </div>
    </div>
  );
};

const RebateCard = ({ title, amount, sources, isSelected, color }: any) => {
  const colorStyles = {
    emerald: isSelected ? 'bg-emerald-50 border-emerald-200 ring-emerald-500/10' : 'border-slate-100',
    blue: isSelected ? 'bg-blue-50 border-blue-200 ring-blue-500/10' : 'border-slate-100'
  };
  const accentText = color === 'emerald' ? 'text-emerald-600' : 'text-blue-600';
  const iconColor = color === 'emerald' ? 'text-emerald-500' : 'text-blue-500';

  return (
    <div className={`p-6 rounded-[2rem] border transition-all duration-500 relative overflow-hidden group ${isSelected ? colorStyles[color as keyof typeof colorStyles] + ' ring-4 shadow-xl' : colorStyles[color as keyof typeof colorStyles] + ' bg-white hover:bg-slate-50'}`}>
      <div className="flex justify-between items-start mb-3">
        <div className={`text-[10px] font-black uppercase tracking-widest ${isSelected ? accentText : 'text-slate-400'}`}>{title}</div>
        {isSelected && <div className={`px-2.5 py-1 ${color === 'emerald' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'} text-[9px] font-black rounded-xl uppercase tracking-tighter`}>Detected</div>}
      </div>
      <div className="flex items-baseline gap-2 mb-4">
        <span className={`text-3xl font-black tracking-tighter ${isSelected ? 'text-slate-900' : 'text-slate-400'}`}>{amount}</span>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Max Funding</span>
      </div>
      <div className="flex items-center gap-2 text-[11px] text-slate-500 font-bold">
        <CheckCircle2 className={`w-4 h-4 ${isSelected ? iconColor : 'text-slate-200'}`} />
        <span className={isSelected ? 'text-slate-700' : 'text-slate-400'}>Qualified: {sources}</span>
      </div>
    </div>
  );
};

const LeadField = ({ label, value, icon, active, color }: { label: string, value?: string, icon: React.ReactNode, active: boolean, color: string }) => {
  const colorMap = {
    blue: 'bg-blue-600 shadow-blue-200',
    indigo: 'bg-indigo-600 shadow-indigo-200',
    cyan: 'bg-cyan-500 shadow-cyan-200'
  };

  return (
    <div className={`group flex items-center justify-between py-6 transition-all duration-500 border-b border-slate-100 hover:border-blue-100`}>
        <div className="flex items-center gap-7">
            <div className={`p-3.5 rounded-2xl transition-all duration-500 ${value ? colorMap[color as keyof typeof colorMap] + ' text-white shadow-xl scale-110' : 'bg-slate-50 text-slate-300'}`}>
                {React.cloneElement(icon as React.ReactElement, { className: 'w-5 h-5' })}
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.25em] mb-1">{label}</span>
              <span className={`text-lg font-bold transition-all ${value ? 'text-slate-900' : active ? 'text-slate-300 italic animate-pulse' : 'text-slate-200'}`}>
                  {value || (active ? 'Monitoring...' : 'Terminal Offline')}
              </span>
            </div>
        </div>
        {value && (
          <div className={`w-3 h-3 rounded-full ${colorMap[color as keyof typeof colorMap].split(' ')[0]} shadow-[0_0_15px_rgba(0,0,0,0.2)] animate-in zoom-in duration-700`} />
        )}
    </div>
  );
};
