import { Category, StandaloneVideo, VideoPlaylist } from '../types';

export const GOOGLE_DRIVE_FOLDER_URL = 'https://drive.google.com/drive/folders/1YuiYGfCHnpSbFodKaeZ80Uwesjbf8swC';
export const GOOGLE_DRIVE_FOLDER_ID = '1YuiYGfCHnpSbFodKaeZ80Uwesjbf8swC';

export interface DrAshrafLecture {
  id: string;
  title: string;
  youtubeId: string;
  youtubeUrl: string;
  category: Category;
  author: string;
}

export const DR_ASHRAF_LECTURES: DrAshrafLecture[] = [
  {
    id: 'ashraf_w1',
    title: 'MTHN103 Week1',
    youtubeId: 'ENV1avFK2O4',
    youtubeUrl: 'https://www.youtube.com/watch?v=ENV1avFK2O4',
    category: Category.SEPARATION,
    author: 'Modern Academy for Engineering & Technology',
  },
  {
    id: 'ashraf_w2',
    title: 'MTHN103 Week2',
    youtubeId: 'WcUGeP54ptg',
    youtubeUrl: 'https://www.youtube.com/watch?v=WcUGeP54ptg',
    category: Category.EXACT_EQUATIONS,
    author: 'Modern Academy for Engineering & Technology',
  },
  {
    id: 'ashraf_w3',
    title: 'MTHN103 Week3',
    youtubeId: 'NJTrSSLDt90',
    youtubeUrl: 'https://www.youtube.com/watch?v=NJTrSSLDt90',
    category: Category.HIGHER_ORDER_HOMOGENEOUS,
    author: 'Modern Academy for Engineering & Technology',
  },
  {
    id: 'ashraf_w4',
    title: 'MTHN103 Week4',
    youtubeId: 'dE7ph6pOor8',
    youtubeUrl: 'https://www.youtube.com/watch?v=dE7ph6pOor8',
    category: Category.LAPLACE_TRANSFORMS,
    author: 'Modern Academy for Engineering & Technology',
  },
  {
    id: 'ashraf_w5',
    title: 'MTHN103 Week5',
    youtubeId: '9dqOFDaBoQo',
    youtubeUrl: 'https://www.youtube.com/watch?v=9dqOFDaBoQo',
    category: Category.FOURIER_SERIES,
    author: 'Modern Academy for Engineering & Technology',
  },
];

export interface EngSamirTopic {
  id: string;
  title: string;
  arabicTitle: string;
  lectureNumber: number;
  category: Category;
  description: string;
  arabicDescription: string;
  keyTopics: string[];
  formulaPreview?: string;
}

export const ENG_SAMIR_TOPICS: EngSamirTopic[] = [
  {
    id: 'samir_lec1',
    title: 'Lecture 1: ODE Foundations, Separable & Homogeneous Equations',
    arabicTitle: 'المحاضرة الأولى: أساسيات المعادلات التفاضلية، وفصل المتغيرات، والمعادلات المتجانسة',
    lectureNumber: 1,
    category: Category.SEPARATION,
    description: 'Order, degree, and linearity definitions, separation of variables with factoring shortcuts, reducible forms, and homogeneous substitution with angle ratios.',
    arabicDescription: 'شرح الرتبة والدرجة والخطية، وطرق فصل المتغيرات والتعويض z = ax+by+c، وحل المعادلات المتجانسة بالتعويض y = ux ونسب الزوايا.',
    keyTopics: ['Order & Degree Classification', 'Separation of Variables', 'Homogeneous Substitution (y = ux)', 'Trigonometric & Exponential Tricks'],
    formulaPreview: '\\frac{dy}{dx} = g(x)h(y) \\implies \\int \\frac{dy}{h(y)} = \\int g(x)\\,dx',
  },
  {
    id: 'samir_lec2',
    title: 'Lecture 2: Exact Differential Equations, Linear First-Order & Bernoulli',
    arabicTitle: 'المحاضرة الثانية: المعادلات التامة (Exact)، والخطية (Linear)، ومعادلة برنولي (Bernoulli)',
    lectureNumber: 2,
    category: Category.EXACT_EQUATIONS,
    description: 'Exactness condition with mixed partial derivatives, potential function integration without repeating terms, integrating factor method, and Bernoulli non-linear substitution.',
    arabicDescription: 'اختبار المعادلة التامة بالتفاضلات الجزئية، والتكامل المباشر بدون تكرار الحدود، والمعادلات الخطية ومعامل التكامل، وتحويل معادلة برنولي بالتعويض z = y^(1-n).',
    keyTopics: ['Exactness Test ∂M/∂y = ∂N/∂x', 'Non-Repeating Terms Potential Function', 'Linear Integrating Factor I(x) = e^∫P dx', 'Bernoulli Substitution z = y^(1-n)'],
    formulaPreview: 'y \\cdot e^{\\int P(x)\\,dx} = \\int Q(x) e^{\\int P(x)\\,dx}\\,dx + C',
  },
  {
    id: 'samir_lec3',
    title: 'Lecture 3: Higher-Order Linear Homogeneous ODEs & Reduction of Order',
    arabicTitle: 'المحاضرة الثالثة: المعادلات الخطية من الرتب العليا المتجانسة وتخفيض الرتبة',
    lectureNumber: 3,
    category: Category.HIGHER_ORDER_HOMOGENEOUS,
    description: 'Auxiliary characteristic equations, real distinct, repeated, and complex conjugate roots, and Abel-Lagrange reduction of order when one solution is known.',
    arabicDescription: 'المعادلة المساعدة، وحالات الجذور الحقيقية والمتكررة والمركبة، وطريقة تخفيض الرتبة عند معرفة حل متجانس أول y1.',
    keyTopics: ['Characteristic Equation Roots', 'Euler Complex Roots (e^αx [c1 cos βx + c2 sin βx])', 'Reduction of Order Formula', 'Wronskian Test of Independence'],
    formulaPreview: 'y_2(x) = y_1(x) \\int \\frac{e^{-\\int P(x)\\,dx}}{[y_1(x)]^2}\\,dx',
  },
  {
    id: 'samir_lec4',
    title: 'Lecture 4: Non-Homogeneous ODEs & Undetermined Coefficients',
    arabicTitle: 'المحاضرة الرابعة: المعادلات غير المتجانسة وطريقة المعاملات غير المحددة وقاعدة التعديل',
    lectureNumber: 4,
    category: Category.UNDETERMINED_COEFFS,
    description: 'Particular integral guessing table for polynomial, exponential, and sinusoidal driving forces, with resonance modification rules (multiplying by x^k).',
    arabicDescription: 'جدول تخمين الحل الخاص yp لكثيرات الحدود والدوال الأسية والمثلثية، وقاعدة التعديل عند تكرار الحد مع الحل المتجانس (الضرب في x).',
    keyTopics: ['Particular Solution yp Table', 'Resonance Rule (x^k modification)', 'Superposition Principle', 'Determining Constants by Substitution'],
    formulaPreview: 'y = y_h + y_p, \\quad y_p = x^k (A x^2 + B x + C)',
  },
  {
    id: 'samir_lec5',
    title: 'Lecture 5: Variation of Parameters (Lagrange) & Euler-Cauchy ODEs',
    arabicTitle: 'المحاضرة الخامسة: طريقة تغير الثوابت (لاجرانج) ومعادلة أويلر والمؤثر التفاضلي θ',
    lectureNumber: 5,
    category: Category.VARIATION_OF_PARAMETERS,
    description: 'Universal particular integral using Wronskian determinants and Lagrange integrals, variable-coefficient Euler-Cauchy substitution x = e^z and differential operator theta.',
    arabicDescription: 'الحل العام للحل الخاص باستخدام محددات فرونسكي وتكاملات لاجرانج، وحل معادلة أويلر ذات المعاملات المتغيرة بالتحويل x = e^z والمؤثر التفاضلي θ.',
    keyTopics: ['Wronskian Determinant W(y1, y2)', 'Lagrange Integrals u1, u2', 'Euler-Cauchy Form x^n d^n y/dx^n', 'Theta Operator θ = d/dz'],
    formulaPreview: 'y_p = -y_1 \\int \\frac{y_2 f(x)}{W}\\,dx + y_2 \\int \\frac{y_1 f(x)}{W}\\,dx',
  },
  {
    id: 'samir_lec6',
    title: 'Lecture 6: Laplace Transforms & First Shifting Theorem',
    arabicTitle: 'المحاضرة السادسة: تحويلات لابلاس ونظرية الإزاحة الأولى وإكمال المربع',
    lectureNumber: 6,
    category: Category.LAPLACE_TRANSFORMS,
    description: 'Laplace definition integrals, standard functions table, First Shifting Theorem for exponential damping, and completing the square for irreducible quadratic denominators.',
    arabicDescription: 'تكامل تعريف تحويل لابلاس، وجدول التحويلات القياسية، ونظرية الإزاحة الأولى L{e^at f(t)} = F(s-a)، وطريقة إكمال المربع في معكوس لابلاس.',
    keyTopics: ['Standard Laplace Table', 'First Shifting Theorem s -> s-a', 'Trigonometric & Hyperbolic Transforms', 'Completing the Square in Denominators'],
    formulaPreview: '\\mathcal{L}\\{e^{at} f(t)\\} = F(s - a), \\quad \\mathcal{L}\\{\\cos(at)\\} = \\frac{s}{s^2 + a^2}',
  },
  {
    id: 'samir_lec7',
    title: 'Lecture 7: Second Shifting Theorem & Heaviside Step Functions',
    arabicTitle: 'المحاضرة السابعة: نظرية الإزاحة الثانية، دالة الخطوة هيفيزيد، وتحويل تكاملات لابلاس',
    lectureNumber: 7,
    category: Category.LAPLACE_THEOREMS,
    description: 'Unit step function u_a(t) conversion of piecewise functions, Second Shifting Theorem time delay, and integration in time domain corresponding to division by s.',
    arabicDescription: 'دالة الخطوة لـ هيفيزيد u(t-a) لكتابة الدوال المجزأة، ونظرية الإزاحة الثانية في الزمن L{f(t-a)u(t-a)} = e^-as F(s)، والقسمة على s عند تكامل الدالة.',
    keyTopics: ['Heaviside Unit Step u(t-a)', 'Second Shift Theorem e^-as F(s)', 'Piecewise to Unit Step Conversion', 'Integration in Time (Division by s)'],
    formulaPreview: '\\mathcal{L}\\{f(t-a) u_a(t)\\} = e^{-as} F(s), \\quad \\mathcal{L}\\left\\{\\int_0^t f(\\tau)\\,d\\tau\\right\\} = \\frac{F(s)}{s}',
  },
  {
    id: 'samir_lec8',
    title: 'Lecture 8: Calculus of Transforms, Log Derivatives & ODE Solutions',
    arabicTitle: 'المحاضرة الثامنة: تفاضل وتكامل تحويل لابلاس، تريك اللوغاريتمات، وحل المعادلات التفاضلية',
    lectureNumber: 8,
    category: Category.LAPLACE_ODE,
    description: 'Multiplication by t corresponds to -d/ds, division by t corresponds to ∫F(u)du, logarithmic and inverse trigonometric inverse Laplace tricks, and solving Initial Value Problems.',
    arabicDescription: 'الضرب في t يقابله التفاضل -d/ds، والقسمة على t يقابلها التكامل، وتريك إيجاد معكوس الدوال اللوغاريتمية والمعكوسة المثلثية، وحل مسائل القيم الابتدائية (IVPs).',
    keyTopics: ['Multiplication by t (-d/ds)', 'Division by t (Integration from s to ∞)', 'Log Inversion Trick L^-1{ln(...)}', 'Solving ODEs with Initial Values'],
    formulaPreview: '\\mathcal{L}\\{t^n f(t)\\} = (-1)^n \\frac{d^n}{ds^n}F(s), \\quad f(t) = -\\frac{1}{t}\\mathcal{L}^{-1}\\{F\'(s)\\}',
  },
  {
    id: 'samir_lec9',
    title: 'Lecture 9: Fourier Series, Parity Symmetry & Half-Range Expansions',
    arabicTitle: 'المحاضرة التاسعة: متسلسلات فورييه، الدوال الزوجية والفردية، ومتسلسلات نصف المدى',
    lectureNumber: 9,
    category: Category.FOURIER_SERIES,
    description: 'Euler-Fourier coefficient integrals, even and odd function simplifications over symmetric intervals [-L, L], Tabular Integration by Parts (DI Method), and Half-Range Sine & Cosine expansions.',
    arabicDescription: 'تكاملات معاملات أويلر وفورييه a0 و an و bn، وتبسيط الدوال الزوجية والفردية على الفترات المتماثلة، وطريقة التكامل بالجدول DI، ومتسلسلات جيب وجيب التمام لنصف المدى.',
    keyTopics: ['Euler-Fourier Coefficients', 'Even & Odd Parity Simplifications', 'Tabular Integration by Parts (DI Method)', 'Half-Range Sine & Cosine Expansions'],
    formulaPreview: 'f(x) = \\frac{a_0}{2} + \\sum_{n=1}^\\infty \\left(a_n \\cos\\frac{n\\pi x}{L} + b_n \\sin\\frac{n\\pi x}{L}\\right)',
  },
  {
    id: 'samir_revisions',
    title: 'Comprehensive Exam Revisions & Solved Past Papers',
    arabicTitle: 'المراجعات الشاملة وحل نماذج امتحانات الميدتيرم والفاينل',
    lectureNumber: 10,
    category: Category.ALL,
    description: 'Full solutions for past midterms and final exams, exam-focused tricks, common pitfalls to avoid, and step-by-step problem walkthroughs by Eng. Samir.',
    arabicDescription: 'حلول كاملة ومفصلة لنماذج امتحانات الميدتيرم والفاينل للسنوات السابقة، وتوضيح أهم أفكار الامتحانات والأخطاء الشائعة بشرح باشمهندس سمير.',
    keyTopics: ['Past Midterm Exam Solutions', 'Past Final Exam Solutions', 'Exam Traps & Quick Shortcuts', 'Step-by-Step Scoring Guide'],
    formulaPreview: 'y(x) = y_h(x) + y_p(x) \\implies \\text{Final General Solution}',
  },
];

// Compatibility definitions for legacy types if imported
export const PLAYLISTS_DATA: VideoPlaylist[] = [
  {
    id: 'pl_ashraf_taha',
    title: 'شرح د. أشرف طه - Modern Academy',
    category: Category.ALL,
    channel: 'Modern Academy for Engineering & Technology',
    description: 'تسجيلات محاضرات الرياضيات ٣ للدكتور أشرف طه على YouTube.',
    playlistUrl: DR_ASHRAF_LECTURES[0].youtubeUrl,
    embedId: DR_ASHRAF_LECTURES[0].youtubeId,
    items: DR_ASHRAF_LECTURES.map((lec) => ({
      id: lec.id,
      title: lec.title,
      duration: 'محاضرة كاملة',
      isCompleted: false,
    })),
  },
  {
    id: 'pl_samir_complete',
    title: 'شرح باشمهندس سمير - كورس ومحاضرات الرياضيات ٣ كاملة',
    category: Category.ALL,
    channel: 'شرح باشمهندس سمير (Eng. Samir)',
    description: 'المجلد الرسمي على Google Drive الذي يحتوي على جميع تسجيلات وفيديوهات شرح باشمهندس سمير لمقرر الرياضيات ٣ (المعادلات التفاضلية وتحويلات لابلاس ومتسلسلات فورييه).',
    playlistUrl: GOOGLE_DRIVE_FOLDER_URL,
    embedId: GOOGLE_DRIVE_FOLDER_ID,
    items: ENG_SAMIR_TOPICS.map((t) => ({
      id: t.id,
      title: `${t.title} (${t.arabicTitle})`,
      duration: 'محاضرة كاملة',
      problemFormula: t.formulaPreview,
      isCompleted: false,
    })),
  },
];

export const STANDALONE_VIDEOS_DATA: StandaloneVideo[] = DR_ASHRAF_LECTURES.map((lec) => ({
  id: lec.id,
  title: lec.title,
  category: lec.category,
  channel: lec.author,
  embedId: lec.youtubeId,
  description: `${lec.title} - ${lec.author}`,
}));
