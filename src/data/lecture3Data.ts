import { Category, LecturePage } from '../types';

export const LECTURE_3_PAGES: LecturePage[] = [
  // =========================================================================
  // PAGE 8 (Week 3 - Page 1): Higher-Order Linear Homogeneous ODEs with Constant Coeffs
  // =========================================================================
  {
    pageNumber: 8,
    title: 'Higher-Order ODEs: [1] Homogeneous Equations with Constant Coefficients & The 3 Root Cases',
    arabicTitle: 'الأسبوع الثالث (١): معادلات الرتب العليا المتجانسة ذات المعاملات الثابتة والحالات الثلاث للجذور',
    topicCategory: Category.HIGHER_ORDER_HOMOGENEOUS,
    summary:
      'Introduction to 2nd and higher-order linear homogeneous ordinary differential equations with constant coefficients in standard form a y\'\' + b y\' + c y = 0. Converting the differential operator to the auxiliary polynomial equation a m² + b m + c = 0 (using substitution y\'\' → m², y\' → m, y → 1), and systematically solving for the roots across all 3 cases (Real Distinct, Real Equal/Repeated, and Complex Conjugates).',
    laws: [
      {
        id: 'law_auxiliary_eq',
        name: 'Auxiliary (Characteristic) Equation Law',
        arabicName: 'قانون المعادلة المساعدة (Auxiliary Equation)',
        formula: 'a y\'\' + b y\' + c y = 0 \\implies a m^2 + b m + c = 0',
        explanation:
          'Replace each derivative y^{(n)} by m^n, and replace the base function y by 1. Solve the resulting algebraic characteristic equation to determine the roots m₁, m₂.',
        arabicExplanation:
          'نحول المعادلة التفاضلية إلى معادلة جبرية مساعدة بالتعويض: y\'\' = m² و y\' = m و y = 1، ثم نحل المعادلة لإيجاد الجذور m₁, m₂.',
        conditions: [
          'Substitution rule: $y\'\' \\to m^2$, $y\' \\to m$, $y \\to 1$',
          'For $n$-th order: $y^{(n)} \\to m^n$',
          'Coefficients $a, b, c$ must be real constants.',
        ],
      },
      {
        id: 'law_case1_distinct',
        name: 'Case 1: Real and Distinct Roots (m₁ ≠ m₂)',
        arabicName: 'الحالة الأولى: جذران حقيقيان مختلفان',
        formula: 'm_1, m_2 \\in \\mathbb{R} \\quad (m_1 \\neq m_2) \\implies y_H = C_1 e^{m_1 x} + C_2 e^{m_2 x}',
        explanation:
          'When the characteristic discriminant is positive (b² - 4ac > 0), the roots are real and distinct numbers. The general complementary solution is a linear combination of two exponential functions.',
        arabicExplanation:
          'إذا كانت الجذور أعداداً حقيقية مختلفة، فإن الحل المتجانس العام هو مجموع دالتين أسيتين مضروبتين في الثوابت الاختيارية C₁ و C₂.',
      },
      {
        id: 'law_case2_equal',
        name: 'Case 2: Real and Equal Roots (Repeated Root m₁ = m₂ = m)',
        arabicName: 'الحالة الثانية: جذران حقيقيان متساويان (جذر مكرر)',
        formula: 'm_1 = m_2 = m \\implies y_H = e^{m x} \\left[ C_1 + C_2 x \\right]',
        explanation:
          'When discriminant equals zero (b² - 4ac = 0), roots coincide. To ensure linear independence, multiply the second basis function by x. For k repeated roots: y_H = e^{mx}[C₁ + C₂x + C₃x² + ... + C_k x^{k-1}].',
        arabicExplanation:
          'إذا كانت الجذور متساوية ومكررة، نضرب الثابت الثاني في x لضمان الاستقلال الخطي للدوال الأساسية: y_H = e^(mx) [C₁ + C₂x].',
      },
      {
        id: 'law_case3_complex',
        name: 'Case 3: Complex Conjugate Roots (m = α ± β i)',
        arabicName: 'الحالة الثالثة: جذران مركبان مترافقان',
        formula: 'm = \\alpha \\pm \\beta i \\implies y_H = e^{\\alpha x} \\left[ C_1 \\cos(\\beta x) + C_2 \\sin(\\beta x) \\right]',
        explanation:
          'When discriminant is negative (b² - 4ac < 0), roots form a complex conjugate pair α ± βi. The real part α controls exponential amplitude decay/growth e^(αx), and the imaginary part β defines sinusoidal oscillation.',
        arabicExplanation:
          'إذا كانت الجذور مركبة مترافقة m = α ± βi، فإن الجزء الحقيقي α يوضع في أس الدالة الأسية e^(αx)، والجزء التخيلي β يوضع زاوية لدوال الجيب وجيب التمام cos(βx) و sin(βx).',
      },
    ],
    examTricks: [
      '⚠️ Trap: Remember that y substitutes to 1 (NOT m^0 = 0)! For example, in 4y\'\' + 4y = 0, the equation is 4m² + 4 = 0, not 4m² + 4m = 0.',
      '📌 Multiplicity rule: If a root m is repeated 3 times (e.g. m = 0, 0, 0), write (C₁ + C₂x + C₃x²)e^(0x) = C₁ + C₂x + C₃x².',
      '💡 No imaginary unit "i" must ever appear in the real general solution y_H! Euler\'s identity absorbs i into the arbitrary constants.',
    ],
  },

  // =========================================================================
  // PAGE 9 (Week 3 - Page 2): 6 Handout Solved Examples (2nd, 3rd, 4th, 5th Order)
  // =========================================================================
  {
    pageNumber: 9,
    title: 'Higher-Order Homogeneous ODEs: 6 Handout Solved Examples Across 2nd, 3rd, 4th & 5th Orders',
    arabicTitle: 'الأسبوع الثالث (٢): ٦ مسائل محلولة بالتفصيل على معادلات الرتبة الثانية والثالثة والرابعة والخامسة',
    topicCategory: Category.HIGHER_ORDER_HOMOGENEOUS,
    summary:
      'Step-by-step solutions for 6 representative textbook problems from lecture notebook page 2, illustrating quadratic complex conjugate roots, factored rational roots, cubic factorizations with zero roots, 4th-order difference of squares, repeated double roots, and 5th-order polynomials.',
    laws: [
      {
        id: 'law_higher_order_factoring',
        name: 'Higher Order Polynomial Factoring Rule',
        arabicName: 'قاعدة تحليل كثيرات الحدود للرتب العليا',
        formula: 'm^n - 1 = (m^2 - 1)(m^2 + 1) = (m - 1)(m + 1)(m^2 + 1)',
        explanation:
          'Extract highest common powers of m first (e.g., m³ in 5th order), and apply algebraic identities like difference of squares (m⁴ - 1) and perfect squares (m⁴ - 2m² + 1 = (m² - 1)²).',
        arabicExplanation:
          'نأخذ العامل المشترك الأعلى لـ m أولاً، ونستخدم المتطابقات الجبرية الشهيرة مثل فرق بين مربعين والمربع الكامل لتحليل كثيرات الحدود من الدرجات العليا.',
      },
    ],
    examples: [
      {
        id: 'eg_p9_1',
        title: 'Example 1: Complex Roots 2nd Order ODE',
        problem: 'Solve: $\\frac{d^2 y}{dx^2} + 2\\frac{dy}{dx} + 4y = 0$',
        mathFormula: '\\frac{d^2 y}{dx^2} + 2\\frac{dy}{dx} + 4y = 0',
        steps: [
          {
            step: 'Step 1: Write Auxiliary Equation',
            formula: 'm^2 + 2m + 4 = 0',
            explanation: 'Substitute d²y/dx² → m², dy/dx → m, and y → 1.',
          },
          {
            step: 'Step 2: Solve for roots using quadratic formula',
            formula: 'm = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} = \\frac{-2 \\pm \\sqrt{4 - 16}}{2} = \\frac{-2 \\pm \\sqrt{-12}}{2} = -1 \\pm \\sqrt{3}i',
            explanation: 'Roots are complex conjugates with α = -1 and β = √3.',
          },
          {
            step: 'Step 3: Write complementary solution y_H',
            formula: 'y_H = e^{\\alpha x} \\left[ C_1 \\cos(\\beta x) + C_2 \\sin(\\beta x) \\right] = e^{-x} \\left[ C_1 \\cos(\\sqrt{3}x) + C_2 \\sin(\\sqrt{3}x) \\right]',
            explanation: 'Apply Case 3 formula with α = -1 and β = √3.',
          },
        ],
        finalAnswer: 'y_H = e^{-x} [C_1 \\cos(\\sqrt{3}x) + C_2 \\sin(\\sqrt{3}x)]',
        arabicNote: 'الجذور مركبة مترافقة مع α = -1 و β = √3، نطبق قانون الحالة الثالثة مباشرة.',
      },
      {
        id: 'eg_p9_2',
        title: 'Example 2: Real Distinct Rational Roots',
        problem: 'Solve: $4y\'\' - 4y\' - 3y = 0$',
        mathFormula: '4y\'\' - 4y\' - 3y = 0',
        steps: [
          {
            step: 'Step 1: Write Auxiliary Equation',
            formula: '4m^2 - 4m - 3 = 0',
            explanation: 'Substitute y\'\' → m², y\' → m, y → 1.',
          },
          {
            step: 'Step 2: Factor the quadratic',
            formula: '(2m + 1)(2m - 3) = 0 \\implies m_1 = -\\frac{1}{2}, \\quad m_2 = \\frac{3}{2}',
            explanation: 'Both roots are real and distinct (Case 1).',
          },
          {
            step: 'Step 3: Write general complementary solution',
            formula: 'y_H = C_1 e^{m_1 x} + C_2 e^{m_2 x} = C_1 e^{-\\frac{1}{2}x} + C_2 e^{\\frac{3}{2}x}',
            explanation: 'Apply Case 1 for two distinct real roots.',
          },
        ],
        finalAnswer: 'y_H = C_1 e^{-\\frac{1}{2}x} + C_2 e^{\\frac{3}{2}x}',
        arabicNote: 'التحليل بالقوسين (2m + 1)(2m - 3) يعطي جذرين حقيقيين مختلفين.',
      },
      {
        id: 'eg_p9_3',
        title: 'Example 3: 3rd Order ODE with Zero Root',
        problem: 'Solve: $y\'\'\' - y\' = 0$',
        mathFormula: 'y\'\'\' - y\' = 0',
        steps: [
          {
            step: 'Step 1: Write Auxiliary Equation',
            formula: 'm^3 - m = 0',
            explanation: 'Substitute y\'\'\' → m³ and y\' → m.',
          },
          {
            step: 'Step 2: Factor by common term m',
            formula: 'm(m^2 - 1) = 0 \\implies m(m - 1)(m + 1) = 0 \\implies m_1 = 0, \\quad m_2 = 1, \\quad m_3 = -1',
            explanation: 'Three distinct real roots: 0, 1, and -1.',
          },
          {
            step: 'Step 3: Write complementary solution',
            formula: 'y_H = C_1 e^{0x} + C_2 e^{1x} + C_3 e^{-1x} = C_1 + C_2 e^x + C_3 e^{-x}',
            explanation: 'Notice that e^(0x) = 1, leaving constant C₁.',
          },
        ],
        finalAnswer: 'y_H = C_1 + C_2 e^x + C_3 e^{-x}',
        arabicNote: 'الجذر m = 0 يعطي الدالة الأسية e^(0x) = 1 فتتحول إلى الثابت C₁.',
      },
      {
        id: 'eg_p9_4',
        title: 'Example 4: 4th Order ODE (Real + Complex Pair)',
        problem: 'Solve: $y^{(4)} - y = 0$',
        mathFormula: 'y^{(4)} - y = 0',
        steps: [
          {
            step: 'Step 1: Write Auxiliary Equation',
            formula: 'm^4 - 1 = 0',
            explanation: 'Substitute y^{(4)} → m⁴ and y → 1.',
          },
          {
            step: 'Step 2: Factor as difference of squares',
            formula: '(m^2 - 1)(m^2 + 1) = 0 \\implies (m - 1)(m + 1)(m^2 + 1) = 0',
            explanation: 'From (m² - 1) = 0: m₁,₂ = ±1 (real). From (m² + 1) = 0: m₃,₄ = ±i with α = 0, β = 1.',
          },
          {
            step: 'Step 3: Write 4-parameter complementary solution',
            formula: 'y_H = C_1 e^x + C_2 e^{-x} + e^{0x}\\left[ C_3 \\cos(x) + C_4 \\sin(x) \\right] = C_1 e^x + C_2 e^{-x} + C_3 \\cos(x) + C_4 \\sin(x)',
            explanation: 'Combine 2 real exponential terms and 2 harmonic oscillating terms.',
          },
        ],
        finalAnswer: 'y_H = C_1 e^x + C_2 e^{-x} + C_3 \\cos(x) + C_4 \\sin(x)',
        arabicNote: 'معادلة من الرتبة الرابعة تتطلب 4 ثوابت اختيارية مستقلة (C₁ إلى C₄).',
      },
      {
        id: 'eg_p9_5',
        title: 'Example 5: 4th Order ODE with Repeated Double Roots',
        problem: 'Solve: $y^{(4)} - 2y\'\' + y = 0$',
        mathFormula: 'y^{(4)} - 2y\'\' + y = 0',
        steps: [
          {
            step: 'Step 1: Write Auxiliary Equation',
            formula: 'm^4 - 2m^2 + 1 = 0',
            explanation: 'Substitute y^{(4)} → m⁴, y\'\' → m², y → 1.',
          },
          {
            step: 'Step 2: Factor as perfect square quadratic in m²',
            formula: '(m^2 - 1)^2 = 0 \\implies (m - 1)^2 (m + 1)^2 = 0',
            explanation: 'The roots are m = 1 (repeated twice) and m = -1 (repeated twice).',
          },
          {
            step: 'Step 3: Apply repeated roots formula for both pairs',
            formula: 'y_H = e^x \\left[ C_1 + C_2 x \\right] + e^{-x} \\left[ C_3 + C_4 x \\right]',
            explanation: 'Multiply the repeated term by x for each pair.',
          },
        ],
        finalAnswer: 'y_H = e^x [C_1 + C_2 x] + e^{-x} [C_3 + C_4 x]',
        arabicNote: 'الجذران m = 1 و m = -1 مكرران مرتين، لذا نضرب في x لكل زوج.',
      },
      {
        id: 'eg_p9_6',
        title: 'Example 6: 5th Order ODE (Triple Zero Root + Complex Pair)',
        problem: 'Solve: $y^{(5)} + 3y^{(4)} + 3y\'\'\' = 0$',
        mathFormula: 'y^{(5)} + 3y^{(4)} + 3y\'\'\' = 0',
        steps: [
          {
            step: 'Step 1: Write Auxiliary Equation',
            formula: 'm^5 + 3m^4 + 3m^3 = 0',
            explanation: 'Substitute y^{(5)} → m⁵, y^{(4)} → m⁴, y\'\'\' → m³.',
          },
          {
            step: 'Step 2: Factor out m³',
            formula: 'm^3(m^2 + 3m + 3) = 0',
            explanation: 'Gives m₁,₂,₃ = 0 (triple root) and quadratic m² + 3m + 3 = 0.',
          },
          {
            step: 'Step 3: Solve quadratic for complex roots',
            formula: 'm_{4,5} = \\frac{-3 \\pm \\sqrt{9 - 12}}{2} = \\frac{-3 \\pm \\sqrt{3}i}{2} = -\\frac{3}{2} \\pm \\frac{\\sqrt{3}}{2}i',
            explanation: 'Here α = -3/2 and β = √3/2.',
          },
          {
            step: 'Step 4: Combine all 5 independent solutions',
            formula: 'y_H = e^{0x}\\left( C_1 + C_2 x + C_3 x^2 \\right) + e^{-\\frac{3}{2}x}\\left[ C_4 \\cos\\left(\\frac{\\sqrt{3}}{2}x\\right) + C_5 \\sin\\left(\\frac{\\sqrt{3}}{2}x\\right) \\right]',
            explanation: 'Triple root at 0 gives (C₁ + C₂x + C₃x²).',
          },
        ],
        finalAnswer: 'y_H = (C_1 + C_2 x + C_3 x^2) + e^{-\\frac{3}{2}x}\\left[ C_4 \\cos\\left(\\frac{\\sqrt{3}}{2}x\\right) + C_5 \\sin\\left(\\frac{\\sqrt{3}}{2}x\\right) \\right]',
        arabicNote: 'الجذر الصفر مكرر ٣ مرات فيعطي كثيرة حدود (C₁ + C₂x + C₃x²)، مع جزء الجذور المركبة.',
      },
    ],
    examTricks: [
      '⚡ Check order vs number of constants: An n-th order ODE must always contain exactly n independent arbitrary constants C₁, C₂, ..., C_n in its general solution.',
      '📌 Perfect Square Factor: When you see m⁴ - 2m² + 1, immediately recognize it as (m² - 1)² = [(m-1)(m+1)]².',
    ],
  },

  // =========================================================================
  // PAGE 10 (Week 3 - Page 3): Reduction of Order Method & Exponential Problem
  // =========================================================================
  {
    pageNumber: 10,
    title: 'Reduction of Order: Method Theory, Derivation Steps & Exponential Problem',
    arabicTitle: 'الأسبوع الثالث (٣): طريقة تخفيض الرتبة (Reduction of Order) — القوانين ومسألة الدالة الأسية',
    topicCategory: Category.REDUCTION_OF_ORDER,
    summary:
      'The Reduction of Order method for solving 2nd-order ODEs P(x) y\'\' + Q(x) y\' + R(x) y = h(x) when one non-trivial solution y = u(x) is already given. By substituting y = u(x)·v(x), the coefficient of v vanishes identically, reducing the second-order equation into a 1st-order linear differential equation in z = v\'.',
    laws: [
      {
        id: 'law_reduction_method',
        name: 'Reduction of Order Fundamental Substitution',
        arabicName: 'فرض تخفيض الرتبة الأساسي',
        formula: 'y = u(x) \\cdot v(x) \\implies y\' = u v\' + u\' v, \\quad y\'\' = u v\'\' + 2u\' v\' + u\'\' v',
        explanation:
          'Given known solution y = u(x), assume the full general solution has the form y = u(x)·v(x). Differentiate using product rule and substitute into the original ODE.',
        arabicExplanation:
          'إذا كان معطى حل معلوم y = u(x)، نفرض الحل العام y = u(x)·v(x) ثم نشتق مرتين بقاعدة ضرب دالتين ونعوض في المعادلة الأصلية.',
        conditions: [
          '① Let $y = u \\cdot v$ (فرض الحل)',
          '② Substitute into ODE: All terms multiplying $v$ alone MUST cancel out (since $u$ solves homogeneous part).',
          '③ Let $z = v\' \\implies z\' = v\'\'$ to obtain a 1st-order Linear ODE in $z$.',
        ],
      },
      {
        id: 'law_reduction_linear_step',
        name: '1st-Order Linear ODE in z Reduction Law',
        arabicName: 'قانون تحويل المعادلة إلى خطية في z',
        formula: 'z\' + P(x) z = Q(x) \\implies \\mu(x) = e^{\\int P(x)\\,dx}, \\quad z(x) = \\frac{1}{\\mu(x)} \\left[ \\int \\mu(x) Q(x)\\,dx + C_1 \\right]',
        explanation:
          'Substitute z = v\' to reduce order from 2 to 1. Solve the 1st-order linear ODE using integrating factor μ(x), then integrate z(x) to obtain v(x) = ∫ z(x) dx + C₂, and finally y = u(x)·v(x).',
        arabicExplanation:
          'نفرض z = v\' فتتحول المعادلة إلى معادلة خطية من الرتبة الأولى في z، نحلها بعامل التكامل μ(x)، ثم نكامل z لنحصل على v، وأخيراً نضرب y = u · v.',
      },
    ],
    examples: [
      {
        id: 'eg_p10_1',
        title: 'Example 1: Reduction of Order with Exponential Given Solution',
        problem: 'Solve: $y\'\' - 3y\' + 2y = e^x$, given known solution $y = e^{2x}$',
        mathFormula: 'y\'\' - 3y\' + 2y = e^x, \\quad y = e^{2x}',
        steps: [
          {
            step: 'Step 1: Assume y = u · v and compute derivatives',
            formula: 'y = e^{2x} v \\implies y\' = e^{2x} v\' + 2e^{2x} v, \\quad y\'\' = e^{2x} v\'\' + 4e^{2x} v\' + 4e^{2x} v',
            explanation: 'Differentiate y = e^{2x} v twice using product rule.',
          },
          {
            step: 'Step 2: Substitute into original ODE and simplify',
            formula: '(e^{2x} v\'\' + 4e^{2x} v\' + 4e^{2x} v) - 3(e^{2x} v\' + 2e^{2x} v) + 2(e^{2x} v) = e^x',
            explanation: 'Notice that v terms (4 - 6 + 2)e^{2x} = 0 vanish completely! Leaving: e^{2x} v\'\' + e^{2x} v\' = e^x.',
          },
          {
            step: 'Step 3: Divide by e^{2x} to standardize',
            formula: 'v\'\' + v\' = e^{-x}',
            explanation: 'Divide both sides by e^{2x} to isolate the derivatives.',
          },
          {
            step: 'Step 4: Substitute z = v\' to reduce to 1st-order linear ODE',
            formula: 'z\' + z = e^{-x} \\implies P(x) = 1, \\quad Q(x) = e^{-x}',
            explanation: 'This is a standard 1st-order linear ODE in z with integrating factor μ(x) = e^{\\int 1 dx} = e^x.',
          },
          {
            step: 'Step 5: Solve for z(x)',
            formula: 'z(x) = \\frac{1}{e^x} \\left[ \\int e^x \\cdot e^{-x} \\, dx + C_1 \\right] = \\frac{1}{e^x} \\left[ \\int 1 \\, dx + C_1 \\right] = \\frac{1}{e^x} [x + C_1] = x e^{-x} + C_1 e^{-x}',
            explanation: 'Compute the integral ∫ 1 dx = x.',
          },
          {
            step: 'Step 6: Integrate z(x) to find v(x)',
            formula: 'v = \\int (x e^{-x} + C_1 e^{-x}) \\, dx = -x e^{-x} - e^{-x} - C_1 e^{-x} + C_2',
            explanation: 'Use integration by parts for ∫ x e^{-x} dx: u=x, dv=e^{-x} dx → -x e^{-x} - e^{-x}.',
          },
          {
            step: 'Step 7: Multiply by u(x) = e^{2x} for the general solution',
            formula: 'y = v \\cdot e^{2x} = \\left( -x e^{-x} - e^{-x} - C_1 e^{-x} + C_2 \\right) e^{2x} = -x e^x - e^x - C_1 e^x + C_2 e^{2x}',
            explanation: 'Expanding gives y = -x e^x + K_1 e^x + C_2 e^{2x} (combining constants).',
          },
        ],
        finalAnswer: 'y = (-x e^{-x} - e^{-x} - C_1 e^{-x} + C_2) e^{2x} = -x e^x - (1 + C_1)e^x + C_2 e^{2x}',
        arabicNote: 'اختفاء حدود v بدون تفاضل دليل على صحة خطوات التفاضل. تكامل x e^(-x) بالتجزيء ينتج -x e^(-x) - e^(-x).',
      },
    ],
    examTricks: [
      '✅ Self-Check Rule: If the terms multiplying v alone do NOT add up to 0, stop immediately and check your y\'\' and y\' derivatives.',
      '📌 Tabular Integration shortcut for polynomial × exponential: Differentiate x → 1 → 0, Integrate e^(-x) → -e^(-x) → e^(-x). Result: -x e^(-x) - e^(-x).',
    ],
  },

  // =========================================================================
  // PAGE 11 (Week 3 - Page 4): Reduction of Order with Trigonometric & Cauchy-Euler
  // =========================================================================
  {
    pageNumber: 11,
    title: 'Reduction of Order: Trigonometric Handout Solution & Cauchy-Euler Practice Exercises',
    arabicTitle: 'الأسبوع الثالث (٤): تخفيض الرتبة — مسألة الدوال المثلثية وتمارين معادلات أويلر',
    topicCategory: Category.REDUCTION_OF_ORDER,
    summary:
      'Solving the non-homogeneous trigonometric differential equation y\'\' + y = cos(x) given known solution y = sin(x), along with Cauchy-Euler reduction problems x² y\'\' + x y\' - y = x (given y = x) and x y\'\' + 2y\' = 1/x (given y = 1).',
    laws: [
      {
        id: 'law_trig_integrals_reduction',
        name: 'Key Trigonometric Integration Identities in Reduction',
        arabicName: 'متطابقات تكامل الدوال المثلثية في تخفيض الرتبة',
        formula: '\\int \\sin(x)\\cos(x)\\,dx = \\frac{\\sin^2(x)}{2}, \\quad \\int \\csc^2(x)\\,dx = -\\cot(x), \\quad e^{2\\ln|\\sin x|} = \\sin^2(x)',
        explanation:
          'Essential calculus identities frequently tested in trigonometric reduction problems.',
        arabicExplanation:
          'قوانين تكامل أساسية تتكرر في مسائل تخفيض الرتبة المثلثية: تكامل sin·cos يساوي (sin²)/2، وتكامل csc² يساوي -cot.',
      },
    ],
    examples: [
      {
        id: 'eg_p11_1',
        title: 'Example 2: Trigonometric Reduction of Order',
        problem: 'Solve: $y\'\' + y = \\cos x$, given known solution $y = \\sin x$',
        mathFormula: 'y\'\' + y = \\cos x, \\quad y = \\sin x',
        steps: [
          {
            step: 'Step 1: Assume y = v · sin(x) and differentiate',
            formula: 'y = v \\sin x \\implies y\' = v \\cos x + v\' \\sin x, \\quad y\'\' = -v \\sin x + 2v\' \\cos x + v\'\' \\sin x',
            explanation: 'Differentiate using product rule twice.',
          },
          {
            step: 'Step 2: Substitute into y\'\' + y = cos(x)',
            formula: '(-v \\sin x + 2v\' \\cos x + v\'\' \\sin x) + v \\sin x = \\cos x \\implies v\'\' \\sin x + 2v\' \\cos x = \\cos x',
            explanation: 'The v sin(x) terms cancel out cleanly.',
          },
          {
            step: 'Step 3: Standardize by dividing by sin(x)',
            formula: 'v\'\' + 2\\frac{\\cos x}{\\sin x} v\' = \\frac{\\cos x}{\\sin x}',
            explanation: 'Convert to standard linear form for v\'.',
          },
          {
            step: 'Step 4: Substitute z = v\' to create 1st-order linear ODE',
            formula: 'z\' + 2\\frac{\\cos x}{\\sin x} z = \\frac{\\cos x}{\\sin x} \\implies P(x) = 2\\cot x, \\quad Q(x) = \\cot x',
            explanation: 'Linear ODE in z with integrating factor μ(x).',
          },
          {
            step: 'Step 5: Compute integrating factor μ(x)',
            formula: '\\mu(x) = e^{\\int 2\\frac{\\cos x}{\\sin x}\\,dx} = e^{2\\ln|\\sin x|} = e^{\\ln(\\sin^2 x)} = \\sin^2 x',
            explanation: 'Bring the factor of 2 into the logarithm as an exponent: 2 ln(sin x) = ln(sin² x).',
          },
          {
            step: 'Step 6: Solve for z(x)',
            formula: 'z = \\frac{1}{\\sin^2 x} \\left[ \\int \\sin^2 x \\cdot \\frac{\\cos x}{\\sin x}\\,dx + C_1 \\right] = \\frac{1}{\\sin^2 x} \\left[ \\int \\sin x \\cos x\\,dx + C_1 \\right] = \\frac{1}{\\sin^2 x} \\left[ \\frac{\\sin^2 x}{2} + C_1 \\right] = \\frac{1}{2} + \\frac{C_1}{\\sin^2 x}',
            explanation: 'Substitute ∫ sin(x) cos(x) dx = (sin² x)/2.',
          },
          {
            step: 'Step 7: Integrate z(x) to find v(x)',
            formula: 'v\' = \\frac{1}{2} + C_1 \\csc^2 x \\implies v = \\int \\left( \\frac{1}{2} + C_1 \\csc^2 x \\right) dx = \\frac{1}{2} x - C_1 \\cot x + C_2',
            explanation: 'Since ∫ csc²(x) dx = -cot(x).',
          },
          {
            step: 'Step 8: Compute General Solution y = v · sin(x)',
            formula: 'y = \\left( \\frac{1}{2} x - C_1 \\cot x + C_2 \\right) \\sin x = \\frac{1}{2} x \\sin x - C_1 \\cos x + C_2 \\sin x',
            explanation: 'Multiply each term by sin(x). Note that cot(x)·sin(x) = (cos x / sin x)·sin x = cos x.',
          },
        ],
        finalAnswer: 'y = \\frac{1}{2} x \\sin x - C_1 \\cos x + C_2 \\sin x',
        arabicNote: 'ضرب cot(x) في sin(x) يعطي cos(x)، ونحصل على الحل العام المشتمل على الحل الخاص والحل المتجانس.',
      },
      {
        id: 'eg_p11_2',
        title: 'Example 3: Cauchy-Euler Reduction of Order',
        problem: 'Solve: $x^2 y\'\' + x y\' - y = x$, given known solution $y = x$',
        mathFormula: 'x^2 y\'\' + x y\' - y = x, \\quad y = x',
        steps: [
          {
            step: 'Step 1: Assume y = x · v and compute derivatives',
            formula: 'y = x v \\implies y\' = x v\' + v, \\quad y\'\' = x v\'\' + 2v\'',
            explanation: 'Differentiate using product rule.',
          },
          {
            step: 'Step 2: Substitute into ODE and collect terms',
            formula: 'x^2(x v\'\' + 2v\') + x(x v\' + v) - xv = x \\implies x^3 v\'\' + 3x^2 v\' = x',
            explanation: 'The v terms (x - x) = 0 cancel out.',
          },
          {
            step: 'Step 3: Standardize to 1st-order linear ODE in z = v\'',
            formula: 'v\'\' + \\frac{3}{x} v\' = \\frac{1}{x^2} \\implies z\' + \\frac{3}{x} z = \\frac{1}{x^2}',
            explanation: 'Divide by x³ to isolate v\'\'.',
          },
          {
            step: 'Step 4: Solve for z(x) via integrating factor',
            formula: '\\mu(x) = e^{\\int \\frac{3}{x}\\,dx} = e^{\\ln x^3} = x^3 \\implies z = \\frac{1}{x^3} \\left[ \\int x^3 \\cdot \\frac{1}{x^2}\\,dx + C_1 \\right] = \\frac{1}{x^3} \\left[ \\frac{x^2}{2} + C_1 \\right] = \\frac{1}{2x} + \\frac{C_1}{x^3}',
            explanation: 'Compute ∫ x dx = x²/2.',
          },
          {
            step: 'Step 5: Integrate for v(x) and multiply by u = x',
            formula: 'v = \\int \\left( \\frac{1}{2x} + \\frac{C_1}{x^3} \\right) dx = \\frac{1}{2}\\ln|x| - \\frac{C_1}{2x^2} + C_2 \\implies y = x v = \\frac{1}{2} x \\ln|x| - \\frac{C_1}{2x} + C_2 x',
            explanation: 'Writing K₁ = -C₁/2 gives y = (1/2) x ln|x| + K₁/x + C₂ x.',
          },
        ],
        finalAnswer: 'y = \\frac{1}{2} x \\ln|x| + \\frac{K_1}{x} + C_2 x',
        arabicNote: 'معادلة كوشي-أويلر مع الحل المعطى y = x تتحول بسهولة بعد التعويض وقسمة المعادلة على x³.',
      },
      {
        id: 'eg_p11_3',
        title: 'Example 4: 2nd Order Cauchy-Euler with Constant Solution y = 1',
        problem: 'Solve: $x y\'\' + 2y\' = \\frac{1}{x}$, given known solution $y = 1$',
        mathFormula: 'x y\'\' + 2y\' = \\frac{1}{x}, \\quad y = 1',
        steps: [
          {
            step: 'Step 1: Assume y = 1 · v = v',
            formula: 'y = v \\implies y\' = v\', \\quad y\'\' = v\'\'',
            explanation: 'Since u = 1 is a constant, y is identically v.',
          },
          {
            step: 'Step 2: Substitute and standardize',
            formula: 'x v\'\' + 2v\' = \\frac{1}{x} \\implies v\'\' + \\frac{2}{x} v\' = \\frac{1}{x^2}',
            explanation: 'Divide both sides by x.',
          },
          {
            step: 'Step 3: Solve linear ODE in z = v\'',
            formula: 'z\' + \\frac{2}{x} z = \\frac{1}{x^2} \\implies \\mu(x) = e^{\\int \\frac{2}{x}\\,dx} = x^2',
            explanation: 'Integrating factor is x².',
          },
          {
            step: 'Step 4: Integrate for z and v',
            formula: 'z = \\frac{1}{x^2} \\left[ \\int x^2 \\cdot \\frac{1}{x^2}\\,dx + C_1 \\right] = \\frac{1}{x^2}[x + C_1] = \\frac{1}{x} + \\frac{C_1}{x^2} \\implies v = \\ln|x| - \\frac{C_1}{x} + C_2',
            explanation: 'Integrate ∫ (1/x + C₁/x²) dx = ln|x| - C₁/x + C₂.',
          },
          {
            step: 'Step 5: General Solution',
            formula: 'y = 1 \\cdot v = \\ln|x| - \\frac{C_1}{x} + C_2',
            explanation: 'Since u = 1, y = v.',
          },
        ],
        finalAnswer: 'y = \\ln|x| - \\frac{C_1}{x} + C_2',
        arabicNote: 'عندما يكون الحل المعطى y = 1، فإن المعادلة في v هي نفسها المعادلة الأصلية، وتكون خطية مباشرة في v\'.',
      },
    ],
    examTricks: [
      '💡 Logarithm power property: Always simplify e^(k ln f(x)) to (f(x))^k before multiplying into the integral.',
      '⚠️ Sign error: ∫ x^(-2) dx = -x^(-1) = -1/x. Watch out for negative signs when integrating powers of x.',
    ],
  },
];
