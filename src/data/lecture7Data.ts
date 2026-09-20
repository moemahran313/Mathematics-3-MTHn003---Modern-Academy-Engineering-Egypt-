import { Category, LecturePage } from '../types';

export const LECTURE_7_PAGES: LecturePage[] = [
  // =========================================================================
  // PAGE 22 (Week 7 - Page 1): Second Shifting Theorem & Heaviside Step Function
  // =========================================================================
  {
    pageNumber: 22,
    title: 'Second Shifting Theorem (Heaviside Unit Step Function & Time Delay)',
    arabicTitle: 'الأسبوع السابع (١): نظرية الإزاحة الثانية (دالة الخطوة لـ هيفيزيد والتأخير الزمني)',
    topicCategory: Category.LAPLACE_THEOREMS,
    summary:
      'Introduction of the Heaviside unit step function u_a(t) = u(t - a), turning ON at t = a. Formulates the Second Shifting Theorem: L{u_a(t) f(t - a)} = e^{-as} F(s). Detailed techniques for transforming non-aligned functions by algebraically creating the shifted argument (t - a).',
    laws: [
      {
        id: 'law_heaviside_step_definition',
        name: 'Heaviside Unit Step Function u_a(t) Definition',
        arabicName: 'تعريف دالة الخطوة الواحدية (Heaviside Unit Step Function)',
        formula: 'u_a(t) = u(t - a) = \\begin{cases} 1, & t \\ge a \\\\ 0, & t < a \\end{cases} \\qquad \\implies \\mathcal{L}\\{u_a(t)\\} = \\frac{e^{-as}}{s}',
        explanation:
          'Acts as an electrical or physical switch turning on at time t = a. The Laplace transform of a pure delayed step function is e^{-as}/s.',
        arabicExplanation:
          'دالة المفتاح: قيمتها صفر قبل الزمن a وتصبح 1 عند الزمن a وما بعده. تحويل لابلاس لدالة الخطوة المنفردة هو e^(-as)/s.',
      },
      {
        id: 'law_second_shifting_theorem_forward',
        name: 'Second Shifting Theorem (Time Shift / Time Delay)',
        arabicName: 'نظرية الإزاحة الثانية في مجال الزمن (Second Shifting Theorem)',
        formula: '\\mathcal{L}\\{u_a(t) f(t - a)\\} = e^{-as} F(s), \\qquad \\text{where } F(s) = \\mathcal{L}\\{f(t)\\}',
        explanation:
          'A time delay of a units in the time domain corresponds to multiplication by e^{-as} in the s-domain, provided the function f is also evaluated at (t - a).',
        arabicExplanation:
          'تأخير أي دالة بمقدار a زمنياً مع ضربها في u_a(t) يقابله في مجال التردد الضرب في e^(-as). يشترط أن تكون الدالة f معبرة بدلالة (t - a).',
      },
      {
        id: 'law_argument_adjustment_trick',
        name: 'Argument Alignment Technique: Adding and Subtracting a',
        arabicName: 'طريقة ضبط وضبط المتغير: الجمع والطرح للوصول إلى (t - a)',
        formula: 'f(t) = f((t - a) + a) \\implies \\text{expand to express purely as a polynomial or linear combination of } (t - a)',
        explanation:
          'If the multiplied function is not already written in terms of (t - a), rewrite t as (t - a + a) and expand using algebraic or trigonometric angle-sum identities.',
        arabicExplanation:
          'إذا كانت الدالة لا تحتوي على (t - a) صراحة، نكتب t بصيغة (t - a + a) ثم نفك القوس أو المتطابقة المثلثية لتظهر حدود (t - a).',
      },
    ],
    examples: [
      {
        id: 'eg_p22_1',
        title: 'Example 1: Shifted Exponential with Matching Delay',
        problem: 'Find $\\mathcal{L}\\{f(t)\\}$ for $f(t) = u_2(t) e^{(t-2)}$',
        mathFormula: 'f(t) = u_2(t) e^{(t-2)}',
        steps: [
          {
            step: 'Step 1: Identify Delay a and Base Function',
            formula: 'a = 2, \\quad f(t-2) = e^{(t-2)} \\implies f(t) = e^t',
            explanation: 'The argument (t-2) perfectly matches the step u_2(t).',
          },
          {
            step: 'Step 2: Transform Base Function and Apply Exponential Multiplier',
            formula: '\\mathcal{L}\\{e^t\\} = \\frac{1}{s - 1} \\implies F(s) = e^{-2s} \\cdot \\frac{1}{s - 1} = \\frac{e^{-2s}}{s - 1}',
            explanation: 'Multiply by e^{-2s}.',
          },
        ],
        finalAnswer: 'F(s) = \\frac{e^{-2s}}{s-1}',
        arabicNote: 'الدالة الأسية جاهزة بدلالة (t-2) وتتطابق مع u_2(t)، لذلك نضرب تحويل e^t في e^(-2s).',
      },
      {
        id: 'eg_p22_2',
        title: 'Example 2: Shifted Sine with Matching Delay',
        problem: 'Find $\\mathcal{L}\\{f(t)\\}$ for $f(t) = u_3(t) \\sin(t-3)$',
        mathFormula: 'f(t) = u_3(t) \\sin(t-3)',
        steps: [
          {
            step: 'Step 1: Identify Delay a and Base Function',
            formula: 'a = 3, \\quad f(t-3) = \\sin(t-3) \\implies f(t) = \\sin(t)',
            explanation: 'Base is sin(t).',
          },
          {
            step: 'Step 2: Transform Base Function',
            formula: '\\mathcal{L}\\{\\sin(t)\\} = \\frac{1}{s^2 + 1} \\implies F(s) = e^{-3s} \\cdot \\frac{1}{s^2 + 1} = \\frac{e^{-3s}}{s^2 + 1}',
            explanation: 'Multiply by e^{-3s}.',
          },
        ],
        finalAnswer: 'F(s) = \\frac{e^{-3s}}{s^2+1}',
        arabicNote: 'تحويل sin(t) هو 1/(s²+1) مضروباً في e^(-3s).',
      },
      {
        id: 'eg_p22_3',
        title: 'Example 3: Mismatched Linear Polynomial u_5(t)(t - 3)',
        problem: 'Find $\\mathcal{L}\\{f(t)\\}$ for $f(t) = u_5(t)(t - 3)$',
        mathFormula: 'f(t) = u_5(t)(t - 3)',
        steps: [
          {
            step: 'Step 1: Rewrite Argument to Force (t - 5)',
            formula: 't - 3 = (t - 5 + 5) - 3 = (t - 5) + 2',
            explanation: 'Add and subtract 5 to create the exact delay term (t - 5).',
          },
          {
            step: 'Step 2: Distribute Unit Step Function',
            formula: 'f(t) = u_5(t)(t - 5) + 2 u_5(t)',
            explanation: 'Two terms: shifted monomial and pure step function.',
          },
          {
            step: 'Step 3: Apply Second Shifting Theorem',
            formula: 'F(s) = e^{-5s} \\mathcal{L}\\{t\\} + 2 \\mathcal{L}\\{u_5(t)\\} = e^{-5s} \\frac{1}{s^2} + 2 \\frac{e^{-5s}}{s}',
            explanation: 'Sum of the two transformed components.',
          },
        ],
        finalAnswer: 'F(s) = e^{-5s}\\left(\\frac{1}{s^2} + \\frac{2}{s}\\right)',
        arabicNote: 'نعدل القوس t-3 بإضافة وطرح 5 ليصبح (t-5)+2، ثم نوزع u_5(t) ونحول كل جزء.',
      },
      {
        id: 'eg_p22_4',
        title: 'Example 4: Unshifted Monomial u_10(t) · t',
        problem: 'Find $\\mathcal{L}\\{f(t)\\}$ for $f(t) = u_{10}(t) \\cdot t$',
        mathFormula: 'f(t) = u_{10}(t) \\cdot t',
        steps: [
          {
            step: 'Step 1: Rewrite t as (t - 10 + 10)',
            formula: 't = (t - 10) + 10 \\implies f(t) = u_{10}(t)(t - 10) + 10 u_{10}(t)',
            explanation: 'Align argument with delay a = 10.',
          },
          {
            step: 'Step 2: Apply Second Shifting Theorem',
            formula: 'F(s) = e^{-10s} \\frac{1}{s^2} + 10 \\frac{e^{-10s}}{s}',
            explanation: 'Transform base t to 1/s² and constant to 1/s, each scaled by e^{-10s}.',
          },
        ],
        finalAnswer: 'F(s) = e^{-10s}\\left(\\frac{1}{s^2} + \\frac{10}{s}\\right)',
        arabicNote: 'نكتب t بصيغة (t-10) + 10 ثم نوزع u_10(t).',
      },
      {
        id: 'eg_p22_5',
        title: 'Example 5: Unshifted Cosine with Angle Expansion u_3(t) cos(t)',
        problem: 'Find $\\mathcal{L}\\{f(t)\\}$ for $f(t) = u_3(t) \\cos(t)$',
        mathFormula: 'f(t) = u_3(t) \\cos((t - 3) + 3)',
        steps: [
          {
            step: 'Step 1: Expand Cosine of Sum of Angles',
            formula: '\\cos((t - 3) + 3) = \\cos(t - 3)\\cos(3) - \\sin(t - 3)\\sin(3)',
            explanation: 'Using cos(A + B) = cos(A)cos(B) - sin(A)sin(B). Note: cos(3) and sin(3) are constants.',
          },
          {
            step: 'Step 2: Distribute u_3(t)',
            formula: 'f(t) = \\cos(3) \\cdot u_3(t)\\cos(t - 3) - \\sin(3) \\cdot u_3(t)\\sin(t - 3)',
            explanation: 'Separated into two standard shifted forms.',
          },
          {
            step: 'Step 3: Apply Second Shifting Theorem',
            formula: 'F(s) = \\cos(3) e^{-3s} \\frac{s}{s^2 + 1} - \\sin(3) e^{-3s} \\frac{1}{s^2 + 1}',
            explanation: 'Transformed cosine and sine with multiplier e^{-3s}.',
          },
        ],
        finalAnswer: 'F(s) = e^{-3s}\\left[\\frac{s\\cos 3 - \\sin 3}{s^2 + 1}\\right]',
        arabicNote: 'نفك cos(t) إلى cos((t-3)+3) = cos(t-3)cos(3) - sin(t-3)sin(3) حيث cos(3) و sin(3) ثوابت عددية.',
      },
      {
        id: 'eg_p22_6',
        title: 'Example 6: Unshifted Exponential u_4(t) · e^t',
        problem: 'Find $\\mathcal{L}\\{f(t)\\}$ for $f(t) = u_4(t) e^t$',
        mathFormula: 'f(t) = u_4(t) e^t',
        steps: [
          {
            step: 'Step 1: Rewrite Exponential Exponent',
            formula: 'e^t = e^{(t - 4 + 4)} = e^{(t - 4)} \\cdot e^4',
            explanation: 'Extract constant e^4.',
          },
          {
            step: 'Step 2: Apply Shift Rule',
            formula: 'f(t) = e^4 \\cdot u_4(t) e^{(t-4)} \\implies F(s) = e^4 e^{-4s} \\frac{1}{s - 1}',
            explanation: 'Constant e^4 stays in front.',
          },
        ],
        finalAnswer: 'F(s) = \\frac{e^4 e^{-4s}}{s-1}',
        arabicNote: 'نكتب e^t = e^(t-4) * e^4، ثم نخرج الثابت e^4 ونحول u_4(t) e^(t-4) إلى e^(-4s)/(s-1).',
      },
    ],
    examTricks: [
      '⚠️ Crucial Rule: You CANNOT apply $\\mathcal{L}\\{u_a(t) f(t)\\} = e^{-as} F(s)$ unless the function is explicitly written in terms of $(t - a)$!',
      '💡 Trigonometric shifts produce constant factors: $\\cos(t) = \\cos((t-a)+a) = \\cos(t-a)\\cos(a) - \\sin(t-a)\\sin(a)$. Remember $\\cos(a)$ and $\\sin(a)$ are constant numbers!',
    ],
  },

  // =========================================================================
  // PAGE 23 (Week 7 - Page 2): Inverse Second Shifting Theorem
  // =========================================================================
  {
    pageNumber: 23,
    title: 'Inverse Second Shifting Theorem (Recovering Delayed Time Signals)',
    arabicTitle: 'الأسبوع السابع (٢): تحويل لابلاس العكسي بنظرية الإزاحة الثانية (استرجاع الدوال المتأخرة زمنياً)',
    topicCategory: Category.LAPLACE_THEOREMS,
    summary:
      'Inverse Laplace transformation for functions containing an exponential factor e^{-as}: L⁻¹{e^{-as} F(s)} = u_a(t) f(t - a). Inversion is completed by: (1) dropping e^{-as} to find base f(t) = L⁻¹{F(s)}, (2) substituting t -> (t - a), and (3) multiplying by u_a(t).',
    laws: [
      {
        id: 'law_inverse_second_shifting',
        name: 'Inverse Second Shifting Formula',
        arabicName: 'قانون تحويل لابلاس العكسي للإزاحة الثانية',
        formula: '\\mathcal{L}^{-1}\\left\\{ e^{-as} F(s) \\right\\} = u_a(t) \\left. \\mathcal{L}^{-1}\\{F(s)\\} \\right|_{t \\to t - a} = u_a(t) f(t - a)',
        explanation:
          'Whenever e^{-as} appears in the numerator of F(s), it signals a time delay of a units. Invert the remainder F(s), replace every t with (t - a), and multiply by u_a(t).',
        arabicExplanation:
          'وجود e^(-as) يعني أن الدالة متأخرة زمنياً بمقدار a ومضروبة في u_a(t). نقوم بإخفاء e^(-as)، ونوجد التحويل العكسي للباقي f(t)، ثم نستبدل كل t بـ (t - a) ونضرب في u_a(t).',
      },
      {
        id: 'law_combining_first_and_second_shift',
        name: 'Combined Frequency & Time Shifting Rule',
        arabicName: 'دمج نظرية الإزاحة الأولى (في التردد) ونظرية الإزاحة الثانية (في الزمن)',
        formula: '\\mathcal{L}^{-1}\\left\\{ e^{-as} \\frac{s - \\alpha}{(s - \\alpha)^2 + \\beta^2} \\right\\} = u_a(t) e^{\\alpha(t - a)} \\cos(\\beta(t - a))',
        explanation:
          'When both s-shifts (s - α) and exponential multipliers e^{-as} are present, complete the square in s first, invert to e^{αt} trig(βt), and then replace every t with (t - a).',
        arabicExplanation:
          'عند وجود إزاحة في s و e^(-as) معاً: نكمل المربع في s أولاً لنحصل على الإزاحة الأسية e^(αt)، ثم نستبدل كل t بـ (t - a) للدالة بالكامل.',
      },
    ],
    examples: [
      {
        id: 'eg_p23_1',
        title: 'Inverse Example 1: Shifted Sinh with e^{-3s}',
        problem: 'Find $\\mathcal{L}^{-1}\\{F(s)\\}$ for $F(s) = \\frac{4 e^{-3s}}{s^2 - 36}$',
        mathFormula: 'F(s) = e^{-3s} \\cdot \\frac{4}{s^2 - 6^2}',
        steps: [
          {
            step: 'Step 1: Invert Base Function without e^{-3s}',
            formula: '\\mathcal{L}^{-1}\\left\\{\\frac{4}{s^2 - 36}\\right\\} = \\frac{4}{6}\\sinh(6t) = \\frac{2}{3}\\sinh(6t)',
            explanation: 'Base is sinh(6t) scaled by 4/6.',
          },
          {
            step: 'Step 2: Apply Time Shift a = 3',
            formula: 'f(t) = u_3(t) \\cdot \\frac{4}{6}\\sinh(6(t - 3))',
            explanation: 'Replace t with (t - 3) and multiply by u_3(t).',
          },
        ],
        finalAnswer: 'f(t) = \\frac{2}{3}u_3(t)\\sinh(6(t-3))',
        arabicNote: 'تحويل عكسي لـ 4/(s²-36) يعطي (4/6)sinh(6t)، وبسبب e^(-3s) نضع u_3(t) ونستبدل t بـ (t-3).',
      },
      {
        id: 'eg_p23_2',
        title: 'Inverse Example 2: Shifted Sine with e^{-2s}',
        problem: 'Find $\\mathcal{L}^{-1}\\{F(s)\\}$ for $F(s) = e^{-2s}\\frac{1}{s^2 + 4}$',
        mathFormula: 'F(s) = e^{-2s} \\cdot \\frac{1}{s^2 + 2^2}',
        steps: [
          {
            step: 'Step 1: Base Inverse of 1/(s² + 4)',
            formula: '\\mathcal{L}^{-1}\\left\\{\\frac{1}{s^2 + 4}\\right\\} = \\frac{1}{2}\\sin(2t)',
            explanation: 'Standard sine transform.',
          },
          {
            step: 'Step 2: Apply Delay a = 2',
            formula: 'f(t) = u_2(t) \\frac{\\sin(2(t - 2))}{2}',
            explanation: 'Shift t to (t - 2) and multiply by u_2(t).',
          },
        ],
        finalAnswer: 'f(t) = \\frac{1}{2}u_2(t)\\sin(2(t-2))',
        arabicNote: 'التحويل العكسي هو (1/2)u_2(t) sin(2(t-2)).',
      },
      {
        id: 'eg_p23_3',
        title: 'Inverse Example 3: Shifted Cosine with e^{-4s}',
        problem: 'Find $\\mathcal{L}^{-1}\\{F(s)\\}$ for $F(s) = e^{-4s}\\frac{3s}{s^2 + 11}$',
        mathFormula: 'F(s) = e^{-4s} \\cdot 3\\frac{s}{s^2 + (\\sqrt{11})^2}',
        steps: [
          {
            step: 'Step 1: Base Inverse of 3s/(s² + 11)',
            formula: '\\mathcal{L}^{-1}\\left\\{\\frac{3s}{s^2 + 11}\\right\\} = 3\\cos(\\sqrt{11}t)',
            explanation: 'Cosine with frequency sqrt(11).',
          },
          {
            step: 'Step 2: Apply Delay a = 4',
            formula: 'f(t) = 3 u_4(t) \\cos(\\sqrt{11}(t - 4))',
            explanation: 'Multiply by u_4(t) and shift t -> t - 4.',
          },
        ],
        finalAnswer: 'f(t) = 3u_4(t)\\cos(\\sqrt{11}(t-4))',
        arabicNote: 'تحويل عكسي لـ 3s/(s²+11) يعطي 3cos(√11 t)، وبسبب e^(-4s) يصبح 3u_4(t) cos(√11(t-4)).',
      },
      {
        id: 'eg_p23_4',
        title: 'Inverse Example 4: Shifted Power-Exponential e^{-3s}/(s - 10)^{12}',
        problem: 'Find $\\mathcal{L}^{-1}\\{F(s)\\}$ for $F(s) = e^{-3s}\\frac{1}{(s - 10)^{12}}$',
        mathFormula: 'F(s) = e^{-3s}\\frac{1}{(s - 10)^{12}}',
        steps: [
          {
            step: 'Step 1: Base Inverse with First Shifting',
            formula: '\\mathcal{L}^{-1}\\left\\{\\frac{1}{(s - 10)^{12}}\\right\\} = e^{10t}\\frac{t^{11}}{11!}',
            explanation: 'Base is t^{11}/11! with exponential modulation e^{10t}.',
          },
          {
            step: 'Step 2: Apply Time Shift a = 3 to ALL occurrences of t',
            formula: 'f(t) = u_3(t) e^{10(t - 3)} \\frac{(t - 3)^{11}}{11!}',
            explanation: 'Every t in both e^{10t} and t^{11} is replaced by (t - 3).',
          },
        ],
        finalAnswer: 'f(t) = u_3(t) e^{10(t-3)}\\frac{(t-3)^{11}}{11!}',
        arabicNote: 'كل t في الدالة الأسية وفي كثيرة الحدود تستبدل بـ (t-3).',
      },
      {
        id: 'eg_p23_5',
        title: 'Inverse Example 5: Shifted Quadratic with Fraction e^{-8s}/(s² + 5s + 1)',
        problem: 'Find $\\mathcal{L}^{-1}\\{F(s)\\}$ for $F(s) = e^{-8s}\\frac{1}{s^2 + 5s + 1}$',
        mathFormula: 'F(s) = e^{-8s}\\frac{1}{(s + 5/2)^2 - 21/4}',
        steps: [
          {
            step: 'Step 1: Complete the Square in Denominator',
            formula: 's^2 + 5s + 1 = \\left(s + \\frac{5}{2}\\right)^2 - \\frac{25}{4} + 1 = \\left(s + \\frac{5}{2}\\right)^2 - \\frac{21}{4}',
            explanation: 'Negative constant indicates hyperbolic sinh.',
          },
          {
            step: 'Step 2: Base Inverse',
            formula: '\\mathcal{L}^{-1}\\left\\{\\frac{1}{(s + 5/2)^2 - 21/4}\\right\\} = e^{-\\frac{5}{2}t} \\frac{\\sinh\\left(\\frac{\\sqrt{21}}{2}t\\right)}{\\frac{\\sqrt{21}}{2}}',
            explanation: 'First shift e^{-(5/2)t} with hyperbolic sine.',
          },
          {
            step: 'Step 3: Apply Delay a = 8',
            formula: 'f(t) = u_8(t) e^{-\\frac{5}{2}(t - 8)} \\frac{\\sinh\\left(\\frac{\\sqrt{21}}{2}(t - 8)\\right)}{\\frac{\\sqrt{21}}{2}}',
            explanation: 'Replace t with (t - 8) throughout.',
          },
        ],
        finalAnswer: 'f(t) = u_8(t) e^{-\\frac{5}{2}(t-8)} \\frac{\\sinh\\left(\\frac{\\sqrt{21}}{2}(t-8)\\right)}{\\frac{\\sqrt{21}}{2}}',
        arabicNote: 'إكمال المربع يعطي مقاماً زائداً مع إزاحة e^(-5/2 t)، ثم نطبق الإزاحة الزمنية t -> t-8 ونضرب في u_8(t).',
      },
      {
        id: 'eg_p23_6',
        title: 'Inverse Example 6: Complete Quadratic with Numerator e^{-9s}(2s + 3)/(s² - 2s + 2)',
        problem: 'Find $\\mathcal{L}^{-1}\\{F(s)\\}$ for $F(s) = e^{-9s}\\left[\\frac{2s + 3}{s^2 - 2s + 2}\\right]$',
        mathFormula: 'F(s) = e^{-9s}\\left[\\frac{2s + 3}{(s - 1)^2 + 1}\\right]',
        steps: [
          {
            step: 'Step 1: Complete Square and Adjust Numerator to Match (s - 1)',
            formula: '2s + 3 = 2(s - 1 + 1) + 3 = 2(s - 1) + 5',
            explanation: 'Rewrite numerator as 2(s - 1) + 5.',
          },
          {
            step: 'Step 2: Split into Damped Cosine and Sine',
            formula: '\\frac{2(s - 1)}{(s - 1)^2 + 1} + \\frac{5}{(s - 1)^2 + 1} \\implies 2 e^t\\cos(t) + 5 e^t\\sin(t)',
            explanation: 'Base inverse before delay.',
          },
          {
            step: 'Step 3: Apply Time Delay a = 9',
            formula: 'f(t) = u_9(t) e^{(t - 9)} \\left[2\\cos(t - 9) + 5\\sin(t - 9)\\right]',
            explanation: 'Factor out u_9(t) e^{(t-9)}.',
          },
        ],
        finalAnswer: 'f(t) = u_9(t) e^{(t-9)}\\left[2\\cos(t-9) + 5\\sin(t-9)\\right]',
        arabicNote: 'نعدل البسط إلى 2(s-1) + 5، ليعطي 2e^t cos t + 5e^t sin t، وبسبب e^(-9s) نستبدل كل t بـ (t-9) ونضرب في u_9(t).',
      },
    ],
    examTricks: [
      '🔥 Common Mistake: Forgetting to shift $t$ inside the exponential factor! $e^{\\alpha t}$ MUST become $e^{\\alpha(t - a)}$.',
      '🎯 Grouping Terms: Always factor out $u_a(t) e^{\\alpha(t-a)}$ at the end to keep the expression clean and prevent algebraic sign errors.',
    ],
  },

  // =========================================================================
  // PAGE 24 (Week 7 - Page 3): Laplace Transform of Integrals
  // =========================================================================
  {
    pageNumber: 24,
    title: 'Laplace Transform of Integrals & Division by s Property',
    arabicTitle: 'الأسبوع السابع (٣): تحويل لابلاس للتكاملات وخاصية القسمة على s',
    topicCategory: Category.LAPLACE_THEOREMS,
    summary:
      'Fundamental theorem stating that integrating f(τ) from 0 to t in the time domain corresponds to dividing its transform by s in the frequency domain: L{∫₀^t f(τ) dτ} = F(s)/s. Conversely, F(s)/s is inverted by integrating L⁻¹{F(s)} from 0 to t.',
    laws: [
      {
        id: 'law_laplace_of_integrals_forward',
        name: 'Laplace Transform of an Integral Property',
        arabicName: 'قانون تحويل لابلاس للتكامل',
        formula: '\\mathcal{L}\\left\\{ \\int_0^t f(\\tau) \\, d\\tau \\right\\} = \\frac{F(s)}{s} = \\frac{1}{s} \\mathcal{L}\\{f(t)\\}',
        explanation:
          'Integration from 0 to t in the time domain corresponds to simple algebraic division by s in the s-domain.',
        arabicExplanation:
          'التكامل من 0 إلى t للدالة f(τ) يكافئه في مجال التردد قسمة التحويل F(s) على s.',
      },
      {
        id: 'law_inverse_laplace_of_integrals',
        name: 'Inverse Transform by Time Integration',
        arabicName: 'قانون تحويل لابلاس العكسي عبر التكامل الزمني',
        formula: '\\mathcal{L}^{-1}\\left\\{ \\frac{F(s)}{s} \\right\\} = \\int_0^t \\mathcal{L}^{-1}\\{F(s)\\}(\\tau) \\, d\\tau = \\int_0^t f(\\tau) \\, d\\tau',
        explanation:
          'To invert any fraction with a factor of 1/s multiplying an expression F(s), find the inverse of F(s) first, then integrate the result from 0 to t with dummy variable τ.',
        arabicExplanation:
          'عند وجود 1/s مضروبة في دالة F(s)، نوجد التحويل العكسي لـ F(s) أولاً، ثم نضعه داخل تكامل من 0 إلى t بالنسبة للمتغير τ.',
      },
    ],
    examples: [
      {
        id: 'eg_p24_1',
        title: 'Integral Example 1: Polynomial Integral ∫ 5(τ⁴ + 1) dτ',
        problem: 'Find $\\mathcal{L}\\{f(t)\\}$ for $f(t) = \\int_0^t 5(\\tau^4 + 1) \\, d\\tau$',
        mathFormula: 'f(t) = 5\\int_0^t (\\tau^4 + 1) \\, d\\tau',
        steps: [
          {
            step: 'Step 1: Transform Inner Function',
            formula: '\\mathcal{L}\\{5(\\tau^4 + 1)\\} = 5\\left[\\frac{4!}{s^5} + \\frac{1}{s}\\right] = \\frac{120}{s^5} + \\frac{5}{s}',
            explanation: 'Table rules for polynomial and constant.',
          },
          {
            step: 'Step 2: Divide by s',
            formula: 'F(s) = \\frac{1}{s} \\cdot 5\\left[\\frac{4!}{s^5} + \\frac{1}{s}\\right] = \\frac{5}{s}\\left[\\frac{4!}{s^5} + \\frac{1}{s}\\right]',
            explanation: 'Divide by s for the outer integration.',
          },
        ],
        finalAnswer: 'F(s) = \\frac{5}{s}\\left[\\frac{24}{s^5} + \\frac{1}{s}\\right]',
        arabicNote: 'نحول الدالة التي بداخل التكامل ثم نقسم الناتج على s.',
      },
      {
        id: 'eg_p24_2',
        title: 'Integral Example 2: Sine Integral ∫ sin(10τ) dτ',
        problem: 'Find $\\mathcal{L}\\{f(t)\\}$ for $f(t) = \\int_0^t \\sin(10\\tau) \\, d\\tau$',
        mathFormula: 'f(t) = \\int_0^t \\sin(10\\tau) \\, d\\tau',
        steps: [
          {
            step: 'Step 1: Transform sin(10t) and Divide by s',
            formula: 'F(s) = \\frac{1}{s}\\left[\\frac{10}{s^2 + 100}\\right] = \\frac{10}{s(s^2 + 100)}',
            explanation: 'Apply 1/s to standard sine transform.',
          },
        ],
        finalAnswer: 'F(s) = \\frac{10}{s(s^2+100)}',
        arabicNote: 'تحويل sin(10t) هو 10/(s²+100) مقسوماً على s.',
      },
      {
        id: 'eg_p24_3',
        title: 'Integral Example 3: Hyperbolic Cosine Integral ∫ cosh(3τ) dτ',
        problem: 'Find $\\mathcal{L}\\{f(t)\\}$ for $f(t) = \\int_0^t \\cosh(3\\tau) \\, d\\tau$',
        mathFormula: 'f(t) = \\int_0^t \\cosh(3\\tau) \\, d\\tau',
        steps: [
          {
            step: 'Step 1: Transform cosh(3t) and Divide by s',
            formula: 'F(s) = \\frac{1}{s}\\left[\\frac{s}{s^2 - 9}\\right] = \\frac{1}{s^2 - 9}',
            explanation: 'The factor s cancels with 1/s.',
          },
        ],
        finalAnswer: 'F(s) = \\frac{1}{s^2 - 9}',
        arabicNote: 's في بسط cosh تختصر مع s التي في المقام الناتجة عن التكامل فيتبقى 1/(s²-9).',
      },
      {
        id: 'eg_p24_4',
        title: 'Integral Example 4: Modulated Cosine Integral ∫ e^{2τ} cos(10τ) dτ',
        problem: 'Find $\\mathcal{L}\\{f(t)\\}$ for $f(t) = \\int_0^t e^{2\\tau}\\cos(10\\tau) \\, d\\tau$',
        mathFormula: 'f(t) = \\int_0^t e^{2\\tau}\\cos(10\\tau) \\, d\\tau',
        steps: [
          {
            step: 'Step 1: Apply First Shift to Cosine and Divide by s',
            formula: 'F(s) = \\frac{1}{s}\\left[\\frac{s - 2}{(s - 2)^2 + 100}\\right]',
            explanation: 'Base transform shifted by s -> s - 2, then multiplied by 1/s.',
          },
        ],
        finalAnswer: 'F(s) = \\frac{s-2}{s\\left((s-2)^2 + 100\\right)}',
        arabicNote: 'تحويل e^(2t) cos(10t) هو (s-2)/((s-2)²+100) ثم نقسم على s.',
      },
      {
        id: 'eg_p24_5',
        title: 'Integral Example 5: Modulated Sinh Integral ∫ e^{4τ} sinh(3τ) dτ',
        problem: 'Find $\\mathcal{L}\\{f(t)\\}$ for $f(t) = \\int_0^t e^{4\\tau}\\sinh(3\\tau) \\, d\\tau$',
        mathFormula: 'f(t) = \\int_0^t e^{4\\tau}\\sinh(3\\tau) \\, d\\tau',
        steps: [
          {
            step: 'Step 1: Apply First Shift to Sinh and Divide by s',
            formula: 'F(s) = \\frac{1}{s}\\left[\\frac{3}{(s - 4)^2 - 9}\\right]',
            explanation: 'Shift s -> s - 4 with hyperbolic difference of squares.',
          },
        ],
        finalAnswer: 'F(s) = \\frac{3}{s\\left((s-4)^2 - 9\\right)}',
        arabicNote: 'نحول e^(4t) sinh(3t) ثم نقسم على s.',
      },
      {
        id: 'eg_p24_6',
        title: 'Integral Example 6: Modulated Monomial Integral ∫ e^{10τ} τ³ dτ',
        problem: 'Find $\\mathcal{L}\\{f(t)\\}$ for $f(t) = \\int_0^t e^{10\\tau}\\tau^3 \\, d\\tau$',
        mathFormula: 'f(t) = \\int_0^t e^{10\\tau}\\tau^3 \\, d\\tau',
        steps: [
          {
            step: 'Step 1: Transform Monomial with Shift and Divide by s',
            formula: 'F(s) = \\frac{1}{s}\\left[\\frac{3!}{(s - 10)^4}\\right] = \\frac{6}{s(s - 10)^4}',
            explanation: '3! = 6.',
          },
        ],
        finalAnswer: 'F(s) = \\frac{6}{s(s-10)^4}',
        arabicNote: 'تحويل t³ e^(10t) هو 6/(s-10)⁴ مقسوماً على s.',
      },
      {
        id: 'eg_p24_7',
        title: 'Inverse Integral 1: Inversion of 8 / [s(s + 15)]',
        problem: 'Find $\\mathcal{L}^{-1}\\{F(s)\\}$ for $F(s) = \\frac{8}{s(s + 15)}$',
        mathFormula: 'F(s) = \\frac{1}{s}\\left[\\frac{8}{s + 15}\\right]',
        steps: [
          {
            step: 'Step 1: Identify F(s) without 1/s factor',
            formula: '\\mathcal{L}^{-1}\\left\\{\\frac{8}{s + 15}\\right\\} = 8 e^{-15t}',
            explanation: 'Base exponential function.',
          },
          {
            step: 'Step 2: Express Inverse as Integral',
            formula: 'f(t) = \\int_0^t 8 e^{-15\\tau} \\, d\\tau',
            explanation: 'Inverse of 1/s is integration from 0 to t.',
          },
        ],
        finalAnswer: 'f(t) = \\int_0^t 8 e^{-15\\tau} \\, d\\tau = \\frac{8}{15}\\left(1 - e^{-15t}\\right)',
        arabicNote: 'التحويل العكسي لـ 1/s يعبر عنه بتكامل الدالة العكسية من 0 إلى t.',
      },
      {
        id: 'eg_p24_8',
        title: 'Inverse Integral 2: Inversion of 1 / [s(s² - 25)]',
        problem: 'Find $\\mathcal{L}^{-1}\\{F(s)\\}$ for $F(s) = \\frac{1}{s(s^2 - 25)}$',
        mathFormula: 'F(s) = \\frac{1}{s}\\left[\\frac{1}{s^2 - 25}\\right]',
        steps: [
          {
            step: 'Step 1: Base Inverse of 1/(s² - 25)',
            formula: '\\mathcal{L}^{-1}\\left\\{\\frac{1}{s^2 - 25}\\right\\} = \\frac{\\sinh(5t)}{5}',
            explanation: 'Hyperbolic sine with a = 5.',
          },
          {
            step: 'Step 2: Express as Integral',
            formula: 'f(t) = \\int_0^t \\frac{\\sinh(5\\tau)}{5} \\, d\\tau',
            explanation: 'Integrate from 0 to t.',
          },
        ],
        finalAnswer: 'f(t) = \\int_0^t \\frac{\\sinh(5\\tau)}{5} \\, d\\tau',
        arabicNote: 'التحويل العكسي للباقي هو sinh(5t)/5، ونضعه داخل تكامل من 0 إلى t.',
      },
      {
        id: 'eg_p24_9',
        title: 'Inverse Integral 3: Inversion of 1 / [s(s² + 10s + 8)]',
        problem: 'Find $\\mathcal{L}^{-1}\\{F(s)\\}$ for $F(s) = \\frac{1}{s(s^2 + 10s + 8)}$',
        mathFormula: 'F(s) = \\frac{1}{s}\\left[\\frac{1}{(s + 5)^2 - 17}\\right]',
        steps: [
          {
            step: 'Step 1: Complete the Square and Invert',
            formula: 's^2 + 10s + 8 = (s + 5)^2 - 17 \\implies \\mathcal{L}^{-1} = e^{-5t} \\frac{\\sinh(\\sqrt{17}t)}{\\sqrt{17}}',
            explanation: 'Hyperbolic sine with frequency sqrt(17) and shift e^{-5t}.',
          },
          {
            step: 'Step 2: Apply Integral Form',
            formula: 'f(t) = \\int_0^t e^{-5\\tau} \\frac{\\sinh(\\sqrt{17}\\tau)}{\\sqrt{17}} \\, d\\tau',
            explanation: 'Integration from 0 to t.',
          },
        ],
        finalAnswer: 'f(t) = \\int_0^t e^{-5\\tau} \\frac{\\sinh(\\sqrt{17}\\tau)}{\\sqrt{17}} \\, d\\tau',
        arabicNote: 'إكمال المربع في المقام يعطي (s+5)² - 17، ثم نكتب التحويل العكسي بصيغة تكامل.',
      },
    ],
    examTricks: [
      '💡 Direct Integral Property: $\\mathcal{L}\\{\\int_0^t f(\\tau) d\\tau\\} = \\frac{F(s)}{s}$. Notice that the integral variable $\\tau$ is replaced by $t$ in the transform domain.',
      '⚡ Inversion Alternative: Expressing $\\mathcal{L}^{-1}\\{\\frac{F(s)}{s}\\}$ as $\\int_0^t f(\\tau) d\\tau$ bypasses tedious partial fraction expansions!',
    ],
  },

  // =========================================================================
  // PAGE 25 (Week 7 - Page 4): Advanced Inverse Laplace of Integrals & Step Functions
  // =========================================================================
  {
    pageNumber: 25,
    title: 'Advanced Inverse Laplace of Integrals with Quadratic Denominators & Step Delays',
    arabicTitle: 'الأسبوع السابع (٤): تحويلات عكسية متقدمة للتكاملات مع مقامات من الدرجة الثانية ودوال الخطوة',
    topicCategory: Category.LAPLACE_THEOREMS,
    summary:
      'Continuation of inverse Laplace transform problems involving outer factor 1/s combined with sums of terms, completing the square on irreducible quadratics, and compound terms containing both time-delay step functions e^{-as} and integral operators 1/s.',
    laws: [
      {
        id: 'law_combined_integral_and_step_inverse',
        name: 'Combined Integral & Second Shifting Inversion Rule',
        arabicName: 'قانون دمج التكامل مع دالة الخطوة ونظرية الإزاحة الثانية في التحويل العكسي',
        formula: '\\mathcal{L}^{-1}\\left\\{ \\frac{e^{-as}}{s} F(s) \\right\\} = \\int_0^t u_a(\\tau) f(\\tau - a) \\, d\\tau = \\int_0^t u_a(\\tau) \\left. \\mathcal{L}^{-1}\\{F(s)\\} \\right|_{\\tau - a} \\, d\\tau',
        explanation:
          'When both e^{-as} and 1/s appear, the 1/s generates an outer integral from 0 to t, and the e^{-as} introduces the unit step u_a(τ) and time shift (τ - a) on the integrand.',
        arabicExplanation:
          'عند اجتماع e^(-as) مع 1/s: يمثل 1/s تكاملاً خارجياً من 0 إلى t، بينما يعطي e^(-as) دالة الخطوة u_a(τ) والإزاحة (τ - a) لجميع حدود الدالة داخل التكامل.',
      },
    ],
    examples: [
      {
        id: 'eg_p25_1',
        title: 'Example 4: Inversion of (1/s) [ 1/(s + 1) + s/(s² - 16) ]',
        problem: 'Find $\\mathcal{L}^{-1}\\{F(s)\\}$ for $F(s) = \\frac{1}{s}\\left[\\frac{1}{s + 1} + \\frac{s}{s^2 - 16}\\right]$',
        mathFormula: 'F(s) = \\frac{1}{s}\\left[\\frac{1}{s + 1} + \\frac{s}{s^2 - 4^2}\\right]',
        steps: [
          {
            step: 'Step 1: Invert Inside Bracket',
            formula: '\\mathcal{L}^{-1}\\left\\{\\frac{1}{s + 1}\\right\\} = e^{-t}, \\qquad \\mathcal{L}^{-1}\\left\\{\\frac{s}{s^2 - 16}\\right\\} = \\cosh(4t)',
            explanation: 'Sum of exponential and hyperbolic cosine.',
          },
          {
            step: 'Step 2: Apply Integral Operator for 1/s',
            formula: 'f(t) = \\int_0^t \\left(e^{-\\tau} + \\cosh(4\\tau)\\right) \\, d\\tau',
            explanation: 'Integrate from 0 to t.',
          },
        ],
        finalAnswer: 'f(t) = \\int_0^t \\left(e^{-\\tau} + \\cosh(4\\tau)\\right) \\, d\\tau',
        arabicNote: 'نوجد التحويل العكسي لما بداخل القوس: e^(-t) + cosh(4t)، ثم نضعه داخل تكامل من 0 إلى t.',
      },
      {
        id: 'eg_p25_2',
        title: 'Example 5: Inversion of (1/s) [ (s + 3)/(s² - 2s + 2) ]',
        problem: 'Find $\\mathcal{L}^{-1}\\{F(s)\\}$ for $F(s) = \\frac{1}{s}\\left[\\frac{s + 3}{s^2 - 2s + 2}\\right]$',
        mathFormula: 'F(s) = \\frac{1}{s}\\left[\\frac{s + 3}{(s - 1)^2 + 1}\\right]',
        steps: [
          {
            step: 'Step 1: Complete Square and Adjust Numerator',
            formula: 's^2 - 2s + 2 = (s - 1)^2 + 1, \\quad s + 3 = (s - 1) + 4',
            explanation: 'Rewrite numerator as (s - 1) + 4 to match shift.',
          },
          {
            step: 'Step 2: Split and Invert the Inner Function',
            formula: '\\frac{s - 1}{(s - 1)^2 + 1} + \\frac{4}{(s - 1)^2 + 1} \\implies e^t \\cos(t) + 4 e^t \\sin(t) = e^t(\\cos t + 4\\sin t)',
            explanation: 'Damped cosine and sine.',
          },
          {
            step: 'Step 3: Apply Integral Operator for 1/s',
            formula: 'f(t) = \\int_0^t e^\\tau \\left(\\cos\\tau + 4\\sin\\tau\\right) \\, d\\tau',
            explanation: 'Integration from 0 to t.',
          },
        ],
        finalAnswer: 'f(t) = \\int_0^t e^\\tau\\left(\\cos\\tau + 4\\sin\\tau\\right) \\, d\\tau',
        arabicNote: 'إكمال المربع وتعديل البسط يعطي e^t(cos t + 4sin t)، ثم نضع الناتج داخل تكامل بالنسبة لـ τ.',
      },
      {
        id: 'eg_p25_3',
        title: 'Example 6: Inversion of [ e^{-9s}/s ] · [ 3 / (s² + 4s + 8) ]',
        problem: 'Find $\\mathcal{L}^{-1}\\{F(s)\\}$ for $F(s) = \\frac{e^{-9s}}{s}\\left[\\frac{3}{s^2 + 4s + 8}\\right]$',
        mathFormula: 'F(s) = \\frac{e^{-9s}}{s}\\left[\\frac{3}{(s + 2)^2 + 4}\\right]',
        steps: [
          {
            step: 'Step 1: Complete the Square in Denominator',
            formula: 's^2 + 4s + 8 = (s + 2)^2 - 4 + 8 = (s + 2)^2 + 2^2',
            explanation: 'Shifted sine with beta = 2 and shift alpha = -2.',
          },
          {
            step: 'Step 2: Invert Inner Function with Time Shift a = 9',
            formula: '\\mathcal{L}^{-1}\\left\\{ e^{-9s}\\frac{3}{(s+2)^2 + 4} \\right\\} = 3 u_9(t) e^{-2(t - 9)} \\frac{\\sin(2(t - 9))}{2}',
            explanation: 'Unit step u_9(t) with damped sine delayed by 9.',
          },
          {
            step: 'Step 3: Account for 1/s with Time Integration',
            formula: 'f(t) = \\int_0^t 3 u_9(\\tau) e^{-2(\\tau - 9)} \\frac{\\sin(2(\\tau - 9))}{2} \\, d\\tau',
            explanation: 'Integrate the delayed signal from 0 to t.',
          },
        ],
        finalAnswer: 'f(t) = \\int_0^t 3 u_9(\\tau) e^{-2(\\tau-9)}\\frac{\\sin(2(\\tau-9))}{2} \\, d\\tau',
        arabicNote: 'يجتمع هنا إكمال المربع وإزاحة التردد e^(-2t) مع دالة الخطوة u_9(t) وتأخير (t-9)، والقسمة على s تعطي تكاملاً من 0 إلى t.',
      },
    ],
    examTricks: [
      '🎯 Master Strategy: Identify components in order: (1) Quadratic denominator -> Complete the Square; (2) Numerator -> Match Shift; (3) $e^{-as}$ -> Time Delay & $u_a(t)$; (4) $1/s$ -> Outer Integral $\\int_0^t (\\dots) d\\tau$.',
    ],
  },
];
