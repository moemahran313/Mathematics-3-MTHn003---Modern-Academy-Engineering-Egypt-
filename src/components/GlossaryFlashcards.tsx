import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  BookOpen,
  Eye,
  Check,
  RotateCcw,
  Volume2,
  Bookmark,
  Layers,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GlossaryTerm, Category } from '../types';
import { GLOSSARY_DATA } from '../data/glossaryData';
import { MathView, FormattedText } from './MathView';

interface GlossaryFlashcardsProps {
  onNavigateToTopic?: (category: Category) => void;
  onSwitchToListView?: () => void;
}

const STORAGE_KEY = 'math3_flashcards_mastered';

export const GlossaryFlashcards: React.FC<GlossaryFlashcardsProps> = ({
  onNavigateToTopic,
  onSwitchToListView,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<string>('all');
  const [masteryFilter, setMasteryFilter] = useState<'all' | 'unmastered' | 'mastered'>('all');
  const [masteredIds, setMasteredIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [deck, setDeck] = useState<GlossaryTerm[]>(() => [...GLOSSARY_DATA]);

  // Persist mastered IDs
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(masteredIds));
    } catch (e) {
      console.error('Failed to save flashcards mastery to localStorage', e);
    }
  }, [masteredIds]);

  const chapters = [
    { id: 'all', label: 'All Chapters', count: GLOSSARY_DATA.length },
    { id: 'Ch. 1', label: 'Ch. 1: Foundations' },
    { id: 'Ch. 2', label: 'Ch. 2: 1st-Order ODEs' },
    { id: 'Ch. 3', label: 'Ch. 3: Higher-Order ODEs' },
    { id: 'Ch. 4', label: 'Ch. 4: Laplace Transforms' },
    { id: 'Ch. 5', label: 'Ch. 5: Fourier & Legendre' },
  ];

  // Filtered deck based on chapter and mastery status
  const filteredDeck = useMemo(() => {
    return deck.filter((term) => {
      // Chapter filter
      if (selectedChapter !== 'all' && !term.chapter.startsWith(selectedChapter)) {
        return false;
      }

      // Mastery filter
      const isMastered = masteredIds.includes(term.id);
      if (masteryFilter === 'mastered' && !isMastered) return false;
      if (masteryFilter === 'unmastered' && isMastered) return false;

      return true;
    });
  }, [deck, selectedChapter, masteryFilter, masteredIds]);

  // Ensure current index is within bounds
  useEffect(() => {
    if (currentIndex >= filteredDeck.length && filteredDeck.length > 0) {
      setCurrentIndex(0);
    }
    setIsFlipped(false);
  }, [selectedChapter, masteryFilter, filteredDeck.length]);

  const currentCard = filteredDeck[currentIndex] || null;
  const isCurrentMastered = currentCard ? masteredIds.includes(currentCard.id) : false;

  // Toggle Flip
  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (filteredDeck.length === 0) return;
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredDeck.length);
    }, 150);
  }, [filteredDeck.length]);

  const handlePrev = useCallback(() => {
    if (filteredDeck.length === 0) return;
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + filteredDeck.length) % filteredDeck.length);
    }, 150);
  }, [filteredDeck.length]);

  // Shuffle Deck
  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
  };

  // Toggle Mastery for current card
  const toggleMastery = (termId: string) => {
    setMasteredIds((prev) => {
      if (prev.includes(termId)) {
        return prev.filter((id) => id !== termId);
      } else {
        return [...prev, termId];
      }
    });
  };

  // Reset all mastery
  const handleResetMastery = () => {
    if (window.confirm('Reset all flashcard progress?')) {
      setMasteredIds([]);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        handleFlip();
      } else if (e.key === 'ArrowRight' || e.key === 'l' || e.key === 'j') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'h' || e.key === 'k') {
        e.preventDefault();
        handlePrev();
      } else if (e.key.toLowerCase() === 'm' && currentCard) {
        e.preventDefault();
        toggleMastery(currentCard.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFlip, handleNext, handlePrev, currentCard]);

  const masteredCountInChapter = useMemo(() => {
    if (selectedChapter === 'all') return masteredIds.length;
    return GLOSSARY_DATA.filter(
      (t) => t.chapter.startsWith(selectedChapter) && masteredIds.includes(t.id)
    ).length;
  }, [selectedChapter, masteredIds]);

  const totalInChapter = useMemo(() => {
    if (selectedChapter === 'all') return GLOSSARY_DATA.length;
    return GLOSSARY_DATA.filter((t) => t.chapter.startsWith(selectedChapter)).length;
  }, [selectedChapter]);

  const progressPercentage = Math.round(
    totalInChapter > 0 ? (masteredCountInChapter / totalInChapter) * 100 : 0
  );

  return (
    <div className="space-y-6">
      {/* Top Controls & Deck Progress Bar */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 sm:p-6 space-y-4 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-bold">
                🎴 Flashcard Retention Arena
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {masteredCountInChapter} / {totalInChapter} Mastered ({progressPercentage}%)
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Flip through mathematical concepts. Use <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-300">Space</kbd> to flip and <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-300">←</kbd> <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-300">→</kbd> to navigate.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShuffle}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold border border-slate-700 transition"
              title="Shuffle card deck"
            >
              <Shuffle className="w-3.5 h-3.5 text-teal-400" />
              <span>Shuffle</span>
            </button>
            <button
              onClick={onSwitchToListView}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold border border-slate-700 transition"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span>Lexicon List View</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden border border-slate-750">
          <div
            className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Filters: Chapter + Mastery */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          {/* Chapter selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {chapters.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setSelectedChapter(ch.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition border ${
                  selectedChapter === ch.id
                    ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40 shadow-sm'
                    : 'bg-slate-850 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {ch.label}
              </button>
            ))}
          </div>

          {/* Mastery status tabs */}
          <div className="flex items-center gap-1 bg-slate-850 p-1 rounded-xl border border-slate-800 shrink-0">
            <button
              onClick={() => setMasteryFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                masteryFilter === 'all'
                  ? 'bg-slate-750 text-slate-200 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({totalInChapter})
            </button>
            <button
              onClick={() => setMasteryFilter('unmastered')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                masteryFilter === 'unmastered'
                  ? 'bg-amber-500/20 text-amber-300 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Needs Review ({totalInChapter - masteredCountInChapter})
            </button>
            <button
              onClick={() => setMasteryFilter('mastered')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                masteryFilter === 'mastered'
                  ? 'bg-emerald-500/20 text-emerald-300 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Mastered ({masteredCountInChapter})
            </button>
          </div>
        </div>
      </div>

      {/* Main Flashcard Display */}
      {filteredDeck.length === 0 ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-12 text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-200">
            {masteryFilter === 'unmastered'
              ? '🎉 Excellent! All terms in this selection have been mastered!'
              : 'No cards match this filter.'}
          </h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Switch your filter back to "All" or choose another chapter to continue reviewing.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setMasteryFilter('all');
                setSelectedChapter('all');
              }}
              className="px-4 py-2 rounded-xl bg-teal-500 text-slate-950 text-xs font-bold hover:bg-teal-400 transition"
            >
              Reset Filters
            </button>
          </div>
        </div>
      ) : currentCard ? (
        <div className="space-y-6">
          {/* 3D Perspective Card Container */}
          <div
            className="w-full min-h-[420px] sm:min-h-[460px] perspective-1000 cursor-pointer select-none"
            onClick={handleFlip}
          >
            <div
              className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* ======================================================== */}
              {/* FRONT OF FLASHCARD */}
              {/* ======================================================== */}
              <div
                className={`w-full min-h-[420px] sm:min-h-[460px] rounded-3xl border border-slate-750 bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 p-6 sm:p-10 shadow-2xl flex flex-col justify-between backface-hidden transition-all ${
                  isCurrentMastered
                    ? 'ring-1 ring-emerald-500/40 border-emerald-500/30'
                    : 'hover:border-teal-500/40'
                }`}
              >
                {/* Card Top Metadata */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono font-bold">
                      {currentCard.chapter}
                    </span>
                    {isCurrentMastered && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                        <Check className="w-3 h-3" /> Mastered
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-mono text-slate-500">
                    Card {currentIndex + 1} of {filteredDeck.length}
                  </span>
                </div>

                {/* Card Center: Term Prompt */}
                <div className="my-auto py-8 text-center space-y-4">
                  <span className="inline-block text-xs font-mono font-bold text-teal-400 uppercase tracking-widest bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full">
                    Term & Concept
                  </span>

                  <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
                    {currentCard.term}
                  </h2>

                  {currentCard.arabicTerm && (
                    <p className="text-xl sm:text-2xl text-teal-300/90 font-arabic font-semibold">
                      {currentCard.arabicTerm}
                    </p>
                  )}

                  <p className="text-sm text-slate-400 max-w-lg mx-auto pt-2">
                    Can you recall the mathematical definition, key formula, and standard exam trap for this topic?
                  </p>
                </div>

                {/* Card Bottom Hint */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 text-teal-400 font-medium">
                    <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
                    Click anywhere or press Space to reveal answer
                  </span>
                  <span className="font-mono text-slate-500 hidden sm:inline">
                    Math 3 Flashcard Deck
                  </span>
                </div>
              </div>

              {/* ======================================================== */}
              {/* BACK OF FLASHCARD */}
              {/* ======================================================== */}
              <div
                className={`absolute inset-0 w-full min-h-[420px] sm:min-h-[460px] rounded-3xl border border-slate-750 bg-gradient-to-br from-slate-900 via-slate-850 to-indigo-950/40 p-6 sm:p-8 shadow-2xl flex flex-col justify-between backface-hidden rotate-y-180 overflow-y-auto transition-all ${
                  isCurrentMastered
                    ? 'ring-1 ring-emerald-500/40 border-emerald-500/30'
                    : 'border-indigo-500/30'
                }`}
                onClick={(e) => {
                  // Prevent card flip when clicking buttons inside back of card
                  if ((e.target as HTMLElement).closest('button, a')) {
                    e.stopPropagation();
                  }
                }}
              >
                {/* Back Top Metadata */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-bold">
                      {currentCard.term}
                    </span>
                    {currentCard.arabicTerm && (
                      <span className="text-xs text-slate-300 font-arabic">
                        ({currentCard.arabicTerm})
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFlip();
                    }}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1"
                    title="Flip back to front"
                  >
                    <RotateCw className="w-3.5 h-3.5 text-teal-400" />
                    <span className="text-[11px]">Flip</span>
                  </button>
                </div>

                {/* Back Center Content */}
                <div className="space-y-4 py-3 overflow-y-auto max-h-[380px] scrollbar-thin pr-1">
                  {/* Definition */}
                  <div>
                    <h4 className="text-xs font-mono font-bold text-slate-400 uppercase mb-1">
                      Definition
                    </h4>
                    <p className="text-sm text-slate-200 leading-relaxed">
                      {currentCard.definition}
                    </p>
                  </div>

                  {/* Mathematical Formula */}
                  {currentCard.formula && (
                    <div>
                      <h4 className="text-xs font-mono font-bold text-teal-400 uppercase mb-1">
                        Core Equation / Formula
                      </h4>
                      <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-3 overflow-x-auto">
                        <MathView
                          math={currentCard.formula}
                          block={true}
                          className="text-slate-100 text-sm sm:text-base"
                        />
                      </div>
                    </div>
                  )}

                  {/* Exam Example & Solution */}
                  {currentCard.example && (
                    <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-3.5 space-y-2">
                      <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                        <span className="px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 text-[10px] font-mono">
                          EXAMPLE
                        </span>
                        <span>{currentCard.example.problem}</span>
                      </div>
                      <div className="text-xs text-slate-300 leading-relaxed pl-2 border-l-2 border-teal-500/40">
                        <FormattedText text={currentCard.example.solution} />
                      </div>
                    </div>
                  )}

                  {/* Exam Trap or Pro-Tip */}
                  {currentCard.noteOrTrap && (
                    <div className="flex items-start gap-2 rounded-xl border border-amber-500/20 bg-amber-950/20 p-3 text-xs text-amber-200/90">
                      <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-amber-300 block font-bold text-[11px] mb-0.5">
                          Exam Trap & Pro-Tip:
                        </strong>
                        <FormattedText text={currentCard.noteOrTrap} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Back Footer: Mastery Controls */}
                <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleMastery(currentCard.id)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-sm ${
                        isCurrentMastered
                          ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                          : 'bg-slate-800 hover:bg-emerald-500/20 hover:text-emerald-300 text-slate-300 border border-slate-700'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{isCurrentMastered ? 'Mastered ✓' : 'Mark as Mastered (M)'}</span>
                    </button>
                  </div>

                  {onNavigateToTopic && (
                    <button
                      onClick={() => onNavigateToTopic(currentCard.category)}
                      className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition"
                    >
                      Open in Lecture Handout →
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Dock Buttons */}
          <div className="flex items-center justify-between gap-4 max-w-xl mx-auto">
            <button
              onClick={handlePrev}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-slate-700 transition font-bold text-sm shadow-md"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous (←)</span>
            </button>

            <button
              onClick={handleFlip}
              className="flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-teal-500 text-slate-950 hover:bg-teal-400 transition font-extrabold text-sm shadow-lg shadow-teal-500/20"
            >
              <RotateCw className="w-4 h-4" />
              <span>{isFlipped ? 'Show Front' : 'Flip Card'}</span>
            </button>

            <button
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-slate-700 transition font-bold text-sm shadow-md"
            >
              <span>Next (→)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
