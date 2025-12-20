
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
      const timer = setTimeout(() => setSyncing(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const ecosystem = [
    { title: "Structura Sovereign OS", id: "S-01", text: "Modular operating environment for total digital sovereignty." },
    { title: "Agentic Partner Weaver", id: "P-02", text: "Framework for high-fidelity human-agent collaboration." },
    { title: "Metavention Labs", id: "L-03", text: "Rapid prototyping of neural architectures and Web3 protocols." }
  ];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm transition-all duration-500">
      <div className="w-full max-w-6xl bg-white/70 dark:bg-midnight/80 backdrop-blur-2xl rounded-sm border border-black/10 dark:border-white/10 p-12 relative overflow-y-auto max-h-[90vh] shadow-2xl min-h-[600px]">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#FF3DF2] via-[#7B2CFF] to-[#18E6FF]"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-8 mono text-black dark:text-white hover:text-cyan text-3xl transition-colors focus:outline-none click-feedback z-20"
        >
          ×
        </button>

        {syncing ? (
          <div className="animate-in fade-in duration-800 space-y-12 py-6">
            <div className="space-y-4">
              <div className="h-4 w-32 skeleton-shimmer rounded-sm"></div>
              <div className="h-20 w-1/3 skeleton-shimmer rounded-sm"></div>
              <div className="h-6 w-1/4 skeleton-shimmer rounded-sm"></div>
            </div>
            <div className="grid grid-cols-3 gap-8">
               <div className="h-48 w-full skeleton-shimmer rounded-sm"></div>
               <div className="h-48 w-full skeleton-shimmer rounded-sm"></div>
               <div className="h-48 w-full skeleton-shimmer rounded-sm"></div>
            </div>
            <div className="grid grid-cols-3 gap-12 border-t border-black/5 dark:border-white/5 pt-12">
               <div className="h-24 w-full skeleton-shimmer rounded-sm"></div>
               <div className="h-24 w-full skeleton-shimmer rounded-sm"></div>
               <div className="h-24 w-full skeleton-shimmer rounded-sm"></div>
            </div>
            <div className="text-center pt-8">
               <span className="mono text-[8px] text-black/20 dark:text-white/20 tracking-[0.5em] uppercase">DECRYPTING_PRODUCT_MODULES...</span>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div className="mb-16">
              <span className="mono text-[10px] font-black tracking-[0.6em] text-[#18E6FF] uppercase block mb-4">PRODUCT_SPOTLIGHT</span>
              <h2 className="text-6xl font-black text-black dark:text-white tracking-tighter mb-4 leading-none transition-colors duration-500">Structura OS</h2>
              <p className="text-2xl text-black/50 dark:text-white/50 font-light italic transition-colors duration-500">Your Logic. Your Assets. Your Core.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {ecosystem.map(item => (
                <div key={item.id} className="p-8 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-sm transition-all hover:bg-white/40 dark:hover:bg-white/10">
                  <span className="mono text-[9px] font-black text-black dark:text-white block mb-6 transition-colors duration-500">{item.id}</span>
                  <h3 className="text-xl font-black text-black dark:text-white mb-4 tracking-tight transition-colors duration-500">{item.title}</h3>
                  <p className="text-sm text-black dark:text-white/70 leading-relaxed transition-colors duration-500">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-black/10 dark:border-white/10 pt-12">
              <div>
                <h4 className="mono text-[10px] font-black uppercase text-black dark:text-white mb-4 transition-colors duration-500">Asset Studio</h4>
                <p className="text-sm text-black dark:text-white/60 transition-colors duration-500">Visualize and deploy digital assets in real-time with optical precision.</p>
              </div>
              <div>
                <h4 className="mono text-[10px] font-black uppercase text-black dark:text-white mb-4 transition-colors duration-500">Process Logic</h4>
                <p className="text-sm text-black dark:text-white/60 transition-colors duration-500">Visual workflows for complex decision trees and agentic intent.</p>
              </div>
              <div>
                <h4 className="mono text-[10px] font-black uppercase text-black dark:text-white mb-4 transition-colors duration-500">Voice Core</h4>
                <p className="text-sm text-black dark:text-white/60 transition-colors duration-500">Natural language interface for seamless command and system response.</p>
              </div>
            </div>

            <div className="mt-16 text-center">
              <button className="px-12 py-5 bg-black dark:bg-white text-white dark:text-black mono text-[11px] font-black tracking-[0.5em] uppercase hover:bg-black/80 dark:hover:bg-white/80 transition-all click-feedback">
                ACCESS_PROTOCOL_V.1
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductModal;
