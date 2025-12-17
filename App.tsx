import React, { useState } from 'react';
import { ViewState, Agent } from './types';
import { SYSTEM_HEALTH, PERFORMANCE_DATA, RECENT_ALERTS, MOCK_AGENTS } from './constants';
import ParticleBackground from './components/ParticleBackground';
import Header from './components/Header';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Arena from './components/Arena';
import AnalyticsView from './components/AnalyticsView';
import UserManagementView from './components/UserManagementView';
import RequestsPanel from './components/RequestsPanel';
import SecureChannel from './components/SecureChannel';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.LOGIN);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [isRequestsPanelOpen, setIsRequestsPanelOpen] = useState(false);

  const handleLogin = () => {
    setView(ViewState.DASHBOARD);
  };

  const handleAgentSelect = (id: string) => {
    setSelectedAgentId(id);
  };

  const handleCloseAgentDetail = () => {
    setSelectedAgentId(null);
  };

  // Background mode determination
  const backgroundMode = (view === ViewState.ARENA || view === ViewState.AGENT_DETAIL || view === ViewState.SECURE_CHANNEL) ? 'arena' : 'subtle';

  return (
    <div className="h-screen w-full relative overflow-hidden font-sans text-slate-800 flex flex-col">
      {/* Global Background */}
      <ParticleBackground mode={backgroundMode} />

      {/* Slide-out Requests Panel */}
      <RequestsPanel isOpen={isRequestsPanelOpen} onClose={() => setIsRequestsPanelOpen(false)} />

      {view === ViewState.LOGIN ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Header 
            view={view} 
            onChangeView={(newView) => {
               setView(newView);
               setSelectedAgentId(null); 
            }}
            onToggleRequests={() => setIsRequestsPanelOpen(!isRequestsPanelOpen)}
          />
          
          <main className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth custom-scrollbar">
            {view === ViewState.DASHBOARD && (
              <Dashboard 
                health={SYSTEM_HEALTH} 
                performanceData={PERFORMANCE_DATA}
                recentAlerts={RECENT_ALERTS}
                agents={MOCK_AGENTS}
              />
            )}
            
            {(view === ViewState.ARENA || view === ViewState.AGENT_DETAIL) && (
              <Arena 
                agents={MOCK_AGENTS} 
                onSelectAgent={handleAgentSelect} 
                selectedAgentId={selectedAgentId}
                onCloseDetail={handleCloseAgentDetail}
                onEnterSecureChannel={() => setView(ViewState.SECURE_CHANNEL)}
              />
            )}
            
            {view === ViewState.SECURE_CHANNEL && <SecureChannel />}

            {view === ViewState.ANALYTICS && <AnalyticsView />}
            
            {view === ViewState.USERS && <UserManagementView />}
          </main>
        </>
      )}
    </div>
  );
};

export default App;