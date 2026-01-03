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
       <div className="flex items-center justify-between mb-10">
          <div>
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">Metrics Engine</h4>
            <div className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">Dispatcher Velocity</div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-sm font-black text-sky-400 font-mono">+12.4%</div>
            <div className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">VS PREV WEEK</div>
          </div>
       </div>

       <div className="flex-1 min-h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DATA} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="demoGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#64748b', fontSize: 10, fontWeight: 900, letterSpacing: '0.1em' }} 
                    axisLine={false} 
                    tickLine={false} 
                    dy={15}
                />
                <YAxis hide domain={[0, 'dataMax + 10']} />
                <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)', radius: 12 }}
                    contentStyle={{ 
                      backgroundColor: '#020617', 
                      borderRadius: '20px', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
                      padding: '12px 16px'
                    }}
                    labelStyle={{ display: 'none' }}
                    itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: '900', textTransform: 'uppercase' }}
                />
                <Bar 
                  dataKey="calls" 
                  radius={[12, 12, 0, 0]}
                  animationDuration={2500}
                >
                    {DATA.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.calls > 30 ? 'url(#demoGrad)' : 'rgba(71, 85, 105, 0.2)'} 
                          className="hover:opacity-80 transition-all duration-500 cursor-pointer"
                        />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
       </div>
    </div>
  );
};