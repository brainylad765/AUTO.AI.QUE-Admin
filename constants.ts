import { Agent, SystemHealth, LogEntry, RepairRecord, User, AppointmentRequest } from './types';

export const SYSTEM_HEALTH: SystemHealth = {
  overallScore: 99.7,
  activeVehicles: 842,
  totalAgents: 10,
  successRate: 98.4
};

export const MOCK_AGENTS: Agent[] = [
  // TIER 1: CORE ORCHESTRATION
  {
    id: 'AGT-001',
    name: 'NEXUS PRIME',
    role: 'Master Orchestrator',
    tier: 'CORE ORCHESTRATION',
    operability: 'Executive Leadership',
    uniqueTrait: 'Strategic decision/conflict resolution',
    responsibilities: [
      'Oversees all 7-phase workflow progression',
      'Makes critical go/no-go decisions based on swarm consensus',
      'Maintains system-wide state management',
      'Handles cross-agent conflict resolution',
      'Initiates and terminates customer interactions'
    ],
    status: 'good',
    efficiency: 99.9,
    tasksCompleted: 45021,
    currentTask: 'System-wide consensus verification',
    networkLoad: 850,
    battery: 100,
    location: { x: 50, y: 10, label: 'HQ Core' },
    logs: []
  },
  {
    id: 'AGT-002',
    name: 'COLLECTIVE SYNAPSE',
    role: 'Swarm Coordinator',
    tier: 'CORE ORCHESTRATION',
    operability: 'Network Operations',
    uniqueTrait: 'Neural Network Communication Hub',
    responsibilities: [
      'Manages real-time agent-to-agent communication',
      'Implements swarm consensus voting mechanisms',
      'Load balances tasks across agent instances',
      'Handles agent failover and recovery protocols',
      'Maintains communication health monitoring'
    ],
    status: 'good',
    efficiency: 98.5,
    tasksCompleted: 32100,
    currentTask: 'Routing telemetry packets',
    networkLoad: 920,
    battery: 98,
    location: { x: 50, y: 20, label: 'Net Hub' },
    logs: []
  },
  // TIER 2: INTELLIGENCE LAYER
  {
    id: 'AGT-003',
    name: 'TELEMATIC VISIONARY',
    role: 'Data Analysis Agent',
    tier: 'INTELLIGENCE LAYER',
    operability: 'Data Science & Analytics',
    uniqueTrait: 'Real-time Sensory Intelligence',
    responsibilities: [
      'Processes 100Hz telematics streams from vehicles',
      'Detects anomalies and pattern deviations',
      'Extracts features for predictive modeling',
      'Maintains historical trend analysis',
      'Validates sensor data integrity'
    ],
    status: 'neutral',
    efficiency: 94.2,
    tasksCompleted: 12500,
    currentTask: 'Ingesting V-129 sensor stream',
    networkLoad: 600,
    battery: 85,
    location: { x: 20, y: 40, label: 'Data Lake' },
    logs: []
  },
  {
    id: 'AGT-004',
    name: 'DIAGNOSTIC PROPHET',
    role: 'Diagnosis Agent',
    tier: 'INTELLIGENCE LAYER',
    operability: 'Machine Learning Engineering',
    uniqueTrait: 'Predictive Failure Intelligence',
    responsibilities: [
      'Runs ensemble ML models (XGBoost, LSTM, GNN)',
      'Calculates failure probabilities and timeframes',
      'Assigns severity levels (Critical/High/Medium/Low)',
      'Correlates symptoms with known failure patterns',
      'Provides confidence scores for predictions'
    ],
    status: 'good',
    efficiency: 97.8,
    tasksCompleted: 8900,
    currentTask: 'Risk assessment: Brake Pad',
    networkLoad: 450,
    battery: 92,
    location: { x: 50, y: 40, label: 'Compute Node' },
    logs: []
  },
  {
    id: 'AGT-005',
    name: 'BATCH CORRELATOR',
    role: 'Manufacturing Intelligence',
    tier: 'INTELLIGENCE LAYER',
    operability: 'Quality Assurance',
    uniqueTrait: 'Cross-system defect pattern analysis',
    responsibilities: [
      'Links field failures to production batches',
      'Performs Root Cause Analysis (RCA)',
      'Identifies recurring defect patterns',
      'Generates Corrective Action/Preventive Action (CAPA)',
      'Provides manufacturing feedback for quality improvement'
    ],
    status: 'fatigued',
    efficiency: 78.4,
    tasksCompleted: 15400,
    currentTask: 'Correlating Batch XR-234',
    networkLoad: 300,
    battery: 45,
    location: { x: 80, y: 40, label: 'Factory Link' },
    logs: []
  },
  {
    id: 'AGT-006',
    name: 'OPTIMAL ECONOM',
    role: 'Cost Optimization',
    tier: 'INTELLIGENCE LAYER',
    operability: 'Financial Analytics',
    uniqueTrait: 'Financial Intelligence Processor',
    responsibilities: [
      'Calculates repair vs. replace economics',
      'Optimizes warranty utilization',
      'Forecasts long-term ownership costs',
      'Provides insurance and financing recommendations',
      'Generates ROI analysis for preventive actions'
    ],
    status: 'good',
    efficiency: 96.1,
    tasksCompleted: 5600,
    currentTask: 'Warranty allocation calc',
    networkLoad: 200,
    battery: 95,
    location: { x: 50, y: 60, label: 'Finance Grid' },
    logs: []
  },
  // TIER 3: CUSTOMER OPERATIONS
  {
    id: 'AGT-007',
    name: 'VOICE AMBASSADOR',
    role: 'Customer Engagement',
    tier: 'CUSTOMER OPERATIONS',
    operability: 'Customer Experience',
    uniqueTrait: 'Emotional Intelligence Interface',
    responsibilities: [
      'Conducts voice-based persuasive conversations',
      'Adapts communication style based on sentiment analysis',
      'Handles customer objections and queries',
      'Explains technical issues in customer-friendly language',
      'Manages appointment confirmation flows'
    ],
    status: 'good',
    efficiency: 99.2,
    tasksCompleted: 4200,
    currentTask: 'Active call: Rajesh Kumar',
    networkLoad: 150,
    battery: 88,
    location: { x: 30, y: 70, label: 'Comm Relay' },
    logs: []
  },
  {
    id: 'AGT-008',
    name: 'LOGISTIC CONDUCTOR',
    role: 'Scheduling Agent',
    tier: 'CUSTOMER OPERATIONS',
    operability: 'Logistics & Operations',
    uniqueTrait: 'Operational Efficiency Optimizer',
    responsibilities: [
      'Manages service center capacity planning',
      'Optimizes appointment slot allocation',
      'Coordinates parts inventory and technician allocation',
      'Handles multi-location scheduling for fleets',
      'Provides real-time availability updates'
    ],
    status: 'repair',
    efficiency: 65.0,
    tasksCompleted: 21000,
    currentTask: 'Re-indexing route mesh',
    networkLoad: 50,
    battery: 20,
    location: { x: 30, y: 80, label: 'Grid Ops' },
    logs: []
  },
  {
    id: 'AGT-009',
    name: 'LOYALTY ECHO',
    role: 'Feedback Agent',
    tier: 'CUSTOMER OPERATIONS',
    operability: 'Customer Success',
    uniqueTrait: 'Relationship Intelligence System',
    responsibilities: [
      'Conducts post-service satisfaction surveys',
      'Tracks customer sentiment and loyalty metrics',
      'Identifies churn risk factors',
      'Generates retention strategy recommendations',
      'Updates customer profiles and preferences'
    ],
    status: 'neutral',
    efficiency: 91.5,
    tasksCompleted: 3100,
    currentTask: 'Sentiment analysis waiting',
    networkLoad: 100,
    battery: 75,
    location: { x: 30, y: 90, label: 'Retention DB' },
    logs: []
  },
  // TIER 4: SECURITY
  {
    id: 'AGT-010',
    name: 'SENTINEL VIGIL',
    role: 'UEBA Security',
    tier: 'SECURITY & COMPLIANCE',
    operability: 'Cybersecurity',
    uniqueTrait: 'Autonomous Security Intelligence',
    responsibilities: [
      'Establishes behavioral baselines for all agents',
      'Detects anomalous agent activities in real-time',
      'Prevents unauthorized access and data breaches',
      'Enforces compliance with security policies',
      'Generates audit trails and security reports'
    ],
    status: 'bad',
    efficiency: 45.2,
    tasksCompleted: 99999,
    currentTask: 'Investigating unauthorized access',
    networkLoad: 980,
    battery: 99,
    location: { x: 80, y: 80, label: 'Firewall' },
    logs: []
  },
];

export const RECENT_ALERTS: LogEntry[] = [
  { id: 'al-1', timestamp: '10:48 AM', message: 'SENTINEL VIGIL detected anomaly in sector 7', severity: 'error' },
  { id: 'al-2', timestamp: '10:45 AM', message: 'BATCH CORRELATOR identified yield variance in Batch XR-234', severity: 'warning' },
  { id: 'al-3', timestamp: '10:30 AM', message: 'VOICE AMBASSADOR initiated protocol for dissatisfied customer', severity: 'info' },
  { id: 'al-4', timestamp: '10:15 AM', message: 'LOGISTIC CONDUCTOR requires maintenance cycle', severity: 'warning' },
];

export const PERFORMANCE_DATA = [
  { time: '00:00', value: 88 },
  { time: '04:00', value: 92 },
  { time: '08:00', value: 96 },
  { time: '12:00', value: 95 },
  { time: '16:00', value: 99 },
  { time: '20:00', value: 94 },
  { time: '23:59', value: 97 },
];

export const MOCK_REPAIRS: RepairRecord[] = [
  { id: 'R-2023-001', vehicleModel: 'XUV700 AX7 L', vin: 'MA1YT2...9821', owner: 'Rahul Mehta', status: 'Completed', obdCode: 'U0100', issueDescription: 'Adrenox Display Silver Box connectivity loss', dateIn: '2023-10-12', cost: '₹22,000', technician: 'S. Patil' },
  { id: 'R-2023-002', vehicleModel: 'Scorpio-N Z8L 4xplor', vin: 'MA1SN4...1120', owner: 'Vikram Singh', status: 'In Progress', obdCode: 'P2002', issueDescription: 'DPF (Diesel Particulate Filter) Efficiency Below Threshold', dateIn: '2023-10-15', cost: '₹4,500', technician: 'A. Khan' },
  { id: 'R-2023-003', vehicleModel: 'Thar ROXX 5-Door', vin: 'MA1TR5...4432', owner: 'Priya Sharma', status: 'Completed', obdCode: 'C1234', issueDescription: 'Rear differential locker sensor intermittent signal', dateIn: '2023-10-18', cost: '₹1,200', technician: 'R. DeSousa' },
  { id: 'R-2023-004', vehicleModel: 'XUV 3XO AX5', vin: 'MA1X3X...9901', owner: 'Ankit Verma', status: 'Pending Parts', obdCode: 'P0303', issueDescription: 'Cylinder 3 Misfire Detected - Coil Pack suspected', dateIn: '2023-10-20', cost: '₹3,800', technician: 'S. Patil' },
  { id: 'R-2023-005', vehicleModel: 'Mahindra BE.6 (Proto)', vin: 'MA1BE6...0002', owner: 'Internal Fleet', status: 'In Progress', obdCode: 'P0A80', issueDescription: 'Battery Management System (BMS) cell imbalance row 4', dateIn: '2023-10-21', cost: 'N/A', technician: 'Dr. E. Vance' },
  { id: 'R-2023-006', vehicleModel: 'Scorpio Classic S11', vin: 'MA1SC1...5567', owner: 'Transport Co.', status: 'Completed', obdCode: 'P0087', issueDescription: 'Fuel Rail/System Pressure - Too Low (High Pressure Pump)', dateIn: '2023-10-05', cost: '₹18,500', technician: 'M. Singh' },
  { id: 'R-2023-007', vehicleModel: 'XUV700 MX Diesel', vin: 'MA1X7D...2231', owner: 'Karan Johar', status: 'Completed', obdCode: 'B1000', issueDescription: 'Door handle retraction mechanism failure FL', dateIn: '2023-10-08', cost: '₹6,500', technician: 'J. Doe' },
  { id: 'R-2023-008', vehicleModel: 'XUV400 EV EL Pro', vin: 'MA1X4E...8876', owner: 'Green Cab Svc', status: 'Pending Parts', obdCode: 'P0C17', issueDescription: 'Drive Motor Position Sensor - Calibration not learned', dateIn: '2023-10-22', cost: 'Warranty', technician: 'Dr. E. Vance' },
  { id: 'R-2023-009', vehicleModel: 'Bolero Neo N10', vin: 'MA1BN1...3345', owner: 'Const. Corp', status: 'Completed', obdCode: 'P0401', issueDescription: 'EGR Flow Insufficient Detected', dateIn: '2023-10-11', cost: '₹5,600', technician: 'A. Khan' },
  { id: 'R-2023-010', vehicleModel: 'Thar 4x4 Hard Top', vin: 'MA1TH4...7789', owner: 'Offroad Club', status: 'In Progress', obdCode: 'C0034', issueDescription: 'Right Front Wheel Speed Sensor Circuit', dateIn: '2023-10-23', cost: '₹1,800', technician: 'R. DeSousa' },
  { id: 'R-2023-011', vehicleModel: 'Marazzo M6+', vin: 'MA1MZ6...1112', owner: 'Hotel Grand', status: 'Completed', obdCode: 'P0101', issueDescription: 'Mass Air Flow (MAF) Circuit Range/Performance', dateIn: '2023-10-01', cost: '₹3,200', technician: 'M. Singh' },
  { id: 'R-2023-012', vehicleModel: 'XUV700 AX7 AWD', vin: 'MA1X7A...5599', owner: 'Suresh Raina', status: 'Completed', obdCode: 'U3000', issueDescription: 'ADAS Radar Calibration required after bumper realignment', dateIn: '2023-10-19', cost: '₹4,500', technician: 'S. Patil' },
  { id: 'R-2023-013', vehicleModel: 'Scorpio-N Z4', vin: 'MA1SN4...6678', owner: 'Vivek Oberoi', status: 'Pending Parts', obdCode: 'B123A', issueDescription: 'Sunroof drain blockage leading to headliner moisture', dateIn: '2023-10-21', cost: '₹1,500', technician: 'J. Doe' },
  { id: 'R-2023-014', vehicleModel: 'XUV 3XO AX7 L', vin: 'MA1X3L...4455', owner: 'Neha Dhupia', status: 'In Progress', obdCode: 'P0562', issueDescription: 'System Voltage Low - Alternator output check', dateIn: '2023-10-24', cost: '₹8,900', technician: 'A. Khan' },
  { id: 'R-2023-015', vehicleModel: 'Thar ROXX 5-Door', vin: 'MA1TR5...9988', owner: 'Demo Car', status: 'Completed', obdCode: 'P2563', issueDescription: 'Turbocharger Boost Control Position Sensor Circuit', dateIn: '2023-10-14', cost: 'Warranty', technician: 'S. Patil' },
];

export const MOCK_USERS: User[] = [
  { id: 'USR-001', name: 'Admin Controller', role: 'System Admin', accessLevel: 'ADMIN', email: 'root@auto-ai.que', status: 'Active', department: 'Operations', lastActive: 'Now' },
  { id: 'USR-002', name: 'Dr. E. Vance', role: 'Lead EV Specialist', accessLevel: 'L3', email: 'vance.e@auto-ai.que', status: 'Active', department: 'R&D', lastActive: '10 min ago' },
  { id: 'USR-003', name: 'Sarah Connor', role: 'Fleet Manager', accessLevel: 'L2', email: 's.connor@auto-ai.que', status: 'Offline', department: 'Logistics', lastActive: '2 hours ago' },
  { id: 'USR-004', name: 'A. Khan', role: 'Senior Technician', accessLevel: 'L2', email: 'khan.a@auto-ai.que', status: 'Active', department: 'Service', lastActive: '5 min ago' },
  { id: 'USR-005', name: 'S. Patil', role: 'Diagnostics Expert', accessLevel: 'L2', email: 'patil.s@auto-ai.que', status: 'On Leave', department: 'Service', lastActive: '2 days ago' },
  { id: 'USR-006', name: 'Nexus AI_Bot', role: 'Automated Support', accessLevel: 'L1', email: 'bot.nexus@auto-ai.que', status: 'Active', department: 'IT', lastActive: 'Always' },
];

export const MOCK_REQUESTS: AppointmentRequest[] = [
  { id: 'REQ-101', customerName: 'Ojaswini', vehicleModel: 'XUV700 AX7', requestDate: '2023-10-28', issue: 'Infotainment screen flickering intermittently', uptime: '3 weeks since last visit', partsNeeded: 'Silver Box Module (Verified)', priority: 'Medium' },
  { id: 'REQ-102', customerName: 'Smayra', vehicleModel: 'Thar ROXX', requestDate: '2023-10-29', issue: 'Steering wobble at >80kmph', uptime: 'New Customer', partsNeeded: 'Steering Damper / Alignment Kit', priority: 'High' },
  { id: 'REQ-103', customerName: 'Khevika', vehicleModel: 'Scorpio-N Z8', requestDate: '2023-10-30', issue: 'Scheduled 10k Service + Brake noise', uptime: '6 months since last visit', partsNeeded: 'Oil Filter, Brake Pads (Front)', priority: 'Low' },
  { id: 'REQ-104', customerName: 'Kapish', vehicleModel: 'Mahindra BE.6 Top Model', requestDate: '2023-11-01', issue: 'Firmware Update for Battery Efficiency', uptime: '2 months since last visit', partsNeeded: 'Software Patch v2.1.4', priority: 'High' },
  { id: 'REQ-105', customerName: 'Ashmeet', vehicleModel: 'XUV 3XO', requestDate: '2023-11-02', issue: 'Sunroof not closing fully', uptime: 'New Customer', partsNeeded: 'Sunroof Motor Assembly', priority: 'Medium' },
  { id: 'REQ-106', customerName: 'Deepti', vehicleModel: 'XUV400 EV', requestDate: '2023-11-05', issue: 'Charging speed slower than usual', uptime: '1 year since last visit', partsNeeded: 'OBC (On Board Charger) Diagnostic', priority: 'Medium' },
];
