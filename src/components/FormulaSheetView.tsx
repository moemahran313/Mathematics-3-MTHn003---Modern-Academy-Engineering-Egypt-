import React, { useState, useMemo } from 'react';
import {
  Code,
  Copy,
  Check,
  Search,
  Filter,
  Sparkles,
  BookOpen,
  FileCode2,
  Layers,
  ArrowRight,
  Lightbulb,
  ExternalLink,
  Download,
  Share2,
  Eye,
  Terminal,
  Bookmark
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FORMULA_SHEET_DATA, FormulaItem } from '../data/formulasData';
import { Category } from '../types';
import { MathView, FormattedText } from './MathView';

interface FormulaSheetViewProps {
  onNavigateToCategory?: (category: Category) => void;
  onNavigateToQuiz?: (category: Category) => void;
}

export const FormulaSheetView: React.FC<FormulaSheetViewProps> = ({
  onNavigateToCategory,
  onNavigateToQuiz,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChapter, setSelectedChapter] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'rendered' | 'latex' | 'split'>('rendered');
  const [copiedFormulaId, setCopiedFormulaId] = useState<string | null>(null);
  const [globalCopied, setGlobalCopied] = useState(false);

  const chapters = [
    { id: 'all', label: 'All Chapters', count: FORMULA_SHEET_DATA.length },
    { id: 'Ch. 1', label: 'Ch. 1: Foundations', prefix: 'Ch. 1' },
    { id: 'Ch. 2', label: 'Ch. 2: 1st-Order ODEs', prefix: 'Ch. 2' },
    { id: 'Ch. 3', label: 'Ch. 3: Higher-Order ODEs', prefix: 'Ch. 3' },
    { id: 'Ch. 4', label: 'Ch. 4: Laplace Transforms', prefix: 'Ch. 4' },
    { id: 'Ch. 5', label: 'Ch. 5: Fourier & Legendre', prefix: 'Ch. 5' },
  ];

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    FORMULA_SHEET_DATA.forEach((item) => {
      item.tags.forEach((t) => tagSet.add(t));
    });
    return Array.from(tagSet).sort();
  }, []);

  // Filter formulas
  const filteredFormulas = useMemo(() => {
    return FORMULA_SHEET_DATA.filter((item) => {
      // Chapter filter
      if (selectedChapter !== 'all' && !item.chapter.startsWith(selectedChapter)) {
        return false;
      }

      // Tag filter
      if (selectedTag && !item.tags.includes(selectedTag)) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchArabic = item.arabicTitle?.toLowerCase().includes(q);
        const matchLatex = item.latex.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchTip = item.arabicTip?.toLowerCase().includes(q);
        const matchTag = item.tags.some((t) => t.toLowerCase().includes(q));

        return matchTitle || matchArabic || matchLatex || matchDesc || matchTip || matchTag;
      }

      return true;
    });
  }, [selectedChapter, selectedTag, searchQuery]);

  const handleCopyLatex = (item: FormulaItem) => {
    navigator.clipboard.writeText(item.latex);
    setCopiedFormulaId(item.id);
    setTimeout(() => setCopiedFormulaId(null), 2000);
  };

  const handleCopyAllVisibleLatex = () => {
    const latexDocument = filteredFormulas
      .map(
        (f) =>
          `% ${f.title} (${f.chapter})\n% ${f.description}\n\\begin{equation}\n  ${f.latex}\n\\end{equation}\n`
      )
      .join('\n');

    navigator.clipboard.writeText(latexDocument);
    setGlobalCopied(true);
    setTimeout(() => setGlobalCopied(false), 2500);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/90 to-teal-950/30 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono font-bold">
              <FileCode2 className="w-3.5 h-3.5" />
              Centralized Equation Bank & LaTeX Reference
            </span>
            <span className="px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-400 text-xs font-mono">
              {FORMULA_SHEET_DATA.length} Core Formulas
            </span>
            <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
              LaTeX Clipboard Ready
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              Math 3 Formula Sheet
            </h1>
            <p className="mt-1 text-sm sm:text-base text-slate-400 leading-relaxed">
              Curated master equations covering Ordinary Differential Equations, Laplace Transforms, Fourier Series, and Legendre Polynomials. Copy clean LaTeX code directly for assignments, research notes, and Overleaf documents.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleCopyAllVisibleLatex}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-teal-500/15 border border-teal-500/30 hover:bg-teal-500/25 text-teal-300 text-xs font-bold transition shadow-sm"
            >
              {globalCopied ? (
                <>
                  <Check className="w-4 h-4 text-teal-400" />
                  <span>Copied {filteredFormulas.length} LaTeX Formulas!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Visible Equations as LaTeX (.tex)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Decorative background geometry */}
        <div className="absolute right-0 top-0 -mt-12 -mr-12 w-80 h-80 rounded-full bg-teal-500/5 blur-3xl pointer-events-none" />
        <div className="absolute right-12 bottom-4 opacity-5 pointer-events-none hidden lg:block">
          <FileCode2 className="w-44 h-44 text-teal-300" />
        </div>
      </div>

      {/* Control Filters Bar */}
      <div className="space-y-4">
        {/* Search & View Mode Switcher */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search equations, topics, LaTeX syntax, or Arabic keywords..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-750 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>

          {/* View Mode Switcher: Rendered vs LaTeX vs Split */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setViewMode('rendered')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === 'rendered'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Standard Math</span>
            </button>
            <button
              onClick={() => setViewMode('latex')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === 'latex'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>LaTeX Code</span>
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === 'split'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Combined</span>
            </button>
          </div>
        </div>

        {/* Chapter Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {chapters.map((ch) => {
            const count =
              ch.id === 'all'
                ? FORMULA_SHEET_DATA.length
                : FORMULA_SHEET_DATA.filter((f) => f.chapter.startsWith(ch.id)).length;
            const isSelected = selectedChapter === ch.id;

            return (
              <button
                key={ch.id}
                onClick={() => {
                  setSelectedChapter(ch.id);
                  setSelectedTag(null);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                  isSelected
                    ? 'bg-slate-800 text-teal-400 border-teal-500/40 shadow-sm'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800/80 hover:text-slate-200'
                }`}
              >
                <span>{ch.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    isSelected ? 'bg-teal-500/20 text-teal-300' : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Popular Topic Tags Filter */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs text-slate-400 flex items-center gap-1 font-mono mr-1">
            <Filter className="w-3 h-3" /> Filter by topic:
          </span>
          {allTags.slice(0, 14).map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`text-[11px] px-2.5 py-1 rounded-lg font-mono transition border ${
                selectedTag === tag
                  ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                  : 'bg-slate-900/70 text-slate-400 border-slate-800 hover:text-slate-300'
              }`}
            >
              #{tag}
            </button>
          ))}
          {selectedTag && (
            <button
              onClick={() => setSelectedTag(null)}
              className="text-[11px] px-2 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 hover:bg-red-500/20 transition"
            >
              Reset Tag
            </button>
          )}
        </div>
      </div>

      {/* Formulas Grid List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Showing {filteredFormulas.length} of {FORMULA_SHEET_DATA.length} equations</span>
          <span className="hidden sm:inline">Click "Copy LaTeX" on any card for instant clipboard export</span>
        </div>

        {filteredFormulas.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-12 text-center text-slate-400">
            <p className="text-sm font-semibold">No formulas matched your search query or filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedChapter('all');
                setSelectedTag(null);
              }}
              className="mt-3 text-xs text-teal-400 hover:underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {filteredFormulas.map((item) => {
              const isCopied = copiedFormulaId === item.id;

              return (
                <div
                  key={item.id}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/90 p-5 sm:p-6 transition-all duration-200 hover:border-slate-700 hover:shadow-lg hover:shadow-teal-950/20"
                >
                  <div className="space-y-4">
                    {/* Top Row: Chapter Badge & Copy LaTeX Button */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300 text-[11px] font-mono font-bold">
                          {item.chapter}
                        </span>
                      </div>

                      {/* Copy LaTeX Button */}
                      <button
                        onClick={() => handleCopyLatex(item)}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all shadow-sm ${
                          isCopied
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-slate-800/80 text-slate-300 hover:text-teal-300 hover:bg-slate-750 border border-slate-700'
                        }`}
                        title="Copy LaTeX source code to clipboard"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copied LaTeX!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-300" />
                            <span>Copy LaTeX</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Title & Arabic Subtitle */}
                    <div>
                      <h3 className="text-base font-bold text-slate-100 group-hover:text-teal-300 transition-colors">
                        {item.title}
                      </h3>
                      {item.arabicTitle && (
                        <p className="text-xs text-teal-400/90 font-arabic font-medium mt-0.5">
                          {item.arabicTitle}
                        </p>
                      )}
                    </div>

                    {/* Formula Render Container */}
                    {(viewMode === 'rendered' || viewMode === 'split') && (
                      <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 overflow-x-auto shadow-inner">
                        <MathView
                          math={item.displayLatex || item.latex}
                          block={true}
                          className="text-slate-100 text-base sm:text-lg"
                        />
                      </div>
                    )}

                    {/* Raw LaTeX Code View */}
                    {(viewMode === 'latex' || viewMode === 'split') && (
                      <div className="relative rounded-xl border border-slate-800 bg-slate-950 p-3.5 font-mono text-xs text-teal-300 overflow-x-auto">
                        <div className="flex items-center justify-between text-[10px] text-slate-500 pb-1.5 border-b border-slate-850 mb-1.5">
                          <span>LaTeX String</span>
                          <span>Click code to copy</span>
                        </div>
                        <code
                          onClick={() => handleCopyLatex(item)}
                          className="block cursor-pointer hover:text-teal-200 select-all"
                        >
                          {item.latex}
                        </code>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Arabic Tip / Golden Exam Note */}
                    {item.arabicTip && (
                      <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/20 bg-amber-950/20 p-3 text-xs text-amber-200/90 font-arabic leading-relaxed">
                        <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-amber-300 block font-sans font-bold text-[11px] mb-0.5">
                            Exam Pro-Tip (ملاحظة وتريك الامتحان):
                          </strong>
                          <span>{item.arabicTip}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Footer: Tags & Navigation Links */}
                  <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {item.tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setSelectedTag(tag)}
                          className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono hover:text-teal-300 transition"
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>

                    {/* Jump to Chapter/Quiz */}
                    {onNavigateToCategory && (
                      <button
                        onClick={() => onNavigateToCategory(item.category)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-teal-400 hover:text-teal-300 transition group/link"
                      >
                        <span>Open Topic</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
