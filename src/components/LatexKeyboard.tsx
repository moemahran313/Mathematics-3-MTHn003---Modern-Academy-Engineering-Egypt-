import React, { useState } from 'react';
import {
  Delete,
  CornerDownLeft,
  Space,
  Trash2,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';
import { MathView } from './MathView';

interface LatexKeyboardProps {
  onInsert: (latexSnippet: string) => void;
  onBackspace: () => void;
  onClear: () => void;
  onPresetSelect?: (presetLatex: string) => void;
}

interface KeyDefinition {
  label: string;
  latexPreview?: string;
  insertValue: string;
  category: 'derivatives' | 'operators' | 'functions' | 'laplace' | 'variables';
  color?: string;
}

export const LATEX_KEYS: KeyDefinition[] = [
  // Derivatives & ODE symbols
  { label: "y''", latexPreview: "y''", insertValue: "y''", category: 'derivatives', color: 'text-amber-300' },
  { label: "y'", latexPreview: "y'", insertValue: "y'", category: 'derivatives', color: 'text-amber-300' },
  { label: 'dy/dx', latexPreview: '\\frac{dy}{dx}', insertValue: '\\frac{dy}{dx}', category: 'derivatives', color: 'text-amber-300' },
  { label: 'd²y/dx²', latexPreview: '\\frac{d^2y}{dx^2}', insertValue: '\\frac{d^2y}{dx^2}', category: 'derivatives', color: 'text-amber-300' },
  { label: 'dx', latexPreview: 'dx', insertValue: 'dx', category: 'derivatives' },
  { label: 'dy', latexPreview: 'dy', insertValue: 'dy', category: 'derivatives' },
  { label: 'dt', latexPreview: 'dt', insertValue: 'dt', category: 'derivatives' },
  { label: '∫', latexPreview: '\\int', insertValue: '\\int ', category: 'derivatives' },
  { label: '∂M/∂y', latexPreview: '\\frac{\\partial M}{\\partial y}', insertValue: '\\frac{\\partial M}{\\partial y}', category: 'derivatives' },
  { label: '∂N/∂x', latexPreview: '\\frac{\\partial N}{\\partial x}', insertValue: '\\frac{\\partial N}{\\partial x}', category: 'derivatives' },

  // Operators & Basic Algebra
  { label: '+', insertValue: ' + ', category: 'operators' },
  { label: '-', insertValue: ' - ', category: 'operators' },
  { label: '=', insertValue: ' = ', category: 'operators', color: 'text-teal-400 font-bold' },
  { label: '·', latexPreview: '\\cdot', insertValue: ' \\cdot ', category: 'operators' },
  { label: 'a/b', latexPreview: '\\frac{a}{b}', insertValue: '\\frac{}{}', category: 'operators' },
  { label: 'x²', latexPreview: 'x^2', insertValue: '^2', category: 'operators' },
  { label: 'xⁿ', latexPreview: 'x^n', insertValue: '^{}', category: 'operators' },
  { label: '√x', latexPreview: '\\sqrt{x}', insertValue: '\\sqrt{}', category: 'operators' },
  { label: '(', insertValue: '(', category: 'operators' },
  { label: ')', insertValue: ')', category: 'operators' },
  { label: '[', insertValue: '[', category: 'operators' },
  { label: ']', insertValue: ']', category: 'operators' },

  // Functions
  { label: 'eˣ', latexPreview: 'e^{x}', insertValue: 'e^{x}', category: 'functions', color: 'text-cyan-300' },
  { label: 'eᵃˣ', latexPreview: 'e^{ax}', insertValue: 'e^{}', category: 'functions', color: 'text-cyan-300' },
  { label: 'sin(x)', latexPreview: '\\sin(x)', insertValue: '\\sin(x)', category: 'functions' },
  { label: 'cos(x)', latexPreview: '\\cos(x)', insertValue: '\\cos(x)', category: 'functions' },
  { label: 'tan(x)', latexPreview: '\\tan(x)', insertValue: '\\tan(x)', category: 'functions' },
  { label: 'ln(x)', latexPreview: '\\ln(x)', insertValue: '\\ln(x)', category: 'functions' },
  { label: 'sinh(x)', latexPreview: '\\sinh(x)', insertValue: '\\sinh(x)', category: 'functions' },
  { label: 'cosh(x)', latexPreview: '\\cosh(x)', insertValue: '\\cosh(x)', category: 'functions' },

  // Laplace & Fourier
  { label: 'L{y}', latexPreview: '\\mathcal{L}\\{y\\}', insertValue: '\\mathcal{L}\\{y\\}', category: 'laplace', color: 'text-purple-300' },
  { label: 'L⁻¹{F}', latexPreview: '\\mathcal{L}^{-1}\\{F\\}', insertValue: '\\mathcal{L}^{-1}\\{\\}', category: 'laplace', color: 'text-purple-300' },
  { label: 'e⁻ˢᵗ', latexPreview: 'e^{-st}', insertValue: 'e^{-st}', category: 'laplace' },
  { label: 'u(t-a)', latexPreview: 'u(t-a)', insertValue: 'u(t-a)', category: 'laplace' },
  { label: 'δ(t)', latexPreview: '\\delta(t)', insertValue: '\\delta(t)', category: 'laplace' },
  { label: '∑', latexPreview: '\\sum_{n=1}^\\infty', insertValue: '\\sum_{n=1}^\\infty ', category: 'laplace' },
  { label: 'π', latexPreview: '\\pi', insertValue: '\\pi', category: 'laplace' },
  { label: 'θ', latexPreview: '\\theta', insertValue: '\\theta', category: 'laplace' },

  // Variables & Constants
  { label: 'x', insertValue: 'x', category: 'variables', color: 'text-emerald-300 font-bold' },
  { label: 'y', insertValue: 'y', category: 'variables', color: 'text-emerald-300 font-bold' },
  { label: 't', insertValue: 't', category: 'variables', color: 'text-emerald-300 font-bold' },
  { label: 's', insertValue: 's', category: 'variables', color: 'text-emerald-300 font-bold' },
  { label: 'z', insertValue: 'z', category: 'variables' },
  { label: 'u', insertValue: 'u', category: 'variables' },
  { label: 'm', insertValue: 'm', category: 'variables' },
  { label: 'C₁', latexPreview: 'C_1', insertValue: 'C_1', category: 'variables', color: 'text-rose-300' },
  { label: 'C₂', latexPreview: 'C_2', insertValue: 'C_2', category: 'variables', color: 'text-rose-300' },
  { label: 'C', latexPreview: 'C', insertValue: 'C', category: 'variables', color: 'text-rose-300' },
];

export const PRESET_ODES = [
  {
    name: '2nd Order Homogeneous (Complex Roots)',
    arabicName: 'رتبة ثانية متجانسة (جذور مركبة)',
    latex: "y'' - 4y' + 13y = 0",
  },
  {
    name: '2nd Order Real Distinct Roots',
    arabicName: 'رتبة ثانية (جذور حقيقية مختلفة)',
    latex: "y'' - 5y' + 6y = 0",
  },
  {
    name: '2nd Order Non-Homogeneous (Undetermined Coeffs)',
    arabicName: 'رتبة ثانية غير متجانسة (معاملات غير محددة)',
    latex: "y'' - 3y' + 2y = e^{3x}",
  },
  {
    name: '1st Order Linear ODE',
    arabicName: 'معادلة خطية رتبة أولى (معامل التكامل)',
    latex: "y' + 2xy = 4x",
  },
  {
    name: 'Separable Differential Equation',
    arabicName: 'معادلة قابلة لفصل المتغيرات',
    latex: "\\frac{dy}{dx} = \\frac{x^2 + 1}{y^2}",
  },
  {
    name: 'Exact Differential Equation',
    arabicName: 'معادلة تفاضلية تامة (Exact)',
    latex: "(2xy + 3)dx + (x^2 - 1)dy = 0",
  },
  {
    name: 'Bernoulli Non-Linear ODE',
    arabicName: 'معادلة برنولي غير الخطية',
    latex: "\\frac{dy}{dx} + \\frac{1}{x} y = x y^2",
  },
  {
    name: 'Euler-Cauchy ODE',
    arabicName: 'معادلة أويلر-كوشي',
    latex: "x^2 y'' - 2x y' + 2y = 0",
  },
];

export const LatexKeyboard: React.FC<LatexKeyboardProps> = ({
  onInsert,
  onBackspace,
  onClear,
  onPresetSelect,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'derivatives' | 'functions' | 'laplace' | 'operators'>('all');
  const [showPresets, setShowPresets] = useState(false);

  const displayedKeys = activeTab === 'all'
    ? LATEX_KEYS
    : LATEX_KEYS.filter((k) => k.category === activeTab || k.category === 'variables');

  return (
    <div className="p-3 sm:p-4 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-2xl space-y-3">
      {/* Keyboard Header / Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {(
            [
              { id: 'all', label: 'All Keys' },
              { id: 'derivatives', label: "y', dy/dx, ∫" },
              { id: 'functions', label: 'eˣ, sin, cos, ln' },
              { id: 'laplace', label: 'L{}, ∑, π' },
              { id: 'operators', label: '+, -, =, /' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
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
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>Preset ODEs</span>
            {showPresets ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        )}
      </div>

      {/* Quick Presets Panel */}
      {showPresets && onPresetSelect && (
        <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2 animate-fadeIn">
          {PRESET_ODES.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                onPresetSelect(p.latex);
                setShowPresets(false);
              }}
              className="p-2.5 rounded-lg bg-slate-950/80 hover:bg-slate-850 border border-slate-800 hover:border-teal-500/40 text-left transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-[11px] text-slate-400 group-hover:text-teal-300 mb-1">
                <span className="font-bold">{p.name}</span>
                <span className="text-[10px] font-mono text-slate-500">{p.arabicName}</span>
              </div>
              <div className="text-xs text-teal-400 font-mono overflow-x-auto no-scrollbar">
                <MathView math={p.latex} inline />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Keypad Grid */}
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-1.5 sm:gap-2">
        {displayedKeys.map((key, idx) => (
          <button
            key={idx}
            onClick={() => onInsert(key.insertValue)}
            className={`p-2 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-teal-500/20 active:border-teal-400 border border-slate-800/80 hover:border-slate-700 flex flex-col items-center justify-center transition-all cursor-pointer min-h-[42px] shadow-sm select-none ${
              key.color || 'text-slate-200'
            }`}
          >
            {key.latexPreview ? (
              <span className="text-xs pointer-events-none">
                <MathView math={key.latexPreview} inline />
              </span>
            ) : (
              <span className="text-xs font-mono font-bold">{key.label}</span>
            )}
          </button>
        ))}
      </div>

      {/* Keyboard Footer Action Row */}
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-850">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onInsert(' ')}
            className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            title="Space"
          >
            <Space className="w-3.5 h-3.5" />
            <span>Space</span>
          </button>

          <button
            onClick={() => onInsert('()')}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-mono font-semibold transition-all cursor-pointer"
            title="Parentheses"
          >
            ( )
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onBackspace}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-rose-500/20 text-rose-300 border border-slate-800 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            title="Backspace"
          >
            <Delete className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Delete</span>
          </button>

          <button
            onClick={onClear}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-rose-950/40 active:bg-rose-500/20 text-rose-400 border border-slate-800 hover:border-rose-500/30 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
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
