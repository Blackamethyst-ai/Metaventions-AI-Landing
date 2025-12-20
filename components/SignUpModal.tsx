
import React, { useState, useEffect } from 'react';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [syncing, setSyncing] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setSyncing(true);
      const timer = setTimeout(() => setSyncing(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <div 
      className="fixed inset-0 z-[101] flex items-center justify-center p-6 bg-black/60 backdrop-blur-xl transition-all duration-500"
      role="dialog"
      aria-modal="true"
      aria-labelledby="signup-title"
    >
      <div className="glass-noir-bright w-full max-w-md rounded-sm border border-white/20 p-10 relative overflow-hidden shadow-[0_0_120px_rgba(123,44,255,0.25)] min-h-[500px]">
        <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-[#FF3DF2] via-[#7B2CFF] to-[#18E6FF]"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-6 mono text-white/60 hover:text-white text-2xl transition-colors focus:outline-none click-feedback z-20"
          aria-label="Close modal"
        >
          ×
        </button>

        {syncing ? (
          <div className="flex flex-col h-full items-center justify-center space-y-10 animate-in fade-in duration-500 py-10">
             <div className="h-6 w-3/4 skeleton-shimmer rounded-sm"></div>
             <div className="space-y-6 w-full">
                <div className="h-12 w-full skeleton-shimmer rounded-sm"></div>
                <div className="h-12 w-full skeleton-shimmer rounded-sm"></div>
                <div className="h-12 w-full skeleton-shimmer rounded-sm"></div>
             </div>
             <div className="h-14 w-full skeleton-shimmer rounded-sm mt-4"></div>
             <span className="mono text-[8px] text-white/40 tracking-[0.5em] uppercase">VERIFYING_HANDSHAKE_NODE...</span>
          </div>
        ) : status === 'success' ? (
          <div className="text-center py-10 animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-gradient-to-br from-[#18E6FF] via-[#7B2CFF] to-[#FF3DF2] rounded-full mx-auto flex items-center justify-center mb-8 shadow-lg animate-bounce">
               <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
               </svg>
            </div>
            <h2 className="mono text-xl font-black text-white mb-4 tracking-tighter uppercase">Handshake_Success</h2>
            <p className="mono text-[11px] text-white/80 uppercase tracking-widest leading-relaxed">
              Transmission received. Your entity profile is now queued for partnership evaluation.
            </p>
            <button 
              onClick={onClose}
              className="mt-12 px-8 py-4 bg-white text-black mono text-[10px] font-black tracking-widest uppercase hover:bg-[#18E6FF] transition-colors rounded-sm shadow-xl click-feedback"
            >
              Terminate_Interface
            </button>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="mb-10">
              <h2 id="signup-title" className="mono text-sm font-black tracking-[0.5em] text-white uppercase mb-2">Initialize_Handshake</h2>
              <p className="mono text-[10px] text-[#18E6FF] tracking-widest uppercase font-bold">Protocol: Sovereign_Partnership_Beta</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mono text-[9px] uppercase font-black text-white/80 mb-2 tracking-[0.4em]">Operator_Name</label>
                <input 
                  id="name"
                  required
                  type="text" 
                  placeholder="IDENTIFY_YOURSELF"
                  className="w-full bg-white/10 border border-white/20 rounded-sm px-6 py-4 focus:outline-none focus:border-[#18E6FF] transition-all text-white mono text-[10px] uppercase placeholder:text-white/20 focus:bg-white/15"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mono text-[9px] uppercase font-black text-white/80 mb-2 tracking-[0.4em]">Neural_Route</label>
                <input 
                  id="email"
                  required
                  type="email" 
                  placeholder="EMAIL_CORE_LINK"
                  className="w-full bg-white/10 border border-white/20 rounded-sm px-6 py-4 focus:outline-none focus:border-[#7B2CFF] transition-all text-white mono text-[10px] uppercase placeholder:text-white/20 focus:bg-white/15"
                />
              </div>

              <div>
                <label htmlFor="business" className="block mono text-[9px] uppercase font-black text-white/80 mb-2 tracking-[0.4em]">Business_Architecture</label>
                <input 
                  id="business"
                  required
                  type="text" 
                  placeholder="PARTNERSHIP_ENTITY_NAME"
                  className="w-full bg-white/10 border border-white/20 rounded-sm px-6 py-4 focus:outline-none focus:border-[#FF3DF2] transition-all text-white mono text-[10px] uppercase placeholder:text-white/20 focus:bg-white/15"
                />
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={status === 'sending'}
                  className="group relative w-full py-5 bg-white text-black rounded-sm mono text-[11px] font-black tracking-[0.6em] uppercase hover:bg-[#18E6FF] hover:text-white transition-all flex items-center justify-center shadow-2xl overflow-hidden click-feedback"
                >
                  <span className="relative z-10">
                    {status === 'sending' ? (
                      <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                    ) : 'INITIALIZE_SYNC'}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF3DF2] via-[#7B2CFF] to-[#18E6FF] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                </button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-white/10 text-center">
               <span className="mono text-[8px] text-white/40 tracking-[0.4em] uppercase font-black">Sovereign_Protocol_01 // (C) 2025 Metaventions</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpModal;
