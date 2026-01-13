import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { PieChart, Activity, TrendingUp, Users } from 'lucide-react';

const data = [
  { name: 'Mon', credits: 4000, users: 2400 },
  { name: 'Tue', credits: 3000, users: 1398 },
  { name: 'Wed', credits: 2000, users: 9800 },
  { name: 'Thu', credits: 2780, users: 3908 },
  { name: 'Fri', credits: 1890, users: 4800 },
  { name: 'Sat', credits: 2390, users: 3800 },
  { name: 'Sun', credits: 3490, users: 4300 },
];

const Analytics = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="px-1">
        <h1 className="text-xl font-semibold">Platform Insights</h1>
        <p className="text-xs text-brand-silver font-light">Real-time engagement and credit economy metrics.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-brand-charcoal p-4 rounded-2xl shadow-neumorphic-out">
          <Activity className="w-4 h-4 text-brand-silver mb-2" />
          <p className="text-[10px] text-brand-silver uppercase tracking-tighter">Avg Redemption</p>
          <p className="text-xl font-bold">420 pts</p>
        </div>
        <div className="bg-brand-charcoal p-4 rounded-2xl shadow-neumorphic-out">
          <TrendingUp className="w-4 h-4 text-green-400 mb-2" />
          <p className="text-[10px] text-brand-silver uppercase tracking-tighter">Growth Rate</p>
          <p className="text-xl font-bold">+18.4%</p>
        </div>
      </div>

      <div className="bg-brand-charcoal p-6 rounded-3xl shadow-neumorphic-out border border-brand-white/5">
        <h3 className="text-sm font-medium mb-6 flex items-center gap-2">
          <PieChart className="w-4 h-4 text-brand-silver" /> Credit Velocity
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorCredits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c0c0c0" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#c0c0c0" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#c0c0c0', fontSize: 10}}
              />
              <YAxis hide />
              <Tooltip 
                contentStyle={{backgroundColor: '#232323', border: 'none', borderRadius: '12px', boxShadow: '6px 6px 12px #1e1e1e'}}
                itemStyle={{color: '#f0f0f0', fontSize: '12px'}}
              />
              <Area 
                type="monotone" 
                dataKey="credits" 
                stroke="#c0c0c0" 
                fillOpacity={1} 
                fill="url(#colorCredits)" 
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-brand-charcoal p-6 rounded-3xl shadow-neumorphic-out border border-brand-white/5">
        <h3 className="text-sm font-medium mb-6 flex items-center gap-2">
          <Users className="w-4 h-4 text-brand-silver" /> Active Sessions
        </h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <Bar 
                dataKey="users" 
                fill="#c0c0c0" 
                radius={[4, 4, 0, 0]} 
                opacity={0.8}
              />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#c0c0c0', fontSize: 10}}
              />
              <Tooltip 
                cursor={{fill: 'rgba(255,255,255,0.05)'}}
                contentStyle={{backgroundColor: '#232323', border: 'none', borderRadius: '12px'}}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;