import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const OfflineStatusBar: React.FC = () => {
  const { isOnline } = usePWAInstall();
  const [showReconnected, setShowReconnected] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setWasOffline(true);
    } else if (wasOffline) {
      setShowReconnected(true);
      const timer = setTimeout(() => {
        setShowReconnected(false);
        setWasOffline(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, wasOffline]);

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-amber-600/90 text-amber-50 px-4 py-1.5 text-xs font-semibold flex items-center justify-center gap-2 backdrop-blur-sm shadow-inner z-50 sticky top-0"
        >
          <WifiOff className="h-3.5 w-3.5 shrink-0" />
          <span>You are offline — Full offline cache active! All 7 lecture pages, formulas, and quizzes remain accessible.</span>
        </motion.div>
      )}

      {showReconnected && isOnline && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-emerald-600/90 text-emerald-50 px-4 py-1.5 text-xs font-semibold flex items-center justify-center gap-2 backdrop-blur-sm shadow-inner z-50 sticky top-0"
        >
          <Wifi className="h-3.5 w-3.5 shrink-0" />
          <span>Back online — All resources synchronized.</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
