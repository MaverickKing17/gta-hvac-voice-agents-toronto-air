
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
  Home
} from 'lucide-react';

interface InfoPanelProps {
  lead: Partial<LeadDetails>;
  isConnected: boolean;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ lead, isConnected }) => {
  // Simple heuristic for heritage detection
  const isHeritage = lead.address?.toLowerCase().includes('heritage') || 
                     lead.heatingSource === 'oil';

  return (
    <div className="p-12 pb-8 relative overflow-hidden bg-white">
      
      <div className="mb-12 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-[#003366]" />
              <h3 className="text-[11px] font-black text-[#003366] uppercase tracking-[0.4em]">Dispatch Authorization</h3>
          </div>
          <h2 className="text-4xl font-black text-[#001f3f] tracking-tighter uppercase leading-none italic">
              Active Ticket
          </h2>
        </div>
        {isHeritage && (
          <div className="flex flex-col items-end animate-in fade-in slide-in-from-right duration-700">
            <div className="px-3 py-1.5 bg-[#003366] text-white rounded-lg flex items-center gap-2 shadow-lg">
              <Home className="w-3.5 h-3.5" />
              <span className="text-[9px] font-black uppercase tracking-widest">Heritage Profile</span>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-1 mb-12">
        <LeadField 
          label="Customer Identity" 
          value={lead.name} 
          icon={<User className="w-5 h-5" />} 
          active={isConnected}
        />
        <LeadField 
          label="Verified Phone" 
          value={lead.phone} 
          icon={<Phone className="w-5 h-5" />} 
          active={isConnected}
        />
        <LeadField 
          label="Service Address" 
          value={lead.address} 
          icon={<MapPin className="w-5 h-5" />} 
          active={isConnected}
        />

        <div className="pt-10 grid grid-cols-2 gap-5">
             <div className={`group p-6 rounded-2xl border-2 transition-all duration-700 relative overflow-hidden ${lead.type === 'emergency' ? 'bg-[#cc0000]/5 border-[#cc0000]/20' : lead.type ? 'bg-[#003366]/5 border-[#003366]/20' : 'bg-slate-50 border-slate-100'}`}>
                <div className="flex items-center gap-2 mb-3">
                   <BadgeAlert className={`w-4 h-4 ${lead.type === 'emergency' ? 'text-[#cc0000]' : 'text-[#003366]'}`} />
                   <div className="text-[9px] text-slate-400 uppercase font-black tracking-widest">Inquiry Class</div>
                </div>
                <div className={`text-base font-black uppercase tracking-tight ${lead.type === 'emergency' ? 'text-[#cc0000]' : lead.type ? 'text-[#003366]' : 'text-slate-300 italic'}`}>
                  {lead.type || 'Monitoring...'}
                </div>
             </div>
             
             <div className={`group p-6 rounded-2xl border-2 transition-all duration-700 relative overflow-hidden ${lead.heatingSource ? 'bg-[#0099cc]/5 border-[#0099cc]/20' : 'bg-slate-50 border-slate-100'}`}>
                <div className="flex items-center gap-2 mb-3">
                   <Zap className="w-4 h-4 text-[#0099cc]" />
                   <div className="text-[9px] text-slate-400 uppercase font-black tracking-widest">Energy Vector</div>
                </div>
                <div className={`text-base font-black uppercase tracking-tight ${lead.heatingSource ? 'text-[#001f3f]' : 'text-slate-300 italic'}`}>
                  {lead.heatingSource || 'Awaiting'}
                </div>
             </div>
        </div>
      </div>

      {/* Corporate Rebate Strategy Layer */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Qualified Incentive Tiers</span>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <div className={`p-6 rounded-3xl border-2 transition-all duration-500 relative ${lead.heatingSource === 'electric' || lead.heatingSource === 'oil' ? 'bg-[#003366] border-[#003366] shadow-2xl scale-[1.02]' : 'bg-white border-slate-100'}`}>
            <div className="flex justify-between items-start mb-4">
              <span className={`text-[10px] font-black uppercase tracking-widest ${lead.heatingSource === 'electric' || lead.heatingSource === 'oil' ? 'text-blue-200' : 'text-[#003366]'}`}>HRS Program</span>
              { (lead.heatingSource === 'electric' || lead.heatingSource === 'oil') && <CheckCircle2 className="w-5 h-5 text-emerald-400" /> }
            </div>
            <div className="flex items-baseline gap-3">
              <span className={`text-4xl font-black tracking-tighter ${lead.heatingSource === 'electric' || lead.heatingSource === 'oil' ? 'text-white' : 'text-slate-900'}`}>$7,500</span>
              <span className={`text-[10px] font-bold uppercase ${lead.heatingSource === 'electric' || lead.heatingSource === 'oil' ? 'text-white/40' : 'text-slate-400'}`}>Qualified Grant</span>
            </div>
          </div>

          <div className={`p-6 rounded-3xl border-2 transition-all duration-500 relative ${lead.heatingSource === 'gas' ? 'bg-[#003366] border-[#003366] shadow-2xl scale-[1.02]' : 'bg-white border-slate-100'}`}>
            <div className="flex justify-between items-start mb-4">
              <span className={`text-[10px] font-black uppercase tracking-widest ${lead.heatingSource === 'gas' ? 'text-blue-200' : 'text-[#003366]'}`}>Efficiency Rebate</span>
              { lead.heatingSource === 'gas' && <CheckCircle2 className="w-5 h-5 text-emerald-400" /> }
            </div>
            <div className="flex items-baseline gap-3">
              <span className={`text-4xl font-black tracking-tighter ${lead.heatingSource === 'gas' ? 'text-white' : 'text-slate-900'}`}>$2,000</span>
              <span className={`text-[10px] font-bold uppercase ${lead.heatingSource === 'gas' ? 'text-white/40' : 'text-slate-400'}`}>Qualified Grant</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative group mt-auto">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#003366] to-[#0099cc] rounded-[2.5rem] blur-xl opacity-10 group-hover:opacity-20 transition duration-1000"></div>
        <div className="relative bg-[#001f3f] border border-white/5 p-10 rounded-[2.5rem] shadow-2xl overflow-hidden">
            <div className="relative z-10 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-[#0099cc] uppercase tracking-[0.4em]">Status: Priority Locked</span>
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="flex items-baseline gap-4">
                    <span className="text-5xl font-black text-white tracking-tighter leading-none">
                      {lead.heatingSource === 'gas' ? '$2,000' : '$7,500'}
                    </span>
                    <span className="text-[11px] text-white/40 font-bold uppercase tracking-widest">Est. Incentive</span>
                </div>
                <button className="w-full py-5 bg-[#cc0000] text-white rounded-2xl text-[12px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#b30000] transition-all shadow-xl group-hover:translate-y-[-2px]">
                  Confirm Dispatch Booking <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-[9px] text-white/30 text-center leading-relaxed font-medium">
                  Toronto Air Systems 100% Satisfaction Guarantee Included. <br/>
                  Fixed-price quote issued upon visual diagnostic.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

const LeadField = ({ label, value, icon, active }: { label: string, value?: string, icon: React.ReactNode, active: boolean }) => (
    <div className={`group flex items-center justify-between py-6 transition-all duration-500 border-b border-slate-100 hover:border-[#003366]/20`}>
        <div className="flex items-center gap-8">
            <div className={`p-4 rounded-2xl transition-all duration-500 ${value ? 'bg-[#003366] text-white shadow-xl scale-110' : 'bg-slate-50 text-slate-300'}`}>
                {React.cloneElement(icon as React.ReactElement, { className: 'w-5 h-5' })}
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">{label}</span>
              <span className={`text-xl font-bold transition-all ${value ? 'text-[#001f3f]' : active ? 'text-slate-300 italic animate-pulse' : 'text-slate-200'}`}>
                  {value || (active ? 'Listening for input...' : 'Link Offline')}
              </span>
            </div>
        </div>
        {value && <CheckCircle2 className="w-5 h-5 text-emerald-500 animate-in zoom-in duration-500" />}
    </div>
);
