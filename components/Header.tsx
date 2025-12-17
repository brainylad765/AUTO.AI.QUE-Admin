import React from 'react';
import { ViewState } from '../types';
import { LayoutDashboard, Users, FileText, Settings, Search, Bell, LogOut, UserCircle, Inbox } from 'lucide-react';

interface HeaderProps {
  view: ViewState;
  onChangeView: (view: ViewState) => void;
  onToggleRequests: () => void;
  userName?: string;
  requestCount?: number;
}

const Header: React.FC<HeaderProps> = ({ view, onChangeView, onToggleRequests, userName = "Admin User", requestCount = 6 }) => {
  // Update: Only Arena, Agent Detail and Secure Channel are dark. Analytics and Users are now Light.
  const isArena = view === ViewState.ARENA || view === ViewState.AGENT_DETAIL || view === ViewState.SECURE_CHANNEL;
  const isDark = isArena;

  const tabs = [
    { id: ViewState.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: ViewState.ANALYTICS, label: 'Analytics', icon: FileText },
    { id: ViewState.USERS, label: 'User Management', icon: Users },
  ];

  return (
    <header className={`
      w-full h-16 flex items-center justify-between px-6 z-50 transition-all duration-500 border-b flex-shrink-0 font-sans
      ${isDark ? 'bg-slate-900/80 border-cyan-500/30 text-cyan-50 backdrop-blur-md' : 'bg-white/90 border-slate-200 text-slate-800 backdrop-blur-md'}
    `}>
      {/* Left: Logo */}
      <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onChangeView(ViewState.DASHBOARD)}>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-heading font-bold text-xl shadow-sm transition-transform group-hover:scale-105 ${isDark ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-white'}`}>
          A
        </div>
        <div className="flex flex-col">
          <span className={`text-lg font-heading font-bold tracking-tight ${isDark ? 'text-cyan-50' : 'text-slate-900'}`}>AUTO.AI.QUE</span>
          <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-cyan-400/70' : 'text-slate-500'}`}>Command Center</span>
        </div>
      </div>

      {/* Center: Tabs & Arena Button */}
      <div className="flex items-center gap-6">
        <nav className="hidden lg:flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onChangeView(tab.id)}
              className={`
                px-4 py-2 rounded-md text-sm font-sans font-medium tracking-wide transition-all flex items-center gap-2 group relative
                ${!isArena && view === tab.id ? 'text-blue-700 bg-blue-50/50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}
                ${isDark && view === tab.id ? 'text-cyan-400 bg-cyan-950/30 border border-cyan-500/20' : ''}
                ${isDark && view !== tab.id ? 'text-slate-400 hover:text-cyan-100 hover:bg-white/10' : ''}
              `}
            >
              <tab.icon size={16} className={!isArena && view === tab.id ? 'text-blue-600' : isDark && view === tab.id ? 'text-cyan-400' : ''} />
              {tab.label}
              {/* Active Indicator Underline */}
              {!isArena && view === tab.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Enter/Exit Arena Button */}
        <button
          onClick={() => onChangeView(isArena ? ViewState.DASHBOARD : ViewState.ARENA)}
          className={`
            px-5 py-2 rounded-full font-heading font-black text-xs tracking-widest uppercase transition-all duration-300 transform hover:scale-105
            ${isArena
              ? 'border border-red-500/50 text-red-400 hover:bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
              : 'bg-slate-900 text-white shadow-lg hover:shadow-xl hover:bg-slate-800'}
          `}
        >
          {isArena ? 'Exit Arena' : 'Enter Arena'}
        </button>
      </div>

      {/* Right: User & Actions */}
      <div className="flex items-center gap-4">
        <div className="relative group">
           <Search size={20} className={`${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-700'} cursor-pointer transition-colors`} />
        </div>
        <div className="relative group">
           <Bell size={20} className={`${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-700'} cursor-pointer transition-colors`} />
           <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900"></span>
        </div>
        
        <div className={`h-6 w-[1px] mx-2 ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
        
        {/* Requests Button (New) */}
        <button 
          onClick={onToggleRequests}
          className={`
            flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all text-sm font-semibold
            ${isDark ? 'border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10' : 'border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
          `}
        >
          <div className="relative">
            <Inbox size={18} />
            {requestCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold flex items-center justify-center rounded-full shadow-sm">
                {requestCount}
              </span>
            )}
          </div>
          <span className="hidden xl:inline">Requests</span>
        </button>

        <div className={`h-6 w-[1px] mx-2 ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />

        <div className="flex items-center gap-3 cursor-pointer group relative">
           <div className="text-right hidden sm:block">
             <div className={`text-sm font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{userName}</div>
             <div className="text-[10px] uppercase font-bold tracking-wide opacity-60">System Admin</div>
           </div>
           <div className={`rounded-full p-0.5 border-2 ${isDark ? 'border-cyan-500/50' : 'border-slate-200'}`}>
              <UserCircle size={32} className={`${isDark ? 'text-cyan-400' : 'text-slate-700'}`} />
           </div>
           
           {/* Dropdown (Mock) */}
           <div className="absolute top-full right-0 mt-3 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 p-2 hidden group-hover:block z-50 animate-fadeIn">
              <div className="px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg cursor-pointer text-slate-700 dark:text-slate-200">Profile Settings</div>
              <div className="my-1 h-px bg-slate-100 dark:bg-slate-700" />
              <div className="px-4 py-2 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg cursor-pointer text-red-600 flex items-center gap-2" onClick={() => onChangeView(ViewState.LOGIN)}>
                <LogOut size={14} /> Sign Out
              </div>
           </div>
        </div>
      </div>
    </header>
  );
};

export default Header;