
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
  FileText,
  BadgeAlert,
  Home,
  Waves,
  Cpu,
  TrendingUp,
  Building2,
  HardHat,
  ChevronRight,
  Activity
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
    <div className="flex flex-col h-full bg-[#fcfdfe] relative overflow-hidden">
      {/* Tactical Header - High Density Data */}
      <div className={`h-40 relative overflow-hidden flex flex-col justify-end p-8 transition-all duration-1000 ${isEmergency ? 'bg-rose-950' : 'bg-slate-900'}`}>
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
        <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] rounded-full -mr-32 -mt-32 transition-colors duration-1000 ${isEmergency ? 'bg-rose-500/30' : 'bg-blue-500/20'}`} />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg backdrop-blur-md border ${isEmergency ? 'bg-rose-500/20 border-rose-500/30' : 'bg-blue-500/20 border-blue-500/30'}`}>
                <Activity className={`w-3.5 h-3.5 ${isEmergency ? 'text-rose-400' : 'text-blue-400'}`} />
              </div>
              <h3 className={`text-[8px] font-black uppercase tracking-[0.4em] ${isEmergency ? 'text-rose-400/80' : 'text-blue-400/80'}`}>
                Active Terminal Uplink
              </h3>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase leading-none italic flex items-center gap-4">
              {isCommercial ? 'Asset Logistics' : 'Customer Profile'}
              {isConnected && <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
          </h2>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Rapid Context Context */}
        <div className="flex flex-wrap gap-2.5">
          <div className={`px-3.5 py-1.5 rounded-xl flex items-center gap-2 border transition-all duration-500 ${isCommercial ? 'bg-slate-900 border-slate-950 text-white' : 'bg-slate-100 border-slate-200 text-slate-700 shadow-sm'}`}>
            {isCommercial ? <Building2 className="w-3.5 h-3.5 text-blue-400" /> : <Home className="w-3.5 h-3.5 text-slate-400" />}
            <span className="text-[9px] font-black uppercase tracking-wider">{lead.marketType} UNIT</span>
          </div>
          {isHeritage && (
            <div className="px-3.5 py-1.5 bg-amber-50 text-amber-700 rounded-xl flex items-center gap-2 border border-amber-200 shadow-sm">
              <Zap className="w-3.5 h-3.5" />
              <span className="text-[9px] font-black uppercase tracking-wider">Heritage Node</span>
            </div>
          )}
          <div className="px-3.5 py-1.5 bg-white text-slate-400 rounded-xl flex items-center gap-2 border border-slate-100 shadow-sm">
            <Cpu className="w-3.5 h-3.5" />
            <span className="text-[9px] font-black uppercase tracking-wider">Neural Analysis</span>
          </div>
        </div>

        {/* Core Dispatch Fields */}
        <div className="space-y-1">
          <TacticalField 
            label="Customer Identity" 
            value={lead.name} 
            icon={<User className="w-5 h-5" />} 
            active={isConnected}
          />
          <TacticalField 
            label="Verified Contact" 
            value={lead.phone} 
            icon={<Phone className="w-5 h-5" />} 
            active={isConnected}
          />
          <TacticalField 
            label="Service Coordinates" 
            value={lead.address} 
            icon={<MapPin className="w-5 h-5" />} 
            active={isConnected}
          />

          <div className="pt-6 grid grid-cols-2 gap-4">
               <StatusCard 
                  label="Classification"
                  value={lead.type || 'Monitoring...'}
                  icon={<BadgeAlert className="w-4 h-4" />}
                  isActive={!!lead.type}
                  isEmergency={isEmergency}
               />
               <StatusCard 
                  label="Heating Vector"
                  value={lead.heatingSource || 'Awaiting Sync'}
                  icon={<Zap className="w-4 h-4" />}
                  isActive={!!lead.heatingSource}
                  isEmergency={false}
               />
          </div>
        </div>

        {/* Incentive Logic Grid */}
        <div className="pt-4">
          <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-3">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">Strategic Qualification</span>
            <TrendingUp className="w-3.5 h-3.5 text-slate-300" />
          </div>
          
          <div className="space-y-3">
            {isCommercial ? (
              <LogisticsTier 
                title="Commercial RTU Compliance"
                subtitle="High-Density Diagnostic Pass"
                icon={<HardHat className="w-4 h-4" />}
                status={true}
              />
            ) : (
              <LogisticsTier 
                title="HRS Heat Pump Incentive"
                subtitle="Qualified for Hybrid Grant"
                icon={<CheckCircle2 className="w-4 h-4" />}
                status={lead.heatingSource === 'electric' || lead.heatingSource === 'oil'}
              />
            )}
            <LogisticsTier 
              title="Fixed Price Assurance"
              subtitle="Verified Operational Quote"
              icon={<ShieldCheck className="w-4 h-4" />}
              status={true}
            />
          </div>
        </div>

        {/* Dispatch Commitment */}
        <div className="relative pt-4">
          <div className={`absolute -inset-4 rounded-[2rem] blur-xl opacity-[0.05] transition duration-1000 ${isEmergency ? 'bg-rose-600' : 'bg-blue-600'}`} />
          <div className="relative bg-slate-900 border border-white/5 p-7 rounded-3xl shadow-2xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-3xl -mr-12 -mt-12" />
              
              <div className="relative z-10 flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[8px] font-black text-blue-400 uppercase tracking-[0.4em]">Commit Status</span>
                        <div className="flex items-center gap-2">
                           <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                           <span className="text-[9px] font-bold text-white uppercase tracking-[0.2em] font-mono">READY TO DEPLOY</span>
                        </div>
                      </div>
                      <Waves className="w-5 h-5 text-white/10" />
                  </div>

                  <button className={`w-full py-4 rounded-xl text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all active:scale-95 ${
                    isEmergency 
                    ? 'bg-rose-600 text-white hover:bg-rose-500 shadow-xl' 
                    : 'bg-white text-slate-950 hover:bg-slate-50 shadow-lg'
                  }`}>
                    Deploy Technician <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TacticalField = ({ label, value, icon, active }: { label: string, value?: string, icon: React.ReactNode, active: boolean }) => (
    <div className={`flex items-center justify-between py-5 transition-all duration-500 border-b border-slate-100 ${value ? 'border-blue-50' : ''}`}>
        <div className="flex items-center gap-6">
            <div className={`w-10 h-10 rounded-xl transition-all duration-700 flex items-center justify-center ${
              value ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-50 text-slate-300'
            }`}>
                {React.cloneElement(icon as React.ReactElement, { className: 'w-5 h-5' })}
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.4em] mb-1">{label}</span>
              <span className={`text-xl font-black tracking-tight transition-all font-mono italic leading-none ${
                value ? 'text-slate-900 not-italic' : active ? 'text-slate-200 animate-pulse' : 'text-slate-200'
              }`}>
                  {value || (active ? 'IDENTIFYING...' : 'NULL-SIG')}
              </span>
            </div>
        </div>
        {value && (
          <div className="flex items-center justify-center w-6 h-6 bg-emerald-50 text-emerald-500 rounded-full border border-emerald-100">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
        )}
    </div>
);

const StatusCard = ({ label, value, icon, isActive, isEmergency }: any) => (
  <div className={`p-5 rounded-2xl border transition-all duration-700 relative overflow-hidden ${
    isActive 
      ? (isEmergency ? 'bg-rose-50 border-rose-100 shadow-sm' : 'bg-blue-50 border-blue-100 shadow-sm') 
      : 'bg-slate-50 border-slate-100'
  }`}>
    <div className="flex items-center gap-2.5 mb-3">
       <div className={`p-1.5 rounded-lg ${isActive ? (isEmergency ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600') : 'bg-white text-slate-200 border border-slate-100'}`}>
          {React.cloneElement(icon, { className: 'w-3 h-3' })}
       </div>
       <div className="text-[8px] text-slate-400 uppercase font-black tracking-widest leading-none">{label}</div>
    </div>
    <div className={`text-base font-black uppercase tracking-tight font-mono leading-none ${
      isActive 
        ? (isEmergency ? 'text-rose-600' : 'text-slate-900') 
        : 'text-slate-200 italic'
    }`}>
      {value}
    </div>
  </div>
);

const LogisticsTier = ({ title, subtitle, icon, status }: any) => (
  <div className={`p-5 rounded-2xl border transition-all duration-500 flex items-center justify-between ${
    status ? 'bg-white border-blue-500 shadow-[0_4px_12px_rgba(59,130,246,0.1)]' : 'bg-slate-50 border-slate-100'
  }`}>
    <div className="flex items-center gap-4">
       <div className={`p-2.5 rounded-xl ${status ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-200 border border-slate-100'}`}>
          {icon}
       </div>
       <div className="flex flex-col gap-0.5">
          <span className={`text-[10px] font-black uppercase tracking-wider ${status ? 'text-slate-900' : 'text-slate-400'}`}>{title}</span>
          <span className={`text-[8px] font-bold ${status ? 'text-blue-500' : 'text-slate-300'}`}>{subtitle}</span>
       </div>
    </div>
    {status && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />}
  </div>
);
