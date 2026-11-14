import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Calculator,
  Sparkles,
  Play,
  Copy,
  Check,
  RotateCcw,
  Keyboard,
  Layers,
  BrainCircuit,
  Info,
  Zap,
  AlertTriangle,
  Eye,
  BookOpen,
  Sliders,
  Search,
  Award,
} from 'lucide-react';
import { MathView } from './MathView';
import { LatexKeyboard, PRESET_ODES } from './LatexKeyboard';
import {
  solveODEHeuristic,
  ODEAnalysisResult,
  InitialConditionsInput,
} from '../utils/odeSolverEngine';
import { MASTER_EXAM_QUESTIONS } from '../data/masterExamBankData';

export const ODEStepByStepSolver: React.FC = () => {
  const [latexInput, setLatexInput] = useState<string>("y'' - 3y' + 2y = 3e^{2x}");
  const [history, setHistory] = useState<string[]>([]);
  const [analysisResult, setAnalysisResult] = useState<ODEAnalysisResult | null>(null);
  const [isSolving, setIsSolving] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [showKeyboard, setShowKeyboard] = useState(true);
  const [showExamPicker, setShowExamPicker] = useState(false);
  const [examSearch, setExamSearch] = useState('');
  const [copiedSolution, setCopiedSolution] = useState(false);
  const [copiedAllSteps, setCopiedAllSteps] = useState(false);
  const [solverMode, setSolverMode] = useState<'symbolic' | 'ai'>('symbolic');

  const [initialConditions, setInitialConditions] = useState<InitialConditionsInput>({
    enabled: false,
    x0: '0',
    y0: '1',
    yp0: '0',
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Automatically solve default equation on mount
  useEffect(() => {
    const initialRes = solveODEHeuristic(latexInput, initialConditions);
    setAnalysisResult(initialRes);
  }, []);

  const pushHistory = (prevVal: string) => {
    setHistory((h) => [...h.slice(-19), prevVal]);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setLatexInput(previous);
    setAnalysisResult(solveODEHeuristic(previous, initialConditions));
  };

  const handleSolve = async (customInput?: string, customIvp?: InitialConditionsInput, forceMode?: 'symbolic' | 'ai') => {
    const input = customInput !== undefined ? customInput : latexInput;
    const ivp = customIvp !== undefined ? customIvp : initialConditions;
    const mode = forceMode !== undefined ? forceMode : solverMode;

    if (!input.trim()) return;
    setAiError(null);

    // Always compute instant symbolic result first so the user never waits on blank state
    const instantResult = solveODEHeuristic(input, ivp);
    setAnalysisResult(instantResult);

    if (mode === 'ai') {
      setIsSolving(true);
      try {
        const response = await fetch('/api/solve-ode', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            latex: input,
            initialConditions: ivp.enabled ? ivp : undefined,
          }),
        });

        const data = await response.json();
        if (response.ok && data && Array.isArray(data.steps) && data.steps.length > 0) {
          setAnalysisResult({
            ...instantResult,
            ...data,
            tags: data.tags || instantResult.tags,
          });
        } else {
          setAiError(
            data?.error ||
              'AI Deep Solver is unavailable right now — showing verified Symbolic Engine derivation.'
          );
        }
      } catch {
        setAiError('Showing verified Symbolic Engine derivation.');
      } finally {
        setIsSolving(false);
      }
    }
  };

  const handleInsertKey = (snippet: string, cursorBack = 0) => {
    const textarea = textareaRef.current;
    pushHistory(latexInput);

    if (!textarea) {
      setLatexInput((prev) => prev + snippet);
      return;
    }

    const start = textarea.selectionStart || 0;
    const end = textarea.selectionEnd || 0;
    const current = latexInput;
    const selectedText = current.substring(start, end);

    let finalSnippet = snippet;
    let finalCursorPos = start + snippet.length - cursorBack;

    // If user highlighted text and clicked a wrapper like (), ^{}, \sqrt{}, \frac{}{}
    if (selectedText && cursorBack > 0) {
      const insertPoint = snippet.length - cursorBack;
      finalSnippet = snippet.slice(0, insertPoint) + selectedText + snippet.slice(insertPoint);
      finalCursorPos = start + finalSnippet.length;
    }

    const updated = current.substring(0, start) + finalSnippet + current.substring(end);
    setLatexInput(updated);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(finalCursorPos, finalCursorPos);
    }, 0);
  };

  const handleMoveCursor = (delta: number) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const pos = Math.max(0, Math.min(latexInput.length, (textarea.selectionStart || 0) + delta));
    textarea.focus();
    textarea.setSelectionRange(pos, pos);
  };

  const handleBackspace = () => {
    const textarea = textareaRef.current;
    pushHistory(latexInput);

    if (!textarea) {
      setLatexInput((prev) => prev.slice(0, -1));
      return;
    }

    const start = textarea.selectionStart || 0;
    const end = textarea.selectionEnd || 0;
    const current = latexInput;

    if (start === end && start > 0) {
      const updated = current.substring(0, start - 1) + current.substring(end);
      setLatexInput(updated);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start - 1, start - 1);
      }, 0);
    } else if (start !== end) {
      const updated = current.substring(0, start) + current.substring(end);
      setLatexInput(updated);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start, start);
      }, 0);
    }
  };

  const handleClear = () => {
    pushHistory(latexInput);
    setLatexInput('');
    setAnalysisResult(null);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handlePresetSelect = (presetLatex: string) => {
    pushHistory(latexInput);
    setLatexInput(presetLatex);
    handleSolve(presetLatex, initialConditions);
  };

  const filteredExamQuestions = useMemo(() => {
    if (!examSearch.trim()) return MASTER_EXAM_QUESTIONS.slice(0, 24);
    const q = examSearch.toLowerCase();
    return MASTER_EXAM_QUESTIONS.filter(
      (item) =>
        item.numberLabel.toLowerCase().includes(q) ||
        item.problemLatex.toLowerCase().includes(q) ||
        item.methodTag.toLowerCase().includes(q) ||
        item.sourceExam.toLowerCase().includes(q)
    ).slice(0, 30);
  }, [examSearch]);

  const handleCopySolution = () => {
    if (!analysisResult) return;
    navigator.clipboard.writeText(analysisResult.ivpSolutionLatex || analysisResult.generalSolutionLatex);
    setCopiedSolution(true);
    setTimeout(() => setCopiedSolution(false), 2000);
  };

  const handleCopyAllSteps = () => {
    if (!analysisResult) return;
    const text =
      `Differential Equation Analysis & Solution:\nEquation: ${analysisResult.rawInput}\nType: ${analysisResult.odeType} (${analysisResult.arabicOdeType})\nOrder: ${analysisResult.order}, Degree: ${analysisResult.degree}\n\nSteps:\n` +
      analysisResult.steps
        .map((s) => `Step ${s.stepNumber}: ${s.title}\n${s.latex}\nExplanation: ${s.explanation}\n`)
        .join('\n') +
      `\nGeneral Solution:\n${analysisResult.generalSolutionLatex}` +
      (analysisResult.ivpSolutionLatex ? `\nIVP Particular Solution:\n${analysisResult.ivpSolutionLatex}` : '');
    navigator.clipboard.writeText(text);
    setCopiedAllSteps(true);
    setTimeout(() => setCopiedAllSteps(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12 min-w-0">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 min-w-0">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 min-w-0">
          <div className="space-y-1.5 max-w-3xl min-w-0">
            <div className="flex items-center gap-2 text-xs font-mono text-teal-400 flex-wrap">
              <span>SYMBOLIC & AI DIFFERENTIAL EQUATION ENGINE</span>
              <span>·</span>
              <span>1ST/2ND/3RD ORDER, RESONANCE, WRONSKIAN, CAUCHY-EULER & LAPLACE</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-100">
              LaTeX Differential Equation & Laplace Step-by-Step Solver (محلل المعادلات التفاضلية بالـ LaTeX)
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Write any differential equation in LaTeX using the smart virtual keyboard, or load any of the 125 official exam problems to inspect its exact Integrating Factor, Auxiliary Roots, Resonance multiplier, Wronskian determinant, and step-by-step derivation.
            </p>
          </div>

          {/* Solver Engine Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 self-start lg:self-center shrink-0">
            <button
              onClick={() => {
                setSolverMode('symbolic');
                handleSolve(latexInput, initialConditions, 'symbolic');
              }}
              className={`px-3 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                solverMode === 'symbolic'
                  ? 'bg-teal-500 text-slate-950'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5 shrink-0" />
              <span>Instant Symbolic (0ms)</span>
            </button>
            <button
              onClick={() => {
                setSolverMode('ai');
                handleSolve(latexInput, initialConditions, 'ai');
              }}
              className={`px-3 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                solverMode === 'ai'
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>AI Deep Solve</span>
            </button>
          </div>
        </div>

        {/* Quick Archetype Pills Bar */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          <span className="text-xs font-mono font-bold text-slate-400 shrink-0">Try Archetype:</span>
          {PRESET_ODES.slice(0, 8).map((p, idx) => (
            <button
              key={idx}
              onClick={() => handlePresetSelect(p.latex)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono border transition-colors cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                latexInput === p.latex
                  ? 'bg-teal-500/15 text-teal-300 border-teal-500/40 font-bold'
                  : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border-slate-800'
              }`}
            >
              <span>{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Solver Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-w-0">
        {/* Left Column: LaTeX Input, IVP Bar, Exam Loader & Virtual Keyboard (7 Cols) */}
        <div className="lg:col-span-7 space-y-4 min-w-0">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 min-w-0">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-teal-400 shrink-0" />
                <h2 className="text-xs sm:text-sm font-bold text-slate-100 font-mono">
                  LaTeX Differential Equation Editor
                </h2>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setShowExamPicker(!showExamPicker)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold flex items-center gap-1.5 border transition-colors cursor-pointer whitespace-nowrap ${
                    showExamPicker
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-slate-950 text-slate-300 hover:text-amber-300 border-slate-800'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Load from 125 Exam Qs</span>
                </button>

                <button
                  onClick={() => setShowKeyboard(!showKeyboard)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold flex items-center gap-1.5 border transition-colors cursor-pointer whitespace-nowrap ${
                    showKeyboard
                      ? 'bg-teal-500/20 text-teal-300 border-teal-500/30'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border-slate-800'
                  }`}
                >
                  <Keyboard className="w-3.5 h-3.5 shrink-0" />
                  <span>{showKeyboard ? 'Hide Keyboard' : 'Show Keyboard'}</span>
                </button>
              </div>
            </div>

            {/* Collapsible 125 Official Exam Question Picker */}
            {showExamPicker && (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-amber-400">
                    PICK ANY QUESTION FROM MIDTERMS, FINALS & REVISION SHEETS
                  </span>
                  <button
                    onClick={() => setShowExamPicker(false)}
                    className="text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
                  >
                    Close
                  </button>
                </div>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={examSearch}
                    onChange={(e) => setExamSearch(e.target.value)}
                    placeholder="Search by exam year, method (e.g. Bernoulli, Exact, Fall 2025, Laplace)..."
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1">
                  {filteredExamQuestions.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => {
                        handlePresetSelect(q.problemLatex);
                        setShowExamPicker(false);
                      }}
                      className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 text-left transition-colors cursor-pointer space-y-1 min-w-0"
                    >
                      <div className="flex items-center justify-between gap-1 text-[11px] font-mono">
                        <span className="text-amber-400 font-bold truncate">{q.numberLabel}</span>
                        <span className="text-slate-400 truncate">{q.methodTag}</span>
                      </div>
                      <div className="text-xs text-teal-300 overflow-x-auto no-scrollbar">
                        <MathView math={q.problemLatex} inline />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* LaTeX Text Input Box */}
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={latexInput}
                onChange={(e) => setLatexInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    handleSolve();
                  }
                }}
                placeholder="Write differential equation in LaTeX, e.g. y'' - 3y' + 2y = 3e^{2x} or \frac{dy}{dx} + \frac{1}{x}y = xy^2"
                rows={3}
                className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-sm font-mono text-slate-100 placeholder-slate-600 focus:outline-none focus:border-teal-500 transition-colors resize-none"
              />
            </div>

            {/* Optional Initial Conditions (IVP) Bar */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/90 space-y-2.5">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <label className="flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={initialConditions.enabled}
                    onChange={(e) => {
                      const next = { ...initialConditions, enabled: e.target.checked };
                      setInitialConditions(next);
                      handleSolve(latexInput, next);
                    }}
                    className="rounded accent-teal-500 cursor-pointer"
                  />
                  <Sliders className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span className="font-semibold">Solve Initial Value Problem (IVP) for C₁, C₂ at x = 0</span>
                </label>
                <span className="text-[11px] font-mono text-slate-500">الشروط الابتدائية</span>
              </div>

              {initialConditions.enabled && (
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                    <span className="text-xs font-mono text-teal-400 shrink-0">y(0) =</span>
                    <input
                      type="number"
                      value={initialConditions.y0}
                      onChange={(e) => {
                        const next = { ...initialConditions, y0: e.target.value };
                        setInitialConditions(next);
                      }}
                      className="w-full bg-transparent text-xs font-mono font-bold text-slate-100 focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                    <span className="text-xs font-mono text-teal-400 shrink-0">y'(0) =</span>
                    <input
                      type="number"
                      value={initialConditions.yp0}
                      onChange={(e) => {
                        const next = { ...initialConditions, yp0: e.target.value };
                        setInitialConditions(next);
                      }}
                      className="w-full bg-transparent text-xs font-mono font-bold text-slate-100 focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Live KaTeX Rendered Preview */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 min-w-0">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Live Mathematical Preview (معاينة المعادلة):</span>
                <span className="text-[10px] text-teal-400">KaTeX Engine</span>
              </div>
              <div className="min-h-[48px] flex items-center justify-center p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 text-teal-300 text-base overflow-x-auto no-scrollbar max-w-full">
                {latexInput.trim() ? (
                  <MathView
                    math={
                      initialConditions.enabled
                        ? `${latexInput}, \\quad y(0)=${initialConditions.y0},\\; y'(0)=${initialConditions.yp0}`
                        : latexInput
                    }
                    block
                  />
                ) : (
                  <span className="text-xs text-slate-500 font-mono">
                    Type or tap keys below to build a differential equation...
                  </span>
                )}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between gap-2 sm:gap-3 pt-1">
              <button
                onClick={() => handleSolve()}
                disabled={!latexInput.trim() || isSolving}
                className="flex-1 py-3 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSolving ? (
                  <>
                    <RotateCcw className="w-4 h-4 animate-spin text-slate-950 shrink-0" />
                    <span>Running Deep Mathematical Derivation...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current text-slate-950 shrink-0" />
                    <span className="truncate">Analyze & Solve Step-by-Step (تحليل وحل المعادلة)</span>
                  </>
                )}
              </button>

              <button
                onClick={handleClear}
                className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer shrink-0"
                title="Clear equation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {aiError && (
              <div className="text-xs text-amber-300 font-mono bg-amber-950/30 border border-amber-500/30 px-3 py-2 rounded-lg">
                {aiError}
              </div>
            )}

            {/* Virtual LaTeX Keyboard */}
            {showKeyboard && (
              <div className="pt-1">
                <LatexKeyboard
                  onInsert={handleInsertKey}
                  onBackspace={handleBackspace}
                  onClear={handleClear}
                  onMoveCursor={handleMoveCursor}
                  onUndo={handleUndo}
                  canUndo={history.length > 0}
                  onPresetSelect={handlePresetSelect}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Diagnostics, Trap Alerts & Step-by-Step Solution (5 Cols) */}
        <div className="lg:col-span-5 space-y-4 min-w-0">
          {analysisResult ? (
            <div className="space-y-4 min-w-0">
              {/* Matched Official Exam Question Banner */}
              {analysisResult.matchedExamQuestion && (
                <div className="p-4 rounded-2xl bg-amber-950/25 border border-amber-500/40 space-y-1.5">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-amber-400 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Award className="w-4 h-4 shrink-0" />
                      <span>VERIFIED OFFICIAL EXAM QUESTION MATCH</span>
                    </span>
                    <span className="tabular-nums">{analysisResult.matchedExamQuestion.points} Marks</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-100">
                    {analysisResult.matchedExamQuestion.numberLabel} — {analysisResult.matchedExamQuestion.sourceExam}
                  </div>
                </div>
              )}

              {/* Classification Diagnostics Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3.5 min-w-0">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-xs font-mono uppercase font-bold text-teal-400 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 shrink-0" />
                    <span>Equation Diagnostics</span>
                  </span>
                  {analysisResult.methodUsed && (
                    <span className="text-[11px] font-mono text-slate-300 bg-slate-950 px-2.5 py-0.5 rounded-lg border border-slate-800">
                      {analysisResult.methodUsed}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-100">{analysisResult.arabicOdeType}</h3>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">{analysisResult.odeType}</p>
                </div>

                {/* Metadata Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-center">
                    <span className="text-[10px] font-mono text-slate-500 block">Order (الرتبة)</span>
                    <span className="text-xs font-mono font-bold text-teal-300 tabular-nums">
                      {analysisResult.order === 0
                        ? 'Transform'
                        : analysisResult.order === 1
                        ? '1st Order'
                        : analysisResult.order === 2
                        ? '2nd Order'
                        : `${analysisResult.order}th Order`}
                    </span>
                  </div>

                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-center">
                    <span className="text-[10px] font-mono text-slate-500 block">Degree (الدرجة)</span>
                    <span className="text-xs font-mono font-bold text-teal-300 tabular-nums">
                      Degree {analysisResult.degree}
                    </span>
                  </div>

                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-center">
                    <span className="text-[10px] font-mono text-slate-500 block">Linearity</span>
                    <span
                      className={`text-xs font-mono font-bold ${
                        analysisResult.isLinear ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      {analysisResult.isLinear ? 'Linear (خطية)' : 'Non-Linear'}
                    </span>
                  </div>

                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-center">
                    <span className="text-[10px] font-mono text-slate-500 block">Variables</span>
                    <span className="text-xs font-mono font-bold text-cyan-300">
                      {analysisResult.dependentVar}({analysisResult.independentVar})
                    </span>
                  </div>
                </div>

                {/* Visual Recognition & Examiner Trap Alert */}
                {(analysisResult.examinerTrap || analysisResult.visualRecognitionTrigger) && (
                  <div className="space-y-2 pt-1">
                    {analysisResult.visualRecognitionTrigger && (
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-teal-400">
                          <Eye className="w-3.5 h-3.5 shrink-0" />
                          <span>First-10-Seconds Recognition Signal</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed break-words">
                          {analysisResult.visualRecognitionTrigger}
                        </p>
                      </div>
                    )}

                    {analysisResult.examinerTrap && (
                      <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                          <span>Examiner Trap Warning (فخ الامتحان)</span>
                        </div>
                        <p className="text-xs text-amber-100/90 leading-relaxed break-words">
                          {analysisResult.examinerTrap}
                        </p>
                        {analysisResult.arabicExaminerTrap && (
                          <p className="text-xs text-amber-200/80 leading-relaxed pt-1 border-t border-amber-500/20 break-words" dir="rtl">
                            {analysisResult.arabicExaminerTrap}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Final Solution Box */}
                <div className="p-3.5 rounded-xl bg-teal-950/30 border border-teal-500/40 space-y-2 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-teal-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span>General Solution (الحل العام النهائي)</span>
                    </span>

                    <button
                      onClick={handleCopySolution}
                      className="text-xs font-mono text-teal-300 hover:text-white flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                    >
                      {copiedSolution ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-teal-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-teal-400" />
                          <span>Copy LaTeX</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-teal-200 text-sm font-mono overflow-x-auto no-scrollbar max-w-full">
                    <MathView math={analysisResult.generalSolutionLatex} block />
                  </div>

                  {/* Particular IVP Solution if computed */}
                  {analysisResult.ivpSolutionLatex && (
                    <div className="pt-2 border-t border-teal-500/20 space-y-1.5">
                      <span className="text-xs font-mono font-bold text-amber-300 block">
                        Particular IVP Solution for y(0) = {initialConditions.y0}, y'(0) = {initialConditions.yp0}:
                      </span>
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-amber-500/30 text-amber-200 text-sm font-mono overflow-x-auto no-scrollbar max-w-full">
                        <MathView math={analysisResult.ivpSolutionLatex} block />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Step-by-Step Derivation Breakdown */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 min-w-0">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-teal-400 shrink-0" />
                    <h3 className="text-xs sm:text-sm font-bold text-slate-100 font-mono">
                      Step-by-Step Derivation ({analysisResult.steps.length} Steps)
                    </h3>
                  </div>

                  <button
                    onClick={handleCopyAllSteps}
                    className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                  >
                    {copiedAllSteps ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-teal-400" />
                        <span>All Steps Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy Full Derivation</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Steps List */}
                <div className="space-y-3 min-w-0">
                  {analysisResult.steps.map((step) => (
                    <div
                      key={step.stepNumber}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 space-y-2 min-w-0"
                    >
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded-md bg-teal-500/15 text-teal-300 border border-teal-500/30 text-[11px] font-mono font-bold tabular-nums">
                          Step {step.stepNumber}
                        </span>
                        <span className="text-xs font-bold text-teal-400/90" dir="rtl">
                          {step.arabicTitle}
                        </span>
                      </div>

                      <h4 className="text-xs sm:text-sm font-bold text-slate-100 break-words">
                        {step.title}
                      </h4>

                      {/* LaTeX Equation for this step */}
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-teal-300 overflow-x-auto no-scrollbar max-w-full">
                        <MathView math={step.latex} block />
                      </div>

                      {/* Explanations */}
                      <div className="space-y-1.5 text-xs text-slate-300 leading-relaxed pt-0.5">
                        <p className="break-words">{step.explanation}</p>
                        <p className="text-slate-400 break-words border-t border-slate-800/60 pt-1" dir="rtl">
                          {step.arabicExplanation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center text-center space-y-3 min-h-[360px]">
              <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-teal-400">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-200 font-mono">
                Ready to Solve Any Differential Equation
              </h3>
              <p className="text-xs text-slate-400 max-w-xs">
                Enter an equation in LaTeX, select one of the 16 Exam Archetype Presets, or load any of the 125 Official Exam Questions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
