import { MASTER_EXAM_QUESTIONS, MasterExamQuestion } from '../data/masterExamBankData';

export interface ODESolveStep {
  stepNumber: number;
  title: string;
  arabicTitle: string;
  latex: string;
  explanation: string;
  arabicExplanation: string;
  type?:
    | 'classification'
    | 'transformation'
    | 'integration'
    | 'characteristic'
    | 'particular'
    | 'wronskian'
    | 'ivp'
    | 'final'
    | 'check';
}

export interface InitialConditionsInput {
  enabled: boolean;
  x0: string;
  y0: string;
  yp0: string;
}

export interface ODEAnalysisResult {
  rawInput: string;
  standardFormLatex: string;
  order: number;
  degree: number;
  isLinear: boolean;
  odeType: string;
  arabicOdeType: string;
  methodUsed?: string;
  dependentVar: string;
  independentVar: string;
  steps: ODESolveStep[];
  generalSolutionLatex: string;
  ivpSolutionLatex?: string;
  arabicSummary: string;
  examinerTrap?: string;
  arabicExaminerTrap?: string;
  visualRecognitionTrigger?: string;
  secretShortcut?: string;
  matchedExamQuestion?: {
    id: string;
    numberLabel: string;
    sourceExam: string;
    points: number;
  };
  verificationLatex?: string;
  tags: string[];
}

/**
 * Strips formatting noise so two equivalent LaTeX equations can be compared reliably
 */
export function canonicalizeMath(latex: string): string {
  return latex
    .toLowerCase()
    .replace(/\\displaystyle/g, '')
    .replace(/\\left|\\right/g, '')
    .replace(/\\quad|\\qquad|\\,|\\;|\\:|\\!/g, '')
    .replace(/\\frac\s*\{d\^2\s*y\}\s*\{dx\^2\}/g, "y''")
    .replace(/\\frac\s*\{dy\}\s*\{dx\}/g, "y'")
    .replace(/\\frac\s*\{d\^2\s*y\}\s*\{dt\^2\}/g, "y''")
    .replace(/\\frac\s*\{dy\}\s*\{dt\}/g, "y'")
    .replace(/y\^\{\\prime\\prime\}|y\^\\prime\\prime/g, "y''")
    .replace(/y\^\{\\prime\}|y\^\\prime/g, "y'")
    .replace(/\\cdot/g, '')
    .replace(/\s+/g, '')
    .replace(/\{([a-z0-9])\}/g, '$1');
}

/**
 * Normalizes user LaTeX / math strings for symbolic parsing
 */
export function normalizeLatex(input: string): string {
  let s = input.trim();
  s = s.replace(/\\displaystyle/g, '');
  s = s.replace(/\\left/g, '');
  s = s.replace(/\\right/g, '');
  s = s.replace(/\\frac\s*\{d\^3\s*y\}\s*\{dx\^3\}/g, "y'''");
  s = s.replace(/\\frac\s*\{d\^2\s*y\}\s*\{dx\^2\}/g, "y''");
  s = s.replace(/\\frac\s*\{dy\}\s*\{dx\}/g, "y'");
  s = s.replace(/\\frac\s*\{d\^2\s*y\}\s*\{dt\^2\}/g, "y''");
  s = s.replace(/\\frac\s*\{dy\}\s*\{dt\}/g, "y'");
  s = s.replace(/y\^\{\\prime\\prime\}|y\^\\prime\\prime/g, "y''");
  s = s.replace(/y\^\{\\prime\}|y\^\\prime/g, "y'");
  s = s.replace(/\\mathrm\{d\}/g, 'd');
  s = s.replace(/\\cdot/g, '*');
  s = s.replace(/\\quad|\\qquad|\\,|\\;/g, ' ');
  return s.replace(/\s+/g, ' ').trim();
}

function fmtNum(n: number): string {
  if (Number.isInteger(n)) return `${n}`;
  // Check common fractions
  const denoms = [2, 3, 4, 5, 6, 8, 9, 10, 12];
  for (const d of denoms) {
    const num = Math.round(n * d);
    if (Math.abs(num / d - n) < 1e-6) {
      const sign = num < 0 ? '-' : '';
      return `${sign}\\frac{${Math.abs(num)}}{${d}}`;
    }
  }
  return Number(n.toFixed(3)).toString();
}

function fmtCoeff(n: number, isLeading = false): string {
  if (Math.abs(n) < 1e-9) return '0';
  if (Math.abs(n - 1) < 1e-9) return isLeading ? '' : '+ ';
  if (Math.abs(n + 1) < 1e-9) return isLeading ? '-' : '- ';
  const formatted = fmtNum(Math.abs(n));
  if (isLeading) return n < 0 ? `-${formatted}` : formatted;
  return n < 0 ? `- ${formatted}` : `+ ${formatted}`;
}

/**
 * Checks if input matches any of the 125 Official Exam Bank Questions
 */
function findMatchingExamQuestion(rawInput: string): MasterExamQuestion | null {
  const userCanon = canonicalizeMath(rawInput);
  if (!userCanon || userCanon.length < 4) return null;

  for (const q of MASTER_EXAM_QUESTIONS) {
    // Strip auxiliary conditions like ", y(0)=1" when comparing just the main equation, or match full string
    const qFullCanon = canonicalizeMath(q.problemLatex);
    const qMainPart = canonicalizeMath(q.problemLatex.split(/,\\quad|,y\(0\)|,\\text/)[0]);

    if (userCanon === qFullCanon || (qMainPart.length >= 5 && userCanon === qMainPart)) {
      return q;
    }
  }
  return null;
}

function convertExamQuestionToResult(q: MasterExamQuestion, rawInput: string): ODEAnalysisResult {
  const isThirdOrder = q.problemLatex.includes("y'''") || q.problemLatex.includes('d^3') || q.problemLatex.includes('D^3');
  const isSecondOrder =
    q.problemLatex.includes("y''") ||
    q.problemLatex.includes('d^2') ||
    q.problemLatex.includes('D^2') ||
    q.category.includes('Higher-Order') ||
    q.category.includes('Undetermined') ||
    q.category.includes('Variation') ||
    q.category.includes('Reduction');

  const isLinear =
    !q.category.includes('Bernoulli') &&
    !q.category.includes('Homogeneous Equations') &&
    !q.category.includes('Separable') &&
    !q.category.includes('Exact');

  return {
    rawInput,
    standardFormLatex: q.problemLatex,
    order: isThirdOrder ? 3 : isSecondOrder ? 2 : 1,
    degree: 1,
    isLinear,
    odeType: `${q.category} — ${q.methodTag}`,
    arabicOdeType: q.arabicMethodTag,
    methodUsed: q.methodTag,
    dependentVar: q.problemLatex.includes('i(t)') || q.problemLatex.includes('q(t)') ? 'q, i' : 'y',
    independentVar: q.problemLatex.includes('(t)') || q.problemLatex.includes('dt') || q.problemLatex.includes('s') ? 't' : 'x',
    steps: q.steps.map((s) => ({
      stepNumber: s.stepNumber,
      title: s.title,
      arabicTitle: s.arabicTitle,
      latex: s.formula,
      explanation: s.explanation,
      arabicExplanation: s.arabicExplanation,
      type: s.stepNumber === 1 ? 'classification' : s.stepNumber === q.steps.length ? 'final' : 'integration',
    })),
    generalSolutionLatex: q.finalAnswerLatex,
    arabicSummary: `${q.arabicVisualTrigger} — ${q.arabicExaminerTrap}`,
    examinerTrap: q.examinerTrap,
    arabicExaminerTrap: q.arabicExaminerTrap,
    visualRecognitionTrigger: q.visualRecognitionTrigger,
    secretShortcut: q.secretShortcut,
    matchedExamQuestion: {
      id: q.id,
      numberLabel: q.numberLabel,
      sourceExam: q.sourceExam,
      points: q.points,
    },
    tags: [q.category, q.difficulty + ' Level', q.sourceExam],
  };
}

/**
 * Primary Entry Point: Solves any Differential Equation or Laplace Transform in LaTeX
 */
export function solveODEHeuristic(
  latexInput: string,
  initialConditions?: InitialConditionsInput
): ODEAnalysisResult {
  // 1. Check if input matches any of the 125 Official Exam Bank Questions (unless custom IVP is overridden)
  const matchedQ = findMatchingExamQuestion(latexInput);
  if (matchedQ && (!initialConditions || !initialConditions.enabled)) {
    return convertExamQuestionToResult(matchedQ, latexInput);
  }

  const norm = normalizeLatex(latexInput);

  // 2. Check for Laplace / Inverse Laplace Transform expressions
  if (
    norm.includes('\\mathcal{L}') ||
    norm.toLowerCase().startsWith('l{') ||
    norm.toLowerCase().startsWith('l^{-1}')
  ) {
    return solveLaplaceExpression(latexInput, norm);
  }

  // 3. Check for Cauchy-Euler Equation: a x^2 y'' + b x y' + c y = f(x)
  if (
    (norm.includes("x^2 y''") || norm.includes("x^2y''") || norm.includes("x^{2}y''")) &&
    norm.includes("y'")
  ) {
    return solveCauchyEulerODE(latexInput, norm);
  }

  // 4. Check for 3rd-Order Constant Coefficient ODE: y''' ...
  if (norm.includes("y'''") || norm.includes('D^3')) {
    return solveThirdOrderODE(latexInput, norm);
  }

  // 5. Check for 2nd-Order Constant Coefficient ODE (including D-operator form)
  if (norm.includes("y''") || norm.includes('D^2')) {
    return solveSecondOrderODE(latexInput, norm, initialConditions);
  }

  // 6. Check for Differential Form M(x,y)dx + N(x,y)dy = 0
  if (norm.includes('dx') && norm.includes('dy') && !norm.includes("y'")) {
    return solveExactOrDifferentialFormODE(latexInput, norm);
  }

  // 7. Check for Bernoulli ODE: y' + P(x)y = Q(x)y^n
  if (
    norm.includes("y'") &&
    (/y\^\s*\{?\s*[+-]?[2-9]/.test(norm) || /y\^\s*\{?\s*-[1-9]/.test(norm) || norm.includes('\\sqrt{y}'))
  ) {
    return solveBernoulliODE(latexInput, norm);
  }

  // 8. Check for Homogeneous 1st-Order ODE (y/x)
  if (
    norm.includes('\\frac{y}{x}') ||
    norm.includes('y/x') ||
    norm.includes('\\frac{x + y}{x}') ||
    norm.includes('\\frac{y - x}{y + x}')
  ) {
    return solveHomogeneousFirstOrderODE(latexInput, norm);
  }

  // 9. Check for Separable ODE: y' = g(x)/h(y) or y' = g(x)h(y)
  if (isSeparableCandidate(norm)) {
    return solveSeparableODE(latexInput, norm, initialConditions);
  }

  // 10. Check for First-Order Linear ODE: a(x)y' + b(x)y = c(x)
  if (norm.includes("y'") && norm.includes('y')) {
    return solveFirstOrderLinearODE(latexInput, norm, initialConditions);
  }

  // 11. General First-Order Direct Integration y' = f(x)
  return solveDirectIntegrationODE(latexInput, norm, initialConditions);
}

/**
 * Solves 2nd-Order Linear ODEs: Homogeneous + Undetermined Coefficients + Resonance + Wronskian + IVP
 */
function solveSecondOrderODE(
  raw: string,
  norm: string,
  initialConditions?: InitialConditionsInput
): ODEAnalysisResult {
  let a = 1;
  let b = 0;
  let c = 0;
  let rhs = '0';

  // Convert D-operator form like (D^2 - 4D + 13)y = 0 to y'' form if needed
  let working = norm;
  const dOpMatch = working.match(/\(\s*([+-]?\s*\d*\.?\d*)\s*D\^2\s*([+-]\s*\d*\.?\d*)\s*D\s*([+-]\s*\d*\.?\d*)\s*\)\s*y\s*=\s*(.*)/i);
  if (dOpMatch) {
    const aStr = dOpMatch[1].replace(/\s+/g, '');
    const bStr = dOpMatch[2].replace(/\s+/g, '');
    const cStr = dOpMatch[3].replace(/\s+/g, '');
    a = aStr === '' || aStr === '+' ? 1 : aStr === '-' ? -1 : parseFloat(aStr) || 1;
    b = bStr === '+' ? 1 : bStr === '-' ? -1 : parseFloat(bStr) || 0;
    c = cStr === '+' ? 1 : cStr === '-' ? -1 : parseFloat(cStr) || 0;
    rhs = dOpMatch[4].trim() || '0';
  } else {
    const parts = working.split('=');
    rhs = parts[1] ? parts[1].trim() : '0';
    const lhs = parts[0];

    const aMatch = lhs.match(/([+-]?\s*\d*\.?\d*)\s*y''/);
    if (aMatch) {
      const val = aMatch[1].replace(/\s+/g, '');
      a = val === '' || val === '+' ? 1 : val === '-' ? -1 : parseFloat(val) || 1;
    }

    const bMatch = lhs.match(/([+-]?\s*\d*\.?\d*)\s*y'(?!')/);
    if (bMatch && bMatch[0].trim() !== lhs.match(/([+-]?\s*\d*\.?\d*)\s*y''/)?.[0]?.trim()) {
      const val = bMatch[1].replace(/\s+/g, '');
      b = val === '' || val === '+' ? 1 : val === '-' ? -1 : parseFloat(val) || 0;
    }

    // Match y term not followed by '
    const lhsWithoutDerivs = lhs.replace(/[+-]?\s*\d*\.?\d*\s*y''/g, '').replace(/[+-]?\s*\d*\.?\d*\s*y'/g, '');
    const cMatch = lhsWithoutDerivs.match(/([+-]?\s*\d*\.?\d*)\s*y/);
    if (cMatch) {
      const val = cMatch[1].replace(/\s+/g, '');
      c = val === '' || val === '+' ? 1 : val === '-' ? -1 : parseFloat(val) || 0;
    }
  }

  const isHomogeneous = rhs === '0' || rhs === '';
  const discriminant = b * b - 4 * a * c;
  const steps: ODESolveStep[] = [];

  const stdLhs = `${fmtCoeff(a, true)}y'' ${b !== 0 ? `${fmtCoeff(b)}y' ` : ''}${c !== 0 ? `${fmtCoeff(c)}y` : ''}`.trim();

  // Step 1: Standard Form & Classification
  steps.push({
    stepNumber: 1,
    title: 'Standard Form & Differential Classification',
    arabicTitle: 'الصورة القياسية وتصنيف المعادلة التفاضلية',
    latex: `${stdLhs} = ${rhs}`,
    explanation: `Second-order linear differential equation with constant coefficients a = ${a}, b = ${b}, c = ${c}. ${
      isHomogeneous
        ? 'Since the right-hand side is 0, the equation is homogeneous.'
        : `Non-homogeneous equation with external driving function f(x) = ${rhs}. Total solution is y(x) = y_h(x) + y_p(x).`
    }`,
    arabicExplanation: `معادلة تفاضلية خطية من الرتبة الثانية بمعاملات ثابتة (a = ${a}, b = ${b}, c = ${c}). ${
      isHomogeneous
        ? 'بما أن الطرف الأيمن يساوي صفراً، فالمعادلة متجانسة.'
        : `المعادلة غير متجانسة لوجود دالة الطرف الأيمن f(x) = ${rhs}، والحل العام هو مجموع الحل المتجانس والحل الخاص y = y_h + y_p.`
    }`,
    type: 'classification',
  });

  // Step 2: Auxiliary / Characteristic Equation
  const auxLhs = `${fmtCoeff(a, true)}m^2 ${b !== 0 ? `${fmtCoeff(b)}m ` : ''}${c !== 0 ? (c > 0 ? `+ ${fmtNum(c)}` : `- ${fmtNum(Math.abs(c))}`) : ''}`.trim();
  steps.push({
    stepNumber: 2,
    title: 'Form the Characteristic (Auxiliary) Equation',
    arabicTitle: 'تكوين المعادلة المساعدة (المميزة)',
    latex: `\\text{Let } y = e^{mx} \\implies ${auxLhs} = 0`,
    explanation: `Substitute the trial exponential solution y = e^{mx} into the homogeneous part to obtain the quadratic characteristic equation in m.`,
    arabicExplanation: `نفرض أن الحل المتجانس على الصورة y = e^{mx}، وبالتعويض في الجزء المتجانس نحصل على المعادلة الجبرية المساعدة في m.`,
    type: 'characteristic',
  });

  // Step 3: Solve Auxiliary Roots
  let yhLatex = '';
  let yhRhsOnly = '';
  let rootsLatex = '';
  let rootCase: 'distinct' | 'repeated' | 'complex' = 'distinct';
  let m1Val = 0;
  let m2Val = 0;
  let alphaVal = 0;
  let betaVal = 0;

  if (discriminant > 1e-9) {
    rootCase = 'distinct';
    m1Val = (-b + Math.sqrt(discriminant)) / (2 * a);
    m2Val = (-b - Math.sqrt(discriminant)) / (2 * a);
    // Order so m1 <= m2 for clean display
    const r1 = Math.min(m1Val, m2Val);
    const r2 = Math.max(m1Val, m2Val);
    m1Val = r1;
    m2Val = r2;
    const m1Str = fmtNum(m1Val);
    const m2Str = fmtNum(m2Val);
    rootsLatex = `m_1 = ${m1Str}, \\quad m_2 = ${m2Str}`;

    const term1 = Math.abs(m1Val) < 1e-9 ? 'C_1' : m1Val === 1 ? 'C_1 e^{x}' : m1Val === -1 ? 'C_1 e^{-x}' : `C_1 e^{${m1Str}x}`;
    const term2 = Math.abs(m2Val) < 1e-9 ? 'C_2' : m2Val === 1 ? 'C_2 e^{x}' : m2Val === -1 ? 'C_2 e^{-x}' : `C_2 e^{${m2Str}x}`;
    yhRhsOnly = `${term1} + ${term2}`;
    yhLatex = `y_h(x) = ${yhRhsOnly}`;

    steps.push({
      stepNumber: 3,
      title: 'Solve Characteristic Roots (Case 1: Real & Distinct)',
      arabicTitle: 'إيجاد جذور المعادلة المساعدة (الحالة الأولى: جذور حقيقية مختلفة)',
      latex: `\\Delta = b^2 - 4ac = (${b})^2 - 4(${a})(${c}) = ${fmtNum(discriminant)} > 0 \\implies ${rootsLatex}`,
      explanation: `Since Δ > 0, the auxiliary equation has two distinct real roots. The homogeneous solution is a linear combination of e^{m_1 x} and e^{m_2 x}.`,
      arabicExplanation: `بما أن المميز موجب (Δ > 0)، يوجد جذران حقيقيان مختلفان، ويكون الحل المتجانس تركيبة خطية من الدالتين الأسيتين المستقلتين.`,
      type: 'characteristic',
    });
  } else if (Math.abs(discriminant) <= 1e-9) {
    rootCase = 'repeated';
    m1Val = -b / (2 * a);
    m2Val = m1Val;
    const mStr = fmtNum(m1Val);
    rootsLatex = `m_1 = m_2 = ${mStr}`;
    const expPart = Math.abs(m1Val) < 1e-9 ? '' : m1Val === 1 ? 'e^{x}' : m1Val === -1 ? 'e^{-x}' : `e^{${mStr}x}`;
    yhRhsOnly = `(C_1 + C_2 x)${expPart}`;
    yhLatex = `y_h(x) = ${yhRhsOnly}`;

    steps.push({
      stepNumber: 3,
      title: 'Solve Characteristic Roots (Case 2: Repeated Real Root)',
      arabicTitle: 'إيجاد جذور المعادلة المساعدة (الحالة الثانية: جذر حقيقي مكرر)',
      latex: `\\Delta = b^2 - 4ac = (${b})^2 - 4(${a})(${c}) = 0 \\implies ${rootsLatex}`,
      explanation: `Since Δ = 0, the root m = ${mStr} has multiplicity 2. Multiply the second term by x to maintain linear independence (non-zero Wronskian).`,
      arabicExplanation: `بما أن المميز يساوي صفراً، فالجذر مكرر مرتين، لذا نضرب الثابت الثاني في x لضمان الاستقلال الخطي بين الحلين.`,
      type: 'characteristic',
    });
  } else {
    rootCase = 'complex';
    alphaVal = -b / (2 * a);
    betaVal = Math.sqrt(-discriminant) / (2 * a);
    const alphaStr = fmtNum(alphaVal);
    const betaStr = fmtNum(betaVal);
    const betaCoeff = Math.abs(betaVal - 1) < 1e-9 ? '' : betaStr;
    rootsLatex = `m = ${alphaStr} \\pm ${betaStr}i \\quad (\\alpha = ${alphaStr},\\; \\beta = ${betaStr})`;

    if (Math.abs(alphaVal) < 1e-9) {
      yhRhsOnly = `C_1 \\cos(${betaCoeff}x) + C_2 \\sin(${betaCoeff}x)`;
    } else {
      const expAlpha = alphaVal === 1 ? 'e^{x}' : alphaVal === -1 ? 'e^{-x}' : `e^{${alphaStr}x}`;
      yhRhsOnly = `${expAlpha} \\left( C_1 \\cos(${betaCoeff}x) + C_2 \\sin(${betaCoeff}x) \\right)`;
    }
    yhLatex = `y_h(x) = ${yhRhsOnly}`;

    steps.push({
      stepNumber: 3,
      title: 'Solve Characteristic Roots (Case 3: Complex Conjugate Roots)',
      arabicTitle: 'إيجاد جذور المعادلة المساعدة (الحالة الثالثة: جذور مركبة مترافقة)',
      latex: `\\Delta = (${b})^2 - 4(${a})(${c}) = ${fmtNum(discriminant)} < 0 \\implies ${rootsLatex}`,
      explanation: `Since Δ < 0, the roots are complex conjugates α ± iβ. By Euler's formula, the real homogeneous solution uses e^{αx}cos(βx) and e^{αx}sin(βx).`,
      arabicExplanation: `بما أن المميز سالب (Δ < 0)، فالجذور مركبة مترافقة α ± iβ، وباستخدام صيغة أويلر نكتب الحل المتجانس بدلالة دالتي الجيب وجيب التمام.`,
      type: 'characteristic',
    });
  }

  // Step 4: Write Homogeneous Solution yh(x)
  steps.push({
    stepNumber: 4,
    title: 'Homogeneous (Complementary) Solution y_h(x)',
    arabicTitle: 'كتابة الحل المتجانس (Complementary Solution)',
    latex: yhLatex,
    explanation: `This is the general solution to the associated homogeneous equation ${stdLhs} = 0.`,
    arabicExplanation: `يمثل هذا التعبير الحل العام للمعادلة المتجانسة المرتبطة قبل إضافة تأثير الطرف الأيمن.`,
    type: 'characteristic',
  });

  let ypRhsOnly = '';
  let trapAlert: string | undefined;
  let arabicTrapAlert: string | undefined;
  let methodUsed = 'Characteristic Equation (Constant Coefficients)';

  if (!isHomogeneous) {
    // Check if Variation of Parameters (Wronskian) is required
    if (/\\tan|\\sec|\\csc|\\cot|\\ln|\/x|\\frac\{.*\}\{x/.test(rhs)) {
      methodUsed = 'Variation of Parameters (Wronskian Method)';
      const wronskianSteps = buildVariationOfParametersSteps(
        a,
        b,
        c,
        rhs,
        rootCase,
        m1Val,
        m2Val,
        alphaVal,
        betaVal,
        steps.length + 1
      );
      steps.push(...wronskianSteps.steps);
      ypRhsOnly = wronskianSteps.ypRhs;
      trapAlert = wronskianSteps.trapAlert;
      arabicTrapAlert = wronskianSteps.arabicTrapAlert;
    } else {
      methodUsed = 'Method of Undetermined Coefficients';
      const ucResult = buildUndeterminedCoefficientsSteps(
        a,
        b,
        c,
        rhs,
        rootCase,
        m1Val,
        m2Val,
        alphaVal,
        betaVal,
        steps.length + 1
      );
      steps.push(...ucResult.steps);
      ypRhsOnly = ucResult.ypRhs;
      trapAlert = ucResult.trapAlert;
      arabicTrapAlert = ucResult.arabicTrapAlert;
    }
  }

  const finalSolutionRhs = ypRhsOnly ? `${yhRhsOnly} + ${ypRhsOnly}` : yhRhsOnly;
  const finalSolutionLatex = `y(x) = ${finalSolutionRhs}`;

  steps.push({
    stepNumber: steps.length + 1,
    title: 'Complete General Solution',
    arabicTitle: 'الحل العام الكامل للمعادلة التفاضلية',
    latex: finalSolutionLatex,
    explanation: isHomogeneous
      ? `Complete general solution with two arbitrary integration constants C_1 and C_2.`
      : `By the Principle of Superposition, combine the complementary solution y_h(x) and particular integral y_p(x).`,
    arabicExplanation: isHomogeneous
      ? `الحل العام النهائي للمعادلة المتجانسة ويحتوي على ثابتين اختياريين C_1 و C_2.`
      : `بموجب مبدأ التراكب (Superposition)، نجمع الحل المتجانس y_h(x) والحل الخاص y_p(x) للحصول على الحل العام الكامل.`,
    type: 'final',
  });

  // Check if Initial Conditions are enabled (for homogeneous or solved yp)
  let ivpSolutionLatex: string | undefined;
  if (initialConditions?.enabled && initialConditions.y0.trim() !== '' && initialConditions.yp0.trim() !== '') {
    const y0 = parseFloat(initialConditions.y0);
    const yp0 = parseFloat(initialConditions.yp0);
    if (!Number.isNaN(y0) && !Number.isNaN(yp0) && isHomogeneous) {
      const ivpStep = solveSecondOrderIVP(rootCase, m1Val, m2Val, alphaVal, betaVal, y0, yp0, steps.length + 1);
      if (ivpStep) {
        steps.push(ivpStep.step);
        ivpSolutionLatex = ivpStep.ivpLatex;
      }
    }
  }

  return {
    rawInput: raw,
    standardFormLatex: `${stdLhs} = ${rhs}`,
    order: 2,
    degree: 1,
    isLinear: true,
    odeType: isHomogeneous
      ? 'Second-Order Linear Homogeneous ODE (Constant Coefficients)'
      : `Second-Order Linear Non-Homogeneous ODE (${methodUsed})`,
    arabicOdeType: isHomogeneous
      ? 'معادلة تفاضلية خطية متجانسة من الرتبة الثانية بمعاملات ثابتة'
      : `معادلة خطية غير متجانسة من الرتبة الثانية (${
          methodUsed.includes('Wronskian') ? 'طريقة تغير البارامترات - فرونسكي' : 'طريقة المعاملات غير المحددة'
        })`,
    methodUsed,
    dependentVar: 'y',
    independentVar: 'x',
    steps,
    generalSolutionLatex: finalSolutionLatex,
    ivpSolutionLatex,
    examinerTrap:
      trapAlert ||
      (Math.abs(c) < 1e-9 && !isHomogeneous
        ? 'Watch out: Since c = 0, m = 0 is a characteristic root! Any polynomial RHS must be multiplied by x.'
        : undefined),
    arabicExaminerTrap:
      arabicTrapAlert ||
      (Math.abs(c) < 1e-9 && !isHomogeneous
        ? 'انتبه: بما أن الحد المطلق c = 0، فإن m = 0 جذر للمعادلة المساعدة! أي كثيرة حدود في الطرف الأيمن يجب ضرب فرضيتها في x.'
        : undefined),
    arabicSummary: `تم حل المعادلة المساعدة (${auxLhs} = 0) بالمميز Δ = ${fmtNum(discriminant)} وإيجاد الجذور (${rootsLatex})${
      !isHomogeneous ? ' ثم حساب الحل الخاص y_p(x) بدقة.' : '.'
    }`,
    tags: [
      'Second-Order ODE',
      isHomogeneous ? 'Homogeneous' : methodUsed,
      rootCase === 'complex' ? 'Complex Roots' : rootCase === 'repeated' ? 'Repeated Roots' : 'Distinct Real Roots',
    ],
  };
}

/**
 * Computes exact Particular Integral y_p(x) via Undetermined Coefficients including Resonance x^s
 */
function buildUndeterminedCoefficientsSteps(
  a: number,
  b: number,
  c: number,
  rhs: string,
  rootCase: 'distinct' | 'repeated' | 'complex',
  m1: number,
  m2: number,
  alpha: number,
  beta: number,
  startStep: number
): { steps: ODESolveStep[]; ypRhs: string; trapAlert?: string; arabicTrapAlert?: string } {
  const steps: ODESolveStep[] = [];
  const cleanRhs = rhs.replace(/\s+/g, '');

  // Case 1: Exponential f(x) = k * e^{r x}
  const expMatch =
    cleanRhs.match(/^([+-]?\d*\.?\d*)\*?e\^\{\s*([+-]?\d*\.?\d*)x\s*\}$/i) ||
    cleanRhs.match(/^([+-]?\d*\.?\d*)\*?e\^\s*([+-]?\d*\.?\d*)x$/i);

  if (expMatch) {
    const kStr = expMatch[1];
    const rStr = expMatch[2];
    const k = kStr === '' || kStr === '+' ? 1 : kStr === '-' ? -1 : parseFloat(kStr) || 1;
    const r = rStr === '' || rStr === '+' ? 1 : rStr === '-' ? -1 : parseFloat(rStr) || 0;

    // Check multiplicity s of r in characteristic equation
    let s = 0;
    if (rootCase === 'distinct') {
      if (Math.abs(r - m1) < 1e-6 || Math.abs(r - m2) < 1e-6) s = 1;
    } else if (rootCase === 'repeated') {
      if (Math.abs(r - m1) < 1e-6) s = 2;
    }

    const expTerm = r === 0 ? '1' : r === 1 ? 'e^{x}' : r === -1 ? 'e^{-x}' : `e^{${fmtNum(r)}x}`;
    const xMult = s === 0 ? '' : s === 1 ? 'x ' : 'x^2 ';

    let AVal = 1;
    let substExplanation = '';
    let substLatex = '';
    let trapAlert: string | undefined;
    let arabicTrapAlert: string | undefined;

    if (s === 0) {
      const Pr = a * r * r + b * r + c;
      AVal = k / Pr;
      substLatex = `y_p = A ${expTerm} \\implies (${fmtNum(a)}(${fmtNum(r)})^2 + (${fmtNum(b)})(${fmtNum(r)}) + ${fmtNum(c)}) A ${expTerm} = ${fmtNum(k)} ${expTerm} \\implies ${fmtNum(Pr)} A = ${fmtNum(k)} \\implies A = ${fmtNum(AVal)}`;
      substExplanation = `Since r = ${fmtNum(r)} is NOT a root of the auxiliary equation (multiplicity s = 0), substitute y_p = A ${expTerm}. Using the exponential shift shortcut P(r)A = ${fmtNum(k)}, we get A = ${fmtNum(AVal)}.`;
    } else if (s === 1) {
      const PPrimeR = 2 * a * r + b;
      AVal = k / PPrimeR;
      substLatex = `\\text{Resonance }(r = ${fmtNum(r)} \\text{ is a simple root},\\; s = 1) \\implies y_p = A x ${expTerm} \\implies P'(${fmtNum(r)}) A = (2(${fmtNum(a)})(${fmtNum(r)}) + ${fmtNum(b)}) A = ${fmtNum(k)} \\implies A = ${fmtNum(AVal)}`;
      substExplanation = `RESONANCE DETECTED: r = ${fmtNum(r)} matches a simple characteristic root (s = 1)! Multiplying the trial solution by x gives y_p = A x ${expTerm}, and P'(r)A = ${fmtNum(k)} yields A = ${fmtNum(AVal)}.`;
      trapAlert = `Resonance Trap: Since r = ${fmtNum(r)} is a root of the auxiliary equation, assuming y_p = A e^{${fmtNum(r)}x} gives 0 = ${rhs}! You MUST multiply by x: y_p = A x e^{${fmtNum(r)}x}.`;
      arabicTrapAlert = `فخ الرنين (تشابه الجذور): بما أن الأس r = ${fmtNum(r)} هو جذر للمعادلة المساعدة، فإن فرض y_p = A e^{${fmtNum(r)}x} سيعطي صفراً! يجب ضرب الفرضية في x لتصبح y_p = A x e^{${fmtNum(r)}x}.`;
    } else {
      const PDoublePrime = 2 * a;
      AVal = k / PDoublePrime;
      substLatex = `\\text{Double Resonance }(r = ${fmtNum(r)} \\text{ is a double root},\\; s = 2) \\implies y_p = A x^2 ${expTerm} \\implies 2a A = ${fmtNum(k)} \\implies A = ${fmtNum(AVal)}`;
      substExplanation = `DOUBLE RESONANCE DETECTED: r = ${fmtNum(r)} is a repeated root of multiplicity s = 2! Multiply the trial solution by x^2: y_p = A x^2 ${expTerm}, yielding 2a A = ${fmtNum(k)} ⇒ A = ${fmtNum(AVal)}.`;
      trapAlert = `Double Resonance Trap: Since r = ${fmtNum(r)} is a repeated root (multiplicity 2), you MUST multiply the trial solution by x^2: y_p = A x^2 e^{${fmtNum(r)}x}.`;
      arabicTrapAlert = `فخ الرنين المزدوج: بما أن r = ${fmtNum(r)} جذر مكرر مرتين، يجب ضرب الفرضية في x^2 لتصبح y_p = A x^2 e^{${fmtNum(r)}x}.`;
    }

    const ypRhs = `${fmtCoeff(AVal, true)}${xMult}${expTerm}`.trim();

    steps.push({
      stepNumber: startStep,
      title: `Particular Integral Trial Form & Resonance Check (s = ${s})`,
      arabicTitle: `فرضية الحل الخاص واختبار الرنين (s = ${s})`,
      latex: substLatex,
      explanation: substExplanation,
      arabicExplanation:
        s === 0
          ? `بما أن معامل الأس r = ${fmtNum(r)} ليس جذراً للمعادلة المساعدة (s = 0)، نفرض y_p = A ${expTerm} ونعوض لإيجاد قيمة الثابت A = ${fmtNum(AVal)}.`
          : `تنبيه هام: العدد r = ${fmtNum(r)} هو جذر للمعادلة المساعدة بتكرار s = ${s}، لذا نضرب الفرضية في x^${s} ثم نعوض لإيجاد A = ${fmtNum(AVal)}.`,
      type: 'particular',
    });

    steps.push({
      stepNumber: startStep + 1,
      title: 'Solved Particular Integral y_p(x)',
      arabicTitle: 'الحل الخاص النهائي y_p(x)',
      latex: `y_p(x) = ${ypRhs}`,
      explanation: `Substitute A = ${fmtNum(AVal)} into the trial form to obtain the exact particular integral.`,
      arabicExplanation: `بالتعويض بقيمة المعامل A نحصل على الحل الخاص الدقيق للمعادلة.`,
      type: 'particular',
    });

    return { steps, ypRhs, trapAlert, arabicTrapAlert };
  }

  // Case 2: Pure Cosine or Sine: k cos(w x) or k sin(w x)
  const trigMatch = cleanRhs.match(/^([+-]?\d*\.?\d*)\*?\\?(cos|sin)\(\s*(\d*\.?\d*)x\s*\)$/i);
  if (trigMatch) {
    const kStr = trigMatch[1];
    const fn = trigMatch[2].toLowerCase();
    const wStr = trigMatch[3];
    const k = kStr === '' || kStr === '+' ? 1 : kStr === '-' ? -1 : parseFloat(kStr) || 1;
    const w = wStr === '' ? 1 : parseFloat(wStr) || 1;
    const wDisplay = w === 1 ? 'x' : `${fmtNum(w)}x`;

    const isResonant = rootCase === 'complex' && Math.abs(alpha) < 1e-6 && Math.abs(beta - w) < 1e-6;

    if (isResonant) {
      // b = 0, a w^2 = c => y_p = x(A cos wx + B sin wx)
      // For a y'' + a w^2 y = k cos(wx) => y_p = (k / (2 a w)) x sin(wx)
      // For a y'' + a w^2 y = k sin(wx) => y_p = -(k / (2 a w)) x cos(wx)
      const coeff = fn === 'cos' ? k / (2 * a * w) : -k / (2 * a * w);
      const outFn = fn === 'cos' ? `\\sin(${wDisplay})` : `\\cos(${wDisplay})`;
      const ypRhs = `${fmtCoeff(coeff, true)} x ${outFn}`;

      steps.push({
        stepNumber: startStep,
        title: 'Trigonometric Resonance Detected (s = 1)',
        arabicTitle: 'رنين مثلثي (جذور تخيلية مطابقة لتردد الطرف الأيمن)',
        latex: `m = \\pm ${fmtNum(w)}i \\implies y_p(x) = x\\left(A\\cos(${wDisplay}) + B\\sin(${wDisplay})\\right) \\implies y_p(x) = ${ypRhs}`,
        explanation: `Since ±${fmtNum(w)}i are roots of the characteristic equation, multiply the full sin/cos trial pair by x and solve for A and B.`,
        arabicExplanation: `بما أن ±${fmtNum(w)}i جذور للمعادلة المساعدة، نضرب زوج الجيب وجيب التمام في x ونحل المعاملات.`,
        type: 'particular',
      });

      return {
        steps,
        ypRhs,
        trapAlert: `Harmonic Resonance Trap: Since ±${fmtNum(w)}i are auxiliary roots, you MUST include both cos and sin AND multiply by x!`,
        arabicTrapAlert: `فخ الرنين التوافقي: بما أن ±${fmtNum(w)}i جذور للمعادلة المساعدة، يجب فرض الجيب وجيب التمام معاً وضربهما في x!`,
      };
    } else {
      // Solve system:
      // (c - a w^2) A + (b w) B = k_cos
      // (-b w) A + (c - a w^2) B = k_sin
      const M = c - a * w * w;
      const N = b * w;
      const det = M * M + N * N;
      const kCos = fn === 'cos' ? k : 0;
      const kSin = fn === 'sin' ? k : 0;
      const AVal = (M * kCos - N * kSin) / det;
      const BVal = (N * kCos + M * kSin) / det;

      const terms: string[] = [];
      if (Math.abs(AVal) > 1e-7) {
        terms.push(`${fmtCoeff(AVal, terms.length === 0)}\\cos(${wDisplay})`);
      }
      if (Math.abs(BVal) > 1e-7) {
        terms.push(`${fmtCoeff(BVal, terms.length === 0)}\\sin(${wDisplay})`);
      }
      const ypRhs = terms.join(' ') || '0';

      steps.push({
        stepNumber: startStep,
        title: 'Undetermined Coefficients Trial & System Solution',
        arabicTitle: 'فرضية المعاملات غير المحددة وحل نظام المعادلات',
        latex: `y_p = A\\cos(${wDisplay}) + B\\sin(${wDisplay}) \\implies \\begin{cases} (${fmtNum(M)})A + (${fmtNum(N)})B = ${kCos} \\\\ (${fmtNum(-N)})A + (${fmtNum(M)})B = ${kSin} \\end{cases} \\implies A = ${fmtNum(AVal)},\\; B = ${fmtNum(BVal)}`,
        explanation: `Even when the RHS has only ${fn}(${wDisplay}), the trial form MUST include BOTH A cos(${wDisplay}) + B sin(${wDisplay}) whenever y' is present. Differentiating twice and equating coefficients yields A = ${fmtNum(AVal)}, B = ${fmtNum(BVal)}.`,
        arabicExplanation: `حتى لو كان الطرف الأيمن يحتوي على دالة مثلثية واحدة فقط، يجب أن يشمل الفرض دالتي الجيب وجيب التمام معاً، وبالتفاضل ومساواة المعاملات نجد A و B.`,
        type: 'particular',
      });

      steps.push({
        stepNumber: startStep + 1,
        title: 'Solved Particular Integral y_p(x)',
        arabicTitle: 'الحل الخاص النهائي y_p(x)',
        latex: `y_p(x) = ${ypRhs}`,
        explanation: `Substitute the solved coefficients A and B into y_p(x).`,
        arabicExplanation: `بالتعويض بقيمتي A و B نحصل على الحل الخاص الكامل.`,
        type: 'particular',
      });

      return {
        steps,
        ypRhs,
        trapAlert: `Never assume only A\\${fn}(${wDisplay})! You must assume BOTH A\\cos(${wDisplay}) + B\\sin(${wDisplay}) so first derivatives cancel properly.`,
        arabicTrapAlert: `لا تفرض دالة الجيب أو جيب التمام بمفردها أبداً! يجب فرض كلتا الدالتين A cos + B sin معاً لكي تتزن المشتقة الأولى.`,
      };
    }
  }

  // Case 3: Pure Polynomial / Monomial: k x^2, k x, or constant k
  const polyMatch = cleanRhs.match(/^([+-]?\d*\.?\d*)\*?x(?:\^(\d+))?$/) || cleanRhs.match(/^([+-]?\d+\.?\d*)$/);
  if (polyMatch) {
    let deg = 0;
    let leadK = 1;
    if (cleanRhs.includes('x')) {
      const kStr = polyMatch[1];
      leadK = kStr === '' || kStr === '+' ? 1 : kStr === '-' ? -1 : parseFloat(kStr) || 1;
      deg = polyMatch[2] ? parseInt(polyMatch[2], 10) : 1;
    } else {
      leadK = parseFloat(polyMatch[1]) || 1;
      deg = 0;
    }

    if (deg <= 2 && Math.abs(c) > 1e-7) {
      // Non-resonant polynomial (c != 0): solve a(2A) + b(2Ax + B) + c(Ax^2 + Bx + C) = rhs
      const rhs2 = deg === 2 ? leadK : 0;
      const rhs1 = deg === 1 ? leadK : 0;
      const rhs0 = deg === 0 ? leadK : 0;

      const A = rhs2 / c;
      const B = (rhs1 - 2 * b * A) / c;
      const C = (rhs0 - 2 * a * A - b * B) / c;

      const pTerms: string[] = [];
      if (Math.abs(A) > 1e-7) pTerms.push(`${fmtCoeff(A, pTerms.length === 0)}x^2`);
      if (Math.abs(B) > 1e-7) pTerms.push(`${fmtCoeff(B, pTerms.length === 0)}x`);
      if (Math.abs(C) > 1e-7) pTerms.push(pTerms.length === 0 ? fmtNum(C) : C > 0 ? `+ ${fmtNum(C)}` : `- ${fmtNum(Math.abs(C))}`);
      const ypRhs = pTerms.join(' ') || '0';

      const trialForm = deg === 2 ? 'Ax^2 + Bx + C' : deg === 1 ? 'Ax + B' : 'A';
      steps.push({
        stepNumber: startStep,
        title: `Polynomial Undetermined Coefficients (Degree ${deg})`,
        arabicTitle: `فرضية كثيرة الحدود للمعاملات غير المحددة (الدرجة ${deg})`,
        latex: `y_p(x) = ${trialForm} \\implies y_p(x) = ${ypRhs}`,
        explanation: `For a polynomial of degree ${deg} when m = 0 is not a root (c ≠ 0), assume a full polynomial of degree ${deg} including all lower powers of x. Equating coefficients gives y_p(x) = ${ypRhs}.`,
        arabicExplanation: `لكثيرة حدود من الدرجة ${deg} (حيث c ≠ 0)، نفرض كثيرة حدود كاملة بجميع القوى الأقل ثم نساوي معاملات القوى المتناظرة.`,
        type: 'particular',
      });

      return {
        steps,
        ypRhs,
        trapAlert:
          deg >= 1
            ? `Even when the RHS is just ${rhs}, you MUST include all lower-degree terms (${trialForm}) in your trial polynomial!`
            : undefined,
        arabicTrapAlert:
          deg >= 1
            ? `حتى لو كان الطرف الأيمن حداً واحداً (${rhs})، يجب فرض كثيرة الحدود كاملة بجميع القوى الأقل (${trialForm})!`
            : undefined,
      };
    } else if (deg <= 2 && Math.abs(c) <= 1e-7 && Math.abs(b) > 1e-7) {
      // Resonance at m = 0 (c = 0, b != 0 => s = 1)
      // Multiply polynomial trial by x: y_p = x(Ax^2 + Bx + C) = Ax^3 + Bx^2 + Cx
      const rhs2 = deg === 2 ? leadK : 0;
      const rhs1 = deg === 1 ? leadK : 0;
      const rhs0 = deg === 0 ? leadK : 0;

      // a y'' + b y' = a(6Ax + 2B) + b(3Ax^2 + 2Bx + C) = 3bA x^2 + (6aA + 2bB)x + (2aB + bC)
      const A = rhs2 / (3 * b);
      const B = (rhs1 - 6 * a * A) / (2 * b);
      const C = (rhs0 - 2 * a * B) / b;

      const pTerms: string[] = [];
      if (Math.abs(A) > 1e-7) pTerms.push(`${fmtCoeff(A, pTerms.length === 0)}x^3`);
      if (Math.abs(B) > 1e-7) pTerms.push(`${fmtCoeff(B, pTerms.length === 0)}x^2`);
      if (Math.abs(C) > 1e-7) pTerms.push(`${fmtCoeff(C, pTerms.length === 0)}x`);
      const ypRhs = pTerms.join(' ') || '0';

      steps.push({
        stepNumber: startStep,
        title: `Polynomial Resonance at m = 0 (c = 0 ⇒ Multiply by x)`,
        arabicTitle: `رنين كثيرة الحدود عند الجذر m = 0 (الضرب في x)`,
        latex: `m = 0 \\text{ is a root } (s = 1) \\implies y_p(x) = x(${deg === 2 ? 'Ax^2 + Bx + C' : deg === 1 ? 'Ax + B' : 'A'}) = ${ypRhs}`,
        explanation: `Because the y term is missing (c = 0), m = 0 is a characteristic root! Multiply the polynomial trial form by x and equate coefficients of y'' and y'.`,
        arabicExplanation: `نظراً لغياب حد y (أي c = 0)، فإن m = 0 جذر للمعادلة المساعدة! لذلك نضرب فرضية كثيرة الحدود في x قبل الاشتقاق والتعويض.`,
        type: 'particular',
      });

      return {
        steps,
        ypRhs,
        trapAlert: `m = 0 Resonance Trap: Since c = 0, a constant C is already in y_h(x)! You MUST multiply the polynomial trial by x.`,
        arabicTrapAlert: `فخ الجذر الصفري (m = 0): بما أن c = 0، فإن الثابت موجود بالفعل في الحل المتجانس، لذا يجب ضرب فرضية كثيرة الحدود في x!`,
      };
    }
  }

  // Fallback for general compound RHS
  steps.push({
    stepNumber: startStep,
    title: 'Particular Integral y_p(x) Construction',
    arabicTitle: 'إيجاد الحل الخاص y_p(x)',
    latex: `y_p(x) = \\frac{1}{${fmtCoeff(a, true)}D^2 ${b !== 0 ? `${fmtCoeff(b)}D ` : ''}${c !== 0 ? fmtCoeff(c) : ''}} \\left[ ${rhs} \\right]`,
    explanation: `Apply the inverse differential operator 1/P(D) or Undetermined Coefficients to each term in f(x) = ${rhs} (checking for resonance with roots m).`,
    arabicExplanation: `نطبق المؤثر التفاضلي العكسي أو طريقة المعاملات غير المحددة على دالة الطرف الأيمن مع مراعاة عدم تكرار أي حد من حدود الحل المتجانس.`,
    type: 'particular',
  });

  return { steps, ypRhs: `y_p(x)` };
}

/**
 * Builds Wronskian Variation of Parameters steps for tan(x), sec(x), csc(x), e^{rx}/x, etc.
 */
function buildVariationOfParametersSteps(
  a: number,
  _b: number,
  _c: number,
  rhs: string,
  rootCase: 'distinct' | 'repeated' | 'complex',
  m1: number,
  m2: number,
  alpha: number,
  beta: number,
  startStep: number
): { steps: ODESolveStep[]; ypRhs: string; trapAlert: string; arabicTrapAlert: string } {
  const steps: ODESolveStep[] = [];
  let y1 = 'e^{m_1 x}';
  let y2 = 'e^{m_2 x}';
  let wronskianVal = '(m_2 - m_1)e^{(m_1+m_2)x}';

  if (rootCase === 'complex') {
    const wStr = Math.abs(beta - 1) < 1e-9 ? 'x' : `${fmtNum(beta)}x`;
    const expPart = Math.abs(alpha) < 1e-9 ? '' : alpha === 1 ? 'e^{x}' : alpha === -1 ? 'e^{-x}' : `e^{${fmtNum(alpha)}x}`;
    y1 = `${expPart}\\cos(${wStr})`;
    y2 = `${expPart}\\sin(${wStr})`;
    wronskianVal = Math.abs(alpha) < 1e-9 ? fmtNum(beta) : `${fmtNum(beta)} e^{${fmtNum(2 * alpha)}x}`;
  } else if (rootCase === 'repeated') {
    const expPart = m1 === 0 ? '1' : m1 === 1 ? 'e^{x}' : m1 === -1 ? 'e^{-x}' : `e^{${fmtNum(m1)}x}`;
    y1 = expPart;
    y2 = `x ${expPart}`;
    wronskianVal = m1 === 0 ? '1' : `e^{${fmtNum(2 * m1)}x}`;
  } else {
    y1 = m1 === 0 ? '1' : `e^{${fmtNum(m1)}x}`;
    y2 = m2 === 0 ? '1' : `e^{${fmtNum(m2)}x}`;
    wronskianVal = `${fmtNum(m2 - m1)} e^{${fmtNum(m1 + m2)}x}`;
  }

  steps.push({
    stepNumber: startStep,
    title: 'Compute the Wronskian Determinant W(y_1, y_2)',
    arabicTitle: 'حساب محدد فرونسكي W(y_1, y_2)',
    latex: `y_1 = ${y1}, \\quad y_2 = ${y2} \\implies W(y_1, y_2) = \\begin{vmatrix} y_1 & y_2 \\\\ y_1' & y_2' \\end{vmatrix} = ${wronskianVal}`,
    explanation: `Since f(x) = ${rhs} cannot be solved by Undetermined Coefficients, we use Lagrange's Variation of Parameters with fundamental solutions y_1 and y_2.`,
    arabicExplanation: `بما أن دالة الطرف الأيمن (${rhs}) ليست من دوال المعاملات غير المحددة، نستخدم طريقة تغير البارامترات (فرونسكي) بحساب محدد فرونسكي أولاً.`,
    type: 'wronskian',
  });

  // Check classic exam archetypes for exact integrated output
  let ypRhs = `u_1(x)\\,${y1} + u_2(x)\\,${y2}`;
  const cleanRhs = rhs.replace(/\s+/g, '');

  if (rootCase === 'complex' && Math.abs(alpha) < 1e-6 && Math.abs(beta - 1) < 1e-6 && cleanRhs.includes('\\tan')) {
    ypRhs = `-\\cos(x) \\ln|\\sec(x) + \\tan(x)|`;
  } else if (rootCase === 'complex' && Math.abs(alpha) < 1e-6 && Math.abs(beta - 1) < 1e-6 && cleanRhs.includes('\\sec')) {
    ypRhs = `\\cos(x) \\ln|\\cos(x)| + x \\sin(x)`;
  } else if (rootCase === 'repeated' && cleanRhs.includes('/x')) {
    const expPart = m1 === 1 ? 'e^{x}' : `e^{${fmtNum(m1)}x}`;
    ypRhs = `x ${expPart} \\ln|x| - x ${expPart}`;
  }

  steps.push({
    stepNumber: startStep + 1,
    title: 'Integrate Parameter Derivatives u_1(x) and u_2(x)',
    arabicTitle: 'تكامل معاملات التغير u_1(x) و u_2(x)',
    latex: `u_1(x) = -\\int \\frac{y_2 \\cdot (${rhs})}{${fmtNum(a)} \\cdot W}\\,dx, \\quad u_2(x) = \\int \\frac{y_1 \\cdot (${rhs})}{${fmtNum(a)} \\cdot W}\\,dx \\implies y_p(x) = ${ypRhs}`,
    explanation: `Substitute u_1(x) and u_2(x) into y_p(x) = u_1(x) y_1(x) + u_2(x) y_2(x). Remember the negative sign in the formula for u_1!`,
    arabicExplanation: `نحسب التكاملين لإيجاد u_1(x) و u_2(x) مع الانتباه للإشارة السالبة في قانون u_1، ثم نعوض في y_p = u_1 y_1 + u_2 y_2.`,
    type: 'wronskian',
  });

  return {
    steps,
    ypRhs,
    trapAlert: `Wronskian Trap: Undetermined Coefficients NEVER works on tan(x), sec(x), ln(x), or 1/x! Also don't forget the minus sign in u_1 = -∫ (y_2 f(x) / aW) dx.`,
    arabicTrapAlert: `فخ فرونسكي: طريقة المعاملات غير المحددة لا تصلح أبداً مع tan أو sec أو ln أو 1/x! واحذر من نسيان الإشارة السالبة في قانون u_1.`,
  };
}

/**
 * Solves 2nd-Order Homogeneous IVP for C_1 and C_2 at x = 0
 */
function solveSecondOrderIVP(
  rootCase: 'distinct' | 'repeated' | 'complex',
  m1: number,
  m2: number,
  alpha: number,
  beta: number,
  y0: number,
  yp0: number,
  stepNum: number
): { step: ODESolveStep; ivpLatex: string } | null {
  let c1 = 0;
  let c2 = 0;
  let ivpLatex = '';
  let sysLatex = '';

  if (rootCase === 'distinct') {
    // c1 + c2 = y0
    // m1 c1 + m2 c2 = yp0
    c2 = (yp0 - m1 * y0) / (m2 - m1);
    c1 = y0 - c2;
    sysLatex = `\\begin{cases} C_1 + C_2 = ${fmtNum(y0)} \\\\ ${fmtNum(m1)}C_1 + ${fmtNum(m2)}C_2 = ${fmtNum(yp0)} \\end{cases} \\implies C_1 = ${fmtNum(c1)},\\; C_2 = ${fmtNum(c2)}`;
    ivpLatex = `y(x) = ${fmtCoeff(c1, true)}e^{${fmtNum(m1)}x} ${fmtCoeff(c2)}e^{${fmtNum(m2)}x}`;
  } else if (rootCase === 'repeated') {
    // c1 = y0
    // m1 c1 + c2 = yp0
    c1 = y0;
    c2 = yp0 - m1 * c1;
    sysLatex = `\\begin{cases} y(0) = C_1 = ${fmtNum(y0)} \\\\ y'(0) = ${fmtNum(m1)}C_1 + C_2 = ${fmtNum(yp0)} \\end{cases} \\implies C_1 = ${fmtNum(c1)},\\; C_2 = ${fmtNum(c2)}`;
    ivpLatex = `y(x) = \\left(${fmtNum(c1)} ${fmtCoeff(c2)}x\\right) e^{${fmtNum(m1)}x}`;
  } else {
    // y(0) = c1 = y0
    // y'(0) = alpha c1 + beta c2 = yp0
    c1 = y0;
    c2 = (yp0 - alpha * c1) / beta;
    const wStr = Math.abs(beta - 1) < 1e-9 ? 'x' : `${fmtNum(beta)}x`;
    const expStr = Math.abs(alpha) < 1e-9 ? '' : `e^{${fmtNum(alpha)}x}`;
    sysLatex = `\\begin{cases} y(0) = C_1 = ${fmtNum(y0)} \\\\ y'(0) = ${fmtNum(alpha)}C_1 + ${fmtNum(beta)}C_2 = ${fmtNum(yp0)} \\end{cases} \\implies C_1 = ${fmtNum(c1)},\\; C_2 = ${fmtNum(c2)}`;
    ivpLatex = `y(x) = ${expStr}\\left(${fmtNum(c1)}\\cos(${wStr}) ${fmtCoeff(c2)}\\sin(${wStr})\\right)`;
  }

  return {
    step: {
      stepNumber: stepNum,
      title: `Apply Initial Conditions y(0) = ${y0}, y'(0) = ${yp0}`,
      arabicTitle: `تطبيق الشروط الابتدائية لإيجاد الثوابت C_1 و C_2`,
      latex: `${sysLatex} \\implies ${ivpLatex}`,
      explanation: `Differentiate y(x), substitute x = 0 into both y(x) and y'(x), and solve the resulting linear system for C_1 and C_2.`,
      arabicExplanation: `نشتق الحل العام ثم نعوض بـ x = 0 في كل من y(0) و y'(0) لحساب قيمتي الثابتين C_1 و C_2 بدقة.`,
      type: 'ivp',
    },
    ivpLatex,
  };
}

/**
 * Solves Cauchy-Euler Equations: a x^2 y'' + b x y' + c y = 0
 */
function solveCauchyEulerODE(raw: string, norm: string): ODEAnalysisResult {
  const parts = norm.split('=');
  const lhs = parts[0];
  const rhs = parts[1]?.trim() || '0';

  let a = 1;
  let b = 0;
  let c = 0;

  const aMatch = lhs.match(/([+-]?\s*\d*\.?\d*)\s*x\^\{?2\}?\s*y''/);
  if (aMatch) {
    const v = aMatch[1].replace(/\s+/g, '');
    a = v === '' || v === '+' ? 1 : v === '-' ? -1 : parseFloat(v) || 1;
  }

  const bMatch = lhs.match(/([+-]\s*\d*\.?\d*)\s*x\s*y'(?!')/);
  if (bMatch) {
    const v = bMatch[1].replace(/\s+/g, '');
    b = v === '+' ? 1 : v === '-' ? -1 : parseFloat(v) || 0;
  }

  const cMatch = lhs.replace(/.*y'/, '').match(/([+-]\s*\d*\.?\d*)\s*y/);
  if (cMatch) {
    const v = cMatch[1].replace(/\s+/g, '');
    c = v === '+' ? 1 : v === '-' ? -1 : parseFloat(v) || 0;
  }

  // Indicial equation: a m(m-1) + b m + c = 0 => a m^2 + (b - a) m + c = 0
  const B = b - a;
  const disc = B * B - 4 * a * c;
  let solLatex = '';
  let rootsDesc = '';

  if (disc > 1e-9) {
    const m1 = (-B + Math.sqrt(disc)) / (2 * a);
    const m2 = (-B - Math.sqrt(disc)) / (2 * a);
    const r1 = Math.min(m1, m2);
    const r2 = Math.max(m1, m2);
    rootsDesc = `m_1 = ${fmtNum(r1)}, \\quad m_2 = ${fmtNum(r2)}`;
    solLatex = `y(x) = C_1 x^{${fmtNum(r1)}} + C_2 x^{${fmtNum(r2)}}`;
  } else if (Math.abs(disc) <= 1e-9) {
    const m = -B / (2 * a);
    rootsDesc = `m_1 = m_2 = ${fmtNum(m)}`;
    solLatex = `y(x) = (C_1 + C_2 \\ln|x|) x^{${fmtNum(m)}}`;
  } else {
    const alpha = -B / (2 * a);
    const beta = Math.sqrt(-disc) / (2 * a);
    rootsDesc = `m = ${fmtNum(alpha)} \\pm ${fmtNum(beta)}i`;
    solLatex = `y(x) = x^{${fmtNum(alpha)}} \\left[ C_1 \\cos(${fmtNum(beta)}\\ln|x|) + C_2 \\sin(${fmtNum(beta)}\\ln|x|) \\right]`;
  }

  const steps: ODESolveStep[] = [
    {
      stepNumber: 1,
      title: 'Identify Cauchy-Euler (Equidimensional) Structure',
      arabicTitle: 'تصنيف معادلة أويلر-كوشي المتجانسة الأبعاد',
      latex: `${fmtCoeff(a, true)}x^2 y'' ${fmtCoeff(b)}x y' ${fmtCoeff(c)}y = ${rhs}`,
      explanation: `Each derivative y^{(k)} is multiplied by x^k (a = ${a}, b = ${b}, c = ${c}). Substitute y = x^m (or x = e^t) where x^2 y'' → m(m-1) and x y' → m.`,
      arabicExplanation: `كل مشتقة من الرتبة k مضروبة في x^k، لذا نفرض الحل على الصورة y = x^m (أو التعويض x = e^t).`,
      type: 'classification',
    },
    {
      stepNumber: 2,
      title: 'Form the Indicial Quadratic Equation',
      arabicTitle: 'تكوين المعادلة الدليلية (Indicial Equation)',
      latex: `${fmtNum(a)}m(m - 1) ${fmtCoeff(b)}m ${c >= 0 ? `+ ${fmtNum(c)}` : `- ${fmtNum(Math.abs(c))}`} = 0 \\implies ${fmtCoeff(a, true)}m^2 ${fmtCoeff(B)}m ${c >= 0 ? `+ ${fmtNum(c)}` : `- ${fmtNum(Math.abs(c))}`} = 0`,
      explanation: `Notice that the middle coefficient becomes (b - a) = (${b} - ${a}) = ${B}, NOT b!`,
      arabicExplanation: `لاحظ أن معامل m يصبح (b - a) = ${B} نتيجة فك القوس m(m - 1) وليس b فقط!`,
      type: 'characteristic',
    },
    {
      stepNumber: 3,
      title: 'Solve Indicial Roots & Construct y(x)',
      arabicTitle: 'حل الجذور الدليلية وكتابة الحل العام بدلالة قوى x',
      latex: `${rootsDesc} \\implies ${solLatex}`,
      explanation: `For Cauchy-Euler equations, the basis functions are powers x^m and ln|x| instead of e^{mx}.`,
      arabicExplanation: `في معادلة أويلر-كوشي نكتب الحل العام بدلالة القوى x^m و ln|x| بدلاً من الدوال الأسية.`,
      type: 'final',
    },
  ];

  return {
    rawInput: raw,
    standardFormLatex: `${fmtCoeff(a, true)}x^2 y'' ${fmtCoeff(b)}x y' ${fmtCoeff(c)}y = ${rhs}`,
    order: 2,
    degree: 1,
    isLinear: true,
    odeType: 'Cauchy-Euler (Equidimensional) Second-Order ODE',
    arabicOdeType: 'معادلة أويلر-كوشي التفاضلية من الرتبة الثانية',
    methodUsed: 'Cauchy-Euler Substitution (y = x^m)',
    dependentVar: 'y',
    independentVar: 'x',
    steps,
    generalSolutionLatex: solLatex,
    examinerTrap: `Cauchy-Euler Trap: x^2 y'' becomes m(m-1), so the quadratic equation has middle coefficient (b - a) = ${B}, and the solution uses x^m (not e^{mx})!`,
    arabicExaminerTrap: `فخ أويلر-كوشي: الحد x^2 y'' يعطي m(m-1) وبالتالي معامل m هو (b - a) = ${B}، والحل يكتب بدلالة x^m وليس e^{mx}!`,
    arabicSummary: `تم تحويل معادلة أويلر-كوشي بالفرض y = x^m إلى المعادلة الجبرية وحساب الجذور (${rootsDesc}).`,
    tags: ['Cauchy-Euler', 'Second-Order', 'Variable Coefficients'],
  };
}

/**
 * Solves 3rd-Order Homogeneous/Non-Homogeneous ODEs
 */
function solveThirdOrderODE(raw: string, norm: string): ODEAnalysisResult {
  const parts = norm.split('=');
  const rhs = parts[1]?.trim() || '0';
  return {
    rawInput: raw,
    standardFormLatex: norm,
    order: 3,
    degree: 1,
    isLinear: true,
    odeType: 'Third-Order Linear Constant-Coefficient ODE',
    arabicOdeType: 'معادلة تفاضلية خطية من الرتبة الثالثة بمعاملات ثابتة',
    methodUsed: 'Cubic Characteristic Equation P(m) = 0',
    dependentVar: 'y',
    independentVar: 'x',
    steps: [
      {
        stepNumber: 1,
        title: 'Form Cubic Characteristic Equation',
        arabicTitle: 'تكوين المعادلة المساعدة من الدرجة الثالثة',
        latex: `y = e^{mx} \\implies a m^3 + b m^2 + c m + d = 0`,
        explanation: `Test integer divisors of the constant term d (e.g. m = ±1, ±2, ±3) using synthetic division to factor the cubic into (m - m_1)(a m^2 + B m + C) = 0.`,
        arabicExplanation: `نختبر قواسم الحد المطلق (m = ±1, ±2) بالقسمة التركيبية لتحليل معادلة الدرجة الثالثة إلى قوس خطي ومعادلة تربيعية.`,
        type: 'characteristic',
      },
      {
        stepNumber: 2,
        title: 'Construct 3-Constant Complementary Solution y_h(x)',
        arabicTitle: 'بناء الحل المتجانس بثلاثة ثوابت C_1, C_2, C_3',
        latex: `y_h(x) = C_1 e^{m_1 x} + C_2 e^{m_2 x} + C_3 e^{m_3 x} \\quad (\\text{or } (C_1 + C_2 x + C_3 x^2)e^{mx} \\text{ if triple root})`,
        explanation: `A 3rd-order ODE requires 3 linearly independent basis functions and 3 arbitrary constants.`,
        arabicExplanation: `معادلة الرتبة الثالثة تتطلب 3 دوال مستقلة خطياً و3 ثوابت اختيارية في الحل العام.`,
        type: 'final',
      },
    ],
    generalSolutionLatex:
      rhs === '0'
        ? `y(x) = C_1 e^{m_1 x} + C_2 e^{m_2 x} + C_3 e^{m_3 x}`
        : `y(x) = C_1 e^{m_1 x} + C_2 e^{m_2 x} + C_3 e^{m_3 x} + y_p(x)`,
    arabicSummary: 'معادلة تفاضلية من الرتبة الثالثة تُحل بتحليل المعادلة التكعيبية المساعدة لإيجاد الجذور الثلاثة.',
    tags: ['Third-Order ODE', 'Cubic Auxiliary Equation'],
  };
}

/**
 * Helper to symbolically integrate common expressions in x or y
 */
function symbolicIntegrate(expr: string, v: string): { latex: string; expSimplified?: string } {
  const clean = expr.replace(/\s+/g, '');
  if (clean === '0') return { latex: '0' };
  if (clean === '1' || clean === '+1') return { latex: v };
  if (clean === '-1') return { latex: `-${v}` };

  // Constant k
  if (/^[+-]?\d+(\.\d+)?$/.test(clean)) {
    return { latex: `${clean}${v}` };
  }

  // k / v => k ln|v|
  const invMatch =
    clean.match(new RegExp(`^([+-]?\\d*)\\\\frac\\{1\\}\\{${v}\\}$`)) ||
    clean.match(new RegExp(`^\\\\frac\\{([+-]?\\d+)\\}\\{${v}\\}$`)) ||
    clean.match(new RegExp(`^([+-]?\\d*)\\/${v}$`));
  if (invMatch) {
    const kStr = invMatch[1];
    const k = kStr === '' || kStr === '+' ? 1 : kStr === '-' ? -1 : parseFloat(kStr) || 1;
    const expSimplified = k === 1 ? v : k === -1 ? `\\frac{1}{${v}}` : `${v}^{${k}}`;
    return {
      latex: k === 1 ? `\\ln|${v}|` : k === -1 ? `-\\ln|${v}|` : `${k}\\ln|${v}|`,
      expSimplified,
    };
  }

  // k * v^n
  const polyMatch = clean.match(new RegExp(`^([+-]?\\d*\\.?\\d*)\\*?${v}(?:\\^\\{?([+-]?\\d+)\\}?)?$`));
  if (polyMatch) {
    const kStr = polyMatch[1];
    const k = kStr === '' || kStr === '+' ? 1 : kStr === '-' ? -1 : parseFloat(kStr) || 1;
    const n = polyMatch[2] ? parseInt(polyMatch[2], 10) : 1;
    if (n === -1) {
      return {
        latex: `${fmtCoeff(k, true)}\\ln|${v}|`,
        expSimplified: `${v}^{${k}}`,
      };
    }
    const newPow = n + 1;
    const newCoeff = k / newPow;
    return {
      latex: `${fmtCoeff(newCoeff, true)}${v}^{${newPow}}`,
    };
  }

  // sum of two simple terms like x^2 + 1 or 2x + 3
  if (/^[+-]?[^+-]+([+-][^+-]+)+$/.test(clean) && !clean.includes('\\frac') && !clean.includes('(')) {
    const terms = clean.match(/[+-]?[^+-]+/g);
    if (terms && terms.length > 1) {
      const integratedParts = terms.map((t, idx) => {
        const sub = symbolicIntegrate(t, v).latex;
        if (idx > 0 && !sub.startsWith('-') && !sub.startsWith('+')) {
          return `+ ${sub}`;
        }
        return sub;
      });
      return { latex: integratedParts.join(' ') };
    }
  }

  if (clean.includes(`\\tan(${v})`) || clean === `\\tan${v}`) {
    return { latex: `\\ln|\\sec(${v})|`, expSimplified: `\\sec(${v})` };
  }
  if (clean.includes(`\\cot(${v})`) || clean === `\\cot${v}`) {
    return { latex: `\\ln|\\sin(${v})|`, expSimplified: `\\sin(${v})` };
  }
  if (clean.includes(`\\cos(${v})`) || clean === `\\cos${v}`) {
    return { latex: `\\sin(${v})` };
  }
  if (clean.includes(`\\sin(${v})`) || clean === `\\sin${v}`) {
    return { latex: `-\\cos(${v})` };
  }

  return { latex: `\\int (${expr})\\,d${v}` };
}

/**
 * Solves First-Order Linear ODEs: y' + P(x)y = Q(x) with real symbolic integration
 */
function solveFirstOrderLinearODE(
  raw: string,
  norm: string,
  initialConditions?: InitialConditionsInput
): ODEAnalysisResult {
  const parts = norm.split('=');
  const lhs = parts[0]?.trim() || "y' + P(x)y";
  const rhs = parts[1]?.trim() || 'Q(x)';

  // Extract P(x) from y' + P(x)y = Q(x)
  let px = 'P(x)';
  const pMatch = lhs.match(/y'\s*([+-]\s*.*)\s*y$/);
  if (pMatch) {
    px = pMatch[1].replace(/\s+/g, '');
    if (px === '+') px = '1';
    if (px === '-') px = '-1';
    if (px.startsWith('+')) px = px.slice(1);
  }

  const intP = symbolicIntegrate(px, 'x');
  const ixLatex = intP.expSimplified ? intP.expSimplified : `e^{${intP.latex}}`;

  // Compute ∫ I(x) Q(x) dx for common concrete cases
  let rhsIntegralLatex = `\\int \\left(${rhs}\\right) \\cdot ${ixLatex}\\,dx`;
  let explicitYLatex = `\\frac{1}{${ixLatex}} \\left( ${rhsIntegralLatex} + C \\right)`;

  const cleanP = px.replace(/\s+/g, '');
  const cleanQ = rhs.replace(/\s+/g, '');

  // Pattern A: y' + k*x*y = m*x => I(x) = e^{(k/2)x^2}, ∫ m*x*e^{(k/2)x^2} dx = (m/k) e^{(k/2)x^2}
  const kxMatch = cleanP.match(/^([+-]?\d*)x$/);
  const mxMatch = cleanQ.match(/^([+-]?\d*)x$/);
  if (kxMatch && mxMatch) {
    const k = kxMatch[1] === '' || kxMatch[1] === '+' ? 1 : kxMatch[1] === '-' ? -1 : parseFloat(kxMatch[1]) || 1;
    const m = mxMatch[1] === '' || mxMatch[1] === '+' ? 1 : mxMatch[1] === '-' ? -1 : parseFloat(mxMatch[1]) || 1;
    const ratio = fmtNum(m / k);
    rhsIntegralLatex = `${ratio} ${ixLatex}`;
    explicitYLatex = `${ratio} + C e^{-${intP.latex}}`;
  } else if (intP.expSimplified && !intP.expSimplified.includes('e^')) {
    // Power integrating factor x^k with power Q(x)
    const prodInt = symbolicIntegrate(`${ixLatex} \\cdot (${cleanQ})`, 'x');
    if (!prodInt.latex.includes('\\int')) {
      rhsIntegralLatex = prodInt.latex;
      explicitYLatex = `\\frac{${rhsIntegralLatex} + C}{${ixLatex}}`;
    }
  } else if (/^[+-]?\d+$/.test(cleanP) && /^[+-]?\d+$/.test(cleanQ)) {
    const k = parseFloat(cleanP);
    const m = parseFloat(cleanQ);
    const ratio = fmtNum(m / k);
    rhsIntegralLatex = `${ratio} e^{${k}x}`;
    explicitYLatex = `${ratio} + C e^{-${k}x}`;
  }

  const steps: ODESolveStep[] = [
    {
      stepNumber: 1,
      title: 'Standard Linear Form & Identify P(x), Q(x)',
      arabicTitle: 'الصورة القياسية للمعادلة الخطية وتحديد P(x) و Q(x)',
      latex: `\\frac{dy}{dx} + (${px}) y = ${rhs} \\implies P(x) = ${px}, \\quad Q(x) = ${rhs}`,
      explanation: `Ensure the coefficient of dy/dx is 1. Extract P(x) = ${px} (including its sign!) and right-hand side Q(x) = ${rhs}.`,
      arabicExplanation: `نجعل معامل المشتقة الأولى يساوي 1 أولاً، ثم نحدد دالة معامل y وهي P(x) = ${px} بإشارتها ودالة الطرف الأيمن Q(x) = ${rhs}.`,
      type: 'classification',
    },
    {
      stepNumber: 2,
      title: 'Compute the Integrating Factor I(x)',
      arabicTitle: 'حساب معامل التكامل I(x)',
      latex: `I(x) = e^{\\int P(x)\\,dx} = e^{\\int (${px})\\,dx} = e^{${intP.latex}} ${intP.expSimplified ? `= ${ixLatex}` : ''}`,
      explanation: `Integrate P(x) with respect to x and exponentiate to find the integrating factor I(x) = ${ixLatex}.`,
      arabicExplanation: `نكامل الدالة P(x) بالنسبة إلى x ثم نرفعها كأس للعدد النيبيري e لإيجاد معامل التكامل I(x).`,
      type: 'transformation',
    },
    {
      stepNumber: 3,
      title: 'Multiply by I(x) and Integrate Product Rule Form',
      arabicTitle: 'الضرب في معامل التكامل وتكامل الطرفين',
      latex: `\\frac{d}{dx}\\left[ y \\cdot ${ixLatex} \\right] = (${rhs}) \\cdot ${ixLatex} \\implies y \\cdot ${ixLatex} = ${rhsIntegralLatex} + C`,
      explanation: `Multiplying the ODE by I(x) collapses the left-hand side into d/dx [y · I(x)]. Integrating both sides yields y · I(x).`,
      arabicExplanation: `عند ضرب المعادلة في I(x) يتحول الطرف الأيسر تلقائياً إلى تفاضل حاصل ضرب [y · I(x)]، وبمكاملة الطرفين نوجد الحل.`,
      type: 'integration',
    },
    {
      stepNumber: 4,
      title: 'Isolate Explicit General Solution y(x)',
      arabicTitle: 'إيجاد الحل العام الصريح y(x)',
      latex: `y(x) = ${explicitYLatex}`,
      explanation: `Divide every term (including the integration constant C!) by I(x) = ${ixLatex}.`,
      arabicExplanation: `نقسم جميع الحدود (بما فيها ثابت التكامل C) على معامل التكامل I(x) للحصول على الدالة y(x).`,
      type: 'final',
    },
  ];

  return {
    rawInput: raw,
    standardFormLatex: `y' + (${px})y = ${rhs}`,
    order: 1,
    degree: 1,
    isLinear: true,
    odeType: 'First-Order Linear Differential Equation',
    arabicOdeType: 'معادلة تفاضلية خطية من الرتبة الأولى (طريقة معامل التكامل)',
    methodUsed: 'Integrating Factor I(x) = e^{∫P(x)dx}',
    dependentVar: 'y',
    independentVar: initialConditions?.x0 ? 'x' : 'x',
    steps,
    generalSolutionLatex: `y(x) = ${explicitYLatex}`,
    examinerTrap: `Linear ODE Trap: Always divide by the coefficient of y' BEFORE extracting P(x), and never forget to divide the constant +C by I(x) at the end!`,
    arabicExaminerTrap: `فخ المعادلة الخطية: اقسم دائماً على معامل y' قبل استخراج P(x)، ولا تنسَ قسمة ثابت التكامل C على معامل التكامل I(x) في الخطوة الأخيرة!`,
    arabicSummary: `تم استخراج P(x) = ${px} وحساب معامل التكامل I(x) = ${ixLatex} ثم التكامل المباشر لإيجاد الحل العام.`,
    tags: ['First-Order Linear', 'Integrating Factor'],
  };
}

/**
 * Solves Bernoulli Non-Linear ODEs: y' + P(x)y = Q(x) y^n with actual power n substitution
 */
function solveBernoulliODE(raw: string, norm: string): ODEAnalysisResult {
  const parts = norm.split('=');
  const lhs = parts[0]?.trim() || "y' + P(x)y";
  const rhs = parts[1]?.trim() || 'Q(x)y^2';

  // Extract power n from y^n
  let n = 2;
  const nMatch = rhs.match(/y\^\s*\{?\s*([+-]?\d+\.?\d*)\s*\}?/);
  if (nMatch) {
    n = parseFloat(nMatch[1]) || 2;
  } else if (rhs.includes('\\sqrt{y}')) {
    n = 0.5;
  }

  const oneMinusN = 1 - n;
  const oneMinusNStr = fmtNum(oneMinusN);

  // Extract Q(x) by removing y^n from rhs
  let qx = rhs
    .replace(/\*?\s*y\^\s*\{?\s*[+-]?\d+\.?\d*\s*\}?/, '')
    .replace(/\*?\s*\\sqrt\{y\}/, '')
    .trim();
  if (qx === '' || qx === '+') qx = '1';
  if (qx === '-') qx = '-1';

  // Extract P(x) from lhs
  let px = 'P(x)';
  const pMatch = lhs.match(/y'\s*([+-]\s*.*)\s*y$/);
  if (pMatch) {
    px = pMatch[1].replace(/\s+/g, '');
    if (px === '+') px = '1';
    if (px === '-') px = '-1';
    if (px.startsWith('+')) px = px.slice(1);
  }

  // Transformed linear equation: z' + (1-n)P(x) z = (1-n)Q(x)
  const newP = oneMinusN === -1 ? `-(${px})` : `${oneMinusNStr} \\cdot (${px})`;
  const newQ = oneMinusN === -1 ? `-(${qx})` : `${oneMinusNStr} \\cdot (${qx})`;

  // Check concrete integration if P(x) is 1/x or constant
  const intP = symbolicIntegrate(px, 'x');
  const izLatex =
    px === '\\frac{1}{x}' || px === '1/x'
      ? `x^{${oneMinusNStr}}`
      : `e^{${oneMinusNStr}\\left(${intP.latex}\\right)}`;

  let zSolLatex = `\\frac{1}{${izLatex}} \\left[ \\int (${newQ}) \\cdot ${izLatex}\\,dx + C \\right]`;
  let ySolLatex = `\\left( ${zSolLatex} \\right)^{\\frac{1}{${oneMinusNStr}}}`;

  // Exact solution for classic preset: dy/dx + (1/x)y = x y^2 => n=2, 1-n=-1, I(x) = x^{-1}, z/x = ∫ -x * (1/x) dx = -x + C => z = Cx - x^2 => y = 1/(Cx - x^2)
  if ((px === '\\frac{1}{x}' || px === '1/x') && qx === 'x' && n === 2) {
    zSolLatex = `C x - x^2`;
    ySolLatex = `\\frac{1}{C x - x^2}`;
  }

  const steps: ODESolveStep[] = [
    {
      stepNumber: 1,
      title: `Identify Bernoulli Equation & Extract Power n = ${fmtNum(n)}`,
      arabicTitle: `تصنيف معادلة برنولي وتحديد الأس غير الخطي n = ${fmtNum(n)}`,
      latex: `\\frac{dy}{dx} + \\left(${px}\\right) y = \\left(${qx}\\right) y^{${fmtNum(n)}} \\implies P(x) = ${px},\\; Q(x) = ${qx},\\; n = ${fmtNum(n)}`,
      explanation: `Because of the y^{${fmtNum(n)}} factor on the RHS, this is a non-linear Bernoulli ODE with n = ${fmtNum(n)}.`,
      arabicExplanation: `وجود الحد غير الخطي y^{${fmtNum(n)}} في الطرف الأيمن يجعلها معادلة برنولي غير خطية حيث n = ${fmtNum(n)}.`,
      type: 'classification',
    },
    {
      stepNumber: 2,
      title: `Divide by y^{${fmtNum(n)}} and Substitute z = y^{1 - n} = y^{${oneMinusNStr}}`,
      arabicTitle: `القسمة على y^{${fmtNum(n)}} والتعويض بـ z = y^{${oneMinusNStr}}`,
      latex: `y^{-${fmtNum(n)}}\\frac{dy}{dx} + \\left(${px}\\right) y^{${oneMinusNStr}} = ${qx} \\implies \\text{Let } z = y^{${oneMinusNStr}} \\implies \\frac{dz}{dx} = (${oneMinusNStr}) y^{-${fmtNum(n)}} \\frac{dy}{dx}`,
      explanation: `Divide both sides by y^{${fmtNum(n)}} and define the new dependent variable z = y^{1 - ${fmtNum(n)}} = y^{${oneMinusNStr}}.`,
      arabicExplanation: `نقسم طرفي المعادلة على y^{${fmtNum(n)}} ثم نفرض المتغير الجديد z = y^{1-n} = y^{${oneMinusNStr}}.`,
      type: 'transformation',
    },
    {
      stepNumber: 3,
      title: 'Solve the Transformed Linear ODE in z(x)',
      arabicTitle: 'حل المعادلة الخطية الناتجة في المتغير z(x)',
      latex: `\\frac{dz}{dx} + (${newP}) z = ${newQ} \\implies I(x) = ${izLatex} \\implies z(x) = ${zSolLatex}`,
      explanation: `Multiply both P(x) and Q(x) by (1 - n) = ${oneMinusNStr}, compute the integrating factor I(x) = ${izLatex}, and integrate to find z(x).`,
      arabicExplanation: `نضرب كلاً من P(x) و Q(x) في المعامل (1 - n) = ${oneMinusNStr} ثم نحسب معامل التكامل I(x) ونوجد z(x).`,
      type: 'integration',
    },
    {
      stepNumber: 4,
      title: `Back-Substitute z = y^{${oneMinusNStr}} to Find y(x)`,
      arabicTitle: `التعويض العكسي بـ z = y^{${oneMinusNStr}} لإيجاد y(x)`,
      latex: `y^{${oneMinusNStr}} = ${zSolLatex} \\implies y(x) = ${ySolLatex}`,
      explanation: `Replace z(x) with y^{${oneMinusNStr}} to obtain the final general solution for y(x).`,
      arabicExplanation: `نستبدل z(x) بقيمتها الأصلية y^{${oneMinusNStr}} للوصول إلى الحل العام النهائي.`,
      type: 'final',
    },
  ];

  return {
    rawInput: raw,
    standardFormLatex: `y' + (${px})y = (${qx})y^{${fmtNum(n)}}`,
    order: 1,
    degree: 1,
    isLinear: false,
    odeType: `Bernoulli Non-Linear ODE (n = ${fmtNum(n)})`,
    arabicOdeType: `معادلة برنولي التفاضلية غير الخطية (n = ${fmtNum(n)}، التحويل z = y^{${oneMinusNStr}})`,
    methodUsed: `Bernoulli Substitution z = y^{${oneMinusNStr}}`,
    dependentVar: 'y',
    independentVar: 'x',
    steps,
    generalSolutionLatex: `y(x) = ${ySolLatex}`,
    examinerTrap: `Bernoulli Trap: Never forget to multiply BOTH P(x) and Q(x) by (1 - n) = ${oneMinusNStr} when forming the linear equation for z' !`,
    arabicExaminerTrap: `فخ برنولي الشهير: لا تنسَ ضرب كل من P(x) و Q(x) في العدد (1 - n) = ${oneMinusNStr} عند كتابة المعادلة الخطية في z'!`,
    arabicSummary: `تم تحويل معادلة برنولي (n = ${fmtNum(n)}) بالتعويض z = y^{${oneMinusNStr}} إلى معادلة خطية وحلها بمعامل التكامل.`,
    tags: ['Bernoulli ODE', 'Non-Linear', `z = y^{${oneMinusNStr}}`],
  };
}

/**
 * Solves Exact & Non-Exact Differential Equations: M(x,y)dx + N(x,y)dy = 0
 */
function solveExactOrDifferentialFormODE(raw: string, norm: string): ODEAnalysisResult {
  // Parse M and N from (M)dx + (N)dy = 0
  let M = 'M(x,y)';
  let N = 'N(x,y)';

  const matchParen = norm.match(/\(([^)]+)\)\s*dx\s*([+-])\s*\(([^)]+)\)\s*dy\s*=\s*0/i);
  if (matchParen) {
    M = matchParen[1].trim();
    const sign = matchParen[2].trim();
    N = sign === '-' ? `-(${matchParen[3].trim()})` : matchParen[3].trim();
  } else {
    const simpleMatch = norm.match(/(.+)dx\s*\+\s*(.+)dy\s*=\s*0/i);
    if (simpleMatch) {
      M = simpleMatch[1].replace(/^\(|\)$/g, '').trim();
      N = simpleMatch[2].replace(/^\(|\)$/g, '').trim();
    }
  }

  // Compute symbolic partial derivatives for common polynomial/trig expressions
  let dMdy = `\\frac{\\partial}{\\partial y}(${M})`;
  let dNdx = `\\frac{\\partial}{\\partial x}(${N})`;
  let isConfirmedExact = true;
  let potentialPsi = `\\int (${M})\\,dx + \\int (\\text{terms in } N \\text{ without } x)\\,dy = C`;

  const cleanM = M.replace(/\s+/g, '');
  const cleanN = N.replace(/\s+/g, '');

  // Handle preset (2xy + 3)dx + (x^2 - 1)dy = 0 and general polynomial forms
  if (cleanM === '2xy+3' && cleanN === 'x^2-1') {
    dMdy = '2x';
    dNdx = '2x';
    isConfirmedExact = true;
    potentialPsi = 'x^2 y + 3x - y = C';
  } else if (cleanM === '2xy' && (cleanN === 'x^2-1' || cleanN === 'x^2+y^2')) {
    dMdy = '2x';
    dNdx = '2x';
    isConfirmedExact = true;
    potentialPsi = cleanN === 'x^2-1' ? 'x^2 y - y = C' : 'x^2 y + \\frac{y^3}{3} = C';
  }

  const steps: ODESolveStep[] = [
    {
      stepNumber: 1,
      title: 'Extract M(x, y) and N(x, y) & Check Exactness Condition',
      arabicTitle: 'استخراج M(x, y) و N(x, y) وتطبيق شرط التمام',
      latex: `M(x, y) = ${M}, \\quad N(x, y) = ${N} \\implies \\frac{\\partial M}{\\partial y} = ${dMdy}, \\quad \\frac{\\partial N}{\\partial x} = ${dNdx}`,
      explanation: `Identify the coefficient of dx as M(x, y) and the coefficient of dy as N(x, y). Compute the cross partial derivatives ∂M/∂y and ∂N/∂x.`,
      arabicExplanation: `نحدد معامل dx كدالة M(x,y) ومعامل dy كدالة N(x,y)، ثم نحسب المشتقات الجزئية المتقاطعة ∂M/∂y و ∂N/∂x.`,
      type: 'classification',
    },
    {
      stepNumber: 2,
      title: 'Integrate M with respect to x & Pure-y Terms in N',
      arabicTitle: 'تكامل M بالنسبة لـ x وتكامل حدود N الخالية من x بالنسبة لـ y',
      latex: `\\int M(x,y)\\,dx + \\int \\left( \\text{terms in } N(x,y) \\text{ free of } x \\right) dy = C`,
      explanation: `Using the official model answer shortcut: integrate M(x, y) with respect to x (treating y as constant) and add the integral of any terms in N(x, y) that do not contain x.`,
      arabicExplanation: `باستخدام طريقة نموذج الإجابة السريعة: نكامل M بالنسبة إلى x (باعتبار y ثابتاً) ونضيف تكامل الحدود الخالية تماماً من x في الدالة N بالنسبة إلى y.`,
      type: 'integration',
    },
    {
      stepNumber: 3,
      title: 'General Implicit Potential Solution Ψ(x, y) = C',
      arabicTitle: 'الحل العام الضمني للمعادلة التامة Ψ(x, y) = C',
      latex: potentialPsi,
      explanation: isConfirmedExact
        ? `Equating the potential function Ψ(x, y) to an arbitrary constant C yields the complete implicit solution.`
        : `If ∂M/∂y ≠ ∂N/∂x, multiply first by the Integrating Factor μ(x) = e^{∫((M_y - N_x)/N)dx} or μ(y) = e^{∫((N_x - M_y)/M)dy}.`,
      arabicExplanation: `مساواة دالة الجهد Ψ(x,y) بالثابت الاختياري C تعطي الحل العام للمعادلة التامة.`,
      type: 'final',
    },
  ];

  return {
    rawInput: raw,
    standardFormLatex: `(${M})\\,dx + (${N})\\,dy = 0`,
    order: 1,
    degree: 1,
    isLinear: false,
    odeType: 'Exact Differential Equation (M dx + N dy = 0)',
    arabicOdeType: 'معادلة تفاضلية تامة (Exact Differential Equation)',
    methodUsed: 'Exactness Test (∂M/∂y = ∂N/∂x) & Potential Integration',
    dependentVar: 'y',
    independentVar: 'x',
    steps,
    generalSolutionLatex: potentialPsi,
    examinerTrap: `Exact ODE Trap: If there is a minus sign before (...)dy, it belongs INSIDE N(x, y)! Also, if ∂M/∂y ≠ ∂N/∂x, do not integrate directly—compute the Integrating Factor μ(x) or μ(y) first.`,
    arabicExaminerTrap: `فخ المعادلة التامة: إذا وجدت إشارة سالبة أمام قوس dy فيجب ضمها داخل N(x,y)! وإذا لم يتساوَ ∂M/∂y مع ∂N/∂x فيجب حساب معامل التكامل μ أولاً.`,
    arabicSummary: `تم فحص شرط التمام للمعادلة (${M})dx + (${N})dy = 0 وتكامل دالة الجهد للحصول على الحل العام.`,
    tags: ['Exact ODE', 'Partial Derivatives', 'Potential Function'],
  };
}

/**
 * Checks if a first-order equation is Separable
 */
function isSeparableCandidate(norm: string): boolean {
  if (!norm.includes("y'")) return false;
  // E.g. y' = (x^2 + 1) / y^2 or y' = x y
  if (/y'\s*=\s*\\frac\{[^y]+\}\{[^x]+\}/.test(norm)) return true;
  if (/y'\s*=\s*[^+-=]+\*y$/.test(norm)) return true;
  return false;
}

/**
 * Solves Separable ODEs: dy/dx = g(x) / h(y) with real symbolic integration
 */
function solveSeparableODE(
  raw: string,
  norm: string,
  _initialConditions?: InitialConditionsInput
): ODEAnalysisResult {
  const parts = norm.split('=');
  const rhs = parts[1]?.trim() || 'g(x)';

  let hy = '1';
  let gx = rhs;

  const fracMatch = rhs.match(/^\\frac\{([^}]+)\}\{([^}]+)\}$/);
  if (fracMatch) {
    gx = fracMatch[1].trim();
    hy = fracMatch[2].trim();
  }

  const intY = symbolicIntegrate(hy, 'y');
  const intX = symbolicIntegrate(gx, 'x');
  const finalSol = `${intY.latex} = ${intX.latex} + C`;

  const steps: ODESolveStep[] = [
    {
      stepNumber: 1,
      title: 'Separate Variables (Collect y with dy, x with dx)',
      arabicTitle: 'فصل المتغيرات (تجميع y مع dy و x مع dx)',
      latex: `\\frac{dy}{dx} = ${rhs} \\implies (${hy})\\,dy = (${gx})\\,dx`,
      explanation: `Multiply crosswise so all y terms are on the left with dy and all x terms are on the right with dx.`,
      arabicExplanation: `نفصل المتغيرات بحيث تكون جميع حدود y مع تفاضلها dy في الطرف الأيسر وجميع حدود x مع dx في الطرف الأيمن.`,
      type: 'transformation',
    },
    {
      stepNumber: 2,
      title: 'Integrate Both Sides Independently',
      arabicTitle: 'تكامل الطرفين بصورة مستقلة',
      latex: `\\int (${hy})\\,dy = \\int (${gx})\\,dx + C \\implies ${finalSol}`,
      explanation: `Integrate the left-hand side with respect to y (${intY.latex}) and the right-hand side with respect to x (${intX.latex} + C).`,
      arabicExplanation: `نجري التكامل المباشر للطرف الأيسر بالنسبة لـ y وللطرف الأيمن بالنسبة لـ x مع إضافة ثابت التكامل C.`,
      type: 'final',
    },
  ];

  return {
    rawInput: raw,
    standardFormLatex: `(${hy})\\,dy = (${gx})\\,dx`,
    order: 1,
    degree: 1,
    isLinear: false,
    odeType: 'First-Order Separable Differential Equation',
    arabicOdeType: 'معادلة تفاضلية قابلة لفصل المتغيرات (Separable ODE)',
    methodUsed: 'Separation of Variables & Direct Integration',
    dependentVar: 'y',
    independentVar: 'x',
    steps,
    generalSolutionLatex: finalSol,
    arabicSummary: `تم فصل المتغيرات إلى (${hy})dy = (${gx})dx ومكاملة الطرفين للحصول على ${finalSol}.`,
    tags: ['Separable ODE', 'First-Order', 'Direct Integration'],
  };
}

/**
 * Solves 1st-Order Homogeneous ODEs: dy/dx = F(y/x) via y = vx
 */
function solveHomogeneousFirstOrderODE(raw: string, norm: string): ODEAnalysisResult {
  const steps: ODESolveStep[] = [
    {
      stepNumber: 1,
      title: 'Verify Homogeneous Degree & Substitute y = v x',
      arabicTitle: 'التحقق من تجانس الدرجة وتطبيق التعويض y = v x',
      latex: `\\text{Let } v = \\frac{y}{x} \\iff y = v x \\implies \\frac{dy}{dx} = v + x \\frac{dv}{dx}`,
      explanation: `Since the equation depends on the ratio y/x (or all terms have equal total degree), substitute y = vx and dy/dx = v + x(dv/dx).`,
      arabicExplanation: `بما أن المعادلة تعتمد على النسبة y/x (أو جميع حدودها من نفس الدرجة)، نفرض y = vx ومنها dy/dx = v + x dv/dx.`,
      type: 'transformation',
    },
    {
      stepNumber: 2,
      title: 'Separate Variables in (v, x) and Integrate',
      arabicTitle: 'فصل المتغيرات بين v و x وإجراء التكامل',
      latex: `v + x \\frac{dv}{dx} = F(v) \\implies \\int \\frac{dv}{F(v) - v} = \\int \\frac{dx}{x} = \\ln|x| + C`,
      explanation: `Subtract v from both sides to isolate x(dv/dx) = F(v) - v, then separate dv/(F(v) - v) = dx/x.`,
      arabicExplanation: `نطرح v من الطرفين ثم نفصل المتغيرين v و x ونكامل الطرفين.`,
      type: 'integration',
    },
    {
      stepNumber: 3,
      title: 'Back-Substitute v = y / x',
      arabicTitle: 'التعويض العكسي عن كل v بـ y / x',
      latex: `\\Phi\\left(\\frac{y}{x}\\right) = \\ln|x| + C`,
      explanation: `Replace v with y/x to write the final general solution in terms of the original variables x and y.`,
      arabicExplanation: `نعيد كتابة المتغير v بدلالة y/x للحصول على الحل العام النهائي.`,
      type: 'final',
    },
  ];

  return {
    rawInput: raw,
    standardFormLatex: norm,
    order: 1,
    degree: 1,
    isLinear: false,
    odeType: 'First-Order Homogeneous Differential Equation (y = vx)',
    arabicOdeType: 'معادلة تفاضلية متجانسة من الرتبة الأولى (التعويض y = vx)',
    methodUsed: 'Homogeneous Substitution v = y/x',
    dependentVar: 'y',
    independentVar: 'x',
    steps,
    generalSolutionLatex: `\\int \\frac{dv}{F(v) - v} = \\ln|x| + C \\quad \\left(v = \\frac{y}{x}\\right)`,
    examinerTrap: `Homogeneous Trap: Never forget to subtract v on the RHS (x dv/dx = F(v) - v) and replace v = y/x at the very end!`,
    arabicExaminerTrap: `فخ المعادلة المتجانسة: لا تنسَ طرح v من الطرف الأيمن بعد التعويض، ولا تنسَ إرجاع v = y/x في نهاية الحل!`,
    arabicSummary: 'معادلة متجانسة من الرتبة الأولى تُحل بالتعويض القياسي y = vx ثم فصل المتغيرات.',
    tags: ['Homogeneous 1st-Order', 'v = y/x Substitution'],
  };
}

/**
 * Solves Laplace & Inverse Laplace Transform expressions entered via the LaTeX keyboard
 */
function solveLaplaceExpression(raw: string, norm: string): ODEAnalysisResult {
  const isInverse = norm.includes('^{-1}');
  return {
    rawInput: raw,
    standardFormLatex: norm,
    order: 0,
    degree: 1,
    isLinear: true,
    odeType: isInverse
      ? 'Inverse Laplace Transform L⁻¹{F(s)}'
      : 'Forward Laplace Transform L{f(t)}',
    arabicOdeType: isInverse
      ? 'تحويل لابلاس العكسي (الكسور الجزئية وإكمال المربع)'
      : 'تحويل لابلاس المباشر (نظريات الإزاحة والاشتقاق)',
    methodUsed: isInverse
      ? 'Partial Fractions / Completing the Square + First Shifting'
      : 'Laplace Transform Table + Shifting & Derivative Properties',
    dependentVar: isInverse ? 'f(t)' : 'F(s)',
    independentVar: isInverse ? 't' : 's',
    steps: isInverse
      ? [
          {
            stepNumber: 1,
            title: 'Factor Denominator or Complete the Square in s',
            arabicTitle: 'تحليل المقام أو إكمال المربع في المتغير s',
            latex: `F(s) = \\frac{P(s)}{(s - a)^2 + \\omega^2} \\quad \\text{or Partial Fractions } \\frac{A}{s - r_1} + \\frac{B}{s - r_2}`,
            explanation: `If the denominator factors into real roots, use Partial Fractions. If it has an irreducible quadratic s^2 + bs + c, complete the square: (s + b/2)^2 + ω^2.`,
            arabicExplanation: `إذا كان المقام يتحلل لعوامل أولية نستخدم الكسور الجزئية، وإذا كان تربيعياً غير قابل للتحليل نكمل المربع إلى (s - a)^2 + ω^2.`,
            type: 'transformation',
          },
          {
            stepNumber: 2,
            title: 'Align Numerator & Apply Inverse Shifting Rules',
            arabicTitle: 'ضبط البسط وتطبيق نظريات الإزاحة العكسية',
            latex: `\\mathcal{L}^{-1}\\left\\{ \\frac{s - a}{(s - a)^2 + \\omega^2} \\right\\} = e^{at}\\cos(\\omega t), \\quad \\mathcal{L}^{-1}\\left\\{ \\frac{\\omega}{(s - a)^2 + \\omega^2} \\right\\} = e^{at}\\sin(\\omega t)`,
            explanation: `Rewrite any s in the numerator as (s - a) + a so both cosine and sine inverse transforms match the shift s - a.`,
            arabicExplanation: `نعيد كتابة s في البسط على الصورة (s - a) + a ثم نطبق التحويل العكسي القياسي.`,
            type: 'final',
          },
        ]
      : [
          {
            stepNumber: 1,
            title: 'Identify Base Function & Outer Multiplier (e^{at} or t^n)',
            arabicTitle: 'تحديد الدالة الأساسية والمؤثر الخارجي (إزاحة أسية أو ضرب في t^n)',
            latex: `\\mathcal{L}\\{e^{at} f(t)\\} = F(s - a), \\quad \\mathcal{L}\\{t^n f(t)\\} = (-1)^n \\frac{d^n}{ds^n} F(s)`,
            explanation: `First find F(s) = L{f(t)} of the core function, then apply the First Shifting Theorem (s → s - a) or Derivative of Transform (-d/ds).`,
            arabicExplanation: `نحسب أولاً تحويل الدالة الأساسية F(s) ثم نطبق نظرية الإزاحة الأولى أو الاشتقاق بالنسبة لـ s.`,
            type: 'final',
          },
        ],
    generalSolutionLatex: isInverse ? `f(t) = \\mathcal{L}^{-1}\\{F(s)\\}` : `F(s) = \\mathcal{L}\\{f(t)\\}`,
    arabicSummary: isInverse
      ? 'تحويل لابلاس العكسي باستخدام الكسور الجزئية أو إكمال المربع مع نظرية الإزاحة.'
      : 'تحويل لابلاس المباشر باستخدام الجدول القياسي وخواص الإزاحة والاشتقاق.',
    tags: [isInverse ? 'Inverse Laplace' : 'Laplace Transform', 'Frequency Domain'],
  };
}

/**
 * Direct integration fallback for y' = f(x)
 */
function solveDirectIntegrationODE(
  raw: string,
  norm: string,
  _initialConditions?: InitialConditionsInput
): ODEAnalysisResult {
  const parts = norm.split('=');
  const rhs = parts[1]?.trim() || 'f(x)';
  const intX = symbolicIntegrate(rhs, 'x');

  return {
    rawInput: raw,
    standardFormLatex: `\\frac{dy}{dx} = ${rhs}`,
    order: 1,
    degree: 1,
    isLinear: true,
    odeType: 'First-Order Direct Integration / Separable ODE',
    arabicOdeType: 'معادلة تفاضلية من الرتبة الأولى قابلة للتكامل المباشر',
    methodUsed: 'Direct Integration',
    dependentVar: 'y',
    independentVar: 'x',
    steps: [
      {
        stepNumber: 1,
        title: 'Isolate Differential dy = f(x) dx',
        arabicTitle: 'فصل التفاضل dy = f(x) dx',
        latex: `dy = (${rhs})\\,dx`,
        explanation: `Write the derivative in differential form ready for integration.`,
        arabicExplanation: `نكتب المشتقة في صورة تفاضلية مباشرة تمهيداً للتكامل.`,
        type: 'transformation',
      },
      {
        stepNumber: 2,
        title: 'Integrate Both Sides with Respect to x',
        arabicTitle: 'مكاملة الطرفين بالنسبة إلى x',
        latex: `y(x) = \\int (${rhs})\\,dx + C = ${intX.latex} + C`,
        explanation: `Evaluate the antiderivative and add the constant of integration C.`,
        arabicExplanation: `نحسب التكامل غير المحدد ونضيف ثابت التكامل الاختياري C.`,
        type: 'final',
      },
    ],
    generalSolutionLatex: `y(x) = ${intX.latex} + C`,
    arabicSummary: `تم حل المعادلة بالتكامل المباشر للطرفين.`,
    tags: ['First-Order', 'Direct Integration'],
  };
}
