
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
      const timer = setTimeout(() => setSyncing(false), 1300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/50 backdrop-blur-md transition-all duration-500">
      <div className="w-full max-w-4xl glass-gold rounded-sm p-16 relative overflow-y-auto max-h-[90vh] shadow-[0_0_100px_rgba(215,178,109,0.2)] min-h-[600px]">
        <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-[#D7B26D] via-[#F9D976] to-[#B38728]"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-8 mono text-gold hover:text-white text-3xl transition-colors focus:outline-none click-feedback z-20"
        >
          ×
        </button>

        {syncing ? (
          <div className="animate-in fade-in duration-1000 py-10 space-y-16">
            <div className="text-center space-y-6">
              <div className="h-4 w-48 mx-auto skeleton-shimmer opacity-40 rounded-sm"></div>
              <div className="h-20 w-full mx-auto skeleton-shimmer opacity-40 rounded-sm"></div>
            </div>
            <div className="grid grid-cols-2 gap-16">
               <div className="h-64 w-full skeleton-shimmer opacity-30 rounded-sm"></div>
               <div className="space-y-10">
                  <div className="h-20 w-full skeleton-shimmer opacity-30 rounded-sm"></div>
                  <div className="h-20 w-full skeleton-shimmer opacity-30 rounded-sm"></div>
               </div>
            </div>
            <div className="h-40 w-full skeleton-shimmer opacity-30 rounded-sm"></div>
            <div className="text-center">
               <span className="mono text-[8px] text-gold/40 tracking-[0.5em] uppercase">VERIFYING_CAPITAL_PROTOCOL...</span>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="mb-16 text-center">
              <span className="mono text-[10px] font-black tracking-[0.8em] text-gold uppercase block mb-6 animate-pulse">CAPITAL_SYNERGY</span>
              <h2 className="text-6xl font-black text-black dark:text-white mb-8 tracking-tighter leading-none transition-colors duration-500">
                Investing in <span className="gold-spectrum italic">Sovereign Intelligence.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
              <div className="space-y-10">
                <p className="text-2xl text-black dark:text-white font-light leading-relaxed tracking-tight border-l-4 border-gold pl-8 transition-colors duration-500">
                  Metaventions AI is building the infrastructure of the Agentic Age. We invite visionary capital to join us in architecting a future centered on human sovereignty.
                </p>
                <div className="p-8 bg-gold/5 border border-gold/10 rounded-sm">
                   <p className="text-lg text-black dark:text-white/80 font-medium italic transition-colors duration-500">
                     "Wealth is the byproduct of architected foresight."
                   </p>
                </div>
              </div>

              <div className="flex flex-col justify-center space-y-12">
                <div className="group">
                  <h3 className="mono text-xs font-black tracking-widest text-gold uppercase mb-4">Strategic Moat</h3>
                  <p className="text-black dark:text-white/70 font-light transition-colors duration-500">
                    Proprietary sovereign OS architectures and high-fidelity agentic frameworks with established enterprise roadmaps.
                  </p>
                </div>
                <div className="group">
                  <h3 className="mono text-xs font-black tracking-widest text-gold uppercase mb-4">Ecosystem Growth</h3>
                  <p className="text-black dark:text-white/70 font-light transition-colors duration-500">
                    A vertically integrated laboratory from R&D to market-ready neural workflows.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-black/10 dark:bg-white/5 border border-gold/20 p-12 text-center rounded-sm backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              <h3 className="mono text-sm font-black tracking-[0.4em] text-gold uppercase mb-8">INQUIRY_PROTOCOL_V.1</h3>
              <p className="text-2xl font-black text-black dark:text-white mb-4 tracking-tight">
                Dicoangelo@metaventions.com
              </p>
              <p className="mono text-[11px] text-black/40 dark:text-white/40 tracking-[0.3em] uppercase">
                For Investing Inquiries
              </p>
              
              <div className="mt-12">
                <a 
                  href="mailto:Dicoangelo@metaventions.com?subject=Investment%20Inquiry%20-%20Metaventions%20AI"
                  className="px-12 py-5 bg-gold text-black dark:text-midnight font-black rounded-sm transition-all hover:scale-105 shadow-[0_20px_40px_rgba(215,178,109,0.2)] mono text-[11px] tracking-[0.5em] inline-block uppercase click-feedback"
                >
                  INITIALIZE_LINK
                </a>
              </div>
            </div>

            <div className="mt-16 pt-10 border-t border-gold/10 flex justify-between items-center mono text-[9px] text-black dark:text-white tracking-[0.4em] uppercase transition-colors duration-500 opacity-50">
              <span>MV_AI // ASSET_CLASS_01</span>
              <span>WALL_ST // NY</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestorsModal;
