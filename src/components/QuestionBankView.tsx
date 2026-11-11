import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
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
  BookOpen,
  ExternalLink,
  Layers,
  Award,
} from 'lucide-react';
import { MASTER_EXAM_QUESTIONS, MasterExamQuestion } from '../data/masterExamBankData';
import { MathView } from './MathView';

interface QuestionBankViewProps {
  initialFilterId?: string;
  onPracticeQuestion?: (qId: string) => void;
}

export const QuestionBankView: React.FC<QuestionBankViewProps> = ({
  initialFilterId,
  onPracticeQuestion,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
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
  const [masteredIds, setMasteredIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('math3_mastered_bank_v1');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

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
  };

  const sources = useMemo(() => {
    return [
      'All',
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
    ];
  }, []);

  const filteredQuestions = useMemo(() => {
    return MASTER_EXAM_QUESTIONS.filter((q) => {
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
      }
      if (searchQuery.trim()) {
        const s = searchQuery.toLowerCase();
        return (
          q.numberLabel.toLowerCase().includes(s) ||
          q.problemLatex.toLowerCase().includes(s) ||
          q.methodTag.toLowerCase().includes(s) ||
          q.arabicMethodTag.toLowerCase().includes(s) ||
          q.examinerTrap.toLowerCase().includes(s) ||
          q.secretShortcut.toLowerCase().includes(s)
        );
      }
      return true;
    });
  }, [selectedSource, selectedMethod, selectedDifficulty, searchQuery]);

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

  const masteredCount = Object.values(masteredIds).filter(Boolean).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Summary & PDF Source Links Bar */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-teal-400 font-mono">
              <span>COMPLETE VERIFIED QUESTION BANK</span>
              <span>·</span>
              <span>{MASTER_EXAM_QUESTIONS.length} ANALYZED QUESTIONS</span>
              <span>·</span>
              <span className="tabular-nums">{masteredCount}/{MASTER_EXAM_QUESTIONS.length} MASTERED</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
              Every Exam & Revision Sheet Question — Solved Step-by-Step
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
              Every single question from the 5 official Modern Academy Midterm Exams (Fall 2020–2025) and the 31-question Fall 2027 Official Revision Sheet, complete with visual recognition triggers, examiner traps, and official shortcuts.
            </p>
          </div>

          {/* Self-Test Progressive Reveal Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                setSelfTestMode(!selfTestMode);
                setRevealedSteps({});
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-colors cursor-pointer whitespace-nowrap ${
                selfTestMode
                  ? 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {selfTestMode ? <EyeOff className="w-4 h-4 text-amber-400" /> : <Eye className="w-4 h-4 text-teal-400" />}
              <span>{selfTestMode ? 'Active Recall Mode: ON (Steps Hidden)' : 'Study Mode: All Steps Visible'}</span>
            </button>
          </div>
        </div>

        {/* Original Attached PDF Papers Bar */}
        <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 mr-1 font-medium">Official PDF Papers:</span>
          {[
            { label: 'Fall 2025–2026 Model Answer', url: '/assets/aistudio/Mid_Term2_examMTHn103fall2026_Model_Answer__686bca1c.pdf' },
            { label: 'Fall 2024–2025 Model Answer', url: '/assets/aistudio/model_answer_Mid_Term2_examMTHn103fall2025_4c083398.pdf' },
            { label: 'Fall 2023–2024 Model Answer', url: '/assets/aistudio/model_answer_Mid_Term2_examMTHn103fall2024__1__6667c7c1.pdf' },
            { label: 'Fall 2021–2022 Exam', url: '/assets/aistudio/Mid_Term_exam__Fall2022__1__9deffc90.pdf' },
            { label: 'Fall 2020–2021 Exam', url: '/assets/aistudio/Mid_Term_exam_Fall2021__1__143d9fd2.pdf' },
            { label: 'Fall 2027 Revision Sheet (31 Qs)', url: '/assets/aistudio/Mathematics3fall2027__1__fc4471ef.pdf' },
          ].map((pdf) => (
            <a
              key={pdf.label}
              href={pdf.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-teal-300 border border-slate-800 text-xs flex items-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>{pdf.label}</span>
              <ExternalLink className="w-3 h-3 text-slate-500 shrink-0" />
            </a>
          ))}
        </div>
      </div>

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
              placeholder="Search equation, trick, method (e.g. Bernoulli, sec y, m^3, RLC)..."
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
                  {src === 'All' ? 'All Exams & Revision Sheet (58 Questions)' : src}
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
            <span className="tabular-nums font-mono">Showing {filteredQuestions.length} questions</span>
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

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((q, index) => {
          const isExpanded = !!expandedIds[q.id];
          const isMastered = !!masteredIds[q.id];
          const currentRevealedCount = selfTestMode ? revealedSteps[q.id] || 0 : q.steps.length + 1;

          return (
            <div
              key={q.id}
              className={`rounded-2xl border transition-colors overflow-hidden ${
                isMastered
                  ? 'bg-slate-900/60 border-emerald-500/30'
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Question Header */}
              <div
                onClick={() => toggleExpand(q.id)}
                className="p-5 cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="space-y-2.5 flex-1 min-w-0">
                  {/* Unboxed Metadata Line (Zero-Pill Compliance) */}
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
                  </div>

                  {/* Problem Statement if Word Problem */}
                  {q.problemStatement && (
                    <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                      {q.problemStatement}
                    </p>
                  )}

                  {/* Mathematical Formula */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 text-teal-300 text-sm sm:text-base overflow-x-auto no-scrollbar">
                    <MathView math={q.problemLatex} block />
                  </div>

                  {/* Arabic Method Subtitle */}
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
                    <span>{q.arabicMethodTag}</span>
                    <span className="text-slate-500 font-mono text-[11px]">{q.sourceExam}</span>
                  </div>
                </div>

                {/* Right Action Controls */}
                <div className="flex items-center gap-2.5 shrink-0 self-end lg:self-center">
                  <button
                    onClick={(e) => toggleMastered(q.id, e)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-colors cursor-pointer whitespace-nowrap ${
                      isMastered
                        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isMastered ? 'Mastered' : 'Mark Mastered'}</span>
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

                  <button className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap">
                    <span>{isExpanded ? 'Hide Solution' : 'Step-by-Step'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Expanded Analytical Breakdown & Step-by-Step Solution */}
              {isExpanded && (
                <div className="p-5 sm:p-6 bg-slate-950/90 border-t border-slate-800/90 space-y-5">
                  {/* 3-Column Intelligence Strip: Recognition Trigger | Examiner Trap | Secret Shortcut */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* 1. How to Spot It */}
                    <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-teal-400">
                        <Eye className="w-3.5 h-3.5 shrink-0" />
                        <span>1. Visual Recognition Trigger (كيف تكتشفها فوراً)</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{q.visualRecognitionTrigger}</p>
                      <p className="text-xs text-slate-400 leading-relaxed pt-1 border-t border-slate-800/60">
                        {q.arabicVisualTrigger}
                      </p>
                    </div>

                    {/* 2. Examiner Trap */}
                    <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/25 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span>2. Examiner Trap to Avoid (فخ الامتحان)</span>
                      </div>
                      <p className="text-xs text-amber-100/90 leading-relaxed">{q.examinerTrap}</p>
                      <p className="text-xs text-amber-200/75 leading-relaxed pt-1 border-t border-amber-500/15">
                        {q.arabicExaminerTrap}
                      </p>
                    </div>

                    {/* 3. 10-Second Shortcut */}
                    <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/25 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                        <Lightbulb className="w-3.5 h-3.5 shrink-0" />
                        <span>3. Official Model Answer Shortcut (الحل السريع)</span>
                      </div>
                      <p className="text-xs text-emerald-100/90 leading-relaxed">{q.secretShortcut}</p>
                    </div>
                  </div>

                  {/* Step-by-Step Solution */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                        Step-by-Step Derivation ({q.steps.length} Steps)
                      </h4>
                      {selfTestMode && currentRevealedCount <= q.steps.length && (
                        <button
                          onClick={() => revealNextStep(q.id, q.steps.length)}
                          className="px-3.5 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold transition-colors cursor-pointer"
                        >
                          {currentRevealedCount === 0
                            ? 'Reveal Step 1'
                            : currentRevealedCount < q.steps.length
                            ? `Reveal Step ${currentRevealedCount + 1}`
                            : 'Reveal Final Answer'}
                        </button>
                      )}
                    </div>

                    <div className="space-y-3">
                      {q.steps.map((step, sIdx) => {
                        const isStepVisible = !selfTestMode || sIdx < currentRevealedCount;

                        if (!isStepVisible) {
                          return (
                            <div
                              key={step.stepNumber}
                              onClick={() => revealNextStep(q.id, q.steps.length)}
                              className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/70 flex items-center justify-between cursor-pointer hover:border-teal-500/40 transition-colors"
                            >
                              <span className="text-xs font-mono text-slate-500">
                                Step {step.stepNumber}: {step.title} (Hidden for Active Recall)
                              </span>
                              <span className="text-xs text-teal-400 font-semibold">Click to reveal step →</span>
                            </div>
                          );
                        }

                        return (
                          <div
                            key={step.stepNumber}
                            className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                              <div className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-lg bg-teal-500/15 text-teal-300 border border-teal-500/30 flex items-center justify-center text-xs font-mono font-bold tabular-nums shrink-0">
                                  {step.stepNumber}
                                </span>
                                <h5 className="text-xs sm:text-sm font-bold text-slate-100">
                                  {step.title}
                                </h5>
                              </div>
                              <span className="text-xs text-teal-400/90 font-medium">
                                {step.arabicTitle}
                              </span>
                            </div>

                            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/90 text-teal-300 text-xs sm:text-sm overflow-x-auto no-scrollbar">
                              <MathView math={step.formula} block />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300 pt-0.5">
                              <p className="leading-relaxed">{step.explanation}</p>
                              <p className="text-slate-400 leading-relaxed md:text-right" dir="rtl">
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
                    <div className="p-4 rounded-xl bg-teal-950/30 border border-teal-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
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
                      <div className="px-4 py-2.5 rounded-xl bg-slate-950 border border-teal-500/40 text-teal-200 text-sm sm:text-base font-bold overflow-x-auto no-scrollbar">
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
