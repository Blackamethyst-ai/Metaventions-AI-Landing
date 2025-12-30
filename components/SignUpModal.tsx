
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
      const timer = setTimeout(() => setSyncing(false), 180);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('success'), 1000);
  };

  return (
    <div 
      className="fixed inset-0 z-[101] flex items-center justify-center p-6 bg-black/70 backdrop-blur-xl transition-opacity duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md glass-modal rounded-sm p-10 relative overflow-hidden shadow-2xl min-h-[480px] animate-in zoom-in-95 duration-200 ease-out">
        <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-[#FF3DF2] via-[#7B2CFF] to-[#18E6FF] z-30"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-6 mono text-black/40 dark:text-white/40 hover:text-amethyst text-xl transition-colors click-feedback z-30"
        >
          ×
        </button>

        {/* Sync Layer */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center p-10 transition-opacity duration-300 z-10 ${syncing ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="w-8 h-8 border-2 border-[#18E6FF]/10 border-t-[#18E6FF] rounded-full animate-spin mb-6"></div>
          <div className="space-y-4 w-full opacity-20">
             <div className="h-10 w-full skeleton-shimmer rounded-sm"></div>
             <div className="h-10 w-full skeleton-shimmer rounded-sm"></div>
             <div className="h-10 w-full skeleton-shimmer rounded-sm"></div>
          </div>
        </div>

        {/* Content Layer */}
        <div className={`transition-all duration-300 ${syncing ? 'opacity-0 scale-98 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
          {status === 'success' ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-gradient-to-br from-[#18E6FF] to-[#7B2CFF] rounded-full mx-auto flex items-center justify-center mb-8 shadow-lg">
                 <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                 </svg>
              </div>
              <h2 className="mono text-lg font-black text-black dark:text-white mb-4 tracking-tighter uppercase">Success</h2>
              <button 
                onClick={onClose}
                className="mt-12 px-10 py-3 bg-black dark:bg-white text-white dark:text-black mono text-[9px] font-black tracking-widest uppercase hover:bg-[#18E6FF] transition-colors rounded-sm click-feedback"
              >
                TERMINATE
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-10">
                <h2 className="mono text-xs font-black tracking-[0.5em] text-black dark:text-white uppercase mb-2">Initialize_Sync</h2>
                <p className="mono text-[8px] text-[#18E6FF] tracking-widest uppercase font-bold opacity-60">Authentication Required</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <label className="mono text-[8px] uppercase opacity-40 font-black tracking-[0.2em] ml-1">IDENTITY</label>
                  <input 
                    required
                    type="text" 
                    placeholder="FULL NAME"
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm px-5 py-3.5 focus:outline-none focus:border-[#18E6FF] transition-all text-black dark:text-white mono text-[9px] uppercase placeholder:text-black/40 dark:placeholder:text-white/20"
                  />
                </div>
                <div className="space-y-1">
                  <label className="mono text-[8px] uppercase opacity-40 font-black tracking-[0.2em] ml-1">CONTACT_CHANNEL</label>
                  <input 
                    required
                    type="email" 
                    placeholder="EMAIL ADDRESS"
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm px-5 py-3.5 focus:outline-none focus:border-[#7B2CFF] transition-all text-black dark:text-white mono text-[9px] uppercase placeholder:text-black/40 dark:placeholder:text-white/20"
                  />
                </div>
                <div className="space-y-1">
                  <label className="mono text-[8px] uppercase opacity-40 font-black tracking-[0.2em] ml-1">ORGANIZATION</label>
                  <input 
                    required
                    type="text" 
                    placeholder="ENTITY / COMPANY"
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm px-5 py-3.5 focus:outline-none focus:border-[#FF3DF2] transition-all text-black dark:text-white mono text-[9px] uppercase placeholder:text-black/40 dark:placeholder:text-white/20"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={status === 'sending'}
                  className="w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-sm mono text-[9px] font-black tracking-[0.6em] uppercase hover:bg-amethyst hover:text-white transition-all flex items-center justify-center shadow-2xl click-feedback mt-4"
                >
                  {status === 'sending' ? 'TRANSMITTING...' : 'INITIALIZE'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
