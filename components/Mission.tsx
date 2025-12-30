
import React, { useEffect, useRef, useState } from 'react';

const Mission: React.FC = () => {
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
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-40 relative overflow-hidden"
    >
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-black/10 dark:via-white/10 to-transparent"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
        <div className={`space-y-8 reveal-hidden ${isVisible ? 'reveal-visible' : ''}`} style={{ transitionDelay: '100ms' }}>
          <div className="flex items-center gap-4">
             <div className="w-8 h-[1px] bg-[#7B2CFF]"></div>
             <span className="mono text-[#7B2CFF] font-black tracking-[0.4em] text-[10px] uppercase">OPERATOR_BRIEF</span>
          </div>
          <h2 className="text-6xl md:text-7xl font-black tracking-tighter mb-10 leading-[0.9] text-black dark:text-white transition-colors duration-500">
            Architecting the <br /><span className="text-black/60 dark:text-white/60 italic">Agentic Age.</span>
          </h2>
          <p className="text-2xl text-black dark:text-white/90 leading-relaxed font-light max-w-lg italic border-l-2 border-[#18E6FF] pl-10 transition-colors duration-500">
            "We don't build tools; we weave intelligent partners."
          </p>
        </div>
        
        <div className={`space-y-12 reveal-hidden ${isVisible ? 'reveal-visible' : ''}`} style={{ transitionDelay: '300ms' }}>
          <div className="glass-slab-floating p-12 rounded-sm border-white/20 dark:border-white/10 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#18E6FF] to-[#7B2CFF]"></div>
            <p className="text-2xl text-black dark:text-white leading-relaxed font-light mb-8 tracking-tight transition-colors duration-500">
              We are moving beyond simple automation. Metaventions AI builds <span className="compute-halo font-black">sovereign operating systems</span> that synthesize distinct data streams into unified human intent.
            </p>
            <p className="text-lg text-black/70 dark:text-white/70 leading-relaxed font-bold transition-colors duration-500">
              We focus on high-fidelity collaboration between human operators and autonomous agents, ensuring that technology serves as a direct extension of sovereignty.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
