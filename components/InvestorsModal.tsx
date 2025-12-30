
import React, { useState, useEffect } from 'react';

interface InvestorsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode?: boolean;
}

const InvestorsModal: React.FC<InvestorsModalProps> = ({ isOpen, onClose, isDarkMode }) => {
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
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/70 backdrop-blur-md transition-opacity duration-200">
      <div className="w-full max-w-4xl glass-gold rounded-sm p-16 relative overflow-y-auto max-h-[90vh] shadow-[0_0_120px_rgba(215,178,109,0.4)] min-h-[580px] animate-in zoom-in-95 duration-200 ease-out">
        <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-[#D7B26D] via-[#F9D976] to-[#B38728] z-30"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-8 mono text-gold hover:text-white text-3xl transition-colors click-feedback z-30"
          aria-label="Close Investors Portal"
        >
          ×
        </button>

        {/* Sync Layer */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center p-16 transition-opacity duration-300 z-10 ${syncing ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="w-10 h-10 border-4 border-gold/10 border-t-gold rounded-full animate-spin mb-10"></div>
          <div className="grid grid-cols-2 gap-10 w-full opacity-10">
             <div className="h-64 w-full skeleton-shimmer rounded-sm"></div>
             <div className="h-64 w-full skeleton-shimmer rounded-sm"></div>
          </div>
        </div>

        {/* Content Layer */}
        <div className={`transition-all duration-300 ${syncing ? 'opacity-0 scale-98' : 'opacity-100 scale-100'}`}>
          <div className="mb-16 text-center">
            <span className="mono text-xs font-black tracking-[1em] text-gold uppercase block mb-6">SYNERGY</span>
            <h2 className="text-6xl font-black text-black dark:text-white tracking-tighter leading-none">
              Sovereign <span className="gold-spectrum italic">Intelligence.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
            <div className="space-y-10">
              <p className="text-3xl text-black dark:text-white font-bold leading-tight tracking-tighter border-l-4 border-gold pl-10">
                Building the infrastructure <br />of the <span className="text-gold">Agentic Age.</span>
              </p>
            </div>

            <div className="space-y-10">
              <div className="group">
                <h3 className="mono text-sm font-black tracking-[0.3em] text-gold uppercase mb-4">Moat</h3>
                <p className="text-black dark:text-white text-lg leading-relaxed font-medium">
                  Proprietary OS architectures and high-fidelity frameworks designed for sovereign control.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-black/40 dark:bg-white/5 border-2 border-gold/30 p-12 text-center rounded-sm backdrop-blur-2xl shadow-2xl">
            <h3 className="mono text-[10px] font-black tracking-[0.5em] text-gold uppercase mb-6">DIRECT_INQUIRY</h3>
            <p className="text-3xl font-black text-white dark:text-white mb-10 tracking-tighter">
              Dicoangelo@metaventions.com
            </p>
            <a 
              href="mailto:Dicoangelo@metaventions.com"
              className="px-14 py-5 bg-gold text-black font-black rounded-sm transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(215,178,109,0.5)] shadow-xl mono text-[11px] tracking-[0.6em] inline-block uppercase click-feedback"
            >
              INITIALIZE_PARTNERSHIP
            </a>
          </div>
          
          <div className="mt-12 text-center opacity-40">
            <span className="mono text-[9px] text-gold tracking-[0.4em] uppercase">Private Tier // SECURED_CHANNEL_01</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorsModal;
