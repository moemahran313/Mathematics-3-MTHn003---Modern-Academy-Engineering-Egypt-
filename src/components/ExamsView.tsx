import React, { useState, useMemo } from 'react';
import {
  Trophy,
  Zap,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Clock,
  Award,
  Layers,
  Eye,
  Play,
  Check,
  ChevronRight,
  FileText,
} from 'lucide-react';
import {
  ZERO_TO_HERO_PATTERNS,
  MASTER_EXAM_QUESTIONS,
  ZeroToHeroPattern,
  MasterExamQuestion,
} from '../data/masterExamBankData';
import { MathView } from './MathView';

interface ExamsViewProps {
  onOpenQuestionBank?: (questionId?: string) => void;
}

export const ExamsView: React.FC<ExamsViewProps> = ({ onOpenQuestionBank }) => {
  const [activePhase, setActivePhase] = useState<'bootcamp' | 'drill' | 'simulator'>('bootcamp');

  // Phase 1: Zero-to-Hero Bootcamp State
  const [selectedPatternId, setSelectedPatternId] = useState<string>(ZERO_TO_HERO_PATTERNS[0].id);
  const [completedPatterns, setCompletedPatterns] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('math3_bootcamp_patterns_v1');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Phase 2: Trick & Method Diagnostic Drill State
  const [drillFilter, setDrillFilter] = useState<string>('All');
  const [drillIndex, setDrillIndex] = useState<number>(0);
  const [selectedMethodIdx, setSelectedMethodIdx] = useState<number | null>(null);
  const [selectedKeyStepIdx, setSelectedKeyStepIdx] = useState<number | null>(null);
  const [drillSubmitted, setDrillSubmitted] = useState<boolean>(false);
  const [drillStats, setDrillStats] = useState<{ attempted: number; perfect: number }>({
    attempted: 0,
    perfect: 0,
  });

  // Phase 3: Real Exam Paper Simulator State
  const [selectedExamPaper, setSelectedExamPaper] = useState<string>('Midterm Written Exam Fall 2025–2026');
  const [simStepAnswers, setSimStepAnswers] = useState<Record<string, { method?: number; step?: number; revealed?: boolean }>>({});

  const activePattern = useMemo(() => {
    return ZERO_TO_HERO_PATTERNS.find((p) => p.id === selectedPatternId) || ZERO_TO_HERO_PATTERNS[0];
  }, [selectedPatternId]);

  const patternQuestions = useMemo(() => {
    return MASTER_EXAM_QUESTIONS.filter((q) => activePattern.relatedQuestionIds.includes(q.id));
  }, [activePattern]);

  const togglePatternComplete = (id: string) => {
    setCompletedPatterns((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('math3_bootcamp_patterns_v1', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Filtered Drill Questions
  const drillQuestions = useMemo(() => {
    if (drillFilter === 'All') return MASTER_EXAM_QUESTIONS;
    if (drillFilter === 'First-Order') {
      return MASTER_EXAM_QUESTIONS.filter((q) => q.subCategory === 'First-Order ODE');
    }
    if (drillFilter === 'Higher-Order') {
      return MASTER_EXAM_QUESTIONS.filter((q) => q.subCategory === 'Higher-Order ODE');
    }
    if (drillFilter === 'Tricks & Boss') {
      return MASTER_EXAM_QUESTIONS.filter((q) => q.difficulty === 'Trick' || q.difficulty === 'Boss');
    }
    return MASTER_EXAM_QUESTIONS;
  }, [drillFilter]);

  const currentDrillQ: MasterExamQuestion = drillQuestions[drillIndex % drillQuestions.length] || MASTER_EXAM_QUESTIONS[0];

  const handleDrillSubmit = () => {
    if (selectedMethodIdx === null || selectedKeyStepIdx === null) return;
    setDrillSubmitted(true);
    const isMethodRight = selectedMethodIdx === currentDrillQ.drillOptions.correctMethodIndex;
    const isStepRight = selectedKeyStepIdx === currentDrillQ.drillOptions.correctKeyStepIndex;
    setDrillStats((prev) => ({
      attempted: prev.attempted + 1,
      perfect: prev.perfect + (isMethodRight && isStepRight ? 1 : 0),
    }));
  };

  const handleNextDrill = () => {
    setSelectedMethodIdx(null);
    setSelectedKeyStepIdx(null);
    setDrillSubmitted(false);
    setDrillIndex((prev) => (prev + 1) % drillQuestions.length);
  };

  // Exam Paper Simulator Questions
  const simulatorQuestions = useMemo(() => {
    return MASTER_EXAM_QUESTIONS.filter((q) => q.sourceExam === selectedExamPaper);
  }, [selectedExamPaper]);

  const simulatorScore = useMemo(() => {
    let earned = 0;
    let total = 0;
    simulatorQuestions.forEach((q) => {
      total += q.points;
      const ans = simStepAnswers[q.id];
      if (ans) {
        const mRight = ans.method === q.drillOptions.correctMethodIndex;
        const sRight = ans.step === q.drillOptions.correctKeyStepIndex;
        if (mRight && sRight) earned += q.points;
        else if (mRight || sRight) earned += q.points * 0.5;
      }
    });
    return { earned, total };
  }, [simulatorQuestions, simStepAnswers]);

  const completedPatternCount = Object.values(completedPatterns).filter(Boolean).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Banner & 3-Phase Scientific Learning Selector */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-teal-400 font-mono">
              <span>SCIENTIFIC ZERO-TO-HERO EXAM MASTERY</span>
              <span>·</span>
              <span>6 CORE PATTERNS</span>
              <span>·</span>
              <span>58 REAL EXAM QUESTIONS</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
              30-Minute Zero-to-Hero Exam Bootcamp & Diagnostic Arena
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
              Every Modern Academy Mathematics-3 exam follows an exact, predictable blueprint created by Prof. Ashraf Taha & Dr. Amira Salem. Master the 6 visual patterns, train your reflex on examiner traps, and test yourself on real timed papers.
            </p>
          </div>

          {onOpenQuestionBank && (
            <button
              onClick={() => onOpenQuestionBank()}
              className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-teal-300 border border-teal-500/30 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shrink-0 whitespace-nowrap"
            >
              <BookOpen className="w-4 h-4 text-teal-400" />
              <span>Open Full 58-Question Bank →</span>
            </button>
          )}
        </div>

        {/* 3-Stage Mode Switcher */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <button
            onClick={() => setActivePhase('bootcamp')}
            className={`p-4 rounded-xl border text-left transition-colors cursor-pointer flex items-start justify-between gap-3 ${
              activePhase === 'bootcamp'
                ? 'bg-teal-500/15 border-teal-500/50 text-slate-100'
                : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="space-y-1">
              <div className="text-xs font-mono text-teal-400 font-bold">
                STAGE 1 · TEACH & RECOGNIZE ({completedPatternCount}/6)
              </div>
              <div className="text-sm font-bold text-slate-100">
                30-Min Zero-to-Hero Pattern Bootcamp
              </div>
              <p className="text-xs text-slate-400">
                Learn the 6 exact patterns, visual triggers, and official P*/Q* & strike-out shortcuts.
              </p>
            </div>
          </button>

          <button
            onClick={() => setActivePhase('drill')}
            className={`p-4 rounded-xl border text-left transition-colors cursor-pointer flex items-start justify-between gap-3 ${
              activePhase === 'drill'
                ? 'bg-teal-500/15 border-teal-500/50 text-slate-100'
                : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="space-y-1">
              <div className="text-xs font-mono text-amber-400 font-bold">
                STAGE 2 · TWO-STEP TRAP DRILL ({drillStats.perfect}/{drillStats.attempted})
              </div>
              <div className="text-sm font-bold text-slate-100">
                Interactive Method & Trick Reflex Trainer
              </div>
              <p className="text-xs text-slate-400">
                Spot the right method + defeat the examiner trap on all 58 questions with instant derivation feedback.
              </p>
            </div>
          </button>

          <button
            onClick={() => setActivePhase('simulator')}
            className={`p-4 rounded-xl border text-left transition-colors cursor-pointer flex items-start justify-between gap-3 ${
              activePhase === 'simulator'
                ? 'bg-teal-500/15 border-teal-500/50 text-slate-100'
                : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="space-y-1">
              <div className="text-xs font-mono text-emerald-400 font-bold">
                STAGE 3 · REAL EXAM SIMULATOR ({simulatorScore.earned}/{simulatorScore.total} PTS)
              </div>
              <div className="text-sm font-bold text-slate-100">
                Full Midterm Paper Interactive Grader
              </div>
              <p className="text-xs text-slate-400">
                Simulate Fall 2025, 2024, 2023, 2021, or 2020 exams under real point weights.
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* =====================================================================
          STAGE 1: 30-MINUTE ZERO-TO-HERO PATTERN BOOTCAMP
          ===================================================================== */}
      {activePhase === 'bootcamp' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: 6 Pattern Modules Selector (4 Cols) */}
          <div className="lg:col-span-4 space-y-2.5">
            <div className="px-1 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>THE 6 EXAM BLUEPRINT MODULES</span>
              <span className="tabular-nums">{completedPatternCount}/6 Done</span>
            </div>

            {ZERO_TO_HERO_PATTERNS.map((pat) => {
              const isSelected = pat.id === selectedPatternId;
              const isDone = !!completedPatterns[pat.id];

              return (
                <button
                  key={pat.id}
                  onClick={() => setSelectedPatternId(pat.id)}
                  className={`w-full p-4 rounded-xl border text-left transition-colors cursor-pointer space-y-1.5 ${
                    isSelected
                      ? 'bg-slate-900 border-teal-500/60 shadow-sm'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-xs font-mono">
                    <span className={isSelected ? 'text-teal-400 font-bold' : 'text-slate-400'}>
                      Module 0{pat.stepOrder} · {pat.timeToMaster}
                    </span>
                    <span className={isDone ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                      {isDone ? '✓ Mastered' : `${pat.relatedQuestionIds.length} Exam Qs`}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-100 leading-snug">
                    {pat.name}
                  </div>
                  <div className="text-xs text-slate-400" dir="rtl">
                    {pat.arabicName}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep Pattern Teaching & Live Exam Proof (8 Cols) */}
          <div className="lg:col-span-8 space-y-5">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
              {/* Module Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-teal-400">
                    <span>EXAM FREQUENCY: {activePattern.frequencyInExams}</span>
                    <span>·</span>
                    <span>ESTIMATED STUDY TIME: {activePattern.timeToMaster}</span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-100">
                    {activePattern.name}
                  </h2>
                  <p className="text-sm text-teal-300/90 font-medium" dir="rtl">
                    {activePattern.arabicName}
                  </p>
                </div>

                <button
                  onClick={() => togglePatternComplete(activePattern.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-colors cursor-pointer shrink-0 whitespace-nowrap ${
                    completedPatterns[activePattern.id]
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-teal-500 text-slate-950 border-teal-400 hover:bg-teal-400'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {completedPatterns[activePattern.id] ? 'Module Completed' : 'Mark Module Mastered'}
                  </span>
                </button>
              </div>

              {/* Visual Signature Box */}
              <div className="space-y-2">
                <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                  1. Visual Signature on the Exam Paper (شكل السؤال في ورقة الامتحان)
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-teal-300 text-sm overflow-x-auto no-scrollbar">
                  <MathView math={activePattern.visualSignatureLatex} block />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-slate-300 leading-relaxed">
                    <strong className="text-teal-400 block mb-1">How to Spot It Instantly:</strong>
                    {activePattern.howToSpotIt}
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-slate-300 leading-relaxed" dir="rtl">
                    <strong className="text-teal-400 block mb-1">كيف تكتشفها بمجرد النظر:</strong>
                    {activePattern.arabicHowToSpot}
                  </div>
                </div>
              </div>

              {/* Golden Step-by-Step Algorithm */}
              <div className="space-y-2.5">
                <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                  2. The Golden Exam Algorithm (خوارزمية الحل المضمونة خطوة بخطوة)
                </div>
                <div className="space-y-2">
                  {activePattern.goldenAlgorithm.map((rule, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800/90 flex items-start gap-3 text-xs sm:text-sm text-slate-200 leading-relaxed"
                    >
                      <span className="w-6 h-6 rounded-lg bg-teal-500/15 text-teal-300 border border-teal-500/30 flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 tabular-nums">
                        {idx + 1}
                      </span>
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Examiner's Favorite Tricks & How to Defeat Them */}
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>3. Prof. Ashraf & Dr. Amira's Favorite Exam Traps (أشهر خدع وأفكار الامتحانات)</span>
                </div>
                <div className="space-y-3">
                  {activePattern.examinerFavoriteTricks.map((t, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-amber-950/15 border border-amber-500/25 space-y-2.5"
                    >
                      <div className="text-xs sm:text-sm font-bold text-amber-300">
                        Trap #{idx + 1}: {t.trickTitle}
                      </div>
                      <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-teal-300 text-xs overflow-x-auto no-scrollbar">
                        <MathView math={t.exampleLatex} block />
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        <strong className="text-emerald-400">How to Defeat It: </strong>
                        {t.howToDefeatIt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Questions from the 6 Attached PDFs */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                    4. All {patternQuestions.length} Real Exam Questions Using This Pattern
                  </span>
                  {onOpenQuestionBank && (
                    <button
                      onClick={() => onOpenQuestionBank()}
                      className="text-xs text-teal-400 hover:underline cursor-pointer"
                    >
                      View all in Question Bank →
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {patternQuestions.map((q) => (
                    <div
                      key={q.id}
                      onClick={() => {
                        if (onOpenQuestionBank) onOpenQuestionBank(q.id);
                      }}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-teal-500/40 transition-colors cursor-pointer space-y-2"
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span className="text-teal-400 font-bold">{q.numberLabel}</span>
                        <span>{q.difficulty} · {q.points} pts</span>
                      </div>
                      <div className="text-xs text-slate-200 overflow-x-auto no-scrollbar py-0.5">
                        <MathView math={q.problemLatex} inline />
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        Shortcut: {q.secretShortcut}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          STAGE 2: INTERACTIVE TWO-STEP METHOD & TRICK DRILL
          ===================================================================== */}
      {activePhase === 'drill' && (
        <div className="space-y-6">
          {/* Drill Filter Bar */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 flex-wrap">
              {['All', 'First-Order', 'Higher-Order', 'Tricks & Boss'].map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    setDrillFilter(f);
                    setDrillIndex(0);
                    setSelectedMethodIdx(null);
                    setSelectedKeyStepIdx(null);
                    setDrillSubmitted(false);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    drillFilter === f
                      ? 'bg-teal-500 text-slate-950 font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
              <span className="tabular-nums">
                Question {(drillIndex % drillQuestions.length) + 1} of {drillQuestions.length}
              </span>
              <span>·</span>
              <span className="text-teal-400 font-bold tabular-nums">
                Score: {drillStats.perfect} / {drillStats.attempted} Perfect
              </span>
            </div>
          </div>

          {/* Active Drill Card */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="text-teal-400 font-bold">{currentDrillQ.numberLabel}</span>
                <span>·</span>
                <span>{currentDrillQ.sourceExam}</span>
                <span>·</span>
                <span>{currentDrillQ.points} Points</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleNextDrill}
                  className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Skip / Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Equation Display */}
            <div className="space-y-2 text-center">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Analyze this Differential Equation & Identify the Method + Trick:
              </span>
              {currentDrillQ.problemStatement && (
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
                  {currentDrillQ.problemStatement}
                </p>
              )}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-teal-300 text-base sm:text-lg overflow-x-auto no-scrollbar">
                <MathView math={currentDrillQ.problemLatex} block />
              </div>
            </div>

            {/* Two-Part Diagnostic Questions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Part A: Identify Method */}
              <div className="p-5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
                <div className="text-xs font-mono font-bold text-teal-400 uppercase">
                  STEP 1: Which Solution Method Applies Here?
                </div>
                <div className="space-y-2">
                  {currentDrillQ.drillOptions.methodChoices.map((choice, idx) => {
                    const isSelected = selectedMethodIdx === idx;
                    const isCorrect = idx === currentDrillQ.drillOptions.correctMethodIndex;

                    let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';
                    if (drillSubmitted) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-rose-950/40 border-rose-500/60 text-rose-200';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-teal-500/20 border-teal-500 text-teal-200 font-bold';
                    }

                    return (
                      <button
                        key={idx}
                        disabled={drillSubmitted}
                        onClick={() => setSelectedMethodIdx(idx)}
                        className={`w-full p-3.5 rounded-xl border text-left text-xs leading-relaxed transition-colors cursor-pointer flex items-center justify-between gap-2 ${btnStyle}`}
                      >
                        <span>{choice}</span>
                        {drillSubmitted && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                        {drillSubmitted && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Part B: Execute Key Trick Step */}
              <div className="p-5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
                <div className="text-xs font-mono font-bold text-amber-400 uppercase">
                  STEP 2: {currentDrillQ.drillOptions.keyStepPrompt}
                </div>
                <div className="space-y-2">
                  {currentDrillQ.drillOptions.keyStepChoices.map((choice, idx) => {
                    const isSelected = selectedKeyStepIdx === idx;
                    const isCorrect = idx === currentDrillQ.drillOptions.correctKeyStepIndex;

                    let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';
                    if (drillSubmitted) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-rose-950/40 border-rose-500/60 text-rose-200';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-amber-500/20 border-amber-500 text-amber-200 font-bold';
                    }

                    return (
                      <button
                        key={idx}
                        disabled={drillSubmitted}
                        onClick={() => setSelectedKeyStepIdx(idx)}
                        className={`w-full p-3.5 rounded-xl border text-left text-xs leading-relaxed transition-colors cursor-pointer flex items-center justify-between gap-2 ${btnStyle}`}
                      >
                        <span>{choice}</span>
                        {drillSubmitted && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                        {drillSubmitted && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Submit or Next Action */}
            {!drillSubmitted ? (
              <button
                onClick={handleDrillSubmit}
                disabled={selectedMethodIdx === null || selectedKeyStepIdx === null}
                className="w-full py-3.5 px-6 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-40 text-slate-950 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                Check Both Answers & Reveal Complete Official Model Derivation
              </button>
            ) : (
              <div className="space-y-5 pt-4 border-t border-slate-800 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-amber-400">
                      Examiner Trap on This Question:
                    </div>
                    <p className="text-xs text-slate-300">{currentDrillQ.examinerTrap}</p>
                    <p className="text-xs text-slate-400" dir="rtl">
                      {currentDrillQ.arabicExaminerTrap}
                    </p>
                  </div>
                  <button
                    onClick={handleNextDrill}
                    className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 shrink-0 cursor-pointer whitespace-nowrap"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Full Step-by-Step Solution */}
                <div className="space-y-2.5">
                  {currentDrillQ.steps.map((s) => (
                    <div
                      key={s.stepNumber}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                        <span>
                          Step {s.stepNumber}: {s.title}
                        </span>
                        <span className="text-teal-400">{s.arabicTitle}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-teal-300 text-xs overflow-x-auto no-scrollbar">
                        <MathView math={s.formula} block />
                      </div>
                      <p className="text-xs text-slate-400">{s.explanation}</p>
                    </div>
                  ))}
                  <div className="p-4 rounded-xl bg-teal-950/30 border border-teal-500/40 flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-300">Final Boxed Solution:</span>
                    <div className="text-sm font-bold text-teal-200">
                      <MathView math={currentDrillQ.finalAnswerLatex} inline />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          STAGE 3: REAL EXAM PAPER INTERACTIVE SIMULATOR
          ===================================================================== */}
      {activePhase === 'simulator' && (
        <div className="space-y-6">
          {/* Exam Paper Selector */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              {[
                'Midterm Written Exam Fall 2025–2026',
                'Midterm Written Exam Fall 2024–2025',
                'Midterm Written Exam Fall 2023–2024',
                'Midterm Exam Fall 2021–2022',
                'Midterm Exam Fall 2020–2021',
              ].map((paper) => (
                <button
                  key={paper}
                  onClick={() => setSelectedExamPaper(paper)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    selectedExamPaper === paper
                      ? 'bg-teal-500 text-slate-950 font-bold'
                      : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  {paper.replace('Midterm Written Exam ', '').replace('Midterm Exam ', '')}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-slate-400">Simulated Grade:</span>
              <span className="text-teal-400 font-bold text-sm tabular-nums">
                {simulatorScore.earned} / {simulatorScore.total} Marks
              </span>
              <button
                onClick={() => setSimStepAnswers({})}
                className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 border border-slate-800 cursor-pointer"
              >
                Reset Paper
              </button>
            </div>
          </div>

          {/* Questions in Selected Exam Paper */}
          <div className="space-y-4">
            {simulatorQuestions.map((q) => {
              const userAns = simStepAnswers[q.id] || {};
              const isRevealed = !!userAns.revealed;

              return (
                <div
                  key={q.id}
                  className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2 text-xs font-mono text-teal-400 font-bold">
                      <span>{q.numberLabel}</span>
                      <span>·</span>
                      <span className="tabular-nums">{q.points} Points</span>
                    </div>
                    <button
                      onClick={() =>
                        setSimStepAnswers((prev) => ({
                          ...prev,
                          [q.id]: { ...prev[q.id], revealed: !isRevealed },
                        }))
                      }
                      className="text-xs text-teal-400 hover:underline font-semibold cursor-pointer"
                    >
                      {isRevealed ? 'Hide Official Model Answer' : 'Check & Reveal Official Model Answer'}
                    </button>
                  </div>

                  {q.problemStatement && (
                    <p className="text-xs sm:text-sm text-slate-300">{q.problemStatement}</p>
                  )}

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-teal-300 text-sm sm:text-base overflow-x-auto no-scrollbar">
                    <MathView math={q.problemLatex} block />
                  </div>

                  {/* Quick Interactive Check before Revealing */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-400 block">
                        1. Select Method ({q.points / 2} pts):
                      </label>
                      <select
                        value={userAns.method ?? ''}
                        onChange={(e) =>
                          setSimStepAnswers((prev) => ({
                            ...prev,
                            [q.id]: {
                              ...prev[q.id],
                              method: e.target.value === '' ? undefined : Number(e.target.value),
                            },
                          }))
                        }
                        className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-500"
                      >
                        <option value="">-- Choose Method --</option>
                        {q.drillOptions.methodChoices.map((c, idx) => (
                          <option key={idx} value={idx}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-400 block">
                        2. {q.drillOptions.keyStepPrompt} ({q.points / 2} pts):
                      </label>
                      <select
                        value={userAns.step ?? ''}
                        onChange={(e) =>
                          setSimStepAnswers((prev) => ({
                            ...prev,
                            [q.id]: {
                              ...prev[q.id],
                              step: e.target.value === '' ? undefined : Number(e.target.value),
                            },
                          }))
                        }
                        className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-500"
                      >
                        <option value="">-- Choose Key Step --</option>
                        {q.drillOptions.keyStepChoices.map((c, idx) => (
                          <option key={idx} value={idx}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Revealed Model Answer */}
                  {isRevealed && (
                    <div className="pt-4 border-t border-slate-800 space-y-3 animate-fadeIn">
                      <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200">
                        <strong className="text-amber-400">Examiner Trap: </strong>
                        {q.examinerTrap} ({q.arabicExaminerTrap})
                      </div>
                      {q.steps.map((s) => (
                        <div key={s.stepNumber} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                          <div className="text-xs font-bold text-slate-200">
                            Step {s.stepNumber}: {s.title} — <span className="text-teal-400">{s.arabicTitle}</span>
                          </div>
                          <div className="text-xs text-teal-300 overflow-x-auto no-scrollbar py-1">
                            <MathView math={s.formula} block />
                          </div>
                          <div className="text-xs text-slate-400">{s.explanation}</div>
                        </div>
                      ))}
                      <div className="p-3.5 rounded-xl bg-teal-950/30 border border-teal-500/40 flex items-center justify-between">
                        <span className="text-xs font-bold text-teal-300">Official Boxed Answer:</span>
                        <MathView math={q.finalAnswerLatex} inline />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
