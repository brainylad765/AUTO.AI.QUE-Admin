import React, { useState } from 'react';
import { MOCK_REQUESTS } from '../constants';
import { X, CheckCircle, XCircle, MessageSquare, Calendar, PenTool, Clock, User, AlertTriangle } from 'lucide-react';

interface RequestsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const RequestsPanel: React.FC<RequestsPanelProps> = ({ isOpen, onClose }) => {
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [noteContent, setNoteContent] = useState('');
  const [requests, setRequests] = useState(MOCK_REQUESTS);

  const handleAction = (id: string, action: 'accept' | 'deny' | 'note') => {
    if (action === 'note') {
      setActiveNoteId(activeNoteId === id ? null : id);
    } else {
      // Simulate removal for demo
      setRequests(prev => prev.filter(r => r.id !== id));
      setActiveNoteId(null);
    }
  };

  const submitNoteDenial = (id: string) => {
    console.log(`Denied request ${id} with note: ${noteContent}`);
    setRequests(prev => prev.filter(r => r.id !== id));
    setActiveNoteId(null);
    setNoteContent('');
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Slide-over Panel */}
      <div className={`
        fixed top-0 right-0 h-full w-[450px] bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out border-l border-slate-200
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight">APPOINTMENT REQUESTS</h2>
              <div className="flex gap-2 mt-1">
                 <span className="text-xs font-bold text-slate-500 uppercase">{requests.length} Pending</span>
                 <span className="text-xs font-bold text-blue-500 uppercase">• Auto-Sync Active</span>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
              <X size={20} />
            </button>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
            {requests.length === 0 ? (
               <div className="text-center py-20 text-slate-400">
                  <CheckCircle size={48} className="mx-auto mb-4 opacity-20" />
                  <p>All requests processed.</p>
               </div>
            ) : requests.map((req) => (
              <div key={req.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className={`absolute top-0 left-0 w-1 h-full ${req.priority === 'High' ? 'bg-red-500' : req.priority === 'Medium' ? 'bg-orange-400' : 'bg-blue-400'}`} />
                
                <div className="flex justify-between items-start mb-3 pl-3">
                  <div>
                    <h3 className="font-bold text-slate-800">{req.customerName}</h3>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{req.vehicleModel}</div>
                  </div>
                  <div className="bg-slate-100 px-2 py-1 rounded text-[10px] font-bold text-slate-600 flex items-center gap-1">
                     <Calendar size={10} /> {req.requestDate}
                  </div>
                </div>

                <div className="pl-3 space-y-2 mb-4">
                  <div className="flex items-start gap-2 text-sm text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <AlertTriangle size={14} className="mt-0.5 text-orange-500 shrink-0" />
                    <span className="leading-tight">{req.issue}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                     <div className="flex items-center gap-1.5 text-slate-500">
                        <Clock size={12} /> <span className="font-semibold text-slate-700">{req.uptime}</span>
                     </div>
                     <div className="flex items-center gap-1.5 text-slate-500">
                        <PenTool size={12} /> <span className="font-semibold text-slate-700 truncate" title={req.partsNeeded}>{req.partsNeeded}</span>
                     </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pl-3 pt-3 border-t border-slate-100 flex items-center gap-2">
                   {activeNoteId === req.id ? (
                      <div className="w-full space-y-2 animate-fadeIn">
                         <textarea 
                           className="w-full text-xs p-2 border border-slate-300 rounded focus:border-cyan-500 focus:outline-none"
                           rows={2}
                           placeholder="Reason for denial..."
                           value={noteContent}
                           onChange={(e) => setNoteContent(e.target.value)}
                           autoFocus
                         />
                         <div className="flex gap-2">
                           <button onClick={() => submitNoteDenial(req.id)} className="flex-1 bg-red-500 text-white text-xs font-bold py-1.5 rounded hover:bg-red-600">Confirm Deny</button>
                           <button onClick={() => setActiveNoteId(null)} className="flex-1 bg-slate-200 text-slate-600 text-xs font-bold py-1.5 rounded hover:bg-slate-300">Cancel</button>
                         </div>
                      </div>
                   ) : (
                      <>
                        <button 
                           onClick={() => handleAction(req.id, 'accept')}
                           className="flex-1 flex items-center justify-center gap-1.5 bg-green-500 text-white py-2 rounded-lg text-xs font-bold hover:bg-green-600 transition-colors shadow-sm"
                        >
                           <CheckCircle size={14} /> Accept
                        </button>
                        
                        {/* Deny Dropdown Mock (Implemented as split button logic here for simplicity) */}
                        <div className="flex-1 flex gap-1">
                           <button 
                              onClick={() => handleAction(req.id, 'deny')}
                              className="flex-1 flex items-center justify-center gap-1.5 bg-red-50 text-red-600 border border-red-100 py-2 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors"
                           >
                              <XCircle size={14} /> Deny
                           </button>
                           <button 
                              onClick={() => handleAction(req.id, 'note')}
                              className="w-10 flex items-center justify-center bg-slate-50 text-slate-500 border border-slate-100 rounded-lg hover:bg-slate-100 hover:text-slate-700"
                              title="Deny with Note"
                           >
                              <MessageSquare size={14} />
                           </button>
                        </div>
                      </>
                   )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestsPanel;
