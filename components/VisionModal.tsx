
import React, { useState, useEffect } from 'react';

interface VisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode?: boolean;
}

const VisionModal: React.FC<VisionModalProps> = ({ isOpen, onClose, isDarkMode }) => {
  const [syncing, setSyncing] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setSyncing(true);
      const timer = setTimeout(() => setSyncing(false), 180);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm transition-opacity duration-200">
      <div className="w-full max-w-4xl glass-modal rounded-sm p-16 relative overflow-y-auto max-h-[90vh] shadow-2xl min-h-[500px] animate-in fade-in zoom-in-95 duration-200 ease-out">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#FF3DF2] via-[#7B2CFF] to-[#18E6FF] z-30"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-8 mono text-black/30 dark:text-white/30 hover:text-[#18E6FF] text-2xl transition-colors click-feedback z-30"
        >
          ×
        </button>

        {/* Sync Layer */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center p-16 transition-opacity duration-300 z-10 ${syncing ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="w-8 h-8 border-2 border-black/5 dark:border-white/5 border-t-[#18E6FF] rounded-full animate-spin mb-10"></div>
          <div className="grid grid-cols-2 gap-10 w-full opacity-5">
             <div className="h-40 w-full skeleton-shimmer"></div>
             <div className="h-40 w-full skeleton-shimmer"></div>
          </div>
        </div>

        {/* Content Layer */}
        <div className={`transition-all duration-300 ${syncing ? 'opacity-0 scale-98' : 'opacity-100 scale-100'}`}>
          <div className="mb-14 text-center">
            <span className="mono text-[9px] font-black tracking-[0.6em] text-[#7B2CFF] uppercase block mb-4 opacity-60">PHILOSOPHY</span>
            <h2 className="text-5xl font-black text-black dark:text-white tracking-tighter">Intelligence, Sovereign.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <p className="text-xl text-black dark:text-white font-light leading-relaxed tracking-tight border-l-2 border-[#18E6FF] pl-8">
                The user remains the sovereign core, with AI acting as the weaver of intent.
              </p>
              <p className="text-sm text-black dark:text-white/60 font-medium italic">
                Architecting sovereign operating systems that synthesize data streams into human intent.
              </p>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-black/10 dark:bg-white/5 rounded-sm border border-black/5 dark:border-white/5">
                <h3 className="mono text-[9px] font-black tracking-widest text-[#7B2CFF] uppercase mb-2">Agency</h3>
                <p className="text-black/70 dark:text-white/50 text-xs leading-relaxed">
                  Systems empower, not replace. Every workflow is transparent and modular.
                </p>
              </div>
              <div className="p-6 bg-black/10 dark:bg-white/5 rounded-sm border border-black/5 dark:border-white/5">
                <h3 className="mono text-[9px] font-black tracking-widest text-[#18E6FF] uppercase mb-2">Sovereignty</h3>
                <p className="text-black/70 dark:text-white/50 text-xs leading-relaxed">
                  Your data, your logic. We utilize sovereign stacks to protect your intelligence.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-14 pt-8 border-t border-black/10 dark:border-white/10 flex justify-between items-center mono text-[8px] text-black/40 dark:text-white/40 tracking-[0.4em] uppercase">
            <span>MV_AI // 2025</span>
            <span>MANHATTAN</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionModal;
