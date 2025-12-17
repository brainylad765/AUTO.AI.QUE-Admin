import React, { useState, useEffect } from 'react';
import { Agent, ViewState } from '../types';
import { 
  Cpu, Wifi, Activity, Battery, Disc, MessageSquare, Maximize2, X, BrainCircuit, Network, 
  Eye, Stethoscope, Factory, TrendingUp, Mic, Truck, Heart, ShieldAlert, ListChecks, Lock, 
  Globe, Server, Zap, Shield, Calendar, Wrench, RefreshCw, ChevronRight, ArrowRight, Database
} from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip } from 'recharts';
import { getAgentIcon } from './Dashboard'; // Importing the helper

interface ArenaProps {
  agents: Agent[];
  onSelectAgent: (agentId: string) => void;
  selectedAgentId: string | null;
  onCloseDetail: () => void;
  onEnterSecureChannel: () => void; // New Prop
}

// --- Workflow Data ---
const WORKFLOW_PHASES = [
  {
    id: 1,
    title: "DATA INGESTION",
    subtitle: "Real-Time Monitoring",
    icon: Database,
    details: {
      duration: "Continuous",
      agents: "TELEMATIC VISIONARY + DATA COLLECTOR",
      flow: "Vehicle (OBD-II) → Bluetooth → Mobile App → Cloud Sync",
      desc: "Freq: Every 5s. 15 params (Temp, RPM, Brake Wear). Validation → Compression → Cloud."
    }
  },
  {
    id: 2,
    title: "THRESHOLD MONITOR",
    subtitle: "Alert Generation",
    icon: Activity,
    details: {
      duration: "<10 milliseconds",
      agents: "THRESHOLD CHECKER + NEXUS PRIME",
      flow: "Incoming Data → Rule Engine → Instant Alert if Critical",
      desc: "Rules: Brake > 85% (HIGH), Temp > 110°C (CRITICAL). If NORMAL → Store for batch."
    }
  },
  {
    id: 3,
    title: "PATTERN ANALYSIS",
    subtitle: "ML Prediction",
    icon: BrainCircuit,
    details: {
      duration: "Nightly Batch (2 AM daily)",
      agents: "DIAGNOSTIC PROPHET + ML ENGINE",
      flow: "Aggregate Data → Run ML Model → Predict Failures",
      desc: "Models: XGBoost/Random Forest. Output: 'Brake failure probability: 87% in 14-21 days'."
    }
  },
  {
    id: 4,
    title: "ENGAGEMENT",
    subtitle: "Customer Notification",
    icon: MessageSquare,
    details: {
      duration: "<30s after alert",
      agents: "NOTIFICATION MANAGER + VOICE AMBASSADOR",
      flow: "Severity-Based Channels: App, SMS, Email",
      desc: "LOW (Silent), MEDIUM (SMS), HIGH (Priority). NO VOICE CALLS - Respectful notifications only."
    }
  },
  {
    id: 5,
    title: "SCHEDULING",
    subtitle: "Optimization",
    icon: Calendar,
    details: {
      duration: "<60s on user tap",
      agents: "SCHEDULING COORDINATOR + LOGISTIC CONDUCTOR",
      flow: "User Tap → Locate Centers → Check Slots → Confirm",
      desc: "Finds 3 nearest centers. Checks Google Calendar. User selects → SMS Confirmation → 24h Reminder."
    }
  },
  {
    id: 6,
    title: "EXECUTION",
    subtitle: "Service Tracking",
    icon: Wrench,
    details: {
      duration: "2-8 hours",
      agents: "SERVICE TRACKER + WORKFLOW ORCHESTRATOR",
      flow: "Scan QR → History → Diagnosis → Updates → Receipt",
      desc: "Technician confirms diagnosis. Live updates to customer app. Quality check completion."
    }
  },
  {
    id: 7,
    title: "FEEDBACK LOOP",
    subtitle: "Mfg. Insights",
    icon: RefreshCw,
    details: {
      duration: "24-48h post-service",
      agents: "FEEDBACK COLLECTOR + MANUFACTURING ANALYST",
      flow: "SMS Request → Rating → Report → Manufacturing Email",
      desc: "Weekly report. Output: 'Batch XR-234: 32% brake issues → Increase pad thickness'."
    }
  }
];

const Arena: React.FC<ArenaProps> = ({ agents, onSelectAgent, selectedAgentId, onCloseDetail, onEnterSecureChannel }) => {
  const selectedAgent = agents.find(a => a.id === selectedAgentId);
  const [time, setTime] = useState(new Date());
  const [hoveredPhase, setHoveredPhase] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[calc(100vh-64px)] overflow-hidden bg-[#02040a] text-cyan-50 font-sans flex flex-col">
      
      {/* --- Rooted Command Center Background (Fixed) --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
         {/* Hexagonal Grid Overlay */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
         <div 
            className="absolute inset-0 opacity-10" 
            style={{ 
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill-opacity='0' stroke='%2306b6d4' stroke-width='1'/%3E%3C/svg%3E")`,
               maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
            }} 
         />
         
         {/* Radar Sweep Effect - Slower and more subtle */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-slate-800/30">
            <div className="w-full h-full rounded-full animate-[spin-slow_20s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,rgba(6,182,212,0.05)_360deg)]" />
         </div>

         {/* Concentric Circles */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-dashed border-slate-700/30 rounded-full animate-[spin-slow_60s_linear_infinite]" />
      </div>

      {selectedAgentId && selectedAgent ? (
        // --- Futuristic Detail Overlay (Keep Fixed) ---
        <div className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-7xl h-[85vh] bg-slate-900/95 border border-cyan-500/30 rounded-sm shadow-[0_0_100px_rgba(6,182,212,0.1)] flex relative overflow-hidden">
             
             {/* Decorative Corners (HUD Style) */}
             <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-cyan-500" />
             <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-cyan-500" />
             <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-cyan-500" />
             <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-cyan-500" />

             <button onClick={onCloseDetail} className="absolute top-6 right-6 z-50 text-slate-500 hover:text-white transition-colors">
                <X size={32} />
             </button>

             {/* Left Column: ID Card */}
             <div className="w-1/3 border-r border-slate-800 p-8 flex flex-col bg-slate-950/80 overflow-y-auto custom-scrollbar relative">
                <div className="mb-8">
                   <div className="text-[10px] font-mono text-slate-500 mb-1">UNIT IDENTIFIER</div>
                   <h1 className="text-3xl font-heading font-black text-white tracking-widest mb-1 uppercase">{selectedAgent.name}</h1>
                   <div className="flex items-center gap-2 mt-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <div className="text-cyan-500 text-xs tracking-[0.2em] uppercase font-bold">{selectedAgent.role}</div>
                   </div>
                </div>

                <div className="relative w-40 h-40 mx-auto mb-8 flex items-center justify-center border border-slate-800 rounded-full bg-slate-900/50">
                   <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-full animate-pulse" />
                   <div className="absolute -inset-4 border border-dashed border-slate-700/50 rounded-full animate-spin-slow" />
                   {React.createElement(getAgentIcon(selectedAgent.name), { size: 56, className: "text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" })}
                </div>

                <div className="space-y-4 flex-1">
                   <div className="bg-slate-900/50 p-4 border-l-4 border-cyan-500 rounded-r-lg">
                      <div className="text-[9px] text-cyan-600 uppercase mb-1 font-bold tracking-wider">Operability</div>
                      <div className="text-white text-sm font-bold">{selectedAgent.operability}</div>
                   </div>
                   <div className="bg-slate-900/50 p-4 border-l-4 border-cyan-500 rounded-r-lg">
                      <div className="text-[9px] text-cyan-600 uppercase mb-1 font-bold tracking-wider">Unique Trait</div>
                      <div className="text-white text-sm font-bold">{selectedAgent.uniqueTrait}</div>
                   </div>
                   
                   <div className="mt-6">
                      <div className="text-[10px] text-slate-500 uppercase mb-3 flex items-center gap-2 font-bold tracking-wider border-b border-slate-800 pb-2">
                         <ListChecks size={12} /> Protocols & Duties
                      </div>
                      <ul className="space-y-3">
                         {selectedAgent.responsibilities.map((resp, idx) => (
                            <li key={idx} className="text-xs text-slate-400 flex gap-3 leading-relaxed font-mono">
                               <span className="text-cyan-500">::</span>
                               {resp}
                            </li>
                         ))}
                      </ul>
                   </div>
                </div>
                
                <div className="mt-6 flex justify-between items-center text-[9px] text-slate-600 font-mono border-t border-slate-800 pt-4">
                   <span>ID: {selectedAgent.id}</span>
                   <span>SYS_VER: 2.4.1</span>
                </div>
             </div>

             {/* Right Column: Analytics & Visualization */}
             <div className="w-2/3 p-8 flex flex-col gap-6 bg-[linear-gradient(rgba(15,23,42,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.4)_1px,transparent_1px)] bg-[size:20px_20px]">
                <div className="grid grid-cols-3 gap-6 h-1/3">
                   {/* Radar Chart for stats */}
                   <div className="col-span-1 bg-slate-900/80 border border-slate-800 p-4 relative backdrop-blur-sm shadow-xl">
                      <div className="absolute top-0 left-0 bg-slate-800 px-2 py-1 text-[9px] font-bold text-slate-400">PERFORMANCE MATRIX</div>
                      <ResponsiveContainer width="100%" height="100%">
                         <RadarChart cx="50%" cy="55%" outerRadius="65%" data={[
                            { subject: 'Eff', A: selectedAgent.efficiency, fullMark: 100 },
                            { subject: 'Net', A: (selectedAgent.networkLoad / 1000) * 100, fullMark: 100 },
                            { subject: 'Bat', A: selectedAgent.battery, fullMark: 100 },
                            { subject: 'Task', A: 85, fullMark: 100 },
                            { subject: 'Sec', A: 90, fullMark: 100 },
                         ]}>
                            <PolarGrid stroke="#334155" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 9, fontFamily: 'Roboto Mono', fontWeight: 'bold' }} />
                            <Radar name="Agent" dataKey="A" stroke="#06b6d4" strokeWidth={2} fill="#06b6d4" fillOpacity={0.2} />
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontFamily: 'Roboto Mono' }} />
                         </RadarChart>
                      </ResponsiveContainer>
                   </div>
                   
                   {/* Task Monitor */}
                   <div className="col-span-2 bg-slate-900/80 border border-slate-800 p-4 flex flex-col justify-center backdrop-blur-sm shadow-xl relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500" />
                      <div className="text-[10px] text-cyan-600 uppercase mb-2 font-bold tracking-widest">Active Thread</div>
                      <div className="text-xl text-white font-bold animate-pulse font-mono tracking-tight">{selectedAgent.currentTask}</div>
                      
                      <div className="grid grid-cols-3 gap-4 mt-6">
                         <div className="bg-black/40 p-2 rounded border border-slate-800">
                            <div className="text-[9px] text-slate-500 uppercase">Load</div>
                            <div className="text-lg font-mono text-cyan-400">{selectedAgent.networkLoad} <span className="text-[9px]">Mbps</span></div>
                         </div>
                         <div className="bg-black/40 p-2 rounded border border-slate-800">
                            <div className="text-[9px] text-slate-500 uppercase">Power</div>
                            <div className="text-lg font-mono text-green-400">{selectedAgent.battery}%</div>
                         </div>
                         <div className="bg-black/40 p-2 rounded border border-slate-800">
                            <div className="text-[9px] text-slate-500 uppercase">Uptime</div>
                            <div className="text-lg font-mono text-white">99.9%</div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Log Stream */}
                <div className="flex-1 bg-black border border-slate-800 p-4 font-mono text-sm overflow-hidden flex flex-col shadow-inner">
                   <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-2">
                      <span className="text-cyan-500 font-bold tracking-widest text-xs">TERMINAL OUTPUT</span>
                      <span className="text-slate-600 text-xs">{time.toLocaleTimeString()}</span>
                   </div>
                   <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1.5 p-2">
                      {selectedAgent.logs.length > 0 ? selectedAgent.logs.map((log, i) => (
                         <div key={i} className="flex gap-4 p-1 hover:bg-slate-900 border-l-2 border-transparent hover:border-slate-700 pl-2 transition-all">
                            <span className="text-slate-600 text-xs">[{log.timestamp}]</span>
                            <span className="text-green-500 font-bold"></span>
                            <span className="text-slate-300 text-xs">{log.message}</span>
                         </div>
                      )) : (
                         <div className="text-slate-600 italic text-xs">Initializing telemetry handshake...</div>
                      )}
                      <div className="flex gap-4 p-1 opacity-50">
                         <span className="text-slate-600 text-xs">[{time.toLocaleTimeString()}]</span>
                         <span className="text-green-500 font-bold"> </span>
                         <span className="text-slate-300 text-xs animate-pulse">Listening for swarm packets_</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      ) : (
        // --- Main Arena Overview (SCROLLABLE & SPICY) ---
        <>
          <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
             <div className="min-h-full p-8 flex flex-col gap-12 max-w-[1920px] mx-auto w-full">
                
                {/* 1. Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-800/60 pb-8 bg-gradient-to-r from-transparent via-slate-900/20 to-transparent">
                   {/* Title & Status */}
                   <div>
                      <div className="flex items-center gap-3 mb-2">
                         <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></span>
                         <span className="text-xs font-mono text-cyan-500 tracking-[0.3em] uppercase font-bold">System Online // Grid Active</span>
                      </div>
                      <h1 className="text-5xl lg:text-6xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-slate-400 tracking-tighter drop-shadow-2xl">
                         SWARM COMMAND
                      </h1>
                      <p className="text-slate-400 max-w-xl mt-4 text-sm font-light leading-relaxed border-l-2 border-cyan-500/30 pl-4">
                         Autonomous Agent Orchestration Grid. Monitoring real-time neural consensus and operational workflows across the enterprise fleet.
                      </p>
                   </div>

                   {/* Right Side Actions */}
                   <div className="flex flex-col items-end gap-6">
                      <div className="text-right">
                         <div className="text-5xl font-mono font-bold text-white tracking-tight tabular-nums">{time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                         <div className="text-slate-500 text-xs uppercase tracking-widest font-bold mt-1">Local Operations Time (UTC+05:30)</div>
                      </div>
                      
                      <button 
                         onClick={onEnterSecureChannel}
                         className="group relative overflow-hidden bg-red-950/20 border border-red-500/30 rounded-sm px-8 py-3 hover:bg-red-950/40 transition-all duration-500 shadow-[0_0_20px_rgba(220,38,38,0.1)] hover:shadow-[0_0_30px_rgba(220,38,38,0.2)]"
                      >
                         <div className="absolute inset-0 w-1 bg-red-500/50 group-hover:w-full transition-all duration-500 opacity-10" />
                         {/* Scanline */}
                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                         
                         <div className="flex items-center gap-4 relative z-10">
                            <div className="p-1.5 border border-red-500/50 rounded bg-red-950/50 group-hover:rotate-12 transition-transform duration-300">
                               <ShieldAlert size={18} className="text-red-500" />
                            </div>
                            <div className="text-left">
                               <div className="text-[9px] text-red-400 uppercase font-bold tracking-widest group-hover:text-red-300">Restricted Access</div>
                               <div className="font-heading font-bold text-white tracking-widest text-sm">SECURE CHANNEL</div>
                            </div>
                         </div>
                      </button>
                   </div>
                </div>

                {/* 2. Global Status Stats (Glassmorphism) */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                   {[
                      { label: 'Orchestration Health', value: '99.8%', icon: Activity, color: 'text-green-400', border: 'border-green-500/30' },
                      { label: 'Active Neural Threads', value: '8,421', icon: BrainCircuit, color: 'text-cyan-400', border: 'border-cyan-500/30' },
                      { label: 'Network Throughput', value: '4.2 TB/s', icon: Wifi, color: 'text-blue-400', border: 'border-blue-500/30' },
                      { label: 'Global Defcon', value: 'LEVEL 5', icon: Shield, color: 'text-purple-400', border: 'border-purple-500/30' },
                   ].map((stat, i) => (
                      <div key={i} className={`bg-slate-900/40 backdrop-blur-md border ${stat.border} p-5 rounded-lg flex items-center justify-between group hover:bg-slate-800/60 transition-colors shadow-lg`}>
                         <div>
                            <div className="text-[10px] uppercase text-slate-500 font-bold tracking-wider mb-1 flex items-center gap-2">
                               {stat.label}
                               <div className={`w-1 h-1 rounded-full ${stat.color.replace('text', 'bg')} animate-pulse`} />
                            </div>
                            <div className={`text-3xl font-mono font-bold ${stat.color} group-hover:scale-105 transition-transform origin-left tracking-tighter`}>{stat.value}</div>
                         </div>
                         <stat.icon className={`${stat.color} opacity-40 group-hover:opacity-100 transition-opacity drop-shadow-glow`} size={32} />
                      </div>
                   ))}
                </div>

                {/* 3. The Grid (Responsive & Spicy) */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                       <div className="h-px bg-gradient-to-r from-transparent via-cyan-900 to-transparent flex-1" />
                       <span className="text-xs font-mono text-cyan-500/70 uppercase tracking-[0.2em] px-4 border border-cyan-900/30 rounded-full py-1 bg-slate-950/50 backdrop-blur">Active Agent Matrix</span>
                       <div className="h-px bg-gradient-to-r from-transparent via-cyan-900 to-transparent flex-1" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                      {agents.map((agent) => {
                           const Icon = getAgentIcon(agent.name);
                           return (
                              <div 
                                 key={agent.id}
                                 onClick={() => onSelectAgent(agent.id)}
                                 className={`
                                    group relative h-72 bg-slate-900/20 border backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer
                                    transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]
                                    ${agent.status === 'bad' ? 'border-red-500/40 hover:shadow-red-900/20' : 'border-slate-800 hover:border-cyan-500/50 hover:shadow-cyan-900/20'}
                                 `}
                              >
                                 {/* Card Background Gradient */}
                                 <div className="absolute inset-0 bg-gradient-to-b from-slate-800/10 via-slate-900/50 to-slate-950 opacity-50" />
                                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                 
                                 {/* Status Bar Top */}
                                 <div className={`absolute top-0 left-0 w-full h-1 ${
                                    agent.status === 'good' ? 'bg-green-500' : 
                                    agent.status === 'bad' ? 'bg-red-500' : 
                                    'bg-blue-500'
                                 }`} />

                                 <div className="p-6 h-full flex flex-col relative z-10">
                                    {/* Header */}
                                    <div className="flex justify-between items-start mb-4">
                                       <span className="font-mono text-[9px] text-slate-500 group-hover:text-cyan-400 transition-colors border border-slate-800 px-1.5 py-0.5 rounded group-hover:border-cyan-500/30">{agent.id}</span>
                                       <div className={`p-1.5 rounded-md ${agent.status === 'good' ? 'bg-green-950/30' : 'bg-slate-800'}`}>
                                          <Icon size={16} className={`${agent.status === 'good' ? 'text-green-400' : 'text-slate-500'} group-hover:text-white transition-colors`} />
                                       </div>
                                    </div>
                                    
                                    {/* Central Icon/Visual */}
                                    <div className="flex-1 flex items-center justify-center">
                                       <div className="relative transform transition-transform duration-700 group-hover:scale-110">
                                          <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                          <div className="relative z-10 p-4 border border-slate-700/30 rounded-full bg-slate-900/40 group-hover:border-cyan-500/30 group-hover:bg-slate-800/60 transition-colors">
                                             <Icon size={40} className={`transition-all duration-500 ${
                                                agent.status === 'good' ? 'text-slate-300 group-hover:text-cyan-400' :
                                                agent.status === 'bad' ? 'text-red-400 group-hover:text-red-300' :
                                                'text-slate-500 group-hover:text-white'
                                             }`} />
                                          </div>
                                       </div>
                                    </div>

                                    {/* Footer Info */}
                                    <div className="mt-4">
                                       <div className="flex justify-between items-end mb-1">
                                          <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{agent.tier.split(' ')[0]}</div>
                                          <div className="text-[10px] text-cyan-500 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                                             {agent.efficiency}% EFF
                                          </div>
                                       </div>
                                       <div className="font-heading font-black text-white text-lg leading-tight mb-3 group-hover:text-cyan-50 transition-colors">{agent.name}</div>
                                       
                                       {/* Sparkline / Activity Bar */}
                                       <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden flex gap-0.5">
                                          {[...Array(20)].map((_, i) => (
                                             <div key={i} className={`flex-1 rounded-full ${i < (agent.efficiency / 5) ? (agent.status === 'bad' ? 'bg-red-500' : 'bg-cyan-500') : 'bg-transparent'} opacity-60 group-hover:opacity-100 transition-opacity delay-[${i * 20}ms]`} />
                                          ))}
                                       </div>
                                    </div>
                                 </div>

                                 {/* Hover Overlay Effects */}
                                 <div className="absolute inset-0 border border-transparent group-hover:border-cyan-500/30 rounded-xl transition-all duration-500 pointer-events-none" />
                              </div>
                           )
                      })}
                    </div>
                </div>

                {/* 4. Horizontal Workflow Flowchart */}
                <div className="mt-8">
                   <div className="flex items-center gap-4 mb-10">
                       <div className="h-px bg-gradient-to-r from-transparent via-cyan-900 to-transparent flex-1" />
                       <span className="text-xs font-mono text-cyan-500/70 uppercase tracking-[0.2em] px-4 border border-cyan-900/30 rounded-full py-1 bg-slate-950/50 backdrop-blur">System Phase Flow</span>
                       <div className="h-px bg-gradient-to-r from-transparent via-cyan-900 to-transparent flex-1" />
                   </div>

                   <div className="relative">
                      {/* Connection Line Background */}
                      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -translate-y-1/2 rounded-full overflow-hidden">
                         <div className="w-full h-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent animate-[shimmer_3s_infinite]" />
                      </div>

                      <div className="flex justify-between items-center relative z-10 px-4">
                         {WORKFLOW_PHASES.map((phase, index) => (
                            <div 
                               key={phase.id}
                               className="relative group flex flex-col items-center"
                               onMouseEnter={() => setHoveredPhase(phase.id)}
                               onMouseLeave={() => setHoveredPhase(null)}
                            >
                               {/* Phase Node */}
                               <div className={`
                                  w-14 h-14 rounded-full border-2 bg-slate-950 flex items-center justify-center transition-all duration-500 z-20 cursor-pointer
                                  ${hoveredPhase === phase.id ? 'border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.5)] scale-110' : 'border-slate-700 hover:border-cyan-500/50'}
                               `}>
                                  <phase.icon size={20} className={`${hoveredPhase === phase.id ? 'text-cyan-400' : 'text-slate-500'} transition-colors`} />
                               </div>
                               
                               {/* Pulsing Ring for Active Node */}
                               <div className={`absolute top-0 left-0 w-14 h-14 rounded-full border border-cyan-500/30 animate-ping opacity-0 ${hoveredPhase === phase.id ? 'opacity-100' : ''} pointer-events-none`} />

                               {/* Label */}
                               <div className={`mt-4 text-center transition-all duration-300 ${hoveredPhase === phase.id ? 'transform translate-y-2' : ''}`}>
                                  <div className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${hoveredPhase === phase.id ? 'text-cyan-400' : 'text-slate-500'}`}>Phase 0{phase.id}</div>
                                  <div className={`text-xs font-heading font-bold ${hoveredPhase === phase.id ? 'text-white' : 'text-slate-400'}`}>{phase.title}</div>
                               </div>

                               {/* Holographic Detail Popover (Only on Hover) */}
                               {hoveredPhase === phase.id && (
                                  <div className="absolute bottom-full mb-4 w-72 bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-4 shadow-[0_0_30px_rgba(0,0,0,0.5)] animate-fadeIn z-50 origin-bottom">
                                     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-slate-900 border-r border-b border-cyan-500/30 rotate-45" />
                                     
                                     <div className="flex items-center gap-2 mb-3 border-b border-slate-800 pb-2">
                                        <div className="p-1.5 bg-cyan-950 rounded text-cyan-400"><phase.icon size={14} /></div>
                                        <div>
                                           <div className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest">{phase.subtitle}</div>
                                           <div className="text-white font-heading font-bold text-sm leading-none">{phase.title}</div>
                                        </div>
                                     </div>
                                     
                                     <div className="space-y-2.5 text-[11px]">
                                        <div className="flex gap-2">
                                           <span className="text-slate-500 font-bold w-12 shrink-0 uppercase tracking-wide">Agents</span>
                                           <span className="text-cyan-100">{phase.details.agents}</span>
                                        </div>
                                        <div className="flex gap-2">
                                           <span className="text-slate-500 font-bold w-12 shrink-0 uppercase tracking-wide">Time</span>
                                           <span className="text-white font-mono">{phase.details.duration}</span>
                                        </div>
                                        <div className="flex gap-2">
                                           <span className="text-slate-500 font-bold w-12 shrink-0 uppercase tracking-wide">Flow</span>
                                           <span className="text-slate-300 leading-tight">{phase.details.flow}</span>
                                        </div>
                                        <div className="pt-2 mt-2 border-t border-slate-800 text-slate-400 italic leading-relaxed">
                                           "{phase.details.desc}"
                                        </div>
                                     </div>
                                  </div>
                               )}
                            </div>
                         ))}
                      </div>
                   </div>
                </div>

             </div>
          </div>

          {/* 4. Bottom Ticker (Fixed Sticky) */}
          <div className="h-12 border-t border-slate-800 bg-slate-950 flex items-center gap-12 overflow-hidden whitespace-nowrap text-[10px] text-slate-500 uppercase tracking-[0.2em] px-6 font-mono font-bold z-20 shrink-0 shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
               <div className="flex items-center gap-2 text-green-500"><div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> SYSTEM OPTIMAL</div>
               <div>LATENCY: <span className="text-white">12ms</span></div>
               <div>ENCRYPTION: <span className="text-cyan-500">AES-256-GCM</span></div>
               <div>AGENTS ONLINE: <span className="text-white">{agents.filter(a => a.status === 'good').length}/{agents.length}</span></div>
               <div>QUEUED TASKS: <span className="text-white">1,204</span></div>
               <div className="flex-1 text-right text-cyan-900/50">AUTO.AI.QUE ORCHESTRATION ENGINE V2.4.1</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Arena;