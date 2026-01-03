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
       <div className="flex items-center justify-between mb-8 px-2">
          <div>
            <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Operational Analytics</h4>
            <div className="text-2xl font-black text-white italic tracking-tighter uppercase">Call Density</div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-sky-400 font-mono">+12.4%</div>
            <div className="text-[10px] text-slate-600 font-bold uppercase">Weekly Shift</div>
          </div>
       </div>

       <div className="flex-1 min-h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#475569', fontSize: 10, fontWeight: 800 }} 
                    axisLine={false} 
                    tickLine={false} 
                    dy={10}
                />
                <YAxis hide domain={[0, 'dataMax + 10']} />
                <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      borderRadius: '16px', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                    itemStyle={{ color: '#f8fafc', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Bar 
                  dataKey="calls" 
                  radius={[8, 8, 0, 0]}
                  animationDuration={2000}
                >
                    {DATA.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.calls > 30 ? 'url(#barGrad)' : 'rgba(71, 85, 105, 0.2)'} 
                          className="hover:opacity-80 transition-opacity"
                        />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
       </div>
    </div>
  );
};