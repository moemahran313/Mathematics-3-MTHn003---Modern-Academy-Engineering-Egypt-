import { Category, LecturePage } from '../types';

export const LECTURE_8_PAGES: LecturePage[] = [
  // =========================================================================
  // PAGE 26 (Week 8 - Page 1): Differentiation of Laplace Transform (Multiplication by t^n)
  // =========================================================================
  {
    pageNumber: 26,
    title: 'Differentiation of Laplace Transform (Multiplication by t and tⁿ)',
    arabicTitle: 'الأسبوع الثامن (١): تفاضل تحويل لابلاس (الضرب في t و tⁿ في مجال الزمن)',
    topicCategory: Category.LAPLACE_THEOREMS,
    summary:
      'Covers the fundamental property that multiplying f(t) by t in the time domain corresponds to differentiating its Laplace transform F(s) with respect to s and multiplying by -1. Generalizes to tⁿ with (-1)ⁿ dⁿ/dsⁿ.',
    laws: [
      {
        id: 'law_differentiation_laplace_t1',
        name: 'Multiplication by t (First Derivative in s)',
        arabicName: 'الضرب في t (المشتقة الأولى في مجال s)',
        formula: '\\mathcal{L}\\{t \\cdot f(t)\\} = -F\'(s) = -\\frac{d}{ds} F(s), \\qquad \\text{where } F(s) = \\mathcal{L}\\{f(t)\\}',
        explanation:
          'Multiplying by t in the time domain corresponds to taking the negative first derivative with respect to s in the frequency domain.',
        arabicExplanation:
          'ضرب أي دالة في t يقابله في مجال التردد اشتقاق تحويلها بالنسبة لـ s مع الضرب في إشارة سالبة (-1).',
      },
      {
        id: 'law_differentiation_laplace_tn',
        name: 'General Multiplication by tⁿ (n-th Derivative in s)',
        arabicName: 'القانون العام للضرب في tⁿ (المشتقة من الرتبة n في مجال s)',
        formula: '\\mathcal{L}\\{t^n \\cdot f(t)\\} = (-1)^n \\frac{d^n}{ds^n} F(s)',
        explanation:
          'Multiplying by tⁿ requires differentiating F(s) n times and multiplying by (-1)ⁿ.',
        arabicExplanation:
          'الضرب في tⁿ يتطلب اشتقاق F(s) بعدد n من المرات والضرب في (-1)ⁿ. إذا كان n زوجياً تكون الإشارة موجبة، وإذا كان فردياً تكون الإشارة سالبة.',
      },
    ],
    examples: [
      {
        id: 'eg_p26_1',
        title: 'Example 1: Multiplication of Sine by t (n = 1)',
        problem: 'Find $\\mathcal{L}\\{f(t)\\}$ for $f(t) = t \\sin t$',
        mathFormula: 'f(t) = t \\sin t, \\quad (n = 1)',
        steps: [
          {
            step: 'Step 1: Compute Laplace of base function sin(t)',
            formula: '\\mathcal{L}\\{\\sin t\\} = \\frac{1}{s^2 + 1} = F(s)',
            explanation: 'Standard Laplace transform of sin(at) with a = 1.',
          },
          {
            step: 'Step 2: Differentiate F(s) with respect to s',
            formula: 'F\'(s) = \\frac{d}{ds}\\left[(s^2+1)^{-1}\\right] = -1(s^2+1)^{-2}(2s) = \\frac{-2s}{(s^2+1)^2}',
            explanation: 'Using the chain/quotient rule on (s² + 1)⁻¹.',
          },
          {
            step: 'Step 3: Apply the multiplication by t theorem',
            formula: '\\mathcal{L}\\{t \\sin t\\} = (-1) \\cdot F\'(s) = (-1) \\cdot \\frac{-2s}{(s^2+1)^2} = \\frac{2s}{(s^2+1)^2}',
            explanation: 'Multiply the derivative by (-1) to obtain the final transformed expression.',
          },
        ],
        finalAnswer: '\\mathcal{L}\\{t \\sin t\\} = \\frac{2s}{(s^2 + 1)^2}',
        arabicNote: 'قانون مباشر: اشتق تحويل sin(t) وهو 1/(s²+1) واضربه بسالب، فتحصل على 2s/(s²+1)²',
      },
      {
        id: 'eg_p26_2',
        title: 'Example 2: Multiplication of Cosine by t² (n = 2)',
        problem: 'Find $\\mathcal{L}\\{f(t)\\}$ for $f(t) = t^2 \\cos t$',
        mathFormula: 'f(t) = t^2 \\cos t, \\quad (n = 2)',
        steps: [
          {
            step: 'Step 1: Compute Laplace of base function cos(t)',
            formula: '\\mathcal{L}\\{\\cos t\\} = \\frac{s}{s^2 + 1} = F(s)',
            explanation: 'Standard Laplace transform of cos(at) with a = 1.',
          },
          {
            step: 'Step 2: Find the first derivative F\'(s)',
            formula: 'F\'(s) = \\frac{(s^2+1)(1) - s(2s)}{(s^2+1)^2} = \\frac{s^2 + 1 - 2s^2}{(s^2+1)^2} = \\frac{1 - s^2}{(s^2+1)^2}',
            explanation: 'Quotient rule: (denominator · d/ds(numerator) - numerator · d/ds(denominator)) / denominator².',
          },
          {
            step: 'Step 3: Find the second derivative F\'\'(s)',
            formula: 'F\'\'(s) = \\frac{(s^2+1)^2(-2s) - (1-s^2)[2(s^2+1)(2s)]}{(s^2+1)^4} = \\frac{(s^2+1)\\left[-2s(s^2+1) - 4s(1-s^2)\\right]}{(s^2+1)^4}',
            explanation: 'Cancel out one common factor of (s² + 1) in numerator and denominator.',
          },
          {
            step: 'Step 4: Simplify numerator and apply (-1)²',
            formula: 'F\'\'(s) = \\frac{-2s^3 - 2s - 4s + 4s^3}{(s^2+1)^3} = \\frac{2s^3 - 6s}{(s^2+1)^3} \\implies \\mathcal{L}\\{t^2 \\cos t\\} = (-1)^2 F\'\'(s) = \\frac{2s^3 - 6s}{(s^2+1)^3}',
            explanation: 'Since n = 2, (-1)² = +1, the final transform equals F\'\'(s).',
          },
        ],
        finalAnswer: '\\mathcal{L}\\{t^2 \\cos t\\} = \\frac{2s^3 - 6s}{(s^2 + 1)^3}',
        arabicNote: 'اشتقينا مرتين وبسطنا الكسر بالقسمة على (s²+1) في البسط والمقام، والناتج النهائي هو (2s³ - 6s)/(s²+1)³',
      },
    ],
    examTricks: [
      '⚠️ Remember the sign alternation: $\\mathcal{L}\\{t^n f(t)\\} = (-1)^n F^{(n)}(s)$. For odd powers ($t, t^3$), do not forget the extra negative sign! (لا تنس الإشارة السالبة عند الضرب في t ذي الأس الفردي)',
      '💡 When finding second derivatives $F\'\'(s)$, look for common factors like $(s^2+a^2)$ between terms in the numerator to cancel with the denominator before multiplying out (بسط باختصار القوس المشترك قبل فك الأقواس لتجنب العمليات المعقدة).',
      '🎯 Quick check: Multiplication by $t$ increases the degree of the denominator by 1 in rational transforms (الضرب في t يزيد درجة المقام بمقدار 1).',
    ],
  },

  // =========================================================================
  // PAGE 27 (Week 8 - Page 2, Notebook marked [1]): Shift Combos & Inverse Laplace via Differentiation
  // =========================================================================
  {
    pageNumber: 27,
    title: 'Exponential Combos & Inverse Laplace using Differentiation (ln and tan⁻¹ Tricks)',
    arabicTitle: 'الأسبوع الثامن (٢): دمج الإزاحة الأسية وتحويل لابلاس العكسي بالاشتقاق (خدع دوال اللوغاريتم والتان العكسي)',
    topicCategory: Category.LAPLACE_THEOREMS,
    summary:
      'Combines multiplication by t with the first shifting theorem (e^(at)), and establishes the high-yield inverse Laplace trick: f(t) = -L⁻¹{F\'(s)}/t for transforming logarithmic, arctangent, and irrational expressions.',
    laws: [
      {
        id: 'law_inverse_differentiation_trick',
        name: 'Inverse Laplace Transform via s-Differentiation',
        arabicName: 'قاعدة إيجاد المعكوس بالاشتقاق (دوال اللوغاريتم ومقلوب الدوال)',
        formula: '\\mathcal{L}\\{t \\cdot f(t)\\} = -F\'(s) \\iff t \\cdot f(t) = -\\mathcal{L}^{-1}\\{F\'(s)\\} \\iff f(t) = \\frac{-\\mathcal{L}^{-1}\\{F\'(s)\\}}{t}',
        explanation:
          'When F(s) contains ln(·) or tan⁻¹(·), which do not have direct inverse formulas, differentiate F(s) to produce a simple rational function, invert that, and divide by -t.',
        arabicExplanation:
          'عند وجود ln أو tan⁻¹ في F(s)، لا يوجد لها معكوس مباشر في الجدول. نقوم باشتقاق F(s) لتتحول إلى كسر جبري بسيط، نوجد معكوسه ثم نقسم على -t.',
      },
      {
        id: 'law_log_properties_trick',
        name: 'Logarithmic Quotient Expansion Rule',
        arabicName: 'تفكيك اللوغاريتمات قبل الاشتقاق',
        formula: '\\ln\\left(\\frac{A}{B}\\right) = \\ln A - \\ln B, \\qquad \\ln\\left((s-a)^k\\right) = k \\ln(s-a)',
        explanation:
          'Always expand quotient logs into differences before differentiating to simplify the derivatives.',
        arabicExplanation:
          'قبل اشتقاق اللوغاريتم، نفكك الكسر: لوغاريتم البسط ناقص لوغاريتم المقام، والأس يخرج كمعامل قبل اللوغاريتم لتسهيل الاشتقاق.',
      },
    ],
    examples: [
      {
        id: 'eg_p27_1',
        title: 'Example 2 (Forward): Multiplication by t combined with First Shift',
        problem: 'Find $\\mathcal{L}\\{f(t)\\}$ for $f(t) = t e^{-2t} \\sin t$',
        mathFormula: 'f(t) = t e^{-2t} \\sin t, \\quad (n = 1)',
        steps: [
          {
            step: 'Step 1: Transform the shifted sine function e^(-2t) sin(t)',
            formula: '\\mathcal{L}\\{e^{-2t} \\sin t\\} = \\frac{1}{(s+2)^2 + 1} = F(s)',
            explanation: 'First shifting theorem replaces s with (s + 2).',
          },
          {
            step: 'Step 2: Differentiate with respect to s',
            formula: 'F\'(s) = \\frac{d}{ds}\\left[((s+2)^2+1)^{-1}\\right] = -1((s+2)^2+1)^{-2} \\cdot 2(s+2) = \\frac{-2(s+2)}{\\left[(s+2)^2+1\\right]^2}',
            explanation: 'Differentiating with respect to s.',
          },
          {
            step: 'Step 3: Apply the multiplication by t rule (-1 · F\'(s))',
            formula: '\\mathcal{L}\\{t e^{-2t} \\sin t\\} = (-1) \\cdot F\'(s) = (-1) \\frac{-2(s+2)}{\\left[(s+2)^2+1\\right]^2} = \\frac{2(s+2)}{\\left[(s+2)^2+1\\right]^2}',
            explanation: 'Negative signs cancel to yield the final positive result.',
          },
        ],
        finalAnswer: '\\mathcal{L}\\{t e^{-2t} \\sin t\\} = \\frac{2(s+2)}{\\left[(s+2)^2 + 1\\right]^2}',
        arabicNote: 'طبقنا الإزاحة الأولى e^(-2t) أولاً ثم اشتقينا بالنسبة لـ s وضربنا في (-1).',
      },
      {
        id: 'eg_p27_2',
        title: 'Example 3 (Forward): Exponential times High Power of t',
        problem: 'Find $\\mathcal{L}\\{f(t)\\}$ for $f(t) = e^{10t} t^{20}$',
        mathFormula: 'f(t) = e^{10t} t^{20}',
        steps: [
          {
            step: 'Step 1: Compute Laplace of base power t²⁰',
            formula: '\\mathcal{L}\\{t^{20}\\} = \\frac{20!}{s^{21}}',
            explanation: 'Standard power transform L{tⁿ} = n! / sⁿ⁺¹.',
          },
          {
            step: 'Step 2: Apply first shifting theorem with a = 10',
            formula: '\\mathcal{L}\\{e^{10t} t^{20}\\} = \\frac{20!}{(s - 10)^{21}}',
            explanation: 'Replace every s with (s - 10).',
          },
        ],
        finalAnswer: '\\mathcal{L}\\{e^{10t} t^{20}\\} = \\frac{20!}{(s - 10)^{21}}',
        arabicNote: 'مباشرة باستخدام نظرية الإزاحة الأولى على t²⁰ بدلاً من الاشتقاق عشرين مرة.',
      },
      {
        id: 'eg_p27_3',
        title: 'Inverse Example 1: Inversion of Arctan Function',
        problem: 'Find $\\mathcal{L}^{-1}\\{F(s)\\}$ for $F(s) = \\tan^{-1}(s)$',
        mathFormula: 'F(s) = \\tan^{-1}(s)',
        steps: [
          {
            step: 'Step 1: Differentiate F(s) with respect to s',
            formula: 'F\'(s) = \\frac{d}{ds}\\left[\\tan^{-1}(s)\\right] = \\frac{1}{1 + s^2} = \\frac{1}{s^2 + 1}',
            explanation: 'The derivative of arctan(s) is the standard transform of sin(t).',
          },
          {
            step: 'Step 2: Take the inverse Laplace transform of F\'(s)',
            formula: '\\mathcal{L}^{-1}\\{F\'(s)\\} = \\mathcal{L}^{-1}\\left\\{\\frac{1}{s^2 + 1}\\right\\} = \\sin t',
            explanation: 'Standard table lookup for 1/(s² + 1).',
          },
          {
            step: 'Step 3: Divide by -t',
            formula: 'f(t) = \\mathcal{L}^{-1}\\{\\tan^{-1} s\\} = \\frac{\\mathcal{L}^{-1}\\{F\'(s)\\}}{-t} = \\frac{\\sin t}{-t} = -\\frac{\\sin t}{t}',
            explanation: 'Using f(t) = -L⁻¹{F\'(s)} / t.',
          },
        ],
        finalAnswer: '\\mathcal{L}^{-1}\\{\\tan^{-1}(s)\\} = -\\frac{\\sin t}{t}',
        arabicNote: 'اشتقينا tan⁻¹(s) أعطتنا 1/(1+s²) ومعكوسها sin(t)، وبقسمتها على -t يكون الناتج -sin(t)/t.',
      },
      {
        id: 'eg_p27_4',
        title: 'Inverse Example 2: Inversion of Single Logarithmic Term',
        problem: 'Find $\\mathcal{L}^{-1}\\{F(s)\\}$ for $F(s) = \\ln(s^2 + 16)$',
        mathFormula: 'F(s) = \\ln(s^2 + 16)',
        steps: [
          {
            step: 'Step 1: Differentiate F(s) with respect to s',
            formula: 'F\'(s) = \\frac{d}{ds}\\left[\\ln(s^2 + 16)\\right] = \\frac{2s}{s^2 + 16}',
            explanation: 'Derivative of ln(u) is u\' / u.',
          },
          {
            step: 'Step 2: Find inverse of F\'(s)',
            formula: '\\mathcal{L}^{-1}\\{F\'(s)\\} = \\mathcal{L}^{-1}\\left\\{2 \\cdot \\frac{s}{s^2 + 16}\\right\\} = 2 \\cos(4t)',
            explanation: 'Table lookup for s/(s² + 4²).',
          },
          {
            step: 'Step 3: Divide by -t',
            formula: 'f(t) = \\frac{\\mathcal{L}^{-1}\\{F\'(s)\\}}{-t} = \\frac{2\\cos(4t)}{-t} = -\\frac{2\\cos(4t)}{t}',
            explanation: 'Divide by -t to get f(t).',
          },
        ],
        finalAnswer: '\\mathcal{L}^{-1}\\{\\ln(s^2 + 16)\\} = -\\frac{2\\cos(4t)}{t}',
        arabicNote: 'اشتقينا اللوغاريتم وأعطانا 2s/(s²+16)، معكوسه 2cos(4t)، ثم قسمنا على -t.',
      },
      {
        id: 'eg_p27_5',
        title: 'Inverse Example 3: Inversion of Logarithmic Rational Expression',
        problem: 'Find $\\mathcal{L}^{-1}\\{F(s)\\}$ for $F(s) = \\ln\\left(\\frac{s^2 + 16}{(s - 1)^2}\\right)$',
        mathFormula: 'F(s) = \\ln\\left(\\frac{s^2 + 16}{(s - 1)^2}\\right)',
        steps: [
          {
            step: 'Step 1: Expand logarithm properties before differentiating',
            formula: 'F(s) = \\ln(s^2 + 16) - \\ln\\left((s-1)^2\\right) = \\ln(s^2 + 16) - 2\\ln(s-1)',
            explanation: 'Split quotient and bring power 2 out front.',
          },
          {
            step: 'Step 2: Differentiate term by term',
            formula: 'F\'(s) = \\frac{2s}{s^2 + 16} - \\frac{2}{s - 1}',
            explanation: 'Derivative of each logarithmic term.',
          },
          {
            step: 'Step 3: Find inverse of F\'(s)',
            formula: '\\mathcal{L}^{-1}\\{F\'(s)\\} = 2\\cos(4t) - 2e^t',
            explanation: 'Invert 2s/(s²+16) to 2cos(4t) and 2/(s-1) to 2e^t.',
          },
          {
            step: 'Step 4: Divide by -t to recover original inverse f(t)',
            formula: 'f(t) = \\frac{\\mathcal{L}^{-1}\\{F\'(s)\\}}{-t} = \\frac{2\\cos(4t) - 2e^t}{-t} = \\frac{2e^t - 2\\cos(4t)}{t}',
            explanation: 'Divide by -t (or distribute minus sign into numerator).',
          },
        ],
        finalAnswer: '\\mathcal{L}^{-1}\\left\\{\\ln\\left(\\frac{s^2 + 16}{(s - 1)^2}\\right)\\right\\} = \\frac{2e^t - 2\\cos(4t)}{t}',
        arabicNote: 'سؤال امتحاني شهير: فك اللوغاريتم أولاً، ثم اشتق كل حد، ثم أوجد المعكوس واقسم على -t.',
      },
    ],
    examTricks: [
      '🔥 The Log Inversion Trick: Never try finding $\\mathcal{L}^{-1}\\{\\ln(\\dots)\\}$ or $\\mathcal{L}^{-1}\\{\\tan^{-1}(\\dots)\\}$ directly. Differentiate $F(s)$ to eliminate logs/inverse trig, invert $F\'(s)$, and divide the result by $-t$.',
      '💡 Always use $\\ln(A/B) = \\ln A - \\ln B$ and $\\ln(u^k) = k\\ln u$ BEFORE taking the derivative $\\frac{d}{ds}$. It turns complex quotient derivatives into effortless term-by-term fractions!',
      '⚠️ Remember the minus sign in division: $f(t) = \\frac{-\\mathcal{L}^{-1}\\{F\'(s)\\}}{t}$. Forgetting the negative in front turns your signs backwards.',
    ],
  },

  // =========================================================================
  // PAGE 28 (Week 8 - Page 3, Notebook marked [2]): Division by t & Laplace of Derivatives (ODE Basics)
  // =========================================================================
  {
    pageNumber: 28,
    title: 'Integration of Laplace Transform (Division by t) & ODE Initial Value Problem Basics',
    arabicTitle: 'الأسبوع الثامن (٣): تكامل تحويل لابلاس (القسمة على t) وبداية حل المعادلات التفاضلية',
    topicCategory: Category.LAPLACE_THEOREMS,
    summary:
      'Presents the integration property of Laplace transforms (division by t in time corresponds to integrating F(s) from s to ∞), together with the fundamental derivative transform laws for initial value problems and the first full ODE solution.',
    laws: [
      {
        id: 'law_division_by_t_integration',
        name: 'Division by t (Integration in s Domain)',
        arabicName: 'القسمة على t في مجال الزمن (تكامل في مجال التردد)',
        formula: '\\mathcal{L}\\left\\{ \\frac{f(t)}{t} \\right\\} = \\int_s^\\infty F(z) \\, dz, \\qquad \\text{provided } \\lim_{t \\to 0} \\frac{f(t)}{t} \\text{ exists}',
        explanation:
          'Dividing by t in the time domain corresponds to improper integration of the Laplace transform F(z) from s to infinity.',
        arabicExplanation:
          'قسمة أي دالة على t يقابلها تكامل تحويلها F(z) بالنسبة لـ z من s إلى ما لا نهاية. بشرط أن تكون نهاية f(t)/t عند الصفر موجودة.',
      },
      {
        id: 'law_ode_derivatives_transform',
        name: 'Laplace Transform of n-th and Lower Order Derivatives',
        arabicName: 'قوانين تحويل مشتقات الدالة y(t) للشروط الابتدائية',
        formula: '\\begin{aligned} \\mathcal{L}\\{y\'(t)\\} &= s Y(s) - y(0) \\\\ \\mathcal{L}\\{y\'\'(t)\\} &= s^2 Y(s) - s y(0) - y\'(0) \\\\ \\mathcal{L}\\{y^{(n)}(t)\\} &= s^n Y(s) - s^{n-1}y(0) - s^{n-2}y\'(0) - \\dots - y^{(n-1)}(0) \\end{aligned}',
        explanation:
          'Transforms differential operators directly into algebraic equations incorporating initial conditions y(0), y\'(0).',
        arabicExplanation:
          'تحول المشتقات إلى مقادير جبرية في Y(s) مع تعويض الشروط الابتدائية فوراً في المعادلة.',
      },
    ],
    examples: [
      {
        id: 'eg_p28_1',
        title: 'Example 1: Division by t for Hyperbolic Sine',
        problem: 'Find $\\mathcal{L}\\{f(t)\\}$ for $f(t) = \\frac{\\sinh(2t)}{2t}$',
        mathFormula: 'f(t) = \\frac{\\sinh(2t)}{2t}',
        steps: [
          {
            step: 'Step 1: Transform base numerator f₁(t) = (1/2) sinh(2t)',
            formula: '\\mathcal{L}\\left\\{\\frac{1}{2}\\sinh(2t)\\right\\} = \\frac{1}{2} \\cdot \\frac{2}{s^2 - 4} = \\frac{1}{s^2 - 4} = F(s)',
            explanation: 'Base transform of sinh(2t) / 2.',
          },
          {
            step: 'Step 2: Set up the integral from s to ∞',
            formula: 'F(s) = \\int_s^\\infty \\frac{1}{z^2 - 4} \\, dz = \\left[ -\\frac{1}{2} \\tanh^{-1}\\left(\\frac{z}{2}\\right) \\right]_s^\\infty = \\left[ \\frac{1}{4} \\ln\\left|\\frac{z-2}{z+2}\\right| \\right]_s^\\infty',
            explanation: 'Using either inverse hyperbolic tangent or standard partial fraction logarithmic integration.',
          },
          {
            step: 'Step 3: Evaluate at limits',
            formula: '= -\\frac{1}{2}\\left[\\tanh^{-1}(\\infty) - \\tanh^{-1}\\left(\\frac{s}{2}\\right)\\right] = \\frac{1}{4}\\left(0 - \\ln\\left|\\frac{s-2}{s+2}\\right|\\right) = \\frac{1}{4} \\ln\\left|\\frac{s+2}{s-2}\\right|',
            explanation: 'At infinity ln|1| = 0, leaving the inverted argument ln|(s+2)/(s-2)| / 4.',
          },
        ],
        finalAnswer: '\\mathcal{L}\\left\\{\\frac{\\sinh(2t)}{2t}\\right\\} = \\frac{1}{4} \\ln\\left|\\frac{s + 2}{s - 2}\\right| = -\\frac{1}{2}\\left[\\tanh^{-1}(\\infty) - \\tanh^{-1}\\left(\\frac{s}{2}\\right)\\right]',
        arabicNote: 'طبقنا تكامل 1/(z²-4) من s إلى ∞، وكتبناها بصيغة tanh⁻¹ وبصيغة اللوغاريتم الطبيعي (1/4)ln|(s+2)/(s-2)|.',
      },
      {
        id: 'eg_p28_2',
        title: 'Example 2: Division by t for Sine',
        problem: 'Find $\\mathcal{L}\\{f(t)\\}$ for $f(t) = \\frac{\\sin(5t)}{t}$',
        mathFormula: 'f(t) = \\frac{\\sin(5t)}{t}',
        steps: [
          {
            step: 'Step 1: Transform numerator sin(5t)',
            formula: '\\mathcal{L}\\{\\sin(5t)\\} = \\frac{5}{s^2 + 25} = F(s)',
            explanation: 'Standard sine transform.',
          },
          {
            step: 'Step 2: Integrate F(z) from s to ∞',
            formula: 'F(s) = \\int_s^\\infty \\frac{5}{z^2 + 25} \\, dz = \\left[ \\frac{5}{5} \\tan^{-1}\\left(\\frac{z}{5}\\right) \\right]_s^\\infty = \\left[ \\tan^{-1}\\left(\\frac{z}{5}\\right) \\right]_s^\\infty',
            explanation: 'Standard arctan integral formula: ∫ a/(z²+a²) dz = arctan(z/a).',
          },
          {
            step: 'Step 3: Evaluate at ∞ and s',
            formula: '= \\tan^{-1}(\\infty) - \\tan^{-1}\\left(\\frac{s}{5}\\right) = \\frac{\\pi}{2} - \\tan^{-1}\\left(\\frac{s}{5}\\right) = \\cot^{-1}\\left(\\frac{s}{5}\\right)',
            explanation: 'Since arctan(∞) = π/2, and π/2 - arctan(x) = cotan⁻¹(x) = arctan(5/s).',
          },
        ],
        finalAnswer: '\\mathcal{L}\\left\\{\\frac{\\sin(5t)}{t}\\right\\} = \\frac{\\pi}{2} - \\tan^{-1}\\left(\\frac{s}{5}\\right) = \\cot^{-1}\\left(\\frac{s}{5}\\right)',
        arabicNote: 'تكامل شهير جداً: يعطي π/2 - tan⁻¹(s/5) أو cot⁻¹(s/5) أو tan⁻¹(5/s).',
      },
      {
        id: 'eg_p28_3',
        title: 'ODE Problem (a): Second-Order Homogeneous IVP',
        problem: 'Solve using Laplace Transform: $y\'\' - 3y\' + 2y = 0, \\quad y(0) = 4, \\quad y\'(0) = 3$',
        mathFormula: 'y\'\' - 3y\' + 2y = 0, \\quad y(0) = 4, \\quad y\'(0) = 3',
        steps: [
          {
            step: 'Step 1: Take Laplace transform of both sides',
            formula: '\\mathcal{L}\\{y\'\'\\} - 3\\mathcal{L}\\{y\'\\} + 2\\mathcal{L}\\{y\\} = 0',
            explanation: 'Linearity of Laplace transform.',
          },
          {
            step: 'Step 2: Substitute derivative formulas and initial values',
            formula: '\\left[s^2 Y(s) - s y(0) - y\'(0)\\right] - 3\\left[s Y(s) - y(0)\\right] + 2 Y(s) = 0 \\implies \\left[s^2 Y(s) - 4s - 3\\right] - 3\\left[s Y(s) - 4\\right] + 2 Y(s) = 0',
            explanation: 'Plug in y(0) = 4 and y\'(0) = 3.',
          },
          {
            step: 'Step 3: Group Y(s) terms and isolate Y(s)',
            formula: '(s^2 - 3s + 2) Y(s) - 4s - 3 + 12 = 0 \\implies (s^2 - 3s + 2) Y(s) = 4s - 9 \\implies Y(s) = \\frac{4s - 9}{(s - 2)(s - 1)}',
            explanation: 'Factor denominator into (s - 2)(s - 1).',
          },
          {
            step: 'Step 4: Partial fraction decomposition',
            formula: 'Y(s) = \\frac{A}{s - 2} + \\frac{B}{s - 1}, \\quad A = \\lim_{s \\to 2} \\frac{4s-9}{s-1} = \\frac{8-9}{1} = -1, \\quad B = \\lim_{s \\to 1} \\frac{4s-9}{s-2} = \\frac{4-9}{-1} = 5',
            explanation: 'Heaviside cover-up method for distinct linear roots.',
          },
          {
            step: 'Step 5: Inverse Laplace transform to find y(t)',
            formula: 'Y(s) = \\frac{-1}{s - 2} + \\frac{5}{s - 1} \\implies y(t) = -e^{2t} + 5e^t',
            explanation: 'Invert each term back into the time domain.',
          },
        ],
        finalAnswer: 'y(t) = -e^{2t} + 5e^t',
        arabicNote: 'تحولت المعادلة التفاضلية إلى كسر جبري تم تحليله بالكسور الجزئية A/(s-2) + B/(s-1)، والحل النهائي هو y(t) = -e^(2t) + 5e^t.',
      },
    ],
    examTricks: [
      '💡 Boundary trick at infinity: In $\\int_s^\\infty F(z) dz$, evaluation at $\\infty$ for rational $\\ln$ expressions approaches $\\ln(1) = 0$, and for $\\tan^{-1}(z/a)$ it equals $\\frac{\\pi}{2}$.',
      '⚠️ Remember that $\\frac{\\pi}{2} - \\tan^{-1}(s/a) = \\cot^{-1}(s/a) = \\tan^{-1}(a/s)$. All three representations are fully equivalent on exam grading keys.',
      '🎯 In ODEs, be very vigilant with the signs when expanding $-a[s Y(s) - y(0)]$: the distributed constant gives $+a \\cdot y(0)$!',
    ],
  },

  // =========================================================================
  // PAGE 29 (Week 8 - Page 4, Notebook marked [3]): Advanced ODEs via Laplace Transform
  // =========================================================================
  {
    pageNumber: 29,
    title: 'Solving Non-Homogeneous Differential Equations via Laplace Transform & Partial Fractions',
    arabicTitle: 'الأسبوع الثامن (٤): حل المعادلات التفاضلية غير المتجانسة باستخدام تحويل لابلاس والكسور الجزئية',
    topicCategory: Category.LAPLACE_ODE,
    summary:
      'Solves higher-order non-homogeneous differential equations with trigonometric and exponential forcing functions. Demonstrates coefficient matching and Heaviside cover-up methods for irreducible quadratic and multiple real roots.',
    laws: [
      {
        id: 'law_laplace_ode_solution_pipeline',
        name: 'Complete 4-Step Laplace ODE Solution Pipeline',
        arabicName: 'خطوات الحل الأربع للمعادلات التفاضلية بلابلاس',
        formula: '\\text{ODE with IVP} \\xrightarrow{\\mathcal{L}} \\text{Algebraic equation for } Y(s) \\xrightarrow{\\text{Algebra}} Y(s) = \\frac{P(s)}{Q(s)} \\xrightarrow{\\text{Partial Fractions}} \\sum \\frac{A_k}{s - r_k} \\xrightarrow{\\mathcal{L}^{-1}} y(t)',
        explanation:
          '1. Apply Laplace to both sides. 2. Insert initial conditions. 3. Solve algebraically for Y(s). 4. Decompose by partial fractions and invert term by term.',
        arabicExplanation:
          '١. أخذ تحويل لابلاس للطرفين. ٢. تعويض الشروط الابتدائية. ٣. عزل Y(s). ٤. تفكيك الكسور الجزئية وإيجاد المعكوس.',
      },
    ],
    examples: [
      {
        id: 'eg_p29_1',
        title: 'ODE Problem (b): First-Order with Trigonometric Forcing',
        problem: 'Solve using Laplace Transform: $3y\' - 4y = \\sin t, \\quad y(0) = 3$',
        mathFormula: '3y\' - 4y = \\sin t, \\quad y(0) = 3',
        steps: [
          {
            step: 'Step 1: Apply Laplace transform to both sides',
            formula: '3\\mathcal{L}\\{y\'\\} - 4\\mathcal{L}\\{y\\} = \\mathcal{L}\\{\\sin t\\} \\implies 3\\left[s Y(s) - y(0)\\right] - 4Y(s) = \\frac{1}{s^2 + 1}',
            explanation: 'Using L{sin t} = 1/(s² + 1).',
          },
          {
            step: 'Step 2: Insert y(0) = 3 and isolate Y(s)',
            formula: '(3s - 4) Y(s) - 9 = \\frac{1}{s^2 + 1} \\implies (3s - 4) Y(s) = \\frac{1}{s^2 + 1} + 9 = \\frac{9s^2 + 10}{s^2 + 1} \\implies Y(s) = \\frac{9s^2 + 10}{(s^2 + 1)(3s - 4)}',
            explanation: 'Combine 1/(s²+1) + 9 over common denominator.',
          },
          {
            step: 'Step 3: Partial fraction decomposition with quadratic and linear factors',
            formula: 'Y(s) = \\frac{As + B}{s^2 + 1} + \\frac{C}{3s - 4} \\implies 9s^2 + 10 = (3s - 4)(As + B) + C(s^2 + 1)',
            explanation: 'Set up numerator identity: 9s² + 10 = (3A + C)s² + (3B - 4A)s + (C - 4B).',
          },
          {
            step: 'Step 4: Solve for coefficients A, B, and C',
            formula: '\\begin{aligned} s^2: & \\quad 3A + C = 9 \\\\ s^1: & \\quad 3B - 4A = 0 \\implies B = \\frac{4}{3}A \\\\ s^0: & \\quad C - 4B = 10 \\implies C - \\frac{16}{3}A = 10 \\end{aligned} \\implies A = -\\frac{3}{25}, \\quad B = -\\frac{4}{25}, \\quad C = \\frac{234}{25}',
            explanation: 'Solving the 3x3 linear system gives exact fractions.',
          },
          {
            step: 'Step 5: Separate and apply inverse Laplace transform',
            formula: 'Y(s) = -\\frac{3}{25}\\frac{s}{s^2+1} - \\frac{4}{25}\\frac{1}{s^2+1} + \\frac{234}{25} \\cdot \\frac{1}{3(s - 4/3)} \\implies y(t) = -\\frac{3}{25}\\cos t - \\frac{4}{25}\\sin t + \\frac{78}{25}e^{\\frac{4}{3}t}',
            explanation: 'Invert each term back to trigonometric and exponential components.',
          },
        ],
        finalAnswer: 'y(t) = -\\frac{3}{25}\\cos t - \\frac{4}{25}\\sin t + \\frac{78}{25}e^{\\frac{4}{3}t} \\quad \\left(\\text{or in notebook form } -\\frac{29}{75}\\cos t + \\frac{1}{25}\\sin t + \\frac{254}{75}e^{\\frac{4}{3}t}\\right)',
        arabicNote: 'فككنا الكسر إلى (As + B)/(s²+1) + C/(3s-4) وساينا المعاملات لإيجاد الثوابت، ثم أوجدنا المعكوس.',
      },
      {
        id: 'eg_p29_2',
        title: 'ODE Problem (c): Second-Order with Exponential Forcing',
        problem: 'Solve using Laplace Transform: $y\'\' - 6y\' + 8y = e^{3t}, \\quad y(0) = 0, \\quad y\'(0) = 2$',
        mathFormula: 'y\'\' - 6y\' + 8y = e^{3t}, \\quad y(0) = 0, \\quad y\'(0) = 2',
        steps: [
          {
            step: 'Step 1: Apply Laplace transform to both sides',
            formula: '\\mathcal{L}\\{y\'\'\\} - 6\\mathcal{L}\\{y\'\\} + 8\\mathcal{L}\\{y\\} = \\mathcal{L}\\{e^{3t}\\} \\implies \\left[s^2 Y(s) - s y(0) - y\'(0)\\right] - 6\\left[s Y(s) - y(0)\\right] + 8Y(s) = \\frac{1}{s - 3}',
            explanation: 'Using L{e^(3t)} = 1/(s - 3).',
          },
          {
            step: 'Step 2: Insert initial conditions y(0) = 0, y\'(0) = 2',
            formula: '(s^2 - 6s + 8) Y(s) - 2 = \\frac{1}{s - 3} \\implies (s^2 - 6s + 8) Y(s) = 2 + \\frac{1}{s - 3} = \\frac{2(s - 3) + 1}{s - 3} = \\frac{2s - 5}{s - 3}',
            explanation: 'Bring -2 to right hand side and combine into single rational fraction.',
          },
          {
            step: 'Step 3: Factor denominator completely',
            formula: 's^2 - 6s + 8 = (s - 4)(s - 2) \\implies Y(s) = \\frac{2s - 5}{(s - 3)(s - 4)(s - 2)}',
            explanation: 'We have three distinct linear factors: (s - 3), (s - 4), (s - 2).',
          },
          {
            step: 'Step 4: Partial fraction decomposition via Cover-Up method',
            formula: '\\begin{aligned} Y(s) &= \\frac{A}{s - 3} + \\frac{B}{s - 4} + \\frac{C}{s - 2} \\\\ A &= \\lim_{s \\to 3} \\frac{2s - 5}{(s - 4)(s - 2)} = \\frac{6 - 5}{(-1)(1)} = -1 \\\\ B &= \\lim_{s \\to 4} \\frac{2s - 5}{(s - 3)(s - 2)} = \\frac{8 - 5}{(1)(2)} = \\frac{3}{2} \\\\ C &= \\lim_{s \\to 2} \\frac{2s - 5}{(s - 3)(s - 4)} = \\frac{4 - 5}{(-1)(-2)} = -\\frac{1}{2} \\end{aligned}',
            explanation: 'Evaluate residue at each pole.',
          },
          {
            step: 'Step 5: Form inverse Laplace transform y(t)',
            formula: 'Y(s) = \\frac{-1}{s - 3} + \\frac{3/2}{s - 4} - \\frac{1/2}{s - 2} \\implies y(t) = -e^{3t} + \\frac{3}{2}e^{4t} - \\frac{1}{2}e^{2t}',
            explanation: 'Invert each simple partial fraction term to obtain the unique solution to the IVP.',
          },
        ],
        finalAnswer: 'y(t) = -e^{3t} + \\frac{3}{2}e^{4t} - \\frac{1}{2}e^{2t}',
        arabicNote: 'معادلة متكاملة رائعة: بسطنا الكسر بالطرف الأيمن إلى (2s-5)/(s-3)، ثم حللنا المقام إلى (s-4)(s-2) وأوجدنا الثوابت A=-1, B=3/2, C=-1/2 والمعكوس المباشر.',
      },
    ],
    examTricks: [
      '🔥 The Heaviside Cover-Up Method saves minutes: For simple real roots $\\frac{N(s)}{(s-r_1)(s-r_2)\\dots}$, find $A_k$ by covering $(s-r_k)$ and plugging in $s = r_k$.',
      '⚠️ For quadratic denominators $(s^2+1)$, the partial fraction numerator must be $(As + B)$, not just a single constant $A$!',
      '🎯 In initial value problems, always double-check the initial condition $y(0)$ by plugging $t=0$ into your final $y(t)$ solution to verify consistency immediately.',
    ],
  },
];

