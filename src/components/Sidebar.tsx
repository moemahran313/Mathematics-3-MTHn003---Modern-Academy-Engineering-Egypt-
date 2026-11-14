import React from 'react';
import { BookOpen, Video, Trophy, Zap, Calculator, ExternalLink, X, Bookmark, Search, FileCode2, Layers } from 'lucide-react';
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
      id: 'exams',
      label: 'Zero-to-Hero Exam Lab',
      icon: Trophy,
      iconColor: 'text-amber-400',
      meta: '30-Min Mastery',
    },
    {
      id: 'question_bank',
      label: 'Question Bank (180+ Qs)',
      icon: BookOpen,
      iconColor: 'text-teal-400',
      meta: '125 Cards',
    },
    {
      id: 'library',
      label: 'Reference Chapters',
      icon: Layers,
      iconColor: 'text-teal-400',
      meta: 'Ch. 1 – 5',
    },
    {
      id: 'formulas',
      label: 'Formula Sheet',
      icon: FileCode2,
      iconColor: 'text-teal-400',
      meta: 'LaTeX Copy',
    },
    {
      id: 'glossary',
      label: 'Glossary & Flashcards',
      icon: Bookmark,
      iconColor: 'text-indigo-400',
      meta: '3D Cards',
    },
    {
      id: 'quiz',
      label: 'Quizzes & Practice',
      icon: Zap,
      iconColor: 'text-emerald-400',
      meta: 'Interactive',
    },
    {
      id: 'videos',
      label: 'شروحات الفيديو (Videos)',
      icon: Video,
      iconColor: 'text-rose-400',
      meta: 'د. أشرف وم. سمير',
    },
    {
      id: 'solver',
      label: 'LaTeX ODE Solver',
      icon: Calculator,
      iconColor: 'text-teal-400',
      meta: 'Step-by-Step',
    },
  ];

  return (
    <>
      {/* Mobile & Tablet Slide-Over Drawer (< 1024px) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-xs z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.2 }}
              className="fixed top-0 bottom-0 left-0 w-72 max-w-[85vw] z-50 flex flex-col p-5 overflow-y-auto shadow-2xl border-r lg:hidden bg-slate-900 border-slate-800 text-slate-100"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/60">
                <div className="flex items-center gap-2.5 min-w-0">
                  <PartialDiffLogo className="w-5 h-5 text-teal-400 shrink-0" />
                  <div className="min-w-0">
                    <h2 className="text-sm font-mono font-bold tracking-tight text-slate-100 truncate">
                      Math 3 Reference
                    </h2>
                    <span className="text-[10px] text-teal-400 font-mono font-semibold block">
                      MTH203 · MTHn103
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors cursor-pointer shrink-0"
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
                  <span className="text-[10px] font-mono text-slate-500">
                    Find
                  </span>
                </button>
              </div>

              <nav className="flex-1 space-y-1">
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
                      className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 text-xs font-semibold rounded-xl transition-colors text-left border cursor-pointer ${
                        isActive
                          ? 'bg-slate-800 text-teal-400 border-slate-700'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/40 border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className={`w-4 h-4 shrink-0 ${item.iconColor}`} />
                        <span className="truncate">{item.label}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 shrink-0">
                        {item.meta}
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
                    className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold rounded-xl transition-colors text-left text-indigo-400 hover:text-indigo-300 hover:bg-slate-800/30 border border-indigo-500/20"
                  >
                    <span>Discord Community</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>
                </div>
              </nav>

              <div className="pt-4 mt-4 border-t border-slate-800/60 text-[10px] text-slate-500 font-mono leading-relaxed">
                MTH203 · MTHn103 Reference Hub
                <br />
                <span className="text-slate-400">Differential Equations & Transforms</span>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sticky Sidebar (>= 1024px) */}
      <aside className="hidden lg:flex flex-col w-64 xl:w-72 h-dvh sticky top-0 overflow-y-auto shrink-0 select-none p-5 xl:p-6 border-r bg-slate-900 border-slate-800 text-slate-100 print:hidden">
        <div className="flex items-center gap-3 mb-4">
          <PartialDiffLogo className="w-6 h-6 text-teal-400 shrink-0" />
          <div className="min-w-0">
            <h1 className="text-base font-extrabold tracking-tight text-slate-100 truncate">
              Math 3 Reference
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5 text-[11px] font-mono text-teal-400">
              <span>MTH203 · MTHn103</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">ODE & Transforms</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed mb-4">
          Engineering revision formulas, step-by-step ODE derivations, exam solutions, and video explanations.
        </p>

        {/* Quick Search Trigger */}
        <div className="mb-4">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-teal-500/40 text-slate-400 hover:text-slate-200 text-xs font-medium transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2 min-w-0">
              <Search className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span className="truncate">Search Curriculum...</span>
            </div>
            <span className="font-mono text-[10px] text-slate-500 shrink-0">
              ⌘K
            </span>
          </button>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 text-xs font-semibold rounded-xl transition-colors text-left border cursor-pointer ${
                  isActive
                    ? 'bg-slate-800 text-teal-400 border-slate-700'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/30 border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 ${item.iconColor}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 shrink-0">
                  {item.meta}
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
              className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold rounded-xl transition-colors text-left text-indigo-400 hover:text-indigo-300 hover:bg-slate-800/30 border border-indigo-500/20"
            >
              <span>Discord Community</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        </nav>

        <div className="pt-4 mt-4 border-t border-slate-800/60 text-[10px] font-mono text-slate-500 leading-relaxed text-center">
          Modern Academy Hub · MTH203 / MTHn103
        </div>
      </aside>
    </>
  );
};
