import React, { useState, useEffect, useMemo } from 'react';
import {
  Zap,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Trophy,
  ArrowRight,
  Lightbulb,
  HelpCircle,
  BookOpen,
  Check,
  ChevronRight,
  RotateCcw,
  Sparkles,
  BarChart3,
  Award,
  Layers,
  Flame,
  Clock,
  Eye,
} from 'lucide-react';
import { QUIZ_QUESTIONS_DATA } from '../data/quizData';
import { PRACTICE_PROBLEMS_DATA } from '../data/practiceProblemsData';
import { QuizQuestion, Category, PracticeProblem, TopicProgress } from '../types';
import { MathView, FormattedText } from './MathView';
import { motion, AnimatePresence } from 'motion/react';

interface QuizArenaViewProps {
  onNavigateToLibrary: () => void;
  initialCategory?: Category;
}

const STORAGE_KEY = 'math3_curriculum_progress_v2';

interface SavedProgress {
  scores: Record<string, { attempted: number; correct: number; mastered: boolean }>;
  practiceCompleted: Record<string, boolean>;
  maxStreak: number;
  totalAnswered: number;
  totalCorrect: number;
}

const DEFAULT_PROGRESS: SavedProgress = {
  scores: {},
  practiceCompleted: {},
  maxStreak: 0,
  totalAnswered: 0,
  totalCorrect: 0,
};

export const QuizArenaView: React.FC<QuizArenaViewProps> = ({
  onNavigateToLibrary,
  initialCategory,
}) => {
  // Navigation & Mode States
  const [activeMode, setActiveMode] = useState<'quiz' | 'practice' | 'stats'>('quiz');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>(
    initialCategory || 'All'
  );

  // Persistent User Progress State
  const [progress, setProgress] = useState<SavedProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_PROGRESS;
    } catch {
      return DEFAULT_PROGRESS;
    }
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore
    }
  }, [progress]);

  // Available topics for filtering
  const allCategories = useMemo(() => {
    const categories = Object.values(Category).filter((c) => c !== Category.ALL);
    return categories;
  }, []);

  // Filtered Quiz Questions
  const filteredQuestions = useMemo(() => {
    if (selectedCategory === 'All') return QUIZ_QUESTIONS_DATA;
    return QUIZ_QUESTIONS_DATA.filter((q) => q.category === selectedCategory);
  }, [selectedCategory]);

  // Filtered Practice Problems
  const filteredProblems = useMemo(() => {
    if (selectedCategory === 'All') return PRACTICE_PROBLEMS_DATA;
    return PRACTICE_PROBLEMS_DATA.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  // Quiz Session State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [sessionScore, setSessionScore] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Reset quiz session when category changes
  useEffect(() => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setSessionScore(0);
    setQuizFinished(false);
  }, [selectedCategory]);

  const currentQ = filteredQuestions[currentIndex] || filteredQuestions[0];

  // Handle Option Selection
  const handleSelectOption = (index: number) => {
    if (isAnswered || !currentQ) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentQ.correctIndex;
    const catKey = currentQ.category;

    if (isCorrect) {
      setSessionScore((prev) => prev + 1);
      setCurrentStreak((prev) => {
        const next = prev + 1;
        if (next > progress.maxStreak) {
          setProgress((p) => ({ ...p, maxStreak: next }));
        }
        return next;
      });
    } else {
      setCurrentStreak(0);
    }

    // Update Persistent Progress
    setProgress((prev) => {
      const currentTopic = prev.scores[catKey] || { attempted: 0, correct: 0, mastered: false };
      const newAttempted = currentTopic.attempted + 1;
      const newCorrect = currentTopic.correct + (isCorrect ? 1 : 0);
      const isMastered = newAttempted >= 2 && newCorrect / newAttempted >= 0.75;

      return {
        ...prev,
        totalAnswered: prev.totalAnswered + 1,
        totalCorrect: prev.totalCorrect + (isCorrect ? 1 : 0),
        scores: {
          ...prev.scores,
          [catKey]: {
            attempted: newAttempted,
            correct: newCorrect,
            mastered: isMastered,
          },
        },
      };
    });
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < filteredQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setSessionScore(0);
    setCurrentStreak(0);
    setQuizFinished(false);
  };

  const handleResetAllProgress = () => {
    if (window.confirm('Are you sure you want to reset all your progress data for Math 3?')) {
      setProgress(DEFAULT_PROGRESS);
      handleRestartQuiz();
    }
  };

  // Practice Mode: Interactive step revelation
  const [activeProblemId, setActiveProblemId] = useState<string>(
    filteredProblems[0]?.id || ''
  );
  const [revealedSteps, setRevealedSteps] = useState<Record<string, number>>({});
  const [showAnswer, setShowAnswer] = useState<Record<string, boolean>>({});

  const activeProblem = useMemo(() => {
    return filteredProblems.find((p) => p.id === activeProblemId) || filteredProblems[0];
  }, [filteredProblems, activeProblemId]);

  const toggleStep = (probId: string) => {
    setRevealedSteps((prev) => {
      const current = prev[probId] || 0;
      const totalSteps = activeProblem?.steps.length || 0;
      return {
        ...prev,
        [probId]: Math.min(current + 1, totalSteps),
      };
    });
  };

  const toggleAllSteps = (probId: string) => {
    const totalSteps = activeProblem?.steps.length || 0;
    setRevealedSteps((prev) => ({
      ...prev,
      [probId]: prev[probId] === totalSteps ? 0 : totalSteps,
    }));
  };

  const markProblemCompleted = (probId: string) => {
    setProgress((prev) => ({
      ...prev,
      practiceCompleted: {
        ...prev.practiceCompleted,
        [probId]: true,
      },
    }));
  };

  // Progress metrics
  const totalMasteredCount = Object.values(progress.scores).filter((s) => s.mastered).length;
  const overallAccuracy =
    progress.totalAnswered > 0
      ? Math.round((progress.totalCorrect / progress.totalAnswered) * 100)
      : 0;

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Top Banner & Mode Selector */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-linear-to-br from-slate-900 via-slate-900/90 to-emerald-950/30 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                Interactive Diagnostic Arena
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-xs font-mono">
                Real-Time Feedback & Analytics
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              Math 3 Practice & Topic Quizzes
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl font-sans">
              Test your proficiency topic-by-topic across first-order ODEs, auxiliary characteristic roots, Laplace operational transforms, Fourier expansions, and Legendre special functions.
            </p>
          </div>

          {/* Quick HUD Metrics */}
          <div className="flex items-center gap-2.5 self-start sm:self-center shrink-0">
            <div className="p-3 rounded-2xl bg-slate-950/90 border border-slate-800 text-center min-w-[76px]">
              <span className="text-[10px] font-mono text-slate-500 uppercase block">Accuracy</span>
              <span className="text-lg font-mono font-extrabold text-emerald-400">
                {overallAccuracy}%
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950/90 border border-slate-800 text-center min-w-[76px]">
              <span className="text-[10px] font-mono text-slate-500 uppercase block">Streak</span>
              <span className="text-lg font-mono font-extrabold text-amber-400 flex items-center justify-center gap-1">
                <span>{currentStreak}</span>
                <Flame className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950/90 border border-slate-800 text-center min-w-[76px]">
              <span className="text-[10px] font-mono text-slate-500 uppercase block">Mastered</span>
              <span className="text-lg font-mono font-extrabold text-teal-400">
                {totalMasteredCount}/{allCategories.length}
              </span>
            </div>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
          <button
            onClick={() => setActiveMode('quiz')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
              activeMode === 'quiz'
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 shadow-sm'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>Interactive Topic Quiz ({filteredQuestions.length} Questions)</span>
          </button>
          <button
            onClick={() => setActiveMode('practice')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
              activeMode === 'practice'
                ? 'bg-teal-500/20 border-teal-500/40 text-teal-300 shadow-sm'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-teal-400" />
            <span>Step-by-Step Practice ({filteredProblems.length} Problems)</span>
          </button>
          <button
            onClick={() => setActiveMode('stats')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
              activeMode === 'stats'
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 shadow-sm'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
            <span>Curriculum Progress Tracker</span>
          </button>
        </div>
      </div>

      {/* Topic Filter Pills (Visible in Quiz & Practice Modes) */}
      {activeMode !== 'stats' && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-teal-400" />
              Select Topic to Practice:
            </span>
            {selectedCategory !== 'All' && (
              <button
                onClick={() => setSelectedCategory('All')}
                className="text-teal-400 hover:underline cursor-pointer text-[11px]"
              >
                Reset to All Topics
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap border transition-all cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-teal-500/20 border-teal-500/40 text-teal-300 shadow-xs'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              All Topics ({QUIZ_QUESTIONS_DATA.length})
            </button>
            {allCategories.map((cat) => {
              const count = QUIZ_QUESTIONS_DATA.filter((q) => q.category === cat).length;
              const isSelected = selectedCategory === cat;
              const topicStat = progress.scores[cat];
              const isMastered = topicStat?.mastered;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap border transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-bold shadow-xs'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                  }`}
                >
                  {isMastered && <Award className="w-3 h-3 text-amber-400" />}
                  <span>{cat}</span>
                  <span className="text-[10px] opacity-60 font-mono">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. QUIZ MODE */}
      {/* ========================================================================= */}
      {activeMode === 'quiz' && (
        <div className="space-y-6">
          {filteredQuestions.length === 0 ? (
            <div className="p-12 text-center rounded-3xl border border-slate-800 bg-slate-900/50 space-y-3">
              <HelpCircle className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-300">No questions for this topic yet</h3>
              <button
                onClick={() => setSelectedCategory('All')}
                className="px-4 py-2 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs"
              >
                Show All Topics
              </button>
            </div>
          ) : quizFinished ? (
            /* Quiz Completion Screen */
            <div className="p-8 sm:p-10 rounded-3xl border bg-slate-900/90 border-slate-800 shadow-2xl text-center space-y-6 max-w-2xl mx-auto animate-fadeIn">
              <div className="w-20 h-20 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center mx-auto shadow-lg">
                <Trophy className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-black text-slate-100">
                  Topic Quiz Completed!
                </h2>
                <p className="text-xs text-slate-400 font-sans">
                  Targeted Category:{' '}
                  <strong className="text-teal-400 font-mono">{selectedCategory}</strong>
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3.5 max-w-md mx-auto">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-850">
                  <span className="text-[10px] uppercase font-mono text-slate-500 block">Score</span>
                  <span className="text-xl font-mono font-black text-teal-400">
                    {sessionScore}/{filteredQuestions.length}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-850">
                  <span className="text-[10px] uppercase font-mono text-slate-500 block">Accuracy</span>
                  <span className="text-xl font-mono font-black text-emerald-400">
                    {Math.round((sessionScore / filteredQuestions.length) * 100)}%
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-850">
                  <span className="text-[10px] uppercase font-mono text-slate-500 block">Streak</span>
                  <span className="text-xl font-mono font-black text-amber-400">
                    {currentStreak} 🔥
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
                {sessionScore / filteredQuestions.length >= 0.8 ? (
                  <span className="text-emerald-300 font-semibold">
                    Outstanding mastery! You have demonstrated comprehensive understanding of these concepts.
                  </span>
                ) : sessionScore / filteredQuestions.length >= 0.5 ? (
                  <span className="text-amber-300">
                    Solid attempt! Review the step-by-step practice sheets and tricky conditions.
                  </span>
                ) : (
                  <span className="text-slate-300">
                    Keep practicing! Check the reference chapter and review the KaTeX derivations.
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleRestartQuiz}
                  className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-black flex items-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Retry This Topic</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    handleRestartQuiz();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all cursor-pointer"
                >
                  Try All Topics
                </button>
                <button
                  onClick={() => setActiveMode('stats')}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-bold transition-all cursor-pointer"
                >
                  View Overall Progress
                </button>
              </div>
            </div>
          ) : (
            /* Active Question Card */
            <div className="space-y-4">
              {/* Question HUD */}
              <div className="p-4 rounded-2xl border bg-slate-900/80 border-slate-800 shadow-md flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                      Question {currentIndex + 1} of {filteredQuestions.length}
                    </span>
                    <span className="text-xs font-bold text-slate-200">
                      {currentQ.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-bold flex items-center gap-1">
                    <span>🔥 {currentStreak}</span>
                  </div>
                  <div className="px-3 py-1 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono font-bold">
                    Score: {sessionScore}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-850">
                <div
                  className="h-full bg-linear-to-r from-teal-500 to-emerald-400 transition-all duration-300 rounded-full"
                  style={{
                    width: `${Math.round(((currentIndex + 1) / filteredQuestions.length) * 100)}%`,
                  }}
                />
              </div>

              {/* Main Question Box */}
              <div className="p-6 sm:p-8 rounded-3xl border bg-slate-900/80 border-slate-800 shadow-xl space-y-6">
                <div className="space-y-3">
                  <h3 className="text-base sm:text-lg font-bold text-slate-100 leading-snug">
                    <FormattedText text={currentQ.question} />
                  </h3>

                  {currentQ.mathFormula && (
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-850 text-teal-300 text-sm sm:text-base overflow-x-auto no-scrollbar shadow-inner">
                      <MathView math={currentQ.mathFormula} block />
                    </div>
                  )}
                </div>

                {/* Multiple Choice Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  {currentQ.options.map((option, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === currentQ.correctIndex;

                    let optionStyle =
                      'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-300 hover:bg-slate-900/80';

                    if (isAnswered) {
                      if (isCorrect) {
                        optionStyle =
                          'bg-emerald-500/10 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/30';
                      } else if (isSelected) {
                        optionStyle =
                          'bg-rose-500/10 border-rose-500 text-rose-200 ring-1 ring-rose-500/30';
                      } else {
                        optionStyle = 'bg-slate-950/40 border-slate-850 text-slate-500 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(idx)}
                        className={`p-4 rounded-2xl border text-left font-semibold text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${optionStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-[10px] font-mono font-bold text-slate-400 shrink-0">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <div>
                            <FormattedText text={option} />
                          </div>
                        </div>

                        {isAnswered && (
                          <div>
                            {isCorrect ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                            ) : isSelected ? (
                              <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                            ) : null}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Instant Feedback Drawer */}
                <AnimatePresence>
                  {isAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3"
                    >
                      <div className="flex items-center gap-2">
                        {selectedOption === currentQ.correctIndex ? (
                          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 font-mono">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Correct Answer!</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400 font-mono">
                            <XCircle className="w-4 h-4" />
                            <span>Incorrect — Correct option is {String.fromCharCode(65 + currentQ.correctIndex)}</span>
                          </div>
                        )}
                      </div>

                      <div className="text-xs text-slate-300 leading-relaxed font-sans">
                        <FormattedText text={currentQ.explanation} />
                      </div>

                      {currentQ.trick && (
                        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-amber-400">Exam Shortcut:</span>{' '}
                            <FormattedText text={currentQ.trick} />
                          </div>
                        </div>
                      )}

                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={handleNextQuestion}
                          className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-black flex items-center gap-2 transition-all shadow-md cursor-pointer"
                        >
                          <span>
                            {currentIndex + 1 === filteredQuestions.length
                              ? 'Finish Topic Quiz'
                              : 'Next Question'}
                          </span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. PRACTICE PROBLEMS WORKOUT MODE */}
      {/* ========================================================================= */}
      {activeMode === 'practice' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Problem Selector List */}
          <div className="md:col-span-1 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 px-1">
              Select Problem ({filteredProblems.length})
            </h3>
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {filteredProblems.map((prob, idx) => {
                const isSelected = prob.id === activeProblemId;
                const isCompleted = progress.practiceCompleted[prob.id];

                return (
                  <button
                    key={prob.id}
                    onClick={() => setActiveProblemId(prob.id)}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-start justify-between gap-2.5 cursor-pointer ${
                      isSelected
                        ? 'bg-teal-500/15 border-teal-500/40 text-teal-200 shadow-md ring-1 ring-teal-500/30'
                        : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                    }`}
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 border border-slate-800">
                          Problem {idx + 1}
                        </span>
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                            prob.difficulty === 'Easy'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : prob.difficulty === 'Medium'
                              ? 'bg-amber-500/10 text-amber-400'
                              : 'bg-rose-500/10 text-rose-400'
                          }`}
                        >
                          {prob.difficulty}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-200 truncate">
                        <FormattedText text={prob.question} />
                      </p>
                    </div>

                    {isCompleted && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Problem Workspace */}
          <div className="md:col-span-2 space-y-5">
            {activeProblem ? (
              <div className="p-6 sm:p-7 rounded-3xl border bg-slate-900/80 border-slate-800 shadow-xl space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-teal-400 uppercase tracking-wider block">
                      {activeProblem.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-100">
                      <FormattedText text={activeProblem.question} />
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => markProblemCompleted(activeProblem.id)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                        progress.practiceCompleted[activeProblem.id]
                          ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>
                        {progress.practiceCompleted[activeProblem.id] ? 'Completed' : 'Mark Solved'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Techniques Badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-mono text-slate-500">Techniques:</span>
                  {activeProblem.techniques.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-md bg-slate-950 text-teal-300 text-[10px] font-mono border border-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Step-by-Step Interactive Resolver */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-teal-400" />
                      Step-by-Step Resolution ({revealedSteps[activeProblem.id] || 0}/
                      {activeProblem.steps.length} Revealed)
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleStep(activeProblem.id)}
                        disabled={(revealedSteps[activeProblem.id] || 0) >= activeProblem.steps.length}
                        className="px-3 py-1 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 border border-teal-500/20 text-[11px] font-mono font-bold transition-colors cursor-pointer disabled:opacity-40"
                      >
                        + Reveal Next Step
                      </button>
                      <button
                        onClick={() => toggleAllSteps(activeProblem.id)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 text-[11px] font-mono transition-colors cursor-pointer"
                      >
                        {(revealedSteps[activeProblem.id] || 0) === activeProblem.steps.length
                          ? 'Hide Steps'
                          : 'Reveal All'}
                      </button>
                    </div>
                  </div>

                  {/* Steps container */}
                  <div className="space-y-3">
                    {activeProblem.steps.map((step, sIdx) => {
                      const isRevealed = (revealedSteps[activeProblem.id] || 0) > sIdx;
                      if (!isRevealed) return null;

                      return (
                        <motion.div
                          key={sIdx}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 rounded-2xl bg-slate-950 border border-slate-850 space-y-2 text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 font-mono text-[10px] font-bold flex items-center justify-center">
                              {sIdx + 1}
                            </span>
                            <span className="font-bold text-slate-200">{step.title}</span>
                          </div>
                          <p className="text-slate-400 pl-7 leading-relaxed font-sans">
                            <FormattedText text={step.explanation} />
                          </p>
                          {step.mathFormula && (
                            <div className="ml-7 p-3 rounded-xl bg-slate-900 border border-slate-800 text-teal-300 text-xs sm:text-sm overflow-x-auto no-scrollbar">
                              <MathView math={step.mathFormula} block />
                            </div>
                          )}
                        </motion.div>
                      );
                    })}

                    {(revealedSteps[activeProblem.id] || 0) === 0 && (
                      <div className="p-8 text-center rounded-2xl bg-slate-950/40 border border-slate-850 text-slate-500 text-xs space-y-2">
                        <Eye className="w-6 h-6 mx-auto opacity-50" />
                        <p>Try solving this problem on paper first!</p>
                        <button
                          onClick={() => toggleStep(activeProblem.id)}
                          className="px-3.5 py-1.5 rounded-xl bg-teal-500 text-slate-950 text-xs font-bold shadow-xs cursor-pointer"
                        >
                          Reveal Step 1
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Final Answer Drawer */}
                <div className="pt-2 border-t border-slate-850 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">Final Mathematical Answer:</span>
                  <div className="p-2.5 px-4 rounded-xl bg-slate-950 border border-emerald-500/30 text-emerald-300 font-mono text-xs sm:text-sm">
                    <MathView math={activeProblem.finalAnswer} />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. CURRICULUM PROGRESS TRACKER & MASTERY DASHBOARD */}
      {/* ========================================================================= */}
      {activeMode === 'stats' && (
        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-500">
                Total Questions Solved
              </span>
              <div className="text-2xl font-mono font-black text-slate-100">
                {progress.totalAnswered}
              </div>
              <span className="text-[11px] text-slate-400 font-sans block">
                {progress.totalCorrect} answered correctly
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-500">
                Overall Accuracy
              </span>
              <div className="text-2xl font-mono font-black text-emerald-400">
                {overallAccuracy}%
              </div>
              <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden mt-2">
                <div
                  className="h-full bg-emerald-400 rounded-full"
                  style={{ width: `${overallAccuracy}%` }}
                />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-500">
                Best Answer Streak
              </span>
              <div className="text-2xl font-mono font-black text-amber-400 flex items-center gap-1.5">
                <span>{progress.maxStreak}</span>
                <Flame className="w-5 h-5 text-amber-400" />
              </div>
              <span className="text-[11px] text-slate-400 font-sans block">
                Continuous correct answers
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-500">
                Topics Mastered
              </span>
              <div className="text-2xl font-mono font-black text-teal-400">
                {totalMasteredCount} / {allCategories.length}
              </div>
              <span className="text-[11px] text-slate-400 font-sans block">
                &ge;75% accuracy required
              </span>
            </div>
          </div>

          {/* Per-Topic Breakdown Table */}
          <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-100">
                  Topic Mastery & Performance Breakdown
                </h3>
                <p className="text-xs text-slate-400 font-sans">
                  Real-time accuracy and progress across individual chapters of Math 3
                </p>
              </div>
              <button
                onClick={handleResetAllProgress}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-950/30 text-slate-400 hover:text-rose-400 border border-slate-700 text-xs font-mono transition-colors cursor-pointer"
              >
                Reset Progress
              </button>
            </div>

            <div className="divide-y divide-slate-800/80">
              {allCategories.map((cat) => {
                const stat = progress.scores[cat] || { attempted: 0, correct: 0, mastered: false };
                const topicAccuracy =
                  stat.attempted > 0 ? Math.round((stat.correct / stat.attempted) * 100) : 0;
                const totalQ = QUIZ_QUESTIONS_DATA.filter((q) => q.category === cat).length;

                return (
                  <div
                    key={cat}
                    className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1 max-w-sm">
                      <div className="flex items-center gap-2">
                        {stat.mastered ? (
                          <Award className="w-4 h-4 text-amber-400 shrink-0" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-slate-600" />
                        )}
                        <span className="text-xs font-bold text-slate-200">{cat}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 pl-4">
                        {totalQ} Diagnostic Questions Available
                      </span>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-6 self-end sm:self-center">
                      <div className="text-right min-w-[70px]">
                        <span className="text-xs font-mono font-bold text-slate-300">
                          {stat.correct}/{stat.attempted}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 block">
                          {stat.attempted === 0 ? 'Not Started' : `${topicAccuracy}% Acc`}
                        </span>
                      </div>

                      <div className="w-28 sm:w-36 h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-850">
                        <div
                          className={`h-full rounded-full transition-all ${
                            stat.mastered
                              ? 'bg-emerald-400'
                              : stat.attempted > 0
                              ? 'bg-teal-500'
                              : 'bg-transparent'
                          }`}
                          style={{ width: `${topicAccuracy}%` }}
                        />
                      </div>

                      <button
                        onClick={() => {
                          setSelectedCategory(cat);
                          setActiveMode('quiz');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 border border-teal-500/20 text-xs font-bold transition-colors cursor-pointer"
                      >
                        Practice
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
