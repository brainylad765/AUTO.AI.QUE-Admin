import React from 'react';
import { SystemHealth, Agent, LogEntry, AgentStatus } from '../types';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { 
  Activity, ShieldCheck, Zap, BrainCircuit, Network, Eye, Stethoscope, Factory, 
  TrendingUp, Mic, Truck, Heart, ShieldAlert, Workflow, DollarSign, Calendar, 
  ArrowUpRight, ArrowDownRight, Car, CheckCircle2
} from 'lucide-react';

interface DashboardProps {
  health: SystemHealth;
  performanceData: any[];
  recentAlerts: LogEntry[];
  agents: Agent[];
}

// Icon mapping helper
export const getAgentIcon = (name: string) => {
  if (name.includes('NEXUS')) return BrainCircuit;
  if (name.includes('SYNAPSE')) return Network;
  if (name.includes('TELEMATIC')) return Eye;
  if (name.includes('DIAGNOSTIC')) return Stethoscope;
  if (name.includes('BATCH')) return Factory;
  if (name.includes('ECONOM')) return TrendingUp;
  if (name.includes('AMBASSADOR')) return Mic;
  if (name.includes('CONDUCTOR')) return Truck;
  if (name.includes('ECHO')) return Heart;
  if (name.includes('SENTINEL')) return ShieldAlert;
  return Activity;
};

const getStatusColor = (status: AgentStatus) => {
  switch (status) {
    case 'good': return 'bg-green-500 shadow-green-500/50';
    case 'neutral': return 'bg-blue-400 shadow-blue-400/50';
    case 'bad': return 'bg-red-500 shadow-red-500/50';
    case 'repair': return 'bg-orange-500 shadow-orange-500/50';
    case 'fatigued': return 'bg-purple-500 shadow-purple-500/50';
    default: return 'bg-slate-400';
  }
};

const getStatusBorder = (status: AgentStatus) => {
  switch (status) {
    case 'good': return 'border-green-500 text-green-700 bg-green-50';
    case 'neutral': return 'border-blue-400 text-blue-700 bg-blue-50';
    case 'bad': return 'border-red-500 text-red-700 bg-red-50';
    case 'repair': return 'border-orange-500 text-orange-700 bg-orange-50';
    case 'fatigued': return 'border-purple-500 text-purple-700 bg-purple-50';
    default: return 'border-slate-400';
  }
};

const AgentNode: React.FC<{ agent: Agent; className?: string }> = ({ agent, className }) => {
  const Icon = getAgentIcon(agent.name);
  return (
    <div className={`absolute flex flex-col items-center group z-10 transition-all duration-300 hover:scale-105 ${className}`}>
      <div className={`
        w-14 h-14 rounded-xl border-2 flex items-center justify-center shadow-lg transition-all
        ${getStatusBorder(agent.status)}
      `}>
        <Icon size={24} />
      </div>
      {/* Status Dot */}
      <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(agent.status)} animate-pulse`} />
      
      {/* Label */}
      <div className="mt-2 bg-white/90 backdrop-blur px-3 py-1 rounded-md border border-slate-200 shadow-sm text-center min-w-[120px]">
        <div className="text-[10px] font-heading font-bold uppercase tracking-wider text-slate-500">{agent.role}</div>
        <div className="text-xs font-bold text-slate-800 leading-tight">{agent.name}</div>
      </div>

      {/* Hover Details */}
      <div className="absolute top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white p-3 rounded-lg text-xs w-56 shadow-xl pointer-events-none z-50">
        <div className="font-bold text-cyan-400 mb-1">{agent.tier}</div>
        <div className="text-[10px] text-slate-400 mb-2 uppercase">{agent.operability}</div>
        <div>Status: <span className="capitalize">{agent.status}</span></div>
        <div className="mt-1 text-slate-300 italic truncate">{agent.currentTask}</div>
      </div>
    </div>
  );
};

const ConnectionLine: React.FC<{ x1: string; y1: string; x2: string; y2: string; dashed?: boolean; color?: string }> = ({ x1, y1, x2, y2, dashed, color = "#94a3b8" }) => (
  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2" strokeDasharray={dashed ? "5,5" : "0"} opacity="0.4" />
);


const Dashboard: React.FC<DashboardProps> = ({ health, performanceData, recentAlerts, agents }) => {
  // Helper to find agent by part of name
  const findAgt = (namePart: string) => agents.find(a => a.name.includes(namePart)) || agents[0];

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-12 animate-fadeIn pb-20">
      
      {/* --- SECTION 1: EXECUTIVE CONTEXT OVERVIEW (Classy MNC Look) --- */}
      <div>
        <div className="mb-6 flex items-end justify-between border-b border-slate-200 pb-4">
           <div>
              <h1 className="text-2xl font-heading font-black text-slate-800 tracking-tight uppercase">Today's Crux</h1>
              <p className="text-sm text-slate-500 font-medium">Garage Performance & Business Intelligence Overview</p>
           </div>
           <div className="text-right">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Live Revenue Stream</div>
              <div className="text-3xl font-heading font-light text-slate-800">
                 ₹ 12,45,000 <span className="text-sm text-green-500 font-bold ml-1">▲ 14%</span>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {/* Card 1: Daily Velocity */}
           <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                 <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Car size={20} />
                 </div>
                 <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Daily Velocity</span>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                 <div>
                    <div className="text-2xl font-heading font-bold text-slate-800">42</div>
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                       <ArrowDownRight size={12} className="text-green-500" /> Vehicles In
                    </div>
                 </div>
                 <div className="text-right">
                    <div className="text-2xl font-heading font-bold text-slate-800">38</div>
                    <div className="text-xs text-slate-500 flex items-center justify-end gap-1">
                       Vehicles Out <ArrowUpRight size={12} className="text-blue-500" />
                    </div>
                 </div>
              </div>
           </div>

           {/* Card 2: Monthly Volume */}
           <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                 <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                    <Calendar size={20} />
                 </div>
                 <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Monthly Volume</span>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                 <div>
                    <div className="text-2xl font-heading font-bold text-slate-800">842</div>
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                       Total In
                    </div>
                 </div>
                 <div className="text-right">
                    <div className="text-2xl font-heading font-bold text-slate-800">796</div>
                    <div className="text-xs text-slate-500 flex items-center justify-end gap-1">
                       Total Delivered
                    </div>
                 </div>
              </div>
           </div>

           {/* Card 3: Revenue Pulse */}
           <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                 <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                    <DollarSign size={20} />
                 </div>
                 <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Revenue Pulse</span>
              </div>
              <div className="space-y-3 border-t border-slate-100 pt-3">
                 <div className="flex justify-between items-end">
                    <span className="text-xs text-slate-500 font-medium">Today</span>
                    <span className="text-lg font-heading font-bold text-slate-800">₹ 12.45 L</span>
                 </div>
                 <div className="flex justify-between items-end">
                    <span className="text-xs text-slate-500 font-medium">This Month</span>
                    <span className="text-lg font-heading font-bold text-slate-800">₹ 3.42 Cr</span>
                 </div>
              </div>
           </div>

           {/* Card 4: AI Executive Brief */}
           <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl flex flex-col justify-between text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <BrainCircuit size={80} />
              </div>
              <div className="flex justify-between items-start mb-2 relative z-10">
                 <div className="p-2 bg-cyan-900/50 text-cyan-400 rounded-lg border border-cyan-500/20">
                    <Zap size={20} />
                 </div>
                 <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">AI Summary</span>
              </div>
              <div className="relative z-10">
                 <div className="text-2xl font-heading font-light text-cyan-400 mb-1">99.7%</div>
                 <div className="text-[10px] uppercase font-bold text-slate-500 mb-3">Orchestration Efficiency</div>
                 <p className="text-xs text-slate-300 leading-relaxed border-t border-slate-700 pt-3">
                    "Agents autonomously resolved <strong className="text-white">142 critical conflicts</strong> today. 
                    Logistic flow optimized by <strong className="text-white">18%</strong> vs baseline."
                 </p>
              </div>
           </div>
        </div>
      </div>


      {/* --- SECTION 2: OPERATIONAL DEEP DIVE (Existing Dashboard) --- */}
      <div>
         <div className="flex items-center gap-4 mb-6">
            <h2 className="text-xl font-heading font-black text-slate-700 tracking-tight uppercase">Operational Deep Dive</h2>
            <div className="h-px flex-1 bg-slate-200"></div>
         </div>

         {/* Original Top Stats Bar (Repurposed as System Telemetry) */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-50/80 border border-slate-200 p-3 rounded-lg flex items-center gap-3">
               <div className="text-blue-500"><Activity size={18} /></div>
               <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">System Health</div>
                  <div className="text-lg font-bold text-slate-700">{health.overallScore}%</div>
               </div>
            </div>
            <div className="bg-slate-50/80 border border-slate-200 p-3 rounded-lg flex items-center gap-3">
               <div className="text-cyan-500"><Zap size={18} /></div>
               <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Active Conn.</div>
                  <div className="text-lg font-bold text-slate-700">{health.activeVehicles}</div>
               </div>
            </div>
            <div className="bg-slate-50/80 border border-slate-200 p-3 rounded-lg flex items-center gap-3">
               <div className="text-purple-500"><BrainCircuit size={18} /></div>
               <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Agents Online</div>
                  <div className="text-lg font-bold text-slate-700">{agents.filter(a => a.status === 'good').length}/{agents.length}</div>
               </div>
            </div>
            <div className="bg-slate-50/80 border border-slate-200 p-3 rounded-lg flex items-center gap-3">
               <div className="text-green-500"><ShieldCheck size={18} /></div>
               <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Workflows</div>
                  <div className="text-lg font-bold text-slate-700">144</div>
               </div>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Agent Flowchart Area */}
            <div className="lg:col-span-3 bg-slate-50/50 border border-slate-200 rounded-2xl shadow-sm relative h-[700px] overflow-hidden">
               <div className="absolute top-4 left-4 z-20">
                  <h3 className="font-bold text-slate-700 flex items-center gap-2 font-heading">
                  <Workflow size={18} className="text-blue-500" /> AGENT INTERACTION MATRIX
                  </h3>
                  <div className="flex gap-4 mt-2 text-[10px] font-bold text-slate-500 uppercase">
                     <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span>Good</span>
                     <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400"></span>Neutral</span>
                     <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500"></span>Repair</span>
                     <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500"></span>Fatigued</span>
                     <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span>Bad</span>
                  </div>
               </div>

               {/* SVG Connector Layer */}
               <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                  {/* Primary Decision Flow */}
                  <ConnectionLine x1="15%" y1="45%" x2="50%" y2="45%" />
                  <ConnectionLine x1="50%" y1="45%" x2="85%" y2="45%" />
                  <ConnectionLine x1="85%" y1="45%" x2="50%" y2="15%" />
                  <ConnectionLine x1="50%" y1="15%" x2="50%" y2="65%" />
                  <ConnectionLine x1="50%" y1="65%" x2="30%" y2="75%" />
                  <ConnectionLine x1="30%" y1="75%" x2="50%" y2="85%" />
                  <ConnectionLine x1="50%" y1="85%" x2="70%" y2="75%" />
                  <ConnectionLine x1="70%" y1="75%" x2="85%" y2="45%" dashed />
                  <ConnectionLine x1="50%" y1="28%" x2="15%" y2="45%" dashed color="#60a5fa" />
                  <ConnectionLine x1="50%" y1="28%" x2="50%" y2="45%" dashed color="#60a5fa" />
                  <ConnectionLine x1="50%" y1="28%" x2="85%" y2="45%" dashed color="#60a5fa" />
                  <path d="M 850 650 Q 900 400 850 100" stroke="#ef4444" strokeWidth="1" strokeDasharray="4,4" fill="none" className="opacity-30" />
               </svg>

               {/* Nodes */}
               <AgentNode agent={findAgt('NEXUS')} className="top-[10%] left-[calc(50%-3rem)]" />
               <AgentNode agent={findAgt('SYNAPSE')} className="top-[25%] left-[calc(50%-3rem)]" />
               <AgentNode agent={findAgt('TELEMATIC')} className="top-[42%] left-[10%]" />
               <AgentNode agent={findAgt('DIAGNOSTIC')} className="top-[42%] left-[calc(50%-3rem)]" />
               <AgentNode agent={findAgt('BATCH')} className="top-[42%] right-[10%]" />
               <AgentNode agent={findAgt('ECONOM')} className="top-[60%] left-[calc(50%-3rem)]" />
               <AgentNode agent={findAgt('AMBASSADOR')} className="top-[72%] left-[25%]" />
               <AgentNode agent={findAgt('CONDUCTOR')} className="top-[82%] left-[calc(50%-3rem)]" />
               <AgentNode agent={findAgt('ECHO')} className="top-[72%] right-[25%]" />
               <div className="absolute top-[5%] right-[2%] p-3 border border-red-200 bg-red-50/50 rounded-xl flex flex-col items-center shadow-sm">
                  <div className="text-[10px] font-bold text-red-500 uppercase mb-2">Security Overwatch</div>
                  <AgentNode agent={findAgt('SENTINEL')} className="relative" />
               </div>
            </div>

            {/* Right Sidebar: Activity Feed */}
            <div className="bg-white/70 backdrop-blur border border-slate-200 rounded-2xl shadow-sm p-4 flex flex-col h-[700px]">
               <h3 className="font-bold text-slate-700 mb-4 flex items-center justify-between font-heading">
                  <span>Live Audit Trail</span>
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
               </h3>
               <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2">
                  {recentAlerts.map((alert, i) => (
                     <div key={i} className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs hover:bg-white hover:shadow-sm transition-all">
                        <div className="flex justify-between items-center mb-1">
                           <span className={`font-bold ${
                              alert.severity === 'error' ? 'text-red-600' :
                              alert.severity === 'warning' ? 'text-orange-500' :
                              'text-blue-600'
                           }`}>{alert.severity.toUpperCase()}</span>
                           <span className="text-slate-400">{alert.timestamp}</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed">{alert.message}</p>
                     </div>
                  ))}
               </div>
               <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="text-xs text-slate-500 font-bold uppercase mb-2">Performance (24h)</div>
                  <div className="h-24">
                     <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={performanceData}>
                           <Area type="monotone" dataKey="value" stroke="#64748b" fill="#e2e8f0" strokeWidth={2} />
                        </AreaChart>
                     </ResponsiveContainer>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;