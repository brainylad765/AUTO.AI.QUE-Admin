import React, { useState } from 'react';
import { ViewState } from '../types';
import { Lock, Mail, ArrowRight, CheckCircle2, Globe } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
         onLogin();
      }, 800);
    }, 1500);
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-slate-900">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-black" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px]" />
      </div>

      {/* Central Glass Card */}
      <div className={`
        relative z-10 w-full max-w-[440px] p-10 rounded-2xl 
        border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] 
        backdrop-blur-2xl bg-white/5
        transition-all duration-700
        ${isSuccess ? 'scale-105 opacity-0' : 'scale-100 opacity-100'}
      `}>
        {/* Header */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-14 h-14 bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/20 flex items-center justify-center shadow-inner mb-6">
             <Globe className="text-cyan-400" size={28} />
          </div>
          <h1 className="text-3xl font-heading font-bold text-white tracking-tight mb-2">AUTO.AI.QUE</h1>
          <p className="text-sm text-slate-400 font-sans font-light tracking-wide">Enterprise Command Portal</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[11px] uppercase font-bold text-slate-400 tracking-wider ml-1">Corporate Identity</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-700/50 text-white rounded-lg py-3.5 pl-12 pr-4 focus:outline-none focus:border-cyan-500/50 focus:bg-slate-900/80 transition-all text-sm font-sans placeholder-slate-600"
                placeholder="employee@auto-ai.que"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] uppercase font-bold text-slate-400 tracking-wider ml-1">Secure Passkey</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-700/50 text-white rounded-lg py-3.5 pl-12 pr-4 focus:outline-none focus:border-cyan-500/50 focus:bg-slate-900/80 transition-all text-sm font-sans placeholder-slate-600"
                placeholder="••••••••••••"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
             <label className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors select-none">
               <div className="relative flex items-center">
                 <input type="checkbox" className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-slate-600 bg-slate-800/50 checked:border-cyan-500 checked:bg-cyan-500 transition-all" />
                 <CheckCircle2 size={10} className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100" />
               </div>
               Trusted Device
             </label>
             <button type="button" className="hover:text-cyan-400 transition-colors">Reset Credentials</button>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className={`
              w-full py-4 rounded-xl font-heading font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-3
              transition-all duration-300 mt-4
              ${isLoading ? 'bg-slate-800 text-slate-400 cursor-wait' : 'bg-white text-slate-900 hover:bg-cyan-50 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-[1.01]'}
            `}
          >
            {isLoading ? (
               <span className="animate-pulse">Verifying Encryption...</span>
            ) : (
               <>Authenticate <ArrowRight size={18} /></>
            )}
          </button>
        </form>
        
        <div className="mt-10 flex items-center justify-center gap-2 text-[10px] text-slate-600 uppercase tracking-widest font-bold">
           <Lock size={10} /> 256-Bit AES Encrypted Connection
        </div>
      </div>
      
      {/* Success Overlay Animation */}
      {isSuccess && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md animate-fadeIn">
           <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
              <CheckCircle2 size={40} className="text-green-500" />
           </div>
           <h2 className="text-3xl font-heading font-bold text-white tracking-widest">ACCESS GRANTED</h2>
           <p className="text-slate-300 mt-2 font-sans">Redirecting to Secure Channel...</p>
        </div>
      )}
    </div>
  );
};

export default Login;