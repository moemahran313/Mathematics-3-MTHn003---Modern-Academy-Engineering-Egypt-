import React, { useState, useMemo, useEffect } from 'react';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Flame,
  Bookmark,
  Printer,
  GitBranch,
} from 'lucide-react';
import {
  ZERO_TO_HERO_PATTERNS,
  MASTER_EXAM_QUESTIONS,
  GOLDEN_12_QUESTION_IDS,
  VISUAL_DECISION_TREE_NODES,
  MasterExamQuestion,
} from '../data/masterExamBankData';
import {
  getSavedWeakSpots,
  setSavedWeakSpot,
} from './QuestionBankView';
import { MathView } from './MathView';

interface ExamsViewProps {
  onOpenQuestionBank?: (questionId?: string, preset?: 'All' | 'Golden12' | 'WeakSpots') => void;
}

export const ExamsView: React.FC<ExamsViewProps> = ({ onOpenQuestionBank }) => {
  const [activePhase, setActivePhase] = useState<
    'decision_tree' | 'cram_sheet' | 'bootcamp' | 'drill' | 'simulator'
  >('decision_tree');

  // Interactive Equation Classifier inside Visual Decision Tree
  const [selectedTreeFilter, setSelectedTreeFilter] = useState<
    | 'All'
    | 'First-Order ODE (Q1)'
    | 'Higher-Order ODE (Q2)'
    | 'Laplace & Inverse Laplace (Q3 & Q4a)'
    | 'Fourier Series & Legendre (Q4b & Q5)'
  >('All');
  const [quickMysteryIndex, setQuickMysteryIndex] = useState<number>(0);
  const [mysteryRevealed, setMysteryRevealed] = useState<boolean>(false);

  // Bootcamp State
  const [selectedPatternId, setSelectedPatternId] = useState<string>(ZERO_TO_HERO_PATTERNS[0].id);
  const [completedPatterns, setCompletedPatterns] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('math3_bootcamp_patterns_v1');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Weak-Spot Mistake Queue State (Shared with QuestionBankView via localStorage)
  const [weakSpotIds, setWeakSpotIds] = useState<Record<string, boolean>>(() => getSavedWeakSpots());

  useEffect(() => {
    setWeakSpotIds(getSavedWeakSpots());
  }, [activePhase]);

  const weakSpotCount = Object.keys(weakSpotIds).length;

  // Drill State
  const [drillFilter, setDrillFilter] = useState<
    | 'All'
    | 'Golden12'
    | 'WeakSpots'
    | 'First-Order'
    | 'Higher-Order'
    | 'Laplace & Inverse'
    | 'Fourier & Legendre'
    | 'Calculus Rescue'
    | 'Tricks & Boss'
  >('Golden12');
  const [drillIndex, setDrillIndex] = useState<number>(0);
  const [selectedMethodIdx, setSelectedMethodIdx] = useState<number | null>(null);
  const [selectedKeyStepIdx, setSelectedKeyStepIdx] = useState<number | null>(null);
  const [drillSubmitted, setDrillSubmitted] = useState<boolean>(false);
  const [drillStats, setDrillStats] = useState<{ attempted: number; perfect: number }>({
    attempted: 0,
    perfect: 0,
  });

  // Real Exam Simulator State
  const [selectedExamPaper, setSelectedExamPaper] = useState<string>(
    'Final Written Exam 1 (Fall 2017–2018)'
  );
  const [simStepAnswers, setSimStepAnswers] = useState<
    Record<string, { method?: number; step?: number; revealed?: boolean }>
  >({});

  const activePattern = useMemo(() => {
    return (
      ZERO_TO_HERO_PATTERNS.find((p) => p.id === selectedPatternId) ||
      ZERO_TO_HERO_PATTERNS[0]
    );
  }, [selectedPatternId]);

  const patternQuestions = useMemo(() => {
    return MASTER_EXAM_QUESTIONS.filter((q) =>
      activePattern.relatedQuestionIds.includes(q.id)
    );
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

  // Filtered Decision Tree Nodes
  const filteredTreeNodes = useMemo(() => {
    if (selectedTreeFilter === 'All') return VISUAL_DECISION_TREE_NODES;
    return VISUAL_DECISION_TREE_NODES.filter((n) => n.orderGroup === selectedTreeFilter);
  }, [selectedTreeFilter]);

  // Filtered Drill Questions
  const drillQuestions = useMemo(() => {
    if (drillFilter === 'Golden12') {
      return MASTER_EXAM_QUESTIONS.filter((q) => GOLDEN_12_QUESTION_IDS.includes(q.id));
    }
    if (drillFilter === 'WeakSpots') {
      return MASTER_EXAM_QUESTIONS.filter((q) => !!weakSpotIds[q.id]);
    }
    if (drillFilter === 'First-Order') {
      return MASTER_EXAM_QUESTIONS.filter((q) => q.subCategory === 'First-Order ODE');
    }
    if (drillFilter === 'Higher-Order') {
      return MASTER_EXAM_QUESTIONS.filter((q) => q.subCategory === 'Higher-Order ODE');
    }
    if (drillFilter === 'Laplace & Inverse') {
      return MASTER_EXAM_QUESTIONS.filter((q) => q.subCategory === 'Laplace & Inverse Laplace');
    }
    if (drillFilter === 'Fourier & Legendre') {
      return MASTER_EXAM_QUESTIONS.filter((q) => q.subCategory === 'Fourier Series & Legendre');
    }
    if (drillFilter === 'Calculus Rescue') {
      return MASTER_EXAM_QUESTIONS.filter((q) => q.subCategory === 'Calculus & Integration Rescue');
    }
    if (drillFilter === 'Tricks & Boss') {
      return MASTER_EXAM_QUESTIONS.filter(
        (q) => q.difficulty === 'Trick' || q.difficulty === 'Boss'
      );
    }
    return MASTER_EXAM_QUESTIONS;
  }, [drillFilter, weakSpotIds]);

  const currentDrillQ: MasterExamQuestion | undefined =
    drillQuestions.length > 0
      ? drillQuestions[drillIndex % drillQuestions.length]
      : undefined;

  const handleDrillSubmit = () => {
    if (!currentDrillQ || selectedMethodIdx === null || selectedKeyStepIdx === null) return;
    setDrillSubmitted(true);
    const isMethodRight =
      selectedMethodIdx === currentDrillQ.drillOptions.correctMethodIndex;
    const isStepRight =
      selectedKeyStepIdx === currentDrillQ.drillOptions.correctKeyStepIndex;

    const isPerfect = isMethodRight && isStepRight;

    setDrillStats((prev) => ({
      attempted: prev.attempted + 1,
      perfect: prev.perfect + (isPerfect ? 1 : 0),
    }));

    // Automatic Spaced-Repetition Queue Logic:
    // If the student misses either part, automatically add to Weak-Spot Mistake Queue!
    if (!isPerfect) {
      const updated = setSavedWeakSpot(currentDrillQ.id, true);
      setWeakSpotIds(updated);
    }
  };

  const handleRemoveFromWeakQueue = (qId: string) => {
    const updated = setSavedWeakSpot(qId, false);
    setWeakSpotIds(updated);
  };

  const handleAddToWeakQueue = (qId: string) => {
    const updated = setSavedWeakSpot(qId, true);
    setWeakSpotIds(updated);
  };

  const handleNextDrill = () => {
    setSelectedMethodIdx(null);
    setSelectedKeyStepIdx(null);
    setDrillSubmitted(false);
    if (drillQuestions.length > 0) {
      setDrillIndex((prev) => (prev + 1) % drillQuestions.length);
    }
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

  const mysteryQuestion =
    MASTER_EXAM_QUESTIONS[
      GOLDEN_12_QUESTION_IDS[quickMysteryIndex % GOLDEN_12_QUESTION_IDS.length]
        ? MASTER_EXAM_QUESTIONS.findIndex(
            (q) =>
              q.id ===
              GOLDEN_12_QUESTION_IDS[quickMysteryIndex % GOLDEN_12_QUESTION_IDS.length]
          )
        : 0
    ] || MASTER_EXAM_QUESTIONS[0];

  return (
    <div className="space-y-5 sm:space-y-6 pb-8 min-w-0">
      {/* Top Hero & 5-Tool Scientific Cramming Hub */}
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 sm:space-y-5 print:hidden min-w-0">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 min-w-0">
          <div className="space-y-1.5 min-w-0">
            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-teal-400 font-mono flex-wrap">
              <span>Zero-to-Hero Exam Lab</span>
              <span>·</span>
              <span>12-Node Decision Tree</span>
              <span>·</span>
              <span>1-Page Cram Sheet</span>
              <span>·</span>
              <span className="text-amber-400 font-bold tabular-nums">{GOLDEN_12_QUESTION_IDS.length} Golden Archetypes</span>
              {weakSpotCount > 0 && (
                <>
                  <span>·</span>
                  <span className="text-rose-400 font-bold tabular-nums">
                    {weakSpotCount} Weak Spots Queued
                  </span>
                </>
              )}
            </div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-100 tracking-tight text-balance">
              30-Minute Zero-to-Hero Exam Cramming & Diagnostic Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
              Built from a complete analysis of all {MASTER_EXAM_QUESTIONS.length} exam cards (180+ problems across 5 Midterms, 5 Finals, Official Revision Sheets, Laplace/Fourier Notes & Calculus Appendices).
            </p>
          </div>

          {/* Quick Jump Buttons to Golden Playlist & Weak Spots in Question Bank */}
          {onOpenQuestionBank && (
            <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => onOpenQuestionBank(undefined, 'Golden12')}
                className="px-3.5 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
              >
                <Flame className="w-4 h-4 text-amber-400 shrink-0" />
                <span>45-Min Golden {GOLDEN_12_QUESTION_IDS.length} Playlist</span>
              </button>

              <button
                onClick={() => onOpenQuestionBank(undefined, 'WeakSpots')}
                className="px-3.5 py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/40 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
              >
                <Bookmark className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="tabular-nums">Mistake Queue ({weakSpotCount})</span>
              </button>

              <button
                onClick={() => onOpenQuestionBank(undefined, 'All')}
                className="px-3.5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-teal-300 border border-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
              >
                <BookOpen className="w-4 h-4 text-teal-400 shrink-0" />
                <span>All {MASTER_EXAM_QUESTIONS.length} Cards →</span>
              </button>
            </div>
          )}
        </div>

        {/* 5-Tab Cramming Mode Switcher — Compact 2-Col on Mobile, 3-Col on Tablet, 5-Col on Desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-2 sm:gap-2.5 pt-1">
          <button
            onClick={() => setActivePhase('decision_tree')}
            className={`p-3 sm:p-3.5 rounded-xl border text-left transition-colors cursor-pointer space-y-1 min-w-0 ${
              activePhase === 'decision_tree'
                ? 'bg-teal-500/15 border-teal-500/50 text-slate-100'
                : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="text-[10px] sm:text-[11px] font-mono text-teal-400 font-bold flex items-center gap-1 truncate">
              <GitBranch className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">01. Decision Tree</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-100 truncate">
              10-Sec Flowchart
            </div>
            <p className="hidden sm:block text-[11px] text-slate-400 truncate">
              12 nodes for ODEs, Laplace & Fourier
            </p>
          </button>

          <button
            onClick={() => setActivePhase('cram_sheet')}
            className={`p-3 sm:p-3.5 rounded-xl border text-left transition-colors cursor-pointer space-y-1 min-w-0 ${
              activePhase === 'cram_sheet'
                ? 'bg-teal-500/15 border-teal-500/50 text-slate-100'
                : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="text-[10px] sm:text-[11px] font-mono text-amber-400 font-bold flex items-center gap-1 truncate">
              <Printer className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">02. Panic Sheet</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-100 truncate">
              1-Page Cram Sheet
            </div>
            <p className="hidden sm:block text-[11px] text-slate-400 truncate">
              All laws, tables & key corrections
            </p>
          </button>

          <button
            onClick={() => setActivePhase('bootcamp')}
            className={`p-3 sm:p-3.5 rounded-xl border text-left transition-colors cursor-pointer space-y-1 min-w-0 ${
              activePhase === 'bootcamp'
                ? 'bg-teal-500/15 border-teal-500/50 text-slate-100'
                : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="text-[10px] sm:text-[11px] font-mono text-teal-300 font-bold truncate tabular-nums">
              03. Bootcamp ({completedPatternCount}/{ZERO_TO_HERO_PATTERNS.length})
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-100 truncate">
              {ZERO_TO_HERO_PATTERNS.length} Exam Modules
            </div>
            <p className="hidden sm:block text-[11px] text-slate-400 truncate">
              Deep teaching of exam tricks
            </p>
          </button>

          <button
            onClick={() => setActivePhase('drill')}
            className={`p-3 sm:p-3.5 rounded-xl border text-left transition-colors cursor-pointer space-y-1 min-w-0 ${
              activePhase === 'drill'
                ? 'bg-teal-500/15 border-teal-500/50 text-slate-100'
                : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="text-[10px] sm:text-[11px] font-mono text-rose-400 font-bold truncate tabular-nums">
              04. Trap Drill ({weakSpotCount} Weak)
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-100 truncate">
              Reflex + Queue
            </div>
            <p className="hidden sm:block text-[11px] text-slate-400 truncate">
              Auto-queues missed questions
            </p>
          </button>

          <button
            onClick={() => setActivePhase('simulator')}
            className={`col-span-2 sm:col-span-1 p-3 sm:p-3.5 rounded-xl border text-left transition-colors cursor-pointer space-y-1 min-w-0 ${
              activePhase === 'simulator'
                ? 'bg-teal-500/15 border-teal-500/50 text-slate-100'
                : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="text-[10px] sm:text-[11px] font-mono text-emerald-400 font-bold truncate tabular-nums">
              05. Simulator ({simulatorScore.earned}/{simulatorScore.total})
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-100 truncate">
              11 Exam Papers
            </div>
            <p className="hidden sm:block text-[11px] text-slate-400 truncate">
              Simulate Final 1–6 & Midterms
            </p>
          </button>
        </div>
      </div>

      {/* =====================================================================
          TOOL 1: 1-PAGE VISUAL DECISION TREE (THE FIRST-10-SECONDS FLOWCHART)
          ===================================================================== */}
      {activePhase === 'decision_tree' && (
        <div className="space-y-5 sm:space-y-6 min-w-0">
          {/* Interactive 10-Second Spotter Mini-Game */}
          <div className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0">
              <div className="min-w-0">
                <span className="text-xs font-mono font-bold text-amber-400 block">
                  10-Second Recognition Reflex Check (اختبار سرعة اكتشاف نوع السؤال)
                </span>
                <h3 className="text-sm sm:text-lg font-bold text-slate-100 text-balance">
                  Look at this unlabeled exam problem — how do you classify it in 5 seconds?
                </h3>
              </div>

              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0">
                <button
                  onClick={() => setMysteryRevealed(!mysteryRevealed)}
                  className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold cursor-pointer whitespace-nowrap"
                >
                  {mysteryRevealed ? 'Hide Diagnosis' : 'Reveal 5-Sec Diagnosis'}
                </button>
                <button
                  onClick={() => {
                    setMysteryRevealed(false);
                    setQuickMysteryIndex((prev) => prev + 1);
                  }}
                  className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <span>Next Equation</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </button>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950 border border-slate-800 text-teal-300 text-sm sm:text-base overflow-x-auto text-center min-w-0">
              <MathView math={mysteryQuestion.problemLatex} block />
            </div>

            {mysteryRevealed && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 animate-fadeIn">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-teal-500/30 space-y-1 min-w-0">
                  <span className="text-xs font-bold text-teal-400 block">
                    Visual Clue Spotted:
                  </span>
                  <p className="text-xs text-slate-200 break-words">{mysteryQuestion.visualRecognitionTrigger}</p>
                  <p className="text-xs text-slate-400 break-words" dir="rtl">{mysteryQuestion.arabicVisualTrigger}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-1 min-w-0">
                  <span className="text-xs font-bold text-emerald-400 block">
                    Exact Method & First Move:
                  </span>
                  <p className="text-xs text-slate-200 font-semibold break-words">{mysteryQuestion.methodTag}</p>
                  <p className="text-xs text-slate-300 break-words">{mysteryQuestion.secretShortcut}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/30 space-y-1 min-w-0">
                  <span className="text-xs font-bold text-amber-400 block">
                    Trap to Avoid:
                  </span>
                  <p className="text-xs text-amber-100/90 break-words">{mysteryQuestion.examinerTrap}</p>
                </div>
              </div>
            )}
          </div>

          {/* Decision Tree Filter Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 px-1 min-w-0">
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-slate-100">
                The Complete 12-Node "If You See X → Do Y" Visual Decision Tree
              </h2>
              <p className="text-xs text-slate-400">
                Nodes 1–5 cover Q1 (1st-Order), Nodes 6–8 cover Q2 (Higher-Order), Nodes 9–10 cover Q3/Q4a (Laplace), and Nodes 11–12 cover Q4b/Q5 (Fourier & Legendre).
              </p>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 max-w-full sm:flex-wrap">
              {(
                [
                  'All',
                  'First-Order ODE (Q1)',
                  'Higher-Order ODE (Q2)',
                  'Laplace & Inverse Laplace (Q3 & Q4a)',
                  'Fourier Series & Legendre (Q4b & Q5)',
                ] as const
              ).map((grp) => (
                <button
                  key={grp}
                  onClick={() => setSelectedTreeFilter(grp)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    selectedTreeFilter === grp
                      ? 'bg-teal-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {grp}
                </button>
              ))}
            </div>
          </div>

          {/* Flowchart Nodes */}
          <div className="space-y-4 min-w-0">
            {filteredTreeNodes.map((node) => (
              <div
                key={node.id}
                className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 min-w-0"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800 min-w-0">
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2 text-xs font-mono text-teal-400 font-bold flex-wrap">
                      <span>Node {node.stepNumber < 10 ? `0${node.stepNumber}` : node.stepNumber}</span>
                      <span>·</span>
                      <span>{node.orderGroup}</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-100 break-words">
                      {node.ifYouSeeTitle}
                    </h3>
                    <p className="text-xs text-teal-300/90 break-words" dir="rtl">
                      {node.arabicIfYouSee}
                    </p>
                  </div>

                  {onOpenQuestionBank && (
                    <button
                      onClick={() => onOpenQuestionBank(node.sampleQuestionId)}
                      className="self-start sm:self-center px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-teal-400 border border-slate-800 text-xs font-mono shrink-0 cursor-pointer whitespace-nowrap"
                    >
                      Open Exam Example →
                    </button>
                  )}
                </div>

                {/* 3-Step Horizontal Flow: Visual Trigger → Instant Test/Action → Solution Formula */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 min-w-0">
                  {/* Column 1: If You See */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 min-w-0">
                    <div className="text-xs font-mono font-bold text-slate-400">
                      A. Visual Trigger in Problem
                    </div>
                    <div className="text-xs text-teal-300 overflow-x-auto py-1 min-w-0">
                      <MathView math={node.visualPatternLatex} block />
                    </div>
                    <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/80 overflow-x-auto">
                      Sample: <MathView math={node.sampleEquationLatex} inline />
                    </div>
                  </div>

                  {/* Column 2: Instant Test & Action */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 min-w-0">
                    <div className="text-xs font-mono font-bold text-emerald-400">
                      B. Immediate Action to Execute
                    </div>
                    <div className="text-xs text-emerald-300 overflow-x-auto py-1 min-w-0">
                      <MathView math={node.instantTestLatex} block />
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed break-words">{node.doThisAction}</p>
                    <p className="text-xs text-slate-400 leading-relaxed break-words" dir="rtl">
                      {node.arabicDoThis}
                    </p>
                  </div>

                  {/* Column 3: Formula & Trap */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 min-w-0">
                    <div className="text-xs font-mono font-bold text-amber-400">
                      C. Target Solution Formula & Trap
                    </div>
                    <div className="text-xs text-teal-200 overflow-x-auto py-1 min-w-0">
                      <MathView math={node.solutionFormulaLatex} block />
                    </div>
                    <div className="p-2.5 rounded-lg bg-amber-950/25 border border-amber-500/25 text-xs text-amber-200/90 leading-relaxed break-words">
                      <strong className="text-amber-400">Watch Out: </strong>
                      {node.killerTrapWarning}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          TOOL 2: PRINTABLE 1-SCREEN "NIGHT-BEFORE CRAM SHEET"
          ===================================================================== */}
      {activePhase === 'cram_sheet' && (
        <div className="space-y-5 sm:space-y-6 min-w-0">
          {/* Top Bar with Print Button */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden min-w-0">
            <div className="space-y-1 min-w-0">
              <div className="text-xs font-mono font-bold text-amber-400">
                1-Page Midterm & Final Panic Sheet (ملخص ليلة الامتحان الشامل)
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-100 text-balance">
                All ODEs, Undetermined Coeffs, Circuits, Laplace, Fourier, Legendre & Handwritten Answer Key Corrections
              </h2>
              <p className="text-xs text-slate-400">
                Everything required to solve any MTH203 / MTHn103 Midterm or Final exam question on a single printable sheet.
              </p>
            </div>

            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0 whitespace-nowrap"
            >
              <Printer className="w-4 h-4 shrink-0" />
              <span>Print / Save 1-Page PDF</span>
            </button>
          </div>

          {/* Section 1: First-Order ODE Master Comparison Table */}
          <div className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 sm:space-y-4 min-w-0">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <h3 className="text-xs sm:text-sm font-bold text-teal-400 font-mono">
                Part 1: First-Order ODEs — Standard Forms & Solution Recipes (Question 1)
              </h3>
              <span className="sm:hidden text-[11px] font-mono text-slate-400">
                ↔ Swipe table
              </span>
            </div>

            <div className="overflow-x-auto -mx-2 px-2 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[600px] text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono">
                    <th className="py-2.5 px-2.5">ODE Type</th>
                    <th className="py-2.5 px-2.5">Standard Form</th>
                    <th className="py-2.5 px-2.5">Substitution / Integrating Factor</th>
                    <th className="py-2.5 px-2.5">General Solution Formula</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-200">
                  <tr>
                    <td className="py-3 px-2.5 font-bold text-teal-300 whitespace-nowrap">1. Separable</td>
                    <td className="py-3 px-2.5"><MathView math="g(y)\,dy = f(x)\,dx" inline /></td>
                    <td className="py-3 px-2.5">Split <MathView math="e^{a+b}=e^a e^b, \; \frac{1}{\cos y}=\sec y" inline /></td>
                    <td className="py-3 px-2.5"><MathView math="\int g(y)\,dy = \int f(x)\,dx + C" inline /></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2.5 font-bold text-teal-300 whitespace-nowrap">2. Reducible Line</td>
                    <td className="py-3 px-2.5"><MathView math="y' = F(ax + by + c)" inline /></td>
                    <td className="py-3 px-2.5"><MathView math="z = ax + by \implies z' = a + by'" inline /></td>
                    <td className="py-3 px-2.5"><MathView math="\int \frac{dz}{a + bF(z)} = x + C" inline /></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2.5 font-bold text-teal-300 whitespace-nowrap">3. Homogeneous</td>
                    <td className="py-3 px-2.5"><MathView math="y' = F\left(\frac{y}{x}\right)" inline /></td>
                    <td className="py-3 px-2.5"><MathView math="u = \frac{y}{x} \implies y = xu \implies y' = xu' + u" inline /></td>
                    <td className="py-3 px-2.5"><MathView math="\int \frac{du}{F(u) - u} = \ln|x| + C" inline /></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2.5 font-bold text-teal-300 whitespace-nowrap">4A. Exact ODE</td>
                    <td className="py-3 px-2.5"><MathView math="M\,dx + N\,dy = 0" inline /></td>
                    <td className="py-3 px-2.5">Condition: <MathView math="M_y = N_x" inline /></td>
                    <td className="py-3 px-2.5"><MathView math="\int M\,dx + \int (\text{slash duplicate } N)\,dy = C" inline /></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2.5 font-bold text-teal-300 whitespace-nowrap">4B. Non-Exact (μ)</td>
                    <td className="py-3 px-2.5"><MathView math="M_y \neq N_x" inline /></td>
                    <td className="py-3 px-2.5">
                      <MathView math="\mu(x) = e^{\int \frac{M_y - N_x}{N}dx} \;\text{ or }\; \mu(y) = e^{\int \frac{N_x - M_y}{M}dy}" inline />
                    </td>
                    <td className="py-3 px-2.5">Multiply ODE by <MathView math="\mu" inline />, then solve as Exact</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2.5 font-bold text-teal-300 whitespace-nowrap">5. Linear 1st-Order</td>
                    <td className="py-3 px-2.5"><MathView math="y' + P(x)y = Q(x)" inline /></td>
                    <td className="py-3 px-2.5"><MathView math="\mu(x) = e^{\int P(x)\,dx}" inline /></td>
                    <td className="py-3 px-2.5"><MathView math="y = \mu^{-1}\left[\int \mu(x)Q(x)\,dx + C\right]" inline /></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2.5 font-bold text-amber-300 whitespace-nowrap">6. Bernoulli Shortcut</td>
                    <td className="py-3 px-2.5"><MathView math="y' + P(x)y = Q(x)y^n" inline /></td>
                    <td className="py-3 px-2.5">
                      <MathView math="P^* = (1-n)P, \; Q^* = (1-n)Q, \; \mu = e^{\int P^* dx}" inline />
                    </td>
                    <td className="py-3 px-2.5"><MathView math="y^{1-n} = \mu^{-1}\left[\int \mu(x)Q^*(x)\,dx + C\right]" inline /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2: Higher-Order ODEs, Undetermined Coeffs & Resonance Rule */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 min-w-0">
            {/* Auxiliary Roots + Reduction of Order + Variation of Parameters */}
            <div className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 sm:space-y-4 min-w-0">
              <h3 className="text-xs sm:text-sm font-bold text-teal-400 font-mono">
                Part 2A: Auxiliary Roots, Wronskian & Reduction of Order (Q2)
              </h3>
              <div className="space-y-2.5 text-xs text-slate-300 min-w-0">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 min-w-0">
                  <div className="font-bold text-slate-100">1. Distinct & Repeated Real Roots:</div>
                  <MathView math="y_h = (C_1 + C_2 x)e^{mx} \quad | \quad \text{For } m^3 = 0: \; y_h = C_1 + C_2 x + C_3 x^2" block />
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 min-w-0">
                  <div className="font-bold text-slate-100">2. Complex Conjugate Roots (<MathView math="m = \alpha \pm i\beta" inline />):</div>
                  <MathView math="y_h = e^{\alpha x}\left(C_1\cos(\beta x) + C_2\sin(\beta x)\right)" block />
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 min-w-0">
                  <div className="font-bold text-amber-300">3. Variation of Parameters (Wronskian — mandatory for <MathView math="\sec, \tan, \csc, \ln, e^x/x" inline />):</div>
                  <MathView math="W = y_1 y_2' - y_2 y_1', \quad u_1 = -\int \frac{y_2 G(x)}{W}dx, \quad u_2 = \int \frac{y_1 G(x)}{W}dx" block />
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-teal-500/30 space-y-1 min-w-0">
                  <div className="font-bold text-teal-300">4. Reduction of Order (Given <MathView math="y_1(x)" inline />):</div>
                  <p className="leading-relaxed">Let <MathView math="y = y_1(x)\cdot u(x)" inline />. Substitute <MathView math="y, y', y''" inline /> into ODE (all <MathView math="u" inline /> terms cancel!). Set <MathView math="z = u', \; z' = u''" inline />, solve 1st-order linear for <MathView math="z" inline />, integrate <MathView math="u = \int z\,dx" inline />, then multiply <MathView math="y = y_1 u" inline />.</p>
                </div>
              </div>
            </div>

            {/* Undetermined Coefficients Table + Resonance x^r Rule */}
            <div className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 sm:space-y-4 min-w-0">
              <h3 className="text-xs sm:text-sm font-bold text-amber-400 font-mono">
                Part 2B: Undetermined Coefficients & Resonance Boost Rule
              </h3>
              <div className="overflow-x-auto -mx-2 px-2 sm:mx-0 sm:px-0">
                <table className="w-full min-w-[440px] text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-mono">
                      <th className="py-2 px-2">RHS Term <MathView math="G(x)" inline /></th>
                      <th className="py-2 px-2">Base Trial <MathView math="y_p" inline /></th>
                      <th className="py-2 px-2">Multiply by <MathView math="x^r" inline /> if:</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-200">
                    <tr>
                      <td className="py-2.5 px-2"><MathView math="k e^{ax}" inline /></td>
                      <td className="py-2.5 px-2"><MathView math="A e^{ax}" inline /></td>
                      <td className="py-2.5 px-2"><MathView math="m = a" inline /> is a root of <MathView math="y_h" inline /></td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-2"><MathView math="kx + c" inline /> (Degree 1)</td>
                      <td className="py-2.5 px-2"><MathView math="Ax + B" inline /></td>
                      <td className="py-2.5 px-2 text-rose-300 font-semibold"><MathView math="m = 0" inline /> is a root (missing <MathView math="y" inline /> term!)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-2"><MathView math="x e^{ax}" inline /></td>
                      <td className="py-2.5 px-2"><MathView math="(Ax + B)e^{ax}" inline /></td>
                      <td className="py-2.5 px-2"><MathView math="m = a" inline /> is a root of <MathView math="y_h" inline /></td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-2"><MathView math="\cos(\beta x)" inline /> or <MathView math="\sin(\beta x)" inline /></td>
                      <td className="py-2.5 px-2"><MathView math="A\cos(\beta x) + B\sin(\beta x)" inline /></td>
                      <td className="py-2.5 px-2"><MathView math="m = \pm i\beta" inline /> is a root of <MathView math="y_h" inline /></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-950/25 border border-amber-500/30 space-y-1.5 text-xs min-w-0">
                <div className="font-bold text-amber-300">
                  Mandatory Pre-Simplifications Before Guessing <MathView math="y_p" inline />:
                </div>
                <MathView math="2\cos^2 x = 1 + \cos(2x), \quad 3\sin(3x)\cos(3x) = \frac{3}{2}\sin(6x), \quad \cos x\tan x = \sin x" block />
              </div>
            </div>
          </div>

          {/* Section 3: Final Exam Laplace & Inverse Laplace Master Reference */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 min-w-0">
            {/* Forward Laplace Rules */}
            <div className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 min-w-0">
              <h3 className="text-xs sm:text-sm font-bold text-teal-400 font-mono">
                Part 3A: Final Exam Forward Laplace Transforms (Q3 & Final Sheet [1])
              </h3>
              <div className="space-y-2 text-xs text-slate-300 min-w-0">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 min-w-0">
                  <div className="font-bold text-slate-100 mb-1">Core Pairs (<MathView math="\mathcal{L}\{f(t)\} = F(s)" inline />):</div>
                  <MathView math="\mathcal{L}\{t^n\} = \frac{n!}{s^{n+1}}, \quad \mathcal{L}\{e^{at}\} = \frac{1}{s-a}, \quad \mathcal{L}\{\cos bt\} = \frac{s}{s^2+b^2}, \quad \mathcal{L}\{\sin bt\} = \frac{b}{s^2+b^2}" block />
                  <MathView math="\mathcal{L}\{\cosh bt\} = \frac{s}{s^2-b^2}, \quad \mathcal{L}\{\sinh bt\} = \frac{b}{s^2-b^2}, \quad \mathcal{L}\{\delta(t-a)\} = e^{-as}" block />
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 min-w-0">
                  <div className="font-bold text-teal-300 mb-1">The 5 Operational Theorems (Final Exam Q3):</div>
                  <MathView math="1.\; \mathcal{L}\{e^{at}f(t)\} = F(s-a) \qquad 2.\; \mathcal{L}\{t^n f(t)\} = (-1)^n \frac{d^n}{ds^n}F(s)" block />
                  <MathView math="3.\; \mathcal{L}\left\{\frac{f(t)}{t}\right\} = \int_s^\infty F(u)\,du \qquad 4.\; \mathcal{L}\left\{\int_0^t f(u)du\right\} = \frac{F(s)}{s}" block />
                  <MathView math="5.\; \mathcal{L}\{u_c(t)g(t)\} = e^{-cs}\mathcal{L}\{g(t+c)\} \quad \left(\text{Evaluate } \int_0^\infty e^{-s_0 t}f(t)dt = F(s_0)\right)" block />
                </div>
              </div>
            </div>

            {/* Inverse Laplace & Laplace IVP Rules */}
            <div className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 min-w-0">
              <h3 className="text-xs sm:text-sm font-bold text-amber-400 font-mono">
                Part 3B: Inverse Laplace, Log/Arctan Rule & Laplace ODE IVPs (Q3/Q4a)
              </h3>
              <div className="space-y-2 text-xs text-slate-300 min-w-0">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 min-w-0">
                  <div className="font-bold text-slate-100 mb-1">Completing Square & Delayed Shifts:</div>
                  <MathView math="\mathcal{L}^{-1}\left\{\frac{(s-a) + k}{(s-a)^2 + b^2}\right\} = e^{at}\left[\cos bt + \frac{k}{b}\sin bt\right]" block />
                  <MathView math="\mathcal{L}^{-1}\{e^{-cs}F(s)\} = u_c(t)\,f(t-c) \quad (\text{Replace every } t \text{ by } t-c!)" block />
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 min-w-0">
                  <div className="font-bold text-amber-300 mb-1">Inverse of <MathView math="\ln, \tan^{-1}, \cot^{-1}" inline /> & Convolution:</div>
                  <MathView math="\mathcal{L}^{-1}\{F(s)\} = -\frac{1}{t}\mathcal{L}^{-1}\{F'(s)\}, \quad \mathcal{L}^{-1}\left\{\ln\frac{s-a}{s-b}\right\} = \frac{e^{bt}-e^{at}}{t}, \quad \mathcal{L}^{-1}\left\{\tan^{-1}\frac{a}{s}\right\} = \frac{\sin at}{t}" block />
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-teal-500/30 min-w-0">
                  <div className="font-bold text-teal-300 mb-1">Solving IVPs with Laplace (Final Sheet [3] & Finals 1–6):</div>
                  <MathView math="\mathcal{L}\{y''\} = s^2 Y(s) - s\,y(0) - y'(0), \qquad \mathcal{L}\{y'\} = s Y(s) - y(0)" block />
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Fourier Series & Legendre Polynomials + Circuits & Calculus Rescue */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 min-w-0">
            {/* Fourier Series & Legendre Polynomials */}
            <div className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 min-w-0">
              <h3 className="text-xs sm:text-sm font-bold text-emerald-400 font-mono">
                Part 4: Final Exam Fourier Series & Legendre Polynomials (Q4b & Q5)
              </h3>
              <div className="space-y-2 text-xs text-slate-300 min-w-0">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 min-w-0">
                  <div className="font-bold text-slate-100 mb-1">1. Full Fourier Series on <MathView math="(-L, L)" inline />:</div>
                  <MathView math="f(x) = \frac{a_0}{2} + \sum_{n=1}^\infty \left(a_n\cos\frac{n\pi x}{L} + b_n\sin\frac{n\pi x}{L}\right), \quad a_n = \frac{1}{L}\int_{-L}^L f(x)\cos\frac{n\pi x}{L}dx" block />
                  <p className="text-[11px] text-teal-300 pt-1">
                    <strong>Even (<MathView math="f(-x)=f(x)" inline />):</strong> <MathView math="b_n = 0, \; a_n = \frac{2}{L}\int_0^L" inline />. <strong>Odd (<MathView math="f(-x)=-f(x)" inline />):</strong> <MathView math="a_0=a_n=0, \; b_n = \frac{2}{L}\int_0^L" inline />.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 min-w-0">
                  <div className="font-bold text-amber-300 mb-1">2. Half-Range Cosine / Sine Series on <MathView math="(0, L)" inline />:</div>
                  <p className="text-[11px] leading-relaxed">
                    <strong>Cosine Series:</strong> <MathView math="b_n = 0" inline />, compute <MathView math="a_0 = \frac{2}{L}\int_0^L f(x)dx" inline /> and <MathView math="a_n = \frac{2}{L}\int_0^L f(x)\cos\frac{n\pi x}{L}dx" inline />. (Remember <MathView math="\cos(n\pi) = (-1)^n, \; \sin(n\pi) = 0" inline />!)
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 min-w-0">
                  <div className="font-bold text-teal-300 mb-1">3. Legendre ODE, Polynomials & Orthogonality (Final 1 Q5 & Final 3 Q5):</div>
                  <MathView math="(1-x^2)y'' - 2xy' + n(n+1)y = 0 \quad \left(\text{At } x=0: \; y_{n+2} = -\frac{(n-k)(n+k+1)}{(k+1)(k+2)}y_k\right)" block />
                  <MathView math="P_0=1, \; P_1=x, \; P_2=\frac{1}{2}(3x^2-1), \; P_3=\frac{1}{2}(5x^3-3x), \quad \int_{-1}^1 P_m P_n dx = \frac{2}{2n+1}\delta_{mn}" block />
                </div>
              </div>
            </div>

            {/* Physical Circuits + Prerequisite Calculus & Conics Rescue */}
            <div className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 min-w-0">
              <h3 className="text-xs sm:text-sm font-bold text-teal-400 font-mono">
                Part 5: Physical Circuits & Calculus/Appendices Rescue Sheet
              </h3>
              <div className="space-y-2 text-xs text-slate-300 min-w-0">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 min-w-0">
                  <div className="font-bold text-slate-100 mb-1">RL, RLC & Mass-Spring-Damper Equations:</div>
                  <MathView math="L\frac{dI}{dt}+RI=E(t), \quad L\frac{d^2i}{dt^2}+R\frac{di}{dt}+\frac{1}{C}i=0 \; \left(\frac{1}{0.02}=50!\right), \quad m\ddot{x}+c\dot{x}+kx=0" block />
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 min-w-0">
                  <div className="font-bold text-slate-100 mb-1">Fast Tabular Integration by Parts & Missing Derivatives:</div>
                  <MathView math="\int xe^{ax}dx = \frac{e^{ax}}{a^2}(ax-1), \quad \int ye^{y^2}dy = \frac{1}{2}e^{y^2}, \quad \int \frac{f'(x)}{f(x)}dx = \ln|f(x)|" block />
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 min-w-0">
                  <div className="font-bold text-slate-100 mb-1">Reduction & Improper Integral Benchmarks (Math 2 Bank):</div>
                  <MathView math="I_n = \int \sin^n x\,dx = -\frac{\sin^{n-1}x\cos x}{n} + \frac{n-1}{n}I_{n-2}, \quad \int_1^\infty \frac{dx}{x^p}\text{ converges iff } p > 1" block />
                </div>
              </div>
            </div>
          </div>

          {/* Section 6: Official Corrections to Student Handwritten Answer Keys (Ans.Final_2, 3, 4, 6) */}
          <div className="p-4 sm:p-6 rounded-2xl bg-rose-950/20 border border-rose-500/35 space-y-3 min-w-0">
            <h3 className="text-xs sm:text-sm font-bold text-rose-400 font-mono flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Part 6: Warning — 8 Critical Errors Found in Uploaded Handwritten Answer Keys (Ans.Final 2, 3, 4, 6)</span>
            </h3>
            <p className="text-xs text-slate-300">
              Do NOT copy these mistakes from the circulating student handwritten sheets (`Ans.Final_2`, `Ans.Final_3`, `Ans.Final_4`, `Ans.Final_6`) into your exam paper:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-slate-200 min-w-0">
              <div className="p-3 rounded-xl bg-slate-950/90 border border-rose-500/30 min-w-0 overflow-x-auto">
                <strong className="text-rose-400">1. Ans.Final 2 Q3(b)(i):</strong> Wrote <MathView math="\cos(3t+\frac{\pi}{2}) = \cos 3t + \cos\frac{\pi}{2}" inline /> (FALSE!). True identity: <MathView math="\cos(3t+\frac{\pi}{2}) = -\sin 3t \implies -\frac{3}{s^2+9}" inline />.
              </div>
              <div className="p-3 rounded-xl bg-slate-950/90 border border-rose-500/30 min-w-0 overflow-x-auto">
                <strong className="text-rose-400">2. Ans.Final 2 Q4(b) (Fourier Cosine):</strong> Set <MathView math="a_0=0" inline /> and left <MathView math="x" inline /> un-integrated inside <MathView math="a_n" inline />! True answer (`Fourier.pdf` p.2): <MathView math="b_n=0, \; a_0=\pi, \; a_n = \frac{2}{\pi n^2}[(-1)^n-1]" inline />.
              </div>
              <div className="p-3 rounded-xl bg-slate-950/90 border border-rose-500/30 min-w-0 overflow-x-auto">
                <strong className="text-rose-400">3. Ans.Final 3 Q1(c) (Skipped `[c] XX`):</strong> Solved in our bank! Factor <MathView math="(x^3+xy^2) + (x^2y+y^3)y'=0 \implies (x+yy')=0 \implies x^2+y^2=C" inline /> or solve the homogeneous cubic via <MathView math="y=vx" inline />.
              </div>
              <div className="p-3 rounded-xl bg-slate-950/90 border border-rose-500/30 min-w-0 overflow-x-auto">
                <strong className="text-rose-400">4. Ans.Final 3 Q2(b) (Resonance Missed):</strong> For <MathView math="y''-y'-2y = 4x+6e^{-x}" inline />, <MathView math="m=-1" inline /> is a root of <MathView math="y_h" inline />! You MUST multiply <MathView math="Ce^{-x}" inline /> by <MathView math="x \implies y_p = Ax+B+Cxe^{-x}" inline /> (<MathView math="C=-2" inline />).
              </div>
              <div className="p-3 rounded-xl bg-slate-950/90 border border-rose-500/30 min-w-0 overflow-x-auto">
                <strong className="text-rose-400">5. Ans.Final 3 Q3(a) (Definite Integral):</strong> Treated <MathView math="\int_0^\infty e^{-3t}\sin^2 t\,dt" inline /> as <MathView math="\int_0^t" inline />! Since upper limit is <MathView math="\infty" inline />, evaluate <MathView math="F(s) = \frac{2}{s(s^2+4)}" inline /> at <MathView math="s=3 \implies \frac{2}{39}" inline />.
              </div>
              <div className="p-3 rounded-xl bg-slate-950/90 border border-rose-500/30 min-w-0 overflow-x-auto">
                <strong className="text-rose-400">6. Ans.Final 4 Q2(a) (Missing 3rd Constant):</strong> For <MathView math="(m-1)^2(m-2)=0" inline />, wrote only <MathView math="C_1 e^{2x}+C_2 e^x" inline />, forgetting the repeated root term <MathView math="+ C_3 x e^x" inline />!
              </div>
              <div className="p-3 rounded-xl bg-slate-950/90 border border-rose-500/30 min-w-0 overflow-x-auto">
                <strong className="text-rose-400">7. Ans.Final 6 Q2(c) (Wrong Aux Eq):</strong> For <MathView math="y''-y' = 5x+e^{3x}" inline />, wrote <MathView math="m^2-1=0" inline /> instead of <MathView math="m^2-m=0" inline />, missing <MathView math="m=0" inline /> and the mandatory <MathView math="x(Ax+B)" inline /> boost!
              </div>
              <div className="p-3 rounded-xl bg-slate-950/90 border border-rose-500/30 min-w-0 overflow-x-auto">
                <strong className="text-rose-400">8. Ans.Final 6 Q3(b)(i) (Constant <MathView math="e^3" inline />):</strong> In <MathView math="\mathcal{L}\{u_2(t)e^3\sin(t-2)\}" inline />, <MathView math="e^3" inline /> is a constant number, NOT <MathView math="e^{3t}" inline />! Answer is <MathView math="\frac{e^3 e^{-2s}}{s^2+1}" inline />.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          TOOL 3: 30-MINUTE ZERO-TO-HERO PATTERN BOOTCAMP
          ===================================================================== */}
      {activePhase === 'bootcamp' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 min-w-0">
          {/* Left/Top Module Selector: Horizontal Touch Ribbon on Mobile/Tablet, Vertical Stack on Desktop */}
          <div className="lg:col-span-4 space-y-2.5 min-w-0">
            <div className="px-1 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>The {ZERO_TO_HERO_PATTERNS.length} Exam Blueprint Modules</span>
              <span className="tabular-nums">{completedPatternCount}/{ZERO_TO_HERO_PATTERNS.length} Done</span>
            </div>

            <div className="flex lg:flex-col gap-2.5 overflow-x-auto no-scrollbar pb-2 lg:pb-0 -mx-1 px-1">
              {ZERO_TO_HERO_PATTERNS.map((pat) => {
                const isSelected = pat.id === selectedPatternId;
                const isDone = !!completedPatterns[pat.id];

                return (
                  <button
                    key={pat.id}
                    onClick={() => setSelectedPatternId(pat.id)}
                    className={`w-[250px] sm:w-[270px] lg:w-full shrink-0 p-3.5 sm:p-4 rounded-xl border text-left transition-colors cursor-pointer space-y-1.5 ${
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
                    <div className="text-xs sm:text-sm font-bold text-slate-100 leading-snug line-clamp-2">
                      {pat.name}
                    </div>
                    <div className="text-xs text-slate-400 truncate" dir="rtl">
                      {pat.arabicName}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-8 space-y-5 min-w-0">
            <div className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 sm:space-y-6 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 min-w-0">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs font-mono text-teal-400 flex-wrap">
                    <span>Frequency: {activePattern.frequencyInExams}</span>
                    <span>·</span>
                    <span>Study Time: {activePattern.timeToMaster}</span>
                  </div>
                  <h2 className="text-base sm:text-xl font-bold text-slate-100 break-words">
                    {activePattern.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-teal-300/90 font-medium" dir="rtl">
                    {activePattern.arabicName}
                  </p>
                </div>

                <button
                  onClick={() => togglePatternComplete(activePattern.id)}
                  className={`self-start sm:self-center px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-colors cursor-pointer shrink-0 whitespace-nowrap ${
                    completedPatterns[activePattern.id]
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-teal-500 text-slate-950 border-teal-400 hover:bg-teal-400'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>
                    {completedPatterns[activePattern.id]
                      ? 'Module Completed'
                      : 'Mark Module Mastered'}
                  </span>
                </button>
              </div>

              <div className="space-y-2 min-w-0">
                <div className="text-xs font-mono font-bold text-slate-300">
                  1. Visual Signature on the Exam Paper (شكل السؤال في ورقة الامتحان)
                </div>
                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950 border border-slate-800 text-teal-300 text-xs sm:text-sm overflow-x-auto min-w-0">
                  <MathView math={activePattern.visualSignatureLatex} block />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs min-w-0">
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-slate-300 leading-relaxed break-words">
                    <strong className="text-teal-400 block mb-1">How to Spot It Instantly:</strong>
                    {activePattern.howToSpotIt}
                  </div>
                  <div
                    className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-slate-300 leading-relaxed break-words"
                    dir="rtl"
                  >
                    <strong className="text-teal-400 block mb-1">كيف تكتشفها بمجرد النظر:</strong>
                    {activePattern.arabicHowToSpot}
                  </div>
                </div>
              </div>

              <div className="space-y-2.5 min-w-0">
                <div className="text-xs font-mono font-bold text-slate-300">
                  2. The Golden Exam Algorithm (خوارزمية الحل المضمونة خطوة بخطوة)
                </div>
                <div className="space-y-2 min-w-0">
                  {activePattern.goldenAlgorithm.map((rule, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800/90 flex items-start gap-3 text-xs sm:text-sm text-slate-200 leading-relaxed min-w-0"
                    >
                      <span className="w-6 h-6 rounded-lg bg-teal-500/15 text-teal-300 border border-teal-500/30 flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 tabular-nums">
                        {idx + 1}
                      </span>
                      <span className="break-words min-w-0">{rule}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 min-w-0">
                <div className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>
                    3. Examiner's Favorite Traps & Handwritten Key Corrections (أشهر خدع الامتحانات)
                  </span>
                </div>
                <div className="space-y-3 min-w-0">
                  {activePattern.examinerFavoriteTricks.map((t, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 sm:p-4 rounded-xl bg-amber-950/15 border border-amber-500/25 space-y-2.5 min-w-0"
                    >
                      <div className="text-xs sm:text-sm font-bold text-amber-300 break-words">
                        Trap #{idx + 1}: {t.trickTitle}
                      </div>
                      <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-teal-300 text-xs overflow-x-auto min-w-0">
                        <MathView math={t.exampleLatex} block />
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed break-words">
                        <strong className="text-emerald-400">How to Defeat It: </strong>
                        {t.howToDefeatIt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-800 min-w-0">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-xs font-mono font-bold text-slate-300">
                    4. All {patternQuestions.length} Real Exam Questions Using This Pattern
                  </span>
                  {onOpenQuestionBank && (
                    <button
                      onClick={() => onOpenQuestionBank(undefined, 'All')}
                      className="text-xs text-teal-400 hover:underline cursor-pointer"
                    >
                      View all in Question Bank →
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 min-w-0">
                  {patternQuestions.map((q) => (
                    <div
                      key={q.id}
                      onClick={() => {
                        if (onOpenQuestionBank) onOpenQuestionBank(q.id, 'All');
                      }}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-teal-500/40 transition-colors cursor-pointer space-y-2 min-w-0"
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
                        <span className="text-teal-400 font-bold truncate">{q.numberLabel}</span>
                        <span className="shrink-0 tabular-nums">
                          {q.difficulty} · {q.points} pts
                        </span>
                      </div>
                      <div className="text-xs text-slate-200 overflow-x-auto py-0.5 min-w-0">
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
          TOOL 4: TWO-STEP TRAP DRILL + WEAK-SPOT MISTAKE QUEUE
          ===================================================================== */}
      {activePhase === 'drill' && (
        <div className="space-y-5 sm:space-y-6 min-w-0">
          {/* Drill Filter Bar */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 min-w-0">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0 max-w-full md:flex-wrap">
              {[
                { id: 'Golden12', label: `★ Golden ${GOLDEN_12_QUESTION_IDS.length} Playlist` },
                { id: 'WeakSpots', label: `Mistake Queue (${weakSpotCount})` },
                { id: 'All', label: `All ${MASTER_EXAM_QUESTIONS.length} Cards` },
                { id: 'First-Order', label: 'First-Order ODE' },
                { id: 'Higher-Order', label: 'Higher-Order ODE' },
                { id: 'Laplace & Inverse', label: 'Laplace & Inverse' },
                { id: 'Fourier & Legendre', label: 'Fourier & Legendre' },
                { id: 'Calculus Rescue', label: 'Calculus & Conics' },
                { id: 'Tricks & Boss', label: 'Tricks & Boss' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    setDrillFilter(f.id as any);
                    setDrillIndex(0);
                    setSelectedMethodIdx(null);
                    setSelectedKeyStepIdx(null);
                    setDrillSubmitted(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    drillFilter === f.id
                      ? 'bg-teal-500 text-slate-950 font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between md:justify-end gap-3 text-xs font-mono text-slate-300 shrink-0">
              {drillQuestions.length > 0 && (
                <>
                  <span className="tabular-nums">
                    Q {(drillIndex % drillQuestions.length) + 1} / {drillQuestions.length}
                  </span>
                  <span>·</span>
                </>
              )}
              <span className="text-teal-400 font-bold tabular-nums">
                Score: {drillStats.perfect}/{drillStats.attempted} Perfect
              </span>
            </div>
          </div>

          {/* Empty State if WeakSpots is selected and empty */}
          {!currentDrillQ ? (
            <div className="p-8 sm:p-10 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-100">
                Zero Questions in Your Weak-Spot Mistake Queue!
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Whenever you miss a step during any drill, it is automatically added here so you can drill your mistakes until this queue reaches zero.
              </p>
              <button
                onClick={() => setDrillFilter('Golden12')}
                className="px-4 py-2 rounded-xl bg-teal-500 text-slate-950 text-xs font-bold cursor-pointer"
              >
                Drill the {GOLDEN_12_QUESTION_IDS.length} Golden Exam Archetypes
              </button>
            </div>
          ) : (
            <div className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 sm:space-y-6 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800 min-w-0">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 flex-wrap">
                  <span className="text-teal-400 font-bold">{currentDrillQ.numberLabel}</span>
                  <span>·</span>
                  <span>{currentDrillQ.sourceExam}</span>
                  <span>·</span>
                  <span className="tabular-nums">{currentDrillQ.points} Points</span>
                  {GOLDEN_12_QUESTION_IDS.includes(currentDrillQ.id) && (
                    <>
                      <span>·</span>
                      <span className="text-amber-400 font-bold">★ Golden Archetype</span>
                    </>
                  )}
                  {weakSpotIds[currentDrillQ.id] && (
                    <>
                      <span>·</span>
                      <span className="text-rose-400 font-bold">In Mistake Queue</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-wrap shrink-0">
                  {weakSpotIds[currentDrillQ.id] ? (
                    <button
                      onClick={() => handleRemoveFromWeakQueue(currentDrillQ.id)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-semibold cursor-pointer whitespace-nowrap"
                    >
                      ✓ Clear Weak Spot
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddToWeakQueue(currentDrillQ.id)}
                      className="px-3 py-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-xs font-semibold cursor-pointer whitespace-nowrap"
                    >
                      + Flag Weak Spot
                    </button>
                  )}

                  <button
                    onClick={handleNextDrill}
                    className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  </button>
                </div>
              </div>

              {/* Equation Display */}
              <div className="space-y-2 text-center min-w-0">
                <span className="text-xs font-mono text-slate-400 block">
                  Analyze this Exam Question & Identify the Method + Key Step:
                </span>
                {currentDrillQ.problemStatement && (
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto break-words">
                    {currentDrillQ.problemStatement}
                  </p>
                )}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 text-teal-300 text-sm sm:text-lg overflow-x-auto min-w-0">
                  <MathView math={currentDrillQ.problemLatex} block />
                </div>
              </div>

              {/* Two-Part Diagnostic Questions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 min-w-0">
                {/* Part A: Identify Method */}
                <div className="p-4 sm:p-5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3 min-w-0">
                  <div className="text-xs font-mono font-bold text-teal-400">
                    Step 1: Which Solution Method Applies Here?
                  </div>
                  <div className="space-y-2 min-w-0">
                    {currentDrillQ.drillOptions.methodChoices.map((choice, idx) => {
                      const isSelected = selectedMethodIdx === idx;
                      const isCorrect = idx === currentDrillQ.drillOptions.correctMethodIndex;

                      let btnStyle =
                        'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';
                      if (drillSubmitted) {
                        if (isCorrect) {
                          btnStyle =
                            'bg-emerald-950/40 border-emerald-500/60 text-emerald-200 font-bold';
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
                          className={`w-full min-h-[44px] py-3 px-3.5 rounded-xl border text-left text-xs leading-relaxed transition-colors cursor-pointer flex items-center justify-between gap-2 min-w-0 ${btnStyle}`}
                        >
                          <span className="break-words min-w-0">{choice}</span>
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
                <div className="p-4 sm:p-5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3 min-w-0">
                  <div className="text-xs font-mono font-bold text-amber-400 break-words">
                    Step 2: {currentDrillQ.drillOptions.keyStepPrompt}
                  </div>
                  <div className="space-y-2 min-w-0">
                    {currentDrillQ.drillOptions.keyStepChoices.map((choice, idx) => {
                      const isSelected = selectedKeyStepIdx === idx;
                      const isCorrect = idx === currentDrillQ.drillOptions.correctKeyStepIndex;

                      let btnStyle =
                        'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';
                      if (drillSubmitted) {
                        if (isCorrect) {
                          btnStyle =
                            'bg-emerald-950/40 border-emerald-500/60 text-emerald-200 font-bold';
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
                          className={`w-full min-h-[44px] py-3 px-3.5 rounded-xl border text-left text-xs leading-relaxed transition-colors cursor-pointer flex items-center justify-between gap-2 min-w-0 ${btnStyle}`}
                        >
                          <span className="break-words min-w-0">{choice}</span>
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
                  className="w-full py-3.5 px-4 sm:px-6 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-40 text-slate-950 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  Check Both Answers & Reveal Complete Official Model Derivation
                </button>
              ) : (
                <div className="space-y-5 pt-4 border-t border-slate-800 animate-fadeIn min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800 min-w-0">
                    <div className="space-y-1 min-w-0">
                      <div className="text-xs font-bold text-amber-400">
                        Examiner Trap on This Question:
                      </div>
                      <p className="text-xs text-slate-300 break-words">{currentDrillQ.examinerTrap}</p>
                      <p className="text-xs text-slate-400 break-words" dir="rtl">
                        {currentDrillQ.arabicExaminerTrap}
                      </p>
                    </div>
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0">
                      {weakSpotIds[currentDrillQ.id] && (
                        <button
                          onClick={() => handleRemoveFromWeakQueue(currentDrillQ.id)}
                          className="px-3.5 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-bold text-xs cursor-pointer whitespace-nowrap"
                        >
                          ✓ Remove from Weak Queue
                        </button>
                      )}
                      <button
                        onClick={handleNextDrill}
                        className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer whitespace-nowrap"
                      >
                        <span>Next Question</span>
                        <ArrowRight className="w-4 h-4 shrink-0" />
                      </button>
                    </div>
                  </div>

                  {/* Full Step-by-Step Solution */}
                  <div className="space-y-2.5 min-w-0">
                    {currentDrillQ.steps.map((s) => (
                      <div
                        key={s.stepNumber}
                        className="p-3.5 sm:p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 min-w-0"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-bold text-slate-200">
                          <span>
                            Step {s.stepNumber}: {s.title}
                          </span>
                          <span className="text-teal-400">{s.arabicTitle}</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-teal-300 text-xs overflow-x-auto min-w-0">
                          <MathView math={s.formula} block />
                        </div>
                        <p className="text-xs text-slate-400 break-words">{s.explanation}</p>
                      </div>
                    ))}
                    <div className="p-4 rounded-xl bg-teal-950/30 border border-teal-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2 min-w-0">
                      <span className="text-xs font-bold text-teal-300 shrink-0">Final Boxed Solution:</span>
                      <div className="text-sm font-bold text-teal-200 overflow-x-auto max-w-full">
                        <MathView math={currentDrillQ.finalAnswerLatex} inline />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          TOOL 5: REAL EXAM PAPER INTERACTIVE SIMULATOR
          ===================================================================== */}
      {activePhase === 'simulator' && (
        <div className="space-y-5 sm:space-y-6 min-w-0">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-3 min-w-0">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 lg:pb-0 max-w-full lg:flex-wrap">
              {[
                'Final Written Exam 1 (Fall 2017–2018)',
                'Final Written Exam 2 (Fall 2019–2020 3hr)',
                'Final Written Exam 3 (Fall 2016–2017)',
                'Final Written Exam 4 (Summer 2017–2018)',
                'Final Written Exam 5/6 (Fall 2019–2020 2hr)',
                'Official Final Revision Sheet Fall 2024–2025',
                'Midterm Written Exam Fall 2025–2026',
                'Midterm Written Exam Fall 2024–2025',
                'Midterm Written Exam Fall 2023–2024',
                'Midterm Exam Fall 2021–2022',
                'Midterm Exam Fall 2020–2021',
              ].map((paper) => (
                <button
                  key={paper}
                  onClick={() => setSelectedExamPaper(paper)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    selectedExamPaper === paper
                      ? 'bg-teal-500 text-slate-950 font-bold'
                      : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  {paper
                    .replace('Final Written Exam ', 'Final ')
                    .replace('Midterm Written Exam ', 'Midterm ')
                    .replace('Midterm Exam ', 'Midterm ')
                    .replace('Official Final Revision Sheet ', 'Final Sheet ')}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between lg:justify-end gap-3 text-xs font-mono shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Simulated Grade:</span>
                <span className="text-teal-400 font-bold text-sm tabular-nums">
                  {simulatorScore.earned} / {simulatorScore.total} Marks
                </span>
              </div>
              <button
                onClick={() => setSimStepAnswers({})}
                className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 border border-slate-800 cursor-pointer whitespace-nowrap"
              >
                Reset Paper
              </button>
            </div>
          </div>

          <div className="space-y-4 min-w-0">
            {simulatorQuestions.map((q) => {
              const userAns = simStepAnswers[q.id] || {};
              const isRevealed = !!userAns.revealed;

              return (
                <div
                  key={q.id}
                  className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 min-w-0"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800 min-w-0">
                    <div className="flex items-center gap-2 text-xs font-mono text-teal-400 font-bold flex-wrap">
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
                      className="self-start sm:self-center text-xs text-teal-400 hover:underline font-semibold cursor-pointer"
                    >
                      {isRevealed
                        ? 'Hide Official Model Answer'
                        : 'Check & Reveal Official Model Answer'}
                    </button>
                  </div>

                  {q.problemStatement && (
                    <p className="text-xs sm:text-sm text-slate-300 break-words">{q.problemStatement}</p>
                  )}

                  <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950 border border-slate-800 text-teal-300 text-xs sm:text-base overflow-x-auto min-w-0">
                    <MathView math={q.problemLatex} block />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
                    <div className="space-y-1.5 min-w-0">
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
                              method:
                                e.target.value === '' ? undefined : Number(e.target.value),
                            },
                          }))
                        }
                        className="w-full max-w-full min-w-0 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-500 truncate"
                      >
                        <option value="">-- Choose Method --</option>
                        {q.drillOptions.methodChoices.map((c, idx) => (
                          <option key={idx} value={idx}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5 min-w-0">
                      <label className="text-xs font-mono text-slate-400 block truncate">
                        2. {q.drillOptions.keyStepPrompt} ({q.points / 2} pts):
                      </label>
                      <select
                        value={userAns.step ?? ''}
                        onChange={(e) =>
                          setSimStepAnswers((prev) => ({
                            ...prev,
                            [q.id]: {
                              ...prev[q.id],
                              step:
                                e.target.value === '' ? undefined : Number(e.target.value),
                            },
                          }))
                        }
                        className="w-full max-w-full min-w-0 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-500 truncate"
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

                  {isRevealed && (
                    <div className="pt-4 border-t border-slate-800 space-y-3 animate-fadeIn min-w-0">
                      <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200 break-words">
                        <strong className="text-amber-400">Examiner Trap: </strong>
                        {q.examinerTrap} ({q.arabicExaminerTrap})
                      </div>
                      {q.steps.map((s) => (
                        <div
                          key={s.stepNumber}
                          className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 min-w-0"
                        >
                          <div className="text-xs font-bold text-slate-200 break-words">
                            Step {s.stepNumber}: {s.title} —{' '}
                            <span className="text-teal-400">{s.arabicTitle}</span>
                          </div>
                          <div className="text-xs text-teal-300 overflow-x-auto py-1 min-w-0">
                            <MathView math={s.formula} block />
                          </div>
                          <div className="text-xs text-slate-400 break-words">{s.explanation}</div>
                        </div>
                      ))}
                      <div className="p-3.5 rounded-xl bg-teal-950/30 border border-teal-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2 min-w-0">
                        <span className="text-xs font-bold text-teal-300 shrink-0">
                          Official Boxed Answer:
                        </span>
                        <div className="overflow-x-auto max-w-full">
                          <MathView math={q.finalAnswerLatex} inline />
                        </div>
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
