import React, { useState, useRef, useEffect } from 'react';
import {
  Calculator,
  Sparkles,
  Play,
  Copy,
  Check,
  RotateCcw,
  Keyboard,
  Layers,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  BrainCircuit,
  Info,
  Zap,
} from 'lucide-react';
import { MathView } from './MathView';
import { LatexKeyboard, PRESET_ODES } from './LatexKeyboard';
import {
  solveODEHeuristic,
  ODEAnalysisResult,
  ODESolveStep,
} from '../utils/odeSolverEngine';

export const ODEStepByStepSolver: React.FC = () => {
  const [latexInput, setLatexInput] = useState<string>("y'' - 4y' + 13y = 0");
  const [analysisResult, setAnalysisResult] = useState<ODEAnalysisResult | null>(null);
  const [isSolving, setIsSolving] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(true);
  const [copiedSolution, setCopiedSolution] = useState(false);
  const [copiedAllSteps, setCopiedAllSteps] = useState(false);
  const [solverMode, setSolverMode] = useState<'smart' | 'ai'>('smart');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Automatically solve on mount or preset
  useEffect(() => {
    handleSolve();
  }, []);

  const handleSolve = async (customInput?: string) => {
    const input = customInput !== undefined ? customInput : latexInput;
    if (!input.trim()) return;

    setIsSolving(true);

    try {
      if (solverMode === 'ai') {
        // Try Gemini backend API first
        const response = await fetch('/api/solve-ode', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ latex: input }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data && data.steps) {
            setAnalysisResult(data);
            setIsSolving(false);
            return;
          }
        }
      }
    } catch (err) {
      console.warn('Backend ODE API not reachable, using built-in symbolic solver:', err);
    }

    // Fallback or Standard Mode: Use robust built-in symbolic solver
    setTimeout(() => {
      const result = solveODEHeuristic(input);
      setAnalysisResult(result);
      setIsSolving(false);
    }, 200);
  };

  const handleInsertKey = (snippet: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setLatexInput((prev) => prev + snippet);
      return;
    }

    const start = textarea.selectionStart || 0;
    const end = textarea.selectionEnd || 0;
    const current = latexInput;

    const updated = current.substring(0, start) + snippet + current.substring(end);
    setLatexInput(updated);

    setTimeout(() => {
      textarea.focus();
      const newPos = start + snippet.length;
      textarea.setSelectionRange(newPos, newPos);
    }, 0);
  };

  const handleBackspace = () => {
    const textarea = textareaRef.current;
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
    setLatexInput('');
    setAnalysisResult(null);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handlePresetSelect = (presetLatex: string) => {
    setLatexInput(presetLatex);
    handleSolve(presetLatex);
  };

  const handleCopySolution = () => {
    if (!analysisResult) return;
    navigator.clipboard.writeText(analysisResult.generalSolutionLatex);
    setCopiedSolution(true);
    setTimeout(() => setCopiedSolution(false), 2000);
  };

  const handleCopyAllSteps = () => {
    if (!analysisResult) return;
    const text = `Differential Equation Analysis & Solution:\nEquation: ${analysisResult.rawInput}\nType: ${analysisResult.odeType} (${analysisResult.arabicOdeType})\nOrder: ${analysisResult.order}, Degree: ${analysisResult.degree}\n\nSteps:\n` +
      analysisResult.steps.map((s) => `Step ${s.stepNumber}: ${s.title}\n${s.latex}\nExplanation: ${s.explanation}\n`).join('\n') +
      `\nGeneral Solution:\n${analysisResult.generalSolutionLatex}`;
    navigator.clipboard.writeText(text);
    setCopiedAllSteps(true);
    setTimeout(() => setCopiedAllSteps(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-teal-500/10 text-teal-400 border border-teal-500/30 flex items-center gap-1.5">
                <BrainCircuit className="w-3.5 h-3.5 text-teal-400" />
                <span>LaTeX Differential Equation Solver</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono text-slate-400 bg-slate-800 border border-slate-700">
                Math 3 Step-by-Step
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-100">
              محلل وحلال المعادلات التفاضلية خطوة بخطوة بالـ LaTeX
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              اكتب أو ركّب أي معادلة تفاضلية بصيغة LaTeX باستخدام لوحة المفاتيح المخصصة، ليتم تحليل رتبتها ودرجتها وخطيتها وحلها خطوة بخطوة بالتفصيل مع المعادلات والشروحات.
            </p>

            <div className="flex items-center gap-3 pt-1 flex-wrap">
              <span className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
                <Zap className="w-4 h-4 text-teal-400" />
                <span>لوحة مفاتيح LaTeX كاملة</span>
              </span>
              <span className="text-slate-600 font-mono">•</span>
              <span className="text-xs text-teal-400 font-mono font-bold">
                تحليل فوري وشرح عربي وإنجليزي
              </span>
            </div>
          </div>

          {/* Quick Presets Buttons */}
          <div className="flex flex-col gap-2 shrink-0">
            <span className="text-[11px] font-mono uppercase text-slate-400 font-bold">
              أمثلة سريعة (Quick Presets)
            </span>
            <div className="flex flex-wrap lg:flex-col gap-2">
              {PRESET_ODES.slice(0, 3).map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePresetSelect(p.latex)}
                  className="px-3 py-2 rounded-xl bg-slate-950/80 hover:bg-slate-850 border border-slate-800 hover:border-teal-500/40 text-xs font-mono text-slate-300 hover:text-teal-300 flex items-center justify-between gap-3 transition-all cursor-pointer text-left"
                >
                  <span className="font-bold">{p.latex}</span>
                  <span className="text-[10px] text-slate-500">{p.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Solver Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: LaTeX Input & Virtual Keyboard (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-teal-400" />
                <h2 className="text-sm font-bold text-slate-100 font-mono">
                  Input Differential Equation (LaTeX)
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowKeyboard(!showKeyboard)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    showKeyboard
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
                  }`}
                >
                  <Keyboard className="w-3.5 h-3.5" />
                  <span>{showKeyboard ? 'Hide Keyboard' : 'Show Keyboard'}</span>
                </button>
              </div>
            </div>

            {/* LaTeX Text Input Box */}
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={latexInput}
                onChange={(e) => setLatexInput(e.target.value)}
                placeholder="Write differential equation in LaTeX, e.g. y'' - 4y' + 13y = 0 or \frac{dy}{dx} + 2xy = 4x"
                rows={3}
                className="w-full p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-sm font-mono text-slate-100 placeholder-slate-600 focus:outline-none focus:border-teal-500/80 transition-all resize-none shadow-inner"
              />
            </div>

            {/* Live KaTeX Rendered Preview */}
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-850 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Rendered Formula Preview (معاينة المعادلة):</span>
                <span className="text-[10px] text-teal-400">Live KaTeX</span>
              </div>
              <div className="min-h-[44px] flex items-center justify-center p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 text-teal-300 text-base overflow-x-auto no-scrollbar">
                {latexInput.trim() ? (
                  <MathView math={latexInput} />
                ) : (
                  <span className="text-xs text-slate-600 font-mono italic">
                    Type or click keyboard keys to preview differential equation...
                  </span>
                )}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between gap-3 pt-1">
              <button
                onClick={() => handleSolve()}
                disabled={!latexInput.trim() || isSolving}
                className="flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSolving ? (
                  <>
                    <RotateCcw className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Analyzing & Solving...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current text-slate-950" />
                    <span>Analyze & Solve Step-by-Step (تحليل وحل المعادلة)</span>
                  </>
                )}
              </button>

              <button
                onClick={handleClear}
                className="p-3 rounded-2xl bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                title="Clear input"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Virtual LaTeX Keyboard */}
            {showKeyboard && (
              <div className="pt-2 animate-fadeIn">
                <LatexKeyboard
                  onInsert={handleInsertKey}
                  onBackspace={handleBackspace}
                  onClear={handleClear}
                  onPresetSelect={handlePresetSelect}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Diagnostics & Step-by-Step Solution (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {analysisResult ? (
            <div className="space-y-4 animate-fadeIn">
              {/* Classification Diagnostics Card */}
              <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase font-bold text-teal-400 tracking-wider flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5" />
                    <span>Equation Diagnostics</span>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20 font-mono">
                    Order {analysisResult.order}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-100 font-sans">
                    {analysisResult.arabicOdeType}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">
                    {analysisResult.odeType}
                  </p>
                </div>

                {/* Badges Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-850 text-center">
                    <span className="text-[10px] font-mono text-slate-500 block">Order</span>
                    <span className="text-xs font-mono font-bold text-teal-300">
                      {analysisResult.order === 1 ? '1st Order' : analysisResult.order === 2 ? '2nd Order' : `${analysisResult.order}th Order`}
                    </span>
                  </div>

                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-850 text-center">
                    <span className="text-[10px] font-mono text-slate-500 block">Degree</span>
                    <span className="text-xs font-mono font-bold text-teal-300">
                      Degree {analysisResult.degree}
                    </span>
                  </div>

                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-850 text-center">
                    <span className="text-[10px] font-mono text-slate-500 block">Linearity</span>
                    <span className={`text-xs font-mono font-bold ${analysisResult.isLinear ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {analysisResult.isLinear ? 'Linear (خطية)' : 'Non-Linear'}
                    </span>
                  </div>

                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-850 text-center">
                    <span className="text-[10px] font-mono text-slate-500 block">Variables</span>
                    <span className="text-xs font-mono font-bold text-cyan-300">
                      {analysisResult.dependentVar}({analysisResult.independentVar})
                    </span>
                  </div>
                </div>

                {/* Final Solution Quick Highlight */}
                <div className="p-3.5 rounded-2xl bg-teal-950/40 border border-teal-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-teal-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                      <span>General Solution (الحل العام)</span>
                    </span>

                    <button
                      onClick={handleCopySolution}
                      className="text-[11px] font-mono text-teal-300 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      {copiedSolution ? (
                        <>
                          <Check className="w-3 h-3 text-teal-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-teal-400" />
                          <span>Copy LaTeX</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-teal-300 text-sm font-mono overflow-x-auto no-scrollbar text-center">
                    <MathView math={analysisResult.generalSolutionLatex} />
                  </div>
                </div>
              </div>

              {/* Step-by-Step Derivation Breakdown */}
              <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-teal-400" />
                    <h3 className="text-sm font-bold text-slate-100 font-mono">
                      Step-by-Step Derivation ({analysisResult.steps.length} Steps)
                    </h3>
                  </div>

                  <button
                    onClick={handleCopyAllSteps}
                    className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-850 text-slate-300 border border-slate-800 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    {copiedAllSteps ? (
                      <>
                        <Check className="w-3 h-3 text-teal-400" />
                        <span>All Steps Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-slate-400" />
                        <span>Copy Steps</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Steps List */}
                <div className="space-y-3">
                  {analysisResult.steps.map((step) => (
                    <div
                      key={step.stepNumber}
                      className="p-3.5 rounded-2xl bg-slate-950 border border-slate-850 space-y-2 relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-400 border border-teal-500/20 text-[10px] font-mono font-bold">
                          Step {step.stepNumber}
                        </span>
                        <span className="text-[11px] font-bold text-slate-300 font-sans">
                          {step.arabicTitle}
                        </span>
                      </div>

                      <h4 className="text-xs font-mono font-bold text-slate-200">
                        {step.title}
                      </h4>

                      {/* LaTeX Equation for this step */}
                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-teal-300 overflow-x-auto no-scrollbar text-center">
                        <MathView math={step.latex} />
                      </div>

                      {/* Explanations */}
                      <div className="space-y-1 text-[11px] text-slate-400 font-sans leading-relaxed pt-1">
                        <p>{step.explanation}</p>
                        <p className="text-slate-500">{step.arabicExplanation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col items-center justify-center text-center space-y-3 min-h-[360px]">
              <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-teal-400">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-200 font-mono">
                No Equation Analyzed Yet
              </h3>
              <p className="text-xs text-slate-400 max-w-xs font-sans">
                Enter any differential equation in LaTeX on the left and click "Analyze & Solve Step-by-Step" to view the detailed mathematical solution.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
