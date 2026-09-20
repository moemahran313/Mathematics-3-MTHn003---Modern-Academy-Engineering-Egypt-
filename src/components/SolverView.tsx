import React, { useState } from 'react';
import { Calculator, Sparkles, Check, HelpCircle, ArrowRight } from 'lucide-react';
import { MathView } from './MathView';

export const SolverView: React.FC = () => {
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
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="p-6 rounded-2xl border bg-slate-900/70 border-slate-800 shadow-xl">
        <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1">
          <Calculator className="w-5 h-5" />
          <h2 className="text-base font-extrabold tracking-tight text-slate-100">
            Interactive Differential Equation Solvers & Explorers
          </h2>
        </div>
        <p className="text-xs text-slate-400 font-sans max-w-2xl">
          Instantly solve second-order auxiliary equations, preview Bernoulli linear transformations, and inspect mathematical properties with live KaTeX rendering.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Module 1: 2nd Order Auxiliary Equation Solver */}
        <div className="p-6 rounded-3xl border bg-slate-900/80 border-slate-800 shadow-xl space-y-5">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase font-bold text-teal-400 tracking-wider">
              Tool #1 • Constant Coefficients ODE
            </span>
            <h3 className="text-base font-bold text-slate-100">
              Auxiliary Equation & Solution Generator
            </h3>
            <p className="text-xs text-slate-400">
              Solves <MathView math="a y'' + b y' + c y = 0" inline /> by computing roots of <MathView math="a m^2 + b m + c = 0" inline />.
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
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-850 text-xs text-teal-300 font-mono">
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
              <div className="text-xs text-teal-300 py-1 overflow-x-auto no-scrollbar">
                <MathView math={rootsLatex} block />
              </div>
            </div>

            {/* General Solution Result */}
            <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30 space-y-1">
              <span className="text-[10px] font-mono font-bold text-teal-400 uppercase tracking-wider block">
                Homogeneous General Solution yh(x):
              </span>
              <div className="text-sm sm:text-base font-bold text-teal-200 py-1 overflow-x-auto no-scrollbar">
                <MathView math={solutionLatex} block />
              </div>
            </div>
          </div>
        </div>

        {/* Module 2: Bernoulli Transformation Converter */}
        <div className="p-6 rounded-3xl border bg-slate-900/80 border-slate-800 shadow-xl space-y-5">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase font-bold text-teal-400 tracking-wider">
              Tool #2 • Non-Linear ODE Transformation
            </span>
            <h3 className="text-base font-bold text-slate-100">
              Bernoulli Substitution Analyzer
            </h3>
            <p className="text-xs text-slate-400">
              Converts non-linear equation <MathView math="y' + P(x)y = Q(x)y^n" inline /> into linear form in variable z.
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
              <span className="w-10 text-center font-mono font-bold text-teal-400 text-sm bg-slate-950 py-1 rounded border border-slate-800">
                n = {bernoulliN}
              </span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">
                1. Required Substitution:
              </span>
              <div className="text-xs text-teal-300">
                <MathView math={`z = y^{1 - n} = y^{1 - ${n}} = y^{${powerZ}}`} block />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">
                2. Derivative Relation:
              </span>
              <div className="text-xs text-teal-300">
                <MathView math={`z' = (${powerZ}) y^{${powerZ - 1}} y' = (${powerZ}) y^{-${n}} y'`} block />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30 space-y-1">
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
    </div>
  );
};
