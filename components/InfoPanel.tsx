
import React from 'react';
import { LeadDetails } from '../types';
import { 
  ShieldCheck, 
  User, 
  Phone, 
  MapPin, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  BadgeAlert,
  Home,
  Waves,
  TrendingUp,
  Building2,
  HardHat,
  Activity,
  Database,
  Search,
  Navigation
} from 'lucide-react';

interface InfoPanelProps {
  lead: Partial<LeadDetails>;
  isConnected: boolean;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ lead, isConnected }) => {
  const isHeritage = lead.address?.toLowerCase().includes('heritage') || 
                     lead.heatingSource === 'oil';
  const isEmergency = lead.agentPersona === 'mike' || lead.type === 'emergency';
  const isCommercial = lead.marketType === 'commercial';

  return (
    <div className="flex flex-col bg-[#fcfdfe] relative min-h-full">
      {/* Dynamic Intelligence Header */}
      <div className={`h-48 relative overflow-hidden flex flex-col justify-end p-10 transition-all duration-1000 ${isEmergency ? 'bg-rose-950' : 'bg-slate-900'}`}>
        <div className="absolute inset-0 opacity-[0.1] pointer-events-none" style={{ backgroundImage: `linear-gradient(#fff 1.5px, transparent 1.5px), linear-gradient(90deg, #fff 1.5px, transparent 1.5px)`, backgroundSize: '32px 32px' }} />
        <div className={`absolute top-0 right-0 w-96 h-96 blur-[120px] rounded-full -mr-48 -mt-48 transition-colors duration-1000 ${isEmergency ? 'bg-rose-500/40' : 'bg-blue-500/30'}`} />
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-xl backdrop-blur-2xl border-2 ${isEmergency ? 'bg-rose-500/20 border-rose-500/40 shadow-rose-900/40' : 'bg-blue-500/20 border-blue-500/40 shadow-blue-900/40'}`}>
                <Database className={`w-5 h-5 ${isEmergency ? 'text-rose-400' : 'text-blue-400'}`} />
              </div>
              <h3 className={`text-[11px] font-black uppercase tracking-[0.6em] ${isEmergency ? 'text-rose-400/90' : 'text-blue-400/90'}`}>
                EXTRACTION ENGINE v2.5
              </h3>
          </div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none italic flex items-center gap-6">
              {isCommercial ? 'Facility Metadata' : 'Intelligence Terminal'}
              {isConnected && (
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 w-4 h-4 rounded-full bg-emerald-500 animate-ping opacity-50" />
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
                </div>
              )}
          </h2>
        </div>
      </div>

      <div className="p-10 space-y-12">
        {/* Context Chip Array */}
        <div className="flex flex-wrap gap-3">
          <div className={`px-5 py-2.5 rounded-2xl flex items-center gap-3 border-2 transition-all duration-700 ${isCommercial ? 'bg-slate-900 border-slate-950 text-white shadow-2xl scale-105' : 'bg-slate-100 border-slate-200 text-slate-800 shadow-sm'}`}>
            {isCommercial ? <Building2 className="w-4.5 h-4.5 text-blue-400" /> : <Home className="w-4.5 h-4.5 text-slate-500" />}
            <span className="text-[11px] font-black uppercase tracking-widest leading-none">{lead.marketType} OPERATIONS</span>
          </div>
          {isHeritage && (
            <div className="px-5 py-2.5 bg-amber-50 text-amber-800 rounded-2xl flex items-center gap-3 border-2 border-amber-200 shadow-md animate-in zoom-in duration-500">
              <ShieldCheck className="w-4.5 h-4.5" />
              <span className="text-[11px] font-black uppercase tracking-widest leading-none">HERITAGE ASSET</span>
            </div>
          )}
          <div className="px-5 py-2.5 bg-white text-slate-400 rounded-2xl flex items-center gap-3 border-2 border-slate-100 shadow-sm">
            <Search className="w-4.5 h-4.5" />
            <span className="text-[11px] font-black uppercase tracking-widest leading-none">AUTO-SYNC ACTIVE</span>
          </div>
        </div>

        {/* Primary Data Hub - BIG AND BOLD */}
        <div className="space-y-4">
          <TacticalField 
            label="CUSTOMER IDENTITY" 
            value={lead.name} 
            icon={<User className="w-7 h-7" />} 
            active={isConnected}
          />
          <TacticalField 
            label="VERIFIED CONTACT LINE" 
            value={lead.phone} 
            icon={<Phone className="w-7 h-7" />} 
            active={isConnected}
          />
          <TacticalField 
            label="SERVICE COORDINATES" 
            value={lead.address} 
            icon={<MapPin className="w-7 h-7" />} 
            active={isConnected}
          />

          <div className="pt-10 grid grid-cols-2 gap-6">
               <StatusCard 
                  label="INQUIRY VECTOR"
                  value={lead.type || 'IDENTIFYING...'}
                  icon={<BadgeAlert className="w-5 h-5" />}
                  isActive={!!lead.type}
                  isEmergency={isEmergency}
               />
               <StatusCard 
                  label="ENERGY PROFILE"
                  value={lead.heatingSource || 'ANALYZING...'}
                  icon={<Zap className="w-5 h-5" />}
                  isActive={!!lead.heatingSource}
                  isEmergency={false}
               />
          </div>
        </div>

        {/* Operational Logistics */}
        <div className="pt-6">
          <div className="flex items-center justify-between mb-8 border-b-2 border-slate-100 pb-5">
            <span className="text-[12px] font-black text-slate-500 uppercase tracking-[0.6em]">TACTICAL ELIGIBILITY</span>
            <TrendingUp className="w-5 h-5 text-slate-300" />
          </div>
          
          <div className="space-y-4">
            {isCommercial ? (
              <LogisticsTier 
                title="Commercial RTU Compliance"
                subtitle="Qualified for Multi-Node Inspection"
                icon={<HardHat className="w-6 h-6" />}
                status={true}
              />
            ) : (
              <LogisticsTier 
                title="HRS Heat Pump Grant (2026)"
                subtitle="Full Incentive Access: $7,500 Max"
                icon={<CheckCircle2 className="w-6 h-6" />}
                status={lead.heatingSource === 'electric' || lead.heatingSource === 'oil'}
              />
            )}
            <LogisticsTier 
              title="Fixed-Rate Quote Logic"
              subtitle="Toronto Air Protocol Verification: PASS"
              icon={<ShieldCheck className="w-6 h-6" />}
              status={true}
            />
          </div>
        </div>

        {/* Fleet Metrics Dashboard (Integrated) */}
        <div className="pt-8">
           <div className="p-10 bg-slate-950 rounded-[2.5rem] shadow-2xl relative overflow-hidden group border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-100" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
                   <div>
                      <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em] mb-2">NETWORK DYNAMICS</div>
                      <h4 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">REGIONAL STATUS</h4>
                   </div>
                   <Navigation className="w-7 h-7 text-white/30 group-hover:text-blue-400 transition-colors" />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                   <div className="bg-white/[0.05] p-6 rounded-2xl border border-white/10 backdrop-blur-xl">
                      <div className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-3">AVERAGE ETA</div>
                      <div className="text-4xl font-black text-white font-mono tracking-tighter italic leading-none">38m <span className="text-xs text-emerald-400 not-italic tracking-normal font-black">FAST</span></div>
                   </div>
                   <div className="bg-white/[0.05] p-6 rounded-2xl border border-white/10 backdrop-blur-xl">
                      <div className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-3">NODES ONLINE</div>
                      <div className="text-4xl font-black text-white font-mono tracking-tighter italic leading-none">14 <span className="text-xs text-blue-400 not-italic tracking-normal font-black">SYNCED</span></div>
                   </div>
                </div>
              </div>
           </div>
        </div>

        {/* Dispatch Commitment Module - FINAL CTA */}
        <div className="relative pt-10 pb-20">
          <div className="relative bg-slate-900 border-2 border-white/10 p-10 rounded-[3rem] shadow-2xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-[90px] -mr-24 -mt-24" />
              
              <div className="relative z-10 flex flex-col gap-10">
                  <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.5em]">AUTH SIGNATURE</span>
                        <div className="flex items-center gap-4">
                           <ShieldCheck className="w-5 h-5 text-emerald-500" />
                           <span className="text-sm font-black text-white uppercase tracking-[0.3em] font-mono">READY FOR DISPATCH</span>
                        </div>
                      </div>
                      <Waves className="w-10 h-10 text-white/10 animate-pulse" />
                  </div>

                  <button className={`w-full py-7 rounded-[2rem] text-[18px] font-black uppercase tracking-[0.5em] flex items-center justify-center gap-6 transition-all active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 ${
                    isEmergency 
                    ? 'bg-rose-600 border-rose-400 text-white hover:bg-rose-500 shadow-rose-950/50' 
                    : 'bg-white border-white text-slate-950 hover:bg-slate-50 shadow-blue-950/20'
                  }`}>
                    DEPLOY TECHNICIAN <ArrowRight className="w-7 h-7 group-hover:translate-x-3 transition-transform duration-500" />
                  </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TacticalField = ({ label, value, icon, active }: { label: string, value?: string, icon: React.ReactNode, active: boolean }) => (
    <div className={`flex items-center justify-between py-8 transition-all duration-700 border-b-2 border-slate-100 ${value ? 'bg-blue-50/30 px-6 rounded-[2rem] -mx-4 shadow-sm' : ''}`}>
        <div className="flex items-center gap-8">
            <div className={`w-14 h-14 rounded-[1.4rem] transition-all duration-700 flex items-center justify-center border-2 ${
              value ? 'bg-slate-900 text-white border-slate-950 shadow-2xl scale-110' : 'bg-slate-50 text-slate-300 border-slate-100'
            }`}>
                {React.cloneElement(icon as React.ReactElement, { className: 'w-7 h-7' })}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.6em] mb-2 leading-none">{label}</span>
              <span className={`text-2xl font-black tracking-tighter transition-all font-mono italic leading-none truncate max-w-[280px] ${
                value ? 'text-slate-950 not-italic' : active ? 'text-slate-200 animate-pulse' : 'text-slate-100'
              }`}>
                  {value || (active ? 'EXTRACTING...' : 'STANDBY')}
              </span>
            </div>
        </div>
        {value && (
          <div className="flex items-center justify-center w-9 h-9 bg-emerald-100 text-emerald-600 rounded-full border-2 border-emerald-200 shadow-sm shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        )}
    </div>
);

const StatusCard = ({ label, value, icon, isActive, isEmergency }: any) => (
  <div className={`p-7 rounded-[2.2rem] border-3 transition-all duration-700 relative overflow-hidden ${
    isActive 
      ? (isEmergency ? 'bg-rose-50 border-rose-200 shadow-lg scale-105' : 'bg-blue-50 border-blue-200 shadow-lg scale-105') 
      : 'bg-slate-50 border-slate-100'
  }`}>
    <div className="flex items-center gap-4 mb-5">
       <div className={`p-2.5 rounded-xl ${isActive ? (isEmergency ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600') : 'bg-white text-slate-200 border-2 border-slate-100'}`}>
          {React.cloneElement(icon, { className: 'w-5 h-5' })}
       </div>
       <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest leading-none">{label}</div>
    </div>
    <div className={`text-2xl font-black uppercase tracking-tight font-mono leading-none ${
      isActive 
        ? (isEmergency ? 'text-rose-600' : 'text-slate-950') 
        : 'text-slate-200 italic'
    }`}>
      {value}
    </div>
  </div>
);

const LogisticsTier = ({ title, subtitle, icon, status }: any) => (
  <div className={`p-7 rounded-[2.5rem] border-2 transition-all duration-500 flex items-center justify-between ${
    status ? 'bg-white border-blue-600 shadow-[0_15px_40px_rgba(59,130,246,0.2)] scale-[1.03]' : 'bg-slate-50 border-slate-100 opacity-60'
  }`}>
    <div className="flex items-center gap-6">
       <div className={`p-4 rounded-2xl ${status ? 'bg-blue-600 text-white shadow-2xl' : 'bg-white text-slate-200 border-2 border-slate-100'}`}>
          {icon}
       </div>
       <div className="flex flex-col gap-2">
          <span className={`text-sm font-black uppercase tracking-wider ${status ? 'text-slate-950' : 'text-slate-500'}`}>{title}</span>
          <span className={`text-[10px] font-bold ${status ? 'text-blue-600' : 'text-slate-300'}`}>{subtitle}</span>
       </div>
    </div>
    {status && (
      <div className="relative flex items-center justify-center w-4 h-4">
        <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-30" />
        <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.9)]" />
      </div>
    )}
  </div>
);
