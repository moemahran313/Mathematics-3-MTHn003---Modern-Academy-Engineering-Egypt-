import React, { useState } from 'react';
import { Smartphone, Download, Check, Sparkles } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { PWAInstallModal } from './PWAInstallModal';

interface PWAInstallButtonProps {
  variant?: 'header' | 'hero' | 'floating' | 'pill';
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = 'header',
  className = '',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (!success) {
        setModalOpen(true);
      }
    } else {
      setModalOpen(true);
    }
  };

  // If already installed and variant is header, show a subtle badge or nothing
  if (isInstalled && variant === 'header') {
    return (
      <>
        <button
          onClick={() => setModalOpen(true)}
          className={`flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-950/40 px-2.5 py-1.5 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-900/50 ${className}`}
          title="App is installed on your device"
        >
          <Check className="h-3.5 w-3.5 text-emerald-400" />
          <span className="hidden sm:inline">Installed App</span>
        </button>
        <PWAInstallModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </>
    );
  }

  if (variant === 'floating') {
    return (
      <>
        <button
          onClick={handleClick}
          className={`fixed bottom-20 right-4 z-40 flex items-center gap-2 rounded-full border border-teal-400/40 bg-slate-900/90 px-4 py-2.5 text-xs font-bold text-teal-300 shadow-xl shadow-teal-950/50 backdrop-blur-md transition hover:scale-105 hover:bg-teal-950/80 active:scale-95 sm:hidden ${className}`}
        >
          <Smartphone className="h-4 w-4 text-teal-400 animate-pulse" />
          <span>Add to Phone</span>
        </button>
        <PWAInstallModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </>
    );
  }

  if (variant === 'hero') {
    return (
      <>
        <button
          onClick={handleClick}
          className={`group flex items-center gap-2.5 rounded-xl border border-teal-500/40 bg-gradient-to-r from-teal-500/15 via-emerald-500/10 to-transparent px-4 py-2 text-xs font-bold text-teal-300 shadow-sm transition hover:border-teal-400 hover:bg-teal-500/25 active:scale-[0.98] ${className}`}
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-teal-500/20 text-teal-300 group-hover:bg-teal-400 group-hover:text-slate-950 transition">
            <Smartphone className="h-3.5 w-3.5" />
          </div>
          <div className="text-left">
            <div className="leading-none">Add to Phone App</div>
            <div className="text-[10px] font-normal text-slate-400">Offline Study Access</div>
          </div>
        </button>
        <PWAInstallModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </>
    );
  }

  // Default 'header' variant
  return (
    <>
      <button
        onClick={handleClick}
        className={`flex items-center gap-2 rounded-lg border border-teal-500/40 bg-teal-500/10 px-3 py-1.5 text-xs font-bold text-teal-300 shadow-sm transition hover:border-teal-400 hover:bg-teal-500/20 active:scale-95 ${className}`}
        title="Install Math 3 App to your Phone or Computer"
      >
        <Smartphone className="h-3.5 w-3.5 text-teal-400" />
        <span className="hidden sm:inline">Add to Phone</span>
        <span className="sm:hidden">Install</span>
      </button>
      <PWAInstallModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};
