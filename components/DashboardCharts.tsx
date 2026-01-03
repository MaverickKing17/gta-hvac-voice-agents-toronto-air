
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const DATA = [
  { name: 'MON', calls: 24 },
  { name: 'TUE', calls: 30 },
  { name: 'WED', calls: 45 },
  { name: 'THU', calls: 28 },
  { name: 'FRI', calls: 35 },
  { name: 'SAT', calls: 15 },
  { name: 'SUN', calls: 12 },
];

export const DashboardCharts: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col">
       <div className="flex items-center justify-between mb-8">
          <div>
            <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-2">Metrics Core</h4>
            <div className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">System Velocity</div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-sm font-black text-emerald-400 font-mono tracking-tighter">+12.4%</div>
            <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Efficiency Delta</div>
          </div>
       </div>

       <div className="flex-1 min-h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DATA} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#475569', fontSize: 10, fontWeight: 900, letterSpacing: '0.05em' }} 
                    axisLine={false} 
                    tickLine={false} 
                    dy={12}
                />
                <YAxis hide domain={[0, 'dataMax + 10']} />
                <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.03)', radius: 10 }}
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      borderRadius: '16px', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                      padding: '10px 14px'
                    }}
                    labelStyle={{ display: 'none' }}
                    itemStyle={{ color: '#fff', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', fontFamily: 'JetBrains Mono' }}
                />
                <Bar 
                  dataKey="calls" 
                  radius={[8, 8, 0, 0]}
                  animationDuration={2000}
                >
                    {DATA.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.calls > 30 ? 'url(#barGrad)' : 'rgba(255, 255, 255, 0.08)'} 
                          className="hover:opacity-80 transition-all duration-300 cursor-pointer"
                        />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
       </div>
    </div>
  );
};
