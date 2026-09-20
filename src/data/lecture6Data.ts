import { Category, LecturePage } from '../types';

export const LECTURE_6_PAGES: LecturePage[] = [
  // =========================================================================
  // PAGE 19 (Week 6 - Page 1): Laplace Transform Definition, Table & Trig Product Identities
  // =========================================================================
  {
    pageNumber: 19,
    title: 'Laplace Transform: Definition, Standard Formulas Table & Trigonometric Power Reductions',
    arabicTitle: 'الأسبوع السادس (١): تعريف تحويل لابلاس، جدول التحويلات القياسية، ومتطابقات فك الدوال المثلثية',
    topicCategory: Category.LAPLACE_TRANSFORMS,
    summary:
      'Fundamental integral transformation converting time-domain functions f(t) to s-domain algebraic expressions F(s) = ∫₀^∞ e^{-st} f(t) dt. Detailed reference table for constant, exponential, power, sine, cosine, sinh, and cosh functions, with compound trigonometric conversions using product and power-reduction identities.',
    laws: [
      {
        id: 'law_laplace_definition_and_linearity',
        name: 'Laplace Transform Integral Definition & Linearity Property',
        arabicName: 'تعريف تحويل لابلاس وخاصية الخطية (Linearity)',
        formula: '\\mathcal{L}\\{f(t)\\} = \\int_0^\\infty e^{-st} f(t) \\, dt = F(s), \\qquad \\mathcal{L}\\{a f(t) + b g(t)\\} = a \\mathcal{L}\\{f(t)\\} + b \\mathcal{L}\\{g(t)\\}',
        explanation:
          'Transforms a piecewise continuous function of exponential order into an algebraic frequency function F(s). Constants factor out and addition distributes.',
        arabicExplanation:
          'تحويل تكاملي يحول الدوال من مجال الزمن t إلى مجال التردد s. خاصية الخطية تسمح بتوزيع التحويل على الجمع وإخراج الثوابت خارج التحويل.',
      },
      {
        id: 'law_laplace_standard_table_week6',
        name: 'Standard Elementary Laplace Transforms Table',
        arabicName: 'جدول تحويلات لابلاس القياسية الأساسية',
        formula: '\\begin{array}{|c|c|} \\hline f(t) & F(s) = \\mathcal{L}\\{f(t)\\} \\\\ \\hline C & \\frac{C}{s} \\\\ e^{at} & \\frac{1}{s - a} \\\\ t^n \\; (n \\in \\mathbb{N}) & \\frac{n!}{s^{n+1}} \\\\ \\sin(at) & \\frac{a}{s^2 + a^2} \\\\ \\cos(at) & \\frac{s}{s^2 + a^2} \\\\ \\sinh(at) & \\frac{a}{s^2 - a^2} \\\\ \\cosh(at) & \\frac{s}{s^2 - a^2} \\\\ \\hline \\end{array}',
        explanation:
          'Core catalog of operational transforms. Note that circular trig functions have (s² + a²) in denominator, while hyperbolic functions have (s² - a²). Cosine and Cosh place s in numerator.',
        arabicExplanation:
          'الجدول الأساسي: الثابت مقسوم على s، الدالة الأسية تغير إشارة a، كثيرة الحدود مضروب n على s^(n+1)، والساين ثابت على s²+a²، والكوزين s على s²+a². الدوال الزائدية تضع (-) في المقام.',
      },
      {
        id: 'law_trig_product_power_identities_laplace',
        name: 'Trigonometric Product & Power Reductions for Laplace',
        arabicName: 'متطابقات فك ضرب وقوى الدوال المثلثية لتحويل لابلاس',
        formula: '\\begin{aligned} \\sin(A)\\cos(B) &= \\frac{1}{2}\\left[\\sin(A+B) + \\sin(A-B)\\right] \\\\ \\sin(at)\\cos(at) &= \\frac{1}{2}\\sin(2at) \\\\ \\cos^2(at) &= \\frac{1}{2}\\left[1 + \\cos(2at)\\right] \\\\ \\sin^2(at) &= \\frac{1}{2}\\left[1 - \\cos(2at)\\right] \\end{aligned}',
        explanation:
          'Laplace cannot transform nonlinear products or squares directly. Convert all products into linear sums of single sines and cosines before applying table rules.',
        arabicExplanation:
          'لا يمكن تحويل حاصل ضرب دالتين مثلثيتين أو دالة مربعة مباشرة؛ يجب تحويلها أولاً إلى مجموع دوال مثلثية خطية باستخدام متطابقات نصف الزاوية وحاصل الضرب.',
      },
    ],
    examples: [
      {
        id: 'eg_p19_1',
        title: 'Example 1: Exponential and Sine Linear Sum',
        problem: 'Find $\\mathcal{L}\\{f(t)\\}$ for $f(t) = 3e^{2t} + \\sin(3t)$',
        mathFormula: 'f(t) = 3e^{2t} + \\sin(3t)',
        steps: [
          {
            step: 'Step 1: Apply Linearity and Table Rules',
            formula: '\\mathcal{L}\\{3e^{2t}\\} = 3 \\cdot \\frac{1}{s - 2}, \\qquad \\mathcal{L}\\{\\sin(3t)\\} = \\frac{3}{s^2 + 9}',
            explanation: 'Use transform of e^{at} with a = 2 and sin(at) with a = 3.',
          },
          {
            step: 'Step 2: Combine Results',
            formula: 'F(s) = \\frac{3}{s - 2} + \\frac{3}{s^2 + 9}',
            explanation: 'Sum of individual transforms.',
          },
        ],
        finalAnswer: 'F(s) = \\frac{3}{s-2} + \\frac{3}{s^2+9}',
        arabicNote: 'تطبيق مباشر لجدول التحويلات مع خاصية الخطية.',
      },
      {
        id: 'eg_p19_2',
        title: 'Example 2: Monomial Power and Cosine',
        problem: 'Find $\\mathcal{L}\\{f(t)\\}$ for $f(t) = t^3 + \\cos(10t)$',
        mathFormula: 'f(t) = t^3 + \\cos(10t)',
        steps: [
          {
            step: 'Step 1: Apply Power and Cosine Rules',
            formula: '\\mathcal{L}\\{t^3\\} = \\frac{3!}{s^{3+1}} = \\frac{6}{s^4}, \\qquad \\mathcal{L}\\{\\cos(10t)\\} = \\frac{s}{s^2 + 10^2} = \\frac{s}{s^2 + 100}',
            explanation: 'For t³ numerator is 3! = 6; for cos(10t) numerator is s.',
          },
        ],
        finalAnswer: 'F(s) = \\frac{6}{s^4} + \\frac{s}{s^2+100}',
        arabicNote: 'تحويل t³ هو !3 مقسوماً على s⁴، وتحويل cos(10t) يضع s في البسط.',
      },
      {
        id: 'eg_p19_3',
        title: 'Example 3: Constant plus Cosine Squared (Power Reduction)',
        problem: 'Find $\\mathcal{L}\\{f(t)\\}$ for $f(t) = 4 + \\cos^2(t)$',
        mathFormula: 'f(t) = 4 + \\cos^2(t)',
        steps: [
          {
            step: 'Step 1: Reduce Cosine Squared using Half-Angle Identity',
            formula: '\\cos^2(t) = \\frac{1}{2}(1 + \\cos(2t)) = \\frac{1}{2} + \\frac{1}{2}\\cos(2t)',
            explanation: 'Expand to avoid square.',
          },
          {
            step: 'Step 2: Simplify Constant Term',
            formula: 'f(t) = 4 + \\frac{1}{2} + \\frac{1}{2}\\cos(2t) = \\frac{9}{2} + \\frac{1}{2}\\cos(2t)',
            explanation: '4 + 1/2 = 9/2.',
          },
          {
            step: 'Step 3: Apply Laplace Transform',
            formula: 'F(s) = \\frac{9/2}{s} + \\frac{1}{2} \\cdot \\frac{s}{s^2 + 4} = \\frac{9}{2s} + \\frac{s}{2(s^2 + 4)}',
            explanation: 'Transform 9/2 to 9/(2s) and cos(2t) to s/(s²+4).',
          },
        ],
        finalAnswer: 'F(s) = \\frac{9}{2s} + \\frac{s}{2(s^2+4)}',
        arabicNote: 'يجب تحويل cos²(t) إلى نصف الزاوية أولاً قبل إجراء التحويل.',
      },
      {
        id: 'eg_p19_4',
        title: 'Example 4: Product of Different Frequency Sines and Cosines',
        problem: 'Find $\\mathcal{L}\\{f(t)\\}$ for $f(t) = \\sin(3t)\\cos(2t)$',
        mathFormula: 'f(t) = \\sin(3t)\\cos(2t)',
        steps: [
          {
            step: 'Step 1: Apply Product-to-Sum Trig Formula',
            formula: '\\sin(3t)\\cos(2t) = \\frac{1}{2}\\left[\\sin(3t+2t) + \\sin(3t-2t)\\right] = \\frac{1}{2}\\left[\\sin(5t) + \\sin(t)\\right]',
            explanation: 'Product converted to sum of single sines.',
          },
          {
            step: 'Step 2: Transform Each Sine Term',
            formula: 'F(s) = \\frac{1}{2}\\left[ \\frac{5}{s^2 + 25} + \\frac{1}{s^2 + 1} \\right]',
            explanation: 'Use table rule for sin(at).',
          },
        ],
        finalAnswer: 'F(s) = \\frac{1}{2}\\left[\\frac{5}{s^2+25} + \\frac{1}{s^2+1}\\right]',
        arabicNote: 'قانون تحويل حاصل الضرب: sin A cos B = 1/2 [sin(A+B) + sin(A-B)].',
      },
      {
        id: 'eg_p19_5',
        title: 'Example 5: Sine-Cosine Product with Hyperbolic Term',
        problem: 'Find $\\mathcal{L}\\{f(t)\\}$ for $f(t) = \\sin(2t)\\cos(2t) + 3\\sinh(5t)$',
        mathFormula: 'f(t) = \\sin(2t)\\cos(2t) + 3\\sinh(5t)',
        steps: [
          {
            step: 'Step 1: Simplify Trig Product to Double Angle',
            formula: '\\sin(2t)\\cos(2t) = \\frac{1}{2}\\sin(4t)',
            explanation: 'Using 2 sin(u) cos(u) = sin(2u).',
          },
          {
            step: 'Step 2: Transform Sine and Hyperbolic Sine',
            formula: 'F(s) = \\frac{1}{2}\\cdot\\frac{4}{s^2 + 16} + 3\\cdot\\frac{5}{s^2 - 25} = \\frac{2}{s^2 + 16} + \\frac{15}{s^2 - 25}',
            explanation: 'Note the minus sign in hyperbolic sinh: s² - 25.',
          },
        ],
        finalAnswer: 'F(s) = \\frac{2}{s^2+16} + \\frac{15}{s^2-25}',
        arabicNote: 'حاصل ضرب sin(2t)cos(2t) يصبح (1/2)sin(4t)، و sinh(5t) يعطي إشارة سالبة في المقام s²-25.',
      },
      {
        id: 'eg_p19_6',
        title: 'Example 6: Hyperbolic, Polynomial and Constant Combination',
        problem: 'Find $\\mathcal{L}\\{f(t)\\}$ for $f(t) = \\sinh(4t) + t^4 + 3$',
        mathFormula: 'f(t) = \\sinh(4t) + t^4 + 3',
        steps: [
          {
            step: 'Step 1: Apply Transforms to Each Term',
            formula: 'F(s) = \\frac{4}{s^2 - 16} + \\frac{4!}{s^5} + \\frac{3}{s} = \\frac{4}{s^2 - 16} + \\frac{24}{s^5} + \\frac{3}{s}',
            explanation: '4! = 24, denominator for t⁴ is s⁵.',
          },
        ],
        finalAnswer: 'F(s) = \\frac{4}{s^2-16} + \\frac{24}{s^5} + \\frac{3}{s}',
        arabicNote: 'تحويل مباشر للمجموع.',
      },
      {
        id: 'eg_p19_7',
        title: 'Example 7: Sine Squared with Exponential Term',
        problem: 'Find $\\mathcal{L}\\{f(t)\\}$ for $f(t) = \\sin^2(3t) + e^{10t}$',
        mathFormula: 'f(t) = \\sin^2(3t) + e^{10t}',
        steps: [
          {
            step: 'Step 1: Use Sine Squared Half-Angle Identity',
            formula: '\\sin^2(3t) = \\frac{1}{2}[1 - \\cos(6t)] = \\frac{1}{2} - \\frac{1}{2}\\cos(6t)',
            explanation: 'Angle doubles from 3t to 6t.',
          },
          {
            step: 'Step 2: Apply Laplace Transform',
            formula: 'F(s) = \\frac{1}{2}\\left[\\frac{1}{s} - \\frac{s}{s^2 + 36}\\right] + \\frac{1}{s - 10}',
            explanation: 'Individual components transformed according to table.',
          },
        ],
        finalAnswer: 'F(s) = \\frac{1}{2}\\left[\\frac{1}{s} - \\frac{s}{s^2+36}\\right] + \\frac{1}{s-10}',
        arabicNote: 'تحويل sin²(3t) إلى (1/2)[1 - cos(6t)] ثم إجراء التحويل.',
      },
    ],
    examTricks: [
      '⚠️ Remember: $\\sin^2(\\omega t) = \\frac{1-\\cos(2\\omega t)}{2}$ and $\\cos^2(\\omega t) = \\frac{1+\\cos(2\\omega t)}{2}$. Angle always doubles!',
      '💡 Hyperbolic vs Circular Trig: $\\mathcal{L}\\{\\cos(at)\\} = \\frac{s}{s^2+a^2}$ (+ in denominator), but $\\mathcal{L}\\{\\cosh(at)\\} = \\frac{s}{s^2-a^2}$ (- in denominator).',
    ],
  },

  // =========================================================================
  // PAGE 20 (Week 6 - Page 2): Inverse Laplace Transform & The First Shifting Theorem
  // =========================================================================
  {
    pageNumber: 20,
    title: 'Inverse Laplace Transforms & The First Shifting Theorem (Exponential Modulation)',
    arabicTitle: 'الأسبوع السادس (٢): تحويل لابلاس العكسي ونظرية الإزاحة الأولى (First Shifting Theorem)',
    topicCategory: Category.LAPLACE_TRANSFORMS,
    summary:
      'Techniques for recovering the original time-domain function f(t) = L⁻¹{F(s)} by matching algebraic fractions to standard table forms, splitting compound numerators, and applying the First Shifting Theorem: L{e^{at} f(t)} = F(s - a), which shifts every occurrence of s into (s - a).',
    laws: [
      {
        id: 'law_first_shifting_theorem_forward',
        name: 'First Shifting Theorem (Frequency Shift / Exponential Damping)',
        arabicName: 'نظرية الإزاحة الأولى (First Shifting Theorem)',
        formula: '\\text{If } \\mathcal{L}\\{f(t)\\} = F(s), \\quad \\text{then } \\mathcal{L}\\{e^{at} f(t)\\} = F(s - a) = \\left. F(s) \\right|_{s \\to s - a}',
        explanation:
          'Multiplying any function f(t) by e^{at} in the time domain corresponds to replacing every s with (s - a) in the frequency domain.',
        arabicExplanation:
          'ضرب أي دالة في e^(at) يؤدي إلى إزاحة كل s في التحويل بمقدار a، أي استبدال كل s بـ (s - a). وإذا كانت e^(-at) نستبدل s بـ (s + a).',
      },
      {
        id: 'law_inverse_laplace_splitting',
        name: 'Inverse Laplace Numerator Splitting Rule',
        arabicName: 'قاعدة تجزئة البسط في تحويل لابلاس العكسي',
        formula: '\\mathcal{L}^{-1}\\left\\{ \\frac{A s + B}{s^2 \\pm c^2} \\right\\} = A \\mathcal{L}^{-1}\\left\\{ \\frac{s}{s^2 \\pm c^2} \\right\\} + \\frac{B}{c} \\mathcal{L}^{-1}\\left\\{ \\frac{c}{s^2 \\pm c^2} \\right\\}',
        explanation:
          'When numerator contains both s and constant terms, split into two separate fractions: one for Cosine/Cosh (s in numerator) and one for Sine/Sinh (constant in numerator).',
        arabicExplanation:
          'عند وجود بسط به (As + B)، نقوم بتجزئة الكسر إلى كسر للكوزين (يحتوي s في البسط) وكسر للساين (يحتوي على الثابت فقط).',
      },
    ],
    examples: [
      {
        id: 'eg_p20_1',
        title: 'Inverse Example 1: Sum of Exponential and Step',
        problem: 'Find $\\mathcal{L}^{-1}\\{F(s)\\}$ for $F(s) = \\frac{1}{s-3} + \\frac{4}{s}$',
        mathFormula: 'F(s) = \\frac{1}{s-3} + \\frac{4}{s}',
        steps: [
          {
            step: 'Step 1: Match with Table Rules',
            formula: '\\mathcal{L}^{-1}\\left\\{\\frac{1}{s-3}\\right\\} = e^{3t}, \\qquad \\mathcal{L}^{-1}\\left\\{\\frac{4}{s}\\right\\} = 4',
            explanation: '1/(s-a) gives e^{at}, and C/s gives constant C.',
          },
        ],
        finalAnswer: 'f(t) = e^{3t} + 4',
        arabicNote: 'تحويل عكسي مباشر: 1/(s-3) يعطي e^(3t) و 4/s يعطي الثابت 4.',
      },
      {
        id: 'eg_p20_2',
        title: 'Inverse Example 2: Cosine and Scaled Exponential',
        problem: 'Find $\\mathcal{L}^{-1}\\{F(s)\\}$ for $F(s) = \\frac{3s}{s^2+16} + \\frac{7}{4s-3}$',
        mathFormula: 'F(s) = 3\\frac{s}{s^2+16} + \\frac{7}{4(s - 3/4)}',
        steps: [
          {
            step: 'Step 1: Normalize Denominator for Linear Factor',
            formula: '\\frac{7}{4s - 3} = \\frac{7}{4\\left(s - \\frac{3}{4}\\right)} = \\frac{7}{4} \\cdot \\frac{1}{s - \\frac{3}{4}}',
            explanation: 'Factor out 4 to make coefficient of s equal to 1.',
          },
          {
            step: 'Step 2: Invert Terms',
            formula: 'f(t) = 3\\cos(4t) + \\frac{7}{4}e^{\\frac{3}{4}t}',
            explanation: 's/(s²+16) inverts to cos(4t).',
          },
        ],
        finalAnswer: 'f(t) = 3\\cos(4t) + \\frac{7}{4}e^{\\frac{3}{4}t}',
        arabicNote: 'في الحد الثاني نأخذ 4 عامل مشترك من المقام ليصبح (s - 3/4) قبل إيجاد التحويل العكسي.',
      },
      {
        id: 'eg_p20_3',
        title: 'Inverse Example 3: Monomial Power and Exponential',
        problem: 'Find $\\mathcal{L}^{-1}\\{F(s)\\}$ for $F(s) = \\frac{18}{s^3} + \\frac{3}{s+4}$',
        mathFormula: 'F(s) = \\frac{18}{s^3} + \\frac{3}{s+4}',
        steps: [
          {
            step: 'Step 1: Format Power Term with Factorial',
            formula: '\\frac{18}{s^3} = \\frac{18}{2!} \\cdot \\frac{2!}{s^{2+1}} = 9 \\cdot \\frac{2!}{s^3} \\implies \\mathcal{L}^{-1} = 9 t^2',
            explanation: 'Divide and multiply by 2! = 2.',
          },
          {
            step: 'Step 2: Invert Exponential Term',
            formula: '\\mathcal{L}^{-1}\\left\\{\\frac{3}{s+4}\\right\\} = 3e^{-4t}',
            explanation: '1/(s+4) corresponds to e^{-4t}.',
          },
        ],
        finalAnswer: 'f(t) = 9t^2 + 3e^{-4t}',
        arabicNote: '18/s³ = (18/2!) * (2!/s³) = 9t².',
      },
      {
        id: 'eg_p20_4',
        title: 'Inverse Example 4: Hyperbolic and Monomial Power',
        problem: 'Find $\\mathcal{L}^{-1}\\{F(s)\\}$ for $F(s) = \\frac{4}{s^2-12} - \\frac{5}{s^8}$',
        mathFormula: 'F(s) = \\frac{4}{s^2-12} - \\frac{5}{s^8}',
        steps: [
          {
            step: 'Step 1: Format Hyperbolic Sine and Power Term',
            formula: '\\frac{4}{s^2-12} = \\frac{4}{\\sqrt{12}}\\cdot\\frac{\\sqrt{12}}{s^2-(\\sqrt{12})^2} \\implies \\frac{4}{\\sqrt{12}}\\sinh(\\sqrt{12}t)',
            explanation: 'a = √12.',
          },
          {
            step: 'Step 2: Format t^7 Term',
            formula: '\\frac{5}{s^8} = \\frac{5}{7!}\\cdot\\frac{7!}{s^{7+1}} \\implies \\frac{5}{7!} t^7',
            explanation: 'Divide by 7! = 5040.',
          },
        ],
        finalAnswer: 'f(t) = \\frac{4}{\\sqrt{12}}\\sinh(\\sqrt{12}t) - \\frac{5}{7!}t^7',
        arabicNote: 'المقام به s²-12، لذلك التحويل العكسي دالة زائدية sinh(√12 t).',
      },
      {
        id: 'eg_p20_5',
        title: 'Inverse Example 5: Splitting Numerator (s + 2)/(s² + 6) + 6/(s - 12)',
        problem: 'Find $\\mathcal{L}^{-1}\\{F(s)\\}$ for $F(s) = \\frac{s+2}{s^2+6} + \\frac{6}{s-12}$',
        mathFormula: 'F(s) = \\frac{s}{s^2+6} + \\frac{2}{s^2+6} + \\frac{6}{s-12}',
        steps: [
          {
            step: 'Step 1: Split Numerator into Cosine and Sine Parts',
            formula: '\\frac{s+2}{s^2+6} = \\frac{s}{s^2+6} + \\frac{2}{\\sqrt{6}}\\cdot\\frac{\\sqrt{6}}{s^2+6}',
            explanation: 'Split into s/(s²+6) and 2/(s²+6).',
          },
          {
            step: 'Step 2: Invert All Terms',
            formula: 'f(t) = \\cos(\\sqrt{6}t) + \\frac{2}{\\sqrt{6}}\\sin(\\sqrt{6}t) + 6e^{12t}',
            explanation: 'Combine inverse transforms.',
          },
        ],
        finalAnswer: 'f(t) = \\cos(\\sqrt{6}t) + \\frac{2}{\\sqrt{6}}\\sin(\\sqrt{6}t) + 6e^{12t}',
        arabicNote: 'تجزئة الكسر (s+2)/(s²+6) إلى كوزين وساين مع ضبط الثابت في الساين بـ √6.',
      },
      {
        id: 'eg_p20_6',
        title: 'Shift Example 1: Damped Monomial t e^{15t}',
        problem: 'Find $\\mathcal{L}\\{t e^{15t}\\}$ using First Shifting Theorem',
        mathFormula: 'f(t) = t e^{15t}',
        steps: [
          {
            step: 'Step 1: Transform Base Function t',
            formula: '\\mathcal{L}\\{t\\} = \\frac{1}{s^2}',
            explanation: 'Table transform for t¹.',
          },
          {
            step: 'Step 2: Shift s -> s - 15',
            formula: 'F(s) = \\left. \\frac{1}{s^2} \\right|_{s \\to s-15} = \\frac{1}{(s-15)^2}',
            explanation: 'Multiplication by e^{15t} shifts s to s-15.',
          },
        ],
        finalAnswer: 'F(s) = \\frac{1}{(s-15)^2}',
        arabicNote: 'تحويل t هو 1/s²، وبسبب e^(15t) نستبدل كل s بـ (s-15).',
      },
      {
        id: 'eg_p20_7',
        title: 'Shift Example 2: Damped Cosine e^{-2t} cos(10t)',
        problem: 'Find $\\mathcal{L}\\{e^{-2t}\\cos(10t)\\}$',
        mathFormula: 'f(t) = e^{-2t}\\cos(10t)',
        steps: [
          {
            step: 'Step 1: Base Transform of cos(10t)',
            formula: '\\mathcal{L}\\{\\cos(10t)\\} = \\frac{s}{s^2 + 100}',
            explanation: 'Standard cosine transform.',
          },
          {
            step: 'Step 2: Apply Shift s -> s - (-2) = s + 2',
            formula: 'F(s) = \\frac{s+2}{(s+2)^2 + 100}',
            explanation: 'Replace BOTH occurrences of s with (s+2).',
          },
        ],
        finalAnswer: 'F(s) = \\frac{s+2}{(s+2)^2+100}',
        arabicNote: 'استبدال كل s في البسط والمقام بـ (s+2).',
      },
      {
        id: 'eg_p20_8',
        title: 'Shift Example 3: Damped Cosh e^{4t} cosh(2t)',
        problem: 'Find $\\mathcal{L}\\{e^{4t}\\cosh(2t)\\}$',
        mathFormula: 'f(t) = e^{4t}\\cosh(2t)',
        steps: [
          {
            step: 'Step 1: Base Transform of cosh(2t)',
            formula: '\\mathcal{L}\\{\\cosh(2t)\\} = \\frac{s}{s^2 - 4}',
            explanation: 'Hyperbolic cosh has minus in denominator.',
          },
          {
            step: 'Step 2: Shift s -> s - 4',
            formula: 'F(s) = \\frac{s-4}{(s-4)^2 - 4}',
            explanation: 'Shift s to (s-4).',
          },
        ],
        finalAnswer: 'F(s) = \\frac{s-4}{(s-4)^2 - 4}',
        arabicNote: 'تحويل cosh(2t) هو s/(s²-4)، وبالإزاحة يصبح (s-4)/((s-4)²-4).',
      },
      {
        id: 'eg_p20_9',
        title: 'Shift Example 4: Damped Sine Squared e^{-3t} sin²(t)',
        problem: 'Find $\\mathcal{L}\\{e^{-3t}\\sin^2(t)\\}$',
        mathFormula: 'f(t) = e^{-3t}\\sin^2(t)',
        steps: [
          {
            step: 'Step 1: Expand sin²(t) using Half-Angle Identity',
            formula: 'f(t) = e^{-3t}\\cdot\\frac{1}{2}[1 - \\cos(2t)] = \\frac{1}{2}e^{-3t} - \\frac{1}{2}e^{-3t}\\cos(2t)',
            explanation: 'Expand before shifting.',
          },
          {
            step: 'Step 2: Shift Each Component (s -> s + 3)',
            formula: 'F(s) = \\frac{1}{2}\\left[ \\frac{1}{s+3} - \\frac{s+3}{(s+3)^2 + 4} \\right]',
            explanation: 'Shift s to s+3 for both the constant and cosine transforms.',
          },
        ],
        finalAnswer: 'F(s) = \\frac{1}{2}\\left[\\frac{1}{s+3} - \\frac{s+3}{(s+3)^2+4}\\right]',
        arabicNote: 'نفك sin²(t) أولاً إلى (1/2)(1 - cos 2t) ثم نطبق نظرية الإزاحة s -> s+3.',
      },
    ],
    examTricks: [
      '⚡ Double Shift Danger: When applying the First Shifting Theorem to $\\cos(at)$ or $\\cosh(at)$, remember to replace $s$ in the numerator AS WELL AS in the denominator: $\\frac{s-a}{(s-a)^2 \\pm \\omega^2}$.',
      '📌 Inverse with coefficient: If denominator is $(as - b)$, factor out $a$ first: $\\frac{1}{as - b} = \\frac{1}{a} \\cdot \\frac{1}{s - b/a}$.',
    ],
  },

  // =========================================================================
  // PAGE 21 (Week 6 - Page 3): Inverse Shifting & Completing the Square Method
  // =========================================================================
  {
    pageNumber: 21,
    title: 'Inverse Shifting & Completing the Square for Quadratic Denominators',
    arabicTitle: 'الأسبوع السادس (٣): تحويل لابلاس العكسي بالإزاحة وإكمال المربع للمقامات من الدرجة الثانية',
    topicCategory: Category.LAPLACE_TRANSFORMS,
    summary:
      'Systematic technique for inverting rational functions F(s) with general quadratic denominators s² + bs + c. Completing the square converts s² + bs + c into (s + b/2)² + k², revealing an exponential damping factor e^{-(b/2)t}. Adjustment of the numerator to (s + b/2) isolates damped cosines and sines.',
    laws: [
      {
        id: 'law_completing_square_laplace',
        name: 'Completing the Square Identity for Laplace Inversion',
        arabicName: 'قانون إكمال المربع في تحويل لابلاس العكسي',
        formula: 's^2 + b s + c = \\left(s + \\frac{b}{2}\\right)^2 - \\left(\\frac{b}{2}\\right)^2 + c = (s + \\alpha)^2 \\pm \\beta^2, \\quad \\alpha = \\frac{b}{2}, \\; \\beta = \\sqrt{\\left|c - \\left(\\frac{b}{2}\\right)^2\\right|}',
        explanation:
          'Transforms any quadratic denominator into shifted sum or difference of squares. If the remaining constant is positive (+β²), it inverts to damped circular trig (cos/sin); if negative (-β²), it inverts to damped hyperbolic (cosh/sinh).',
        arabicExplanation:
          'نأخذ نصف معامل s ونربعه: (s + b/2)² - (b/2)² + c. إذا كان الباقي موجباً (+β²) فالناتج دوال مثلثية damped trig، وإذا كان سالباً (-β²) فالناتج دوال زائدية damped hyperbolic.',
      },
      {
        id: 'law_numerator_matching_rule',
        name: 'Shifted Numerator Matching & Splitting Formula',
        arabicName: 'قاعدة مطابقة وتعديل البسط المزاح',
        formula: '\\frac{s + k}{(s + \\alpha)^2 + \\beta^2} = \\frac{(s + \\alpha) + (k - \\alpha)}{(s + \\alpha)^2 + \\beta^2} = \\frac{s + \\alpha}{(s + \\alpha)^2 + \\beta^2} + \\frac{k - \\alpha}{\\beta}\\cdot\\frac{\\beta}{(s + \\alpha)^2 + \\beta^2}',
        explanation:
          'The numerator MUST match the exact shift (s + α) in the denominator to apply the cosine inverse. Any remaining constant is scaled by β to form the sine inverse.',
        arabicExplanation:
          'يجب أن يظهر التعبير (s + α) كاملاً في البسط؛ لذلك نكتب s + k بصيغة (s + α) + (k - α)، ليعطي الجزء الأول e^(-αt) cos(βt) والجزء الثاني e^(-αt) sin(βt).',
      },
    ],
    examples: [
      {
        id: 'eg_p21_1',
        title: 'Example 1: Shifted Power Inverse',
        problem: 'Find $\\mathcal{L}^{-1}\\{F(s)\\}$ for $F(s) = \\frac{4}{(s-3)^3}$',
        mathFormula: 'F(s) = \\frac{4}{(s-3)^3}',
        steps: [
          {
            step: 'Step 1: Identify Base Transform and Shift',
            formula: '\\frac{1}{(s-3)^3} = \\left. \\frac{1}{s^3} \\right|_{s \\to s-3} \\implies \\mathcal{L}^{-1}\\left\\{\\frac{1}{s^3}\\right\\} = \\frac{t^2}{2!}',
            explanation: 'Base is 1/s³, shift is e^{3t}.',
          },
          {
            step: 'Step 2: Combine with Multiplier',
            formula: 'f(t) = 4 e^{3t} \\frac{t^2}{2!} = 2 t^2 e^{3t}',
            explanation: '4 / 2! = 2.',
          },
        ],
        finalAnswer: 'f(t) = 2t^2 e^{3t}',
        arabicNote: 'تحويل عكسي لـ 1/s³ يعطي t²/!2، والإزاحة (s-3) تعطي e^(3t).',
      },
      {
        id: 'eg_p21_2',
        title: 'Example 2: Shifted Sine Inverse',
        problem: 'Find $\\mathcal{L}^{-1}\\{F(s)\\}$ for $F(s) = \\frac{3}{(s+2)^2 + 16}$',
        mathFormula: 'F(s) = \\frac{3}{(s+2)^2 + 16}',
        steps: [
          {
            step: 'Step 1: Identify Parameters',
            formula: '\\alpha = 2 \\implies e^{-2t}, \\quad \\beta^2 = 16 \\implies \\beta = 4',
            explanation: 'Sine structure with constant numerator.',
          },
          {
            step: 'Step 2: Balance Constant and Invert',
            formula: 'F(s) = \\frac{3}{4} \\cdot \\frac{4}{(s+2)^2 + 4^2} \\implies f(t) = \\frac{3}{4}e^{-2t}\\sin(4t)',
            explanation: 'Multiply and divide by 4.',
          },
        ],
        finalAnswer: 'f(t) = \\frac{3}{4}e^{-2t}\\sin(4t)',
        arabicNote: 'المقام (s+2)² + 16 يعطي e^(-2t) sin(4t) بعد ضبط البسط ليصبح 4.',
      },
      {
        id: 'eg_p21_3',
        title: 'Example 3: Shifted Sinh and Simple Pole',
        problem: 'Find $\\mathcal{L}^{-1}\\{F(s)\\}$ for $F(s) = \\frac{4}{(s+5)^2 - 9} + \\frac{1}{s-2}$',
        mathFormula: 'F(s) = \\frac{4}{(s+5)^2 - 9} + \\frac{1}{s-2}',
        steps: [
          {
            step: 'Step 1: Invert Hyperbolic Shifted Part',
            formula: '\\frac{4}{(s+5)^2 - 3^2} = \\frac{4}{3} \\cdot \\frac{3}{(s+5)^2 - 3^2} \\implies \\frac{4}{3}e^{-5t}\\sinh(3t)',
            explanation: 'Minus sign indicates sinh(3t).',
          },
          {
            step: 'Step 2: Invert Simple Pole',
            formula: '\\mathcal{L}^{-1}\\left\\{\\frac{1}{s-2}\\right\\} = e^{2t}',
            explanation: 'Standard exponential.',
          },
        ],
        finalAnswer: 'f(t) = \\frac{4}{3}e^{-5t}\\sinh(3t) + e^{2t}',
        arabicNote: 'وجود إشارة السالب في (s+5)² - 9 يعني تحويل عكسي لـ sinh(3t) مع إزاحة e^(-5t).',
      },
      {
        id: 'eg_p21_4',
        title: 'Example 4: Numerator Adjustment s / ((s-4)² + 20)',
        problem: 'Find $\\mathcal{L}^{-1}\\{F(s)\\}$ for $F(s) = \\frac{s}{(s-4)^2 + 20}$',
        mathFormula: 'F(s) = \\frac{s}{(s-4)^2 + 20}',
        steps: [
          {
            step: 'Step 1: Match Numerator to Shift (s - 4)',
            formula: 's = (s - 4) + 4 \\implies F(s) = \\frac{s-4}{(s-4)^2 + 20} + \\frac{4}{(s-4)^2 + 20}',
            explanation: 'Add and subtract 4 in the numerator.',
          },
          {
            step: 'Step 2: Invert Each Term with beta = sqrt(20)',
            formula: 'f(t) = e^{4t}\\cos(\\sqrt{20}t) + \\frac{4}{\\sqrt{20}}e^{4t}\\sin(\\sqrt{20}t)',
            explanation: 'First term is damped cosine, second term is damped sine.',
          },
        ],
        finalAnswer: 'f(t) = e^{4t}\\cos(\\sqrt{20}t) + \\frac{4}{\\sqrt{20}}e^{4t}\\sin(\\sqrt{20}t)',
        arabicNote: 'نعدل البسط s إلى (s-4)+4 ليتطابق مع إزاحة المقام، فيعطي كوزين وساين كلاهما مضروب في e^(4t).',
      },
      {
        id: 'eg_p21_5',
        title: 'Example 5: Completing the Square for 1 / (s² + 4s + 8)',
        problem: 'Find $\\mathcal{L}^{-1}\\{F(s)\\}$ for $F(s) = \\frac{1}{s^2 + 4s + 8}$',
        mathFormula: 'F(s) = \\frac{1}{s^2 + 4s + 8}',
        steps: [
          {
            step: 'Step 1: Complete the Square in Denominator',
            formula: 's^2 + 4s + 8 = (s + 2)^2 - 4 + 8 = (s + 2)^2 + 4 = (s + 2)^2 + 2^2',
            explanation: 'Half of 4 is 2; square is 4; 8 - 4 = 4.',
          },
          {
            step: 'Step 2: Invert as Shifted Sine',
            formula: 'F(s) = \\frac{1}{2} \\cdot \\frac{2}{(s+2)^2 + 2^2} \\implies f(t) = \\frac{1}{2}e^{-2t}\\sin(2t)',
            explanation: 'Multiply and divide by beta = 2.',
          },
        ],
        finalAnswer: 'f(t) = \\frac{1}{2}e^{-2t}\\sin(2t)',
        arabicNote: 'إكمال المربع: s² + 4s + 8 = (s+2)² + 4، وهو تحويل عكسي لـ (1/2)e^(-2t) sin(2t).',
      },
      {
        id: 'eg_p21_6',
        title: 'Example 6: Completing the Square with Hyperbolic Result s / (s² + 10s + 8)',
        problem: 'Find $\\mathcal{L}^{-1}\\{F(s)\\}$ for $F(s) = \\frac{s}{s^2 + 10s + 8}$',
        mathFormula: 'F(s) = \\frac{s}{s^2 + 10s + 8}',
        steps: [
          {
            step: 'Step 1: Complete the Square in Denominator',
            formula: 's^2 + 10s + 8 = (s + 5)^2 - 25 + 8 = (s + 5)^2 - 17',
            explanation: 'Negative constant -17 indicates hyperbolic formulas.',
          },
          {
            step: 'Step 2: Adjust Numerator to Match Shift (s + 5)',
            formula: 's = (s + 5) - 5 \\implies F(s) = \\frac{s+5}{(s+5)^2 - 17} - \\frac{5}{(s+5)^2 - 17}',
            explanation: 'Split into damped Cosh and Sinh.',
          },
          {
            step: 'Step 3: Invert Both Terms',
            formula: 'f(t) = e^{-5t}\\cosh(\\sqrt{17}t) - \\frac{5}{\\sqrt{17}}e^{-5t}\\sinh(\\sqrt{17}t)',
            explanation: 'beta = sqrt(17).',
          },
        ],
        finalAnswer: 'f(t) = e^{-5t}\\cosh(\\sqrt{17}t) - \\frac{5}{\\sqrt{17}}e^{-5t}\\sinh(\\sqrt{17}t)',
        arabicNote: 'بما أن الباقي بعد إكمال المربع سالب (-17)، فإن النتيجة دوال زائدية cosh و sinh مع الإزاحة e^(-5t).',
      },
      {
        id: 'eg_p21_7',
        title: 'Example 7: General Quadratic (s + 9) / (s² + 6s + 13)',
        problem: 'Find $\\mathcal{L}^{-1}\\{F(s)\\}$ for $F(s) = \\frac{s+9}{s^2 + 6s + 13}$',
        mathFormula: 'F(s) = \\frac{s+9}{s^2 + 6s + 13}',
        steps: [
          {
            step: 'Step 1: Complete the Square in Denominator',
            formula: 's^2 + 6s + 13 = (s + 3)^2 - 9 + 13 = (s + 3)^2 + 4 = (s + 3)^2 + 2^2',
            explanation: 'Positive constant +4 indicates circular trig (cos/sin).',
          },
          {
            step: 'Step 2: Express Numerator in terms of (s + 3)',
            formula: 's + 9 = (s + 3) + 6 \\implies F(s) = \\frac{s+3}{(s+3)^2 + 2^2} + \\frac{6}{(s+3)^2 + 2^2}',
            explanation: 'Decompose numerator into cosine part and sine part.',
          },
          {
            step: 'Step 3: Adjust Sine Constant and Invert',
            formula: 'F(s) = \\frac{s+3}{(s+3)^2 + 2^2} + 3 \\cdot \\frac{2}{(s+3)^2 + 2^2} \\implies f(t) = e^{-3t}\\cos(2t) + 3e^{-3t}\\sin(2t)',
            explanation: 'Invert each shifted term.',
          },
        ],
        finalAnswer: 'f(t) = e^{-3t}\\cos(2t) + 3e^{-3t}\\sin(2t)',
        arabicNote: 'إكمال المربع يعطي (s+3)² + 4، ونكتب البسط s+9 = (s+3) + 6، لنحصل على e^(-3t) cos(2t) + 3e^(-3t) sin(2t).',
      },
    ],
    examTricks: [
      '🎯 The Completing Square Rule: $s^2 + bs + c = (s + b/2)^2 + (c - b^2/4)$. If $c - b^2/4 > 0 \\implies$ circular $\\cos/\\sin$; if $< 0 \\implies$ hyperbolic $\\cosh/\\sinh$.',
      '🔥 Never leave naked $s$ in numerator: Always rewrite $s$ as $(s + \\alpha) - \\alpha$ to match the denominator shift $(s + \\alpha)$ before inverting!',
    ],
  },
];
