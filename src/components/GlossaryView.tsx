import React, { useState, useMemo } from 'react';
import { BookOpen, Search, Sparkles, Filter, ChevronDown, ChevronUp, Copy, Check, Lightbulb, ArrowRight, Bookmark, Layers, RotateCw } from 'lucide-react';
import { GLOSSARY_DATA } from '../data/glossaryData';
import { GlossaryTerm, Category } from '../types';
import { MathView, FormattedText } from './MathView';
import { GlossaryFlashcards } from './GlossaryFlashcards';

interface GlossaryViewProps {
  initialTermId?: string;
  onNavigateToTopic?: (category: Category) => void;
  initialMode?: 'list' | 'flashcards';
}

export const GlossaryView: React.FC<GlossaryViewProps> = ({ initialTermId, onNavigateToTopic, initialMode = 'list' }) => {
  const [viewMode, setViewMode] = useState<'list' | 'flashcards'>(initialMode);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChapter, setSelectedChapter] = useState<string>('all');
  const [expandedExamples, setExpandedExamples] = useState<Record<string, boolean>>({});
  const [copiedTermId, setCopiedTermId] = useState<string | null>(null);
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const chapters = [
    { id: 'all', label: 'All Terms', count: GLOSSARY_DATA.length },
    { id: 'Ch. 1', label: 'Ch. 1: Foundations', prefix: 'Ch. 1' },
    { id: 'Ch. 2', label: 'Ch. 2: First-Order ODEs', prefix: 'Ch. 2' },
    { id: 'Ch. 3', label: 'Ch. 3: Higher-Order ODEs', prefix: 'Ch. 3' },
    { id: 'Ch. 4', label: 'Ch. 4: Laplace Transforms', prefix: 'Ch. 4' },
    { id: 'Ch. 5', label: 'Ch. 5: Fourier & Legendre', prefix: 'Ch. 5' },
  ];

  // Available initial letters
  const alphabet = useMemo(() => {
    const letters = new Set<string>();
    GLOSSARY_DATA.forEach((term) => {
      const first = term.term.charAt(0).toUpperCase();
      if (/[A-Z]/.test(first)) letters.add(first);
    });
    return Array.from(letters).sort();
  }, []);

  const filteredTerms = useMemo(() => {
    return GLOSSARY_DATA.filter((item) => {
      // Chapter filter
      if (selectedChapter !== 'all') {
        if (!item.chapter.startsWith(selectedChapter)) return false;
      }

      // Letter filter
      if (activeLetter) {
        if (!item.term.toUpperCase().startsWith(activeLetter)) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTerm = item.term.toLowerCase().includes(q);
        const matchesArabic = item.arabicTerm?.toLowerCase().includes(q);
        const matchesDef = item.definition.toLowerCase().includes(q);
        const matchesExample = item.example.problem.toLowerCase().includes(q) || item.example.solution.toLowerCase().includes(q);
        const matchesNote = item.noteOrTrap?.toLowerCase().includes(q);
        const matchesRelated = item.relatedTerms?.some((r) => r.toLowerCase().includes(q));

        return matchesTerm || matchesArabic || matchesDef || matchesExample || matchesNote || matchesRelated;
      }

      return true;
    });
  }, [selectedChapter, activeLetter, searchQuery]);

  const toggleExample = (termId: string) => {
    setExpandedExamples((prev) => ({
      ...prev,
      [termId]: !prev[termId],
    }));
  };

  const handleCopyDefinition = (item: GlossaryTerm) => {
    const textToCopy = `${item.term} (${item.arabicTerm || ''}):\n${item.definition}\n\nExample: ${item.example.problem}\nSolution: ${item.example.solution}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedTermId(item.id);
    setTimeout(() => setCopiedTermId(null), 2000);
  };

  const handleRelatedClick = (relatedTermName: string) => {
    setSearchQuery(relatedTermName);
    setSelectedChapter('all');
    setActiveLetter(null);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-linear-to-br from-slate-900 via-slate-900/90 to-teal-950/30 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono font-bold">
              <Bookmark className="w-3.5 h-3.5" />
              Curriculum Vocabulary & Mathematical Lexicon
            </span>
            <span className="px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-400 text-xs font-mono">
              {GLOSSARY_DATA.length} Standard Terms
            </span>
            <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
              Interactive 3D Flashcards
            </span>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              Math 3 Mathematical Glossary
            </h1>
            <p className="text-base font-arabic text-teal-400 font-medium">
              معجم المصطلحات والمفاهيم الرياضية الشامل لمقرر رياضيات 3
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans max-w-2xl">
            Every core mathematical term across differential equations, Laplace operational methods, Fourier harmonic expansions, and Legendre special functions. Study with the comprehensive A-Z lexicon or test your retention with animated flip-card flashcards.
          </p>

          {/* Mode Switcher Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                viewMode === 'list'
                  ? 'bg-teal-500 text-slate-950 shadow-teal-500/20 font-extrabold'
                  : 'bg-slate-800/90 text-slate-300 hover:bg-slate-750 border border-slate-700'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Lexicon A-Z List</span>
            </button>

            <button
              onClick={() => setViewMode('flashcards')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                viewMode === 'flashcards'
                  ? 'bg-indigo-500 text-white shadow-indigo-500/25 font-extrabold'
                  : 'bg-slate-800/90 text-indigo-300 hover:bg-slate-750 border border-indigo-500/30'
              }`}
            >
              <RotateCw className="w-4 h-4" />
              <span>Interactive Flashcards (Flip & Test)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Render Flashcards Mode */}
      {viewMode === 'flashcards' ? (
        <GlossaryFlashcards
          onNavigateToTopic={onNavigateToTopic}
          onSwitchToListView={() => setViewMode('list')}
        />
      ) : (
        /* Render Standard Lexicon List Mode */
        <div className="space-y-6">
          {/* Search & Filtering Controls */}
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value) setActiveLetter(null);
                }}
                placeholder="Search glossary by term, definition, or concept (e.g., 'Wronskian', 'Bernoulli', 'Shift', 'Legendre')..."
                className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20 text-sm text-slate-200 placeholder-slate-500 outline-hidden transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200 bg-slate-800 px-2 py-1 rounded-lg border border-slate-700 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Chapter Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {chapters.map((ch) => {
                const isActive = selectedChapter === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => setSelectedChapter(ch.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                      isActive
                        ? 'bg-teal-500/15 border-teal-500/30 text-teal-300 font-bold shadow-xs'
                        : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                    }`}
                  >
                    {ch.label}
                  </button>
                );
              })}
            </div>

            {/* Alphabet Quick-Jump Bar */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-[11px] font-mono text-slate-500 mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" /> A-Z Jump:
              </span>
              <button
                onClick={() => setActiveLetter(null)}
                className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold transition-colors cursor-pointer ${
                  activeLetter === null
                    ? 'bg-teal-400 text-slate-950'
                    : 'bg-slate-800/70 text-slate-400 hover:text-slate-200'
                }`}
              >
                All
              </button>
              {alphabet.map((letter) => {
                const isSelected = activeLetter === letter;
                return (
                  <button
                    key={letter}
                    onClick={() => {
                      setActiveLetter(isSelected ? null : letter);
                      setSearchQuery('');
                    }}
                    className={`w-6 h-6 rounded-md text-[10px] font-mono font-bold transition-all flex items-center justify-center cursor-pointer ${
                      isSelected
                        ? 'bg-teal-400 text-slate-950 font-black shadow-xs'
                        : 'bg-slate-800/60 text-slate-400 hover:text-slate-100 hover:bg-slate-700'
                    }`}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          </div>

      {/* Results Count & Current Filter Info */}
      <div className="flex items-center justify-between text-xs text-slate-400 font-mono px-1">
        <span>
          Showing <strong className="text-teal-400">{filteredTerms.length}</strong> of{' '}
          {GLOSSARY_DATA.length} mathematical terms
        </span>
        {(searchQuery || selectedChapter !== 'all' || activeLetter) && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedChapter('all');
              setActiveLetter(null);
            }}
            className="text-[11px] text-teal-400 hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Glossary Terms Grid */}
      {filteredTerms.length === 0 ? (
        <div className="text-center py-16 rounded-3xl border border-slate-800 bg-slate-900/40 space-y-3">
          <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-300">No glossary terms matched your query</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try searching for terms like "Separable", "Wronskian", "Bernoulli", "First Shift", or "Legendre".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedChapter('all');
              setActiveLetter(null);
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 text-teal-400 text-xs font-bold border border-slate-700 cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredTerms.map((item) => {
            const isExpanded = expandedExamples[item.id] !== false; // default expanded or toggleable
            const isCopied = copiedTermId === item.id;

            return (
              <article
                key={item.id}
                id={`glossary-${item.id}`}
                className="p-6 sm:p-7 rounded-3xl border bg-slate-900/70 border-slate-800 hover:border-slate-700 transition-all shadow-md space-y-5"
              >
                {/* Term Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-800/80">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg sm:text-xl font-extrabold text-slate-100 tracking-tight">
                        {item.term}
                      </h2>
                      {item.arabicTerm && (
                        <span className="px-2.5 py-0.5 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-300 font-arabic text-xs font-semibold">
                          {item.arabicTerm}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                        {item.chapter}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <button
                      onClick={() => handleCopyDefinition(item)}
                      title="Copy term definition and example"
                      className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-750 text-slate-400 hover:text-slate-200 border border-slate-700 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-[10px] text-emerald-400 font-mono">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-mono">Copy</span>
                        </>
                      )}
                    </button>
                    {onNavigateToTopic && (
                      <button
                        onClick={() => onNavigateToTopic(item.category)}
                        title="View chapter formulas & details"
                        className="p-2 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 border border-teal-500/20 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span className="text-[10px] font-mono">View Chapter</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Definition Body */}
                <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                  <p className="font-sans">
                    <FormattedText text={item.definition} />
                  </p>

                  {item.formula && (
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-850 shadow-inner overflow-x-auto no-scrollbar text-teal-300">
                      <MathView math={item.formula} block />
                    </div>
                  )}
                </div>

                {/* Illustrative Example Section */}
                <div className="rounded-2xl border border-slate-800/90 bg-slate-950/60 overflow-hidden">
                  <button
                    onClick={() => toggleExample(item.id)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-slate-900/60 hover:bg-slate-900 text-left text-xs font-bold text-slate-300 border-b border-slate-800/60 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                      <span>Illustrative Mathematical Example</span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="p-4 sm:p-5 space-y-3.5 text-xs sm:text-sm">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-mono font-bold text-slate-500 block">
                          Problem Statement
                        </span>
                        <p className="text-slate-200 font-semibold">
                          <FormattedText text={item.example.problem} />
                        </p>
                      </div>

                      {item.example.formula && (
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 text-xs sm:text-sm overflow-x-auto no-scrollbar">
                          <MathView math={item.example.formula} block />
                        </div>
                      )}

                      <div className="space-y-1 pt-1 border-t border-slate-850">
                        <span className="text-[10px] uppercase font-mono font-bold text-teal-400 block">
                          Resolution / Step-by-Step Application
                        </span>
                        <p className="text-slate-300 leading-relaxed font-sans text-xs sm:text-sm">
                          <FormattedText text={item.example.solution} />
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Examiner Note / Common Pitfall */}
                {item.noteOrTrap && (
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 flex items-start gap-2.5">
                    <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-400 font-mono mr-1">Examiner Note & Pitfall:</strong>
                      <FormattedText text={item.noteOrTrap} />
                    </div>
                  </div>
                )}

                {/* Related Terms Cross-Links */}
                {item.relatedTerms && item.relatedTerms.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
                    <span className="text-[10px] font-mono text-slate-500 mr-1">Related Terms:</span>
                    {item.relatedTerms.map((rel, rIdx) => (
                      <button
                        key={rIdx}
                        onClick={() => handleRelatedClick(rel)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-teal-300 text-[11px] font-medium border border-slate-700/60 transition-colors cursor-pointer"
                      >
                        {rel}
                      </button>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
        </div>
      )}
    </div>
  );
};
