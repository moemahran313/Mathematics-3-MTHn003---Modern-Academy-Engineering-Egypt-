import { Category, LecturePage } from '../types';

export const LECTURE_5_PAGES: LecturePage[] = [
  // =========================================================================
  // PAGE 15 (Week 5 - Page 8): Method of Variation of Parameters (Lagrange Formula)
  // =========================================================================
  {
    pageNumber: 15,
    title: 'Variation of Parameters: Lagrange Method, Wronskian & Csc(x) Forcing Function',
    arabicTitle: 'الأسبوع الخامس (٨): طريقة تغير الثوابت (Variation of Parameters) ودالة القاطع تمام (csc x)',
    topicCategory: Category.VARIATION_OF_PARAMETERS,
    summary:
      'Universal method for finding particular solutions y_P of non-homogeneous 2nd-order ODEs a y\'\' + b y\' + c y = f(x) where undetermined coefficients cannot be applied (e.g. csc x, sec x, tan x, fractions). Replaces constants C₁, C₂ with unknown functions A(x), B(x) using Wronskian formulas, illustrated by y\'\' + y = csc(x).',
    laws: [
      {
        id: 'law_variation_of_parameters_lagrange',
        name: 'Lagrange Variation of Parameters Formula',
        arabicName: 'قانون لاجرانج لتغير الثوابت (Variation of Parameters)',
        formula: 'y_P = A(x) u(x) + B(x) v(x), \\quad A(x) = \\int \\frac{-v(x) f(x)}{u v\' - v u\'} \\, dx, \\quad B(x) = \\int \\frac{u(x) f(x)}{u v\' - v u\'} \\, dx',
        explanation:
          'Given two linearly independent complementary solutions u(x) and v(x) such that y_H = C₁ u(x) + C₂ v(x), the particular integral y_P is formed by integrating quotients involving the Wronskian W(u, v) = u v\' - v u\'.',
        arabicExplanation:
          'طريقة عامة تصلح لأي دالة f(x) في الطرف الأيمن: نفرض y_P = A(x)u(x) + B(x)v(x)، حيث نحسب A و B بالتكامل مع محدد فرونسكي W = uv\' - vu\'. تذكر إشارة السالب في قانون A.',
        conditions: [
          'Ensure the coefficient of $y\'\'$ is normalized to 1 before reading $f(x)$.',
          'Wronskian $W(u, v) = u v\' - v u\' \\neq 0$.',
          'General Solution: $y_G = y_H + y_P = C_1 u(x) + C_2 v(x) + A(x) u(x) + B(x) v(x)$.',
        ],
      },
    ],
    examples: [
      {
        id: 'eg_p15_1',
        title: 'Example 1: Csc(x) Non-Homogeneous Term',
        problem: 'Solve: $y\'\' + y = \\csc(x)$',
        mathFormula: 'y\'\' + y = \\csc(x)',
        steps: [
          {
            step: 'Step 1: Solve Homogeneous Equation (y_H)',
            formula: 'y\'\' + y = 0 \\implies m^2 + 1 = 0 \\implies m = \\pm i \\implies y_H = C_1 \\cos x + C_2 \\sin x',
            explanation: 'Identify basis solutions: u(x) = cos(x) and v(x) = sin(x).',
          },
          {
            step: 'Step 2: Calculate Derivatives and Wronskian W(u, v)',
            formula: 'u\' = -\\sin x, \\; v\' = \\cos x \\implies W(u, v) = u v\' - v u\' = \\cos^2 x - (-\\sin^2 x) = \\cos^2 x + \\sin^2 x = 1',
            explanation: 'The Wronskian evaluates cleanly to 1.',
          },
          {
            step: 'Step 3: Integrate Function A(x)',
            formula: 'A(x) = \\int \\frac{-\\sin x \\cdot \\csc x}{1} \\, dx = \\int -\\sin x \\cdot \\frac{1}{\\sin x} \\, dx = \\int -1 \\, dx = -x + C',
            explanation: 'Cancel sin(x) with csc(x) to integrate a constant.',
          },
          {
            step: 'Step 4: Integrate Function B(x)',
            formula: 'B(x) = \\int \\frac{\\cos x \\cdot \\csc x}{1} \\, dx = \\int \\frac{\\cos x}{\\sin x} \\, dx = \\ln|\\sin x| + C',
            explanation: 'Standard logarithmic derivative integral since numerator is derivative of denominator.',
          },
          {
            step: 'Step 5: Assemble Particular Solution y_P',
            formula: 'y_P = A(x) u(x) + B(x) v(x) = (-x)\\cos x + (\\ln|\\sin x|)\\sin x',
            explanation: 'Multiply A(x) by cos(x) and B(x) by sin(x).',
          },
          {
            step: 'Step 6: Form Total General Solution y_G',
            formula: 'y_G = y_H + y_P = C_1 \\cos x + C_2 \\sin x - x \\cos x + \\sin x \\ln|\\sin x|',
            explanation: 'Combine complementary and particular solutions.',
          },
        ],
        finalAnswer: 'y_G = C_1 \\cos x + C_2 \\sin x - x \\cos x + \\sin x \\ln|\\sin x|',
        arabicNote: 'دالة csc(x) = 1/sin(x) لا يمكن حلها بالمعاملات غير المحددة، فطريقة تغير الثوابت هي الطريقة الإجبارية. تكامل A بسيط (-x) وتكامل B يعطي ln|sin x|.',
      },
    ],
    examTricks: [
      '⚠️ Remember the minus sign in A(x): $A = \\int \\frac{-v f(x)}{W} dx$, while $B = \\int \\frac{+u f(x)}{W} dx$.',
      '💡 Simplification shortcut: Whenever $u = \\cos x$ and $v = \\sin x$, the denominator $u v\' - v u\' = \\cos^2 x + \\sin^2 x = 1$.',
    ],
  },

  // =========================================================================
  // PAGE 16 (Week 5 - Page 9): Variation of Parameters for sec(x)tan(x) and 1/(1+e^{2x})
  // =========================================================================
  {
    pageNumber: 16,
    title: 'Variation of Parameters: Trigonometric Products (sec x tan x) & Exponential Rational Fractions',
    arabicTitle: 'الأسبوع الخامس (٩): حاصل ضرب الدوال المثلثية (sec x tan x) والكسور الأسية 1/(1+e^{2x})',
    topicCategory: Category.VARIATION_OF_PARAMETERS,
    summary:
      'Detailed evaluations of variation of parameters for complex driving functions. Solving y\'\' + y = sec(x)tan(x) using tan²(x) = sec²(x) - 1, and y\'\' - y = 1/(1+e^{2x}) with Wronskian W = -2 and inverse tangent substitution.',
    laws: [
      {
        id: 'law_variation_general_procedure',
        name: 'Variation of Parameters Systematic Steps',
        arabicName: 'خطوات حل طريقة تغير الثوابت',
        formula: '\\begin{aligned} 1.& \\text{ Find } y_H = C_1 u + C_2 v \\\\ 2.& \\text{ Compute } W(u, v) = u v\' - v u\' \\\\ 3.& A(x) = -\\int \\frac{v f(x)}{W} dx, \\quad B(x) = \\int \\frac{u f(x)}{W} dx \\\\ 4.& y_G = y_H + A(x)u + B(x)v \\end{aligned}',
        explanation:
          'Universal 4-step algorithm applicable to any linear 2nd-order differential equation.',
        arabicExplanation:
          'أربع خطوات ثابتة: إيجاد u و v من الحل المتجانس، حساب محدد فرونسكي W، تكامل A و B، وتركيب الحل العام y_G.',
      },
    ],
    examples: [
      {
        id: 'eg_p16_1',
        title: 'Example 2: sec(x)tan(x) Source Term',
        problem: 'Solve: $y\'\' + y = \\sec(x)\\tan(x)$',
        mathFormula: 'y\'\' + y = \\sec(x)\\tan(x)',
        steps: [
          {
            step: 'Step 1: Solve Homogeneous Equation',
            formula: 'y\'\' + y = 0 \\implies m^2 + 1 = 0 \\implies m = \\pm i \\implies y_H = C_1 \\cos x + C_2 \\sin x',
            explanation: 'u(x) = cos(x), v(x) = sin(x), with W = cos²x + sin²x = 1.',
          },
          {
            step: 'Step 2: Compute Function A(x)',
            formula: 'A(x) = \\int \\frac{-\\sin x \\cdot \\sec x \\tan x}{1} \\, dx = -\\int \\frac{\\sin^2 x}{\\cos^2 x} \\, dx = -\\int \\tan^2 x \\, dx = -\\int (\\sec^2 x - 1) \\, dx = -\\tan x + x + C',
            explanation: 'Convert tan²(x) to sec²(x) - 1, then integrate directly.',
          },
          {
            step: 'Step 3: Compute Function B(x)',
            formula: 'B(x) = \\int \\frac{\\cos x \\cdot \\sec x \\tan x}{1} \\, dx = \\int \\tan x \\, dx = \\int \\frac{\\sin x}{\\cos x} \\, dx = -\\ln|\\cos x| + C',
            explanation: 'cos(x)sec(x) = 1, leaving simple integral of tan(x).',
          },
          {
            step: 'Step 4: Form Particular and General Solution',
            formula: 'y_P = (-\\tan x + x)\\cos x + (-\\ln|\\cos x|)\\sin x = -\\sin x + x \\cos x - \\sin x \\ln|\\cos x|',
            explanation: 'Notice that -sin(x) can be absorbed into C₂ sin(x) in the general solution.',
          },
          {
            step: 'Step 5: Write General Solution y_G',
            formula: 'y_G = C_1 \\cos x + C_2 \\sin x + x \\cos x - \\sin x \\ln|\\cos x|',
            explanation: 'Superposition general solution.',
          },
        ],
        finalAnswer: 'y_G = C_1 \\cos x + C_2 \\sin x + x \\cos x - \\sin x \\ln|\\cos x|',
        arabicNote: 'تكامل tan²(x) يتم بتحويله إلى sec²(x) - 1 ليعطي tan(x) - x، وتكامل tan(x) يعطي -ln|cos x|.',
      },
      {
        id: 'eg_p16_2',
        title: 'Example 3: Rational Exponential Fraction 1/(1 + e^{2x})',
        problem: 'Solve: $y\'\' - y = \\frac{1}{1 + e^{2x}}$',
        mathFormula: 'y\'\' - y = \\frac{1}{1 + e^{2x}}',
        steps: [
          {
            step: 'Step 1: Solve Homogeneous Part (y_H)',
            formula: 'y\'\' - y = 0 \\implies m^2 - 1 = 0 \\implies m = \\pm 1 \\implies y_H = C_1 e^x + C_2 e^{-x}',
            explanation: 'u(x) = e^x, v(x) = e^{-x}.',
          },
          {
            step: 'Step 2: Calculate Wronskian W(u, v)',
            formula: 'u\' = e^x, \\; v\' = -e^{-x} \\implies W(u, v) = e^x(-e^{-x}) - e^{-x}(e^x) = -1 - 1 = -2',
            explanation: 'Wronskian is constant -2.',
          },
          {
            step: 'Step 3: Compute Function B(x)',
            formula: 'B(x) = \\int \\frac{e^x \\cdot \\frac{1}{1 + e^{2x}}}{-2} \\, dx = -\\frac{1}{2} \\int \\frac{e^x}{1 + (e^x)^2} \\, dx = -\\frac{1}{2}\\tan^{-1}(e^x) + C',
            explanation: 'Recognize derivative of inverse tangent with substitution t = e^x, dt = e^x dx.',
          },
          {
            step: 'Step 4: Compute Function A(x)',
            formula: 'A(x) = \\int \\frac{-e^{-x} \\cdot \\frac{1}{1 + e^{2x}}}{-2} \\, dx = \\frac{1}{2} \\int \\frac{e^{-x}}{1 + e^{2x}} \\, dx = -\\frac{1}{2}e^{-x} + \\frac{1}{2}\\tan^{-1}(e^{-x}) + C',
            explanation: 'Using substitution or algebraic manipulation.',
          },
          {
            step: 'Step 5: Form General Solution',
            formula: 'y_G = y_H + y_P = C_1 e^x + C_2 e^{-x} + A(x)e^x + B(x)e^{-x}',
            explanation: 'Complete general solution.',
          },
        ],
        finalAnswer: 'y_G = C_1 e^x + C_2 e^{-x} + A(x)e^x - \\frac{1}{2}e^{-x}\\tan^{-1}(e^x)',
        arabicNote: 'حساب محدد فرونسكي للدوال الأسية e^x و e^(-x) يعطي -2. تكامل B هو تكامل قياسي للظل العكسي tan⁻¹(e^x).',
      },
    ],
    examTricks: [
      '📌 Standard integral alert: $\\int \\frac{e^x}{1 + (e^x)^2} dx = \\tan^{-1}(e^x)$.',
      '📌 Trig identity: Always replace $\\tan^2 x$ by $\\sec^2 x - 1$ when integrating.',
    ],
  },

  // =========================================================================
  // PAGE 17 (Week 5 - Page 10): Euler-Cauchy Differential Equations & Theta Operator
  // =========================================================================
  {
    pageNumber: 17,
    title: 'Cauchy-Euler Equations: Logarithmic Substitution x = e^t & Differential Operator θ = d/dt',
    arabicTitle: 'الأسبوع الخامس (١٠): معادلة أويلر التفاضلية، والتحويل x = e^t، والمؤثر التفاضلي θ',
    topicCategory: Category.HIGHER_ORDER_HOMOGENEOUS,
    summary:
      'Theory and transformation for Euler-Cauchy equidimensional differential equations a₀ xⁿ y^{(n)} + a₁ x^{n-1} y^{(n-1)} + ... + aₙ y = f(x). Setting x = e^t (t = ln x) transforms variable-coefficient ODEs into constant-coefficient ODEs using the differential operator θ = d/dt, where x y\' = θ y and x² y\'\' = θ(θ - 1)y.',
    laws: [
      {
        id: 'law_euler_cauchy_definition',
        name: 'Euler-Cauchy General Form & Substitution',
        arabicName: 'الصيغة العامة لمعادلة أويلر والتحويل الأساسي',
        formula: 'a_0 x^n y^{(n)} + a_1 x^{n-1} y^{(n-1)} + \\dots + a_n y = f(x) \\implies \\text{Let } x = e^t \\iff t = \\ln x',
        explanation:
          'In Euler equations, the power of x matches the order of the derivative in every term. The transformation x = e^t transforms derivatives with respect to x into derivatives with respect to t with constant coefficients.',
        arabicExplanation:
          'معادلة أويلر تتميز بأن قوة x تساوي رتبة التفاضل المضروب فيها (x² y\'\' و x y\'). بالتعويض x = e^t (أي t = ln x) تتحول إلى معادلة ذات معاملات ثابتة تماماً.',
      },
      {
        id: 'law_theta_operator_substitutions',
        name: 'The Differential Operator θ = d/dt Transformation Table',
        arabicName: 'جدول تحويلات المؤثر التفاضلي θ = d/dt',
        formula: '\\begin{aligned} \\theta &= \\frac{d}{dt} \\\\ x y\' &= \\theta y \\\\ x^2 y\'\' &= \\theta(\\theta - 1)y = (\\theta^2 - \\theta)y \\\\ x^3 y\'\'\' &= \\theta(\\theta - 1)(\\theta - 2)y \\\\ x^n y^{(n)} &= \\theta(\\theta - 1)(\\theta - 2)\\dots(\\theta - n + 1)y \\end{aligned}',
        explanation:
          'Substitute powers of x times derivatives by corresponding polynomials in operator θ. The resulting ODE in variable t has constant coefficients and can be solved by auxiliary equations.',
        arabicExplanation:
          'نستبدل كل حد بمكافئه: x y\' بـ θy، و x² y\'\' بـ θ(θ-1)y = (θ² - θ)y، لتتحول إلى معادلة ذات معاملات ثابتة في المتغير t.',
      },
    ],
    examples: [
      {
        id: 'eg_p17_1',
        title: 'Example 1: Euler ODE with Sine-Log Source x²y\'\' + xy\' + 9y = sin(ln x³)',
        problem: 'Solve: $x^2 y\'\' + xy\' + 9y = \\sin(\\ln x^3)$',
        mathFormula: 'x^2 y\'\' + xy\' + 9y = \\sin(3\\ln x)',
        steps: [
          {
            step: 'Step 1: Apply Euler Substitution x = e^t (t = ln x)',
            formula: 'x = e^t \\implies \\ln(x^3) = 3\\ln x = 3t \\implies f(t) = \\sin(3t)',
            explanation: 'Convert RHS to function of t.',
          },
          {
            step: 'Step 2: Transform LHS using θ Operator',
            formula: 'x^2 y\'\' + xy\' + 9y = [\\theta(\\theta - 1) + \\theta + 9]y = (\\theta^2 - \\theta + \\theta + 9)y = (\\theta^2 + 9)y',
            explanation: 'The equation simplifies to (θ² + 9)y = sin(3t).',
          },
          {
            step: 'Step 3: Solve Homogeneous Part in t',
            formula: 'm^2 + 9 = 0 \\implies m = \\pm 3i \\implies y_H(t) = C_1 \\cos(3t) + C_2 \\sin(3t)',
            explanation: 'Roots are purely imaginary ±3i.',
          },
          {
            step: 'Step 4: Solve Particular Solution (Notebook working variant)',
            formula: 'y_P(t) = -\\frac{1}{8}\\sin(3t) - \\frac{1}{24}\\cos(3t)',
            explanation: 'Determined using method of undetermined coefficients in variable t.',
          },
          {
            step: 'Step 5: Substitute Back t = ln(x) for General Solution',
            formula: 'y_G(x) = y_H(\\ln x) + y_P(\\ln x)',
            explanation: 'Always replace t with ln(x) at the final step to return to the original independent variable x.',
          },
        ],
        finalAnswer: 'y_G(t) = y_H(t) + y_P(t) \\xrightarrow{t = \\ln x} y_G(x)',
        arabicNote: 'تحويل أويلر x = e^t يحول sin(ln x³) إلى sin(3t) مباشرة، والمؤثر θ يلغي الحدود المتشابهة لتصبح المعادلة بسيطة.',
      },
    ],
    examTricks: [
      '🔥 Don\'t forget to substitute back: Always replace $t = \\ln x$ and $e^t = x$ at the very end of your solution!',
      '⚡ Euler quick check: $x^2 y\'\' \\to \\theta(\\theta - 1) = \\theta^2 - \\theta$. Never write just $\\theta^2$!',
    ],
  },

  // =========================================================================
  // PAGE 18 (Week 5 - Page 11): Euler-Cauchy Solved Examples with ln(x) and Polynomial-Log Terms
  // =========================================================================
  {
    pageNumber: 18,
    title: 'Cauchy-Euler ODEs: Logarithmic Source 4ln(x) & Product Source 4x³ln(x)',
    arabicTitle: 'الأسبوع الخامس (١١): مسائل أويلر مع الطرف الأيمن اللوغاريتمي 4ln(x) وحاصل الضرب 4x³ln(x)',
    topicCategory: Category.HIGHER_ORDER_HOMOGENEOUS,
    summary:
      'Step-by-step solutions for Euler differential equations with logarithmic driving terms. Solving x²y\'\' + 2xy\' - 8y = 4ln(x) resulting in polynomial trial form in t, and x²y\'\' + xy\' - y = 4x³ln(x) requiring exponential-polynomial trial form (a₀ + a₁t)e^{3t}.',
    laws: [
      {
        id: 'law_euler_rhs_transformations',
        name: 'Euler RHS Driving Term Transformations Table',
        arabicName: 'جدول تحويلات الطرف الأيمن في معادلات أويلر',
        formula: '\\begin{aligned} \\ln(x) &\\implies t \\\\ \\ln(x^k) &\\implies k t \\\\ x^k &\\implies e^{k t} \\\\ x^k \\ln(x) &\\implies t e^{k t} \\\\ \\sin(\\ln x) &\\implies \\sin(t) \\end{aligned}',
        explanation:
          'Under x = e^t (t = ln x), powers of x become exponentials in t, and logarithms become polynomials in t.',
        arabicExplanation:
          'كل ln(x) تتحول إلى t، وكل x^k تتحول إلى e^(kt)، وحاصل الضرب x³ ln(x) يتحول إلى t e^(3t).',
      },
    ],
    examples: [
      {
        id: 'eg_p18_1',
        title: 'Example 2: Euler ODE with Logarithmic Source x²y\'\' + 2xy\' - 8y = 4ln(x)',
        problem: 'Solve: $x^2 y\'\' + 2xy\' - 8y = 4\\ln x$',
        mathFormula: 'x^2 y\'\' + 2xy\' - 8y = 4\\ln x',
        steps: [
          {
            step: 'Step 1: Substitute x = e^t (t = ln x)',
            formula: 'x^2 y\'\' \\to \\theta(\\theta - 1)y, \\quad 2xy\' \\to 2\\theta y, \\quad 4\\ln x \\to 4t',
            explanation: 'Convert to constant coefficient ODE in t: [θ(θ - 1) + 2θ - 8]y = 4t.',
          },
          {
            step: 'Step 2: Simplify Operator and Solve Homogeneous Part',
            formula: '(\\theta^2 + \\theta - 8)y = 4t \\implies m^2 + m - 8 = 0 \\implies m = -\\frac{1}{2} \\pm \\frac{\\sqrt{31}}{2}i',
            explanation: 'Complex roots give y_H(t) = e^{-\\frac{1}{2}t}[C_1 \\cos(\\frac{\\sqrt{31}}{2}t) + C_2 \\sin(\\frac{\\sqrt{31}}{2}t)].',
          },
          {
            step: 'Step 3: Propose Particular Trial Solution y_P(t)',
            formula: 'f(t) = 4t \\implies y_P = a_0 + a_1 t \\implies y_P\' = a_1, \\; y_P\'\' = 0',
            explanation: 'Since f(t) is linear polynomial in t, assume full 1st degree polynomial.',
          },
          {
            step: 'Step 4: Substitute into (θ² + θ - 8)y = 4t and Equate Coefficients',
            formula: '0 + a_1 - 8(a_0 + a_1 t) = 4t \\implies -8a_1 t + (a_1 - 8a_0) = 4t',
            explanation: 'Equating coefficients gives -8a₁ = 4 ⇒ a₁ = -1/2, and a₁ - 8a₀ = 0 ⇒ -1/2 - 8a₀ = 0 ⇒ a₀ = -1/16.',
          },
          {
            step: 'Step 5: Write y_P and General Solution in t',
            formula: 'y_P(t) = -\\frac{1}{16} - \\frac{1}{2}t \\implies y_G(t) = e^{-\\frac{1}{2}t}\\left[C_1 \\cos\\left(\\frac{\\sqrt{31}}{2}t\\right) + C_2 \\sin\\left(\\frac{\\sqrt{31}}{2}t\\right)\\right] - \\frac{1}{16} - \\frac{1}{2}t',
            explanation: 'Combine complementary and particular solutions.',
          },
          {
            step: 'Step 6: Back-Substitute t = ln(x) for Final Answer in x',
            formula: 'y_G(x) = x^{-\\frac{1}{2}}\\left[C_1 \\cos\\left(\\frac{\\sqrt{31}}{2}\\ln x\\right) + C_2 \\sin\\left(\\frac{\\sqrt{31}}{2}\\ln x\\right)\\right] - \\frac{1}{16} - \\frac{1}{2}\\ln x',
            explanation: 'Using e^{-\\frac{1}{2}t} = (e^t)^{-1/2} = x^{-1/2}.',
          },
        ],
        finalAnswer: 'y_G(x) = x^{-\\frac{1}{2}}\\left[C_1 \\cos\\left(\\frac{\\sqrt{31}}{2}\\ln x\\right) + C_2 \\sin\\left(\\frac{\\sqrt{31}}{2}\\ln x\\right)\\right] - \\frac{1}{16} - \\frac{1}{2}\\ln x',
        arabicNote: 'تحول الطرف الأيمن 4ln(x) إلى 4t، فنفرض y_P = a₀ + a₁t ونساوي المعاملات لنحصل على a₁ = -1/2 و a₀ = -1/16.',
      },
      {
        id: 'eg_p18_2',
        title: 'Example 3: Euler ODE with Product Source x²y\'\' + xy\' - y = 4x³ln(x)',
        problem: 'Solve: $x^2 y\'\' + xy\' - y = 4x^3 \\ln x$',
        mathFormula: 'x^2 y\'\' + xy\' - y = 4x^3 \\ln x',
        steps: [
          {
            step: 'Step 1: Substitute x = e^t (t = ln x)',
            formula: 'x^2 y\'\' \\to \\theta(\\theta - 1)y, \\quad xy\' \\to \\theta y, \\quad 4x^3 \\ln x \\to 4(e^t)^3 t = 4t e^{3t}',
            explanation: 'Transforms into [θ(θ - 1) + θ - 1]y = 4t e^{3t} ⇒ (θ² - 1)y = 4t e^{3t}.',
          },
          {
            step: 'Step 2: Solve Homogeneous Part (y_H)',
            formula: 'm^2 - 1 = 0 \\implies m = \\pm 1 \\implies y_H(t) = C_1 e^t + C_2 e^{-t} = C_1 x + C_2 x^{-1}',
            explanation: 'Distinct real roots m = 1, -1.',
          },
          {
            step: 'Step 3: Propose Particular Trial Solution y_P(t)',
            formula: 'f(t) = 4t e^{3t} \\implies y_P(t) = (a_0 + a_1 t)e^{3t} = a_0 e^{3t} + a_1 t e^{3t}',
            explanation: 'Since m = 3 is not a root of m² - 1 = 0, no modification/resonance factor is needed.',
          },
          {
            step: 'Step 4: Differentiate and Substitute into (θ² - 1)y = 4t e^{3t}',
            formula: 'y_P\'\' - y_P = (9a_0 e^{3t} + 6a_1 e^{3t} + 9a_1 t e^{3t}) - (a_0 e^{3t} + a_1 t e^{3t}) = (8a_0 + 6a_1)e^{3t} + 8a_1 t e^{3t}',
            explanation: 'Group like terms in te^{3t} and e^{3t}.',
          },
          {
            step: 'Step 5: Equate Coefficients',
            formula: '\\begin{cases} [t e^{3t}]: & 8a_1 = 4 \\implies a_1 = \\frac{1}{2} \\\\ [e^{3t}]: & 8a_0 + 6a_1 = 0 \\implies 8a_0 + 6\\left(\\frac{1}{2}\\right) = 0 \\implies 8a_0 = -3 \\implies a_0 = -\\frac{3}{8} \\end{cases}',
            explanation: 'Gives y_P(t) = (-3/8 + 1/2 t)e^{3t}.',
          },
          {
            step: 'Step 6: Back-Substitute t = ln(x) for General Solution in x',
            formula: 'y_G(x) = C_1 x + C_2 x^{-1} + \\left(-\\frac{3}{8} + \\frac{1}{2}\\ln x\\right)x^3',
            explanation: 'Using e^{3t} = x³ and e^{\\pm t} = x^{\\pm 1}.',
          },
        ],
        finalAnswer: 'y_G(x) = C_1 x + C_2 x^{-1} + \\left(-\\frac{3}{8} + \\frac{1}{2}\\ln x\\right)x^3',
        arabicNote: 'الطرف الأيمن 4x³ ln(x) يتحول إلى 4t e^(3t). الحل الخاص يفرض بـ (a₀ + a₁t)e^(3t) لنحصل على a₁ = 1/2 و a₀ = -3/8.',
      },
    ],
    examTricks: [
      '💡 Convert powers of x before choosing y_P: $4x^3 \\ln x = 4(e^t)^3 t = 4t e^{3t}$. Then solve as standard undetermined coefficients in $t$.',
      '📌 Final replacement: Replace $e^t \\to x$, $e^{-t} \\to x^{-1}$, $e^{3t} \\to x^3$, and $t \\to \\ln x$.',
    ],
  },
];
