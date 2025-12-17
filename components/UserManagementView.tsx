import React from 'react';
import { 
  Users, UserCheck, Shield, UserX, Search, MoreVertical, 
  Plus, Phone, Mail, Clock, ChevronDown, Activity, Settings
} from 'lucide-react';

const MOCK_USERS_LIST = [
  { id: 1, name: 'Arjun Mehta', role: 'Admin', roleType: 'admin', email: 'arjun.mehta@autoaique.com', phone: '+91 98765 43210', status: 'Active', initials: 'AM', color: 'bg-cyan-600' },
  { id: 2, name: 'Priya Sharma', role: 'Manager', roleType: 'manager', email: 'priya.sharma@autoaique.com', phone: '+91 98765 43211', status: 'Active', initials: 'PS', color: 'bg-blue-600' },
  { id: 3, name: 'Rahul Verma', role: 'Technician', roleType: 'technician', email: 'rahul.verma@autoaique.com', phone: '+91 98765 43212', status: 'Active', initials: 'RV', color: 'bg-slate-600' },
  { id: 4, name: 'Sneha Patel', role: 'Technician', roleType: 'technician', email: 'sneha.patel@autoaique.com', phone: '+91 98765 43213', status: 'Active', initials: 'SP', color: 'bg-slate-600' },
  { id: 5, name: 'Vikram Singh', role: 'Receptionist', roleType: 'receptionist', email: 'vikram.singh@autoaique.com', phone: '+91 98765 43214', status: 'Inactive', initials: 'VS', color: 'bg-orange-500' },
  { id: 6, name: 'Anita Desai', role: 'Technician', roleType: 'technician', email: 'anita.desai@autoaique.com', phone: '+91 98765 43215', status: 'Active', initials: 'AD', color: 'bg-slate-600' },
];

const RECENT_ACTIVITY = [
  { user: 'Arjun Mehta', action: 'Updated system settings', time: '10 min ago' },
  { user: 'Priya Sharma', action: 'Approved service request REQ-005', time: '25 min ago' },
  { user: 'Rahul Verma', action: 'Completed brake service on MH01-AB-1234', time: '1 hour ago' },
  { user: 'Sneha Patel', action: 'Updated inventory stock', time: '2 hours ago' },
  { user: 'Anita Desai', action: 'Generated monthly report', time: '3 hours ago' },
];

const UserManagementView: React.FC = () => {
  return (
    <div className="min-h-full bg-slate-50 p-6 font-sans text-slate-800 animate-fadeIn pb-20">
      
      {/* Page Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
           <h1 className="text-2xl font-heading font-black text-slate-900 tracking-tight">User Management</h1>
           <p className="text-slate-500 text-sm mt-1">Manage team members and their access permissions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg shadow-lg shadow-cyan-500/20 transition-all font-bold text-sm">
           <Plus size={18} /> Add User
        </button>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Users</div>
            <div className="text-3xl font-heading font-bold text-slate-800">6</div>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Users size={20} /></div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Active Now</div>
            <div className="text-3xl font-heading font-bold text-slate-800">5</div>
          </div>
          <div className="p-3 bg-green-50 text-green-600 rounded-lg"><UserCheck size={20} /></div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Admins</div>
            <div className="text-3xl font-heading font-bold text-slate-800">1</div>
          </div>
          <div className="p-3 bg-red-50 text-red-600 rounded-lg"><Shield size={20} /></div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Inactive</div>
            <div className="text-3xl font-heading font-bold text-slate-800">1</div>
          </div>
          <div className="p-3 bg-slate-100 text-slate-500 rounded-lg"><UserX size={20} /></div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search users..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-cyan-500 text-sm text-slate-700 shadow-sm"
          />
        </div>
        <div className="flex gap-4">
           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
              All Roles <ChevronDown size={14} />
           </button>
           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
              All Status <ChevronDown size={14} />
           </button>
        </div>
      </div>

      {/* Main Layout: List & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* User List */}
        <div className="lg:col-span-2 space-y-4">
           {MOCK_USERS_LIST.map((user) => (
             <div key={user.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                   <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm ${user.color}`}>
                         {user.initials}
                      </div>
                      
                      {/* Info */}
                      <div>
                         <div className="flex items-center gap-3">
                            <h3 className="font-bold text-slate-900">{user.name}</h3>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border tracking-wider ${
                               user.roleType === 'admin' ? 'bg-red-50 text-red-600 border-red-100' :
                               user.roleType === 'manager' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                               user.roleType === 'receptionist' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                               'bg-slate-100 text-slate-600 border-slate-200'
                            }`}>
                               {user.role}
                            </span>
                         </div>
                         
                         <div className="flex flex-col sm:flex-row sm:items-center gap-y-1 gap-x-4 mt-1.5 text-sm text-slate-500">
                            <div className="flex items-center gap-1.5">
                               <Mail size={12} className="text-slate-400" /> {user.email}
                            </div>
                            <div className="flex items-center gap-1.5">
                               <Phone size={12} className="text-slate-400" /> {user.phone}
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Right Side Status & Menu */}
                   <div className="flex flex-col items-end gap-3">
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                         user.status === 'Active' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-slate-100 text-slate-500 border-slate-200'
                      }`}>
                         <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-slate-400'}`} />
                         {user.status}
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                         <div className="text-[10px] font-mono">467d ago</div>
                         <button className="hover:text-slate-700 transition-colors"><MoreVertical size={16} /></button>
                      </div>
                   </div>
                </div>
             </div>
           ))}
        </div>

        {/* Recent Activity Sidebar */}
        <div className="lg:col-span-1">
           <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm h-full">
              <div className="flex items-center gap-2 mb-6 text-slate-800">
                 <Activity size={20} className="text-cyan-500" />
                 <h3 className="font-bold text-lg font-heading">Recent Activity</h3>
              </div>
              
              <div className="relative border-l border-slate-200 ml-2 space-y-8">
                 {RECENT_ACTIVITY.map((activity, idx) => (
                    <div key={idx} className="relative pl-6">
                       <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-cyan-500 ring-4 ring-white" />
                       <div className="flex flex-col">
                          <span className="font-bold text-slate-800 text-sm">{activity.user}</span>
                          <span className="text-xs text-slate-500 mt-0.5">{activity.action}</span>
                          <span className="text-[10px] text-slate-400 font-medium mt-1">{activity.time}</span>
                       </div>
                    </div>
                 ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                 <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 uppercase tracking-wider transition-colors">
                    View All Activity
                 </button>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default UserManagementView;