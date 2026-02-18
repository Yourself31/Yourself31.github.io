import React, { useState, useEffect } from 'react';
import ParticleField from './components/ParticleField';
import VaultCursor from './components/VaultCursor';
import GlitchText from './components/GlitchText';
import MagneticElement from './components/MagneticElement';
import { Github, Linkedin, Instagram, Share2, Check } from 'lucide-react';

const App: React.FC = () => {
  const [hexProgress, setHexProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [showCursor, setShowCursor] = useState(false);

  const statuses = [
    'INIT_SEQUENCE_PENDING',
    'BUFFERING_VAULT_ASSETS',
    'ENCRYPTING_NODES',
    'CALIBRATING_QUANTUM_FIELD',
    'ACCESS_RESTRICTED'
  ];

  const subMessages = [
    'CALIBRATING_HYPERDRIVE_ARRAY',
    'DECRYPTING_RESTRICTED_MODULES',
    'OPTIMIZING_LATENCY_PROTOCOLS',
    'SYNCHRONIZING_CLANDESTINE_NODES',
    'SCRUBBING_METADATA_TRAILS',
    'INJECTING_KINETIC_SCRAMBLE',
    'FRAGMENTING_SECURE_PAYLOADS',
    'RE-ROUTING_MAINFRAME_TRAFFIC',
    'INITIALIZING_NEURAL_INTERFACE',
    'ISOLATING_QUANTUM_LEAKS',
    'PATCHING_CORE_VULNERABILITIES',
    'EXTRACTING_ENCRYPTED_ASSETS'
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    const updateCursorMode = () => setShowCursor(mediaQuery.matches);
    updateCursorMode();
    mediaQuery.addEventListener('change', updateCursorMode);

    return () => mediaQuery.removeEventListener('change', updateCursorMode);
  }, []);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setHexProgress((prev) => (prev < 255 ? prev + 1 : 255));
    }, 50);

    const statusInterval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statuses.length);
    }, 3000);

    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % subMessages.length);
    }, 3500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(statusInterval);
      clearInterval(messageInterval);
    };
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date("2026-07-01T00:00:00-05:00");

    const timer = setInterval(() => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNum = (num: number) => num.toString().padStart(2, '0');

  const hexString = `0x${hexProgress.toString(16).toUpperCase().padStart(2, '0')}`;

  return (
    <div className="fixed inset-0 overflow-hidden bg-onyx text-silver font-mono selection:bg-silver selection:text-onyx flex items-center justify-center px-3 py-3 sm:px-8 sm:py-8">
      <ParticleField />
      {showCursor && <VaultCursor />}

      {/* Terminal Status Corners */}
      <div className="hidden md:flex fixed top-8 left-8 text-[10px] tracking-[0.2em] text-silver/40 items-center gap-2">
        <div className="w-1.5 h-1.5 bg-silver/60 rounded-full animate-pulse" />
        {statuses[statusIndex]}
      </div>
      
      <div className="hidden md:flex fixed top-8 right-8 text-[10px] tracking-[0.2em] text-silver/40 flex-col items-end gap-1">
        <span>V_0.1.0_BETA</span>
        <span className="text-silver/20 italic uppercase">PHASE: ALPHA_DEPLOY</span>
      </div>

      <div className="hidden md:flex fixed bottom-8 left-8 gap-6 text-silver/40">
        <MagneticElement strength={0.2}>
          <a href="https://github.com/isaiahvelez" target="_blank" rel="noreferrer" className="hover:text-silver transition-colors">
            <Github size={18} />
          </a>
        </MagneticElement>
        <MagneticElement strength={0.2}>
          <a href="https://www.linkedin.com/in/isaiahvelez" target="_blank" rel="noreferrer" className="hover:text-silver transition-colors">
            <Linkedin size={18} />
          </a>
        </MagneticElement>
        <MagneticElement strength={0.2}>
          <a href="https://www.instagram.com/iamisaiahvelez" target="_blank" rel="noreferrer" className="hover:text-silver transition-colors">
            <Instagram size={18} />
          </a>
        </MagneticElement>
        <MagneticElement strength={0.2}>
          <button onClick={handleShare} className="hover:text-silver transition-colors">
            {isCopied ? <Check size={18} /> : <Share2 size={18} />}
          </button>
        </MagneticElement>
      </div>

      <div className="hidden md:block fixed bottom-8 right-8 text-[10px] tracking-[0.2em] text-silver/40">
        LATENCY: 14MS // SECTOR: 7G
      </div>

      <main className="relative z-10 flex h-full w-full max-w-4xl flex-col items-center justify-center text-center overflow-hidden">
        <div className="md:hidden mb-2 max-w-[92vw] px-1 text-[9px] tracking-[0.08em] text-silver/50 flex items-center gap-2 truncate">
          <div className="w-1.5 h-1.5 bg-silver/60 rounded-full animate-pulse" />
          {statuses[statusIndex]}
        </div>

        <header className="mb-5 md:mb-12 w-full">
          <GlitchText 
            text="COMING SOON" 
            className="text-3xl sm:text-5xl md:text-8xl font-syncopate font-bold tracking-[0.1em] sm:tracking-[0.22em] md:tracking-[0.4em] block mb-2"
          />
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-silver/30 to-transparent mb-4 md:mb-6" />
          <div className="mx-auto max-w-[92vw] truncate px-1 text-[8px] sm:text-[10px] md:text-xs tracking-[0.1em] sm:tracking-[0.35em] md:tracking-[0.5em] text-silver/60 uppercase min-h-[1.5em]">
            <GlitchText 
              key={messageIndex}
              text={subMessages[messageIndex]} 
              scrambleSpeed={20}
              triggerOnHover={true}
            />
          </div>
        </header>

        <section className="hidden sm:block mb-8 md:mb-16 w-full max-w-md">
          <div className="flex justify-between text-[10px] tracking-[0.2em] text-silver/60 mb-2">
            <span>DECRYPTING ASSETS</span>
            <span>{hexString}</span>
          </div>
          <div className="w-full h-1 bg-silver/10 overflow-hidden relative">
            <div 
              className="h-full bg-silver/80 transition-all duration-300 ease-out"
              style={{ width: `${(hexProgress / 255) * 100}%` }}
            />
          </div>
        </section>

        <section className="flex flex-col items-center gap-5 md:gap-12">
          {/* Kinetic Countdown */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 md:flex md:gap-12">
            {[
              { label: 'DAYS', value: timeLeft.days },
              { label: 'HOURS', value: timeLeft.hours },
              { label: 'MINS', value: timeLeft.minutes },
              { label: 'SECS', value: timeLeft.seconds },
            ].map((unit) => (
              <div key={unit.label} className="flex flex-col items-center">
                <span className="text-2xl md:text-5xl font-bold tracking-tighter mb-1.5 md:mb-2">
                  {formatNum(unit.value)}
                </span>
                <span className="text-[8px] md:text-[10px] tracking-[0.22em] md:tracking-[0.3em] text-silver/30 font-bold uppercase">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-5 md:pt-12 border-t border-silver/5 w-full flex flex-col items-center">
            <span className="text-[10px] tracking-[0.3em] md:tracking-[0.6em] text-silver/20 font-bold uppercase mb-2">OPERATOR</span>
            <span className="text-sm sm:text-xl md:text-2xl font-syncopate font-bold tracking-[0.1em] sm:tracking-[0.34em] md:tracking-[0.5em] text-silver/80">
              ISAIAH VELEZ
            </span>
          </div>
        </section>

        <section className="md:hidden mt-4 flex gap-6 text-silver/45">
          <a href="https://github.com/isaiahvelez" target="_blank" rel="noreferrer" className="hover:text-silver transition-colors">
            <Github size={18} />
          </a>
          <a href="https://www.linkedin.com/in/isaiahvelez" target="_blank" rel="noreferrer" className="hover:text-silver transition-colors">
            <Linkedin size={18} />
          </a>
          <a href="https://www.instagram.com/iamisaiahvelez" target="_blank" rel="noreferrer" className="hover:text-silver transition-colors">
            <Instagram size={18} />
          </a>
          <button onClick={handleShare} className="hover:text-silver transition-colors">
            {isCopied ? <Check size={18} /> : <Share2 size={18} />}
          </button>
        </section>
      </main>

      {/* Background Grid Pattern */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none -z-10 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]" />
    </div>
  );
};

export default App;
