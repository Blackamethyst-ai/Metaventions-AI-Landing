
import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Mission from './components/Mission';
import Ecosystem from './components/Ecosystem';
import Footer from './components/Footer';
import BackgroundEffect from './components/BackgroundEffect';
import SettingsModal from './components/SettingsModal';
import SignUpModal from './components/SignUpModal';
import ContactModal from './components/ContactModal';
import VisionModal from './components/VisionModal';
import ProductModal from './components/ProductModal';
import InvestorsModal from './components/InvestorsModal';

// Lazy load the Genesis Sequence for better performance
const GenesisSequence = lazy(() => import('./components/GenesisSequence'));

const App: React.FC = () => {
  const [customBg, setCustomBg] = useState<string | null>(null);
  const [bgOpacity, setBgOpacity] = useState<number>(0.4);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isVisionOpen, setIsVisionOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isInvestorsOpen, setIsInvestorsOpen] = useState(false);

  // Genesis Sequence state - show on first visit
  const [showGenesis, setShowGenesis] = useState(() => {
    // Check if user has seen the intro before
    const hasSeenIntro = localStorage.getItem('metaventions_seen_genesis');
    // Also check URL param to force show: ?genesis=true
    const urlParams = new URLSearchParams(window.location.search);
    const forceShow = urlParams.get('genesis') === 'true';
    return forceShow || !hasSeenIntro;
  });

  const handleGenesisComplete = () => {
    setShowGenesis(false);
    localStorage.setItem('metaventions_seen_genesis', 'true');
  };

  useEffect(() => {
    const storedBg = localStorage.getItem('metaventions_custom_bg');
    const storedOpacity = localStorage.getItem('metaventions_bg_opacity');
    const storedTheme = localStorage.getItem('metaventions_theme');
    
    if (storedBg) setCustomBg(storedBg);
    if (storedOpacity) setBgOpacity(parseFloat(storedOpacity));
    if (storedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark');
    }

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'contact') setIsContactOpen(true);
      if (hash === 'vision') setIsVisionOpen(true);
      if (hash === 'product') setIsProductOpen(true);
      if (hash === 'investors') setIsInvestorsOpen(true);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newVal = !prev;
      if (newVal) {
        document.body.classList.add('dark');
        localStorage.setItem('metaventions_theme', 'dark');
      } else {
        document.body.classList.remove('dark');
        localStorage.setItem('metaventions_theme', 'light');
      }
      return newVal;
    });
  };

  const handleUpdateBg = (newBg: string | null) => {
    if (newBg && newBg.length < 4.5 * 1024 * 1024) {
      try { localStorage.setItem('metaventions_custom_bg', newBg); } catch (e) {}
    } else {
      localStorage.removeItem('metaventions_custom_bg');
    }
    setCustomBg(newBg);
  };

  const handleUpdateOpacity = (opacity: number) => {
    setBgOpacity(opacity);
    localStorage.setItem('metaventions_bg_opacity', opacity.toString());
  };

  return (
    <div className={`relative min-h-screen selection:bg-[#7B2CFF]/30 overflow-x-hidden ${isDarkMode ? 'dark' : ''}`}>
      {/* Genesis Sequence - The D-Ecosystem Origin Story */}
      {showGenesis && (
        <Suspense fallback={<div className="fixed inset-0 bg-black z-[9999]" />}>
          <GenesisSequence onComplete={handleGenesisComplete} autoPlay={true} />
        </Suspense>
      )}

      <BackgroundEffect customBg={customBg} bgOpacity={bgOpacity} isDarkMode={isDarkMode} />
      <Navbar 
        onOpenSettings={() => setIsSettingsOpen(true)} 
        onOpenVision={() => setIsVisionOpen(true)}
        onOpenProduct={() => setIsProductOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenInvestors={() => setIsInvestorsOpen(true)}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      
      <main className="relative pt-20 px-4 max-w-7xl mx-auto">
        <Hero onOpenSignUp={() => setIsSignUpOpen(true)} />
        <Mission />
        <Ecosystem />
      </main>

      <Footer />

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        onUpdateBg={handleUpdateBg}
        currentBg={customBg}
        bgOpacity={bgOpacity}
        onUpdateOpacity={handleUpdateOpacity}
      />

      <SignUpModal 
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
      />

      <ContactModal 
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        isDarkMode={isDarkMode}
      />

      <VisionModal 
        isOpen={isVisionOpen}
        onClose={() => setIsVisionOpen(false)}
        isDarkMode={isDarkMode}
      />

      <ProductModal 
        isOpen={isProductOpen}
        onClose={() => setIsProductOpen(false)}
        isDarkMode={isDarkMode}
      />

      <InvestorsModal 
        isOpen={isInvestorsOpen}
        onClose={() => setIsInvestorsOpen(false)}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default App;
