
import React, { useRef, useState, useEffect } from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateBg: (bg: string | null) => void;
  currentBg: string | null;
  bgOpacity: number;
  onUpdateOpacity: (opacity: number) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ 
  isOpen, 
  onClose, 
  onUpdateBg, 
  currentBg,
  bgOpacity,
  onUpdateOpacity
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setSyncing(true);
      const timer = setTimeout(() => setSyncing(false), 180);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSizeBytes = 100 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setError("Asset overflow.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      onUpdateBg(result);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm transition-opacity duration-200">
      <div className="w-full max-w-lg glass-modal rounded-sm relative overflow-hidden shadow-2xl min-h-[480px] animate-in zoom-in-95 fade-in duration-200 ease-out">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#FF3DF2] via-[#7B2CFF] to-[#18E6FF] z-30"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-5 text-black dark:text-white/30 hover:text-amethyst transition-colors click-feedback z-30 p-2"
          aria-label="Close"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Sync Layer */}
        <div className={`absolute inset-0 p-10 pt-20 flex flex-col items-center justify-center transition-opacity duration-300 z-10 ${syncing ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="w-10 h-10 border-2 border-cyan/10 border-t-cyan rounded-full animate-spin mb-8"></div>
          <div className="space-y-4 w-full opacity-40">
            <div className="h-2 w-1/3 mx-auto skeleton-shimmer rounded-full"></div>
            <div className="h-32 w-full skeleton-shimmer rounded-sm"></div>
            <div className="h-8 w-full skeleton-shimmer rounded-sm"></div>
          </div>
          <span className="mono text-[8px] text-cyan font-black tracking-[0.5em] uppercase mt-10">SYNCING_CORE</span>
        </div>

        {/* Content Layer */}
        <div className={`p-10 pt-12 transition-all duration-300 ${syncing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <h2 className="mono text-sm font-black tracking-[0.6em] text-black dark:text-white text-center uppercase mb-10">
            SYSTEM_SETTINGS
          </h2>
          
          <div className="space-y-10">
            <div>
              <label className="block mono text-[8px] uppercase font-black text-black/40 dark:text-white/30 mb-4 tracking-[0.4em]">
                BG_ARCHITECTURE
              </label>
              
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full aspect-[2/1] bg-black/10 dark:bg-black/40 border border-dashed border-black/20 dark:border-white/10 rounded-sm flex flex-col items-center justify-center cursor-pointer hover:border-[#18E6FF]/40 transition-all group relative overflow-hidden click-feedback"
              >
                {currentBg ? (
                  <div className="absolute inset-0">
                    <img src={currentBg} className="w-full h-full object-cover opacity-60" alt="Preview" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="mono text-[8px] text-white uppercase tracking-[0.3em] font-black">REPLACE_MODULE</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center opacity-40">
                    <span className="mono text-[8px] text-black dark:text-white uppercase tracking-[0.3em] font-black">SELECT_ASSET</span>
                  </div>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              {error && <p className="mt-3 mono text-[8px] text-[#FF3DF2] text-center uppercase tracking-widest">{error}</p>}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="mono text-[8px] uppercase font-black text-black/40 dark:text-white/30 tracking-[0.4em]">OPACITY</label>
                <span className="mono text-[8px] text-[#18E6FF] font-black">{Math.round(bgOpacity * 100)}%</span>
              </div>
              <input 
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={bgOpacity}
                onChange={(e) => onUpdateOpacity(parseFloat(e.target.value))}
                className="w-full h-[1px] bg-black/10 dark:bg-white/10 appearance-none cursor-pointer"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                onClick={() => { onUpdateBg(null); onUpdateOpacity(0.4); }}
                className="flex-grow py-3 border border-black/10 dark:border-white/5 rounded-sm mono text-[8px] font-black text-black/40 dark:text-white/40 tracking-[0.3em] uppercase hover:bg-black/5 dark:hover:bg-white/5 transition-colors click-feedback"
              >
                RESET
              </button>
              <button 
                onClick={onClose}
                className="flex-grow py-3 bg-black dark:bg-white text-white dark:text-black rounded-sm mono text-[8px] font-black tracking-[0.3em] uppercase hover:bg-amethyst hover:text-white transition-colors click-feedback"
              >
                TERMINATE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
