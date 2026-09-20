import { Category, LecturePage } from '../types';

export const LECTURE_2_PAGES: LecturePage[] = [
  // =========================================================================
  // PAGE 5: First-Order ODEs — [4] Exact Equations
  // =========================================================================
  {
    pageNumber: 5,
    title: 'First-Order ODEs: [4] Exact Differential Equations',
    arabicTitle: 'الأسبوع الثاني (٥): معادلات الرتبة الأولى — رابعاً: المعادلات التامة (Exact Equations)',
    topicCategory: Category.EXACT_EQUATIONS,
    summary:
      'Exact differential equations in the standard differential form M(x,y) dx + N(x,y) dy = 0. Testing exactness via Euler condition My = Nx, and computing the potential function F(x,y) = C by integrating M with respect to x and N with respect to y.',
    laws: [
      {
        id: 'law_exact_test',
        name: 'Euler Exactness Condition Law',
        arabicName: 'قانون شرط التمام (Exactness Test)',
        formula: 'M(x,y)\\,dx + N(x,y)\\,dy = 0 \\iff M_y = N_x \\quad \\left(\\frac{\\partial M}{\\partial y} = \\frac{\\partial N}{\\partial x}\\right)',
        explanation:
          'A first-order differential form M dx + N dy = 0 is exact if and only if the partial derivative of M with respect to y equals the partial derivative of N with respect to x.',
        arabicExplanation:
          'تكون المعادلة تامة إذا وفقط إذا كانت المشتقة الجزئية لـ M بالنسبة لـ y تساوي المشتقة الجزئية لـ N بالنسبة لـ x.',
        conditions: [
          'Identify $M(x,y)$ as the term multiplying $dx$.',
          'Identify $N(x,y)$ as the term multiplying $dy$.',
          'Calculate $M_y = \\frac{\\partial M}{\\partial y}$ (treat $x$ as constant).',
          'Calculate $N_x = \\frac{\\partial N}{\\partial x}$ (treat $y$ as constant).',
          'If $M_y = N_x$, the ODE is Exact.',
        ],
      },
      {
        id: 'law_exact_solution',
        name: 'Exact ODE Solution Method',
        arabicName: 'طريقة حل المعادلة التامة',
        formula: 'F(x,y) = \\int M(x,y)\\,dx + \\int \\left( \\text{terms in } N \\text{ without } x \\right) dy = C',
        explanation:
          'Integrate M with respect to x (y constant) and integrate N with respect to y (x constant). Combine the results without repeating identical duplicate terms, and set equal to constant C.',
        arabicExplanation:
          'نكامل ① ∫ M dx (مع اعتبار y ثابت) و ② ∫ N dy (مع اعتبار x ثابت) ثم نجمع الحدود الناتجة بدون تكرار ونساويها بالثابت C.',
      },
    ],
    examples: [
      {
        id: 'eg_p5_1',
        title: 'Example 1: Polynomial Exact ODE',
        problem: 'Solve: $(y^2 + x^2)\\,dx + 2xy\\,dy = 0$',
        mathFormula: '(y^2 + x^2)\\,dx + 2xy\\,dy = 0',
        steps: [
          {
            step: 'Step 1: Identify M and N',
            formula: 'M = y^2 + x^2, \\quad N = 2xy',
            explanation: 'M is the coefficient of dx, and N is the coefficient of dy.',
          },
          {
            step: 'Step 2: Test for Exactness',
            formula: 'M_y = \\frac{\\partial}{\\partial y}(y^2 + x^2) = 2y, \\quad N_x = \\frac{\\partial}{\\partial x}(2xy) = 2y',
            explanation: 'Since My = Nx = 2y, the equation is Exact.',
          },
          {
            step: 'Step 3: Integrate M with respect to x',
            formula: '① \\int (y^2 + x^2)\\,dx = y^2 x + \\frac{x^3}{3}',
            explanation: 'Treat y as a constant while integrating with respect to x.',
          },
          {
            step: 'Step 4: Integrate N with respect to y',
            formula: '② \\int 2xy\\,dy = x y^2',
            explanation: 'Treat x as a constant while integrating with respect to y.',
          },
          {
            step: 'Step 5: Combine terms without duplicates',
            formula: 'y^2 x + \\frac{x^3}{3} = C',
            explanation: 'The term x y² appears in both integrals, so write it once.',
          },
        ],
        finalAnswer: 'y^2 x + \\frac{x^3}{3} = C',
        arabicNote: 'الحد y²x مكرر في ناتجي التكاملين، نكتبه مرة واحدة فقط مع باقي الحدود.',
      },
      {
        id: 'eg_p5_2',
        title: 'Example 2: Logarithmic Exact ODE',
        problem: 'Solve: $2x\\ln y\\,dx + \\frac{x^2}{y}\\,dy = 0$',
        mathFormula: '2x\\ln y\\,dx + \\frac{x^2}{y}\\,dy = 0',
        steps: [
          {
            step: 'Step 1: Identify M and N',
            formula: 'M = 2x\\ln y, \\quad N = \\frac{x^2}{y}',
            explanation: 'M multiplies dx and N multiplies dy.',
          },
          {
            step: 'Step 2: Test for Exactness',
            formula: 'M_y = 2x \\left(\\frac{1}{y}\\right) = \\frac{2x}{y}, \\quad N_x = \\frac{2x}{y}',
            explanation: 'My = Nx = 2x/y, so the ODE is Exact.',
          },
          {
            step: 'Step 3: Integrate M with respect to x',
            formula: '① \\int 2x\\ln y\\,dx = x^2\\ln y',
            explanation: 'Treat ln(y) as a constant multiplier.',
          },
          {
            step: 'Step 4: Integrate N with respect to y',
            formula: '② \\int \\frac{x^2}{y}\\,dy = x^2\\ln y',
            explanation: 'Treat x² as a constant multiplier.',
          },
          {
            step: 'Step 5: Combine unique terms',
            formula: 'x^2\\ln y = C',
            explanation: 'Both integrals yield x² ln(y).',
          },
        ],
        finalAnswer: 'x^2\\ln y = C',
        arabicNote: 'تفاضل ln(y) بالنسبة لـ y هو 1/y، وتكامل 1/y بالنسبة لـ y هو ln(y).',
      },
      {
        id: 'eg_p5_3',
        title: 'Example 3: Trigonometric Tangent & Secant Exact ODE',
        problem: 'Solve: $(2xy - \\tan y)\\,dx + (x^2 - x\\sec^2 y)\\,dy = 0$',
        mathFormula: '(2xy - \\tan y)\\,dx + (x^2 - x\\sec^2 y)\\,dy = 0',
        steps: [
          {
            step: 'Step 1: Identify M and N',
            formula: 'M = 2xy - \\tan y, \\quad N = x^2 - x\\sec^2 y',
            explanation: 'M multiplies dx, N multiplies dy.',
          },
          {
            step: 'Step 2: Test for Exactness',
            formula: 'M_y = 2x - \\sec^2 y, \\quad N_x = 2x - \\sec^2 y',
            explanation: 'My = Nx = 2x - sec²(y) -> Exact!',
          },
          {
            step: 'Step 3: Integrate M with respect to x',
            formula: '① \\int (2xy - \\tan y)\\,dx = x^2 y - x\\tan y',
            explanation: 'Treat y and tan(y) as constants.',
          },
          {
            step: 'Step 4: Integrate N with respect to y',
            formula: '② \\int (x^2 - x\\sec^2 y)\\,dy = x^2 y - x\\tan y',
            explanation: 'Recall ∫ sec²(y) dy = tan(y).',
          },
          {
            step: 'Step 5: Write final general solution',
            formula: 'x^2 y - x\\tan y = C',
            explanation: 'Combine the matching expressions.',
          },
        ],
        finalAnswer: 'x^2 y - x\\tan y = C',
        arabicNote: 'مشتقة tan(y) هي sec²(y)، وتكامل sec²(y) هو tan(y).',
      },
      {
        id: 'eg_p5_4',
        title: 'Example 4: Exponential Exact ODE',
        problem: 'Solve: $(2x + e^y)\\,dx + (x e^y)\\,dy = 0$',
        mathFormula: '(2x + e^y)\\,dx + (x e^y)\\,dy = 0',
        steps: [
          {
            step: 'Step 1: Identify M and N',
            formula: 'M = 2x + e^y, \\quad N = x e^y',
            explanation: 'Check coefficients of dx and dy.',
          },
          {
            step: 'Step 2: Test for Exactness',
            formula: 'M_y = e^y, \\quad N_x = e^y \\implies M_y = N_x \\quad (\\text{Exact})',
            explanation: 'Partial derivative of 2x + eʸ with respect to y is eʸ. Partial of x eʸ with respect to x is eʸ.',
          },
          {
            step: 'Step 3: Integrate M with respect to x',
            formula: '① \\int (2x + e^y)\\,dx = x^2 + x e^y',
            explanation: 'Integral of 2x is x², integral of constant eʸ is x eʸ.',
          },
          {
            step: 'Step 4: Integrate N with respect to y',
            formula: '② \\int (x e^y)\\,dy = x e^y',
            explanation: 'Treat x as constant, integral of eʸ is eʸ.',
          },
          {
            step: 'Step 5: Combine unique terms',
            formula: 'x^2 + x e^y = C',
            explanation: 'Union of terms from both integrals gives x² + x eʸ = C.',
          },
        ],
        finalAnswer: 'x^2 + x e^y = C',
        arabicNote: 'تكامل e^y بالنسبة لـ x هو x e^y، وتكامل x e^y بالنسبة لـ y هو x e^y.',
      },
    ],
    examTricks: [
      'Partial derivative reminder: When differentiating with respect to y, treat x as an absolute constant (d/dy of 2x is 0).',
      'Union rule: Do not add identical duplicate terms when combining ∫ M dx and ∫ N dy — write duplicates only once!',
      'Sign trap: Always make sure the ODE is in standard form M dx + N dy = 0 before extracting M and N (watch out for negative signs!).',
    ],
  },

  // =========================================================================
  // PAGE 6: First-Order ODEs — [5] Linear Equations
  // =========================================================================
  {
    pageNumber: 6,
    title: 'First-Order ODEs: [5] Linear Differential Equations',
    arabicTitle: 'الأسبوع الثاني (٦): معادلات الرتبة الأولى — خامساً: المعادلات الخطية (Linear Equations)',
    topicCategory: Category.LINEAR_FIRST_ORDER,
    summary:
      'First-order linear ODEs in standard form y\' + P(x)y = q(x). Finding the integrating factor M(x) = exp(∫ P(x) dx) and using the closed-form general solution y = (1/M(x)) [ ∫ M(x) q(x) dx + C ]. Applying Tabular Integration (DI method) for polynomial-exponential products.',
    laws: [
      {
        id: 'law_linear_first_order',
        name: 'First-Order Linear ODE Standard Form & Integrating Factor',
        arabicName: 'قانون الصورة القياسية وعامل التكامل للمعادلة الخطية',
        formula: 'y\' + P(x)y = q(x) \\implies M(x) = e^{\\int P(x)\\,dx}',
        explanation:
          'Before applying the integrating factor, the coefficient of y\' MUST be 1. If not, divide the entire equation by the coefficient of y\'.',
        arabicExplanation:
          'الصورة القياسية تشترط أن يكون معامل y\' مساوياً 1. عامل التكامل M(x) هو e مرفوعة لتكامل P(x).',
        conditions: [
          'Ensure coefficient of $y\'$ is $1$.',
          'Identify $P(x)$ (the coefficient multiplying $y$, including its sign!).',
          'Identify $q(x)$ (the right-hand side function of $x$).',
          'Compute $M(x) = e^{\\int P(x) dx}$.',
        ],
      },
      {
        id: 'law_linear_general_solution',
        name: 'Linear ODE General Solution Formula',
        arabicName: 'قانون الحل العام للمعادلة الخطية',
        formula: 'y = \\frac{1}{M(x)} \\left[ \\int M(x) \\cdot q(x)\\,dx + C \\right]',
        explanation:
          'Multiply the integrating factor M(x) by q(x), integrate with respect to x, add the arbitrary constant C inside the bracket, and multiply the entire expression by 1/M(x).',
        arabicExplanation:
          'الحل العام هو مقلوب عامل التكامل مضروباً في [ تكامل حاصل ضرب M(x) في q(x) + ثابت التكامل C ].',
      },
    ],
    examples: [
      {
        id: 'eg_p6_1',
        title: 'Example 1: Linear ODE with Tabular Integration (DI Method)',
        problem: 'Solve: $y\' - 4y = 2x - 4x^2$',
        mathFormula: 'y\' - 4y = 2x - 4x^2',
        steps: [
          {
            step: 'Step 1: Identify P(x) and q(x)',
            formula: 'P(x) = -4, \\quad q(x) = 2x - 4x^2',
            explanation: 'The equation is already in standard form y\' + P(x)y = q(x).',
          },
          {
            step: 'Step 2: Calculate Integrating Factor M(x)',
            formula: 'M(x) = e^{\\int P(x)\\,dx} = e^{\\int -4\\,dx} = e^{-4x}',
            explanation: 'Integrate -4 dx to get -4x.',
          },
          {
            step: 'Step 3: Setup General Solution Formula',
            formula: 'y = \\frac{1}{M(x)} \\left[ \\int M(x) \\cdot q(x)\\,dx + C \\right] = \\frac{1}{e^{-4x}} \\left[ \\int e^{-4x}(2x - 4x^2)\\,dx + C \\right]',
            explanation: 'Substitute M(x) = e⁻⁴ˣ and q(x) = 2x - 4x².',
          },
          {
            step: 'Step 4: Tabular Integration (DI Method) for ∫ (2x - 4x²) e⁻⁴ˣ dx',
            formula: '\\begin{array}{c|c|c} \\text{Sign} & \\text{D (Differentiate)} & \\text{I (Integrate)} \\\\ \\hline + & 2x - 4x^2 & e^{-4x} \\\\ - & 2 - 8x & \\frac{e^{-4x}}{-4} \\\\ + & -8 & \\frac{e^{-4x}}{16} \\\\ - & 0 & \\frac{e^{-4x}}{-64} \\end{array}',
            explanation:
              'Differentiate the polynomial until 0, integrate e⁻⁴ˣ repeatedly dividing by -4, and alternate signs (+, -, +).',
          },
          {
            step: 'Step 5: Write integrated bracket and general solution',
            formula: 'y = \\frac{1}{e^{-4x}} \\left[ (2x - 4x^2)\\frac{e^{-4x}}{-4} - (2 - 8x)\\frac{e^{-4x}}{16} + 8\\frac{e^{-4x}}{64} + C \\right]',
            explanation:
              'Factor or expand. Multiplying by 1/e⁻⁴ˣ = e⁴ˣ cancels e⁻⁴ˣ on all integral terms and leaves + C e⁴ˣ.',
          },
        ],
        finalAnswer: 'y = \\frac{1}{e^{-4x}} \\left[ (2x - 4x^2)\\frac{e^{-4x}}{-4} - (2 - 8x)\\frac{e^{-4x}}{16} + \\frac{8e^{-4x}}{64} + C \\right]',
        arabicNote: 'استخدام طريقة الجدول (DI Method) للتكامل بالتجزيء لحاصل ضرب كثير حدود في دالة أسية e^(-4x).',
      },
      {
        id: 'eg_p6_2',
        title: 'Example 2: Linear ODE with Radical Leading Coefficient',
        problem: 'Solve: $(2x + 3)y\' - y = \\sqrt{2x + 3}$',
        mathFormula: '(2x + 3)y\' - y = \\sqrt{2x + 3}',
        steps: [
          {
            step: 'Step 1: Divide by (2x + 3) to achieve Standard Form',
            formula: 'y\' - \\frac{1}{2x + 3} y = \\frac{\\sqrt{2x + 3}}{2x + 3} = \\frac{1}{\\sqrt{2x + 3}}',
            explanation: 'Standard form requires coefficient of y\' to be 1. Note √(2x+3)/(2x+3) = 1/√(2x+3).',
          },
          {
            step: 'Step 2: Identify P(x) and q(x)',
            formula: 'P(x) = -\\frac{1}{2x + 3}, \\quad q(x) = \\frac{1}{\\sqrt{2x + 3}}',
            explanation: 'P(x) is -1/(2x+3) and q(x) is 1/√(2x+3).',
          },
          {
            step: 'Step 3: Compute Integrating Factor M(x)',
            formula: 'M(x) = e^{\\int -\\frac{1}{2x+3} dx} = e^{-\\frac{1}{2}\\ln|2x+3|} = e^{\\ln(2x+3)^{-1/2}} = (2x+3)^{-1/2} = \\frac{1}{\\sqrt{2x+3}}',
            explanation: 'Derivative of 2x+3 is 2, so ∫ 1/(2x+3) dx = (1/2)ln|2x+3|. Move -1/2 inside logarithm as exponent.',
          },
          {
            step: 'Step 4: Setup and evaluate the integral',
            formula: 'y = \\frac{1}{(2x+3)^{-1/2}} \\left[ \\int \\frac{1}{\\sqrt{2x+3}} \\cdot \\frac{1}{\\sqrt{2x+3}} dx + C \\right]',
            explanation: '1/√(2x+3) · 1/√(2x+3) = 1/(2x+3).',
          },
          {
            step: 'Step 5: Complete integration and write final solution',
            formula: 'y = \\frac{1}{(2x+3)^{-1/2}} \\left[ \\frac{1}{2} \\ln|2x+3| + C \\right] = \\sqrt{2x+3} \\left( \\frac{1}{2}\\ln|2x+3| + C \\right)',
            explanation: '∫ 1/(2x+3) dx = (1/2)ln|2x+3|.',
          },
        ],
        finalAnswer: 'y = \\frac{1}{(2x+3)^{-1/2}} \\left[ \\frac{1}{2}\\ln|2x+3| + C \\right] = \\sqrt{2x+3}\\left(\\frac{1}{2}\\ln|2x+3| + C\\right)',
        arabicNote: 'قسمنا أولاً على (2x+3) للحصول على الصورة القياسية، وعامل التكامل أصبح (2x+3)^(-1/2).',
      },
    ],
    examTricks: [
      'Standard Form is Mandatory: Never read P(x) while y\' has a coefficient like (2x+3) or x. ALWAYS divide first!',
      'Log power rule for M(x): e^(k ln x) = e^(ln x^k) = x^k. E.g., e^(-1/2 ln(2x+3)) = (2x+3)^(-1/2).',
      'The "+ C" MUST be inside the square bracket: y = (1/M(x)) [ ∫ M q dx + C ]. Forgetting brackets will make C miss the 1/M(x) multiplier!',
    ],
  },

  // =========================================================================
  // PAGE 7: First-Order ODEs — [6] Bernoulli's Equations
  // =========================================================================
  {
    pageNumber: 7,
    title: 'First-Order ODEs: [6] Bernoulli\'s Differential Equations',
    arabicTitle: 'الأسبوع الثاني (٧): معادلات الرتبة الأولى — سادساً: معادلة برنولي (Bernoulli\'s Equations)',
    topicCategory: Category.BERNOULLI,
    summary:
      'Bernoulli non-linear differential equations in the form y\' + P(x)y = q(x)yⁿ. Utilizing the lecture\'s direct shortcut integrating factor M(x) = exp(∫ (1-n)P(x) dx) and the closed-form general solution y^(1-n) = (1/M(x)) [ ∫ (1-n) M(x) q(x) dx + C ].',
    laws: [
      {
        id: 'law_bernoulli_standard',
        name: 'Bernoulli ODE Form & Direct Shortcut Law',
        arabicName: 'الصورة القياسية وقانون برنولي المباشر المختصر',
        formula: 'y\' + P(x)y = q(x) y^n \\implies M(x) = e^{\\int (1-n) P(x)\\,dx}',
        explanation:
          'A Bernoulli equation is a non-linear ODE where y appears with power n on the RHS. The direct transformation formula computes an integrating factor scaled by (1 - n).',
        arabicExplanation:
          'معادلة برنولي تحتوي على y^n في الطرف الأيمن. قانون المحاضرة المباشر يحسب عامل التكامل بضرب P(x) في (1-n).',
        conditions: [
          'If $n=0$, it is a standard linear ODE.',
          'If $n=1$, it is separable.',
          'For $n \\neq 0, 1$, compute $1 - n$ first.',
        ],
      },
      {
        id: 'law_bernoulli_solution',
        name: 'Bernoulli Direct General Solution Formula',
        arabicName: 'قانون الحل العام المباشر لمعادلة برنولي',
        formula: 'y^{(1-n)} = \\frac{1}{M(x)} \\left[ \\int (1-n) M(x) \\cdot q(x)\\,dx + C \\right]',
        explanation:
          'Directly solve for y^(1-n) without intermediate substitution steps by multiplying the integral of (1-n)·M(x)·q(x) by 1/M(x).',
        arabicExplanation:
          'الحل العام يعطي y^(1-n) مباشرة بقسمة [ تكامل (1-n)·M(x)·q(x) + C ] على M(x).',
      },
    ],
    examples: [
      {
        id: 'eg_p7_1',
        title: 'Example 1: Bernoulli Equation with n = 5',
        problem: 'Solve: $2x y\' = 10x^3 y^5 + y$',
        mathFormula: '2x y\' = 10x^3 y^5 + y',
        steps: [
          {
            step: 'Step 1: Divide by 2x to put in standard Bernoulli form',
            formula: 'y\' = 5x^2 y^5 + \\frac{1}{2x} y \\implies y\' - \\frac{1}{2x} y = 5x^2 y^5',
            explanation: 'Divide both sides by 2x and rearrange terms: y\' - (1/(2x)) y = 5x² y⁵.',
          },
          {
            step: 'Step 2: Identify P(x), q(x), and power n',
            formula: 'P(x) = -\\frac{1}{2x}, \\quad q(x) = 5x^2, \\quad n = 5 \\implies 1 - n = 1 - 5 = -4',
            explanation: 'Power of y is n = 5, so factor (1 - n) = -4.',
          },
          {
            step: 'Step 3: Compute Integrating Factor M(x)',
            formula: 'M(x) = e^{\\int (1-n) P(x)\\,dx} = e^{\\int -4 \\left(-\\frac{1}{2x}\\right) dx} = e^{\\int \\frac{2}{x}\\,dx} = e^{2\\ln x} = e^{\\ln x^2} = x^2',
            explanation: '-4 · (-1/(2x)) = 2/x. Then ∫ 2/x dx = 2 ln(x) = ln(x²), so M(x) = x².',
          },
          {
            step: 'Step 4: Apply Bernoulli General Solution Law',
            formula: 'y^{-4} = \\frac{1}{x^2} \\left[ \\int (-4) \\cdot x^2 \\cdot (5x^2)\\,dx + C \\right]',
            explanation: 'Substitute 1-n = -4, M(x) = x², q(x) = 5x².',
          },
          {
            step: 'Step 5: Integrate the polynomial and simplify',
            formula: 'y^{-4} = \\frac{1}{x^2} \\left[ \\int -20x^4\\,dx + C \\right] = \\frac{1}{x^2} \\left[ -\\frac{20x^5}{5} + C \\right] = \\frac{1}{x^2} \\left[ -4x^5 + C \\right]',
            explanation: 'Integral of -20x⁴ dx is -20x⁵/5 = -4x⁵.',
          },
        ],
        finalAnswer: 'y^{-4} = \\frac{1}{x^2} \\left[ -\\frac{20x^5}{5} + C \\right] = -4x^3 + \\frac{C}{x^2}',
        arabicNote: 'قيمة n = 5 وبالتالي (1-n) = -4 وعامل التكامل M(x) = x² والحل النهائي يعطي y^(-4).',
      },
      {
        id: 'eg_p7_2',
        title: 'Example 2: Bernoulli Equation with Exponential and Tabular Integration',
        problem: 'Solve: $x y\' = y + e^x y^3$',
        mathFormula: 'x y\' = y + e^x y^3',
        steps: [
          {
            step: 'Step 1: Put in standard Bernoulli form',
            formula: 'y\' - \\frac{1}{x} y = \\frac{e^x}{x} y^3 \\quad (\\text{or } y\' - \\frac{1}{x} y = e^x y^3)',
            explanation: 'Divide by x and isolate the y³ term. Here P(x) = -1/x, q(x) = eˣ, n = 3.',
          },
          {
            step: 'Step 2: Identify parameters and (1 - n)',
            formula: 'P(x) = -\\frac{1}{x}, \\quad q(x) = e^x, \\quad n = 3 \\implies 1 - n = 1 - 3 = -2',
            explanation: 'Power of y on RHS is 3, so (1 - n) = -2.',
          },
          {
            step: 'Step 3: Calculate Integrating Factor M(x)',
            formula: 'M(x) = e^{\\int -2 \\left(-\\frac{1}{x}\\right) dx} = e^{\\int \\frac{2}{x}\\,dx} = e^{2\\ln x} = x^2',
            explanation: 'M(x) = exp(∫ (2/x) dx) = exp(ln x²) = x².',
          },
          {
            step: 'Step 4: Tabular Integration for ∫ -2x² eˣ dx',
            formula: '\\begin{array}{c|c|c} \\text{Sign} & \\text{D} & \\text{I} \\\\ \\hline + & -2x^2 & e^x \\\\ - & -4x & e^x \\\\ + & -4 & e^x \\\\ - & 0 & e^x \\end{array} \\implies -2x^2 e^x + 4x e^x - 4e^x',
            explanation: 'Tabular integration gives: (-2x²)eˣ - (-4x)eˣ + (-4)eˣ = -2x² eˣ + 4x eˣ - 4eˣ.',
          },
          {
            step: 'Step 5: Write final solution for y⁻²',
            formula: 'y^{-2} = \\frac{1}{x^2} \\left[ -2x^2 e^x + 4x e^x - 4e^x + C \\right]',
            explanation: 'Substitute the integrated polynomial-exponential product into the formula for y^(1-n).',
          },
        ],
        finalAnswer: 'y^{-2} = \\frac{1}{x^2} \\left[ -2x^2 e^x + 4x e^x - 4e^x + C \\right]',
        arabicNote: 'قيمة n = 3 وبالتالي (1-n) = -2، تم إجراء تكامل بالتجزيء عبر جدول المشتقات والتكاملات لـ (-2x² e^x).',
      },
    ],
    examTricks: [
      'The Bernoulli shortcut power: Left hand side is ALWAYS y^(1-n), never y!',
      'Integrating Factor factor (1-n): Remember to multiply P(x) by (1-n) inside the exponent: M(x) = e^(∫ (1-n)P(x) dx).',
      'The (1-n) factor in the integral: Do not forget to multiply by (1-n) inside the integral: ∫ (1-n) M(x) q(x) dx.',
    ],
  },
];
