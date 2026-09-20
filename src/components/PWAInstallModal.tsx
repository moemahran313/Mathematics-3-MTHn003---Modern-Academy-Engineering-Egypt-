import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Smartphone,
  Share2,
  PlusSquare,
  X,
  CheckCircle2,
  Sparkles,
  WifiOff,
  Download,
  ExternalLink,
  Laptop
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, isAndroid, install } = usePWAInstall();

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (isInstallable) {
      const installed = await install();
      if (installed) {
        onClose();
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ type: 'spring', duration: 0.3 }}
          className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 p-6 text-slate-100 shadow-2xl z-10"
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 p-2 text-slate-950 shadow-md shadow-teal-500/20">
                <Smartphone className="h-6 w-6 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-100">
                  {isInstalled ? 'App Already Installed' : 'Install Math 3 App'}
                </h3>
                <p className="text-xs text-slate-400">
                  {isInstalled ? 'Running in standalone mode' : 'Add to your Phone or Computer'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-slate-200"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="mt-5 space-y-4">
            {/* Features Checklist */}
            <div className="grid grid-cols-2 gap-2 rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-teal-400 shrink-0" />
                <span>Works 100% Offline</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-teal-400 shrink-0" />
                <span>Instant Home Access</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-teal-400 shrink-0" />
                <span>Fast Fullscreen UI</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-teal-400 shrink-0" />
                <span>No App Store needed</span>
              </div>
            </div>

            {/* If Already Installed */}
            {isInstalled ? (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-4 text-center">
                <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-400" />
                <p className="mt-2 text-sm font-semibold text-emerald-200">
                  Math 3 is installed on your device!
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  You can launch it directly from your home screen or application launcher anytime.
                </p>
              </div>
            ) : isInstallable ? (
              /* One-click native install */
              <div className="space-y-3">
                <p className="text-xs leading-relaxed text-slate-300">
                  Click the button below to install the Math 3 Library as a standalone native app on your phone, tablet, or desktop.
                </p>
                <button
                  onClick={handleInstallClick}
                  className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-4 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-teal-500/25 transition hover:brightness-110 active:scale-[0.98]"
                >
                  <Download className="h-4 w-4 stroke-[2.5]" />
                  <span>Install to Phone / Desktop</span>
                </button>
              </div>
            ) : isIOS ? (
              /* iOS Safari instructions */
              <div className="space-y-3">
                <div className="rounded-xl border border-amber-500/20 bg-amber-950/20 p-3.5">
                  <h4 className="flex items-center gap-2 text-xs font-bold text-amber-300">
                    <Sparkles className="h-4 w-4" />
                    How to install on iPhone & iPad (Safari):
                  </h4>
                  <ol className="mt-2.5 space-y-2 text-xs text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-800 text-[11px] font-bold text-teal-300">
                        1
                      </span>
                      <span>
                        Tap the <strong className="text-teal-300">Share</strong> icon{' '}
                        <Share2 className="inline h-3.5 w-3.5 text-teal-400" /> at the bottom or top of Safari.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-800 text-[11px] font-bold text-teal-300">
                        2
                      </span>
                      <span>
                        Scroll down and tap <strong className="text-teal-300">Add to Home Screen</strong>{' '}
                        <PlusSquare className="inline h-3.5 w-3.5 text-teal-400" />.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-800 text-[11px] font-bold text-teal-300">
                        3
                      </span>
                      <span>
                        Tap <strong className="text-emerald-400">Add</strong> in the top right corner.
                      </span>
                    </li>
                  </ol>
                </div>
              </div>
            ) : (
              /* Android Chrome or Desktop Browser fallback guide */
              <div className="space-y-3">
                <div className="rounded-xl border border-teal-500/20 bg-slate-950/70 p-3.5">
                  <h4 className="flex items-center gap-2 text-xs font-bold text-teal-300">
                    {isAndroid ? <Smartphone className="h-4 w-4" /> : <Laptop className="h-4 w-4" />}
                    Manual Installation:
                  </h4>
                  <ol className="mt-2.5 space-y-2 text-xs text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-800 text-[11px] font-bold text-teal-300">
                        1
                      </span>
                      <span>
                        Tap the browser menu <strong className="text-teal-300">(⋮ or ⋯)</strong> in the top right.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-800 text-[11px] font-bold text-teal-300">
                        2
                      </span>
                      <span>
                        Select <strong className="text-teal-300">"Install app"</strong> or <strong className="text-teal-300">"Add to Home screen"</strong>.
                      </span>
                    </li>
                  </ol>
                </div>
              </div>
            )}

            {/* Offline tip */}
            <div className="flex items-center gap-2 rounded-lg bg-slate-800/40 px-3 py-2 text-[11px] text-slate-400">
              <WifiOff className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span>All 7 lecture handout pages, formulas, and quizzes are stored locally for offline revision.</span>
            </div>
          </div>

          {/* Footer Action */}
          <div className="mt-5">
            <button
              onClick={onClose}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 py-2.5 text-xs font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white"
            >
              Got it
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
