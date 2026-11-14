import { Category } from '../types';
import { MasterExamQuestion } from './masterExamBankData';

export const FINAL_SHEET_AND_NOTES_QUESTIONS: MasterExamQuestion[] = [
  // ============================================================================
  // OFFICIAL FINAL REVISION SHEET (Mathematics3fall2024final.pdf - Pages 3 & 4)
  // SECTION [1]: FIND THE LAPLACE TRANSFORM (10 Questions: [1](a) to [1](j))
  // ============================================================================
  {
    id: 's24f-lap-1a',
    numberLabel: 'Final Sheet [1](a)',
    sourceExam: 'Official Final Revision Sheet',
    sourceYear: 'Fall 2024 / 2027',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2024final_4e14172d.pdf',
    points: 3,
    category: Category.LAPLACE_TRANSFORMS,
    subCategory: 'Laplace & Inverse Laplace',
    methodTag: 'Basic Laplace Linearity & Factorial Rule',
    arabicMethodTag: 'خطية لابلاس وقانون المضروب',
    difficulty: 'Core',
    problemLatex: 'f(t) = 3e^{-2t} + 5t^8',
    problemStatement: 'Find the Laplace transform of the following function:',
    visualRecognitionTrigger: 'Direct sum of an exponential e^{at} (a = -2) and a power t^n (n = 8).',
    arabicVisualTrigger: 'مجموع مباشر لدالة أسية e^{-2t} ودالة كثيرة حدود t^8.',
    examinerTrap: 'Forgetting that the denominator of L{t^n} is s^{n+1} (so s^9, not s^8), or writing 1/(s-2) instead of 1/(s+2) for e^{-2t}.',
    arabicExaminerTrap: 'نسيان أن مقام t^n هو s^{n+1} (أي s^9 وليس s^8)، أو عدم عكس إشارة أس الدالة الأسية في المقام.',
    secretShortcut: 'Flip the sign of the exponent (-2 → +2 in denominator) and boost the power of t by 1 (t^8 → 8! / s^9).',
    steps: [
      {
        stepNumber: 1,
        title: 'Apply Linearity of the Laplace Transform',
        arabicTitle: 'تطبيق خاصية الخطية لتحويل لابلاس',
        formula: '\\mathcal{L}\\{f(t)\\} = 3\\mathcal{L}\\{e^{-2t}\\} + 5\\mathcal{L}\\{t^8\\}',
        explanation: 'Split the transform across the sum and factor out the constants 3 and 5.',
        arabicExplanation: 'وزع تحويل لابلاس على الجمع وأخرج الثوابت ٣ و ٥ خارج التحويل.'
      },
      {
        stepNumber: 2,
        title: 'Apply Standard Laplace Formulas',
        arabicTitle: 'التعويض بقوانين لابلاس القياسية',
        formula: 'F(s) = 3\\left(\\frac{1}{s - (-2)}\\right) + 5\\left(\\frac{8!}{s^{8+1}}\\right) = \\frac{3}{s+2} + \\frac{5 \\cdot 8!}{s^9}',
        explanation: 'Use L{e^{at}} = 1/(s-a) with a = -2 and L{t^n} = n! / s^{n+1} with n = 8 (where 8! = 40320).',
        arabicExplanation: 'استخدم قانون الدالة الأسية مع عكس إشارة الأس، وقانون t^8 الذي يعطي 8! على s^9.'
      }
    ],
    finalAnswerLatex: 'F(s) = \\frac{3}{s+2} + \\frac{5(8!)}{s^9} = \\frac{3}{s+2} + \\frac{201600}{s^9}',
    drillOptions: {
      methodChoices: [
        'Direct Laplace Table (Exponential + Power Rule)',
        'First Shifting Theorem',
        'Multiplication by t Rule',
        'Second Shifting Theorem'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the Laplace transform of 5t^8?',
      keyStepChoices: [
        '5 · (8!) / s^9',
        '5 · (8!) / s^8',
        '5 · 8 / s^9',
        '8! / (s - 5)^9'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's24f-lap-1b',
    numberLabel: 'Final Sheet [1](b)',
    sourceExam: 'Official Final Revision Sheet',
    sourceYear: 'Fall 2024 / 2027',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2024final_4e14172d.pdf',
    points: 3,
    category: Category.LAPLACE_TRANSFORMS,
    subCategory: 'Laplace & Inverse Laplace',
    methodTag: 'Half-Angle Trig Reduction + Hyperbolic Sine',
    arabicMethodTag: 'قانون ضعف الزاوية لـ sin²(t) مع دالة sinh',
    difficulty: 'Core',
    problemLatex: 'f(t) = 3\\sin^2 t + \\sinh 5t',
    problemStatement: 'Find the Laplace transform of the following function:',
    visualRecognitionTrigger: 'Squared sine term sin^2(t) has NO direct Laplace formula — must be reduced via half-angle identity first!',
    arabicVisualTrigger: 'وجود sin^2(t) يتطلب فكها أولاً بقانون نصف الزاوية لأن لابلاس لا يتوزع على الضرب.',
    examinerTrap: 'Squaring L{sin t} to get (1/(s^2+1))^2 is a fatal error! Also remember sinh(5t) has a MINUS sign in the denominator (s^2 - 25).',
    arabicExaminerTrap: 'تربيع لابلاس sin(t) خطأ قاتل! وتذكر أن مقام sinh(5t) يحتوي على إشارة سالبة (s^2 - 25).',
    secretShortcut: 'Replace sin^2(bt) with (1 - cos(2bt))/2 immediately; its Laplace transform is always [1/s - s/(s^2+4b^2)]/2.',
    steps: [
      {
        stepNumber: 1,
        title: 'Apply Half-Angle Identity to sin²(t)',
        arabicTitle: 'فك sin²(t) باستخدام متطابقة ضعف الزاوية',
        formula: 'f(t) = 3\\left(\\frac{1 - \\cos 2t}{2}\\right) + \\sinh 5t = \\frac{3}{2} - \\frac{3}{2}\\cos 2t + \\sinh 5t',
        explanation: 'Use sin^2(t) = (1 - cos 2t)/2 from Appendix A-7 so every term becomes a first-power standard function.',
        arabicExplanation: 'استخدم المتطابقة sin^2(t) = 1/2 (1 - cos 2t) لتحويل التربيع إلى دالة جيب تمام قياسية.'
      },
      {
        stepNumber: 2,
        title: 'Transform Term by Term',
        arabicTitle: 'إيجاد تحويل لابلاس لكل حد',
        formula: 'F(s) = \\frac{3}{2s} - \\frac{3}{2}\\left(\\frac{s}{s^2+4}\\right) + \\frac{5}{s^2-25}',
        explanation: 'L{1} = 1/s, L{cos 2t} = s/(s^2+4), and L{sinh 5t} = 5/(s^2-25).',
        arabicExplanation: 'عوض بقوانين لابلاس للثابت ولـ cos(2t) ولـ sinh(5t) ذات المقام السالب.'
      }
    ],
    finalAnswerLatex: 'F(s) = \\frac{3}{2s} - \\frac{3s}{2(s^2+4)} + \\frac{5}{s^2-25}',
    drillOptions: {
      methodChoices: [
        'Half-Angle Identity sin²t = (1 - cos 2t)/2 + Basic Table',
        'First Shifting Theorem',
        'Derivative of Laplace Transform',
        'Convolution Theorem'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'How must 3 sin²(t) be rewritten before taking the Laplace transform?',
      keyStepChoices: [
        '(3/2)(1 - cos 2t)',
        '(3/2)(1 + cos 2t)',
        '3(1 - cos²t)',
        '3 sin(2t)'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's24f-lap-1c',
    numberLabel: 'Final Sheet [1](c)',
    sourceExam: 'Official Final Revision Sheet',
    sourceYear: 'Fall 2024 / 2027',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2024final_4e14172d.pdf',
    points: 3,
    category: Category.LAPLACE_TRANSFORMS,
    subCategory: 'Laplace & Inverse Laplace',
    methodTag: 'Product-to-Sum Trig Identity (sin A sin B)',
    arabicMethodTag: 'قانون تحويل ضرب جيبين إلى طرح جيب تمام',
    difficulty: 'Trick',
    problemLatex: 'f(t) = 4\\sin 4t\\sin 3t + 3\\cosh\\sqrt{7}t',
    problemStatement: 'Find the Laplace transform of the following function:',
    visualRecognitionTrigger: 'Product of two sines with different frequencies: sin(4t) sin(3t) + hyperbolic cosine with radical argument √7.',
    arabicVisualTrigger: 'حاصل ضرب دالتي sin بزوايا مختلفة (4t و 3t) مع cosh(√7 t).',
    examinerTrap: 'In sin(A)sin(B) = 1/2 [cos(A-B) - cos(A+B)], students often write + instead of - or swap A-B and A+B! Also (√7)^2 = 7 in the denominator of cosh(√7 t).',
    arabicExaminerTrap: 'في قانون sin A sin B تذكر أنه يبدأ بـ cos(الفرق) ناقص cos(المجموع)! ومربع √7 في المقام هو ٧.',
    secretShortcut: '4 sin(4t)sin(3t) = 2 [cos(4t-3t) - cos(4t+3t)] = 2 cos(t) - 2 cos(7t).',
    steps: [
      {
        stepNumber: 1,
        title: 'Convert Product sin(4t)sin(3t) to Difference of Cosines',
        arabicTitle: 'تحويل حاصل ضرب sin 4t sin 3t إلى فرق بين دالتي cos',
        formula: '4\\sin 4t\\sin 3t = 4 \\cdot \\frac{1}{2}\\big[\\cos(4t-3t) - \\cos(4t+3t)\\big] = 2\\cos t - 2\\cos 7t',
        explanation: 'By Appendix A-6: sin(x)sin(y) = 1/2 [cos(x-y) - cos(x+y)]. Multiplying by 4 gives a coefficient of 2.',
        arabicExplanation: 'حسب الملحق A-6: حاصل ضرب sin في sin يعطي نصف [cos الفرق - cos المجموع].'
      },
      {
        stepNumber: 2,
        title: 'Take the Laplace Transform of Each Term',
        arabicTitle: 'حساب تحويل لابلاس لكل حد على حدة',
        formula: 'F(s) = 2\\left(\\frac{s}{s^2+1}\\right) - 2\\left(\\frac{s}{s^2+49}\\right) + 3\\left(\\frac{s}{s^2 - (\\sqrt{7})^2}\\right)',
        explanation: 'Note that cosh(√7 t) has s in the numerator and s^2 - (√7)^2 = s^2 - 7 in the denominator.',
        arabicExplanation: 'لاحظ أن cosh(√7 t) بسطها s ومقامها s^2 - 7.'
      }
    ],
    finalAnswerLatex: 'F(s) = \\frac{2s}{s^2+1} - \\frac{2s}{s^2+49} + \\frac{3s}{s^2-7}',
    drillOptions: {
      methodChoices: [
        'Product-to-Sum Identity sin A sin B = ½[cos(A-B) - cos(A+B)]',
        'First Shifting Theorem',
        'Integration by Parts',
        'Multiplication by t Rule'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What does 4 sin(4t) sin(3t) simplify to using trigonometric identities?',
      keyStepChoices: [
        '2 cos(t) - 2 cos(7t)',
        '2 cos(t) + 2 cos(7t)',
        '2 sin(7t) + 2 sin(t)',
        '4 cos(12t)'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's24f-lap-1d',
    numberLabel: 'Final Sheet [1](d)',
    sourceExam: 'Official Final Revision Sheet',
    sourceYear: 'Fall 2024 / 2027',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2024final_4e14172d.pdf',
    points: 3,
    category: Category.LAPLACE_TRANSFORMS,
    subCategory: 'Laplace & Inverse Laplace',
    methodTag: 'Half-Angle + Product-to-Sum (cos A cos B)',
    arabicMethodTag: 'دمج متطابقة ضعف الزاوية مع ضرب جيب التمام',
    difficulty: 'Core',
    problemLatex: 'f(t) = \\cos^2 6t + \\cos 3t\\cos 2t',
    problemStatement: 'Find the Laplace transform of the following function:',
    visualRecognitionTrigger: 'Contains both a squared cosine cos^2(6t) and a cosine product cos(3t)cos(2t).',
    arabicVisualTrigger: 'يجمع بين مربع جيب التمام cos^2(6t) وحاصل ضرب cos(3t)cos(2t).',
    examinerTrap: 'When doubling the angle of 6t in cos^2(6t) = (1 + cos 12t)/2, remember 12^2 = 144 in the denominator!',
    arabicExaminerTrap: 'عند مضاعفة الزاوية 6t تصبح 12t، ومربع الـ ١٢ في مقام لابلاس هو ١٤٤ وليس ٣٦!',
    secretShortcut: 'Both cos^2(x) and cos(A)cos(B) use PLUS signs in their identities!',
    steps: [
      {
        stepNumber: 1,
        title: 'Expand Both Terms Using Cosine Identities',
        arabicTitle: 'فك الحدين باستخدام متطابقات جيب التمام',
        formula: 'f(t) = \\frac{1}{2}(1 + \\cos 12t) + \\frac{1}{2}(\\cos 5t + \\cos t)',
        explanation: 'Use cos^2(6t) = (1 + cos 12t)/2 and cos(3t)cos(2t) = 1/2 [cos(3t+2t) + cos(3t-2t)].',
        arabicExplanation: 'فك التربيع بمتطابقة ضعف الزاوية (12t) وفك الضرب إلى مجموع زاويتين (5t و t).'
      },
      {
        stepNumber: 2,
        title: 'Apply Laplace Transform to Each Cosine',
        arabicTitle: 'تطبيق تحويل لابلاس على كل حد',
        formula: 'F(s) = \\frac{1}{2}\\left[\\frac{1}{s} + \\frac{s}{s^2+144} + \\frac{s}{s^2+25} + \\frac{s}{s^2+1}\\right]',
        explanation: 'Transform 1 → 1/s, cos(12t) → s/(s^2+144), cos(5t) → s/(s^2+25), and cos(t) → s/(s^2+1).',
        arabicExplanation: 'حول كل دالة جيب تمام إلى s على (s^2 + مربع معامل t).'
      }
    ],
    finalAnswerLatex: 'F(s) = \\frac{1}{2s} + \\frac{s}{2(s^2+144)} + \\frac{s}{2(s^2+25)} + \\frac{s}{2(s^2+1)}',
    drillOptions: {
      methodChoices: [
        'Half-Angle Identity + Product-to-Sum Identity',
        'First Shifting Theorem',
        'Second Shifting Theorem',
        'Division by t Rule'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the Laplace transform of cos²(6t)?',
      keyStepChoices: [
        '1/(2s) + s / [2(s² + 144)]',
        '1/(2s) + s / [2(s² + 36)]',
        's² / (s² + 36)²',
        '1/(2s) - s / [2(s² + 144)]'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's24f-lap-1e',
    numberLabel: 'Final Sheet [1](e)',
    sourceExam: 'Official Final Revision Sheet',
    sourceYear: 'Fall 2024 / 2027',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2024final_4e14172d.pdf',
    points: 3,
    category: Category.LAPLACE_TRANSFORMS,
    subCategory: 'Laplace & Inverse Laplace',
    methodTag: 'Product-to-Sum (sin A cos B) + Double-Angle',
    arabicMethodTag: 'تحويل ضرب الجيب في جيب التمام إلى مجموع',
    difficulty: 'Core',
    problemLatex: 'f(t) = \\sin 4t\\cos 3t + \\sin 3t\\cos 3t',
    problemStatement: 'Find the Laplace transform of the following function:',
    visualRecognitionTrigger: 'First term has different angles (4t, 3t); second term has identical angles (3t, 3t).',
    arabicVisualTrigger: 'الحد الأول زواياه مختلفة (4t, 3t) والحد الثاني زواياه متساوية (3t, 3t).',
    examinerTrap: 'Notice sin(3t)cos(3t) is simply (1/2)sin(6t) because sin(3t-3t) = sin(0) = 0!',
    arabicExaminerTrap: 'لاحظ أن sin(3t)cos(3t) تساوي مباشرة 1/2 sin(6t) لأن sin(0) = 0.',
    secretShortcut: 'sin(A)cos(B) = 1/2 [sin(A+B) + sin(A-B)]. Keep the bigger angle in sin first so A-B stays positive!',
    steps: [
      {
        stepNumber: 1,
        title: 'Expand Product of Sine and Cosine',
        arabicTitle: 'فك حاصل ضرب الجيب في جيب التمام',
        formula: 'f(t) = \\frac{1}{2}(\\sin 7t + \\sin t) + \\frac{1}{2}\\sin 6t',
        explanation: 'sin 4t cos 3t = 1/2 (sin 7t + sin t), and sin 3t cos 3t = 1/2 sin 6t.',
        arabicExplanation: 'الحد الأول يتحول إلى نصف (sin 7t + sin t) والحد الثاني نصف sin 6t.'
      },
      {
        stepNumber: 2,
        title: 'Take the Laplace Transform',
        arabicTitle: 'إيجاد تحويل لابلاس',
        formula: 'F(s) = \\frac{1}{2}\\left[\\frac{7}{s^2+49} + \\frac{1}{s^2+1} + \\frac{6}{s^2+36}\\right]',
        explanation: 'Use L{sin bt} = b / (s^2 + b^2) for b = 7, 1, and 6.',
        arabicExplanation: 'طبق قانون لابلاس لدالة الجيب لكل حد.'
      }
    ],
    finalAnswerLatex: 'F(s) = \\frac{7}{2(s^2+49)} + \\frac{1}{2(s^2+1)} + \\frac{3}{s^2+36}',
    drillOptions: {
      methodChoices: [
        'Product-to-Sum sin A cos B = ½[sin(A+B) + sin(A-B)]',
        'First Shifting Theorem',
        'Laplace of Integral Rule',
        'Multiplication by t Rule'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What does sin(4t)cos(3t) + sin(3t)cos(3t) simplify to?',
      keyStepChoices: [
        '½ sin(7t) + ½ sin(t) + ½ sin(6t)',
        '½ cos(7t) - ½ cos(t) + ½ cos(6t)',
        'sin(7t) + sin(6t)',
        '½ sin(7t) - ½ sin(t) + sin(6t)'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's24f-lap-1f',
    numberLabel: 'Final Sheet [1](f)',
    sourceExam: 'Official Final Revision Sheet',
    sourceYear: 'Fall 2024 / 2027',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2024final_4e14172d.pdf',
    points: 4,
    category: Category.LAPLACE_THEOREMS,
    subCategory: 'Laplace & Inverse Laplace',
    methodTag: 'First Shifting Theorem + Trig Identities',
    arabicMethodTag: 'نظريـة الإزاحة الأولى مع المتطابقات المثلثية',
    difficulty: 'Trick',
    problemLatex: 'f(t) = 3e^{5t}\\big[\\sin^2 t + 4\\sin t\\cos 2t\\big]',
    problemStatement: 'Find the Laplace transform of the following function:',
    visualRecognitionTrigger: 'An outer exponential e^{5t} multiplying a bracket of trig products/powers.',
    arabicVisualTrigger: 'دالة أسية خارجية e^{5t} مضروبة في قوس يحتوي على دوال مثلثية.',
    examinerTrap: 'In 4 sin(t)cos(2t), notice the sine angle (t) is SMALLER than the cosine angle (2t)! So sin(t - 2t) = sin(-t) = -sin(t)! Missing that minus sign ruins the second term.',
    arabicExaminerTrap: 'في 4 sin(t)cos(2t) زاوية الـ sin أصغر من زاوية الـ cos، لذلك sin(t - 2t) = sin(-t) = -sin(t) بإشارة سالبة!',
    secretShortcut: 'Ignore e^{5t} first! Simplify the bracket, find its Laplace transform, and at the very end replace every s with (s - 5).',
    steps: [
      {
        stepNumber: 1,
        title: 'Simplify the Trigonometric Bracket First',
        arabicTitle: 'تبسيط القوس المثلثي أولاً قبل التحويل',
        formula: '\\sin^2 t + 4\\sin t\\cos 2t = \\frac{1}{2}(1 - \\cos 2t) + 2\\big[\\sin(t+2t) + \\sin(t-2t)\\big] = \\frac{1}{2} - \\frac{1}{2}\\cos 2t + 2\\sin 3t - 2\\sin t',
        explanation: 'Use sin^2 t = (1 - cos 2t)/2 and 4 sin t cos 2t = 2[sin 3t + sin(-t)] = 2 sin 3t - 2 sin t.',
        arabicExplanation: 'فك التربيع وفك حاصل الضرب مع الانتباه إلى أن sin(-t) = -sin(t).'
      },
      {
        stepNumber: 2,
        title: 'Find Laplace of the Bracket & Apply First Shift (s → s - 5)',
        arabicTitle: 'إيجاد لابلاس للقوس ثم تطبيق الإزاحة الأولى (s → s - 5)',
        formula: 'F(s) = 3\\left[\\frac{1}{2s} - \\frac{s}{2(s^2+4)} + \\frac{6}{s^2+9} - \\frac{2}{s^2+1}\\right]_{s \\to s-5}',
        explanation: 'By the First Shifting Theorem L{e^{5t} g(t)} = G(s-5), replace every s with (s-5).',
        arabicExplanation: 'بتطبيق نظرية الإزاحة الأولى بسبب وجود e^{5t}، نستبدل كل s بـ (s-5).'
      }
    ],
    finalAnswerLatex: 'F(s) = 3\\left[\\frac{1}{2(s-5)} - \\frac{s-5}{2((s-5)^2+4)} + \\frac{6}{(s-5)^2+9} - \\frac{2}{(s-5)^2+1}\\right]',
    drillOptions: {
      methodChoices: [
        'Simplify Trig Bracket + First Shifting Theorem (s → s - 5)',
        'Second Shifting Theorem (Unit Step)',
        'Multiplication by t Derivative Rule',
        'Division by t Integral Rule'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What does 4 sin(t) cos(2t) simplify to?',
      keyStepChoices: [
        '2 sin(3t) - 2 sin(t)',
        '2 sin(3t) + 2 sin(t)',
        '2 cos(3t) - 2 cos(t)',
        '4 sin(3t)'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's24f-lap-1g',
    numberLabel: 'Final Sheet [1](g)',
    sourceExam: 'Official Final Revision Sheet',
    sourceYear: 'Fall 2024 / 2027',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2024final_4e14172d.pdf',
    points: 3,
    category: Category.LAPLACE_THEOREMS,
    subCategory: 'Laplace & Inverse Laplace',
    methodTag: 'First Shift + Multiplication by t Rule',
    arabicMethodTag: 'الإزاحة الأولى + قاعدة الضرب في t (اشتقاق بالنسبة لـ s)',
    difficulty: 'Core',
    problemLatex: 'f(t) = 3e^{-2t}t^7 + \\cosh\\sqrt{3}t + t\\sin t',
    problemStatement: 'Find the Laplace transform of the following function:',
    visualRecognitionTrigger: 'Contains e^{-2t}t^7 (First Shift on t^7) and t sin(t) (Multiplication by t^1 → derivative -d/ds).',
    arabicVisualTrigger: 'تحتوي على e^{-2t}t^7 (إزاحة أولى) وعلى t sin(t) (قاعدة الضرب في t أي الاشتقاق بالنسبة لـ s).',
    examinerTrap: 'For e^{-2t}t^7, do NOT differentiate 7 times! Instead take L{t^7} = 7! / s^8 and shift s → s + 2!',
    arabicExaminerTrap: 'في الحد e^{-2t}t^7 إياك أن تشتق ٧ مرات! بل خذ لابلاس t^7 وهو 7!/s^8 ثم اعمل إزاحة s → s+2.',
    secretShortcut: 'Memorize L{t sin(bt)} = 2bs / (s^2 + b^2)^2 and L{t cos(bt)} = (s^2 - b^2) / (s^2 + b^2)^2.',
    steps: [
      {
        stepNumber: 1,
        title: 'Transform 3e^{-2t}t^7 via First Shifting Theorem',
        arabicTitle: 'تحويل الحد الأول بنظرية الإزاحة الأولى',
        formula: '\\mathcal{L}\\{3e^{-2t}t^7\\} = \\left.\\frac{3(7!)}{s^8}\\right|_{s \\to s+2} = \\frac{3(7!)}{(s+2)^8}',
        explanation: 'Start with L{t^7} = 7! / s^8 and apply the shift s → s + 2 from e^{-2t}.',
        arabicExplanation: 'نوجد لابلاس لـ t^7 ثم نطبق الإزاحة s → s+2.'
      },
      {
        stepNumber: 2,
        title: 'Transform cosh(√3 t) and t sin(t)',
        arabicTitle: 'تحويل cosh(√3 t) و t sin(t)',
        formula: '\\mathcal{L}\\{\\cosh\\sqrt{3}t\\} = \\frac{s}{s^2-3}, \\qquad \\mathcal{L}\\{t\\sin t\\} = (-1)^1\\frac{d}{ds}\\left(\\frac{1}{s^2+1}\\right) = \\frac{2s}{(s^2+1)^2}',
        explanation: 'Use the derivative property L{t f(t)} = -F\'(s) on L{sin t} = 1/(s^2+1).',
        arabicExplanation: 'نطبق قاعدة الضرب في t باشتقاق لابلاس sin(t) وضربه في سالب.'
      }
    ],
    finalAnswerLatex: 'F(s) = \\frac{3(7!)}{(s+2)^8} + \\frac{s}{s^2-3} + \\frac{2s}{(s^2+1)^2}',
    drillOptions: {
      methodChoices: [
        'First Shift on t^7 + Derivative Rule (-d/ds) on sin(t)',
        'Second Shifting Theorem',
        'Division by t Rule',
        'Integration by Parts'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the fastest way to find L{3e^{-2t} t^7}?',
      keyStepChoices: [
        'Take L{3t^7} = 3(7!)/s^8 and shift s → s + 2 to get 3(7!)/(s+2)^8',
        'Differentiate 1/(s+2) seven times manually',
        'Use the Second Shifting Theorem with e^{-2s}',
        'Integrate 1/s^8 from s to infinity'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's24f-lap-1h',
    numberLabel: 'Final Sheet [1](h)',
    sourceExam: 'Official Final Revision Sheet',
    sourceYear: 'Fall 2024 / 2027',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2024final_4e14172d.pdf',
    points: 4,
    category: Category.LAPLACE_THEOREMS,
    subCategory: 'Laplace & Inverse Laplace',
    methodTag: 'Second Shifting Theorem (Unit Step Alignment)',
    arabicMethodTag: 'نظرية الإزاحة الثانية (توحيد القوس مع دالة الخطوة u_3)',
    difficulty: 'Trick',
    problemLatex: 'f(t) = u_3(t)e^{4(t-3)}(4t-1)',
    problemStatement: 'Find the Laplace transform of the following function:',
    visualRecognitionTrigger: 'Presence of Heaviside unit step function u_3(t) where e^{4(t-3)} is already shifted by 3, but (4t - 1) is NOT yet written in terms of (t - 3)!',
    arabicVisualTrigger: 'وجود دالة الخطوة u_3(t) حيث الدالة الأسية مزاحة بـ (t-3) لكن القوس (4t-1) يحتاج إلى ضبط ليكون بدلالة (t-3).',
    examinerTrap: 'You CANNOT apply u_3(t) until EVERY t in the function is written as (t - 3)! Rewrite 4t - 1 = 4(t - 3 + 3) - 1 = 4(t - 3) + 11.',
    arabicExaminerTrap: 'لا يجوز تطبيق الإزاحة الثانية إلا بعد جعل كل t على صورة (t-3)! نكتب 4t-1 = 4(t-3) + 12 - 1 = 4(t-3) + 11.',
    secretShortcut: 'Add and subtract 3 inside t: replace t with (t - 3) + 3, expand, then drop all "-3" and multiply by e^{-3s}!',
    steps: [
      {
        stepNumber: 1,
        title: 'Align (4t - 1) in Terms of (t - 3)',
        arabicTitle: 'إعادة كتابة (4t - 1) بدلالة (t - 3)',
        formula: '4t - 1 = 4\\big[(t-3) + 3\\big] - 1 = 4(t-3) + 11',
        explanation: 'Every t multiplying u_3(t) must be expressed as (t - 3) before applying the Second Shifting Theorem.',
        arabicExplanation: 'نستبدل t بـ (t-3)+3 ليصبح القوس 4(t-3) + 11.'
      },
      {
        stepNumber: 2,
        title: 'Apply Second Shifting Theorem (u_3(t) → e^{-3s})',
        arabicTitle: 'تطبيق نظرية الإزاحة الثانية (u_3 تتحول إلى e^{-3s})',
        formula: '\\mathcal{L}\\big\\{u_3(t)e^{4(t-3)}[4(t-3)+11]\\big\\} = e^{-3s}\\mathcal{L}\\big\\{e^{4t}(4t+11)\\big\\}',
        explanation: 'Using L{u_a(t) g(t-a)} = e^{-as} L{g(t)}, pull out e^{-3s} and replace (t-3) with t.',
        arabicExplanation: 'نخرج e^{-3s} خارج التحويل ونستبدل كل (t-3) بـ t.'
      },
      {
        stepNumber: 3,
        title: 'Apply First Shifting Theorem (s → s - 4)',
        arabicTitle: 'تطبيق نظرية الإزاحة الأولى لوجود e^{4t}',
        formula: 'F(s) = e^{-3s}\\left[\\frac{4}{s^2} + \\frac{11}{s}\\right]_{s \\to s-4} = e^{-3s}\\left(\\frac{4}{(s-4)^2} + \\frac{11}{s-4}\\right)',
        explanation: 'Transform 4t + 11 to 4/s^2 + 11/s, then shift s → s - 4 due to e^{4t}.',
        arabicExplanation: 'نحول (4t+11) ثم نزيح كل s إلى (s-4) بسبب وجود e^{4t}.'
      }
    ],
    finalAnswerLatex: 'F(s) = e^{-3s}\\left[\\frac{4}{(s-4)^2} + \\frac{11}{s-4}\\right]',
    drillOptions: {
      methodChoices: [
        'Align (4t-1) = 4(t-3)+11 → Second Shift (e^{-3s}) → First Shift (s → s-4)',
        'First Shift Only',
        'Multiplication by t Rule Only',
        'Division by t Rule'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'How must (4t - 1) be rewritten so it matches u_3(t)?',
      keyStepChoices: [
        '4(t - 3) + 11',
        '4(t - 3) - 1',
        '4(t - 3) - 13',
        '4(t - 3) + 3'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's24f-lap-1i',
    numberLabel: 'Final Sheet [1](i)',
    sourceExam: 'Official Final Revision Sheet',
    sourceYear: 'Fall 2024 / 2027',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2024final_4e14172d.pdf',
    points: 3,
    category: Category.LAPLACE_THEOREMS,
    subCategory: 'Laplace & Inverse Laplace',
    methodTag: 'Second Shift + Division by t (Integral from s to ∞)',
    arabicMethodTag: 'الإزاحة الثانية + قاعدة القسمة على t (التكامل من s إلى ∞)',
    difficulty: 'Core',
    problemLatex: 'f(t) = u_5(t)\\cos 2(t-5) + \\frac{\\sin t}{t}',
    problemStatement: 'Find the Laplace transform of the following function:',
    visualRecognitionTrigger: 'First term has u_5(t) with matching (t-5); second term is sin(t) divided by t.',
    arabicVisualTrigger: 'الحد الأول جاهز للإزاحة الثانية u_5(t)، والحد الثاني مقسوم على t.',
    examinerTrap: 'For L{sin(t)/t}, you integrate 1/(z^2+1) from s to ∞, which gives tan^{-1}(∞) - tan^{-1}(s) = π/2 - tan^{-1}(s) = cot^{-1}(s). Do not forget the upper limit ∞ = π/2!',
    arabicExaminerTrap: 'في تكامل 1/(z^2+1) من s إلى ما لا نهاية، تذكر أن tan^{-1}(∞) = π/2!',
    secretShortcut: 'Memorize: L{sin(at)/t} = π/2 - tan^{-1}(s/a) = cot^{-1}(s/a).',
    steps: [
      {
        stepNumber: 1,
        title: 'Transform u_5(t) cos 2(t-5) via Second Shift',
        arabicTitle: 'تحويل الحد الأول بنظرية الإزاحة الثانية',
        formula: '\\mathcal{L}\\{u_5(t)\\cos 2(t-5)\\} = e^{-5s}\\mathcal{L}\\{\\cos 2t\\} = \\frac{s e^{-5s}}{s^2+4}',
        explanation: 'Since (t-5) is already aligned with u_5(t), multiply L{cos 2t} by e^{-5s}.',
        arabicExplanation: 'بما أن القوس (t-5) مطابق لـ u_5(t)، نضرب لابلاس cos 2t في e^{-5s} مباشرة.'
      },
      {
        stepNumber: 2,
        title: 'Transform (sin t)/t via Division by t Rule',
        arabicTitle: 'تحويل (sin t)/t بقاعدة القسمة على t',
        formula: '\\mathcal{L}\\left\\{\\frac{\\sin t}{t}\\right\\} = \\int_s^{\\infty} \\frac{1}{z^2+1}\\,dz = \\Big[\\tan^{-1}z\\Big]_s^{\\infty} = \\frac{\\pi}{2} - \\tan^{-1}(s) = \\cot^{-1}(s)',
        explanation: 'Using L{f(t)/t} = ∫_s^∞ F(z) dz with tan^{-1}(∞) = π/2.',
        arabicExplanation: 'نكامل لابلاس البسط من s إلى ∞، ونعوض بـ tan^{-1}(∞) = π/2.'
      }
    ],
    finalAnswerLatex: 'F(s) = \\frac{s e^{-5s}}{s^2+4} + \\frac{\\pi}{2} - \\tan^{-1}(s)',
    drillOptions: {
      methodChoices: [
        'Second Shifting Theorem + Division by t Rule (∫_s^∞ F(z) dz)',
        'First Shifting Theorem + Multiplication by t',
        'Laplace of Integral Rule',
        'Convolution Theorem'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the Laplace transform of (sin t) / t?',
      keyStepChoices: [
        'π/2 - tan⁻¹(s)  (or cot⁻¹ s)',
        '1 / [s(s² + 1)]',
        '2s / (s² + 1)²',
        'tan⁻¹(s)'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's24f-lap-1j',
    numberLabel: 'Final Sheet [1](j)',
    sourceExam: 'Official Final Revision Sheet',
    sourceYear: 'Fall 2024 / 2027',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2024final_4e14172d.pdf',
    points: 3,
    category: Category.LAPLACE_THEOREMS,
    subCategory: 'Laplace & Inverse Laplace',
    methodTag: 'Laplace of an Integral Rule (Divide by s)',
    arabicMethodTag: 'قانون لابلاس للتكامل من 0 إلى t (القسمة على s)',
    difficulty: 'Core',
    problemLatex: 'f(t) = \\int_0^t \\big(7\\tau^3 + 2\\cos 4\\tau\\big)\\,d\\tau',
    problemStatement: 'Find the Laplace transform of the following function (also appeared in Final 1 Q3b-ii):',
    visualRecognitionTrigger: 'Definite integral from 0 to t with dummy variable dτ.',
    arabicVisualTrigger: 'تكامل محدد من 0 إلى t بداخله دالة في τ.',
    examinerTrap: 'Do NOT waste time integrating with respect to τ and then taking Laplace! Simply take the Laplace of the inside function and multiply the whole result by 1/s!',
    arabicExaminerTrap: 'لا تضيع وقتك في إجراء التكامل! هات لابلاس للدالة التي بداخل التكامل واقسم الناتج الكلي على s.',
    secretShortcut: '∫_0^t (...) dτ in t-domain = (1/s) × L{...} in s-domain.',
    steps: [
      {
        stepNumber: 1,
        title: 'Find Laplace Transform of the Integrand g(τ) = 7τ³ + 2 cos 4τ',
        arabicTitle: 'إيجاد تحويل لابلاس للدالة داخل التكامل',
        formula: 'G(s) = \\mathcal{L}\\{7t^3 + 2\\cos 4t\\} = 7\\left(\\frac{3!}{s^4}\\right) + 2\\left(\\frac{s}{s^2+16}\\right) = \\frac{42}{s^4} + \\frac{2s}{s^2+16}',
        explanation: 'Use 3! = 6 so 7 × 6 = 42.',
        arabicExplanation: 'نحسب لابلاس لما بداخل التكامل حيث 7 × 3! = 42.'
      },
      {
        stepNumber: 2,
        title: 'Divide by s for the Integral from 0 to t',
        arabicTitle: 'قسمة الناتج على s لوجود التكامل من 0 إلى t',
        formula: 'F(s) = \\frac{1}{s}G(s) = \\frac{1}{s}\\left(\\frac{42}{s^4} + \\frac{2s}{s^2+16}\\right) = \\frac{42}{s^5} + \\frac{2}{s^2+16}',
        explanation: 'By L{∫_0^t g(τ) dτ} = G(s)/s, multiply the entire bracket by 1/s.',
        arabicExplanation: 'نضرب القوس بالكامل في 1/s حسب قاعدة لابلاس للتكامل.'
      }
    ],
    finalAnswerLatex: 'F(s) = \\frac{1}{s}\\left(\\frac{42}{s^4} + \\frac{2s}{s^2+16}\\right) = \\frac{42}{s^5} + \\frac{2}{s^2+16}',
    drillOptions: {
      methodChoices: [
        'Laplace of Integral Rule: L{∫_0^t g(τ) dτ} = G(s) / s',
        'Division by t Rule: ∫_s^∞ G(z) dz',
        'First Shifting Theorem',
        'Multiplication by t Rule'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the Laplace transform of ∫_0^t g(τ) dτ?',
      keyStepChoices: [
        '(1 / s) · G(s)',
        's · G(s) - g(0)',
        '-dG(s) / ds',
        '∫_s^∞ G(z) dz'
      ],
      correctKeyStepIndex: 0
    }
  },

  // ============================================================================
  // OFFICIAL FINAL REVISION SHEET — SECTION [2]: INVERSE LAPLACE (8 Questions)
  // ============================================================================
  {
    id: 's24f-ilap-2a',
    numberLabel: 'Final Sheet [2](a)',
    sourceExam: 'Official Final Revision Sheet',
    sourceYear: 'Fall 2024 / 2027',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2024final_4e14172d.pdf',
    points: 3,
    category: Category.INVERSE_LAPLACE,
    subCategory: 'Laplace & Inverse Laplace',
    methodTag: 'Splitting Numerator + Factorial Adjustment',
    arabicMethodTag: 'توزيع البسط على المقام + ضبط المضروب',
    difficulty: 'Core',
    problemLatex: 'F(s) = \\frac{4s+3}{s^2+64} + \\frac{3}{s^7}',
    problemStatement: 'Find the inverse Laplace transform of the following function:',
    visualRecognitionTrigger: 'Linear numerator (4s+3) over s^2 + 8^2, plus 3/s^7.',
    arabicVisualTrigger: 'بسط خطي (4s+3) مقسوم على s^2+64 بالإضافة إلى 3/s^7.',
    examinerTrap: 'In 3/(s^2+64), you MUST divide and multiply by 8 (since √64 = 8) to get (3/8) sin(8t). In 3/s^7, you need 6! in the numerator so multiply and divide by 6! = 720.',
    arabicExaminerTrap: 'في الحد 3/(s^2+64) يجب الضرب والقسمة على 8 للحصول على sin(8t)، وفي 3/s^7 نقسم على 6! لأن الأس في المقام n+1 = 7.',
    secretShortcut: 's/(s^2+a^2) → cos(at); 1/(s^2+a^2) → (1/a)sin(at); 1/s^{n+1} → t^n / n!.',
    steps: [
      {
        stepNumber: 1,
        title: 'Split the Fraction and Match Standard Numerators',
        arabicTitle: 'فصل الكسر وضبط الثوابت في البسط',
        formula: 'F(s) = 4\\left(\\frac{s}{s^2+64}\\right) + \\frac{3}{8}\\left(\\frac{8}{s^2+64}\\right) + \\frac{3}{6!}\\left(\\frac{6!}{s^7}\\right)',
        explanation: 'Split (4s+3)/(s^2+64) into cosine and sine parts, and adjust 3/s^7 with 6!.',
        arabicExplanation: 'افصل البسط إلى حد يحتوي على s ليعطي cos وحد ثابت يُضرب ويُقسم على 8 ليعطي sin.'
      },
      {
        stepNumber: 2,
        title: 'Apply Inverse Laplace Transform',
        arabicTitle: 'إيجاد لابلاس العكسي لكل حد',
        formula: 'f(t) = 4\\cos 8t + \\frac{3}{8}\\sin 8t + \\frac{3}{6!}t^6',
        explanation: 'Invert each standard block directly.',
        arabicExplanation: 'حول كل كسر قياسي إلى دالته الزمنية المقابلة.'
      }
    ],
    finalAnswerLatex: 'f(t) = 4\\cos 8t + \\frac{3}{8}\\sin 8t + \\frac{3}{6!}t^6 = 4\\cos 8t + \\frac{3}{8}\\sin 8t + \\frac{t^6}{240}',
    drillOptions: {
      methodChoices: [
        'Split Numerator into Cosine/Sine Parts + Factorial Adjustment',
        'Partial Fractions',
        'Completing the Square',
        'Derivative of Laplace Rule'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the inverse Laplace transform of 3 / (s² + 64) + 3 / s⁷?',
      keyStepChoices: [
        '(3/8) sin(8t) + (3 / 6!) t⁶',
        '3 sin(8t) + (3 / 7!) t⁷',
        '(3/64) sin(8t) + 3 t⁶',
        '(3/8) cos(8t) + (3 / 6!) t⁶'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's24f-ilap-2b',
    numberLabel: 'Final Sheet [2](b)',
    sourceExam: 'Official Final Revision Sheet',
    sourceYear: 'Fall 2024 / 2027',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2024final_4e14172d.pdf',
    points: 4,
    category: Category.INVERSE_LAPLACE,
    subCategory: 'Laplace & Inverse Laplace',
    methodTag: 'Partial Fractions (Heaviside Cover-Up Method)',
    arabicMethodTag: 'الكسور الجزئية (طريقة التغطية السريعة)',
    difficulty: 'Core',
    problemLatex: 'F(s) = \\frac{s-4}{s(s-3)(s+2)}',
    problemStatement: 'Find the inverse Laplace transform of the following function:',
    visualRecognitionTrigger: 'Factored denominator with distinct linear poles: s = 0, s = 3, and s = -2.',
    arabicVisualTrigger: 'مقام محلل إلى عوامل خطية مختلفة: s = 0 و s = 3 و s = -2.',
    examinerTrap: 'Don\'t waste time multiplying out and solving 3 equations in 3 unknowns! Use the Heaviside Cover-Up limit method to find A, B, C in 15 seconds.',
    arabicExaminerTrap: 'لا تضيع وقتك في توحيد المقامات وحل ٣ معادلات! استخدم طريقة التغطية والتعويض المباشر بأصفار المقام.',
    secretShortcut: 'Cover s and plug s=0 → A = -4/(-6) = 2/3. Cover (s-3) and plug s=3 → B = -1/15. Cover (s+2) and plug s=-2 → C = -6/10 = -3/5.',
    steps: [
      {
        stepNumber: 1,
        title: 'Decompose into Partial Fractions via Cover-Up Method',
        arabicTitle: 'تحليل الكسر إلى كسور جزئية بطريقة التغطية',
        formula: '\\frac{s-4}{s(s-3)(s+2)} = \\frac{A}{s} + \\frac{B}{s-3} + \\frac{C}{s+2}',
        explanation: 'At s=0: A = (-4)/[(-3)(2)] = 2/3. At s=3: B = (3-4)/[(3)(5)] = -1/15. At s=-2: C = (-2-4)/[(-2)(-5)] = -6/10 = -3/5.',
        arabicExplanation: 'نعوض بـ s=0 فنجد A=2/3، وبـ s=3 فنجد B=-1/15، وبـ s=-2 فنجد C=-3/5.'
      },
      {
        stepNumber: 2,
        title: 'Invert Each Simple Pole',
        arabicTitle: 'إيجاد تحويل لابلاس العكسي لكل كسر',
        formula: 'f(t) = \\frac{2}{3}\\mathcal{L}^{-1}\\left\\{\\frac{1}{s}\\right\\} - \\frac{1}{15}\\mathcal{L}^{-1}\\left\\{\\frac{1}{s-3}\\right\\} - \\frac{3}{5}\\mathcal{L}^{-1}\\left\\{\\frac{1}{s+2}\\right\\}',
        explanation: '1/s → 1, 1/(s-3) → e^{3t}, and 1/(s+2) → e^{-2t}.',
        arabicExplanation: 'نحول 1/s إلى 1، و 1/(s-3) إلى e^{3t}، و 1/(s+2) إلى e^{-2t}.'
      }
    ],
    finalAnswerLatex: 'f(t) = \\frac{2}{3} - \\frac{1}{15}e^{3t} - \\frac{3}{5}e^{-2t}',
    drillOptions: {
      methodChoices: [
        'Partial Fractions (Cover-Up Method at s = 0, 3, -2)',
        'Completing the Square',
        'Second Shifting Theorem',
        'Derivative Rule (-t f(t))'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'Using the Cover-Up Method on (s - 4) / [s(s - 3)(s + 2)], what is the coefficient A over 1/s?',
      keyStepChoices: [
        'A = (-4) / [(-3)(2)] = 2/3',
        'A = (-4) / [(3)(2)] = -2/3',
        'A = 1 / [(-3)(2)] = -1/6',
        'A = 0'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's24f-ilap-2c',
    numberLabel: 'Final Sheet [2](c)',
    sourceExam: 'Official Final Revision Sheet',
    sourceYear: 'Fall 2024 / 2027',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2024final_4e14172d.pdf',
    points: 3,
    category: Category.INVERSE_LAPLACE,
    subCategory: 'Laplace & Inverse Laplace',
    methodTag: 'Completing the Square + First Shift Inverse',
    arabicMethodTag: 'إكمال المربع في المقام + الإزاحة الأولى العكسية',
    difficulty: 'Core',
    problemLatex: 'F(s) = \\frac{7}{s^2+4s+6}',
    problemStatement: 'Find the inverse Laplace transform of the following function:',
    visualRecognitionTrigger: 'Unfactorable quadratic denominator s^2 + 4s + 6.',
    arabicVisualTrigger: 'مقام تربيعي لا يتحلل بأعداد صحيحة: s^2 + 4s + 6.',
    examinerTrap: 'After completing the square to (s+2)^2 + 2, the constant 2 is (√2)^2! You must divide and multiply by √2 to get sin(√2 t).',
    arabicExaminerTrap: 'بعد إكمال المربع إلى (s+2)^2 + 2، الرقم ٢ يمثل مربع √2، لذا يجب الضرب والقسمة على √2.',
    secretShortcut: 's^2 + 2bs + c = (s + b)^2 + (c - b^2). Here b = 2, so (s+2)^2 + (6 - 4) = (s+2)^2 + 2.',
    steps: [
      {
        stepNumber: 1,
        title: 'Complete the Square in the Denominator',
        arabicTitle: 'إكمال المربع في المقام',
        formula: 's^2 + 4s + 6 = (s^2 + 4s + 4) + 2 = (s+2)^2 + (\\sqrt{2})^2',
        explanation: 'Add and subtract (4/2)^2 = 4.',
        arabicExplanation: 'نضيف ونطرح مربع نصف معامل s وهو ٤.'
      },
      {
        stepNumber: 2,
        title: 'Pull Out Exponential Shift e^{-2t} and Invert Sine',
        arabicTitle: 'استخراج الإزاحة الأسية e^{-2t} وإيجاد لابلاس العكسي',
        formula: 'f(t) = e^{-2t}\\mathcal{L}^{-1}\\left\\{\\frac{7}{\\sqrt{2}}\\cdot\\frac{\\sqrt{2}}{s^2+(\\sqrt{2})^2}\\right\\} = \\frac{7}{\\sqrt{2}}e^{-2t}\\sin(\\sqrt{2}t)',
        explanation: 'Shifting s+2 → s multiplies by e^{-2t}.',
        arabicExplanation: 'تحويل (s+2) إلى s يخرج e^{-2t} ويتبقى قانون sin(√2 t).'
      }
    ],
    finalAnswerLatex: 'f(t) = \\frac{7}{\\sqrt{2}}e^{-2t}\\sin(\\sqrt{2}t)',
    drillOptions: {
      methodChoices: [
        'Complete the Square: (s+2)² + 2 → First Shift Inverse',
        'Second Shifting Theorem',
        'Derivative of Laplace Transform',
        'Laplace of Integral Rule'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'How does s² + 4s + 6 rewrite when completing the square?',
      keyStepChoices: [
        '(s + 2)² + 2',
        '(s + 2)² + 6',
        '(s + 4)² - 10',
        '(s + 2)² - 2'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's24f-ilap-2d',
    numberLabel: 'Final Sheet [2](d)',
    sourceExam: 'Official Final Revision Sheet',
    sourceYear: 'Fall 2024 / 2027',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2024final_4e14172d.pdf',
    points: 4,
    category: Category.INVERSE_LAPLACE,
    subCategory: 'Laplace & Inverse Laplace',
    methodTag: 'Completing the Square + Numerator Alignment (Hyperbolic)',
    arabicMethodTag: 'إكمال المربع مع ضبط البسط (دوال زائدية cosh و sinh)',
    difficulty: 'Trick',
    problemLatex: 'F(s) = \\frac{s}{s^2+10s-3}',
    problemStatement: 'Find the inverse Laplace transform of the following function:',
    visualRecognitionTrigger: 'Quadratic denominator s^2 + 10s - 3 with s in the numerator.',
    arabicVisualTrigger: 'مقام تربيعي s^2 + 10s - 3 مع وجود s في البسط.',
    examinerTrap: 'Two traps in one! (1) Completing the square gives (s+5)^2 - 28 (MINUS 28, so it is cosh/sinh, NOT cos/sin!). (2) Because the denominator has (s+5), the numerator s MUST be rewritten as (s+5) - 5 before shifting!',
    arabicExaminerTrap: 'خدعتان في سؤال واحد: (١) إكمال المربع يعطي (s+5)^2 - 28 بإشارة سالبة أي cosh و sinh! (٢) يجب كتابة البسط s على صورة (s+5) - 5 قبل استخراج e^{-5t}!',
    secretShortcut: 'Whenever the denominator has (s+a)^2, immediately write the numerator s as (s+a) - a!',
    steps: [
      {
        stepNumber: 1,
        title: 'Complete the Square & Align the Numerator',
        arabicTitle: 'إكمال المربع في المقام وضبط البسط ليحتوي على (s+5)',
        formula: 'F(s) = \\frac{(s+5) - 5}{(s+5)^2 - 25 - 3} = \\frac{(s+5) - 5}{(s+5)^2 - 28}',
        explanation: 'Add and subtract 5^2 = 25 in the denominator, and add/subtract 5 in the numerator.',
        arabicExplanation: 'نكمل المربع في المقام بإضافة وطرح ٢٥، ونضيف ونطرح ٥ في البسط.'
      },
      {
        stepNumber: 2,
        title: 'Apply First Shift (s+5 → s yields e^{-5t}) and Split',
        arabicTitle: 'استخراج e^{-5t} وفصل الكسر إلى cosh و sinh',
        formula: 'f(t) = e^{-5t}\\mathcal{L}^{-1}\\left\\{\\frac{s}{s^2-28} - \\frac{5}{\\sqrt{28}}\\cdot\\frac{\\sqrt{28}}{s^2-28}\\right\\}',
        explanation: 'Because the denominator is s^2 - 28, the inverse functions are hyperbolic cosh(√28 t) and sinh(√28 t).',
        arabicExplanation: 'بما أن الإشارة في المقام سالبة (-28)، نستخدم الدوال الزائدية cosh و sinh.'
      }
    ],
    finalAnswerLatex: 'f(t) = e^{-5t}\\left[\\cosh(\\sqrt{28}t) - \\frac{5}{\\sqrt{28}}\\sinh(\\sqrt{28}t)\\right]',
    drillOptions: {
      methodChoices: [
        'Complete Square to (s+5)² - 28 and Align Numerator s = (s+5) - 5',
        'Partial Fractions with Integer Roots',
        'Second Shifting Theorem',
        'Derivative Rule (-t f(t))'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'After completing the square in s / (s² + 10s - 3), what is the transformed expression before taking L⁻¹?',
      keyStepChoices: [
        '[(s + 5) - 5] / [(s + 5)² - 28]',
        's / [(s + 5)² - 28]  (without changing numerator s)',
        '[(s + 5) + 5] / [(s + 5)² + 22]',
        '[(s + 10) - 10] / [(s + 10)² - 103]'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's24f-ilap-2e',
    numberLabel: 'Final Sheet [2](e)',
    sourceExam: 'Official Final Revision Sheet',
    sourceYear: 'Fall 2024 / 2027',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2024final_4e14172d.pdf',
    points: 3,
    category: Category.INVERSE_LAPLACE,
    subCategory: 'Laplace & Inverse Laplace',
    methodTag: 'Second Shifting Theorem Inverse (e^{-as} → u_a(t))',
    arabicMethodTag: 'الإزاحة الثانية العكسية (تحويل e^{-as} إلى دالة الخطوة u_a)',
    difficulty: 'Core',
    problemLatex: 'F(s) = \\frac{4se^{-2s}}{s^2+16} + \\frac{e^{-7s}}{s+3}',
    problemStatement: 'Find the inverse Laplace transform of the following function:',
    visualRecognitionTrigger: 'Exponentials in s (e^{-2s} and e^{-7s}) in the numerator!',
    arabicVisualTrigger: 'وجود دالة أسية في s (وهي e^{-2s} و e^{-7s}) في البسط.',
    examinerTrap: 'When inverting e^{-2s} G(s), you must write u_2(t) AND shift every t inside g(t) to (t - 2)! Writing 4 u_2(t) cos(4t) instead of 4 u_2(t) cos 4(t-2) loses half the marks.',
    arabicExaminerTrap: 'عند تحويل e^{-2s} إلى u_2(t) يجب إزاحة كل t في الدالة الناتجة لتصبح (t-2)!',
    secretShortcut: 'Ignore e^{-as}, invert the fraction to get g(t), then write u_a(t) g(t-a).',
    steps: [
      {
        stepNumber: 1,
        title: 'Invert the Unshifted Fractions First',
        arabicTitle: 'إيجاد لابلاس العكسي للكسرين بدون الدالة الأسية أولاً',
        formula: '\\mathcal{L}^{-1}\\left\\{\\frac{4s}{s^2+16}\\right\\} = 4\\cos 4t, \\qquad \\mathcal{L}^{-1}\\left\\{\\frac{1}{s+3}\\right\\} = e^{-3t}',
        explanation: 'Find the standard inverse of each rational part.',
        arabicExplanation: 'نوجد التحويل العكسي لكل كسر قياسي.'
      },
      {
        stepNumber: 2,
        title: 'Apply the Second Shifting Theorem for e^{-2s} and e^{-7s}',
        arabicTitle: 'تطبيق نظرية الإزاحة الثانية لكل حد',
        formula: 'f(t) = 4u_2(t)\\cos 4(t-2) + u_7(t)e^{-3(t-7)}',
        explanation: 'e^{-2s} shifts t → t - 2 with u_2(t), and e^{-7s} shifts t → t - 7 with u_7(t).',
        arabicExplanation: 'وجود e^{-2s} يضيف u_2(t) ويستبدل t بـ (t-2)، ووجود e^{-7s} يضيف u_7(t) ويستبدل t بـ (t-7).'
      }
    ],
    finalAnswerLatex: 'f(t) = 4u_2(t)\\cos 4(t-2) + u_7(t)e^{-3(t-7)}',
    drillOptions: {
      methodChoices: [
        'Second Shifting Theorem: L⁻¹{e^{-as} F(s)} = u_a(t) f(t - a)',
        'First Shifting Theorem',
        'Completing the Square',
        'Derivative of Laplace Rule'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the inverse Laplace transform of 4s e^{-2s} / (s² + 16)?',
      keyStepChoices: [
        '4 u_2(t) cos 4(t - 2)',
        '4 u_2(t) cos(4t)',
        '4 e^{-2t} cos(4t)',
        'u_2(t) sin 4(t - 2)'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's24f-ilap-2f',
    numberLabel: 'Final Sheet [2](f)',
    sourceExam: 'Official Final Revision Sheet',
    sourceYear: 'Fall 2024 / 2027',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2024final_4e14172d.pdf',
    points: 4,
    category: Category.INVERSE_LAPLACE,
    subCategory: 'Laplace & Inverse Laplace',
    methodTag: 'Combined Second Shift + First Shift (Completing Square)',
    arabicMethodTag: 'دمج الإزاحة الثانية (e^{-6s}) مع إكمال المربع والإزاحة الأولى',
    difficulty: 'Boss',
    problemLatex: 'F(s) = \\frac{(s+9)e^{-6s}}{s^2+6s+3}',
    problemStatement: 'Find the inverse Laplace transform of the following function:',
    visualRecognitionTrigger: 'Has BOTH e^{-6s} in the numerator (Second Shift) AND an unfactorable quadratic s^2 + 6s + 3 in the denominator (First Shift)!',
    arabicVisualTrigger: 'يجمع بين وجود e^{-6s} في البسط (إزاحة ثانية) ومقام تربيعي يحتاج لإكمال المربع (إزاحة أولى)!',
    examinerTrap: 'First ignore e^{-6s} and invert (s+9)/(s^2+6s+3) completely in terms of t. Only at the very final line do you multiply by u_6(t) and replace every t with (t - 6) — including the t inside e^{-3t}!',
    arabicExaminerTrap: 'اترك e^{-6s} للنهاية! حل الكسر أولاً بدلالة t، وفي السطر الأخير فقط اضرب في u_6(t) واستبدل كل t بـ (t-6) بما في ذلك أس الدالة الأسية!',
    secretShortcut: 'Step 1: Complete square (s+3)^2 - 6, write s+9 = (s+3) + 6. Step 2: Get g(t) = e^{-3t}[cosh √6 t + √6 sinh √6 t]. Step 3: Write u_6(t) g(t-6).',
    steps: [
      {
        stepNumber: 1,
        title: 'Complete the Square & Align Numerator for G(s) = (s+9)/(s²+6s+3)',
        arabicTitle: 'إكمال المربع في المقام وضبط البسط (بدون e^{-6s} مؤقتاً)',
        formula: 'G(s) = \\frac{(s+3) + 6}{(s+3)^2 - 9 + 3} = \\frac{(s+3) + 6}{(s+3)^2 - 6}',
        explanation: 'Since s^2 + 6s + 3 = (s+3)^2 - 6, rewrite s + 9 as (s + 3) + 6.',
        arabicExplanation: 'نكمل المربع إلى (s+3)^2 - 6 ونكتب البسط s+9 على صورة (s+3)+6.'
      },
      {
        stepNumber: 2,
        title: 'Invert G(s) Using the First Shifting Theorem',
        arabicTitle: 'إيجاد لابلاس العكسي لـ G(s) بنظرية الإزاحة الأولى',
        formula: 'g(t) = e^{-3t}\\mathcal{L}^{-1}\\left\\{\\frac{s}{s^2-6} + \\frac{6}{\\sqrt{6}}\\frac{\\sqrt{6}}{s^2-6}\\right\\} = e^{-3t}\\Big[\\cosh(\\sqrt{6}t) + \\sqrt{6}\\sinh(\\sqrt{6}t)\\Big]',
        explanation: 'Notice 6 / √6 simplifies to √6.',
        arabicExplanation: 'نستخرج e^{-3t} ونحول الكسرين إلى cosh و sinh.'
      },
      {
        stepNumber: 3,
        title: 'Apply the Second Shifting Theorem for e^{-6s}',
        arabicTitle: 'تطبيق نظرية الإزاحة الثانية لوجود e^{-6s}',
        formula: 'f(t) = u_6(t)g(t-6) = u_6(t)e^{-3(t-6)}\\Big[\\cosh\\big(\\sqrt{6}(t-6)\\big) + \\sqrt{6}\\sinh\\big(\\sqrt{6}(t-6)\\big)\\Big]',
        explanation: 'Replace EVERY t in g(t) with (t - 6) and multiply by u_6(t).',
        arabicExplanation: 'نضرب في u_6(t) ونستبدل كل t في الناتج بـ (t-6).'
      }
    ],
    finalAnswerLatex: 'f(t) = u_6(t)e^{-3(t-6)}\\Big[\\cosh\\big(\\sqrt{6}(t-6)\\big) + \\sqrt{6}\\sinh\\big(\\sqrt{6}(t-6)\\big)\\Big]',
    drillOptions: {
      methodChoices: [
        'Complete Square (First Shift) first, then apply Second Shift u_6(t) with t → t - 6',
        'Partial Fractions only',
        'Derivative of Laplace Rule',
        'Laplace of Integral Rule'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'In (s + 9) / (s² + 6s + 3), how do the numerator and denominator rewrite after completing the square?',
      keyStepChoices: [
        '[(s + 3) + 6] / [(s + 3)² - 6]',
        '[(s + 3) + 9] / [(s + 3)² + 3]',
        '[(s + 6) + 3] / [(s + 6)² - 33]',
        '[(s + 3) - 6] / [(s + 3)² + 6]'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's24f-ilap-2g',
    numberLabel: 'Final Sheet [2](g)',
    sourceExam: 'Official Final Revision Sheet',
    sourceYear: 'Fall 2024 / 2027',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2024final_4e14172d.pdf',
    points: 3,
    category: Category.INVERSE_LAPLACE,
    subCategory: 'Laplace & Inverse Laplace',
    methodTag: 'Inverse Laplace of Logarithms (Derivative Rule: -t f(t))',
    arabicMethodTag: 'لابلاس العكسي للوغاريتمات (طريقة الاشتقاق والقسمة على -t)',
    difficulty: 'Core',
    problemLatex: 'F(s) = \\ln(s^2+25)',
    problemStatement: 'Find the inverse Laplace transform of the following function:',
    visualRecognitionTrigger: 'Logarithm ln(...) in the s-domain ALWAYS triggers the Derivative Rule: L⁻¹{F\'(s)} = -t f(t)!',
    arabicVisualTrigger: 'وجود دالة لوغاريتمية ln في s يعني فوراً اشتقاق F(s) ثم القسمة على (-t)!',
    examinerTrap: 'When differentiating ln(s^2 + 25), don\'t forget the chain rule 2s in the numerator: F\'(s) = 2s / (s^2 + 25)! And remember to divide by -t at the end.',
    arabicExaminerTrap: 'لا تنس مشتقة ما بداخل اللوغاريتم (2s) في البسط، ولا تنس القسمة على (-t) في الخطوة الأخيرة.',
    secretShortcut: 'Differentiate with respect to s, take L⁻¹, and divide by (-t).',
    steps: [
      {
        stepNumber: 1,
        title: 'Differentiate F(s) with Respect to s',
        arabicTitle: 'اشتقاق الدالة F(s) بالنسبة إلى s',
        formula: "F'(s) = \\frac{d}{ds}\\ln(s^2+25) = \\frac{2s}{s^2+25}",
        explanation: 'Differentiating eliminates the logarithm and produces a rational function.',
        arabicExplanation: 'الاشتقاق يخلصنا من اللوغاريتم ويحوله إلى كسر قياسي.'
      },
      {
        stepNumber: 2,
        title: 'Apply L⁻¹{F\'(s)} = -t f(t) and Divide by -t',
        arabicTitle: 'إيجاد لابلاس العكسي للمشتقة ثم القسمة على (-t)',
        formula: '-t f(t) = \\mathcal{L}^{-1}\\left\\{\\frac{2s}{s^2+25}\\right\\} = 2\\cos 5t \\implies f(t) = \\frac{-2\\cos 5t}{t}',
        explanation: 'Divide both sides by -t to isolate f(t).',
        arabicExplanation: 'نقسم الطرفين على (-t) للحصول على الدالة f(t).'
      }
    ],
    finalAnswerLatex: 'f(t) = -\\frac{2\\cos 5t}{t}',
    drillOptions: {
      methodChoices: [
        'Derivative Rule: f(t) = -(1/t) L⁻¹{F\'(s)}',
        'Second Shifting Theorem',
        'Partial Fractions',
        'Laplace of Integral Rule'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the formula connecting f(t) to the derivative F\'(s) when F(s) contains ln(...) or tan⁻¹(...)?',
      keyStepChoices: [
        '-t · f(t) = L⁻¹{F\'(s)}  ⇒  f(t) = -(1/t) L⁻¹{F\'(s)}',
        't · f(t) = L⁻¹{F\'(s)}',
        'f(t) = s · L⁻¹{F\'(s)}',
        'f(t) = ∫_0^t L⁻¹{F\'(s)} dτ'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's24f-ilap-2h',
    numberLabel: 'Final Sheet [2](h)',
    sourceExam: 'Official Final Revision Sheet',
    sourceYear: 'Fall 2024 / 2027',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2024final_4e14172d.pdf',
    points: 3,
    category: Category.INVERSE_LAPLACE,
    subCategory: 'Laplace & Inverse Laplace',
    methodTag: 'Inverse Laplace of Arctan (Derivative Rule: -t f(t))',
    arabicMethodTag: 'لابلاس العكسي لدالة tan⁻¹ (طريقة الاشتقاق والقسمة على -t)',
    difficulty: 'Core',
    problemLatex: 'F(s) = \\tan^{-1}\\left(\\frac{s}{4}\\right)',
    problemStatement: 'Find the inverse Laplace transform of the following function:',
    visualRecognitionTrigger: 'Inverse tangent tan⁻¹(s/a) in the s-domain ALWAYS triggers the Derivative Rule: L⁻¹{F\'(s)} = -t f(t)!',
    arabicVisualTrigger: 'وجود دالة tan⁻¹(s/4) يعني فوراً اشتقاق الدالة بالنسبة لـ s ثم القسمة على (-t)!',
    examinerTrap: 'Derivative of tan⁻¹(s/4) is (1/4) / [1 + (s/4)^2] = 4 / (s^2 + 16), NOT 1 / (s^2 + 16)!',
    arabicExaminerTrap: 'مشتقة tan⁻¹(s/a) هي a / (s^2 + a^2)، أي 4 / (s^2 + 16) وليست 1 / (s^2 + 16)!',
    secretShortcut: 'Memorize: d/ds [tan⁻¹(s/a)] = a / (s^2 + a^2), whose L⁻¹ is sin(at). Dividing by -t gives -(sin at)/t!',
    steps: [
      {
        stepNumber: 1,
        title: 'Differentiate F(s) = tan⁻¹(s/4)',
        arabicTitle: 'اشتقاق الدالة F(s) بالنسبة إلى s',
        formula: "F'(s) = \\frac{1/4}{1 + (s/4)^2} = \\frac{4}{s^2+16}",
        explanation: 'Multiply top and bottom by 16 to simplify the complex fraction to 4/(s^2+16).',
        arabicExplanation: 'بضرب البسط والمقام في ١٦ نحصل على 4 / (s^2 + 16).'
      },
      {
        stepNumber: 2,
        title: 'Apply -t f(t) = L⁻¹{F\'(s)}',
        arabicTitle: 'أخذ لابلاس العكسي للمشتقة والقسمة على (-t)',
        formula: '-t f(t) = \\mathcal{L}^{-1}\\left\\{\\frac{4}{s^2+16}\\right\\} = \\sin 4t \\implies f(t) = -\\frac{\\sin 4t}{t}',
        explanation: 'Since L⁻¹{4/(s^2+16)} = sin(4t), dividing by -t gives -(sin 4t)/t.',
        arabicExplanation: 'بما أن لابلاس العكسي لـ 4/(s^2+16) هو sin 4t، نقسم على (-t).'
      }
    ],
    finalAnswerLatex: 'f(t) = -\\frac{\\sin 4t}{t}',
    drillOptions: {
      methodChoices: [
        'Derivative Rule: F\'(s) = 4/(s²+16) → f(t) = -(sin 4t)/t',
        'First Shifting Theorem',
        'Second Shifting Theorem',
        'Partial Fractions'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the derivative d/ds [tan⁻¹(s/4)] simplified?',
      keyStepChoices: [
        '4 / (s² + 16)',
        '1 / (s² + 16)',
        '1 / (s² + 4)',
        '-4 / (s² + 16)'
      ],
      correctKeyStepIndex: 0
    }
  },

  // ============================================================================
  // OFFICIAL FINAL REVISION SHEET — SECTION [3]: LAPLACE ODE IVPs (3 Questions)
  // ============================================================================
  {
    id: 's24f-ode-3a',
    numberLabel: 'Final Sheet [3](a)',
    sourceExam: 'Official Final Revision Sheet',
    sourceYear: 'Fall 2024 / 2027',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2024final_4e14172d.pdf',
    points: 4,
    category: Category.LAPLACE_ODE,
    subCategory: 'Laplace & Inverse Laplace',
    methodTag: '2nd-Order IVP via Laplace Transform',
    arabicMethodTag: 'حل معادلة تفاضلية من الرتبة الثانية باستخدام لابلاس',
    difficulty: 'Core',
    problemLatex: "y'' - 16y = 0, \\qquad y(0) = 1, \\; y'(0) = 4",
    problemStatement: 'Find the solution of the following differential equation using the Laplace transform:',
    visualRecognitionTrigger: '2nd-order ODE with initial conditions y(0) and y\'(0) and explicit instruction "using Laplace transform".',
    arabicVisualTrigger: 'معادلة من الرتبة الثانية مع شروط ابتدائية عند الصفر ومطلوب حلها بتحويل لابلاس.',
    examinerTrap: 'Notice s^2 - 16 directly matches cosh(4t) and sinh(4t) without even needing partial fractions! Or if you factor (s-4)(s+4), notice the numerator (s+4) cancels (s+4) in the denominator immediately!',
    arabicExaminerTrap: 'لاحظ أن البسط يصبح (s+4) والمقام (s-4)(s+4)، فيختصر (s+4) مع (s+4) في خطوة واحدة دون الحاجة لكسور جزئية!',
    secretShortcut: 'Always check if the numerator factors and cancels one of the denominator factors before starting Partial Fractions!',
    steps: [
      {
        stepNumber: 1,
        title: 'Take Laplace Transform of Both Sides & Substitute Initial Conditions',
        arabicTitle: 'تطبيق لابلاس على الطرفين والتعويض بالشروط الابتدائية',
        formula: '\\big[s^2 Y(s) - s y(0) - y\'(0)\\big] - 16Y(s) = 0 \\implies (s^2 - 16)Y(s) - s(1) - 4 = 0',
        explanation: 'Use L{y\'\'} = s^2 Y(s) - s y(0) - y\'(0) with y(0) = 1 and y\'(0) = 4.',
        arabicExplanation: 'نعوض بقانون لابلاس للمشتقة الثانية مع وضع y(0)=1 و y\'(0)=4.'
      },
      {
        stepNumber: 2,
        title: 'Isolate Y(s), Cancel Common Factor, and Invert',
        arabicTitle: 'فصل Y(s) واختصار العامل المشترك ثم إيجاد لابلاس العكسي',
        formula: 'Y(s) = \\frac{s+4}{s^2-16} = \\frac{s+4}{(s-4)(s+4)} = \\frac{1}{s-4} \\implies y(t) = e^{4t}',
        explanation: 'Factoring s^2 - 16 = (s-4)(s+4) cancels (s+4) immediately, leaving 1/(s-4). (Alternatively, cosh 4t + sinh 4t = e^{4t}).',
        arabicExplanation: 'باختصار (s+4) من البسط والمقام يتبقى 1/(s-4) التي تعطي e^{4t} فوراً.'
      }
    ],
    finalAnswerLatex: 'y(t) = e^{4t} \\quad (\\text{or } \\cosh 4t + \\sinh 4t)',
    drillOptions: {
      methodChoices: [
        'Transform ODE with L{y\'\'} = s²Y(s) - sy(0) - y\'(0), solve for Y(s), and take L⁻¹',
        'Variation of Parameters',
        'Reduction of Order',
        'Bernoulli Substitution'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'After plugging y(0)=1 and y\'(0)=4 into L{y\'\' - 16y = 0}, what is Y(s)?',
      keyStepChoices: [
        'Y(s) = (s + 4) / (s² - 16) = 1 / (s - 4)',
        'Y(s) = (s - 4) / (s² - 16) = 1 / (s + 4)',
        'Y(s) = (4s + 1) / (s² - 16)',
        'Y(s) = 1 / (s² - 16)'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's24f-ode-3b',
    numberLabel: 'Final Sheet [3](b)',
    sourceExam: 'Official Final Revision Sheet',
    sourceYear: 'Fall 2024 / 2027',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2024final_4e14172d.pdf',
    points: 4,
    category: Category.LAPLACE_ODE,
    subCategory: 'Laplace & Inverse Laplace',
    methodTag: 'Laplace IVP with Completing the Square',
    arabicMethodTag: 'حل معادلة تفاضلية بلابلاس مع إكمال المربع',
    difficulty: 'Trick',
    problemLatex: "y'' + 5y' + 3y = 0, \\qquad y(0) = 3, \\; y'(0) = 1",
    problemStatement: 'Find the solution of the following differential equation using the Laplace transform:',
    visualRecognitionTrigger: '2nd-order IVP whose characteristic polynomial s^2 + 5s + 3 does not factor into integers.',
    arabicVisualTrigger: 'معادلة تفاضلية بلابلاس مقامها s^2 + 5s + 3 لا يتحلل بأعداد صحيحة فيُحل بإكمال المربع.',
    examinerTrap: 'When transforming +5y\', remember to multiply BOTH terms of [sY(s) - y(0)] by 5: +5sY(s) - 5y(0) = +5sY(s) - 15! Forgetting to multiply y(0) by 5 is the #1 mistake in Laplace ODEs.',
    arabicExaminerTrap: 'عند تحويل 5y\' تذكر ضرب القوس كاملاً في ٥: 5[sY(s) - y(0)] = 5sY(s) - 15! نسيان ضرب y(0) في ٥ هو الخطأ الأكثر شيوعاً.',
    secretShortcut: 's^2 + 5s + 3 = (s + 2.5)^2 - 3.25 = (s + 5/2)^2 - 13/4.',
    steps: [
      {
        stepNumber: 1,
        title: 'Transform the ODE and Substitute y(0)=3, y\'(0)=1',
        arabicTitle: 'أخذ تحويل لابلاس للمعادلة والتعويض بالشروط الابتدائية',
        formula: '\\big[s^2Y(s) - 3s - 1\\big] + 5\\big[sY(s) - 3\\big] + 3Y(s) = 0 \\implies (s^2+5s+3)Y(s) = 3s + 16',
        explanation: 'Notice -1 - 15 = -16 moves to the RHS as +16.',
        arabicExplanation: 'تجميع الحدود الثابتة (-1 - 15 = -16) ونقلها للطرف الأيمن يعطي 3s + 16.'
      },
      {
        stepNumber: 2,
        title: 'Complete the Square & Align the Numerator',
        arabicTitle: 'إكمال المربع في المقام وضبط البسط بدلالة (s + 5/2)',
        formula: 'Y(s) = \\frac{3(s + \\frac{5}{2}) + \\frac{17}{2}}{(s + \\frac{5}{2})^2 - \\frac{13}{4}}',
        explanation: 'Since 3s + 16 = 3(s + 5/2) - 15/2 + 16 = 3(s + 5/2) + 17/2, and s^2 + 5s + 3 = (s + 5/2)^2 - 13/4.',
        arabicExplanation: 'نكتب 3s+16 على صورة 3(s+5/2) + 17/2 ونكمل المربع في المقام.'
      },
      {
        stepNumber: 3,
        title: 'Invert Using First Shifting Theorem',
        arabicTitle: 'إيجاد لابلاس العكسي بنظرية الإزاحة الأولى',
        formula: 'y(t) = e^{-\\frac{5}{2}t}\\left[3\\cosh\\left(\\frac{\\sqrt{13}}{2}t\\right) + \\frac{17}{\\sqrt{13}}\\sinh\\left(\\frac{\\sqrt{13}}{2}t\\right)\\right]',
        explanation: 'Notice (17/2) / (√13 / 2) = 17 / √13.',
        arabicExplanation: 'نخرج e^{-5t/2} ونحول الحدين إلى cosh و sinh.'
      }
    ],
    finalAnswerLatex: 'y(t) = e^{-\\frac{5}{2}t}\\left[3\\cosh\\left(\\frac{\\sqrt{13}}{2}t\\right) + \\frac{17}{\\sqrt{13}}\\sinh\\left(\\frac{\\sqrt{13}}{2}t\\right)\\right]',
    drillOptions: {
      methodChoices: [
        'Transform ODE → Isolate Y(s) = (3s+16)/(s²+5s+3) → Complete Square & Invert',
        'Variation of Parameters',
        'Undetermined Coefficients',
        'Bernoulli Method'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'When substituting y(0)=3 and y\'(0)=1 into L{y\'\' + 5y\' + 3y = 0}, what is the numerator of Y(s)?',
      keyStepChoices: [
        '3s + 16  (since -y\'(0) - 5y(0) = -1 - 15 = -16)',
        '3s + 4   (forgetting to multiply y(0) by 5)',
        's + 18',
        '3s - 16'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's24f-ode-3c',
    numberLabel: 'Final Sheet [3](c)',
    sourceExam: 'Official Final Revision Sheet',
    sourceYear: 'Fall 2024 / 2027',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2024final_4e14172d.pdf',
    points: 3,
    category: Category.LAPLACE_ODE,
    subCategory: 'Laplace & Inverse Laplace',
    methodTag: '1st-Order IVP via Laplace Transform',
    arabicMethodTag: 'حل معادلة تفاضلية من الرتبة الأولى باستخدام لابلاس',
    difficulty: 'Core',
    problemLatex: "y' - 4y = 8, \\qquad y(0) = 2",
    problemStatement: 'Find the solution of the following differential equation using the Laplace transform:',
    visualRecognitionTrigger: 'First-order linear IVP with constant RHS 8 and initial condition y(0) = 2.',
    arabicVisualTrigger: 'معادلة من الرتبة الأولى مع شرط ابتدائي y(0)=2 ومطلوب حلها بلابلاس.',
    examinerTrap: 'Remember the RHS constant 8 must ALSO be transformed: L{8} = 8/s, NOT 8!',
    arabicExaminerTrap: 'لا تنس تحويل الثابت 8 في الطرف الأيمن ليصبح 8/s وليس 8!',
    secretShortcut: 'Combine 2 + 8/s = (2s + 8)/s, then divide by (s - 4) and use cover-up at s = 0 and s = 4.',
    steps: [
      {
        stepNumber: 1,
        title: 'Transform Both Sides of the ODE',
        arabicTitle: 'تطبيق تحويل لابلاس على طرفي المعادلة',
        formula: '\\big[sY(s) - y(0)\\big] - 4Y(s) = \\frac{8}{s} \\implies (s-4)Y(s) = 2 + \\frac{8}{s} = \\frac{2s+8}{s}',
        explanation: 'Substitute y(0) = 2 and L{8} = 8/s.',
        arabicExplanation: 'نعوض عن y(0)=2 وعن لابلاس الـ ٨ بـ 8/s ونوحد المقام.'
      },
      {
        stepNumber: 2,
        title: 'Partial Fractions & Inverse Laplace',
        arabicTitle: 'تحليل الكسور الجزئية وإيجاد لابلاس العكسي',
        formula: 'Y(s) = \\frac{2s+8}{s(s-4)} = \\frac{-2}{s} + \\frac{4}{s-4} \\implies y(t) = -2 + 4e^{4t}',
        explanation: 'At s=0: A = 8/(-4) = -2. At s=4: B = 16/4 = 4.',
        arabicExplanation: 'عند s=0 نحصل على A=-2، وعند s=4 نحصل على B=4.'
      }
    ],
    finalAnswerLatex: 'y(t) = 4e^{4t} - 2',
    drillOptions: {
      methodChoices: [
        'Transform with L{y\'} = sY(s) - y(0) and L{8} = 8/s, then Partial Fractions',
        'Second Shifting Theorem',
        'Variation of Parameters',
        'Exact ODE Method'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is Y(s) after transforming y\' - 4y = 8 with y(0) = 2?',
      keyStepChoices: [
        'Y(s) = (2s + 8) / [s(s - 4)] = -2/s + 4/(s - 4)',
        'Y(s) = 10 / (s - 4)',
        'Y(s) = (2s - 8) / [s(s - 4)]',
        'Y(s) = 8 / [s(s + 4)]'
      ],
      correctKeyStepIndex: 0
    }
  },

  // ============================================================================
  // OFFICIAL FINAL REVISION SHEET — SECTION [4]: FOURIER SERIES (4 Questions)
  // ============================================================================
  {
    id: 's24f-four-4a',
    numberLabel: 'Final Sheet [4](a)',
    sourceExam: 'Official Final Revision Sheet',
    sourceYear: 'Fall 2024 / 2027',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2024final_4e14172d.pdf',
    points: 4,
    category: Category.FOURIER_SERIES,
    subCategory: 'Fourier Series & Legendre',
    methodTag: 'Full-Range Fourier Series of an Odd Function (x³)',
    arabicMethodTag: 'متسلسلة فورييه لدالة فردية على [-π, π] (طريقة الجدول)',
    difficulty: 'Trick',
    problemLatex: 'f(x) = x^3, \\qquad -\\pi \\le x \\le \\pi',
    problemStatement: 'Expand the periodic function into a Fourier series:',
    visualRecognitionTrigger: 'Symmetric interval [-π, π] and odd power x^3 → f(-x) = -f(x) (Odd Function!).',
    arabicVisualTrigger: 'فترة متماثلة [-π, π] ودالة فردية x^3 مما يجعل a_0 = 0 و a_n = 0 فوراً!',
    examinerTrap: 'If you try to compute a_0 and a_n manually without stating "f(x) is odd so a_0 = a_n = 0", you waste 10 minutes! Use Tabular Integration by Parts (4 rows for x^3) to find b_n in 30 seconds.',
    arabicExaminerTrap: 'بما أن الدالة فردية على فترة متماثلة، فإن a_0 = a_n = 0 فوراً! واستخدم جدول التكامل بالتجزيء لإيجاد b_n.',
    secretShortcut: 'For any odd function on [-π, π]: a_0 = a_n = 0, and b_n = (2/π) ∫_0^π f(x) sin(nx) dx. Remember sin(nπ) = 0 and cos(nπ) = (-1)^n!',
    steps: [
      {
        stepNumber: 1,
        title: 'Use Odd Symmetry to Eliminate a_0 and a_n',
        arabicTitle: 'استخدام تماثل الدالة الفردية لتصفير a_0 و a_n',
        formula: 'f(-x) = (-x)^3 = -x^3 = -f(x) \\implies \\text{Odd Function} \\implies a_0 = 0, \\quad a_n = 0',
        explanation: 'Here T = π. Since f(x) is odd, the Fourier series contains only sine terms b_n.',
        arabicExplanation: 'بما أن الدالة فردية، فإن معاملات جيب التمام تساوي صفراً، ونحسب b_n فقط.'
      },
      {
        stepNumber: 2,
        title: 'Compute b_n Using Tabular Integration by Parts',
        arabicTitle: 'حساب المعامل b_n باستخدام طريقة الجدول للتكامل بالتجزيء',
        formula: 'b_n = \\frac{2}{\\pi}\\int_0^{\\pi} x^3\\sin(nx)\\,dx = \\frac{2}{\\pi}\\left[-\\frac{x^3\\cos nx}{n} + \\frac{3x^2\\sin nx}{n^2} + \\frac{6x\\cos nx}{n^3} - \\frac{6\\sin nx}{n^4}\\right]_0^{\\pi}',
        explanation: 'Differentiate x^3 column (x^3, 3x^2, 6x, 6, 0) with alternating signs (+, -, +, -) and integrate sin(nx) column.',
        arabicExplanation: 'نشتق عمود x^3 حتى الصفر ونكامل عمود sin(nx) مع تناوب الإشارات.'
      },
      {
        stepNumber: 3,
        title: 'Substitute Limits 0 and π (using sin nπ = 0, cos nπ = (-1)^n)',
        arabicTitle: 'التعويض بحدود التكامل 0 و π',
        formula: 'b_n = \\frac{2}{\\pi}\\left[-\\frac{\\pi^3(-1)^n}{n} + \\frac{6\\pi(-1)^n}{n^3}\\right] = 2(-1)^n\\left(\\frac{6}{n^3} - \\frac{\\pi^2}{n}\\right)',
        explanation: 'All sin(nπ) and sin(0) terms vanish, and the x^3 and 6x terms vanish at x = 0.',
        arabicExplanation: 'كل حدود sin(nπ) تساوي صفراً، وعند x=0 تنعدم كل الحدود لأنها مضروبة في x.'
      }
    ],
    finalAnswerLatex: 'f(x) = \\sum_{n=1}^{\\infty} 2(-1)^n\\left(\\frac{6}{n^3} - \\frac{\\pi^2}{n}\\right)\\sin(nx)',
    drillOptions: {
      methodChoices: [
        'Odd Function Shortcut (a_0 = a_n = 0) + Tabular IBP for b_n',
        'Even Function Shortcut (b_n = 0)',
        'Half-Range Cosine Expansion',
        'Laplace Transform'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'Because f(x) = x³ on [-π, π] is an odd function, which Fourier coefficients are automatically zero?',
      keyStepChoices: [
        'a_0 = 0 and a_n = 0 (only b_n is non-zero)',
        'b_n = 0 (only a_0 and a_n are non-zero)',
        'Only a_0 = 0',
        'None of them are zero'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's24f-four-4b',
    numberLabel: 'Final Sheet [4](b)',
    sourceExam: 'Official Final Revision Sheet',
    sourceYear: 'Fall 2024 / 2027',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2024final_4e14172d.pdf',
    points: 4,
    category: Category.FOURIER_SERIES,
    subCategory: 'Fourier Series & Legendre',
    methodTag: 'Full-Range Fourier Series of an Even Function (|x|)',
    arabicMethodTag: 'متسلسلة فورييه لدالة زوجية |x| على [-π, π]',
    difficulty: 'Core',
    problemLatex: 'f(x) = |x|, \\qquad -\\pi \\le x \\le \\pi',
    problemStatement: 'Expand the periodic function into a Fourier series:',
    visualRecognitionTrigger: 'Absolute value |x| on [-π, π] satisfies f(-x) = |-x| = |x| = f(x) → EVEN function!',
    arabicVisualTrigger: 'دالة القيمة المطلقة |x| على [-π, π] هي دالة زوجية، وعلى [0, π] تصبح |x| = x ببساطة!',
    examinerTrap: 'Once you fold the integral from [-π, π] to 2 ∫_0^π using even symmetry, x is positive on [0, π], so |x| simply becomes x!',
    arabicExaminerTrap: 'بما أن الدالة زوجية، نضرب التكامل في ٢ ونجعله من 0 إلى π، وفي هذه الفترة الموجبة نرفع القيمة المطلقة فتصبح |x| = x!',
    secretShortcut: 'Even function on [-π, π] = same formulas as Fourier Cosine Series of x on [0, π]!',
    steps: [
      {
        stepNumber: 1,
        title: 'Apply Even Symmetry (b_n = 0) and Compute a_0',
        arabicTitle: 'تطبيق تماثل الدالة الزوجية (b_n = 0) وحساب a_0',
        formula: 'b_n = 0, \\qquad a_0 = \\frac{2}{\\pi}\\int_0^{\\pi} x\\,dx = \\frac{2}{\\pi}\\left[\\frac{x^2}{2}\\right]_0^{\\pi} = \\pi',
        explanation: 'Since f(-x) = |-x| = |x|, the function is even, so b_n = 0 and |x| = x on [0, π].',
        arabicExplanation: 'الدالة زوجية إذن b_n = 0، وفي الفترة [0, π] تكون |x| = x.'
      },
      {
        stepNumber: 2,
        title: 'Compute a_n via Tabular Integration by Parts',
        arabicTitle: 'حساب المعامل a_n بالتكامل بالتجزيء',
        formula: 'a_n = \\frac{2}{\\pi}\\int_0^{\\pi} x\\cos(nx)\\,dx = \\frac{2}{\\pi}\\left[\\frac{x\\sin(nx)}{n} + \\frac{\\cos(nx)}{n^2}\\right]_0^{\\pi} = \\frac{2}{\\pi n^2}\\big[(-1)^n - 1\\big]',
        explanation: 'At x = π, cos(nπ) = (-1)^n. At x = 0, cos(0) = 1. Don\'t forget the "- 1" from the lower limit x = 0!',
        arabicExplanation: 'انتبه للتعويض بالحد السفلي x=0 في cos(0)=1، فيعطي ((-1)^n - 1) مقسوماً على n^2.'
      }
    ],
    finalAnswerLatex: 'f(x) = \\frac{\\pi}{2} + \\sum_{n=1}^{\\infty} \\frac{2}{\\pi n^2}\\big[(-1)^n - 1\\big]\\cos(nx)',
    drillOptions: {
      methodChoices: [
        'Even Symmetry (b_n = 0) + Replace |x| with x on [0, π]',
        'Odd Symmetry (a_0 = a_n = 0)',
        'Half-Range Sine Series',
        'Legendre Orthogonality'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'When evaluating a_n = (2/π) [x sin(nx)/n + cos(nx)/n²]_0^π, what is the result?',
      keyStepChoices: [
        '(2 / πn²) [(-1)^n - 1]  (since cos(0) = 1 at the lower limit!)',
        '(2 / πn²) (-1)^n  (forgetting that cos(0) = 1)',
        '0 for all n',
        '-2(-1)^n / n'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's24f-four-4c',
    numberLabel: 'Final Sheet [4](c)',
    sourceExam: 'Official Final Revision Sheet',
    sourceYear: 'Fall 2024 / 2027',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2024final_4e14172d.pdf',
    points: 4,
    category: Category.FOURIER_SERIES,
    subCategory: 'Fourier Series & Legendre',
    methodTag: 'Half-Range Fourier Cosine Series (T = 3)',
    arabicMethodTag: 'متسلسلة فورييه لجيب التمام لنصف المدى (T = 3)',
    difficulty: 'Core',
    problemLatex: 'f(x) = 4x, \\qquad 0 \\le x \\le 3 \\quad \\text{(Fourier Cosine Series)}',
    problemStatement: 'Expand the function into a Fourier cosine series:',
    visualRecognitionTrigger: 'Half-interval [0, 3] with explicit instruction "into a Fourier cosine series" → Treat as EVEN with T = 3!',
    arabicVisualTrigger: 'فترة نصفية [0, 3] ومطلوب متسلسلة جيب التمام Cosine Series أي نعاملها كدالة زوجية بطول نصف دورة T = 3.',
    examinerTrap: 'Here T = 3 (NOT π!), so the argument inside cosine is (nπx / 3), NOT (nx)! When integrating cos(nπx/3), you divide by (nπ/3).',
    arabicExaminerTrap: 'هنا T = 3 وليست π! لذا فإن الزاوية داخل cos هي (nπx/3)، وعند تكاملها نقسم على (nπ/3).',
    secretShortcut: 'In any "Fourier Cosine Series" on [0, T]: b_n = 0 automatically, a_0 = (2/T)∫_0^T f(x)dx, and a_n = (2/T)∫_0^T f(x)cos(nπx/T)dx.',
    steps: [
      {
        stepNumber: 1,
        title: 'Set b_n = 0 and Compute a_0 with T = 3',
        arabicTitle: 'وضع b_n = 0 وحساب المعامل a_0 مع T = 3',
        formula: 'b_n = 0, \\qquad a_0 = \\frac{2}{3}\\int_0^3 4x\\,dx = \\frac{2}{3}\\Big[2x^2\\Big]_0^3 = \\frac{2}{3}(18) = 12',
        explanation: 'So the constant term in the series is a_0 / 2 = 6.',
        arabicExplanation: 'نحسب a_0 فيكون الحد الثابت في المتسلسلة هو a_0 / 2 = 6.'
      },
      {
        stepNumber: 2,
        title: 'Compute a_n Using Tabular IBP with Angle (nπx / 3)',
        arabicTitle: 'حساب المعامل a_n بطريقة الجدول مع الزاوية (nπx / 3)',
        formula: 'a_n = \\frac{2}{3}\\int_0^3 4x\\cos\\left(\\frac{n\\pi x}{3}\\right)dx = \\frac{2}{3}\\left[4x\\frac{3\\sin(\\frac{n\\pi x}{3})}{n\\pi} + 4\\frac{9\\cos(\\frac{n\\pi x}{3})}{n^2\\pi^2}\\right]_0^3 = \\frac{24}{n^2\\pi^2}\\big[(-1)^n - 1\\big]',
        explanation: 'At x = 3, cos(nπ) = (-1)^n. At x = 0, cos(0) = 1. (2/3) × 36 / (n^2 π^2) = 24 / (n^2 π^2).',
        arabicExplanation: 'عند x=3 تصبح الزاوية nπ وعند x=0 تكون cos(0)=1.'
      }
    ],
    finalAnswerLatex: 'f(x) = 6 + \\sum_{n=1}^{\\infty} \\frac{24}{n^2\\pi^2}\\big[(-1)^n - 1\\big]\\cos\\left(\\frac{n\\pi x}{3}\\right)',
    drillOptions: {
      methodChoices: [
        'Half-Range Cosine Series with T = 3 (b_n = 0, angle = nπx/3)',
        'Half-Range Sine Series (a_0 = a_n = 0)',
        'Full-Range Fourier Series with T = π',
        'Laplace Transform'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'For a Fourier Cosine Series on 0 ≤ x ≤ 3, what is the half-period T and what is the cosine argument?',
      keyStepChoices: [
        'T = 3, and the cosine argument is cos(nπx / 3)',
        'T = π, and the cosine argument is cos(nx)',
        'T = 3/2, and the cosine argument is cos(2nπx / 3)',
        'T = 6, and b_n is non-zero'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 's24f-four-4d',
    numberLabel: 'Final Sheet [4](d)',
    sourceExam: 'Official Final Revision Sheet',
    sourceYear: 'Fall 2024 / 2027',
    sourceFileUrl: '/assets/aistudio/Mathematics3fall2024final_4e14172d.pdf',
    points: 4,
    category: Category.FOURIER_SERIES,
    subCategory: 'Fourier Series & Legendre',
    methodTag: 'Half-Range Fourier Sine Series (T = 2)',
    arabicMethodTag: 'متسلسلة فورييه للجيب لنصف المدى (T = 2)',
    difficulty: 'Trick',
    problemLatex: 'f(x) = 5x^2, \\qquad 0 \\le x \\le 2 \\quad \\text{(Fourier Sine Series)}',
    problemStatement: 'Expand the function into a Fourier sine series (also appeared with x^2 in Final 3 Q4b):',
    visualRecognitionTrigger: 'Half-interval [0, 2] with explicit instruction "into a Fourier sine series" → Even though 5x^2 looks even, "Sine Series" forces a_0 = a_n = 0!',
    arabicVisualTrigger: 'مطلوب صراحةً Fourier Sine Series على [0, 2]، لذا نضع a_0 = a_n = 0 فوراً بغض النظر عن أن x^2 زوجية!',
    examinerTrap: 'Students see x^2 and think "even function, so b_n = 0"! NO! On a half-range [0, T], the exam wording ("Fourier Sine Series") dictates the parity: Sine Series ALWAYS means a_0 = a_n = 0! Also watch the lower limit x = 0 in the 3rd tabular term cos(0) = 1!',
    arabicExaminerTrap: 'إياك أن تقول x^2 دالة زوجية إذن b_n = 0! طالما الفترة تبدأ من الصفر [0, 2] وطلب Sine Series فإن a_0 = a_n = 0 إجبارياً! وانتبه للتعويض بـ x=0 في الحد الثالث المحتوي على cos.',
    secretShortcut: 'On [0, T], follow the command in the question ("Sine" → only b_n; "Cosine" → only a_0, a_n), NOT the algebraic power of x!',
    steps: [
      {
        stepNumber: 1,
        title: 'Set a_0 = a_n = 0 for Fourier Sine Series with T = 2',
        arabicTitle: 'وضع a_0 = a_n = 0 لمتسلسلة الجيب مع T = 2',
        formula: 'a_0 = 0, \\quad a_n = 0, \\qquad b_n = \\frac{2}{2}\\int_0^2 5x^2\\sin\\left(\\frac{n\\pi x}{2}\\right)dx',
        explanation: 'Here T = 2, so 2/T = 2/2 = 1 and the sine argument is nπx / 2.',
        arabicExplanation: 'هنا T = 2 فيكون 2/T = 1 والزاوية داخل الجيب هي nπx/2.'
      },
      {
        stepNumber: 2,
        title: 'Evaluate b_n via 3-Row Tabular Integration by Parts',
        arabicTitle: 'حساب المعامل b_n بجدول التكامل بالتجزيء',
        formula: 'b_n = 5\\left[-x^2\\frac{2\\cos(\\frac{n\\pi x}{2})}{n\\pi} + 2x\\frac{4\\sin(\\frac{n\\pi x}{2})}{n^2\\pi^2} + 2\\frac{8\\cos(\\frac{n\\pi x}{2})}{n^3\\pi^3}\\right]_0^2 = 5\\left[-\\frac{8(-1)^n}{n\\pi} + \\frac{16\\big((-1)^n - 1\\big)}{n^3\\pi^3}\\right]',
        explanation: 'At x = 2, cos(nπ) = (-1)^n. At x = 0, the third term gives 16 cos(0)/(n^3 π^3) = 16/(n^3 π^3)!',
        arabicExplanation: 'عند x=2 نحصل على (-1)^n، وعند x=0 الحد الثالث لا ينعدم لأنه لا يحتوي على x فيعطي -16/(n^3 π^3).'
      }
    ],
    finalAnswerLatex: 'f(x) = \\sum_{n=1}^{\\infty} 5\\left[\\frac{-8(-1)^n}{n\\pi} + \\frac{16\\big((-1)^n - 1\\big)}{n^3\\pi^3}\\right]\\sin\\left(\\frac{n\\pi x}{2}\\right)',
    drillOptions: {
      methodChoices: [
        'Half-Range Sine Series (a_0 = a_n = 0, T = 2) + Tabular IBP',
        'Even Function Rule (b_n = 0)',
        'Full-Range Series with T = π',
        'Legendre Polynomial Expansion'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'When asked for the Fourier Sine Series of f(x) = 5x² on 0 ≤ x ≤ 2, which coefficients are zero?',
      keyStepChoices: [
        'a_0 = 0 and a_n = 0 (because a Fourier Sine Series uses only b_n!)',
        'b_n = 0 (because x² is an even power)',
        'All coefficients are non-zero',
        'Only a_0 = 0'
      ],
      correctKeyStepIndex: 0
    }
  },

  // ============================================================================
  // LAPLACE & FOURIER MASTER NOTES (Laplace_3216e865.pdf & Fourier_b45db703.pdf)
  // Key Worked Archetypes Not Duplicated Above
  // ============================================================================
  {
    id: 'lap-note-ex1',
    numberLabel: 'Laplace Notes p.3 Ex.1',
    sourceExam: 'Laplace Master Summary Notes',
    sourceYear: 'Course Notes',
    sourceFileUrl: '/assets/aistudio/Laplace_3216e865.pdf',
    points: 3,
    category: Category.LAPLACE_THEOREMS,
    subCategory: 'Laplace & Inverse Laplace',
    methodTag: 'First Shift + Half-Angle Cosine Squared',
    arabicMethodTag: 'الإزاحة الأولى مع متطابقة مربع جيب التمام',
    difficulty: 'Core',
    problemLatex: 'f(t) = e^{-3t}\\cos^2(6t)',
    problemStatement: 'Find the Laplace transform of the function (from Laplace.pdf page 3):',
    visualRecognitionTrigger: 'Exponential e^{-3t} multiplying cos^2(6t).',
    arabicVisualTrigger: 'حاصل ضرب e^{-3t} في cos^2(6t) يتطلب فك التربيع أولاً ثم الإزاحة s → s+3.',
    examinerTrap: 'Remember to shift BOTH terms of (1/2)[1 + cos(12t)] by replacing s with (s+3), so 1/(2s) becomes 1/[2(s+3)]!',
    arabicExaminerTrap: 'لا تنس إزاحة الحد الأول 1/(2s) أيضاً ليصبح 1/[2(s+3)] عند تطبيق الإزاحة الأولى!',
    secretShortcut: 'Write L{cos^2 6t} = 1/(2s) + s/[2(s^2+144)], then replace every s with (s+3).',
    steps: [
      {
        stepNumber: 1,
        title: 'Expand cos²(6t) Using Half-Angle Formula',
        arabicTitle: 'فك cos²(6t) بقانون ضعف الزاوية',
        formula: '\\cos^2(6t) = \\frac{1}{2} + \\frac{1}{2}\\cos(12t) \\implies \\mathcal{L}\\{\\cos^2 6t\\} = \\frac{1}{2s} + \\frac{s}{2(s^2+144)}',
        explanation: 'Double 6t to 12t and note 12^2 = 144.',
        arabicExplanation: 'نضاعف الزاوية 6t إلى 12t ومربعها ١٤٤.'
      },
      {
        stepNumber: 2,
        title: 'Apply First Shift s → s + 3 for e^{-3t}',
        arabicTitle: 'تطبيق الإزاحة الأولى باستبدال كل s بـ (s+3)',
        formula: 'F(s) = \\frac{1}{2(s+3)} + \\frac{s+3}{2\\big((s+3)^2+144\\big)}',
        explanation: 'Every s in both fractions is replaced by (s+3).',
        arabicExplanation: 'نستبدل كل s في الكسرين بـ (s+3).'
      }
    ],
    finalAnswerLatex: 'F(s) = \\frac{1}{2(s+3)} + \\frac{s+3}{2\\big((s+3)^2+144\\big)}',
    drillOptions: {
      methodChoices: [
        'Half-Angle Identity cos²(6t) = ½(1 + cos 12t) + First Shift (s → s + 3)',
        'Second Shifting Theorem',
        'Multiplication by t Rule',
        'Division by t Rule'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What happens to the 1/(2s) term when shifting by e^{-3t}?',
      keyStepChoices: [
        'It becomes 1 / [2(s + 3)]',
        'It stays 1 / (2s)',
        'It becomes e^{-3s} / (2s)',
        'It becomes 1 / [2(s - 3)]'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'lap-note-ex2',
    numberLabel: 'Laplace Notes p.5 Ex.3–4',
    sourceExam: 'Laplace Master Summary Notes',
    sourceYear: 'Course Notes',
    sourceFileUrl: '/assets/aistudio/Laplace_3216e865.pdf',
    points: 4,
    category: Category.LAPLACE_THEOREMS,
    subCategory: 'Laplace & Inverse Laplace',
    methodTag: 'Exponential Inside vs. Outside the Integral Trap',
    arabicMethodTag: 'الفرق الحاسم بين وجود الدالة الأسية داخل التكامل أو خارجه',
    difficulty: 'Boss',
    problemLatex: '(A)\\; f_1(t) = \\int_0^t e^{-2\\tau}\\cos(2\\tau)\\,d\\tau \\qquad \\text{vs.} \\qquad (B)\\; f_2(t) = e^{-2t}\\int_0^t \\cos(2\\tau)\\,d\\tau',
    problemStatement: 'Compare and find the Laplace transforms of both functions (from Laplace.pdf page 5):',
    visualRecognitionTrigger: 'In (A), e^{-2τ} is INSIDE the integral; in (B), e^{-2t} is OUTSIDE the integral!',
    arabicVisualTrigger: 'المقارنة الشهيرة في صفحة ٥ من ملزمة لابلاس: متى تكون الإزاحة لـ cos فقط ومتى تكون للكل؟',
    examinerTrap: 'When e^{-2τ} is INSIDE the integral, you shift s → s+2 for cos(2τ) FIRST, and then multiply by 1/s (so the outer 1/s is NOT shifted!). When e^{-2t} is OUTSIDE the integral, you multiply by 1/s FIRST, and then shift s → s+2 for ALL s (so 1/s becomes 1/(s+2))!',
    arabicExaminerTrap: 'إذا كانت e^{-2τ} داخل التكامل: نزيح الـ cos فقط والـ 1/s تبقى كما هي! أما إذا كانت e^{-2t} خارج التكامل: نزيح الكل فتصبح 1/(s+2)!',
    secretShortcut: 'Inside integral → "s → s+2 for cos only". Outside integral → "s → s+2 for ALL".',
    steps: [
      {
        stepNumber: 1,
        title: 'Case (A): Exponential INSIDE the Integral',
        arabicTitle: 'الحالة (A): الدالة الأسية داخل التكامل (الإزاحة لـ cos فقط)',
        formula: 'F_1(s) = \\frac{1}{s}\\mathcal{L}\\{e^{-2t}\\cos 2t\\} = \\frac{1}{s}\\left(\\frac{s+2}{(s+2)^2+4}\\right)',
        explanation: 'First transform the integrand e^{-2τ}cos(2τ) → (s+2)/((s+2)^2+4), then divide by unshifted s.',
        arabicExplanation: 'نحول ما بداخل التكامل أولاً ثم نقسم على s بدون إزاحة.'
      },
      {
        stepNumber: 2,
        title: 'Case (B): Exponential OUTSIDE the Integral',
        arabicTitle: 'الحالة (B): الدالة الأسية خارج التكامل (الإزاحة للكل)',
        formula: 'F_2(s) = \\left.\\mathcal{L}\\left\\{\\int_0^t \\cos 2\\tau\\,d\\tau\\right\\}\\right|_{s \\to s+2} = \\left.\\frac{1}{s}\\left(\\frac{s}{s^2+4}\\right)\\right|_{s \\to s+2} = \\frac{1}{s+2}\\left(\\frac{s+2}{(s+2)^2+4}\\right)',
        explanation: 'First transform the integral to (1/s)[s/(s^2+4)], then shift EVERY s to (s+2).',
        arabicExplanation: 'نحول التكامل أولاً ثم نستبدل كل s بـ (s+2) بما في ذلك المقام الخارجي.'
      }
    ],
    finalAnswerLatex: 'F_1(s) = \\frac{s+2}{s\\big((s+2)^2+4\\big)} \\qquad \\text{vs.} \\qquad F_2(s) = \\frac{s+2}{(s+2)\\big((s+2)^2+4\\big)}',
    drillOptions: {
      methodChoices: [
        'Order of Operations: Inside shifts integrand only; Outside shifts 1/s as well',
        'Both give the exact same Laplace transform',
        'Second Shifting Theorem',
        'Division by t Rule'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'In L{∫_0^t e^{-2τ} cos(2τ) dτ}, does the outer 1/s factor get shifted to 1/(s+2)?',
      keyStepChoices: [
        'No! Because e^{-2τ} is INSIDE the integral, only cos(2τ) is shifted; the outer 1/s stays 1/s',
        'Yes, every s becomes s + 2',
        'It becomes e^{-2s} / s',
        'There is no 1/s factor'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'lap-note-ex3',
    numberLabel: 'Laplace Notes p.7 Ex.1',
    sourceExam: 'Laplace Master Summary Notes',
    sourceYear: 'Course Notes',
    sourceFileUrl: '/assets/aistudio/Laplace_3216e865.pdf',
    points: 4,
    category: Category.INVERSE_LAPLACE,
    subCategory: 'Laplace & Inverse Laplace',
    methodTag: 'Inverse Laplace via Integral Rule (1/s Factor)',
    arabicMethodTag: 'لابلاس العكسي باستخدام قاعدة التكامل عند وجود عامل 1/s',
    difficulty: 'Trick',
    problemLatex: 'F(s) = \\frac{s+2}{s^3+4s^2+5s}',
    problemStatement: 'Find the inverse Laplace transform of the function (from Laplace.pdf page 7):',
    visualRecognitionTrigger: 'Denominator s^3 + 4s^2 + 5s factors out an s: s(s^2 + 4s + 5) = s[(s+2)^2 + 1].',
    arabicVisualTrigger: 'المقام يحتوي على عامل مشترك s، وما تبقى s^2+4s+5 يصبح بإكمال المربع (s+2)^2 + 1.',
    examinerTrap: 'Remember you CANNOT pull e^{-2t} out of the whole fraction because the outer 1/s is NOT (s+2)! Instead, use the Inverse Integral Rule: L⁻¹{G(s)/s} = ∫_0^t g(τ) dτ!',
    arabicExaminerTrap: 'لا يجوز إخراج e^{-2t} من الكسر كله لأن الـ s الخارجية ليست (s+2)! بل نشطب 1/s ونضع تكاملاً من 0 إلى t للدالة العكسية.',
    secretShortcut: 'Factor out 1/s → replace 1/s with ∫_0^t (...) dτ → invert (s+2)/[(s+2)^2+1] = e^{-2τ}cos(τ).',
    steps: [
      {
        stepNumber: 1,
        title: 'Factor s from Denominator and Complete the Square',
        arabicTitle: 'سحب s كعامل مشترك من المقام وإكمال المربع',
        formula: 'F(s) = \\frac{1}{s}\\left(\\frac{s+2}{s^2+4s+5}\\right) = \\frac{1}{s}\\left(\\frac{s+2}{(s+2)^2+1}\\right)',
        explanation: 'Separate the 1/s factor from G(s) = (s+2)/[(s+2)^2+1].',
        arabicExplanation: 'نفصل العامل 1/s عن الكسر المزاح G(s).'
      },
      {
        stepNumber: 2,
        title: 'Apply L⁻¹{G(s)/s} = ∫_0^t g(τ) dτ',
        arabicTitle: 'تحويل العامل 1/s إلى تكامل من 0 إلى t',
        formula: 'g(t) = \\mathcal{L}^{-1}\\left\\{\\frac{s+2}{(s+2)^2+1}\\right\\} = e^{-2t}\\cos t \\implies f(t) = \\int_0^t e^{-2\\tau}\\cos(\\tau)\\,d\\tau',
        explanation: 'By the inverse integral rule, dividing by s in s-domain corresponds to integrating from 0 to t in t-domain.',
        arabicExplanation: 'حسب قاعدة لابلاس العكسي للتكامل، نحذف 1/s ونضع تكاملاً من 0 إلى t.'
      }
    ],
    finalAnswerLatex: 'f(t) = \\int_0^t e^{-2\\tau}\\cos(\\tau)\\,d\\tau = \\frac{1}{5}\\big[1 + e^{-2t}(\\sin t - 2\\cos t)\\big]',
    drillOptions: {
      methodChoices: [
        'Factor out 1/s and apply Inverse Integral Rule ∫_0^t e^{-2τ} cos(τ) dτ',
        'Pull e^{-2t} outside the entire expression immediately',
        'Second Shifting Theorem',
        'Derivative Rule (-t f(t))'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'How do you invert (1/s) · [(s + 2) / ((s + 2)² + 1)]?',
      keyStepChoices: [
        'Convert the outer 1/s into ∫_0^t (...) dτ, and invert the inner fraction to e^{-2τ} cos(τ)',
        'Pull e^{-2t} out of everything to get e^{-2t} ∫_0^t cos(τ) dτ',
        'Differentiate with respect to s',
        'Use u_2(t) cos(t - 2)'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'lap-note-ex4',
    numberLabel: 'Laplace Notes p.10 Ex.1',
    sourceExam: 'Laplace Master Summary Notes',
    sourceYear: 'Course Notes',
    sourceFileUrl: '/assets/aistudio/Laplace_3216e865.pdf',
    points: 4,
    category: Category.LAPLACE_THEOREMS,
    subCategory: 'Laplace & Inverse Laplace',
    methodTag: 'Combined First & Second Shift (e^t = e^a · e^{t-a})',
    arabicMethodTag: 'دمج الإزاحة الأولى والثانية (خدعة تعديل أس الدالة الأسية e^{t-3+3})',
    difficulty: 'Boss',
    problemLatex: 'f(t) = u_3(t)e^t\\cos(t-3) + u_6(t)',
    problemStatement: 'Find the Laplace transform of the function (from Laplace.pdf page 10 — same trick as Final 1 Q3b-iii):',
    visualRecognitionTrigger: 'Unit step u_3(t) multiplies cos(t-3), which is shifted, AND e^t, whose exponent t is NOT yet shifted to (t-3)!',
    arabicVisualTrigger: 'وجود u_3(t) مع cos(t-3) الجاهزة، ولكن الدالة الأسية e^t أسها t وليس (t-3)!',
    examinerTrap: 'You cannot apply u_3(t) while e^t has an unshifted t! Rewrite e^t = e^{t-3+3} = e^3 · e^{t-3} and pull the constant e^3 outside!',
    arabicExaminerTrap: 'لا يمكن تطبيق الإزاحة الثانية بينما أس الدالة الأسية هو t! نكتب e^t = e^{t-3+3} = e^3 · e^{t-3} ونخرج الثابت e^3 خارج التحويل!',
    secretShortcut: 'Whenever u_a(t) multiplies e^{kt}, factor out the constant e^{ka} and write e^{k(t-a)}!',
    steps: [
      {
        stepNumber: 1,
        title: 'Align e^t to e^3 · e^{t-3} and u_6(t) to u_6(t)·1',
        arabicTitle: 'تعديل أس الدالة الأسية ليصبح (t-3) وإخراج الثابت e^3',
        formula: 'f(t) = e^3 u_3(t)e^{t-3}\\cos(t-3) + u_6(t)',
        explanation: 'Write e^t = e^{(t-3)+3} = e^3 e^{t-3} so every t in the first term is (t-3).',
        arabicExplanation: 'نطرح ونجمع ٣ في الأس لنفصل الثابت e^3 عن الدالة المزاحة e^{t-3}.'
      },
      {
        stepNumber: 2,
        title: 'Apply Second Shift (u_3 → e^{-3s}) Then First Shift (s → s-1)',
        arabicTitle: 'تطبيق الإزاحة الثانية ثم الإزاحة الأولى',
        formula: 'F(s) = e^3 e^{-3s}\\mathcal{L}\\{e^t\\cos t\\} + \\frac{e^{-6s}}{s} = e^{3-3s}\\left(\\frac{s-1}{(s-1)^2+1}\\right) + \\frac{e^{-6s}}{s}',
        explanation: 'L{u_6(t)} = e^{-6s}/s, and L{e^t cos t} shifts s/(s^2+1) to (s-1)/[(s-1)^2+1].',
        arabicExplanation: 'نخرج e^{-3s} ثم نحول e^t cos t بإزاحة s إلى (s-1)، ولابلاس u_6(t) هو e^{-6s}/s.'
      }
    ],
    finalAnswerLatex: 'F(s) = e^{3(1-s)}\\left(\\frac{s-1}{(s-1)^2+1}\\right) + \\frac{e^{-6s}}{s}',
    drillOptions: {
      methodChoices: [
        'Rewrite e^t = e^3 · e^{t-3}, apply Second Shift (e^{-3s}), then First Shift (s → s-1)',
        'Apply First Shift only without e^3',
        'Apply Second Shift without changing e^t',
        'Multiplication by t Rule'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the essential algebraic trick before transforming u_a(t) e^t cos(t - a)?',
      keyStepChoices: [
        'Rewrite e^t = e^a · e^{t-a} and pull the constant e^a outside',
        'Replace cos(t - a) with cos(t) - cos(a)',
        'Differentiate with respect to s',
        'Divide by s'
      ],
      correctKeyStepIndex: 0
    }
  },

  // ============================================================================
  // CALCULUS, INTEGRATION & CONICS RESCUE SHEET
  // (MAY_2023_MATH2_FINAL_SOLVED_PROBLEMS.pdf & Appendencies_Mathematics.pdf)
  // ============================================================================
  {
    id: 'calc-app-1',
    numberLabel: 'Math2 Solved #17 & #18',
    sourceExam: 'Integration & Appendices Solved Bank',
    sourceYear: 'Math 2 / Appendices',
    sourceFileUrl: '/assets/aistudio/MAY_2023_MATH2__FINAL___SOLVED_PROBLEMS_bd406b83.pdf',
    points: 3,
    category: Category.VARIATION_OF_PARAMETERS,
    subCategory: 'Calculus & Integration Rescue',
    methodTag: 'Conjugate & Trig Identity Integrals (1/(1+cos x) & (sec x + tan x)²)',
    arabicMethodTag: 'تكاملات المرافق المثلثي والمتطابقات (تظهر في Variation of Parameters)',
    difficulty: 'Trick',
    problemLatex: '(A)\\; \\int \\frac{1}{1+\\cos x}\\,dx \\qquad \\text{and} \\qquad (B)\\; \\int (\\sec x + \\tan x)^2\\,dx',
    problemStatement: 'Evaluate the trigonometric integrals (Solved Problems #17 & #18, page 3):',
    visualRecognitionTrigger: '1/(1 + cos x) requires multiplying by the conjugate (1 - cos x); (sec x + tan x)^2 requires replacing tan^2 x with sec^2 x - 1.',
    arabicVisualTrigger: 'المقام (1 + cos x) يُضرب في المرافق (1 - cos x)، ومفكوك (sec x + tan x)^2 يحتاج استبدال tan^2 x بـ (sec^2 x - 1).',
    examinerTrap: 'Students know ∫ sec^2 x dx = tan x, but forget that ∫ tan^2 x dx is NOT sec x! You must ALWAYS replace tan^2 x with (sec^2 x - 1) before integrating!',
    arabicExaminerTrap: 'انتبه: تكامل sec^2 x هو tan x، أما تكامل tan^2 x فيجب استبداله بـ (sec^2 x - 1) ليعطي (tan x - x)!',
    secretShortcut: '1/(1+cos x) = (1-cos x)/sin^2 x = csc^2 x - csc x cot x → -cot x + csc x + C.',
    steps: [
      {
        stepNumber: 1,
        title: 'Part (A): Multiply 1/(1 + cos x) by Conjugate (1 - cos x)',
        arabicTitle: 'الجزء (A): الضرب في المرافق (1 - cos x) بسطاً ومقاماً',
        formula: '\\int \\frac{1-\\cos x}{1-\\cos^2 x}\\,dx = \\int \\frac{1-\\cos x}{\\sin^2 x}\\,dx = \\int (\\csc^2 x - \\csc x\\cot x)\\,dx = -\\cot x + \\csc x + C',
        explanation: '1 - cos^2 x = sin^2 x, which splits into csc^2 x and csc x cot x.',
        arabicExplanation: 'يتحول المقام إلى sin^2 x فنوزع البسط ليصبح csc^2 x - csc x cot x.'
      },
      {
        stepNumber: 2,
        title: 'Part (B): Expand (sec x + tan x)² and Replace tan² x = sec² x - 1',
        arabicTitle: 'الجزء (B): فك القوس التربيعي واستبدال tan² x بـ (sec² x - 1)',
        formula: '\\int (\\sec^2 x + \\tan^2 x + 2\\sec x\\tan x)\\,dx = \\int (2\\sec^2 x - 1 + 2\\sec x\\tan x)\\,dx = 2\\tan x - x + 2\\sec x + C',
        explanation: 'Since tan^2 x = sec^2 x - 1, sec^2 x + tan^2 x = 2 sec^2 x - 1.',
        arabicExplanation: 'نستبدل tan^2 x بـ (sec^2 x - 1) ثم نكامل كل حد مباشرة.'
      }
    ],
    finalAnswerLatex: '(A)\\; -\\cot x + \\csc x + C \\qquad | \\qquad (B)\\; 2\\tan x - x + 2\\sec x + C',
    drillOptions: {
      methodChoices: [
        'Multiply by Conjugate (1 - cos x) and Replace tan²x = sec²x - 1',
        'Integration by Parts',
        'Partial Fractions',
        'Trigonometric Substitution x = sin θ'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'How do you integrate ∫ tan²(x) dx (which appears frequently in Variation of Parameters)?',
      keyStepChoices: [
        'Rewrite tan²(x) = sec²(x) - 1, which integrates to tan(x) - x + C',
        'It integrates directly to sec²(x) + C',
        'It integrates to (1/3) tan³(x) + C',
        'Use Integration by Parts'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'calc-app-2',
    numberLabel: 'Math2 Solved #43–#48',
    sourceExam: 'Integration & Appendices Solved Bank',
    sourceYear: 'Math 2 / Appendices',
    sourceFileUrl: '/assets/aistudio/MAY_2023_MATH2__FINAL___SOLVED_PROBLEMS_bd406b83.pdf',
    points: 3,
    category: Category.LINEAR_FIRST_ORDER,
    subCategory: 'Calculus & Integration Rescue',
    methodTag: 'Logarithmic Derivative Rule ∫ [f\'(x)/f(x)] dx = ln|f(x)|',
    arabicMethodTag: 'قاعدة البسط مشتقة المقام (أساسية لحساب عامل التكامل μ)',
    difficulty: 'Core',
    problemLatex: '(A)\\; \\int \\frac{x^2-1}{3x^3-9x}\\,dx, \\qquad (B)\\; \\int \\frac{8}{x\\ln x}\\,dx, \\qquad (C)\\; \\int \\sec x\\,dx',
    problemStatement: 'Evaluate the logarithmic integrals (Solved Problems #44, #45, #48, page 8):',
    visualRecognitionTrigger: 'Fractions where the numerator is a constant multiple of the derivative of the denominator (or inner function).',
    arabicVisualTrigger: 'كسور يكون فيها البسط هو مشتقة المقام (أو يحتاج لضرب وقسمة في ثابت) فيعطي ln|المقام|.',
    examinerTrap: 'In ∫ sec x dx (which appears in almost every Variation of Parameters exam question!), multiply top and bottom by (sec x + tan x) so the numerator becomes sec^2 x + sec x tan x = d/dx (sec x + tan x)!',
    arabicExaminerTrap: 'تكامل sec x يتكرر في كل امتحانات Variation of Parameters! نضرب بسطاً ومقاماً في (sec x + tan x) فيصبح البسط مشتقة المقام: ln|sec x + tan x|.',
    secretShortcut: 'Memorize the 4 trig log integrals: ∫ tan x = ln|sec x|, ∫ cot x = ln|sin x|, ∫ sec x = ln|sec x + tan x|, ∫ csc x = ln|csc x - cot x|.',
    steps: [
      {
        stepNumber: 1,
        title: 'Part (A) & (B): Match the Derivative in the Numerator',
        arabicTitle: 'الجزء (A) و (B): ضبط البسط ليكون مشتقة المقام',
        formula: '\\int \\frac{x^2-1}{3x^3-9x}\\,dx = \\frac{1}{9}\\int \\frac{9(x^2-1)}{3x^3-9x}\\,dx = \\frac{1}{9}\\ln|3x^3-9x| + C, \\qquad \\int \\frac{8\\,(1/x)}{\\ln x}\\,dx = 8\\ln|\\ln x| + C',
        explanation: 'Since d/dx(3x^3 - 9x) = 9(x^2 - 1), multiply and divide by 9. For 8/(x ln x), 1/x is the derivative of ln x.',
        arabicExplanation: 'مشتقة المقام 3x^3-9x هي 9(x^2-1) فنضرب ونقسم على ٩. وفي الثاني (1/x) هي مشتقة ln x.'
      },
      {
        stepNumber: 2,
        title: 'Part (C): Standard Exam Integral ∫ sec x dx and ∫ csc x dx',
        arabicTitle: 'الجزء (C): التكامل الأشهر في الامتحانات لـ sec x و csc x',
        formula: '\\int \\sec x\\,dx = \\int \\frac{\\sec^2 x + \\sec x\\tan x}{\\sec x + \\tan x}\\,dx = \\ln|\\sec x + \\tan x| + C',
        explanation: 'Similarly, ∫ csc x dx = ln|csc x - cot x| + C (used in Final 2 Q1b and Final 6 Q2b).',
        arabicExplanation: 'وبالمثل فإن تكامل csc x هو ln|csc x - cot x| + C.'
      }
    ],
    finalAnswerLatex: '(A)\\; \\frac{1}{9}\\ln|3x^3-9x|+C \\quad | \\quad (B)\\; 8\\ln|\\ln x|+C \\quad | \\quad (C)\\; \\ln|\\sec x + \\tan x|+C',
    drillOptions: {
      methodChoices: [
        'Logarithmic Derivative Rule ∫ f\'(x)/f(x) dx = ln|f(x)| + C',
        'Integration by Parts',
        'Trigonometric Substitution',
        'Completing the Square'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What are the standard integrals of ∫ sec(x) dx and ∫ csc(x) dx?',
      keyStepChoices: [
        '∫ sec x dx = ln|sec x + tan x| + C   and   ∫ csc x dx = ln|csc x - cot x| + C',
        '∫ sec x dx = sec x tan x + C   and   ∫ csc x dx = -csc x cot x + C',
        '∫ sec x dx = tan²x + C   and   ∫ csc x dx = cot²x + C',
        '∫ sec x dx = 1/cos²x + C'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'calc-app-3',
    numberLabel: 'Math2 Solved #61–#69',
    sourceExam: 'Integration & Appendices Solved Bank',
    sourceYear: 'Math 2 / Appendices',
    sourceFileUrl: '/assets/aistudio/MAY_2023_MATH2__FINAL___SOLVED_PROBLEMS_bd406b83.pdf',
    points: 4,
    category: Category.FOURIER_SERIES,
    subCategory: 'Calculus & Integration Rescue',
    methodTag: 'Tabular Integration by Parts & Cyclic e^{ax}cos(bx)',
    arabicMethodTag: 'التكامل بالتجزيء بالجدول (لـ Fourier و Bernoulli) والتكامل الدوري',
    difficulty: 'Core',
    problemLatex: '(A)\\; \\int x^2\\sin 4x\\,dx \\qquad \\text{and} \\qquad (B)\\; \\int e^{3x}\\cos 2x\\,dx',
    problemStatement: 'Evaluate using the Tabular Method (Solved Problems #61 & #69, pages 13–15):',
    visualRecognitionTrigger: '(A) Polynomial × sin/cos/exp (differentiate polynomial to 0). (B) Exponential × sin/cos (cyclic 2-step table!).',
    arabicVisualTrigger: '(A) كثيرة حدود مضروبة في دالة مثلثية أو أسية (تنتهي بالصفر). (B) دالة أسية في مثلثية (تكرر نفسها بعد خطوتين).',
    examinerTrap: 'In Tabular IBP, signs ALWAYS start with + on the first diagonal (+, -, +, -). When integrating sin(4x) repeatedly, divide by 4 each time (-1/4 cos 4x → -1/16 sin 4x → +1/64 cos 4x).',
    arabicExaminerTrap: 'إشارات الجدول تبدأ دائماً بـ (+) ثم (-) ثم (+)، وعند تكامل sin(4x) نقسم على ٤ في كل سطر.',
    secretShortcut: 'For cyclic I = ∫ e^{ax} cos(bx) dx: I = [e^{ax}/(a^2+b^2)] (a cos bx + b sin bx) + C!',
    steps: [
      {
        stepNumber: 1,
        title: 'Part (A): 4-Row Tabular Method for ∫ x² sin(4x) dx',
        arabicTitle: 'الجزء (A): جدول التكامل بالتجزيء لـ x² sin(4x)',
        formula: '\\begin{array}{c|c|c} \\text{Sign} & u \\text{ (Diff)} & dv \\text{ (Int)} \\\\ \\hline + & x^2 & \\sin 4x \\\\ - & 2x & -\\frac{1}{4}\\cos 4x \\\\ + & 2 & -\\frac{1}{16}\\sin 4x \\\\ - & 0 & \\frac{1}{64}\\cos 4x \\end{array} \\implies -\\frac{x^2}{4}\\cos 4x + \\frac{x}{8}\\sin 4x + \\frac{1}{32}\\cos 4x + C',
        explanation: 'Multiply diagonally from each u row to the dv row one step below.',
        arabicExplanation: 'نضرب قطرياً مع مراعاة إشارة كل صف.'
      },
      {
        stepNumber: 2,
        title: 'Part (B): 2-Step Cyclic Table for I = ∫ e^{3x} cos(2x) dx',
        arabicTitle: 'الجزء (B): التكامل الدوري لـ e^{3x} cos(2x)',
        formula: 'I = \\frac{1}{2}e^{3x}\\sin 2x + \\frac{3}{4}e^{3x}\\cos 2x - \\frac{9}{4}I \\implies \\frac{13}{4}I = e^{3x}\\left(\\frac{1}{2}\\sin 2x + \\frac{3}{4}\\cos 2x\\right) \\implies I = \\frac{e^{3x}}{13}(2\\sin 2x + 3\\cos 2x) + C',
        explanation: 'After 2 rows, the horizontal product -(9/4) ∫ e^{3x} cos 2x dx reproduces I. Move -(9/4)I to the LHS to get (13/4)I.',
        arabicExplanation: 'بعد خطوتين يعود التكامل الأصلي مضروباً في -9/4 فننقله للطرف الأيسر ليصبح 13/4 I.'
      }
    ],
    finalAnswerLatex: '(A)\\; -\\frac{x^2}{4}\\cos 4x + \\frac{x}{8}\\sin 4x + \\frac{1}{32}\\cos 4x + C \\quad | \\quad (B)\\; \\frac{e^{3x}}{13}(2\\sin 2x + 3\\cos 2x) + C',
    drillOptions: {
      methodChoices: [
        'Tabular Integration by Parts (Differentiate polynomial to 0 / Cyclic 2-step for e^{ax}cos bx)',
        'Partial Fractions',
        'Trigonometric Substitution',
        'Logarithmic Derivative Rule'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'In the Tabular Method for ∫ x² sin(4x) dx, what are the 3 antiderivatives beneath sin(4x) in the right column?',
      keyStepChoices: [
        '-(1/4) cos 4x,   -(1/16) sin 4x,   +(1/64) cos 4x',
        '-4 cos 4x,   -16 sin 4x,   +64 cos 4x',
        '+(1/4) cos 4x,   -(1/16) sin 4x,   -(1/64) cos 4x',
        '-(1/4) cos 4x,   +(1/8) sin 4x,   -(1/12) cos 4x'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'calc-app-4',
    numberLabel: 'Math2 Solved #76–#90',
    sourceExam: 'Integration & Appendices Solved Bank',
    sourceYear: 'Math 2 / Appendices',
    sourceFileUrl: '/assets/aistudio/MAY_2023_MATH2__FINAL___SOLVED_PROBLEMS_bd406b83.pdf',
    points: 4,
    category: Category.SEPARATION,
    subCategory: 'Calculus & Integration Rescue',
    methodTag: 'Trig Powers (Odd vs. Even) & Trig Substitutions',
    arabicMethodTag: 'تكاملات الأسس المثلثية والتعويضات المثلثية للجذور',
    difficulty: 'Trick',
    problemLatex: '(A)\\; \\int \\sin^3 x\\,dx, \\qquad (B)\\; \\int \\sin^2 x\\cos^2 x\\,dx, \\qquad (C)\\; \\int \\frac{\\sqrt{4-x^2}}{x^2}\\,dx',
    problemStatement: 'Evaluate the trigonometric power and substitution integrals (Solved Problems #76, #80, #83, pages 17–20):',
    visualRecognitionTrigger: 'Odd power sin^3 x → split one sin x dx; Even powers sin^2 x cos^2 x → double-angle; Radical √(a^2 - x^2) → x = a sin θ.',
    arabicVisualTrigger: 'الأس الفردي نفصل منه أس ١، والأس الزوجي بقانون ضعف الزاوية، والجذر √(a^2-x^2) بالتعويض x = a sin θ.',
    examinerTrap: 'For ∫ sin^3 x dx, NEVER use half-angle! Peel off one sin x dx and replace sin^2 x = 1 - cos^2 x with u = cos x. For √(a^2 - x^2), use x = a sin θ; for √(a^2 + x^2), use x = a tan θ; for √(x^2 - a^2), use x = a sec θ.',
    arabicExaminerTrap: 'في الأس الفردي مثل sin^3 x نفكها إلى (1 - cos^2 x) sin x dx! واحفظ مثلثات التعويض الثلاثة للجذور.',
    secretShortcut: 'sin x cos x = (1/2) sin 2x, so sin^2 x cos^2 x = (1/4) sin^2(2x) = (1/8)(1 - cos 4x).',
    steps: [
      {
        stepNumber: 1,
        title: 'Part (A) & (B): Odd vs. Even Trigonometric Powers',
        arabicTitle: 'الجزء (A) و (B): تكامل الأسس الفردية والزوجية للدوال المثلثية',
        formula: '\\int \\sin^3 x\\,dx = \\int (1-\\cos^2 x)\\sin x\\,dx = -\\cos x + \\frac{1}{3}\\cos^3 x + C, \\quad \\int \\sin^2 x\\cos^2 x\\,dx = \\frac{1}{8}\\int(1-\\cos 4x)dx = \\frac{1}{32}(4x - \\sin 4x) + C',
        explanation: 'Odd power splits off sin x dx; even powers use double-angle identities.',
        arabicExplanation: 'الأس الفردي يُحل بفصل sin x dx، والأس الزوجي يُحل بمتطابقات ضعف الزاوية.'
      },
      {
        stepNumber: 2,
        title: 'Part (C): Trig Substitution x = 2 sin θ for √(4 - x²)',
        arabicTitle: 'الجزء (C): التعويض المثلثي x = 2 sin θ للجذر √(4 - x²)',
        formula: 'x = 2\\sin\\theta, \\; dx = 2\\cos\\theta\\,d\\theta \\implies \\int \\frac{2\\cos\\theta}{4\\sin^2\\theta}(2\\cos\\theta\\,d\\theta) = \\int \\cot^2\\theta\\,d\\theta = \\int(\\csc^2\\theta - 1)d\\theta = -\\cot\\theta - \\theta + C = -\\frac{\\sqrt{4-x^2}}{x} - \\sin^{-1}\\left(\\frac{x}{2}\\right) + C',
        explanation: 'From the right triangle with sin θ = x/2, adjacent side is √(4-x^2), so cot θ = √(4-x^2)/x.',
        arabicExplanation: 'من المثلث القائم حيث sin θ = x/2 يكون الضلع المجاور √(4-x^2) ومنه cot θ = √(4-x^2)/x.'
      }
    ],
    finalAnswerLatex: '(A)\\; -\\cos x + \\frac{1}{3}\\cos^3 x + C \\quad | \\quad (B)\\; \\frac{x}{8} - \\frac{\\sin 4x}{32} + C \\quad | \\quad (C)\\; -\\frac{\\sqrt{4-x^2}}{x} - \\sin^{-1}\\left(\\frac{x}{2}\\right) + C',
    drillOptions: {
      methodChoices: [
        'Peel off sin x for Odd Powers; Double-Angle for Even Powers; x = a sin θ for √(a²-x²)',
        'Integration by Parts for all three',
        'Partial Fractions',
        'Laplace Transform'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'Which trigonometric substitution is used for integrals containing √(a² - x²), √(a² + x²), and √(x² - a²)?',
      keyStepChoices: [
        '√(a²-x²) → x = a sin θ;   √(a²+x²) → x = a tan θ;   √(x²-a²) → x = a sec θ',
        '√(a²-x²) → x = a tan θ;   √(a²+x²) → x = a sin θ;   √(x²-a²) → x = a cos θ',
        'Use u = x² for all three',
        'Use x = a cosh θ for all three'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'calc-app-5',
    numberLabel: 'Math2 Solved #95–#119',
    sourceExam: 'Integration & Appendices Solved Bank',
    sourceYear: 'Math 2 / Appendices',
    sourceFileUrl: '/assets/aistudio/MAY_2023_MATH2__FINAL___SOLVED_PROBLEMS_bd406b83.pdf',
    points: 4,
    category: Category.BASIC_ODE,
    subCategory: 'Calculus & Integration Rescue',
    methodTag: 'Improper Integrals, Area Between Curves & Volume of Revolution',
    arabicMethodTag: 'التكاملات المعتلة والمساحة بين المنحنيات وحجم الدوران',
    difficulty: 'Core',
    problemLatex: '(A)\\; \\int_4^{\\infty}\\frac{dx}{(x-1)^3} = \\frac{1}{18}, \\quad (B)\\; A = \\int_{-1}^2\\big[(4-x^2)-(2-x)\\big]dx = \\frac{9}{2}, \\quad (C)\\; V = \\pi\\int_0^1\\big[x^2 - (x^2)^2\\big]dx = \\frac{2\\pi}{15}',
    problemStatement: 'Master the 3 Definite Integral Applications (Solved Problems #95, #103, #117, pages 25–38):',
    visualRecognitionTrigger: 'Infinite limit ∞ → Improper integral limit; Enclosed region → ∫ (upper - lower) dx; Revolved around x-axis → Washer method π ∫ (R^2 - r^2) dx.',
    arabicVisualTrigger: 'حدود لا نهائية (تكامل معتل)، مساحة محصورة (العلوي - السفلي)، حجم دوران حول محور x (طريقة الحلقات π(R^2 - r^2)).',
    examinerTrap: 'In Volume of Revolution (Washer Method), you subtract the SQUARES π ∫ ([f(x)]^2 - [g(x)]^2) dx — NEVER square the difference [f(x) - g(x)]^2!',
    arabicExaminerTrap: 'في حجم الدوران حول محور x، نطرح مربعي الدالتين [f(x)]^2 - [g(x)]^2 ولا نربع الفرق بينهما!',
    secretShortcut: 'p-test for improper integrals: ∫_a^∞ dx/(x-c)^p converges if p > 1 (value = 1/[(p-1)(a-c)^{p-1}]) and diverges if p ≤ 1!',
    steps: [
      {
        stepNumber: 1,
        title: 'Part (A): Improper Integral Convergence (#95 vs #96)',
        arabicTitle: 'الجزء (A): اختبار تقارب التكامل المعتل (#95 مقابل #96)',
        formula: '\\int_4^{\\infty} (x-1)^{-3}dx = \\lim_{t\\to\\infty}\\left[\\frac{-1}{2(x-1)^2}\\right]_4^t = 0 + \\frac{1}{2(3)^2} = \\frac{1}{18} \\quad (\\text{Converges}), \\quad \\text{whereas } \\int_4^{\\infty}\\frac{dx}{x-1} = \\infty \\text{ (Diverges)}',
        explanation: 'Power p = 3 > 1 converges to 1/18; power p = 1 gives ln(∞) = ∞ so it diverges.',
        arabicExplanation: 'عندما يكون أس المقام أكبر من ١ يتقارب التكامل، وعندما يساوي ١ يعطي ln(∞) فيتباعد.'
      },
      {
        stepNumber: 2,
        title: 'Part (B) & (C): Area Between Curves (#103) & Washer Volume (#117)',
        arabicTitle: 'الجزء (B) و (C): المساحة بين منحنيين وحجم الدوران',
        formula: 'A = \\int_a^b (y_{\\text{upper}} - y_{\\text{lower}})\\,dx, \\qquad V = \\pi\\int_a^b \\Big([R(x)]^2 - [r(x)]^2\\Big)\\,dx',
        explanation: 'Find intersection bounds by setting f(x) = g(x) first!',
        arabicExplanation: 'نوجد حدود التكامل بمساواة الدالتين f(x) = g(x) أولاً.'
      }
    ],
    finalAnswerLatex: 'A = \\int_a^b (f(x)-g(x))dx = \\frac{9}{2}, \\qquad V = \\pi\\int_a^b \\big([f(x)]^2 - [g(x)]^2\\big)dx = \\frac{2\\pi}{15}',
    drillOptions: {
      methodChoices: [
        'Set f(x)=g(x) for bounds; Area = ∫(upper-lower)dx; Volume = π∫(R²-r²)dx',
        'Volume = π∫(R - r)² dx',
        'Area = ∫(f(x)² - g(x)²) dx',
        'Improper integral converges for p ≤ 1'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the correct Washer Method formula for rotating the region between y = f(x) (outer) and y = g(x) (inner) about the x-axis?',
      keyStepChoices: [
        'V = π ∫_a^b ( [f(x)]² - [g(x)]² ) dx',
        'V = π ∫_a^b ( f(x) - g(x) )² dx',
        'V = ∫_a^b ( [f(x)]² - [g(x)]² ) dx  (without π)',
        'V = 2π ∫_a^b ( f(x) - g(x) ) dx'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'calc-app-6',
    numberLabel: 'Math2 Solved #120–#133',
    sourceExam: 'Integration & Appendices Solved Bank',
    sourceYear: 'Math 2 / Appendices',
    sourceFileUrl: '/assets/aistudio/MAY_2023_MATH2__FINAL___SOLVED_PROBLEMS_bd406b83.pdf',
    points: 4,
    category: Category.BASIC_ODE,
    subCategory: 'Calculus & Integration Rescue',
    methodTag: 'Conic Sections: Ellipse & Parabola Standard Forms',
    arabicMethodTag: 'القطوع المخروطية: القطع الناقص والقطع المكافئ بإكمال المربع',
    difficulty: 'Core',
    problemLatex: '(A)\\; \\frac{(x-3)^2}{100} + \\frac{(y+2)^2}{36} = 1 \\qquad \\text{and} \\qquad (B)\\; y^2 + 2y + 12x - 23 = 0',
    problemStatement: 'Find the center, foci, and vertices of the Ellipse (#120) and vertex, focus, and directrix of the Parabola (#127, pages 39–49):',
    visualRecognitionTrigger: '(A) Sum of two squared terms with different positive denominators = Ellipse (a^2 > b^2, c^2 = a^2 - b^2). (B) Only one variable squared (y^2) = Parabola ((y-k)^2 = 4p(x-h)).',
    arabicVisualTrigger: '(A) مجموع مربعين بمقامين مختلفين = قطع ناقص. (B) متغير واحد فقط متربع = قطع مكافئ.',
    examinerTrap: 'In an Ellipse, c^2 = a^2 - b^2 (MINUS!). When completing the square on 2x^2 + 3y^2 + 8x - 6y + 5 = 0 (#133), factor out 2 and 3 FIRST, so adding 4 inside 2(x^2+4x+4) adds 2×4 = 8 to the right-hand side!',
    arabicExaminerTrap: 'في القطع الناقص c^2 = a^2 - b^2 بالطرح! وعند إكمال المربع في 2(x^2+4x+4) تذكر إضافة 2×4 = 8 للطرف الأيمن!',
    secretShortcut: 'Ellipse: largest denominator is ALWAYS a^2. Parabola (y-k)^2 = 4p(x-h): opens right if p > 0, left if p < 0, Focus = (h+p, k), Directrix: x = h - p.',
    steps: [
      {
        stepNumber: 1,
        title: 'Part (A): Ellipse (#120) Center, Foci, and Vertices',
        arabicTitle: 'الجزء (A): مركز وبؤرتا ورؤوس القطع الناقص (#120)',
        formula: '(h,k) = (3,-2), \\quad a = 10, \\; b = 6 \\implies c = \\sqrt{100-36} = 8 \\implies \\text{Foci: } (3\\pm 8, -2) = (11,-2), (-5,-2)',
        explanation: 'Major axis is horizontal (under x). Vertices are (3±10, -2) = (13,-2) and (-7,-2). Major axis length = 2a = 20, minor = 2b = 12.',
        arabicExplanation: 'بما أن المقام الأكبر (١٠٠) تحت x فالمحور الأكبر أفقي، والبعد البؤري c = √(100-36) = 8.'
      },
      {
        stepNumber: 2,
        title: 'Part (B): Parabola (#127) via Completing the Square in y',
        arabicTitle: 'الجزء (B): إكمال المربع للقطع المكافئ (#127)',
        formula: '(y^2 + 2y + 1) = -12x + 23 + 1 \\implies (y+1)^2 = -12(x-2) \\implies \\text{Vertex } (h,k) = (2,-1), \\; 4p = -12 \\implies p = -3',
        explanation: 'Focus is (h+p, k) = (2-3, -1) = (-1,-1) and Directrix is x = h - p = 2 - (-3) = 5.',
        arabicExplanation: 'الرأس (2,-1) وبما أن 4p = -12 فإن p = -3، فتكون البؤرة (h+p, k) = (-1,-1) والدليل x = h-p = 5.'
      }
    ],
    finalAnswerLatex: '\\text{Ellipse Foci: } (11,-2), (-5,-2) \\quad | \\quad \\text{Parabola: Vertex } (2,-1), \\text{ Focus } (-1,-1), \\text{ Directrix } x = 5',
    drillOptions: {
      methodChoices: [
        'Ellipse: c² = a² - b²; Parabola: Complete Square to (y-k)² = 4p(x-h) with Focus (h+p, k)',
        'Ellipse: c² = a² + b²',
        'Parabola: Focus is (h, k+p) when y is squared',
        'Directrix is x = h + p'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'For the parabola (y + 1)² = -12(x - 2), what are the vertex (h, k), parameter p, focus, and directrix?',
      keyStepChoices: [
        'Vertex (2, -1),  p = -3,  Focus (-1, -1),  Directrix x = 5',
        'Vertex (-2, 1),  p = -3,  Focus (-5, 1),  Directrix x = 1',
        'Vertex (2, -1),  p = -12, Focus (-10, -1), Directrix x = 14',
        'Vertex (2, -1),  p = -3,  Focus (2, -4),  Directrix y = 2'
      ],
      correctKeyStepIndex: 0
    }
  }
];
