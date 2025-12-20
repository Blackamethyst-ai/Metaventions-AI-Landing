
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
      const timer = setTimeout(() => setSyncing(false), 900);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSizeBytes = 100 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setError("File exceeds 100MB. Sovereign security limits prevent larger transmissions.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      try {
        onUpdateBg(result);
        setError(null);
      } catch (err) {
        setError("Architectural data overflow. Try an optimized asset.");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm transition-all duration-500">
      <div className="w-full max-w-lg bg-[#0B1020] rounded-sm relative overflow-hidden shadow-2xl border border-white/5 min-h-[500px]">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#FF3DF2] via-[#7B2CFF] to-[#18E6FF]"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-5 text-white/30 hover:text-white transition-colors click-feedback z-20"
          aria-label="Close"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {syncing ? (
          <div className="p-10 pt-20 flex flex-col items-center justify-center h-full space-y-8 animate-in fade-in duration-500">
            <div className="w-12 h-12 border-2 border-cyan/20 border-t-cyan rounded-full animate-spin"></div>
            <div className="space-y-4 w-full">
              <div className="h-4 w-2/3 mx-auto skeleton-shimmer rounded-sm"></div>
              <div className="h-32 w-full skeleton-shimmer rounded-sm"></div>
              <div className="h-8 w-full skeleton-shimmer rounded-sm"></div>
            </div>
            <span className="mono text-[9px] text-cyan font-black tracking-[0.5em] uppercase">SYNCING_CORE_MODULES...</span>
          </div>
        ) : (
          <div className="p-10 pt-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h2 className="mono text-lg font-black tracking-[0.6em] text-white text-center uppercase mb-12">
              SYSTEM_CORE_SETTINGS
            </h2>
            
            <div className="space-y-10">
              <div>
                <label className="block mono text-[10px] uppercase font-black text-white/30 mb-5 tracking-[0.4em]">
                  BACKGROUND_ARCHITECTURE
                </label>
                
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full aspect-[2/1] bg-black/20 border border-dashed border-white/10 rounded-sm flex flex-col items-center justify-center cursor-pointer hover:border-[#18E6FF]/40 transition-all group relative overflow-hidden click-feedback"
                >
                  {currentBg ? (
                    <div className="absolute inset-0">
                      <img src={currentBg} className="w-full h-full object-cover opacity-60" alt="Preview" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-black/80 px-6 py-2 border border-white/10">
                           <span className="mono text-[10px] text-white uppercase tracking-[0.3em] font-black">REPLACE_MODULE</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="mb-4 opacity-70">
                        <svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 0C1.79086 0 0 1.79086 0 4V28C0 30.2091 1.79086 32 4 32H36C38.2091 32 40 30.2091 40 28V8C40 5.78914 38.2109 4 36 4H20L16 0H4Z" fill="#8892B0" />
                          <path d="M4 6H36C37.1046 6 38 6.89543 38 8V28C38 29.1046 37.1046 30 36 30H4C2.89543 30 2 29.1046 2 28V8C2 6.89543 2.89543 6 4 6Z" fill="#E2E8F0" />
                        </svg>
                      </div>
                      <span className="mono text-[10px] text-white/40 uppercase tracking-[0.3em] font-black">SELECT_IMAGE_FILE</span>
                    </div>
                  )}
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                {error && <p className="mt-3 mono text-[9px] text-[#FF3DF2] text-center uppercase tracking-widest">{error}</p>}
                <p className="mt-2 mono text-[8px] text-white/20 text-center uppercase tracking-widest">Supports high-fidelity assets up to 100MB</p>
              </div>

              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <label className="mono text-[10px] uppercase font-black text-white/30 tracking-[0.4em]">CORE_OPACITY</label>
                  <span className="mono text-[10px] text-[#18E6FF] font-black">{Math.round(bgOpacity * 100)}%</span>
                </div>
                <div className="relative flex items-center">
                  <input 
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={bgOpacity}
                    onChange={(e) => onUpdateOpacity(parseFloat(e.target.value))}
                    className="w-full h-[2px] bg-white/10 appearance-none cursor-pointer click-feedback"
                    style={{
                      background: `linear-gradient(to right, #18E6FF ${bgOpacity * 100}%, rgba(255,255,255,0.1) ${bgOpacity * 100}%)`
                    }}
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => { onUpdateBg(null); onUpdateOpacity(0.4); setError(null); }}
                  className="flex-grow py-4 border border-white/10 rounded-sm mono text-[9px] font-black text-white/40 tracking-[0.3em] uppercase hover:bg-white/5 transition-colors click-feedback"
                >
                  RESET_TO_DEFAULT
                </button>
                <button 
                  onClick={onClose}
                  className="flex-grow py-4 bg-white text-black rounded-sm mono text-[9px] font-black tracking-[0.3em] uppercase hover:bg-[#18E6FF] transition-colors click-feedback"
                >
                  CLOSE_PROTOCOL
                </button>
              </div>
            </div>
            <div className="mt-14 pt-8 border-t border-white/5 text-center">
               <span className="mono text-[9px] text-white/20 tracking-[0.5em] uppercase font-black">PERSISTENT_LAYER_ACTIVE</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsModal;
