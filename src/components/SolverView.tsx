import React, { useState } from 'react';
import { Calculator, Sparkles, Check, HelpCircle, ArrowRight, BrainCircuit, Sliders, Layers } from 'lucide-react';
import { MathView } from './MathView';
import { ODEStepByStepSolver } from './ODEStepByStepSolver';

export const SolverView: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'latex_solver' | 'auxiliary' | 'bernoulli'>('latex_solver');

  // Auxiliary Equation Solver State: a y'' + b y' + c y = 0
  const [coeffA, setCoeffA] = useState<number>(1);
  const [coeffB, setCoeffB] = useState<number>(-2);
  const [coeffC, setCoeffC] = useState<number>(10);

  // Bernoulli Solver State
  const [bernoulliN, setBernoulliN] = useState<number>(5);

  // Discriminant calculation
  const a = coeffA || 1;
  const b = coeffB || 0;
  const c = coeffC || 0;

  const delta = b * b - 4 * a * c;

  let rootType = '';
  let rootsLatex = '';
  let solutionLatex = '';

  if (delta > 0) {
    rootType = 'Case 1: Real & Distinct Roots (m₁ ≠ m₂)';
    const m1 = (-b + Math.sqrt(delta)) / (2 * a);
    const m2 = (-b - Math.sqrt(delta)) / (2 * a);
    const m1Str = Number.isInteger(m1) ? `${m1}` : m1.toFixed(2);
    const m2Str = Number.isInteger(m2) ? `${m2}` : m2.toFixed(2);
    rootsLatex = `m_1 = ${m1Str}, \\quad m_2 = ${m2Str}`;
    solutionLatex = `y_h(x) = C_1 e^{${m1Str}x} + C_2 e^{${m2Str}x}`;
  } else if (delta === 0) {
    rootType = 'Case 2: Real & Repeated Root (m₁ = m₂)';
    const m = -b / (2 * a);
    const mStr = Number.isInteger(m) ? `${m}` : m.toFixed(2);
    rootsLatex = `m_1 = m_2 = ${mStr}`;
    solutionLatex = `y_h(x) = (C_1 + C_2 x) e^{${mStr}x}`;
  } else {
    rootType = 'Case 3: Complex Conjugate Roots (m = α ± iβ)';
    const alpha = -b / (2 * a);
    const beta = Math.sqrt(-delta) / (2 * a);
    const alphaStr = Number.isInteger(alpha) ? `${alpha}` : alpha.toFixed(2);
    const betaStr = Number.isInteger(beta) ? `${beta}` : beta.toFixed(2);
    rootsLatex = `m = ${alphaStr} \\pm ${betaStr}i \\quad (\\alpha = ${alphaStr}, \\; \\beta = ${betaStr})`;
    if (alpha === 0) {
      solutionLatex = `y_h(x) = C_1 \\cos(${betaStr}x) + C_2 \\sin(${betaStr}x)`;
    } else {
      solutionLatex = `y_h(x) = e^{${alphaStr}x} \\left[ C_1 \\cos(${betaStr}x) + C_2 \\sin(${betaStr}x) \\right]`;
    }
  }

  // Bernoulli calculation
  const n = bernoulliN;
  const powerZ = 1 - n;

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Tool Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-850 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTool('latex_solver')}
            className={`px-4 py-2.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTool === 'latex_solver'
                ? 'bg-teal-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <BrainCircuit className="w-4 h-4" />
            <span>LaTeX Step-by-Step Solver</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
              activeTool === 'latex_solver' ? 'bg-slate-950/40 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'
            }`}>
              Custom Keyboard
            </span>
          </button>

          <button
            onClick={() => setActiveTool('auxiliary')}
            className={`px-4 py-2.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTool === 'auxiliary'
                ? 'bg-teal-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>2nd Order Auxiliary Roots (am² + bm + c)</span>
          </button>

          <button
            onClick={() => setActiveTool('bernoulli')}
            className={`px-4 py-2.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTool === 'bernoulli'
                ? 'bg-teal-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Bernoulli Linearizer (yⁿ)</span>
          </button>
        </div>
      </div>

      {/* View 1: Main LaTeX Step-by-Step Solver */}
      {activeTool === 'latex_solver' && (
        <ODEStepByStepSolver />
      )}

      {/* View 2: Auxiliary Equation Explorer */}
      {activeTool === 'auxiliary' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 rounded-3xl border bg-slate-900/80 border-slate-800 shadow-xl space-y-5 max-w-3xl mx-auto">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase font-bold text-teal-400 tracking-wider">
                Interactive Tool • Constant Coefficients ODE
              </span>
              <h3 className="text-lg font-bold text-slate-100">
                2nd Order Auxiliary Equation & General Solution Generator
              </h3>
              <p className="text-xs text-slate-400">
                Solves <MathView math="a y'' + b y' + c y = 0" inline /> by computing roots of quadratic characteristic equation <MathView math="a m^2 + b m + c = 0" inline />.
              </p>
            </div>

            {/* Coefficients Input */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                  Coeff a (y'')
                </label>
                <input
                  type="number"
                  value={coeffA}
                  onChange={(e) => setCoeffA(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono font-bold text-slate-100 focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                  Coeff b (y')
                </label>
                <input
                  type="number"
                  value={coeffB}
                  onChange={(e) => setCoeffB(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono font-bold text-slate-100 focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                  Coeff c (y)
                </label>
                <input
                  type="number"
                  value={coeffC}
                  onChange={(e) => setCoeffC(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono font-bold text-slate-100 focus:outline-none focus:border-teal-400"
                />
              </div>
            </div>

            {/* Active Equation */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-850 text-xs text-teal-300 font-mono text-center">
              <MathView math={`${a}y'' + (${b})y' + (${c})y = 0 \\implies ${a}m^2 + (${b})m + (${c}) = 0`} block />
            </div>

            {/* Calculation Output */}
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Discriminant Δ = b² - 4ac
                  </span>
                  <span className={`text-xs font-mono font-bold ${delta >= 0 ? 'text-teal-400' : 'text-amber-400'}`}>
                    Δ = {delta}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-200">
                  {rootType}
                </div>
                <div className="text-xs text-teal-300 py-1 overflow-x-auto no-scrollbar text-center">
                  <MathView math={rootsLatex} block />
                </div>
              </div>

              {/* General Solution Result */}
              <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30 space-y-1">
                <span className="text-[10px] font-mono font-bold text-teal-400 uppercase tracking-wider block">
                  Homogeneous General Solution yh(x):
                </span>
                <div className="text-sm sm:text-base font-bold text-teal-200 py-1 overflow-x-auto no-scrollbar text-center">
                  <MathView math={solutionLatex} block />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View 3: Bernoulli Substitution Explorer */}
      {activeTool === 'bernoulli' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 rounded-3xl border bg-slate-900/80 border-slate-800 shadow-xl space-y-5 max-w-3xl mx-auto">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase font-bold text-teal-400 tracking-wider">
                Interactive Tool • Non-Linear ODE Transformation
              </span>
              <h3 className="text-lg font-bold text-slate-100">
                Bernoulli Substitution Analyzer & Linearization
              </h3>
              <p className="text-xs text-slate-400">
                Converts non-linear differential equation <MathView math="y' + P(x)y = Q(x)y^n" inline /> into linear form in variable z.
              </p>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                Select power of y (n)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="2"
                  max="10"
                  value={bernoulliN}
                  onChange={(e) => setBernoulliN(parseInt(e.target.value, 10))}
                  className="flex-1 accent-teal-400 cursor-pointer"
                />
                <span className="w-12 text-center font-mono font-bold text-teal-400 text-sm bg-slate-950 py-1 rounded border border-slate-800">
                  n = {bernoulliN}
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-850 space-y-2 text-center">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">
                  1. Required Substitution:
                </span>
                <div className="text-xs text-teal-300">
                  <MathView math={`z = y^{1 - n} = y^{1 - ${n}} = y^{${powerZ}}`} block />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-850 space-y-2 text-center">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">
                  2. Derivative Relation:
                </span>
                <div className="text-xs text-teal-300">
                  <MathView math={`z' = (${powerZ}) y^{${powerZ - 1}} y' = (${powerZ}) y^{-${n}} y'`} block />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30 space-y-1 text-center">
                <span className="text-[10px] font-mono font-bold text-teal-400 uppercase tracking-wider block">
                  3. Resulting Standard Linear Differential Equation:
                </span>
                <div className="text-xs sm:text-sm font-bold text-teal-200 py-1 overflow-x-auto no-scrollbar">
                  <MathView math={`z' + (${powerZ}) P(x) z = (${powerZ}) Q(x)`} block />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
