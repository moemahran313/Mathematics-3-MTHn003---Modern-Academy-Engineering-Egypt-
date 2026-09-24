import React from 'react';
import { BookOpen, Video, Trophy, Zap, Calculator, ExternalLink, X, Bookmark, Search, Smartphone, FileCode2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PWAInstallButton } from './PWAInstallButton';
import { PartialDiffLogo } from './PartialDiffLogo';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onOpenSearch?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  mobileMenuOpen,
  setMobileMenuOpen,
  onOpenSearch,
}) => {
  const navItems = [
    {
      id: 'library',
      label: 'Reference Chapters',
      icon: BookOpen,
      iconColor: 'text-teal-400',
      badge: 'Ch. 1 - 5',
    },
    {
      id: 'formulas',
      label: 'Formula Sheet',
      icon: FileCode2,
      iconColor: 'text-teal-400',
      badge: 'LaTeX Copy',
    },
    {
      id: 'glossary',
      label: 'Glossary & Flashcards',
      icon: Bookmark,
      iconColor: 'text-indigo-400',
      badge: '3D Cards',
    },
    {
      id: 'quiz',
      label: 'Quizzes & Practice',
      icon: Zap,
      iconColor: 'text-emerald-400',
      badge: 'Interactive',
    },
    {
      id: 'exams',
      label: 'Final & Midterm Exams',
      icon: Trophy,
      iconColor: 'text-amber-400',
      badge: '2016-2024',
    },
    {
      id: 'videos',
      label: 'شروحات الفيديو (Videos)',
      icon: Video,
      iconColor: 'text-rose-400',
      badge: 'د. أشرف وم. سمير',
    },
    {
      id: 'solver',
      label: 'LaTeX ODE Solver',
      icon: Calculator,
      iconColor: 'text-teal-400',
      badge: 'Step-by-Step',
    },
  ];

  return (
    <>
      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-xs z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 bottom-0 left-0 w-72 z-50 flex flex-col p-6 shadow-2xl border-r md:hidden bg-slate-900 border-slate-800 text-slate-100"
            >
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/60">
                <div className="flex items-center gap-2.5">
                  <PartialDiffLogo className="w-5 h-5 text-teal-400" />
                  <div>
                    <h2 className="text-sm font-mono font-bold tracking-tight text-slate-100">
                      Math 3 Reference
                    </h2>
                    <span className="text-[10px] text-teal-400 font-mono font-semibold block">
                      Muhammad Mahran
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
                  aria-label="Close mobile menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mb-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSearch?.();
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-teal-500/40 text-slate-400 hover:text-slate-200 text-xs font-medium cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Search className="w-3.5 h-3.5 text-teal-400" />
                    <span>Search Curriculum...</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                    Find
                  </span>
                </button>
              </div>

              <nav className="flex-1 space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-3 text-xs font-bold rounded-xl transition-all text-left border ${
                        isActive
                          ? 'bg-slate-800 text-teal-400 border-slate-700 shadow-sm'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 shrink-0 ${item.iconColor}`} />
                        <span>{item.label}</span>
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-950 font-mono text-slate-500 border border-slate-800">
                        {item.badge}
                      </span>
                    </button>
                  );
                })}

                <div className="pt-3 space-y-2">
                  <div className="w-full">
                    <PWAInstallButton variant="hero" className="w-full justify-center" />
                  </div>
                  <a
                    href="https://discord.gg/p6hkRbzFTn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold rounded-xl transition-all text-left text-indigo-400 hover:text-indigo-300 hover:bg-slate-800/30 border border-indigo-500/20"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm">💬</span>
                      <span>Discord Community</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>
                </div>
              </nav>

              <div className="pt-4 border-t border-slate-800/60 text-[10px] text-slate-500 font-mono leading-relaxed">
                MTH203 • MTHn103 Reference Hub
                <br />
                <span className="text-slate-400">Differential Equations & Transforms</span>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sticky Sidebar */}
      <aside className="hidden md:flex flex-col w-72 h-screen sticky top-0 overflow-y-auto shrink-0 select-none p-6 border-r transition-colors bg-slate-900 border-slate-800 text-slate-100">
        <div className="flex items-center gap-3 mb-5">
          <PartialDiffLogo className="w-6 h-6 text-teal-400" />
          <div>
            <h1 className="text-base font-extrabold tracking-tight text-slate-100">
              Math 3 Reference
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs font-semibold text-teal-400 font-mono">
                Muhammad Mahran
              </span>
              <span className="text-slate-600 text-[10px]">•</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-teal-400/10 text-teal-300 border border-teal-400/20 font-mono font-bold">
                ODE & Transforms
              </span>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 leading-relaxed mb-4 font-sans">
          Engineering revision formulas, step-by-step ODE derivations, exam solutions, and hand-picked video explanations.
        </p>

        {/* Quick Search Trigger */}
        <div className="mb-4">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-teal-500/40 text-slate-400 hover:text-slate-200 text-xs font-medium transition-all group cursor-pointer shadow-xs"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-teal-400 group-hover:scale-110 transition-transform" />
              <span>Search Curriculum...</span>
            </div>
            <div className="flex items-center gap-1 font-mono text-[10px] text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-850">
              <span>⌘K</span>
            </div>
          </button>
        </div>

        <nav className="flex-1 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 text-xs font-bold rounded-xl transition-all text-left group border cursor-pointer ${
                  isActive
                    ? 'bg-slate-800 text-teal-400 border-slate-700 shadow-md ring-1 ring-teal-500/20'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/30 border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 shrink-0 ${item.iconColor} group-hover:scale-110 transition-transform`} />
                  <span>{item.label}</span>
                </div>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-950/80 font-mono text-slate-400 border border-slate-800">
                  {item.badge}
                </span>
              </button>
            );
          })}

          <div className="pt-4 mt-2 space-y-2">
            <div className="w-full">
              <PWAInstallButton variant="hero" className="w-full justify-center" />
            </div>
            <a
              href="https://discord.gg/p6hkRbzFTn"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold rounded-xl transition-all text-left text-indigo-400 hover:text-indigo-300 hover:bg-slate-800/30 border border-indigo-500/20 group"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">💬</span>
                <span>Discord Community</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </nav>

        <div className="pt-6 border-t border-slate-800/60 space-y-2">
          <div className="text-[10px] font-mono text-slate-500 leading-relaxed text-center">
            Modern Academy Hub • Fall 2024 / Spring 2026
            <br />
            <span className="text-slate-400">Curriculum MTH203 / MTHn103</span>
          </div>
        </div>
      </aside>
    </>
  );
};
