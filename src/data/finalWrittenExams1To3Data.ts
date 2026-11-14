import { Category } from '../types';
import { MasterExamQuestion } from './masterExamBankData';

export const FINAL_EXAMS_1_TO_3_QUESTIONS: MasterExamQuestion[] = [
  // ============================================================================
  // FINAL EXAM 1: FALL 2017–2018 (MTH203, 15/1/2018 — Final_1___1__7cf7076f.pdf)
  // ============================================================================
  {
    id: 'fin1-q1a',
    numberLabel: 'Final 1 (Fall 2017–18) Q1(a)',
    sourceExam: 'Final 1: Fall 2017–2018 Final',
    sourceYear: '2017–2018',
    sourceFileUrl: '/assets/aistudio/Final_1___1__7cf7076f.pdf',
    points: 2,
    category: Category.SEPARATION,
    subCategory: 'First-Order ODE',
    methodTag: 'Separable ODE (Logarithmic Cot/Tan Integration)',
    arabicMethodTag: 'فصل المتغيرات (تكامل دالتي cot و tan باللوغاريتمات)',
    difficulty: 'Core',
    problemLatex: '\\cos(x)\\cos(y)\\frac{dy}{dx} = -\\sin(x)\\sin(y)',
    problemStatement: 'Solve the following differential equation:',
    visualRecognitionTrigger: 'Pure product of functions of x and functions of y on both sides.',
    arabicVisualTrigger: 'حاصل ضرب دوال في x ودوال في y في الطرفين، تفصل بالقسمة مباشرة.',
    examinerTrap: 'Remember d/dx(sin x) = +cos x, whereas d/dx(cos x) = -sin x! Since the RHS already has a minus sign (-sin x / cos x), its integral is +ln|cos x|!',
    arabicExaminerTrap: 'مشتقة cos(x) هي -sin(x)، وبما أن الإشارة السالبة موجودة جاهزة في الطرف الأيمن فإن التكامل يعطي +ln|cos x|!',
    secretShortcut: '∫ (cos y / sin y) dy = ∫ (-sin x / cos x) dx ⇒ ln|sin y| = ln|cos x| + ln C ⇒ sin y = C cos x.',
    steps: [
      {
        stepNumber: 1,
        title: 'Separate Variables (y with dy, x with dx)',
        arabicTitle: 'فصل المتغيرات (قسمة الطرفين على sin y cos x)',
        formula: '\\frac{\\cos(y)}{\\sin(y)}\\,dy = \\frac{-\\sin(x)}{\\cos(x)}\\,dx',
        explanation: 'Divide both sides by cos(x) sin(y).',
        arabicExplanation: 'نقسم الطرفين على cos(x) sin(y) لفصل المتغيرات.'
      },
      {
        stepNumber: 2,
        title: 'Integrate Both Sides Using ∫ f\'/f = ln|f|',
        arabicTitle: 'إجراء التكامل للطرفين بقاعدة البسط مشتقة المقام',
        formula: '\\int \\frac{\\cos(y)}{\\sin(y)}\\,dy = \\int \\frac{-\\sin(x)}{\\cos(x)}\\,dx \\implies \\ln|\\sin(y)| = \\ln|\\cos(x)| + C',
        explanation: 'In both integrals, the numerator is the exact derivative of the denominator.',
        arabicExplanation: 'البسط هو مشتقة المقام تماماً في كلا الطرفين.'
      }
    ],
    finalAnswerLatex: '\\ln|\\sin(y)| = \\ln|\\cos(x)| + C \\quad (\\text{or } \\sin(y) = K\\cos(x))',
    drillOptions: {
      methodChoices: [
        'Separable ODE: (cos y / sin y) dy = (-sin x / cos x) dx',
        'Exact ODE',
        'Homogeneous Substitution y = vx',
        'Bernoulli ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the result of integrating ∫ (cos y / sin y) dy = ∫ (-sin x / cos x) dx?',
      keyStepChoices: [
        'ln|sin y| = ln|cos x| + C',
        'ln|sin y| = -ln|cos x| + C',
        'tan y = -cot x + C',
        '-ln|cos y| = ln|sin x| + C'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'fin1-q1b',
    numberLabel: 'Final 1 (Fall 2017–18) Q1(b)',
    sourceExam: 'Final 1: Fall 2017–2018 Final',
    sourceYear: '2017–2018',
    sourceFileUrl: '/assets/aistudio/Final_1___1__7cf7076f.pdf',
    points: 4,
    category: Category.HOMOGENEOUS,
    subCategory: 'First-Order ODE',
    methodTag: 'Homogeneous ODE (Degree 2 Rational Function)',
    arabicMethodTag: 'معادلة متجانسة من الدرجة الثانية (التعويض y = vx)',
    difficulty: 'Trick',
    problemLatex: '\\frac{dy}{dx} = \\frac{2xy}{3x^2 - y^2}',
    problemStatement: 'Solve the following differential equation (also on Fall 2024 Sheet FO #7):',
    visualRecognitionTrigger: 'Every term in the numerator (2xy) and denominator (3x^2, y^2) has total degree 2!',
    arabicVisualTrigger: 'جميع الحدود في البسط والمقام من الدرجة الثانية (مجموع الأسس = ٢).',
    examinerTrap: 'When computing 2v/(3-v^2) - v, bring to a common denominator carefully: [2v - v(3-v^2)]/(3-v^2) = (v^3 - v)/(3-v^2). Then use partial fractions or u = v^2 on (3-v^2)/[v(v^2-1)]!',
    arabicExaminerTrap: 'انتبه لتوحيد المقامات عند طرح v: الناتج هو (v^3 - v)/(3 - v^2).',
    secretShortcut: 'Even faster: write (3-v^2)/[v(v^2-1)] = [3(v^2-1) - 4v^2 + 3] or use Partial Fractions: -3/v + 1/(v-1) + 1/(v+1)!',
    steps: [
      {
        stepNumber: 1,
        title: 'Substitute y = vx and dy/dx = v + x(dv/dx)',
        arabicTitle: 'التعويض بـ y = vx وفصل المتغيرات',
        formula: 'v + x\\frac{dv}{dx} = \\frac{2v}{3-v^2} \\implies x\\frac{dv}{dx} = \\frac{2v - 3v + v^3}{3-v^2} = \\frac{v(v^2-1)}{3-v^2}',
        explanation: 'Divide numerator and denominator by x^2 and replace y/x with v.',
        arabicExplanation: 'نقسم بسطاً ومقاماً على x^2 ونعوض عن y/x بـ v ثم نوحد المقام.'
      },
      {
        stepNumber: 2,
        title: 'Separate Variables and Decompose via Partial Fractions',
        arabicTitle: 'فصل المتغيرات وتحليل الكسور الجزئية',
        formula: '\\int \\frac{3-v^2}{v(v^2-1)}\\,dv = \\int \\left(-\\frac{3}{v} + \\frac{2v}{v^2-1}\\right)dv = \\int \\frac{dx}{x}',
        explanation: 'Notice 3 - v^2 = -3(v^2 - 1) + 2v^2! Dividing by v(v^2 - 1) immediately gives -3/v + 2v/(v^2 - 1) without even needing full partial fractions!',
        arabicExplanation: 'بكتابة البسط 3 - v^2 = -3(v^2 - 1) + 2v^2 يتفكك الكسر فوراً إلى -3/v + 2v/(v^2-1)!'
      },
      {
        stepNumber: 3,
        title: 'Integrate and Substitute v = y/x Back',
        arabicTitle: 'إجراء التكامل وإرجاع v = y/x',
        formula: '-3\\ln|v| + \\ln|v^2-1| = \\ln|x| + C \\implies -3\\ln\\left|\\frac{y}{x}\\right| + \\ln\\left|\\frac{y^2}{x^2}-1\\right| = \\ln|x| + C \\implies \\frac{y^2-x^2}{y^3} = K',
        explanation: 'Integrating gives logarithms directly.',
        arabicExplanation: 'بعد التكامل نرجع كل v إلى y/x.'
      }
    ],
    finalAnswerLatex: '\\ln\\left|\\frac{y^2}{x^2}-1\\right| - 3\\ln\\left|\\frac{y}{x}\\right| = \\ln|x| + C \\quad \\left(\\text{or } y^2 - x^2 = Ky^3\\right)',
    drillOptions: {
      methodChoices: [
        'Homogeneous ODE (y = vx) + Algebraic Split (3-v²)/[v(v²-1)] = -3/v + 2v/(v²-1)',
        'Exact ODE',
        'Linear ODE with Integrating Factor',
        'Separable ODE directly'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the clever 5-second decomposition of (3 - v²) / [v(v² - 1)]?',
      keyStepChoices: [
        'Write 3 - v² = -3(v² - 1) + 2v², giving -3/v + 2v/(v² - 1)',
        'Use trig substitution v = sin θ',
        'Write 3/v - 1/(v² - 1)',
        'Integrate by parts'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'fin1-q1c',
    numberLabel: 'Final 1 (Fall 2017–18) Q1(c)',
    sourceExam: 'Final 1: Fall 2017–2018 Final',
    sourceYear: '2017–2018',
    sourceFileUrl: '/assets/aistudio/Final_1___1__7cf7076f.pdf',
    points: 4,
    category: Category.EXACT_EQUATIONS,
    subCategory: 'First-Order ODE',
    methodTag: 'Non-Exact ODE Made Exact via μ(y) = y',
    arabicMethodTag: 'معادلة غير تامة تتحول إلى تامة بعامل التكامل μ(y) = y',
    difficulty: 'Boss',
    problemLatex: 'y(x+y+1)\\,dx + x(x+3y+2)\\,dy = 0',
    problemStatement: 'Solve the following differential equation:',
    visualRecognitionTrigger: 'Written in M(x,y)dx + N(x,y)dy = 0 form where M_y ≠ N_x.',
    arabicVisualTrigger: 'على الصورة التفاضلية M dx + N dy = 0 حيث M_y لا تساوي N_x فنبحث عن عامل التكامل.',
    examinerTrap: 'If you try (M_y - N_x)/N = -(x+y+1)/[x(x+3y+2)], nothing cancels! You MUST check (N_x - M_y)/M = (x+y+1)/[y(x+y+1)] = 1/y, which is a pure function of y!',
    arabicExaminerTrap: 'القسمة على N لا تختصر القوس، لكن عند القسمة على M في القانون (N_x - M_y)/M يختصر القوس (x+y+1) بالكامل ويتبقى 1/y!',
    secretShortcut: 'Look at the factored brackets first: M already has (x+y+1), and N_x - M_y = x+y+1, so dividing by M cancels (x+y+1) immediately!',
    steps: [
      {
        stepNumber: 1,
        title: 'Test Exactness: Compute M_y and N_x',
        arabicTitle: 'اختبار التمام بحساب M_y و N_x',
        formula: 'M = xy + y^2 + y \\implies M_y = x + 2y + 1, \\qquad N = x^2 + 3xy + 2x \\implies N_x = 2x + 3y + 2 \\neq M_y',
        explanation: 'Since M_y ≠ N_x, the equation is Non-Exact.',
        arabicExplanation: 'بما أن المشتقتين الجزئيتين غير متساويتين، فالمعادلة غير تامة.'
      },
      {
        stepNumber: 2,
        title: 'Find Integrating Factor μ(y) Using (N_x - M_y)/M',
        arabicTitle: 'إيجاد عامل التكامل μ(y) بالقسمة على M',
        formula: '\\frac{N_x - M_y}{M} = \\frac{(2x+3y+2) - (x+2y+1)}{y(x+y+1)} = \\frac{x+y+1}{y(x+y+1)} = \\frac{1}{y} \\implies \\mu(y) = e^{\\int \\frac{1}{y}dy} = y',
        explanation: 'Multiply the entire ODE by μ(y) = y to make it Exact.',
        arabicExplanation: 'يختصر القوس (x+y+1) فيتبقى 1/y، ومنه عامل التكامل هو μ(y) = y.'
      },
      {
        stepNumber: 3,
        title: 'Multiply by y and Solve the Exact Equation',
        arabicTitle: 'الضرب في y وحل المعادلة التامة الناتجة',
        formula: '(xy^2 + y^3 + y^2)dx + (x^2y + 3xy^2 + 2xy)dy = 0 \\implies \\frac{1}{2}x^2y^2 + xy^3 + xy^2 = C',
        explanation: 'Integrate M_new dx with respect to x; all terms in N_new dy are duplicates and get struck out!',
        arabicExplanation: 'عند تكامل M الجديدة بالنسبة لـ x نحصل على كل حدود الحل، وتُشطب حدود N الجديدة لأنها مكررة!'
      }
    ],
    finalAnswerLatex: '\\frac{1}{2}x^2y^2 + xy^3 + xy^2 = C',
    drillOptions: {
      methodChoices: [
        'Non-Exact ODE with Integrating Factor μ(y) = e^{∫ (N_x - M_y)/M dy} = y',
        'Non-Exact ODE with μ(x)',
        'Homogeneous ODE (y = vx)',
        'Bernoulli ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'For y(x+y+1)dx + x(x+3y+2)dy = 0, why do we divide N_x - M_y by M instead of N?',
      keyStepChoices: [
        'Because N_x - M_y = x + y + 1, which cancels the (x + y + 1) factor inside M = y(x + y + 1) to leave 1/y!',
        'Because N is zero',
        'Because M is a function of x only',
        'Either M or N works equally well'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'fin1-q1d',
    numberLabel: 'Final 1 (Fall 2017–18) Q1(d)',
    sourceExam: 'Final 1: Fall 2017–2018 Final',
    sourceYear: '2017–2018',
    sourceFileUrl: '/assets/aistudio/Final_1___1__7cf7076f.pdf',
    points: 4,
    category: Category.BERNOULLI,
    subCategory: 'First-Order ODE',
    methodTag: 'Bernoulli ODE (n = 3, Direct Shortcut Formula)',
    arabicMethodTag: 'معادلة برنولي (n = 3 مع قانون الاختصار المباشر)',
    difficulty: 'Core',
    problemLatex: '\\frac{dy}{dx} - \\frac{3}{x}y = \\frac{1}{2x^3}y^3',
    problemStatement: 'Solve the following differential equation:',
    visualRecognitionTrigger: 'Standard form y\' + P(x)y = Q(x)y^3 with n = 3.',
    arabicVisualTrigger: 'معادلة برنولي جاهزة في الصورة القياسية مع وجود y^3 في الطرف الأيمن (n = 3).',
    examinerTrap: 'Since 1 - n = 1 - 3 = -2, when you multiply P(x) = -3/x by (-2), the two minus signs cancel to give P*(x) = +6/x! Missing that sign flip ruins the integrating factor x^6.',
    arabicExaminerTrap: 'بما أن 1 - n = -2، فعند ضرب P(x) = -3/x في (-2) تصبح الإشارة موجبة +6/x وعامل التكامل هو x^6!',
    secretShortcut: '1 - n = -2 ⇒ P* = (-2)(-3/x) = 6/x ⇒ μ = x^6, and Q* = (-2)(1/(2x^3)) = -1/x^3.',
    steps: [
      {
        stepNumber: 1,
        title: 'Identify n = 3 and Compute P*(x), Q*(x), and μ(x)',
        arabicTitle: 'تحديد n = 3 وحساب المعاملات المعدلة وعامل التكامل',
        formula: '1 - n = -2 \\implies P^*(x) = (-2)\\left(-\\frac{3}{x}\\right) = \\frac{6}{x}, \\quad Q^*(x) = (-2)\\left(\\frac{1}{2x^3}\\right) = -\\frac{1}{x^3}, \\quad \\mu(x) = e^{\\int \\frac{6}{x}dx} = x^6',
        explanation: 'Use the direct Bernoulli multiplier (1 - n) = -2.',
        arabicExplanation: 'نضرب P و Q في (1 - n = -2) فنحصل على عامل التكامل μ = x^6.'
      },
      {
        stepNumber: 2,
        title: 'Write the General Solution for y^{-2}',
        arabicTitle: 'التعويض في قانون الحل العام لبرنولي',
        formula: 'y^{-2} = \\frac{1}{x^6}\\left[\\int x^6\\left(-\\frac{1}{x^3}\\right)dx + C\\right] = x^{-6}\\left[-\\int x^3\\,dx + C\\right] = x^{-6}\\left[-\\frac{x^4}{4} + C\\right]',
        explanation: 'x^6 · (-x^{-3}) simplifies to -x^3, which integrates in one step to -x^4 / 4.',
        arabicExplanation: 'حاصل ضرب x^6 في (-1/x^3) يعطي -x^3 وتكاملها -x^4 / 4.'
      }
    ],
    finalAnswerLatex: 'y^{-2} = -\\frac{1}{4x^2} + Cx^{-6}',
    drillOptions: {
      methodChoices: [
        'Bernoulli ODE with n = 3 (1 - n = -2, μ(x) = x⁶)',
        'Linear ODE directly (n = 0)',
        'Homogeneous ODE (y = vx)',
        'Exact ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'For dy/dx - (3/x)y = (1/2x³)y³, what is the integrating factor μ(x) after multiplying by (1 - n) = -2?',
      keyStepChoices: [
        'μ(x) = e^{∫ (6/x) dx} = x⁶',
        'μ(x) = e^{∫ (-6/x) dx} = x⁻⁶',
        'μ(x) = x⁻³',
        'μ(x) = e^{6x}'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'fin1-q2a',
    numberLabel: 'Final 1 (Fall 2017–18) Q2(a)',
    sourceExam: 'Final 1: Fall 2017–2018 Final',
    sourceYear: '2017–2018',
    sourceFileUrl: '/assets/aistudio/Final_1___1__7cf7076f.pdf',
    points: 4,
    category: Category.HIGHER_ORDER_HOMOGENEOUS,
    subCategory: 'Higher-Order ODE',
    methodTag: '3rd-Order Homogeneous ODE (Triple Repeated Root)',
    arabicMethodTag: 'معادلة متجانسة من الرتبة الثالثة (جذر ثلاثي مكرر)',
    difficulty: 'Core',
    problemLatex: '\\frac{d^3y}{dx^3} - 3\\frac{d^2y}{dx^2} + 3\\frac{dy}{dx} - y = 0',
    problemStatement: 'Find the general solution of the following differential equation:',
    visualRecognitionTrigger: 'Coefficients 1, -3, +3, -1 are Pascal\'s Triangle binomial coefficients for (m - 1)^3!',
    arabicVisualTrigger: 'المعاملات (1, -3, 3, -1) هي مفكوك المكعب الكامل (m - 1)^3 = 0!',
    examinerTrap: 'For a triple root m = 1, 1, 1, don\'t forget the x^2 term: (C_1 + C_2 x + C_3 x^2)e^x!',
    arabicExaminerTrap: 'الجذر مكرر ٣ مرات (m = 1, 1, 1)، لذا يجب كتابة (C_1 + C_2 x + C_3 x^2)e^x!',
    secretShortcut: 'Sum of coefficients 1 - 3 + 3 - 1 = 0 ⇒ m = 1 is a root; in fact m^3 - 3m^2 + 3m - 1 = (m - 1)^3 = 0.',
    steps: [
      {
        stepNumber: 1,
        title: 'Write and Factor the Characteristic Equation',
        arabicTitle: 'كتابة المعادلة المساعدة وتحليلها كمكعب كامل',
        formula: 'm^3 - 3m^2 + 3m - 1 = 0 \\implies (m - 1)^3 = 0 \\implies m_{1,2,3} = 1, 1, 1',
        explanation: 'Recognize the binomial expansion of (m - 1)^3 or use synthetic division by m = 1.',
        arabicExplanation: 'المعادلة تمثل مفكوك (m - 1)^3 = 0 ومنها الجذر m = 1 مكرر ثلاث مرات.'
      },
      {
        stepNumber: 2,
        title: 'Write the General Solution for a Triple Root',
        arabicTitle: 'كتابة الحل العام للجذر الثلاثي المكرر',
        formula: 'y = (C_1 + C_2 x + C_3 x^2)e^x',
        explanation: 'Multiply the repeated exponential e^x by a quadratic polynomial C_1 + C_2 x + C_3 x^2.',
        arabicExplanation: 'نضرب الدالة الأسية e^x في (C_1 + C_2 x + C_3 x^2).'
      }
    ],
    finalAnswerLatex: 'y = (C_1 + C_2 x + C_3 x^2)e^x',
    drillOptions: {
      methodChoices: [
        'Auxiliary Equation (m - 1)³ = 0 → Triple Repeated Root m = 1, 1, 1',
        'Undetermined Coefficients',
        'Variation of Parameters',
        'Reduction of Order'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the general solution of (m - 1)³ = 0?',
      keyStepChoices: [
        'y = (C_1 + C_2 x + C_3 x²) e^x',
        'y = (C_1 + C_2 x) e^x',
        'y = C_1 e^x + C_2 e^{-x} + C_3 e^{3x}',
        'y = C_1 + C_2 x + C_3 e^x'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'fin1-q2b',
    numberLabel: 'Final 1 (Fall 2017–18) Q2(b)',
    sourceExam: 'Final 1: Fall 2017–2018 Final',
    sourceYear: '2017–2018',
    sourceFileUrl: '/assets/aistudio/Final_1___1__7cf7076f.pdf',
    points: 4,
    category: Category.UNDETERMINED_COEFFS,
    subCategory: 'Higher-Order ODE',
    methodTag: 'Undetermined Coefficients (Polynomial + Cosine RHS)',
    arabicMethodTag: 'المعاملات غير المعينة (كثيرة حدود + جيب تمام)',
    difficulty: 'Core',
    problemLatex: '\\frac{d^2y}{dx^2} + \\frac{dy}{dx} - 2y = 2x - 40\\cos(2x)',
    problemStatement: 'Find the general solution of the following differential equation:',
    visualRecognitionTrigger: 'Constant-coefficient 2nd-order ODE with RHS = linear polynomial 2x minus 40 cos(2x).',
    arabicVisualTrigger: 'معادلة من الرتبة الثانية بمعاملات ثابتة والطرف الأيمن يتكون من كثيرة حدود 2x ودالة مثلثية -40 cos(2x).',
    examinerTrap: 'Even though the RHS has only cos(2x) and no sin(2x), your trial solution y_p MUST include BOTH C cos(2x) + D sin(2x) because y\' introduces sin(2x)!',
    arabicExaminerTrap: 'رغم أن الطرف الأيمن يحتوي على cos(2x) فقط، يجب فرض C cos(2x) + D sin(2x) معاً لأن المشتقة الأولى تنتج دالة الجيب!',
    secretShortcut: 'No resonance here since roots are m = 1, -2. Solve the polynomial part (Ax + B) and trig part (C cos 2x + D sin 2x) independently!',
    steps: [
      {
        stepNumber: 1,
        title: 'Find the Complementary Solution y_c',
        arabicTitle: 'إيجاد الحل المكمل المتجانس y_c',
        formula: 'm^2 + m - 2 = (m+2)(m-1) = 0 \\implies m_1 = 1, \\; m_2 = -2 \\implies y_c = C_1 e^x + C_2 e^{-2x}',
        explanation: 'Neither m = 0 nor m = ±2i is a root, so no x-boost is needed.',
        arabicExplanation: 'الجذور هي 1 و -2 فلا يوجد رنين مع الطرف الأيمن.'
      },
      {
        stepNumber: 2,
        title: 'Set Up y_p = Ax + B + C cos(2x) + D sin(2x) and Equate Coefficients',
        arabicTitle: 'فرض الحل الخاص y_p ومساواة المعاملات',
        formula: 'y_p = Ax + B + C\\cos 2x + D\\sin 2x \\implies (-2A)x + (A-2B) + (-6C+2D)\\cos 2x + (-2C-6D)\\sin 2x = 2x - 40\\cos 2x',
        explanation: 'From -2A = 2 ⇒ A = -1; A - 2B = 0 ⇒ B = -1/2. From -2C - 6D = 0 ⇒ C = -3D, and -6(-3D) + 2D = 20D = -40 ⇒ D = -2, C = 6.',
        arabicExplanation: 'بمساواة معاملات x والثابت نحصل على A = -1 و B = -1/2، وبمساواة معاملات cos 2x و sin 2x نحصل على C = 6 و D = -2.'
      }
    ],
    finalAnswerLatex: 'y = C_1 e^x + C_2 e^{-2x} - x - \\frac{1}{2} + 6\\cos(2x) - 2\\sin(2x)',
    drillOptions: {
      methodChoices: [
        'Undetermined Coefficients with y_p = Ax + B + C cos(2x) + D sin(2x)',
        'Variation of Parameters',
        'Reduction of Order',
        'Laplace Transform'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the correct trial form y_p for y\'\' + y\' - 2y = 2x - 40 cos(2x)?',
      keyStepChoices: [
        'y_p = Ax + B + C cos(2x) + D sin(2x)',
        'y_p = Ax + C cos(2x)   (omitting B and D sin 2x)',
        'y_p = x(Ax + B) + C cos(2x) + D sin(2x)',
        'y_p = A e^{2x} + C cos(2x)'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'fin1-q2c',
    numberLabel: 'Final 1 (Fall 2017–18) Q2(c)',
    sourceExam: 'Final 1: Fall 2017–2018 Final',
    sourceYear: '2017–2018',
    sourceFileUrl: '/assets/aistudio/Final_1___1__7cf7076f.pdf',
    points: 4,
    category: Category.VARIATION_OF_PARAMETERS,
    subCategory: 'Higher-Order ODE',
    methodTag: 'Variation of Parameters (RHS = sec x)',
    arabicMethodTag: 'تغيير البارامترات (الطرف الأيمن sec x)',
    difficulty: 'Core',
    problemLatex: '\\frac{d^2y}{dx^2} + y = \\sec(x)',
    problemStatement: 'Find the general solution of the following differential equation:',
    visualRecognitionTrigger: 'RHS is sec(x), which is NOT in the Undetermined Coefficients family → Mandatory Variation of Parameters!',
    arabicVisualTrigger: 'الطرف الأيمن sec(x) لا يحل بالمعاملات غير المعينة بل بطريقة تغيير البارامترات (Wronskian).',
    examinerTrap: 'For y\'\' + y = f(x), ALWAYS choose u_1 = cos x and u_2 = sin x so the Wronskian W = cos^2 x + sin^2 x = +1! If you swap them, W becomes -1.',
    arabicExaminerTrap: 'رتب الحلول دائماً u_1 = cos x ثم u_2 = sin x لكي يكون محددة فرونسكي W = +1!',
    secretShortcut: 'A(x) = ∫ (-sin x · sec x) dx = ∫ (-tan x) dx = ln|cos x|, and B(x) = ∫ (cos x · sec x) dx = ∫ 1 dx = x!',
    steps: [
      {
        stepNumber: 1,
        title: 'Find y_c and Compute the Wronskian W = 1',
        arabicTitle: 'إيجاد الحل المتجانس y_c وحساب محددة فرونسكي W = 1',
        formula: 'm^2 + 1 = 0 \\implies m = \\pm i \\implies y_c = C_1\\cos x + C_2\\sin x, \\qquad W = \\begin{vmatrix} \\cos x & \\sin x \\\\ -\\sin x & \\cos x \\end{vmatrix} = 1',
        explanation: 'With u_1 = cos x and u_2 = sin x, the Wronskian is identically 1.',
        arabicExplanation: 'محددة فرونسكي لـ cos x و sin x تساوي ١.'
      },
      {
        stepNumber: 2,
        title: 'Compute A(x) and B(x) and Form y_p',
        arabicTitle: 'حساب التكاملين A(x) و B(x) وتكوين الحل الخاص y_p',
        formula: 'A(x) = \\int \\frac{-\\sin x \\cdot \\sec x}{1}\\,dx = \\int -\\tan x\\,dx = \\ln|\\cos x|, \\qquad B(x) = \\int \\frac{\\cos x \\cdot \\sec x}{1}\\,dx = \\int 1\\,dx = x',
        explanation: 'Then y_p = A(x)cos x + B(x)sin x = cos(x)ln|cos x| + x sin(x).',
        arabicExplanation: 'نضرب A(x) في cos x ونضرب B(x) في sin x.'
      }
    ],
    finalAnswerLatex: 'y = C_1\\cos x + C_2\\sin x + \\cos(x)\\ln|\\cos x| + x\\sin(x)',
    drillOptions: {
      methodChoices: [
        'Variation of Parameters (W = 1, A(x) = ln|cos x|, B(x) = x)',
        'Undetermined Coefficients',
        'Reduction of Order',
        'Bernoulli Method'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'In Variation of Parameters for y\'\' + y = sec(x), what do the integrals A(x) and B(x) evaluate to?',
      keyStepChoices: [
        'A(x) = ∫ (-sin x sec x) dx = ln|cos x|   and   B(x) = ∫ (cos x sec x) dx = x',
        'A(x) = x   and   B(x) = ln|sec x|',
        'A(x) = tan x   and   B(x) = sec x',
        'A(x) = -cos x   and   B(x) = sin x'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'fin1-q2d',
    numberLabel: 'Final 1 (Fall 2017–18) Q2(d)',
    sourceExam: 'Final 1: Fall 2017–2018 Final',
    sourceYear: '2017–2018',
    sourceFileUrl: '/assets/aistudio/Final_1___1__7cf7076f.pdf',
    points: 4,
    category: Category.REDUCTION_OF_ORDER,
    subCategory: 'Higher-Order ODE',
    methodTag: 'Reduction of Order (Given y_1 = x)',
    arabicMethodTag: 'اختزال الرتبة بمعلومية الحل الخاص y_1 = x',
    difficulty: 'Trick',
    problemLatex: '\\frac{d^2y}{dx^2} - \\frac{1}{x}\\frac{dy}{dx} + \\frac{y}{x^2} = 3x^3 + 2, \\qquad \\text{given } y_1 = x',
    problemStatement: 'Find the general solution of the differential equation, given that y = x is a homogeneous solution:',
    visualRecognitionTrigger: 'Variable-coefficient 2nd-order ODE with the explicit phrase "given that y = x is a homogeneous solution".',
    arabicVisualTrigger: 'معادلة بمعاملات متغيرة مع جملة "given that y = x is a homogeneous solution" أي اختزال الرتبة.',
    examinerTrap: 'When you substitute y = x v, y\' = x v\' + v, y\'\' = x v\'\' + 2v\', notice the +2v\'/x and -v\'/x combine to +v\'/x, and the v terms cancel to 0! Don\'t forget to multiply the final v(x) by x at the end!',
    arabicExaminerTrap: 'بعد التعويض بـ y = xv تختصر حدود v تماماً، وفي النهاية لا تنس ضرب v(x) في x للحصول على y(x)!',
    secretShortcut: 'Substitute y = x v, y\' = x v\' + v, y\'\' = x v\'\' + 2v\' → reduces immediately to x v\'\' + v\' = 3x^3 + 2, which is exact: (x v\')\' = 3x^3 + 2!',
    steps: [
      {
        stepNumber: 1,
        title: 'Substitute y = x v, y\' = x v\' + v, y\'\' = x v\'\' + 2v\'',
        arabicTitle: 'التعويض بـ y = x v ومشتقاتها في المعادلة',
        formula: '(xv\'\' + 2v\') - \\frac{1}{x}(xv\' + v) + \\frac{xv}{x^2} = 3x^3 + 2 \\implies xv\'\' + v\' = 3x^3 + 2',
        explanation: 'The -v/x and +v/x terms cancel out completely, confirming our derivatives are right.',
        arabicExplanation: 'تختصر حدود v الخالية من المشتقات تماماً.'
      },
      {
        stepNumber: 2,
        title: 'Let z = v\' and Solve the 1st-Order Linear ODE',
        arabicTitle: 'وضع z = v\' وحل المعادلة الخطية من الرتبة الأولى',
        formula: 'z\' + \\frac{1}{x}z = 3x^2 + \\frac{2}{x}, \\quad \\mu(x) = x \\implies x z = \\int (3x^3 + 2)\\,dx = \\frac{3}{4}x^4 + 2x + C_1 \\implies v\' = \\frac{3}{4}x^3 + 2 + \\frac{C_1}{x}',
        explanation: 'With integrating factor μ = x, x z integrates directly.',
        arabicExplanation: 'عامل التكامل هو μ = x فنحصل على z = v\' مباشرة.'
      },
      {
        stepNumber: 3,
        title: 'Integrate v\' to Find v(x) and Multiply by y_1 = x',
        arabicTitle: 'مكاملة v\' لإيجاد v ثم الضرب في x للحصول على y',
        formula: 'v(x) = \\frac{3}{16}x^4 + 2x + C_1\\ln|x| + C_2 \\implies y = xv(x) = \\frac{3}{16}x^5 + 2x^2 + C_1 x\\ln|x| + C_2 x',
        explanation: 'Multiply every term of v(x) by x.',
        arabicExplanation: 'نكامل لإيجاد v ثم نضرب الناتج كله في x.'
      }
    ],
    finalAnswerLatex: 'y = C_1 x\\ln|x| + C_2 x + \\frac{3}{16}x^5 + 2x^2',
    drillOptions: {
      methodChoices: [
        'Reduction of Order: Let y = x v, y\' = x v\' + v, y\'\' = x v\'\' + 2v\'',
        'Undetermined Coefficients',
        'Homogeneous First-Order ODE',
        'Laplace Transform'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'After substituting y = x v into y\'\' - (1/x)y\' + y/x² = 3x³ + 2, what reduced equation in v\' do you get?',
      keyStepChoices: [
        'x v\'\' + v\' = 3x³ + 2   (or z\' + (1/x)z = 3x² + 2/x)',
        'x v\'\' + 2v\' = 3x³ + 2',
        'v\'\' - v\' = 3x³ + 2',
        'x v\'\' + 3v\' = 3x³ + 2'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'fin1-q3a',
    numberLabel: 'Final 1 (Fall 2017–18) Q3(a)',
    sourceExam: 'Final 1: Fall 2017–2018 Final',
    sourceYear: '2017–2018',
    sourceFileUrl: '/assets/aistudio/Final_1___1__7cf7076f.pdf',
    points: 4,
    category: Category.LAPLACE_ODE,
    subCategory: 'Laplace & Inverse Laplace',
    methodTag: '2nd-Order IVP via Laplace Transform (3 Simple Poles)',
    arabicMethodTag: 'حل معادلة تفاضلية بتحويل لابلاس (تحليل الكسور الجزئية لـ ٣ أقواس)',
    difficulty: 'Core',
    problemLatex: "\\frac{d^2y}{dx^2} - 10\\frac{dy}{dx} + 9y = 5; \\qquad y(0) = -1, \\; y'(0) = 2",
    problemStatement: 'Solve the following differential equation using Laplace transform:',
    visualRecognitionTrigger: '2nd-order ODE with y(0) = -1, y\'(0) = 2 and constant RHS = 5.',
    arabicVisualTrigger: 'معادلة تفاضلية من الرتبة الثانية مع شروط ابتدائية سالبة وموجبة وطرف أيمن ثابت = ٥.',
    examinerTrap: 'Watch the double negative when plugging y(0) = -1 into -10[sY(s) - y(0)] = -10sY(s) + 10y(0) = -10sY(s) - 10! Also L{5} = 5/s.',
    arabicExaminerTrap: 'انتبه للإشارات عند التعويض بـ y(0) = -1 داخل القوس المضروب في (-10): -10[sY(s) - (-1)] = -10sY(s) - 10!',
    secretShortcut: 's^2 - 10s + 9 factors cleanly into (s - 1)(s - 9), so the denominator is s(s - 1)(s - 9).',
    steps: [
      {
        stepNumber: 1,
        title: 'Take Laplace Transform & Substitute y(0) = -1, y\'(0) = 2',
        arabicTitle: 'تطبيق لابلاس والتعويض بـ y(0) = -1 و y\'(0) = 2',
        formula: '\\big[s^2Y(s) - s(-1) - 2\\big] - 10\\big[sY(s) - (-1)\\big] + 9Y(s) = \\frac{5}{s} \\implies (s^2-10s+9)Y(s) + s - 12 = \\frac{5}{s}',
        explanation: 'Move +s - 12 to the RHS as -s + 12 and combine over s: (-s^2 + 12s + 5)/s.',
        arabicExplanation: 'ننقل (+s - 12) للطرف الأيمن ونوحد المقامات على s.'
      },
      {
        stepNumber: 2,
        title: 'Decompose into Partial Fractions and Invert',
        arabicTitle: 'تحليل الكسور الجزئية وإيجاد لابلاس العكسي',
        formula: 'Y(s) = \\frac{-s^2+12s+5}{s(s-1)(s-9)} = \\frac{5/9}{s} - \\frac{2}{s-1} + \\frac{4/9}{s-9} \\implies y(x) = \\frac{5}{9} - 2e^x + \\frac{4}{9}e^{9x}',
        explanation: 'At s=0: A = 5/9. At s=1: B = (-1+12+5)/[1(-8)] = 16/(-8) = -2. At s=9: C = (-81+108+5)/[9(8)] = 32/72 = 4/9.',
        arabicExplanation: 'باستخدام طريقة التغطية عند s=0, 1, 9 نجد A = 5/9 و B = -2 و C = 4/9.'
      }
    ],
    finalAnswerLatex: 'y(x) = \\frac{5}{9} - 2e^x + \\frac{4}{9}e^{9x}',
    drillOptions: {
      methodChoices: [
        'Laplace Transform of ODE + Partial Fractions at s = 0, 1, 9',
        'Variation of Parameters',
        'Reduction of Order',
        'Second Shifting Theorem'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'When substituting y(0) = -1 and y\'(0) = 2 into L{y\'\' - 10y\' + 9y = 5}, what is the isolated Y(s)?',
      keyStepChoices: [
        'Y(s) = (-s² + 12s + 5) / [s(s - 1)(s - 9)]',
        'Y(s) = (s² - 8s + 5) / [s(s - 1)(s - 9)]',
        'Y(s) = 5 / [s(s - 1)(s - 9)]',
        'Y(s) = (-s² - 8s + 5) / [s(s - 1)(s - 9)]'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'fin1-q3b-all',
    numberLabel: 'Final 1 (Fall 2017–18) Q3(b) [i–iv]',
    sourceExam: 'Final 1: Fall 2017–2018 Final',
    sourceYear: '2017–2018',
    sourceFileUrl: '/assets/aistudio/Final_1___1__7cf7076f.pdf',
    points: 12,
    category: Category.LAPLACE_THEOREMS,
    subCategory: 'Laplace & Inverse Laplace',
    methodTag: 'All 4 Forward Laplace Archetypes (Trig, Integral, Combined Shift, Division by t)',
    arabicMethodTag: 'الأفكار الأربع لتحويل لابلاس في الامتحان النهائي (Q3b i–iv)',
    difficulty: 'Boss',
    problemLatex: '\\text{(i) } \\sinh 5t + \\sin t\\cos t \\quad \\text{(ii) } \\int_0^t (7\\tau^3 + 2\\cos 4\\tau)d\\tau \\quad \\text{(iii) } u_7(t)e^t\\cos(t-7) \\quad \\text{(iv) } t^{11}e^{5t} + \\frac{\\cos 4t - \\cos 5t}{t}',
    problemStatement: 'Find the Laplace transform of the four functions in Final 1 Question 3(b):',
    visualRecognitionTrigger: 'Covers every theorem: (i) sin t cos t = ½ sin 2t, (ii) Integral rule ÷s, (iii) Combined shift e^t = e^7 e^{t-7}, (iv) Division by t integral ∫_s^∞.',
    arabicVisualTrigger: 'شامل لكل نظريات لابلاس: ضعف الزاوية، تكامل لابلاس، دمج الإزاحتين، والقسمة على t.',
    examinerTrap: 'In (iii), e^t must be written as e^7 · e^{t-7}! In (iv), for (cos 4t - cos 5t)/t, integrating z/(z^2+a^2) from s to ∞ gives ½ ln[(s^2+25)/(s^2+16)] because at z → ∞ the ratio approaches ln(1) = 0!',
    arabicExaminerTrap: 'في (iii) نكتب e^t = e^7 e^{t-7}! وفي (iv) تكامل (cos 4t - cos 5t)/t من s إلى ∞ يعطي ½ ln[(s^2+25)/(s^2+16)]!',
    secretShortcut: 'Memorize: L{(cos at - cos bt)/t} = ½ ln[(s^2 + b^2)/(s^2 + a^2)]!',
    steps: [
      {
        stepNumber: 1,
        title: 'Parts (i) & (ii): Double-Angle Identity & Integral Rule',
        arabicTitle: 'الجزء (i) و (ii): متطابقة ضعف الزاوية وقاعدة التكامل',
        formula: '\\text{(i) } F(s) = \\frac{5}{s^2-25} + \\frac{1}{2}\\left(\\frac{2}{s^2+4}\\right) = \\frac{5}{s^2-25} + \\frac{1}{s^2+4}, \\qquad \\text{(ii) } F(s) = \\frac{1}{s}\\left(\\frac{42}{s^4} + \\frac{2s}{s^2+16}\\right)',
        explanation: 'sin t cos t = ½ sin 2t → 1/(s^2+4). For (ii), 7(3!) = 42.',
        arabicExplanation: 'نحول sin t cos t إلى ½ sin 2t، وفي التكامل نقسم على s.'
      },
      {
        stepNumber: 2,
        title: 'Part (iii): Combined Second & First Shift on u_7(t) e^t cos(t - 7)',
        arabicTitle: 'الجزء (iii): دمج الإزاحتين بكتابة e^t = e^7 e^{t-7}',
        formula: '\\mathcal{L}\\big\\{e^7 u_7(t)e^{t-7}\\cos(t-7)\\big\\} = e^7 e^{-7s}\\mathcal{L}\\{e^t\\cos t\\} = e^{7(1-s)}\\frac{s-1}{(s-1)^2+1}',
        explanation: 'Factor out e^7 so every t is (t-7), pull out e^{-7s}, then shift s → s-1.',
        arabicExplanation: 'نخرج الثابت e^7 ثم نطبق الإزاحة الثانية e^{-7s} ثم الإزاحة الأولى (s-1).'
      },
      {
        stepNumber: 3,
        title: 'Part (iv): First Shift on t^{11}e^{5t} + Division by t on (cos 4t - cos 5t)/t',
        arabicTitle: 'الجزء (iv): الإزاحة الأولى لـ t^{11}e^{5t} وقسمة (cos 4t - cos 5t) على t',
        formula: 'F(s) = \\frac{11!}{(s-5)^{12}} + \\int_s^{\\infty}\\left(\\frac{z}{z^2+16} - \\frac{z}{z^2+25}\\right)dz = \\frac{11!}{(s-5)^{12}} + \\frac{1}{2}\\ln\\left(\\frac{s^2+25}{s^2+16}\\right)',
        explanation: 'At the upper limit z → ∞, ½ ln[(z^2+16)/(z^2+25)] → ½ ln(1) = 0, leaving the lower limit with flipped fraction.',
        arabicExplanation: 'عند التعويض بـ ∞ يكون لوغاريتم النسبة = ln(1) = 0، وعند الحد السفلي s تنعكس النسبة داخل اللوغاريتم.'
      }
    ],
    finalAnswerLatex: '\\text{(i) } \\frac{5}{s^2-25}+\\frac{1}{s^2+4} \\; | \\; \\text{(ii) } \\frac{42}{s^5}+\\frac{2}{s^2+16} \\; | \\; \\text{(iii) } \\frac{e^{7(1-s)}(s-1)}{(s-1)^2+1} \\; | \\; \\text{(iv) } \\frac{11!}{(s-5)^{12}}+\\frac{1}{2}\\ln\\left(\\frac{s^2+25}{s^2+16}\\right)',
    drillOptions: {
      methodChoices: [
        'Use e^t = e^7 e^{t-7} for (iii), and ∫_s^∞ [z/(z²+16) - z/(z²+25)] dz for (iv)',
        'Use First Shift only for all four parts',
        'Differentiate with respect to s for (iv)',
        'Divide by s for (iv)'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the Laplace transform of (cos 4t - cos 5t) / t?',
      keyStepChoices: [
        '(1/2) ln[(s² + 25) / (s² + 16)]',
        '[s/(s² + 16) - s/(s² + 25)] / s',
        'tan⁻¹(s/4) - tan⁻¹(s/5)',
        '(1/2) ln[(s² + 16) / (s² + 25)]'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'fin1-q4a-all',
    numberLabel: 'Final 1 (Fall 2017–18) Q4(a) [i–iii]',
    sourceExam: 'Final 1: Fall 2017–2018 Final',
    sourceYear: '2017–2018',
    sourceFileUrl: '/assets/aistudio/Final_1___1__7cf7076f.pdf',
    points: 12,
    category: Category.INVERSE_LAPLACE,
    subCategory: 'Laplace & Inverse Laplace',
    methodTag: 'All 3 Inverse Laplace Archetypes (Log+Arctan, Completing Square, Second Shift)',
    arabicMethodTag: 'الأفكار الثلاث للابلاس العكسي (اشتقاق اللوغاريتم و tan⁻¹، إكمال المربع، الإزاحة الثانية)',
    difficulty: 'Trick',
    problemLatex: '\\text{(i) } F(s) = \\ln\\left(\\frac{s+3}{s+1}\\right) + \\tan^{-1}\\left(\\frac{s}{2}\\right) \\quad \\text{(ii) } F(s) = \\frac{3}{s^2+4s+13} \\quad \\text{(iii) } F(s) = e^{-2s}\\left(\\frac{2s+1}{s^2}\\right)',
    problemStatement: 'Find the inverse Laplace transform of the three functions in Final 1 Question 4(a):',
    visualRecognitionTrigger: '(i) Log + Arctan → Derivative Rule -t f(t); (ii) Quadratic s^2+4s+13 → (s+2)^2+9; (iii) e^{-2s} → Second Shift u_2(t).',
    arabicVisualTrigger: '(i) لوغاريتم و tan⁻¹ (نشتق ونقسم على -t)، (ii) إكمال مربع، (iii) إزاحة ثانية u_2(t).',
    examinerTrap: 'In (i), expand ln[(s+3)/(s+1)] = ln(s+3) - ln(s+1) BEFORE differentiating! In (iii), split (2s+1)/s^2 = 2/s + 1/s^2 first, which inverts to 2 + t, then shift to u_2(t)[2 + (t - 2)] = u_2(t) t!',
    arabicExaminerTrap: 'في (i) فك اللوغاريتم إلى طرح قبل الاشتقاق! وفي (iii) وزع البسط على s^2 ليصبح 2/s + 1/s^2 ثم طبق الإزاحة u_2(t).',
    secretShortcut: 'In (iii), L⁻¹{2/s + 1/s^2} = 2 + t. Shifting t → t - 2 gives 2 + (t - 2) = t, so f(t) = t u_2(t)!',
    steps: [
      {
        stepNumber: 1,
        title: 'Part (i): Differentiate F(s) = ln(s+3) - ln(s+1) + tan⁻¹(s/2)',
        arabicTitle: 'الجزء (i): اشتقاق F(s) ثم القسمة على (-t)',
        formula: "F'(s) = \\frac{1}{s+3} - \\frac{1}{s+1} + \\frac{2}{s^2+4} \\implies -t f(t) = e^{-3t} - e^{-t} + \\sin 2t \\implies f(t) = \\frac{e^{-t} - e^{-3t} - \\sin 2t}{t}",
        explanation: 'Apply f(t) = -(1/t) L⁻¹{F\'(s)}.',
        arabicExplanation: 'نشتق الحدود الثلاثة ونوجد لابلاس العكسي ثم نقسم على (-t).'
      },
      {
        stepNumber: 2,
        title: 'Part (ii): Complete the Square in 3 / (s² + 4s + 13)',
        arabicTitle: 'الجزء (ii): إكمال المربع للمقام s² + 4s + 13 = (s+2)² + 9',
        formula: 'F(s) = \\frac{3}{(s+2)^2 + 3^2} \\implies f(t) = e^{-2t}\\sin(3t)',
        explanation: 'The numerator 3 already matches √9 = 3!',
        arabicExplanation: 'البسط ٣ يطابق جذر الـ ٩ جاهزاً، فيعطي e^{-2t} sin(3t) مباشرة.'
      },
      {
        stepNumber: 3,
        title: 'Part (iii): Split (2s+1)/s² and Apply Second Shift e^{-2s}',
        arabicTitle: 'الجزء (iii): توزيع البسط على s² وتطبيق الإزاحة الثانية u_2(t)',
        formula: '\\mathcal{L}^{-1}\\left\\{\\frac{2}{s} + \\frac{1}{s^2}\\right\\} = 2 + t \\implies f(t) = u_2(t)\\big[2 + (t-2)\\big] = t\\,u_2(t)',
        explanation: 'Shifting 2 + t by (t - 2) simplifies cleanly to t u_2(t).',
        arabicExplanation: 'بعد استبدال t بـ (t-2) تختصر ٢ مع -٢ فيتبقى t u_2(t).'
      }
    ],
    finalAnswerLatex: '\\text{(i) } \\frac{e^{-t}-e^{-3t}-\\sin 2t}{t} \\quad | \\quad \\text{(ii) } e^{-2t}\\sin 3t \\quad | \\quad \\text{(iii) } u_2(t)\\big[2+(t-2)\\big] = t\\,u_2(t)',
    drillOptions: {
      methodChoices: [
        '(i) Derivative Rule -t f(t); (ii) Complete Square (s+2)²+9; (iii) Split 2/s + 1/s² & Shift t → t-2',
        'Partial Fractions for all three',
        'First Shifting Theorem for all three',
        'Convolution Theorem'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the inverse Laplace transform of e^{-2s} (2s + 1) / s²?',
      keyStepChoices: [
        'u_2(t) [2 + (t - 2)] = t u_2(t)',
        'u_2(t) (2 + t)',
        'e^{-2t} (2 + t)',
        'u_2(t) (2t + 1)'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'fin1-q4b',
    numberLabel: 'Final 1 (Fall 2017–18) Q4(b)',
    sourceExam: 'Final 1: Fall 2017–2018 Final',
    sourceYear: '2017–2018',
    sourceFileUrl: '/assets/aistudio/Final_1___1__7cf7076f.pdf',
    points: 4,
    category: Category.FOURIER_SERIES,
    subCategory: 'Fourier Series & Legendre',
    methodTag: 'Fourier Series of f(x) = x on [-π, π] (Odd Function)',
    arabicMethodTag: 'متسلسلة فورييه للدالة الفردية f(x) = x على [-π, π]',
    difficulty: 'Core',
    problemLatex: 'f(x) = x, \\qquad -\\pi \\le x \\le \\pi \\quad \\text{(as Fourier Series)}',
    problemStatement: 'Represent the following function as a Fourier Series (also solved on page 2 of Fourier.pdf):',
    visualRecognitionTrigger: 'Symmetric interval [-π, π] with f(x) = x → Odd function (f(-x) = -f(x)), so a_0 = a_n = 0!',
    arabicVisualTrigger: 'الفترة متماثلة [-π, π] والدالة f(x) = x فردية، إذن a_0 = a_n = 0 ونحسب b_n فقط (مشروحة بالتفصيل في ملف Fourier.pdf ص٢).',
    examinerTrap: 'When evaluating [-x cos(nx)/n + sin(nx)/n^2]_0^π, sin(nπ) = 0 and cos(nπ) = (-1)^n, so b_n = (2/π)[-π(-1)^n / n] = -2(-1)^n / n = 2(-1)^{n+1}/n.',
    arabicExaminerTrap: 'انتبه للإشارة السالبة في القانون: [-π cos(nπ) / n] مضروبة في (2/π) تعطي -2(-1)^n / n.',
    secretShortcut: 'Odd function → a_0 = a_n = 0 → 2-row tabular IBP on (2/π) ∫_0^π x sin(nx) dx.',
    steps: [
      {
        stepNumber: 1,
        title: 'State Odd Symmetry (a_0 = a_n = 0)',
        arabicTitle: 'إثبات أن الدالة فردية وتصفير a_0 و a_n',
        formula: 'f(-x) = -x = -f(x) \\implies \\text{Odd Function}, \\; T = \\pi \\implies a_0 = 0, \\quad a_n = 0',
        explanation: 'By odd symmetry on [-π, π], all cosine terms vanish.',
        arabicExplanation: 'بما أن الدالة فردية على فترة متماثلة، تنعدم معاملات جيب التمام.'
      },
      {
        stepNumber: 2,
        title: 'Compute b_n via Tabular Integration by Parts',
        arabicTitle: 'حساب المعامل b_n بالتكامل بالتجزيء',
        formula: 'b_n = \\frac{2}{\\pi}\\int_0^{\\pi} x\\sin(nx)\\,dx = \\frac{2}{\\pi}\\left[\\frac{-x\\cos(nx)}{n} + \\frac{\\sin(nx)}{n^2}\\right]_0^{\\pi} = \\frac{2}{\\pi}\\left(\\frac{-\\pi(-1)^n}{n}\\right) = \\frac{-2(-1)^n}{n}',
        explanation: 'Substitute cos(nπ) = (-1)^n and sin(nπ) = 0.',
        arabicExplanation: 'بالتعويض بـ π و 0 تختصر π مع π ويتبقى -2(-1)^n / n.'
      }
    ],
    finalAnswerLatex: 'f(x) = \\sum_{n=1}^{\\infty} \\frac{-2(-1)^n}{n}\\sin(nx) = 2\\sum_{n=1}^{\\infty} \\frac{(-1)^{n+1}}{n}\\sin(nx)',
    drillOptions: {
      methodChoices: [
        'Odd Function (a_0 = a_n = 0) + b_n = (2/π) ∫_0^π x sin(nx) dx = -2(-1)^n / n',
        'Even Function (b_n = 0)',
        'Half-Range Cosine Series',
        'Laplace Transform'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the Fourier sine coefficient b_n for f(x) = x on [-π, π]?',
      keyStepChoices: [
        'b_n = -2(-1)^n / n   (or 2(-1)^{n+1} / n)',
        'b_n = 2[(-1)^n - 1] / (πn²)',
        'b_n = 0',
        'b_n = (-1)^n / n²'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'fin1-q5-all',
    numberLabel: 'Final 1 (Fall 2017–18) Q5(a,b,c)',
    sourceExam: 'Final 1: Fall 2017–2018 Final',
    sourceYear: '2017–2018',
    sourceFileUrl: '/assets/aistudio/Final_1___1__7cf7076f.pdf',
    points: 8,
    category: Category.LEGENDRE_POLYNOMIALS,
    subCategory: 'Fourier Series & Legendre',
    methodTag: 'Legendre Recurrence Proof + Orthogonality Integrals',
    arabicMethodTag: 'إثبات علاقة التكرار لليجندر + تكاملات التعامد القياسية',
    difficulty: 'Trick',
    problemLatex: '\\text{(a) Prove } xP_n(x) = \\frac{n+1}{2n+1}P_{n+1}(x) + \\frac{n}{2n+1}P_{n-1}(x) \\quad \\text{(b) } \\int_{-1}^1 P_3^2(x)\\,dx \\quad \\text{(c) } \\int_{-1}^1 xP_1(x)P_2(x)\\,dx',
    problemStatement: 'Solve Question 5 (8 points) — This exact Legendre question appears in EVERY 3-hour Final Exam (Finals 1, 2, 4, 5/6)!',
    visualRecognitionTrigger: 'Question 5 on every Final Exam: Prove Bonnet\'s Recurrence Relation and use it with orthogonality to evaluate definite integrals on [-1, 1]!',
    arabicVisualTrigger: 'السؤال الخامس الثابت في كل امتحانات الفاينل (٨ درجات مضمونة): إثبات علاقة التكرار واستخدامها مع خاصية التعامد!',
    examinerTrap: 'NEVER expand P_3(x), P_7(x), or P_8(x) into polynomials to integrate! Use the Orthogonality Law: ∫_{-1}^1 P_m(x)P_n(x) dx = 0 if m ≠ n, and = 2/(2n+1) if m = n! For ∫_{-1}^1 x P_n(x) P_{n+1}(x) dx, replace x P_n(x) using part (a) so only the P_{n+1}^2(x) term survives!',
    arabicExaminerTrap: 'إياك أن تفك كثيرات حدود ليجندر وتكاملها يدوياً! استخدم قانون التعامد: التكامل يساوي صفراً إذا اختلفت الرتب، ويساوي 2/(2n+1) إذا تساوت! وفي تكامل x P_1 P_2 عوض عن x P_1 بعلاقة التكرار من (a)!',
    secretShortcut: 'Universal formula for ∫_{-1}^1 x P_n(x) P_{n+1}(x) dx = [(n+1)/(2n+1)] × [2/(2n+3)]! For n=1,2: (2/3)×(2/5) = 4/15!',
    steps: [
      {
        stepNumber: 1,
        title: 'Part (a): Prove (2n+1)x P_n(x) = (n+1)P_{n+1}(x) + n P_{n-1}(x) from Generating Function',
        arabicTitle: 'الجزء (a): إثبات علاقة التكرار من الدالة المولدة لليجندر',
        formula: '(1-2xt+t^2)^{-1/2} = \\sum_{n=0}^{\\infty} t^n P_n(x) \\implies \\text{Differentiate w.r.t. } t \\text{ and equate coeff. of } t^n:\\; (2n+1)xP_n = (n+1)P_{n+1} + nP_{n-1}',
        explanation: 'Differentiating G(x,t) = (1-2xt+t^2)^{-1/2} w.r.t. t gives (x-t)G = (1-2xt+t^2)(∂G/∂t). Equating powers of t^n and dividing by (2n+1) completes the proof.',
        arabicExplanation: 'باشتقاق الدالة المولدة بالنسبة لـ t ومساواة معاملات t^n ثم القسمة على (2n+1) ينتج المطلوب.'
      },
      {
        stepNumber: 2,
        title: 'Part (b): Evaluate ∫_{-1}^1 P_3²(x) dx Using Orthogonality Norm',
        arabicTitle: 'الجزء (b): حساب تكامل مربع P_3(x) بقانون التعامد',
        formula: '\\int_{-1}^1 P_n^2(x)\\,dx = \\frac{2}{2n+1} \\implies \\text{For } n = 3:\\quad \\int_{-1}^1 P_3^2(x)\\,dx = \\frac{2}{2(3)+1} = \\frac{2}{7}',
        explanation: 'Plug n = 3 directly into 2/(2n+1). Takes 3 seconds!',
        arabicExplanation: 'بالتعويض المباشر عن n = 3 في قانون التعامد 2/(2n+1) نحصل على 2/7.'
      },
      {
        stepNumber: 3,
        title: 'Part (c): Evaluate ∫_{-1}^1 x P_1(x) P_2(x) dx Using Part (a)',
        arabicTitle: 'الجزء (c): حساب تكامل x P_1(x) P_2(x) بالتعويض من علاقة التكرار (a)',
        formula: 'xP_1(x) = \\frac{2}{3}P_2(x) + \\frac{1}{3}P_0(x) \\implies \\int_{-1}^1 xP_1 P_2\\,dx = \\frac{2}{3}\\int_{-1}^1 P_2^2(x)\\,dx + \\frac{1}{3}\\underbrace{\\int_{-1}^1 P_0 P_2\\,dx}_{=\\,0} = \\frac{2}{3}\\cdot\\frac{2}{2(2)+1} = \\frac{4}{15}',
        explanation: 'Set n = 1 in part (a) to replace x P_1(x). By orthogonality, ∫ P_0 P_2 dx = 0 and ∫ P_2^2 dx = 2/5.',
        arabicExplanation: 'نضع n=1 في علاقة (a) ونعوض عن x P_1(x)، فينعدم تكامل P_0 P_2 بالتعامد ويتبقى (2/3) في تكامل P_2^2 وهو (2/5) فيعطي 4/15.'
      }
    ],
    finalAnswerLatex: '\\text{(b) } \\frac{2}{7} \\qquad | \\qquad \\text{(c) } \\frac{2}{3}\\cdot\\frac{2}{5} = \\frac{4}{15}',
    drillOptions: {
      methodChoices: [
        'Use Orthogonality ∫_{-1}^1 P_n² dx = 2/(2n+1) and Recurrence xP_n = [(n+1)/(2n+1)]P_{n+1} + [n/(2n+1)]P_{n-1}',
        'Expand P_3(x) into powers of x and integrate term by term',
        'Integration by Parts',
        'Laplace Transform'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What are the values of ∫_{-1}^1 P_3²(x) dx and ∫_{-1}^1 x P_1(x) P_2(x) dx?',
      keyStepChoices: [
        '2/7   and   (2/3)(2/5) = 4/15',
        '1/7   and   2/15',
        '2/3   and   0',
        '2/5   and   4/9'
      ],
      correctKeyStepIndex: 0
    }
  },

  // ============================================================================
  // FINAL EXAM 2: FALL 2019–2020 (MTH203, 29/12/2019 — Final_2___1__f9b01d9c.pdf)
  // ============================================================================
  {
    id: 'fin2-q1a',
    numberLabel: 'Final 2 (Fall 2019–20) Q1(a)',
    sourceExam: 'Final 2: Fall 2019–2020 Final (3hr)',
    sourceYear: '2019–2020',
    sourceFileUrl: '/assets/aistudio/Final_2___1__f9b01d9c.pdf',
    points: 3,
    category: Category.SEPARATION,
    subCategory: 'First-Order ODE',
    methodTag: 'Separable ODE (Factoring Common sec y)',
    arabicMethodTag: 'فصل المتغيرات (أخذ sec y عامل مشترك)',
    difficulty: 'Core',
    problemLatex: '\\frac{dy}{dx} = e^x\\sec(y) + \\sec(y)',
    problemStatement: 'Solve the following differential equation (Solved in Ans.Final_2 page 1):',
    visualRecognitionTrigger: 'sec(y) appears in both terms on the RHS → factor out sec(y)(e^x + 1)!',
    arabicVisualTrigger: 'تكرار sec(y) في حدي الطرف الأيمن، نسحبها كعامل مشترك ونقسم عليها لتصبح cos(y) dy.',
    examinerTrap: 'Remember 1 / sec(y) = cos(y), whose integral is +sin(y) (not -sin y).',
    arabicExaminerTrap: 'عند القسمة على sec(y) تصبح في الطرف الأيسر cos(y) dy وتكاملها +sin(y).',
    secretShortcut: 'Factor sec(y)(e^x + 1), divide by sec(y) to get cos(y) dy = (e^x + 1) dx.',
    steps: [
      {
        stepNumber: 1,
        title: 'Factor Out sec(y) and Separate Variables',
        arabicTitle: 'أخذ sec(y) كعامل مشترك وفصل المتغيرات',
        formula: '\\frac{dy}{dx} = \\sec(y)(e^x + 1) \\implies \\cos(y)\\,dy = (e^x + 1)\\,dx',
        explanation: 'Dividing by sec(y) is equivalent to multiplying by cos(y).',
        arabicExplanation: 'القسمة على sec(y) تكافئ الضرب في cos(y).'
      },
      {
        stepNumber: 2,
        title: 'Integrate Both Sides',
        arabicTitle: 'إجراء التكامل للطرفين',
        formula: '\\int \\cos(y)\\,dy = \\int (e^x + 1)\\,dx \\implies \\sin(y) = e^x + x + C',
        explanation: 'Each side integrates in one step.',
        arabicExplanation: 'نكامل الطرفين مباشرة.'
      }
    ],
    finalAnswerLatex: '\\sin(y) = e^x + x + C',
    drillOptions: {
      methodChoices: [
        'Factor out sec(y) → Separable ODE: cos(y) dy = (e^x + 1) dx',
        'Linear First-Order ODE',
        'Homogeneous ODE',
        'Exact ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What do you get after separating variables in dy/dx = e^x sec(y) + sec(y)?',
      keyStepChoices: [
        'cos(y) dy = (e^x + 1) dx   ⇒   sin(y) = e^x + x + C',
        'sec(y) dy = (e^x + 1) dx',
        'dy / (e^x + 1) = cos(y) dx',
        '-sin(y) = e^x + C'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'fin2-q1b',
    numberLabel: 'Final 2 (Fall 2019–20) Q1(b)',
    sourceExam: 'Final 2: Fall 2019–2020 Final (3hr)',
    sourceYear: '2019–2020',
    sourceFileUrl: '/assets/aistudio/Final_2___1__f9b01d9c.pdf',
    points: 4,
    category: Category.REDUCIBLE_SEPARATION,
    subCategory: 'First-Order ODE',
    methodTag: 'Reducible to Separable (Linear Argument z = x - y)',
    arabicMethodTag: 'معادلة تؤول إلى فصل المتغيرات بالتعويض z = x - y',
    difficulty: 'Trick',
    problemLatex: '\\frac{dy}{dx} = -\\sin(x - y) + 1',
    problemStatement: 'Solve the following differential equation (Solved in Ans.Final_2 page 1):',
    visualRecognitionTrigger: 'Linear combination (x - y) locked inside sin(x - y) with +1 outside.',
    arabicVisualTrigger: 'وجود المقدار الخطي (x - y) داخل دالة الجيب sin(x - y) مع +1 في الخارج.',
    examinerTrap: 'Do NOT expand sin(x - y) = sin x cos y - cos x sin y! Substitute z = x - y ⇒ dy/dx = 1 - dz/dx. The +1 on both sides cancels out immediately, leaving dz/dx = sin(z)!',
    arabicExaminerTrap: 'إياك أن تفك sin(x-y) بقانون المجموع! عوض بـ z = x - y فتكون dy/dx = 1 - dz/dx، فيختصر الرقم ١ من الطرفين فوراً!',
    secretShortcut: 'z = x - y ⇒ 1 - z\' = -sin z + 1 ⇒ z\' = sin z ⇒ ∫ csc z dz = ∫ dx ⇒ ln|csc z - cot z| = x + C!',
    steps: [
      {
        stepNumber: 1,
        title: 'Substitute z = x - y and dy/dx = 1 - dz/dx',
        arabicTitle: 'التعويض بـ z = x - y و dy/dx = 1 - dz/dx',
        formula: '1 - \\frac{dz}{dx} = -\\sin(z) + 1 \\implies \\frac{dz}{dx} = \\sin(z)',
        explanation: 'Subtract 1 and multiply by -1 on both sides.',
        arabicExplanation: 'بحذف ١ من الطرفين والضرب في سالب نحصل على dz/dx = sin(z).'
      },
      {
        stepNumber: 2,
        title: 'Separate Variables and Integrate csc(z)',
        arabicTitle: 'فصل المتغيرات وتكامل csc(z)',
        formula: '\\int \\frac{1}{\\sin z}\\,dz = \\int \\csc z\\,dz = \\int dx \\implies \\ln|\\csc(x-y) - \\cot(x-y)| = x + C',
        explanation: 'Use Appendix Formula (12): ∫ csc z dz = ln|csc z - cot z| + C and replace z = x - y.',
        arabicExplanation: 'نكامل csc z بالقانون القياسي ln|csc z - cot z| ثم نرجع z = x - y.'
      }
    ],
    finalAnswerLatex: '\\ln|\\csc(x-y) - \\cot(x-y)| = x + C',
    drillOptions: {
      methodChoices: [
        'Substitute z = x - y (so dy/dx = 1 - dz/dx) → ∫ csc(z) dz = ∫ dx',
        'Expand sin(x - y) = sin x cos y - cos x sin y',
        'Homogeneous Substitution y = vx',
        'Bernoulli ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'After substituting z = x - y into dy/dx = -sin(x - y) + 1, what separable ODE in z results?',
      keyStepChoices: [
        'dz/dx = sin(z)   ⇒   ∫ csc(z) dz = ∫ dx',
        'dz/dx = -sin(z) + 2',
        'dz/dx = cos(z)',
        'z dz = sin(x) dx'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'fin2-q1c',
    numberLabel: 'Final 2 (Fall 2019–20) Q1(c)',
    sourceExam: 'Final 2: Fall 2019–2020 Final (3hr)',
    sourceYear: '2019–2020',
    sourceFileUrl: '/assets/aistudio/Final_2___1__f9b01d9c.pdf',
    points: 4,
    category: Category.EXACT_EQUATIONS,
    subCategory: 'First-Order ODE',
    methodTag: 'Exact ODE with Double-Angle Identity (2 sin x cos x = sin 2x)',
    arabicMethodTag: 'معادلة تامة مع متطابقة ضعف الزاوية 2 sin x cos x = sin 2x',
    difficulty: 'Trick',
    problemLatex: '\\big(3x^2 + 2y\\sin(2x)\\big)\\,dx + \\big(2\\sin^2(x) + 3y^2\\big)\\,dy = 0',
    problemStatement: 'Solve the following differential equation (Solved in Ans.Final_2 page 1):',
    visualRecognitionTrigger: 'M dx + N dy = 0 form where M has 2y sin(2x) and N has 2 sin^2(x).',
    arabicVisualTrigger: 'صورة تفاضلية M dx + N dy = 0 حيث مشتقة 2 sin^2(x) بالنسبة لـ x هي 4 sin x cos x = 2 sin(2x)!',
    examinerTrap: 'When differentiating N = 2 sin^2(x) + 3y^2 with respect to x, you get 4 sin(x)cos(x) = 2 sin(2x), which equals M_y! In the Handwritten Answer Key (Ans.Final_2 p.1), the student integrated 2y sin(2x) dx as +4y cos(2x) instead of -y cos(2x)! Remember ∫ 2 sin(2x) dx = -cos(2x), and using 2 sin^2 x = 1 - cos(2x) shows the -y cos(2x) term is the duplicate!',
    arabicExaminerTrap: 'تحذير من خطأ في الحل اليدوي المتداول (Ans.Final_2 ص١): تكامل 2y sin(2x) بالنسبة لـ x هو (-y cos 2x) بالقسمة على ٢ وليس الضرب في ٢! وبفك 2 sin^2 x = 1 - cos 2x نجد أن (-y cos 2x) حد مكرر يُشطب!',
    secretShortcut: 'Rewrite 2 sin^2(x) = 1 - cos(2x) in N before integrating so you immediately see that -y cos(2x) is the duplicate term!',
    steps: [
      {
        stepNumber: 1,
        title: 'Verify Exactness: M_y = N_x = 2 sin(2x)',
        arabicTitle: 'إثبات أن المعادلة تامة باستخدام متطابقة ضعف الزاوية',
        formula: '\\frac{\\partial M}{\\partial y} = 2\\sin(2x), \\qquad \\frac{\\partial N}{\\partial x} = 4\\sin(x)\\cos(x) = 2\\sin(2x) \\implies \\text{Exact!}',
        explanation: 'By the double-angle identity 2 sin x cos x = sin 2x, M_y = N_x.',
        arabicExplanation: 'باستخدام متطابقة ضعف الزاوية يتساوى الطرفان وتكون المعادلة تامة.'
      },
      {
        stepNumber: 2,
        title: 'Integrate M dx and N dy (Using 2 sin²x = 1 - cos 2x) and Slash Duplicates',
        arabicTitle: 'مكاملة M بالنسبة لـ x و N بالنسبة لـ y وشطب الحد المكرر',
        formula: '\\int M\\,dx = x^3 - y\\cos(2x), \\qquad \\int N\\,dy = \\int (1 - \\cos 2x + 3y^2)\\,dy = y - \\cancel{y\\cos(2x)} + y^3',
        explanation: 'Notice ∫ 2y sin(2x) dx = -y cos(2x), which matches the -y cos(2x) from ∫ 2 sin^2(x) dy = ∫ (1 - cos 2x) dy = y - y cos(2x)!',
        arabicExplanation: 'تكامل 2y sin(2x) dx يعطي -y cos(2x)، وتكامل 2 sin^2(x) dy = (1 - cos 2x) dy يعطي y - y cos(2x)، فنحذف المكرر!'
      }
    ],
    finalAnswerLatex: 'x^3 - y\\cos(2x) + y + y^3 = C \\quad \\left(\\text{or } x^3 + 2y\\sin^2(x) + y^3 = C\\right)',
    drillOptions: {
      methodChoices: [
        'Exact ODE (since ∂N/∂x = 4 sin x cos x = 2 sin 2x = ∂M/∂y)',
        'Non-Exact ODE requiring μ(x)',
        'Homogeneous ODE',
        'Bernoulli ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is ∂/∂x [2 sin²(x) + 3y²], and what is ∫ 2y sin(2x) dx?',
      keyStepChoices: [
        '∂N/∂x = 4 sin x cos x = 2 sin(2x) (Exact!), and ∫ 2y sin(2x) dx = -y cos(2x)',
        '∂N/∂x = 2 cos²(x) (Non-Exact)',
        '∫ 2y sin(2x) dx = +4y cos(2x)',
        '∫ 2y sin(2x) dx = y² sin(2x)'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'fin2-q1d',
    numberLabel: 'Final 2 (Fall 2019–20) Q1(d)',
    sourceExam: 'Final 2: Fall 2019–2020 Final (3hr)',
    sourceYear: '2019–2020',
    sourceFileUrl: '/assets/aistudio/Final_2___1__f9b01d9c.pdf',
    points: 3,
    category: Category.BERNOULLI,
    subCategory: 'First-Order ODE',
    methodTag: 'Bernoulli ODE (Divide by 1+x² First, n = 3)',
    arabicMethodTag: 'معادلة برنولي (القسمة على 1+x² أولاً، n = 3)',
    difficulty: 'Core',
    problemLatex: '(1+x^2)\\frac{dy}{dx} - 2xy = xy^3',
    problemStatement: 'Solve the following differential equation (Solved in Ans.Final_2 page 1):',
    visualRecognitionTrigger: 'Leading (1+x^2) in front of dy/dx and y^3 on the RHS.',
    arabicVisualTrigger: 'وجود (1+x^2) أمام dy/dx مع وجود y^3 في الطرف الأيمن (برنولي n = 3).',
    examinerTrap: 'Divide by (1+x^2) BEFORE reading P(x) and Q(x)! Then with 1 - n = -2, P*(x) = 4x/(1+x^2) = 2 · [2x/(1+x^2)], so μ(x) = e^{2 ln(1+x^2)} = (1+x^2)^2!',
    arabicExaminerTrap: 'اقسم على (1+x^2) أولاً! ثم اضرب في (1-n = -2) ليصبح P* = 4x/(1+x^2) وعامل التكامل هو (1+x^2)^2.',
    secretShortcut: 'μ(x) = (1+x^2)^2 and Q*(x) = -2x/(1+x^2) ⇒ ∫ μ Q* dx = ∫ -2x(1+x^2) dx = -(1+x^2)^2 / 2!',
    steps: [
      {
        stepNumber: 1,
        title: 'Divide by (1+x²) and Multiply P, Q by (1 - n) = -2',
        arabicTitle: 'القسمة على (1+x²) والضرب في (1 - n = -2)',
        formula: 'y\' - \\frac{2x}{1+x^2}y = \\frac{x}{1+x^2}y^3 \\implies P^*(x) = \\frac{4x}{1+x^2}, \\quad Q^*(x) = \\frac{-2x}{1+x^2}, \\quad \\mu(x) = e^{2\\ln(1+x^2)} = (1+x^2)^2',
        explanation: 'Since ∫ [4x/(1+x^2)] dx = 2 ln(1+x^2), μ(x) = (1+x^2)^2.',
        arabicExplanation: 'تكامل 4x/(1+x^2) يعطي 2 ln(1+x^2) ومنه عامل التكامل هو (1+x^2)^2.'
      },
      {
        stepNumber: 2,
        title: 'Apply Direct Bernoulli Formula for y^{-2}',
        arabicTitle: 'التعويض في قانون الحل العام لـ y^{-2}',
        formula: 'y^{-2} = (1+x^2)^{-2}\\left[\\int (1+x^2)^2\\left(\\frac{-2x}{1+x^2}\\right)dx + C\\right] = (1+x^2)^{-2}\\left[-\\frac{(1+x^2)^2}{2} + C\\right] = -\\frac{1}{2} + C(1+x^2)^{-2}',
        explanation: 'Notice ∫ -2x(1+x^2) dx is u du with u = 1+x^2, giving -(1+x^2)^2 / 2.',
        arabicExplanation: 'يختصر قوس (1+x^2) ويتبقى تكامل قوس مرفوع لأس ١ مضروب في مشتقته.'
      }
    ],
    finalAnswerLatex: 'y^{-2} = -\\frac{1}{2} + C(1+x^2)^{-2}',
    drillOptions: {
      methodChoices: [
        'Divide by (1+x²), apply Bernoulli with n = 3 (1-n = -2) and μ(x) = (1+x²)²',
        'Separable ODE',
        'Homogeneous ODE',
        'Exact ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the integrating factor μ(x) for (1+x²)y\' - 2xy = xy³ after applying the Bernoulli transformation?',
      keyStepChoices: [
        'μ(x) = (1 + x²)²',
        'μ(x) = (1 + x²)⁻²',
        'μ(x) = 1 + x²',
        'μ(x) = e^{4x}'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'fin2-q2a',
    numberLabel: 'Final 2 (Fall 2019–20) Q2(a)',
    sourceExam: 'Final 2: Fall 2019–2020 Final (3hr)',
    sourceYear: '2019–2020',
    sourceFileUrl: '/assets/aistudio/Final_2___1__f9b01d9c.pdf',
    points: 4,
    category: Category.HIGHER_ORDER_HOMOGENEOUS,
    subCategory: 'Higher-Order ODE',
    methodTag: '5th-Order Homogeneous ODE (Double Zero Root + Complex Roots)',
    arabicMethodTag: 'معادلة متجانسة من الرتبة الخامسة (جذر صفري مكرر + جذور مركبة)',
    difficulty: 'Trick',
    problemLatex: '\\frac{d^5y}{dx^5} - 3\\frac{d^4y}{dx^4} + 6\\frac{d^3y}{dx^3} - 4\\frac{d^2y}{dx^2} = 0',
    problemStatement: 'Find the general solution of the following differential equation (Solved in Ans.Final_2 page 2):',
    visualRecognitionTrigger: '5th-order homogeneous ODE where y and y\' are missing (lowest derivative is d^2y/dx^2).',
    arabicVisualTrigger: 'معادلة من الرتبة الخامسة تفتقد y و y\'، نسحب m^2 عامل مشترك ومجموع معاملات القوس (1 - 3 + 6 - 4 = 0) يعني m = 1 جذر!',
    examinerTrap: 'Factor out m^2 = 0 FIRST (giving m = 0, 0 → C_1 + C_2 x). Then for m^3 - 3m^2 + 6m - 4 = 0, sum of coefficients is 1 - 3 + 6 - 4 = 0 so m = 1 is an exact root!',
    arabicExaminerTrap: 'اسحب m^2 عامل مشترك أولاً لتعطي C_1 + C_2 x، ثم اختبر مجموع المعاملات (1-3+6-4 = 0) فتجد أن m = 1 جذر مباشر!',
    secretShortcut: 'm^2(m - 1)(m^2 - 2m + 4) = 0 ⇒ m = 0, 0, 1, 1 ± √3 i.',
    steps: [
      {
        stepNumber: 1,
        title: 'Factor Out m² and Use Synthetic Division at m = 1',
        arabicTitle: 'سحب m² عامل مشترك والقسمة التركيبية على m = 1',
        formula: 'm^5 - 3m^4 + 6m^3 - 4m^2 = m^2(m^3 - 3m^2 + 6m - 4) = m^2(m-1)(m^2 - 2m + 4) = 0',
        explanation: 'From m^2 = 0 we get m = 0, 0. From m - 1 = 0 we get m = 1. From m^2 - 2m + 4 = 0 we get m = 1 ± √3 i.',
        arabicExplanation: 'نحصل على خمسة جذور: جذران صفريان (0, 0)، جذر حقيقي (1)، وجذران مركبان (1 ± √3 i).'
      },
      {
        stepNumber: 2,
        title: 'Write the 5-Constant General Solution',
        arabicTitle: 'كتابة الحل العام المكون من ٥ ثوابت',
        formula: 'y = C_1 + C_2 x + C_3 e^x + e^x\\big(C_4\\cos(\\sqrt{3}x) + C_5\\sin(\\sqrt{3}x)\\big)',
        explanation: 'Combine the repeated zero root, real root, and complex conjugate pair.',
        arabicExplanation: 'نجمع حل الجذر الصفري المكرر والجذر الحقيقي والجذرين المركبين.'
      }
    ],
    finalAnswerLatex: 'y = C_1 + C_2 x + C_3 e^x + e^x\\big(C_4\\cos(\\sqrt{3}x) + C_5\\sin(\\sqrt{3}x)\\big)',
    drillOptions: {
      methodChoices: [
        'Factor m²(m - 1)(m² - 2m + 4) = 0 → m = 0, 0, 1, 1 ± √3 i',
        'Undetermined Coefficients',
        'Variation of Parameters',
        'Reduction of Order'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What are all 5 roots of m⁵ - 3m⁴ + 6m³ - 4m² = 0?',
      keyStepChoices: [
        'm = 0, 0,   m = 1,   and   m = 1 ± √3 i',
        'm = 0,   m = 1,   m = 2,   and   m = ±2i',
        'm = 1, 1,   and   m = ±√3 i',
        'm = 0, 0,   m = -1,   and   m = -1 ± √3 i'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'fin2-q2b',
    numberLabel: 'Final 2 (Fall 2019–20) Q2(b)',
    sourceExam: 'Final 2: Fall 2019–2020 Final (3hr)',
    sourceYear: '2019–2020',
    sourceFileUrl: '/assets/aistudio/Final_2___1__f9b01d9c.pdf',
    points: 4,
    category: Category.UNDETERMINED_COEFFS,
    subCategory: 'Higher-Order ODE',
    methodTag: 'Undetermined Coefficients (2 sin x RHS — Faster than Wronskian!)',
    arabicMethodTag: 'المعاملات غير المعينة (أسرع بكثير من طريقة فرونسكي في الحل اليدوي!)',
    difficulty: 'Core',
    problemLatex: '\\frac{d^2y}{dx^2} + \\frac{dy}{dx} + y = 2\\sin(x)',
    problemStatement: 'Find the general solution of the following differential equation:',
    visualRecognitionTrigger: 'Constant-coefficient ODE with RHS = 2 sin(x).',
    arabicVisualTrigger: 'معادلة بمعاملات ثابتة وطرفها الأيمن 2 sin(x) تحل في سطرين بالمعاملات غير المعينة!',
    examinerTrap: 'Look at Ans.Final_2 page 2: the student tried Variation of Parameters with u = e^{-x/2}cos(√3 x/2), which created a nightmare integral and got stuck! Because the RHS is 2 sin(x), Undetermined Coefficients y_p = A cos x + B sin x solves it in 15 seconds: y_p = -2 cos(x)!',
    arabicExaminerTrap: 'تنبيه هام من الحل اليدوي (Ans.Final_2 ص٢): الطالب حاول حلها بطريقة فرونسكي فتعقدت التكاملات وأخطأ! الطرف الأيمن 2 sin(x) يُحل بالمعاملات غير المعينة y_p = A cos x + B sin x في عشر ثوانٍ فقط ويعطي y_p = -2 cos(x)!',
    secretShortcut: 'Notice if y_p = -2 cos(x), then y_p\'\' + y_p = +2 cos(x) - 2 cos(x) = 0, leaving only y_p\' = +2 sin(x)! So y_p = -2 cos(x) immediately!',
    steps: [
      {
        stepNumber: 1,
        title: 'Find y_c from m² + m + 1 = 0',
        arabicTitle: 'إيجاد الحل المتجانس y_c من القانون العام',
        formula: 'm^2 + m + 1 = 0 \\implies m = -\\frac{1}{2} \\pm \\frac{\\sqrt{3}}{2}i \\implies y_c = e^{-x/2}\\left(C_1\\cos\\frac{\\sqrt{3}}{2}x + C_2\\sin\\frac{\\sqrt{3}}{2}x\\right)',
        explanation: 'Complex conjugate roots α = -1/2, β = √3/2.',
        arabicExplanation: 'جذور مركبة تعطي دالة أسية مضروبة في cos و sin.'
      },
      {
        stepNumber: 2,
        title: 'Use Undetermined Coefficients y_p = A cos x + B sin x',
        arabicTitle: 'فرض الحل الخاص y_p = A cos x + B sin x والتعويض المباشر',
        formula: 'y_p\'\' + y_p\' + y_p = (-A\\cos x - B\\sin x) + (-A\\sin x + B\\cos x) + (A\\cos x + B\\sin x) = -A\\sin x + B\\cos x = 2\\sin x',
        explanation: 'Notice y_p\'\' and y_p cancel each other out completely! We get -A = 2 ⇒ A = -2 and B = 0, so y_p = -2 cos(x).',
        arabicExplanation: 'تختصر y_p\'\' مع y_p تماماً! ويتبقى -A sin x + B cos x = 2 sin x ومنها A = -2 و B = 0 أي y_p = -2 cos x.'
      }
    ],
    finalAnswerLatex: 'y = e^{-x/2}\\left(C_1\\cos\\frac{\\sqrt{3}}{2}x + C_2\\sin\\frac{\\sqrt{3}}{2}x\\right) - 2\\cos(x)',
    drillOptions: {
      methodChoices: [
        'Undetermined Coefficients y_p = A cos x + B sin x (since y_p\'\' + y_p = 0, y_p\' = 2 sin x ⇒ y_p = -2 cos x!)',
        'Variation of Parameters with e^{-x/2} cos(√3 x / 2)',
        'Reduction of Order',
        'Bernoulli Substitution'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'When plugging y_p = A cos(x) + B sin(x) into y\'\' + y\' + y = 2 sin(x), what happens to y_p\'\' + y_p?',
      keyStepChoices: [
        'y_p\'\' + y_p cancels to 0 immediately, leaving y_p\' = -A sin x + B cos x = 2 sin x ⇒ A = -2, B = 0!',
        'It gives 2A cos x + 2B sin x',
        'It requires x-boost resonance',
        'Undetermined Coefficients cannot be used on 2 sin(x)'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'fin2-q2c',
    numberLabel: 'Final 2 (Fall 2019–20) Q2(c)',
    sourceExam: 'Final 2: Fall 2019–2020 Final (3hr)',
    sourceYear: '2019–2020',
    sourceFileUrl: '/assets/aistudio/Final_2___1__f9b01d9c.pdf',
    points: 4,
    category: Category.VARIATION_OF_PARAMETERS,
    subCategory: 'Higher-Order ODE',
    methodTag: 'Variation of Parameters (RHS = tan x sec x)',
    arabicMethodTag: 'تغيير البارامترات (الطرف الأيمن tan x sec x — مكرر في Final 2 و Final 3)',
    difficulty: 'Core',
    problemLatex: '\\frac{d^2y}{dx^2} + y = \\tan(x)\\sec(x)',
    problemStatement: 'Find the general solution of the differential equation (Appeared in BOTH Final 2 Q2c and Final 3 Q2c!):',
    visualRecognitionTrigger: 'RHS is tan(x)sec(x) → Variation of Parameters with u_1 = cos x, u_2 = sin x, W = 1.',
    arabicVisualTrigger: 'الطرف الأيمن tan(x)sec(x) يتكرر كثيراً في الفاينل ويحل بتغيير البارامترات.',
    examinerTrap: 'In A(x) = ∫ -sin x (tan x sec x) dx = ∫ -tan^2(x) dx, remember to replace tan^2(x) with (sec^2 x - 1) so the integral is -(tan x - x) = x - tan x!',
    arabicExaminerTrap: 'في تكامل A(x) نحصل على ∫ -tan^2(x) dx، فنستبدل tan^2 x بـ (sec^2 x - 1) ليصبح الناتج -(tan x - x)!',
    secretShortcut: 'A(x) = ∫ -tan^2 x dx = x - tan x; B(x) = ∫ tan x dx = ln|sec x|.',
    steps: [
      {
        stepNumber: 1,
        title: 'Find y_c = C_1 cos x + C_2 sin x and W = 1',
        arabicTitle: 'إيجاد الحل المتجانس y_c ومحددة فرونسكي W = 1',
        formula: 'u_1 = \\cos x, \\quad u_2 = \\sin x, \\quad W = 1, \\quad f(x) = \\tan x\\sec x = \\frac{\\sin x}{\\cos^2 x}',
        explanation: 'Write tan x sec x in terms of sin x and cos x to simplify the products.',
        arabicExplanation: 'نكتب tan x sec x على صورة sin x / cos^2 x لتسهيل الاختصار.'
      },
      {
        stepNumber: 2,
        title: 'Evaluate A(x) and B(x)',
        arabicTitle: 'حساب التكاملين A(x) و B(x)',
        formula: 'A(x) = \\int -\\frac{\\sin^2 x}{\\cos^2 x}\\,dx = -\\int (\\sec^2 x - 1)\\,dx = x - \\tan x, \\qquad B(x) = \\int \\frac{\\cos x\\sin x}{\\cos^2 x}\\,dx = \\int \\tan x\\,dx = \\ln|\\sec x|',
        explanation: 'Combine y_p = (x - tan x)cos x + sin(x)ln|sec x| = x cos x - sin x + sin(x)ln|sec x|.',
        arabicExplanation: 'نعوض في y_p = A(x)cos x + B(x)sin x.'
      }
    ],
    finalAnswerLatex: 'y = C_1\\cos x + C_2\\sin x + (x - \\tan x)\\cos x + \\sin(x)\\ln|\\sec x|',
    drillOptions: {
      methodChoices: [
        'Variation of Parameters (A(x) = x - tan x, B(x) = ln|sec x|)',
        'Undetermined Coefficients',
        'Reduction of Order',
        'Exact ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'In Variation of Parameters for y\'\' + y = tan(x) sec(x), what does A(x) = ∫ -sin(x) tan(x) sec(x) dx simplify to?',
      keyStepChoices: [
        '-∫ tan²(x) dx = -∫ (sec²x - 1) dx = x - tan(x)',
        '-∫ sec²(x) dx = -tan(x)',
        'ln|sec x + tan x|',
        'sec(x)'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'fin2-q2d',
    numberLabel: 'Final 2 (Fall 2019–20) Q2(d)',
    sourceExam: 'Final 2: Fall 2019–2020 Final (3hr)',
    sourceYear: '2019–2020',
    sourceFileUrl: '/assets/aistudio/Final_2___1__f9b01d9c.pdf',
    points: 4,
    category: Category.REDUCTION_OF_ORDER,
    subCategory: 'Higher-Order ODE',
    methodTag: 'Reduction of Order (Given y_1 = cos x)',
    arabicMethodTag: 'اختزال الرتبة بمعلومية الحل المتجانس y_1 = cos x',
    difficulty: 'Trick',
    problemLatex: '\\frac{d^2y}{dx^2} + y = 1, \\qquad \\text{given } y_1 = \\cos(x)',
    problemStatement: 'Find the general solution of the differential equation, given that y = cos(x) is a homogeneous solution (Solved in Ans.Final_2 page 3):',
    visualRecognitionTrigger: 'Explicit instruction: "given that y = cos(x) is a homogeneous solution" → You MUST use Reduction of Order y = v cos(x) to earn the marks!',
    arabicVisualTrigger: 'وجود جملة "given that y = cos(x) is a homogeneous solution" يلزمك باستخدام خطوات اختزال الرتبة y = v cos(x)!',
    examinerTrap: 'Even though y\'\' + y = 1 has constant coefficients, if you don\'t show the Reduction of Order steps (y = v cos x, z = v\'), you lose the method marks! Notice at the end: y = cos x (sec x + C_1 tan x + C_2) = 1 + C_1 sin x + C_2 cos x!',
    arabicExaminerTrap: 'يجب كتابة خطوات اختزال الرتبة y = v cos(x) كاملة للحصول على درجة السؤال، وفي النهاية عند ضرب v في cos(x) نحصل على 1 + C_1 sin x + C_2 cos x!',
    secretShortcut: 'y = v cos x ⇒ v\'\' cos x - 2v\' sin x = 1 ⇒ z\' - 2 tan(x) z = sec(x) with μ = cos^2(x)!',
    steps: [
      {
        stepNumber: 1,
        title: 'Substitute y = v cos x, y\' = v\' cos x - v sin x, y\'\' = v\'\' cos x - 2v\' sin x - v cos x',
        arabicTitle: 'التعويض بـ y = v cos x ومشتقاتها في المعادلة',
        formula: '(v\'\'\\cos x - 2v\'\\sin x - v\\cos x) + v\\cos x = 1 \\implies v\'\'\\cos x - 2v\'\\sin x = 1',
        explanation: 'The -v cos x and +v cos x terms cancel out completely.',
        arabicExplanation: 'تختصر حدود v cos x تماماً.'
      },
      {
        stepNumber: 2,
        title: 'Let z = v\' and Divide by cos x',
        arabicTitle: 'وضع z = v\' والقسمة على cos x لإيجاد عامل التكامل',
        formula: 'z\' - 2\\tan(x)z = \\sec(x) \\implies \\mu(x) = e^{-2\\int \\tan x\\,dx} = e^{-2\\ln|\\sec x|} = \\cos^2(x)',
        explanation: 'Then z(x) = sec^2(x) [∫ cos^2(x) sec(x) dx + C_1] = sec^2(x) (sin x + C_1) = sec x tan x + C_1 sec^2 x.',
        arabicExplanation: 'عامل التكامل هو cos^2(x) ومنه نجد z = v\' = sec x tan x + C_1 sec^2 x.'
      },
      {
        stepNumber: 3,
        title: 'Integrate v\' to Find v(x) and Multiply by cos(x)',
        arabicTitle: 'مكاملة v\' لإيجاد v ثم الضرب في cos(x)',
        formula: 'v(x) = \\sec x + C_1\\tan x + C_2 \\implies y = \\cos(x)v(x) = 1 + C_1\\sin x + C_2\\cos x',
        explanation: 'Multiplying by cos(x) converts sec(x) to 1 and tan(x) to sin(x).',
        arabicExplanation: 'عند ضرب v(x) في cos(x) تصبح sec x · cos x = 1 و tan x · cos x = sin x.'
      }
    ],
    finalAnswerLatex: 'y = 1 + C_1\\sin(x) + C_2\\cos(x)',
    drillOptions: {
      methodChoices: [
        'Reduction of Order: y = v cos x → z\' - 2 tan(x) z = sec(x) with μ = cos²(x)',
        'Homogeneous First-Order Substitution y = vx',
        'Bernoulli Method',
        'Exact ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'In Reduction of Order for y\'\' + y = 1 with y_1 = cos(x), what is the integrating factor μ(x) for z\' - 2 tan(x) z = sec(x)?',
      keyStepChoices: [
        'μ(x) = e^{-2 ∫ tan x dx} = sec⁻²(x) = cos²(x)',
        'μ(x) = sec²(x)',
        'μ(x) = sin²(x)',
        'μ(x) = e^{-2x}'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'fin2-q3a',
    numberLabel: 'Final 2 (Fall 2019–20) Q3(a)',
    sourceExam: 'Final 2: Fall 2019–2020 Final (3hr)',
    sourceYear: '2019–2020',
    sourceFileUrl: '/assets/aistudio/Final_2___1__f9b01d9c.pdf',
    points: 4,
    category: Category.LAPLACE_ODE,
    subCategory: 'Laplace & Inverse Laplace',
    methodTag: '2nd-Order IVP via Laplace Transform',
    arabicMethodTag: 'حل معادلة تفاضلية بتحويل لابلاس (مقام محلل إلى ٣ أقواس)',
    difficulty: 'Core',
    problemLatex: "\\frac{d^2y}{dt^2} - 3\\frac{dy}{dt} + 2y = 4; \\qquad y(0) = 1, \\; y'(0) = 0",
    problemStatement: 'Solve the following differential equation using Laplace transform (Solved in Ans.Final_2 page 4):',
    visualRecognitionTrigger: '2nd-order IVP with y(0) = 1, y\'(0) = 0 and RHS = 4.',
    arabicVisualTrigger: 'معادلة من الرتبة الثانية بشروط ابتدائية وطرف أيمن ثابت = ٤.',
    examinerTrap: 'Wait — check Ans.Final_2 page 4! When moving -s + 3 to the RHS, it becomes +s - 3! So Y(s) = [4/s + s - 3]/[(s-1)(s-2)] = (s^2 - 3s + 4)/[s(s-1)(s-2)]. In the handwritten sheet, the student wrote +4 instead of +s-3! Let\'s show the exact mathematically rigorous solution:',
    arabicExaminerTrap: 'تنبيه هام من خطأ في الحل اليدوي (Ans.Final_2 ص٤): الحد (-s y(0) + 3 y(0)) يساوي (-s + 3) وعند نقله للطرف الأيمن يصبح (+s - 3) مجموعاً مع 4/s، أي البسط هو (s^2 - 3s + 4)!',
    secretShortcut: 'Even faster: notice (s^2 - 3s) in the numerator is s(s - 3), or split Y(s) = 4/[s(s-1)(s-2)] + (s-3)/[(s-1)(s-2)]!',
    steps: [
      {
        stepNumber: 1,
        title: 'Transform the ODE and Substitute y(0) = 1, y\'(0) = 0',
        arabicTitle: 'تطبيق لابلاس والتعويض بالشروط الابتدائية y(0)=1, y\'(0)=0',
        formula: '\\big[s^2Y(s) - s(1) - 0\\big] - 3\\big[sY(s) - 1\\big] + 2Y(s) = \\frac{4}{s} \\implies (s^2-3s+2)Y(s) = s - 3 + \\frac{4}{s} = \\frac{s^2-3s+4}{s}',
        explanation: 'Collect Y(s) terms and move -s + 3 to the RHS as +s - 3.',
        arabicExplanation: 'ننقل (-s + 3) إلى الطرف الأيمن فتصبح (+s - 3) ونوحد المقام مع 4/s.'
      },
      {
        stepNumber: 2,
        title: 'Partial Fractions at s = 0, s = 1, and s = 2',
        arabicTitle: 'تحليل الكسور الجزئية عند s = 0, 1, 2 وإيجاد لابلاس العكسي',
        formula: 'Y(s) = \\frac{s^2-3s+4}{s(s-1)(s-2)} = \\frac{2}{s} - \\frac{2}{s-1} + \\frac{1}{s-2} \\implies y(t) = 2 - 2e^t + e^{2t}',
        explanation: 'Check: y(0) = 2 - 2 + 1 = 1 (matches!), y\'(0) = -2 + 2 = 0 (matches!), and y\'\' - 3y\' + 2y = 4!',
        arabicExplanation: 'بالتعويض عند s=0 نجد A=2، وعند s=1 نجد B=-2، وعند s=2 نجد C=1. (تحقق: y(0)=2-2+1=1 صحيح 100%).'
      }
    ],
    finalAnswerLatex: 'y(t) = 2 - 2e^t + e^{2t}',
    drillOptions: {
      methodChoices: [
        'Transform ODE → Y(s) = (s² - 3s + 4) / [s(s - 1)(s - 2)] = 2/s - 2/(s-1) + 1/(s-2)',
        'Variation of Parameters',
        'Reduction of Order',
        'Second Shifting Theorem'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the exact solution y(t) of y\'\' - 3y\' + 2y = 4 with y(0) = 1 and y\'(0) = 0?',
      keyStepChoices: [
        'y(t) = 2 - 2e^t + e^{2t}   (which satisfies y(0) = 1 and y\'(0) = 0!)',
        'y(t) = 2 - 8e^t + 6e^{2t}   (from the handwritten note typo)',
        'y(t) = 4 - 3e^t + e^{2t}',
        'y(t) = 2 + 2e^t - e^{2t}'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'fin2-q3b-all',
    numberLabel: 'Final 2 (Fall 2019–20) Q3(b) [i–iv]',
    sourceExam: 'Final 2: Fall 2019–2020 Final (3hr)',
    sourceYear: '2019–2020',
    sourceFileUrl: '/assets/aistudio/Final_2___1__f9b01d9c.pdf',
    points: 12,
    category: Category.LAPLACE_THEOREMS,
    subCategory: 'Laplace & Inverse Laplace',
    methodTag: 'Phase-Shift Trig Trap + Second Shift t² Alignment + Derivative & Integral Rules',
    arabicMethodTag: 'الأفكار الأربع للابلاس في Final 2 (خدعة cos(3t+π/2) وإزاحة t²)',
    difficulty: 'Boss',
    problemLatex: '\\text{(i) } \\cos\\left(3t+\\frac{\\pi}{2}\\right)+\\cosh t \\quad \\text{(ii) } u_5(t)e^{t-5}t^2 \\quad \\text{(iii) } t(\\sin t+e^{2t}) \\quad \\text{(iv) } \\sin 2t\\cos 2t + \\int_0^t(\\cosh\\tau+1)d\\tau',
    problemStatement: 'Find the Laplace transform of the four functions in Final 2 Question 3(b):',
    visualRecognitionTrigger: '(i) Angle sum cos(3t + π/2); (ii) u_5(t) with unshifted t^2; (iii) Multiplication by t; (iv) Double angle + Integral rule.',
    arabicVisualTrigger: '(i) مجموع زاويتين داخل cos، (ii) دالة خطوة u_5 مع t^2 غير مزاحة، (iii) الضرب في t، (iv) ضعف الزاوية مع التكامل.',
    examinerTrap: 'HANDWRITTEN NOTE WARNING (Ans.Final_2 p.4): In (i), cos(3t + π/2) is NOT cos(3t) + cos(π/2)! Cosine does NOT distribute over addition! By Appendix A-4: cos(3t + π/2) = cos(3t)cos(π/2) - sin(3t)sin(π/2) = -sin(3t), whose Laplace is -3/(s^2+9)! In (ii), rewrite t^2 = ((t-5)+5)^2 = (t-5)^2 + 10(t-5) + 25!',
    arabicExaminerTrap: 'تحذير خطير من خطأ الحل اليدوي (Ans.Final_2 ص٤): الدالة cos(3t + π/2) لا تتوزع على الجمع أبداً! بل من متطابقة المجموع cos(3t+π/2) = -sin(3t) ولابلاس لها هو -3/(s^2+9)! وفي (ii) نفك t^2 = ((t-5)+5)^2 = (t-5)^2 + 10(t-5) + 25.',
    secretShortcut: 'cos(θ + π/2) = -sin(θ). And for u_5(t) e^{t-5} t^2, expand (t+5)^2 = t^2 + 10t + 25, transform, shift s → s-1, and multiply by e^{-5s}!',
    steps: [
      {
        stepNumber: 1,
        title: 'Part (i): Simplify cos(3t + π/2) = -sin(3t) First',
        arabicTitle: 'الجزء (i): تبسيط cos(3t + π/2) = -sin(3t) أولاً',
        formula: '\\cos\\left(3t+\\frac{\\pi}{2}\\right) + \\cosh t = -\\sin 3t + \\cosh t \\implies F(s) = -\\frac{3}{s^2+9} + \\frac{s}{s^2-1}',
        explanation: 'Using cos(A+B) = cos A cos B - sin A sin B with cos(π/2)=0, sin(π/2)=1.',
        arabicExplanation: 'من قانون جيب تمام المجموع نجد أن cos(3t + π/2) = -sin(3t).'
      },
      {
        stepNumber: 2,
        title: 'Part (ii): Align t² = ((t-5)+5)² for u_5(t) e^{t-5} t²',
        arabicTitle: 'الجزء (ii): كتابة t² بدلالة (t-5) لتطبيق الإزاحة الثانية والأولى',
        formula: 'u_5(t)e^{t-5}\\big[(t-5)^2 + 10(t-5) + 25\\big] \\implies F(s) = e^{-5s}\\left[\\frac{2!}{(s-1)^3} + \\frac{10}{(s-1)^2} + \\frac{25}{s-1}\\right]',
        explanation: 'Pull out e^{-5s}, transform t^2 + 10t + 25 → 2/s^3 + 10/s^2 + 25/s, and shift s → s-1 for e^t.',
        arabicExplanation: 'نضيف ونطرح ٥ داخل التربيع ونفك القوس، ثم نطبق الإزاحة الثانية e^{-5s} والإزاحة الأولى (s-1).'
      },
      {
        stepNumber: 3,
        title: 'Parts (iii) & (iv): Multiplication by t and Integral Rule',
        arabicTitle: 'الجزء (iii) و (iv): الضرب في t وقاعدة التكامل',
        formula: '\\text{(iii) } F(s) = \\frac{2s}{(s^2+1)^2} + \\frac{1}{(s-2)^2}, \\qquad \\text{(iv) } F(s) = \\frac{1}{2}\\left(\\frac{4}{s^2+16}\\right) + \\frac{1}{s}\\left(\\frac{s}{s^2-1} + \\frac{1}{s}\\right)',
        explanation: 'In (iv), sin 2t cos 2t = ½ sin 4t → 2/(s^2+16).',
        arabicExplanation: 'في (iv) نحول sin 2t cos 2t إلى ½ sin 4t ونقسم لابلاس التكامل على s.'
      }
    ],
    finalAnswerLatex: '\\text{(i) } \\frac{-3}{s^2+9}+\\frac{s}{s^2-1} \\; | \\; \\text{(ii) } e^{-5s}\\left(\\frac{2}{(s-1)^3}+\\frac{10}{(s-1)^2}+\\frac{25}{s-1}\\right) \\; | \\; \\text{(iii) } \\frac{2s}{(s^2+1)^2}+\\frac{1}{(s-2)^2} \\; | \\; \\text{(iv) } \\frac{2}{s^2+16}+\\frac{1}{s^2-1}+\\frac{1}{s^2}',
    drillOptions: {
      methodChoices: [
        'Use cos(3t + π/2) = -sin(3t) for (i), and t² = (t-5)² + 10(t-5) + 25 for (ii)',
        'Distribute cos over addition: cos(3t) + cos(π/2)',
        'Leave t² unshifted in (ii)',
        'Divide by t in (iii)'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the Laplace transform of f(t) = cos(3t + π/2) + cosh(t)?',
      keyStepChoices: [
        '-3 / (s² + 9) + s / (s² - 1)   (since cos(3t + π/2) = -sin 3t!)',
        's / (s² + 9) + s / (s² + π²/4) + s / (s² - 1)',
        '3 / (s² + 9) + 1 / (s² - 1)',
        's / (s² + 9) + s / (s² - 1)'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'fin2-q4a-all',
    numberLabel: 'Final 2 (Fall 2019–20) Q4(a) [i–iv]',
    sourceExam: 'Final 2: Fall 2019–2020 Final (3hr)',
    sourceYear: '2019–2020',
    sourceFileUrl: '/assets/aistudio/Final_2___1__f9b01d9c.pdf',
    points: 12,
    category: Category.INVERSE_LAPLACE,
    subCategory: 'Laplace & Inverse Laplace',
    methodTag: 'Term-by-Term Division, Second Shift, 1/s Integral Rule & Log Derivative',
    arabicMethodTag: 'الأفكار الأربع للابلاس العكسي في Final 2 (توزيع البسط، الإزاحة، التكامل، اللوغاريتم)',
    difficulty: 'Core',
    problemLatex: '\\text{(i) } \\frac{s^3-s^2+s-1}{s^5}+\\frac{4s}{s^2+16} \\quad \\text{(ii) } \\frac{e^{-s}-e^{-2s}}{s^2-1} \\quad \\text{(iii) } \\frac{1}{s(s^2+1)} \\quad \\text{(iv) } \\ln\\left(\\frac{s+6}{s+2}\\right)',
    problemStatement: 'Find the inverse Laplace transform of the four functions in Final 2 Question 4(a) (Solved in Ans.Final_2 page 5):',
    visualRecognitionTrigger: '(i) Polynomial over s^5; (ii) e^{-s} and e^{-2s} over s^2-1; (iii) 1/s times 1/(s^2+1); (iv) Logarithm ratio.',
    arabicVisualTrigger: '(i) قسمة كل حد على s^5، (ii) إزاحة ثانية بـ sinh، (iii) قاعدة التكامل 1/s، (iv) اشتقاق اللوغاريتم.',
    examinerTrap: 'In (iii), 1/[s(s^2+1)] is an immediate 1-step Inverse Integral Rule: ∫_0^t sin(τ) dτ = 1 - cos(t)! Notice in Ans.Final_2 p.5 the student integrated sin(τ) as +cos(τ) instead of -cos(τ), getting cos t - 1 instead of 1 - cos t!',
    arabicExaminerTrap: 'انتبه في (iii): تكامل sin(τ) من 0 إلى t هو [-cos τ]_0^t = -cos t - (-1) = 1 - cos t (وليس cos t - 1 كما في الحل اليدوي)!',
    secretShortcut: 'Memorize: L⁻¹{1 / [s(s^2 + a^2)]} = (1 - cos at) / a^2!',
    steps: [
      {
        stepNumber: 1,
        title: 'Parts (i) & (ii): Term Division and Second Shifting Theorem',
        arabicTitle: 'الجزء (i) و (ii): توزيع البسط على s⁵ ونظرية الإزاحة الثانية',
        formula: '\\text{(i) } f(t) = t - \\frac{t^2}{2!} + \\frac{t^3}{3!} - \\frac{t^4}{4!} + 4\\cos 4t, \\qquad \\text{(ii) } f(t) = u_1(t)\\sinh(t-1) - u_2(t)\\sinh(t-2)',
        explanation: 'In (i), divide each term by s^5 to get 1/s^2 - 1/s^3 + 1/s^4 - 1/s^5. In (ii), L⁻¹{1/(s^2-1)} = sinh t.',
        arabicExplanation: 'نقسم كل حد في البسط على s^5، وفي (ii) نحول 1/(s^2-1) إلى sinh مع الإزاحة.'
      },
      {
        stepNumber: 2,
        title: 'Parts (iii) & (iv): Inverse Integral Rule & Log Derivative Rule',
        arabicTitle: 'الجزء (iii) و (iv): قاعدة التكامل العكسي وقاعدة اشتقاق اللوغاريتم',
        formula: '\\text{(iii) } f(t) = \\int_0^t \\sin\\tau\\,d\\tau = \\Big[-\\cos\\tau\\Big]_0^t = 1 - \\cos t, \\qquad \\text{(iv) } F\'(s) = \\frac{1}{s+6}-\\frac{1}{s+2} \\implies f(t) = \\frac{e^{-2t}-e^{-6t}}{t}',
        explanation: 'In (iv), -t f(t) = e^{-6t} - e^{-2t} ⇒ f(t) = (e^{-2t} - e^{-6t})/t.',
        arabicExplanation: 'في (iii) نكامل sin τ فتعطي 1 - cos t، وفي (iv) نشتق اللوغاريتم ونقسم على (-t).'
      }
    ],
    finalAnswerLatex: '\\text{(i) } t-\\frac{t^2}{2}+\\frac{t^3}{6}-\\frac{t^4}{24}+4\\cos 4t \\; | \\; \\text{(ii) } u_1(t)\\sinh(t-1)-u_2(t)\\sinh(t-2) \\; | \\; \\text{(iii) } 1-\\cos t \\; | \\; \\text{(iv) } \\frac{e^{-2t}-e^{-6t}}{t}',
    drillOptions: {
      methodChoices: [
        '(i) Divide by s⁵; (ii) Second Shift sinh; (iii) ∫_0^t sin τ dτ = 1 - cos t; (iv) Log Derivative',
        'Partial Fractions for all four',
        'First Shifting Theorem for all four',
        'Completing the Square'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the exact inverse Laplace transform of F(s) = 1 / [s(s² + 1)]?',
      keyStepChoices: [
        '1 - cos(t)   (since ∫_0^t sin τ dτ = [-cos τ]_0^t = -cos t + cos 0 = 1 - cos t)',
        'cos(t) - 1',
        't sin(t)',
        'sin(t) - cos(t)'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'fin2-q4b',
    numberLabel: 'Final 2 (Fall 2019–20) Q4(b)',
    sourceExam: 'Final 2: Fall 2019–2020 Final (3hr)',
    sourceYear: '2019–2020',
    sourceFileUrl: '/assets/aistudio/Final_2___1__f9b01d9c.pdf',
    points: 4,
    category: Category.FOURIER_SERIES,
    subCategory: 'Fourier Series & Legendre',
    methodTag: 'Fourier Cosine Series of f(x) = x on [0, π]',
    arabicMethodTag: 'متسلسلة فورييه لجيب التمام للدالة f(x) = x على [0, π]',
    difficulty: 'Core',
    problemLatex: 'f(x) = x, \\qquad 0 \\le x \\le \\pi \\quad \\text{(as Fourier Cosine Series)}',
    problemStatement: 'Represent the following function as a Fourier Cosine Series (Solved correctly on page 2 of Fourier.pdf!):',
    visualRecognitionTrigger: 'Half-interval [0, π] with explicit instruction "as Fourier Cosine Series" → b_n = 0, compute a_0 and a_n!',
    arabicVisualTrigger: 'فترة نصفية [0, π] ومطلوب متسلسلة جيب التمام Fourier Cosine Series أي نضع b_n = 0 ونحسب a_0 و a_n (مشروحة في Fourier.pdf ص٢).',
    examinerTrap: 'HANDWRITTEN NOTE WARNING (Ans.Final_2 p.5): In the student handwritten sheet, the writer got confused and set a_0 = 0, integrated from -π to π, and forgot to plug in the limits x = π and x = 0! Look at Fourier.pdf page 2 for the true solution: since it asks for a Cosine Series on [0, π], b_n = 0, a_0 = π, and a_n = (2/πn^2)[(-1)^n - 1]!',
    arabicExaminerTrap: 'تحذير هام من الحل اليدوي الخاطئ في (Ans.Final_2 ص٥): الحل الصحيح موجود في ملزمة (Fourier.pdf ص٢)! بما أن المطلوب Cosine Series على [0, π] فإن b_n = 0، و a_0 = π، و a_n = (2/πn^2)[(-1)^n - 1]!',
    secretShortcut: 'Cosine series on [0, π] of x has the exact same coefficients as |x| on [-π, π]!',
    steps: [
      {
        stepNumber: 1,
        title: 'Set b_n = 0 and Compute a_0 on [0, π]',
        arabicTitle: 'وضع b_n = 0 وحساب المعامل a_0 على الفترة [0, π]',
        formula: 'b_n = 0, \\qquad a_0 = \\frac{2}{\\pi}\\int_0^{\\pi} x\\,dx = \\frac{2}{\\pi}\\left[\\frac{x^2}{2}\\right]_0^{\\pi} = \\pi',
        explanation: 'For a Fourier Cosine Series on [0, T] with T = π, b_n = 0 automatically.',
        arabicExplanation: 'في متسلسلة جيب التمام لنصف المدى تكون b_n = 0 دائماً.'
      },
      {
        stepNumber: 2,
        title: 'Compute a_n Using Tabular IBP and Plug In Limits 0 and π',
        arabicTitle: 'حساب المعامل a_n بالتكامل بالتجزيء والتعويض بـ 0 و π',
        formula: 'a_n = \\frac{2}{\\pi}\\int_0^{\\pi} x\\cos(nx)\\,dx = \\frac{2}{\\pi}\\left[\\frac{x\\sin(nx)}{n} + \\frac{\\cos(nx)}{n^2}\\right]_0^{\\pi} = \\frac{2}{\\pi}\\left(\\frac{(-1)^n - 1}{n^2}\\right)',
        explanation: 'At x = π, cos(nπ) = (-1)^n. At x = 0, cos(0) = 1.',
        arabicExplanation: 'عند التعويض بـ π نحصل على (-1)^n/n^2 وعند التعويض بـ 0 نحصل على 1/n^2.'
      }
    ],
    finalAnswerLatex: 'f(x) = \\frac{\\pi}{2} + \\sum_{n=1}^{\\infty} \\frac{2}{\\pi n^2}\\big[(-1)^n - 1\\big]\\cos(nx)',
    drillOptions: {
      methodChoices: [
        'Fourier Cosine Series on [0, π]: b_n = 0, a_0 = π, a_n = (2/πn²)[(-1)^n - 1]',
        'Set a_0 = 0 and compute both a_n and b_n',
        'Odd Function Rule (a_0 = a_n = 0)',
        'Laplace Transform'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'For the Fourier Cosine Series of f(x) = x on 0 ≤ x ≤ π, what are b_n, a_0, and a_n?',
      keyStepChoices: [
        'b_n = 0,   a_0 = π,   and   a_n = (2 / πn²)[(-1)^n - 1]',
        'a_0 = 0,   a_n = 0,   and   b_n = -2(-1)^n / n',
        'b_n = 0,   a_0 = 0,   and   a_n = (-1)^n / n²',
        'a_0 = 2π,   and   b_n = 1/n'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'fin2-q5-all',
    numberLabel: 'Final 2 (Fall 2019–20) Q5(a,b)',
    sourceExam: 'Final 2: Fall 2019–2020 Final (3hr)',
    sourceYear: '2019–2020',
    sourceFileUrl: '/assets/aistudio/Final_2___1__f9b01d9c.pdf',
    points: 8,
    category: Category.LEGENDRE_POLYNOMIALS,
    subCategory: 'Fourier Series & Legendre',
    methodTag: 'Legendre Orthogonality & High-Index Integral (x P_7 P_8)',
    arabicMethodTag: 'تكاملات ليجندر القياسية واختبار الرتب العالية (x P_7 P_8)',
    difficulty: 'Core',
    problemLatex: '\\text{(i) } \\int_{-1}^1 P_1(x)P_2(x)\\,dx \\qquad \\text{(ii) } \\int_{-1}^1 P_0(x)P_3^2(x)\\,dx \\qquad \\text{(iii) } \\int_{-1}^1 xP_7(x)P_8(x)\\,dx',
    problemStatement: 'After proving the recurrence relation in Q5(a), evaluate the three Legendre integrals in Final 2 Question 5(b):',
    visualRecognitionTrigger: 'Three definite integrals of Legendre polynomials from -1 to 1.',
    arabicVisualTrigger: 'ثلاثة تكاملات محددة لكثيرات حدود ليجندر من -1 إلى 1 تحل في ثوانٍ بخواص التعامد.',
    examinerTrap: 'In (ii), students see P_0(x) P_3^2(x) and panic! Remember P_0(x) = 1! So ∫_{-1}^1 P_0(x) P_3^2(x) dx is literally just ∫_{-1}^1 P_3^2(x) dx = 2/(2(3)+1) = 2/7!',
    arabicExaminerTrap: 'في (ii) يتوتر الطلاب من وجود P_0(x) مضروبة في P_3^2(x)! تذكر أن P_0(x) = 1 دائماً! إذن التكامل هو مجرد تكامل P_3^2(x) ويساوي 2/7 فوراً!',
    secretShortcut: '(i) m ≠ n → 0. (ii) P_0 = 1 → 2/7. (iii) Put n = 7 in recurrence: (8/15) × (2/17) = 16/255!',
    steps: [
      {
        stepNumber: 1,
        title: 'Part (i) & Part (ii): Direct Orthogonality & P_0(x) = 1 Trick',
        arabicTitle: 'الجزء (i) و (ii): التعامد المباشر وخدعة P_0(x) = 1',
        formula: '\\text{(i) } \\int_{-1}^1 P_1(x)P_2(x)\\,dx = 0 \\; (1 \\neq 2), \\qquad \\text{(ii) } \\int_{-1}^1 \\underbrace{P_0(x)}_{=\\,1} P_3^2(x)\\,dx = \\int_{-1}^1 P_3^2(x)\\,dx = \\frac{2}{2(3)+1} = \\frac{2}{7}',
        explanation: 'Different indices integrate to 0; P_0(x) = 1 leaves the norm of P_3(x).',
        arabicExplanation: 'اختلاف الرتب يعطي صفراً، وبما أن P_0(x) = 1 يتبقى معيار P_3 وهو 2/7.'
      },
      {
        stepNumber: 2,
        title: 'Part (iii): Use Recurrence Relation with n = 7',
        arabicTitle: 'الجزء (iii): التعويض في علاقة التكرار عند n = 7',
        formula: 'xP_7(x) = \\frac{8}{15}P_8(x) + \\frac{7}{15}P_6(x) \\implies \\int_{-1}^1 xP_7 P_8\\,dx = \\frac{8}{15}\\int_{-1}^1 P_8^2(x)\\,dx + 0 = \\frac{8}{15}\\cdot\\frac{2}{2(8)+1} = \\frac{16}{255}',
        explanation: 'The P_6(x)P_8(x) integral vanishes by orthogonality, leaving (8/15) × (2/17) = 16/255.',
        arabicExplanation: 'ينعدم تكامل P_6 P_8 بالتعامد، ويتبقى (8/15) مضروباً في 2/(2×8+1) = 2/17 أي 16/255.'
      }
    ],
    finalAnswerLatex: '\\text{(i) } 0 \\qquad | \\qquad \\text{(ii) } \\frac{2}{7} \\qquad | \\qquad \\text{(iii) } \\frac{8}{15}\\cdot\\frac{2}{17} = \\frac{16}{255}',
    drillOptions: {
      methodChoices: [
        '(i) 0 by orthogonality; (ii) P_0(x) = 1 so 2/7; (iii) n = 7 recurrence gives (8/15)(2/17) = 16/255',
        'Expand P_7 and P_8 into degree-8 polynomials',
        'Integration by Parts',
        'All three integrals equal 0'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'How do you evaluate ∫_{-1}^1 P_0(x) P_3²(x) dx and ∫_{-1}^1 x P_7(x) P_8(x) dx?',
      keyStepChoices: [
        'Since P_0(x) = 1, the first is 2/(2·3+1) = 2/7; the second is (8/15)·(2/17) = 16/255',
        'Both equal 0 by orthogonality',
        'The first is 0 and the second is 2/15',
        'The first is 2/7 and the second is 8/15'
      ],
      correctKeyStepIndex: 0
    }
  },

  // ============================================================================
  // FINAL EXAM 3: FALL 2016–2017 (MTH203, 15/1/2017 — Final_3___1__6c60fddd.pdf)
  // ============================================================================
  {
    id: 'fin3-q1a',
    numberLabel: 'Final 3 (Fall 2016–17) Q1(a)',
    sourceExam: 'Final 3: Fall 2016–2017 Final',
    sourceYear: '2016–2017',
    sourceFileUrl: '/assets/aistudio/Final_3___1__6c60fddd.pdf',
    points: 2,
    category: Category.SEPARATION,
    subCategory: 'First-Order ODE',
    methodTag: 'Separable ODE (Logarithmic Derivative e^x / (1+e^x))',
    arabicMethodTag: 'فصل المتغيرات (البسط مشتقة المقام e^x / (1+e^x))',
    difficulty: 'Core',
    problemLatex: '(1+e^x)\\frac{dy}{dx} = ye^x',
    problemStatement: 'Solve the following differential equation (Solved in Ans.Final_3 page 1):',
    visualRecognitionTrigger: 'Product of (1+e^x) and dy/dx equals y e^x.',
    arabicVisualTrigger: 'معادلة قابلة للفصل مباشرة حيث e^x هي مشتقة المقام (1+e^x).',
    examinerTrap: 'When separating variables, divide by y(1+e^x) so dy/y is on the left and e^x/(1+e^x) dx is on the right.',
    arabicExaminerTrap: 'بقسمة الطرفين على y(1+e^x) يصبح الطرفان جاهزين للتكامل اللوغاريتمي.',
    secretShortcut: '∫ dy/y = ∫ [e^x / (1+e^x)] dx ⇒ ln|y| = ln(1+e^x) + C.',
    steps: [
      {
        stepNumber: 1,
        title: 'Separate Variables and Integrate',
        arabicTitle: 'فصل المتغيرات وإجراء التكامل اللوغاريتمي',
        formula: '\\int \\frac{1}{y}\\,dy = \\int \\frac{e^x}{1+e^x}\\,dx \\implies \\ln|y| = \\ln(1+e^x) + C',
        explanation: 'The numerator e^x is the derivative of 1 + e^x.',
        arabicExplanation: 'البسط e^x هو مشتقة المقام 1+e^x.'
      }
    ],
    finalAnswerLatex: '\\ln|y| = \\ln(1+e^x) + C \\quad \\left(\\text{or } y = K(1+e^x)\\right)',
    drillOptions: {
      methodChoices: [
        'Separable ODE: ∫ (1/y) dy = ∫ [e^x / (1 + e^x)] dx',
        'Exact ODE',
        'Homogeneous ODE',
        'Bernoulli ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the general solution of (1 + e^x) dy/dx = y e^x?',
      keyStepChoices: [
        'ln|y| = ln(1 + e^x) + C   (or y = K(1 + e^x))',
        'y = e^x + C',
        'y² / 2 = ln(1 + e^x) + C',
        'ln|y| = e^x + C'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'fin3-q1b',
    numberLabel: 'Final 3 (Fall 2016–17) Q1(b)',
    sourceExam: 'Final 3: Fall 2016–2017 Final',
    sourceYear: '2016–2017',
    sourceFileUrl: '/assets/aistudio/Final_3___1__6c60fddd.pdf',
    points: 4,
    category: Category.EXACT_EQUATIONS,
    subCategory: 'First-Order ODE',
    methodTag: 'Exact ODE (Slash Duplicate x cos y)',
    arabicMethodTag: 'معادلة تفاضلية تامة (شطب الحد المكرر x cos y)',
    difficulty: 'Core',
    problemLatex: '(x + \\cos y)\\,dx + (\\tan y - x\\sin y)\\,dy = 0',
    problemStatement: 'Solve the following differential equation (Solved in Ans.Final_3 page 1):',
    visualRecognitionTrigger: 'M dx + N dy = 0 form where ∂M/∂y = -sin y = ∂N/∂x.',
    arabicVisualTrigger: 'معادلة على الصورة التفاضلية حيث M_y = -sin y = N_x فهي تامة مباشرة.',
    examinerTrap: 'Remember ∫ tan y dy = ln|sec y| (or -ln|cos y|), NOT sec^2 y!',
    arabicExaminerTrap: 'تذكر أن تكامل tan y هو ln|sec y| وليس sec^2 y (لأن sec^2 y هي المشتقة وليست التكامل)!',
    secretShortcut: 'M_y = N_x = -sin y → Exact! ∫ M dx = ½x^2 + x cos y; ∫ N dy = ln|sec y| + x cos y (duplicate!).',
    steps: [
      {
        stepNumber: 1,
        title: 'Check Exactness: M_y = N_x = -sin y',
        arabicTitle: 'اختبار التمام بحساب المشتقات الجزئية',
        formula: '\\frac{\\partial M}{\\partial y} = -\\sin y, \\qquad \\frac{\\partial N}{\\partial x} = -\\sin y \\implies \\text{Exact!}',
        explanation: 'The partial derivatives match immediately.',
        arabicExplanation: 'المعادلة تامة لأن المشتقتين الجزئيتين متساويتان.'
      },
      {
        stepNumber: 2,
        title: 'Integrate M dx and N dy and Strike Out Duplicate x cos y',
        arabicTitle: 'تكامل M و N وشطب الحد المكرر x cos y',
        formula: '\\int (x + \\cos y)\\,dx + \\int (\\tan y - \\cancel{x\\sin y})\\,dy = C \\implies \\frac{1}{2}x^2 + x\\cos y + \\ln|\\sec y| = C',
        explanation: 'Integrating -x sin y with respect to y gives +x cos y, which duplicates the x cos y from M.',
        arabicExplanation: 'تكامل (-x sin y) بالنسبة لـ y يعطي x cos y وهو مكرر فيُشطب.'
      }
    ],
    finalAnswerLatex: '\\frac{1}{2}x^2 + x\\cos y + \\ln|\\sec y| = C',
    drillOptions: {
      methodChoices: [
        'Exact ODE (since ∂M/∂y = ∂N/∂x = -sin y)',
        'Non-Exact ODE with μ(x)',
        'Homogeneous ODE',
        'Bernoulli ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the general solution of (x + cos y) dx + (tan y - x sin y) dy = 0?',
      keyStepChoices: [
        '(1/2)x² + x cos y + ln|sec y| = C',
        '(1/2)x² + 2x cos y + sec²y = C',
        'x² + x sin y + ln|tan y| = C',
        '(1/2)x² - x cos y + ln|sin y| = C'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'fin3-q1c',
    numberLabel: 'Final 3 (Fall 2016–17) Q1(c)',
    sourceExam: 'Final 3: Fall 2016–2017 Final',
    sourceYear: '2016–2017',
    sourceFileUrl: '/assets/aistudio/Final_3___1__6c60fddd.pdf',
    points: 4,
    category: Category.HOMOGENEOUS,
    subCategory: 'First-Order ODE',
    methodTag: 'Homogeneous ODE + Partial Fractions (Skipped in Ans.Final_3!)',
    arabicMethodTag: 'معادلة متجانسة من الدرجة الثالثة مع الكسور الجزئية (متروكة بدون حل في Ans.Final_3!)',
    difficulty: 'Boss',
    problemLatex: 'x^3\\frac{dy}{dx} = y^3 + xy^2 - x^2y',
    problemStatement: 'Solve the following differential equation (Marked "[c] XX" and skipped in Ans.Final_3 page 1 — solved completely here!):',
    visualRecognitionTrigger: 'Every term (x^3, y^3, xy^2, x^2y) has degree 3 → Homogeneous ODE!',
    arabicVisualTrigger: 'جميع الحدود من الدرجة الثالثة (مجموع أسس x و y في كل حد يساوي ٣) — هذا السؤال تركه كاتب الملزمة اليدوية بدون حل ([c] XX)!',
    examinerTrap: 'When you substitute y = vx, you get v + x dv/dx = v^3 + v^2 - v. Moving +v to the RHS makes it -2v (NOT 0!): x dv/dx = v^3 + v^2 - 2v = v(v+2)(v-1)!',
    arabicExaminerTrap: 'عند التعويض بـ y = vx تصبح المعادلة v + x dv/dx = v^3 + v^2 - v، وعند نقل (+v) للطرف الأيمن تصبح (-2v) أي v^3 + v^2 - 2v = v(v+2)(v-1)!',
    secretShortcut: 'Factor v^3 + v^2 - 2v = v(v+2)(v-1), then use Cover-Up Partial Fractions at v = 0, 1, -2!',
    steps: [
      {
        stepNumber: 1,
        title: 'Divide by x³ and Substitute y = vx (dy/dx = v + x dv/dx)',
        arabicTitle: 'القسمة على x³ والتعويض بـ y = vx',
        formula: '\\frac{dy}{dx} = \\left(\\frac{y}{x}\\right)^3 + \\left(\\frac{y}{x}\\right)^2 - \\frac{y}{x} \\implies v + x\\frac{dv}{dx} = v^3 + v^2 - v \\implies x\\frac{dv}{dx} = v^3 + v^2 - 2v',
        explanation: 'Subtract v from both sides to get v^3 + v^2 - 2v = v(v - 1)(v + 2).',
        arabicExplanation: 'نطرح v من الطرفين ونحلل المقدار الثلاثي إلى v(v - 1)(v + 2).'
      },
      {
        stepNumber: 2,
        title: 'Separate Variables & Decompose 1 / [v(v-1)(v+2)] via Cover-Up',
        arabicTitle: 'فصل المتغيرات وتحليل الكسور الجزئية بطريقة التغطية',
        formula: '\\int \\frac{1}{v(v-1)(v+2)}\\,dv = \\int \\left(-\\frac{1/2}{v} + \\frac{1/3}{v-1} + \\frac{1/6}{v+2}\\right)dv = \\int \\frac{dx}{x}',
        explanation: 'At v=0: A = 1/[(-1)(2)] = -1/2. At v=1: B = 1/[(1)(3)] = 1/3. At v=-2: C = 1/[(-2)(-3)] = 1/6.',
        arabicExplanation: 'نحسب ثوابت الكسور الجزئية بالتعويض عند v = 0, 1, -2.'
      },
      {
        stepNumber: 3,
        title: 'Integrate and Replace v = y/x',
        arabicTitle: 'إجراء التكامل وإرجاع v = y/x',
        formula: '-\\frac{1}{2}\\ln\\left|\\frac{y}{x}\\right| + \\frac{1}{3}\\ln\\left|\\frac{y}{x}-1\\right| + \\frac{1}{6}\\ln\\left|\\frac{y}{x}+2\\right| = \\ln|x| + C',
        explanation: 'Each simple pole integrates to a natural logarithm.',
        arabicExplanation: 'نكامل كل كسر إلى لوغاريتم طبيعي ثم نستبدل كل v بـ y/x.'
      }
    ],
    finalAnswerLatex: '-\\frac{1}{2}\\ln\\left|\\frac{y}{x}\\right| + \\frac{1}{3}\\ln\\left|\\frac{y}{x}-1\\right| + \\frac{1}{6}\\ln\\left|\\frac{y}{x}+2\\right| = \\ln|x| + C',
    drillOptions: {
      methodChoices: [
        'Homogeneous ODE (y = vx) → x dv/dx = v(v-1)(v+2) → Partial Fractions',
        'Exact ODE',
        'Bernoulli ODE',
        'Linear First-Order ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'After substituting y = vx into x³ dy/dx = y³ + xy² - x²y, what factored equation in v do you obtain?',
      keyStepChoices: [
        'x dv/dx = v³ + v² - 2v = v(v - 1)(v + 2)',
        'x dv/dx = v³ + v² = v²(v + 1)',
        'x dv/dx = v³ - v = v(v - 1)(v + 1)',
        'x dv/dx = v² - 2v'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'fin3-q1d',
    numberLabel: 'Final 3 (Fall 2016–17) Q1(d)',
    sourceExam: 'Final 3: Fall 2016–2017 Final',
    sourceYear: '2016–2017',
    sourceFileUrl: '/assets/aistudio/Final_3___1__6c60fddd.pdf',
    points: 4,
    category: Category.BERNOULLI,
    subCategory: 'First-Order ODE',
    methodTag: 'Bernoulli ODE with Split Integrating Factor (μ = x e^x)',
    arabicMethodTag: 'معادلة برنولي مع توزيع البسط في عامل التكامل (μ = x e^x)',
    difficulty: 'Trick',
    problemLatex: '\\frac{dy}{dx} - \\frac{x+1}{2x}y = -\\frac{3}{x}y^3',
    problemStatement: 'Solve the following differential equation (Solved in Ans.Final_3 page 1):',
    visualRecognitionTrigger: 'Bernoulli ODE with n = 3 and P(x) = -(x+1)/(2x).',
    arabicVisualTrigger: 'معادلة برنولي حيث n = 3 ومعامل y هو -(x+1)/(2x).',
    examinerTrap: 'When you multiply P(x) = -(x+1)/(2x) by (1 - n) = -2, the 2s and minus signs cancel cleanly to give P*(x) = (x+1)/x = 1 + 1/x! Then μ(x) = e^{∫(1 + 1/x)dx} = e^{x + ln x} = x e^x!',
    arabicExaminerTrap: 'عند ضرب P(x) في (1-n = -2) تختصر الـ ٢ والسالب، ونوزع البسط على المقام (x+1)/x = 1 + 1/x فيصبح عامل التكامل e^{x + ln x} = x e^x!',
    secretShortcut: 'P*(x) = 1 + 1/x ⇒ μ(x) = x e^x, and Q*(x) = (-2)(-3/x) = 6/x. Then μ(x) Q*(x) = x e^x · (6/x) = 6e^x (the x cancels!).',
    steps: [
      {
        stepNumber: 1,
        title: 'Multiply P(x) and Q(x) by (1 - n) = -2 and Find μ(x)',
        arabicTitle: 'الضرب في (1 - n = -2) وحساب عامل التكامل μ(x) = x e^x',
        formula: 'P^*(x) = (-2)\\left(-\\frac{x+1}{2x}\\right) = 1 + \\frac{1}{x}, \\quad Q^*(x) = (-2)\\left(-\\frac{3}{x}\\right) = \\frac{6}{x}, \\quad \\mu(x) = e^{\\int (1+\\frac{1}{x})dx} = e^{x+\\ln x} = xe^x',
        explanation: 'Split (x+1)/x into 1 + 1/x before integrating.',
        arabicExplanation: 'بتوزيع البسط على المقام يصبح التكامل x + ln x ومنه μ = x e^x.'
      },
      {
        stepNumber: 2,
        title: 'Apply Direct Bernoulli Formula for y^{-2}',
        arabicTitle: 'التعويض في قانون الحل العام لبرنولي',
        formula: 'y^{-2} = \\frac{1}{xe^x}\\left[\\int xe^x\\left(\\frac{6}{x}\\right)dx + C\\right] = \\frac{1}{xe^x}\\big[6e^x + C\\big] = \\frac{6}{x} + \\frac{C}{xe^x}',
        explanation: 'The x cancels inside the integral, leaving ∫ 6e^x dx = 6e^x!',
        arabicExplanation: 'تختصر x مع x داخل التكامل فيتبقى تكامل 6e^x فقط!'
      }
    ],
    finalAnswerLatex: 'y^{-2} = \\frac{6}{x} + \\frac{C}{xe^x}',
    drillOptions: {
      methodChoices: [
        'Bernoulli (n = 3, 1-n = -2) → P*(x) = 1 + 1/x → μ(x) = x e^x',
        'Homogeneous ODE',
        'Exact ODE',
        'Separable ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the integrating factor μ(x) for dy/dx - [(x+1)/(2x)]y = -(3/x)y³ after multiplying by (1 - n) = -2?',
      keyStepChoices: [
        'μ(x) = e^{∫ (1 + 1/x) dx} = e^{x + ln x} = x e^x',
        'μ(x) = e^{-x} / x',
        'μ(x) = x² e^x',
        'μ(x) = x + e^x'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'fin3-q2a-b',
    numberLabel: 'Final 3 (Fall 2016–17) Q2(a,b)',
    sourceExam: 'Final 3: Fall 2016–2017 Final',
    sourceYear: '2016–2017',
    sourceFileUrl: '/assets/aistudio/Final_3___1__6c60fddd.pdf',
    points: 8,
    category: Category.UNDETERMINED_COEFFS,
    subCategory: 'Higher-Order ODE',
    methodTag: '3rd-Order Cubic Roots + Exponential Resonance Boost (6x + 6e^{-x})',
    arabicMethodTag: 'معادلة تكعيبية متجانسة + معادلة غير متجانسة مع رنين الدالة الأسية',
    difficulty: 'Trick',
    problemLatex: '\\text{(a) } \\frac{d^3y}{dx^3} - 2\\frac{d^2y}{dx^2} - 5\\frac{dy}{dx} + 6y = 0 \\qquad \\text{(b) } \\frac{d^2y}{dx^2} - \\frac{dy}{dx} - 2y = 6x + 6e^{-x}',
    problemStatement: 'Find the general solution of Question 2(a) and 2(b) in Final 3 (Solved in Ans.Final_3 pages 1–2):',
    visualRecognitionTrigger: '(a) Sum of cubic coefficients 1 - 2 - 5 + 6 = 0 ⇒ m = 1 is a root! (b) Roots of m^2 - m - 2 = 0 are m = 2, -1, which matches e^{-x} on the RHS!',
    arabicVisualTrigger: '(a) مجموع المعاملات يساوي صفراً إذن m = 1 جذر! (b) الجذر m = -1 يطابق أس الدالة 6e^{-x} في الطرف الأيمن (حالة رنين!).',
    examinerTrap: 'HANDWRITTEN NOTE WARNING (Ans.Final_3 p.2): In Q2(b), m = -1 is a root of y_c = C_1 e^{-x} + C_2 e^{2x}! In the handwritten note, the student forgot to boost Ce^{-x} to C x e^{-x}, so when they plugged it in, Ce^{-x} + Ce^{-x} - 2Ce^{-x} should have cancelled to 0 (they made a sign error to get -2C = 6)! You MUST multiply Ce^{-x} by x: y_p = Ax + B + C x e^{-x}!',
    arabicExaminerTrap: 'تحذير هام جداً من خطأ الحل اليدوي (Ans.Final_3 ص٢): في (b) الجذر m = -1 موجود في الحل المتجانس y_c! كاتب الورقة اليدوية نسي ضرب فرض Ce^{-x} في x! الصواب الإجباري هو y_p = Ax + B + C x e^{-x} فيعطي C = -2!',
    secretShortcut: 'For (a): (m-1)(m+2)(m-3) = 0. For (b): C = 6 / P\'(-1) = 6 / [2(-1) - 1] = 6 / (-3) = -2, so the resonant term is -2x e^{-x}!',
    steps: [
      {
        stepNumber: 1,
        title: 'Part (a): Factor m³ - 2m² - 5m + 6 = 0 via m = 1',
        arabicTitle: 'الجزء (a): تحليل المعادلة التكعيبية بالقسمة على (m - 1)',
        formula: '(m-1)(m^2 - m - 6) = (m-1)(m-3)(m+2) = 0 \\implies y = C_1 e^x + C_2 e^{3x} + C_3 e^{-2x}',
        explanation: 'Distinct real roots m = 1, 3, -2.',
        arabicExplanation: 'ثلاثة جذور حقيقية مختلفة هي 1 و 3 و -2.'
      },
      {
        stepNumber: 2,
        title: 'Part (b): Boost Ce^{-x} to C x e^{-x} Due to Resonance at m = -1',
        arabicTitle: 'الجزء (b): ضرب Ce^{-x} في x بسبب الرنين عند m = -1',
        formula: 'y_c = C_1 e^{-x} + C_2 e^{2x}, \\qquad y_p = Ax + B + C x e^{-x}',
        explanation: 'Equating coefficients in y\'\' - y\' - 2y = 6x + 6e^{-x}: -2A = 6 ⇒ A = -3; -A - 2B = 0 ⇒ B = 3/2; and -3C = 6 ⇒ C = -2.',
        arabicExplanation: 'بالتعويض ومساواة المعاملات نجد A = -3 و B = 3/2 و C = -2.'
      }
    ],
    finalAnswerLatex: '\\text{(a) } y = C_1 e^x + C_2 e^{3x} + C_3 e^{-2x} \\quad | \\quad \\text{(b) } y = C_1 e^{-x} + C_2 e^{2x} - 3x + \\frac{3}{2} - 2xe^{-x}',
    drillOptions: {
      methodChoices: [
        '(a) Factor (m-1)(m-3)(m+2)=0; (b) Boost resonant term to y_p = Ax + B + C x e^{-x}',
        '(b) Use y_p = Ax + B + C e^{-x} without multiplying by x',
        'Variation of Parameters for both',
        'Reduction of Order'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'Why must the trial solution for y\'\' - y\' - 2y = 6x + 6e^{-x} be y_p = Ax + B + C x e^{-x}?',
      keyStepChoices: [
        'Because m = -1 is already a root of m² - m - 2 = 0, so e^{-x} has resonance of multiplicity 1!',
        'Because 6x is a polynomial',
        'Because m = 0 is a root',
        'You do not need an x on Ce^{-x}'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'fin3-q3a-b-c',
    numberLabel: 'Final 3 (Fall 2016–17) Q3(a,b,c)',
    sourceExam: 'Final 3: Fall 2016–2017 Final',
    sourceYear: '2016–2017',
    sourceFileUrl: '/assets/aistudio/Final_3___1__6c60fddd.pdf',
    points: 16,
    category: Category.LAPLACE_THEOREMS,
    subCategory: 'Laplace & Inverse Laplace',
    methodTag: 'Improper Integral via Laplace Definition (s = 3) + IVP + Transforms',
    arabicMethodTag: 'حساب التكامل اللانهائي بتعريف لابلاس (التعويض عن s = 3) + معادلة تفاضلية',
    difficulty: 'Boss',
    problemLatex: '\\text{(a) } \\int_0^{\\infty} e^{-3t}\\sin^2 t\\,dt \\quad \\text{(b) } y\'\'-6y\'+8y=e^{3t},\\; y(0)=0, y\'(0)=2 \\quad \\text{(c) } \\int_0^t \\tau\\sin\\tau\\,d\\tau,\\; \\sin 5t\\cos 3t+\\cosh 3t,\\; u_4(t)e^t',
    problemStatement: 'Solve Question 3(a), 3(b), and 3(c) in Final 3 (Fall 2016–2017):',
    visualRecognitionTrigger: 'Look at Q3(a): ∫_0^∞ e^{-3t} sin^2(t) dt — the upper limit is INFINITY ∞, NOT t!',
    arabicVisualTrigger: 'انتبه جيداً في Q3(a): حدود التكامل من 0 إلى ما لا نهاية ∞ وليست من 0 إلى t! هذا هو تعريف تحويل لابلاس نفسه عند s = 3!',
    examinerTrap: 'TWO HANDWRITTEN NOTE WARNINGS (Ans.Final_3 p.3–4): (1) In Q3(a), ∫_0^∞ e^{-3t} sin^2 t dt is by definition L{sin^2 t} evaluated at s = 3! In the handwritten sheet, the writer treated it like ∫_0^t and left s in the answer instead of plugging in s = 3 to get the number 2/39! (2) In Q3(c)(iii), for u_4(t) e^t, you MUST write e^t = e^4 e^{t-4} so F(s) = e^{4-4s}/(s-1) (the handwritten sheet forgot the e^4 factor)!',
    arabicExaminerTrap: 'تحذيران مهمان من أخطاء الورقة اليدوية (Ans.Final_3 ص٣–٤): (١) في Q3a التكامل إلى ∞ يعبر عن تعريف لابلاس ∫_0^∞ e^{-st} f(t) dt مع وضع الرقم s = 3 في النهاية فيعطي 2/39! (٢) في u_4(t) e^t يجب كتابة e^t = e^4 e^{t-4} وعدم نسيان الثابت e^4!',
    secretShortcut: 'Whenever an exam asks for ∫_0^∞ e^{-kt} f(t) dt using Laplace, find F(s) = L{f(t)} and simply plug in the number s = k!',
    steps: [
      {
        stepNumber: 1,
        title: 'Part (a): Evaluate ∫_0^∞ e^{-3t} sin²(t) dt by Setting s = 3 in L{sin² t}',
        arabicTitle: 'الجزء (a): حساب التكامل اللانهائي بالتعويض عن s = 3 في لابلاس sin²(t)',
        formula: '\\mathcal{L}\\{\\sin^2 t\\} = \\mathcal{L}\\left\\{\\frac{1-\\cos 2t}{2}\\right\\} = \\frac{1}{2}\\left(\\frac{1}{s} - \\frac{s}{s^2+4}\\right) = \\frac{2}{s(s^2+4)} \\implies \\text{At } s = 3:\\quad \\frac{2}{3(9+4)} = \\frac{2}{39}',
        explanation: 'By definition, ∫_0^∞ e^{-st} f(t) dt = F(s). Comparing e^{-3t} with e^{-st} gives s = 3.',
        arabicExplanation: 'حسب تعريف تحويل لابلاس، نقارن e^{-3t} بـ e^{-st} فنجد أن s = 3، نعوض بها في لابلاس sin^2(t) فنحصل على 2/39.'
      },
      {
        stepNumber: 2,
        title: 'Part (b): Solve y\'\' - 6y\' + 8y = e^{3t}, y(0)=0, y\'(0)=2',
        arabicTitle: 'الجزء (b): حل المعادلة التفاضلية بتحويل لابلاس (مكرر في Final 4 Q3a)',
        formula: '(s^2-6s+8)Y(s) - 2 = \\frac{1}{s-3} \\implies Y(s) = \\frac{2s-5}{(s-3)(s-4)(s-2)} = \\frac{-1}{s-3} + \\frac{3/2}{s-4} - \\frac{1/2}{s-2} \\implies y(t) = -e^{3t} + \\frac{3}{2}e^{4t} - \\frac{1}{2}e^{2t}',
        explanation: 'Cover-up at s = 3 gives A = 1/[(-1)(1)] = -1; at s = 4 gives B = 3/2; at s = 2 gives C = -1/2.',
        arabicExplanation: 'نحلل إلى كسور جزئية عند s = 3, 4, 2 فنحصل على الحل مباشرة.'
      },
      {
        stepNumber: 3,
        title: 'Part (c): Transforms of (i) ∫_0^t τ sin τ dτ, (ii) sin 5t cos 3t + cosh 3t, (iii) u_4(t)e^t',
        arabicTitle: 'الجزء (c): تحويلات لابلاس للدوال الثلاث',
        formula: '\\text{(i) } \\frac{2}{(s^2+1)^2}, \\qquad \\text{(ii) } \\frac{4}{s^2+64} + \\frac{1}{s^2+4} + \\frac{s}{s^2-9}, \\qquad \\text{(iii) } \\mathcal{L}\\{e^4 u_4(t)e^{t-4}\\} = \\frac{e^{4(1-s)}}{s-1}',
        explanation: 'In (i), (1/s)·[2s/(s^2+1)^2] = 2/(s^2+1)^2. In (iii), rewrite e^t = e^4 e^{t-4}.',
        arabicExplanation: 'في (i) تختصر s مع s، وفي (iii) نكتب e^t = e^4 e^{t-4}.'
      }
    ],
    finalAnswerLatex: '\\text{(a) } \\frac{2}{39} \\quad | \\quad \\text{(b) } y(t) = -e^{3t}+\\frac{3}{2}e^{4t}-\\frac{1}{2}e^{2t} \\quad | \\quad \\text{(c-i) } \\frac{2}{(s^2+1)^2}, \\; \\text{(c-iii) } \\frac{e^{4(1-s)}}{s-1}',
    drillOptions: {
      methodChoices: [
        'For ∫_0^∞ e^{-3t} sin²t dt, find F(s) = L{sin²t} and substitute s = 3 to get 2/39!',
        'Multiply L{sin²t} by 1/s and leave s in the answer',
        'Use the Second Shifting Theorem',
        'Differentiate sin²t'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'How do you evaluate the improper integral ∫_0^∞ e^{-3t} sin²(t) dt using the Laplace transform?',
      keyStepChoices: [
        'Since ∫_0^∞ e^{-st} f(t) dt = F(s), find L{sin²t} = 2/[s(s²+4)] and plug in s = 3 to get 2/39',
        'Divide L{sin²t} by s as if the upper limit were t',
        'Shift s → s - 3 and leave it as a function of s',
        'Integrate from s to infinity'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'fin3-q4-q5',
    numberLabel: 'Final 3 (Fall 2016–17) Q4 & Q5',
    sourceExam: 'Final 3: Fall 2016–2017 Final',
    sourceYear: '2016–2017',
    sourceFileUrl: '/assets/aistudio/Final_3___1__6c60fddd.pdf',
    points: 24,
    category: Category.INVERSE_LAPLACE,
    subCategory: 'Laplace & Inverse Laplace',
    methodTag: 'Inverse Laplace + Half-Range Sine (x² on [0,2]) + Legendre Derivative Recurrence',
    arabicMethodTag: 'لابلاس العكسي + متسلسلة الجيب لـ x² + علاقة مشتقات ليجندر',
    difficulty: 'Trick',
    problemLatex: '\\text{Q4(a): } \\ln\\left(\\frac{s^2+16}{(s-2)(s-3)}\\right), \\; \\frac{s}{s^2+4s+8}, \\; \\frac{e^{-2s}}{s^2-10s+16} \\quad | \\quad \\text{Q5(a): } P_n(x)+2xP_n\'(x)=P_{n+1}\'(x)+P_{n-1}\'(x)',
    problemStatement: 'Solve Question 4 (Inverse Laplace & Fourier Sine of x^2 on [0,2]) and Question 5 in Final 3 (Solved in Ans.Final_3 pages 5–6):',
    visualRecognitionTrigger: 'In Q4(a)(i), split the log completely into ln(s^2+16) - ln(s-2) - ln(s-3) BEFORE differentiating!',
    arabicVisualTrigger: 'في Q4(a)(i) فك اللوغاريتم بالخواص إلى ln(s^2+16) - ln(s-2) - ln(s-3) قبل الاشتقاق بدلاً من توحيد المقامات وإكمال المربع المعقد في الحل اليدوي!',
    examinerTrap: 'SUPER SHORTCUT for Q4(a)(i): Look at Ans.Final_3 page 5 — the student multiplied out (s-2)(s-3) = s^2 - 5s + 6 and completed the square with fractions (2.5)^2! Instead, if you write ln(s^2+16) - ln(s-2) - ln(s-3), its derivative is simply 2s/(s^2+16) - 1/(s-2) - 1/(s-3), which inverts in 5 seconds to 2 cos 4t - e^{2t} - e^{3t}!',
    arabicExaminerTrap: 'اختصار ذهبي يتجنب تعقيد الحل اليدوي (Ans.Final_3 ص٥): بدلاً من ضرب (s-2)(s-3) وإكمال المربع بكسور عشرية، فك اللوغاريتم إلى ln(s^2+16) - ln(s-2) - ln(s-3) فتصبح المشتقة 2s/(s^2+16) - 1/(s-2) - 1/(s-3) وتُحل في ٥ ثوانٍ!',
    secretShortcut: 'In Q4(a)(iii), s^2 - 10s + 16 = (s - 5)^2 - 9, so L⁻¹ is (1/3) u_2(t) e^{5(t-2)} sinh 3(t-2)!',
    steps: [
      {
        stepNumber: 1,
        title: 'Q4(a)(i): Expand Logarithm into 3 Simple Terms & Differentiate',
        arabicTitle: 'تفكيك اللوغاريتم إلى ٣ حدود بسيطة ثم الاشتقاق والقسمة على (-t)',
        formula: 'F(s) = \\ln(s^2+16) - \\ln(s-2) - \\ln(s-3) \\implies F\'(s) = \\frac{2s}{s^2+16} - \\frac{1}{s-2} - \\frac{1}{s-3} \\implies f(t) = \\frac{e^{2t} + e^{3t} - 2\\cos 4t}{t}',
        explanation: 'Note that e^{2t} + e^{3t} = 2 e^{2.5t} cosh(0.5t), which is identical to the long completing-the-square result in 1/10th the time!',
        arabicExplanation: 'تتحول المشتقة مباشرة إلى دوال قياسية دون أي حاجة لإكمال المربع!'
      },
      {
        stepNumber: 2,
        title: 'Q4(a)(ii) & (iii): Complete the Square and Apply Shifts',
        arabicTitle: 'إكمال المربع في الفقرتين (ii) و (iii)',
        formula: '\\text{(ii) } \\frac{(s+2)-2}{(s+2)^2+4} \\implies e^{-2t}(\\cos 2t - \\sin 2t), \\qquad \\text{(iii) } \\frac{e^{-2s}}{(s-5)^2-9} \\implies \\frac{1}{3}u_2(t)e^{5(t-2)}\\sinh 3(t-2)',
        explanation: 'In (ii), align numerator s = (s+2) - 2.',
        arabicExplanation: 'في (ii) نكتب البسط (s+2)-2، وفي (iii) نكمل المربع إلى (s-5)^2 - 9 مع الإزاحة الثانية u_2(t).'
      },
      {
        stepNumber: 3,
        title: 'Q5(a,b,c): Legendre Derivative Relation & Integrals',
        arabicTitle: 'السؤال الخامس: إثبات علاقة المشتقات وحساب التكاملين',
        formula: '\\int_{-1}^1 xP_1(x)\\,dx = \\int_{-1}^1 P_1^2(x)\\,dx = \\frac{2}{3}, \\qquad \\int_{-1}^1 P_2^2(x)\\,dx = \\frac{2}{2(2)+1} = \\frac{2}{5}',
        explanation: 'Since P_1(x) = x, ∫_{-1}^1 x P_1(x) dx = ∫_{-1}^1 P_1^2(x) dx = 2/3.',
        arabicExplanation: 'بما أن P_1(x) = x فإن تكامل x P_1(x) هو نفسه تكامل P_1^2(x) ويساوي 2/3.'
      }
    ],
    finalAnswerLatex: '\\text{Q4a(i): } \\frac{e^{2t}+e^{3t}-2\\cos 4t}{t} \\; | \\; \\text{(ii): } e^{-2t}(\\cos 2t-\\sin 2t) \\; | \\; \\text{(iii): } \\frac{1}{3}u_2(t)e^{5(t-2)}\\sinh 3(t-2) \\; | \\; \\text{Q5(b,c): } \\frac{2}{3},\\; \\frac{2}{5}',
    drillOptions: {
      methodChoices: [
        'Expand ln[(s²+16)/((s-2)(s-3))] = ln(s²+16) - ln(s-2) - ln(s-3) before differentiating!',
        'Use the Quotient Rule on the fraction inside ln(...)',
        'Multiply (s-2)(s-3) and complete the square with decimals',
        'Use Partial Fractions directly on the logarithm'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the fastest way to differentiate F(s) = ln[(s² + 16) / ((s - 2)(s - 3))]?',
      keyStepChoices: [
        'Use log laws first: ln(s²+16) - ln(s-2) - ln(s-3) ⇒ F\'(s) = 2s/(s²+16) - 1/(s-2) - 1/(s-3)',
        'Multiply out (s-2)(s-3) = s² - 5s + 6 and complete the square with 2.5²',
        'Use the quotient rule on (s²+16)/(s²-5s+6)',
        'Take the inverse Laplace without differentiating'
      ],
      correctKeyStepIndex: 0
    }
  }
];
