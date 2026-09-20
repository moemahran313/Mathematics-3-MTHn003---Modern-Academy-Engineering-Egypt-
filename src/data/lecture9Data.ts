import { Category, LecturePage } from '../types';

export const LECTURE_9_PAGES: LecturePage[] = [
  // =========================================================================
  // PAGE 30 (Week 9 - Page 1): Fourier Series Foundations & Symmetry Properties
  // =========================================================================
  {
    pageNumber: 30,
    title: 'Fourier Series Foundations: General Period, Even & Odd Functions, and Half-Range Series',
    arabicTitle: 'الأسبوع التاسع (١): أساسيات متسلسلات فورييه، الفترة والدوال الزوجية والفردية ونصف المدى',
    topicCategory: Category.FOURIER_SERIES,
    summary:
      'Covers the fundamental formulation of Fourier series for periodic functions of period 2T on [-a, a] with T = a. Outlines Euler-Fourier coefficient formulas, parity simplifications for even (Cosine series) and odd (Sine series) functions, and definitions of Half-Range expansions on [0, a].',
    laws: [
      {
        id: 'law_fourier_general_series',
        name: 'General Fourier Series Expansion & Period',
        arabicName: 'المفكوك العام لمتسلسلة فورييه وحساب الفترة',
        formula:
          'f(x) = \\frac{a_0}{2} + \\sum_{n=1}^\\infty \\left[ a_n \\cos\\left(\\frac{n\\pi}{T}x\\right) + b_n \\sin\\left(\\frac{n\\pi}{T}x\\right) \\right], \\quad -a \\le x \\le a, \\; 2T = a - (-a) = 2a \\implies T = a',
        explanation:
          'Decomposes any piecewise smooth periodic function of period 2T into an infinite harmonic sum of sines, cosines, and a constant term a0/2.',
        arabicExplanation:
          'المتسلسلة العامة على الفترة [-a, a]، حيث طول الفترة 2T = 2a ومنها نصف الفترة T = a. تتكون من حد ثابت a0/2 ومجموع حدود جيب التمام an والجيب bn.',
      },
      {
        id: 'law_fourier_coefficients_general',
        name: 'Euler-Fourier Integral Coefficients',
        arabicName: 'معاملات فورييه التكاملية العامة',
        formula:
          'a_0 = \\frac{1}{T}\\int_{-T}^T f(x)\\,dx, \\quad a_n = \\frac{1}{T}\\int_{-T}^T f(x)\\cos\\left(\\frac{n\\pi}{T}x\\right)dx, \\quad b_n = \\frac{1}{T}\\int_{-T}^T f(x)\\sin\\left(\\frac{n\\pi}{T}x\\right)dx',
        explanation:
          'General integral formulas for calculating coefficients a0, an, and bn over a full symmetric interval [-T, T].',
        arabicExplanation:
          'القوانين العامة لحساب المعاملات a0 و an و bn بالتكامل على المدى الكامل من -T إلى T.',
      },
      {
        id: 'law_fourier_even_function',
        name: 'Even Function Rule (Fourier Cosine Series)',
        arabicName: 'قاعدة الدالة الزوجية (متسلسلة جيب التمام)',
        formula:
          'f(-x) = f(x) \\implies b_n = 0, \\quad a_0 = \\frac{2}{T}\\int_0^T f(x)\\,dx, \\quad a_n = \\frac{2}{T}\\int_0^T f(x)\\cos\\left(\\frac{n\\pi}{T}x\\right)dx \\implies f(x) = \\frac{a_0}{2} + \\sum_{n=1}^\\infty a_n \\cos\\left(\\frac{n\\pi}{T}x\\right)',
        explanation:
          'When f(x) is even, all sine coefficients bn vanish identically (bn = 0), and integrals are doubled over [0, T].',
        arabicExplanation:
          'إذا كانت الدالة زوجية، فإن معاملات الجيب bn = 0 مباشرة، ونكامل على نصف الفترة من 0 إلى T مع الضرب في 2/T.',
      },
      {
        id: 'law_fourier_odd_function',
        name: 'Odd Function Rule (Fourier Sine Series)',
        arabicName: 'قاعدة الدالة الفردية (متسلسلة الجيب)',
        formula:
          'f(-x) = -f(x) \\implies a_0 = a_n = 0, \\quad b_n = \\frac{2}{T}\\int_0^T f(x)\\sin\\left(\\frac{n\\pi}{T}x\\right)dx \\implies f(x) = \\sum_{n=1}^\\infty b_n \\sin\\left(\\frac{n\\pi}{T}x\\right)',
        explanation:
          'When f(x) is odd, the constant term and all cosine coefficients vanish (a0 = an = 0), leaving only the sine sum.',
        arabicExplanation:
          'إذا كانت الدالة فردية، فإن a0 = an = 0 فوراً، وتتكون المتسلسلة من حدود الجيب bn فقط بالتكامل من 0 إلى T.',
      },
      {
        id: 'law_fourier_half_range',
        name: 'Half-Range Expansions on [0, a]',
        arabicName: 'متسلسلات نصف المدى على الفترة [0, a]',
        formula:
          '\\begin{cases} \\text{Fourier Sine Series: } & f(x) \\text{ extended odd, } T = a, \\; a_0 = a_n = 0, \\; b_n = \\frac{2}{T}\\int_0^T f(x)\\sin\\left(\\frac{n\\pi}{T}x\\right)dx \\\\ \\text{Fourier Cosine Series: } & f(x) \\text{ extended even, } T = a, \\; b_n = 0, \\; a_0 = \\frac{2}{T}\\int_0^T f(x)dx, \\; a_n = \\frac{2}{T}\\int_0^T f(x)\\cos\\left(\\frac{n\\pi}{T}x\\right)dx \\end{cases}',
        explanation:
          'Half-range expansions represent f(x) on [0, a] by setting T = a and choosing either an odd or even periodic extension.',
        arabicExplanation:
          'في متسلسلات نصف المدى على [0, a]، نضع T = a دائماً. إذا طُلب Sine نعتبرها فردية (a0=an=0)، وإذا طُلب Cosine نعتبرها زوجية (bn=0).',
      },
    ],
    examples: [
      {
        id: 'eg_p30_1',
        title: 'Summary Classification: Periodic Function Symmetry & Fourier Series Selection',
        problem:
          'Determine the non-zero Fourier coefficients and period T for:\n1. $f(x) = x^3$ on $[-\\pi, \\pi]$\n2. $f(x) = \\cos(2x)$ on $[-\\pi, \\pi]$\n3. Fourier Sine Series of $f(x) = e^x$ on $[0, 3]$\n4. Fourier Cosine Series of $f(x) = 1 - x$ on $[0, 2]$',
        mathFormula:
          '\\text{Classification of Fourier expansions based on interval and parity}',
        steps: [
          {
            step: 'Case 1: Odd function on symmetric interval',
            formula: 'f(x) = x^3 \\implies f(-x) = -x^3 = -f(x) \\implies T = \\pi, \\; a_0 = a_n = 0, \\; b_n = \\frac{2}{\\pi}\\int_0^\\pi x^3 \\sin(nx)\\,dx',
            explanation: 'Odd function on [-π, π] requires only sine coefficients bn.',
          },
          {
            step: 'Case 2: Even function on symmetric interval',
            formula: 'f(x) = \\cos(2x) \\implies f(-x) = \\cos(-2x) = \\cos(2x) \\implies T = \\pi, \\; b_n = 0, \\; a_0 = \\frac{2}{\\pi}\\int_0^\\pi \\cos(2x)dx, \\; a_n = \\frac{2}{\\pi}\\int_0^\\pi \\cos(2x)\\cos(nx)dx',
            explanation: 'Even function on [-π, π] requires only a0 and cosine coefficients an.',
          },
          {
            step: 'Case 3: Half-range Fourier Sine series on [0, 3]',
            formula: 'T = a = 3 \\implies a_0 = a_n = 0, \\quad b_n = \\frac{2}{3}\\int_0^3 e^x \\sin\\left(\\frac{n\\pi}{3}x\\right)dx',
            explanation: 'Fourier Sine half-range expansion sets T = 3 with an odd extension.',
          },
          {
            step: 'Case 4: Half-range Fourier Cosine series on [0, 2]',
            formula: 'T = a = 2 \\implies b_n = 0, \\quad a_0 = \\frac{2}{2}\\int_0^2 (1 - x)\\,dx = 0, \\quad a_n = \\frac{2}{2}\\int_0^2 (1 - x)\\cos\\left(\\frac{n\\pi}{2}x\\right)dx',
            explanation: 'Fourier Cosine half-range expansion sets T = 2 with an even extension.',
          },
        ],
        finalAnswer: '\\text{Parity dictates zero coefficients: Odd } \\implies a_0=a_n=0, \\; \\text{Even } \\implies b_n=0, \\; \\text{Half-range on } [0,a] \\implies T=a.',
        arabicNote: 'تحديد نوع الدالة يوفر نصف مجهود التكامل تماماً، فتتجنب حساب المعاملات الصفرية.',
      },
    ],
    examTricks: [
      '⚡ Parity Rule: Always test $f(-x)$ first! If $f(-x) = -f(x)$ (odd), write immediately $a_0 = a_n = 0$. If $f(-x) = f(x)$ (even), write $b_n = 0$.',
      '⚠️ Period Formula: On interval $[-a, a]$, the total interval length is $2T = a - (-a) = 2a \\implies T = a$. The argument inside trig functions is always $\\frac{n\\pi}{T}x = \\frac{n\\pi}{a}x$.',
      '💡 Half-Range Trap: When the question asks for "Fourier Sine Series" or "Fourier Cosine Series" on $[0, a]$, set $T = a$ directly (do NOT divide $a$ by 2).',
    ],
  },

  // =========================================================================
  // PAGE 31 (Week 9 - Page 2): Full Fourier Series on [-pi, pi] (Examples 1a and 1b start)
  // =========================================================================
  {
    pageNumber: 31,
    title: 'Full Fourier Series on [-π, π]: Odd Function f(x) = x & Even Function f(x) = x²',
    arabicTitle: 'الأسبوع التاسع (٢): متسلسلة فورييه على [-π, π] للدالة الفردية x والدالة الزوجية x²',
    topicCategory: Category.FOURIER_SERIES,
    summary:
      'Solves Example 1(a) finding the complete Fourier series for f(x) = x on -π < x < π using tabular integration by parts, and begins Example 1(b) for f(x) = x² by determining parity, computing a0 = 2π²/3, and setting up the an integral.',
    laws: [
      {
        id: 'law_fourier_pi_interval',
        name: 'Fourier Series on Symmetric Interval [-π, π] (T = π)',
        arabicName: 'متسلسلة فورييه على الفترة [-π, π] حيث T = π',
        formula:
          'T = \\pi \\implies \\frac{n\\pi}{T}x = \\frac{n\\pi}{\\pi}x = nx \\implies f(x) = \\frac{a_0}{2} + \\sum_{n=1}^\\infty \\left[ a_n \\cos(nx) + b_n \\sin(nx) \\right]',
        explanation:
          'When the interval is [-π, π], π cancels out in the trigonometric argument leaving standard integer harmonics cos(nx) and sin(nx).',
        arabicExplanation:
          'عندما تكون الفترة من -π إلى π، تختصر π من زاوية الدوال المثلثية لتصبح cos(nx) و sin(nx).',
      },
      {
        id: 'law_fourier_trig_identities_integers',
        name: 'Harmonic Integer Trigonometric Evaluations',
        arabicName: 'قيم الدوال المثلثية عند المضاعفات الصحيحة لـ π',
        formula:
          '\\cos(n\\pi) = (-1)^n = \\begin{cases} -1, & n \\text{ is odd} \\\\ +1, & n \\text{ is even} \\end{cases}, \\qquad \\sin(n\\pi) = 0, \\quad \\sin(0) = 0, \\quad \\cos(0) = 1',
        explanation:
          'Essential evaluations when substituting upper and lower integration bounds in Fourier coefficient formulas.',
        arabicExplanation:
          'قيم ثابتة يجب حفظها: cos(nπ) = (-1)ⁿ، بينما sin(nπ) = 0 دائماً لجميع الأعداد الصحيحة n.',
      },
    ],
    examples: [
      {
        id: 'eg_p31_1',
        title: 'Example 1(a): Fourier Series of Odd Linear Function f(x) = x on (-π, π)',
        problem: 'Find the Fourier series for $f(x) = x, \\quad -\\pi < x < \\pi$',
        mathFormula: 'f(x) = x, \\quad -\\pi < x < \\pi, \\quad 2T = 2\\pi \\implies T = \\pi',
        steps: [
          {
            step: 'Step 1: Identify period and function symmetry',
            formula: '2T = \\pi - (-\\pi) = 2\\pi \\implies T = \\pi. \\quad f(-x) = -x = -f(x) \\implies f(x) \\text{ is odd} \\implies a_0 = a_n = 0',
            explanation: 'Since f(x) = x is an odd function, all cosine coefficients and the constant term vanish.',
          },
          {
            step: 'Step 2: Set up the integral for sine coefficient bn',
            formula: 'b_n = \\frac{2}{T}\\int_0^T f(x) \\sin\\left(\\frac{n\\pi}{T}x\\right)dx = \\frac{2}{\\pi}\\int_0^\\pi x \\sin(nx)\\,dx',
            explanation: 'Use the odd function formula integrating from 0 to π multiplied by 2/π.',
          },
          {
            step: 'Step 3: Tabular integration by parts (DI method)',
            formula: '\\begin{array}{c|c|c} \\text{Sign} & D & I \\\\ \\hline (+) & x & \\sin(nx) \\\\ (-) & 1 & -\\frac{\\cos(nx)}{n} \\\\ (+) & 0 & -\\frac{\\sin(nx)}{n^2} \\end{array} \\implies \\int x \\sin(nx)dx = -\\frac{x\\cos(nx)}{n} + \\frac{\\sin(nx)}{n^2}',
            explanation: 'Differentiate x to 0 and integrate sin(nx) repeatedly.',
          },
          {
            step: 'Step 4: Evaluate bounds from 0 to π',
            formula: 'b_n = \\frac{2}{\\pi}\\left[ -\\frac{x\\cos(nx)}{n} + \\frac{\\sin(nx)}{n^2} \\right]_0^\\pi = \\frac{2}{\\pi}\\left[ -\\frac{\\pi\\cos(n\\pi)}{n} + \\frac{\\sin(n\\pi)}{n^2} - (0 + 0) \\right] = \\frac{2}{\\pi}\\left[ -\\frac{\\pi (-1)^n}{n} \\right] = -\\frac{2}{n}(-1)^n = \\frac{2(-1)^{n+1}}{n}',
            explanation: 'Substitute bounds with cos(nπ) = (-1)ⁿ and sin(nπ) = 0.',
          },
          {
            step: 'Step 5: Write the final Fourier series',
            formula: 'f(x) = \\sum_{n=1}^\\infty b_n \\sin(nx) = \\sum_{n=1}^\\infty -\\frac{2}{n}(-1)^n \\sin(nx) = \\sum_{n=1}^\\infty \\frac{2(-1)^{n+1}}{n}\\sin(nx)',
            explanation: 'Substitute bn back into the Fourier series representation.',
          },
        ],
        finalAnswer: 'f(x) = \\sum_{n=1}^\\infty -\\frac{2}{n}(-1)^n \\sin(nx) = \\sum_{n=1}^\\infty \\frac{2(-1)^{n+1}}{n}\\sin(nx)',
        arabicNote: 'الدالة فردية، لذا a0 = an = 0، والتكامل بالأجزاء يعطي bn = -2(-1)ⁿ/n، والناتج النهائي هو متسلسلة جيب نقية.',
      },
      {
        id: 'eg_p31_2',
        title: 'Example 1(b) - Setup & Constant Term a0: Even Function f(x) = x² on (-π, π)',
        problem: 'Find the constant term $a_0$ and set up $a_n$ for $f(x) = x^2, \\quad -\\pi < x < \\pi$',
        mathFormula: 'f(x) = x^2, \\quad -\\pi < x < \\pi, \\quad 2T = 2\\pi \\implies T = \\pi',
        steps: [
          {
            step: 'Step 1: Check symmetry and zero coefficients',
            formula: '2T = \\pi - (-\\pi) = 2\\pi \\implies T = \\pi. \\quad f(-x) = (-x)^2 = x^2 = f(x) \\implies f(x) \\text{ is even} \\implies b_n = 0',
            explanation: 'Since f(x) = x² is an even function, all sine coefficients bn vanish identically.',
          },
          {
            step: 'Step 2: Calculate constant coefficient a0',
            formula: 'a_0 = \\frac{2}{T}\\int_0^T f(x)\\,dx = \\frac{2}{\\pi}\\int_0^\\pi x^2\\,dx = \\frac{2}{\\pi}\\left[\\frac{x^3}{3}\\right]_0^\\pi = \\frac{2}{\\pi}\\left(\\frac{\\pi^3}{3} - 0\\right) = \\frac{2}{3}\\pi^2',
            explanation: 'Direct integration of x² gives 2π²/3.',
          },
          {
            step: 'Step 3: Set up integral for an and tabular integration setup',
            formula: 'a_n = \\frac{2}{\\pi}\\int_0^\\pi x^2 \\cos(nx)\\,dx. \\quad \\begin{array}{c|c|c} \\text{Sign} & D & I \\\\ \\hline (+) & x^2 & \\cos(nx) \\\\ (-) & 2x & \\frac{\\sin(nx)}{n} \\\\ (+) & 2 & -\\frac{\\cos(nx)}{n^2} \\\\ (-) & 0 & -\\frac{\\sin(nx)}{n^3} \\end{array}',
            explanation: 'Tabular differentiation of x² (3 steps) and integration of cos(nx).',
          },
          {
            step: 'Step 4: Integrate by parts expression',
            formula: '\\int x^2 \\cos(nx)dx = \\frac{x^2\\sin(nx)}{n} + \\frac{2x\\cos(nx)}{n^2} - \\frac{2\\sin(nx)}{n^3}',
            explanation: 'Combining diagonal products with signs.',
          },
        ],
        finalAnswer: 'a_0 = \\frac{2}{3}\\pi^2, \\quad b_n = 0, \\quad a_n = \\frac{2}{\\pi}\\left[ \\frac{x^2\\sin(nx)}{n} + \\frac{2x\\cos(nx)}{n^2} - \\frac{2\\sin(nx)}{n^3} \\right]_0^\\pi',
        arabicNote: 'الدالة زوجية، إذن bn = 0 و a0 = 2π²/3. نجهز تكامل an باستخدام جدول التفاضل والتكامل ثلاثي الخطوات.',
      },
    ],
    examTricks: [
      '🔥 Negative sign absorption: $-(-1)^n = (-1)^{n+1}$. Both expressions are identical and accepted in all exams.',
      '💡 DI (Tabular) Method Speed: For polynomials $x^k \\sin(nx)$ or $x^k \\cos(nx)$, always use tabular integration. Write the D column down to 0, integrate the I column alongside, and match diagonal pairs with $+ , - , + , -$.',
      '⚠️ Remember that $\\sin(n\\pi) = 0$ kills all sine boundary terms immediately at both $\\pi$ and $0$!',
    ],
  },

  // =========================================================================
  // PAGE 32 (Week 9 - Page 3): Completion of x² & Half-Range Cosine Series on [0, 1]
  // =========================================================================
  {
    pageNumber: 32,
    title: 'Completion of f(x) = x² & Half-Range Fourier Cosine Series for f(x) = x on (0, 1)',
    arabicTitle: 'الأسبوع التاسع (٣): استكمال متسلسلة x² ومتسلسلة جيب التمام لنصف المدى لـ x على (0, 1)',
    topicCategory: Category.FOURIER_SERIES,
    summary:
      'Evaluates the an integral for f(x) = x² yielding an = 4(-1)ⁿ/n² and final series f(x) = π²/3 + ∑ 4(-1)ⁿ/n² cos(nx). Then solves Example 2: Fourier Cosine Series for f(x) = x on 0 < x < 1 with T = 1, finding a0 = 1, an = 2[(-1)ⁿ - 1]/(n²π²), and bn = 0.',
    laws: [
      {
        id: 'law_fourier_cosine_half_range_def',
        name: 'Fourier Cosine Series on Interval [0, L] (T = L)',
        arabicName: 'متسلسلة جيب التمام لنصف المدى على [0, L] حيث T = L',
        formula:
          'f(x) = \\frac{a_0}{2} + \\sum_{n=1}^\\infty a_n \\cos\\left(\\frac{n\\pi}{L}x\\right), \\quad a_0 = \\frac{2}{L}\\int_0^L f(x)dx, \\quad a_n = \\frac{2}{L}\\int_0^L f(x)\\cos\\left(\\frac{n\\pi}{L}x\\right)dx, \\quad b_n = 0',
        explanation:
          'Fourier Cosine Series is an even half-range expansion over [0, L] with T = L. Only constant and cosine terms appear.',
        arabicExplanation:
          'متسلسلة جيب التمام لنصف المدى على [0, L] نضع فيها T = L و bn = 0 ونحسب a0 و an فقط بالتكامل من 0 إلى L مع الضرب في 2/L.',
      },
      {
        id: 'law_fourier_alternating_bracket',
        name: 'Evaluation of [(-1)ⁿ - 1] (Even vs Odd Harmonic Switch)',
        arabicName: 'تحليل المقدار [(-1)ⁿ - 1] (التبديل بين التوافقيات الزوجية والفردية)',
        formula:
          '(-1)^n - 1 = \\begin{cases} 0, & n \\text{ is even} \\; (n = 2, 4, 6, \\dots) \\\\ -2, & n \\text{ is odd} \\; (n = 1, 3, 5, \\dots) \\end{cases}',
        explanation:
          'Common bracket occurring in Fourier coefficients from cos(nπ) - cos(0). It selects only odd harmonics and zeroes out even ones.',
        arabicExplanation:
          'مقدار متكرر جداً في فورييه: عند n زوجي (-1)ⁿ - 1 = 1 - 1 = 0 (تتلاشى الحدود)، وعند n فردي (-1)ⁿ - 1 = -1 - 1 = -2.',
      },
    ],
    examples: [
      {
        id: 'eg_p32_1',
        title: 'Example 1(b) (Completion): Fourier Series of Even Function f(x) = x² on (-π, π)',
        problem: 'Complete the calculation of $a_n$ and write the Fourier series for $f(x) = x^2, \\quad -\\pi < x < \\pi$',
        mathFormula: 'f(x) = x^2, \\quad a_0 = \\frac{2}{3}\\pi^2, \\quad a_n = \\frac{2}{\\pi}\\left[ \\frac{x^2\\sin(nx)}{n} + \\frac{2x\\cos(nx)}{n^2} - \\frac{2\\sin(nx)}{n^3} \\right]_0^\\pi',
        steps: [
          {
            step: 'Step 1: Substitute upper bound x = π and lower bound x = 0',
            formula: 'a_n = \\frac{2}{\\pi}\\left[ \\frac{\\pi^2 \\sin(n\\pi)}{n} + \\frac{2\\pi \\cos(n\\pi)}{n^2} - \\frac{2\\sin(n\\pi)}{n^3} - (0 + 0 - 0) \\right]',
            explanation: 'At x = π, sin(nπ) = 0 and cos(nπ) = (-1)ⁿ. At x = 0, all terms vanish.',
          },
          {
            step: 'Step 2: Simplify an expression',
            formula: 'a_n = \\frac{2}{\\pi}\\left[ \\frac{2\\pi (-1)^n}{n^2} \\right] = \\frac{4}{n^2}(-1)^n',
            explanation: 'The factor π in the numerator cancels with π in the denominator.',
          },
          {
            step: 'Step 3: Construct the final Fourier series',
            formula: 'f(x) = \\frac{a_0}{2} + \\sum_{n=1}^\\infty a_n \\cos(nx) = \\frac{\\frac{2}{3}\\pi^2}{2} + \\sum_{n=1}^\\infty \\frac{4}{n^2}(-1)^n \\cos(nx) = \\frac{\\pi^2}{3} + \\sum_{n=1}^\\infty \\frac{4(-1)^n}{n^2}\\cos(nx)',
            explanation: 'Divide a0 by 2 to get π²/3 and write the cosine summation.',
          },
        ],
        finalAnswer: 'f(x) = \\frac{\\pi^2}{3} + \\sum_{n=1}^\\infty \\frac{4(-1)^n}{n^2}\\cos(nx)',
        arabicNote: 'معامل an = 4(-1)ⁿ/n² والحد الثابت a0/2 = π²/3، والمتسلسلة تحتوي فقط على حدود جيب التمام.',
      },
      {
        id: 'eg_p32_2',
        title: 'Example 2: Fourier Cosine Series for f(x) = x on (0, 1)',
        problem: 'Find the Fourier Cosine series for the function $f(x) = x, \\quad 0 < x < 1$',
        mathFormula: 'f(x) = x, \\quad 0 < x < 1, \\quad T = 1 \\; (\\text{Fourier Cosine} \\implies b_n = 0)',
        steps: [
          {
            step: 'Step 1: Identify period T and zero coefficients for Cosine series',
            formula: '\\text{Fourier Cosine series} \\implies f(x) \\text{ is extended as even} \\implies b_n = 0, \\quad T = 1',
            explanation: 'On the half-range (0, 1), T = 1 and all sine coefficients bn = 0.',
          },
          {
            step: 'Step 2: Calculate constant coefficient a0',
            formula: 'a_0 = \\frac{2}{T}\\int_0^T f(x)\\,dx = \\frac{2}{1}\\int_0^1 x\\,dx = 2\\left[\\frac{x^2}{2}\\right]_0^1 = 2\\left(\\frac{1}{2} - 0\\right) = 1 \\implies \\frac{a_0}{2} = \\frac{1}{2}',
            explanation: 'Integrating x from 0 to 1 gives a0 = 1.',
          },
          {
            step: 'Step 3: Set up and integrate an by parts',
            formula: 'a_n = \\frac{2}{T}\\int_0^T f(x)\\cos\\left(\\frac{n\\pi}{T}x\\right)dx = 2\\int_0^1 x \\cos(n\\pi x)\\,dx',
            explanation: 'Since T = 1, the cosine argument is nπx.',
          },
          {
            step: 'Step 4: Apply tabular integration',
            formula: '\\begin{array}{c|c|c} \\text{Sign} & D & I \\\\ \\hline (+) & x & \\cos(n\\pi x) \\\\ (-) & 1 & \\frac{\\sin(n\\pi x)}{n\\pi} \\\\ (+) & 0 & -\\frac{\\cos(n\\pi x)}{n^2\\pi^2} \\end{array} \\implies \\int x \\cos(n\\pi x)dx = \\frac{x\\sin(n\\pi x)}{n\\pi} + \\frac{\\cos(n\\pi x)}{n^2\\pi^2}',
            explanation: 'Tabular integration yields [x sin(nπx)/(nπ) + cos(nπx)/(n²π²)].',
          },
          {
            step: 'Step 5: Substitute bounds from 0 to 1',
            formula: 'a_n = 2\\left[ \\frac{x\\sin(n\\pi x)}{n\\pi} + \\frac{\\cos(n\\pi x)}{n^2\\pi^2} \\right]_0^1 = 2\\left[ \\left(0 + \\frac{\\cos(n\\pi)}{n^2\\pi^2}\\right) - \\left(0 + \\frac{\\cos(0)}{n^2\\pi^2}\\right) \\right] = 2\\left[ \\frac{(-1)^n - 1}{n^2\\pi^2} \\right]',
            explanation: 'At x = 1, cos(nπ) = (-1)ⁿ. At x = 0, cos(0) = 1. Lower limit contributes -1/(n²π²).',
          },
          {
            step: 'Step 6: Write the final Fourier Cosine series',
            formula: 'f(x) = \\frac{a_0}{2} + \\sum_{n=1}^\\infty a_n \\cos(n\\pi x) = \\frac{1}{2} + \\sum_{n=1}^\\infty \\frac{2\\left((-1)^n - 1\\right)}{n^2\\pi^2}\\cos(n\\pi x)',
            explanation: 'Combine the constant term 1/2 and the cosine summation.',
          },
        ],
        finalAnswer: 'f(x) = \\frac{1}{2} + \\sum_{n=1}^\\infty \\frac{2\\left((-1)^n - 1\\right)}{n^2\\pi^2}\\cos(n\\pi x)',
        arabicNote: 'متسلسلة جيب تمام لنصف المدى: T = 1 و bn = 0، والحد الثابت a0/2 = 1/2، والمعامل an = 2[(-1)ⁿ - 1]/(n²π²).',
      },
    ],
    examTricks: [
      '⚠️ Lower Bound Trap: At $x = 0$, $\\cos(0) = 1 \\neq 0$! Students frequently make the mistake of writing $0$ for the entire lower limit and lose $\\frac{1}{n^2\\pi^2}$.',
      '🎯 Division of $a_0$: Always remember the constant term in the series is $\\frac{a_0}{2}$, NOT $a_0$. For $f(x) = x^2$, $a_0 = \\frac{2}{3}\\pi^2 \\implies \\frac{a_0}{2} = \\frac{\\pi^2}{3}$. For $f(x) = x$, $a_0 = 1 \\implies \\frac{a_0}{2} = \\frac{1}{2}$.',
      '💡 Note that for even $n$, $a_n = 0$, so the series only contains odd harmonics ($n = 1, 3, 5, \\dots$).',
    ],
  },

  // =========================================================================
  // PAGE 33 (Week 9 - Page 4): Half-Range Fourier Sine Series for f(x) = x² on (0, 2)
  // =========================================================================
  {
    pageNumber: 33,
    title: 'Half-Range Fourier Sine Series for Quadratic Function f(x) = x² on (0, 2)',
    arabicTitle: 'الأسبوع التاسع (٤): متسلسلة الجيب لنصف المدى للدالة التربيعية x² على الفترة (0, 2)',
    topicCategory: Category.FOURIER_SERIES,
    summary:
      'Solves Example 3: finding the Half-Range Fourier Sine Series for f(x) = x² on 0 < x < 2 with T = 2, requiring a0 = an = 0 and evaluating bn = ∫ x² sin(nπx/2) dx via a 3-step tabular integration with careful evaluation at upper limit x = 2 and lower limit x = 0.',
    laws: [
      {
        id: 'law_fourier_sine_half_range_def',
        name: 'Fourier Sine Series on Interval [0, L] (T = L)',
        arabicName: 'متسلسلة الجيب لنصف المدى على [0, L] حيث T = L',
        formula:
          'f(x) = \\sum_{n=1}^\\infty b_n \\sin\\left(\\frac{n\\pi}{L}x\\right), \\quad a_0 = 0, \\quad a_n = 0, \\quad b_n = \\frac{2}{L}\\int_0^L f(x)\\sin\\left(\\frac{n\\pi}{L}x\\right)dx',
        explanation:
          'Fourier Sine Series represents an odd half-range expansion over [0, L] with T = L. Only sine harmonics appear.',
        arabicExplanation:
          'متسلسلة الجيب لنصف المدى على [0, L] نضع فيها T = L و a0 = an = 0 ونحسب bn فقط بالتكامل من 0 إلى L مع الضرب في 2/L.',
      },
      {
        id: 'law_fourier_quadratic_sine_integral',
        name: 'Tabular Integration of x² sin(kx)',
        arabicName: 'التكامل الجدولي للمقدار x² sin(kx)',
        formula:
          '\\int x^2 \\sin(kx)\\,dx = -\\frac{x^2\\cos(kx)}{k} + \\frac{2x\\sin(kx)}{k^2} + \\frac{2\\cos(kx)}{k^3}, \\quad \\text{where } k = \\frac{n\\pi}{T}',
        explanation:
          'Three-stage integration by parts for polynomial-trig products where k = nπ/T.',
        arabicExplanation:
          'تكامل حاصل ضرب x² في دالة الجيب بثلاث خطوات جدولية مع مراعاة المعامل k = nπ/T.',
      },
    ],
    examples: [
      {
        id: 'eg_p33_1',
        title: 'Example 3: Fourier Sine Series for f(x) = x² on (0, 2)',
        problem: 'Find the Fourier Sine series for the function $f(x) = x^2, \\quad 0 < x < 2$',
        mathFormula: 'f(x) = x^2, \\quad 0 < x < 2, \\quad T = 2 \\; (\\text{Fourier Sine} \\implies a_0 = a_n = 0)',
        steps: [
          {
            step: 'Step 1: Identify period T and zero coefficients for Sine series',
            formula: '\\text{Fourier Sine series} \\implies f(x) \\text{ is extended as odd} \\implies a_0 = a_n = 0, \\quad T = 2',
            explanation: 'On the half-range (0, 2), T = 2 and all cosine coefficients and constant term vanish.',
          },
          {
            step: 'Step 2: Set up the integral for bn',
            formula: 'b_n = \\frac{2}{T}\\int_0^T f(x)\\sin\\left(\\frac{n\\pi}{T}x\\right)dx = \\frac{2}{2}\\int_0^2 x^2 \\sin\\left(\\frac{n\\pi}{2}x\\right)dx = \\int_0^2 x^2 \\sin\\left(\\frac{n\\pi}{2}x\\right)dx',
            explanation: 'Since 2/T = 2/2 = 1, bn is simply the integral of x² sin(nπx/2) from 0 to 2.',
          },
          {
            step: 'Step 3: Tabular integration by parts with k = nπ/2',
            formula: '\\begin{array}{c|c|c} \\text{Sign} & D & I \\\\ \\hline (+) & x^2 & \\sin\\left(\\frac{n\\pi}{2}x\\right) \\\\ (-) & 2x & -\\frac{\\cos\\left(\\frac{n\\pi}{2}x\\right)}{\\frac{n\\pi}{2}} \\\\ (+) & 2 & -\\frac{\\sin\\left(\\frac{n\\pi}{2}x\\right)}{\\left(\\frac{n\\pi}{2}\\right)^2} \\\\ (-) & 0 & \\frac{\\cos\\left(\\frac{n\\pi}{2}x\\right)}{\\left(\\frac{n\\pi}{2}\\right)^3} \\end{array} \\implies \\int x^2 \\sin\\left(\\frac{n\\pi}{2}x\\right)dx = -\\frac{x^2\\cos\\left(\\frac{n\\pi}{2}x\\right)}{\\frac{n\\pi}{2}} + \\frac{2x\\sin\\left(\\frac{n\\pi}{2}x\\right)}{\\left(\\frac{n\\pi}{2}\\right)^2} + \\frac{2\\cos\\left(\\frac{n\\pi}{2}x\\right)}{\\left(\\frac{n\\pi}{2}\\right)^3}',
            explanation: 'Three steps of tabular differentiation and integration.',
          },
          {
            step: 'Step 4: Evaluate at upper limit x = 2 and lower limit x = 0',
            formula: '\\begin{aligned} \\text{At } x = 2: & \\quad -\\frac{4\\cos(n\\pi)}{\\frac{n\\pi}{2}} + \\frac{4\\sin(n\\pi)}{\\left(\\frac{n\\pi}{2}\\right)^2} + \\frac{2\\cos(n\\pi)}{\\left(\\frac{n\\pi}{2}\\right)^3} = -\\frac{4(-1)^n}{\\frac{n\\pi}{2}} + 0 + \\frac{2(-1)^n}{\\left(\\frac{n\\pi}{2}\\right)^3} \\\\ \\text{At } x = 0: & \\quad 0 + 0 + \\frac{2\\cos(0)}{\\left(\\frac{n\\pi}{2}\\right)^3} = \\frac{2}{\\left(\\frac{n\\pi}{2}\\right)^3} \\end{aligned}',
            explanation: 'Substitute bounds with cos(nπ) = (-1)ⁿ, sin(nπ) = 0, and cos(0) = 1.',
          },
          {
            step: 'Step 5: Subtract lower bound and simplify bn',
            formula: 'b_n = -\\frac{4(-1)^n}{\\frac{n\\pi}{2}} + \\frac{2(-1)^n}{\\left(\\frac{n\\pi}{2}\\right)^3} - \\frac{2}{\\left(\\frac{n\\pi}{2}\\right)^3} = -\\frac{8(-1)^n}{n\\pi} + \\frac{16\\left((-1)^n - 1\\right)}{n^3\\pi^3}',
            explanation: 'Simplify fractions using 4/(nπ/2) = 8/(nπ) and 2/(nπ/2)³ = 16/(n³π³).',
          },
          {
            step: 'Step 6: Write the final Fourier Sine series',
            formula: 'f(x) = \\sum_{n=1}^\\infty b_n \\sin\\left(\\frac{n\\pi}{2}x\\right) = \\sum_{n=1}^\\infty \\left[ -\\frac{8(-1)^n}{n\\pi} + \\frac{16\\left((-1)^n - 1\\right)}{n^3\\pi^3} \\right] \\sin\\left(\\frac{n\\pi}{2}x\\right)',
            explanation: 'Substitute bn back into the Fourier sine summation.',
          },
        ],
        finalAnswer: 'f(x) = \\sum_{n=1}^\\infty \\left[ -\\frac{8(-1)^n}{n\\pi} + \\frac{16\\left((-1)^n - 1\\right)}{n^3\\pi^3} \\right] \\sin\\left(\\frac{n\\pi}{2}x\\right) = \\sum_{n=1}^\\infty \\left[ \\frac{-4}{\\frac{n\\pi}{2}}(-1)^n + \\frac{2}{\\left(\\frac{n\\pi}{2}\\right)^3}\\left((-1)^n - 1\\right) \\right] \\sin\\left(\\frac{n\\pi}{2}x\\right)',
        arabicNote: 'متسلسلة جيب لنصف المدى لـ x² على (0, 2): T = 2 و a0 = an = 0، و bn بعد فك الحدود هي -8(-1)ⁿ/(nπ) + 16[(-1)ⁿ - 1]/(n³π³).',
      },
    ],
    examTricks: [
      '🔥 Constant Term in Lower Limit: In $\\int x^2 \\sin(kx)dx$, substituting $x = 0$ gives $\\frac{2\\cos(0)}{k^3} = \\frac{2}{k^3}$. Never forget to subtract this from the upper limit evaluation!',
      '💡 Simplification of inverted fractions: With $k = \\frac{n\\pi}{2}$, $\\frac{1}{k} = \\frac{2}{n\\pi}$ and $\\frac{1}{k^3} = \\frac{8}{n^3\\pi^3}$. Multiplying by 2 gives $\\frac{16}{n^3\\pi^3}$.',
      '🎯 Quick Verification: At $x = 0$, the series $\\sum b_n \\sin(0) = 0$, which matches $f(0) = 0^2 = 0$.',
    ],
  },
];
