
import React, { useEffect, useRef, useState } from 'react';

const Ecosystem: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const cards = [
    {
      title: "Structura Sovereign OS",
      text: "A modular operating environment designed for total digital sovereignty. Integrate assets, logic, and voice cores into a single, reactive dashboard.",
      id: "S-01",
      glow: "#18E6FF"
    },
    {
      title: "Agentic Partner Weaver",
      text: "A framework for high-fidelity collaboration between human operators and autonomous agents. Redefining how intelligence interacts.",
      id: "P-02",
      glow: "#7B2CFF"
    },
    {
      title: "Metavention Labs",
      text: "Rapid prototyping of Web3 protocols, generative inputs, and neural architectures. Where the future is built, layer by layer.",
      id: "L-03",
      glow: "#FF6B8A"
    }
  ];

  return (
    <section 
      id="ecosystem"
      ref={sectionRef}
      className="py-40"
    >
      <div className={`flex flex-col md:flex-row justify-between items-end mb-28 border-b border-black/10 dark:border-white/10 pb-12 transition-colors duration-500 reveal-hidden ${isVisible ? 'reveal-visible' : ''}`}>
        <div className="max-w-2xl">
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-black dark:text-white mb-6">The Ecosystem</h2>
          <p className="text-black/60 dark:text-white/60 mono text-[10px] tracking-[0.5em] uppercase font-bold">Disciplined Futurism // Multi-Layer Protocols</p>
        </div>
        <div className="hidden md:block">
           <div className="mono text-[9px] text-black/50 dark:text-white/50 text-right font-black transition-colors duration-500">
              LATENCY: 0.002ms<br/>
              NODES_ACTIVE: 1,492
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {cards.map((card, idx) => (
          <div 
            key={idx} 
            className={`group relative reveal-hidden ${isVisible ? 'reveal-visible' : ''}`}
            style={{ transitionDelay: `${(idx + 1) * 150}ms` }}
          >
            <div className="relative glass-slab h-full p-12 rounded-sm flex flex-col border-black/10 dark:border-white/10 transition-all duration-700 group-hover:-translate-y-4 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] dark:group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)] group-hover:border-[#18E6FF]/40 click-feedback">
              <div className="flex justify-between items-start mb-12">
                <span className="mono text-[11px] font-black text-black/40 dark:text-white/40 tracking-[0.4em] transition-colors duration-500">{card.id}</span>
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: card.glow, boxShadow: `0 0 10px ${card.glow}` }}></div>
              </div>
              
              <h3 className="text-3xl font-black mb-8 text-black dark:text-white tracking-tighter leading-none transition-colors duration-500">{card.title}</h3>
              <p className="text-black/70 dark:text-white/70 text-lg leading-relaxed font-light mb-12 transition-colors duration-500">
                {card.text}
              </p>
              
              <div className="mt-auto pt-10 border-t border-black/10 dark:border-white/10 flex items-center justify-between transition-colors duration-500">
                <button className="mono text-black/30 dark:text-white/30 text-[10px] font-black tracking-[0.4em] uppercase cursor-default">INIT_ACCESS</button>
                <svg className="w-4 h-4 text-black/20 dark:text-white/20 group-hover:text-[#18E6FF]/40 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Ecosystem;
