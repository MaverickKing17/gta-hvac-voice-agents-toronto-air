
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
  Database,
  Navigation,
  FileText
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
    <div className="flex flex-col bg-white relative min-h-full font-sans">
      {/* Professional Service Header */}
      <div className={`h-40 relative overflow-hidden flex flex-col justify-end p-8 transition-all duration-1000 ${isEmergency ? 'bg-rose-900' : 'bg-slate-900'}`}>
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20">
                <FileText className="w-4 h-4 text-white/80" />
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">
                LIVE DISPATCH FILE
              </h3>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight uppercase leading-none">
              {isCommercial ? 'Facility Profile' : 'Lead Intelligence'}
          </h2>
        </div>
      </div>

      <div className="p-8 space-y-10">
        {/* Status Badges */}
        <div className="flex flex-wrap gap-2">
          <div className={`px-4 py-2 rounded-xl flex items-center gap-2 border transition-all ${isCommercial ? 'bg-slate-900 border-slate-900 text-white' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
            {isCommercial ? <Building2 className="w-4 h-4" /> : <Home className="w-4 h-4" />}
            <span className="text-[10px] font-bold uppercase tracking-wider">{lead.marketType} UNIT</span>
          </div>
          {isHeritage && (
            <div className="px-4 py-2 bg-amber-50 text-amber-700 rounded-xl flex items-center gap-2 border border-amber-200">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">HERITAGE PROPERTY</span>
            </div>
          )}
          {isConnected && (
            <div className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl flex items-center gap-2 border border-emerald-200 animate-pulse">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-bold uppercase tracking-wider">SYNCING DATA</span>
            </div>
          )}
        </div>

        {/* Customer Details */}
        <div className="space-y-1">
          <TacticalField 
            label="CUSTOMER NAME" 
            value={lead.name} 
            icon={<User />} 
            active={isConnected}
          />
          <TacticalField 
            label="PHONE NUMBER" 
            value={lead.phone} 
            icon={<Phone />} 
            active={isConnected}
          />
          <TacticalField 
            label="SERVICE ADDRESS" 
            value={lead.address} 
            icon={<MapPin />} 
            active={isConnected}
          />
        </div>

        {/* Service Type & Energy Profile */}
        <div className="grid grid-cols-2 gap-4">
           <StatusCard 
              label="REQUEST TYPE"
              value={lead.type || 'PENDING...'}
              icon={<BadgeAlert />}
              isActive={!!lead.type}
              isEmergency={isEmergency}
           />
           <StatusCard 
              label="FUEL SOURCE"
              value={lead.heatingSource || 'PENDING...'}
              icon={<Zap />}
              isActive={!!lead.heatingSource}
              isEmergency={false}
           />
        </div>

        {/* Dispatch Commitment */}
        <div className="pt-4">
          <div className="p-8 bg-slate-900 rounded-[2rem] shadow-xl relative overflow-hidden group">
              <div className="relative z-10 space-y-8">
                  <div className="flex items-center justify-between border-b border-white/10 pb-6">
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">DISPATCH STATUS</span>
                        <div className="flex items-center gap-3">
                           <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                           <span className="text-xs font-bold text-white uppercase tracking-wider">READY FOR DEPLOYMENT</span>
                        </div>
                      </div>
                      <Navigation className="w-6 h-6 text-white/20" />
                  </div>

                  <button className={`w-full py-5 rounded-2xl text-sm font-black uppercase tracking-widest flex items-center justify-center gap-4 transition-all active:scale-95 shadow-2xl border-2 ${
                    isEmergency 
                    ? 'bg-rose-600 border-rose-500 text-white hover:bg-rose-500' 
                    : 'bg-white border-white text-slate-900 hover:bg-slate-50'
                  }`}>
                    BOOK TECHNICIAN <ArrowRight className="w-5 h-5" />
                  </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TacticalField = ({ label, value, icon, active }: { label: string, value?: string, icon: React.ReactNode, active: boolean }) => (
    <div className={`flex items-center justify-between py-6 border-b border-slate-100 transition-all duration-500 ${value ? 'bg-slate-50/50 -mx-4 px-4 rounded-xl' : ''}`}>
        <div className="flex items-center gap-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
              value ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-300 border-slate-100'
            }`}>
                {React.cloneElement(icon as React.ReactElement, { className: 'w-5 h-5' })}
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</span>
              <span className={`text-lg font-bold truncate max-w-[240px] ${
                value ? 'text-slate-900' : active ? 'text-slate-200 animate-pulse' : 'text-slate-100'
              }`}>
                  {value || (active ? 'LISTENING...' : 'WAITING')}
              </span>
            </div>
        </div>
    </div>
);

const StatusCard = ({ label, value, icon, isActive, isEmergency }: any) => (
  <div className={`p-6 rounded-2xl border transition-all duration-700 ${
    isActive 
      ? (isEmergency ? 'bg-rose-50 border-rose-100 shadow-sm' : 'bg-blue-50 border-blue-100 shadow-sm') 
      : 'bg-slate-50 border-slate-100'
  }`}>
    <div className="flex items-center gap-3 mb-4">
       <div className={`p-2 rounded-lg ${isActive ? (isEmergency ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600') : 'bg-white text-slate-200 border border-slate-100'}`}>
          {React.cloneElement(icon, { className: 'w-4 h-4' })}
       </div>
       <div className="text-[9px] text-slate-400 uppercase font-black tracking-widest leading-none">{label}</div>
    </div>
    <div className={`text-base font-bold uppercase tracking-tight ${
      isActive 
        ? (isEmergency ? 'text-rose-600' : 'text-slate-900') 
        : 'text-slate-300 italic'
    }`}>
      {value}
    </div>
  </div>
);
