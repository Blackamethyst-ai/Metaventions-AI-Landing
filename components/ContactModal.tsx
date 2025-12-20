
import React, { useState, useEffect } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode?: boolean;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, isDarkMode }) => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [syncing, setSyncing] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setSyncing(true);
      const timer = setTimeout(() => setSyncing(false), 1000);
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
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm transition-all duration-500">
      <div className="w-full max-w-2xl bg-white/70 dark:bg-midnight/80 backdrop-blur-2xl rounded-sm border border-black/10 dark:border-white/10 p-12 relative overflow-hidden shadow-2xl min-h-[600px]">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#FF3DF2] via-[#7B2CFF] to-[#18E6FF]"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-8 mono text-black dark:text-white hover:text-cyan transition-colors focus:outline-none click-feedback text-3xl z-20"
        >
          ×
        </button>

        {syncing ? (
          <div className="space-y-12 py-10 animate-in fade-in duration-700">
            <div className="space-y-4">
              <div className="h-4 w-32 skeleton-shimmer rounded-sm"></div>
              <div className="h-12 w-2/3 skeleton-shimmer rounded-sm"></div>
              <div className="h-4 w-full skeleton-shimmer rounded-sm"></div>
            </div>
            <div className="grid grid-cols-2 gap-8">
               <div className="h-16 w-full skeleton-shimmer rounded-sm"></div>
               <div className="h-16 w-full skeleton-shimmer rounded-sm"></div>
            </div>
            <div className="h-32 w-full skeleton-shimmer rounded-sm"></div>
            <div className="h-14 w-full skeleton-shimmer rounded-sm"></div>
            <div className="text-center">
               <span className="mono text-[8px] text-black/20 dark:text-white/20 tracking-[0.5em] uppercase">NEURAL_ROUTING_INITIALIZED</span>
            </div>
          </div>
        ) : status === 'success' ? (
          <div className="text-center py-16 animate-in zoom-in duration-500">
            <h2 className="mono text-2xl font-black text-black dark:text-white mb-6 tracking-tighter uppercase">TRANSMISSION_LOCKED</h2>
            <p className="mono text-[10px] text-black dark:text-white uppercase tracking-[0.4em] leading-relaxed max-w-xs mx-auto">
              Sovereignty handshake protocol initiated. Our architects will evaluate your vision.
            </p>
            <button 
              onClick={onClose}
              className="mt-12 px-12 py-5 bg-black dark:bg-white text-white dark:text-black mono text-[10px] font-black tracking-[0.5em] uppercase hover:bg-black/80 dark:hover:bg-white/80 transition-all click-feedback"
            >
              CLOSE_INTERFACE
            </button>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
            <div className="mb-12">
              <span className="mono text-[10px] font-black tracking-[0.6em] text-[#7B2CFF] uppercase block mb-4">INITIATE_HANDSHAKE</span>
              <h2 className="text-5xl font-black text-black dark:text-white mb-4 tracking-tighter transition-colors duration-500">Contact & Access</h2>
              <p className="text-black dark:text-white/70 font-light tracking-tight max-w-md transition-colors duration-500">
                Inquire about research collaborations or private beta access to Structura OS.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block mono text-[9px] uppercase font-black text-black dark:text-white/60 mb-3 tracking-[0.4em]">OPERATOR_IDENT</label>
                  <input 
                    required
                    type="text" 
                    placeholder="FULL_NAME"
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm px-6 py-4 focus:outline-none focus:border-[#7B2CFF] transition-all text-black dark:text-white mono text-[10px] uppercase placeholder:text-black/40 dark:placeholder:text-white/40"
                  />
                </div>
                
                <div>
                  <label className="block mono text-[9px] uppercase font-black text-black dark:text-white/60 mb-3 tracking-[0.4em]">NEURAL_ROUTE</label>
                  <input 
                    required
                    type="email" 
                    defaultValue="Dicoangelo@Metaventions.com"
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm px-6 py-4 focus:outline-none focus:border-[#7B2CFF] transition-all text-black dark:text-white mono text-[10px] uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block mono text-[9px] uppercase font-black text-black dark:text-white/60 mb-3 tracking-[0.4em]">INTENT_VECTOR</label>
                <select className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm px-6 py-4 focus:outline-none focus:border-[#7B2CFF] transition-all text-black dark:text-white mono text-[10px] uppercase appearance-none cursor-pointer">
                  <option className="bg-white dark:bg-obsidian">STRUCTURA_BETA_ACCESS</option>
                  <option className="bg-white dark:bg-obsidian">RESEARCH_COLLABORATION</option>
                  <option className="bg-white dark:bg-obsidian">GENERAL_INQUIRY</option>
                </select>
              </div>

              <div>
                <label className="block mono text-[9px] uppercase font-black text-black dark:text-white/60 mb-3 tracking-[0.4em]">ARCHITECTURAL_BRIEF</label>
                <textarea 
                  rows={4}
                  placeholder="DEFINE YOUR TARGET STATE..."
                  className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm px-6 py-4 focus:outline-none focus:border-[#7B2CFF] transition-all text-black dark:text-white mono text-[10px] uppercase resize-none placeholder:text-black/40 dark:placeholder:text-white/40"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full py-6 bg-black dark:bg-white text-white dark:text-black rounded-sm mono text-[11px] font-black tracking-[0.6em] uppercase hover:bg-black/90 dark:hover:bg-white/90 transition-all shadow-2xl flex items-center justify-center click-feedback"
              >
                INITIALIZE_HANDSHAKE
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
