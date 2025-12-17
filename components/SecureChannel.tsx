import React, { useState, useEffect, useRef } from 'react';
import { 
  AlertTriangle, Cpu, CheckCircle, ShieldAlert, Activity, Mic, Workflow, Factory, 
  Database, User, Clock, Zap, Lock, ChevronDown, RotateCcw, Send, MoreHorizontal, 
  Terminal, TrendingUp, BarChart, LayoutGrid, BookOpen, Server, Map, AlertCircle,
  FileText, Search, ArrowUpRight, ArrowDownRight, Calendar, Layers, Radio, Download, File,
  Globe, Shield, Plug, Wifi, Crosshair, Code, Truck
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, BarChart as ReBarChart, Bar, LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, 
  Radar, ComposedChart, Scatter, ScatterChart, ReferenceLine, PieChart, Pie, Cell
} from 'recharts';

// --- Types ---
interface LiveVehicle {
  id: string;
  health: number;
  status: 'good' | 'warning' | 'critical';
  issue?: string;
  load: number;
}

interface ChatMessage {
  id: number;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

interface LiveProject {
  id: string;
  name: string;
  owner: string;
  progress: number;
  eta: string;
  agents: string[];
  priority: 'Normal' | 'High' | 'Critical';
}

// Swarm Agent Definition
interface SwarmAgent {
  id: string;
  name: string;
  role: string;
  tier: string;
  status: string;
  task: string;
  load: number;
  angle: number;
  color: string;
}

// Knowledge Item
interface KnowledgeItem {
  id: string;
  title: string;
  category: string;
  date: string;
  size: string;
  type: string;
}

type TabView = 'DASHBOARD' | 'SECURITY' | 'MFG' | 'KNOWLEDGE' | 'GRAPHS';

// --- Generators & Data ---

const SWARM_AGENTS_LIST: SwarmAgent[] = [
  { id: 'AGT-001', name: 'NEXUS PRIME', role: 'Orchestrator', tier: 'CORE', status: 'Optimal', task: 'Global Sync', load: 85, angle: 0, color: '#06b6d4' },
  { id: 'AGT-003', name: 'TELEMATIC VIS', role: 'Analysis', tier: 'INTEL', status: 'Processing', task: 'Sensor Fusion', load: 62, angle: 45, color: '#06b6d4' },
  { id: 'AGT-007', name: 'VOICE AMB', role: 'Customer', tier: 'OPS', status: 'Active', task: 'Call Routing', load: 45, angle: 90, color: '#22c55e' },
  { id: 'AGT-009', name: 'LOYALTY ECHO', role: 'Retention', tier: 'OPS', status: 'Idle', task: 'Sentiment Analysis', load: 12, angle: 135, color: '#22c55e' },
  { id: 'AGT-010', name: 'SENTINEL VIGIL', role: 'Security', tier: 'SEC', status: 'High Alert', task: 'Intrusion Detection', load: 98, angle: 180, color: '#ef4444' },
  { id: 'AGT-011', name: 'FIREWALL G', role: 'Security', tier: 'SEC', status: 'Active', task: 'Packet Filtering', load: 75, angle: 225, color: '#ef4444' },
  { id: 'AGT-005', name: 'BATCH CORR', role: 'Manufacturing', tier: 'MFG', status: 'Warning', task: 'Yield Opt', load: 88, angle: 270, color: '#eab308' },
  { id: 'AGT-006', name: 'OPTIMAL ECON', role: 'Finance', tier: 'INTEL', status: 'Optimal', task: 'Cost Calc', load: 34, angle: 315, color: '#eab308' },
];

const KNOWLEDGE_BASE: KnowledgeItem[] = [
  { id: 'KB-101', title: 'XUV700 Service Manual v4.2', category: 'Technical', date: '2023-10-15', size: '24 MB', type: 'PDF' },
  { id: 'KB-102', title: 'Adrenox Connectivity Protocols', category: 'Software', date: '2023-09-22', size: '12 MB', type: 'DOCX' },
  { id: 'KB-103', title: 'EV Battery Handling Safety', category: 'Safety', date: '2023-11-01', size: '4.5 MB', type: 'PDF' },
  { id: 'KB-104', title: 'Customer Interaction Scripts', category: 'Support', date: '2023-08-10', size: '1.2 MB', type: 'TXT' },
  { id: 'KB-105', title: 'Scorpio-N Suspension Geometry', category: 'Technical', date: '2023-07-05', size: '18 MB', type: 'CAD' },
  { id: 'KB-106', title: 'Warranty Claim Guidelines 2024', category: 'Policy', date: '2023-10-30', size: '2.8 MB', type: 'PDF' },
  { id: 'KB-107', title: 'Recall Procedure: QA-2023-009', category: 'Urgent', date: '2023-10-28', size: '0.5 MB', type: 'MSG' },
  { id: 'KB-108', title: 'Factory Line Calibration Codes', category: 'Manufacturing', date: '2023-09-15', size: '80 KB', type: 'JSON' },
  { id: 'KB-109', title: 'Q3 Financial Impact Report', category: 'Finance', date: '2023-10-01', size: '3.4 MB', type: 'XLSX' },
  { id: 'KB-110', title: 'Technician Training Module: BE.6', category: 'Training', date: '2023-11-05', size: '145 MB', type: 'MP4' },
];

// Mock data generator for charts
const generateTimeSeriesData = (points: number, base: number, volatility: number) => {
  return Array.from({ length: points }, (_, i) => ({
    time: i,
    label: `${String(Math.floor(i / 6)).padStart(2, '0')}:${String((i % 6) * 10).padStart(2, '0')}`,
    value: Math.max(0, base + Math.random() * volatility - volatility / 2),
    value2: Math.max(0, base * 0.8 + Math.random() * volatility - volatility / 2),
  }));
};

const SWARM_METRICS = generateTimeSeriesData(24, 85, 15);
const THREAT_DATA_INIT = generateTimeSeriesData(50, 20, 40);
const MFG_YIELD_DATA_INIT = generateTimeSeriesData(30, 95, 5);

const RESOURCE_DATA = [
  { name: 'Power', value: 78, max: 100, unit: 'kW' },
  { name: 'Water', value: 45, max: 100, unit: 'L/m' },
  { name: 'Compute', value: 92, max: 100, unit: 'TFLOPS' },
  { name: 'Bandwidth', value: 64, max: 100, unit: 'Gbps' },
];

const FAILURE_DATA = [
  { name: 'Sensors', value: 35, color: '#ef4444' },
  { name: 'Software', value: 25, color: '#3b82f6' },
  { name: 'Battery', value: 20, color: '#eab308' },
  { name: 'Mechanical', value: 15, color: '#22c55e' },
  { name: 'User Err', value: 5, color: '#64748b' },
];

const GEO_THREATS = [
  { country: 'North America', count: 124, risk: 'Low' },
  { country: 'Eastern Europe', count: 842, risk: 'Critical' },
  { country: 'East Asia', count: 430, risk: 'High' },
  { country: 'Local (Internal)', count: 5, risk: 'Medium' },
];

const HEATMAP_DATA = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  load: Math.floor(Math.random() * 100),
  cluster: Math.floor(i / 20)
}));

const AUDIT_LOGS = Array.from({ length: 40 }, (_, i) => ({
  id: `LOG-${1000 + i}`,
  timestamp: new Date(Date.now() - i * 600000).toISOString(),
  action: ['Auth_Request', 'Data_Access', 'Config_Change', 'API_Call'][Math.floor(Math.random() * 4)],
  actor: ['Service_Agent_04', 'Admin_User', 'External_API', 'System_Kernel'][Math.floor(Math.random() * 4)],
  status: Math.random() > 0.9 ? 'FAILED' : 'SUCCESS',
  latency: `${Math.floor(Math.random() * 50)}ms`
}));

// Graph Data
const ACCURACY_DATA = [
  { name: 'v1.0', accuracy: 82, precision: 78 },
  { name: 'v1.5', accuracy: 86, precision: 84 },
  { name: 'v2.0', accuracy: 89, precision: 88 },
  { name: 'v2.5', accuracy: 93, precision: 91 },
  { name: 'v3.0', accuracy: 96, precision: 95 },
];

const ANOMALY_TREND_DATA_INIT = Array.from({ length: 40 }, (_, i) => {
  const base = 20 + Math.random() * 10;
  // Inject spikes
  const value = i === 15 || i === 28 ? 85 + Math.random() * 10 : base;
  return { time: i, value, threshold: 75 };
});

const SERVICE_HEATMAP_DATA = Array.from({ length: 7 * 12 }, (_, i) => ({
  day: Math.floor(i / 12), // 0-6 (Mon-Sun)
  hour: i % 12, // 8AM - 8PM (12 slots)
  demand: Math.floor(Math.random() * 100)
}));
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Helper to generate random new tasks
const generateNewProject = (index: number): LiveProject => {
  const tasks = [
    { name: 'Thermal System Calibration', eta: '15 min', agents: ['Sensor', 'Analysis'] },
    { name: 'ADAS Sensor Realignment', eta: '45 min', agents: ['Vision', 'Mech'] },
    { name: 'Battery Cell Balancing', eta: '30 min', agents: ['Power', 'Safety'] },
    { name: 'Firmware Over-the-Air Update', eta: '10 min', agents: ['Net', 'Sec'] },
    { name: 'Suspension Geometry Check', eta: '25 min', agents: ['Mech', 'Data'] }
  ];
  const owners = ['Vikram Malhotra', 'Sarah Jenkins', 'Dr. A. Gupta', 'Fleet Ops #4', 'K. Sowmya'];
  const task = tasks[Math.floor(Math.random() * tasks.length)];
  
  return {
    id: `MH0${Math.floor(Math.random() * 9) + 1}-V-${Math.floor(Math.random() * 899) + 100}`,
    name: task.name,
    owner: owners[Math.floor(Math.random() * owners.length)],
    progress: 0,
    eta: task.eta,
    agents: task.agents,
    priority: Math.random() > 0.7 ? 'High' : 'Normal'
  };
};

const SecureChannel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabView>('DASHBOARD');
  const [hoveredAgent, setHoveredAgent] = useState<SwarmAgent | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // --- Dynamic Data States for Graphs ---
  const [threatData, setThreatData] = useState(THREAT_DATA_INIT);
  const [yieldData, setYieldData] = useState(MFG_YIELD_DATA_INIT);
  const [anomalyData, setAnomalyData] = useState(ANOMALY_TREND_DATA_INIT);

  // --- Live Ops State ---
  const [vehicles, setVehicles] = useState<LiveVehicle[]>([
    { id: 'V-001', health: 95, status: 'good', load: 45 },
    { id: 'V-045', health: 72, status: 'warning', issue: 'Oil change due', load: 60 },
    { id: 'V-129', health: 32, status: 'critical', issue: 'Brake Pad Wear (85%)', load: 90 },
    { id: 'V-312', health: 88, status: 'good', load: 30 },
    { id: 'V-078', health: 91, status: 'good', load: 42 },
    { id: 'V-156', health: 65, status: 'warning', issue: 'Battery low', load: 75 },
    { id: 'V-234', health: 98, status: 'good', load: 20 },
    { id: 'V-089', health: 45, status: 'warning', issue: 'Tire pressure', load: 55 },
  ]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [projects, setProjects] = useState<LiveProject[]>([
    { id: 'MH01-V-129', name: 'Brake System Analysis', owner: 'Rajesh Kumar', progress: 100, eta: 'Complete', agents: ['Data', 'Analysis'], priority: 'Critical' },
    { id: 'MH01-V-045', name: 'Routine Maint. Check', owner: 'Priya Singh', progress: 45, eta: '3 min', agents: ['Scheduler'], priority: 'Normal' },
    { id: 'MH01-V-089', name: 'Tire Pressure Monitor', owner: 'Amit Patel', progress: 12, eta: '18 min', agents: ['Sensor'], priority: 'Normal' },
  ]);

  // --- Live Graph Updates ---
  useEffect(() => {
    const interval = setInterval(() => {
      // Update Threat Data
      setThreatData(prev => {
        const newData = [...prev.slice(1)];
        const lastTime = prev[prev.length - 1].time as number;
        newData.push({
           time: lastTime + 1,
           label: 'Now',
           value: Math.max(0, 20 + Math.random() * 40 - 20),
           value2: 0
        });
        return newData;
      });

      // Update Yield Data
      setYieldData(prev => {
        const newData = [...prev.slice(1)];
        const lastTime = prev[prev.length - 1].time as number;
        newData.push({
           time: lastTime + 1,
           label: 'Now',
           value: Math.min(100, Math.max(80, 95 + (Math.random() - 0.5) * 5)),
           value2: Math.min(100, Math.max(70, 85 + (Math.random() - 0.5) * 8)),
        });
        return newData;
      });

      // Update Anomaly Data
      setAnomalyData(prev => {
        const newData = [...prev.slice(1)];
        const lastTime = prev[prev.length - 1].time as number;
        newData.push({
           time: lastTime + 1,
           value: Math.random() > 0.95 ? 85 + Math.random() * 10 : 20 + Math.random() * 10,
           threshold: 75
        });
        return newData;
      });

    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // --- Effects ---
  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles(prev => prev.map(v => ({
        ...v,
        health: Math.min(100, Math.max(0, v.health + (Math.random() - 0.5) * 2)), 
        load: Math.min(100, Math.max(0, v.load + (Math.random() - 0.5) * 5))
      })));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProjects(prev => prev.map(p => {
        if (p.progress >= 100) return p; 
        const speed = p.priority === 'Critical' ? 2.5 : 0.8;
        const newProgress = Math.min(100, p.progress + Math.random() * speed);
        return { ...p, progress: newProgress, eta: newProgress >= 100 ? 'Review Req.' : p.eta };
      }));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const sequence = [
      { delay: 1000, sender: 'ai', text: "Hello Mr. Kumar, this is your vehicle AI. I've detected your brake pads are at 85% wear." },
      { delay: 4000, sender: 'user', text: "How urgent is this? I'm busy next week." },
      { delay: 7000, sender: 'ai', text: "High urgency. I can arrange mobile service at your office (Wed 3PM) or a loaner car." }
    ];
    let timeouts: ReturnType<typeof setTimeout>[] = [];
    setMessages([]);
    sequence.forEach((msg, index) => {
      timeouts.push(setTimeout(() => setIsTyping(true), msg.delay - 800));
      timeouts.push(setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { id: index, sender: msg.sender as 'ai'|'user', text: msg.text, timestamp: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) }]);
      }, msg.delay));
    });
    return () => timeouts.forEach(clearTimeout);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  // --- Sub-Window Renderers ---

  const renderDashboard = () => (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* 1. TOP ROW: Monitoring (Fleet Vitality) */}
      <div className="grid grid-cols-1 gap-6">
        <div className="w-full">
           <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-2">
              <h3 className="text-xs font-heading font-black text-slate-400 uppercase flex items-center gap-2 tracking-[0.2em]">
                  <Activity size={14} className="text-cyan-500 animate-pulse" /> Fleet Vitality Index
              </h3>
              <div className="flex gap-4 text-[10px] font-mono text-cyan-500/70 font-bold">
                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-sm bg-green-500 animate-pulse"></span> LIVE FEED</span>
                <span>LATENCY: 12ms</span>
              </div>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {vehicles.map(v => (
                 <div key={v.id} className={`p-3 rounded bg-slate-900/80 border backdrop-blur-sm relative overflow-hidden group ${v.status === 'critical' ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : v.status === 'warning' ? 'border-yellow-500/40' : 'border-slate-800 hover:border-cyan-500/50'}`}>
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-600 group-hover:border-cyan-400 transition-colors" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-slate-600 group-hover:border-cyan-400 transition-colors" />
                    <div className="flex justify-between items-start mb-2">
                       <span className={`font-mono font-bold text-xs ${v.status === 'critical' ? 'text-red-400' : 'text-slate-200'}`}>{v.id}</span>
                       <div className={`w-1.5 h-1.5 rounded-sm ${v.status === 'good' ? 'bg-green-500' : v.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                    </div>
                    <div className="space-y-1.5">
                       <div className="flex justify-between text-[9px] uppercase text-slate-500 font-bold tracking-wider">
                          <span>Health</span>
                          <span className="font-mono">{v.health.toFixed(0)}%</span>
                       </div>
                       <div className="h-1 w-full bg-slate-800 rounded-sm overflow-hidden">
                          <div className={`h-full rounded-sm transition-all duration-700 ${v.status === 'good' ? 'bg-green-500' : v.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${v.health}%` }} />
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT GRID (MERGED: Swarm + Workflows) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
         
         {/* LEFT COL: SWARM INTELLIGENCE (The "Hero" Section) */}
         <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-xl p-6 relative overflow-hidden flex flex-col">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.2)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            
            <div className="flex justify-between items-start mb-6 z-10">
                <h3 className="text-xs font-heading font-black text-slate-300 uppercase flex items-center gap-2 tracking-[0.2em]">
                  <Layers size={14} className="text-cyan-500" /> Active Agent Swarm
                </h3>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase"><div className="w-2 h-2 rounded-full bg-cyan-500"></div> Intel</div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase"><div className="w-2 h-2 rounded-full bg-green-500"></div> Ops</div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase"><div className="w-2 h-2 rounded-full bg-red-500"></div> Sec</div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> Mfg</div>
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center relative z-10">
                {/* COMPLEX SVG VISUALIZATION */}
                <div className="relative w-[400px] h-[400px]">
                   <svg width="400" height="400" viewBox="0 0 400 400" className="animate-spin-slow" style={{ animationDuration: '60s' }}>
                      {/* Outer Dashed Ring */}
                      <circle cx="200" cy="200" r="190" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="10 10" opacity="0.5" />
                      
                      {/* Active Sector Arcs */}
                      <g className="animate-spin-slow" style={{ animationDuration: '30s', transformOrigin: '200px 200px' }}>
                         <path d="M 200 50 A 150 150 0 0 1 306 94" fill="none" stroke="#06b6d4" strokeWidth="8" strokeLinecap="round" opacity="0.8" />
                         <path d="M 341 235 A 150 150 0 0 1 306 306" fill="none" stroke="#22c55e" strokeWidth="8" strokeLinecap="round" opacity="0.8" />
                         <path d="M 129 330 A 150 150 0 0 1 50 200" fill="none" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" opacity="0.8" />
                         <path d="M 60 129 A 150 150 0 0 1 129 60" fill="none" stroke="#eab308" strokeWidth="8" strokeLinecap="round" opacity="0.8" />
                      </g>
                      <circle cx="200" cy="200" r="150" fill="none" stroke="#1e293b" strokeWidth="1" />
                      <circle cx="200" cy="200" r="100" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                   </svg>
                   
                   {/* Agent Nodes with Hover Interaction */}
                   <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '40s' }}>
                      {SWARM_AGENTS_LIST.map((agent, i) => {
                         const rad = (agent.angle * Math.PI) / 180;
                         const x = 200 + 190 * Math.cos(rad);
                         const y = 200 + 190 * Math.sin(rad);
                         return (
                            <div 
                               key={agent.id} 
                               className="absolute w-4 h-4 rounded-full border-2 border-slate-900 shadow-lg transform -translate-x-1/2 -translate-y-1/2 hover:scale-150 transition-transform cursor-pointer z-50"
                               style={{ 
                                  backgroundColor: agent.color,
                                  left: x,
                                  top: y,
                                  boxShadow: `0 0 15px ${agent.color}`
                               }}
                               onMouseEnter={() => setHoveredAgent(agent)}
                               onMouseLeave={() => setHoveredAgent(null)}
                            />
                         );
                      })}
                   </div>

                   {/* Central Master Node */}
                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-24 h-24 bg-cyan-950/80 rounded-full border-2 border-cyan-500/50 flex items-center justify-center backdrop-blur-md shadow-[0_0_50px_rgba(6,182,212,0.3)] animate-pulse">
                         <div className="text-center">
                            <div className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase">Master</div>
                            <div className="text-xs text-white font-black">CORE</div>
                         </div>
                      </div>
                   </div>
                </div>
            </div>
            {/* Swarm Metrics Footer */}
            <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-2 gap-4">
               <div className="h-[60px]">
                  <div className="text-[9px] text-slate-500 font-bold uppercase mb-1">Total Processing Load</div>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={SWARM_METRICS}>
                      <defs>
                        <linearGradient id="colorValueSwarmMini" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="value" stroke="#06b6d4" fillOpacity={1} fill="url(#colorValueSwarmMini)" strokeWidth={2} isAnimationActive={false} />
                    </AreaChart>
                  </ResponsiveContainer>
               </div>
               <div className="h-[60px]">
                  <div className="text-[9px] text-slate-500 font-bold uppercase mb-1">Cluster Heatmap</div>
                  <div className="grid grid-cols-20 gap-0.5 h-full overflow-hidden content-start">
                     {HEATMAP_DATA.slice(0, 80).map((cell) => (
                        <div key={cell.id} className="aspect-square rounded-[1px]" style={{ backgroundColor: cell.load > 70 ? '#06b6d4' : '#1e293b', opacity: 0.5 + (cell.load / 200) }} />
                     ))}
                  </div>
               </div>
            </div>
         </div>

         {/* RIGHT COL: WORKFLOWS & VOICE LINK */}
         <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Live Workflows */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden flex flex-col shadow-lg flex-1">
               <div className="p-3 bg-slate-950 border-b border-slate-800 flex justify-between items-center">
                  <h3 className="text-xs font-heading font-black text-slate-300 flex items-center gap-2 tracking-[0.2em] uppercase">
                     <Activity size={14} className="text-cyan-500" /> Live Workflows
                  </h3>
                  <span className="text-[10px] font-mono text-slate-500">{projects.length} Active</span>
               </div>
               <div className="p-4 space-y-4 overflow-y-auto custom-scrollbar flex-1 max-h-[250px]">
                  {projects.map((project, index) => (
                     <div key={project.id} className={`bg-slate-900/50 border rounded-lg p-3 transition-all duration-300 relative ${project.progress >= 100 ? 'border-green-500/40 shadow-[0_0_15px_rgba(34,197,94,0.1)] bg-green-950/10' : 'border-slate-800'}`}>
                        <div className="flex justify-between mb-2">
                           <div className="flex items-center gap-2">
                              {project.progress >= 100 && <CheckCircle size={14} className="text-green-500 animate-pulse" />}
                              <div>
                                 <div className="text-xs font-bold text-white tracking-wide">{project.id}</div>
                                 <div className="text-[10px] text-slate-500 font-medium">{project.name}</div>
                              </div>
                           </div>
                           <div className="text-right">
                              <span className={`text-[9px] px-1.5 py-0.5 rounded border uppercase font-bold ${project.priority === 'Critical' ? 'bg-red-500/10 text-red-400 border-red-500/30' : 'bg-blue-500/10 text-blue-400 border-blue-500/30'}`}>{project.priority}</span>
                           </div>
                        </div>
                        <div className="space-y-1">
                           <div className="flex justify-between text-[9px] text-slate-400 font-mono"><span>PROGRESS</span><span>{Math.round(project.progress)}%</span></div>
                           <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                              <div className={`h-full relative overflow-hidden transition-all duration-500 ease-out ${project.progress >= 100 ? 'bg-green-500' : 'bg-cyan-500'}`} style={{ width: `${project.progress}%` }} />
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* Voice Link */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-[300px] relative shadow-xl">
               <div className="p-3 bg-slate-950 border-b border-slate-800 flex justify-between items-center z-20">
                  <h3 className="text-xs font-heading font-black text-slate-300 flex items-center gap-2 tracking-[0.2em] uppercase">
                     <Mic size={14} className="text-cyan-500 animate-pulse" /> Secure Voice Link
                  </h3>
                  <span className="text-[9px] bg-green-950 text-green-400 px-2 py-0.5 rounded-full border border-green-800 uppercase font-bold animate-pulse">Encrypted</span>
               </div>
               <div className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar bg-slate-950/50">
                  {messages.map((msg) => (
                     <div key={msg.id} className={`flex gap-3 animate-fadeIn ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 ${msg.sender === 'ai' ? 'bg-cyan-950/30 border-cyan-500/30' : 'bg-purple-950/30 border-purple-500/30'}`}>
                           {msg.sender === 'ai' ? <Cpu size={14} className="text-cyan-400" /> : <User size={14} className="text-purple-400" />}
                        </div>
                        <div className={`p-3 rounded-xl text-xs text-slate-300 border max-w-[80%] shadow-lg leading-relaxed ${msg.sender === 'ai' ? 'bg-slate-900 border-slate-800 rounded-tl-none' : 'bg-purple-900/10 border-purple-500/20 rounded-tr-none'}`}>
                           {msg.text}
                        </div>
                     </div>
                  ))}
                  {isTyping && <div className="text-xs text-slate-500 animate-pulse ml-12">Agent typing...</div>}
               </div>
            </div>
         </div>
      </div>

      {/* 3. BOTTOM ROW: Critical Alert */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="bg-slate-900/80 border border-red-500/30 rounded-xl overflow-hidden relative shadow-[0_0_30px_rgba(239,68,68,0.15)] flex flex-row">
            <div className="w-1/3 bg-red-950/20 border-r border-red-900/30 p-6 flex flex-col justify-center items-center text-center">
                <AlertTriangle className="text-red-500 mb-2 animate-pulse" size={40} />
                <h2 className="text-lg font-heading font-black text-white tracking-wide">ALERT</h2>
                <div className="text-[10px] text-red-400 font-mono mt-0.5">PRIORITY: CRITICAL</div>
            </div>
            <div className="flex-1 p-6 flex flex-col justify-center space-y-2">
               <div className="flex justify-between items-start">
                  <h3 className="font-bold text-white text-lg">TARGET: MH01-V-129</h3>
                  <div className="text-[10px] text-red-300 font-mono bg-red-900/30 px-2 py-1 rounded border border-red-500/30">CONFIDENCE: 92%</div>
               </div>
               <p className="text-sm text-slate-300">Predictive analysis indicates critical <strong className="text-red-400">Brake Pad Failure</strong> within 200km. Immediate intervention protocol initiated.</p>
               <div className="pt-2">
                  <span className="text-[10px] text-slate-500 font-mono">AGENTS ASSIGNED: TELEMATIC VIS, DIAGNOSTIC PROPHET</span>
               </div>
            </div>
         </div>
         
         <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 flex flex-col">
            <h3 className="text-xs font-heading font-black text-slate-500 uppercase mb-3 flex items-center gap-2 tracking-[0.2em]">
               <Factory size={14} className="text-cyan-500" /> Parallel Ops Insight
            </h3>
            <div className="flex-1 space-y-4 text-xs text-slate-400 flex flex-col justify-center">
               <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 mt-1.5 bg-green-500 rounded-sm animate-pulse shadow-[0_0_5px_currentColor]" />
                  <div>
                     <div className="text-slate-500 text-[9px] uppercase font-bold mb-0.5">Root Cause Analysis</div>
                     <div className="text-slate-200">Defect identified in <strong className="text-white">Assembly Line #4</strong>. Batch XR-234 flagged for review.</div>
                  </div>
               </div>
               <div className="flex justify-between items-center bg-green-950/20 px-3 py-2 rounded border border-green-500/20 mt-2">
                  <span className="text-[10px] font-bold uppercase text-green-700">Projected Savings</span>
                  <span className="font-mono font-bold text-green-400">$3,240.00 / day</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );

  const renderKnowledge = () => (
    <div className="space-y-6 animate-fadeIn pb-20">
       <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-heading font-black text-white tracking-tight flex items-center gap-3">
             <BookOpen className="text-cyan-500" /> SECURE KNOWLEDGE ARCHIVE
          </h2>
          <div className="flex gap-2">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                <input type="text" placeholder="Search archives..." className="bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs text-white focus:border-cyan-500 outline-none w-64" />
             </div>
             <button className="bg-cyan-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-cyan-500 transition-colors">UPLOAD NEW</button>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl flex items-center gap-4">
             <div className="p-3 bg-blue-900/20 rounded-lg text-blue-400"><FileText size={24} /></div>
             <div>
                <div className="text-2xl font-bold text-white">1,240</div>
                <div className="text-[10px] text-slate-500 uppercase font-bold">Total Documents</div>
             </div>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl flex items-center gap-4">
             <div className="p-3 bg-green-900/20 rounded-lg text-green-400"><Database size={24} /></div>
             <div>
                <div className="text-2xl font-bold text-white">4.2 TB</div>
                <div className="text-[10px] text-slate-500 uppercase font-bold">Storage Used</div>
             </div>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl flex items-center gap-4">
             <div className="p-3 bg-purple-900/20 rounded-lg text-purple-400"><Server size={24} /></div>
             <div>
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-[10px] text-slate-500 uppercase font-bold">Linked Databases</div>
             </div>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl flex items-center gap-4">
             <div className="p-3 bg-cyan-900/20 rounded-lg text-cyan-400"><Globe size={24} /></div>
             <div>
                <div className="text-2xl font-bold text-white">Global</div>
                <div className="text-[10px] text-slate-500 uppercase font-bold">Access Level</div>
             </div>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-[500px]">
             <div className="p-4 border-b border-slate-800 bg-slate-950">
                 <h3 className="text-xs font-heading font-black text-slate-400 uppercase flex items-center gap-2 tracking-[0.2em]">
                    <Layers size={14} className="text-cyan-500" /> Document Repository
                 </h3>
             </div>
             <div className="flex-1 overflow-y-auto custom-scrollbar">
                <table className="w-full text-left text-xs">
                   <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider sticky top-0 z-10">
                      <tr>
                         <th className="p-4 border-b border-slate-800">Document Name</th>
                         <th className="p-4 border-b border-slate-800">Category</th>
                         <th className="p-4 border-b border-slate-800">Type</th>
                         <th className="p-4 border-b border-slate-800">Size</th>
                         <th className="p-4 border-b border-slate-800">Last Updated</th>
                         <th className="p-4 text-right border-b border-slate-800">Action</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-800 text-slate-300">
                      {KNOWLEDGE_BASE.map((doc) => (
                         <tr key={doc.id} className="hover:bg-slate-800/50 transition-colors group">
                            <td className="p-4 font-bold text-white flex items-center gap-3">
                               <File size={14} className="text-cyan-500 group-hover:scale-110 transition-transform" /> {doc.title}
                            </td>
                            <td className="p-4">
                               <span className="bg-slate-800 text-slate-400 px-2 py-1 rounded text-[10px] uppercase font-bold border border-slate-700">{doc.category}</span>
                            </td>
                            <td className="p-4 font-mono text-slate-500">{doc.type}</td>
                            <td className="p-4 font-mono text-slate-500">{doc.size}</td>
                            <td className="p-4 text-slate-500">{doc.date}</td>
                            <td className="p-4 text-right">
                               <button className="text-cyan-400 hover:text-white transition-colors"><Download size={16} /></button>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
             <p className="text-[10px] text-slate-500 p-4 italic border-t border-slate-800/50 bg-slate-950">
                Centralized repository of all technical schematics, protocols, and manuals for autonomous agents.
             </p>
          </div>

          <div className="space-y-6">
             <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6">
                <h3 className="text-xs font-heading font-black text-slate-400 uppercase mb-4 flex items-center gap-2 tracking-[0.2em]">
                   <TrendingUp size={14} className="text-green-500" /> Trending Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                   {['#Suspension', '#EV_Battery', '#Adrenox_v4', '#Safety_Protocol', '#Recall_2024', '#Paint_Shop', '#Robotics', '#Firmware'].map(tag => (
                      <span key={tag} className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors cursor-pointer">
                         {tag}
                      </span>
                   ))}
                </div>
             </div>
             
             <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 flex-1">
                <h3 className="text-xs font-heading font-black text-slate-400 uppercase mb-4 flex items-center gap-2 tracking-[0.2em]">
                   <Clock size={14} className="text-blue-500" /> Recent Uploads
                </h3>
                <div className="space-y-4">
                   {[1,2,3].map((_, i) => (
                      <div key={i} className="flex gap-3 items-start">
                         <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-slate-500 font-bold text-xs">{['JD', 'AK', 'EV'][i]}</div>
                         <div>
                            <div className="text-xs font-bold text-white hover:text-cyan-400 cursor-pointer">{['Diagnostic_Report_V12.pdf', 'Line_3_Calibration.json', 'Safety_Memo_Q4.docx'][i]}</div>
                            <div className="text-[10px] text-slate-500 mt-0.5">Uploaded by {['John Doe', 'A. Khan', 'E. Vance'][i]} • {i+1}h ago</div>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>
       </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6 animate-fadeIn pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threat Monitor */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 h-[400px] flex flex-col">
           <h3 className="text-xs font-heading font-black text-slate-400 uppercase mb-4 flex items-center gap-2 tracking-[0.2em]">
              <ShieldAlert size={14} className="text-red-500" /> Active Threat Level
           </h3>
           <div className="flex-1 min-h-0">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={threatData}>
                  <defs>
                     <linearGradient id="colorThreat" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                     </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <Tooltip contentStyle={{backgroundColor: '#0f172a', borderColor: '#334155'}} />
                  <Area type="monotone" dataKey="value" stroke="#ef4444" fill="url(#colorThreat)" isAnimationActive={false} />
               </AreaChart>
             </ResponsiveContainer>
           </div>
           <p className="text-[10px] text-slate-500 mt-2 italic border-t border-slate-800/50 pt-2">
              Real-time heuristic analysis of incoming packet traffic against known signatures.
           </p>
        </div>

        {/* Global Threat Map (Visual Mock) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 h-[400px] flex flex-col">
            <h3 className="text-xs font-heading font-black text-slate-400 uppercase mb-4 flex items-center gap-2 tracking-[0.2em]">
              <Globe size={14} className="text-cyan-500" /> Global Threat Origin
           </h3>
           <div className="flex-1 flex gap-4">
              <div className="w-1/2 space-y-2">
                 {GEO_THREATS.map((geo, i) => (
                    <div key={i} className="bg-slate-950 p-3 rounded border border-slate-800 flex justify-between items-center group hover:border-cyan-500/30 transition-all">
                       <div>
                          <div className="text-xs font-bold text-white">{geo.country}</div>
                          <div className="text-[10px] text-slate-500">{geo.count} Attacks Blocked</div>
                       </div>
                       <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                          geo.risk === 'Critical' ? 'bg-red-900/20 text-red-500 border-red-500/30' :
                          geo.risk === 'High' ? 'bg-orange-900/20 text-orange-500 border-orange-500/30' :
                          'bg-green-900/20 text-green-500 border-green-500/30'
                       }`}>{geo.risk}</span>
                    </div>
                 ))}
              </div>
              <div className="w-1/2 bg-slate-950 rounded-lg border border-slate-800 relative overflow-hidden flex items-center justify-center">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black" />
                 <div className="relative grid grid-cols-4 gap-4 opacity-50">
                    {[1,2,3,4,5,6,7,8].map(i => (
                       <div key={i} className="w-2 h-2 rounded-full bg-slate-700 animate-pulse" style={{ animationDelay: `${i * 0.2}s`}} />
                    ))}
                 </div>
                 <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                 <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-orange-500 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
              </div>
           </div>
           <p className="text-[10px] text-slate-500 mt-2 italic border-t border-slate-800/50 pt-2">
              Geo-spatial visualization of IP origins for rejected connection attempts.
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Audit Logs */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 h-[300px] flex flex-col">
            <h3 className="text-xs font-heading font-black text-slate-400 uppercase mb-4 flex items-center gap-2 tracking-[0.2em]">
              <FileText size={14} className="text-blue-500" /> Security Audit Stream
           </h3>
           <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2">
              {AUDIT_LOGS.map(log => (
                 <div key={log.id} className="flex items-center justify-between p-2 hover:bg-slate-800 rounded border border-transparent hover:border-slate-700 transition-all text-xs">
                    <div className="flex items-center gap-3">
                       <div className={`w-1.5 h-1.5 rounded-full ${log.status === 'SUCCESS' ? 'bg-green-500' : 'bg-red-500'}`} />
                       <span className="font-mono text-slate-500">{log.timestamp.split('T')[1].split('.')[0]}</span>
                       <span className="text-slate-300 font-bold">{log.action}</span>
                    </div>
                    <div className="flex items-center gap-4">
                       <span className="text-slate-500">{log.actor}</span>
                       <span className="font-mono text-cyan-500/50">{log.latency}</span>
                    </div>
                 </div>
              ))}
           </div>
           <p className="text-[10px] text-slate-500 mt-2 italic border-t border-slate-800/50 pt-2">
              Immutable ledger of all system access attempts and privilege escalations.
           </p>
        </div>

        {/* Active Protocols */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 h-[300px] flex flex-col">
            <h3 className="text-xs font-heading font-black text-slate-400 uppercase mb-4 flex items-center gap-2 tracking-[0.2em]">
              <Lock size={14} className="text-green-500" /> Active Security Protocols
           </h3>
           <div className="grid grid-cols-2 gap-4 flex-1">
              {[
                 { name: 'Data Encryption', status: 'AES-256', active: true },
                 { name: 'Port Scanning', status: 'Continuous', active: true },
                 { name: 'Identity Auth', status: 'MFA Enforced', active: true },
                 { name: 'DDoS Protection', status: 'Standby', active: true },
                 { name: 'Session Timeout', status: '15m Idle', active: true },
                 { name: 'API Rate Limit', status: '10k/min', active: true },
              ].map((proto, i) => (
                 <div key={i} className="bg-slate-950 p-3 rounded border border-slate-800 flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2">
                       <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#22c55e]" />
                    </div>
                    <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">{proto.name}</div>
                    <div className="text-sm font-bold text-white font-mono">{proto.status}</div>
                 </div>
              ))}
           </div>
           <p className="text-[10px] text-slate-500 mt-2 italic border-t border-slate-800/50 pt-2">
              Status of core defensive measures and policy enforcers.
           </p>
        </div>
      </div>
    </div>
  );

  const renderManufacturing = () => (
    <div className="space-y-6 animate-fadeIn pb-20">
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-xl p-6 h-[400px] flex flex-col">
              <h3 className="text-xs font-heading font-black text-slate-400 uppercase mb-4 flex items-center gap-2 tracking-[0.2em]">
                 <Factory size={14} className="text-yellow-500" /> Production Yield Rates
              </h3>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={yieldData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <Tooltip contentStyle={{backgroundColor: '#0f172a', borderColor: '#334155'}} />
                      <Line type="monotone" dataKey="value" stroke="#eab308" strokeWidth={2} dot={false} name="Line A Yield" isAnimationActive={false} />
                      <Line type="monotone" dataKey="value2" stroke="#06b6d4" strokeWidth={2} dot={false} name="Line B Yield" isAnimationActive={false} />
                      <Legend />
                   </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-[10px] text-slate-500 mt-2 italic border-t border-slate-800/50 pt-2">
                 Comparative analysis of production line output efficiency vs defects.
              </p>
          </div>
          
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 flex flex-col h-[400px]">
              <h3 className="text-xs font-heading font-black text-slate-400 uppercase mb-4 flex items-center gap-2 tracking-[0.2em]">
                 <AlertCircle size={14} className="text-cyan-500" /> Line Status
              </h3>
              <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-2">
                 {['Assembly Line 1', 'Assembly Line 2', 'Paint Shop', 'QA Station', 'Final PDI', 'Robotics Wing', 'Stamping'].map((line, i) => (
                    <div key={i} className="bg-slate-950 p-3 rounded border border-slate-800 flex justify-between items-center hover:border-slate-700 transition-colors">
                       <span className="text-xs font-bold text-slate-300">{line}</span>
                       <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${i === 2 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-green-500/20 text-green-400 border border-green-500/30'}`}>
                          {i === 2 ? 'Maintenance' : 'Running'}
                       </span>
                    </div>
                 ))}
              </div>
              <p className="text-[10px] text-slate-500 mt-2 italic border-t border-slate-800/50 pt-2">
                 Operational heartbeat of physical assembly stations.
              </p>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 h-[300px] flex flex-col">
              <h3 className="text-xs font-heading font-black text-slate-400 uppercase mb-4 flex items-center gap-2 tracking-[0.2em]">
                 <Plug size={14} className="text-blue-500" /> Resource Consumption
              </h3>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                   <ReBarChart data={RESOURCE_DATA} layout="vertical" margin={{ left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={true} vertical={false} />
                      <XAxis type="number" domain={[0, 100]} stroke="#64748b" fontSize={10} hide />
                      <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={10} width={60} />
                      <Tooltip contentStyle={{backgroundColor: '#0f172a', borderColor: '#334155'}} cursor={{fill: '#1e293b'}} />
                      <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} isAnimationActive={false}>
                        {RESOURCE_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={['#eab308', '#06b6d4', '#8b5cf6', '#22c55e'][index % 4]} />
                        ))}
                      </Bar>
                   </ReBarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-[10px] text-slate-500 mt-2 italic border-t border-slate-800/50 pt-2">
                 Real-time utilization of power, water, compute, and network bandwidth across facility.
              </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 h-[300px] flex flex-col">
              <h3 className="text-xs font-heading font-black text-slate-400 uppercase mb-4 flex items-center gap-2 tracking-[0.2em]">
                 <Truck size={14} className="text-purple-500" /> Supply Chain Feed
              </h3>
              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2">
                 {[
                    { item: 'Li-Ion Cells (18650)', qty: '5,000u', eta: 'Arrived', status: 'Inbound' },
                    { item: 'Steel Sheets (Grade A)', qty: '20 Tons', eta: '4h', status: 'Transit' },
                    { item: 'Microcontrollers (MCU)', qty: '2,000u', eta: 'Delayed', status: 'Warning' },
                    { item: 'Windshield Glass', qty: '500u', eta: 'Tomorrow', status: 'Transit' },
                    { item: 'Upholstery Fabric', qty: '1,200m', eta: 'Arrived', status: 'Inbound' },
                 ].map((supply, i) => (
                    <div key={i} className="flex justify-between items-center p-2 bg-slate-950 border border-slate-800 rounded text-xs">
                       <div className="flex items-center gap-3">
                          <div className={`w-1.5 h-1.5 rounded-full ${supply.status === 'Warning' ? 'bg-red-500' : supply.status === 'Arrived' ? 'bg-green-500' : 'bg-blue-500'}`} />
                          <span className="text-slate-200 font-bold">{supply.item}</span>
                       </div>
                       <div className="text-right">
                          <div className="text-slate-500">{supply.qty}</div>
                          <div className={`text-[9px] font-bold uppercase ${supply.status === 'Warning' ? 'text-red-500' : 'text-cyan-500'}`}>{supply.eta}</div>
                       </div>
                    </div>
                 ))}
              </div>
              <p className="text-[10px] text-slate-500 mt-2 italic border-t border-slate-800/50 pt-2">
                 Live tracking of raw material ingress and logistics status.
              </p>
          </div>
       </div>
    </div>
  );

  const renderGraphs = () => (
    <div className="space-y-6 animate-fadeIn pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Graph 1: Failure Prediction Accuracy */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 h-[400px] flex flex-col">
               <h3 className="text-xs font-heading font-black text-slate-400 uppercase mb-4 flex items-center gap-2 tracking-[0.2em]">
                  <BarChart size={14} className="text-cyan-500" /> ML Model Evolution (Accuracy)
               </h3>
               <div className="flex-1 min-h-0">
                 <ResponsiveContainer width="100%" height="100%">
                   <ReBarChart data={ACCURACY_DATA} layout="vertical" margin={{ left: 20 }}>
                     <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={true} vertical={false} />
                     <XAxis type="number" domain={[0, 100]} stroke="#64748b" fontSize={10} />
                     <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={10} width={40} />
                     <Tooltip contentStyle={{backgroundColor: '#0f172a', borderColor: '#334155'}} />
                     <Bar dataKey="accuracy" fill="#06b6d4" radius={[0, 4, 4, 0]} barSize={20} name="Accuracy %" isAnimationActive={false} />
                     <Bar dataKey="precision" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} name="Precision %" isAnimationActive={false} />
                     <Legend />
                   </ReBarChart>
                 </ResponsiveContainer>
               </div>
               <p className="text-[10px] text-slate-500 mt-2 italic border-t border-slate-800/50 pt-2">
                  Performance metrics of the current predictive maintenance model versions vs legacy baselines.
               </p>
            </div>
  
            {/* Graph 2: Anomaly Detection Trend */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 h-[400px] flex flex-col">
               <h3 className="text-xs font-heading font-black text-slate-400 uppercase mb-4 flex items-center gap-2 tracking-[0.2em]">
                  <Activity size={14} className="text-red-500" /> UEBA Anomaly Detection
               </h3>
               <div className="flex-1 min-h-0">
                 <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={anomalyData}>
                     <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                     <XAxis dataKey="time" stroke="#64748b" fontSize={10} tick={false} />
                     <YAxis domain={[0, 100]} stroke="#64748b" fontSize={10} />
                     <Tooltip contentStyle={{backgroundColor: '#0f172a', borderColor: '#334155'}} />
                     <ReferenceLine y={75} label="Risk Threshold" stroke="#ef4444" strokeDasharray="3 3" />
                     <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} dot={false} isAnimationActive={false} />
                   </LineChart>
                 </ResponsiveContainer>
               </div>
               <p className="text-[10px] text-slate-500 mt-2 italic border-t border-slate-800/50 pt-2">
                  Unsupervised learning detection of outliers in agent behavior and sensor streams.
               </p>
            </div>
        </div>
  
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           {/* Graph 3: Service Demand Forecast (Heatmap) */}
           <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-xl p-6 flex flex-col h-[350px]">
              <h3 className="text-xs font-heading font-black text-slate-400 uppercase mb-4 flex items-center gap-2 tracking-[0.2em]">
                 <Calendar size={14} className="text-purple-500" /> Service Demand Forecast
              </h3>
              <div className="flex flex-1">
                 {/* Y Axis Labels (Days) */}
                 <div className="flex flex-col justify-between pr-4 py-2 h-full">
                    {DAYS.map(day => (
                       <span key={day} className="text-[10px] font-bold text-slate-500 uppercase">{day}</span>
                    ))}
                 </div>
                 
                 {/* Heatmap Grid */}
                 <div className="flex-1 grid grid-cols-12 gap-1 h-full">
                    {SERVICE_HEATMAP_DATA.map((slot, i) => (
                       <div 
                          key={i}
                          className="rounded-sm transition-all hover:scale-110 hover:z-10 relative group"
                          style={{
                             backgroundColor: slot.demand > 80 ? '#ef4444' : slot.demand > 50 ? '#eab308' : slot.demand > 20 ? '#22c55e' : '#1e293b',
                             opacity: 0.4 + (slot.demand / 150)
                          }}
                       >
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-slate-900 text-white text-[9px] px-2 py-1 rounded border border-slate-700 whitespace-nowrap z-20">
                             {slot.demand}% Load
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
              {/* X Axis Labels (Hours) */}
              <div className="flex pl-12 pt-2 justify-between">
                 {['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'].map(t => (
                    <span key={t} className="text-[9px] font-mono text-slate-600">{t}</span>
                 ))}
              </div>
              <p className="text-[10px] text-slate-500 mt-2 italic border-t border-slate-800/50 pt-2">
                 Predicted service center load based on vehicle telemetry trends for the next 7 days.
              </p>
           </div>

           {/* Graph 4: Failure Distribution */}
           <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 flex flex-col h-[350px]">
               <h3 className="text-xs font-heading font-black text-slate-400 uppercase mb-4 flex items-center gap-2 tracking-[0.2em]">
                 <Crosshair size={14} className="text-orange-500" /> Failure Root Cause
              </h3>
              <div className="flex-1 min-h-0 relative">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                       <Pie
                          data={FAILURE_DATA}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                          isAnimationActive={false}
                       >
                          {FAILURE_DATA.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                       </Pie>
                       <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} />
                    </PieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                       <div className="text-2xl font-bold text-white">452</div>
                       <div className="text-[9px] text-slate-500 uppercase">Incidents</div>
                    </div>
                 </div>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                 {FAILURE_DATA.map((item, i) => (
                    <div key={i} className="flex items-center gap-1">
                       <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                       <span className="text-[9px] text-slate-400 uppercase font-bold">{item.name}</span>
                    </div>
                 ))}
              </div>
              <p className="text-[10px] text-slate-500 mt-2 italic border-t border-slate-800/50 pt-2 text-center">
                 Categorization of identified vehicle faults by subsystem.
              </p>
           </div>
        </div>
    </div>
  );

  // --- Main Render ---
  return (
    <div className="min-h-full bg-[#02040a] text-slate-300 p-6 font-sans overflow-hidden flex flex-col h-full relative" onMouseMove={handleMouseMove}>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.2)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Hover Popup for Agents */}
      {hoveredAgent && (
         <div 
            className="fixed z-50 pointer-events-none bg-slate-900/95 border border-cyan-500/30 rounded-lg p-3 shadow-2xl backdrop-blur-md animate-fadeIn w-48"
            style={{ left: mousePos.x + 15, top: mousePos.y + 15 }}
         >
            <div className="flex justify-between items-start mb-1">
               <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">{hoveredAgent.id}</span>
               <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            </div>
            <div className="text-white font-black font-heading text-sm mb-2">{hoveredAgent.name}</div>
            <div className="space-y-1 text-xs">
               <div className="flex justify-between"><span className="text-slate-500">Role:</span> <span className="text-cyan-400 font-bold">{hoveredAgent.role}</span></div>
               <div className="flex justify-between"><span className="text-slate-500">Task:</span> <span className="text-slate-200 truncate max-w-[100px]">{hoveredAgent.task}</span></div>
               <div className="flex justify-between"><span className="text-slate-500">Load:</span> <span className="text-yellow-400 font-mono">{hoveredAgent.load}%</span></div>
            </div>
         </div>
      )}
      
      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 mb-8 border-b border-slate-800 pb-1 z-20 overflow-x-auto">
        {(['DASHBOARD', 'SECURITY', 'MFG', 'KNOWLEDGE', 'GRAPHS'] as TabView[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              px-6 py-3 text-xs font-bold tracking-widest uppercase transition-all border-b-2 font-mono
              ${activeTab === tab 
                ? 'border-cyan-500 text-white bg-slate-900/50' 
                : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-900/30'}
            `}
          >
            {tab === 'MFG' ? 'MANUFACTURING' : 
             tab === 'SECURITY' ? 'UEBA SECURITY' : 
             tab === 'GRAPHS' ? 'PREDICTIVE ANALYTICS' : tab}
          </button>
        ))}
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10 pr-2">
         {activeTab === 'DASHBOARD' && renderDashboard()}
         {activeTab === 'SECURITY' && renderSecurity()}
         {activeTab === 'MFG' && renderManufacturing()}
         {activeTab === 'GRAPHS' && renderGraphs()}
         {activeTab === 'KNOWLEDGE' && renderKnowledge()}
      </div>
    </div>
  );
};

export default SecureChannel;