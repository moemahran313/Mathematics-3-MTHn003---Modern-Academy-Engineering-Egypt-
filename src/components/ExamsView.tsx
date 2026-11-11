import React, { useState, useMemo, useEffect } from 'react';
import {
  Trophy,
  Zap,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  BookOpen,
  Award,
  Eye,
  Flame,
  Bookmark,
  Printer,
  GitBranch,
  FileText,
  RotateCcw,
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
  const [selectedTreeFilter, setSelectedTreeFilter] = useState<'All' | 'First-Order ODE (Q1)' | 'Higher-Order ODE (Q2)'>('All');
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
    'All' | 'Golden12' | 'WeakSpots' | 'First-Order' | 'Higher-Order' | 'Tricks & Boss'
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
    'Midterm Written Exam Fall 2025–2026'
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
    <div className="space-y-6 pb-12">
      {/* Top Hero & 5-Tool Scientific Cramming Hub */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 print:hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-teal-400 font-mono flex-wrap">
              <span>SCIENTIFIC ZERO-TO-HERO EXAM LAB</span>
              <span>·</span>
              <span>10-SEC DECISION TREE</span>
              <span>·</span>
              <span>1-PAGE PANIC CRAM SHEET</span>
              <span>·</span>
              <span className="text-amber-400 font-bold">12 GOLDEN QUESTIONS</span>
              {weakSpotCount > 0 && (
                <>
                  <span>·</span>
                  <span className="text-rose-400 font-bold tabular-nums">
                    {weakSpotCount} WEAK SPOTS QUEUED
                  </span>
                </>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
              30-Minute Zero-to-Hero Exam Cramming & Diagnostic Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
              Built from a line-by-line analysis of all 58 Modern Academy exam & revision sheet questions. Identify any equation in 10 seconds, review the 1-page printable panic sheet, drill your mistake queue, or practice the 12 Golden Archetypes.
            </p>
          </div>

          {/* Quick Jump Buttons to Golden 12 & Weak Spots in Question Bank */}
          {onOpenQuestionBank && (
            <div className="flex items-center gap-2 flex-wrap shrink-0">
              <button
                onClick={() => onOpenQuestionBank(undefined, 'Golden12')}
                className="px-3.5 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
              >
                <Flame className="w-4 h-4 text-amber-400" />
                <span>45-Min Golden 12 Playlist</span>
              </button>

              <button
                onClick={() => onOpenQuestionBank(undefined, 'WeakSpots')}
                className="px-3.5 py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/40 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
              >
                <Bookmark className="w-4 h-4 text-rose-400" />
                <span className="tabular-nums">Mistake Queue ({weakSpotCount})</span>
              </button>

              <button
                onClick={() => onOpenQuestionBank(undefined, 'All')}
                className="px-3.5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-teal-300 border border-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
              >
                <BookOpen className="w-4 h-4 text-teal-400" />
                <span>All 58 Questions →</span>
              </button>
            </div>
          )}
        </div>

        {/* 5-Tab Cramming Mode Switcher */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 pt-1">
          <button
            onClick={() => setActivePhase('decision_tree')}
            className={`p-3.5 rounded-xl border text-left transition-colors cursor-pointer space-y-1 ${
              activePhase === 'decision_tree'
                ? 'bg-teal-500/15 border-teal-500/50 text-slate-100'
                : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="text-[11px] font-mono text-teal-400 font-bold flex items-center gap-1">
              <GitBranch className="w-3.5 h-3.5" />
              <span>1. FIRST 10 SECONDS</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-100">
              Visual Decision Tree
            </div>
            <p className="text-[11px] text-slate-400">
              "If You See X → Do Y" instant equation classifier
            </p>
          </button>

          <button
            onClick={() => setActivePhase('cram_sheet')}
            className={`p-3.5 rounded-xl border text-left transition-colors cursor-pointer space-y-1 ${
              activePhase === 'cram_sheet'
                ? 'bg-teal-500/15 border-teal-500/50 text-slate-100'
                : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="text-[11px] font-mono text-amber-400 font-bold flex items-center gap-1">
              <Printer className="w-3.5 h-3.5" />
              <span>2. 1-PAGE PANIC SHEET</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-100">
              Night-Before Cram Sheet
            </div>
            <p className="text-[11px] text-slate-400">
              All laws, y_p table, circuits, integrals & 10 traps
            </p>
          </button>

          <button
            onClick={() => setActivePhase('bootcamp')}
            className={`p-3.5 rounded-xl border text-left transition-colors cursor-pointer space-y-1 ${
              activePhase === 'bootcamp'
                ? 'bg-teal-500/15 border-teal-500/50 text-slate-100'
                : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="text-[11px] font-mono text-teal-300 font-bold">
              3. PATTERN BOOTCAMP ({completedPatternCount}/6)
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-100">
              6 Exam Modules & Tricks
            </div>
            <p className="text-[11px] text-slate-400">
              Deep teaching of P*/Q*, strike-out & m³=0
            </p>
          </button>

          <button
            onClick={() => setActivePhase('drill')}
            className={`p-3.5 rounded-xl border text-left transition-colors cursor-pointer space-y-1 ${
              activePhase === 'drill'
                ? 'bg-teal-500/15 border-teal-500/50 text-slate-100'
                : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="text-[11px] font-mono text-rose-400 font-bold">
              4. TRAP DRILL & QUEUE ({weakSpotCount} WEAK)
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-100">
              Reflex Drill + Mistake Queue
            </div>
            <p className="text-[11px] text-slate-400">
              Auto-queues missed questions until 100% mastered
            </p>
          </button>

          <button
            onClick={() => setActivePhase('simulator')}
            className={`p-3.5 rounded-xl border text-left transition-colors cursor-pointer space-y-1 ${
              activePhase === 'simulator'
                ? 'bg-teal-500/15 border-teal-500/50 text-slate-100'
                : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="text-[11px] font-mono text-emerald-400 font-bold">
              5. EXAM SIMULATOR ({simulatorScore.earned}/{simulatorScore.total})
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-100">
              Full Midterm Grader
            </div>
            <p className="text-[11px] text-slate-400">
              Simulate Fall 2020–2025 papers with real marks
            </p>
          </button>
        </div>
      </div>

      {/* =====================================================================
          TOOL 1: 1-PAGE VISUAL DECISION TREE (THE FIRST-10-SECONDS FLOWCHART)
          ===================================================================== */}
      {activePhase === 'decision_tree' && (
        <div className="space-y-6">
          {/* Interactive 10-Second Spotter Mini-Game */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  10-Second Recognition Reflex Check (اختبار سرعة اكتشاف نوع المعادلة)
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-100">
                  Look at this unlabeled exam equation — how do you classify it in 5 seconds?
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setMysteryRevealed(!mysteryRevealed)}
                  className="px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold cursor-pointer whitespace-nowrap"
                >
                  {mysteryRevealed ? 'Hide Diagnosis' : 'Reveal 5-Second Diagnosis'}
                </button>
                <button
                  onClick={() => {
                    setMysteryRevealed(false);
                    setQuickMysteryIndex((prev) => prev + 1);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <span>Next Unlabeled Equation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-teal-300 text-base overflow-x-auto no-scrollbar text-center">
              <MathView math={mysteryQuestion.problemLatex} block />
            </div>

            {mysteryRevealed && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 animate-fadeIn">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-teal-500/30 space-y-1">
                  <span className="text-xs font-bold text-teal-400 block">
                    Visual Clue Spotted:
                  </span>
                  <p className="text-xs text-slate-200">{mysteryQuestion.visualRecognitionTrigger}</p>
                  <p className="text-xs text-slate-400" dir="rtl">{mysteryQuestion.arabicVisualTrigger}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-1">
                  <span className="text-xs font-bold text-emerald-400 block">
                    Exact Method & First Move:
                  </span>
                  <p className="text-xs text-slate-200 font-semibold">{mysteryQuestion.methodTag}</p>
                  <p className="text-xs text-slate-300">{mysteryQuestion.secretShortcut}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/30 space-y-1">
                  <span className="text-xs font-bold text-amber-400 block">
                    Trap to Avoid:
                  </span>
                  <p className="text-xs text-amber-100/90">{mysteryQuestion.examinerTrap}</p>
                </div>
              </div>
            )}
          </div>

          {/* Decision Tree Filter Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
            <div>
              <h2 className="text-lg font-bold text-slate-100">
                The Complete "If You See X → Do Y" Visual Decision Tree
              </h2>
              <p className="text-xs text-slate-400">
                Follow steps 1 to 5 for Question 1 (First-Order ODEs) and steps 6 to 8 for Question 2 (Higher-Order ODEs).
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              {(['All', 'First-Order ODE (Q1)', 'Higher-Order ODE (Q2)'] as const).map((grp) => (
                <button
                  key={grp}
                  onClick={() => setSelectedTreeFilter(grp)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
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
          <div className="space-y-4">
            {filteredTreeNodes.map((node) => (
              <div
                key={node.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 text-xs font-mono text-teal-400 font-bold">
                      <span>DECISION NODE 0{node.stepNumber}</span>
                      <span>·</span>
                      <span>{node.orderGroup}</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-100">
                      {node.ifYouSeeTitle}
                    </h3>
                    <p className="text-xs text-teal-300/90" dir="rtl">
                      {node.arabicIfYouSee}
                    </p>
                  </div>

                  {onOpenQuestionBank && (
                    <button
                      onClick={() => onOpenQuestionBank(node.sampleQuestionId)}
                      className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-teal-400 border border-slate-800 text-xs font-mono shrink-0 cursor-pointer whitespace-nowrap"
                    >
                      Open Exam Example →
                    </button>
                  )}
                </div>

                {/* 3-Step Horizontal Flow: Visual Trigger → Instant Test/Action → Solution Formula */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Column 1: If You See */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                      A. Visual Trigger in Problem
                    </div>
                    <div className="text-xs text-teal-300 overflow-x-auto no-scrollbar py-1">
                      <MathView math={node.visualPatternLatex} block />
                    </div>
                    <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
                      Real Exam Sample: <MathView math={node.sampleEquationLatex} inline />
                    </div>
                  </div>

                  {/* Column 2: Instant Test & Action */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="text-xs font-mono font-bold text-emerald-400 uppercase">
                      B. Immediate Action to Execute
                    </div>
                    <div className="text-xs text-emerald-300 overflow-x-auto no-scrollbar py-1">
                      <MathView math={node.instantTestLatex} block />
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{node.doThisAction}</p>
                    <p className="text-xs text-slate-400 leading-relaxed" dir="rtl">
                      {node.arabicDoThis}
                    </p>
                  </div>

                  {/* Column 3: Formula & Trap */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="text-xs font-mono font-bold text-amber-400 uppercase">
                      C. Target Solution Formula & Trap
                    </div>
                    <div className="text-xs text-teal-200 overflow-x-auto no-scrollbar py-1">
                      <MathView math={node.solutionFormulaLatex} block />
                    </div>
                    <div className="p-2.5 rounded-lg bg-amber-950/25 border border-amber-500/25 text-xs text-amber-200/90 leading-relaxed">
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
        <div className="space-y-6">
          {/* Top Bar with Print Button */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
            <div className="space-y-1">
              <div className="text-xs font-mono font-bold text-amber-400 uppercase">
                ULTRA-DENSE 1-PAGE EXAM PANIC SHEET (ملخص ليلة الامتحان في صفحة واحدة)
              </div>
              <h2 className="text-lg font-bold text-slate-100">
                All Standard Forms, Undetermined Coefficients Table, Circuit Models & Top 10 Traps
              </h2>
              <p className="text-xs text-slate-400">
                Everything required to solve any MTH203 / MTHn103 exam question on a single screen.
              </p>
            </div>

            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shrink-0 whitespace-nowrap"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save 1-Page PDF</span>
            </button>
          </div>

          {/* Section 1: First-Order ODE Master Comparison Table */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm sm:text-base font-bold text-teal-400 font-mono uppercase tracking-wider">
              Part 1: First-Order ODEs — Standard Forms & Solution Recipes (Question 1: 12 Marks)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono">
                    <th className="py-2.5 px-3">ODE Type</th>
                    <th className="py-2.5 px-3">Standard Form</th>
                    <th className="py-2.5 px-3">Substitution / Integrating Factor</th>
                    <th className="py-2.5 px-3">General Solution Formula</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-200">
                  <tr>
                    <td className="py-3 px-3 font-bold text-teal-300">1. Separable</td>
                    <td className="py-3 px-3"><MathView math="g(y)\,dy = f(x)\,dx" inline /></td>
                    <td className="py-3 px-3">Split <MathView math="e^{a+b}=e^a e^b, \; \frac{1}{\cos y}=\sec y" inline /></td>
                    <td className="py-3 px-3"><MathView math="\int g(y)\,dy = \int f(x)\,dx + C" inline /></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-teal-300">2. Reducible Line</td>
                    <td className="py-3 px-3"><MathView math="y' = F(ax + by + c)" inline /></td>
                    <td className="py-3 px-3"><MathView math="z = ax + by \implies z' = a + by'" inline /></td>
                    <td className="py-3 px-3"><MathView math="\int \frac{dz}{a + bF(z)} = x + C" inline /></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-teal-300">3. Homogeneous</td>
                    <td className="py-3 px-3"><MathView math="y' = F\left(\frac{y}{x}\right)" inline /></td>
                    <td className="py-3 px-3"><MathView math="u = \frac{y}{x} \implies y = xu \implies y' = xu' + u" inline /></td>
                    <td className="py-3 px-3"><MathView math="\int \frac{du}{F(u) - u} = \ln|x| + C" inline /></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-teal-300">4A. Exact ODE</td>
                    <td className="py-3 px-3"><MathView math="M\,dx + N\,dy = 0" inline /></td>
                    <td className="py-3 px-3">Condition: <MathView math="M_y = N_x" inline /></td>
                    <td className="py-3 px-3"><MathView math="\int M\,dx + \int (\text{slash duplicate } N)\,dy = C" inline /></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-teal-300">4B. Non-Exact (μ)</td>
                    <td className="py-3 px-3"><MathView math="M_y \neq N_x" inline /></td>
                    <td className="py-3 px-3">
                      <MathView math="\mu(x) = e^{\int \frac{M_y - N_x}{N}dx} \;\text{ or }\; \mu(y) = e^{\int \frac{N_x - M_y}{M}dy}" inline />
                    </td>
                    <td className="py-3 px-3">Multiply ODE by <MathView math="\mu" inline />, then solve as Exact</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-teal-300">5. Linear 1st-Order</td>
                    <td className="py-3 px-3"><MathView math="y' + P(x)y = Q(x)" inline /></td>
                    <td className="py-3 px-3"><MathView math="\mu(x) = e^{\int P(x)\,dx}" inline /></td>
                    <td className="py-3 px-3"><MathView math="y = \mu^{-1}\left[\int \mu(x)Q(x)\,dx + C\right]" inline /></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-amber-300">6. Bernoulli Shortcut</td>
                    <td className="py-3 px-3"><MathView math="y' + P(x)y = Q(x)y^n" inline /></td>
                    <td className="py-3 px-3">
                      <MathView math="P^* = (1-n)P, \; Q^* = (1-n)Q, \; \mu = e^{\int P^* dx}" inline />
                    </td>
                    <td className="py-3 px-3"><MathView math="y^{1-n} = \mu^{-1}\left[\int \mu(x)Q^*(x)\,dx + C\right]" inline /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2: Higher-Order ODEs, Undetermined Coeffs & Resonance Rule */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Auxiliary Roots + Reduction of Order */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-teal-400 font-mono uppercase tracking-wider">
                Part 2A: Auxiliary Roots & Reduction of Order
              </h3>
              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="font-bold text-slate-100">1. Distinct Real Roots (<MathView math="m_1 \neq m_2" inline />):</div>
                  <MathView math="y_h = C_1 e^{m_1 x} + C_2 e^{m_2 x}" block />
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="font-bold text-slate-100">2. Repeated Real Roots (<MathView math="m_1 = m_2 = m" inline /> or <MathView math="m^3 = 0" inline />):</div>
                  <MathView math="y_h = (C_1 + C_2 x)e^{mx} \quad | \quad \text{For } m^3 = 0: \; y_h = C_1 + C_2 x + C_3 x^2" block />
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="font-bold text-slate-100">3. Complex Conjugate Roots (<MathView math="m = \alpha \pm i\beta" inline />):</div>
                  <MathView math="y_h = e^{\alpha x}\left(C_1\cos(\beta x) + C_2\sin(\beta x)\right)" block />
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-teal-500/30 space-y-1">
                  <div className="font-bold text-teal-300">4. Reduction of Order (Given <MathView math="y_1(x)" inline />):</div>
                  <p>Let <MathView math="y = y_1(x)\cdot u(x)" inline />. Substitute <MathView math="y, y', y''" inline /> into ODE (all <MathView math="u" inline /> terms cancel!). Set <MathView math="z = u', \; z' = u''" inline />, solve 1st-order linear for <MathView math="z" inline />, integrate to get <MathView math="u = \int z\,dx" inline />, then multiply <MathView math="y = y_1 u" inline />.</p>
                </div>
              </div>
            </div>

            {/* Undetermined Coefficients Table + Resonance x^r Rule */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-amber-400 font-mono uppercase tracking-wider">
                Part 2B: Undetermined Coefficients & Resonance Boost Rule
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
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

              <div className="p-3.5 rounded-xl bg-amber-950/25 border border-amber-500/30 space-y-1.5 text-xs">
                <div className="font-bold text-amber-300">
                  Mandatory Pre-Simplifications Before Guessing <MathView math="y_p" inline />:
                </div>
                <MathView math="2\cos^2 x = 1 + \cos(2x), \quad 3\sin(3x)\cos(3x) = \frac{3}{2}\sin(6x), \quad \cos x\tan x = \sin x" block />
              </div>
            </div>
          </div>

          {/* Section 3: The 3 Physical Applications + Calculus & Trig Rescue Sheet */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 3 Physical Applications */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 font-mono uppercase tracking-wider">
                Part 3: The 3 Exam Physical & Circuit Models (Q2b: 4 Marks)
              </h3>
              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="font-bold text-slate-100">1. RL Series Circuit (Fall 2024 Q2a):</div>
                  <MathView math="L\frac{dI}{dt} + RI = E(t) \implies 0.02\frac{dI}{dt} + 0.06I = 0.02e^{4t} \xrightarrow{\div 0.02} \frac{dI}{dt} + 3I = e^{4t}" block />
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="font-bold text-slate-100">2. RLC Circuit (Fall 2025 Q2b-1):</div>
                  <MathView math="L\frac{d^2i}{dt^2} + R\frac{di}{dt} + \frac{1}{C}i = 0 \quad \left(\text{Trap: } C = 0.02 \implies \frac{1}{C} = 50!\right)" block />
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="font-bold text-slate-100">3. Mass-Spring-Damper System (Fall 2024 Q2b & Fall 2025 Q2b-2):</div>
                  <MathView math="m\frac{d^2x}{dt^2} + c\frac{dx}{dt} + kx = 0 \quad (\text{Multiply by 2 if } m = 0.5\text{ kg})" block />
                </div>
              </div>
            </div>

            {/* Prerequisite Calculus & Trig Rescue Sheet */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-teal-400 font-mono uppercase tracking-wider">
                Part 4: Exam Calculus, Log & Integration Rescue Sheet
              </h3>
              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="font-bold text-slate-100 mb-1">Missing Derivative Integrals:</div>
                  <MathView math="\int ye^{y^2}dy = \frac{1}{2}e^{y^2}, \quad \int \frac{\ln u}{u}du = \frac{1}{2}(\ln u)^2, \quad \int \frac{1/z}{\ln z}dz = \ln|\ln z|" block />
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="font-bold text-slate-100 mb-1">Fast Integration by Parts (Tabular DI Results):</div>
                  <MathView math="\int xe^x dx = (x-1)e^x, \quad \int ye^{-y}dy = (-y-1)e^{-y}, \quad \int -4xe^{2x}dx = -2xe^{2x} + e^{2x}" block />
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="font-bold text-slate-100 mb-1">Logarithm & Trig Rules:</div>
                  <MathView math="e^{-k\ln x} = x^{-k}, \quad \ln y - \ln x = \ln\left(\frac{y}{x}\right), \quad \frac{1}{\csc x} = \sin x, \quad \int \sec^2 u\,du = \tan u" block />
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: The Top 10 Examiner Traps Checklist */}
          <div className="p-5 sm:p-6 rounded-2xl bg-amber-950/15 border border-amber-500/30 space-y-3">
            <h3 className="text-sm font-bold text-amber-400 font-mono uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Part 5: The Top 10 Examiner Traps to Check Before Handing In Your Paper</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-slate-200">
              <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800">
                <strong className="text-amber-400">1. Leading Coefficient Trap:</strong> Did you divide by <MathView math="x" inline />, <MathView math="\sin x" inline />, or <MathView math="0.02" inline /> BEFORE reading <MathView math="P(x)" inline /> in Linear/Bernoulli ODEs?
              </div>
              <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800">
                <strong className="text-amber-400">2. Secant Factoring Trap:</strong> Did you rewrite <MathView math="\sec y + \frac{x^n}{\cos y} = \sec y(1 + x^n)" inline /> so <MathView math="\frac{dy}{\sec y} = \cos y\,dy" inline />?
              </div>
              <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800">
                <strong className="text-amber-400">3. Exact Strike-Out Rule:</strong> In <MathView math="\int M\,dx + \int N\,dy = C" inline />, did you cross out duplicated terms from the second integral instead of adding them twice?
              </div>
              <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800">
                <strong className="text-amber-400">4. Triple Zero Root Trap:</strong> For <MathView math="m^3 = 0" inline />, did you write <MathView math="C_1 + C_2 x + C_3 x^2" inline /> (3 constants, not 1)?
              </div>
              <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800">
                <strong className="text-amber-400">5. Missing-y Resonance Trap:</strong> In <MathView math="y'' + y' = 2x" inline />, since <MathView math="y" inline /> is missing (<MathView math="m=0" inline /> is a root), did you multiply <MathView math="(Ax+B)" inline /> by <MathView math="x" inline /> to get <MathView math="Ax^2+Bx" inline />?
              </div>
              <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800">
                <strong className="text-amber-400">6. Bernoulli Exponential Cancellation:</strong> Did you check if <MathView math="\mu(x) = e^{-2x}" inline /> cancels <MathView math="e^{2x}" inline /> inside the Bernoulli integral?
              </div>
              <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800">
                <strong className="text-amber-400">7. Double-Angle Trig Trap:</strong> Did you convert <MathView math="2\cos^2 x = 1 + \cos 2x" inline /> and <MathView math="\sin 3x\cos 3x = \frac{1}{2}\sin 6x" inline /> before setting up <MathView math="y_p" inline />?
              </div>
              <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800">
                <strong className="text-amber-400">8. Disguised Exact Equations:</strong> When <MathView math="N\,dy" inline /> is on the RHS, did you move it to the LHS with a minus sign before testing <MathView math="M_y = N_x" inline />?
              </div>
              <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800">
                <strong className="text-amber-400">9. Reduction of Order Final Step:</strong> After finding <MathView math="u(x)" inline />, did you multiply by <MathView math="y_1(x)" inline /> to get <MathView math="y = y_1 u" inline />?
              </div>
              <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800">
                <strong className="text-amber-400">10. RLC Capacitance Reciprocal:</strong> When <MathView math="C = 0.02\text{ F}" inline />, did you plug in <MathView math="\frac{1}{C} = 50" inline /> (and use variable <MathView math="t" inline />, not <MathView math="x" inline />)?
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          TOOL 3: 30-MINUTE ZERO-TO-HERO PATTERN BOOTCAMP
          ===================================================================== */}
      {activePhase === 'bootcamp' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
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

          <div className="lg:col-span-8 space-y-5">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
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
                    {completedPatterns[activePattern.id]
                      ? 'Module Completed'
                      : 'Mark Module Mastered'}
                  </span>
                </button>
              </div>

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
                  <div
                    className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-slate-300 leading-relaxed"
                    dir="rtl"
                  >
                    <strong className="text-teal-400 block mb-1">كيف تكتشفها بمجرد النظر:</strong>
                    {activePattern.arabicHowToSpot}
                  </div>
                </div>
              </div>

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

              <div className="space-y-3">
                <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>
                    3. Prof. Ashraf & Dr. Amira's Favorite Exam Traps (أشهر خدع وأفكار الامتحانات)
                  </span>
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

              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {patternQuestions.map((q) => (
                    <div
                      key={q.id}
                      onClick={() => {
                        if (onOpenQuestionBank) onOpenQuestionBank(q.id, 'All');
                      }}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-teal-500/40 transition-colors cursor-pointer space-y-2"
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span className="text-teal-400 font-bold">{q.numberLabel}</span>
                        <span>
                          {q.difficulty} · {q.points} pts
                        </span>
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
          TOOL 4: TWO-STEP TRAP DRILL + WEAK-SPOT MISTAKE QUEUE
          ===================================================================== */}
      {activePhase === 'drill' && (
        <div className="space-y-6">
          {/* Drill Filter Bar */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { id: 'Golden12', label: '★ The 12 Golden Questions (45-Min Cram)' },
                { id: 'WeakSpots', label: `My Mistake Queue (${weakSpotCount})` },
                { id: 'All', label: 'All 58 Questions' },
                { id: 'First-Order', label: 'First-Order' },
                { id: 'Higher-Order', label: 'Higher-Order' },
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
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    drillFilter === f.id
                      ? 'bg-teal-500 text-slate-950 font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
              {drillQuestions.length > 0 && (
                <>
                  <span className="tabular-nums">
                    Question {(drillIndex % drillQuestions.length) + 1} of {drillQuestions.length}
                  </span>
                  <span>·</span>
                </>
              )}
              <span className="text-teal-400 font-bold tabular-nums">
                Score: {drillStats.perfect} / {drillStats.attempted} Perfect
              </span>
            </div>
          </div>

          {/* Empty State if WeakSpots is selected and empty */}
          {!currentDrillQ ? (
            <div className="p-10 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
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
                Drill the 12 Golden Exam Questions
              </button>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 flex-wrap">
                  <span className="text-teal-400 font-bold">{currentDrillQ.numberLabel}</span>
                  <span>·</span>
                  <span>{currentDrillQ.sourceExam}</span>
                  <span>·</span>
                  <span>{currentDrillQ.points} Points</span>
                  {GOLDEN_12_QUESTION_IDS.includes(currentDrillQ.id) && (
                    <>
                      <span>·</span>
                      <span className="text-amber-400 font-bold">★ Golden 12 Archetype</span>
                    </>
                  )}
                  {weakSpotIds[currentDrillQ.id] && (
                    <>
                      <span>·</span>
                      <span className="text-rose-400 font-bold">In Mistake Queue</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {weakSpotIds[currentDrillQ.id] ? (
                    <button
                      onClick={() => handleRemoveFromWeakQueue(currentDrillQ.id)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-semibold cursor-pointer whitespace-nowrap"
                    >
                      ✓ Clear from Mistake Queue
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddToWeakQueue(currentDrillQ.id)}
                      className="px-3 py-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-xs font-semibold cursor-pointer whitespace-nowrap"
                    >
                      + Flag as Weak Spot
                    </button>
                  )}

                  <button
                    onClick={handleNextDrill}
                    className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <span>Next Question</span>
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
                    <div className="flex items-center gap-2 shrink-0">
                      {weakSpotIds[currentDrillQ.id] && (
                        <button
                          onClick={() => handleRemoveFromWeakQueue(currentDrillQ.id)}
                          className="px-3.5 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-bold text-xs cursor-pointer whitespace-nowrap"
                        >
                          ✓ Got It! Remove from Weak Queue
                        </button>
                      )}
                      <button
                        onClick={handleNextDrill}
                        className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer whitespace-nowrap"
                      >
                        <span>Next Question</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
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
          )}
        </div>
      )}

      {/* =====================================================================
          TOOL 5: REAL EXAM PAPER INTERACTIVE SIMULATOR
          ===================================================================== */}
      {activePhase === 'simulator' && (
        <div className="space-y-6">
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
                      {isRevealed
                        ? 'Hide Official Model Answer'
                        : 'Check & Reveal Official Model Answer'}
                    </button>
                  </div>

                  {q.problemStatement && (
                    <p className="text-xs sm:text-sm text-slate-300">{q.problemStatement}</p>
                  )}

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-teal-300 text-sm sm:text-base overflow-x-auto no-scrollbar">
                    <MathView math={q.problemLatex} block />
                  </div>

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
                              method:
                                e.target.value === '' ? undefined : Number(e.target.value),
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
                              step:
                                e.target.value === '' ? undefined : Number(e.target.value),
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

                  {isRevealed && (
                    <div className="pt-4 border-t border-slate-800 space-y-3 animate-fadeIn">
                      <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200">
                        <strong className="text-amber-400">Examiner Trap: </strong>
                        {q.examinerTrap} ({q.arabicExaminerTrap})
                      </div>
                      {q.steps.map((s) => (
                        <div
                          key={s.stepNumber}
                          className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5"
                        >
                          <div className="text-xs font-bold text-slate-200">
                            Step {s.stepNumber}: {s.title} —{' '}
                            <span className="text-teal-400">{s.arabicTitle}</span>
                          </div>
                          <div className="text-xs text-teal-300 overflow-x-auto no-scrollbar py-1">
                            <MathView math={s.formula} block />
                          </div>
                          <div className="text-xs text-slate-400">{s.explanation}</div>
                        </div>
                      ))}
                      <div className="p-3.5 rounded-xl bg-teal-950/30 border border-teal-500/40 flex items-center justify-between">
                        <span className="text-xs font-bold text-teal-300">
                          Official Boxed Answer:
                        </span>
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
