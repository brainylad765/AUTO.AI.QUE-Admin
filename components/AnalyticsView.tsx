import React from 'react';
import { 
  Filter, Download, Calendar, DollarSign, Clock, Users, RefreshCw, 
  TrendingUp, TrendingDown, MoreHorizontal, Car, Zap, Activity
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell 
} from 'recharts';

// --- DATA CONSTANTS ---

const REVENUE_TREND_DATA = [
  { month: 'Jan', revenue: 240000 },
  { month: 'Feb', revenue: 265000 },
  { month: 'Mar', revenue: 310000 },
  { month: 'Apr', revenue: 290000 },
  { month: 'May', revenue: 340000 },
  { month: 'Jun', revenue: 380000 },
  { month: 'Jul', revenue: 405000 },
  { month: 'Aug', revenue: 425000 },
];

const SERVICE_DISTRIBUTION_DATA = [
  { name: 'Engine', value: 28, color: '#3b82f6' }, // Blue
  { name: 'Brake System', value: 22, color: '#10b981' }, // Green
  { name: 'Electrical', value: 18, color: '#f59e0b' }, // Yellow
  { name: 'Suspension', value: 15, color: '#8b5cf6' }, // Purple
  { name: 'Transmission', value: 12, color: '#ec4899' }, // Pink
  { name: 'Body Work', value: 5, color: '#64748b' }, // Slate
];

const WEEKLY_TRAFFIC_DATA = [
  { day: 'Mon', appointments: 12, walkins: 5 },
  { day: 'Tue', appointments: 18, walkins: 8 },
  { day: 'Wed', appointments: 15, walkins: 6 },
  { day: 'Thu', appointments: 22, walkins: 9 },
  { day: 'Fri', appointments: 28, walkins: 12 },
  { day: 'Sat', appointments: 35, walkins: 18 },
  { day: 'Sun', appointments: 8, walkins: 3 },
];

const RETENTION_DATA = [
  { month: 'Jan', returning: 65, new: 25 },
  { month: 'Feb', returning: 72, new: 28 },
  { month: 'Mar', returning: 85, new: 30 },
  { month: 'Apr', returning: 75, new: 22 },
  { month: 'May', returning: 90, new: 35 },
  { month: 'Jun', returning: 98, new: 42 },
  { month: 'Jul', returning: 115, new: 38 },
  { month: 'Aug', returning: 122, new: 45 },
];

const AGENT_METRICS = [
  { name: 'RCA Agent', score: 94.2, tasks: 234 },
  { name: 'Voice AI', score: 91.8, tasks: 189 },
  { name: 'Data Collector', score: 97.5, tasks: 312 },
  { name: 'Prediction Engine', score: 88.9, tasks: 156 },
  { name: 'Quality Analyst', score: 92.1, tasks: 198 },
];

const AnalyticsView: React.FC = () => {
  return (
    <div className="min-h-full bg-slate-50 p-6 font-sans text-slate-800 animate-fadeIn pb-20">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
           <h1 className="text-2xl font-heading font-black text-slate-900 tracking-tight">Analytics Dashboard</h1>
           <p className="text-slate-500 text-sm mt-1">Comprehensive insights into your garage operations</p>
        </div>
        
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
              <Calendar size={14} /> Last 30 Days
           </button>
           <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-slate-800 hover:border-slate-300 transition-all shadow-sm">
              <Filter size={16} />
           </button>
           <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-slate-800 hover:border-slate-300 transition-all shadow-sm">
              <RefreshCw size={16} />
           </button>
           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:border-cyan-500/50 transition-all shadow-sm">
              <Download size={14} /> Export
           </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
         {/* Revenue Card */}
         <div className="bg-white border border-slate-200 rounded-xl p-5 relative overflow-hidden group hover:shadow-lg transition-all shadow-sm">
            <div className="flex justify-between items-start mb-4">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Revenue</span>
               <div className="p-2 bg-cyan-50 text-cyan-600 rounded-lg group-hover:bg-cyan-100 transition-colors">
                  <DollarSign size={18} />
               </div>
            </div>
            <div className="text-3xl font-heading font-black text-slate-800 mb-2">₹4,25,000</div>
            <div className="flex items-center text-xs font-bold">
               <span className="text-green-600 flex items-center gap-1"><TrendingUp size={12} /> +12.4%</span>
               <span className="text-slate-400 ml-2">vs last month</span>
            </div>
         </div>

         {/* Services Card */}
         <div className="bg-white border border-slate-200 rounded-xl p-5 relative overflow-hidden group hover:shadow-lg transition-all shadow-sm">
            <div className="flex justify-between items-start mb-4">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Services Completed</span>
               <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <Car size={18} />
               </div>
            </div>
            <div className="text-3xl font-heading font-black text-slate-800 mb-2">168</div>
            <div className="flex items-center text-xs font-bold">
               <span className="text-green-600 flex items-center gap-1"><TrendingUp size={12} /> +8.2%</span>
               <span className="text-slate-400 ml-2">this month</span>
            </div>
         </div>

         {/* Efficiency Card */}
         <div className="bg-white border border-slate-200 rounded-xl p-5 relative overflow-hidden group hover:shadow-lg transition-all shadow-sm">
            <div className="flex justify-between items-start mb-4">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg. Service Time</span>
               <div className="p-2 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-100 transition-colors">
                  <Clock size={18} />
               </div>
            </div>
            <div className="text-3xl font-heading font-black text-slate-800 mb-2">3.2 hrs</div>
            <div className="flex items-center text-xs font-bold">
               <span className="text-green-600 flex items-center gap-1"><TrendingDown size={12} /> -15.3%</span>
               <span className="text-slate-400 ml-2">improved efficiency</span>
            </div>
         </div>

         {/* CSAT Card */}
         <div className="bg-white border border-slate-200 rounded-xl p-5 relative overflow-hidden group hover:shadow-lg transition-all shadow-sm">
            <div className="flex justify-between items-start mb-4">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Customer Satisfaction</span>
               <div className="p-2 bg-green-50 text-green-600 rounded-lg group-hover:bg-green-100 transition-colors">
                  <Users size={18} />
               </div>
            </div>
            <div className="text-3xl font-heading font-black text-slate-800 mb-2">4.7/5</div>
            <div className="flex items-center text-xs font-bold">
               <span className="text-green-600 flex items-center gap-1"><TrendingUp size={12} /> +0.3</span>
               <span className="text-slate-400 ml-2">based on 89 reviews</span>
            </div>
         </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
         
         {/* Revenue Trend Graph */}
         <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <Activity size={16} className="text-cyan-500" /> Revenue & Service Trend
               </h3>
               <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={16} /></button>
            </div>
            <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={REVENUE_TREND_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                     <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                           <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                     <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                     <YAxis 
                        stroke="#64748b" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false} 
                        tickFormatter={(value) => `₹${value/1000}k`} 
                     />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#1e293b' }}
                        itemStyle={{ color: '#0f172a' }}
                        formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Revenue']}
                     />
                     <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Service Distribution Pie Chart */}
         <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6">Service Distribution</h3>
            <div className="flex-1 min-h-[200px] relative">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie
                        data={SERVICE_DISTRIBUTION_DATA}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                     >
                        {SERVICE_DISTRIBUTION_DATA.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} stroke="white" strokeWidth={2} />
                        ))}
                     </Pie>
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                        itemStyle={{ color: '#0f172a' }}
                     />
                  </PieChart>
               </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-2 gap-y-3 gap-x-2 mt-4">
               {SERVICE_DISTRIBUTION_DATA.slice(0, 4).map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-slate-600">{item.name}</span>
                     </div>
                     <span className="font-bold text-slate-800">{item.value}%</span>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* Secondary Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
         
         {/* Weekly Traffic Pattern */}
         <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6">Weekly Traffic Pattern</h3>
            <div className="h-[250px]">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={WEEKLY_TRAFFIC_DATA} barGap={4}>
                     <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                     <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                     <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                     <Tooltip 
                        cursor={{fill: '#f1f5f9', opacity: 0.8}}
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                     />
                     <Legend 
                        iconType="square" 
                        iconSize={8}
                        wrapperStyle={{ paddingTop: '20px' }}
                     />
                     <Bar dataKey="appointments" name="Appointments" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                     <Bar dataKey="walkins" name="Walk-ins" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={20} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Customer Retention Analysis */}
         <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6">Customer Retention Analysis</h3>
            <div className="h-[250px]">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={RETENTION_DATA}>
                     <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                     <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                     <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                     />
                     <Legend 
                        iconType="circle" 
                        iconSize={8}
                        wrapperStyle={{ paddingTop: '20px' }}
                     />
                     <Line type="monotone" dataKey="returning" name="Returning" stroke="#10b981" strokeWidth={2} dot={{r: 4, fill: '#10b981'}} activeDot={{r: 6}} />
                     <Line type="monotone" dataKey="new" name="New" stroke="#f59e0b" strokeWidth={2} dot={{r: 4, fill: '#f59e0b'}} activeDot={{r: 6}} />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>

      {/* Bottom Row: Agent Performance Metrics */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
         <h3 className="font-bold text-slate-800 mb-6">AI Agent Performance Metrics</h3>
         <div className="space-y-6">
            {AGENT_METRICS.map((agent, i) => (
               <div key={i} className="flex items-center gap-4 text-sm">
                  <div className="w-32 text-slate-600 font-medium">{agent.name}</div>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                     <div 
                        className="h-full bg-cyan-500 rounded-full relative"
                        style={{ width: `${agent.score}%` }}
                     />
                  </div>
                  <div className="w-12 font-bold text-slate-800 text-right">{agent.score}%</div>
                  <div className="w-20 text-slate-400 text-xs text-right font-mono">{agent.tasks} tasks</div>
               </div>
            ))}
         </div>
      </div>

    </div>
  );
};

export default AnalyticsView;