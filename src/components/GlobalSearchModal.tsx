import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Search,
  X,
  BookOpen,
  Calculator,
  Trophy,
  Video,
  FileText,
  Bookmark,
  ChevronRight,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { TOPICS_DATA } from '../data/topicsData';
import { PRACTICE_PROBLEMS_DATA } from '../data/practiceProblemsData';
import { EXAMS_DATA } from '../data/examsData';
import { GLOSSARY_DATA } from '../data/glossaryData';
import { PLAYLISTS_DATA } from '../data/videosData';
import { LECTURE_1_PAGES } from '../data/lecture1Data';
import { LECTURE_2_PAGES } from '../data/lecture2Data';
import { SearchResultItem, Category } from '../types';
import { MathView, FormattedText } from './MathView';
import { motion, AnimatePresence } from 'motion/react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string, options?: { category?: Category; id?: string }) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSelectedType('all');
    }
  }, [isOpen]);

  // Keyboard shortcut ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Construct comprehensive search index
  const allSearchItems = useMemo<SearchResultItem[]>(() => {
    const items: SearchResultItem[] = [];

    // 1. Chapters & Topics
    TOPICS_DATA.forEach((topic) => {
      items.push({
        id: `topic_${topic.id}`,
        title: topic.summary,
        type: 'topic',
        category: topic.category,
        subtitle: `${topic.arabicTitle} • Ch. Reference`,
        snippet: topic.details,
        targetTab: 'library',
        targetId: topic.id,
      });

      // Individual formulas
      topic.equations.forEach((eq) => {
        items.push({
          id: `eq_${eq.id}`,
          title: eq.description,
          type: 'formula',
          category: topic.category,
          subtitle: `Formula in ${topic.category}`,
          snippet: eq.arabicTip || topic.summary,
          formula: eq.formula,
          targetTab: 'library',
          targetId: topic.id,
        });
      });
    });

    // 2. Practice Problems
    PRACTICE_PROBLEMS_DATA.forEach((prob) => {
      items.push({
        id: `practice_${prob.id}`,
        title: prob.question,
        type: 'practice',
        category: prob.category,
        subtitle: `Difficulty: ${prob.difficulty} • Techniques: ${prob.techniques.join(', ')}`,
        snippet: `Final Answer: ${prob.finalAnswer}. Steps: ${prob.steps.map((s) => s.title).join(' → ')}`,
        formula: prob.finalAnswer,
        targetTab: 'quiz',
        targetId: prob.id,
      });
    });

    // 3. Exam Questions
    EXAMS_DATA.forEach((exam) => {
      exam.questions.forEach((q) => {
        items.push({
          id: `exam_${exam.id}_${q.id}`,
          title: `${exam.title} - Question ${q.questionNumber}: ${q.title}`,
          type: 'exam',
          category: q.category,
          subtitle: `${exam.courseCode} • ${exam.semester} ${exam.year} (${q.points} pts)`,
          snippet: q.tricksAndMistakes || q.problemText || exam.title,
          formula: q.problemFormula,
          targetTab: 'exams',
          targetId: q.id,
        });
      });
    });

    // 4. Glossary Terms
    GLOSSARY_DATA.forEach((term) => {
      items.push({
        id: `glossary_${term.id}`,
        title: `${term.term} ${term.arabicTerm ? `(${term.arabicTerm})` : ''}`,
        type: 'glossary',
        category: term.category,
        subtitle: `${term.chapter} • Definition`,
        snippet: `${term.definition} Example: ${term.example.problem}`,
        formula: term.formula || term.example.formula,
        targetTab: 'glossary',
        targetId: term.id,
      });
    });

    // 5. Video Playlists & Lessons
    PLAYLISTS_DATA.forEach((pl) => {
      items.push({
        id: `video_pl_${pl.id}`,
        title: pl.title,
        type: 'video',
        category: pl.category,
        subtitle: `Video Course • Channel: ${pl.channel}`,
        snippet: pl.description,
        targetTab: 'videos',
        targetId: pl.id,
      });

      pl.items.forEach((vItem) => {
        items.push({
          id: `video_item_${vItem.id}`,
          title: vItem.title,
          type: 'video',
          category: pl.category,
          subtitle: `Lesson (${vItem.duration || 'Video'}) in ${pl.title}`,
          snippet: `Video lesson covering ${pl.category}`,
          formula: vItem.problemFormula,
          targetTab: 'videos',
          targetId: pl.id,
        });
      });
    });

    // 6. Lecture Handout Pages & Solved Examples (Weeks 1 & 2)
    [...LECTURE_1_PAGES, ...LECTURE_2_PAGES].forEach((page) => {
      const lecNum = page.pageNumber <= 4 ? 1 : 2;
      items.push({
        id: `lec_page_${page.pageNumber}`,
        title: `Lecture ${lecNum}: Page [${page.pageNumber}] - ${page.title}`,
        type: 'lecture',
        category: page.topicCategory,
        subtitle: `${page.arabicTitle} • Lecture ${lecNum} Handout`,
        snippet: page.summary,
        targetTab: 'library',
        targetId: `lecture-page-${page.pageNumber}`,
      });

      page.laws.forEach((law) => {
        items.push({
          id: `lec_law_${law.id}`,
          title: `${law.name} ${law.arabicName ? `(${law.arabicName})` : ''}`,
          type: 'lecture',
          category: page.topicCategory,
          subtitle: `Lecture ${lecNum} Law • Page ${page.pageNumber}`,
          snippet: `${law.explanation} ${law.arabicExplanation || ''}`,
          formula: law.formula,
          targetTab: 'library',
          targetId: `lecture-page-${page.pageNumber}`,
        });
      });

      page.examples?.forEach((eg) => {
        items.push({
          id: `lec_eg_${eg.id}`,
          title: `Lecture ${lecNum}: ${eg.title}`,
          type: 'lecture',
          category: page.topicCategory,
          subtitle: `Handout Solved Example • Page ${page.pageNumber}`,
          snippet: `Problem: ${eg.problem} Solution: ${eg.finalAnswer}`,
          formula: eg.mathFormula || eg.finalAnswer,
          targetTab: 'library',
          targetId: `lecture-page-${page.pageNumber}`,
        });
      });
    });

    return items;
  }, []);

  // Filter items according to search query and type
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

    return allSearchItems.filter((item) => {
      if (selectedType !== 'all' && item.type !== selectedType) {
        return false;
      }

      const searchableText = `${item.title} ${item.subtitle} ${item.snippet} ${item.category} ${item.formula || ''}`.toLowerCase();

      return terms.every((term) => searchableText.includes(term));
    });
  }, [query, selectedType, allSearchItems]);

  const typeTabs = [
    { id: 'all', label: 'All Results' },
    { id: 'lecture', label: 'Lecture Notes (Weeks 1 & 2)' },
    { id: 'topic', label: 'Chapters' },
    { id: 'formula', label: 'Formulas' },
    { id: 'practice', label: 'Practice Problems' },
    { id: 'exam', label: 'Past Exams' },
    { id: 'glossary', label: 'Glossary' },
    { id: 'video', label: 'Videos' },
  ];

  const quickSearchQueries = [
    'Lecture 1',
    'Order and Degree',
    'Separable',
    'Homogeneous',
    'Bernoulli',
    'Exact ODE',
    'Integrating Factor',
    'First Shift',
    'Inverse Laplace',
    'Wronskian',
    'Legendre Orthogonality',
    'Fourier Sine',
    'Undetermined Coefficients',
  ];

  const handleSelectResult = (item: SearchResultItem) => {
    onNavigate(item.targetTab, {
      category: item.category,
      id: item.targetId,
    });
    onClose();
  };

  const getTypeIcon = (type: SearchResultItem['type']) => {
    switch (type) {
      case 'lecture':
        return <Sparkles className="w-4 h-4 text-teal-300" />;
      case 'topic':
        return <BookOpen className="w-4 h-4 text-teal-400" />;
      case 'formula':
        return <Calculator className="w-4 h-4 text-cyan-400" />;
      case 'practice':
        return <Zap className="w-4 h-4 text-emerald-400" />;
      case 'exam':
        return <Trophy className="w-4 h-4 text-amber-400" />;
      case 'glossary':
        return <Bookmark className="w-4 h-4 text-indigo-400" />;
      case 'video':
        return <Video className="w-4 h-4 text-rose-400" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-12 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -10 }}
        className="relative w-full max-w-3xl rounded-3xl border border-slate-750 bg-slate-900/95 shadow-2xl overflow-hidden z-10 my-auto text-slate-100 flex flex-col max-h-[85vh]"
      >
        {/* Search Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/60 flex items-center gap-3">
          <Search className="w-5 h-5 text-teal-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type keywords (e.g. 'Wronskian', 'Bernoulli', 'Laplace shift', 'Legendre')..."
            className="flex-1 bg-transparent text-sm sm:text-base text-slate-100 placeholder-slate-500 outline-hidden font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-200 text-xs cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-slate-200 border border-slate-700 text-xs font-mono transition-colors cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Filter Badges Bar */}
        <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {typeTabs.map((tab) => {
            const count =
              query.trim() && tab.id !== 'all'
                ? searchResults.filter((r) => r.type === tab.id).length
                : tab.id === 'all'
                ? searchResults.length
                : 0;

            const isSelected = selectedType === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setSelectedType(tab.id)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-teal-500/20 border-teal-500/40 text-teal-300 font-bold'
                    : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{tab.label}</span>
                {query.trim() && <span className="ml-1 text-[10px] font-mono opacity-70">({count})</span>}
              </button>
            );
          })}
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 divide-y divide-slate-850">
          {!query.trim() ? (
            /* Empty state: Suggestions & Quick Keywords */
            <div className="py-6 space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 block">
                  Quick Search Topics
                </span>
                <p className="text-xs text-slate-400 font-sans">
                  Click any frequent term to search the Math 3 curriculum instantly:
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {quickSearchQueries.map((q) => (
                  <button
                    key={q}
                    onClick={() => setQuery(q)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-teal-300 text-xs font-medium border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-teal-400" />
                    <span>{q}</span>
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-800/60 text-xs text-slate-500 font-mono flex items-center justify-between">
                <span>Indexes 40+ Glossary Terms, 17 ODE Categories, Exam Papers & Formulas</span>
                <span className="hidden sm:inline">Press ↵ or click to open</span>
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            /* No Results Found */
            <div className="py-12 text-center space-y-2">
              <Search className="w-8 h-8 text-slate-600 mx-auto" />
              <h3 className="text-sm font-bold text-slate-300">
                No results found for &ldquo;{query}&rdquo;
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try searching for a different keyword or checking the filter tabs above.
              </p>
            </div>
          ) : (
            /* List of Search Results */
            <div className="space-y-2 pt-1">
              <div className="text-[11px] font-mono text-slate-500 pb-1">
                Found {searchResults.length} matching items across curriculum content:
              </div>

              {searchResults.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectResult(item)}
                  className="w-full p-4 rounded-2xl border border-slate-800 hover:border-teal-500/40 bg-slate-950/40 hover:bg-slate-850/60 text-left transition-all space-y-2 group cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 shrink-0">
                        {getTypeIcon(item.type)}
                      </div>
                      <span className="text-[10px] uppercase font-mono font-bold text-teal-400 tracking-wider">
                        {item.type} • {item.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500 group-hover:text-teal-300 transition-colors shrink-0">
                      <span>Jump to {item.targetTab}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-100 group-hover:text-teal-200 transition-colors">
                      <FormattedText text={item.title} />
                    </h4>
                    <span className="text-[11px] text-slate-400 font-mono block">
                      {item.subtitle}
                    </span>
                  </div>

                  {item.snippet && (
                    <p className="text-xs text-slate-400 font-sans line-clamp-2 leading-relaxed">
                      <FormattedText text={item.snippet} />
                    </p>
                  )}

                  {item.formula && (
                    <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-teal-300 text-xs overflow-x-auto no-scrollbar">
                      <MathView math={item.formula} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 px-5 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <span>Navigation shortcut:</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              Ctrl
            </kbd>
            <span>+</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              K
            </kbd>
          </div>
          <span>Modern Academy Curriculum Search</span>
        </div>
      </motion.div>
    </div>
  );
};
