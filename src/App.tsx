import React, { useState, useEffect } from 'react';
import {
  Menu,
  BookOpen,
  Video,
  Trophy,
  Zap,
  Calculator,
  ExternalLink,
  Search,
  FileCode2,
  Layers,
} from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { LibraryView } from './components/LibraryView';
import { VideosView } from './components/VideosView';
import { ExamsView } from './components/ExamsView';
import { QuestionBankView } from './components/QuestionBankView';
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
  const [activeTab, setActiveTab] = useState<string>('exams');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [selectedTopicCategory, setSelectedTopicCategory] = useState<Category | undefined>(undefined);
  const [selectedBankQuestionId, setSelectedBankQuestionId] = useState<string | undefined>(undefined);
  const [selectedBankPreset, setSelectedBankPreset] = useState<'All' | 'Golden12' | 'WeakSpots'>('All');

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
    <div className="min-h-dvh w-full max-w-[100vw] overflow-x-hidden bg-slate-950 text-slate-100 flex flex-col lg:flex-row antialiased selection:bg-teal-500 selection:text-slate-950">
      {/* Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleSearchNavigate}
      />

      {/* Sidebar (Mobile/Tablet Drawer + Desktop Sticky at lg+) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 w-full pb-20 lg:pb-8">
        {/* Offline Status & Connectivity Banner */}
        <OfflineStatusBar />

        {/* Mobile & Tablet Top Bar (< 1024px) */}
        <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between gap-3 px-3.5 sm:px-5 py-2.5 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-xl bg-slate-800 text-slate-200 hover:text-white border border-slate-700 active:scale-95 transition-transform cursor-pointer shrink-0"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 min-w-0">
              <PartialDiffLogo className="w-5 h-5 text-teal-400 shrink-0" />
              <span className="text-sm font-bold text-slate-100 tracking-tight truncate whitespace-nowrap">
                Math 3 Reference
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <PWAInstallButton variant="header" />
            <button
              onClick={() => setIsSearchOpen(true)}
              className="px-2.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-teal-400 flex items-center gap-1.5 text-xs font-mono cursor-pointer whitespace-nowrap"
              aria-label="Search curriculum"
            >
              <Search className="w-4 h-4 text-teal-400 shrink-0" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </header>

        {/* Desktop Top Header Bar (>= 1024px) — 3-Zone Contract */}
        <header className="hidden lg:flex items-center justify-between gap-8 px-8 py-3.5 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md text-xs print:hidden">
          {/* Zone 1: Brand Title */}
          <span className="font-bold text-sm text-slate-100 tracking-tight whitespace-nowrap shrink-0">
            Modern Academy · MTH203 / MTHn103
          </span>

          {/* Zone 2: Concise Quick Nav Links */}
          <nav className="flex items-center gap-6 text-xs font-medium text-slate-400">
            <button
              onClick={() => setActiveTab('exams')}
              className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'exams' ? 'text-teal-400 font-semibold underline underline-offset-4' : ''
              }`}
            >
              Exam Lab
            </button>
            <button
              onClick={() => setActiveTab('question_bank')}
              className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'question_bank' ? 'text-teal-400 font-semibold underline underline-offset-4' : ''
              }`}
            >
              Question Bank
            </button>
            <button
              onClick={() => setActiveTab('formulas')}
              className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'formulas' ? 'text-teal-400 font-semibold underline underline-offset-4' : ''
              }`}
            >
              Formula Sheet
            </button>
            <button
              onClick={() => setActiveTab('solver')}
              className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'solver' ? 'text-teal-400 font-semibold underline underline-offset-4' : ''
              }`}
            >
              LaTeX Solver
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'videos' ? 'text-teal-400 font-semibold underline underline-offset-4' : ''
              }`}
            >
              Video Lectures
            </button>
          </nav>

          {/* Zone 3: Primary Search Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-teal-500/50 text-slate-300 hover:text-white transition-colors font-mono text-xs cursor-pointer whitespace-nowrap shrink-0"
            >
              <Search className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>Search Curriculum</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-slate-400 font-mono">
                ⌘K
              </kbd>
            </button>
          </div>
        </header>

        {/* Floating Mobile PWA Install Button */}
        <PWAInstallButton variant="floating" />

        {/* Content Container */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-5 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 min-w-0 overflow-x-hidden">
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

          {activeTab === 'exams' && (
            <ExamsView
              onOpenQuestionBank={(qId, preset) => {
                if (qId) setSelectedBankQuestionId(qId);
                if (preset) setSelectedBankPreset(preset);
                setActiveTab('question_bank');
              }}
            />
          )}

          {activeTab === 'question_bank' && (
            <QuestionBankView
              initialFilterId={selectedBankQuestionId}
              initialPresetFilter={selectedBankPreset}
            />
          )}

          {activeTab === 'videos' && <VideosView />}

          {activeTab === 'solver' && <SolverView />}
        </main>

        {/* Responsive Footer */}
        <footer className="mt-auto px-4 sm:px-6 py-6 border-t border-slate-900 text-center text-xs text-slate-500 font-mono space-y-1.5 print:hidden">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span>Math 3 Reference Library</span>
            <span>·</span>
            <span>Modern Academy for Engineering & Technology</span>
            <span>·</span>
            <a
              href="https://discord.gg/p6hkRbzFTn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:underline inline-flex items-center gap-1"
            >
              <span>Discord Community</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="text-[11px] text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Differential Equations (Separable, Homogeneous, Exact, Linear, Bernoulli, Higher-Order) · Laplace Transforms · Fourier Series · Legendre Polynomials
          </div>
        </footer>

        {/* Mobile & Tablet Bottom Navigation Bar (< 1024px) */}
        <nav
          aria-label="Mobile Primary Navigation"
          className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-1 py-1 grid grid-cols-7 gap-0.5 print:hidden"
        >
          <button
            onClick={() => setActiveTab('exams')}
            className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 rounded-lg text-[10px] font-semibold transition-colors cursor-pointer min-w-0 ${
              activeTab === 'exams' ? 'text-amber-400 bg-slate-800/80 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Trophy className="w-4 h-4 shrink-0" />
            <span className="truncate max-w-full">Exam Lab</span>
          </button>
          <button
            onClick={() => setActiveTab('question_bank')}
            className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 rounded-lg text-[10px] font-semibold transition-colors cursor-pointer min-w-0 ${
              activeTab === 'question_bank' ? 'text-teal-400 bg-slate-800/80 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            <span className="truncate max-w-full">Q-Bank</span>
          </button>
          <button
            onClick={() => setActiveTab('library')}
            className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 rounded-lg text-[10px] font-semibold transition-colors cursor-pointer min-w-0 ${
              activeTab === 'library' ? 'text-teal-400 bg-slate-800/80 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4 shrink-0" />
            <span className="truncate max-w-full">Chapters</span>
          </button>
          <button
            onClick={() => setActiveTab('formulas')}
            className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 rounded-lg text-[10px] font-semibold transition-colors cursor-pointer min-w-0 ${
              activeTab === 'formulas' ? 'text-teal-300 bg-slate-800/80 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode2 className="w-4 h-4 shrink-0" />
            <span className="truncate max-w-full">Formulas</span>
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 rounded-lg text-[10px] font-semibold transition-colors cursor-pointer min-w-0 ${
              activeTab === 'quiz' ? 'text-emerald-400 bg-slate-800/80 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-4 h-4 shrink-0" />
            <span className="truncate max-w-full">Quizzes</span>
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 rounded-lg text-[10px] font-semibold transition-colors cursor-pointer min-w-0 ${
              activeTab === 'videos' ? 'text-rose-400 bg-slate-800/80 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Video className="w-4 h-4 shrink-0" />
            <span className="truncate max-w-full">Videos</span>
          </button>
          <button
            onClick={() => setActiveTab('solver')}
            className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 rounded-lg text-[10px] font-semibold transition-colors cursor-pointer min-w-0 ${
              activeTab === 'solver' ? 'text-teal-400 bg-slate-800/80 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calculator className="w-4 h-4 shrink-0" />
            <span className="truncate max-w-full">Solver</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
