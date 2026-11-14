import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  FileText,
  Lightbulb,
  AlertTriangle,
  Copy,
  Check,
  ExternalLink,
  Award,
  Flame,
  Bookmark,
  RotateCcw,
} from 'lucide-react';
import {
  MASTER_EXAM_QUESTIONS,
  GOLDEN_12_QUESTION_IDS,
  MasterExamQuestion,
} from '../data/masterExamBankData';
import { MathView } from './MathView';

export const WEAK_SPOTS_STORAGE_KEY = 'math3_weak_spots_v1';

export function getSavedWeakSpots(): Record<string, boolean> {
  try {
    const saved = localStorage.getItem(WEAK_SPOTS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

export function setSavedWeakSpot(qId: string, isWeak: boolean): Record<string, boolean> {
  const current = getSavedWeakSpots();
  const next = { ...current };
  if (isWeak) {
    next[qId] = true;
  } else {
    delete next[qId];
  }
  try {
    localStorage.setItem(WEAK_SPOTS_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
  return next;
}

interface QuestionBankViewProps {
  initialFilterId?: string;
  initialPresetFilter?: 'All' | 'Golden12' | 'WeakSpots';
  onPracticeQuestion?: (qId: string) => void;
}

export const QuestionBankView: React.FC<QuestionBankViewProps> = ({
  initialFilterId,
  initialPresetFilter = 'All',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [presetMode, setPresetMode] = useState<'All' | 'Golden12' | 'WeakSpots'>(initialPresetFilter);
  const [selectedSource, setSelectedSource] = useState<string>('All');
  const [selectedMethod, setSelectedMethod] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selfTestMode, setSelfTestMode] = useState<boolean>(false);
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>(() => {
    if (initialFilterId) return { [initialFilterId]: true };
    return { 'f24-q1a': true, 'f25-q1a': true, 'f23-q1d': true };
  });
  const [revealedSteps, setRevealedSteps] = useState<Record<string, number>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (initialPresetFilter) {
      setPresetMode(initialPresetFilter);
    }
  }, [initialPresetFilter]);

  useEffect(() => {
    if (initialFilterId) {
      setExpandedIds((prev) => ({ ...prev, [initialFilterId]: true }));
    }
  }, [initialFilterId]);

  const [masteredIds, setMasteredIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('math3_mastered_bank_v1');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [weakSpotIds, setWeakSpotIds] = useState<Record<string, boolean>>(() => getSavedWeakSpots());

  const toggleMastered = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMasteredIds((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('math3_mastered_bank_v1', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
    // If marked mastered, optionally clear from weak spots
    if (!masteredIds[id] && weakSpotIds[id]) {
      setWeakSpotIds(setSavedWeakSpot(id, false));
    }
  };

  const toggleWeakSpot = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !weakSpotIds[id];
    setWeakSpotIds(setSavedWeakSpot(id, nextState));
  };

  const sources = useMemo(() => {
    return [
      'All',
      'Official Final Revision Sheet Fall 2024–2025',
      'Final Written Exam 1 (Fall 2017–2018)',
      'Final Written Exam 2 (Fall 2019–2020 3hr)',
      'Final Written Exam 3 (Fall 2016–2017)',
      'Final Written Exam 4 (Summer 2017–2018)',
      'Final Written Exam 5/6 (Fall 2019–2020 2hr)',
      'Laplace Master Summary Notes (Laplace.pdf)',
      'Math 2 Solved Bank & Appendices (May 2023)',
      'Midterm Written Exam Fall 2025–2026',
      'Midterm Written Exam Fall 2024–2025',
      'Midterm Written Exam Fall 2023–2024',
      'Midterm Exam Fall 2021–2022',
      'Midterm Exam Fall 2020–2021',
      'Official Revision Sheet Fall 2027',
    ];
  }, []);

  const methods = useMemo(() => {
    return [
      'All',
      'Separable',
      'Homogeneous',
      'Exact & Integrating Factor',
      'Linear & Bernoulli',
      'Higher-Order Homogeneous',
      'Undetermined Coeffs & Variation',
      'Reduction of Order',
      'Circuits & Mechanics',
      'Laplace & Inverse Laplace',
      'Fourier & Legendre',
      'Calculus & Integration Rescue',
    ];
  }, []);

  const weakSpotCount = Object.keys(weakSpotIds).length;
  const masteredCount = Object.values(masteredIds).filter(Boolean).length;

  const filteredQuestions = useMemo(() => {
    return MASTER_EXAM_QUESTIONS.filter((q) => {
      if (presetMode === 'Golden12' && !GOLDEN_12_QUESTION_IDS.includes(q.id)) {
        return false;
      }
      if (presetMode === 'WeakSpots' && !weakSpotIds[q.id]) {
        return false;
      }
      if (selectedSource !== 'All' && !q.sourceExam.includes(selectedSource)) {
        return false;
      }
      if (selectedDifficulty !== 'All' && q.difficulty !== selectedDifficulty) {
        return false;
      }
      if (selectedMethod !== 'All') {
        if (selectedMethod === 'Separable' && !q.methodTag.includes('Separable')) return false;
        if (selectedMethod === 'Homogeneous' && !q.methodTag.includes('Homogeneous ODE (')) {
          if (q.category !== 'Homogeneous Equations') return false;
        }
        if (selectedMethod === 'Exact & Integrating Factor' && q.category !== 'Exact Differential Equations') return false;
        if (selectedMethod === 'Linear & Bernoulli' && !['First-Order Linear ODEs', 'Bernoulli Non-Linear ODEs'].includes(q.category)) return false;
        if (selectedMethod === 'Higher-Order Homogeneous' && q.category !== 'Higher-Order Homogeneous (Auxiliary Eq.)') return false;
        if (selectedMethod === 'Undetermined Coeffs & Variation' && !['Non-Homogeneous: Undetermined Coefficients', 'Variation of Parameters (Wronskian)'].includes(q.category)) return false;
        if (selectedMethod === 'Reduction of Order' && q.category !== 'Reduction of Order Method') return false;
        if (selectedMethod === 'Circuits & Mechanics' && q.subCategory !== 'Physical & Circuit Applications') return false;
        if (selectedMethod === 'Laplace & Inverse Laplace' && q.subCategory !== 'Laplace & Inverse Laplace') return false;
        if (selectedMethod === 'Fourier & Legendre' && q.subCategory !== 'Fourier Series & Legendre') return false;
        if (selectedMethod === 'Calculus & Integration Rescue' && q.subCategory !== 'Calculus & Integration Rescue') return false;
      }
      if (searchQuery.trim()) {
        const s = searchQuery.toLowerCase();
        return (
          q.numberLabel.toLowerCase().includes(s) ||
          q.problemLatex.toLowerCase().includes(s) ||
          q.methodTag.toLowerCase().includes(s) ||
          q.arabicMethodTag.toLowerCase().includes(s) ||
          q.examinerTrap.toLowerCase().includes(s) ||
          q.secretShortcut.toLowerCase().includes(s) ||
          q.sourceExam.toLowerCase().includes(s)
        );
      }
      return true;
    });
  }, [presetMode, weakSpotIds, selectedSource, selectedMethod, selectedDifficulty, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    filteredQuestions.forEach((q) => {
      all[q.id] = true;
    });
    setExpandedIds(all);
  };

  const collapseAll = () => {
    setExpandedIds({});
  };

  const revealNextStep = (qId: string, totalSteps: number) => {
    setRevealedSteps((prev) => ({
      ...prev,
      [qId]: Math.min((prev[qId] || 0) + 1, totalSteps + 1),
    }));
  };

  const handleCopyLatex = (q: MasterExamQuestion, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `Problem (${q.numberLabel}): ${q.problemLatex}\nMethod: ${q.methodTag}\nTrap: ${q.examinerTrap}\nAnswer: ${q.finalAnswerLatex}`;
    navigator.clipboard.writeText(text);
    setCopiedId(q.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12 min-w-0">
      {/* Top Summary & Playlist Switcher */}
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 min-w-0">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 min-w-0">
          <div className="space-y-1.5 min-w-0">
            <div className="flex items-center gap-2 text-xs text-teal-400 font-mono flex-wrap">
              <span>COMPLETE VERIFIED QUESTION BANK</span>
              <span>·</span>
              <span className="tabular-nums">{MASTER_EXAM_QUESTIONS.length} CARDS (180+ SOLVED PROBLEMS)</span>
              <span>·</span>
              <span className="tabular-nums">{masteredCount}/{MASTER_EXAM_QUESTIONS.length} MASTERED</span>
              {weakSpotCount > 0 && (
                <>
                  <span>·</span>
                  <span className="text-rose-400 font-bold tabular-nums">
                    {weakSpotCount} IN MISTAKE QUEUE
                  </span>
                </>
              )}
            </div>
            <h2 className="text-lg sm:text-2xl font-bold text-slate-100 tracking-tight">
              Every Midterm, Final Exam, Revision Sheet & Note Question — Solved Step-by-Step
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
              Every single question from all 5 Midterm Exams, all 5 Final Written Exams (Final 1–6), the Official Midterm & Final Revision Sheets, Laplace/Fourier master notes, and the Math 2 Calculus & Conics Solved Bank — including official corrections to errors in the handwritten student answer keys.
            </p>
          </div>

          {/* Active Recall Self-Test Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                setSelfTestMode(!selfTestMode);
                setRevealedSteps({});
              }}
              className={`w-full sm:w-auto justify-center px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-colors cursor-pointer whitespace-nowrap ${
                selfTestMode
                  ? 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {selfTestMode ? <EyeOff className="w-4 h-4 text-amber-400 shrink-0" /> : <Eye className="w-4 h-4 text-teal-400 shrink-0" />}
              <span>{selfTestMode ? 'Active Recall: ON (Steps Hidden)' : 'Study Mode: All Steps Visible'}</span>
            </button>
          </div>
        </div>

        {/* 3 Primary Cram Playlists Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <button
            onClick={() => setPresetMode('All')}
            className={`p-3.5 rounded-xl border text-left transition-colors cursor-pointer flex items-center justify-between gap-2 min-w-0 ${
              presetMode === 'All'
                ? 'bg-teal-500/15 border-teal-500/50 text-slate-100'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="min-w-0">
              <div className="text-xs font-mono font-bold text-teal-400 truncate">COMPLETE ARCHIVE (MIDTERM + FINAL)</div>
              <div className="text-sm font-bold text-slate-100 truncate">All {MASTER_EXAM_QUESTIONS.length} Cards (180+ Exam Problems)</div>
            </div>
            <span className="text-xs font-mono tabular-nums font-bold px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 shrink-0 whitespace-nowrap">
              {MASTER_EXAM_QUESTIONS.length} Cards
            </span>
          </button>

          <button
            onClick={() => {
              setPresetMode('Golden12');
              setSelectedSource('All');
              setSelectedMethod('All');
              setSelectedDifficulty('All');
            }}
            className={`p-3.5 rounded-xl border text-left transition-colors cursor-pointer flex items-center justify-between gap-2 min-w-0 ${
              presetMode === 'Golden12'
                ? 'bg-amber-500/15 border-amber-500/50 text-slate-100'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="min-w-0">
              <div className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">45-MIN EMERGENCY PLAYLIST</span>
              </div>
              <div className="text-sm font-bold text-slate-100 truncate">The {GOLDEN_12_QUESTION_IDS.length} Golden Exam Archetypes</div>
            </div>
            <span className="text-xs font-mono tabular-nums font-bold px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 shrink-0 whitespace-nowrap">
              {GOLDEN_12_QUESTION_IDS.length} Qs
            </span>
          </button>

          <button
            onClick={() => {
              setPresetMode('WeakSpots');
              setSelectedSource('All');
              setSelectedMethod('All');
              setSelectedDifficulty('All');
            }}
            className={`p-3.5 rounded-xl border text-left transition-colors cursor-pointer flex items-center justify-between gap-2 min-w-0 ${
              presetMode === 'WeakSpots'
                ? 'bg-rose-500/15 border-rose-500/50 text-slate-100'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="min-w-0">
              <div className="text-xs font-mono font-bold text-rose-400 flex items-center gap-1">
                <Bookmark className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">SPACED REPETITION QUEUE</span>
              </div>
              <div className="text-sm font-bold text-slate-100 truncate">My Mistakes & Weak Spots</div>
            </div>
            <span className="text-xs font-mono tabular-nums font-bold px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 shrink-0 whitespace-nowrap">
              {weakSpotCount} Qs
            </span>
          </button>
        </div>

        {/* All 22 Attached Official PDF Papers & Reference Sheets Bar */}
        <div className="pt-3 border-t border-slate-800/80 space-y-2 min-w-0">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 sm:flex-wrap">
            <span className="text-xs text-teal-400 mr-1 font-mono font-bold shrink-0 whitespace-nowrap">Final Exams & Sheets:</span>
            {[
              { label: 'Final Revision Sheet (Fall 2024)', url: '/assets/aistudio/Mathematics3fall2024final_4e14172d.pdf' },
              { label: 'Final 1 (Fall 17–18)', url: '/assets/aistudio/Final_1___1__7cf7076f.pdf' },
              { label: 'Final 2 (Fall 19–20 3hr)', url: '/assets/aistudio/Final_2___1__f9b01d9c.pdf' },
              { label: 'Ans.Final 2', url: '/assets/aistudio/Ans.Final_2___1__300b5733.pdf' },
              { label: 'Final 3 (Fall 16–17)', url: '/assets/aistudio/Final_3___1__6c60fddd.pdf' },
              { label: 'Ans.Final 3', url: '/assets/aistudio/Ans.Final_3___1__8983ebf2.pdf' },
              { label: 'Final 4 (Summer 17–18)', url: '/assets/aistudio/Final_4___1__ea25ee9a.pdf' },
              { label: 'Ans.Final 4', url: '/assets/aistudio/Ans.Final_4___1__f632b559.pdf' },
              { label: 'Final 5/6 (Fall 19–20 2hr)', url: '/assets/aistudio/Final_5___1__2a029b34.pdf' },
              { label: 'Ans.Final 6', url: '/assets/aistudio/Ans.Final_6___1__8f7af933.pdf' },
              { label: 'Laplace Notes (10p)', url: '/assets/aistudio/Laplace_3216e865.pdf' },
              { label: 'Fourier Notes (2p)', url: '/assets/aistudio/Fourier_b45db703.pdf' },
              { label: 'Math Appendices', url: '/assets/aistudio/Appendencies_Mathematics__1__1ee12d2a.pdf' },
              { label: 'Math 2 Solved Bank (49p)', url: '/assets/aistudio/MAY_2023_MATH2__FINAL___SOLVED_PROBLEMS_bd406b83.pdf' },
            ].map((pdf) => (
              <a
                key={pdf.label}
                href={pdf.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-teal-300 border border-slate-800 text-[11px] flex items-center gap-1 transition-colors whitespace-nowrap shrink-0"
              >
                <FileText className="w-3 h-3 text-teal-400 shrink-0" />
                <span>{pdf.label}</span>
                <ExternalLink className="w-2.5 h-2.5 text-slate-500 shrink-0" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 sm:flex-wrap">
            <span className="text-xs text-amber-400 mr-1 font-mono font-bold shrink-0 whitespace-nowrap">Midterm Exams & Sheets:</span>
            {[
              { label: 'Fall 2025–2026 Model Answer', url: '/assets/aistudio/Mid_Term2_examMTHn103fall2026_Model_Answer__686bca1c.pdf' },
              { label: 'Fall 2024–2025 Model Answer', url: '/assets/aistudio/model_answer_Mid_Term2_examMTHn103fall2025_4c083398.pdf' },
              { label: 'Fall 2023–2024 Model Answer', url: '/assets/aistudio/model_answer_Mid_Term2_examMTHn103fall2024__1__6667c7c1.pdf' },
              { label: 'Fall 2021–2022 Exam', url: '/assets/aistudio/Mid_Term_exam__Fall2022__1__9deffc90.pdf' },
              { label: 'Fall 2020–2021 Exam', url: '/assets/aistudio/Mid_Term_exam_Fall2021__1__143d9fd2.pdf' },
              { label: 'Midterm Revision Sheet (31 Qs)', url: '/assets/aistudio/Mathematics3fall2027__1__fc4471ef.pdf' },
            ].map((pdf) => (
              <a
                key={pdf.label}
                href={pdf.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-800 text-[11px] flex items-center gap-1 transition-colors whitespace-nowrap shrink-0"
              >
                <FileText className="w-3 h-3 text-amber-400 shrink-0" />
                <span>{pdf.label}</span>
                <ExternalLink className="w-2.5 h-2.5 text-slate-500 shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Golden Archetypes Callout Banner when active */}
      {presetMode === 'Golden12' && (
        <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="text-xs font-mono font-bold text-amber-400">
              THE 45-MINUTE EMERGENCY CRAM PLAYLIST ({GOLDEN_12_QUESTION_IDS.length} GOLDEN MIDTERM & FINAL ARCHETYPES)
            </div>
            <p className="text-xs text-slate-300">
              If you only have 45 minutes before the exam, master these {GOLDEN_12_QUESTION_IDS.length} hand-picked questions. Each one represents a distinct trick across 1st-Order ODEs, Higher-Order ODEs, Circuits, Laplace IVPs, Fourier Series, and Legendre Polynomials with zero redundancy.
            </p>
          </div>
          <button
            onClick={expandAll}
            className="px-3.5 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold shrink-0 cursor-pointer whitespace-nowrap"
          >
            Expand All {GOLDEN_12_QUESTION_IDS.length} Solutions
          </button>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search equation, trick, method (e.g. Laplace, Fourier, Legendre, Bernoulli, RLC)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
          </div>

          {/* Source Filter */}
          <div className="md:col-span-4">
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-500 cursor-pointer"
            >
              {sources.map((src) => (
                <option key={src} value={src}>
                  {src === 'All' ? 'All 15 Exams, Sheets & Notes' : src}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div className="md:col-span-3 flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
            {['All', 'Core', 'Trick', 'Boss'].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  selectedDifficulty === diff
                    ? 'bg-teal-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Method Filter Tabs */}
        <div className="flex items-center justify-between gap-3 flex-wrap pt-1">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {methods.map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMethod(m)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedMethod === m
                    ? 'bg-slate-100 text-slate-950 font-bold'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0">
            <span className="tabular-nums font-mono">Showing {filteredQuestions.length} cards</span>
            <span>·</span>
            <button onClick={expandAll} className="hover:text-teal-400 underline cursor-pointer">
              Expand All
            </button>
            <span>·</span>
            <button onClick={collapseAll} className="hover:text-teal-400 underline cursor-pointer">
              Collapse All
            </button>
          </div>
        </div>
      </div>

      {/* Empty State for Weak Spots */}
      {filteredQuestions.length === 0 && (
        <div className="p-10 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
          <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-100">
            {presetMode === 'WeakSpots'
              ? 'Your Mistake & Weak-Spot Queue is Empty!'
              : 'No Questions Match Current Filter'}
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            {presetMode === 'WeakSpots'
              ? 'Any question you miss in the Diagnostic Drill or flag with "Flag Weak Spot" will automatically appear here for focused cramming.'
              : 'Try resetting your search query or switching back to All Questions.'}
          </p>
          <button
            onClick={() => {
              setPresetMode('All');
              setSelectedSource('All');
              setSelectedMethod('All');
              setSelectedDifficulty('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-teal-500 text-slate-950 text-xs font-bold cursor-pointer"
          >
            Show All {MASTER_EXAM_QUESTIONS.length} Cards
          </button>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-4 min-w-0">
        {filteredQuestions.map((q, index) => {
          const isExpanded = !!expandedIds[q.id];
          const isMastered = !!masteredIds[q.id];
          const isWeakSpot = !!weakSpotIds[q.id];
          const isGolden = GOLDEN_12_QUESTION_IDS.includes(q.id);
          const currentRevealedCount = selfTestMode ? revealedSteps[q.id] || 0 : q.steps.length + 1;

          return (
            <div
              key={q.id}
              className={`rounded-2xl border transition-colors overflow-hidden min-w-0 ${
                isWeakSpot
                  ? 'bg-slate-900/90 border-rose-500/40'
                  : isMastered
                  ? 'bg-slate-900/60 border-emerald-500/30'
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Question Header */}
              <div
                onClick={() => toggleExpand(q.id)}
                className="p-4 sm:p-5 cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-4 min-w-0"
              >
                <div className="space-y-2.5 flex-1 min-w-0">
                  {/* Unboxed Metadata Line */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 flex-wrap font-mono">
                    <span className="text-teal-400 font-bold tabular-nums">
                      #{index + 1} · {q.numberLabel}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-300 font-sans font-medium">{q.methodTag}</span>
                    <span aria-hidden="true">·</span>
                    <span
                      className={
                        q.difficulty === 'Boss'
                          ? 'text-rose-400 font-semibold'
                          : q.difficulty === 'Trick'
                          ? 'text-amber-400 font-semibold'
                          : 'text-emerald-400 font-semibold'
                      }
                    >
                      {q.difficulty} Level
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{q.points} Marks</span>
                    {isGolden && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-amber-400 font-bold">★ Golden 12 Archetype</span>
                      </>
                    )}
                  </div>

                  {/* Problem Statement if Word Problem */}
                  {q.problemStatement && (
                    <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                      {q.problemStatement}
                    </p>
                  )}

                  {/* Mathematical Formula */}
                  <div className="p-3 sm:p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 text-teal-300 text-sm sm:text-base overflow-x-auto no-scrollbar max-w-full">
                    <MathView math={q.problemLatex} block />
                  </div>

                  {/* Arabic Method Subtitle */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 text-xs text-slate-400">
                    <span>{q.arabicMethodTag}</span>
                    <span className="text-slate-500 font-mono text-[11px]">{q.sourceExam}</span>
                  </div>
                </div>

                {/* Right Action Controls */}
                <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 w-full lg:w-auto pt-3 lg:pt-0 border-t border-slate-800/60 lg:border-0 flex-wrap">
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <button
                      onClick={(e) => toggleWeakSpot(q.id, e)}
                      className={`px-2.5 sm:px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-colors cursor-pointer whitespace-nowrap ${
                        isWeakSpot
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-rose-300'
                      }`}
                      title="Add or remove from your Weak-Spot Mistake Queue"
                    >
                      <Bookmark className="w-3.5 h-3.5 shrink-0" />
                      <span>{isWeakSpot ? 'In Queue' : 'Weak Spot'}</span>
                    </button>

                    <button
                      onClick={(e) => toggleMastered(q.id, e)}
                      className={`px-2.5 sm:px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-colors cursor-pointer whitespace-nowrap ${
                        isMastered
                          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Mastered</span>
                    </button>

                    <button
                      onClick={(e) => handleCopyLatex(q, e)}
                      className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors cursor-pointer"
                      title="Copy problem & solution"
                    >
                      {copiedId === q.id ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <button className="px-3 sm:px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap">
                    <span>{isExpanded ? 'Hide Solution' : 'Step-by-Step'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
                  </button>
                </div>
              </div>

              {/* Expanded Analytical Breakdown & Step-by-Step Solution */}
              {isExpanded && (
                <div className="p-4 sm:p-6 bg-slate-950/90 border-t border-slate-800/90 space-y-5 min-w-0">
                  {/* 3-Column Intelligence Strip */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-w-0">
                    <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5 min-w-0">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-teal-400">
                        <Eye className="w-3.5 h-3.5 shrink-0" />
                        <span>1. Visual Recognition Trigger (كيف تكتشفها فوراً)</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed break-words">{q.visualRecognitionTrigger}</p>
                      <p className="text-xs text-slate-400 leading-relaxed pt-1 border-t border-slate-800/60 break-words">
                        {q.arabicVisualTrigger}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/25 space-y-1.5 min-w-0">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span>2. Examiner Trap to Avoid (فخ الامتحان)</span>
                      </div>
                      <p className="text-xs text-amber-100/90 leading-relaxed break-words">{q.examinerTrap}</p>
                      <p className="text-xs text-amber-200/75 leading-relaxed pt-1 border-t border-amber-500/15 break-words">
                        {q.arabicExaminerTrap}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/25 space-y-1.5 min-w-0">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                        <Lightbulb className="w-3.5 h-3.5 shrink-0" />
                        <span>3. Official Model Answer Shortcut (الحل السريع)</span>
                      </div>
                      <p className="text-xs text-emerald-100/90 leading-relaxed break-words">{q.secretShortcut}</p>
                    </div>
                  </div>

                  {/* Step-by-Step Solution */}
                  <div className="space-y-3 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                        Step-by-Step Derivation ({q.steps.length} Steps)
                      </h4>
                      {selfTestMode && currentRevealedCount <= q.steps.length && (
                        <button
                          onClick={() => revealNextStep(q.id, q.steps.length)}
                          className="px-3.5 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
                        >
                          {currentRevealedCount === 0
                            ? 'Reveal Step 1'
                            : currentRevealedCount < q.steps.length
                            ? `Reveal Step ${currentRevealedCount + 1}`
                            : 'Reveal Final Answer'}
                        </button>
                      )}
                    </div>

                    <div className="space-y-3 min-w-0">
                      {q.steps.map((step, sIdx) => {
                        const isStepVisible = !selfTestMode || sIdx < currentRevealedCount;

                        if (!isStepVisible) {
                          return (
                            <div
                              key={step.stepNumber}
                              onClick={() => revealNextStep(q.id, q.steps.length)}
                              className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/70 flex items-center justify-between gap-2 cursor-pointer hover:border-teal-500/40 transition-colors"
                            >
                              <span className="text-xs font-mono text-slate-500">
                                Step {step.stepNumber}: {step.title} (Hidden for Active Recall)
                              </span>
                              <span className="text-xs text-teal-400 font-semibold whitespace-nowrap">Click to reveal step →</span>
                            </div>
                          );
                        }

                        return (
                          <div
                            key={step.stepNumber}
                            className="p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5 min-w-0"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 min-w-0">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="w-6 h-6 rounded-lg bg-teal-500/15 text-teal-300 border border-teal-500/30 flex items-center justify-center text-xs font-mono font-bold tabular-nums shrink-0">
                                  {step.stepNumber}
                                </span>
                                <h5 className="text-xs sm:text-sm font-bold text-slate-100 break-words">
                                  {step.title}
                                </h5>
                              </div>
                              <span className="text-xs text-teal-400/90 font-medium">
                                {step.arabicTitle}
                              </span>
                            </div>

                            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/90 text-teal-300 text-xs sm:text-sm overflow-x-auto no-scrollbar max-w-full">
                              <MathView math={step.formula} block />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300 pt-0.5 min-w-0">
                              <p className="leading-relaxed break-words">{step.explanation}</p>
                              <p className="text-slate-400 leading-relaxed md:text-right break-words" dir="rtl">
                                {step.arabicExplanation}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Final Boxed Answer */}
                  {(!selfTestMode || currentRevealedCount > q.steps.length) && (
                    <div className="p-4 rounded-xl bg-teal-950/30 border border-teal-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0">
                      <div className="flex items-center gap-2 shrink-0">
                        <Award className="w-5 h-5 text-teal-400 shrink-0" />
                        <div>
                          <span className="text-xs font-bold text-teal-300 block">
                            Official Boxed General Solution (الحل العام النهائي)
                          </span>
                          <span className="text-[11px] text-slate-400">
                            Exact format required for full marks on Modern Academy exams
                          </span>
                        </div>
                      </div>
                      <div className="w-full sm:w-auto max-w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-teal-500/40 text-teal-200 text-sm sm:text-base font-bold overflow-x-auto no-scrollbar">
                        <MathView math={q.finalAnswerLatex} inline />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
