export enum ViewState {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  ARENA = 'ARENA',
  AGENT_DETAIL = 'AGENT_DETAIL',
  ANALYTICS = 'ANALYTICS',
  USERS = 'USERS',
  SETTINGS = 'SETTINGS',
  SECURE_CHANNEL = 'SECURE_CHANNEL'
}

export type AgentStatus = 'good' | 'neutral' | 'bad' | 'repair' | 'fatigued';

export interface Agent {
  id: string;
  name: string;
  status: AgentStatus;
  role: string;
  tier: string;
  operability: string; // Operability Category
  uniqueTrait: string;
  responsibilities: string[]; 
  efficiency: number;
  tasksCompleted: number;
  currentTask: string;
  networkLoad: number; // Mbps
  battery: number; // Percentage
  location: { x: number; y: number; label: string };
  logs: LogEntry[];
}

export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  severity: 'info' | 'warning' | 'error' | 'success';
}

export interface Metric {
  label: string;
  value: string | number;
  trend: number; // positive is up, negative is down
  unit?: string;
}

export interface SystemHealth {
  overallScore: number;
  activeVehicles: number;
  totalAgents: number;
  successRate: number;
}

// --- New Types ---

export interface RepairRecord {
  id: string;
  vehicleModel: string;
  vin: string;
  owner: string;
  status: 'Completed' | 'In Progress' | 'Pending Parts';
  obdCode: string;
  issueDescription: string;
  dateIn: string;
  cost: string;
  technician: string;
}

export interface User {
  id: string;
  name: string;
  role: string;
  accessLevel: 'L1' | 'L2' | 'L3' | 'ADMIN';
  email: string;
  status: 'Active' | 'Offline' | 'On Leave';
  department: string;
  lastActive: string;
}

export interface AppointmentRequest {
  id: string;
  customerName: string;
  vehicleModel: string;
  requestDate: string;
  issue: string;
  uptime: string; // Time since last visit or "New Customer"
  partsNeeded: string;
  priority: 'High' | 'Medium' | 'Low';
}