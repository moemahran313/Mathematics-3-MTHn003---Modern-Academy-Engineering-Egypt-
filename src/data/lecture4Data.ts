import { Category, LecturePage } from '../types';

export const LECTURE_4_PAGES: LecturePage[] = [
  // =========================================================================
  // PAGE 12 (Week 4 - Page 5): Non-Homogeneous ODEs & Undetermined Coefficients Table
  // =========================================================================
  {
    pageNumber: 12,
    title: 'Non-Homogeneous 2nd Order ODEs: Method of Undetermined Coefficients & Table of Trial Forms',
    arabicTitle: 'الأسبوع الرابع (٥): المعادلات غير المتجانسة ذات المعاملات الثابتة وطريقة المعاملات غير المحددة',
    topicCategory: Category.UNDETERMINED_COEFFS,
    summary:
      'Introduction to 2nd-order non-homogeneous linear differential equations with constant coefficients in standard form a y\'\' + b y\' + c y = f(x). The general solution decomposes as y_G = y_H + y_P. Detailed reference table for assuming the trial particular integral y_P based on the driving function f(x), and worked polynomial example y\'\' - 2y\' + y = x² + x + 1.',
    laws: [
      {
        id: 'law_general_solution_superposition',
        name: 'Superposition General Solution Law',
        arabicName: 'قانون الحل العام الكلي (Superposition)',
        formula: 'y_G = y_H + y_P',
        explanation:
          'The complete general solution y_G is the sum of the complementary homogeneous solution y_H (with arbitrary constants C₁, C₂) and any particular solution y_P (with fixed coefficients determined from f(x)).',
        arabicExplanation:
          'الحل العام الكلي y_G يتكون من مجموع حلين: الحل المتجانس y_H (المحتوي على الثوابت الاختيارية) والحل الخاص y_P (الذي نحسب ثوابته بمساواة المعاملات).',
        conditions: [
          '$y_H$: Solve homogeneous ODE $a y\'\' + b y\' + c y = 0$ via characteristic equation $a m^2 + b m + c = 0$.',
          '$y_P$: Assume trial form according to $f(x)$, differentiate, substitute into ODE, and equate like coefficients.',
        ],
      },
      {
        id: 'law_undetermined_coeffs_table',
        name: 'Table of Standard Particular Solution Trial Forms y_P',
        arabicName: 'جدول الفروض القياسية للحل الخاص y_P',
        formula: '\\begin{aligned} f(x) = C &\\implies y_P = K \\\\ f(x) = x^n &\\implies y_P = a_0 + a_1 x + a_2 x^2 + \\dots + a_n x^n \\\\ f(x) = K e^{a x} &\\implies y_P = A e^{a x} \\\\ f(x) = K x^n e^{p x} &\\implies y_P = (a_0 + a_1 x + \\dots + a_n x^n) e^{p x} \\\\ f(x) = \\sin(ax) \\text{ or } \\cos(ax) &\\implies y_P = A \\sin(ax) + B \\cos(ax) \\\\ f(x) = K e^{px}\\cos(ax) &\\implies y_P = e^{px}(A \\sin(ax) + B \\cos(ax)) \\end{aligned}',
        explanation:
          'Match the family of f(x) to its corresponding trial form. If f(x) is a sine or cosine, the trial form MUST always include BOTH sin and cos terms with undetermined constants A and B.',
        arabicExplanation:
          'نحدد شكل الفرض y_P حسب نوع الدالة f(x) في الطرف الأيمن: الثابت يفرض ثابتاً، وكثيرة الحدود تفرض بجميع درجاتها، والدوال المثلثية sin أو cos تتطلب فرض الجمع بينهما دائماً (A sin + B cos).',
      },
    ],
    examples: [
      {
        id: 'eg_p12_1',
        title: 'Example 1: Polynomial Non-Homogeneous Source Term',
        problem: 'Solve: $y\'\' - 2y\' + y = x^2 + x + 1$',
        mathFormula: 'y\'\' - 2y\' + y = x^2 + x + 1',
        steps: [
          {
            step: 'Step 1: Solve Homogeneous Part (y_H)',
            formula: 'y\'\' - 2y\' + y = 0 \\implies m^2 - 2m + 1 = 0 \\implies (m - 1)^2 = 0 \\implies m_{1,2} = 1',
            explanation: 'Repeated real root m = 1 gives homogeneous solution y_H = e^x(C₁ + C₂x).',
          },
          {
            step: 'Step 2: Propose Trial Particular Solution y_P',
            formula: 'f(x) = x^2 + x + 1 \\implies y_P = a_0 + a_1 x + a_2 x^2',
            explanation: 'Since f(x) is a 2nd-degree polynomial and no terms duplicate y_H, assume full 2nd-degree polynomial.',
          },
          {
            step: 'Step 3: Compute Derivatives of y_P',
            formula: 'y_P\' = a_1 + 2a_2 x, \\quad y_P\'\' = 2a_2',
            explanation: 'Differentiate y_P first and second times.',
          },
          {
            step: 'Step 4: Substitute into Differential Equation',
            formula: '(2a_2) - 2(a_1 + 2a_2 x) + (a_0 + a_1 x + a_2 x^2) = x^2 + x + 1',
            explanation: 'Group terms by powers of x: a_2 x^2 + (a_1 - 4a_2)x + (2a_2 - 2a_1 + a_0) = x^2 + x + 1.',
          },
          {
            step: 'Step 5: Equate Coefficients of Like Powers',
            formula: '\\begin{cases} [x^2]: & a_2 = 1 \\\\ [x^1]: & -4a_2 + a_1 = 1 \\implies -4(1) + a_1 = 1 \\implies a_1 = 5 \\\\ [x^0]: & 2a_2 - 2a_1 + a_0 = 1 \\implies 2(1) - 2(5) + a_0 = 1 \\implies a_0 = 9 \\end{cases}',
            explanation: 'Solving systematically yields a₂ = 1, a₁ = 5, and a₀ = 9, so y_P = 9 + 5x + x².',
          },
          {
            step: 'Step 6: Form Total General Solution y_G',
            formula: 'y_G = y_H + y_P = e^x(C_1 + C_2 x) + 9 + 5x + x^2',
            explanation: 'Combine complementary homogeneous solution and particular integral.',
          },
        ],
        finalAnswer: 'y_G = e^x(C_1 + C_2 x) + 9 + 5x + x^2',
        arabicNote: 'معادلة الطرف الأيمن كثيرة حدود من الدرجة الثانية، فنفرض y_P = a₀ + a₁x + a₂x² ونساوي المعاملات بدءاً من أعلى قوة x².',
      },
    ],
    examTricks: [
      '⚠️ Don\'t skip lower terms: If f(x) = x², you MUST include all lower powers: y_P = a₀ + a₁x + a₂x² (never just a₂x²)!',
      '📌 Start equating from highest power: Solve for highest degree coefficient (x²) first, then back-substitute into lower powers.',
    ],
  },

  // =========================================================================
  // PAGE 13 (Week 4 - Page 6): Exponential & Trigonometric Identity Transformations
  // =========================================================================
  {
    pageNumber: 13,
    title: 'Undetermined Coefficients: Exponential Forcing & Trigonometric Power Identities (sin² x)',
    arabicTitle: 'الأسبوع الرابع (٦): الدالة الأسية ومتطابقات القوى المثلثية (تحويل sin² x إلى ضعف الزاوية)',
    topicCategory: Category.UNDETERMINED_COEFFS,
    summary:
      'Detailed solutions for exponential source terms y\'\' + y = 4e^{2x} with complex homogeneous roots, and using half-angle trigonometric power-reduction identities 2sin²(x) = 1 - cos(2x) to solve y\'\' - 4y = 2sin²(x).',
    laws: [
      {
        id: 'law_trig_power_reduction',
        name: 'Trigonometric Power-Reduction Law for Undetermined Coeffs',
        arabicName: 'قانون تخفيض القوى المثلثية',
        formula: '2\\sin^2(x) = 1 - \\cos(2x), \\quad 2\\cos^2(x) = 1 + \\cos(2x)',
        explanation:
          'Undetermined coefficients cannot directly handle powers like sin²(x) or cos²(x). You MUST first transform them into linear combinations of constant and double-angle terms before choosing trial y_P.',
        arabicExplanation:
          'طريقة المعاملات غير المحددة لا تتعامل مع قوى الدوال المثلثية sin²(x) مباشرة؛ لذلك يجب تحويلها أولاً باستخدام متطابقات ضعف الزاوية: 2sin²(x) = 1 - cos(2x).',
      },
    ],
    examples: [
      {
        id: 'eg_p13_1',
        title: 'Example 2: Exponential Forcing Function',
        problem: 'Solve: $y\'\' + y = 4e^{2x}$',
        mathFormula: 'y\'\' + y = 4e^{2x}',
        steps: [
          {
            step: 'Step 1: Solve Homogeneous Equation',
            formula: 'y\'\' + y = 0 \\implies m^2 + 1 = 0 \\implies m = \\pm i \\implies \\alpha = 0, \\; \\beta = 1',
            explanation: 'Roots are purely imaginary ±i, giving y_H = C₁ cos(x) + C₂ sin(x).',
          },
          {
            step: 'Step 2: Propose Trial Solution y_P',
            formula: 'f(x) = 4e^{2x} \\implies y_P = A e^{2x}',
            explanation: 'Since e^{2x} is not part of y_H (roots are ±i), trial form is simple exponential.',
          },
          {
            step: 'Step 3: Differentiate y_P',
            formula: 'y_P\' = 2A e^{2x}, \\quad y_P\'\' = 4A e^{2x}',
            explanation: 'Compute second derivative.',
          },
          {
            step: 'Step 4: Substitute into ODE and Solve for A',
            formula: '4A e^{2x} + A e^{2x} = 4e^{2x} \\implies 5A e^{2x} = 4e^{2x} \\implies 5A = 4 \\implies A = \\frac{4}{5}',
            explanation: 'Equating coefficients gives A = 4/5, so y_P = (4/5)e^{2x}.',
          },
          {
            step: 'Step 5: Write General Solution',
            formula: 'y_G = y_H + y_P = C_1 \\cos(x) + C_2 \\sin(x) + \\frac{4}{5}e^{2x}',
            explanation: 'Superposition of homogeneous and particular solutions.',
          },
        ],
        finalAnswer: 'y_G = C_1 \\cos(x) + C_2 \\sin(x) + \\frac{4}{5}e^{2x}',
        arabicNote: 'الجذور المتجانسة تخيلية بحتة m = ±i، والطرف الأيمن أسّي، نعوض بـ y_P = A e^(2x) لنحصل على A = 4/5.',
      },
      {
        id: 'eg_p13_2',
        title: 'Example 3: Trigonometric Squared Term (sin² x)',
        problem: 'Solve: $y\'\' - 4y = 2\\sin^2(x)$',
        mathFormula: 'y\'\' - 4y = 2\\sin^2(x)',
        steps: [
          {
            step: 'Step 1: Transform RHS via Trig Identity',
            formula: '2\\sin^2(x) = 2 \\cdot \\frac{1}{2}(1 - \\cos 2x) = 1 - \\cos(2x) \\implies y\'\' - 4y = 1 - \\cos(2x)',
            explanation: 'Convert sin²(x) into constant plus double-angle cosine.',
          },
          {
            step: 'Step 2: Solve Homogeneous Part (y_H)',
            formula: 'y\'\' - 4y = 0 \\implies m^2 - 4 = 0 \\implies m = \\pm 2 \\implies y_H = C_1 e^{2x} + C_2 e^{-2x}',
            explanation: 'Roots are m = 2 and m = -2.',
          },
          {
            step: 'Step 3: Propose Trial Particular Solution y_P',
            formula: 'f(x) = 1 - \\cos(2x) \\implies y_P = K + A \\sin(2x) + B \\cos(2x)',
            explanation: 'Constant 1 gives K, and -cos(2x) requires both A sin(2x) and B cos(2x).',
          },
          {
            step: 'Step 4: Compute Derivatives of y_P',
            formula: 'y_P\' = 2A \\cos(2x) - 2B \\sin(2x), \\quad y_P\'\' = -4A \\sin(2x) - 4B \\cos(2x)',
            explanation: 'Differentiate twice using chain rule.',
          },
          {
            step: 'Step 5: Substitute and Group Like Terms',
            formula: '(-4A \\sin 2x - 4B \\cos 2x) - 4(K + A \\sin 2x + B \\cos 2x) = 1 - \\cos 2x \\implies -4K - 8A \\sin(2x) - 8B \\cos(2x) = 1 - \\cos(2x)',
            explanation: 'Collect constant, sin(2x), and cos(2x) terms.',
          },
          {
            step: 'Step 6: Equate Coefficients',
            formula: '\\begin{cases} [\\text{Const}]: & -4K = 1 \\implies K = -\\frac{1}{4} \\\\ [\\sin 2x]: & -8A = 0 \\implies A = 0 \\\\ [\\cos 2x]: & -8B = -1 \\implies B = \\frac{1}{8} \\end{cases}',
            explanation: 'Solving gives K = -1/4, A = 0, B = 1/8, so y_P = -1/4 + (1/8)cos(2x).',
          },
          {
            step: 'Step 7: Form General Solution y_G',
            formula: 'y_G = C_1 e^{2x} + C_2 e^{-2x} - \\frac{1}{4} + \\frac{1}{8}\\cos(2x)',
            explanation: 'Combine y_H and y_P.',
          },
        ],
        finalAnswer: 'y_G = C_1 e^{2x} + C_2 e^{-2x} - \\frac{1}{4} + \\frac{1}{8}\\cos(2x)',
        arabicNote: 'تحويل 2sin²(x) إلى 1 - cos(2x) خطوة مفصلية حتمية قبل الفرض. الفرض يشمل الثابت K مع دالتي الجيب وجيب التمام لـ 2x.',
      },
    ],
    examTricks: [
      '💡 Never guess y_P for powers of trig: Always convert sin²(x), cos²(x), or sin(x)cos(x) using double angle identities first.',
      '📌 In sin(kx)/cos(kx) problems, even if one coefficient turns out to be 0 (like A = 0 here), you MUST assume both sin and cos initially.',
    ],
  },

  // =========================================================================
  // PAGE 14 (Week 4 - Page 7): Hyperbolic Functions & The Resonance / Modification Rule
  // =========================================================================
  {
    pageNumber: 14,
    title: 'Undetermined Coefficients: Hyperbolic Functions (sinh 2x) & The Modification / Resonance Rule',
    arabicTitle: 'الأسبوع الرابع (٧): الدوال الزائدية (sinh 2x) وقاعدة التعديل والضرب في x عند التشابه (Resonance)',
    topicCategory: Category.UNDETERMINED_COEFFS,
    summary:
      'Handling hyperbolic forcing terms using definition sinh(2x) = 1/2 e^{2x} - 1/2 e^{-2x} in y\'\' + y\' = sinh(2x), and solving the classical modification/resonance problem y\'\' + y\' = 2x + 3e^x where root m=0 forces multiplying the trial polynomial by x.',
    laws: [
      {
        id: 'law_hyperbolic_exponential_expansion',
        name: 'Hyperbolic Definitions for ODE Undetermined Coefficients',
        arabicName: 'تعريف الدوال الزائدية بالدوال الأسية',
        formula: '\\sinh(ax) = \\frac{e^{ax} - e^{-ax}}{2} = \\frac{1}{2}e^{ax} - \\frac{1}{2}e^{-ax}, \\quad \\cosh(ax) = \\frac{1}{2}e^{ax} + \\frac{1}{2}e^{-ax}',
        explanation:
          'Convert any hyperbolic function into separate exponential terms before assuming undetermined coefficients.',
        arabicExplanation:
          'نحول الدوال الزائدية sinh و cosh إلى الصورة الأسية القياسية: sinh(ax) = (e^(ax) - e^(-ax))/2 قبل الفرض.',
      },
      {
        id: 'law_modification_resonance_rule',
        name: 'The Modification Rule (Multiplication by x for Duplication / Resonance)',
        arabicName: 'قاعدة التعديل عند تكرار الحلول (الضرب في x)',
        formula: '\\text{If any term in the naive } y_P \\text{ duplicates a term in } y_H, \\implies y_P^{\\text{modified}} = x^s \\cdot y_P',
        explanation:
          'If a trial term in y_P is already a solution of the homogeneous equation (i.e. corresponds to a root of the characteristic equation of multiplicity s), multiply that whole group by x^s (where s = 1 or 2) to eliminate linear dependence.',
        arabicExplanation:
          'إذا كان أي حد في فرض y_P مطابقاً أو شبيهاً بأحد حدود y_H (أي جذر للمعادلة المساعدة)، نضرب مجموعة الحدود المتشابهة في x (أو x² إذا كان الجذر مكرراً مرتين) لضمان الاستقلال الخطي.',
        conditions: [
          'In $y\'\' + y\' = 2x + 3e^x$, $m=0$ gives constant $C_1$ in $y_H$.',
          'Naive trial $y_P = a_0 + a_1 x + A e^x$ has constant $a_0$ duplicating $C_1$.',
          'Correct modified trial: $y_P = (a_0 + a_1 x)x + A e^x = a_0 x + a_1 x^2 + A e^x$.',
        ],
      },
    ],
    examples: [
      {
        id: 'eg_p14_1',
        title: 'Example 4: Hyperbolic Source Term (sinh 2x)',
        problem: 'Solve: $y\'\' + y\' = \\sinh(2x)$',
        mathFormula: 'y\'\' + y\' = \\sinh(2x)',
        steps: [
          {
            step: 'Step 1: Convert sinh(2x) to Exponential Form',
            formula: '\\sinh(2x) = \\frac{1}{2}e^{2x} - \\frac{1}{2}e^{-2x} \\implies y\'\' + y\' = \\frac{1}{2}e^{2x} - \\frac{1}{2}e^{-2x}',
            explanation: 'Rewrite RHS in standard exponential terms.',
          },
          {
            step: 'Step 2: Solve Homogeneous Part (y_H)',
            formula: 'y\'\' + y\' = 0 \\implies m^2 + m = 0 \\implies m(m + 1) = 0 \\implies m_1 = 0, \\; m_2 = -1',
            explanation: 'Gives y_H = C₁ e^{0x} + C₂ e^{-x} = C₁ + C₂ e^{-x}.',
          },
          {
            step: 'Step 3: Propose Trial Solution y_P',
            formula: 'y_P = A e^{2x} + B e^{-2x}',
            explanation: 'Exponents are +2 and -2, which do not match auxiliary roots 0 or -1 (no resonance).',
          },
          {
            step: 'Step 4: Compute Derivatives of y_P',
            formula: 'y_P\' = 2A e^{2x} - 2B e^{-2x}, \\quad y_P\'\' = 4A e^{2x} + 4B e^{-2x}',
            explanation: 'Differentiate twice.',
          },
          {
            step: 'Step 5: Substitute into ODE and Group',
            formula: '(4A e^{2x} + 4B e^{-2x}) + (2A e^{2x} - 2B e^{-2x}) = \\frac{1}{2}e^{2x} - \\frac{1}{2}e^{-2x} \\implies 6A e^{2x} + 2B e^{-2x} = \\frac{1}{2}e^{2x} - \\frac{1}{2}e^{-2x}',
            explanation: 'Combine terms of e^{2x} and e^{-2x}.',
          },
          {
            step: 'Step 6: Equate Coefficients',
            formula: '\\begin{cases} [e^{2x}]: & 6A = \\frac{1}{2} \\implies A = \\frac{1}{12} \\\\ [e^{-2x}]: & 2B = -\\frac{1}{2} \\implies B = -\\frac{1}{4} \\end{cases}',
            explanation: 'Particular solution is y_P = (1/12)e^{2x} - (1/4)e^{-2x}.',
          },
          {
            step: 'Step 7: Form General Solution y_G',
            formula: 'y_G = C_1 + C_2 e^{-x} + \\frac{1}{12}e^{2x} - \\frac{1}{4}e^{-2x}',
            explanation: 'Combine y_H and y_P.',
          },
        ],
        finalAnswer: 'y_G = C_1 + C_2 e^{-x} + \\frac{1}{12}e^{2x} - \\frac{1}{4}e^{-2x}',
        arabicNote: 'تحويل sinh(2x) إلى (1/2)e^(2x) - (1/2)e^(-2x) يجعل الحل كمسألة أسية عادية بثابتين A و B.',
      },
      {
        id: 'eg_p14_2',
        title: 'Example 5: Modification / Resonance Rule (Multiplying by x)',
        problem: 'Solve: $y\'\' + y\' = 2x + 3e^x$',
        mathFormula: 'y\'\' + y\' = 2x + 3e^x',
        steps: [
          {
            step: 'Step 1: Solve Homogeneous Part (y_H)',
            formula: 'y\'\' + y\' = 0 \\implies m^2 + m = 0 \\implies m(m + 1) = 0 \\implies m_1 = 0, \\; m_2 = -1 \\implies y_H = C_1 + C_2 e^{-x}',
            explanation: 'Notice that m = 0 creates the standalone constant term C₁ in y_H.',
          },
          {
            step: 'Step 2: Inspect Trial Form for Duplication (Resonance Test)',
            formula: '\\text{Naive: } y_P = a_0 + a_1 x + A e^x \\quad \\times \\text{ (FAIL: } a_0 \\text{ duplicates } C_1 \\text{)}',
            explanation: 'The constant a₀ is already present in y_H as C₁. If substituted, a₀ will vanish completely (0 = 0), leaving no equation to solve for a₀!',
          },
          {
            step: 'Step 3: Apply Modification Rule by Multiplying Polynomial by x',
            formula: 'y_P = (a_0 + a_1 x)x + A e^x = a_0 x + a_1 x^2 + A e^x',
            explanation: 'Multiply only the polynomial family by x. The e^x term is kept as A e^x since m=1 is not a root of the auxiliary equation.',
          },
          {
            step: 'Step 4: Compute Derivatives of Modified y_P',
            formula: 'y_P\' = a_0 + 2a_1 x + A e^x, \\quad y_P\'\' = 2a_1 + A e^x',
            explanation: 'Differentiate the modified trial form.',
          },
          {
            step: 'Step 5: Substitute into ODE',
            formula: '(2a_1 + A e^x) + (a_0 + 2a_1 x + A e^x) = 2x + 3e^x \\implies (2a_1 + a_0) + 2a_1 x + 2A e^x = 2x + 3e^x',
            explanation: 'Group into constant, x, and e^x terms.',
          },
          {
            step: 'Step 6: Equate Coefficients to Find Parameters',
            formula: '\\begin{cases} [x]: & 2a_1 = 2 \\implies a_1 = 1 \\\\ [e^x]: & 2A = 3 \\implies A = \\frac{3}{2} \\\\ [\\text{Const}]: & 2a_1 + a_0 = 0 \\implies 2(1) + a_0 = 0 \\implies a_0 = -2 \\end{cases}',
            explanation: 'Solving gives a₁ = 1, A = 3/2, and a₀ = -2, so y_P = -2x + x² + (3/2)e^x.',
          },
          {
            step: 'Step 7: Form Complete General Solution y_G',
            formula: 'y_G = y_H + y_P = C_1 + C_2 e^{-x} - 2x + x^2 + \\frac{3}{2}e^x',
            explanation: 'Superposition of complementary and particular solutions.',
          },
        ],
        finalAnswer: 'y_G = C_1 + C_2 e^{-x} - 2x + x^2 + \\frac{3}{2}e^x',
        arabicNote: 'أهم مسألة امتحانية! وجود الجذر الصفر m = 0 في y_H يعني وجود ثابت C₁، مما يلغي الثابت a₀ إذا لم يُضرب القوس في x. لذلك نعدل الفرض إلى y_P = a₀ x + a₁ x² + A e^x.',
      },
    ],
    examTricks: [
      '🔥 THE #1 EXAM TRICK: Always compare every term of your trial y_P with y_H before differentiating! If any term matches, multiply that entire sub-family by x.',
      '⚡ Targeted multiplication: In Example 5, only multiply the polynomial part (a₀ + a₁x) by x. Do NOT multiply A e^x by x because e^x (m=1) is NOT a root of m² + m = 0.',
    ],
  },
];
