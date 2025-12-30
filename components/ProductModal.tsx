
import React, { useState, useEffect } from 'react';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode?: boolean;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, isDarkMode }) => {
  const [syncing, setSyncing] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setSyncing(true);
      const timer = setTimeout(() => setSyncing(false), 180);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const ecosystem = [
    { title: "Structura OS", id: "S-01", text: "Modular environment for total sovereignty." },
    { title: "Partner Weaver", id: "P-02", text: "High-fidelity human-agent collaboration." },
    { title: "M-Labs", id: "L-03", text: "Rapid prototyping of neural architectures." }
  ];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm transition-opacity duration-200">
      <div className="w-full max-w-6xl glass-modal rounded-sm p-12 relative overflow-y-auto max-h-[90vh] shadow-2xl min-h-[580px] animate-in zoom-in-95 duration-200 ease-out">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#FF3DF2] via-[#7B2CFF] to-[#18E6FF] z-30"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-8 mono text-black/30 dark:text-white/30 hover:text-[#18E6FF] text-2xl transition-colors click-feedback z-30"
        >
          ×
        </button>

        {/* Sync Layer */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center p-12 transition-opacity duration-300 z-10 ${syncing ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="w-8 h-8 border-2 border-black/5 dark:border-white/5 border-t-[#FF3DF2] rounded-full animate-spin mb-10"></div>
          <div className="grid grid-cols-3 gap-8 w-full opacity-5">
             <div className="h-48 w-full skeleton-shimmer"></div>
             <div className="h-48 w-full skeleton-shimmer"></div>
             <div className="h-48 w-full skeleton-shimmer"></div>
          </div>
        </div>

        {/* Content Layer */}
        <div className={`transition-all duration-300 ${syncing ? 'opacity-0 scale-98' : 'opacity-100 scale-100'}`}>
          <div className="mb-14">
            <span className="mono text-[9px] font-black tracking-[0.6em] text-[#18E6FF] uppercase block mb-3 opacity-60">SPOTLIGHT</span>
            <h2 className="text-5xl font-black text-black dark:text-white tracking-tighter mb-2">Structura OS</h2>
            <p className="text-xl text-black/40 dark:text-white/40 font-light italic">Your Logic. Your Assets. Your Core.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-14">
            {ecosystem.map(item => (
              <div key={item.id} className="p-8 bg-black/10 dark:bg-white/10 border border-black/5 dark:border-white/5 rounded-sm transition-all hover:bg-black/20 dark:hover:bg-white/20">
                <span className="mono text-[8px] font-black text-black/40 dark:text-white/40 block mb-4">{item.id}</span>
                <h3 className="text-lg font-black text-black dark:text-white mb-2 tracking-tight">{item.title}</h3>
                <p className="text-xs text-black/60 dark:text-white/50 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="px-12 py-4 bg-black dark:bg-white text-white dark:text-black mono text-[9px] font-black tracking-[0.5em] uppercase hover:bg-amethyst hover:text-white transition-all click-feedback">
              ACCESS_PROTOCOL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
