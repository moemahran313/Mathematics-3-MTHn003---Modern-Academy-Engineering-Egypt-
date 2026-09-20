import { Category, LecturePage } from '../types';

export const LECTURE_1_PAGES: LecturePage[] = [
  // =========================================================================
  // PAGE 1: Ordinary Differential Equations (Foundations, Order, Degree, Linearity)
  // =========================================================================
  {
    pageNumber: 1,
    title: 'Ordinary Differential Equations: Definitions, Order, Degree & Linearity',
    arabicTitle: 'الأسبوع الأول (١): مدخل المعادلات التفاضلية، الرتبة، والدرجة، وشروط الخطية',
    topicCategory: Category.BASIC_ODE,
    summary:
      'Introduction to ODEs: defining dependent vs. independent variables, determining the Order (highest derivative) and Degree (power of highest derivative after clearing radicals), and applying the 3 golden linearity criteria.',
    laws: [
      {
        id: 'law_ode_def',
        name: 'Definition of an Ordinary Differential Equation (ODE)',
        arabicName: 'تعريف المعادلة التفاضلية العادية',
        formula: '\\text{An equation involving one dependent variable } y \\text{ and its derivatives with respect to one independent variable } x',
        explanation:
          'An Ordinary Differential Equation (ODE) relates a single dependent variable y(x) to its derivatives (dy/dx, d²y/dx², ...) with respect to exactly one independent variable x.',
        arabicExplanation:
          'معادلة تشتمل على متغير تابع واحد ومشتقاته بالنسبة لمتغير مستقل واحد فقط.',
        conditions: [
          'Example: $\\frac{dy}{dx} + y = x$',
          'Dependent variable: $y$',
          'Independent variable: $x$',
        ],
      },
      {
        id: 'law_order',
        name: 'Order of an ODE',
        arabicName: '١. الرتبة (Order)',
        formula: '\\text{Order} = \\text{Highest derivative present in the equation}',
        explanation:
          'The order is determined strictly by the highest order derivative appearing in the equation (e.g. y\' is 1st order, y\'\' is 2nd order, y\'\'\' is 3rd order).',
        arabicExplanation: 'هو أعلى مشتقة موجودة بالمعادلة التفاضلية.',
      },
      {
        id: 'law_degree',
        name: 'Degree of an ODE',
        arabicName: '٢. الدرجة (Degree)',
        formula: '\\text{Degree} = \\text{Algebraic power (exponent) of the highest derivative}',
        explanation:
          'The degree is the positive integer power to which the highest derivative is raised, after the equation has been freed from fractional powers and radicals affecting derivatives.',
        arabicExplanation: 'هو أعلى أُس (Power) لأعلى مشتقة بعد التخلص من الجذور والكسور.',
        conditions: [
          'Must eliminate all radicals/roots surrounding derivatives before reading the degree (e.g., square both sides).',
          'Never confuse the power of a lower derivative with the degree of the equation!',
        ],
      },
      {
        id: 'law_linear_criteria',
        name: 'Linearity Criteria (3 Rules)',
        arabicName: '٣. شروط الخطية (Linear Criteria)',
        formula: 'a_n(x) y^{(n)} + a_{n-1}(x) y^{(n-1)} + \\dots + a_1(x) y\' + a_0(x) y = f(x)',
        explanation:
          'An ODE is linear if all dependent variable terms and derivatives satisfy all three conditions:',
        arabicExplanation:
          'تكون المعادلة خطية إذا تحققت الشروط الثلاثة معاً بالنسبة للمتغير التابع y ومشتقاته.',
        conditions: [
          '① First Degree: The dependent variable y and all its derivatives (y\', y\'\', ...) must be of power 1 only.',
          '② No Products: No products of y and its derivatives, such as y², y·y\', y\'·y\'\'.',
          '③ No Non-linear Functions of y: No transcendental functions of y, such as sin(y), ln(y), eʸ, sinh(y), tan(y). (Note: Functions of x like sin(x), eˣ, tan(x) are completely allowed!).',
        ],
      },
    ],
    exercises: [
      {
        id: 'ex1_1',
        equation: '\\frac{dy}{dx} + y = \\sin x',
        formula: '\\frac{dy}{dx} + y = \\sin x',
        order: 1,
        degree: 1,
        isLinear: true,
        reason: 'Highest derivative is y\' (Order 1, Degree 1). y and y\' are degree 1 without cross-products. sin(x) depends on x only, which is allowed.',
      },
      {
        id: 'ex1_2',
        equation: 'x = \\sqrt{1 + (y\')^2}',
        formula: 'x = \\sqrt{1 + (y\')^2} \\implies x^2 = 1 + (y\')^2',
        order: 1,
        degree: 2,
        isLinear: false,
        reason: 'Squaring gives x² = 1 + (y\')². Highest derivative is y\' (Order 1), its power is 2 (Degree 2). Non-linear because (y\')² has power 2.',
      },
      {
        id: 'ex1_3',
        equation: '\\frac{d^2y}{dx^2} + 5xy\\left(\\frac{dy}{dx}\\right)^3 = 0',
        formula: 'y\'\' + 5xy (y\')^3 = 0',
        order: 2,
        degree: 1,
        isLinear: false,
        reason: 'Highest derivative is y\'\' (Order 2, power 1 -> Degree 1). Non-linear because (y\')³ has power 3 and there is a product y·(y\')³.',
      },
      {
        id: 'ex1_4',
        equation: 'y\'\'\' + 6y\'\' + 2y\' + 12y = \\tan x',
        formula: 'y\'\'\' + 6y\'\' + 2y\' + 12y = \\tan x',
        order: 3,
        degree: 1,
        isLinear: true,
        reason: 'Highest derivative is y\'\'\' (Order 3, Degree 1). Linear combination of y and derivatives with constant coefficients; tan(x) depends only on x.',
      },
      {
        id: 'ex1_5',
        equation: 'y y\'\' = \\cos x',
        formula: 'y y\'\' = \\cos x',
        order: 2,
        degree: 1,
        isLinear: false,
        reason: 'Highest derivative is y\'\' (Order 2, Degree 1). Non-linear due to product of dependent variable y with its derivative y\'\'.',
      },
      {
        id: 'ex1_6',
        equation: '(x + y^2)\\,dx + (2y^2 - 1)\\,dy = 0',
        formula: '(2y^2 - 1)\\frac{dy}{dx} + y^2 + x = 0',
        order: 1,
        degree: 1,
        isLinear: false,
        reason: 'Highest derivative is dy/dx (Order 1, Degree 1). Non-linear because of y² and product y²(dy/dx).',
      },
    ],
    examTricks: [
      'Trick 1: Radical Trap — When asked for the degree, always square or raise both sides to remove fractional roots from derivatives before stating the degree.',
      'Trick 2: Linearity only restricts y and its derivatives — Terms like tan(x), eˣ, sin(x), x³ are functions of the independent variable x and do NOT make the equation non-linear.',
      'Trick 3: The degree is ALWAYS taken from the highest derivative term, never from lower derivatives.',
    ],
  },

  // =========================================================================
  // PAGE 2: ODE of First Order — [1] Separable Variables
  // =========================================================================
  {
    pageNumber: 2,
    title: 'First-Order ODEs: [1] Separable Variables Method',
    arabicTitle: 'الأسبوع الأول (٢): معادلات الرتبة الأولى — أولاً: فصل المتغيرات',
    topicCategory: Category.SEPARATION,
    summary:
      'Separation of Variables: separating g(y) dy = h(x) dx by factoring, exponent rules (eˣ⁺ʸ = eˣ·eʸ), trigonometric identities, and logarithmic differentials.',
    laws: [
      {
        id: 'law_sep_standard',
        name: 'Separation of Variables Law',
        arabicName: 'قانون فصل المتغيرات',
        formula: '\\int g(y)\\,dy = \\int h(x)\\,dx',
        explanation:
          'If an ODE can be factored such that all terms containing y are grouped with dy, and all terms containing x are grouped with dx, integrate both sides directly.',
        arabicExplanation: 'عزل حدود y مع dy في طرف، وحدود x مع dx في الطرف الآخر ثم التكامل المباشر.',
        conditions: [
          'Multiplication & division only (no additive entanglement of x and y).',
          'Use exponential laws: $e^{x+y} = e^x \\cdot e^y$ to factor out $e^y$.',
          'Use logarithm properties to simplify solutions.',
        ],
      },
    ],
    examples: [
      {
        id: 'eg_p2_1',
        title: 'Example 1: Rational Inverse Tangent ODE',
        problem: 'Solve: $x y\' = 1 + y^2$',
        mathFormula: 'x \\frac{dy}{dx} = 1 + y^2',
        steps: [
          {
            step: 'Step 1: Rewrite derivative',
            formula: 'x \\frac{dy}{dx} = 1 + y^2',
            explanation: 'Express y\' explicitly in differential Leibniz notation dy/dx.',
          },
          {
            step: 'Step 2: Cross-multiply differentials',
            formula: 'x \\, dy = (1 + y^2) \\, dx',
            explanation: 'Multiply both sides by dx.',
          },
          {
            step: 'Step 3: Separate variables',
            formula: '\\int \\frac{1}{1 + y^2} \\, dy = \\int \\frac{1}{x} \\, dx',
            explanation: 'Divide both sides by x(1 + y²).',
          },
          {
            step: 'Step 4: Integrate both sides',
            formula: '\\tan^{-1}(y) = \\ln|x| + C',
            explanation: 'Recall the standard integral ∫ 1/(1+y²) dy = tan⁻¹(y) and ∫ 1/x dx = ln|x|.',
          },
        ],
        finalAnswer: '\\tan^{-1}(y) = \\ln|x| + C',
        arabicNote: 'تكامل 1/(1+y²) هو tan⁻¹(y) وتكامل 1/x هو ln(x).',
      },
      {
        id: 'eg_p2_2',
        title: 'Example 2: Exponential Splitting ODE',
        problem: 'Solve: $\\frac{dy}{dx} = e^{x+y} + x^2 e^y$',
        mathFormula: '\\frac{dy}{dx} = e^x \\cdot e^y + x^2 e^y',
        steps: [
          {
            step: 'Step 1: Split the exponential power',
            formula: '\\frac{dy}{dx} = e^x \\cdot e^y + x^2 e^y',
            explanation: 'Apply index rule e^(x+y) = e^x · e^y.',
          },
          {
            step: 'Step 2: Factor out common term eʸ',
            formula: '\\frac{dy}{dx} = e^y (e^x + x^2)',
            explanation: 'Factor out eʸ from both terms on the RHS.',
          },
          {
            step: 'Step 3: Separate variables',
            formula: '\\int e^{-y} \\, dy = \\int (e^x + x^2) \\, dx',
            explanation: 'Divide both sides by eʸ, which becomes e⁻ʸ dy, and multiply by dx.',
          },
          {
            step: 'Step 4: Integrate both sides',
            formula: '-e^{-y} = e^x + \\frac{x^3}{3} + C',
            explanation: 'Integral of e⁻ʸ dy is -e⁻ʸ; integral of (eˣ + x²) dx is eˣ + x³/3.',
          },
        ],
        finalAnswer: '-e^{-y} = e^x + \\frac{x^3}{3} + C',
        arabicNote: 'أهم فكرة: فك e^(x+y) = e^x · e^y ثم أخذ e^y عامل مشترك ونقلها للطرف الأيسر بـ e^(-y).',
      },
      {
        id: 'eg_p2_3',
        title: 'Example 3: Radicals with Inverse Sines',
        problem: 'Solve: $\\sqrt{1-x^2}\\,dy - \\sqrt{1-y^2}\\,dx = 0$',
        mathFormula: '\\sqrt{1-x^2}\\,dy = \\sqrt{1-y^2}\\,dx',
        steps: [
          {
            step: 'Step 1: Isolate the differentials',
            formula: '\\sqrt{1-x^2}\\,dy = \\sqrt{1-y^2}\\,dx',
            explanation: 'Move the dx term to the right-hand side.',
          },
          {
            step: 'Step 2: Separate variables',
            formula: '\\int \\frac{1}{\\sqrt{1-y^2}} \\, dy = \\int \\frac{1}{\\sqrt{1-x^2}} \\, dx',
            explanation: 'Divide by √(1-x²) · √(1-y²).',
          },
          {
            step: 'Step 3: Integrate standard inverse trigonometric forms',
            formula: '\\sin^{-1}(y) = \\sin^{-1}(x) + C',
            explanation: 'Standard derivative identity ∫ 1/√(1-u²) du = sin⁻¹(u).',
          },
        ],
        finalAnswer: '\\sin^{-1}(y) = \\sin^{-1}(x) + C',
        arabicNote: 'تكامل مباشر يعطي دوال الجيب العكسية sin⁻¹.',
      },
      {
        id: 'eg_p2_4',
        title: 'Example 4: Transcendental Argument Inversion with Parts',
        problem: 'Solve: $\\sin\\left(\\frac{dy}{dx}\\right) = x$',
        mathFormula: '\\sin(y\') = x \\implies \\frac{dy}{dx} = \\sin^{-1}(x)',
        steps: [
          {
            step: 'Step 1: Invert the sine function',
            formula: '\\frac{dy}{dx} = \\sin^{-1}(x)',
            explanation: 'Apply arcsin (sin⁻¹) to both sides to isolate dy/dx.',
          },
          {
            step: 'Step 2: Separate variables',
            formula: '\\int dy = \\int \\sin^{-1}(x) \\, dx',
            explanation: 'Multiply both sides by dx.',
          },
          {
            step: 'Step 3: Integrate by parts',
            formula: '\\int \\sin^{-1}(x) \\, dx = x \\sin^{-1}(x) - \\int \\frac{x}{\\sqrt{1-x^2}} \\, dx',
            explanation: 'Let u = sin⁻¹(x) -> du = 1/√(1-x²) dx, and dv = dx -> v = x. Then ∫ u dv = uv - ∫ v du.',
          },
          {
            step: 'Step 4: Complete integration',
            formula: 'y = x \\sin^{-1}(x) + \\sqrt{1-x^2} + C',
            explanation: 'Notice ∫ -x/√(1-x²) dx = √(1-x²).',
          },
        ],
        finalAnswer: 'y = x \\sin^{-1}(x) + \\sqrt{1-x^2} + C',
        arabicNote: 'أخذ sin⁻¹ للطرفين ثم إجراء تكامل بالتجزيء (Integration by parts) لـ sin⁻¹(x).',
      },
      {
        id: 'eg_p2_5',
        title: 'Example 5: Logarithmic Quotient Differential',
        problem: 'Solve: $y\\,dx + x\\ln x\\,dy = 0$',
        mathFormula: 'y\\,dx = -x\\ln x\\,dy',
        steps: [
          {
            step: 'Step 1: Isolate the differentials',
            formula: 'y\\,dx = -x\\ln x\\,dy',
            explanation: 'Move x ln x dy to the right-hand side.',
          },
          {
            step: 'Step 2: Separate variables',
            formula: '\\int \\frac{1}{x \\ln x} \\, dx = -\\int \\frac{1}{y} \\, dy',
            explanation: 'Divide both sides by y · x ln x.',
          },
          {
            step: 'Step 3: Recognize numerator as derivative of denominator',
            formula: '\\int \\frac{1/x}{\\ln x} \\, dx = -\\int \\frac{1}{y} \\, dy',
            explanation: 'The numerator (1/x) is the derivative of ln(x).',
          },
          {
            step: 'Step 4: Integrate and simplify logarithms',
            formula: '\\ln|\\ln x| = -\\ln|y| + C \\iff \\ln|y \\ln x| = C \\iff y \\ln x = C_1',
            explanation: 'ln|ln x| + ln|y| = ln|y ln x| = C.',
          },
        ],
        finalAnswer: '\\ln|\\ln x| = -\\ln|y| + C \\quad (\\text{or } y \\ln x = C_1)',
        arabicNote: 'تكامل (1/x)/(ln x) يعطي ln(ln x) لأن البسط مشتقة المقام.',
      },
    ],
    examTricks: [
      'Decomposing exponents: Always rewrite e^(a+b) = e^a · e^b and e^(a-b) = e^a / e^b.',
      'Logarithmic integration trick: Whenever ∫ (1 / (x ln x)) dx appears, write it as ∫ (1/x)/ln x dx = ln|ln x|.',
      'Inverse trig derivatives: Remember ∫ 1/(1+y²) dy = tan⁻¹(y) and ∫ 1/√(1-y²) dy = sin⁻¹(y).',
    ],
  },

  // =========================================================================
  // PAGE 3: ODE of First Order — [2] Reduce to Separable
  // =========================================================================
  {
    pageNumber: 3,
    title: 'First-Order ODEs: [2] Reduce to Separable Form',
    arabicTitle: 'الأسبوع الأول (٣): معادلات تؤول إلى فصل المتغيرات — التعويض الخطي z = ax + by + c',
    topicCategory: Category.REDUCIBLE_SEPARATION,
    summary:
      'Equations of the form dy/dx = f(ax + by + c): substituting z = ax + by + c transforms entangled equations into simple separable differential equations.',
    laws: [
      {
        id: 'law_red_linear',
        name: 'Linear Combination Substitution Law',
        arabicName: 'قانون التعويض الخطي للتحويل إلى فصل المتغيرات',
        formula: '\\frac{dy}{dx} = f(ax + by + c) \\implies \\text{Put } z = ax + by + c \\implies z\' = a + b y\'',
        explanation:
          'Whenever the variables x and y appear grouped together as a linear expression (ax + by + c) inside any function f (such as powers, tan, sin, exp), substitute z = ax + by + c.',
        arabicExplanation: 'عندما نرى المقدار (ax + by + c) مجموعاً داخل دالة، نضع z = ax + by + c ثم نفاضل بالنسبة لـ x.',
        conditions: [
          'Differentiate: $\\frac{dz}{dx} = a + b \\frac{dy}{dx} \\implies \\frac{dy}{dx} = \\frac{z\' - a}{b}$',
          'Substitute into ODE: $\\frac{z\' - a}{b} = f(z) \\implies \\frac{dz}{dx} = a + b f(z)$',
          'Separate: $\\frac{dz}{a + b f(z)} = dx$',
          'Always substitute back $z = ax + by + c$ at the end of the solution!',
        ],
      },
    ],
    examples: [
      {
        id: 'eg_p3_1',
        title: 'Example 1: Linear Sum ODE',
        problem: 'Solve: $\\frac{dy}{dx} = x + y$',
        mathFormula: '\\frac{dy}{dx} = x + y',
        steps: [
          {
            step: 'Step 1: Define substitution variable z',
            formula: '\\text{Let } z = x + y \\implies z\' = 1 + y\' \\implies y\' = z\' - 1',
            explanation: 'Differentiate z with respect to x: dz/dx = 1 + dy/dx.',
          },
          {
            step: 'Step 2: Substitute into differential equation',
            formula: 'z\' - 1 = z \\implies z\' = 1 + z \\implies \\frac{dz}{dx} = 1 + z',
            explanation: 'Replace y\' with z\' - 1 and (x+y) with z.',
          },
          {
            step: 'Step 3: Separate variables',
            formula: '\\int \\frac{1}{1 + z} \\, dz = \\int dx',
            explanation: 'Divide both sides by (1 + z) and multiply by dx.',
          },
          {
            step: 'Step 4: Integrate both sides',
            formula: '\\ln|1 + z| = x + C',
            explanation: 'Integrate: ln|1+z| = x + C.',
          },
          {
            step: 'Step 5: Back-substitute z = x + y',
            formula: '\\ln|1 + x + y| = x + C',
            explanation: 'Replace z with the original expression (x + y).',
          },
        ],
        finalAnswer: '\\ln|1 + x + y| = x + C \\quad (\\text{or } 1 + x + y = C_1 e^x)',
        arabicNote: 'فرض z = x + y يحول المعادلة إلى dz/(1+z) = dx وتكاملها ln|1+x+y| = x + C.',
      },
      {
        id: 'eg_p3_2',
        title: 'Example 2: Trigonometric Tangent Shift ODE',
        problem: 'Solve: $y\' = \\tan(x + y) - 1$',
        mathFormula: 'y\' = \\tan(x + y) - 1',
        steps: [
          {
            step: 'Step 1: Define substitution variable z',
            formula: '\\text{Let } z = x + y \\implies z\' = 1 + y\' \\implies y\' = z\' - 1',
            explanation: 'Differentiate z with respect to x.',
          },
          {
            step: 'Step 2: Substitute into ODE and simplify',
            formula: 'z\' - 1 = \\tan(z) - 1 \\implies z\' = \\tan(z) \\implies \\frac{dz}{dx} = \\tan(z)',
            explanation: 'Cancel -1 from both sides.',
          },
          {
            step: 'Step 3: Separate variables and rewrite tan(z)',
            formula: '\\int \\frac{1}{\\tan(z)} \\, dz = \\int dx \\implies \\int \\frac{\\cos(z)}{\\sin(z)} \\, dz = \\int dx',
            explanation: '1/tan(z) = cot(z) = cos(z)/sin(z).',
          },
          {
            step: 'Step 4: Integrate using logarithmic rule',
            formula: '\\ln|\\sin(z)| = x + C',
            explanation: 'The numerator cos(z) is the derivative of sin(z), giving ln|sin(z)|.',
          },
          {
            step: 'Step 5: Back-substitute z = x + y',
            formula: '\\ln|\\sin(x + y)| = x + C',
            explanation: 'Replace z with (x + y).',
          },
        ],
        finalAnswer: '\\ln|\\sin(x + y)| = x + C',
        arabicNote: 'تعويض z = x + y يحذف -1 من الطرفين لتصبح dz/dx = tan(z) وتكاملها ln|sin(x+y)| = x + C.',
      },
    ],
    examTricks: [
      'Spotting Reducible to Separable: If x and y appear solely inside a function as (x + y) or (ax + by + c), ALWAYS let z = ax + by + c.',
      'Trig identities to remember: 1/tan(z) = cos(z)/sin(z) -> integral is ln|sin(z)|.',
      'Always remember: z\' = a + b y\' -> y\' = (z\' - a)/b.',
    ],
  },

  // =========================================================================
  // PAGE 4: ODE of First Order — [3] Homogeneous Equations
  // =========================================================================
  {
    pageNumber: 4,
    title: 'First-Order ODEs: [3] Homogeneous Equations Method',
    arabicTitle: 'الأسبوع الأول (٤): معادلات الرتبة الأولى — ثالثاً: المعادلات المتجانسة',
    topicCategory: Category.HOMOGENEOUS,
    summary:
      'Homogeneous First-Order Equations: recognizing f(y/x), applying the standard transformation y = u·x and y\' = u + x·u\', separating u and x, and integrating.',
    laws: [
      {
        id: 'law_homog_substitution',
        name: 'Homogeneous Transformation Law',
        arabicName: 'قانون التعويض في المعادلات المتجانسة',
        formula: '\\frac{dy}{dx} = f\\left(\\frac{y}{x}\\right) \\implies \\text{Let } u = \\frac{y}{x} \\implies y = u\\cdot x, \\quad y\' = u + x \\frac{du}{dx}',
        explanation:
          'A first-order ODE is homogeneous if dy/dx can be written purely as a function of the single ratio (y/x). Substituting y = ux converts the ODE into a separable equation in u and x.',
        arabicExplanation: 'نضع u = y/x ومنها y = u·x ونفاضل بحاصل ضرب دالتين y\' = u + x u\' ثم نفصل المتغيرات.',
        conditions: [
          'By Product Rule: $\\frac{d}{dx}(u \\cdot x) = u \\cdot 1 + x \\frac{du}{dx} = u + x u\'$.',
          'Substitute: $u + x \\frac{du}{dx} = f(u) \\implies x \\frac{du}{dx} = f(u) - u$.',
          'Separate: $\\frac{du}{f(u) - u} = \\frac{dx}{x}$.',
          'Back substitute: $u = \\frac{y}{x}$.',
        ],
      },
    ],
    examples: [
      {
        id: 'eg_p4_1',
        title: 'Example 1: Algebraic Homogeneous Rational ODE',
        problem: 'Solve: $2xy y\' - y^2 + x^2 = 0$',
        mathFormula: '2xy \\frac{dy}{dx} - y^2 + x^2 = 0',
        steps: [
          {
            step: 'Step 1: Isolate dy/dx',
            formula: 'y\' = \\frac{y^2 - x^2}{2xy}',
            explanation: 'Move y² - x² to RHS and divide by 2xy.',
          },
          {
            step: 'Step 2: Divide numerator and denominator by x² to form (y/x)',
            formula: 'y\' = \\frac{(y/x)^2 - 1}{2(y/x)} = \\frac{u^2 - 1}{2u}',
            explanation: 'Split the fraction: y/(2x) - x/(2y) = (1/2)(y/x) - 1/(2(y/x)).',
          },
          {
            step: 'Step 3: Substitute y = ux and y\' = u + x u\'',
            formula: 'u + x u\' = \\frac{u^2 - 1}{2u}',
            explanation: 'Replace y\' with u + x u\'.',
          },
          {
            step: 'Step 4: Subtract u and combine fractions',
            formula: 'x u\' = \\frac{u^2 - 1}{2u} - u = \\frac{u^2 - 1 - 2u^2}{2u} = \\frac{-(u^2 + 1)}{2u}',
            explanation: 'Find common denominator 2u: (u² - 1 - 2u²) / (2u) = -(u² + 1) / (2u).',
          },
          {
            step: 'Step 5: Separate variables',
            formula: '\\int \\frac{2u}{u^2 + 1} \\, du = -\\int \\frac{1}{x} \\, dx',
            explanation: 'Cross-multiply to isolate u terms on left and x terms on right.',
          },
          {
            step: 'Step 6: Integrate both sides',
            formula: '\\ln(u^2 + 1) = -\\ln|x| + C',
            explanation: 'The numerator 2u is the derivative of u² + 1, giving ln(u² + 1).',
          },
          {
            step: 'Step 7: Back-substitute u = y/x',
            formula: '\\ln\\left(\\left(\\frac{y}{x}\\right)^2 + 1\\right) = -\\ln|x| + C \\iff \\ln\\left(\\frac{x^2 + y^2}{x^2}\\right) + \\ln|x| = C \\iff \\frac{x^2 + y^2}{|x|} = C_1',
            explanation: 'Substitute u = y/x and simplify logarithmic terms.',
          },
        ],
        finalAnswer: '\\ln\\left(\\left(\\frac{y}{x}\\right)^2 + 1\\right) = -\\ln|x| + C \\quad \\left(\\text{or } \\frac{x^2 + y^2}{|x|} = C_1\\right)',
        arabicNote: 'توحيد المقامات: (u² - 1)/(2u) - u = -(u² + 1)/(2u) ثم تكامل 2u/(u²+1) بـ ln(u²+1).',
      },
      {
        id: 'eg_p4_2',
        title: 'Example 2: Trigonometric Ratio Cosine ODE',
        problem: 'Solve: $(x y\' - y) \\cos\\left(\\frac{2y}{x}\\right) = -3x^4$',
        mathFormula: '(x y\' - y) \\cos\\left(\\frac{2y}{x}\\right) = -3x^4',
        steps: [
          {
            step: 'Step 1: Divide by x to reveal (y\' - y/x)',
            formula: '\\left(y\' - \\frac{y}{x}\\right) \\cos\\left(\\frac{2y}{x}\\right) = -3x^3',
            explanation: 'Divide both sides by x: (x y\' - y)/x = y\' - y/x, and -3x⁴/x = -3x³.',
          },
          {
            step: 'Step 2: Substitute y = ux and y\' = u + x u\'',
            formula: 'y\' - \\frac{y}{x} = (u + x u\') - u = x u\'',
            explanation: 'Notice the remarkable cancellation: (u + x u\') - u = x u\'!',
          },
          {
            step: 'Step 3: Substitute into the differential equation',
            formula: '(x u\') \\cos(2u) = -3x^3 \\implies u\' \\cos(2u) = -3x^2',
            explanation: 'Divide both sides by x.',
          },
          {
            step: 'Step 4: Separate variables and integrate',
            formula: '\\int \\cos(2u) \\, du = -\\int 3x^2 \\, dx',
            explanation: 'Rewrite u\' as du/dx and separate differentials.',
          },
          {
            step: 'Step 5: Perform integrations',
            formula: '\\frac{\\sin(2u)}{2} = -x^3 + C',
            explanation: 'Integral of cos(2u) du is sin(2u)/2; integral of -3x² dx is -x³.',
          },
          {
            step: 'Step 6: Back-substitute u = y/x',
            formula: '\\frac{\\sin\\left(\\frac{2y}{x}\\right)}{2} = -x^3 + C',
            explanation: 'Replace u with (y/x).',
          },
        ],
        finalAnswer: '\\frac{1}{2} \\sin\\left(\\frac{2y}{x}\\right) = -x^3 + C',
        arabicNote: 'ملاحظة عبقرية: (xy\' - y)/x = (u + x u\' - u) = x u\'، تحذف الحدود فوراً لتصبح cos(2u) du = -3x² dx.',
      },
    ],
    examTricks: [
      'The Magic Shortcut: (x y\' - y) / x always simplifies directly to x u\' when y = ux!',
      'Common denominator alert: When computing f(u) - u, carefully combine terms: (u² - 1)/(2u) - u = -(u² + 1)/(2u).',
      'Argument recognition: When an angle has (y/x) or (2y/x), it is 100% a Homogeneous equation.',
    ],
  },
];
