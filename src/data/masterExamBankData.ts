import { Category } from '../types';
import { FINAL_SHEET_AND_NOTES_QUESTIONS } from './finalSheetAndNotesBankData';
import { FINAL_EXAMS_1_TO_3_QUESTIONS } from './finalWrittenExams1To3Data';
import { FINAL_EXAMS_4_TO_6_QUESTIONS } from './finalWrittenExams4To6Data';

export interface MasterQuestionStep {
  stepNumber: number;
  title: string;
  arabicTitle: string;
  formula: string;
  explanation: string;
  arabicExplanation: string;
  trapWarning?: string;
}

export interface MasterExamQuestion {
  id: string;
  numberLabel: string;
  sourceExam: string;
  sourceYear: string;
  sourceFileUrl: string;
  points: number;
  category: Category;
  subCategory:
    | 'First-Order ODE'
    | 'Higher-Order ODE'
    | 'Physical & Circuit Applications'
    | 'Laplace & Inverse Laplace'
    | 'Fourier Series & Legendre'
    | 'Calculus & Integration Rescue';
  methodTag: string;
  arabicMethodTag: string;
  difficulty: 'Core' | 'Trick' | 'Boss';
  problemLatex: string;
  problemStatement?: string;
  visualRecognitionTrigger: string;
  arabicVisualTrigger: string;
  examinerTrap: string;
  arabicExaminerTrap: string;
  secretShortcut: string;
  steps: MasterQuestionStep[];
  finalAnswerLatex: string;
  drillOptions: {
    methodChoices: string[];
    correctMethodIndex: number;
    keyStepPrompt: string;
    keyStepChoices: string[];
    correctKeyStepIndex: number;
  };
}

export interface ZeroToHeroPattern {
  id: string;
  stepOrder: number;
  name: string;
  arabicName: string;
  timeToMaster: string;
  frequencyInExams: string;
  visualSignatureLatex: string;
  howToSpotIt: string;
  arabicHowToSpot: string;
  goldenAlgorithm: string[];
  examinerFavoriteTricks: {
    trickTitle: string;
    exampleLatex: string;
    howToDefeatIt: string;
  }[];
  relatedQuestionIds: string[];
}

export const ZERO_TO_HERO_PATTERNS: ZeroToHeroPattern[] = [
  {
    id: 'pat-1-separable',
    stepOrder: 1,
    name: '01. Disguised Separable ODEs (Exponents & Secant/Cosine Traps)',
    arabicName: '١. فصل المتغيرات المتخفي (خدعة الأسس والـ sec/cos)',
    timeToMaster: '4 Mins',
    frequencyInExams: '100% (Question 1a in EVERY Midterm)',
    visualSignatureLatex: "e^{-y}\\frac{dy}{dx} = e^{2-y}\\left(\\sec y + \\frac{x^2}{\\cos y}\\right) \\quad \\text{or} \\quad (4+e^{2x})y\\frac{dy}{dx} = e^{2x-y^2}",
    howToSpotIt: 'Question 1(a) on Dr. Ashraf Taha exams is ALWAYS a Separable ODE in disguise. Look for compound exponents like e^(2x - y^2) or e^(x + 2y), or a sum containing sec(y) and 1/cos(y).',
    arabicHowToSpot: 'السؤال الأول (a) في كل امتحان ميدتيرم دائماً معادلة قابلة للفصل متنكرة! ابحث عن أس مركب مثل e^(2-y) أو مجموع يحتوي على sec(y) مع 1/cos(y).',
    goldenAlgorithm: [
      'Split compound exponentials immediately: e^{a+b} = e^a · e^b and e^{a-b} = e^a · e^{-b}.',
      'Convert 1/cos(y) into sec(y) and factor sec(y) out of the bracket! Then 1/sec(y) dy becomes cos(y) dy.',
      'Multiply & divide to put all y terms with dy on the Left, and all x terms with dx on the Right.',
      'Before integrating fractions or e^{y^2}, multiply and divide by the missing derivative (e.g., [1/2] ∫ 2y e^{y^2} dy).'
    ],
    examinerFavoriteTricks: [
      {
        trickTitle: 'The sec(y) + x^n / cos(y) Factoring Trap (Fall 2023, 2024, 2020)',
        exampleLatex: '\\sec(y) + \\frac{x^2}{\\cos(y)} = \\sec(y) + x^2\\sec(y) = \\sec(y)(1 + x^2)',
        howToDefeatIt: 'Never try to make a common denominator with cos(y). Simply rewrite 1/cos(y) as sec(y), pull sec(y) outside as a common factor, and divide both sides by sec(y) to get cos(y) dy on the left!'
      },
      {
        trickTitle: 'The Compound Exponent Trap (Fall 2024, Fall 2025, Sheet Q3)',
        exampleLatex: 'e^{2x - y^2} = e^{2x} \\cdot e^{-y^2} \\implies \\text{bring } e^{-y^2} \\text{ to LHS as } e^{y^2}dy',
        howToDefeatIt: 'When e^{-y^2} moves across the equals sign to the numerator on the left, its exponent flips sign to +y^2. Then multiply by 2/2 to match the derivative of y^2.'
      },
      {
        trickTitle: 'The Reducible Linear Argument Trap (Fall 2020 Q1b, Sheet Q8)',
        exampleLatex: "y' = (x+y)\\ln(x+y) - 1 \\quad \\text{or} \\quad y' = \\frac{1 - 2y - 4x}{1 + y + 2x}",
        howToDefeatIt: 'Notice (1 - 2y - 4x) = 1 - 2(y + 2x). Substitute z = x + y (so y\' = z\' - 1) or z = y + 2x (so y\' = z\' - 2). The -1 or -2 cancels immediately and turns into a 1-step separable equation!'
      }
    ],
    relatedQuestionIds: [
      'f24-q1a', 'f25-q1a', 'f23-q1a', 'f20-q1a', 'f20-q1b',
      's27-fo-1', 's27-fo-2', 's27-fo-3', 's27-fo-4', 's27-fo-5', 's27-fo-8', 's27-fo-10'
    ]
  },
  {
    id: 'pat-2-homogeneous',
    stepOrder: 2,
    name: '02. Homogeneous ODEs (The y/x Cancellation Guarantee)',
    arabicName: '٢. المعادلات المتجانسة (قاعدة اختصار الـ u الإجبارية)',
    timeToMaster: '4 Mins',
    frequencyInExams: '100% (Question 1b in almost EVERY Midterm)',
    visualSignatureLatex: "xy' - y = x^2 e^{y/x} \\quad \\text{or} \\quad x\\cos\\left(\\frac{y}{x}\\right)y' = y\\cos\\left(\\frac{y}{x}\\right) - x\\sin\\left(\\frac{y}{x}\\right)",
    howToSpotIt: 'Look for (y/x) or (ln y - ln x) = ln(y/x) inside cos, sin, exp, or all terms having the exact same total degree (e.g., x^2, xy, y^2 all have degree 2).',
    arabicHowToSpot: 'ابحث عن كسر (y/x) داخل دالة مثلثية أو أسية، أو(ln y - ln x) التي تساوي ln(y/x)، أو تساوي مجموع الأسس في كل الحدود.',
    goldenAlgorithm: [
      'Divide by x or x^2 if needed so every term is a function of u = y/x.',
      'Write the mandatory 3-part substitution box: u = y/x  ⇒  y = x·u  ⇒  y\' = x·u\' + u.',
      'Substitute and look for the AUTOMATIC CANCELLATION: the "+ u" term from y\' will almost always cancel with the y/x term on the other side!',
      'Separate variables: put all u terms with du, and put dx/x on the right (∫ dx/x = ln|x| + C).',
      'Replace u back with y/x in the final box.'
    ],
    examinerFavoriteTricks: [
      {
        trickTitle: 'The Disguised Logarithm (Fall 2021 Q1c)',
        exampleLatex: '\\frac{x(\\ln y - \\ln x)}{y}\\frac{dy}{dx} = (\\ln y - \\ln x) + 1',
        howToDefeatIt: 'Use log laws first! ln(y) - ln(x) = ln(y/x) = ln(u). Then x/y is simply 1/u. The equation becomes (ln u / u)(x u\' + u) = ln u + 1.'
      },
      {
        trickTitle: 'Guaranteed Term Cancellation Check',
        exampleLatex: 'x(xu\' + u) - xu = x^2 \\cos^2(u) \\implies x^2 u\' + \\cancel{xu} - \\cancel{xu} = x^2 \\cos^2(u)',
        howToDefeatIt: 'Whenever an exam question starts with (xy\' - y = ...), substituting y = xu makes the left side simplify directly to x^2 u\'! Knowing this saves 3 minutes and prevents sign errors.'
      }
    ],
    relatedQuestionIds: [
      'f24-q1b', 'f25-q1b', 'f23-q1b', 'f21-q1c', 's27-fo-6', 's27-fo-7'
    ]
  },
  {
    id: 'pat-3-exact',
    stepOrder: 3,
    name: '03. Exact & Integrating Factor ODEs (Strike-Out Duplicate Method)',
    arabicName: '٣. المعادلات التامة وعامل التكامل (طريقة شطب الحدود المكررة)',
    timeToMaster: '5 Mins',
    frequencyInExams: '100% (Question 1c in EVERY Midterm)',
    visualSignatureLatex: "M(x,y)\\,dx + N(x,y)\\,dy = 0 \\implies \\text{Check } M_y \\stackrel{?}{=} N_x",
    howToSpotIt: 'Written in differential form (...) dx + (...) dy = 0. Always appears as Question 1(c).',
    arabicHowToSpot: 'تأتي دائماً على الصورة القياسية (...) dx + (...) dy = 0 في السؤال الأول (c).',
    goldenAlgorithm: [
      'Compute partial derivatives carefully: M_y = ∂M/∂y (treat x as constant) and N_x = ∂N/∂x (treat y as constant).',
      'CASE A (M_y = N_x → Exact): Write ∫ M dx + ∫ N dy = C, integrate Both, and STRIKE OUT (slash) any duplicated terms in the second integral!',
      'CASE B (M_y ≠ N_x → Non-Exact): Subtract M_y - N_x. Divide by whichever of M or N has a single term or factors out cleanly:',
      '• If (M_y - N_x) / N = f(x) only  ⇒  μ(x) = e^{∫ f(x) dx}.',
      '• If (N_x - M_y) / M = g(y) only  ⇒  μ(y) = e^{∫ g(y) dy}.',
      'Multiply the entire original equation by μ, then integrate using the Strike-Out Duplicate rule!'
    ],
    examinerFavoriteTricks: [
      {
        trickTitle: 'Prof. Ashraf\'s Strike-Out Duplicate Notation (Fall 2023, 2024, 2025)',
        exampleLatex: '\\int (2xy - 9x^2)dx + \\int (2y + x^2 + 1)dy = C \\implies x^2y - 3x^3 + y^2 + \\cancel{x^2y} + y = C',
        howToDefeatIt: 'In the official model answer, examiners write the full integral of M dx plus the full integral of N dy, and then draw a diagonal slash through repeated terms like x^2y. Using this exact notation gets full marks!'
      },
      {
        trickTitle: 'Choosing Between Dividing by N vs Dividing by M (Fall 2025 Q1c, Sheet Q12-14)',
        exampleLatex: '(xy + y^2)dx + (x + 2y - 1)dy = 0 \\implies M_y - N_x = (x + 2y) - 1 \\implies \\frac{M_y - N_x}{N} = 1',
        howToDefeatIt: 'Always write out M_y - N_x first and compare it visually against M and N. In Fall 2025 Q1c, M_y - N_x is literally identical to N = x + 2y - 1, so (M_y - N_x)/N = 1 and μ = e^x!'
      }
    ],
    relatedQuestionIds: [
      'f24-q1c', 'f25-q1c', 'f23-q1c', 'f20-q1c', 'f21-q1b',
      's27-fo-9', 's27-fo-11', 's27-fo-12', 's27-fo-13', 's27-fo-14'
    ]
  },
  {
    id: 'pat-4-linear-bernoulli',
    stepOrder: 4,
    name: '04. Linear & Bernoulli P*(x), Q*(x) Shortcut + Tabular Integration',
    arabicName: '٤. المعادلة الخطية وبرنولي (اختصار P* و Q* والجدول)',
    timeToMaster: '5 Mins',
    frequencyInExams: '100% (Question 1d & Q2a RL Circuit)',
    visualSignatureLatex: "y' + P(x)y = Q(x) \\quad \\text{or} \\quad y' + P(x)y = Q(x)y^n",
    howToSpotIt: 'First-order equation with y\' and y to the first power (Linear), plus a y^n term on the right-hand side (Bernoulli).',
    arabicHowToSpot: 'تحتوي على y\' و y أس ١ (خطية)، وإذا ظهر y^n في الطرف الأيمن فهي معادلة برنولي.',
    goldenAlgorithm: [
      'FIRST STEP: Divide by whatever is in front of y\' (like x or sin x) so the coefficient of y\' is strictly 1!',
      'If Linear (no y^n): μ(x) = e^{∫ P(x) dx}, and y = (1 / μ) [ ∫ μ · Q(x) dx + C ].',
      'If Bernoulli (has y^n): Use the Official Model Answer Shortcut! Do NOT waste time substituting z = y^{1-n} step-by-step unless you want to. Directly write:',
      '• P*(x) = (1 - n) P(x)   and   Q*(x) = (1 - n) Q(x)',
      '• μ = e^{∫ P*(x) dx}',
      '• y^{1-n} = (1 / μ) [ ∫ μ · Q*(x) dx + C ]',
      'If the integral is ∫ x · e^{ax} dx, use the 3-row Tabular DI Box (+/- derivatives on left, integrals on right).'
    ],
    examinerFavoriteTricks: [
      {
        trickTitle: 'The Official P*(x) and Q*(x) Shortcut (Fall 2023 Q1d & Fall 2024 Q1d)',
        exampleLatex: 'P^*(x) = (1-n)P(x), \\quad Q^*(x) = (1-n)Q(x) \\implies y^{1-n} = \\mu^{-1}\\left[\\int \\mu Q^*(x)dx + C\\right]',
        howToDefeatIt: 'Look at the official Fall 2023 & 2024 model answers: the professors multiply P(x) and Q(x) by (1-n) to get P*(x) and Q*(x), compute μ = e^{∫ P* dx}, and write y^{1-n} directly in 3 lines!'
      },
      {
        trickTitle: 'Forgetting to Divide by Leading x (Fall 2024 Q1d, Fall 2025 Q1d)',
        exampleLatex: 'xy\' + 4y = x^4 y^2 \\xrightarrow{\\div x} y\' + \\frac{4}{x}y = x^3 y^2',
        howToDefeatIt: 'If you take P(x) = 4 instead of 4/x, your integrating factor becomes e^{4x} instead of x^4 and the integral becomes impossible. Always divide by x first!'
      }
    ],
    relatedQuestionIds: [
      'f24-q1d', 'f25-q1d', 'f23-q1d', 'f20-q1d', 'f21-q1a', 'f21-q1d',
      's27-fo-15', 's27-fo-16', 's27-fo-17', 's27-fo-18'
    ]
  },
  {
    id: 'pat-5-higher-order',
    stepOrder: 5,
    name: '05. Higher-Order Auxiliary Roots & Undetermined Coefficients',
    arabicName: '٥. المعادلات العليا (الجذور المكررة m^3=0 والمعاملات غير المعينة)',
    timeToMaster: '5 Mins',
    frequencyInExams: '100% (Question 2a & 2b in EVERY Midterm)',
    visualSignatureLatex: "\\frac{d^6y}{dx^6} + 5\\frac{d^5y}{dx^5} + 9\\frac{d^4y}{dx^4} + 6\\frac{d^3y}{dx^3} = 0",
    howToSpotIt: 'Constant coefficients with y\'\', y\'\'\', or up to 6th derivative d^6y/dx^6.',
    arabicHowToSpot: 'معادلات تفاضلية ذات معاملات ثابتة من الرتبة الثانية حتى السادسة.',
    goldenAlgorithm: [
      'Replace y^{(k)} with m^k to get the auxiliary polynomial.',
      'If lowest derivative is y\'\'\' (3rd derivative), factor out m^3 immediately! m^3 = 0 gives THREE roots: m_1 = m_2 = m_3 = 0  ⇒  C_1 + C_2 x + C_3 x^2.',
      'For the remaining cubic polynomial, test m = -1, 1, -2, 2 (Synthetic Division). In Modern Academy exams, m = -2 or m = 1 is ALWAYS a root!',
      'For complex roots α ± iβ: write e^{αx} (C_a cos(βx) + C_b sin(βx)).',
      'For Non-Homogeneous G(x): check if G(x) matches a root in y_h. If it duplicates a root of multiplicity r, multiply y_p by x^r! And convert cos^2(x) or sin(3x)cos(3x) using double-angle identities first.'
    ],
    examinerFavoriteTricks: [
      {
        trickTitle: 'The m^3 = 0 Triple Zero Root Trap (Fall 2023 Q2a, Fall 2025 Q2a, Fall 2021 Q2a)',
        exampleLatex: 'm^3(m^2 - 3m - 4) = 0 \\implies m_1 = m_2 = m_3 = 0 \\implies C_1 + C_2 x + C_3 x^2',
        howToDefeatIt: 'Students often write just "C_1" for m^3 = 0 and lose 1.5 marks! A 5th-order ODE MUST have 5 constants (C_1 to C_5); a 6th-order ODE MUST have 6 constants (C_1 to C_6).'
      },
      {
        trickTitle: 'Trig Power / Product on RHS (Revision Sheet Q9 & Q11)',
        exampleLatex: '2\\cos^2(x) = 1 + \\cos(2x), \\quad 3\\sin(3x)\\cos(3x) = \\frac{3}{2}\\sin(6x)',
        howToDefeatIt: 'Undetermined coefficients does NOT work directly on cos^2(x) or sin(3x)cos(3x). Always apply the half-angle or double-angle identity BEFORE guessing y_p!'
      }
    ],
    relatedQuestionIds: [
      'f25-q2a', 'f23-q2a', 'f23-q2b', 'f20-q2a', 'f20-q2b', 'f21-q2a', 'f21-q2b',
      's27-ho-1', 's27-ho-2', 's27-ho-3', 's27-ho-4', 's27-ho-5',
      's27-ho-7', 's27-ho-8', 's27-ho-9', 's27-ho-10', 's27-ho-11', 's27-ho-12'
    ]
  },
  {
    id: 'pat-6-reduction-applications',
    stepOrder: 6,
    name: '06. Reduction of Order (y = y₁·u) & RLC / Spring-Mass Systems',
    arabicName: '٦. اختزال الرتبة (y = y₁·u) وتطبيقات الدوائر الكهربية والميكانيكا',
    timeToMaster: '5 Mins',
    frequencyInExams: '100% (Question 2b / 2c in EVERY Midterm)',
    visualSignatureLatex: "x^2 y'' + xy' - y = x \\; (\\text{given } y_1 = x) \\quad \\text{or} \\quad L\\frac{d^2i}{dt^2} + R\\frac{di}{dt} + \\frac{1}{C}i = 0",
    howToSpotIt: 'Either states "given that y = ... is a homogeneous solution" OR shows a diagram of an RL/RLC circuit or a mass-spring-damper system.',
    arabicHowToSpot: 'إما يعطيك حل متجانس معلوم (given y = x or y = e^{2x}) أو يرسم دائرة كهربية (RL / RLC) أو كتلة وزنبرك.',
    goldenAlgorithm: [
      'FOR REDUCTION OF ORDER (given y_1):',
      '1. Let y = y_1 · u, compute y\' and y\'\', and plug into the ODE.',
      '2. The u (non-derivative) terms MUST cancel out to zero! If they don\'t, check your product rule.',
      '3. Substitute z = u\' and z\' = u\'\' to reduce it to a 1st-order Linear ODE in z. Solve for z, integrate z to get u, and multiply by y_1!',
      'FOR RLC / MASS-SPRING-DAMPER (Fall 2024 Q2, Fall 2025 Q2b):',
      '1. Plug the given numbers (L, R, C or m, c, k) directly into the given differential equation.',
      '2. Divide by leading coefficient (e.g., 0.02 or 0.5) to get clean integers, then solve as a standard 1st or 2nd order ODE!'
    ],
    examinerFavoriteTricks: [
      {
        trickTitle: 'Decimal Coefficient Division in Circuits (Fall 2024 Q2a & Fall 2025 Q2b)',
        exampleLatex: '0.02\\frac{dI}{dt} + 0.06I = 0.02e^{4t} \\xrightarrow{\\div 0.02} \\frac{dI}{dt} + 3I = e^{4t}',
        howToDefeatIt: 'Never carry decimals like 0.02 or 0.5 into your integrating factor or quadratic formula! Dividing by 0.02 or multiplying by 2 immediately turns every coefficient into a clean integer.'
      },
      {
        trickTitle: 'Don\'t Forget to Multiply by y_1 at the Very End (Fall 2023 Q2c)',
        exampleLatex: 'u = \\frac{1}{2}\\ln|x| - \\frac{1}{2}C_1 x^{-2} + C_2 \\xrightarrow{y = x \\cdot u} y = \\frac{x}{2}\\ln|x| - \\frac{C_1}{2x} + C_2 x',
        howToDefeatIt: 'Many students stop after finding u(x). Remember y = y_1(x) · u(x)!'
      }
    ],
    relatedQuestionIds: [
      'f24-q2a', 'f24-q2b', 'f25-q2b-1', 'f25-q2b-2', 'f23-q2c', 'f20-q2c', 'f21-q2c',
      's27-ho-6', 's27-ho-13', 'fin1-q2c', 'fin1-q2d', 'fin2-q2c', 'fin2-q2d', 'fin4-q2a-b-c-d', 'fin5-q2a-b-c'
    ]
  },
  {
    id: 'pat-7-laplace-forward',
    stepOrder: 7,
    name: '07. Forward Laplace Transforms (Shifts, Integrals, Derivatives & Division by t)',
    arabicName: '٧. تحويل لابلاس المباشر (الإزاحة الأولى والثانية والتكامل والاشتقاق والقسمة على t)',
    timeToMaster: '5 Mins',
    frequencyInExams: '100% (Question 3b in EVERY Final Exam — 12 Points!)',
    visualSignatureLatex: "f(t) = u_a(t)e^t\\cos(t-a), \\quad \\int_0^t g(\\tau)\\,d\\tau, \\quad t^n g(t), \\quad \\frac{g(t)}{t}",
    howToSpotIt: 'Question 3(b) on every Final Exam tests the 4 Laplace operational rules: (1) Trig powers/products, (2) Integral ∫_0^t dτ, (3) Unit Step u_a(t) combined with e^t or t^2, and (4) Division by t.',
    arabicHowToSpot: 'السؤال الثالث (b) في كل امتحان فاينل يختبر القواعد الأربع: المتطابقات المثلثية، التكامل من 0 إلى t، دالة الخطوة u_a(t)، والقسمة على t.',
    goldenAlgorithm: [
      '1. TRIG POWERS/PRODUCTS: Replace sin^2(bt) = ½(1 - cos 2bt), cos^2(bt) = ½(1 + cos 2bt), and sin A cos B = ½[sin(A+B) + sin(A-B)] BEFORE transforming!',
      '2. FIRST SHIFT (e^{at} g(t)): Ignore e^{at}, transform g(t) → G(s), then replace every s with (s - a).',
      '3. SECOND SHIFT (u_a(t) g(t)): Every t MUST be written as (t - a) first! For e^t with u_a(t), write e^t = e^a · e^{t-a}. For t^2 with u_5(t), write t^2 = ((t-5)+5)^2. Then pull out e^{-as}!',
      '4. INTEGRAL RULE (∫_0^t g(τ) dτ): Transform g(t) → G(s) and multiply by 1/s. (If the upper limit is ∞, e.g. ∫_0^∞ e^{-3t}sin^2 t dt, plug s = 3 into G(s)!)',
      '5. MULTIPLICATION BY t^n: Differentiate (-1)^n d^n/ds^n G(s). DIVISION BY t: Integrate ∫_s^∞ G(z) dz (memorize L{sin t / t} = π/2 - tan⁻¹s).'
    ],
    examinerFavoriteTricks: [
      {
        trickTitle: 'The Unaligned e^t with u_a(t) Trap (Final 1 Q3b-iii, Final 3 Q3c-iii, Laplace.pdf p.10)',
        exampleLatex: 'u_7(t)e^t\\cos(t-7) = e^7 u_7(t)e^{t-7}\\cos(t-7) \\implies e^7 e^{-7s}\\frac{s-1}{(s-1)^2+1}',
        howToDefeatIt: 'Never apply u_7(t) while e^t has an unshifted t! Add and subtract 7 in the exponent: e^{t-7+7} = e^7 e^{t-7}, and pull the constant e^7 outside.'
      },
      {
        trickTitle: 'The Phase-Shifted Cosine Trap (Final 2 Q3b-i)',
        exampleLatex: '\\cos\\left(3t + \\frac{\\pi}{2}\\right) = \\cos 3t\\cos\\frac{\\pi}{2} - \\sin 3t\\sin\\frac{\\pi}{2} = -\\sin 3t \\implies -\\frac{3}{s^2+9}',
        howToDefeatIt: 'Cosine does NOT distribute over addition! Use the angle-sum identity first.'
      },
      {
        trickTitle: 'Improper Integral ∫_0^∞ vs. Volterra Integral ∫_0^t (Final 3 Q3a)',
        exampleLatex: '\\int_0^{\\infty} e^{-3t}\\sin^2 t\\,dt = \\left.\\mathcal{L}\\{\\sin^2 t\\}\\right|_{s=3} = \\left.\\frac{2}{s(s^2+4)}\\right|_{s=3} = \\frac{2}{39}',
        howToDefeatIt: 'When the upper limit is ∞, it is the definition of the Laplace transform evaluated at the numerical exponent s = 3!'
      }
    ],
    relatedQuestionIds: [
      's24f-lap-1a', 's24f-lap-1b', 's24f-lap-1c', 's24f-lap-1d', 's24f-lap-1e',
      's24f-lap-1f', 's24f-lap-1g', 's24f-lap-1h', 's24f-lap-1i', 's24f-lap-1j',
      'lap-note-ex1', 'lap-note-ex2', 'lap-note-ex4', 'fin1-q3b-all', 'fin2-q3b-all',
      'fin3-q3a-b-c', 'fin4-q3-q4-q5', 'fin5-q3-q4'
    ]
  },
  {
    id: 'pat-8-inverse-laplace & IVPs',
    stepOrder: 8,
    name: '08. Inverse Laplace Transforms & Laplace ODE Initial Value Problems',
    arabicName: '٨. تحويل لابلاس العكسي وحل المعادلات التفاضلية بلابلاس',
    timeToMaster: '5 Mins',
    frequencyInExams: '100% (Question 3a & Question 4a in EVERY Final Exam — 16 Points!)',
    visualSignatureLatex: "F(s) = \\ln\\left(\\frac{s+a}{s+b}\\right), \\quad \\tan^{-1}\\left(\\frac{s}{a}\\right), \\quad \\frac{(s+9)e^{-6s}}{s^2+6s+3}, \\quad y'' + ay' + by = g(t)",
    howToSpotIt: 'Look at the structure of F(s): (1) ln or tan⁻¹ → Derivative Rule -t f(t); (2) Unfactorable quadratic → Complete the Square; (3) Factored denominator → Heaviside Cover-Up Partial Fractions; (4) e^{-as} → Second Shift u_a(t) f(t-a).',
    arabicHowToSpot: 'حدد شكل F(s): لوغاريتم أو tan⁻¹ (اشتقاق وقسمة على -t)، مقام تربيعي لا يتحلل (إكمال مربع)، أقواس مضروبة (كسور جزئية)، أو e^{-as} (إزاحة ثانية).',
    goldenAlgorithm: [
      '1. LOGARITHMS & ARCTAN: Expand ln(A/B) = ln A - ln B FIRST! Differentiate w.r.t. s, take L⁻¹, and divide by (-t): f(t) = -(1/t) L⁻¹{F\'(s)}.',
      '2. COMPLETING THE SQUARE: Rewrite s^2 + 2bs + c = (s+b)^2 + (c-b^2). If s is in the numerator, ALWAYS align it as (s+b) - b before pulling out e^{-bt}!',
      '3. SECOND SHIFT INVERSE (e^{-as} G(s)): Ignore e^{-as} first! Invert G(s) → g(t), then write u_a(t) g(t - a), replacing EVERY t with (t - a).',
      '4. LAPLACE ODE IVP: Replace y\'\' with s^2 Y(s) - s y(0) - y\'(0) and y\' with s Y(s) - y(0). Isolate Y(s), use Cover-Up Partial Fractions, and invert!'
    ],
    examinerFavoriteTricks: [
      {
        trickTitle: 'Log Law Expansion Before Differentiating (Final 3 Q4a-i & Final 4 Q4a-i)',
        exampleLatex: '\\ln\\left(\\frac{s^2+16}{(s-2)(s-3)}\\right) = \\ln(s^2+16) - \\ln(s-2) - \\ln(s-3) \\xrightarrow{d/ds} \\frac{2s}{s^2+16} - \\frac{1}{s-2} - \\frac{1}{s-3}',
        howToDefeatIt: 'Never use the quotient rule or expand (s-2)(s-3) inside a logarithm! Split the log into a sum/difference first so each derivative is a 1-step standard fraction.'
      },
      {
        trickTitle: 'Numerator Alignment When Completing the Square (Sheet [2]d, [2]f, Final 4 Q4a-ii)',
        exampleLatex: '\\frac{s}{s^2+10s+8} = \\frac{(s+5) - 5}{(s+5)^2 - 17} \\implies e^{-5t}\\left(\\cosh\\sqrt{17}t - \\frac{5}{\\sqrt{17}}\\sinh\\sqrt{17}t\\right)',
        howToDefeatIt: 'Whenever the denominator has (s+5)^2, you cannot leave a bare "s" in the numerator! Add and subtract 5 so the numerator becomes (s+5) - 5.'
      }
    ],
    relatedQuestionIds: [
      's24f-ilap-2a', 's24f-ilap-2b', 's24f-ilap-2c', 's24f-ilap-2d', 's24f-ilap-2e',
      's24f-ilap-2f', 's24f-ilap-2g', 's24f-ilap-2h', 's24f-ode-3a', 's24f-ode-3b',
      's24f-ode-3c', 'lap-note-ex3', 'fin1-q3a', 'fin1-q4a-all', 'fin2-q3a', 'fin2-q4a-all'
    ]
  },
  {
    id: 'pat-9-fourier-legendre',
    stepOrder: 9,
    name: '09. Fourier Series & Legendre Polynomials (12 Guaranteed Final Exam Points)',
    arabicName: '٩. متسلسلات فورييه وكثيرات حدود ليجندر (١٢ درجة مضمونة في كل امتحان فاينل)',
    timeToMaster: '5 Mins',
    frequencyInExams: '100% (Question 4b + Question 5 in EVERY Final Exam!)',
    visualSignatureLatex: "f(x) = \\frac{a_0}{2} + \\sum_{n=1}^{\\infty}\\left(a_n\\cos\\frac{n\\pi x}{T} + b_n\\sin\\frac{n\\pi x}{T}\\right) \\quad | \\quad xP_n(x) = \\frac{n+1}{2n+1}P_{n+1}(x) + \\frac{n}{2n+1}P_{n-1}(x)",
    howToSpotIt: 'Question 4(b) asks for a Fourier Series (on [-π, π]) or a Half-Range Cosine/Sine Series (on [0, T]). Question 5 asks to prove the Legendre recurrence relation and evaluate 2–3 orthogonality integrals on [-1, 1].',
    arabicHowToSpot: 'السؤال الرابع (b) يطلب متسلسلة فورييه (كاملة أو نصف مدى)، والسؤال الخامس يطلب إثبات علاقة تكرار ليجندر وحساب تكاملات التعامد على [-1, 1].',
    goldenAlgorithm: [
      '1. FULL-RANGE [-T, T]: Test parity first! If f(-x) = -f(x) (Odd, e.g. x, x^3), then a_0 = a_n = 0 and b_n = (2/T)∫_0^T f(x)sin(nπx/T)dx. If f(-x) = f(x) (Even, e.g. |x|, x^2), then b_n = 0 and a_0, a_n use (2/T)∫_0^T.',
      '2. HALF-RANGE [0, T]: Ignore whether f(x) looks algebraic even or odd! Follow the wording: "Fourier Cosine Series" → b_n = 0; "Fourier Sine Series" → a_0 = a_n = 0!',
      '3. TABULAR IBP FOR FOURIER: Differentiate x^k down to 0, integrate sin/cos, and use sin(nπ) = 0, cos(nπ) = (-1)^n, cos(0) = 1!',
      '4. LEGENDRE ORTHOGONALITY: ∫_{-1}^1 P_m(x)P_n(x)dx = 0 (if m ≠ n) and = 2/(2n+1) (if m = n). Remember P_0(x) = 1 and P_1(x) = x!',
      '5. LEGENDRE INTEGRAL ∫_{-1}^1 x P_n(x) P_{n+1}(x) dx: Replace x P_n(x) using the recurrence relation; only [(n+1)/(2n+1)] ∫_{-1}^1 P_{n+1}^2(x) dx = [(n+1)/(2n+1)]·[2/(2n+3)] survives!'
    ],
    examinerFavoriteTricks: [
      {
        trickTitle: 'Half-Range Sine Series of an Even Power x² or x⁴ (Sheet [4]d, Final 3 Q4b, Final 4 Q4b, Final 5 Q4a)',
        exampleLatex: 'f(x) = x^2, \\quad 0 \\le x \\le \\pi \\quad \\text{as Fourier Sine Series} \\implies a_0 = 0, \\; a_n = 0!',
        howToDefeatIt: 'Because the interval starts at 0 ([0, π] or [0, 2]) and specifies "Fourier Sine Series", you are constructing the odd extension! Set a_0 = a_n = 0 immediately and compute only b_n.'
      },
      {
        trickTitle: 'The P_0(x) = 1 and High-Index Legendre Integral Trick (Final 2 Q5b)',
        exampleLatex: '\\int_{-1}^1 P_0(x)P_3^2(x)\\,dx = \\int_{-1}^1 1 \\cdot P_3^2(x)\\,dx = \\frac{2}{7}, \\qquad \\int_{-1}^1 xP_7(x)P_8(x)\\,dx = \\frac{8}{15}\\cdot\\frac{2}{17} = \\frac{16}{255}',
        howToDefeatIt: 'Replace P_0(x) with 1 immediately, and for x P_n P_{n+1} plug n into [(n+1)/(2n+1)]·[2/(2n+3)].'
      }
    ],
    relatedQuestionIds: [
      's24f-four-4a', 's24f-four-4b', 's24f-four-4c', 's24f-four-4d',
      'fin1-q4b', 'fin1-q5-all', 'fin2-q4b', 'fin2-q5-all', 'fin3-q4-q5', 'fin4-q3-q4-q5', 'fin5-q3-q4'
    ]
  }
];

export const MASTER_EXAM_QUESTIONS: MasterExamQuestion[] = [
  // =========================================================================
  // PDF 1: FALL 2024-2025 MIDTERM (Exam Date: 12/11/2024) - 6 QUESTIONS
  // =========================================================================
  {
    id: 'f24-q1a',
    numberLabel: 'Fall 2024 • Q1(a)',
    sourceExam: 'Midterm Written Exam Fall 2024–2025',
    sourceYear: '2024–2025',
    sourceFileUrl: '/assets/aistudio/model_answer_Mid_Term2_examMTHn103fall2025_4c083398.pdf',
    points: 3,
    category: Category.SEPARATION,
    subCategory: 'First-Order ODE',
    methodTag: 'Separable ODE (Disguised Exponent & Secant)',
    arabicMethodTag: 'فصل المتغيرات (خدعة الأسس والـ sec)',
    difficulty: 'Trick',
    problemLatex: "e^{-y}\\frac{dy}{dx} = e^{2-y}\\left(\\sec(y) + \\frac{x^2}{\\cos(y)}\\right)",
    visualRecognitionTrigger: 'Compound exponent e^(2-y) on RHS + sum of sec(y) and x^2/cos(y).',
    arabicVisualTrigger: 'وجود أس مركب e^(2-y) مع مجموع sec(y) ومقلوب cos(y).',
    examinerTrap: 'Students get stuck trying to find a common denominator for sec(y) + x^2/cos(y) instead of rewriting 1/cos(y) as sec(y) and factoring sec(y) out!',
    arabicExaminerTrap: 'الوقوع في فخ توحيد المقامات داخل القوس بدلاً من تحويل 1/cos(y) إلى sec(y) وسحب sec(y) كعامل مشترك فوراً.',
    secretShortcut: 'Since e^{-y} appears on both sides (e^{2-y} = e^2 · e^{-y}), e^{-y} cancels completely! And 1/sec(y) dy is just cos(y) dy.',
    steps: [
      {
        stepNumber: 1,
        title: 'Split Compound Exponent & Convert 1/cos(y) to sec(y)',
        arabicTitle: 'فك الأس المركب وتحويل مقلوب جيب التمام إلى قاطع',
        formula: "e^{-y}\\frac{dy}{dx} = \\frac{e^2}{e^y}\\left(\\sec(y) + \\sec(y)x^2\\right)",
        explanation: 'Write e^{2-y} as e^2 / e^y and replace 1/cos(y) with sec(y).',
        arabicExplanation: 'نكتب e^{2-y} على صورة e^2 / e^y ونحول 1/cos(y) إلى sec(y).'
      },
      {
        stepNumber: 2,
        title: 'Factor out sec(y) from the Bracket',
        arabicTitle: 'أخذ sec(y) كعامل مشترك من القوس',
        formula: "e^{-y}\\frac{dy}{dx} = \\frac{e^2}{e^y}\\sec(y)\\left(1 + x^2\\right)",
        explanation: 'Pulling sec(y) out splits the bracket into pure y-factor sec(y) times pure x-factor (1 + x^2).',
        arabicExplanation: 'سحب sec(y) يفصل القوس إلى دالة في y مضروبة في دالة في x.'
      },
      {
        stepNumber: 3,
        title: 'Separate Variables & Cancel Exponentials',
        arabicTitle: 'فصل المتغيرات واختصار الدالة الأسية',
        formula: "\\frac{e^{-y}e^y}{\\sec(y)}\\,dy = e^2(1 + x^2)\\,dx \\implies \\int \\cos(y)\\,dy = \\int e^2(1 + x^2)\\,dx",
        explanation: 'Note that e^{-y} · e^y = e^0 = 1, and 1 / sec(y) = cos(y).',
        arabicExplanation: 'حاصل ضرب e^{-y} e^y يساوي 1، ومقلوب sec(y) هو cos(y).'
      },
      {
        stepNumber: 4,
        title: 'Integrate Both Sides',
        arabicTitle: 'إجراء التكامل للطرفين',
        formula: "\\sin(y) = e^2\\left(x + \\frac{x^3}{3}\\right) + C",
        explanation: 'Remember e^2 is a constant, so keep it factored outside while integrating (1 + x^2).',
        arabicExplanation: 'تذكر أن e^2 ثابت فيبقى خارج التكامل.'
      }
    ],
    finalAnswerLatex: "\\sin(y) = e^2\\left(x + \\frac{x^3}{3}\\right) + C",
    drillOptions: {
      methodChoices: [
        'Separable ODE (after factoring sec(y) and splitting e^{2-y})',
        'First-Order Linear ODE with Integrating Factor',
        'Homogeneous ODE (u = y/x)',
        'Bernoulli ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'How should you simplify (sec(y) + x^2 / cos(y)) in Step 1?',
      keyStepChoices: [
        'Rewrite 1/cos(y) as sec(y) and factor out sec(y)(1 + x^2)',
        'Use integration by parts on x^2 / cos(y)',
        'Substitute u = cos(y) immediately',
        'Multiply by sin(y)'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'f24-q1b',
    numberLabel: 'Fall 2024 • Q1(b)',
    sourceExam: 'Midterm Written Exam Fall 2024–2025',
    sourceYear: '2024–2025',
    sourceFileUrl: '/assets/aistudio/model_answer_Mid_Term2_examMTHn103fall2025_4c083398.pdf',
    points: 3,
    category: Category.HOMOGENEOUS,
    subCategory: 'First-Order ODE',
    methodTag: 'Homogeneous ODE (y/x inside Trig)',
    arabicMethodTag: 'معادلة متجانسة (وجود y/x داخل الدوال المثلثية)',
    difficulty: 'Core',
    problemLatex: "x\\cos\\left(\\frac{y}{x}\\right)y' = y\\cos\\left(\\frac{y}{x}\\right) - x\\sin\\left(\\frac{y}{x}\\right)",
    visualRecognitionTrigger: 'Presence of (y/x) inside cos(y/x) and sin(y/x), and every term outside has degree 1 (x or y).',
    arabicVisualTrigger: 'وجود الكسر (y/x) صراحةً داخل cos و sin مع تساوي درجة الحدود خارجها.',
    examinerTrap: 'When integrating cos(u)/sin(u) du = -1/x dx, students forget to write the constant as + ln|C| to combine the logarithms cleanly into sin(y/x) = C/x.',
    arabicExaminerTrap: 'نسيان كتابة ثابت التكامل على صورة ln C عند ظهور لوغاريتمات في الطرفين، مما يصعب تبسيط الحل النهائي.',
    secretShortcut: 'Divide by x first, then substitute y/x = u and y\' = x u\' + u. The u·cos(u) term cancels on both sides immediately!',
    steps: [
      {
        stepNumber: 1,
        title: 'Apply Homogeneous Substitution u = y/x',
        arabicTitle: 'التعويض القياسي للمعادلة المتجانسة u = y/x',
        formula: "\\frac{y}{x} = u \\implies y = xu \\implies y' = xu' + u",
        explanation: 'Divide the equation by x and replace y/x with u and y\' with x u\' + u.',
        arabicExplanation: 'نقسم المعادلة على x ونعوض عن كل y/x بـ u وعن y\' بـ xu\' + u.'
      },
      {
        stepNumber: 2,
        title: 'Expand and Cancel u·cos(u)',
        arabicTitle: 'الفك واختصار الحد المشترك u cos(u)',
        formula: "\\cos(u)(xu' + u) = u\\cos(u) - \\sin(u) \\implies x\\cos(u)u' + \\cancel{u\\cos(u)} = \\cancel{u\\cos(u)} - \\sin(u)",
        explanation: 'Notice how u·cos(u) appears identically on both sides and cancels out.',
        arabicExplanation: 'نلاحظ اختصار الحد u cos(u) من الطرفين فوراً.'
      },
      {
        stepNumber: 3,
        title: 'Separate Variables (u vs x)',
        arabicTitle: 'فصل المتغيرات (u مع du و x مع dx)',
        formula: "x\\cos(u)\\frac{du}{dx} = -\\sin(u) \\implies \\int \\frac{\\cos(u)}{\\sin(u)}\\,du = \\int -\\frac{1}{x}\\,dx",
        explanation: 'Numerator cos(u) is the exact derivative of denominator sin(u).',
        arabicExplanation: 'البسط cos(u) هو مشتقة المقام sin(u) تماماً.'
      },
      {
        stepNumber: 4,
        title: 'Integrate Using Logarithmic Constant ln(C)',
        arabicTitle: 'التكامل واستخدام خواص اللوغاريتمات',
        formula: "\\ln|\\sin(u)| = -\\ln|x| + \\ln C = \\ln\\left|\\frac{C}{x}\\right| \\implies \\sin\\left(\\frac{y}{x}\\right) = \\frac{C}{x}",
        explanation: 'Exponentiate both sides and replace u = y/x.',
        arabicExplanation: 'نرفع الطرفين للأساس e ونعيد u إلى أصلها y/x.'
      }
    ],
    finalAnswerLatex: "\\sin\\left(\\frac{y}{x}\\right) = \\frac{C}{x}",
    drillOptions: {
      methodChoices: [
        'Homogeneous Substitution (u = y/x, y\' = x u\' + u)',
        'Exact Differential Equation (M_y = N_x)',
        'Bernoulli Substitution',
        'Undetermined Coefficients'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'After substituting y = xu and y\' = xu\' + u, what cancels out?',
      keyStepChoices: [
        'u cos(u) cancels from both sides',
        'x sin(u) cancels from both sides',
        'Nothing cancels; use integrating factor',
        'cos(u) cancels out'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'f24-q1c',
    numberLabel: 'Fall 2024 • Q1(c)',
    sourceExam: 'Midterm Written Exam Fall 2024–2025',
    sourceYear: '2024–2025',
    sourceFileUrl: '/assets/aistudio/model_answer_Mid_Term2_examMTHn103fall2025_4c083398.pdf',
    points: 3,
    category: Category.EXACT_EQUATIONS,
    subCategory: 'First-Order ODE',
    methodTag: 'Exact ODE (Strike-Out Duplicate Method)',
    arabicMethodTag: 'معادلة تفاضلية تامة (طريقة شطب المكرر)',
    difficulty: 'Core',
    problemLatex: "(2xy - 9x^2)\\,dx + (2y + x^2 + 1)\\,dy = 0",
    visualRecognitionTrigger: 'Form M(x,y)dx + N(x,y)dy = 0 where ∂M/∂y = 2x and ∂N/∂x = 2x.',
    arabicVisualTrigger: 'الصورة القياسية M dx + N dy = 0 مع تساوي المشتقات الجزئية M_y = N_x = 2x.',
    examinerTrap: 'Adding the duplicated term x^2 y twice instead of crossing out the second occurrence!',
    arabicExaminerTrap: 'جمع الحد المكرر x^2 y مرتين بدلاً من شطبه في التكامل الثاني.',
    secretShortcut: 'Write ∫ M dx + ∫ N dy = C, integrate both completely, and slash out any term in the second integral that already appeared in the first!',
    steps: [
      {
        stepNumber: 1,
        title: 'Test for Exactness (M_y vs N_x)',
        arabicTitle: 'اختبار شرط التمام (M_y = N_x)',
        formula: "M_y = \\frac{\\partial}{\\partial y}(2xy - 9x^2) = 2x, \\quad N_x = \\frac{\\partial}{\\partial x}(2y + x^2 + 1) = 2x \\implies M_y = N_x \\text{ (Exact)}",
        explanation: 'Since M_y = N_x = 2x, the differential equation is Exact.',
        arabicExplanation: 'بما أن M_y = N_x = 2x، فالمعادلة تامة مباشرة.'
      },
      {
        stepNumber: 2,
        title: 'Set Up Full Integral & Strike Out Duplicate Terms',
        arabicTitle: 'تكامل الحدين وشطب الحدود المكررة',
        formula: "\\int (2xy - 9x^2)\\,dx + \\int (2y + x^2 + 1)\\,dy = C \\implies x^2y - 3x^3 + y^2 + \\cancel{x^2y} + y = C",
        explanation: 'Integrate M with respect to x (gives x^2y - 3x^3) and N with respect to y (gives y^2 + x^2y + y). Strike out the duplicate x^2y!',
        arabicExplanation: 'نكامل M بالنسبة لـ x ونكامل N بالنسبة لـ y ثم نشطب الحد المكرر x^2y.'
      }
    ],
    finalAnswerLatex: "x^2y - 3x^3 + y^2 + y = C",
    drillOptions: {
      methodChoices: [
        'Exact ODE (since M_y = N_x = 2x)',
        'Non-Exact ODE requiring μ(x)',
        'Homogeneous ODE',
        'Separable ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'When integrating ∫(2xy - 9x^2)dx + ∫(2y + x^2 + 1)dy = C, what happens to the x^2y term from the second integral?',
      keyStepChoices: [
        'It is crossed out (slashed) because x^2y already appeared in the first integral',
        'It adds with the first x^2y to become 2x^2y',
        'It cancels both x^2y terms to 0',
        'It is differentiated with respect to y'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'f24-q1d',
    numberLabel: 'Fall 2024 • Q1(d)',
    sourceExam: 'Midterm Written Exam Fall 2024–2025',
    sourceYear: '2024–2025',
    sourceFileUrl: '/assets/aistudio/model_answer_Mid_Term2_examMTHn103fall2025_4c083398.pdf',
    points: 3,
    category: Category.BERNOULLI,
    subCategory: 'First-Order ODE',
    methodTag: 'Bernoulli ODE (P* and Q* Official Shortcut)',
    arabicMethodTag: 'معادلة برنولي (بطريقة الاختصار P* و Q*)',
    difficulty: 'Trick',
    problemLatex: "xy' + 4y = x^4 y^2",
    visualRecognitionTrigger: 'First-order equation with y\' and y, plus y^2 on the RHS (n = 2).',
    arabicVisualTrigger: 'معادلة من الرتبة الأولى تحتوي على y^2 في الطرف الأيمن (برنولي عند n = 2).',
    examinerTrap: '1) Forgetting to divide by x first! 2) When integrating ∫ -x^{-4} · x^3 dx = ∫ -x^{-1} dx, students accidentally use power rule x^0/0 instead of -ln|x|!',
    arabicExaminerTrap: '١) نسيان القسمة على x أولاً! ٢) عند تكامل x^{-1} يخطئ الطلاب في استخدام قاعدة الأسس بدلاً من اللوغاريتم ln|x|.',
    secretShortcut: 'Use the Official Model Answer P*(x) = (1-n)P(x) and Q*(x) = (1-n)Q(x) shortcut! Here 1-n = 1-2 = -1.',
    steps: [
      {
        stepNumber: 1,
        title: 'Divide by Leading Coefficient x to Normalize',
        arabicTitle: 'القسمة على معامل y\' وهو x لوضع المعادلة في الصورة القياسية',
        formula: "y' + \\frac{4}{x}y = x^3 y^2 \\implies P(x) = \\frac{4}{x}, \\quad Q(x) = x^3, \\quad n = 2",
        explanation: 'Never read P(x) until the coefficient of y\' is 1.',
        arabicExplanation: 'لا تستخرج P(x) و Q(x) إلا بعد جعل معامل y\' يساوي 1.'
      },
      {
        stepNumber: 2,
        title: 'Compute P*(x) and Q*(x) Using Multiplier (1 - n = -1)',
        arabicTitle: 'حساب P*(x) و Q*(x) بالضرب في (1 - n = -1)',
        formula: "1 - n = -1 \\implies P^*(x) = \\frac{-4}{x}, \\quad Q^*(x) = -x^3",
        explanation: 'Multiply P(x) and Q(x) by (1 - n) = -1.',
        arabicExplanation: 'نضرب كلاً من P(x) و Q(x) في (1 - n) أي في -1.'
      },
      {
        stepNumber: 3,
        title: 'Find Integrating Factor μ(x) and Solve for y^{1-n}',
        arabicTitle: 'إيجاد عامل التكامل μ(x) والتعويض في قانون الحل المباشر',
        formula: "\\mu = e^{\\int \\frac{-4}{x}dx} = e^{-4\\ln x} = x^{-4} \\implies y^{-1} = x^4\\left[\\int x^{-4}(-x^3)\\,dx + C\\right] = x^4\\left[\\int -x^{-1}\\,dx + C\\right]",
        explanation: 'Notice x^{-4} · (-x^3) simplifies to -x^{-1} = -1/x, whose integral is -ln|x|.',
        arabicExplanation: 'حاصل ضرب x^{-4} في -x^3 يعطي -x^{-1} وتكامله هو -ln|x|.'
      }
    ],
    finalAnswerLatex: "y^{-1} = x^4\\left[-\\ln|x| + C\\right]",
    drillOptions: {
      methodChoices: [
        'Bernoulli ODE with n = 2 and (1 - n) = -1',
        'Exact ODE',
        'Homogeneous ODE (u = y/x)',
        'Separable ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'After dividing by x and multiplying P(x)=4/x by (1-n)=-1, what is the integrating factor μ(x)?',
      keyStepChoices: [
        'μ(x) = x^{-4}',
        'μ(x) = x^4',
        'μ(x) = e^{-4x}',
        'μ(x) = -4 ln|x|'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'f24-q2a',
    numberLabel: 'Fall 2024 • Q2(a)',
    sourceExam: 'Midterm Written Exam Fall 2024–2025',
    sourceYear: '2024–2025',
    sourceFileUrl: '/assets/aistudio/model_answer_Mid_Term2_examMTHn103fall2025_4c083398.pdf',
    points: 4,
    category: Category.LINEAR_FIRST_ORDER,
    subCategory: 'Physical & Circuit Applications',
    methodTag: 'RL Series Circuit (First-Order Linear ODE)',
    arabicMethodTag: 'تطبيقات الدائرة الكهربية RL (معادلة خطية من الرتبة الأولى)',
    difficulty: 'Core',
    problemLatex: "0.02\\frac{dI}{dt} + 0.06I = 0.02e^{4t}",
    problemStatement: 'RL circuit with inductor L = 0.02 H, resistor R = 0.06 Ω, and voltage source E(t) = 0.02 e^{4t}. Find the current I(t).',
    visualRecognitionTrigger: 'First-order linear ODE in I(t) and t with decimal coefficients 0.02 and 0.06.',
    arabicVisualTrigger: 'معادلة تفاضلية خطية من الرتبة الأولى في التيار I(t) والزمن t بمعاملات عشرية.',
    examinerTrap: 'Keeping 0.02 in front of dI/dt or miscalculating e^{3t} · e^{4t} as e^{12t} instead of adding exponents to get e^{7t}!',
    arabicExaminerTrap: 'عدم القسمة على 0.02 في البداية، أو الخطأ في ضرب الأسس e^{3t} · e^{4t} وكتابتها e^{12t} بدلاً من جمع الأسس e^{7t}.',
    secretShortcut: 'Divide every term by 0.02 first! 0.06 / 0.02 = 3, turning the equation into the clean integer form dI/dt + 3I = e^{4t}.',
    steps: [
      {
        stepNumber: 1,
        title: 'Divide by 0.02 to Eliminate Decimals',
        arabicTitle: 'القسمة على 0.02 للتخلص من الكسور العشرية',
        formula: "\\frac{dI}{dt} + 3I = e^{4t}",
        explanation: 'Dividing by 0.02 makes the coefficient of dI/dt equal to 1 and P(t) = 3.',
        arabicExplanation: 'القسمة على 0.02 تحول المعادلة إلى أرقام صحيحة بسيطة P(t) = 3.'
      },
      {
        stepNumber: 2,
        title: 'Calculate Integrating Factor μ(t)',
        arabicTitle: 'حساب عامل التكامل μ(t)',
        formula: "\\mu = e^{\\int 3\\,dt} = e^{3t}",
        explanation: 'With P(t) = 3, the integrating factor is simply e^{3t}.',
        arabicExplanation: 'بما أن P(t) = 3 فإن عامل التكامل هو e^{3t}.'
      },
      {
        stepNumber: 3,
        title: 'Solve for Current I(t)',
        arabicTitle: 'إيجاد معادلة التيار I(t)',
        formula: "I = e^{-3t}\\left[\\int e^{3t}\\cdot e^{4t}\\,dt + C\\right] = e^{-3t}\\left[\\int e^{7t}\\,dt + C\\right] = e^{-3t}\\left[\\frac{e^{7t}}{7} + C\\right]",
        explanation: 'Add exponents: e^{3t} · e^{4t} = e^{7t}, and integrate to get e^{7t}/7.',
        arabicExplanation: 'عند ضرب الأساسات المتشابهة نجمع الأسس 3t + 4t = 7t ثم نكامل.'
      }
    ],
    finalAnswerLatex: "I = e^{-3t}\\left[\\frac{e^{7t}}{7} + C\\right]",
    drillOptions: {
      methodChoices: [
        'Divide by 0.02 and solve as 1st-Order Linear ODE with μ = e^{3t}',
        'Characteristic Quadratic Equation 0.02m^2 + 0.06m = 0',
        'Homogeneous Substitution I = u·t',
        'Bernoulli ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'After dividing by 0.02 and finding μ = e^{3t}, what is the integral inside the bracket?',
      keyStepChoices: [
        '∫ e^{7t} dt = e^{7t} / 7',
        '∫ e^{12t} dt = e^{12t} / 12',
        '∫ e^{t} dt = e^{t}',
        '∫ 3e^{4t} dt'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'f24-q2b',
    numberLabel: 'Fall 2024 • Q2(b)',
    sourceExam: 'Midterm Written Exam Fall 2024–2025',
    sourceYear: '2024–2025',
    sourceFileUrl: '/assets/aistudio/model_answer_Mid_Term2_examMTHn103fall2025_4c083398.pdf',
    points: 4,
    category: Category.HIGHER_ORDER_HOMOGENEOUS,
    subCategory: 'Physical & Circuit Applications',
    methodTag: 'Spring-Mass Simple Harmonic Motion (Pure Imaginary Roots)',
    arabicMethodTag: 'حركة توافقية لكتلة وزنبرك (جذور تخيلية بحتة)',
    difficulty: 'Core',
    problemLatex: "2\\frac{d^2x}{dt^2} + 128x = 0",
    problemStatement: 'Undamped spring-mass system with mass m = 2 and stiffness k = 128. Find displacement x(t).',
    visualRecognitionTrigger: '2nd-order homogeneous ODE missing the first derivative dx/dt term.',
    arabicVisualTrigger: 'معادلة تفاضلية من الرتبة الثانية متجانسة بدون حد المشتقة الأولى dx/dt.',
    examinerTrap: 'Writing e^{8t} instead of cos(8t) and sin(8t), or forgetting to divide 128 by 2 first (getting √128 instead of √64 = 8)!',
    arabicExaminerTrap: 'نسيان القسمة على 2 أولاً، أو كتابة الحل بدلالة الدوال الأسية بدلاً من cos(8t) و sin(8t) لأن الجذور تخيلية.',
    secretShortcut: 'Divide by 2 → m^2 + 64 = 0 → m = ±8i → pure cosine and sine with frequency ω = 8.',
    steps: [
      {
        stepNumber: 1,
        title: 'Divide by 2 and Write Auxiliary Equation',
        arabicTitle: 'القسمة على 2 وكتابة المعادلة المساعدة',
        formula: "\\frac{d^2x}{dt^2} + 64x = 0 \\implies m^2 + 64 = 0",
        explanation: 'Dividing by 2 gives 128 / 2 = 64.',
        arabicExplanation: 'بقسمة الطرفين على 2 تصبح 128/2 = 64.'
      },
      {
        stepNumber: 2,
        title: 'Find Complex Conjugate Roots & General Solution',
        arabicTitle: 'إيجاد الجذور التخيلية وكتابة الحل العام',
        formula: "m = \\pm 8i \\implies x(t) = c_1\\cos(8t) + c_2\\sin(8t)",
        explanation: 'Here real part α = 0 and imaginary part β = 8, so e^{0t} = 1.',
        arabicExplanation: 'الجزء الحقيقي α = 0 والتخيلي β = 8.'
      }
    ],
    finalAnswerLatex: "x = c_1\\cos(8t) + c_2\\sin(8t)",
    drillOptions: {
      methodChoices: [
        '2nd-Order Homogeneous Auxiliary Equation (m^2 + 64 = 0)',
        '1st-Order Integrating Factor',
        'Variation of Parameters',
        'Bernoulli Equation'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What are the roots of 2(d^2x/dt^2) + 128x = 0?',
      keyStepChoices: [
        'm = ±8i',
        'm = ±8',
        'm = -64',
        'm = ±64i'
      ],
      correctKeyStepIndex: 0
    }
  },

  // =========================================================================
  // PDF 3: FALL 2025-2026 MIDTERM (Exam Date: 13/11/2025) - 7 QUESTIONS
  // =========================================================================
  {
    id: 'f25-q1a',
    numberLabel: 'Fall 2025 • Q1(a)',
    sourceExam: 'Midterm Written Exam Fall 2025–2026',
    sourceYear: '2025–2026',
    sourceFileUrl: '/assets/aistudio/Mid_Term2_examMTHn103fall2026_Model_Answer__686bca1c.pdf',
    points: 3,
    category: Category.SEPARATION,
    subCategory: 'First-Order ODE',
    methodTag: 'Separable ODE (Missing Derivative Factor [1/2])',
    arabicMethodTag: 'فصل المتغيرات (الضرب في 2 والقسمة على 2 لتوفير المشتقة)',
    difficulty: 'Trick',
    problemLatex: "(4 + e^{2x})y\\frac{dy}{dx} = e^{2x - y^2}",
    visualRecognitionTrigger: 'Compound exponent e^{2x - y^2} and y dy/dx on the left.',
    arabicVisualTrigger: 'أس مركب e^{2x - y^2} في الطرف الأيمن و y dy/dx في الأيسر.',
    examinerTrap: 'When moving e^{-y^2} to the left side, students forget to flip the sign of the exponent to +y^2, or forget the 1/2 factor when integrating y e^{y^2} dy and e^{2x}/(4+e^{2x}) dx.',
    arabicExaminerTrap: 'نسيان تغيير إشارة الأس عند نقل e^{-y^2} للطرف الأيسر ليصبح e^{+y^2}، أو نسيان الضرب في 1/2 عند التكامل.',
    secretShortcut: 'Look at the official model answer boxes: put [1/2] outside and [2] inside both integrals so the numerator/factor is the exact derivative of the exponent/denominator!',
    steps: [
      {
        stepNumber: 1,
        title: 'Split e^{2x - y^2} and Separate Variables',
        arabicTitle: 'فك الأس المركب وفصل المتغيرات',
        formula: "(4 + e^{2x})y\\frac{dy}{dx} = e^{2x}\\cdot e^{-y^2} \\implies e^{y^2}y\\,dy = \\frac{e^{2x}}{4 + e^{2x}}\\,dx",
        explanation: 'Dividing by e^{-y^2} is equivalent to multiplying the left side by e^{+y^2}.',
        arabicExplanation: 'القسمة على e^{-y^2} ترفعها في البسط الأيسر بأس موجب e^{y^2}.'
      },
      {
        stepNumber: 2,
        title: 'Multiply & Divide by 2 on Both Integrals (Official Model Answer Method)',
        arabicTitle: 'الضرب في 2 والقسمة على 2 لتوفير مشتقة الأس والمقام',
        formula: "\\boxed{\\frac{1}{2}}\\int e^{y^2}\\boxed{2}y\\,dy = \\boxed{\\frac{1}{2}}\\int \\frac{\\boxed{2}e^{2x}}{4 + e^{2x}}\\,dx",
        explanation: 'The derivative of y^2 is 2y, and the derivative of (4 + e^{2x}) is 2e^{2x}.',
        arabicExplanation: 'مشتقة y^2 هي 2y، ومشتقة المقام (4 + e^{2x}) هي 2e^{2x}.'
      },
      {
        stepNumber: 3,
        title: 'Integrate Directly',
        arabicTitle: 'إيجاد التكامل المباشر',
        formula: "\\frac{1}{2}e^{y^2} = \\frac{1}{2}\\ln|4 + e^{2x}| + C",
        explanation: 'Left integral is (1/2)e^{y^2} and right integral is (1/2)ln|4 + e^{2x}| + C.',
        arabicExplanation: 'تكامل دالة أسية في مشتقة أسها، وتكامل بسط مشتقة مقام.'
      }
    ],
    finalAnswerLatex: "\\frac{1}{2}e^{y^2} = \\frac{1}{2}\\ln|4 + e^{2x}| + C",
    drillOptions: {
      methodChoices: [
        'Separable ODE (split e^{2x - y^2} = e^{2x} e^{-y^2})',
        'Exact ODE',
        'Homogeneous ODE',
        'Bernoulli ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'After separating variables, what factor do we insert inside both integrals to match the exact derivatives?',
      keyStepChoices: [
        'Multiply inside by 2 and outside by 1/2 on both sides',
        'Multiply by x^2',
        'Use integration by parts',
        'Substitute u = 2x - y^2'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'f25-q1b',
    numberLabel: 'Fall 2025 • Q1(b)',
    sourceExam: 'Midterm Written Exam Fall 2025–2026',
    sourceYear: '2025–2026',
    sourceFileUrl: '/assets/aistudio/Mid_Term2_examMTHn103fall2026_Model_Answer__686bca1c.pdf',
    points: 3,
    category: Category.HOMOGENEOUS,
    subCategory: 'First-Order ODE',
    methodTag: 'Homogeneous ODE (y/x in Exponent)',
    arabicMethodTag: 'معادلة متجانسة (وجود y/x في الأس)',
    difficulty: 'Core',
    problemLatex: "xy' - y = x^2 e^{\\left(\\frac{y}{x}\\right)}",
    visualRecognitionTrigger: 'Presence of e^(y/x) and standard (xy\' - y) structure.',
    arabicVisualTrigger: 'وجود الدالة الأسية e^(y/x) والتركيبة الشهيرة (xy\' - y).',
    examinerTrap: 'Forgetting the minus sign when integrating ∫ e^{-u} du = -e^{-u}!',
    arabicExaminerTrap: 'نسيان الإشارة السالبة عند تكامل e^{-u} du = -e^{-u}.',
    secretShortcut: 'Divide by x to get y\' - y/x = x e^{y/x}. With u = y/x, the left side ALWAYS simplifies to x du/dx!',
    steps: [
      {
        stepNumber: 1,
        title: 'Divide by x & Apply Homogeneous Substitution',
        arabicTitle: 'القسمة على x والتعويض بـ u = y/x',
        formula: "y' - \\frac{y}{x} = xe^{y/x}, \\quad \\boxed{\\frac{y}{x} = u \\implies y = xu \\implies y' = xu' + u}",
        explanation: 'Dividing by x isolates y\' and explicitly reveals y/x.',
        arabicExplanation: 'القسمة على x تظهر y/x بوضوح.'
      },
      {
        stepNumber: 2,
        title: 'Cancel +u and -u & Separate Variables',
        arabicTitle: 'اختصار +u مع -u وفصل المتغيرات',
        formula: "x\\frac{du}{dx} + \\cancel{u} - \\cancel{u} = xe^u \\implies \\int e^{-u}\\,du = \\int dx",
        explanation: 'Divide both sides by x and bring e^u to the left as e^{-u} du.',
        arabicExplanation: 'نقسم الطرفين على x وننقل e^u للطرف الأيسر بأس سالب e^{-u}.'
      },
      {
        stepNumber: 3,
        title: 'Integrate and Substitute Back u = y/x',
        arabicTitle: 'إجراء التكامل وإعادة u = y/x',
        formula: "-e^{-u} = x + C \\implies -e^{-\\left(\\frac{y}{x}\\right)} = x + C",
        explanation: 'The integral of e^{-u} is -e^{-u}.',
        arabicExplanation: 'تكامل e^{-u} هو -e^{-u}.'
      }
    ],
    finalAnswerLatex: "-e^{-\\left(\\frac{y}{x}\\right)} = x + C",
    drillOptions: {
      methodChoices: [
        'Homogeneous Substitution (u = y/x)',
        'First-Order Linear ODE',
        'Bernoulli ODE',
        'Separable ODE directly'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'After simplifying x(du/dx) = x e^u, how does the equation separate?',
      keyStepChoices: [
        '∫ e^{-u} du = ∫ dx',
        '∫ e^u du = ∫ x dx',
        '∫ (1/u) du = ∫ e^x dx',
        '∫ u e^{-u} du = ∫ dx/x'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'f25-q1c',
    numberLabel: 'Fall 2025 • Q1(c)',
    sourceExam: 'Midterm Written Exam Fall 2025–2026',
    sourceYear: '2025–2026',
    sourceFileUrl: '/assets/aistudio/Mid_Term2_examMTHn103fall2026_Model_Answer__686bca1c.pdf',
    points: 3,
    category: Category.EXACT_EQUATIONS,
    subCategory: 'First-Order ODE',
    methodTag: 'Non-Exact ODE Reduced by Integrating Factor μ(x) = e^x',
    arabicMethodTag: 'معادلة غير تامة تُحل بعامل التكامل μ(x) = e^x',
    difficulty: 'Boss',
    problemLatex: "(xy + y^2)\\,dx + (x + 2y - 1)\\,dy = 0",
    visualRecognitionTrigger: 'Form M dx + N dy = 0 where M_y = x + 2y and N_x = 1 (M_y ≠ N_x), and M_y - N_x = x + 2y - 1 = N!',
    arabicVisualTrigger: 'الصورة M dx + N dy = 0 حيث M_y = x + 2y بينما N_x = 1، ونلاحظ أن M_y - N_x يساوي القوس N بالكامل!',
    examinerTrap: '1) Assuming Q1(c) is already Exact without checking M_y vs N_x! 2) When integrating ∫ x y e^x dx with respect to x, forgetting Integration by Parts (∫ x e^x dx = x e^x - e^x).',
    arabicExaminerTrap: '١) افتراض أن المعادلة تامة دون فحص الشرط! ٢) نسيان التكامل بالتجزيء عند حساب تكامل x e^x بالنسبة لـ x.',
    secretShortcut: 'Look at M_y - N_x = x + 2y - 1. That is 100% identical to N! So (M_y - N_x)/N = 1, which immediately gives μ(x) = e^{∫ 1 dx} = e^x!',
    steps: [
      {
        stepNumber: 1,
        title: 'Check Exactness & Compute Integrating Factor μ(x)',
        arabicTitle: 'اختبار التمام وحساب عامل التكامل μ(x)',
        formula: "M_y = x + 2y, \\quad N_x = 1 \\implies M_y \\neq N_x \\implies \\frac{M_y - N_x}{N} = \\frac{x + 2y - 1}{x + 2y - 1} = 1 \\implies \\mu = e^{\\int dx} = e^x",
        explanation: 'Since (M_y - N_x)/N = 1 (a constant, function of x only), μ(x) = e^x.',
        arabicExplanation: 'بما أن (M_y - N_x)/N = 1، فإن عامل التكامل هو μ = e^x.'
      },
      {
        stepNumber: 2,
        title: 'Multiply Entire Equation by μ = e^x',
        arabicTitle: 'ضرب المعادلة الأصلية بالكامل في عامل التكامل e^x',
        formula: "(xye^x + y^2e^x)\\,dx + (xe^x + 2ye^x - e^x)\\,dy = 0",
        explanation: 'After multiplying by e^x, the equation becomes strictly Exact.',
        arabicExplanation: 'بعد الضرب في e^x تصبح المعادلة تامة.'
      },
      {
        stepNumber: 3,
        title: 'Integrate Both Parts & Strike Out Duplicates',
        arabicTitle: 'تكامل الجزئين وشطب الحدود المكررة',
        formula: "\\int (xye^x + y^2e^x)\\,dx + \\int (xe^x + 2ye^x - e^x)\\,dy = C \\implies xye^x - ye^x + y^2e^x + \\cancel{xe^x y} + \\cancel{y^2e^x} - \\cancel{e^x y} = C",
        explanation: 'Using integration by parts on ∫ x e^x dx gives (x e^x - e^x). Multiplying by y gives xye^x - ye^x. All three terms from the dy integral are duplicates and get slashed out!',
        arabicExplanation: 'تكامل x e^x بالتجزيء يعطي x e^x - e^x، وجميع حدود التكامل الثاني مكررة فيتم شطبها بالكامل!'
      }
    ],
    finalAnswerLatex: "xye^x - ye^x + y^2e^x = C",
    drillOptions: {
      methodChoices: [
        'Non-Exact ODE with Integrating Factor μ(x) = e^x',
        'Already Exact ODE (no integrating factor needed)',
        'Homogeneous ODE (u = y/x)',
        'Bernoulli ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'Here M_y = x + 2y and N_x = 1. What is (M_y - N_x) / N?',
      keyStepChoices: [
        '(x + 2y - 1) / (x + 2y - 1) = 1, so μ(x) = e^x',
        '-1/y, so μ(y) = 1/y',
        '2/x, so μ(x) = x^2',
        '0, because it is already exact'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'f25-q1d',
    numberLabel: 'Fall 2025 • Q1(d)',
    sourceExam: 'Midterm Written Exam Fall 2025–2026',
    sourceYear: '2025–2026',
    sourceFileUrl: '/assets/aistudio/Mid_Term2_examMTHn103fall2026_Model_Answer__686bca1c.pdf',
    points: 3,
    category: Category.LINEAR_FIRST_ORDER,
    subCategory: 'First-Order ODE',
    methodTag: 'First-Order Linear ODE (μ = x^{-1} Cancellation)',
    arabicMethodTag: 'معادلة خطية من الرتبة الأولى (اختصار عامل التكامل x^{-1})',
    difficulty: 'Core',
    problemLatex: "xy' - y = (x^2 e^x + x^5)",
    visualRecognitionTrigger: 'Linear in y\' and y, with leading x that divides cleanly into RHS powers of x.',
    arabicVisualTrigger: 'معادلة خطية في y\' و y، وعند القسمة على x وضربها في عامل التكامل تختصر قوى x بسهولة.',
    examinerTrap: 'Forgetting the negative sign in P(x) = -1/x, which changes μ from x^{-1} to x and ruins the cancellation of x e^x!',
    arabicExaminerTrap: 'نسيان الإشارة السالبة في P(x) = -1/x مما يجعل عامل التكامل x بدلاً من x^{-1} فلا تختصر x بجوار e^x.',
    secretShortcut: 'Divide by x → P(x) = -1/x → μ = x^{-1}. When you multiply Q(x) = (x e^x + x^4) by μ = x^{-1}, the x in front of e^x vanishes, leaving a basic integral ∫ (e^x + x^3) dx!',
    steps: [
      {
        stepNumber: 1,
        title: 'Divide by x to Put in Standard Linear Form',
        arabicTitle: 'القسمة على x لوضع المعادلة في الصورة القياسية',
        formula: "y' - \\frac{1}{x}y = (xe^x + x^4)",
        explanation: 'Here P(x) = -1/x and Q(x) = x e^x + x^4.',
        arabicExplanation: 'معامل y هو P(x) = -1/x والطرف الأيمن Q(x) = x e^x + x^4.'
      },
      {
        stepNumber: 2,
        title: 'Compute Integrating Factor μ(x)',
        arabicTitle: 'حساب عامل التكامل μ(x)',
        formula: "\\mu = e^{\\int -\\frac{1}{x}dx} = e^{-\\ln x} = e^{\\ln x^{-1}} = x^{-1}",
        explanation: 'Move the -1 exponent inside the logarithm before canceling e and ln.',
        arabicExplanation: 'نرفع السالب كأس داخل اللوغاريتم قبل اختصار e مع ln.'
      },
      {
        stepNumber: 3,
        title: 'Apply General Solution Formula',
        arabicTitle: 'التعويض في قانون الحل العام للمعادلة الخطية',
        formula: "y = x\\left[\\int x^{-1}(xe^x + x^4)\\,dx + C\\right] = x\\left[\\int (e^x + x^3)\\,dx + C\\right] = x\\left[\\left(e^x + \\frac{x^4}{4}\\right) + C\\right]",
        explanation: 'Multiplying by x^{-1} inside the integral reduces x e^x + x^4 to e^x + x^3.',
        arabicExplanation: 'الضرب في x^{-1} داخل التكامل يبسط المقدار إلى e^x + x^3.'
      }
    ],
    finalAnswerLatex: "y = x\\left[\\left(e^x + \\frac{x^4}{4}\\right) + C\\right]",
    drillOptions: {
      methodChoices: [
        'First-Order Linear ODE with P(x) = -1/x and μ(x) = x^{-1}',
        'Bernoulli ODE',
        'Homogeneous ODE (u = y/x)',
        'Separable ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What happens when you multiply Q(x) = (x e^x + x^4) by the integrating factor μ = x^{-1}?',
      keyStepChoices: [
        'It simplifies to (e^x + x^3), which integrates without integration by parts',
        'It becomes (x^2 e^x + x^5)',
        'It requires 2 rounds of integration by parts',
        'It becomes ln|x| e^x'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'f25-q2a',
    numberLabel: 'Fall 2025 • Q2(a)',
    sourceExam: 'Midterm Written Exam Fall 2025–2026',
    sourceYear: '2025–2026',
    sourceFileUrl: '/assets/aistudio/Mid_Term2_examMTHn103fall2026_Model_Answer__686bca1c.pdf',
    points: 4,
    category: Category.HIGHER_ORDER_HOMOGENEOUS,
    subCategory: 'Higher-Order ODE',
    methodTag: '6th-Order Homogeneous ODE (Triple Zero Root + Cubic Factoring)',
    arabicMethodTag: 'معادلة متجانسة من الرتبة السادسة (جذر صفري ثلاثي + قسمة تركيبية)',
    difficulty: 'Boss',
    problemLatex: "\\frac{d^6y}{dx^6} + 5\\frac{d^5y}{dx^5} + 9\\frac{d^4y}{dx^4} + 6\\frac{d^3y}{dx^3} = 0",
    visualRecognitionTrigger: '6th-order homogeneous ODE where the lowest derivative present is d^3y/dx^3.',
    arabicVisualTrigger: 'معادلة من الرتبة السادسة أصغر مشتقة فيها هي المشتقة الثالثة d^3y/dx^3.',
    examinerTrap: '1) Writing only C_1 instead of C_1 + C_2 x + C_3 x^2 for m^3 = 0! 2) Not testing m = -2 to factor m^3 + 5m^2 + 9m + 6 = (m + 2)(m^2 + 3m + 3).',
    arabicExaminerTrap: '١) كتابة ثابت واحد C_1 فقط للجذر m^3 = 0 بدلاً من ثلاثة ثوابت C_1 + C_2 x + C_3 x^2! ٢) عدم تجربة الجذر m = -2 لتحليل القوس التكعيبي.',
    secretShortcut: 'Factor out m^3 first → m_1 = m_2 = m_3 = 0. For m^3 + 5m^2 + 9m + 6 = 0, test m = -2: (-8) + 5(4) + 9(-2) + 6 = -8 + 20 - 18 + 6 = 0! Divide by (m + 2) to get m^2 + 3m + 3 = 0.',
    steps: [
      {
        stepNumber: 1,
        title: 'Write Auxiliary Equation & Factor Out m^3',
        arabicTitle: 'كتابة المعادلة المساعدة وأخذ m^3 كعامل مشترك',
        formula: "m^6 + 5m^5 + 9m^4 + 6m^3 = 0 \\implies m^3(m^3 + 5m^2 + 9m + 6) = 0",
        explanation: 'Factoring out m^3 immediately gives the first three roots: m_1 = m_2 = m_3 = 0.',
        arabicExplanation: 'سحب m^3 يعطينا أول ثلاثة جذور مكررة عند الصفر: m_1 = m_2 = m_3 = 0.'
      },
      {
        stepNumber: 2,
        title: 'Factor the Cubic via Synthetic Division (m = -2) & Quadratic Formula',
        arabicTitle: 'تحليل المعادلة التكعيبية عند m = -2 وحل المعادلة التربيعية',
        formula: "(m + 2)(m^2 + 3m + 3) = 0 \\implies m_1 = m_2 = m_3 = 0, \\; m_4 = -2, \\; m_{5,6} = -\\frac{3}{2} \\pm i\\frac{\\sqrt{3}}{2}",
        explanation: 'Using the quadratic formula on m^2 + 3m + 3 = 0 gives (-3 ± √(9 - 12))/2 = -3/2 ± i(√3/2).',
        arabicExplanation: 'باستخدام القانون العام على m^2 + 3m + 3 = 0 نحصل على الجذرين المركبين.'
      },
      {
        stepNumber: 3,
        title: 'Construct the 6-Constant General Solution',
        arabicTitle: 'كتابة الحل العام المكون من 6 ثوابت',
        formula: "y = C_1 + C_2 x + C_3 x^2 + C_4 e^{-2x} + e^{-\\frac{3}{2}x}\\left(C_5\\cos\\left(\\frac{\\sqrt{3}}{2}x\\right) + C_6\\sin\\left(\\frac{\\sqrt{3}}{2}x\\right)\\right)",
        explanation: 'Combine the polynomial part (from m=0 repeated 3 times), exponential part (m=-2), and damped trig part.',
        arabicExplanation: 'نجمع حدود الجذر الصفري المكرر، والحد الأسي، وحد الجذور المركبة.'
      }
    ],
    finalAnswerLatex: "y = C_1 + C_2 x + C_3 x^2 + C_4 e^{-2x} + e^{-\\frac{3}{2}x}\\left(C_5\\cos\\left(\\frac{\\sqrt{3}}{2}x\\right) + C_6\\sin\\left(\\frac{\\sqrt{3}}{2}x\\right)\\right)",
    drillOptions: {
      methodChoices: [
        'Factor out m^3 = 0 (3 roots), test m = -2, then use quadratic formula',
        'Undetermined Coefficients',
        'Reduction of Order',
        'Cauchy-Euler Substitution'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What part of the general solution corresponds to the factor m^3 = 0?',
      keyStepChoices: [
        'C_1 + C_2 x + C_3 x^2',
        'C_1 x^3',
        'C_1 + C_2 e^x + C_3 e^{2x}',
        'Just a single constant C_1'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'f25-q2b-1',
    numberLabel: 'Fall 2025 • Q2(b - Choice 1)',
    sourceExam: 'Midterm Written Exam Fall 2025–2026',
    sourceYear: '2025–2026',
    sourceFileUrl: '/assets/aistudio/Mid_Term2_examMTHn103fall2026_Model_Answer__686bca1c.pdf',
    points: 4,
    category: Category.HIGHER_ORDER_HOMOGENEOUS,
    subCategory: 'Physical & Circuit Applications',
    methodTag: 'RLC Circuit Free Response (Repeated Real Root)',
    arabicMethodTag: 'دائرة RLC الكهربية (جذران حقيقيان متساويان)',
    difficulty: 'Core',
    problemLatex: "L\\frac{d^2i}{dt^2} + R\\frac{di}{dt} + \\frac{1}{C}i = 0 \\quad (L = 0.5\\text{ H},\\; R = 10\\,\\Omega,\\; C = 0.02\\text{ F})",
    problemStatement: 'Suppose an RLC circuit with R = 10 Ω, L = 0.5 H, and C = 0.02 F is connected to a DC voltage source. Find the current i(t).',
    visualRecognitionTrigger: '2nd-order RLC circuit ODE where 1/C = 1/0.02 = 50.',
    arabicVisualTrigger: 'معادلة دائرة RLC من الرتبة الثانية حيث مقلوب السعة 1/0.02 = 50.',
    examinerTrap: '1) Plugging C = 0.02 instead of 1/C = 1/0.02 = 50! 2) Forgetting the "t" multiplier on the second term C_2 t e^{-10t} for repeated roots m_1 = m_2 = -10.',
    arabicExaminerTrap: '١) نسيان حساب المقلوب 1/C = 1/0.02 = 50! ٢) نسيان ضرب الثابت الثاني في المتغير المستقل t عند تساوي الجذرين m_1 = m_2 = -10.',
    secretShortcut: 'Multiply 0.5 m^2 + 10 m + 50 = 0 by 2 to get m^2 + 20m + 100 = (m + 10)^2 = 0 → m_1 = m_2 = -10.',
    steps: [
      {
        stepNumber: 1,
        title: 'Substitute L = 0.5, R = 10, and 1/C = 50',
        arabicTitle: 'التعويض بقيم L = 0.5 و R = 10 و 1/C = 50',
        formula: "0.5\\frac{d^2i}{dt^2} + 10\\frac{di}{dt} + 50i = 0",
        explanation: 'Note that 1 / 0.02 = 100 / 2 = 50.',
        arabicExplanation: 'لاحظ أن مقلوب 0.02 هو 50.'
      },
      {
        stepNumber: 2,
        title: 'Solve Auxiliary Quadratic for Repeated Root',
        arabicTitle: 'حل المعادلة المساعدة وإيجاد الجذر المكرر',
        formula: "0.5m^2 + 10m + 50 = 0 \\implies m^2 + 20m + 100 = 0 \\implies m_1 = m_2 = -10",
        explanation: 'Perfect square trinomial (m + 10)^2 = 0 gives repeated root m = -10.',
        arabicExplanation: 'مربع كامل (m + 10)^2 = 0 يعطي جذراً مكرراً m = -10.'
      },
      {
        stepNumber: 3,
        title: 'Write Critically Damped Current Solution i(t)',
        arabicTitle: 'كتابة معادلة التيار i(t)',
        formula: "i = C_1 e^{-10t} + C_2 t e^{-10t}",
        explanation: 'Remember the independent variable is t (time), not x!',
        arabicExplanation: 'انتبه إلى أن المتغير المستقل هنا هو الزمن t وليس x.'
      }
    ],
    finalAnswerLatex: "i = C_1 e^{-10t} + C_2 t e^{-10t}",
    drillOptions: {
      methodChoices: [
        'Substitute L, R, 1/C = 50 and solve 0.5m^2 + 10m + 50 = 0 (Repeated Root)',
        'First-Order Integrating Factor',
        'Undetermined Coefficients',
        'Homogeneous ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'With L = 0.5, R = 10, C = 0.02, what are the roots of the auxiliary equation?',
      keyStepChoices: [
        'm_1 = m_2 = -10 (Repeated Real Root)',
        'm = -10 ± 10i',
        'm_1 = -5, m_2 = -20',
        'm = ±10i'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'f25-q2b-2',
    numberLabel: 'Fall 2025 • Q2(b - Choice 2)',
    sourceExam: 'Midterm Written Exam Fall 2025–2026',
    sourceYear: '2025–2026',
    sourceFileUrl: '/assets/aistudio/Mid_Term2_examMTHn103fall2026_Model_Answer__686bca1c.pdf',
    points: 4,
    category: Category.HIGHER_ORDER_HOMOGENEOUS,
    subCategory: 'Physical & Circuit Applications',
    methodTag: 'Mass-Spring-Damper System (Underdamped Complex Roots)',
    arabicMethodTag: 'نظام كتلة-زنبرك-مخمد (جذور مركبة مترافقة)',
    difficulty: 'Core',
    problemLatex: "m\\frac{d^2x}{dt^2} + c\\frac{dx}{dt} + kx = 0 \\quad (m = 0.5\\text{ kg},\\; c = 10\\text{ N}\\cdot\\text{s/m},\\; k = 100\\text{ N/m})",
    problemStatement: 'Given m = 0.5 kg, c = 10 N·s/m, k = 100 N/m in a free vibration mass-spring-damper system, find the displacement x(t).',
    visualRecognitionTrigger: '2nd-order mechanical vibration ODE with m = 0.5, c = 10, k = 100.',
    arabicVisualTrigger: 'معادلة اهتزاز ميكانيكي من الرتبة الثانية بمعاملات m = 0.5, c = 10, k = 100.',
    examinerTrap: 'Confusing the mass m = 0.5 kg with the auxiliary root variable m! Multiply by 2 first so the equation is m^2 + 20m + 200 = 0.',
    arabicExaminerTrap: 'الخلط بين رمز الكتلة m = 0.5 ورمز المعادلة المساعدة m! اضرب المعادلة في 2 أولاً لتصبح m^2 + 20m + 200 = 0.',
    secretShortcut: 'Multiply 0.5m^2 + 10m + 100 = 0 by 2 → m^2 + 20m + 200 = (m + 10)^2 + 100 = 0 → m = -10 ± 10i!',
    steps: [
      {
        stepNumber: 1,
        title: 'Substitute m = 0.5, c = 10, k = 100',
        arabicTitle: 'التعويض بقيم الكتلة والتخميد وثابت الزنبرك',
        formula: "0.5\\frac{d^2x}{dt^2} + 10\\frac{dx}{dt} + 100x = 0",
        explanation: 'Plug the given physical parameters directly into the differential equation.',
        arabicExplanation: 'نعوض بالقيم المعطاة في المعادلة التفاضلية.'
      },
      {
        stepNumber: 2,
        title: 'Solve Auxiliary Equation for Complex Roots',
        arabicTitle: 'حل المعادلة المساعدة وإيجاد الجذور المركبة',
        formula: "0.5m^2 + 10m + 100 = 0 \\implies m^2 + 20m + 200 = 0 \\implies m_{1,2} = -10 \\pm 10i",
        explanation: 'Here α = -10 and β = 10.',
        arabicExplanation: 'الجزء الحقيقي α = -10 والجزء التخيلي β = 10.'
      },
      {
        stepNumber: 3,
        title: 'Write Underdamped Displacement x(t)',
        arabicTitle: 'كتابة معادلة الإزاحة x(t)',
        formula: "x = e^{-10t}\\left(C_1\\cos(10t) + C_2\\sin(10t)\\right)",
        explanation: 'Damped oscillation with decay factor e^{-10t} and frequency 10 rad/s.',
        arabicExplanation: 'اهتزاز مخمد بمعامل اضمحلال e^{-10t} وتردد زاوي 10.'
      }
    ],
    finalAnswerLatex: "x = e^{-10t}\\left(C_1\\cos(10t) + C_2\\sin(10t)\\right)",
    drillOptions: {
      methodChoices: [
        '2nd-Order Homogeneous Auxiliary Equation (roots m = -10 ± 10i)',
        'Undetermined Coefficients',
        'Reduction of Order',
        'Separable ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What are the roots of 0.5m^2 + 10m + 100 = 0?',
      keyStepChoices: [
        'm = -10 ± 10i',
        'm_1 = m_2 = -10',
        'm = -5 ± 5i',
        'm = ±10i'
      ],
      correctKeyStepIndex: 0
    }
  },

  // =========================================================================
  // PDF 6: FALL 2023-2024 MIDTERM (Exam Date: 14/11/2023) - 7 QUESTIONS
  // =========================================================================
  {
    id: 'f23-q1a',
    numberLabel: 'Fall 2023 • Q1(a)',
    sourceExam: 'Midterm Written Exam Fall 2023–2024',
    sourceYear: '2023–2024',
    sourceFileUrl: '/assets/aistudio/model_answer_Mid_Term2_examMTHn103fall2024__1__6667c7c1.pdf',
    points: 2,
    category: Category.SEPARATION,
    subCategory: 'First-Order ODE',
    methodTag: 'Separable ODE (sec²(y²) Factoring & Chain Rule)',
    arabicMethodTag: 'فصل المتغيرات (أخذ sec²(y²) عامل مشترك)',
    difficulty: 'Trick',
    problemLatex: "y\\frac{dy}{dx} = \\sec(y^2)\\cos(x) + \\frac{x^3}{\\cos(y^2)}",
    visualRecognitionTrigger: 'sec(y^2) and 1/cos(y^2) on the RHS, with y dy/dx on the LHS.',
    arabicVisualTrigger: 'وجود sec(y^2) ومقلوب cos(y^2) في الطرف الأيمن مع y dy/dx في الأيسر.',
    examinerTrap: '1) Not recognizing that 1/cos(y^2) IS sec(y^2)! 2) Forgetting the factor of 1/2 when integrating ∫ y cos(y^2) dy = (1/2) sin(y^2).',
    arabicExaminerTrap: '١) عدم الانتباه إلى أن 1/cos(y^2) هي نفسها sec(y^2)! ٢) نسيان القسمة على 2 عند تكامل y cos(y^2) dy.',
    secretShortcut: 'Rewrite x^3/cos(y^2) as x^3 sec(y^2), factor out sec(y^2), and move it to the left as cos(y^2)!',
    steps: [
      {
        stepNumber: 1,
        title: 'Convert 1/cos(y²) to sec(y²) and Factor It Out',
        arabicTitle: 'تحويل مقلوب cos(y²) إلى sec(y²) وأخذها عامل مشترك',
        formula: "y\\frac{dy}{dx} = \\sec(y^2)\\cos(x) + x^3\\sec(y^2) = \\sec(y^2)\\left(\\cos(x) + x^3\\right)",
        explanation: 'Factoring sec(y^2) separates the right side into a product of a function of y and a function of x.',
        arabicExplanation: 'سحب sec(y^2) يفصل الطرف الأيمن إلى حاصل ضرب دالة في y ودالة في x.'
      },
      {
        stepNumber: 2,
        title: 'Separate Variables & Integrate Both Sides',
        arabicTitle: 'فصل المتغيرات وإجراء التكامل',
        formula: "\\int y\\cos(y^2)\\,dy = \\int (\\cos x + x^3)\\,dx \\implies \\frac{1}{2}\\sin(y^2) = \\sin(x) + \\frac{x^4}{4} + C",
        explanation: 'Since d(y^2) = 2y dy, ∫ y cos(y^2) dy = (1/2) sin(y^2).',
        arabicExplanation: 'مشتقة الزاوية y^2 هي 2y فنضرب في 1/2 خارج التكامل.'
      }
    ],
    finalAnswerLatex: "\\frac{1}{2}\\sin(y^2) = \\sin(x) + \\frac{x^4}{4} + C",
    drillOptions: {
      methodChoices: [
        'Separable ODE (rewrite 1/cos(y^2) = sec(y^2) and factor)',
        'Bernoulli ODE',
        'Homogeneous ODE',
        'Exact ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'When you move sec(y^2) to the left-hand side with y dy, what is the integral?',
      keyStepChoices: [
        '∫ y cos(y^2) dy = (1/2) sin(y^2)',
        '∫ y sec(y^2) dy = (1/2) tan(y^2)',
        '∫ cos(y^2) dy = sin(y^2)',
        '∫ y sin(y^2) dy'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'f23-q1b',
    numberLabel: 'Fall 2023 • Q1(b)',
    sourceExam: 'Midterm Written Exam Fall 2023–2024',
    sourceYear: '2023–2024',
    sourceFileUrl: '/assets/aistudio/model_answer_Mid_Term2_examMTHn103fall2024__1__6667c7c1.pdf',
    points: 3,
    category: Category.HOMOGENEOUS,
    subCategory: 'First-Order ODE',
    methodTag: 'Homogeneous ODE (cos²(y/x) → sec²(u))',
    arabicMethodTag: 'معادلة متجانسة (تحويل 1/cos²(u) إلى sec²(u))',
    difficulty: 'Core',
    problemLatex: "xy' - y = x^2\\cos^2\\left(\\frac{y}{x}\\right)",
    visualRecognitionTrigger: 'Presence of cos^2(y/x) and (xy\' - y) structure.',
    arabicVisualTrigger: 'وجود cos^2(y/x) والتركيبة القياسية (xy\' - y).',
    examinerTrap: 'Trying to integrate 1/cos^2(u) by parts instead of rewriting 1/cos^2(u) = sec^2(u), whose integral is simply tan(u)!',
    arabicExaminerTrap: 'محاولة تكامل 1/cos^2(u) بطرق معقدة بدلاً من تحويلها فوراً إلى sec^2(u) التي تكاملها tan(u).',
    secretShortcut: 'Divide by x → substitute y/x = u → +u and -u cancel → 1/cos^2(u) du = sec^2(u) du → tan(y/x) = x + C!',
    steps: [
      {
        stepNumber: 1,
        title: 'Divide by x & Substitute u = y/x',
        arabicTitle: 'القسمة على x والتعويض بـ u = y/x',
        formula: "y' - \\frac{y}{x} = x\\cos^2\\left(\\frac{y}{x}\\right) \\implies \\frac{y}{x} = u \\implies y = xu \\implies y' = xu' + u",
        explanation: 'Put into homogeneous ratio form.',
        arabicExplanation: 'نضع المعادلة في صورة دالة في y/x.'
      },
      {
        stepNumber: 2,
        title: 'Cancel u, Separate Variables & Integrate sec²(u)',
        arabicTitle: 'اختصار u وفصل المتغيرات وتكامل sec²(u)',
        formula: "xu' + \\cancel{u} - \\cancel{u} = x\\cos^2(u) \\implies \\int \\sec^2(u)\\,du = \\int dx \\implies \\tan\\left(\\frac{y}{x}\\right) = x + C",
        explanation: 'Dividing by cos^2(u) on the left gives sec^2(u) du, and x cancels on both sides!',
        arabicExplanation: 'القسمة على cos^2(u) تعطي sec^2(u) وتختصر x من الطرفين.'
      }
    ],
    finalAnswerLatex: "\\tan\\left(\\frac{y}{x}\\right) = x + C",
    drillOptions: {
      methodChoices: [
        'Homogeneous ODE (u = y/x leads to ∫ sec^2(u) du = ∫ dx)',
        'Bernoulli ODE',
        'First-Order Linear ODE',
        'Exact ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'After canceling +u and -u and dividing by x, what is the separated equation?',
      keyStepChoices: [
        '∫ sec^2(u) du = ∫ dx',
        '∫ cos^2(u) du = ∫ (1/x) dx',
        '∫ tan(u) du = ∫ x dx',
        '∫ sec(u) du = ∫ dx'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'f23-q1c',
    numberLabel: 'Fall 2023 • Q1(c)',
    sourceExam: 'Midterm Written Exam Fall 2023–2024',
    sourceYear: '2023–2024',
    sourceFileUrl: '/assets/aistudio/model_answer_Mid_Term2_examMTHn103fall2024__1__6667c7c1.pdf',
    points: 2,
    category: Category.EXACT_EQUATIONS,
    subCategory: 'First-Order ODE',
    methodTag: 'Exact ODE (Logarithmic Integral (ln y)/y)',
    arabicMethodTag: 'معادلة تامة (تكامل دالة في مشتقتها ln(y)/y)',
    difficulty: 'Core',
    problemLatex: "(2x\\ln y + \\sin x)\\,dx + \\left(\\frac{\\ln y}{y} + \\frac{x^2}{y}\\right)\\,dy = 0",
    visualRecognitionTrigger: 'M dx + N dy = 0 where M_y = 2x/y and N_x = 2x/y.',
    arabicVisualTrigger: 'معادلة على الصورة M dx + N dy = 0 حيث M_y = N_x = 2x/y.',
    examinerTrap: 'Getting confused when integrating (ln y)/y dy! Since the derivative of ln(y) is 1/y, ∫ (ln y)^1 (1/y) dy is simply (ln y)^2 / 2.',
    arabicExaminerTrap: 'الارتباك عند تكامل (ln y)/y بالنسبة لـ y! مشتقة ln y هي 1/y، لذا نزيد أس القوس واحداً ليصبح (ln y)^2 / 2.',
    secretShortcut: 'M_y = N_x = 2x/y (Exact). Integrate both, slash out the duplicate x^2 ln(y) term, and write (ln y)^2 / 2 for the ln(y)/y integral.',
    steps: [
      {
        stepNumber: 1,
        title: 'Verify Exactness (M_y = N_x)',
        arabicTitle: 'التحقق من شرط التمام',
        formula: "M_y = \\frac{2x}{y} = N_x \\implies \\text{Exact D.E.}",
        explanation: 'Partial derivative of 2x ln(y) + sin(x) w.r.t. y is 2x/y, matching ∂N/∂x.',
        arabicExplanation: 'المشتقة الجزئية لـ M بالنسبة لـ y تساوي 2x/y وهي نفس مشتقة N بالنسبة لـ x.'
      },
      {
        stepNumber: 2,
        title: 'Integrate Both Terms & Slash Duplicate x² ln(y)',
        arabicTitle: 'تكامل الحدين وشطب الحد المكرر x² ln(y)',
        formula: "\\int (2x\\ln y + \\sin x)\\,dx + \\int \\left(\\frac{\\ln y}{y} + \\frac{x^2}{y}\\right)\\,dy = C \\implies x^2\\ln y - \\cos x + \\frac{(\\ln y)^2}{2} + \\cancel{x^2\\ln y} = C",
        explanation: 'Cross out the repeated x^2 ln(y) term from the second integral.',
        arabicExplanation: 'نشطب الحد المكرر x^2 ln(y) من التكامل الثاني.'
      }
    ],
    finalAnswerLatex: "x^2\\ln y - \\cos x + \\frac{(\\ln y)^2}{2} = C",
    drillOptions: {
      methodChoices: [
        'Exact ODE (since M_y = N_x = 2x/y)',
        'Homogeneous ODE',
        'Bernoulli ODE',
        'Separable ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the value of the integral ∫ (ln y / y) dy?',
      keyStepChoices: [
        '(ln y)^2 / 2',
        'ln|ln y|',
        '1 / y^2',
        'y ln y - y'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'f23-q1d',
    numberLabel: 'Fall 2023 • Q1(d)',
    sourceExam: 'Midterm Written Exam Fall 2023–2024',
    sourceYear: '2023–2024',
    sourceFileUrl: '/assets/aistudio/model_answer_Mid_Term2_examMTHn103fall2024__1__6667c7c1.pdf',
    points: 3,
    category: Category.BERNOULLI,
    subCategory: 'First-Order ODE',
    methodTag: 'Bernoulli ODE (P* & Q* Shortcut + Tabular DI Box)',
    arabicMethodTag: 'معادلة برنولي (اختصار P* و Q* مع جدول التجزيء)',
    difficulty: 'Boss',
    problemLatex: "y' + y = xe^{6x}y^5",
    visualRecognitionTrigger: 'y\' + P(x)y = Q(x)y^5 (Bernoulli with n = 5 and 1 - n = -4).',
    arabicVisualTrigger: 'معادلة برنولي لوجود y^5 في الطرف الأيمن (n = 5 وبالتالي 1 - n = -4).',
    examinerTrap: 'Miscalculating the signs in Integration by Parts for ∫ -4x e^{2x} dx. Use the 3-row Tabular DI Box shown on the right of the official model answer!',
    arabicExaminerTrap: 'الخطأ في الإشارات أثناء التكامل بالتجزيء للمقدار -4x e^{2x}. استخدم جدول التفاضل والتكامل كما في نموذج الإجابة الرسمي!',
    secretShortcut: '1 - n = -4 → P*(x) = -4, Q*(x) = -4x e^{6x} → μ = e^{-4x}. Inside the integral, e^{-4x} · (-4x e^{6x}) becomes -4x e^{2x}. Tabular box: D column (-4x, -4, 0) and I column (e^{2x}, (1/2)e^{2x}, (1/4)e^{2x}) → -2x e^{2x} + e^{2x}!',
    steps: [
      {
        stepNumber: 1,
        title: 'Compute P*(x) and Q*(x) with 1 - n = -4',
        arabicTitle: 'حساب P*(x) و Q*(x) باستخدام 1 - n = -4',
        formula: "P(x) = 1,\\; Q(x) = xe^{6x},\\; n = 5 \\implies P^*(x) = -4,\\; Q^*(x) = -4xe^{6x},\\; 1 - n = -4",
        explanation: 'Multiply P(x) and Q(x) by (1 - 5) = -4.',
        arabicExplanation: 'نضرب المعاملات في 1 - 5 = -4.'
      },
      {
        stepNumber: 2,
        title: 'Find μ(x) and Set Up the Integral for y^{-4}',
        arabicTitle: 'إيجاد عامل التكامل μ(x) وكتابة تكامل y^{-4}',
        formula: "\\mu = e^{\\int -4\\,dx} = e^{-4x} \\implies y^{-4} = e^{4x}\\left[\\int e^{-4x}(-4xe^{6x})\\,dx + C\\right] = e^{4x}\\left[\\int -4xe^{2x}\\,dx + C\\right]",
        explanation: 'Notice e^{-4x} · e^{6x} = e^{2x}.',
        arabicExplanation: 'حاصل ضرب e^{-4x} في e^{6x} يعطي e^{2x}.'
      },
      {
        stepNumber: 3,
        title: 'Evaluate ∫ -4x e^{2x} dx via Tabular Integration Box',
        arabicTitle: 'حساب التكامل بالتجزيء باستخدام طريقة الجدول السريعة',
        formula: "\\begin{array}{c|c|c} \\text{Sign} & D & I \\\\ \\hline & -4x & e^{2x} \\\\ + & \\searrow & \\frac{1}{2}e^{2x} \\\\ - & -4 \\searrow & \\frac{1}{4}e^{2x} \\\\ & 0 & \\end{array} \\implies (-4x)\\left(\\frac{1}{2}e^{2x}\\right) - (-4)\\left(\\frac{1}{4}e^{2x}\\right) = -2xe^{2x} + e^{2x}",
        explanation: 'Multiply diagonally with alternating signs (+) then (-): (-2x e^{2x} + e^{2x}).',
        arabicExplanation: 'نضرب قطرياً مع تبديل الإشارات (+) ثم (-) فنحصل على -2x e^{2x} + e^{2x}.'
      }
    ],
    finalAnswerLatex: "y^{-4} = e^{4x}\\left[-2xe^{2x} + e^{2x} + C\\right]",
    drillOptions: {
      methodChoices: [
        'Bernoulli Shortcut (1 - n = -4, μ = e^{-4x}) + Tabular Integration by Parts',
        'Homogeneous Substitution',
        'Exact ODE',
        'Undetermined Coefficients'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'Using the Tabular Integration box, what is ∫ -4x e^{2x} dx?',
      keyStepChoices: [
        '-2x e^{2x} + e^{2x} + C',
        '-2x e^{2x} - e^{2x} + C',
        '-4x e^{2x} + 2e^{2x} + C',
        '-8x e^{2x} + C'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'f23-q2a',
    numberLabel: 'Fall 2023 • Q2(a)',
    sourceExam: 'Midterm Written Exam Fall 2023–2024',
    sourceYear: '2023–2024',
    sourceFileUrl: '/assets/aistudio/model_answer_Mid_Term2_examMTHn103fall2024__1__6667c7c1.pdf',
    points: 3,
    category: Category.HIGHER_ORDER_HOMOGENEOUS,
    subCategory: 'Higher-Order ODE',
    methodTag: '5th-Order Homogeneous ODE (Triple Zero Root m³ = 0)',
    arabicMethodTag: 'معادلة متجانسة من الرتبة الخامسة (جذر صفري ثلاثي m³ = 0)',
    difficulty: 'Core',
    problemLatex: "\\frac{d^5y}{dx^5} - 3\\frac{d^4y}{dx^4} - 4\\frac{d^3y}{dx^3} = 0",
    visualRecognitionTrigger: '5th-order homogeneous ODE where the lowest derivative is d^3y/dx^3.',
    arabicVisualTrigger: 'معادلة متجانسة من الرتبة الخامسة أصغر مشتقة فيها هي الثالثة.',
    examinerTrap: 'Forgetting that m^3 = 0 yields THREE roots (m_1 = m_2 = m_3 = 0), which requires C_1 + C_2 x + C_3 x^2!',
    arabicExaminerTrap: 'نسيان أن m^3 = 0 تعطي 3 جذور صفرية متساوية تتطلب كتابة C_1 + C_2 x + C_3 x^2.',
    secretShortcut: 'Factor out m^3: m^3(m^2 - 3m - 4) = m^3(m - 4)(m + 1) = 0 → roots 0, 0, 0, 4, -1.',
    steps: [
      {
        stepNumber: 1,
        title: 'Write Auxiliary Equation & Factor Out m³',
        arabicTitle: 'كتابة المعادلة المساعدة وأخذ m³ كعامل مشترك',
        formula: "m^5 - 3m^4 - 4m^3 = 0 \\implies m^3(m^2 - 3m - 4) = 0",
        explanation: 'Factoring m^3 leaves a simple quadratic m^2 - 3m - 4 = 0.',
        arabicExplanation: 'سحب m^3 يترك معادلة تربيعية بسيطة.'
      },
      {
        stepNumber: 2,
        title: 'Find All 5 Roots & Write General Solution',
        arabicTitle: 'إيجاد الجذور الخمسة وكتابة الحل العام',
        formula: "m^3 = 0,\\; (m - 4)(m + 1) = 0 \\implies m_1 = m_2 = m_3 = 0,\\; m_4 = 4,\\; m_5 = -1",
        explanation: 'Combine C_1 + C_2 x + C_3 x^2 with C_4 e^{4x} + C_5 e^{-x}.',
        arabicExplanation: 'نكتب الحدود الخمسة المناظرة للجذور الخمسة.'
      }
    ],
    finalAnswerLatex: "y = C_1 + C_2 x + C_3 x^2 + C_4 e^{4x} + C_5 e^{-x}",
    drillOptions: {
      methodChoices: [
        'Auxiliary Equation m^3(m - 4)(m + 1) = 0',
        'Reduction of Order',
        'Undetermined Coefficients',
        'Variation of Parameters'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What are all 5 roots of m^5 - 3m^4 - 4m^3 = 0?',
      keyStepChoices: [
        'm = 0, 0, 0, 4, -1',
        'm = 0, 4, -1',
        'm = 0, 0, 0, -4, 1',
        'm = 1, 1, 1, 4, -1'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'f23-q2b',
    numberLabel: 'Fall 2023 • Q2(b)',
    sourceExam: 'Midterm Written Exam Fall 2023–2024',
    sourceYear: '2023–2024',
    sourceFileUrl: '/assets/aistudio/model_answer_Mid_Term2_examMTHn103fall2024__1__6667c7c1.pdf',
    points: 3,
    category: Category.HIGHER_ORDER_HOMOGENEOUS,
    subCategory: 'Higher-Order ODE',
    methodTag: '3rd-Order Homogeneous ODE (Synthetic Division + Complex Roots)',
    arabicMethodTag: 'معادلة متجانسة من الرتبة الثالثة (جذر حقيقي وجذران مركبان)',
    difficulty: 'Core',
    problemLatex: "y''' + 4y'' + 14y' + 20y = 0",
    visualRecognitionTrigger: '3rd-order homogeneous ODE with constant coefficients.',
    arabicVisualTrigger: 'معادلة متجانسة من الرتبة الثالثة ذات معاملات ثابتة.',
    examinerTrap: 'Not testing m = -2 first! Since all coefficients are positive (+1, +4, +14, +20), any real root MUST be negative (try m = -1, -2).',
    arabicExaminerTrap: 'تضيع الوقت في تجربة جذور موجبة بينما جميع المعاملات موجبة! أي جذر حقيقي هنا يجب أن يكون سالباً (جرب m = -2).',
    secretShortcut: 'Test m = -2: (-8) + 4(4) + 14(-2) + 20 = -8 + 16 - 28 + 20 = 0! Factor out (m + 2) to get (m + 2)(m^2 + 2m + 10) = 0 → m = -2 and m = -1 ± 3i.',
    steps: [
      {
        stepNumber: 1,
        title: 'Write Cubic Auxiliary Equation & Find Real Root m₁ = -2',
        arabicTitle: 'كتابة المعادلة المساعدة وإيجاد الجذر الحقيقي m₁ = -2',
        formula: "m^3 + 4m^2 + 14m + 20 = 0 \\implies (m + 2)(m^2 + 2m + 10) = 0",
        explanation: 'Dividing by (m + 2) leaves the quadratic m^2 + 2m + 10 = 0.',
        arabicExplanation: 'بالقسمة التركيبية على (m + 2) نحصل على المعادلة التربيعية m^2 + 2m + 10 = 0.'
      },
      {
        stepNumber: 2,
        title: 'Solve Quadratic for Complex Roots & Write General Solution',
        arabicTitle: 'إيجاد الجذرين المركبين وكتابة الحل العام',
        formula: "m_1 = -2, \\quad m_{2,3} = -1 \\pm 3i \\implies y = C_1 e^{-2x} + e^{-x}(C_2\\cos 3x + C_3\\sin 3x)",
        explanation: 'm^2 + 2m + 10 = (m + 1)^2 + 9 = 0 gives m = -1 ± 3i.',
        arabicExplanation: 'بإكمال المربع أو القانون العام نجد أن m = -1 ± 3i.'
      }
    ],
    finalAnswerLatex: "y = C_1 e^{-2x} + e^{-x}(C_2\\cos 3x + C_3\\sin 3x)",
    drillOptions: {
      methodChoices: [
        'Cubic Auxiliary Equation (test m = -2, then solve m^2 + 2m + 10 = 0)',
        'Reduction of Order',
        'Undetermined Coefficients',
        'First-Order Linear ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What are the 3 roots of m^3 + 4m^2 + 14m + 20 = 0?',
      keyStepChoices: [
        'm_1 = -2 and m_{2,3} = -1 ± 3i',
        'm_1 = 2 and m_{2,3} = 1 ± 3i',
        'm_1 = -2, m_2 = -2, m_3 = -5',
        'm_1 = -1 and m_{2,3} = -2 ± 4i'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'f23-q2c',
    numberLabel: 'Fall 2023 • Q2(c)',
    sourceExam: 'Midterm Written Exam Fall 2023–2024',
    sourceYear: '2023–2024',
    sourceFileUrl: '/assets/aistudio/model_answer_Mid_Term2_examMTHn103fall2024__1__6667c7c1.pdf',
    points: 4,
    category: Category.REDUCTION_OF_ORDER,
    subCategory: 'Higher-Order ODE',
    methodTag: 'Reduction of Order (Given y₁ = x)',
    arabicMethodTag: 'اختزال الرتبة (بمعلومية الحل المتجانس y₁ = x)',
    difficulty: 'Boss',
    problemLatex: "x^2 y'' + xy' - y = x, \\quad \\text{given that } y = x \\text{ is a homogeneous solution}",
    visualRecognitionTrigger: 'Variable-coefficient 2nd-order ODE with explicit phrase "given that y = x is a homogeneous solution".',
    arabicVisualTrigger: 'معادلة من الرتبة الثانية بمعاملات متغيرة مع إعطاء حل متجانس معلوم y = x.',
    examinerTrap: '1) Differentiating y = x u wrong: y\' = x u\' + u and y\'\' = x u\'\' + 2u\'! 2) Stopping after finding u(x) and forgetting to multiply by x to get y = x · u(x)!',
    arabicExaminerTrap: '١) الخطأ في اشتقاق حاصل الضرب y = x u حيث y\'\' = x u\'\' + 2u\'! ٢) التوقف عند إيجاد u(x) ونسيان ضربها في x للحصول على y = x u.',
    secretShortcut: 'Substitute y = x u, y\' = x u\' + u, y\'\' = x u\'\' + 2u\'. Notice +xu and -xu MUST cancel! Then divide by x^3 to get u\'\' + (3/x)u\' = 1/x^2, let z = u\', and solve with μ = x^3.',
    steps: [
      {
        stepNumber: 1,
        title: 'Substitute y = xu, y\' = xu\' + u, and y\'\' = xu\'\' + 2u\'',
        arabicTitle: 'التعويض بـ y = xu ومشتقاتها الأولى والثانية',
        formula: "y = xu \\implies y' = xu' + u \\implies y'' = xu'' + 2u'",
        explanation: 'By product rule, (xu\')\' = x u\'\' + u\', plus (u)\' = u\', giving x u\'\' + 2u\'.',
        arabicExplanation: 'بتطبيق قاعدة الضرب مرتين نجد أن y\'\' = x u\'\' + 2u\'.'
      },
      {
        stepNumber: 2,
        title: 'Plug into ODE, Cancel xu, and Divide by x³',
        arabicTitle: 'التعويض في المعادلة واختصار xu والقسمة على x³',
        formula: "x^2(xu'' + 2u') + x(xu' + u) - xu = x \\implies x^3 u'' + 3x^2 u' = x \\implies u'' + \\frac{3}{x}u' = \\frac{1}{x^2}",
        explanation: 'Notice +xu and -xu cancel! Combining 2x^2 u\' + x^2 u\' gives 3x^2 u\'.',
        arabicExplanation: 'يختصر الحد xu مع -xu، ونجمع 2x^2 u\' مع x^2 u\' لنحصل على 3x^2 u\'.'
      },
      {
        stepNumber: 3,
        title: 'Reduce Order via z = u\' and Solve with Integrating Factor μ = x³',
        arabicTitle: 'اختزال الرتبة بوضع z = u\' وحل المعادلة الخطية بعامل التكامل μ = x³',
        formula: "z = u',\\; z' = u'' \\implies z' + \\frac{3}{x}z = \\frac{1}{x^2} \\implies \\mu = e^{\\int \\frac{3}{x}dx} = x^3 \\implies z = \\frac{1}{x^3}\\left[\\int x\\,dx + C_1\\right] = \\frac{1}{x^3}\\left[\\frac{x^2}{2} + C_1\\right]",
        explanation: 'Inside the integral, μ · (1/x^2) = x^3 · (1/x^2) = x, which integrates to x^2 / 2.',
        arabicExplanation: 'ضرب عامل التكامل x^3 في الطرف الأيمن 1/x^2 يعطي x وتكاملها x^2/2.'
      },
      {
        stepNumber: 4,
        title: 'Integrate u\' = z and Multiply by y₁ = x',
        arabicTitle: 'تكامل u\' = z لإيجاد u ثم الضرب في x للحصول على y',
        formula: "u' = \\frac{1}{2x} + C_1 x^{-3} \\implies u = \\frac{1}{2}\\ln|x| - \\frac{1}{2}C_1 x^{-2} + C_2 \\implies y = xu = \\frac{x}{2}\\ln|x| - \\frac{1}{2}\\frac{C_1}{x} + C_2 x",
        explanation: 'Integrate u\' term-by-term, then multiply the entire expression by x.',
        arabicExplanation: 'نكامل u\' للحصول على u ثم نضرب الناتج بالكامل في x.'
      }
    ],
    finalAnswerLatex: "y = \\frac{x}{2}\\ln|x| - \\frac{1}{2}\\frac{C_1}{x} + C_2 x",
    drillOptions: {
      methodChoices: [
        'Reduction of Order: let y = x·u, y\' = xu\' + u, y\'\' = xu\'\' + 2u\'',
        'Constant-Coefficient Auxiliary Quadratic',
        'Undetermined Coefficients',
        'Bernoulli Substitution'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'After substituting y = xu into x^2 y\'\' + xy\' - y = x and dividing by x^3, what is the reduced 1st-order ODE in z = u\'?',
      keyStepChoices: [
        'z\' + (3/x)z = 1/x^2 with integrating factor μ = x^3',
        'z\' + (1/x)z = 1/x with integrating factor μ = x',
        'z\' - z = x^2',
        'z\' + 3z = x'
      ],
      correctKeyStepIndex: 0
    }
  },

  // =========================================================================
  // PDF 4: FALL 2020-2021 MIDTERM (Exam Date: 6/12/2020) - 7 QUESTIONS
  // =========================================================================
  {
    id: 'f20-q1a',
    numberLabel: 'Fall 2020 • Q1(a)',
    sourceExam: 'Midterm Exam Fall 2020–2021',
    sourceYear: '2020–2021',
    sourceFileUrl: '/assets/aistudio/Mid_Term_exam_Fall2021__1__143d9fd2.pdf',
    points: 3,
    category: Category.SEPARATION,
    subCategory: 'First-Order ODE',
    methodTag: 'Separable ODE (sec(y) + x / cos(y) Factoring)',
    arabicMethodTag: 'فصل المتغيرات (أخذ sec(y) كعامل مشترك)',
    difficulty: 'Core',
    problemLatex: "y' = \\sec y + \\frac{x}{\\cos y}",
    visualRecognitionTrigger: 'sec(y) + x / cos(y) on the RHS.',
    arabicVisualTrigger: 'وجود sec(y) ومقلوب cos(y) في الطرف الأيمن.',
    examinerTrap: 'Trying to treat this as a linear or Bernoulli ODE instead of rewriting 1/cos(y) = sec(y) and factoring sec(y)(1 + x)!',
    arabicExaminerTrap: 'عدم الانتباه إلى أن 1/cos(y) هي sec(y) وأخذها كعامل مشترك مباشرة.',
    secretShortcut: 'y\' = sec(y)(1 + x) → cos(y) dy = (1 + x) dx → sin(y) = x + x^2 / 2 + C!',
    steps: [
      {
        stepNumber: 1,
        title: 'Rewrite 1/cos(y) as sec(y) and Factor',
        arabicTitle: 'تحويل 1/cos(y) إلى sec(y) وأخذها عامل مشترك',
        formula: "\\frac{dy}{dx} = \\sec(y) + x\\sec(y) = \\sec(y)(1 + x)",
        explanation: 'Factoring sec(y) separates the x and y dependencies.',
        arabicExplanation: 'سحب sec(y) يفصل المتغيرين x و y.'
      },
      {
        stepNumber: 2,
        title: 'Separate Variables & Integrate',
        arabicTitle: 'فصل المتغيرات وإجراء التكامل',
        formula: "\\int \\cos(y)\\,dy = \\int (1 + x)\\,dx \\implies \\sin(y) = x + \\frac{x^2}{2} + C",
        explanation: 'Since 1 / sec(y) = cos(y), integrating gives sin(y).',
        arabicExplanation: 'مقلوب sec(y) هو cos(y) وتكامله sin(y).'
      }
    ],
    finalAnswerLatex: "\\sin(y) = x + \\frac{x^2}{2} + C",
    drillOptions: {
      methodChoices: [
        'Separable ODE (factor out sec(y) to get cos(y) dy = (1 + x) dx)',
        'Homogeneous ODE (u = y/x)',
        'Bernoulli ODE',
        'Exact ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'How does sec(y) + x / cos(y) simplify?',
      keyStepChoices: [
        'sec(y)(1 + x)',
        'cos(y)(1 + x)',
        'tan(y) + x',
        'sec^2(y) x'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'f20-q1b',
    numberLabel: 'Fall 2020 • Q1(b)',
    sourceExam: 'Midterm Exam Fall 2020–2021',
    sourceYear: '2020–2021',
    sourceFileUrl: '/assets/aistudio/Mid_Term_exam_Fall2021__1__143d9fd2.pdf',
    points: 3,
    category: Category.REDUCIBLE_SEPARATION,
    subCategory: 'First-Order ODE',
    methodTag: 'Reducible to Separable (z = x + y Substitution)',
    arabicMethodTag: 'تؤول إلى فصل المتغيرات بالتعويض (z = x + y)',
    difficulty: 'Trick',
    problemLatex: "y' = (x + y)\\ln(x + y) - 1",
    visualRecognitionTrigger: 'Repeated block (x + y) inside and outside a logarithm, plus a -1 on the RHS.',
    arabicVisualTrigger: 'تكرار القوس (x + y) داخل وخارج اللوغاريتم مع وجود -1 في الطرف الأيمن.',
    examinerTrap: 'Trying to expand (x+y) or treating it as homogeneous! The -1 is placed there deliberately by the examiner to cancel with the -1 from y\' = z\' - 1!',
    arabicExaminerTrap: 'وضع الممتحن الرقم (-1) عمداً لكي يختصر مع (-1) الناتج من اشتقاق الفرض y\' = z\' - 1.',
    secretShortcut: 'Let z = x + y → z\' = 1 + y\' → y\' = z\' - 1. The -1 on both sides cancels out, leaving dz / (z ln z) = dx, which integrates to ln|ln z| = x + C!',
    steps: [
      {
        stepNumber: 1,
        title: 'Substitute z = x + y and y\' = z\' - 1',
        arabicTitle: 'فرض أن z = x + y وبالتالي y\' = z\' - 1',
        formula: "z = x + y \\implies \\frac{dz}{dx} = 1 + \\frac{dy}{dx} \\implies y' = z' - 1",
        explanation: 'Differentiating z = x + y with respect to x relates y\' to z\'.',
        arabicExplanation: 'باشتقاق الفرض بالنسبة لـ x نحصل على y\' = z\' - 1.'
      },
      {
        stepNumber: 2,
        title: 'Cancel -1 and Separate Variables',
        arabicTitle: 'اختصار -1 من الطرفين وفصل المتغيرات',
        formula: "z' - \\cancel{1} = z\\ln(z) - \\cancel{1} \\implies \\int \\frac{1/z}{\\ln(z)}\\,dz = \\int dx",
        explanation: 'Write 1 / (z ln z) as (1/z) / ln(z) so the numerator is the derivative of the denominator.',
        arabicExplanation: 'نكتب 1/(z ln z) على صورة (1/z)/ln(z) ليصبح البسط مشتقة المقام.'
      },
      {
        stepNumber: 3,
        title: 'Integrate and Restore z = x + y',
        arabicTitle: 'التكامل وإعادة z = x + y',
        formula: "\\ln|\\ln(z)| = x + C \\implies \\ln|\\ln(x + y)| = x + C \\quad \\text{(or } \\ln(x+y) = C_1 e^x\\text{)}",
        explanation: 'Integral of (1/z)/ln(z) dz is ln|ln(z)|.',
        arabicExplanation: 'تكامل بسط مشتقة مقام يعطي ln|ln(x+y)| = x + C.'
      }
    ],
    finalAnswerLatex: "\\ln|\\ln(x + y)| = x + C",
    drillOptions: {
      methodChoices: [
        'Reducible to Separable via substitution z = x + y (so y\' = z\' - 1)',
        'Homogeneous Substitution u = y/x',
        'First-Order Linear ODE',
        'Bernoulli ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'After substituting z = x + y and canceling -1, how do you integrate ∫ dz / (z ln z)?',
      keyStepChoices: [
        'Rewrite as ∫ (1/z) / ln(z) dz = ln|ln(z)|',
        'Use integration by parts twice',
        'It integrates to (ln z)^2 / 2',
        'It integrates to z ln z - z'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'f20-q1c',
    numberLabel: 'Fall 2020 • Q1(c)',
    sourceExam: 'Midterm Exam Fall 2020–2021',
    sourceYear: '2020–2021',
    sourceFileUrl: '/assets/aistudio/Mid_Term_exam_Fall2021__1__143d9fd2.pdf',
    points: 3,
    category: Category.EXACT_EQUATIONS,
    subCategory: 'First-Order ODE',
    methodTag: 'Exact ODE (With ∫ x e^x dx Integration by Parts)',
    arabicMethodTag: 'معادلة تامة (تتضمن تكامل بالتجزيء لـ x e^x)',
    difficulty: 'Core',
    problemLatex: "(\\sin x\\cos y + xe^x)\\,dx + (y^2 + \\cos x\\sin y)\\,dy = 0",
    visualRecognitionTrigger: 'Form M dx + N dy = 0 where M_y = -sin(x)sin(y) and N_x = -sin(x)sin(y).',
    arabicVisualTrigger: 'الصورة M dx + N dy = 0 حيث M_y = N_x = -sin(x)sin(y).',
    examinerTrap: 'Getting the sign wrong on ∂(cos y)/∂y = -sin(y), or forgetting Integration by Parts on ∫ x e^x dx = x e^x - e^x.',
    arabicExaminerTrap: 'الخطأ في إشارة مشتقة جيب التمام أو نسيان التكامل بالتجزيء للحد x e^x.',
    secretShortcut: 'M_y = N_x = -sin(x)sin(y) → Exact! Integrate M w.r.t. x (-cos(x)cos(y) + x e^x - e^x) and N w.r.t. y (y^3/3 - cos(x)cos(y)), then slash the duplicate -cos(x)cos(y)!',
    steps: [
      {
        stepNumber: 1,
        title: 'Test for Exactness (M_y = N_x)',
        arabicTitle: 'اختبار شرط التمام (M_y = N_x)',
        formula: "M_y = -\\sin x\\sin y, \\quad N_x = -\\sin x\\sin y \\implies M_y = N_x \\text{ (Exact)}",
        explanation: 'Both partial derivatives equal -sin(x)sin(y), proving Exactness.',
        arabicExplanation: 'تتساوى المشتقتان الجزئيتان عند -sin(x)sin(y) فالمعادلة تامة.'
      },
      {
        stepNumber: 2,
        title: 'Integrate M dx and N dy & Slash Duplicate Term',
        arabicTitle: 'تكامل الحدين وشطب الحد المكرر',
        formula: "\\int (\\sin x\\cos y + xe^x)\\,dx + \\int (y^2 + \\cos x\\sin y)\\,dy = C \\implies -\\cos x\\cos y + xe^x - e^x + \\frac{y^3}{3} - \\cancel{\\cos x\\cos y} = C",
        explanation: 'Integral of sin(x) dx is -cos(x), and integral of sin(y) dy is -cos(y). Slash the duplicate -cos(x)cos(y).',
        arabicExplanation: 'نشطب الحد المكرر -cos(x)cos(y) من التكامل الثاني.'
      }
    ],
    finalAnswerLatex: "-\\cos x\\cos y + xe^x - e^x + \\frac{y^3}{3} = C",
    drillOptions: {
      methodChoices: [
        'Exact ODE (since M_y = N_x = -sin x sin y)',
        'Non-Exact ODE',
        'Homogeneous ODE',
        'Separable ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the integral of M(x,y) = (sin x cos y + x e^x) with respect to x?',
      keyStepChoices: [
        '-cos(x)cos(y) + x e^x - e^x',
        'cos(x)cos(y) + x e^x',
        '-sin(x)sin(y) + e^x',
        '-cos(x)sin(y) + (x^2/2)e^x'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'f20-q1d',
    numberLabel: 'Fall 2020 • Q1(d)',
    sourceExam: 'Midterm Exam Fall 2020–2021',
    sourceYear: '2020–2021',
    sourceFileUrl: '/assets/aistudio/Mid_Term_exam_Fall2021__1__143d9fd2.pdf',
    points: 3,
    category: Category.BERNOULLI,
    subCategory: 'First-Order ODE',
    methodTag: 'Bernoulli ODE (Exp Cancellation Trap: e^{-2x} · e^{2x} = 1)',
    arabicMethodTag: 'معادلة برنولي (خدعة اختصار e^{-2x} مع e^{2x})',
    difficulty: 'Trick',
    problemLatex: "y' + y = e^{2x}\\tan(x)\\,y^3",
    visualRecognitionTrigger: 'y\' + y = Q(x) y^3 (Bernoulli with n = 3 and 1 - n = -2).',
    arabicVisualTrigger: 'معادلة برنولي لوجود y^3 في الطرف الأيمن (n = 3 وبالتالي 1 - n = -2).',
    examinerTrap: 'Thinking ∫ e^{2x} tan(x) dx is unintegrable! When you multiply P(x) = 1 by (1 - 3) = -2, the integrating factor becomes μ = e^{-2x}, which CANCELS the e^{2x} in Q*(x) completely, leaving just ∫ -2 tan(x) dx!',
    arabicExaminerTrap: 'الاعتقاد بأن تكامل e^{2x} tan(x) مستحيل! عند حساب عامل التكامل μ = e^{-2x} فإنه يختصر تماماً مع e^{2x} ويتبقى تكامل -2 tan(x) البسيط!',
    secretShortcut: '1 - n = 1 - 3 = -2 → P*(x) = -2 → μ = e^{-2x}. Multiply μ · Q*(x) = e^{-2x} · (-2 e^{2x} tan x) = -2 tan(x)! And ∫ -tan(x) dx = ln|cos x|.',
    steps: [
      {
        stepNumber: 1,
        title: 'Identify Bernoulli Parameters & Apply P*, Q* Shortcut',
        arabicTitle: 'تحديد معاملات برنولي وتطبيق اختصار P* و Q*',
        formula: "P(x) = 1,\\; Q(x) = e^{2x}\\tan x,\\; n = 3 \\implies 1 - n = -2,\\; P^*(x) = -2,\\; Q^*(x) = -2e^{2x}\\tan x",
        explanation: 'Here 1 - n = 1 - 3 = -2.',
        arabicExplanation: 'قيمة 1 - n تساوي 1 - 3 = -2.'
      },
      {
        stepNumber: 2,
        title: 'Compute Integrating Factor μ = e^{-2x} & Cancel e^{2x}',
        arabicTitle: 'حساب عامل التكامل μ = e^{-2x} واختصاره مع e^{2x}',
        formula: "\\mu = e^{\\int -2\\,dx} = e^{-2x} \\implies y^{-2} = e^{2x}\\left[\\int e^{-2x}(-2e^{2x}\\tan x)\\,dx + C\\right] = e^{2x}\\left[\\int -2\\tan x\\,dx + C\\right]",
        explanation: 'e^{-2x} and e^{2x} multiply to 1, leaving only -2 tan(x) inside the integral!',
        arabicExplanation: 'يختصر e^{-2x} مع e^{2x} ويتبقى داخل التكامل -2 tan(x) فقط!'
      },
      {
        stepNumber: 3,
        title: 'Integrate -2 tan(x) dx',
        arabicTitle: 'إيجاد تكامل -2 tan(x)',
        formula: "y^{-2} = e^{2x}\\left[2\\ln|\\cos x| + C\\right] \\quad \\text{(or } e^{2x}\\left[-2\\ln|\\sec x| + C\\right]\\text{)}",
        explanation: 'Since tan(x) = sin(x)/cos(x), ∫ -tan(x) dx = ln|cos(x)|.',
        arabicExplanation: 'بما أن tan(x) = sin(x)/cos(x) فإن تكامل -tan(x) هو ln|cos(x)|.'
      }
    ],
    finalAnswerLatex: "y^{-2} = e^{2x}\\left[2\\ln|\\cos x| + C\\right]",
    drillOptions: {
      methodChoices: [
        'Bernoulli ODE with n = 3, 1 - n = -2, and μ = e^{-2x}',
        'First-Order Linear ODE with μ = e^x',
        'Separable ODE',
        'Homogeneous ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'Why does the e^{2x} term next to tan(x) disappear inside the final integral?',
      keyStepChoices: [
        'Because μ = e^{-2x} multiplies with e^{2x} to equal 1',
        'Because tan(x) absorbs e^{2x}',
        'Because we divide the equation by e^{2x} first',
        'It does not disappear; use integration by parts'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'f20-q2a',
    numberLabel: 'Fall 2020 • Q2(a)',
    sourceExam: 'Midterm Exam Fall 2020–2021',
    sourceYear: '2020–2021',
    sourceFileUrl: '/assets/aistudio/Mid_Term_exam_Fall2021__1__143d9fd2.pdf',
    points: 3,
    category: Category.HIGHER_ORDER_HOMOGENEOUS,
    subCategory: 'Higher-Order ODE',
    methodTag: '3rd-Order Homogeneous ODE (Sum of Coefficients = 0 Trick)',
    arabicMethodTag: 'معادلة متجانسة من الرتبة الثالثة (مجموع المعاملات = صفر)',
    difficulty: 'Core',
    problemLatex: "y''' - 5y'' + 7y' - 3y = 0",
    visualRecognitionTrigger: '3rd-order homogeneous ODE where 1 - 5 + 7 - 3 = 0.',
    arabicVisualTrigger: 'معادلة من الرتبة الثالثة مجموع معاملاتها 1 - 5 + 7 - 3 = 0.',
    examinerTrap: 'Not noticing that m = 1 is a REPEATED root (multiplicity 2), so it requires (C_1 + C_2 x)e^x!',
    arabicExaminerTrap: 'عدم الانتباه إلى أن الجذر m = 1 مكرر مرتين فيتطلب كتابة (C_1 + C_2 x)e^x.',
    secretShortcut: 'Whenever the sum of coefficients of an auxiliary polynomial is 0 (1 - 5 + 7 - 3 = 0), m = 1 is GUARANTEED to be a root! Synthetic division by (m - 1) gives (m - 1)(m^2 - 4m + 3) = (m - 1)^2 (m - 3) = 0!',
    steps: [
      {
        stepNumber: 1,
        title: 'Write Auxiliary Equation & Factor Using m = 1',
        arabicTitle: 'كتابة المعادلة المساعدة والتحليل باستخدام الجذر m = 1',
        formula: "m^3 - 5m^2 + 7m - 3 = 0 \\implies (m - 1)(m^2 - 4m + 3) = (m - 1)^2(m - 3) = 0",
        explanation: 'Since 1 - 5 + 7 - 3 = 0, m = 1 is a root. Factoring m^2 - 4m + 3 gives (m - 1)(m - 3).',
        arabicExplanation: 'بما أن مجموع المعاملات صفر فإن m = 1 جذر، وبتحليل القوس التربيعي نجد أن الجذور هي 1, 1, 3.'
      },
      {
        stepNumber: 2,
        title: 'Write General Solution for Roots m = 1, 1, 3',
        arabicTitle: 'كتابة الحل العام للجذور m = 1, 1, 3',
        formula: "m_1 = m_2 = 1,\\; m_3 = 3 \\implies y = (C_1 + C_2 x)e^x + C_3 e^{3x}",
        explanation: 'Root m = 1 is repeated twice, so include x on the second term.',
        arabicExplanation: 'الجذر m = 1 مكرر مرتين فنضرب الثابت الثاني في x.'
      }
    ],
    finalAnswerLatex: "y = (C_1 + C_2 x)e^x + C_3 e^{3x}",
    drillOptions: {
      methodChoices: [
        'Cubic Auxiliary Equation (sum of coefficients = 0 ⇒ m = 1 is a root)',
        'Undetermined Coefficients',
        'Variation of Parameters',
        'Reduction of Order'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What are the 3 roots of m^3 - 5m^2 + 7m - 3 = 0?',
      keyStepChoices: [
        'm = 1, 1, 3',
        'm = 1, 2, 3',
        'm = -1, -1, -3',
        'm = 1, 3 ± i'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'f20-q2b',
    numberLabel: 'Fall 2020 • Q2(b)',
    sourceExam: 'Midterm Exam Fall 2020–2021',
    sourceYear: '2020–2021',
    sourceFileUrl: '/assets/aistudio/Mid_Term_exam_Fall2021__1__143d9fd2.pdf',
    points: 3,
    category: Category.UNDETERMINED_COEFFS,
    subCategory: 'Higher-Order ODE',
    methodTag: 'Undetermined Coefficients (Polynomial × Exponential RHS)',
    arabicMethodTag: 'المعاملات غير المعينة (كثيرة حدود مضروبة في دالة أسية)',
    difficulty: 'Trick',
    problemLatex: "y'' - 2y' - 3y = 2xe^x",
    visualRecognitionTrigger: 'Constant-coefficient 2nd-order ODE with RHS = 2x e^x.',
    arabicVisualTrigger: 'معادلة ذات معاملات ثابتة وطرف أيمن على صورة 2x e^x.',
    examinerTrap: 'Guessing y_p = A x e^x without the constant term B! For a degree-1 polynomial (2x) times e^x, you MUST guess the full linear polynomial (Ax + B)e^x!',
    arabicExaminerTrap: 'فرض الحل الخاص على صورة Ax e^x فقط ونسيان الحد المطلق B! يجب فرض القوس الخطي كاملاً (Ax + B)e^x.',
    secretShortcut: 'Roots of m^2 - 2m - 3 = 0 are m = 3 and m = -1. Since r = 1 is NOT a root of y_h, no x-boost is needed: y_p = (Ax + B)e^x!',
    steps: [
      {
        stepNumber: 1,
        title: 'Find Homogeneous Solution y_h',
        arabicTitle: 'إيجاد الحل المتجانس y_h',
        formula: "m^2 - 2m - 3 = (m - 3)(m + 1) = 0 \\implies y_h = C_1 e^{3x} + C_2 e^{-x}",
        explanation: 'Distinct real roots m_1 = 3 and m_2 = -1.',
        arabicExplanation: 'جذران حقيقيان مختلفان m = 3 و m = -1.'
      },
      {
        stepNumber: 2,
        title: 'Set Up Particular Solution y_p = (Ax + B)e^x & Differentiate',
        arabicTitle: 'فرض الحل الخاص y_p = (Ax + B)e^x وحساب مشتقاته',
        formula: "y_p = (Ax + B)e^x \\implies y_p' = (Ax + A + B)e^x \\implies y_p'' = (Ax + 2A + B)e^x",
        explanation: 'Since m = 1 is not a homogeneous root, y_p = (Ax + B)e^x.',
        arabicExplanation: 'بما أن m = 1 ليس من جذور المعادلة المساعدة نفرض y_p = (Ax + B)e^x.'
      },
      {
        stepNumber: 3,
        title: 'Substitute into ODE & Solve for A and B',
        arabicTitle: 'التعويض في المعادلة وإيجاد الثابتين A و B',
        formula: "\\left[(Ax + 2A + B) - 2(Ax + A + B) - 3(Ax + B)\\right]e^x = 2xe^x \\implies -4Ax - 4B = 2x \\implies A = -\\frac{1}{2},\\; B = 0",
        explanation: 'Notice 2A - 2A cancels cleanly! Matching coefficients gives -4A = 2 (A = -1/2) and -4B = 0 (B = 0).',
        arabicExplanation: 'بمقارنة المعاملات نجد أن -4A = 2 أي A = -1/2، و B = 0.'
      }
    ],
    finalAnswerLatex: "y = C_1 e^{3x} + C_2 e^{-x} - \\frac{1}{2}xe^x",
    drillOptions: {
      methodChoices: [
        'Undetermined Coefficients with trial form y_p = (Ax + B)e^x',
        'Undetermined Coefficients with trial form y_p = Ax e^x only',
        'Undetermined Coefficients with trial form y_p = x(Ax + B)e^x',
        'Reduction of Order'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'Why must the trial particular solution for RHS = 2x e^x be y_p = (Ax + B)e^x?',
      keyStepChoices: [
        'Because any degree-1 polynomial x requires a complete degree-1 polynomial (Ax + B), and m = 1 is not a root of y_h',
        'Because m = 1 is a repeated root',
        'Because B is an arbitrary integration constant',
        'It should actually be Ax^2 e^x'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'f20-q2c',
    numberLabel: 'Fall 2020 • Q2(c)',
    sourceExam: 'Midterm Exam Fall 2020–2021',
    sourceYear: '2020–2021',
    sourceFileUrl: '/assets/aistudio/Mid_Term_exam_Fall2021__1__143d9fd2.pdf',
    points: 4,
    category: Category.REDUCTION_OF_ORDER,
    subCategory: 'Higher-Order ODE',
    methodTag: 'Reduction of Order (Disguised Cauchy-Euler Given y₁ = x)',
    arabicMethodTag: 'اختزال الرتبة (بمعلومية الحل المتجانس y = x)',
    difficulty: 'Boss',
    problemLatex: "\\frac{1}{x}y'' + \\frac{6}{x^2}y' - \\frac{6y}{x^3} = 12x^3 + 9, \\quad \\text{given that } y = x \\text{ is a homogeneous solution}",
    visualRecognitionTrigger: '2nd-order variable-coefficient ODE with explicit hint "given that y = x is a solution".',
    arabicVisualTrigger: 'معادلة من الرتبة الثانية بمعاملات كسرية في x مع إعطاء الحل المعلوم y = x.',
    examinerTrap: 'Working with the ugly fractions 1/x, 6/x^2, 6/x^3 instead of multiplying the whole equation by x first, OR forgetting to divide to normalize u\'\' before computing the integrating factor!',
    arabicExaminerTrap: 'التعامل مع الكسور مباشرة بدلاً من تبسيط المعادلة، أو نسيان جعل معامل z\' يساوي 1 قبل حساب عامل التكامل.',
    secretShortcut: 'Substitute y = x u, y\' = x u\' + u, y\'\' = x u\'\' + 2u\'. The u terms vanish: u\'\' + (8/x)u\' = 12x^3 + 9! Then let z = u\' → μ = x^8!',
    steps: [
      {
        stepNumber: 1,
        title: 'Substitute y = xu, y\' = xu\' + u, and y\'\' = xu\'\' + 2u\'',
        arabicTitle: 'التعويض بـ y = xu ومشتقاتها الأولى والثانية',
        formula: "y = xu,\\quad y' = xu' + u,\\quad y'' = xu'' + 2u'",
        explanation: 'Standard Reduction of Order substitution when y_1 = x.',
        arabicExplanation: 'تعويض اختزال الرتبة القياسي عندما يكون الحل المعلوم y_1 = x.'
      },
      {
        stepNumber: 2,
        title: 'Plug into ODE & Cancel All u Terms',
        arabicTitle: 'التعويض في المعادلة واختصار حدود u',
        formula: "\\frac{1}{x}(xu'' + 2u') + \\frac{6}{x^2}(xu' + u) - \\frac{6}{x^3}(xu) = 12x^3 + 9 \\implies u'' + \\frac{8}{x}u' = 12x^3 + 9",
        explanation: 'Notice why the examiner wrote (1/x)y\'\' in the problem: multiplying (1/x) by (x u\'\' + 2u\') immediately makes the coefficient of u\'\' equal to 1!',
        arabicExplanation: 'لاحظ ذكاء الممتحن في كتابة (1/x) بجوار y\'\': عند ضربها في x u\'\' يصبح معامل u\'\' يساوي 1 تلقائياً!'
      },
      {
        stepNumber: 3,
        title: 'Let z = u\' and Solve 1st-Order Linear ODE with μ = x⁸',
        arabicTitle: 'وضع z = u\' وحل المعادلة الخطية بعامل التكامل μ = x⁸',
        formula: "z' + \\frac{8}{x}z = 12x^3 + 9 \\implies \\mu = e^{\\int \\frac{8}{x}dx} = x^8 \\implies z = x^{-8}\\left[\\int (12x^{11} + 9x^8)\\,dx + C_1\\right] = x^4 + x + C_1 x^{-8}",
        explanation: 'Look at the numbers 12 and 9: ∫ 12x^{11} dx = x^{12} and ∫ 9x^8 dx = x^9! The examiner chose 12 and 9 specifically so the denominators 12 and 9 cancel out!',
        arabicExplanation: 'اختار الممتحن الرقمين 12 و 9 بعناية فائقة لأن تكامل 12x^{11} يعطي x^{12} وتكامل 9x^8 يعطي x^9 فتختصر المقامات تماماً!'
      },
      {
        stepNumber: 4,
        title: 'Integrate u\' = z and Multiply by x',
        arabicTitle: 'تكامل u\' = z ثم الضرب في x للحصول على y',
        formula: "u = \\int (x^4 + x + C_1 x^{-8})\\,dx = \\frac{x^5}{5} + \\frac{x^2}{2} - \\frac{C_1}{7}x^{-7} + C_2 \\implies y = xu = \\frac{x^6}{5} + \\frac{x^3}{2} + \\tilde{C}_1 x^{-6} + C_2 x",
        explanation: 'Integrate u\' to get u, then multiply by x.',
        arabicExplanation: 'نكامل للحصول على u ثم نضرب في x.'
      }
    ],
    finalAnswerLatex: "y = \\frac{x^6}{5} + \\frac{x^3}{2} - \\frac{C_1}{7}x^{-6} + C_2 x",
    drillOptions: {
      methodChoices: [
        'Reduction of Order (let y = x·u, which simplifies directly to u\'\' + (8/x)u\' = 12x^3 + 9)',
        'Constant-Coefficient Auxiliary Equation',
        'Undetermined Coefficients',
        'Bernoulli ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'Why did the examiner choose the exact numbers 12x^3 + 9 on the right-hand side?',
      keyStepChoices: [
        'Because multiplying by the integrating factor μ = x^8 gives 12x^{11} + 9x^8, which integrates cleanly to x^{12} + x^9!',
        'To make the roots complex numbers',
        'Because 12 - 9 = 3',
        'So that u = 0'
      ],
      correctKeyStepIndex: 0
    }
  },

  // =========================================================================
  // PDF 5: FALL 2021-2022 MIDTERM (Exam Date: 30/11/2021) - 7 QUESTIONS
  // =========================================================================
  {
    id: 'f21-q1a',
    numberLabel: 'Fall 2021 • Q1(a)',
    sourceExam: 'Midterm Exam Fall 2021–2022',
    sourceYear: '2021–2022',
    sourceFileUrl: '/assets/aistudio/Mid_Term_exam__Fall2022__1__9deffc90.pdf',
    points: 3,
    category: Category.LINEAR_FIRST_ORDER,
    subCategory: 'First-Order ODE',
    methodTag: 'First-Order Linear ODE (Disguised 1/csc(x) = sin(x))',
    arabicMethodTag: 'معادلة خطية من الرتبة الأولى (خدعة 1/csc(x) = sin(x))',
    difficulty: 'Trick',
    problemLatex: "y' = \\frac{y}{\\csc x} + \\sin x",
    visualRecognitionTrigger: 'y\' and y to the first power, with y divided by csc(x).',
    arabicVisualTrigger: 'معادلة من الرتبة الأولى تحتوي على y مقسومة على csc(x).',
    examinerTrap: 'Leaving csc(x) in the denominator instead of immediately rewriting 1/csc(x) as sin(x)! Once rewritten as y\' - sin(x)y = sin(x), it is a 2-line Linear ODE (or separable by factoring sin(x)(y + 1))!',
    arabicExaminerTrap: 'ترك csc(x) في المقام بدلاً من تحويل 1/csc(x) فوراً إلى sin(x)! وبعدها يمكن حلها كمعادلة خطية أو حتى بفصل المتغيرات y\' = sin(x)(y + 1)!',
    secretShortcut: 'SUPER SHORTCUT: Since 1/csc(x) = sin(x), the equation is y\' = y sin(x) + sin(x) = sin(x)(y + 1)! You can either separate variables dy/(y+1) = sin(x) dx OR solve as Linear with P(x) = -sin(x)! Both give y = -1 + C e^{-cos x}.',
    steps: [
      {
        stepNumber: 1,
        title: 'Rewrite 1/csc(x) as sin(x)',
        arabicTitle: 'تحويل مقلوب قاطع التمام 1/csc(x) إلى sin(x)',
        formula: "y' = y\\sin x + \\sin x \\implies y' - (\\sin x)y = \\sin x",
        explanation: 'Reciprocal identity: 1 / csc(x) = sin(x).',
        arabicExplanation: 'من المتطابقات المثلثية 1/csc(x) = sin(x).'
      },
      {
        stepNumber: 2,
        title: 'Method A (Linear Integrating Factor) or Method B (Factor sin x & Separate)',
        arabicTitle: 'الحل بعامل التكامل (أو بفصل المتغيرات مباشرة)',
        formula: "\\mu = e^{\\int -\\sin x\\,dx} = e^{\\cos x} \\implies y = e^{-\\cos x}\\left[\\int e^{\\cos x}\\sin x\\,dx + C\\right] = e^{-\\cos x}\\left[-e^{\\cos x} + C\\right]",
        explanation: 'Note that d(cos x) = -sin(x) dx, so ∫ e^{cos x} sin(x) dx = -e^{cos x}. (Or via separation: ∫ dy/(y+1) = ∫ sin x dx ⇒ ln|y+1| = -cos x + C).',
        arabicExplanation: 'مشتقة الأس cos(x) هي -sin(x) فيكون التكامل -e^{cos x}.'
      }
    ],
    finalAnswerLatex: "y = -1 + Ce^{-\\cos x}",
    drillOptions: {
      methodChoices: [
        'Rewrite 1/csc(x) = sin(x), then solve as Linear (y\' - sin(x)y = sin(x)) or Separable (y\' = sin(x)(y+1))',
        'Homogeneous Substitution u = y/x',
        'Bernoulli ODE with n = 2',
        'Reduction of Order'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'How does y / csc(x) + sin(x) simplify?',
      keyStepChoices: [
        'y sin(x) + sin(x) = sin(x)(y + 1)',
        'y cos(x) + sin(x)',
        'y sec(x) + sin(x)',
        'y / sin(x) + sin(x)'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'f21-q1b',
    numberLabel: 'Fall 2021 • Q1(b)',
    sourceExam: 'Midterm Exam Fall 2021–2022',
    sourceYear: '2021–2022',
    sourceFileUrl: '/assets/aistudio/Mid_Term_exam__Fall2022__1__9deffc90.pdf',
    points: 3,
    category: Category.EXACT_EQUATIONS,
    subCategory: 'First-Order ODE',
    methodTag: 'Non-Exact ODE with Integrating Factor μ(x) = x²',
    arabicMethodTag: 'معادلة غير تامة تُحل بعامل التكامل μ(x) = x²',
    difficulty: 'Boss',
    problemLatex: "(9xy + 10y - 2)\\,dx + x(3x + 5)\\,dy = 0",
    visualRecognitionTrigger: 'M dx + N dy = 0 where M_y = 9x + 10 and N_x = 6x + 5 (Not Exact).',
    arabicVisualTrigger: 'الصورة M dx + N dy = 0 حيث M_y = 9x + 10 بينما N_x = 6x + 5 (غير تامة).',
    examinerTrap: 'Not noticing that M_y - N_x = (9x + 10) - (6x + 5) = 3x + 5, which cancels the (3x + 5) factor in N = x(3x + 5)!',
    arabicExaminerTrap: 'عدم ملاحظة أن الطرح M_y - N_x يعطي (3x + 5) وهو نفس القوس الموجود في N = x(3x + 5)!',
    secretShortcut: 'M_y - N_x = 3x + 5. Divide by N = x(3x + 5) to get (3x + 5) / [x(3x + 5)] = 1/x? Wait: N = 3x^2 + 5x so N_x = 6x + 5, and M_y - N_x = 3x + 5, so (M_y - N_x)/N = 1/x → μ(x) = x! Let\'s verify!',
    steps: [
      {
        stepNumber: 1,
        title: 'Compute M_y, N_x and Find Integrating Factor μ(x)',
        arabicTitle: 'حساب المشتقات الجزئية وإيجاد عامل التكامل μ(x)',
        formula: "M_y = 9x + 10,\\quad N = 3x^2 + 5x \\implies N_x = 6x + 5 \\implies \\frac{M_y - N_x}{N} = \\frac{3x + 5}{x(3x + 5)} = \\frac{1}{x} \\implies \\mu = e^{\\int \\frac{1}{x}dx} = x",
        explanation: 'Look how cleanly (3x + 5) cancels out when dividing (M_y - N_x) by N = x(3x + 5)!',
        arabicExplanation: 'يختصر القوس (3x + 5) بسهولة عند قسمة (M_y - N_x) على N = x(3x + 5) ليعطي 1/x ومنها μ = x.'
      },
      {
        stepNumber: 2,
        title: 'Multiply Original ODE by μ = x to Make It Exact',
        arabicTitle: 'ضرب المعادلة في عامل التكامل μ = x لتصبح تامة',
        formula: "(9x^2y + 10xy - 2x)\\,dx + (3x^3 + 5x^2)\\,dy = 0",
        explanation: 'Now ∂/∂y(9x^2y + 10xy - 2x) = 9x^2 + 10x = ∂/∂x(3x^3 + 5x^2).',
        arabicExplanation: 'الآن أصبحت المشتقات الجزئية متساوية وتساوي 9x^2 + 10x.'
      },
      {
        stepNumber: 3,
        title: 'Integrate & Strike Out Duplicate Terms',
        arabicTitle: 'إجراء التكامل وشطب الحدود المكررة',
        formula: "\\int (9x^2y + 10xy - 2x)\\,dx + \\int (3x^3 + 5x^2)\\,dy = C \\implies 3x^3y + 5x^2y - x^2 + \\cancel{3x^3y} + \\cancel{5x^2y} = C",
        explanation: 'Slash out the duplicate terms 3x^3y and 5x^2y from the second integral.',
        arabicExplanation: 'نشطب الحدين المكررين من التكامل الثاني.'
      }
    ],
    finalAnswerLatex: "3x^3y + 5x^2y - x^2 = C",
    drillOptions: {
      methodChoices: [
        'Non-Exact ODE with Integrating Factor μ(x) = x (since (M_y - N_x)/N = 1/x)',
        'Already Exact ODE',
        'Homogeneous ODE',
        'Bernoulli ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is M_y - N_x for M = 9xy + 10y - 2 and N = 3x^2 + 5x?',
      keyStepChoices: [
        '(9x + 10) - (6x + 5) = 3x + 5, so (M_y - N_x)/N = 1/x',
        '0 (Already Exact)',
        '15x + 15',
        '-3x - 5'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'f21-q1c',
    numberLabel: 'Fall 2021 • Q1(c)',
    sourceExam: 'Midterm Exam Fall 2021–2022',
    sourceYear: '2021–2022',
    sourceFileUrl: '/assets/aistudio/Mid_Term_exam__Fall2022__1__9deffc90.pdf',
    points: 3,
    category: Category.HOMOGENEOUS,
    subCategory: 'First-Order ODE',
    methodTag: 'Homogeneous ODE (Disguised Log Difference: ln y - ln x = ln(y/x))',
    arabicMethodTag: 'معادلة متجانسة (خدعة طرح اللوغاريتمات ln y - ln x = ln(y/x))',
    difficulty: 'Trick',
    problemLatex: "\\frac{x(\\ln y - \\ln x)}{y}\\frac{dy}{dx} = (\\ln y - \\ln x) + 1",
    visualRecognitionTrigger: 'Contains (ln y - ln x) and the ratio x/y.',
    arabicVisualTrigger: 'وجود الفرق (ln y - ln x) مع النسبة x/y.',
    examinerTrap: 'Not combining ln(y) - ln(x) into ln(y/x)! Without that log property, students think the equation cannot be solved.',
    arabicExaminerTrap: 'عدم دمج ln(y) - ln(x) في لوغاريتم واحد ln(y/x) قبل التعويض بـ u = y/x.',
    secretShortcut: 'Use ln(y) - ln(x) = ln(y/x) = ln(u), and x/y = 1/u! Then (ln u / u)(x u\' + u) = ln u + 1 ⇒ (x ln u / u) u\' + ln u = ln u + 1. The ln(u) cancels on both sides!',
    steps: [
      {
        stepNumber: 1,
        title: 'Apply Logarithm Quotient Rule & Substitute u = y/x',
        arabicTitle: 'تطبيق قاعدة طرح اللوغاريتمات والتعويض بـ u = y/x',
        formula: "\\ln y - \\ln x = \\ln\\left(\\frac{y}{x}\\right) = \\ln u,\\quad \\frac{x}{y} = \\frac{1}{u},\\quad y' = xu' + u",
        explanation: 'Rewrite every (ln y - ln x) as ln(u) and x/y as 1/u.',
        arabicExplanation: 'نحول (ln y - ln x) إلى ln(u) والنسبة x/y إلى 1/u.'
      },
      {
        stepNumber: 2,
        title: 'Expand and Cancel ln(u) on Both Sides',
        arabicTitle: 'فك القوس واختصار ln(u) من الطرفين',
        formula: "\\frac{\\ln u}{u}(xu' + u) = \\ln u + 1 \\implies \\frac{x\\ln u}{u}\\frac{du}{dx} + \\cancel{\\ln u} = \\cancel{\\ln u} + 1",
        explanation: 'Multiplying (ln u / u) by u gives +ln(u), which cancels with the ln(u) on the right!',
        arabicExplanation: 'عند ضرب (ln u / u) في u نحصل على ln(u) فتختصر مع الطرف الأيمن!'
      },
      {
        stepNumber: 3,
        title: 'Separate Variables & Integrate',
        arabicTitle: 'فصل المتغيرات وإجراء التكامل',
        formula: "\\int \\frac{\\ln u}{u}\\,du = \\int \\frac{dx}{x} \\implies \\frac{1}{2}(\\ln u)^2 = \\ln|x| + C \\implies \\frac{1}{2}\\left(\\ln\\frac{y}{x}\\right)^2 = \\ln|x| + C",
        explanation: 'Since d(ln u) = (1/u) du, ∫ (ln u)(1/u) du = (1/2)(ln u)^2.',
        arabicExplanation: 'مشتقة ln u هي 1/u، لذا تكاملها هو نصف مربع اللوغاريتم.'
      }
    ],
    finalAnswerLatex: "\\frac{1}{2}\\left[\\ln\\left(\\frac{y}{x}\\right)\\right]^2 = \\ln|x| + C",
    drillOptions: {
      methodChoices: [
        'Homogeneous ODE after rewriting ln(y) - ln(x) = ln(y/x)',
        'Bernoulli ODE',
        'First-Order Linear ODE',
        'Exact ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'After substituting u = y/x into [x(ln y - ln x)/y] y\' = (ln y - ln x) + 1, what simplifies?',
      keyStepChoices: [
        'ln(u) cancels from both sides, leaving (ln u / u) du = dx / x',
        '1 cancels from both sides',
        'u^2 cancels out',
        'It becomes a Bernoulli equation in u'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'f21-q1d',
    numberLabel: 'Fall 2021 • Q1(d)',
    sourceExam: 'Midterm Exam Fall 2021–2022',
    sourceYear: '2021–2022',
    sourceFileUrl: '/assets/aistudio/Mid_Term_exam__Fall2022__1__9deffc90.pdf',
    points: 3,
    category: Category.LINEAR_FIRST_ORDER,
    subCategory: 'First-Order ODE',
    methodTag: 'First-Order Linear ODE (Exact Product Rule d/dx[y sin x])',
    arabicMethodTag: 'معادلة خطية من الرتبة الأولى (مشتقة حاصل ضرب y sin x)',
    difficulty: 'Core',
    problemLatex: "(\\sin x)y' + (\\cos x)y = \\sin x",
    visualRecognitionTrigger: 'Linear in y\' and y where the left-hand side is literally (sin x)y\' + (cos x)y = d/dx [y sin x]!',
    arabicVisualTrigger: 'معادلة خطية طرفها الأيسر هو مفكوك مشتقة حاصل الضرب d/dx [y sin x] مباشرة!',
    examinerTrap: 'Forgetting to divide by sin(x) if using the standard P(x) formula, OR not noticing that μ(x) = sin(x) is ALREADY sitting in front of y\'!',
    arabicExaminerTrap: 'عدم ملاحظة أن المعادلة مضروبة جاهزة في عامل التكامل sin(x)!',
    secretShortcut: 'Divide by sin(x) → y\' + cot(x) y = 1 → μ = e^{∫ cot x dx} = sin(x) → y = csc(x) [ ∫ sin(x) dx + C ] = csc(x) [ -cos(x) + C ]!',
    steps: [
      {
        stepNumber: 1,
        title: 'Divide by sin(x) to Normalize',
        arabicTitle: 'القسمة على sin(x) لوضع المعادلة في الصورة القياسية',
        formula: "y' + \\frac{\\cos x}{\\sin x}y = 1 \\implies P(x) = \\cot x,\\quad Q(x) = 1",
        explanation: 'Dividing by sin(x) gives P(x) = cos(x)/sin(x) = cot(x) and Q(x) = 1.',
        arabicExplanation: 'القسمة على sin(x) تعطي P(x) = cot(x) و Q(x) = 1.'
      },
      {
        stepNumber: 2,
        title: 'Compute Integrating Factor μ = sin(x) & Solve',
        arabicTitle: 'حساب عامل التكامل μ = sin(x) وإيجاد الحل العام',
        formula: "\\mu = e^{\\int \\frac{\\cos x}{\\sin x}dx} = e^{\\ln|\\sin x|} = \\sin x \\implies y = \\frac{1}{\\sin x}\\left[\\int \\sin x\\,dx + C\\right] = \\frac{-\\cos x + C}{\\sin x}",
        explanation: 'Integrating sin(x) dx gives -cos(x) + C.',
        arabicExplanation: 'تكامل sin(x) هو -cos(x) + C.'
      }
    ],
    finalAnswerLatex: "y = \\frac{-\\cos x + C}{\\sin x} = -\\cot x + C\\csc x",
    drillOptions: {
      methodChoices: [
        'First-Order Linear ODE with μ(x) = sin(x)',
        'Homogeneous ODE',
        'Bernoulli ODE',
        'Undetermined Coefficients'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'After dividing (sin x)y\' + (cos x)y = sin x by sin(x), what is the integrating factor μ(x)?',
      keyStepChoices: [
        'μ(x) = sin(x)',
        'μ(x) = cos(x)',
        'μ(x) = sec(x)',
        'μ(x) = e^{cot x}'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'f21-q2a',
    numberLabel: 'Fall 2021 • Q2(a)',
    sourceExam: 'Midterm Exam Fall 2021–2022',
    sourceYear: '2021–2022',
    sourceFileUrl: '/assets/aistudio/Mid_Term_exam__Fall2022__1__9deffc90.pdf',
    points: 3,
    category: Category.HIGHER_ORDER_HOMOGENEOUS,
    subCategory: 'Higher-Order ODE',
    methodTag: '5th-Order Homogeneous ODE (Double Zero Root + Complex Roots)',
    arabicMethodTag: 'معادلة متجانسة من الرتبة الخامسة (جذر صفري مزدوج + جذور مركبة)',
    difficulty: 'Core',
    problemLatex: "y''''' - 5y'''' + 8y''' - 6y'' = 0",
    visualRecognitionTrigger: '5th-order homogeneous ODE where lowest derivative is y\'\' (2nd derivative).',
    arabicVisualTrigger: 'معادلة من الرتبة الخامسة أصغر مشتقة فيها هي المشتقة الثانية y\'\'.',
    examinerTrap: 'Factoring out m^2 = 0 (gives C_1 + C_2 x), then forgetting to test m = 3 on m^3 - 5m^2 + 8m - 6 = 0!',
    arabicExaminerTrap: 'سحب m^2 = 0 ثم عدم تجربة الجذر m = 3 لتحليل القوس التكعيبي m^3 - 5m^2 + 8m - 6 = 0.',
    secretShortcut: 'Factor out m^2: m^2(m^3 - 5m^2 + 8m - 6) = 0. Test m = 3: 27 - 45 + 24 - 6 = 0! Synthetic division by (m - 3) gives m^2(m - 3)(m^2 - 2m + 2) = 0 → roots 0, 0, 3, 1 ± i.',
    steps: [
      {
        stepNumber: 1,
        title: 'Write Auxiliary Equation & Factor Out m²',
        arabicTitle: 'كتابة المعادلة المساعدة وأخذ m² كعامل مشترك',
        formula: "m^5 - 5m^4 + 8m^3 - 6m^2 = 0 \\implies m^2(m^3 - 5m^2 + 8m - 6) = 0",
        explanation: 'm^2 = 0 yields two roots: m_1 = m_2 = 0.',
        arabicExplanation: 'الحد m^2 = 0 يعطي جذرين صفريين m_1 = m_2 = 0.'
      },
      {
        stepNumber: 2,
        title: 'Factor Cubic at m = 3 and Solve Quadratic',
        arabicTitle: 'تحليل القوس التكعيبي عند m = 3 وحل التربيعية',
        formula: "m^2(m - 3)(m^2 - 2m + 2) = 0 \\implies m_1 = m_2 = 0,\\; m_3 = 3,\\; m_{4,5} = 1 \\pm i",
        explanation: 'm^2 - 2m + 2 = (m - 1)^2 + 1 = 0 gives m = 1 ± i.',
        arabicExplanation: 'القوس التربيعي يعطي الجذرين المركبين 1 ± i.'
      },
      {
        stepNumber: 3,
        title: 'Write 5-Constant General Solution',
        arabicTitle: 'كتابة الحل العام المكون من 5 ثوابت',
        formula: "y = C_1 + C_2 x + C_3 e^{3x} + e^x(C_4\\cos x + C_5\\sin x)",
        explanation: 'Combine polynomial, exponential, and damped sinusoid terms.',
        arabicExplanation: 'نجمع حدود الجذر الصفري المزدوج والحد الأسي والمركب.'
      }
    ],
    finalAnswerLatex: "y = C_1 + C_2 x + C_3 e^{3x} + e^x(C_4\\cos x + C_5\\sin x)",
    drillOptions: {
      methodChoices: [
        'Factor out m^2 = 0, test m = 3, then solve m^2 - 2m + 2 = 0',
        'Undetermined Coefficients',
        'Reduction of Order',
        'Variation of Parameters'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What are all 5 roots of m^5 - 5m^4 + 8m^3 - 6m^2 = 0?',
      keyStepChoices: [
        'm = 0, 0, 3, 1 ± i',
        'm = 0, 0, 0, 3, 2',
        'm = 0, 3, -1 ± i',
        'm = 0, 0, -3, 1 ± 2i'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'f21-q2b',
    numberLabel: 'Fall 2021 • Q2(b)',
    sourceExam: 'Midterm Exam Fall 2021–2022',
    sourceYear: '2021–2022',
    sourceFileUrl: '/assets/aistudio/Mid_Term_exam__Fall2022__1__9deffc90.pdf',
    points: 3,
    category: Category.UNDETERMINED_COEFFS,
    subCategory: 'Higher-Order ODE',
    methodTag: 'Undetermined Coefficients (Exponential RHS without Resonance)',
    arabicMethodTag: 'المعاملات غير المعينة (طرف أيمن أسي غير مكرر في المتجانس)',
    difficulty: 'Core',
    problemLatex: "y'' + 3y' - 4y = 2e^{2x}",
    visualRecognitionTrigger: '2nd-order linear ODE with constant coefficients and RHS = 2e^{2x}.',
    arabicVisualTrigger: 'معادلة من الرتبة الثانية بمعاملات ثابتة وطرف أيمن 2e^{2x}.',
    examinerTrap: 'Multiplying y_p by x unnecessarily! Here the homogeneous roots are m = 1 and m = -4. Since m = 2 is NOT a root of y_h, y_p is simply A e^{2x}!',
    arabicExaminerTrap: 'ضرب الفرض y_p في x بدون داعي! جذور المعادلة المتجانسة هي 1 و -4، وبما أن 2 ليس جذراً منها فإن الفرض هو A e^{2x} فقط.',
    secretShortcut: 'For y_p = A e^{2x} when m = 2 is not a root, you can plug m = 2 directly into the characteristic polynomial P(m) = m^2 + 3m - 4: P(2) = 4 + 6 - 4 = 6 ⇒ 6A = 2 ⇒ A = 1/3 in 5 seconds!',
    steps: [
      {
        stepNumber: 1,
        title: 'Find Homogeneous Solution y_h',
        arabicTitle: 'إيجاد الحل المتجانس y_h',
        formula: "m^2 + 3m - 4 = (m + 4)(m - 1) = 0 \\implies y_h = C_1 e^{-4x} + C_2 e^x",
        explanation: 'Auxiliary roots are m_1 = -4 and m_2 = 1.',
        arabicExplanation: 'جذور المعادلة المساعدة هي m = -4 و m = 1.'
      },
      {
        stepNumber: 2,
        title: 'Find Particular Solution y_p = A e^{2x}',
        arabicTitle: 'فرض الحل الخاص y_p = A e^{2x} وإيجاد قيمة A',
        formula: "y_p = Ae^{2x},\\; y_p' = 2Ae^{2x},\\; y_p'' = 4Ae^{2x} \\implies (4A + 6A - 4A)e^{2x} = 2e^{2x} \\implies 6A = 2 \\implies A = \\frac{1}{3}",
        explanation: 'Substitute y_p into the ODE to get 6A = 2, so A = 1/3.',
        arabicExplanation: 'بالتعويض في المعادلة نجد أن 6A = 2 ومنها A = 1/3.'
      }
    ],
    finalAnswerLatex: "y = C_1 e^{-4x} + C_2 e^x + \\frac{1}{3}e^{2x}",
    drillOptions: {
      methodChoices: [
        'Undetermined Coefficients with y_p = A e^{2x} (since m = 2 is not a root of m^2 + 3m - 4 = 0)',
        'Undetermined Coefficients with y_p = A x e^{2x}',
        'Reduction of Order',
        'Bernoulli Substitution'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the value of the coefficient A in y_p = A e^{2x} for y\'\' + 3y\' - 4y = 2e^{2x}?',
      keyStepChoices: [
        'A = 2 / (2^2 + 3(2) - 4) = 2 / 6 = 1/3',
        'A = 1/2',
        'A = 2',
        'A = -1/4'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'f21-q2c',
    numberLabel: 'Fall 2021 • Q2(c)',
    sourceExam: 'Midterm Exam Fall 2021–2022 & Sheet Q6',
    sourceYear: '2021–2022',
    sourceFileUrl: '/assets/aistudio/Mid_Term_exam__Fall2022__1__9deffc90.pdf',
    points: 4,
    category: Category.REDUCTION_OF_ORDER,
    subCategory: 'Higher-Order ODE',
    methodTag: 'Reduction of Order (Given y₁ = e^{2x})',
    arabicMethodTag: 'اختزال الرتبة (بمعلومية الحل المتجانس y = e^{2x})',
    difficulty: 'Boss',
    problemLatex: "y'' - 3y' + 2y = e^{2x}, \\quad \\text{given that } y = e^{2x} \\text{ is a homogeneous solution (Using Reduction of order)}",
    visualRecognitionTrigger: 'Explicitly commands "(Using Reduction of order)" with given solution y_1 = e^{2x} (also Question 6 in Fall 2027 Revision Sheet!).',
    arabicVisualTrigger: 'يطلب صراحةً الحل بطريقة اختزال الرتبة بمعلومية y = e^{2x} (وهي أيضاً المسألة رقم 6 في شيت المراجعة!).',
    examinerTrap: 'Solving by Undetermined Coefficients when the question explicitly specifies "(Using Reduction of order)"! You must write y = u e^{2x}, y\' = (u\' + 2u)e^{2x}, y\'\' = (u\'\' + 4u\' + 4u)e^{2x}.',
    arabicExaminerTrap: 'الحل بطريقة المعاملات غير المعينة بينما السؤال يشترط استخدام اختزال الرتبة! يجب فرض y = u e^{2x} والتعويض بالمشتقات.',
    secretShortcut: 'Substitute y = u e^{2x}, y\' = (u\' + 2u)e^{2x}, y\'\' = (u\'\' + 4u\' + 4u)e^{2x}. Notice 4u - 6u + 2u = 0! And e^{2x} cancels from both sides, leaving the ultra-simple equation u\'\' + u\' = 1!',
    steps: [
      {
        stepNumber: 1,
        title: 'Let y = u e^{2x} and Compute y\' and y\'\'',
        arabicTitle: 'فرض أن y = u e^{2x} وحساب المشتقة الأولى والثانية',
        formula: "y = ue^{2x} \\implies y' = u'e^{2x} + 2ue^{2x} \\implies y'' = (u'' + 4u' + 4u)e^{2x}",
        explanation: 'Factoring e^{2x} out of y\' and y\'\' makes substitution clean and fast.',
        arabicExplanation: 'أخذ e^{2x} كعامل مشترك من المشتقات يسهل التعويض جداً.'
      },
      {
        stepNumber: 2,
        title: 'Plug into ODE, Cancel u Terms, and Divide by e^{2x}',
        arabicTitle: 'التعويض في المعادلة واختصار حدود u والقسمة على e^{2x}',
        formula: "\\left[(u'' + 4u' + 4u) - 3(u' + 2u) + 2u\\right]e^{2x} = e^{2x} \\implies u'' + u' = 1",
        explanation: 'Notice (4 - 6 + 2)u = 0 and (4 - 3)u\' = u\'. Dividing by e^{2x} leaves u\'\' + u\' = 1.',
        arabicExplanation: 'يختصر معامل u تماماً (4 - 6 + 2 = 0)وبالقسمة على e^{2x} يتبقى u\'\' + u\' = 1.'
      },
      {
        stepNumber: 3,
        title: 'Let z = u\' and Solve z\' + z = 1 with μ = e^x',
        arabicTitle: 'وضع z = u\' وحل المعادلة الخطية بعامل التكامل μ = e^x',
        formula: "z = u',\\; z' + z = 1 \\implies \\mu = e^{\\int dx} = e^x \\implies z = e^{-x}\\left[\\int e^x\\,dx + C_1\\right] = 1 + C_1 e^{-x}",
        explanation: 'Solving for z = u\' gives u\' = 1 + C_1 e^{-x}.',
        arabicExplanation: 'بحل المعادلة الخطية نجد أن u\' = 1 + C_1 e^{-x}.'
      },
      {
        stepNumber: 4,
        title: 'Integrate u\' to Find u and Multiply by e^{2x}',
        arabicTitle: 'تكامل u\' لإيجاد u ثم الضرب في e^{2x}',
        formula: "u = x - C_1 e^{-x} + C_2 \\implies y = ue^{2x} = xe^{2x} - C_1 e^x + C_2 e^{2x}",
        explanation: 'Multiplying u by e^{2x} produces both the particular term x e^{2x} and the full homogeneous solution!',
        arabicExplanation: 'بضرب u في e^{2x} نحصل على الحل العام كاملاً.'
      }
    ],
    finalAnswerLatex: "y = xe^{2x} - C_1 e^x + C_2 e^{2x}",
    drillOptions: {
      methodChoices: [
        'Reduction of Order: let y = u e^{2x}, which reduces the ODE to u\'\' + u\' = 1',
        'Homogeneous Substitution y = x u',
        'Bernoulli Substitution',
        'Separable ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'When you substitute y = u e^{2x} into y\'\' - 3y\' + 2y = e^{2x} and divide by e^{2x}, what equation do you get for u?',
      keyStepChoices: [
        'u\'\' + u\' = 1',
        'u\'\' - 3u\' = 1',
        'u\'\' + 4u\' = e^{2x}',
        'u\'\' = 1'
      ],
      correctKeyStepIndex: 0
    }
  },

  // =========================================================================
  // PDF 2: REVISION SHEET FOR MIDTERM FALL 2027 - PART 1: 18 FIRST-ORDER ODEs
  // =========================================================================
  {
    id: 's27-fo-1',
    numberLabel: 'Sheet 2027 • 1st Order (1)',
    sourceExam: 'Official Revision Sheet Fall 2027',
    sourceYear: '2027 Revision',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2027__1__fc4471ef.pdf',
    points: 3,
    category: Category.SEPARATION,
    subCategory: 'First-Order ODE',
    methodTag: 'Separable ODE (Divide by e^{y²} · x²)',
    arabicMethodTag: 'فصل المتغيرات (القسمة على e^{y²} x²)',
    difficulty: 'Core',
    problemLatex: "e^{y^2}\\,dx + x^2 y\\,dy = 0",
    visualRecognitionTrigger: 'Sum of two products where each term can be split into pure x and pure y factors.',
    arabicVisualTrigger: 'مجموع حدين يمكن فصل المتغير x عن المتغير y فيهما بالقسمة.',
    examinerTrap: 'Trying to integrate e^{y^2} dy without the y factor! Always move e^{y^2} to the dy side (where y already sits!) as e^{-y^2} y dy, and move x^2 to the dx side as x^{-2} dx.',
    arabicExaminerTrap: 'محاولة إبقاء e^{y^2} في طرف dx! يجب نقلها إلى طرف y dy لتصبح y e^{-y^2} dy حتى تتوفر مشتقة الأس (-2y).',
    secretShortcut: 'Divide by x^2 e^{y^2} → ∫ x^{-2} dx + (-1/2) ∫ -2y e^{-y^2} dy = C → -1/x - (1/2)e^{-y^2} = C!',
    steps: [
      {
        stepNumber: 1,
        title: 'Separate Variables by Dividing by x² e^{y²}',
        arabicTitle: 'فصل المتغيرات بالقسمة على x² e^{y²}',
        formula: "x^{-2}\\,dx + ye^{-y^2}\\,dy = 0",
        explanation: 'Moving e^{y^2} to the denominator of the dy term makes its exponent negative: e^{-y^2}.',
        arabicExplanation: 'نقل e^{y^2} لمقام الحد الثاني يغير إشارة الأس إلى e^{-y^2}.'
      },
      {
        stepNumber: 2,
        title: 'Integrate Both Terms',
        arabicTitle: 'تكامل الحدين',
        formula: "\\int x^{-2}\\,dx - \\frac{1}{2}\\int (-2y)e^{-y^2}\\,dy = C \\implies -\\frac{1}{x} - \\frac{1}{2}e^{-y^2} = C",
        explanation: 'Derivative of -y^2 is -2y, so multiply and divide by -2.',
        arabicExplanation: 'مشتقة الأس (-y^2) هي (-2y) فنضرب في -1/2.'
      }
    ],
    finalAnswerLatex: "-\\frac{1}{x} - \\frac{1}{2}e^{-y^2} = C",
    drillOptions: {
      methodChoices: [
        'Separable ODE (divide by x^2 e^{y^2} to get x^{-2} dx + y e^{-y^2} dy = 0)',
        'Exact ODE',
        'Homogeneous ODE',
        'Linear ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'Why is y e^{-y^2} dy easy to integrate whereas e^{y^2} dx is not?',
      keyStepChoices: [
        'Because y is (-1/2) times the derivative of the exponent -y^2',
        'Because e^{-y^2} is a constant',
        'Because we use integration by parts',
        'Because y cancels with e'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's27-fo-2',
    numberLabel: 'Sheet 2027 • 1st Order (2)',
    sourceExam: 'Official Revision Sheet Fall 2027',
    sourceYear: '2027 Revision',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2027__1__fc4471ef.pdf',
    points: 2,
    category: Category.SEPARATION,
    subCategory: 'First-Order ODE',
    methodTag: 'Separable ODE (Power & Logarithm Separation)',
    arabicMethodTag: 'فصل المتغيرات المباشر',
    difficulty: 'Core',
    problemLatex: "(4 + x)y' = y^3",
    visualRecognitionTrigger: 'Pure x-factor (4+x) times dy/dx equals pure y-factor y^3.',
    arabicVisualTrigger: 'حاصل ضرب قوس في x مع y\' يساوي دالة في y فقط.',
    examinerTrap: 'Integrating y^{-3} dy as -1/(3y^2) instead of y^{-2}/(-2) = -1/(2y^2)!',
    arabicExaminerTrap: 'الخطأ في جمع الأس عند تكامل y^{-3} حيث (-3 + 1 = -2) وليس -3.',
    secretShortcut: '∫ y^{-3} dy = ∫ dx/(4+x) → -1/(2y^2) = ln|4+x| + C.',
    steps: [
      {
        stepNumber: 1,
        title: 'Separate Variables',
        arabicTitle: 'فصل المتغيرات',
        formula: "y^{-3}\\,dy = \\frac{1}{4 + x}\\,dx",
        explanation: 'Bring y^3 to the left as y^{-3} dy and (4+x) to the right as dx/(4+x).',
        arabicExplanation: 'ننقل y^3 للطرف الأيسر بأس سالب وننقل (4+x) للمقام الأيمن.'
      },
      {
        stepNumber: 2,
        title: 'Integrate Both Sides',
        arabicTitle: 'إجراء التكامل للطرفين',
        formula: "-\\frac{1}{2}y^{-2} = \\ln|4 + x| + C",
        explanation: 'Add 1 to the exponent -3 to get -2 and divide by -2.',
        arabicExplanation: 'نزيد الأس واحداً ليصبح -2 ونقسم على الأس الجديد.'
      }
    ],
    finalAnswerLatex: "-\\frac{1}{2y^2} = \\ln|4 + x| + C",
    drillOptions: {
      methodChoices: [
        'Separable ODE (∫ y^{-3} dy = ∫ dx/(4+x))',
        'Bernoulli ODE',
        'Homogeneous ODE',
        'Exact ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is ∫ y^{-3} dy?',
      keyStepChoices: [
        '-1 / (2y^2)',
        '-1 / (3y^2)',
        'ln|y^3|',
        '-1 / (4y^4)'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's27-fo-3',
    numberLabel: 'Sheet 2027 • 1st Order (3)',
    sourceExam: 'Official Revision Sheet Fall 2027',
    sourceYear: '2027 Revision',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2027__1__fc4471ef.pdf',
    points: 3,
    category: Category.SEPARATION,
    subCategory: 'First-Order ODE',
    methodTag: 'Separable ODE (Factoring e^x out of e^x + e^{x+2y})',
    arabicMethodTag: 'فصل المتغيرات (أخذ e^x عامل مشترك)',
    difficulty: 'Trick',
    problemLatex: "e^{2y}y' = e^x + e^{x+2y}",
    visualRecognitionTrigger: 'Compound exponent e^{x+2y} added to e^x on the RHS.',
    arabicVisualTrigger: 'وجود أس مركب e^{x+2y} مجموعاً مع e^x في الطرف الأيمن.',
    examinerTrap: 'Thinking e^x + e^{x+2y} cannot be separated! Split e^{x+2y} = e^x · e^{2y} and factor out e^x(1 + e^{2y}).',
    arabicExaminerTrap: 'الاعتقاد بأن الجمع يمنع فصل المتغيرات! نفك e^{x+2y} إلى e^x e^{2y} ونسحب e^x كعامل مشترك.',
    secretShortcut: 'e^{2y} dy/dx = e^x(1 + e^{2y}) → [1/2] ∫ 2e^{2y}/(1 + e^{2y}) dy = ∫ e^x dx → (1/2)ln(1 + e^{2y}) = e^x + C!',
    steps: [
      {
        stepNumber: 1,
        title: 'Split Compound Exponent & Factor Out e^x',
        arabicTitle: 'فك الأس المركب وسحب e^x كعامل مشترك',
        formula: "e^{2y}\\frac{dy}{dx} = e^x + e^x e^{2y} = e^x(1 + e^{2y})",
        explanation: 'Factoring e^x turns the right side into a product of x and y functions.',
        arabicExplanation: 'أخذ e^x عامل مشترك يحول الطرف الأيمن إلى حاصل ضرب.'
      },
      {
        stepNumber: 2,
        title: 'Separate Variables & Integrate',
        arabicTitle: 'فصل المتغيرات وإجراء التكامل',
        formula: "\\frac{1}{2}\\int \\frac{2e^{2y}}{1 + e^{2y}}\\,dy = \\int e^x\\,dx \\implies \\frac{1}{2}\\ln(1 + e^{2y}) = e^x + C",
        explanation: 'Derivative of (1 + e^{2y}) is 2e^{2y}, giving (1/2)ln(1 + e^{2y}).',
        arabicExplanation: 'مشتقة المقام (1 + e^{2y}) هي 2e^{2y} فنضرب في 1/2.'
      }
    ],
    finalAnswerLatex: "\\frac{1}{2}\\ln(1 + e^{2y}) = e^x + C",
    drillOptions: {
      methodChoices: [
        'Separable ODE after factoring e^x + e^{x+2y} = e^x(1 + e^{2y})',
        'First-Order Linear ODE',
        'Homogeneous ODE',
        'Bernoulli ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the integral ∫ e^{2y} / (1 + e^{2y}) dy?',
      keyStepChoices: [
        '(1/2) ln(1 + e^{2y})',
        'ln(1 + e^{2y})',
        'arctan(e^y)',
        'e^{2y} / 2'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's27-fo-4',
    numberLabel: 'Sheet 2027 • 1st Order (4)',
    sourceExam: 'Official Revision Sheet Fall 2027',
    sourceYear: '2027 Revision',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2027__1__fc4471ef.pdf',
    points: 2,
    category: Category.SEPARATION,
    subCategory: 'First-Order ODE',
    methodTag: 'Separable ODE (2y / (1 + y²) Logarithm Form)',
    arabicMethodTag: 'فصل المتغيرات (البسط مشتقة المقام)',
    difficulty: 'Core',
    problemLatex: "2xy\\,y' = 1 + y^2",
    visualRecognitionTrigger: '2y y\' on the left and (1 + y^2) on the right.',
    arabicVisualTrigger: 'وجود 2y y\' في الطرف الأيسر و (1 + y^2) في الأيمن.',
    examinerTrap: 'Dividing by 2y instead of keeping 2y together in the numerator! Note that 2y is the exact derivative of (1 + y^2).',
    arabicExaminerTrap: 'نقل الرقم 2 للطرف الآخر بينما وجود 2y في البسط يمثل مشتقة المقام (1 + y^2) جاهزة!',
    secretShortcut: '∫ 2y/(1 + y^2) dy = ∫ dx/x → ln(1 + y^2) = ln|x| + ln C → 1 + y^2 = Cx!',
    steps: [
      {
        stepNumber: 1,
        title: 'Separate Variables Keeping 2y in the Numerator',
        arabicTitle: 'فصل المتغيرات مع إبقاء 2y في البسط',
        formula: "\\frac{2y}{1 + y^2}\\,dy = \\frac{1}{x}\\,dx",
        explanation: '2y is the exact derivative of 1 + y^2.',
        arabicExplanation: 'البسط 2y هو مشتقة المقام 1 + y^2 تماماً.'
      },
      {
        stepNumber: 2,
        title: 'Integrate Both Sides',
        arabicTitle: 'تكامل الطرفين',
        formula: "\\ln(1 + y^2) = \\ln|x| + C \\quad \\text{(or } 1 + y^2 = C_1 x\\text{)}",
        explanation: 'Both integrals yield natural logarithms.',
        arabicExplanation: 'كلا التكاملين يعطي لوغاريتم طبيعي.'
      }
    ],
    finalAnswerLatex: "\\ln(1 + y^2) = \\ln|x| + C",
    drillOptions: {
      methodChoices: [
        'Separable ODE (∫ 2y/(1+y^2) dy = ∫ dx/x)',
        'Homogeneous ODE',
        'Exact ODE',
        'Undetermined Coefficients'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is ∫ 2y / (1 + y^2) dy?',
      keyStepChoices: [
        'ln(1 + y^2)',
        '2 arctan(y)',
        '(1 + y^2)^2',
        'ln|y|'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's27-fo-5',
    numberLabel: 'Sheet 2027 • 1st Order (5)',
    sourceExam: 'Official Revision Sheet Fall 2027',
    sourceYear: '2027 Revision',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2027__1__fc4471ef.pdf',
    points: 3,
    category: Category.SEPARATION,
    subCategory: 'First-Order ODE',
    methodTag: 'Separable ODE (With Integration by Parts ∫ y e^{-y} dy)',
    arabicMethodTag: 'فصل المتغيرات (مع تكامل بالتجزيء y e^{-y})',
    difficulty: 'Core',
    problemLatex: "ye^{-y}y' = \\sin x",
    visualRecognitionTrigger: 'Pure y-function y e^{-y} times y\' equals pure x-function sin(x).',
    arabicVisualTrigger: 'دالة في y فقط مضروبة في y\' تساوي دالة في x فقط.',
    examinerTrap: 'Sign errors when integrating ∫ y e^{-y} dy by parts! Using Tabular DI: (+)(y)(-e^{-y}) - (-)(1)(e^{-y}) = -y e^{-y} - e^{-y}.',
    arabicExaminerTrap: 'الخطأ في الإشارات أثناء التكامل بالتجزيء للمقدار y e^{-y}. كلا الحدين سالب: -y e^{-y} - e^{-y}.',
    secretShortcut: 'Already separated! Write ∫ y e^{-y} dy = ∫ sin x dx → -y e^{-y} - e^{-y} = -cos x + C.',
    steps: [
      {
        stepNumber: 1,
        title: 'Write Separated Integrals',
        arabicTitle: 'كتابة التكامل بعد فصل المتغيرات',
        formula: "\\int ye^{-y}\\,dy = \\int \\sin x\\,dx",
        explanation: 'Multiply both sides by dx.',
        arabicExplanation: 'نضرب الطرفين في dx.'
      },
      {
        stepNumber: 2,
        title: 'Integrate Left Side by Parts (Tabular DI) & Right Side Directly',
        arabicTitle: 'إجراء التكامل بالتجزيء للطرف الأيسر',
        formula: "-ye^{-y} - e^{-y} = -\\cos x + C",
        explanation: 'For ∫ y e^{-y} dy: u = y, dv = e^{-y} dy ⇒ -y e^{-y} - ∫ (-e^{-y}) dy = -y e^{-y} - e^{-y}.',
        arabicExplanation: 'بالتجزيء نحصل على -y e^{-y} - e^{-y} وفي الطرف الأيمن -cos x + C.'
      }
    ],
    finalAnswerLatex: "-ye^{-y} - e^{-y} = -\\cos x + C",
    drillOptions: {
      methodChoices: [
        'Separable ODE + Integration by Parts on ∫ y e^{-y} dy',
        'First-Order Linear ODE',
        'Bernoulli ODE',
        'Homogeneous ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the result of ∫ y e^{-y} dy?',
      keyStepChoices: [
        '-y e^{-y} - e^{-y}',
        '-y e^{-y} + e^{-y}',
        'y e^{-y} - e^{-y}',
        '(y^2 / 2) e^{-y}'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's27-fo-6',
    numberLabel: 'Sheet 2027 • 1st Order (6)',
    sourceExam: 'Official Revision Sheet Fall 2027',
    sourceYear: '2027 Revision',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2027__1__fc4471ef.pdf',
    points: 3,
    category: Category.HOMOGENEOUS,
    subCategory: 'First-Order ODE',
    methodTag: 'Homogeneous ODE (Degree 2 Polynomials)',
    arabicMethodTag: 'معادلة متجانسة من الدرجة الثانية',
    difficulty: 'Core',
    problemLatex: "(x^2 - xy + y^2)\\,dx - xy\\,dy = 0",
    visualRecognitionTrigger: 'Every term (x^2, xy, y^2, xy) has total degree 2!',
    arabicVisualTrigger: 'جميع الحدود (x^2, xy, y^2) متساوية في مجموع الأسس (الدرجة الثانية).',
    examinerTrap: 'Trying to solve as Exact when M_y = -x + 2y ≠ N_x = -y! Since every term is degree 2, it is 100% Homogeneous.',
    arabicExaminerTrap: 'محاولة حلها كمعادلة تامة بينما هي معادلة متجانسة لأن كل حدودها من الدرجة الثانية.',
    secretShortcut: 'Rearrange to y\' = (x^2 - xy + y^2)/(xy) = (1 - u + u^2)/u. Then x u\' + u = 1/u - 1 + u. The +u cancels on both sides, leaving u/(1 - u) du = dx/x!',
    steps: [
      {
        stepNumber: 1,
        title: 'Isolate y\' and Divide Numerator & Denominator by x²',
        arabicTitle: 'فصل y\' وقسمة البسط والمقام على x²',
        formula: "y' = \\frac{x^2 - xy + y^2}{xy} = \\frac{1 - (y/x) + (y/x)^2}{y/x}",
        explanation: 'Every term is expressed in terms of u = y/x.',
        arabicExplanation: 'نكتب المعادلة بدلالة u = y/x.'
      },
      {
        stepNumber: 2,
        title: 'Substitute u = y/x, y\' = xu\' + u and Simplify',
        arabicTitle: 'التعويض بـ u = y/x واختصار الحدود',
        formula: "xu' + u = \\frac{1 - u + u^2}{u} \\implies xu' = \\frac{1 - u + u^2 - u^2}{u} = \\frac{1 - u}{u}",
        explanation: 'Moving +u to the right subtracts u^2/u, canceling +u^2 cleanly!',
        arabicExplanation: 'نقل u للطرف الأيمن وتوحيد المقامات يختصر u^2 مع -u^2!'
      },
      {
        stepNumber: 3,
        title: 'Separate Variables & Integrate via Long Division (u / (1-u) = -1 + 1/(1-u))',
        arabicTitle: 'فصل المتغيرات وإجراء التكامل',
        formula: "\\int \\frac{u}{1 - u}\\,du = \\int \\left(-1 + \\frac{1}{1 - u}\\right)du = \\int \\frac{dx}{x} \\implies -u - \\ln|1 - u| = \\ln|x| + C",
        explanation: 'Rewrite u/(1-u) as (-1 + u + 1)/(1-u) = -1 + 1/(1-u), then replace u = y/x.',
        arabicExplanation: 'نبسط الكسر بإضافة وطرح 1 في البسط ثم نكامل ونعيد u = y/x.'
      }
    ],
    finalAnswerLatex: "-\\frac{y}{x} - \\ln\\left|1 - \\frac{y}{x}\\right| = \\ln|x| + C",
    drillOptions: {
      methodChoices: [
        'Homogeneous ODE (all terms have degree 2, use u = y/x)',
        'Exact ODE',
        'Bernoulli ODE',
        'Separable ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'After substituting y = xu into y\' = (1 - u + u^2)/u, what does x u\' equal?',
      keyStepChoices: [
        '(1 - u) / u',
        '(1 + u^2) / u',
        '1 / u',
        '-u'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's27-fo-7',
    numberLabel: 'Sheet 2027 • 1st Order (7)',
    sourceExam: 'Official Revision Sheet Fall 2027',
    sourceYear: '2027 Revision',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2027__1__fc4471ef.pdf',
    points: 3,
    category: Category.HOMOGENEOUS,
    subCategory: 'First-Order ODE',
    methodTag: 'Homogeneous Rational ODE (Degree 2 / Degree 2)',
    arabicMethodTag: 'معادلة متجانسة كسرية من الدرجة الثانية',
    difficulty: 'Core',
    problemLatex: "y' = \\frac{2xy}{3x^2 - y^2}",
    visualRecognitionTrigger: 'Fraction where numerator (2xy) is degree 2 and denominator (3x^2 - y^2) is degree 2.',
    arabicVisualTrigger: 'كسر بسطه من الدرجة الثانية ومقامه من الدرجة الثانية.',
    examinerTrap: 'Sign mistakes when combining 2u/(3 - u^2) - u = (2u - 3u + u^3)/(3 - u^2) = u(u^2 - 1)/(3 - u^2).',
    arabicExaminerTrap: 'الخطأ في توحيد المقامات عند طرح u من الطرف الأيمن.',
    secretShortcut: 'Divide top and bottom by x^2 → y\' = 2u/(3 - u^2) → x u\' = u(u^2 - 1)/(3 - u^2) → separate and use partial fractions!',
    steps: [
      {
        stepNumber: 1,
        title: 'Divide Top & Bottom by x² and Let u = y/x',
        arabicTitle: 'قسمة البسط والمقام على x² والتعويض بـ u = y/x',
        formula: "xu' + u = \\frac{2u}{3 - u^2} \\implies xu' = \\frac{2u - 3u + u^3}{3 - u^2} = \\frac{u(u^2 - 1)}{3 - u^2}",
        explanation: 'Combine over common denominator (3 - u^2).',
        arabicExplanation: 'بتوحيد المقامات نحصل على u(u^2 - 1)/(3 - u^2).'
      },
      {
        stepNumber: 2,
        title: 'Separate Variables & Decompose via Partial Fractions',
        arabicTitle: 'فصل المتغيرات واستخدام الكسور الجزئية',
        formula: "\\int \\frac{3 - u^2}{u(u^2 - 1)}\\,du = \\int \\left(\\frac{-3}{u} + \\frac{2u}{u^2 - 1}\\right)du = \\int \\frac{dx}{x}",
        explanation: 'Notice (-3)(u^2 - 1) + 2u(u) = -3u^2 + 3 + 2u^2 = 3 - u^2!',
        arabicExplanation: 'نحلل الكسر إلى -3/u + 2u/(u^2 - 1) حيث البسط مشتقة المقام.'
      },
      {
        stepNumber: 3,
        title: 'Integrate and Simplify Logs',
        arabicTitle: 'التكامل وتبسيط اللوغاريتمات',
        formula: "-3\\ln|u| + \\ln|u^2 - 1| = \\ln|x| + \\ln C \\implies \\frac{(y/x)^2 - 1}{(y/x)^3} = Cx \\implies y^2 - x^2 = Cy^3",
        explanation: 'Using logarithm properties yields the clean algebraic curve y^2 - x^2 = C y^3.',
        arabicExplanation: 'باستخدام خواص اللوغاريتمات والتعويض عن u = y/x نحصل على الحل.'
      }
    ],
    finalAnswerLatex: "\\ln\\left|\\left(\\frac{y}{x}\\right)^2 - 1\\right| - 3\\ln\\left|\\frac{y}{x}\\right| = \\ln|x| + C",
    drillOptions: {
      methodChoices: [
        'Homogeneous ODE (divide numerator and denominator by x^2 and let u = y/x)',
        'Separable ODE directly',
        'Exact ODE',
        'Linear ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'How do you recognize y\' = 2xy / (3x^2 - y^2) as Homogeneous?',
      keyStepChoices: [
        'Every term in the numerator (2xy) and denominator (3x^2, -y^2) has degree 2',
        'It has constant coefficients',
        'M_y = N_x',
        'It is linear in y'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's27-fo-8',
    numberLabel: 'Sheet 2027 • 1st Order (8)',
    sourceExam: 'Official Revision Sheet Fall 2027',
    sourceYear: '2027 Revision',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2027__1__fc4471ef.pdf',
    points: 3,
    category: Category.REDUCIBLE_SEPARATION,
    subCategory: 'First-Order ODE',
    methodTag: 'Reducible to Separable (Parallel Lines: z = y + 2x)',
    arabicMethodTag: 'تؤول إلى فصل المتغيرات (المستقيمات المتوازية z = y + 2x)',
    difficulty: 'Trick',
    problemLatex: "y' = \\frac{1 - 2y - 4x}{1 + y + 2x}",
    visualRecognitionTrigger: 'Notice that -2y - 4x = -2(y + 2x), which is a multiple of (y + 2x) in the denominator!',
    arabicVisualTrigger: 'لاحظ أن (-2y - 4x) هو ضعف المقدار (y + 2x) الموجود في المقام بإشارة سالبة!',
    examinerTrap: 'Using the long intersecting-lines substitution (X = x - h, Y = y - k) when the lines are PARALLEL! Here a1/a2 = b1/b2 = -2, so a simple 1-step substitution z = y + 2x solves it immediately!',
    arabicExaminerTrap: 'محاولة حل معادلتي المستقيمين لإيجاد نقطة التقاطع بينما المستقيمان متوازيان! يكفي وضع z = y + 2x فقط.',
    secretShortcut: 'Rewrite numerator as 1 - 2(y + 2x). Let z = y + 2x → z\' = y\' + 2 → y\' = z\' - 2. Then z\' - 2 = (1 - 2z)/(1 + z) → z\' = 3/(1 + z)! Wait: (1 - 2z)/(1 + z) + 2 = (1 - 2z + 2 + 2z)/(1 + z) = 3/(1 + z)! The -2z and +2z cancel out completely!',
    steps: [
      {
        stepNumber: 1,
        title: 'Factor -2(y + 2x) & Substitute z = y + 2x',
        arabicTitle: 'أخذ -2 عامل مشترك والتعويض بـ z = y + 2x',
        formula: "y' = \\frac{1 - 2(y + 2x)}{1 + (y + 2x)}, \\quad z = y + 2x \\implies z' = y' + 2 \\implies y' = z' - 2",
        explanation: 'Both numerator and denominator depend only on the combination z = y + 2x.',
        arabicExplanation: 'البسط والمقام يعتمدان على التركيبة الخطية z = y + 2x.'
      },
      {
        stepNumber: 2,
        title: 'Move -2 to RHS & Watch 2z Cancel Out',
        arabicTitle: 'نقل -2 للطرف الأيمن واختصار 2z',
        formula: "z' = \\frac{1 - 2z}{1 + z} + 2 = \\frac{1 - \\cancel{2z} + 2 + \\cancel{2z}}{1 + z} = \\frac{3}{1 + z}",
        explanation: 'Adding 2 over the common denominator (1 + z) cancels -2z and +2z!',
        arabicExplanation: 'عند توحيد المقامات يختصر -2z مع +2z ويتبقى 3/(1+z)!'
      },
      {
        stepNumber: 3,
        title: 'Separate Variables & Integrate',
        arabicTitle: 'فصل المتغيرات والتكامل',
        formula: "\\int (1 + z)\\,dz = \\int 3\\,dx \\implies z + \\frac{z^2}{2} = 3x + C \\implies (y + 2x) + \\frac{(y + 2x)^2}{2} = 3x + C",
        explanation: 'Multiply by (1 + z) dx, integrate, and substitute z = y + 2x.',
        arabicExplanation: 'نكامل الطرفين ونعيد z إلى أصلها y + 2x.'
      }
    ],
    finalAnswerLatex: "(y + 2x) + \\frac{1}{2}(y + 2x)^2 = 3x + C",
    drillOptions: {
      methodChoices: [
        'Reducible to Separable via substitution z = y + 2x (since -2y - 4x = -2(y + 2x))',
        'Homogeneous Substitution u = y/x',
        'Exact ODE',
        'Bernoulli ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'When you substitute z = y + 2x (so y\' = z\' - 2) into y\' = (1 - 2z)/(1 + z), what does z\' simplify to?',
      keyStepChoices: [
        'z\' = 3 / (1 + z)',
        'z\' = (1 - 4z) / (1 + z)',
        'z\' = 1 / z',
        'z\' = 1 + z'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's27-fo-9',
    numberLabel: 'Sheet 2027 • 1st Order (9)',
    sourceExam: 'Official Revision Sheet Fall 2027',
    sourceYear: '2027 Revision',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2027__1__fc4471ef.pdf',
    points: 3,
    category: Category.EXACT_EQUATIONS,
    subCategory: 'First-Order ODE',
    methodTag: 'Exact ODE (Product Rule Check on (1+y)e^y)',
    arabicMethodTag: 'معادلة تامة (مع تكامل حاصل ضرب (1+y)e^y)',
    difficulty: 'Core',
    problemLatex: "ye^x\\,dx + \\left[e^x + (1 + y)e^y\\right]dy = 0",
    visualRecognitionTrigger: 'Form M dx + N dy = 0 where M_y = e^x and N_x = e^x.',
    arabicVisualTrigger: 'الصورة M dx + N dy = 0 حيث M_y = N_x = e^x.',
    examinerTrap: 'Taking too long on ∫ (1 + y)e^y dy! Notice that d/dy (y e^y) = 1·e^y + y e^y = (1 + y)e^y, so its integral is simply y e^y!',
    arabicExaminerTrap: 'إضاعة الوقت في تكامل (1 + y)e^y بينما هو مشتقة حاصل الضرب d/dy(y e^y) مباشرةً!',
    secretShortcut: 'M_y = e^x = N_x (Exact). Integrate M dx → y e^x. Integrate N dy → y e^x (slashed!) + y e^y = C!',
    steps: [
      {
        stepNumber: 1,
        title: 'Test for Exactness (M_y = N_x)',
        arabicTitle: 'اختبار التمام (M_y = N_x)',
        formula: "M_y = \\frac{\\partial}{\\partial y}(ye^x) = e^x, \\quad N_x = \\frac{\\partial}{\\partial x}\\left[e^x + (1 + y)e^y\\right] = e^x \\implies M_y = N_x \\text{ (Exact)}",
        explanation: 'Both partial derivatives equal e^x.',
        arabicExplanation: 'المشتقتان الجزئيتان متساويتان وتساويان e^x.'
      },
      {
        stepNumber: 2,
        title: 'Integrate Both Parts & Slash Duplicate y e^x',
        arabicTitle: 'تكامل الجزئين وشطب الحد المكرر y e^x',
        formula: "\\int ye^x\\,dx + \\int \\left[e^x + (1 + y)e^y\\right]dy = C \\implies ye^x + \\cancel{ye^x} + ye^y = C",
        explanation: 'Integral of (1 + y)e^y dy is y e^y (by product rule or integration by parts).',
        arabicExplanation: 'تكامل (1 + y)e^y بالنسبة لـ y هو y e^y.'
      }
    ],
    finalAnswerLatex: "ye^x + ye^y = C",
    drillOptions: {
      methodChoices: [
        'Exact ODE (since M_y = N_x = e^x)',
        'Homogeneous ODE',
        'Separable ODE',
        'Bernoulli ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the integral ∫ (1 + y)e^y dy?',
      keyStepChoices: [
        'y e^y',
        '(1 + y)e^y',
        'y^2 e^y / 2',
        'e^y'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's27-fo-10',
    numberLabel: 'Sheet 2027 • 1st Order (10)',
    sourceExam: 'Official Revision Sheet Fall 2027',
    sourceYear: '2027 Revision',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2027__1__fc4471ef.pdf',
    points: 3,
    category: Category.EXACT_EQUATIONS,
    subCategory: 'First-Order ODE',
    methodTag: 'Non-Exact ODE with Integrating Factor μ(x) = x^{-2}',
    arabicMethodTag: 'معادلة غير تامة تُحل بعامل التكامل μ(x) = x^{-2}',
    difficulty: 'Trick',
    problemLatex: "(\\cot y + x^2)\\,dx = x\\csc^2 y\\,dy",
    visualRecognitionTrigger: 'Contains cot(y) dx and x csc^2(y) dy (note derivative of cot(y) is -csc^2(y)!).',
    arabicVisualTrigger: 'تحتوي على cot(y) في طرف ومشتقتها csc^2(y) في الطرف الآخر.',
    examinerTrap: 'Forgetting to move x csc^2(y) dy to the left side with a MINUS sign before computing N_x! Written as (cot y + x^2)dx - x csc^2(y) dy = 0, we have M_y = -csc^2(y) and N_x = -csc^2(y)? Wait: let\'s check! M_y = -csc^2(y) and N = -x csc^2(y) ⇒ N_x = -csc^2(y)! IT IS ALREADY EXACT once moved to the left side!',
    arabicExaminerTrap: 'نسيان نقل الحد الأيمن للطرف الأيسر بإشارة سالبة! بمجرد كتابتها على الصورة (cot y + x^2)dx - x csc^2(y)dy = 0 نكتشف أن M_y = -csc^2(y) و N_x = -csc^2(y) أي أنها تامة فوراً!',
    secretShortcut: 'Move RHS to LHS: (cot y + x^2)dx - x csc^2(y)dy = 0. Check exactness: M_y = -csc^2(y) and N_x = -csc^2(y)! It is ALREADY EXACT without any integrating factor!',
    steps: [
      {
        stepNumber: 1,
        title: 'Move All Terms to Left Side in Standard Form M dx + N dy = 0',
        arabicTitle: 'نقل جميع الحدود للطرف الأيسر في الصورة القياسية M dx + N dy = 0',
        formula: "(\\cot y + x^2)\\,dx - x\\csc^2 y\\,dy = 0",
        explanation: 'Here M = cot(y) + x^2 and N = -x csc^2(y).',
        arabicExplanation: 'تصبح M = cot(y) + x^2 بينما N = -x csc^2(y).'
      },
      {
        stepNumber: 2,
        title: 'Verify Exactness (M_y = N_x = -csc² y)',
        arabicTitle: 'اختبار شرط التمام (M_y = N_x = -csc² y)',
        formula: "M_y = -\\csc^2 y, \\quad N_x = -\\csc^2 y \\implies M_y = N_x \\text{ (Exact!)}",
        explanation: 'Because the derivative of cot(y) is -csc^2(y), moving the RHS to the left makes M_y = N_x.',
        arabicExplanation: 'مشتقة cot(y) هي -csc^2(y) فتتساوى المشتقتان الجزئيتان فوراً.'
      },
      {
        stepNumber: 3,
        title: 'Integrate & Slash Duplicate x cot(y)',
        arabicTitle: 'إجراء التكامل وشطب الحد المكرر x cot(y)',
        formula: "\\int (\\cot y + x^2)\\,dx + \\int (-x\\csc^2 y)\\,dy = C \\implies x\\cot y + \\frac{x^3}{3} + \\cancel{x\\cot y} = C",
        explanation: 'Note that ∫ -csc^2(y) dy = +cot(y). Slash the duplicate x cot(y) term.',
        arabicExplanation: 'تكامل -csc^2(y) هو cot(y)، ونشطب الحد المكرر x cot(y).'
      }
    ],
    finalAnswerLatex: "x\\cot y + \\frac{x^3}{3} = C",
    drillOptions: {
      methodChoices: [
        'Move RHS to LHS: (cot y + x^2)dx - x csc^2(y)dy = 0, which is immediately Exact (M_y = N_x = -csc^2 y)',
        'Homogeneous Substitution u = y/x',
        'Separable ODE',
        'Bernoulli ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'When you rewrite (cot y + x^2)dx = x csc^2(y)dy as (cot y + x^2)dx - x csc^2(y)dy = 0, what are M_y and N_x?',
      keyStepChoices: [
        'M_y = -csc^2(y) and N_x = -csc^2(y), so it is already Exact!',
        'M_y = csc^2(y) and N_x = -csc^2(y)',
        'M_y = sec^2(y) and N_x = csc^2(y)',
        'M_y = 2x and N_x = 0'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's27-fo-11',
    numberLabel: 'Sheet 2027 • 1st Order (11)',
    sourceExam: 'Official Revision Sheet Fall 2027',
    sourceYear: '2027 Revision',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2027__1__fc4471ef.pdf',
    points: 3,
    category: Category.EXACT_EQUATIONS,
    subCategory: 'First-Order ODE',
    methodTag: 'Non-Exact ODE with Integrating Factor μ(x) = e^x',
    arabicMethodTag: 'معادلة غير تامة تُحل بعامل التكامل μ(x) = e^x',
    difficulty: 'Boss',
    problemLatex: "(1 + y^2 + xy^2)\\,dx + y(x^2 + 2x + 1)\\,dy = 0",
    visualRecognitionTrigger: 'M dx + N dy = 0 where M_y = 2y(1 + x) and N_x = y(2x + 2) = 2y(x + 1)... wait: check M_y vs N_x!',
    arabicVisualTrigger: 'افحص شرط التمام أولاً: M_y = 2y + 2xy بينما N_x = 2xy + 2y!',
    examinerTrap: 'Looking at the complicated brackets and assuming it needs an integrating factor WITHOUT checking M_y and N_x first! Look closely: M_y = 2y + 2xy and N_x = y(2x + 2) = 2xy + 2y. M_y = N_x! It is ALREADY EXACT!',
    arabicExaminerTrap: 'التسرع في البحث عن عامل تكامل بسبب شكل الأقواس دون حساب M_y و N_x أولاً! المفاجأة أن M_y = 2y + 2xy و N_x = 2xy + 2y أي أنها معادلة تامة جاهزة!',
    secretShortcut: 'Always test M_y vs N_x FIRST! M_y = 2y + 2xy and N_x = 2xy + 2y → Exact! Integrate directly in 1 line!',
    steps: [
      {
        stepNumber: 1,
        title: 'Test for Exactness (M_y vs N_x)',
        arabicTitle: 'اختبار شرط التمام (M_y = N_x)',
        formula: "M_y = 2y + 2xy, \\quad N_x = y(2x + 2) = 2xy + 2y \\implies M_y = N_x \\text{ (Exact!)}",
        explanation: 'Expanding N_x reveals it is identical to M_y.',
        arabicExplanation: 'بفك القوس نجد أن المشتقتين الجزئيتين متطابقتان تماماً.'
      },
      {
        stepNumber: 2,
        title: 'Integrate Both Parts & Strike Out Duplicates',
        arabicTitle: 'تكامل الحدين وشطب الحدود المكررة',
        formula: "\\int (1 + y^2 + xy^2)\\,dx + \\int (x^2y + 2xy + y)\\,dy = C \\implies x + xy^2 + \\frac{1}{2}x^2y^2 + \\cancel{\\frac{1}{2}x^2y^2} + \\cancel{xy^2} + \\frac{1}{2}y^2 = C",
        explanation: 'Both x^2 y^2 / 2 and x y^2 from the second integral are duplicates and get slashed out.',
        arabicExplanation: 'نشطب الحدين المكررين من التكامل الثاني.'
      }
    ],
    finalAnswerLatex: "x + xy^2 + \\frac{1}{2}x^2y^2 + \\frac{1}{2}y^2 = C",
    drillOptions: {
      methodChoices: [
        'Already Exact ODE (since M_y = 2y + 2xy = N_x)',
        'Non-Exact ODE requiring μ(x)',
        'Homogeneous ODE',
        'Bernoulli ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What do you find when you compute M_y and N_x for (1 + y^2 + xy^2)dx + y(x^2 + 2x + 1)dy = 0?',
      keyStepChoices: [
        'M_y = 2y + 2xy and N_x = 2xy + 2y, so it is already Exact!',
        'M_y ≠ N_x, so μ = e^x',
        'M_y = 0 and N_x = 0',
        'It is a separable equation'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's27-fo-12',
    numberLabel: 'Sheet 2027 • 1st Order (12)',
    sourceExam: 'Official Revision Sheet Fall 2027',
    sourceYear: '2027 Revision',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2027__1__fc4471ef.pdf',
    points: 3,
    category: Category.EXACT_EQUATIONS,
    subCategory: 'First-Order ODE',
    methodTag: 'Non-Exact ODE with Integrating Factor μ(x) = x^{-2}',
    arabicMethodTag: 'معادلة غير تامة تُحل بعامل التكامل μ(x) = x^{-2}',
    difficulty: 'Trick',
    problemLatex: "(2xy - \\tan y)\\,dx + (x^2 - x\\sec^2 y)\\,dy = 0",
    visualRecognitionTrigger: 'M dx + N dy = 0 where M_y = 2x - sec^2(y) and N_x = 2x - sec^2(y)... wait: check M_y and N_x!',
    arabicVisualTrigger: 'احسب المشتقات الجزئية: M_y = 2x - sec^2(y) و N_x = 2x - sec^2(y)!',
    examinerTrap: 'Getting tricked by the minus signs! Here M_y = 2x - sec^2(y) and N_x = 2x - sec^2(y). They are EQUAL! So it is ALREADY EXACT!',
    arabicExaminerTrap: 'مشتقة tan(y) هي sec^2(y)، وعند حساب M_y نحصل على 2x - sec^2(y) وعند حساب N_x نحصل على 2x - sec^2(y) أيضاً! المعادلة تامة مباشرة!',
    secretShortcut: 'M_y = 2x - sec^2(y) = N_x → Exact! Integrate M w.r.t. x to get x^2 y - x tan(y), and notice ∂/∂y(x^2 y - x tan y) = x^2 - x sec^2(y) = N! So every single term in ∫ N dy is a duplicate and gets slashed out!',
    steps: [
      {
        stepNumber: 1,
        title: 'Test for Exactness (M_y = N_x)',
        arabicTitle: 'اختبار شرط التمام (M_y = N_x)',
        formula: "M_y = 2x - \\sec^2 y, \\quad N_x = 2x - \\sec^2 y \\implies M_y = N_x \\text{ (Exact)}",
        explanation: 'Since d/dy(tan y) = sec^2(y), M_y = N_x.',
        arabicExplanation: 'المشتقتان الجزئيتان متساويتان وتساويان 2x - sec^2(y).'
      },
      {
        stepNumber: 2,
        title: 'Integrate Both Parts & Slash Duplicates',
        arabicTitle: 'تكامل الجزئين وشطب الحدود المكررة',
        formula: "\\int (2xy - \\tan y)\\,dx + \\int (x^2 - x\\sec^2 y)\\,dy = C \\implies x^2y - x\\tan y + \\cancel{x^2y} - \\cancel{x\\tan y} = C",
        explanation: 'Both terms from the second integral already appeared in the first integral.',
        arabicExplanation: 'كلا الحدين في التكامل الثاني مكرر فيتم شطبهما.'
      }
    ],
    finalAnswerLatex: "x^2y - x\\tan y = C",
    drillOptions: {
      methodChoices: [
        'Exact ODE (since M_y = N_x = 2x - sec^2 y)',
        'Non-Exact ODE',
        'Homogeneous ODE',
        'Separable ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the final general solution of (2xy - tan y)dx + (x^2 - x sec^2 y)dy = 0?',
      keyStepChoices: [
        'x^2 y - x tan(y) = C',
        '2x^2 y - 2x tan(y) = C',
        'x^2 y + x sec^2(y) = C',
        'xy^2 - tan(y) = C'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's27-fo-13',
    numberLabel: 'Sheet 2027 • 1st Order (13)',
    sourceExam: 'Official Revision Sheet Fall 2027',
    sourceYear: '2027 Revision',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2027__1__fc4471ef.pdf',
    points: 3,
    category: Category.EXACT_EQUATIONS,
    subCategory: 'First-Order ODE',
    methodTag: 'Non-Exact ODE with Integrating Factor μ(x) = x',
    arabicMethodTag: 'معادلة غير تامة تُحل بعامل التكامل μ(x) = x',
    difficulty: 'Boss',
    problemLatex: "(3xy - 4y - 1)\\,dx + x(x - 2)\\,dy = 0",
    visualRecognitionTrigger: 'M dx + N dy = 0 where M_y = 3x - 4 and N_x = 2x - 2 (M_y ≠ N_x).',
    arabicVisualTrigger: 'معادلة على الصورة M dx + N dy = 0 حيث M_y = 3x - 4 بينما N_x = 2x - 2 (غير تامة).',
    examinerTrap: 'Not noticing that M_y - N_x = (3x - 4) - (2x - 2) = x - 2, which cancels the (x - 2) factor in N = x(x - 2)!',
    arabicExaminerTrap: 'عدم ملاحظة أن حاصل الطرح M_y - N_x يعطي (x - 2) فيختصر مع القوس (x - 2) الموجود في N = x(x - 2)!',
    secretShortcut: 'M_y - N_x = x - 2. Divide by N = x(x - 2) → (M_y - N_x)/N = 1/x → μ(x) = e^{∫ (1/x) dx} = x! Multiply by x and integrate!',
    steps: [
      {
        stepNumber: 1,
        title: 'Check Exactness & Compute Integrating Factor μ(x) = x',
        arabicTitle: 'اختبار التمام وحساب عامل التكامل μ(x) = x',
        formula: "M_y = 3x - 4,\\quad N = x^2 - 2x \\implies N_x = 2x - 2 \\implies \\frac{M_y - N_x}{N} = \\frac{x - 2}{x(x - 2)} = \\frac{1}{x} \\implies \\mu = e^{\\int \\frac{1}{x}dx} = x",
        explanation: 'Dividing M_y - N_x by N cancels (x - 2) and leaves 1/x.',
        arabicExplanation: 'بقسمة الفرق على N يختصر القوس (x - 2) ويتبقى 1/x ومنها μ = x.'
      },
      {
        stepNumber: 2,
        title: 'Multiply ODE by μ = x & Integrate',
        arabicTitle: 'ضرب المعادلة في x ثم إجراء التكامل وشطب المكرر',
        formula: "\\int (3x^2y - 4xy - x)\\,dx + \\int (x^3 - 2x^2)\\,dy = C \\implies x^3y - 2x^2y - \\frac{x^2}{2} + \\cancel{x^3y} - \\cancel{2x^2y} = C",
        explanation: 'After multiplying by x, integrate and slash the duplicate terms.',
        arabicExplanation: 'نكامل المعادلة التامة الناتجة ونشطب الحدود المكررة.'
      }
    ],
    finalAnswerLatex: "x^3y - 2x^2y - \\frac{x^2}{2} = C",
    drillOptions: {
      methodChoices: [
        'Non-Exact ODE with Integrating Factor μ(x) = x (since (M_y - N_x)/N = 1/x)',
        'Already Exact ODE',
        'Homogeneous ODE',
        'Separable ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is (M_y - N_x) / N for (3xy - 4y - 1)dx + x(x - 2)dy = 0?',
      keyStepChoices: [
        '(x - 2) / [x(x - 2)] = 1/x, giving μ(x) = x',
        '2/x, giving μ(x) = x^2',
        '-1/y, giving μ(y) = 1/y',
        '0 (Already Exact)'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's27-fo-14',
    numberLabel: 'Sheet 2027 • 1st Order (14)',
    sourceExam: 'Official Revision Sheet Fall 2027',
    sourceYear: '2027 Revision',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2027__1__fc4471ef.pdf',
    points: 3,
    category: Category.EXACT_EQUATIONS,
    subCategory: 'First-Order ODE',
    methodTag: 'Non-Exact ODE with Integrating Factor μ(y) = y² (Function of y!)',
    arabicMethodTag: 'معادلة غير تامة تُحل بعامل تكامل في y وهو μ(y) = y²',
    difficulty: 'Boss',
    problemLatex: "(2xy)\\,dx + (4y + 3x^2)\\,dy = 0",
    visualRecognitionTrigger: 'M = 2xy has only ONE term, while N = 4y + 3x^2 has two terms (M_y = 2x ≠ N_x = 6x).',
    arabicVisualTrigger: 'لاحظ أن M = 2xy مكونة من حد واحد فقط بينما N مكونة من حدين، مما يشير إلى القسمة على M لإيجاد μ(y)!',
    examinerTrap: 'Dividing by N instead of M! Whenever M = 2xy is a single monomial term, ALWAYS divide (N_x - M_y) by M to get a function of y alone: (6x - 2x)/(2xy) = 4x/(2xy) = 2/y!',
    arabicExaminerTrap: 'القسمة على N بدلاً من M! طالما أن M = 2xy حد وحيد، نقسم دائماً (N_x - M_y) على M لنحصل على دالة في y فقط: (6x - 2x)/(2xy) = 2/y.',
    secretShortcut: 'N_x - M_y = 6x - 2x = 4x. Divide by M = 2xy → (N_x - M_y)/M = 4x/(2xy) = 2/y → μ(y) = e^{∫ (2/y) dy} = y^2!',
    steps: [
      {
        stepNumber: 1,
        title: 'Compute M_y, N_x and Find Integrating Factor μ(y) = y²',
        arabicTitle: 'حساب المشتقات الجزئية وإيجاد عامل التكامل μ(y) = y²',
        formula: "M_y = 2x,\\quad N_x = 6x \\implies \\frac{N_x - M_y}{M} = \\frac{6x - 2x}{2xy} = \\frac{4x}{2xy} = \\frac{2}{y} \\implies \\mu(y) = e^{\\int \\frac{2}{y}dy} = y^2",
        explanation: 'Note the order in the numerator for μ(y): (N_x - M_y) / M = +2/y.',
        arabicExplanation: 'انتبه لترتيب الطرح في قانون μ(y) وهو (N_x - M_y) / M = 2/y.'
      },
      {
        stepNumber: 2,
        title: 'Multiply Original ODE by μ(y) = y² & Integrate',
        arabicTitle: 'ضرب المعادلة في y² ثم إجراء التكامل وشطب المكرر',
        formula: "\\int (2xy^3)\\,dx + \\int (4y^3 + 3x^2y^2)\\,dy = C \\implies x^2y^3 + y^4 + \\cancel{x^2y^3} = C",
        explanation: 'Multiplying by y^2 makes M_y = 6xy^2 = N_x. Slash the duplicate x^2 y^3.',
        arabicExplanation: 'بضرب المعادلة في y^2 تصبح تامة، ثم نكامل ونشطب الحد المكرر x^2 y^3.'
      }
    ],
    finalAnswerLatex: "x^2y^3 + y^4 = C",
    drillOptions: {
      methodChoices: [
        'Non-Exact ODE with Integrating Factor μ(y) = y^2 (since (N_x - M_y)/M = 2/y)',
        'Non-Exact ODE with μ(x) = x^2',
        'Already Exact ODE',
        'Homogeneous ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'Why do we divide by M = 2xy instead of N = 4y + 3x^2 to find the integrating factor?',
      keyStepChoices: [
        'Because M = 2xy is a single term, so (N_x - M_y)/M = 4x/(2xy) = 2/y cancels x completely',
        'Because N is always zero',
        'Because M_y = N_x',
        'Because y is the independent variable'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's27-fo-15',
    numberLabel: 'Sheet 2027 • 1st Order (15)',
    sourceExam: 'Official Revision Sheet Fall 2027',
    sourceYear: '2027 Revision',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2027__1__fc4471ef.pdf',
    points: 3,
    category: Category.LINEAR_FIRST_ORDER,
    subCategory: 'First-Order ODE',
    methodTag: 'First-Order Linear ODE (μ = x^{-2} Cancels x²)',
    arabicMethodTag: 'معادلة خطية من الرتبة الأولى (اختصار عامل التكامل x^{-2})',
    difficulty: 'Core',
    problemLatex: "xy' - 2y = x^3 e^x",
    visualRecognitionTrigger: 'Linear in y\' and y, with leading x and x^3 e^x on RHS.',
    arabicVisualTrigger: 'معادلة خطية في y\' و y، وعند القسمة على x وضربها في عامل التكامل تختصر x^2 تماماً.',
    examinerTrap: 'Forgetting to divide by x first! Once divided by x, Q(x) = x^2 e^x and μ(x) = x^{-2}, so μ · Q(x) is simply e^x!',
    arabicExaminerTrap: 'نسيان القسمة على x أولاً! بعد القسمة يصبح عامل التكامل x^{-2} فيختصر مع x^2 ويتبقى تكامل e^x البسيط.',
    secretShortcut: 'Divide by x → y\' - (2/x)y = x^2 e^x → μ = x^{-2} → y = x^2 [ ∫ x^{-2} · x^2 e^x dx + C ] = x^2 (e^x + C)!',
    steps: [
      {
        stepNumber: 1,
        title: 'Divide by x to Normalize',
        arabicTitle: 'القسمة على x لوضع المعادلة في الصورة القياسية',
        formula: "y' - \\frac{2}{x}y = x^2 e^x \\implies P(x) = -\\frac{2}{x},\\quad Q(x) = x^2 e^x",
        explanation: 'Make the coefficient of y\' equal to 1.',
        arabicExplanation: 'نجعل معامل y\' يساوي 1.'
      },
      {
        stepNumber: 2,
        title: 'Compute μ = x^{-2} and Solve for y',
        arabicTitle: 'حساب عامل التكامل μ = x^{-2} وإيجاد الحل العام',
        formula: "\\mu = e^{\\int -\\frac{2}{x}dx} = x^{-2} \\implies y = x^2\\left[\\int x^{-2}(x^2 e^x)\\,dx + C\\right] = x^2\\left[e^x + C\\right]",
        explanation: 'x^{-2} cancels x^2 inside the integral, leaving ∫ e^x dx = e^x.',
        arabicExplanation: 'تختصر x^{-2} مع x^2 داخل التكامل فيتبقى تكامل e^x فقط.'
      }
    ],
    finalAnswerLatex: "y = x^2(e^x + C)",
    drillOptions: {
      methodChoices: [
        'First-Order Linear ODE with P(x) = -2/x and μ(x) = x^{-2}',
        'Bernoulli ODE',
        'Homogeneous ODE',
        'Separable ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'After dividing xy\' - 2y = x^3 e^x by x, what does the integral ∫ μ(x) Q(x) dx simplify to?',
      keyStepChoices: [
        '∫ x^{-2} (x^2 e^x) dx = ∫ e^x dx = e^x',
        '∫ x^3 e^x dx',
        '∫ x e^x dx',
        '∫ x^{-2} e^x dx'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's27-fo-16',
    numberLabel: 'Sheet 2027 • 1st Order (16)',
    sourceExam: 'Official Revision Sheet Fall 2027',
    sourceYear: '2027 Revision',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2027__1__fc4471ef.pdf',
    points: 3,
    category: Category.LINEAR_FIRST_ORDER,
    subCategory: 'First-Order ODE',
    methodTag: 'First-Order Linear ODE (Trig Integrating Factor sin(2x))',
    arabicMethodTag: 'معادلة خطية من الرتبة الأولى (عامل تكامل مثلثي sin(2x))',
    difficulty: 'Trick',
    problemLatex: "y' = x - 2y\\cot(2x)",
    visualRecognitionTrigger: 'y\' and y to the first power; move -2y cot(2x) to the left side!',
    arabicVisualTrigger: 'معادلة خطية في y\' و y؛ انقل الحد -2y cot(2x) للطرف الأيسر.',
    examinerTrap: 'Forgetting the factor of 1/2 when integrating ∫ 2 cot(2x) dx = ln|sin(2x)|! The 2 in front of cot(2x) is the exact derivative of the angle 2x!',
    arabicExaminerTrap: 'عدم الانتباه إلى أن الرقم 2 المضروب في cot(2x) هو مشتقة الزاوية 2x جاهزة، فيكون تكامل 2 cot(2x) هو ln|sin(2x)| مباشرة!',
    secretShortcut: 'y\' + 2 cot(2x) y = x → μ = e^{∫ 2 cot(2x) dx} = e^{ln|sin(2x)|} = sin(2x). Then integrate ∫ x sin(2x) dx by parts!',
    steps: [
      {
        stepNumber: 1,
        title: 'Write in Standard Linear Form & Find μ(x) = sin(2x)',
        arabicTitle: 'وضع المعادلة في الصورة القياسية وإيجاد عامل التكامل μ(x) = sin(2x)',
        formula: "y' + 2\\cot(2x)y = x \\implies \\mu = e^{\\int 2\\frac{\\cos(2x)}{\\sin(2x)}dx} = e^{\\ln|\\sin(2x)|} = \\sin(2x)",
        explanation: 'Since d/dx(sin 2x) = 2 cos(2x), ∫ 2 cot(2x) dx = ln|sin(2x)|.',
        arabicExplanation: 'بما أن البسط 2 cos(2x) هو مشتقة المقام sin(2x) فإن عامل التكامل هو sin(2x).'
      },
      {
        stepNumber: 2,
        title: 'Solve for y Using Tabular Integration on ∫ x sin(2x) dx',
        arabicTitle: 'إيجاد الحل العام وحساب تكامل x sin(2x) بالتجزيء',
        formula: "y = \\frac{1}{\\sin(2x)}\\left[\\int x\\sin(2x)\\,dx + C\\right] = \\frac{1}{\\sin(2x)}\\left[-\\frac{1}{2}x\\cos(2x) + \\frac{1}{4}\\sin(2x) + C\\right]",
        explanation: 'By parts on ∫ x sin(2x) dx: (+)(x)(-cos(2x)/2) - (-)(1)(-sin(2x)/4).',
        arabicExplanation: 'نكامل x sin(2x) بالتجزيء (جدول الإشارات).'
      }
    ],
    finalAnswerLatex: "y = \\csc(2x)\\left[-\\frac{1}{2}x\\cos(2x) + \\frac{1}{4}\\sin(2x) + C\\right]",
    drillOptions: {
      methodChoices: [
        'First-Order Linear ODE: y\' + 2 cot(2x) y = x with μ(x) = sin(2x)',
        'Separable ODE',
        'Homogeneous ODE',
        'Bernoulli ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the integrating factor μ(x) for y\' + 2 cot(2x) y = x?',
      keyStepChoices: [
        'μ(x) = sin(2x)',
        'μ(x) = sin^2(2x)',
        'μ(x) = cos(2x)',
        'μ(x) = csc^2(2x)'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's27-fo-17',
    numberLabel: 'Sheet 2027 • 1st Order (17)',
    sourceExam: 'Official Revision Sheet Fall 2027',
    sourceYear: '2027 Revision',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2027__1__fc4471ef.pdf',
    points: 3,
    category: Category.BERNOULLI,
    subCategory: 'First-Order ODE',
    methodTag: 'Bernoulli ODE (Exp Cancellation: e^{2x} · e^{-2x} = 1)',
    arabicMethodTag: 'معادلة برنولي (اختصار الدالة الأسية e^{2x} مع e^{-2x})',
    difficulty: 'Trick',
    problemLatex: "y' = y - xy^3 e^{-2x}",
    visualRecognitionTrigger: 'y\' - y = -x e^{-2x} y^3 (Bernoulli with n = 3 and 1 - n = -2).',
    arabicVisualTrigger: 'معادلة برنولي لوجود y^3 في الطرف الأيمن (n = 3 وبالتالي 1 - n = -2).',
    examinerTrap: 'Forgetting to move +y to the left as -y first! Here P(x) = -1, so P*(x) = (-2)(-1) = +2, which makes μ = e^{2x}. Then e^{2x} CANCELS e^{-2x} inside the integral, leaving just ∫ 2x dx = x^2!',
    arabicExaminerTrap: 'نسيان نقل y للطرف الأيسر بإشارة سالبة! عندها تصبح P(x) = -1 وبالتالي P*(x) = +2 وعامل التكامل e^{2x} الذي يختصر مع e^{-2x} ويتبقى تكامل 2x البسيط!',
    secretShortcut: 'y\' - y = -x e^{-2x} y^3 → P = -1, Q = -x e^{-2x}, n = 3 → 1 - n = -2 → P* = 2, Q* = 2x e^{-2x} → μ = e^{2x} → y^{-2} = e^{-2x} [ ∫ 2x dx + C ] = e^{-2x}(x^2 + C)!',
    steps: [
      {
        stepNumber: 1,
        title: 'Write in Standard Bernoulli Form & Compute P*, Q*',
        arabicTitle: 'وضع المعادلة في صورة برنولي القياسية وحساب P* و Q*',
        formula: "y' - y = -xe^{-2x}y^3 \\implies P(x) = -1,\\; Q(x) = -xe^{-2x},\\; n = 3 \\implies 1 - n = -2,\\; P^*(x) = 2,\\; Q^*(x) = 2xe^{-2x}",
        explanation: 'Multiplying P = -1 and Q = -x e^{-2x} by (1 - 3) = -2 flips both minus signs to plus!',
        arabicExplanation: 'الضرب في (1 - 3 = -2) يحول الإشارات السالبة إلى موجبة.'
      },
      {
        stepNumber: 2,
        title: 'Compute μ = e^{2x} & Cancel e^{-2x} Inside the Integral',
        arabicTitle: 'حساب عامل التكامل μ = e^{2x} واختصاره مع e^{-2x}',
        formula: "\\mu = e^{\\int 2\\,dx} = e^{2x} \\implies y^{-2} = e^{-2x}\\left[\\int e^{2x}(2xe^{-2x})\\,dx + C\\right] = e^{-2x}\\left[\\int 2x\\,dx + C\\right] = e^{-2x}(x^2 + C)",
        explanation: 'e^{2x} · e^{-2x} = 1, leaving ∫ 2x dx = x^2.',
        arabicExplanation: 'يختصر e^{2x} مع e^{-2x} ويتبقى تكامل 2x وهو x^2.'
      }
    ],
    finalAnswerLatex: "y^{-2} = e^{-2x}(x^2 + C)",
    drillOptions: {
      methodChoices: [
        'Bernoulli ODE (n = 3, 1 - n = -2, P* = 2, μ = e^{2x} cancels e^{-2x})',
        'First-Order Linear ODE',
        'Homogeneous ODE',
        'Exact ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'In y\' - y = -x e^{-2x} y^3, what happens when you multiply Q*(x) = 2x e^{-2x} by μ = e^{2x}?',
      keyStepChoices: [
        'e^{2x} and e^{-2x} cancel to 1, leaving ∫ 2x dx = x^2 + C',
        'It becomes 2x e^{-4x}',
        'It requires integration by parts',
        'It becomes 0'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's27-fo-18',
    numberLabel: 'Sheet 2027 • 1st Order (18)',
    sourceExam: 'Official Revision Sheet Fall 2027',
    sourceYear: '2027 Revision',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2027__1__fc4471ef.pdf',
    points: 3,
    category: Category.BERNOULLI,
    subCategory: 'First-Order ODE',
    methodTag: 'Bernoulli ODE (Divide by x First, n = 4)',
    arabicMethodTag: 'معادلة برنولي (القسمة على x أولاً عند n = 4)',
    difficulty: 'Core',
    problemLatex: "xy' - y = x^3 y^4",
    visualRecognitionTrigger: 'First-order ODE with y\' and y, plus y^4 on RHS (n = 4, 1 - n = -3).',
    arabicVisualTrigger: 'معادلة برنولي لوجود y^4 في الطرف الأيمن (n = 4 وبالتالي 1 - n = -3).',
    examinerTrap: 'Forgetting to divide by x before reading P(x) and Q(x)!',
    arabicExaminerTrap: 'نسيان القسمة على x أولاً قبل استخراج P(x) و Q(x).',
    secretShortcut: 'Divide by x → y\' - (1/x)y = x^2 y^4 → P = -1/x, Q = x^2, n = 4 → 1 - n = -3 → P* = 3/x, Q* = -3x^2 → μ = x^3 → y^{-3} = x^{-3} [ ∫ -3x^5 dx + C ] = x^{-3} [ -x^6 / 2 + C ]!',
    steps: [
      {
        stepNumber: 1,
        title: 'Divide by x & Compute P*(x), Q*(x) with 1 - n = -3',
        arabicTitle: 'القسمة على x وحساب P* و Q* عند 1 - n = -3',
        formula: "y' - \\frac{1}{x}y = x^2 y^4 \\implies P(x) = -\\frac{1}{x},\\; Q(x) = x^2,\\; n = 4 \\implies P^*(x) = \\frac{3}{x},\\; Q^*(x) = -3x^2",
        explanation: 'Multiply P and Q by (1 - 4) = -3.',
        arabicExplanation: 'نقسم على x ثم نضرب في (1 - 4 = -3).'
      },
      {
        stepNumber: 2,
        title: 'Compute μ = x³ and Solve for y^{-3}',
        arabicTitle: 'حساب عامل التكامل μ = x³ وإيجاد y^{-3}',
        formula: "\\mu = e^{\\int \\frac{3}{x}dx} = x^3 \\implies y^{-3} = x^{-3}\\left[\\int x^3(-3x^2)\\,dx + C\\right] = x^{-3}\\left[-\\frac{1}{2}x^6 + C\\right]",
        explanation: 'Integral of -3x^5 dx is -3x^6 / 6 = -(1/2)x^6.',
        arabicExplanation: 'تكامل -3x^5 هو -(1/2)x^6.'
      }
    ],
    finalAnswerLatex: "y^{-3} = x^{-3}\\left[-\\frac{1}{2}x^6 + C\\right]",
    drillOptions: {
      methodChoices: [
        'Bernoulli ODE (divide by x, 1 - n = -3, P* = 3/x, μ = x^3)',
        'Homogeneous ODE',
        'Exact ODE',
        'Separable ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'After dividing xy\' - y = x^3 y^4 by x and multiplying by (1 - 4) = -3, what is P*(x)?',
      keyStepChoices: [
        'P*(x) = +3/x, so μ(x) = x^3',
        'P*(x) = -3/x, so μ(x) = x^{-3}',
        'P*(x) = 3, so μ(x) = e^{3x}',
        'P*(x) = -1/x'
      ],
      correctKeyStepIndex: 0
    }
  },

  // =========================================================================
  // PDF 2: REVISION SHEET FOR MIDTERM FALL 2027 - PART 2: 13 HIGHER-ORDER ODEs
  // =========================================================================
  {
    id: 's27-ho-1',
    numberLabel: 'Sheet 2027 • Higher Order (1)',
    sourceExam: 'Official Revision Sheet Fall 2027',
    sourceYear: '2027 Revision',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2027__1__fc4471ef.pdf',
    points: 2,
    category: Category.HIGHER_ORDER_HOMOGENEOUS,
    subCategory: 'Higher-Order ODE',
    methodTag: '2nd-Order Homogeneous ODE (Distinct Real Roots)',
    arabicMethodTag: 'معادلة متجانسة من الرتبة الثانية (جذران حقيقيان مختلفان)',
    difficulty: 'Core',
    problemLatex: "y'' - 2y' - 8y = 0",
    visualRecognitionTrigger: 'Constant-coefficient 2nd-order homogeneous ODE.',
    arabicVisualTrigger: 'معادلة تفاضلية متجانسة من الرتبة الثانية ذات معاملات ثابتة.',
    examinerTrap: 'Sign error when factoring m^2 - 2m - 8 = (m - 4)(m + 2) = 0!',
    arabicExaminerTrap: 'الخطأ في إشارات التحليل للمقدار m^2 - 2m - 8 = (m - 4)(m + 2).',
    secretShortcut: 'm^2 - 2m - 8 = (m - 4)(m + 2) = 0 → m_1 = 4, m_2 = -2 → y = C_1 e^{4x} + C_2 e^{-2x}.',
    steps: [
      {
        stepNumber: 1,
        title: 'Write & Factor Auxiliary Equation',
        arabicTitle: 'كتابة وتحليل المعادلة المساعدة',
        formula: "m^2 - 2m - 8 = 0 \\implies (m - 4)(m + 2) = 0 \\implies m_1 = 4,\\; m_2 = -2",
        explanation: 'Two distinct real roots.',
        arabicExplanation: 'جذران حقيقيان مختلفان.'
      },
      {
        stepNumber: 2,
        title: 'Write General Solution',
        arabicTitle: 'كتابة الحل العام',
        formula: "y = C_1 e^{4x} + C_2 e^{-2x}",
        explanation: 'Case 1: distinct real roots.',
        arabicExplanation: 'الحالة الأولى: جذور حقيقية مختلفة.'
      }
    ],
    finalAnswerLatex: "y = C_1 e^{4x} + C_2 e^{-2x}",
    drillOptions: {
      methodChoices: [
        'Auxiliary Quadratic m^2 - 2m - 8 = 0 (Distinct Real Roots m = 4, -2)',
        'Undetermined Coefficients',
        'Reduction of Order',
        'First-Order Linear ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What are the roots of m^2 - 2m - 8 = 0?',
      keyStepChoices: [
        'm_1 = 4, m_2 = -2',
        'm_1 = -4, m_2 = 2',
        'm = 1 ± 3i',
        'm_1 = m_2 = 4'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's27-ho-2',
    numberLabel: 'Sheet 2027 • Higher Order (2)',
    sourceExam: 'Official Revision Sheet Fall 2027',
    sourceYear: '2027 Revision',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2027__1__fc4471ef.pdf',
    points: 2,
    category: Category.HIGHER_ORDER_HOMOGENEOUS,
    subCategory: 'Higher-Order ODE',
    methodTag: '2nd-Order Homogeneous ODE (Repeated Real Root)',
    arabicMethodTag: 'معادلة متجانسة من الرتبة الثانية (جذران حقيقيان متساويان)',
    difficulty: 'Core',
    problemLatex: "y'' + 10y' + 25y = 0",
    visualRecognitionTrigger: 'Perfect square trinomial: m^2 + 10m + 25 = (m + 5)^2 = 0.',
    arabicVisualTrigger: 'مربع كامل m^2 + 10m + 25 = (m + 5)^2 = 0.',
    examinerTrap: 'Forgetting to multiply C_2 by x when the root m = -5 is repeated!',
    arabicExaminerTrap: 'نسيان ضرب الثابت الثاني C_2 في x عند تساوي الجذرين.',
    secretShortcut: '(m + 5)^2 = 0 → m_1 = m_2 = -5 → y = (C_1 + C_2 x)e^{-5x}.',
    steps: [
      {
        stepNumber: 1,
        title: 'Solve Auxiliary Equation for Repeated Root',
        arabicTitle: 'حل المعادلة المساعدة وإيجاد الجذر المكرر',
        formula: "m^2 + 10m + 25 = (m + 5)^2 = 0 \\implies m_1 = m_2 = -5",
        explanation: 'Discriminant Δ = 100 - 100 = 0.',
        arabicExplanation: 'المميز يساوي صفراً فالجذران متساويان عند -5.'
      },
      {
        stepNumber: 2,
        title: 'Write General Solution with x Multiplier',
        arabicTitle: 'كتابة الحل العام مع الضرب في x',
        formula: "y = C_1 e^{-5x} + C_2 x e^{-5x} = (C_1 + C_2 x)e^{-5x}",
        explanation: 'Case 2: repeated real root.',
        arabicExplanation: 'الحالة الثانية: جذران حقيقيان متساويان.'
      }
    ],
    finalAnswerLatex: "y = (C_1 + C_2 x)e^{-5x}",
    drillOptions: {
      methodChoices: [
        'Auxiliary Quadratic (m + 5)^2 = 0 (Repeated Root m_1 = m_2 = -5)',
        'Distinct Real Roots',
        'Complex Conjugate Roots',
        'Undetermined Coefficients'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the general solution when m_1 = m_2 = -5?',
      keyStepChoices: [
        'y = (C_1 + C_2 x)e^{-5x}',
        'y = C_1 e^{-5x} + C_2 e^{5x}',
        'y = C_1 cos(5x) + C_2 sin(5x)',
        'y = C_1 e^{-5x}'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's27-ho-3',
    numberLabel: 'Sheet 2027 • Higher Order (3)',
    sourceExam: 'Official Revision Sheet Fall 2027',
    sourceYear: '2027 Revision',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2027__1__fc4471ef.pdf',
    points: 2,
    category: Category.HIGHER_ORDER_HOMOGENEOUS,
    subCategory: 'Higher-Order ODE',
    methodTag: '2nd-Order Homogeneous ODE (Complex Conjugate Roots)',
    arabicMethodTag: 'معادلة متجانسة من الرتبة الثانية (جذران مركبان مترافقان)',
    difficulty: 'Core',
    problemLatex: "y'' + 3y' + 6y = 0",
    visualRecognitionTrigger: 'Discriminant b^2 - 4ac = 9 - 24 = -15 < 0 (Complex Roots).',
    arabicVisualTrigger: 'المميز b^2 - 4ac = 9 - 24 = -15 سالب (جذور مركبة).',
    examinerTrap: 'Including "i" inside the cos and sin arguments! Never write cos(i√15/2 x); the i is absorbed into the Euler formula to produce pure real cos(√15/2 x) and sin(√15/2 x).',
    arabicExaminerTrap: 'كتابة الرمز التخيلي i داخل الزاوية! نأخذ المعامل التخيلي β = √15/2 بدون i داخل cos و sin.',
    secretShortcut: 'm = (-3 ± √(9 - 24))/2 = -3/2 ± i(√15/2) → α = -3/2, β = √15/2.',
    steps: [
      {
        stepNumber: 1,
        title: 'Solve Auxiliary Equation via Quadratic Formula',
        arabicTitle: 'حل المعادلة المساعدة بالقانون العام',
        formula: "m^2 + 3m + 6 = 0 \\implies m = \\frac{-3 \\pm \\sqrt{9 - 24}}{2} = -\\frac{3}{2} \\pm i\\frac{\\sqrt{15}}{2}",
        explanation: 'Here α = -3/2 and β = √15 / 2.',
        arabicExplanation: 'الجزء الحقيقي α = -3/2 والتخيلي β = √15/2.'
      },
      {
        stepNumber: 2,
        title: 'Write General Solution',
        arabicTitle: 'كتابة الحل العام',
        formula: "y = e^{-\\frac{3}{2}x}\\left(C_1\\cos\\left(\\frac{\\sqrt{15}}{2}x\\right) + C_2\\sin\\left(\\frac{\\sqrt{15}}{2}x\\right)\\right)",
        explanation: 'Case 3: complex conjugate roots.',
        arabicExplanation: 'الحالة الثالثة: جذور مركبة مترافقة.'
      }
    ],
    finalAnswerLatex: "y = e^{-\\frac{3}{2}x}\\left(C_1\\cos\\left(\\frac{\\sqrt{15}}{2}x\\right) + C_2\\sin\\left(\\frac{\\sqrt{15}}{2}x\\right)\\right)",
    drillOptions: {
      methodChoices: [
        'Quadratic Formula on m^2 + 3m + 6 = 0 (Complex Roots m = -3/2 ± i√15/2)',
        'Factoring into integer roots',
        'Reduction of Order',
        'Undetermined Coefficients'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What are α and β for the auxiliary equation m^2 + 3m + 6 = 0?',
      keyStepChoices: [
        'α = -3/2, β = √15 / 2',
        'α = 3/2, β = √15 / 2',
        'α = -3, β = √15',
        'α = -3/2, β = 15/2'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's27-ho-4',
    numberLabel: 'Sheet 2027 • Higher Order (4)',
    sourceExam: 'Official Revision Sheet Fall 2027',
    sourceYear: '2027 Revision',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2027__1__fc4471ef.pdf',
    points: 3,
    category: Category.HIGHER_ORDER_HOMOGENEOUS,
    subCategory: 'Higher-Order ODE',
    methodTag: '4th-Order Homogeneous ODE (Difference of Squares m⁴ - 1 = 0)',
    arabicMethodTag: 'معادلة متجانسة من الرتبة الرابعة (فرق بين مربعين m⁴ - 1 = 0)',
    difficulty: 'Core',
    problemLatex: "y^{(4)} - y = 0",
    visualRecognitionTrigger: '4th derivative minus y = 0 → m^4 - 1 = (m^2 - 1)(m^2 + 1) = 0.',
    arabicVisualTrigger: 'المشتقة الرابعة ناقص y يساوي صفراً: تحلل كفرق بين مربعين (m^2 - 1)(m^2 + 1) = 0.',
    examinerTrap: 'Writing only m = ±1 and forgetting the two imaginary roots m = ±i from (m^2 + 1 = 0)!',
    arabicExaminerTrap: 'الاكتفاء بالجذرين الحقيقيين m = ±1 ونسيان الجذرين التخيليين m = ±i الناتجين من القوس (m^2 + 1 = 0).',
    secretShortcut: 'm^4 - 1 = (m - 1)(m + 1)(m^2 + 1) = 0 → roots 1, -1, ±i → C_1 e^x + C_2 e^{-x} + C_3 cos x + C_4 sin x!',
    steps: [
      {
        stepNumber: 1,
        title: 'Factor m⁴ - 1 = 0 as Difference of Squares',
        arabicTitle: 'تحليل m⁴ - 1 = 0 كفرق بين مربعين',
        formula: "m^4 - 1 = (m^2 - 1)(m^2 + 1) = 0 \\implies m_1 = 1,\\; m_2 = -1,\\; m_{3,4} = \\pm i",
        explanation: 'm^2 - 1 = 0 gives ±1, and m^2 + 1 = 0 gives ±i.',
        arabicExplanation: 'القوس الأول يعطي ±1 والقوس الثاني يعطي ±i.'
      },
      {
        stepNumber: 2,
        title: 'Write 4-Constant General Solution',
        arabicTitle: 'كتابة الحل العام المكون من 4 ثوابت',
        formula: "y = C_1 e^x + C_2 e^{-x} + C_3\\cos x + C_4\\sin x",
        explanation: 'Combine real exponentials and pure sinusoids.',
        arabicExplanation: 'نجمع الدوال الأسية والمثلثية.'
      }
    ],
    finalAnswerLatex: "y = C_1 e^x + C_2 e^{-x} + C_3\\cos x + C_4\\sin x",
    drillOptions: {
      methodChoices: [
        'Factor m^4 - 1 = (m^2 - 1)(m^2 + 1) = 0 to get m = 1, -1, ±i',
        'Repeated root m = 1 four times',
        'Reduction of Order',
        'Undetermined Coefficients'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What are all 4 roots of m^4 - 1 = 0?',
      keyStepChoices: [
        'm = 1, -1, i, -i',
        'm = 1, 1, -1, -1',
        'm = 1, -1',
        'm = ±1 ± i'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's27-ho-5',
    numberLabel: 'Sheet 2027 • Higher Order (5)',
    sourceExam: 'Official Revision Sheet Fall 2027',
    sourceYear: '2027 Revision',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2027__1__fc4471ef.pdf',
    points: 3,
    category: Category.HIGHER_ORDER_HOMOGENEOUS,
    subCategory: 'Higher-Order ODE',
    methodTag: '3rd-Order Homogeneous ODE (Sum of Coefficients = 0 → m = 1)',
    arabicMethodTag: 'معادلة متجانسة من الرتبة الثالثة (مجموع المعاملات = صفر)',
    difficulty: 'Core',
    problemLatex: "y''' - 4y'' + 5y' - 2y = 0",
    visualRecognitionTrigger: 'Sum of coefficients: 1 - 4 + 5 - 2 = 0 → m = 1 is a root!',
    arabicVisualTrigger: 'مجموع المعاملات 1 - 4 + 5 - 2 = 0 إذن m = 1 جذر مؤكد!',
    examinerTrap: 'Not noticing that after factoring out (m - 1), the remaining quadratic m^2 - 3m + 2 = (m - 1)(m - 2) has m = 1 AGAIN! So m = 1 is repeated twice!',
    arabicExaminerTrap: 'عدم الانتباه إلى أن الجذر m = 1 يظهر مرة أخرى في تحليل القوس التربيعي فيصبح جذراً مكرراً مرتين!',
    secretShortcut: 'm^3 - 4m^2 + 5m - 2 = (m - 1)(m^2 - 3m + 2) = (m - 1)^2 (m - 2) = 0 → roots 1, 1, 2!',
    steps: [
      {
        stepNumber: 1,
        title: 'Factor Cubic Auxiliary Equation Using m = 1',
        arabicTitle: 'تحليل المعادلة المساعدة باستخدام الجذر m = 1',
        formula: "m^3 - 4m^2 + 5m - 2 = (m - 1)(m^2 - 3m + 2) = (m - 1)^2(m - 2) = 0",
        explanation: 'Roots are m_1 = m_2 = 1 and m_3 = 2.',
        arabicExplanation: 'الجذور هي m_1 = m_2 = 1 و m_3 = 2.'
      },
      {
        stepNumber: 2,
        title: 'Write General Solution',
        arabicTitle: 'كتابة الحل العام',
        formula: "y = (C_1 + C_2 x)e^x + C_3 e^{2x}",
        explanation: 'Include x multiplier for the repeated root m = 1.',
        arabicExplanation: 'نضرب في x للجذر المكرر m = 1.'
      }
    ],
    finalAnswerLatex: "y = (C_1 + C_2 x)e^x + C_3 e^{2x}",
    drillOptions: {
      methodChoices: [
        'Cubic Auxiliary Equation: sum of coeffs = 0 ⇒ (m - 1)^2 (m - 2) = 0',
        'Undetermined Coefficients',
        'Reduction of Order',
        'Variation of Parameters'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What are the 3 roots of m^3 - 4m^2 + 5m - 2 = 0?',
      keyStepChoices: [
        'm = 1, 1, 2',
        'm = 1, 2, 2',
        'm = -1, -1, -2',
        'm = 1, -1, 2'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's27-ho-6',
    numberLabel: 'Sheet 2027 • Higher Order (6)',
    sourceExam: 'Official Revision Sheet Fall 2027',
    sourceYear: '2027 Revision',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2027__1__fc4471ef.pdf',
    points: 4,
    category: Category.REDUCTION_OF_ORDER,
    subCategory: 'Higher-Order ODE',
    methodTag: 'Reduction of Order (Given y = e^{2x} with RHS = e^x)',
    arabicMethodTag: 'اختزال الرتبة (بمعلومية y = e^{2x} والطرف الأيمن e^x)',
    difficulty: 'Boss',
    problemLatex: "y'' - 3y' + 2y = e^x, \\quad y = e^{2x}",
    visualRecognitionTrigger: '2nd-order ODE listed alongside a known homogeneous solution y = e^{2x}.',
    arabicVisualTrigger: 'معادلة من الرتبة الثانية بجانبها حل متجانس معلوم y = e^{2x}.',
    examinerTrap: 'When substituting y = u e^{2x} into y\'\' - 3y\' + 2y = e^x, dividing both sides by e^{2x} turns the RHS into e^x / e^{2x} = e^{-x} (NOT 1)!',
    arabicExaminerTrap: 'انتبه: الطرف الأيمن هنا هو e^x وليس e^{2x}! فعند القسمة على e^{2x} يصبح الطرف الأيمن e^x / e^{2x} = e^{-x}!',
    secretShortcut: 'Let y = u e^{2x} → (u\'\' + u\')e^{2x} = e^x → u\'\' + u\' = e^{-x}! Then let z = u\' → z\' + z = e^{-x} with μ = e^x → z = e^{-x}(x + C_1)!',
    steps: [
      {
        stepNumber: 1,
        title: 'Substitute y = u e^{2x}, y\' = (u\' + 2u)e^{2x}, y\'\' = (u\'\' + 4u\' + 4u)e^{2x}',
        arabicTitle: 'التعويض بـ y = u e^{2x} ومشتقاتها',
        formula: "\\left[(u'' + 4u' + 4u) - 3(u' + 2u) + 2u\\right]e^{2x} = e^x \\implies u'' + u' = e^{-x}",
        explanation: 'Dividing both sides by e^{2x} gives e^x / e^{2x} = e^{-x} on the right.',
        arabicExplanation: 'بقسمة الطرفين على e^{2x} يصبح الطرف الأيمن e^{-x}.'
      },
      {
        stepNumber: 2,
        title: 'Let z = u\' and Solve z\' + z = e^{-x} with μ = e^x',
        arabicTitle: 'وضع z = u\' وحل المعادلة الخطية بعامل التكامل μ = e^x',
        formula: "z' + z = e^{-x} \\implies \\mu = e^x \\implies u' = z = e^{-x}\\left[\\int e^x e^{-x}\\,dx + C_1\\right] = e^{-x}(x + C_1) = xe^{-x} + C_1 e^{-x}",
        explanation: 'Inside the integral, e^x · e^{-x} = 1, which integrates to x + C_1!',
        arabicExplanation: 'حاصل ضرب e^x في e^{-x} يساوي 1 وتكامله x + C_1.'
      },
      {
        stepNumber: 3,
        title: 'Integrate u\' by Parts and Multiply by e^{2x}',
        arabicTitle: 'تكامل u\' بالتجزيء ثم الضرب في e^{2x}',
        formula: "u = -xe^{-x} - e^{-x} - C_1 e^{-x} + C_2 \\implies y = ue^{2x} = -xe^x + \\tilde{C}_1 e^x + C_2 e^{2x}",
        explanation: 'Notice -e^x and -C_1 e^x combine into a single arbitrary constant C_1 e^x.',
        arabicExplanation: 'بضرب u في e^{2x} نحصل على الحل العام شاملاً الحل الخاص -x e^x.'
      }
    ],
    finalAnswerLatex: "y = -xe^x + C_1 e^x + C_2 e^{2x}",
    drillOptions: {
      methodChoices: [
        'Reduction of Order: let y = u e^{2x}, reducing the ODE to u\'\' + u\' = e^{-x}',
        'Homogeneous Substitution y = x u',
        'Bernoulli ODE',
        'Separable ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'When you substitute y = u e^{2x} into y\'\' - 3y\' + 2y = e^x and divide by e^{2x}, what is the reduced equation?',
      keyStepChoices: [
        'u\'\' + u\' = e^{-x}',
        'u\'\' + u\' = 1',
        'u\'\' - u\' = e^x',
        'u\'\' = e^{-x}'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's27-ho-7',
    numberLabel: 'Sheet 2027 • Higher Order (7)',
    sourceExam: 'Official Revision Sheet Fall 2027',
    sourceYear: '2027 Revision',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2027__1__fc4471ef.pdf',
    points: 4,
    category: Category.UNDETERMINED_COEFFS,
    subCategory: 'Higher-Order ODE',
    methodTag: 'Undetermined Coefficients (Superposition + Root Duplication Boost)',
    arabicMethodTag: 'المعاملات غير المعينة (مجموع دالتين مع تداخل الجذر m = -1؟ افحص!)',
    difficulty: 'Trick',
    problemLatex: "y'' - y' - 2y = 6x + 6e^x",
    visualRecognitionTrigger: '2nd-order constant-coefficient ODE with polynomial + exponential on RHS.',
    arabicVisualTrigger: 'معادلة ذات معاملات ثابتة وطرفها الأيمن مجموع كثيرة حدود ودالة أسية.',
    examinerTrap: 'Forgetting the constant term B in the linear polynomial part (Ax + B)! Even though 6x has no constant term on the RHS, y_p MUST include (Ax + B) + C e^x!',
    arabicExaminerTrap: 'نسيان الحد الثابت B عند فرض كثيرة الحدود من الدرجة الأولى! يجب فرض y_p = Ax + B + C e^x.',
    secretShortcut: 'Roots of m^2 - m - 2 = (m - 2)(m + 1) = 0 are m = 2, -1. Neither 0 nor 1 is a root, so y_p = Ax + B + C e^x!',
    steps: [
      {
        stepNumber: 1,
        title: 'Find Homogeneous Solution y_h',
        arabicTitle: 'إيجاد الحل المتجانس y_h',
        formula: "m^2 - m - 2 = (m - 2)(m + 1) = 0 \\implies y_h = C_1 e^{2x} + C_2 e^{-x}",
        explanation: 'Roots are m_1 = 2 and m_2 = -1.',
        arabicExplanation: 'جذور المعادلة المساعدة هي 2 و -1.'
      },
      {
        stepNumber: 2,
        title: 'Set Up y_p = Ax + B + D e^x and Solve for Constants',
        arabicTitle: 'فرض الحل الخاص y_p = Ax + B + D e^x وإيجاد الثوابت',
        formula: "y_p = Ax + B + De^x \\implies y_p'' - y_p' - 2y_p = -2Ax + (-A - 2B) - 2De^x = 6x + 6e^x",
        explanation: 'Matching coefficients: -2A = 6 (A = -3), -A - 2B = 0 (3 - 2B = 0 ⇒ B = 3/2), and -2D = 6 (D = -3).',
        arabicExplanation: 'بمقارنة المعاملات نجد أن A = -3 و B = 3/2 و D = -3.'
      }
    ],
    finalAnswerLatex: "y = C_1 e^{2x} + C_2 e^{-x} - 3x + \\frac{3}{2} - 3e^x",
    drillOptions: {
      methodChoices: [
        'Undetermined Coefficients with y_p = Ax + B + D e^x',
        'Undetermined Coefficients with y_p = Ax + D x e^x',
        'Variation of Parameters',
        'Reduction of Order'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the correct trial form y_p for y\'\' - y\' - 2y = 6x + 6e^x?',
      keyStepChoices: [
        'y_p = Ax + B + D e^x',
        'y_p = Ax + D e^x (without B)',
        'y_p = x(Ax + B) + D x e^x',
        'y_p = Ax^2 + D e^x'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's27-ho-8',
    numberLabel: 'Sheet 2027 • Higher Order (8)',
    sourceExam: 'Official Revision Sheet Fall 2027',
    sourceYear: '2027 Revision',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2027__1__fc4471ef.pdf',
    points: 4,
    category: Category.UNDETERMINED_COEFFS,
    subCategory: 'Higher-Order ODE',
    methodTag: 'Undetermined Coefficients (Cosine RHS Requires Both cos & sin)',
    arabicMethodTag: 'المعاملات غير المعينة (وجود cos يتطلب فرض cos و sin معاً)',
    difficulty: 'Core',
    problemLatex: "y'' - 4y' + 3y = 20\\cos x",
    visualRecognitionTrigger: 'Constant-coefficient 2nd-order ODE with RHS = 20 cos(x).',
    arabicVisualTrigger: 'معادلة ذات معاملات ثابتة وطرفها الأيمن 20 cos(x).',
    examinerTrap: 'Guessing y_p = A cos(x) only! Because the first derivative y\' is present in the ODE, differentiating cos(x) produces sin(x), so you MUST guess y_p = A cos(x) + B sin(x)!',
    arabicExaminerTrap: 'فرض الحل الخاص على صورة A cos(x) فقط! نظراً لوجود المشتقة الأولى y\' في المعادلة يجب فرض A cos(x) + B sin(x) معاً.',
    secretShortcut: 'y_h = C_1 e^x + C_2 e^{3x}. Plug y_p = A cos x + B sin x → (2A - 4B)cos x + (4A + 2B)sin x = 20 cos x → A = 2, B = -4!',
    steps: [
      {
        stepNumber: 1,
        title: 'Find Homogeneous Solution y_h',
        arabicTitle: 'إيجاد الحل المتجانس y_h',
        formula: "m^2 - 4m + 3 = (m - 1)(m - 3) = 0 \\implies y_h = C_1 e^x + C_2 e^{3x}",
        explanation: 'Distinct real roots m = 1, 3.',
        arabicExplanation: 'جذران حقيقيان مختلفان 1 و 3.'
      },
      {
        stepNumber: 2,
        title: 'Set Up y_p = A cos(x) + B sin(x) & Solve for A, B',
        arabicTitle: 'فرض y_p = A cos(x) + B sin(x) وإيجاد الثابتين A و B',
        formula: "y_p = A\\cos x + B\\sin x \\implies (2A - 4B)\\cos x + (4A + 2B)\\sin x = 20\\cos x \\implies A = 2,\\; B = -4",
        explanation: 'From 4A + 2B = 0 we get B = -2A. Substituting into 2A - 4(-2A) = 20 gives 10A = 20 ⇒ A = 2, B = -4.',
        arabicExplanation: 'بحل المعادلتين نجد أن A = 2 و B = -4.'
      }
    ],
    finalAnswerLatex: "y = C_1 e^x + C_2 e^{3x} + 2\\cos x - 4\\sin x",
    drillOptions: {
      methodChoices: [
        'Undetermined Coefficients with y_p = A cos(x) + B sin(x)',
        'Undetermined Coefficients with y_p = A cos(x) only',
        'Variation of Parameters',
        'Reduction of Order'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'When you substitute y_p = A cos x + B sin x into y\'\' - 4y\' + 3y = 20 cos x, what are A and B?',
      keyStepChoices: [
        'A = 2, B = -4',
        'A = 4, B = 2',
        'A = 20, B = 0',
        'A = -2, B = 4'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's27-ho-9',
    numberLabel: 'Sheet 2027 • Higher Order (9)',
    sourceExam: 'Official Revision Sheet Fall 2027',
    sourceYear: '2027 Revision',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2027__1__fc4471ef.pdf',
    points: 4,
    category: Category.UNDETERMINED_COEFFS,
    subCategory: 'Higher-Order ODE',
    methodTag: 'Undetermined Coefficients (Double-Angle Identity Trap: 2cos²x = 1 + cos 2x)',
    arabicMethodTag: 'المعاملات غير المعينة (خدعة متطابقة ضعف الزاوية 2cos²x = 1 + cos 2x)',
    difficulty: 'Boss',
    problemLatex: "y'' - 4y = 2\\cos^2 x",
    visualRecognitionTrigger: 'RHS contains a squared trig function: 2 cos^2(x).',
    arabicVisualTrigger: 'الطرف الأيمن يحتوي على مربع دالة مثلثية 2 cos^2(x).',
    examinerTrap: 'Guessing y_p = A cos^2(x)! Undetermined coefficients ONLY works on linear powers of sin(kx) and cos(kx). You MUST use the identity 2 cos^2(x) = 1 + cos(2x) BEFORE setting up y_p!',
    arabicExaminerTrap: 'فرض الحل الخاص على صورة A cos^2(x)! طريقة المعاملات غير المعينة لا تطبق على مربع الدوال المثلثية إلا بعد فكها بالمتطابقة 2 cos^2(x) = 1 + cos(2x) أولاً!',
    secretShortcut: 'Replace 2 cos^2(x) with 1 + cos(2x)! Since y\'\' - 4y has no y\' term, y_p = A + B cos(2x) directly gives -4A = 1 (A = -1/4) and (-4 - 4)B = 1 (B = -1/8)!',
    steps: [
      {
        stepNumber: 1,
        title: 'Apply Trig Identity 2 cos²(x) = 1 + cos(2x) & Find y_h',
        arabicTitle: 'فك 2 cos²(x) بالمتطابقة المثلثية إلى 1 + cos(2x) وإيجاد y_h',
        formula: "y'' - 4y = 1 + \\cos(2x), \\quad m^2 - 4 = 0 \\implies y_h = C_1 e^{2x} + C_2 e^{-2x}",
        explanation: 'Identity cos(2x) = 2cos^2(x) - 1 means 2cos^2(x) = 1 + cos(2x).',
        arabicExplanation: 'من متطابقة ضعف الزاوية نضع 1 + cos(2x) بدلاً من 2cos^2(x).'
      },
      {
        stepNumber: 2,
        title: 'Set Up y_p = A + B cos(2x) + D sin(2x) and Solve',
        arabicTitle: 'فرض الحل الخاص وإيجاد الثوابت',
        formula: "y_p = A + B\\cos(2x) + D\\sin(2x) \\implies -4A - 8B\\cos(2x) - 8D\\sin(2x) = 1 + \\cos(2x) \\implies A = -\\frac{1}{4},\\; B = -\\frac{1}{8},\\; D = 0",
        explanation: 'Note that y_p\'\' for cos(2x) gives -4B cos(2x), plus -4y_p gives -8B cos(2x).',
        arabicExplanation: 'بالتعويض ومقارنة المعاملات نجد أن A = -1/4 و B = -1/8 و D = 0.'
      }
    ],
    finalAnswerLatex: "y = C_1 e^{2x} + C_2 e^{-2x} - \\frac{1}{4} - \\frac{1}{8}\\cos(2x)",
    drillOptions: {
      methodChoices: [
        'Use identity 2 cos^2(x) = 1 + cos(2x), then Undetermined Coefficients with y_p = A + B cos(2x) + D sin(2x)',
        'Guess y_p = A cos^2(x) + B sin^2(x)',
        'Reduction of Order',
        'Homogeneous Substitution'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What must you do to 2 cos^2(x) BEFORE choosing the trial particular solution y_p?',
      keyStepChoices: [
        'Rewrite 2 cos^2(x) = 1 + cos(2x) using the double-angle identity',
        'Differentiate it twice',
        'Factor out cos(x)',
        'Use Variation of Parameters'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's27-ho-10',
    numberLabel: 'Sheet 2027 • Higher Order (10)',
    sourceExam: 'Official Revision Sheet Fall 2027',
    sourceYear: '2027 Revision',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2027__1__fc4471ef.pdf',
    points: 4,
    category: Category.UNDETERMINED_COEFFS,
    subCategory: 'Higher-Order ODE',
    methodTag: 'Undetermined Coefficients (Polynomial × Exponential)',
    arabicMethodTag: 'المعاملات غير المعينة (كثيرة حدود في دالة أسية)',
    difficulty: 'Trick',
    problemLatex: "y'' + 2y' + y = xe^{2x}",
    visualRecognitionTrigger: 'LHS is (m + 1)^2 = 0 (repeated root m = -1), while RHS has e^{+2x}.',
    arabicVisualTrigger: 'جذور المعادلة المساعدة هي m = -1، بينما الأس في الطرف الأيمن هو +2x (لا يوجد تداخل!).',
    examinerTrap: 'Thinking e^{2x} duplicates the root m = -1! Since +2 ≠ -1, there is NO resonance boost—simply guess y_p = (Ax + B)e^{2x}!',
    arabicExaminerTrap: 'الظن بوجود تداخل في الجذور! الجذر المتجانس هو -1 بينما الأس في الطرف الأيمن هو +2، لذا نفرض (Ax + B)e^{2x} بدون ضرب في x إضافية.',
    secretShortcut: 'm_1 = m_2 = -1 → y_h = (C_1 + C_2 x)e^{-x}. For y_p = (Ax + B)e^{2x}, P(2) = (2 + 1)^2 = 9, P\'(2) = 2(2 + 1) = 6 → 9A = 1 (A = 1/9) and 6A + 9B = 0 (B = -2/27)!',
    steps: [
      {
        stepNumber: 1,
        title: 'Find Homogeneous Solution y_h',
        arabicTitle: 'إيجاد الحل المتجانس y_h',
        formula: "m^2 + 2m + 1 = (m + 1)^2 = 0 \\implies y_h = (C_1 + C_2 x)e^{-x}",
        explanation: 'Repeated root m_1 = m_2 = -1.',
        arabicExplanation: 'جذر مكرر عند m = -1.'
      },
      {
        stepNumber: 2,
        title: 'Set Up y_p = (Ax + B)e^{2x} & Solve for A, B',
        arabicTitle: 'فرض y_p = (Ax + B)e^{2x} وإيجاد الثابتين A و B',
        formula: "y_p = (Ax + B)e^{2x} \\implies (9Ax + 6A + 9B)e^{2x} = xe^{2x} \\implies A = \\frac{1}{9},\\; B = -\\frac{2}{27}",
        explanation: '9A = 1 gives A = 1/9, and 6(1/9) + 9B = 0 gives B = -6/81 = -2/27.',
        arabicExplanation: 'بمقارنة المعاملات نجد أن A = 1/9 و B = -2/27.'
      }
    ],
    finalAnswerLatex: "y = (C_1 + C_2 x)e^{-x} + \\left(\\frac{1}{9}x - \\frac{2}{27}\\right)e^{2x}",
    drillOptions: {
      methodChoices: [
        'Undetermined Coefficients with y_p = (Ax + B)e^{2x} (since m = +2 is not a root of (m+1)^2 = 0)',
        'Undetermined Coefficients with y_p = x^2(Ax + B)e^{2x}',
        'Variation of Parameters',
        'Reduction of Order'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'Does the trial solution y_p for y\'\' + 2y\' + y = x e^{2x} get multiplied by x^2?',
      keyStepChoices: [
        'No, because the homogeneous root is m = -1, which does not match r = +2 in e^{2x}',
        'Yes, because m = -1 is a repeated root',
        'Yes, multiplied by x',
        'No, y_p = A x e^{2x} without B'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's27-ho-11',
    numberLabel: 'Sheet 2027 • Higher Order (11)',
    sourceExam: 'Official Revision Sheet Fall 2027',
    sourceYear: '2027 Revision',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2027__1__fc4471ef.pdf',
    points: 4,
    category: Category.UNDETERMINED_COEFFS,
    subCategory: 'Higher-Order ODE',
    methodTag: 'Undetermined Coefficients (Double-Angle Sine Trap: sin 3x cos 3x = ½ sin 6x)',
    arabicMethodTag: 'المعاملات غير المعينة (خدعة حاصل ضرب جا في جتا: sin 3x cos 3x = ½ sin 6x)',
    difficulty: 'Boss',
    problemLatex: "y'' + y = 3\\sin 3x\\cos 3x",
    visualRecognitionTrigger: 'Product of sine and cosine with the same angle: sin(3x)cos(3x) on the RHS.',
    arabicVisualTrigger: 'وجود حاصل ضرب sin(3x)cos(3x) في الطرف الأيمن.',
    examinerTrap: 'Trying to guess a product of sin(3x) and cos(3x) instead of using the double-angle identity sin(3x)cos(3x) = (1/2)sin(6x) first!',
    arabicExaminerTrap: 'عدم استخدام متطابقة ضعف الزاوية sin(3x)cos(3x) = (1/2)sin(6x) قبل فرض الحل الخاص!',
    secretShortcut: '3 sin(3x)cos(3x) = (3/2)sin(6x)! Then y\'\' + y = (3/2)sin(6x) with y_p = A sin(6x) gives (-36A + A) = -35A = 3/2 → A = -3/70 in 10 seconds!',
    steps: [
      {
        stepNumber: 1,
        title: 'Simplify RHS Using Double-Angle Identity & Find y_h',
        arabicTitle: 'تبسيط الطرف الأيمن بمتطابقة ضعف الزاوية وإيجاد y_h',
        formula: "3\\sin 3x\\cos 3x = \\frac{3}{2}\\sin(6x), \\quad m^2 + 1 = 0 \\implies y_h = C_1\\cos x + C_2\\sin x",
        explanation: 'Since sin(2θ) = 2 sin(θ)cos(θ), we have sin(3x)cos(3x) = (1/2)sin(6x).',
        arabicExplanation: 'من قانون ضعف الزاوية: sin(3x)cos(3x) = (1/2)sin(6x).'
      },
      {
        stepNumber: 2,
        title: 'Set Up y_p = A cos(6x) + B sin(6x) and Solve',
        arabicTitle: 'فرض الحل الخاص وإيجاد الثوابت',
        formula: "y_p = A\\cos(6x) + B\\sin(6x) \\implies -35A\\cos(6x) - 35B\\sin(6x) = \\frac{3}{2}\\sin(6x) \\implies A = 0,\\; B = -\\frac{3}{70}",
        explanation: 'Note that y_p\'\' + y_p = (-36 + 1)y_p = -35 y_p.',
        arabicExplanation: 'المشتقة الثانية لـ sin(6x) تعطي -36 sin(6x) ومع +1 تصبح -35B = 3/2.'
      }
    ],
    finalAnswerLatex: "y = C_1\\cos x + C_2\\sin x - \\frac{3}{70}\\sin(6x)",
    drillOptions: {
      methodChoices: [
        'Rewrite 3 sin(3x)cos(3x) = (3/2)sin(6x), then use Undetermined Coefficients',
        'Guess y_p = (A cos 3x + B sin 3x)(C cos 3x + D sin 3x)',
        'Reduction of Order',
        'Bernoulli ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'How does 3 sin(3x)cos(3x) simplify?',
      keyStepChoices: [
        '(3/2) sin(6x)',
        '3 sin(6x)',
        '(3/2) cos(6x)',
        '3 sin^2(3x)'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's27-ho-12',
    numberLabel: 'Sheet 2027 • Higher Order (12)',
    sourceExam: 'Official Revision Sheet Fall 2027',
    sourceYear: '2027 Revision',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2027__1__fc4471ef.pdf',
    points: 4,
    category: Category.UNDETERMINED_COEFFS,
    subCategory: 'Higher-Order ODE',
    methodTag: 'Undetermined Coefficients (Missing y Term → Root m = 0 Resonance Boost!)',
    arabicMethodTag: 'المعاملات غير المعينة (غياب الحد y يؤدي إلى ضرب كثيرة الحدود في x!)',
    difficulty: 'Boss',
    problemLatex: "y'' + y' = 2x + 3e^x",
    visualRecognitionTrigger: '2nd-order ODE missing the "y" term (m^2 + m = m(m + 1) = 0, so m = 0 IS A ROOT!), with polynomial 2x on the RHS.',
    arabicVisualTrigger: 'معادلة تخلو من الحد y (أي أن m = 0 جذر للمعادلة المتجانسة!) مع وجود كثيرة حدود 2x في الطرف الأيمن.',
    examinerTrap: 'Guessing y_p = Ax + B + D e^x! Because m = 0 is a root of m(m + 1) = 0, a constant B is ALREADY in y_h = C_1 + C_2 e^{-x}! You MUST multiply the polynomial part (Ax + B) by x to get x(Ax + B) = Ax^2 + Bx!',
    arabicExaminerTrap: 'أخطر فخ في المعاملات غير المعينة: نظراً لغياب الحد y فإن m = 0 جذر للمعادلة المساعدة، وبالتالي يجب ضرب فرض كثيرة الحدود (Ax + B) في x ليصبح (Ax^2 + Bx) + D e^x!',
    secretShortcut: 'Since y is missing (m = 0 is a root), boost the polynomial by x: y_p = x(Ax + B) + D e^x = Ax^2 + Bx + D e^x!',
    steps: [
      {
        stepNumber: 1,
        title: 'Find Homogeneous Solution y_h (Notice m = 0 is a Root!)',
        arabicTitle: 'إيجاد الحل المتجانس y_h (لاحظ أن m = 0 جذر!)',
        formula: "m^2 + m = m(m + 1) = 0 \\implies m_1 = 0,\\; m_2 = -1 \\implies y_h = C_1 + C_2 e^{-x}",
        explanation: 'Because C_1 is a constant in y_h, the polynomial part of y_p must be multiplied by x.',
        arabicExplanation: 'وجود الثابت C_1 في الحل المتجانس يحتم ضرب فرض كثيرة الحدود في x.'
      },
      {
        stepNumber: 2,
        title: 'Set Up Boosted Trial Solution y_p = x(Ax + B) + D e^x & Solve',
        arabicTitle: 'فرض الحل الخاص بعد الضرب في x وإيجاد الثوابت',
        formula: "y_p = Ax^2 + Bx + De^x \\implies y_p'' + y_p' = 2Ax + (2A + B) + 2De^x = 2x + 3e^x \\implies A = 1,\\; B = -2,\\; D = \\frac{3}{2}",
        explanation: 'Matching coefficients: 2A = 2 (A = 1), 2A + B = 0 (B = -2), and 2D = 3 (D = 3/2).',
        arabicExplanation: 'بمقارنة المعاملات نجد أن A = 1 و B = -2 و D = 3/2.'
      }
    ],
    finalAnswerLatex: "y = C_1 + C_2 e^{-x} + x^2 - 2x + \\frac{3}{2}e^x",
    drillOptions: {
      methodChoices: [
        'Undetermined Coefficients with boosted polynomial y_p = x(Ax + B) + D e^x = Ax^2 + Bx + D e^x',
        'Undetermined Coefficients with y_p = Ax + B + D e^x',
        'Undetermined Coefficients with y_p = x(Ax + B + D e^x)',
        'Reduction of Order'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'Why must the polynomial part (Ax + B) be multiplied by x in y\'\' + y\' = 2x + 3e^x?',
      keyStepChoices: [
        'Because the "y" term is missing, making m = 0 a root of the auxiliary equation m(m + 1) = 0',
        'Because m = 1 is a root of the auxiliary equation',
        'Because 2x has degree 2',
        'Because of the 3e^x term'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's27-ho-13',
    numberLabel: 'Sheet 2027 • Higher Order (13)',
    sourceExam: 'Official Revision Sheet Fall 2027',
    sourceYear: '2027 Revision',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2027__1__fc4471ef.pdf',
    points: 4,
    category: Category.VARIATION_OF_PARAMETERS,
    subCategory: 'Higher-Order ODE',
    methodTag: 'Variation of Parameters (Wronskian on cos x · tan x = sin x)',
    arabicMethodTag: 'تغيير البارامترات / أو المعاملات غير المعينة بعد تبسيط cos x tan x = sin x',
    difficulty: 'Boss',
    problemLatex: "y'' + y = \\cos x\\tan x",
    visualRecognitionTrigger: 'RHS looks like non-standard tan(x), UNTIL you notice cos(x) · tan(x) = cos(x) · (sin x / cos x) = sin(x)!',
    arabicVisualTrigger: 'خدعة بصرية رائعة: الطرف الأيمن مكتوب cos(x) tan(x) ولكنه يساوي cos(x)(sin x / cos x) = sin(x)!',
    examinerTrap: 'Jumping into complicated Wronskian integrals with tan(x) without simplifying cos(x) · tan(x) = sin(x) first! Once simplified to y\'\' + y = sin(x), you can solve it either by Variation of Parameters OR by Undetermined Coefficients with resonance boost y_p = x(A cos x + B sin x)!',
    arabicExaminerTrap: 'عدم تبسيط الطرف الأيمن أولاً! حاصل ضرب cos(x) في tan(x) هو ببساطة sin(x)! وبعدها تحل إما بتغيير البارامترات (Wronskian = 1) أو بالمعاملات غير المعينة مع الضرب في x لتداخل الجذر ±i.',
    secretShortcut: 'FIRST: cos(x) tan(x) = sin(x)! So the ODE is simply y\'\' + y = sin(x). With y_p = A x cos(x) + B x sin(x), we get -2A sin(x) + 2B cos(x) = sin(x) ⇒ A = -1/2, B = 0 ⇒ y_p = -(1/2)x cos(x)!',
    steps: [
      {
        stepNumber: 1,
        title: 'Simplify RHS: cos(x) tan(x) = sin(x) & Find y_h',
        arabicTitle: 'تبسيط الطرف الأيمن cos(x) tan(x) = sin(x) وإيجاد الحل المتجانس',
        formula: "\\cos x\\tan x = \\cos x\\cdot\\frac{\\sin x}{\\cos x} = \\sin x \\implies y'' + y = \\sin x, \\quad y_h = C_1\\cos x + C_2\\sin x",
        explanation: 'Simplifying cos(x)tan(x) to sin(x) avoids difficult secant integrals.',
        arabicExplanation: 'تبسيط الطرف الأيمن إلى sin(x) يوفر وقتاً هائلاً.'
      },
      {
        stepNumber: 2,
        title: 'Method A (Variation of Parameters W = 1) or Method B (Resonance y_p = Ax cos x + Bx sin x)',
        arabicTitle: 'إيجاد الحل الخاص y_p (سواء بطريقة Wronskian أو المعاملات غير المعينة)',
        formula: "W(\\cos x, \\sin x) = 1,\\quad u_1 = -\\int \\sin^2 x\\,dx = -\\frac{1}{2}x + \\frac{1}{4}\\sin 2x,\\quad u_2 = \\int \\sin x\\cos x\\,dx = \\frac{1}{2}\\sin^2 x \\implies y_p = -\\frac{1}{2}x\\cos x",
        explanation: 'Using Undetermined Coefficients with y_p = x(A cos x + B sin x) gives -2A sin x + 2B cos x = sin x ⇒ A = -1/2, B = 0, so y_p = -(1/2)x cos x immediately!',
        arabicExplanation: 'بفرض y_p = x(A cos x + B sin x) نجد فوراً أن A = -1/2 و B = 0 أي أن y_p = -(1/2)x cos x.'
      }
    ],
    finalAnswerLatex: "y = C_1\\cos x + C_2\\sin x - \\frac{1}{2}x\\cos x",
    drillOptions: {
      methodChoices: [
        'Simplify cos(x)tan(x) = sin(x) first, then use boosted y_p = x(A cos x + B sin x) or Variation of Parameters (W = 1)',
        'Guess y_p = A cos(x) + B sin(x) without multiplying by x',
        'Bernoulli Substitution',
        'Homogeneous ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the secret trick on the right-hand side of y\'\' + y = cos(x) tan(x)?',
      keyStepChoices: [
        'cos(x) tan(x) simplifies immediately to sin(x), which duplicates the homogeneous root m = ±i',
        'tan(x) must be expanded in a Taylor series',
        'Divide both sides by cos(x)',
        'Substitute u = tan(x)'
      ],
      correctKeyStepIndex: 0
    }
  },
  ...FINAL_SHEET_AND_NOTES_QUESTIONS,
  ...FINAL_EXAMS_1_TO_3_QUESTIONS,
  ...FINAL_EXAMS_4_TO_6_QUESTIONS
];

// ============================================================================
// THE 18 GOLDEN EXAM QUESTIONS (EMERGENCY PLAYLIST — MIDTERM & FINAL)
// Covers 100% of every Midterm & Final exam archetype and trick without repetition
// ============================================================================
export const GOLDEN_12_QUESTION_IDS: string[] = [
  'f24-q1a',       // #1: Separable sec(y) + x^2/cos(y) + compound exponent e^(2-y)
  'f25-q1a',       // #2: Separable e^(2x - y^2) with [1/2] missing derivative box trick
  'fin5-q1a',      // #3: Final 5/6 Q1a Disguised Log Cancellation ln(x/y) + ln y = ln x
  'f20-q1b',       // #4: Reducible to Separable z = x + y with -1 cancellation
  'f21-q1c',       // #5: Homogeneous disguised logarithm ln(y) - ln(x) = ln(y/x)
  'f25-q1c',       // #6: Non-Exact ODE with integrating factor μ(x) = e^x + Strike-Out Duplicate
  'fin1-q1c',      // #7: Final 1 Q1c Non-Exact ODE with μ(y) = y via (N_x - M_y)/M
  'f23-q1d',       // #8: Bernoulli P*, Q* shortcut + 3-row Tabular Integration by Parts box
  'f25-q2a',       // #9: 6th-Order Homogeneous ODE with m^3 = 0 triple root + synthetic division
  's27-ho-9',      // #10: Undetermined Coefficients double-angle trig trap (2cos^2 x = 1 + cos 2x)
  's27-ho-12',     // #11: Undetermined Coefficients missing-y resonance boost (y'' + y' = 2x + 3e^x)
  'fin5-q2a-b-c',  // #12: Final 5/6 Q2 Variation of Parameters (sec x csc x) + y'' - y' = 5x + e^{3x}
  'f23-q2c',       // #13: Reduction of Order given y_1 = x (x^2 y'' + xy' - y = x)
  'f25-q2b-1',     // #14: RLC & Spring-Mass Physical Application (1/C = 1/0.02 = 50 repeated root)
  'fin1-q3b-all',  // #15: Forward Laplace Master Archetypes (Trig, Integral, Combined Shift e^7, Div by t)
  's24f-ilap-2f',  // #16: Inverse Laplace Boss (Combined Second Shift e^{-6s} + Completing Square)
  'fin3-q3a-b-c',  // #17: Improper Integral via Laplace (s=3) + Laplace ODE IVP
  'fin1-q5-all',   // #18: Legendre Recurrence Proof + Orthogonality Integrals & Fourier Half-Range
];

export interface DecisionTreeNode {
  id: string;
  stepNumber: number;
  orderGroup:
    | 'First-Order ODE (Q1)'
    | 'Higher-Order ODE (Q2)'
    | 'Laplace & Inverse Laplace (Q3 & Q4a)'
    | 'Fourier Series & Legendre (Q4b & Q5)';
  ifYouSeeTitle: string;
  arabicIfYouSee: string;
  visualPatternLatex: string;
  instantTestLatex: string;
  doThisAction: string;
  arabicDoThis: string;
  solutionFormulaLatex: string;
  killerTrapWarning: string;
  sampleQuestionId: string;
  sampleEquationLatex: string;
}

export const VISUAL_DECISION_TREE_NODES: DecisionTreeNode[] = [
  {
    id: 'dt-1-separable',
    stepNumber: 1,
    orderGroup: 'First-Order ODE (Q1)',
    ifYouSeeTitle: 'IF YOU SEE: Compound Exponents OR sec(y) + xⁿ / cos(y)',
    arabicIfYouSee: 'إذا رأيت: أس مركب مثل e^{2x-y²} أو مجموع sec(y) مع 1/cos(y)',
    visualPatternLatex: "e^{ax + by}, \\quad \\sec(y) + \\frac{x^n}{\\cos(y)}, \\quad \\text{or} \\quad f(x)g(y)y' = h(x)k(y)",
    instantTestLatex: "e^{a+b} = e^a \\cdot e^b, \\quad \\frac{1}{\\cos y} = \\sec y \\implies \\sec y(1 + x^n)",
    doThisAction: 'DO THIS: Split the exponent, factor out sec(y), put all y terms with dy on the left, and all x terms with dx on the right.',
    arabicDoThis: 'افصل الأس المركب، اسحب sec(y) كعامل مشترك، واجعل كل حدود y مع dy في اليسار وحدود x مع dx في اليمين.',
    solutionFormulaLatex: "\\int g(y)\\,dy = \\int f(x)\\,dx + C",
    killerTrapWarning: 'When moving e^{-y^2} to the other side, flip the exponent sign to e^{+y^2} and insert [1/2] ∫ 2y e^{y^2} dy!',
    sampleQuestionId: 'f24-q1a',
    sampleEquationLatex: "e^{-y}\\frac{dy}{dx} = e^{2-y}\\left(\\sec y + \\frac{x^2}{\\cos y}\\right)"
  },
  {
    id: 'dt-2-reducible',
    stepNumber: 2,
    orderGroup: 'First-Order ODE (Q1)',
    ifYouSeeTitle: 'IF YOU SEE: A Repeated Linear Block (x + y), (x - y), or (y + 2x)',
    arabicIfYouSee: 'إذا رأيت: قوس خطي مكرر مثل (x + y) أو (x - y) أو (y + 2x)',
    visualPatternLatex: "y' = (x+y)\\ln(x+y) - 1, \\quad y' = -\\sin(x-y)+1, \\quad y' = \\frac{x-y+1}{x-y-1}",
    instantTestLatex: "z = ax + by \\implies z' = a + by'",
    doThisAction: 'DO THIS: Substitute z = the repeated linear bracket. The constant term (-1 or +1) will cancel out and reduce it to a 1-step separable ODE!',
    arabicDoThis: 'افرض المتغير z يساوي القوس الخطي المكرر (مثل z = x - y)، سيختصر الرقم الثابت وتتحول إلى فصل متغيرات فوراً.',
    solutionFormulaLatex: "z = x - y \\implies y' = 1 - z' \\implies \\int \\frac{dz}{F(z)} = \\int dx + C",
    killerTrapWarning: 'Never expand sin(x-y) or ln(x+y)!',
    sampleQuestionId: 'fin2-q1b',
    sampleEquationLatex: "\\frac{dy}{dx} = -\\sin(x - y) + 1"
  },
  {
    id: 'dt-3-homogeneous',
    stepNumber: 3,
    orderGroup: 'First-Order ODE (Q1)',
    ifYouSeeTitle: 'IF YOU SEE: Ratio (y/x), Log Difference (ln y - ln x), or Equal-Degree Terms',
    arabicIfYouSee: 'إذا رأيت: الكسر (y/x)، أو (ln y - ln x)، أو حدود متساوية في مجموع الأسس',
    visualPatternLatex: "\\cos\\left(\\frac{y}{x}\\right), \\quad e^{y/x}, \\quad \\frac{y^2}{x^2}+\\frac{5y}{x}+4, \\quad x^3 y' = y^3 + xy^2 - x^2y",
    instantTestLatex: "\\frac{y}{x} = u \\implies y = xu \\implies y' = xu' + u",
    doThisAction: 'DO THIS: Replace y/x with u and y\' with x u\' + u. Watch the "+u" term simplify the RHS, then separate u and x!',
    arabicDoThis: 'عوض عن y/x بـ u وعن y\' بـ xu\' + u، ثم افصل المتغيرات بين u و x.',
    solutionFormulaLatex: "x\\frac{du}{dx} = F(u) - u \\implies \\int \\frac{du}{F(u) - u} = \\int \\frac{dx}{x} = \\ln|x| + C",
    killerTrapWarning: 'Watch out for Final 5 Q1a: ln(x/y) + ln y = ln x - ln y + ln y = ln x (Separable decoy, not Homogeneous!).',
    sampleQuestionId: 'f25-q1b',
    sampleEquationLatex: "xy' - y = x^2 e^{(y/x)}"
  },
  {
    id: 'dt-4-exact',
    stepNumber: 4,
    orderGroup: 'First-Order ODE (Q1)',
    ifYouSeeTitle: 'IF YOU SEE: Differential Form M(x,y) dx + N(x,y) dy = 0',
    arabicIfYouSee: 'إذا رأيت: الصورة التفاضلية القياسية M(x,y) dx + N(x,y) dy = 0',
    visualPatternLatex: "M(x,y)\\,dx + N(x,y)\\,dy = 0",
    instantTestLatex: "\\text{Compute } M_y = \\frac{\\partial M}{\\partial y} \\quad \\text{and} \\quad N_x = \\frac{\\partial N}{\\partial x}",
    doThisAction: 'DO THIS: Test M_y = N_x FIRST (takes 5 seconds!). If equal → Exact (integrate both and slash duplicates). If not equal → find μ(x) or μ(y) and multiply!',
    arabicDoThis: 'احسب M_y و N_x أولاً دائماً! إذا تساويا فهي تامة (كامل واشطب المكرر)، وإذا اختلفا احسب عامل التكامل μ.',
    solutionFormulaLatex: "\\text{If } M_y = N_x: \\int M\\,dx + \\int (\\text{non-duplicate } N)\\,dy = C \\quad | \\quad \\mu(x) = e^{\\int \\frac{M_y - N_x}{N}dx}, \\; \\mu(y) = e^{\\int \\frac{N_x - M_y}{M}dy}",
    killerTrapWarning: 'In Final 1 Q1c, (N_x - M_y) = x + y + 1 cancels the (x + y + 1) factor in M = y(x + y + 1) to give μ(y) = y!',
    sampleQuestionId: 'fin1-q1c',
    sampleEquationLatex: "y(x+y+1)\\,dx + x(x+3y+2)\\,dy = 0"
  },
  {
    id: 'dt-5-linear-bernoulli',
    stepNumber: 5,
    orderGroup: 'First-Order ODE (Q1)',
    ifYouSeeTitle: 'IF YOU SEE: y\' and y¹ (Linear) OR y\' and y¹ with yⁿ on RHS (Bernoulli)',
    arabicIfYouSee: 'إذا رأيت: y\' و y أس ١ (خطية) أو معها y^n في الطرف الأيمن (برنولي)',
    visualPatternLatex: "y' + P(x)y = Q(x) \\quad \\text{(Linear)} \\qquad \\text{or} \\qquad y' + P(x)y = Q(x)y^n \\quad \\text{(Bernoulli)}",
    instantTestLatex: "\\text{Step 0: Divide by coefficient of } y'! \\quad \\text{For Bernoulli: } P^*(x) = (1-n)P(x), \\; Q^*(x) = (1-n)Q(x)",
    doThisAction: 'DO THIS: Divide by whatever is in front of y\' FIRST. If Bernoulli, multiply P and Q by (1 - n), compute μ = e^{∫ P* dx}, and write y^{1-n} directly!',
    arabicDoThis: 'اقسم على معامل y\' أولاً! وفي حالة برنولي اضرب P و Q في (1-n) واستخدم قانون الحل المباشر لـ y^{1-n}.',
    solutionFormulaLatex: "y^{1-n} = \\frac{1}{\\mu}\\left[\\int \\mu(x)Q^*(x)\\,dx + C\\right] \\quad \\text{(for Linear, } n = 0 \\implies 1-n = 1\\text{)}",
    killerTrapWarning: 'Never read P(x) before dividing by the leading x, (1+x^2), or sin(x) in front of y\'!',
    sampleQuestionId: 'f23-q1d',
    sampleEquationLatex: "y' + y = xe^{6x}y^5"
  },
  {
    id: 'dt-6-higher-homog',
    stepNumber: 6,
    orderGroup: 'Higher-Order ODE (Q2)',
    ifYouSeeTitle: 'IF YOU SEE: Higher Derivatives (y\'\', y\'\'\', d⁵y/dx⁵, d⁶y/dx⁶) = 0 with Constant Coeffs',
    arabicIfYouSee: 'إذا رأيت: مشتقات عليا بمعاملات ثابتة تساوي صفراً',
    visualPatternLatex: "a_n y^{(n)} + \\dots + a_1 y' + a_0 y = 0 \\implies a_n m^n + \\dots + a_1 m + a_0 = 0",
    instantTestLatex: "\\text{Factor } m^k \\text{ if lower derivatives are missing! Check if } \\sum a_i = 0 \\implies m = 1 \\text{ is a root!}",
    doThisAction: 'DO THIS: Factor out m^k first (m^3 = 0 gives C_1 + C_2 x + C_3 x^2). For cubics, test m = 1, -1, -2, 3 via synthetic division.',
    arabicDoThis: 'اسحب أصغر أس m^k كعامل مشترك أولاً (m^3 = 0 تعطي 3 ثوابت C_1 + C_2x + C_3x^2)، ثم جرب الجذور 1, -1, -2, 3.',
    solutionFormulaLatex: "\\text{Distinct: } C_1e^{m_1x}+C_2e^{m_2x} \\; | \\; \\text{Repeated: } (C_1+C_2x)e^{mx} \\; | \\; \\text{Complex } \\alpha\\pm i\\beta: e^{\\alpha x}(C_1\\cos\\beta x+C_2\\sin\\beta x)",
    killerTrapWarning: 'For m^3 = 0, writing only C_1 instead of C_1 + C_2 x + C_3 x^2 loses half the marks!',
    sampleQuestionId: 'f25-q2a',
    sampleEquationLatex: "\\frac{d^6y}{dx^6} + 5\\frac{d^5y}{dx^5} + 9\\frac{d^4y}{dx^4} + 6\\frac{d^3y}{dx^3} = 0"
  },
  {
    id: 'dt-7-undetermined',
    stepNumber: 7,
    orderGroup: 'Higher-Order ODE (Q2)',
    ifYouSeeTitle: 'IF YOU SEE: Non-Zero RHS with e^{ax}, sin/cos, Polynomials vs. sec/tan/csc',
    arabicIfYouSee: 'إذا رأيت: طرف أيمن غير صفري (أسية، مثلثية sin/cos، كثيرة حدود) مقابل (sec/tan/csc)',
    visualPatternLatex: "ay'' + by' + cy = G(x) \\quad \\text{(Undetermined Coeffs for } e^{ax},\\sin,\\cos,x^n \\text{ | Wronskian for } \\sec,\\tan,\\csc\\text{)}",
    instantTestLatex: "\\text{If } G(x) = \\sec x, \\tan x, \\sec x\\tan x, \\sec x\\csc x \\implies \\text{Variation of Parameters } (W = 1)!",
    doThisAction: 'DO THIS: For e^{ax}, sin/cos, x^n → Undetermined Coefficients (check Resonance boost x^r!). For sec, tan, csc → Variation of Parameters with u_1 = cos x, u_2 = sin x, W = 1!',
    arabicDoThis: 'للدوال الأسية و sin/cos وكثيرات الحدود استخدم المعاملات غير المعينة (وانتبه للرنين)، أما لـ sec و tan و csc فاستخدم طريقة فرونسكي!',
    solutionFormulaLatex: "y = y_h + y_p \\quad | \\quad y_p = u_1\\int \\frac{-u_2 f(x)}{W}dx + u_2\\int \\frac{u_1 f(x)}{W}dx",
    killerTrapWarning: 'In y\'\' - y\' = 5x + e^{3x} (Final 5 Q2c) and y\'\' + y\' = 2x + 3e^x (Sheet HO #12), y is missing so m = 0 is a root! Boost the polynomial to x(Ax+B)!',
    sampleQuestionId: 'fin5-q2a-b-c',
    sampleEquationLatex: "y'' - y' = 5x + e^{3x} \\quad \\text{and} \\quad y'' + y = \\sec(x)\\csc(x)"
  },
  {
    id: 'dt-8-reduction',
    stepNumber: 8,
    orderGroup: 'Higher-Order ODE (Q2)',
    ifYouSeeTitle: 'IF YOU SEE: "Given that y = y₁(x) is a homogeneous solution" (Reduction of Order)',
    arabicIfYouSee: 'إذا رأيت: جملة "Given that y = ... is a solution" (اختزال الرتبة)',
    visualPatternLatex: "P(x)y'' + Q(x)y' + R(x)y = G(x), \\quad \\text{given } y_1 = x, \\; e^{2x}, \\; \\text{or } \\cos(x)",
    instantTestLatex: "y = y_1 v \\implies \\text{Compute } y' \\text{ and } y'' \\text{ and plug into ODE}",
    doThisAction: 'DO THIS: Substitute y = y_1 v. All non-derivative "v" terms MUST cancel to 0! Then let z = v\' and z\' = v\'\', solve 1st-order linear ODE for z, integrate for v, and multiply by y_1!',
    arabicDoThis: 'عوض بـ y = y_1 v، ستختصر حدود v الخالية من المشتقات تماماً! ثم ضع z = v\' وحلها كمعادلة خطية من الرتبة الأولى.',
    solutionFormulaLatex: "z = v', \\quad z' + P_{\\text{red}}(x)z = Q_{\\text{red}}(x) \\implies v = \\int z\\,dx \\implies y = y_1(x)\\cdot v(x)",
    killerTrapWarning: 'Never stop at v(x)! You must multiply v(x) by y_1(x) at the very end to write y(x).',
    sampleQuestionId: 'f23-q2c',
    sampleEquationLatex: "x^2 y'' + xy' - y = x, \\quad (y_1 = x)"
  },
  {
    id: 'dt-9-laplace',
    stepNumber: 9,
    orderGroup: 'Laplace & Inverse Laplace (Q3 & Q4a)',
    ifYouSeeTitle: 'IF YOU SEE: Forward Laplace L{f(t)} with e^{at}, u_a(t), tⁿ, ÷t, or ∫₀ᵗ dτ',
    arabicIfYouSee: 'إذا رأيت: مطلوب تحويل لابلاس المباشر L{f(t)} مع إزاحة أو تكامل أو ضرب/قسمة على t',
    visualPatternLatex: "e^{at}f(t), \\quad u_a(t)f(t-a), \\quad t^n f(t), \\quad \\frac{f(t)}{t}, \\quad \\int_0^t f(\\tau)\\,d\\tau",
    instantTestLatex: "\\text{Check if } u_a(t) \\text{ has unshifted } t \\text{ (e.g. } e^t = e^a e^{t-a}, \\; t^2 = ((t-a)+a)^2\\text{)}!",
    doThisAction: 'DO THIS: (1) Reduce sin²/cos²/products first; (2) For ∫_0^t, divide by s; (3) For t^n, take (-1)^n d^n/ds^n; (4) For ÷t, integrate ∫_s^∞; (5) For u_a(t), align all t to (t-a) and pull out e^{-as}!',
    arabicDoThis: 'فك التربيع والضرب المثلثي أولاً، للتكامل اقسم على s، للضرب في t اشتق، للقسمة على t كامل من s إلى ∞، ولدالة الخطوة وحد كل t إلى (t-a).',
    solutionFormulaLatex: "\\mathcal{L}\\{e^{at}f(t)\\}=F(s-a), \\; \\mathcal{L}\\{u_a(t)f(t-a)\\}=e^{-as}F(s), \\; \\mathcal{L}\\left\\{\\int_0^t f(\\tau)d\\tau\\right\\}=\\frac{F(s)}{s}",
    killerTrapWarning: 'If the integral upper limit is INFINITY ∫_0^∞ e^{-3t} sin²t dt (Final 3 Q3a), do NOT divide by s! Find L{sin²t} and plug in the number s = 3!',
    sampleQuestionId: 'fin1-q3b-all',
    sampleEquationLatex: "f(t) = u_7(t)e^t\\cos(t-7) \\quad \\text{and} \\quad f(t) = t^{11}e^{5t} + \\frac{\\cos 4t - \\cos 5t}{t}"
  },
  {
    id: 'dt-10-inv-laplace',
    stepNumber: 10,
    orderGroup: 'Laplace & Inverse Laplace (Q3 & Q4a)',
    ifYouSeeTitle: 'IF YOU SEE: Inverse Laplace L⁻¹{F(s)} with ln(...), tan⁻¹(...), e^{-as}, or Quadratics',
    arabicIfYouSee: 'إذا رأيت: لابلاس العكسي لـ ln أو tan⁻¹ أو e^{-as} أو مقام تربيعي',
    visualPatternLatex: "\\ln\\left(\\frac{s+a}{s+b}\\right), \\quad \\tan^{-1}\\left(\\frac{s}{a}\\right), \\quad \\frac{s+9}{s^2+6s+3}e^{-6s}, \\quad \\frac{P(s)}{s(s-a)(s-b)}",
    instantTestLatex: "\\ln / \\tan^{-1} \\implies f(t) = -\\frac{1}{t}\\mathcal{L}^{-1}\\{F'(s)\\} \\quad | \\quad s^2+2bs+c = (s+b)^2 + (c-b^2)",
    doThisAction: 'DO THIS: For ln/tan⁻¹, expand log laws first, differentiate w.r.t. s, invert, and divide by (-t). For unfactorable quadratics, complete the square to (s+b)² ± k and rewrite numerator s as (s+b) - b!',
    arabicDoThis: 'للوغاريتم و tan⁻¹ اشتق بالنسبة لـ s ثم اقسم على (-t). وللمقام التربيعي أكمل المربع إلى (s+b)² واكتب البسط بدلالة (s+b).',
    solutionFormulaLatex: "f(t) = -\\frac{1}{t}\\mathcal{L}^{-1}\\{F'(s)\\}, \\qquad \\mathcal{L}^{-1}\\{e^{-as}G(s)\\} = u_a(t)g(t-a)",
    killerTrapWarning: 'When e^{-as} multiplies a fraction, invert the fraction completely first to get g(t), then at the very end replace EVERY t with (t - a) and multiply by u_a(t)!',
    sampleQuestionId: 's24f-ilap-2f',
    sampleEquationLatex: "F(s) = \\frac{(s+9)e^{-6s}}{s^2+6s+3} \\quad \\text{and} \\quad F(s) = \\ln\\left(\\frac{s+3}{s+1}\\right) + \\tan^{-1}\\left(\\frac{s}{2}\\right)"
  },
  {
    id: 'dt-11-fourier',
    stepNumber: 11,
    orderGroup: 'Fourier Series & Legendre (Q4b & Q5)',
    ifYouSeeTitle: 'IF YOU SEE: "Represent f(x) as Fourier Series / Cosine Series / Sine Series"',
    arabicIfYouSee: 'إذا رأيت: مثل الدالة كمتسلسلة فورييه أو متسلسلة جيب التمام أو الجيب',
    visualPatternLatex: "f(x) \\text{ on } [-T, T] \\quad \\text{vs.} \\quad f(x) \\text{ on } [0, T] \\text{ (Cosine or Sine Series)}",
    instantTestLatex: "\\text{On } [-T,T]: \\text{ test } f(-x) = \\pm f(x). \\quad \\text{On } [0,T]: \\text{ Cosine} \\implies b_n=0; \\; \\text{Sine} \\implies a_0=a_n=0!",
    doThisAction: 'DO THIS: Identify T first! Use symmetry or the half-range name ("Cosine" vs "Sine") to zero out half the coefficients immediately, then use Tabular IBP with sin(nπ)=0 and cos(nπ)=(-1)ⁿ!',
    arabicDoThis: 'حدد قيمة نصف الدورة T أولاً! استخدم التماثل أو اسم المتسلسلة (Cosine أو Sine) لتصفير نصف المعاملات فوراً، ثم كامل بالجدول.',
    solutionFormulaLatex: "a_0 = \\frac{2}{T}\\int_0^T f(x)dx, \\quad a_n = \\frac{2}{T}\\int_0^T f(x)\\cos\\frac{n\\pi x}{T}dx, \\quad b_n = \\frac{2}{T}\\int_0^T f(x)\\sin\\frac{n\\pi x}{T}dx",
    killerTrapWarning: 'If asked for the Fourier Sine Series of f(x) = x² or x⁴ on [0, π], do NOT say "even so b_n = 0"! Sine Series ALWAYS means a_0 = a_n = 0!',
    sampleQuestionId: 's24f-four-4d',
    sampleEquationLatex: "f(x) = 5x^2, \\quad 0 \\le x \\le 2 \\quad \\text{(Fourier Sine Series)}"
  },
  {
    id: 'dt-12-legendre',
    stepNumber: 12,
    orderGroup: 'Fourier Series & Legendre (Q4b & Q5)',
    ifYouSeeTitle: 'IF YOU SEE: Legendre Recurrence Relation & Definite Integrals ∫_{-1}¹ P_n(x) dx',
    arabicIfYouSee: 'إذا رأيت: علاقة تكرار ليجندر وتكاملات محددة من -1 إلى 1 لـ P_n(x)',
    visualPatternLatex: "xP_n(x) = \\frac{n+1}{2n+1}P_{n+1}(x) + \\frac{n}{2n+1}P_{n-1}(x), \\qquad \\int_{-1}^1 xP_n(x)P_{n+1}(x)\\,dx",
    instantTestLatex: "\\int_{-1}^1 P_m(x)P_n(x)\\,dx = \\begin{cases} 0, & m \\neq n \\\\ \\frac{2}{2n+1}, & m = n \\end{cases}",
    doThisAction: 'DO THIS: Never expand P_n(x)! Use orthogonality 2/(2n+1) for squared P_n²(x). For ∫_{-1}¹ x P_n(x) P_{n+1}(x) dx, substitute x P_n(x) from the recurrence relation so only the P_{n+1}²(x) integral survives!',
    arabicDoThis: 'لا تفك كثيرات حدود ليجندر أبداً! استخدم قانون التعامد 2/(2n+1)، وفي تكامل x P_n P_{n+1} عوض من علاقة التكرار.',
    solutionFormulaLatex: "\\int_{-1}^1 P_n^2(x)\\,dx = \\frac{2}{2n+1}, \\qquad \\int_{-1}^1 xP_n(x)P_{n+1}(x)\\,dx = \\frac{n+1}{2n+1}\\cdot\\frac{2}{2n+3}",
    killerTrapWarning: 'Remember P_0(x) = 1 and P_1(x) = x! So ∫_{-1}¹ x P_1(x) dx = ∫_{-1}¹ P_1²(x) dx = 2/3, and ∫_{-1}¹ P_0(x) P_3²(x) dx = 2/7!',
    sampleQuestionId: 'fin1-q5-all',
    sampleEquationLatex: "\\int_{-1}^1 P_3^2(x)\\,dx = \\frac{2}{7} \\quad \\text{and} \\quad \\int_{-1}^1 xP_7(x)P_8(x)\\,dx = \\frac{16}{255}"
  }
];
