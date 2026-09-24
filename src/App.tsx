import React, { useState, useEffect } from 'react';
import {
  Menu,
  BookOpen,
  Video,
  Trophy,
  Zap,
  Calculator,
  ExternalLink,
  Sparkles,
  Bookmark,
  Search,
  FileCode2,
} from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { LibraryView } from './components/LibraryView';
import { VideosView } from './components/VideosView';
import { ExamsView } from './components/ExamsView';
import { QuizArenaView } from './components/QuizArenaView';
import { SolverView } from './components/SolverView';
import { GlossaryView } from './components/GlossaryView';
import { FormulaSheetView } from './components/FormulaSheetView';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { PWAInstallButton } from './components/PWAInstallButton';
import { OfflineStatusBar } from './components/OfflineStatusBar';
import { PartialDiffLogo } from './components/PartialDiffLogo';
import { Category } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('library');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [selectedTopicCategory, setSelectedTopicCategory] = useState<Category | undefined>(undefined);

  // Global keyboard listener for search (Cmd+K, Ctrl+K, /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (
        e.key === '/' &&
        !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)
      ) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchNavigate = (tab: string, options?: { category?: Category; id?: string }) => {
    setActiveTab(tab);
    if (options?.category) {
      setSelectedTopicCategory(options.category);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row antialiased selection:bg-teal-500 selection:text-slate-950">
      {/* Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleSearchNavigate}
      />

      {/* Sidebar (Mobile Drawer + Desktop Sticky) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-8">
        {/* Offline Status & Connectivity Banner */}
        <OfflineStatusBar />

        {/* Mobile Header */}
        <header className="md:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3.5 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 active:scale-95 transition-transform cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <PartialDiffLogo className="w-5 h-5 text-teal-400" />
              <div>
                <span className="text-xs font-mono font-extrabold text-slate-100 tracking-tight block leading-tight">
                  Math 3
                </span>
                <span className="text-[9px] font-mono text-teal-400 font-semibold block leading-tight">
                  Muhammad Mahran
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <PWAInstallButton variant="header" />
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-xl bg-slate-850 border border-slate-750 text-slate-300 hover:text-teal-400 flex items-center gap-1 text-xs font-mono cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-teal-400" />
            </button>
            <a
              href="https://discord.gg/p6hkRbzFTn"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 px-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-bold flex items-center gap-1"
            >
              <span>Discord</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>
        </header>

        {/* Desktop Top Header Bar */}
        <div className="hidden md:flex items-center justify-between px-8 py-3.5 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md text-xs">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            <span className="font-mono font-medium text-slate-300">
              Modern Academy Curriculum
            </span>
            <span className="text-slate-600 font-mono">•</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono text-teal-400 font-semibold">
              MTH203 / MTHn103
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Search Trigger button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-teal-500/50 text-slate-400 hover:text-slate-200 transition-all font-mono text-xs cursor-pointer shadow-xs"
            >
              <Search className="w-3.5 h-3.5 text-teal-400" />
              <span>Search curriculum & formulas...</span>
              <kbd className="ml-1 px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-slate-400 font-mono">
                ⌘K
              </kbd>
            </button>

            <PWAInstallButton variant="header" />

            <a
              href="https://discord.gg/p6hkRbzFTn"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 hover:text-indigo-100 hover:bg-indigo-500/20 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <span>Discord</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>
        </div>

        {/* Floating Mobile PWA Install Button */}
        <PWAInstallButton variant="floating" />

        {/* Content Container */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'library' && (
            <LibraryView
              initialCategory={selectedTopicCategory}
              onNavigateToVideos={() => setActiveTab('videos')}
              onNavigateToExams={() => setActiveTab('exams')}
              onNavigateToQuiz={() => setActiveTab('quiz')}
            />
          )}

          {activeTab === 'formulas' && (
            <FormulaSheetView
              onNavigateToCategory={(cat) => {
                setSelectedTopicCategory(cat);
                setActiveTab('library');
              }}
              onNavigateToQuiz={(cat) => {
                setSelectedTopicCategory(cat);
                setActiveTab('quiz');
              }}
            />
          )}

          {activeTab === 'glossary' && (
            <GlossaryView
              onNavigateToTopic={(cat) => {
                setSelectedTopicCategory(cat);
                setActiveTab('library');
              }}
            />
          )}

          {activeTab === 'quiz' && (
            <QuizArenaView
              initialCategory={selectedTopicCategory}
              onNavigateToLibrary={() => setActiveTab('library')}
            />
          )}

          {activeTab === 'exams' && <ExamsView />}

          {activeTab === 'videos' && <VideosView />}

          {activeTab === 'solver' && <SolverView />}
        </main>

        {/* Desktop & Mobile Responsive Footer */}
        <footer className="mt-auto px-6 py-6 border-t border-slate-900 text-center text-xs text-slate-500 font-mono space-y-1.5">
          <div>
            Math 3 Reference Library • Modern Academy for Engineering & Technology
          </div>
          <div className="text-[11px] text-slate-600">
            Differential Equations (Separation, Homogeneous, Exact, Linear, Bernoulli, Higher Order) • Laplace Transforms • Fourier Series • Legendre Polynomials
          </div>
        </footer>

        {/* Mobile Bottom Navigation Bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-1 py-1 flex items-center justify-around overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('library')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[9px] font-bold shrink-0 ${
              activeTab === 'library' ? 'text-teal-400 font-extrabold' : 'text-slate-400'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Chapters</span>
          </button>
          <button
            onClick={() => setActiveTab('formulas')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[9px] font-bold shrink-0 ${
              activeTab === 'formulas' ? 'text-teal-300 font-extrabold' : 'text-slate-400'
            }`}
          >
            <FileCode2 className="w-4 h-4" />
            <span>Formulas</span>
          </button>
          <button
            onClick={() => setActiveTab('glossary')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[9px] font-bold shrink-0 ${
              activeTab === 'glossary' ? 'text-indigo-400 font-extrabold' : 'text-slate-400'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Glossary</span>
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[9px] font-bold shrink-0 ${
              activeTab === 'quiz' ? 'text-emerald-400 font-extrabold' : 'text-slate-400'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Quizzes</span>
          </button>
          <button
            onClick={() => setActiveTab('exams')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[9px] font-bold shrink-0 ${
              activeTab === 'exams' ? 'text-amber-400 font-extrabold' : 'text-slate-400'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Exams</span>
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[9px] font-bold shrink-0 ${
              activeTab === 'videos' ? 'text-rose-400 font-extrabold' : 'text-slate-400'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Videos</span>
          </button>
          <button
            onClick={() => setActiveTab('solver')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[9px] font-bold shrink-0 ${
              activeTab === 'solver' ? 'text-teal-400 font-extrabold' : 'text-slate-400'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>DE Solver</span>
          </button>
        </div>
      </div>
    </div>
  );
}
