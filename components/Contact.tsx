
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div id="contact" className="py-32 animate-in fade-in slide-in-from-bottom-12 duration-1000">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-block px-4 py-1.5 glass-slab border-[#0B1020]/5 mb-10">
           <span className="mono text-[#18E6FF] text-[10px] font-black tracking-[0.6em] uppercase">INITIATE_HANDSHAKE</span>
        </div>
        <h1 className="text-6xl md:text-7xl font-black mb-10 tracking-tighter text-[#0B1020]">Contact & Access</h1>
        <p className="text-[#0B1020]/40 text-2xl font-light mb-20 tracking-tight max-w-xl mx-auto">
          Inquire about research collaborations or private beta access to Structura OS.
        </p>

        {submitted ? (
          <div className="glass-slab-floating p-24 rounded-sm border-white text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#18E6FF] to-[#7B2CFF]"></div>
            <div className="text-7xl mb-10">🛡️</div>
            <h2 className="text-4xl font-black mb-8 tracking-tighter text-[#0B1020]">Transmission Logged</h2>
            <p className="text-[#0B1020]/50 text-xl font-light leading-relaxed">Your intent has been successfully registered. We will evaluate the handshake request shortly.</p>
            <button 
              onClick={() => setSubmitted(false)}
              className="mt-16 mono text-[#18E6FF] text-[11px] font-black tracking-[0.5em] uppercase hover:underline"
            >
              NEW_TRANSMISSION
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-slab-floating p-16 rounded-sm border-white space-y-10 text-left relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0B1020]/10 to-transparent"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <label className="block mono text-[9px] uppercase font-black text-[#0B1020]/40 mb-4 tracking-[0.4em]">IDENTITY</label>
                <input 
                  required
                  type="text" 
                  placeholder="YOUR FULL NAME"
                  className="w-full bg-[#E6EDF5]/50 border border-[#0B1020]/10 rounded-sm px-8 py-5 focus:outline-none focus:border-[#18E6FF] transition-all text-[#0B1020] mono text-xs uppercase placeholder:text-[#0B1020]/20"
                />
              </div>
              <div>
                <label className="block mono text-[9px] uppercase font-black text-[#0B1020]/40 mb-4 tracking-[0.4em]">CONTACT_CHANNEL</label>
                <input 
                  required
                  type="email" 
                  placeholder="EMAIL_ADDRESS"
                  className="w-full bg-[#E6EDF5]/50 border border-[#0B1020]/10 rounded-sm px-8 py-5 focus:outline-none focus:border-[#7B2CFF] transition-all text-[#0B1020] mono text-xs uppercase placeholder:text-[#0B1020]/20"
                />
              </div>
            </div>
            
            <div>
              <label className="block mono text-[9px] uppercase font-black text-[#0B1020]/40 mb-4 tracking-[0.4em]">INQUIRY_PURPOSE</label>
              <select className="w-full bg-[#E6EDF5]/50 border border-[#0B1020]/10 rounded-sm px-8 py-5 focus:outline-none focus:border-[#FF3DF2] transition-all text-[#0B1020] mono text-xs uppercase appearance-none cursor-pointer">
                <option>STRUCTURA_BETA_ACCESS</option>
                <option>R&D_COLLABORATION</option>
                <option>GENERAL_INQUIRY</option>
              </select>
            </div>
            
            <div>
              <label className="block mono text-[9px] uppercase font-black text-[#0B1020]/40 mb-4 tracking-[0.4em]">DETAILED_INQUIRY</label>
              <textarea 
                rows={5}
                placeholder="DESCRIBE YOUR INTEREST OR TARGET STATE..."
                className="w-full bg-[#E6EDF5]/50 border border-[#0B1020]/10 rounded-sm px-8 py-5 focus:outline-none focus:border-[#18E6FF] transition-all text-[#0B1020] mono text-xs uppercase resize-none placeholder:text-[#0B1020]/20"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="w-full py-7 bg-[#0B1020] text-white font-black rounded-sm transition-all hover:scale-[1.01] shadow-2xl mono text-[11px] tracking-[0.6em] uppercase"
            >
              INITIALIZE_HANDSHAKE
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
