import React, { useState } from 'react';
import {
  Delete,
  Space,
  Trash2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { MathView } from './MathView';

export interface LatexKeyInsert {
  insertValue: string;
  /** Number of characters from the end of insertValue to move cursor back (e.g., -1 puts cursor inside `{}`) */
  cursorBack?: number;
}

interface LatexKeyboardProps {
  onInsert: (snippet: string, cursorBack?: number) => void;
  onBackspace: () => void;
  onClear: () => void;
  onMoveCursor?: (delta: number) => void;
  onUndo?: () => void;
  canUndo?: boolean;
  onPresetSelect?: (presetLatex: string) => void;
}

interface KeyDefinition {
  label: string;
  latexPreview?: string;
  insertValue: string;
  cursorBack?: number;
  category: 'derivatives' | 'operators' | 'functions' | 'laplace' | 'variables';
  color?: string;
}

export const LATEX_KEYS: KeyDefinition[] = [
  // Derivatives & Differential Operators
  { label: "y''", latexPreview: "y''", insertValue: "y''", category: 'derivatives', color: 'text-amber-300' },
  { label: "y'", latexPreview: "y'", insertValue: "y'", category: 'derivatives', color: 'text-amber-300' },
  { label: "y'''", latexPreview: "y'''", insertValue: "y'''", category: 'derivatives', color: 'text-amber-300' },
  { label: 'dy/dx', latexPreview: '\\frac{dy}{dx}', insertValue: '\\frac{dy}{dx}', category: 'derivatives', color: 'text-amber-300' },
  { label: 'd²y/dx²', latexPreview: '\\frac{d^2y}{dx^2}', insertValue: '\\frac{d^2y}{dx^2}', category: 'derivatives', color: 'text-amber-300' },
  { label: 'dx', latexPreview: 'dx', insertValue: 'dx', category: 'derivatives' },
  { label: 'dy', latexPreview: 'dy', insertValue: 'dy', category: 'derivatives' },
  { label: 'D²', latexPreview: 'D^2', insertValue: 'D^2', category: 'derivatives', color: 'text-amber-300' },
  { label: 'D', latexPreview: 'D', insertValue: 'D', category: 'derivatives', color: 'text-amber-300' },
  { label: '∫', latexPreview: '\\int', insertValue: '\\int ', category: 'derivatives' },

  // Operators, Fractions, Powers & Digits
  { label: '+', insertValue: ' + ', category: 'operators' },
  { label: '-', insertValue: ' - ', category: 'operators' },
  { label: '=', insertValue: ' = ', category: 'operators', color: 'text-teal-400 font-bold' },
  { label: 'a/b', latexPreview: '\\frac{\\square}{\\square}', insertValue: '\\frac{}{}', cursorBack: 3, category: 'operators', color: 'text-teal-300' },
  { label: 'x²', latexPreview: 'x^2', insertValue: '^2', category: 'operators' },
  { label: 'x³', latexPreview: 'x^3', insertValue: '^3', category: 'operators' },
  { label: 'xⁿ', latexPreview: 'x^{\\square}', insertValue: '^{}', cursorBack: 1, category: 'operators', color: 'text-teal-300' },
  { label: '√', latexPreview: '\\sqrt{\\square}', insertValue: '\\sqrt{}', cursorBack: 1, category: 'operators' },
  { label: '( )', insertValue: '()', cursorBack: 1, category: 'operators' },
  { label: 'y/x', latexPreview: '\\frac{y}{x}', insertValue: '\\frac{y}{x}', category: 'operators', color: 'text-amber-300' },

  // Functions
  { label: 'eˣ', latexPreview: 'e^{x}', insertValue: 'e^{x}', category: 'functions', color: 'text-cyan-300' },
  { label: 'e⁻ˣ', latexPreview: 'e^{-x}', insertValue: 'e^{-x}', category: 'functions', color: 'text-cyan-300' },
  { label: 'eᵃˣ', latexPreview: 'e^{\\square}', insertValue: 'e^{}', cursorBack: 1, category: 'functions', color: 'text-cyan-300' },
  { label: 'sin', latexPreview: '\\sin(\\square)', insertValue: '\\sin()', cursorBack: 1, category: 'functions' },
  { label: 'cos', latexPreview: '\\cos(\\square)', insertValue: '\\cos()', cursorBack: 1, category: 'functions' },
  { label: 'tan', latexPreview: '\\tan(\\square)', insertValue: '\\tan(x)', category: 'functions' },
  { label: 'sec', latexPreview: '\\sec(\\square)', insertValue: '\\sec(x)', category: 'functions' },
  { label: 'ln', latexPreview: '\\ln|x|', insertValue: '\\ln(x)', category: 'functions' },
  { label: 'sinh', latexPreview: '\\sinh(x)', insertValue: '\\sinh(x)', category: 'functions' },
  { label: 'cosh', latexPreview: '\\cosh(x)', insertValue: '\\cosh(x)', category: 'functions' },

  // Laplace & Fourier
  { label: 'L{f}', latexPreview: '\\mathcal{L}\\{\\square\\}', insertValue: '\\mathcal{L}\\{\\}', cursorBack: 2, category: 'laplace', color: 'text-purple-300' },
  { label: 'L⁻¹{F}', latexPreview: '\\mathcal{L}^{-1}\\{\\square\\}', insertValue: '\\mathcal{L}^{-1}\\{\\}', cursorBack: 2, category: 'laplace', color: 'text-purple-300' },
  { label: 'e⁻ˢᵗ', latexPreview: 'e^{-st}', insertValue: 'e^{-st}', category: 'laplace' },
  { label: 'u(t-a)', latexPreview: 'u(t-a)', insertValue: 'u(t-a)', category: 'laplace' },
  { label: 'δ(t)', latexPreview: '\\delta(t)', insertValue: '\\delta(t)', category: 'laplace' },
  { label: 'π', latexPreview: '\\pi', insertValue: '\\pi', category: 'laplace' },

  // Variables & Digits
  { label: 'x', insertValue: 'x', category: 'variables', color: 'text-emerald-300 font-bold' },
  { label: 'y', insertValue: 'y', category: 'variables', color: 'text-emerald-300 font-bold' },
  { label: 't', insertValue: 't', category: 'variables', color: 'text-emerald-300 font-bold' },
  { label: 's', insertValue: 's', category: 'variables', color: 'text-emerald-300 font-bold' },
  { label: '0', insertValue: '0', category: 'variables' },
  { label: '1', insertValue: '1', category: 'variables' },
  { label: '2', insertValue: '2', category: 'variables' },
  { label: '3', insertValue: '3', category: 'variables' },
  { label: '4', insertValue: '4', category: 'variables' },
  { label: '5', insertValue: '5', category: 'variables' },
  { label: '6', insertValue: '6', category: 'variables' },
  { label: '9', insertValue: '9', category: 'variables' },
];

export const PRESET_ODES = [
  {
    name: '2nd Order Complex Roots',
    arabicName: 'رتبة ثانية (جذور مركبة)',
    category: '2nd Order',
    latex: "y'' - 4y' + 13y = 0",
  },
  {
    name: '2nd Order Distinct Roots',
    arabicName: 'رتبة ثانية (جذور حقيقية مختلفة)',
    category: '2nd Order',
    latex: "y'' - 5y' + 6y = 0",
  },
  {
    name: 'Undetermined Coeffs (No Resonance)',
    arabicName: 'معاملات غير محددة (بدون رنين)',
    category: 'Undetermined Coeffs',
    latex: "y'' - 3y' + 2y = 4e^{3x}",
  },
  {
    name: 'Resonance Trap (r Matches Root!)',
    arabicName: 'فخ الرنين (الأس يطابق جذر المعادلة!)',
    category: 'Undetermined Coeffs',
    latex: "y'' - 3y' + 2y = 3e^{2x}",
  },
  {
    name: 'Double Resonance Trap (s = 2)',
    arabicName: 'فخ الرنين المزدوج (جذر مكرر)',
    category: 'Undetermined Coeffs',
    latex: "y'' - 4y' + 4y = 6e^{2x}",
  },
  {
    name: 'Trig RHS (Both sin & cos Required)',
    arabicName: 'طرف أيمن مثلثي (يتطلب فرض sin و cos معاً)',
    category: 'Undetermined Coeffs',
    latex: "y'' + y' - 2y = 10\\cos(x)",
  },
  {
    name: 'Missing y Trap (m = 0 Root Resonance)',
    arabicName: 'فخ غياب y (الجذر m=0 يضرب كثيرة الحدود في x)',
    category: 'Undetermined Coeffs',
    latex: "y'' + 2y' = 6x^2",
  },
  {
    name: 'Wronskian Variation of Parameters (tan x)',
    arabicName: 'طريقة فرونسكي لتغير البارامترات (tan x)',
    category: 'Wronskian',
    latex: "y'' + y = \\tan(x)",
  },
  {
    name: 'Wronskian Variation of Parameters (sec x)',
    arabicName: 'طريقة فرونسكي لتغير البارامترات (sec x)',
    category: 'Wronskian',
    latex: "y'' + y = \\sec(x)",
  },
  {
    name: '1st Order Linear ODE (Integrating Factor)',
    arabicName: 'معادلة خطية رتبة أولى (معامل التكامل)',
    category: '1st Order',
    latex: "y' + 2xy = 4x",
  },
  {
    name: 'Bernoulli Non-Linear ODE (n = 2)',
    arabicName: 'معادلة برنولي غير الخطية (z = y⁻¹)',
    category: '1st Order',
    latex: "\\frac{dy}{dx} + \\frac{1}{x} y = x y^2",
  },
  {
    name: 'Exact Differential Equation',
    arabicName: 'معادلة تفاضلية تامة (Exact)',
    category: '1st Order',
    latex: "(2xy + 3)dx + (x^2 - 1)dy = 0",
  },
  {
    name: 'Separable Differential Equation',
    arabicName: 'معادلة قابلة لفصل المتغيرات',
    category: '1st Order',
    latex: "\\frac{dy}{dx} = \\frac{x^2 + 1}{y^2}",
  },
  {
    name: 'Cauchy-Euler Variable Coeffs ODE',
    arabicName: 'معادلة أويلر-كوشي ذات المعاملات المتغيرة',
    category: 'Cauchy-Euler',
    latex: "x^2 y'' - 2x y' + 2y = 0",
  },
  {
    name: 'Fall 2025 Midterm Q1(a) (Sec/Tan Linear)',
    arabicName: 'ميدترم خريف 2025 س1 (أ) - معادلة خطية',
    category: 'Official Exam',
    latex: "\\cos(y)\\frac{dy}{dx} + \\sin(y) = x",
  },
  {
    name: 'Final Exam Laplace IVP',
    arabicName: 'مسألة قيم ابتدائية بتحويل لابلاس (امتحان نهائي)',
    category: 'Official Exam',
    latex: "y'' + 4y = 8,\\quad y(0)=0,\\; y'(0)=2",
  },
];

export const LatexKeyboard: React.FC<LatexKeyboardProps> = ({
  onInsert,
  onBackspace,
  onClear,
  onMoveCursor,
  onUndo,
  canUndo,
  onPresetSelect,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'derivatives' | 'functions' | 'laplace' | 'operators'>('all');
  const [showPresets, setShowPresets] = useState(false);

  const displayedKeys =
    activeTab === 'all'
      ? LATEX_KEYS
      : LATEX_KEYS.filter((k) => k.category === activeTab || k.category === 'variables');

  return (
    <div className="p-3 sm:p-4 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-2xl space-y-3 min-w-0">
      {/* Keyboard Header / Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {(
            [
              { id: 'all', label: 'All Keys (46)' },
              { id: 'derivatives', label: "y'', dy/dx, D²" },
              { id: 'functions', label: 'eᵃˣ, sin, cos, tan' },
              { id: 'laplace', label: 'L{f}, L⁻¹{F}' },
              { id: 'operators', label: 'a/b, xⁿ, √, y/x' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === tab.id
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Presets dropdown toggle */}
        {onPresetSelect && (
          <button
            onClick={() => setShowPresets(!showPresets)}
            className={`px-2.5 py-1 rounded-lg border text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              showPresets
                ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span>16 Exam Archetype Presets</span>
            {showPresets ? <ChevronUp className="w-3 h-3 shrink-0" /> : <ChevronDown className="w-3 h-3 shrink-0" />}
          </button>
        )}
      </div>

      {/* Quick Presets Panel */}
      {showPresets && onPresetSelect && (
        <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto">
          {PRESET_ODES.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                onPresetSelect(p.latex);
                setShowPresets(false);
              }}
              className="p-2.5 rounded-lg bg-slate-950/90 hover:bg-slate-800 border border-slate-800 hover:border-teal-500/40 text-left transition-all group cursor-pointer flex flex-col justify-between min-w-0"
            >
              <div className="flex items-center justify-between gap-2 text-[11px] text-slate-300 group-hover:text-teal-300 mb-1">
                <span className="font-bold truncate">{p.name}</span>
                <span className="text-[10px] font-mono text-teal-400/80 shrink-0">{p.category}</span>
              </div>
              <div className="text-[11px] text-slate-400 mb-1.5 truncate">{p.arabicName}</div>
              <div className="text-xs text-teal-300 font-mono overflow-x-auto no-scrollbar">
                <MathView math={p.latex} inline />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Keypad Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 xl:grid-cols-10 gap-1.5 sm:gap-2">
        {displayedKeys.map((key, idx) => (
          <button
            key={idx}
            onClick={() => onInsert(key.insertValue, key.cursorBack)}
            className={`p-1.5 sm:p-2 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-teal-500/20 active:border-teal-400 border border-slate-800/80 hover:border-slate-700 flex flex-col items-center justify-center transition-all cursor-pointer min-h-[42px] shadow-sm select-none overflow-hidden ${
              key.color || 'text-slate-200'
            }`}
            title={`Insert ${key.insertValue}`}
          >
            {key.latexPreview ? (
              <span className="text-xs pointer-events-none max-w-full overflow-hidden">
                <MathView math={key.latexPreview} inline />
              </span>
            ) : (
              <span className="text-xs font-mono font-bold truncate max-w-full">{key.label}</span>
            )}
          </button>
        ))}
      </div>

      {/* Keyboard Footer Action Row */}
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/80 flex-wrap">
        <div className="flex items-center gap-1.5 flex-wrap">
          {onMoveCursor && (
            <>
              <button
                onClick={() => onMoveCursor(-1)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-mono font-semibold flex items-center gap-1 transition-all cursor-pointer"
                title="Move cursor left"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onMoveCursor(1)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-mono font-semibold flex items-center gap-1 transition-all cursor-pointer"
                title="Move cursor right"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          )}

          <button
            onClick={() => onInsert(' ')}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
            title="Space"
          >
            <Space className="w-3.5 h-3.5" />
            <span>Space</span>
          </button>

          {onUndo && (
            <button
              onClick={onUndo}
              disabled={!canUndo}
              className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-slate-300 border border-slate-800 text-xs font-mono font-semibold flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap"
              title="Undo last edit"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Undo</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onBackspace}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-rose-500/20 text-rose-300 border border-slate-800 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
            title="Backspace"
          >
            <Delete className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Backspace</span>
          </button>

          <button
            onClick={onClear}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-rose-950/40 active:bg-rose-500/20 text-rose-400 border border-slate-800 hover:border-rose-500/30 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
            title="Clear all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>
      </div>
    </div>
  );
};
