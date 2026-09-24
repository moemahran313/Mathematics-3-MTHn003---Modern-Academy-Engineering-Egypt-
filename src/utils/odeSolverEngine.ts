export interface ODESolveStep {
  stepNumber: number;
  title: string;
  arabicTitle: string;
  latex: string;
  explanation: string;
  arabicExplanation: string;
  type?: 'classification' | 'transformation' | 'integration' | 'characteristic' | 'particular' | 'final' | 'check';
}

export interface ODEAnalysisResult {
  rawInput: string;
  standardFormLatex: string;
  order: number;
  degree: number;
  isLinear: boolean;
  odeType: string;
  arabicOdeType: string;
  dependentVar: string;
  independentVar: string;
  steps: ODESolveStep[];
  generalSolutionLatex: string;
  arabicSummary: string;
  verificationLatex?: string;
  tags: string[];
}

/**
 * Normalizes user LaTeX / math strings for differential equations
 */
export function normalizeLatex(input: string): string {
  let s = input.trim();
  s = s.replace(/\\frac\s*\{d\^2\s*y\}\s*\{dx\^2\}/g, "y''");
  s = s.replace(/\\frac\s*\{dy\}\s*\{dx\}/g, "y'");
  s = s.replace(/\\frac\s*\{d\^2\s*y\}\s*\{dt\^2\}/g, "y''");
  s = s.replace(/\\frac\s*\{dy\}\s*\{dt\}/g, "y'");
  s = s.replace(/y\^\prime\prime/g, "y''");
  s = s.replace(/y\^\prime/g, "y'");
  s = s.replace(/\\mathrm\{d\}/g, "d");
  s = s.replace(/\\cdot/g, "*");
  s = s.replace(/\\quad/g, " ");
  s = s.replace(/\\,/g, " ");
  return s;
}

/**
 * Heuristic Mathematical Solver for differential equations
 */
export function solveODEHeuristic(latexInput: string): ODEAnalysisResult {
  const norm = normalizeLatex(latexInput);

  // Check 1: Second-Order Linear Constant Coefficients: a y'' + b y' + c y = f(x) or 0
  const secondOrderMatch = norm.match(/([+-]?\s*\d*\.?\d*)\s*y''\s*([+-]\s*\d*\.?\d*)\s*y'\s*([+-]\s*\d*\.?\d*)\s*y\s*=\s*(.*)/i) ||
                           norm.match(/([+-]?\s*\d*\.?\d*)\s*y''\s*([+-]\s*\d*\.?\d*)\s*y\s*=\s*(.*)/i) ||
                           norm.match(/([+-]?\s*\d*\.?\d*)\s*y''\s*([+-]\s*\d*\.?\d*)\s*y'\s*=\s*(.*)/i);

  if (secondOrderMatch) {
    return solveSecondOrderODE(latexInput, norm);
  }

  // Check 2: First-Order Linear: y' + P(x)y = Q(x)
  const firstOrderLinearMatch = norm.match(/y'\s*([+-]\s*[^=y]+)\s*y\s*=\s*(.*)/i) ||
                               norm.match(/y'\s*=\s*([^y]+)y\s*([+-]\s*.*)/i);
  if (firstOrderLinearMatch || norm.includes("y'") && norm.includes("y") && !norm.includes("y^") && !norm.includes("y''")) {
    return solveFirstOrderLinearODE(latexInput, norm);
  }

  // Check 3: Bernoulli: y' + P(x)y = Q(x) y^n
  if (norm.match(/y\^([2-9]|\d+)/) && norm.includes("y'")) {
    return solveBernoulliODE(latexInput, norm);
  }

  // Check 4: Exact / Differential Form: M dx + N dy = 0
  if (norm.includes("dx") && norm.includes("dy")) {
    return solveExactODE(latexInput, norm);
  }

  // Check 5: Separable form or General fallback
  return solveSeparableOrGeneralODE(latexInput, norm);
}

function solveSecondOrderODE(raw: string, norm: string): ODEAnalysisResult {
  // Try extracting a, b, c from standard form
  let a = 1, b = 0, c = 0;
  let rhs = "0";

  if (norm.includes("y''")) {
    const parts = norm.split('=');
    rhs = parts[1] ? parts[1].trim() : "0";
    const lhs = parts[0];

    const aMatch = lhs.match(/([+-]?\s*\d*\.?\d*)\s*y''/);
    if (aMatch) {
      const val = aMatch[1].replace(/\s+/g, '');
      a = val === '' || val === '+' ? 1 : val === '-' ? -1 : parseFloat(val) || 1;
    }

    const bMatch = lhs.match(/([+-]\s*\d*\.?\d*)\s*y'(?!')/);
    if (bMatch) {
      const val = bMatch[1].replace(/\s+/g, '');
      b = val === '+' ? 1 : val === '-' ? -1 : parseFloat(val) || 0;
    }

    const cMatch = lhs.match(/([+-]\s*\d*\.?\d*)\s*y(?!')/);
    if (cMatch) {
      const val = cMatch[1].replace(/\s+/g, '');
      c = val === '+' ? 1 : val === '-' ? -1 : parseFloat(val) || 0;
    }
  }

  const isHomogeneous = rhs === '0' || rhs === '';
  const discriminant = b * b - 4 * a * c;

  const steps: ODESolveStep[] = [];

  // Step 1
  steps.push({
    stepNumber: 1,
    title: 'Classification & Standard Form',
    arabicTitle: 'تصنيف المعادلة والشكل القياسي',
    latex: `${a === 1 ? '' : a} y'' ${b >= 0 ? '+ ' + (b === 1 ? '' : b) : '- ' + Math.abs(b)} y' ${c >= 0 ? '+ ' + (c === 1 ? '' : c) : '- ' + Math.abs(c)} y = ${rhs}`,
    explanation: `Second-order linear ODE with constant coefficients (a = ${a}, b = ${b}, c = ${c}). ${isHomogeneous ? 'Homogeneous equation.' : 'Non-homogeneous with driving force f(x) = ' + rhs}`,
    arabicExplanation: `معادلة تفاضلية خطية من الرتبة الثانية ذات معاملات ثابتة حيث (a = ${a}, b = ${b}, c = ${c}). ${isHomogeneous ? 'معادلة متجانسة.' : 'معادلة غير متجانسة مع دالة الإثارة f(x) = ' + rhs}`,
    type: 'classification',
  });

  // Step 2
  steps.push({
    stepNumber: 2,
    title: 'Form the Characteristic (Auxiliary) Equation',
    arabicTitle: 'تكوين المعادلة المميزة (المساعدة)',
    latex: `${a === 1 ? '' : a} m^2 ${b >= 0 ? '+ ' + (b === 1 ? '' : b) : '- ' + Math.abs(b)} m ${c >= 0 ? '+ ' + (c === 1 ? '' : c) : '- ' + Math.abs(c)} = 0`,
    explanation: `Assume a solution of the form y = e^{mx}. Substituting yields the algebraic quadratic equation in m.`,
    arabicExplanation: `نفرض الحل على الصورة y = e^{mx}، وبالتعويض نحصل على المعادلة الجبرية المساعدة للدرجة الثانية.`,
    type: 'characteristic',
  });

  // Step 3
  let yhLatex = '';
  let rootsLatex = '';

  if (discriminant > 0) {
    const m1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const m2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    const m1Str = Number.isInteger(m1) ? `${m1}` : m1.toFixed(2);
    const m2Str = Number.isInteger(m2) ? `${m2}` : m2.toFixed(2);
    rootsLatex = `m_1 = ${m1Str}, \\quad m_2 = ${m2Str}`;
    yhLatex = `y_h(x) = C_1 e^{${m1Str}x} + C_2 e^{${m2Str}x}`;

    steps.push({
      stepNumber: 3,
      title: 'Roots of Auxiliary Equation (Case 1: Real & Distinct)',
      arabicTitle: 'حساب جذور المعادلة المساعدة (الحالة الأولى: جذور حقيقية مختلفة)',
      latex: `\\Delta = b^2 - 4ac = ${discriminant} > 0 \\implies ${rootsLatex}`,
      explanation: `Since the discriminant is positive, there are two distinct real roots m1 and m2. The fundamental solution set is {e^{m1 x}, e^{m2 x}}.`,
      arabicExplanation: `بما أن المميز موجب، توجد قيمتان حقيقيتان متميزتان للجذور، ومجموعة الحلول الأساسية المستقلة هي {e^{m1 x}, e^{m2 x}}.`,
      type: 'characteristic',
    });
  } else if (discriminant === 0) {
    const m = -b / (2 * a);
    const mStr = Number.isInteger(m) ? `${m}` : m.toFixed(2);
    rootsLatex = `m_1 = m_2 = ${mStr}`;
    yhLatex = `y_h(x) = (C_1 + C_2 x) e^{${mStr}x}`;

    steps.push({
      stepNumber: 3,
      title: 'Roots of Auxiliary Equation (Case 2: Repeated Real Root)',
      arabicTitle: 'حساب جذور المعادلة المساعدة (الحالة الثانية: جذر حقيقي مكرر)',
      latex: `\\Delta = b^2 - 4ac = 0 \\implies ${rootsLatex}`,
      explanation: `Repeated root case requires multiplying by x to ensure linear independence: {e^{mx}, x e^{mx}}.`,
      arabicExplanation: `في حالة الجذر المكرر، نضرب الحد الثاني في x لضمان الاستقلال الخطي وفقاً لمحدد فرونسكي.`,
      type: 'characteristic',
    });
  } else {
    const alpha = -b / (2 * a);
    const beta = Math.sqrt(-discriminant) / (2 * a);
    const alphaStr = Number.isInteger(alpha) ? `${alpha}` : alpha.toFixed(2);
    const betaStr = Number.isInteger(beta) ? `${beta}` : beta.toFixed(2);
    rootsLatex = `m = ${alphaStr} \\pm ${betaStr} i \\quad (\\alpha = ${alphaStr},\\; \\beta = ${betaStr})`;

    if (alpha === 0) {
      yhLatex = `y_h(x) = C_1 \\cos(${betaStr}x) + C_2 \\sin(${betaStr}x)`;
    } else {
      yhLatex = `y_h(x) = e^{${alphaStr}x} \\left[ C_1 \\cos(${betaStr}x) + C_2 \\sin(${betaStr}x) \\right]`;
    }

    steps.push({
      stepNumber: 3,
      title: 'Roots of Auxiliary Equation (Case 3: Complex Conjugate Roots)',
      arabicTitle: 'حساب جذور المعادلة المساعدة (الحالة الثالثة: جذور مركبة مترافقة)',
      latex: `\\Delta = ${discriminant} < 0 \\implies ${rootsLatex}`,
      explanation: `Euler's formula e^{(α±iβ)x} = e^{αx}(cos βx ± i sin βx) provides two real linearly independent solutions.`,
      arabicExplanation: `باستخدام صيغة أويلر للدوال الأسية المركبة نحصل على حلول حقيقية بدلالة الجيب وجيب التمام.`,
      type: 'characteristic',
    });
  }

  // Step 4: Homogeneous Solution yh
  steps.push({
    stepNumber: 4,
    title: 'Complementary / Homogeneous General Solution',
    arabicTitle: 'الحل العام المتجانس (Complementary Solution)',
    latex: yhLatex,
    explanation: `General complementary solution formed by linear combination with arbitrary constants C1 and C2.`,
    arabicExplanation: `الحل المتجانس العام يمثل التركيبة الخطية لمجموعة الحلول الأساسية مع الثوابت الاختيارية C1 و C2.`,
    type: 'particular',
  });

  let finalSol = yhLatex.replace('y_h(x)', 'y(x)');

  if (!isHomogeneous) {
    // Undetermined coefficients note
    steps.push({
      stepNumber: 5,
      title: 'Particular Integral (y_p) & Superposition',
      arabicTitle: 'الحل الخاص (yp) ومبدأ التراكب',
      latex: `y(x) = y_h(x) + y_p(x)`,
      explanation: `For non-homogeneous driving term f(x) = ${rhs}, find yp via Method of Undetermined Coefficients or Variation of Parameters.`,
      arabicExplanation: `لإيجاد الحل الخاص yp للدالة غير المتجانسة نستخدم طريقة المعاملات غير المحددة أو طريقة لاجرانج لتغير الثوابت.`,
      type: 'particular',
    });
  } else {
    steps.push({
      stepNumber: 5,
      title: 'Final General Solution',
      arabicTitle: 'الحل العام النهائي',
      latex: finalSol,
      explanation: `Complete general solution for the homogeneous differential equation.`,
      arabicExplanation: `الحل النهائي الشامل للمعادلة التفاضلية المتجانسة.`,
      type: 'final',
    });
  }

  return {
    rawInput: raw,
    standardFormLatex: `${a === 1 ? '' : a} y'' ${b >= 0 ? '+ ' + (b === 1 ? '' : b) : '- ' + Math.abs(b)} y' ${c >= 0 ? '+ ' + (c === 1 ? '' : c) : '- ' + Math.abs(c)} y = ${rhs}`,
    order: 2,
    degree: 1,
    isLinear: true,
    odeType: isHomogeneous ? 'Second-Order Linear Homogeneous ODE' : 'Second-Order Linear Non-Homogeneous ODE',
    arabicOdeType: isHomogeneous ? 'معادلة خطية متجانسة من الرتبة الثانية بمعاملات ثابتة' : 'معادلة خطية غير متجانسة من الرتبة الثانية',
    dependentVar: 'y',
    independentVar: 'x',
    steps,
    generalSolutionLatex: finalSol,
    arabicSummary: `تم تحليل المعادلة كمعادلة خطية من الرتبة الثانية ذات معاملات ثابتة، وتحديد المميز Δ = ${discriminant} وحساب الجذور ${rootsLatex}.`,
    verificationLatex: `\\frac{d^2 y}{dx^2}, \\frac{dy}{dx} \\implies a y'' + b y' + c y \\equiv ${rhs}`,
    tags: ['Second-Order', 'Linear ODE', 'Characteristic Roots', 'Constant Coefficients'],
  };
}

function solveFirstOrderLinearODE(raw: string, norm: string): ODEAnalysisResult {
  const steps: ODESolveStep[] = [
    {
      stepNumber: 1,
      title: 'Classify First-Order Linear ODE',
      arabicTitle: 'تصنيف المعادلة كمعادلة خطية من الرتبة الأولى',
      latex: `\\frac{dy}{dx} + P(x) y = Q(x)`,
      explanation: `A first-order ODE is linear if y and its derivative y' appear with power 1 and are not multiplied together.`,
      arabicExplanation: `المعادلة خطية من الرتبة الأولى حيث تظهر y والمشتقة الأولى y' بأس 1 فقط وبدون حاصل ضرب بينهما.`,
      type: 'classification',
    },
    {
      stepNumber: 2,
      title: 'Calculate Integrating Factor I(x)',
      arabicTitle: 'حساب معامل التكامل (Integrating Factor)',
      latex: `I(x) = e^{\\int P(x)\\,dx}`,
      explanation: `The integrating factor transforms the left-hand side into the exact derivative of a product: d/dx [y · I(x)].`,
      arabicExplanation: `معامل التكامل يحول الطرف الأيسر مباشرة إلى مشتقة حاصل ضرب الدالتين: d/dx [y · I(x)].`,
      type: 'transformation',
    },
    {
      stepNumber: 3,
      title: 'Multiply through and Integrate',
      arabicTitle: 'الضرب في معامل التكامل والتكامل المباشر',
      latex: `\\frac{d}{dx}\\left[ y \\cdot I(x) \\right] = Q(x) \\cdot I(x) \\implies y \\cdot I(x) = \\int Q(x) I(x)\\,dx + C`,
      explanation: `Integrate both sides with respect to x to isolate y(x).`,
      arabicExplanation: `تكامل الطرفين بالنسبة لـ x لإيجاد الدالة المجهولة y(x).`,
      type: 'integration',
    },
    {
      stepNumber: 4,
      title: 'Final General Solution',
      arabicTitle: 'الحل العام النهائي',
      latex: `y(x) = \\frac{1}{I(x)} \\left( \\int Q(x) I(x)\\,dx + C \\right)`,
      explanation: `Divide by the integrating factor to obtain the explicit solution y(x).`,
      arabicExplanation: `القسمة على معامل التكامل I(x) للحصول على الحل العام الصريح.`,
      type: 'final',
    },
  ];

  return {
    rawInput: raw,
    standardFormLatex: `y' + P(x)y = Q(x)`,
    order: 1,
    degree: 1,
    isLinear: true,
    odeType: 'First-Order Linear Differential Equation',
    arabicOdeType: 'معادلة تفاضلية خطية من الرتبة الأولى (طريقة معامل التكامل)',
    dependentVar: 'y',
    independentVar: 'x',
    steps,
    generalSolutionLatex: `y(x) = e^{-\\int P(x)\\,dx} \\left[ \\int Q(x) e^{\\int P(x)\\,dx}\\,dx + C \\right]`,
    arabicSummary: 'معادلة تفاضلية خطية من الرتبة الأولى يتم حلها عن طريق إيجاد معامل التكامل I(x) = e^∫P dx والضرب والتكامل المباشر.',
    tags: ['First-Order', 'Linear ODE', 'Integrating Factor'],
  };
}

function solveBernoulliODE(raw: string, norm: string): ODEAnalysisResult {
  const steps: ODESolveStep[] = [
    {
      stepNumber: 1,
      title: 'Classify Bernoulli Differential Equation',
      arabicTitle: 'تصنيف معادلة برنولي غير الخطية',
      latex: `\\frac{dy}{dx} + P(x)y = Q(x) y^n \\quad (n \\ne 0, 1)`,
      explanation: `A non-linear first-order ODE characterized by the non-linear power term y^n on the right-hand side.`,
      arabicExplanation: `معادلة تفاضلية غير خطية من الرتبة الأولى لوجود الحد غير الخطي y^n في الطرف الأيمن.`,
      type: 'classification',
    },
    {
      stepNumber: 2,
      title: 'Divide by y^n and Apply Substitution',
      arabicTitle: 'القسمة على y^n وتطبيق التعويض الخطي',
      latex: `y^{-n} \\frac{dy}{dx} + P(x) y^{1-n} = Q(x) \\implies \\text{Let } z = y^{1-n}`,
      explanation: `Differentiating z with respect to x gives dz/dx = (1-n) y^{-n} dy/dx.`,
      arabicExplanation: `بتفاضل z بالنسبة لـ x نحصل على dz/dx = (1-n) y^{-n} dy/dx.`,
      type: 'transformation',
    },
    {
      stepNumber: 3,
      title: 'Transform into Linear ODE in z(x)',
      arabicTitle: 'التحويل لمعادلة خطية في المتغير الجديد z(x)',
      latex: `\\frac{dz}{dx} + (1 - n) P(x) z = (1 - n) Q(x)`,
      explanation: `This is a standard first-order linear ODE in z solved with integrating factor I(x) = e^{\\int (1-n)P dx}.`,
      arabicExplanation: `معادلة خطية قياسية في المتغير z تُحل بمعامل التكامل I(x).`,
      type: 'integration',
    },
    {
      stepNumber: 4,
      title: 'Back-Substitute to Find y(x)',
      arabicTitle: 'التعويض العكسي لإيجاد y(x)',
      latex: `y(x) = [z(x)]^{\\frac{1}{1 - n}}`,
      explanation: `Replace z with y^{1-n} to yield the final explicit or implicit general solution.`,
      arabicExplanation: `التعويض بقيمة z = y^{1-n} للوصول للحل النهائي.`,
      type: 'final',
    },
  ];

  return {
    rawInput: raw,
    standardFormLatex: `y' + P(x)y = Q(x) y^n`,
    order: 1,
    degree: 1,
    isLinear: false,
    odeType: 'Bernoulli Non-Linear Differential Equation',
    arabicOdeType: 'معادلة برنولي التفاضلية غير الخطية (التحويل z = y^{1-n})',
    dependentVar: 'y',
    independentVar: 'x',
    steps,
    generalSolutionLatex: `y(x) = \\left( \\frac{1}{I(x)} \\left[ \\int (1-n) Q(x) I(x)\\,dx + C \\right] \\right)^{\\frac{1}{1 - n}}`,
    arabicSummary: 'معادلة برنولي غير خطية تحول إلى معادلة خطية بالتعويض z = y^(1-n).',
    tags: ['Bernoulli', 'Non-linear', 'Substitution'],
  };
}

function solveExactODE(raw: string, norm: string): ODEAnalysisResult {
  const steps: ODESolveStep[] = [
    {
      stepNumber: 1,
      title: 'Differential Form & Exactness Test',
      arabicTitle: 'الصيغة التفاضلية واختبار التمام',
      latex: `M(x, y)\\,dx + N(x, y)\\,dy = 0 \\implies \\text{Test: } \\frac{\\partial M}{\\partial y} = \\frac{\\partial N}{\\partial x}`,
      explanation: `For an exact differential equation, the mixed second partial derivatives of the potential function must be equal.`,
      arabicExplanation: `المعادلة تامة إذا وفقط إذا تساوت التفاضلات الجزئية المختلطة لـ M بالنسبة لـ y و N بالنسبة لـ x.`,
      type: 'classification',
    },
    {
      stepNumber: 2,
      title: 'Construct Potential Function Ψ(x, y)',
      arabicTitle: 'بناء دالة الجهد الشاملة Ψ(x, y)',
      latex: `\\Psi(x, y) = \\int M(x, y)\\,dx + g(y) \\quad \\text{or Direct Sum of Non-Repeating Terms}`,
      explanation: `Integrate M with respect to x treating y as constant, then determine g(y) by taking ∂Ψ/∂y = N(x, y).`,
      arabicExplanation: `تكامل M بالنسبة لـ x باعتبار y ثابتاً، ثم إيجاد g(y) بمساواة المشتقة الجزئية مع N(x, y).`,
      type: 'integration',
    },
    {
      stepNumber: 3,
      title: 'General Implicit Solution',
      arabicTitle: 'الحل العام الضمني',
      latex: `\\Psi(x, y) = C`,
      explanation: `The level curves of the potential function Ψ(x, y) = C constitute the general solution.`,
      arabicExplanation: `منحنيات المستوى لدالة الجهد Ψ(x, y) = C تمثل الحل العام للمعادلة التامة.`,
      type: 'final',
    },
  ];

  return {
    rawInput: raw,
    standardFormLatex: `M(x, y)\\,dx + N(x, y)\\,dy = 0`,
    order: 1,
    degree: 1,
    isLinear: false,
    odeType: 'Exact Differential Equation (Total Derivative)',
    arabicOdeType: 'معادلة تفاضلية تامة (Exact Differential Equation)',
    dependentVar: 'y',
    independentVar: 'x',
    steps,
    generalSolutionLatex: `\\Psi(x, y) = C`,
    arabicSummary: 'معادلة تفاضلية تامة تتحقق بشرط ∂M/∂y = ∂N/∂x ويتم إيجاد دالة الجهد Ψ(x, y) = C.',
    tags: ['Exact Equation', 'Partial Derivatives', 'Potential Function'],
  };
}

function solveSeparableOrGeneralODE(raw: string, norm: string): ODEAnalysisResult {
  const steps: ODESolveStep[] = [
    {
      stepNumber: 1,
      title: 'Separation of Variables Form',
      arabicTitle: 'صيغة فصل المتغيرات',
      latex: `\\frac{dy}{dx} = g(x) \\cdot h(y) \\implies \\frac{1}{h(y)}\\,dy = g(x)\\,dx`,
      explanation: `Separate terms containing y and dy to the left-hand side, and terms with x and dx to the right-hand side.`,
      arabicExplanation: `فصل الحدود المحتوية على y و dy في الطرف الأيسر، والحدود المحتوية على x و dx في الطرف الأيمن.`,
      type: 'transformation',
    },
    {
      stepNumber: 2,
      title: 'Integrate Both Sides',
      arabicTitle: 'تكامل الطرفين بصورة مستقلة',
      latex: `\\int \\frac{1}{h(y)}\\,dy = \\int g(x)\\,dx + C`,
      explanation: `Evaluate both single-variable integrals and introduce arbitrary constant C.`,
      arabicExplanation: `إجراء تكامل كل طرف وإضافة ثابت التكامل C.`,
      type: 'integration',
    },
    {
      stepNumber: 3,
      title: 'General Solution',
      arabicTitle: 'الحل العام النهائي',
      latex: `H(y) = G(x) + C`,
      explanation: `Implicit or explicit solution relating y to x.`,
      arabicExplanation: `الحل الصريح أو الضمني الذي يربط بين y و x.`,
      type: 'final',
    },
  ];

  return {
    rawInput: raw,
    standardFormLatex: `\\frac{dy}{dx} = g(x) h(y)`,
    order: 1,
    degree: 1,
    isLinear: true,
    odeType: 'Separable Differential Equation',
    arabicOdeType: 'معادلة قابلة لفصل المتغيرات (Separable ODE)',
    dependentVar: 'y',
    independentVar: 'x',
    steps,
    generalSolutionLatex: `\\int \\frac{dy}{h(y)} = \\int g(x)\\,dx + C`,
    arabicSummary: 'معادلة تفاضلية يتم حلها بفصل المتغيرات والتكامل المباشر لكل طرف.',
    tags: ['Separable', 'First-Order', 'Direct Integration'],
  };
}
