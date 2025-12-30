
import React, { useEffect, useRef } from 'react';

interface BackgroundEffectProps {
  customBg?: string | null;
  bgOpacity?: number;
  isDarkMode?: boolean;
}

const BackgroundEffect: React.FC<BackgroundEffectProps> = ({ 
  customBg, 
  bgOpacity = 0.4, 
  isDarkMode 
}) => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const glowRef1 = useRef<HTMLDivElement>(null);
  const glowRef2 = useRef<HTMLDivElement>(null);
  const glossRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const currentMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      };
    };

    const updateEffects = () => {
      const scrollY = window.scrollY;
      
      currentMousePos.current.x += (mousePos.current.x - currentMousePos.current.x) * 0.04;
      currentMousePos.current.y += (mousePos.current.y - currentMousePos.current.y) * 0.04;

      const mx = currentMousePos.current.x;
      const my = currentMousePos.current.y;

      if (parallaxRef.current) {
        const translateValue = scrollY * 0.12;
        parallaxRef.current.style.transform = `translate3d(0, ${translateValue}px, 0) scale(1.1)`;
      }

      if (glowRef1.current) {
        const scrollOffset = scrollY * 0.08;
        glowRef1.current.style.transform = `translate3d(${mx * 40}px, ${scrollOffset + my * 40}px, 0)`;
      }

      if (glowRef2.current) {
        const scrollOffset = -scrollY * 0.04;
        glowRef2.current.style.transform = `translate3d(${mx * -60}px, ${scrollOffset + my * -60}px, 0)`;
      }

      // Specular Gloss Layer - follows mouse to simulate light reflecting off liquid glass
      if (glossRef.current) {
        const posX = (mx + 1) * 50; // 0 to 100%
        const posY = (my + 1) * 50; // 0 to 100%
        glossRef.current.style.background = `radial-gradient(circle at ${posX}% ${posY}%, rgba(255,255,255,0.08) 0%, transparent 60%)`;
      }

      ticking = false;
      window.requestAnimationFrame(updateEffects);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    
    const animationId = window.requestAnimationFrame(updateEffects);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.cancelAnimationFrame(animationId);
    };
  }, [customBg]);

  return (
    <div className={`fixed inset-0 -z-10 pointer-events-none overflow-hidden transition-colors duration-700 ${isDarkMode ? 'bg-obsidian' : 'bg-[#F8FAFC]'}`}>
      
      {/* 1. Base Grid Layer */}
      <div className="absolute inset-0 grid-bg-light opacity-20"></div>

      {/* 2. Deep Atmospheric Glows */}
      {!customBg ? (
        <>
          <div 
            ref={glowRef1}
            className={`absolute top-[-20%] left-[-10%] w-[90%] h-[90%] blur-[150px] rounded-full animate-pulse transition-colors duration-700 will-change-transform ${isDarkMode ? 'bg-amethyst/10' : 'bg-[#7B2CFF]/5'}`} 
            style={{ animationDuration: '10s' }}
          ></div>
          <div 
            ref={glowRef2}
            className={`absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] blur-[130px] rounded-full animate-pulse transition-colors duration-700 will-change-transform ${isDarkMode ? 'bg-cyan/10' : 'bg-[#18E6FF]/5'}`} 
            style={{ animationDuration: '15s' }}
          ></div>
        </>
      ) : (
        <div 
          ref={parallaxRef}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 will-change-transform"
          style={{ 
            backgroundImage: `url(${customBg})`,
            opacity: bgOpacity,
            height: '135vh',
            width: '100%',
            imageRendering: 'auto',
          }}
        ></div>
      )}

      {/* 3. Liquid Glass Overlay - The "Pop" Secret */}
      <div className="absolute inset-0 overflow-hidden backdrop-blur-[6px] saturate-[140%]">
        {/* Subtle specularity (Gloss) */}
        <div 
          ref={glossRef}
          className="absolute inset-0 transition-opacity duration-500 opacity-60 mix-blend-overlay"
        ></div>
        
        {/* Crystallized texture grain */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] contrast-200 pointer-events-none"></div>
      </div>

      {/* 4. Atmospheric Particles */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(25)].map((_, i) => (
          <div 
            key={i}
            className={`absolute rounded-full opacity-40 transition-colors duration-700 ${isDarkMode ? 'bg-white' : 'bg-black'}`}
            style={{
              width: (Math.random() * 1.5 + 0.5) + 'px',
              height: (Math.random() * 1.5 + 0.5) + 'px',
              top: (Math.random() * 100) + '%',
              left: (Math.random() * 100) + '%',
              animation: `pulse ${Math.random() * 4 + 3}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* 5. Deep Cinematic Vignette - Drives focus to UI */}
      <div className={`absolute inset-0 transition-opacity duration-700 ${
        isDarkMode 
          ? 'bg-[radial-gradient(circle_at_50%_40%,transparent_20%,rgba(5,7,13,0.85)_100%)]' 
          : 'bg-[radial-gradient(circle_at_50%_40%,transparent_20%,rgba(248,250,252,0.7)_100%)]'
      }`}></div>

      {/* SVG Liquid Filter Definition */}
      <svg className="hidden">
        <filter id="liquid-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
    </div>
  );
};

export default BackgroundEffect;
