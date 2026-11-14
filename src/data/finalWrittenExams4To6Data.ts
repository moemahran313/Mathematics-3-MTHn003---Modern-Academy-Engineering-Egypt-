import { Category } from '../types';
import { MasterExamQuestion } from './masterExamBankData';

export const FINAL_EXAMS_4_TO_6_QUESTIONS: MasterExamQuestion[] = [
  // ============================================================================
  // FINAL EXAM 4: SUMMER 2017–2018 (MTH203, 14/8/2018 — Final_4___1__ea25ee9a.pdf)
  // ============================================================================
  {
    id: 'fin4-q1a',
    numberLabel: 'Final 4 (Summer 2017–18) Q1(a)',
    sourceExam: 'Final 4: Summer 2017–2018 Final',
    sourceYear: '2017–2018',
    sourceFileUrl: '/assets/aistudio/Final_4___1__ea25ee9a.pdf',
    points: 2,
    category: Category.SEPARATION,
    subCategory: 'First-Order ODE',
    methodTag: 'Separable ODE (Factoring Common e^{-y})',
    arabicMethodTag: 'فصل المتغيرات (أخذ e^{-y} عامل مشترك)',
    difficulty: 'Core',
    problemLatex: '\\frac{dy}{dx} = e^{-y} + x^2 e^{-y}',
    problemStatement: 'Solve the following differential equation (Solved in Ans.Final_4 page 1):',
    visualRecognitionTrigger: 'Common exponential factor e^{-y} in both terms on the RHS.',
    arabicVisualTrigger: 'تكرار e^{-y} في حدي الطرف الأيمن، نسحبها عامل مشترك وعند نقلها للطرف الأيسر تصبح e^{+y} dy.',
    examinerTrap: 'When dividing by e^{-y} to move it to the LHS, its exponent flips sign to become e^{+y} dy!',
    arabicExaminerTrap: 'عند قسمة الطرفين على e^{-y} تنتقل إلى البسط في الطرف الأيسر بإشارة موجبة للأس e^{+y} dy.',
    secretShortcut: 'dy/dx = e^{-y}(1 + x^2) ⇒ ∫ e^y dy = ∫ (1 + x^2) dx.',
    steps: [
      {
        stepNumber: 1,
        title: 'Factor Out e^{-y} and Separate Variables',
        arabicTitle: 'أخذ e^{-y} كعامل مشترك وفصل المتغيرات',
        formula: '\\frac{dy}{dx} = e^{-y}(1 + x^2) \\implies e^y\\,dy = (1 + x^2)\\,dx',
        explanation: 'Multiply both sides by e^y dx.',
        arabicExplanation: 'نضرب الطرفين في e^y dx.'
      },
      {
        stepNumber: 2,
        title: 'Integrate Both Sides',
        arabicTitle: 'إجراء التكامل المباشر للطرفين',
        formula: '\\int e^y\\,dy = \\int (1 + x^2)\\,dx \\implies e^y = x + \\frac{1}{3}x^3 + C',
        explanation: 'Integrate term by term.',
        arabicExplanation: 'نكامل الطرفين مباشرة.'
      }
    ],
    finalAnswerLatex: 'e^y = x + \\frac{1}{3}x^3 + C',
    drillOptions: {
      methodChoices: [
        'Factor out e^{-y}(1 + x²) → Separable ODE: ∫ e^y dy = ∫ (1 + x²) dx',
        'Linear First-Order ODE',
        'Exact ODE',
        'Bernoulli ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the general solution of dy/dx = e^{-y} + x² e^{-y}?',
      keyStepChoices: [
        'e^y = x + (1/3)x³ + C',
        '-e^{-y} = x + (1/3)x³ + C',
        'y = ln(1 + x²) + C',
        'e^y = 2x + C'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'fin4-q1b',
    numberLabel: 'Final 4 (Summer 2017–18) Q1(b)',
    sourceExam: 'Final 4: Summer 2017–2018 Final',
    sourceYear: '2017–2018',
    sourceFileUrl: '/assets/aistudio/Final_4___1__ea25ee9a.pdf',
    points: 4,
    category: Category.HOMOGENEOUS,
    subCategory: 'First-Order ODE',
    methodTag: 'Homogeneous ODE (Perfect Square (v + 2)²)',
    arabicMethodTag: 'معادلة متجانسة تتحول إلى مربع كامل (z + 2)²',
    difficulty: 'Core',
    problemLatex: '\\frac{dy}{dx} = \\frac{y^2}{x^2} + \\frac{5y}{x} + 4',
    problemStatement: 'Solve the following differential equation (Solved in Ans.Final_4 page 1):',
    visualRecognitionTrigger: 'Every term on the RHS is already a function of the ratio (y/x)!',
    arabicVisualTrigger: 'الطرف الأيمن مكتوب بالكامل بدلالة النسبة (y/x) جاهزاً للتعويض z = y/x!',
    examinerTrap: 'When subtracting z from 5z on the RHS, you get z^2 + 4z + 4, which is a PERFECT SQUARE (z + 2)^2! Do NOT try partial fractions on a repeated factor — integrate (z + 2)^{-2} directly using the power rule!',
    arabicExaminerTrap: 'بعد طرح z من الطرفين يصبح الطرف الأيمن z^2 + 4z + 4 وهو مربع كامل (z + 2)^2! نرفعه للبسط بأس (-2) ونكامله بقاعدة الأسس مباشرة.',
    secretShortcut: 'z + x z\' = z^2 + 5z + 4 ⇒ x z\' = (z + 2)^2 ⇒ ∫ (z + 2)^{-2} dz = -(z + 2)^{-1}.',
    steps: [
      {
        stepNumber: 1,
        title: 'Substitute z = y/x (so dy/dx = z + x dz/dx)',
        arabicTitle: 'التعويض بـ z = y/x و dy/dx = z + x dz/dx',
        formula: 'z + x\\frac{dz}{dx} = z^2 + 5z + 4 \\implies x\\frac{dz}{dx} = z^2 + 4z + 4 = (z + 2)^2',
        explanation: 'Subtract z from both sides and factor the perfect square trinomial.',
        arabicExplanation: 'نطرح z من الطرفين فنحصل على المربع الكامل (z + 2)^2.'
      },
      {
        stepNumber: 2,
        title: 'Separate Variables and Integrate (z + 2)^{-2}',
        arabicTitle: 'فصل المتغيرات وتكامل القوس المرفوع لأس (-2)',
        formula: '\\int (z + 2)^{-2}\\,dz = \\int \\frac{dx}{x} \\implies -(z + 2)^{-1} = \\ln|x| + C \\implies -\\left(\\frac{y}{x} + 2\\right)^{-1} = \\ln|x| + C',
        explanation: 'Use the power rule ∫ u^{-2} du = -u^{-1} and replace z = y/x.',
        arabicExplanation: 'نكامل بزيادة الأس ١ والقسمة على الأس الجديد (-1) ثم نرجع z = y/x.'
      }
    ],
    finalAnswerLatex: '-\\left(\\frac{y}{x} + 2\\right)^{-1} = \\ln|x| + C \\quad \\left(\\text{or } -\\frac{x}{y+2x} = \\ln|x| + C\\right)',
    drillOptions: {
      methodChoices: [
        'Homogeneous ODE (z = y/x) → x dz/dx = (z + 2)² → ∫ (z + 2)⁻² dz = ∫ dx/x',
        'Exact ODE',
        'Bernoulli ODE',
        'Linear First-Order ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'After substituting z = y/x into dy/dx = (y/x)² + 5(y/x) + 4, what does x dz/dx simplify to?',
      keyStepChoices: [
        'z² + 4z + 4 = (z + 2)²',
        'z² + 5z + 4 = (z + 4)(z + 1)',
        'z² + 6z + 4',
        '(z - 2)²'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'fin4-q1c',
    numberLabel: 'Final 4 (Summer 2017–18) Q1(c)',
    sourceExam: 'Final 4: Summer 2017–2018 Final',
    sourceYear: '2017–2018',
    sourceFileUrl: '/assets/aistudio/Final_4___1__ea25ee9a.pdf',
    points: 4,
    category: Category.EXACT_EQUATIONS,
    subCategory: 'First-Order ODE',
    methodTag: 'Exact ODE (Slash Duplicate xy²)',
    arabicMethodTag: 'معادلة تفاضلية تامة (شطب الحد المكرر xy²)',
    difficulty: 'Core',
    problemLatex: '(y^2 + x^2)\\,dx + (2xy)\\,dy = 0',
    problemStatement: 'Solve the following differential equation (Solved in Ans.Final_4 page 1):',
    visualRecognitionTrigger: 'M dx + N dy = 0 form where ∂M/∂y = 2y = ∂N/∂x.',
    arabicVisualTrigger: 'معادلة على الصورة التفاضلية M dx + N dy = 0 حيث M_y = 2y = N_x فهي تامة مباشرة (رغم أنها متجانسة أيضاً، لكن حلها كتامة يستغرق ١٠ ثوانٍ فقط!).',
    examinerTrap: 'Although y^2 + x^2 and 2xy both have degree 2 (Homogeneous), solving it as an Exact ODE takes 10 seconds instead of 5 minutes!',
    arabicExaminerTrap: 'رغم أن جميع الحدود من الدرجة الثانية (متجانسة)، إلا أن اختبار التمام M_y = N_x = 2y يحلها في ١٠ ثوانٍ فقط بدلاً من ٥ دقائق!',
    secretShortcut: 'ALWAYS test M_y = N_x first when an equation is written as M dx + N dy = 0!',
    steps: [
      {
        stepNumber: 1,
        title: 'Test Exactness: M_y = N_x = 2y',
        arabicTitle: 'اختبار التمام بحساب M_y و N_x',
        formula: '\\frac{\\partial M}{\\partial y} = 2y, \\qquad \\frac{\\partial N}{\\partial x} = 2y \\implies \\text{Exact!}',
        explanation: 'The equation is Exact as written.',
        arabicExplanation: 'المعادلة تامة لأن المشتقتين الجزئيتين متساويتان وتساويان 2y.'
      },
      {
        stepNumber: 2,
        title: 'Integrate M dx and N dy and Slash Duplicate xy²',
        arabicTitle: 'تكامل M و N وشطب الحد المكرر xy²',
        formula: '\\int (y^2 + x^2)\\,dx + \\int \\cancel{2xy}\\,dy = C \\implies xy^2 + \\frac{1}{3}x^3 = C',
        explanation: '∫ 2xy dy = xy^2 duplicates the xy^2 from ∫ y^2 dx.',
        arabicExplanation: 'تكامل 2xy بالنسبة لـ y يعطي xy^2 وهو مكرر فيُشطب.'
      }
    ],
    finalAnswerLatex: 'xy^2 + \\frac{1}{3}x^3 = C',
    drillOptions: {
      methodChoices: [
        'Exact ODE (since ∂M/∂y = ∂N/∂x = 2y → xy² + (1/3)x³ = C in 10 seconds!)',
        'Bernoulli ODE',
        'Linear First-Order ODE',
        'Variation of Parameters'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'Why is Exact ODE the fastest method for (y² + x²) dx + (2xy) dy = 0?',
      keyStepChoices: [
        'Because ∂M/∂y = 2y = ∂N/∂x, giving xy² + (1/3)x³ = C in one line!',
        'Because it is not homogeneous',
        'Because it requires an integrating factor',
        'Because variables separate directly'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'fin4-q1d',
    numberLabel: 'Final 4 (Summer 2017–18) Q1(d)',
    sourceExam: 'Final 4: Summer 2017–2018 Final',
    sourceYear: '2017–2018',
    sourceFileUrl: '/assets/aistudio/Final_4___1__ea25ee9a.pdf',
    points: 4,
    category: Category.BERNOULLI,
    subCategory: 'First-Order ODE',
    methodTag: 'Bernoulli ODE (n = 5, 1 - n = -4)',
    arabicMethodTag: 'معادلة برنولي (n = 5 مع قانون الاختصار المباشر)',
    difficulty: 'Core',
    problemLatex: '\\frac{dy}{dx} - \\frac{1}{2x}y = 5x^2 y^5',
    problemStatement: 'Solve the following differential equation (Solved in Ans.Final_4 page 1):',
    visualRecognitionTrigger: 'Standard form y\' + P(x)y = Q(x)y^5 with n = 5.',
    arabicVisualTrigger: 'معادلة برنولي في الصورة القياسية مع وجود y^5 في الطرف الأيمن (n = 5).',
    examinerTrap: 'With n = 5, 1 - n = -4. Multiplying P(x) = -1/(2x) by (-4) gives P*(x) = +2/x, so μ(x) = e^{2 ln x} = x^2!',
    arabicExaminerTrap: 'عند ضرب P(x) = -1/(2x) في (1 - n = -4) تصبح الإشارة موجبة +2/x وعامل التكامل هو μ = x^2.',
    secretShortcut: '1 - n = -4 ⇒ P* = 2/x ⇒ μ = x^2, and Q* = (-4)(5x^2) = -20x^2.',
    steps: [
      {
        stepNumber: 1,
        title: 'Identify n = 5 and Compute P*(x), Q*(x), and μ(x)',
        arabicTitle: 'تحديد n = 5 وحساب عامل التكامل μ(x) = x²',
        formula: '1 - n = -4 \\implies P^*(x) = (-4)\\left(-\\frac{1}{2x}\\right) = \\frac{2}{x}, \\quad Q^*(x) = (-4)(5x^2) = -20x^2, \\quad \\mu(x) = e^{\\int \\frac{2}{x}dx} = x^2',
        explanation: 'Use the Bernoulli multiplier 1 - n = -4.',
        arabicExplanation: 'نضرب في (-4) فنجد عامل التكامل μ = x^2.'
      },
      {
        stepNumber: 2,
        title: 'Write the General Solution for y^{-4}',
        arabicTitle: 'التعويض في قانون الحل العام لـ y^{-4}',
        formula: 'y^{-4} = x^{-2}\\left[\\int x^2(-20x^2)\\,dx + C\\right] = x^{-2}\\left[-\\frac{20}{5}x^5 + C\\right] = -4x^3 + \\frac{C}{x^2}',
        explanation: '∫ -20x^4 dx = -4x^5, and dividing by x^2 gives -4x^3 + C/x^2.',
        arabicExplanation: 'تكامل -20x^4 يعطي -4x^5 وبقسمته على x^2 نحصل على -4x^3 + C/x^2.'
      }
    ],
    finalAnswerLatex: 'y^{-4} = -4x^3 + \\frac{C}{x^2}',
    drillOptions: {
      methodChoices: [
        'Bernoulli ODE with n = 5 (1 - n = -4, μ(x) = x²)',
        'Homogeneous ODE',
        'Exact ODE',
        'Separable ODE'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the general solution of dy/dx - (1/2x)y = 5x² y⁵?',
      keyStepChoices: [
        'y⁻⁴ = -4x³ + C / x²',
        'y⁻⁵ = -4x³ + C / x²',
        'y⁴ = 4x³ + C x²',
        'y⁻⁴ = -20x⁵ + C'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'fin4-q2a-b-c-d',
    numberLabel: 'Final 4 (Summer 2017–18) Q2(a,b,c,d)',
    sourceExam: 'Final 4: Summer 2017–2018 Final',
    sourceYear: '2017–2018',
    sourceFileUrl: '/assets/aistudio/Final_4___1__ea25ee9a.pdf',
    points: 16,
    category: Category.REDUCTION_OF_ORDER,
    subCategory: 'Higher-Order ODE',
    methodTag: 'All 4 Higher-Order Methods (Repeated Root, Undetermined Coeffs, Wronskian tan x, Reduction of Order)',
    arabicMethodTag: 'الأفكار الأربع للمشتقات العليا في Final 4 (جذر مكرر، معاملات، فرونسكي tan x، اختزال الرتبة)',
    difficulty: 'Trick',
    problemLatex: '\\text{(a) } y\'\'\'-4y\'\'+5y\'-2y=0 \\quad \\text{(b) } y\'\'+3y\'-10y=2e^{3x} \\quad \\text{(c) } y\'\'+y=\\tan x \\quad \\text{(d) } y\'\'-3y\'+2y=e^x \\; (y_1=e^{2x})',
    problemStatement: 'Find the general solution of the four differential equations in Final 4 Question 2 (Solved in Ans.Final_4 pages 1–3):',
    visualRecognitionTrigger: '(a) Also on Sheet HO #5! (b) Exponential RHS 2e^{3x}. (c) RHS = tan x → Wronskian. (d) Also on Sheet HO #6 (given y_1 = e^{2x})!',
    arabicVisualTrigger: 'أربعة أسئلة كلاسيكية (اثنان منها نقلا حرفياً إلى شيت المراجعة HO #5 و HO #6!).',
    examinerTrap: 'HANDWRITTEN NOTE WARNING (Ans.Final_4 p.1): In Q2(a), m^3 - 4m^2 + 5m - 2 = (m - 1)^2(m - 2) = 0 has a REPEATED root m = 1, 1 and m = 2! In the handwritten sheet, the student wrote only y = C_1 e^{2x} + C_2 e^x and forgot the third term + C_3 x e^x! A 3rd-order ODE MUST have 3 constants!',
    arabicExaminerTrap: 'تحذير هام من خطأ الورقة اليدوية (Ans.Final_4 ص١): في Q2a المعادلة من الرتبة الثالثة وجذورها m = 2 و m = 1, 1 (مكرر)! الطالب كتب ثابتين فقط ونسي الحد الثالث C_3 x e^x! وفي Q2c تكامل sin^2 x / cos x يكتب (1 - cos^2 x)/cos x = sec x - cos x.',
    secretShortcut: 'In (c) y\'\' + y = tan x: A(x) = ∫ -sin^2 x / cos x dx = ∫ (cos x - sec x) dx = sin x - ln|sec x + tan x|, and B(x) = ∫ sin x dx = -cos x!',
    steps: [
      {
        stepNumber: 1,
        title: 'Part (a) & Part (b): Auxiliary Roots & Undetermined Coefficients',
        arabicTitle: 'الجزء (a) و (b): الجذور المكررة والمعاملات غير المعينة',
        formula: '\\text{(a) } (m-1)^2(m-2) = 0 \\implies y = (C_1 + C_2 x)e^x + C_3 e^{2x}, \\qquad \\text{(b) } m = 2, -5,\\; y_p = Ae^{3x} \\implies 8A = 2 \\implies y = C_1 e^{2x} + C_2 e^{-5x} + \\frac{1}{4}e^{3x}',
        explanation: 'In (b), plugging y_p = Ae^{3x} into y\'\' + 3y\' - 10y gives (9 + 9 - 10)A = 8A = 2 ⇒ A = 1/4.',
        arabicExplanation: 'في (a) الجذر 1 مكرر مرتين، وفي (b) نعوض بـ Ae^{3x} فنجد A = 1/4.'
      },
      {
        stepNumber: 2,
        title: 'Part (c): Variation of Parameters for y\'\' + y = tan(x)',
        arabicTitle: 'الجزء (c): تغيير البارامترات للمعادلة y\'\' + y = tan(x)',
        formula: 'A(x) = \\int -\\frac{\\sin^2 x}{\\cos x}\\,dx = \\int (\\cos x - \\sec x)\\,dx = \\sin x - \\ln|\\sec x + \\tan x|, \\quad B(x) = \\int \\sin x\\,dx = -\\cos x',
        explanation: 'Multiply A(x) by cos x and B(x) by sin x: y_p = -cos(x)ln|sec x + tan x|.',
        arabicExplanation: 'عند ضرب A(x) في cos x و B(x) في sin x تختصر sin x cos x مع -sin x cos x!'
      },
      {
        stepNumber: 3,
        title: 'Part (d): Reduction of Order for y\'\' - 3y\' + 2y = e^x Given y_1 = e^{2x}',
        arabicTitle: 'الجزء (d): اختزال الرتبة بمعلومية y_1 = e^{2x}',
        formula: 'y = ve^{2x} \\implies e^{2x}(v\'\' + v\') = e^x \\implies z\' + z = e^{-x}, \\; \\mu = e^x \\implies z = xe^{-x} + C_1 e^{-x} \\implies y = e^{2x}v = -xe^x + K_1 e^x + K_2 e^{2x}',
        explanation: 'Integrating z = v\' by parts gives v = -(x+1)e^{-x} - C_1 e^{-x} + C_2, then multiply by e^{2x}.',
        arabicExplanation: 'نفرض y = v e^{2x} فنحصل على z\' + z = e^{-x}، نكاملها ثم نضرب في e^{2x}.'
      }
    ],
    finalAnswerLatex: '\\text{(a) } (C_1+C_2x)e^x+C_3e^{2x} \\; | \\; \\text{(b) } C_1e^{2x}+C_2e^{-5x}+\\frac{1}{4}e^{3x} \\; | \\; \\text{(c) } C_1\\cos x+C_2\\sin x-\\cos x\\ln|\\sec x+\\tan x| \\; | \\; \\text{(d) } K_1e^x+K_2e^{2x}-xe^x',
    drillOptions: {
      methodChoices: [
        '(a) (C_1+C_2x)e^x + C_3e^{2x}; (c) Rewrite sin²x/cos x = (1-cos²x)/cos x = sec x - cos x',
        '(a) Write only 2 constants C_1 e^{2x} + C_2 e^x',
        '(c) Use Undetermined Coefficients on tan(x)',
        '(d) Use Homogeneous y = vx'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'In Variation of Parameters for y\'\' + y = tan(x), how do you integrate A(x) = -∫ (sin²x / cos x) dx?',
      keyStepChoices: [
        'Replace sin²x with 1 - cos²x to get -∫ (sec x - cos x) dx = sin x - ln|sec x + tan x|',
        'Use u = cos x to get ln|cos x|',
        'Integrate top and bottom separately',
        'It equals -tan²x / 2'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'fin4-q3-q4-q5',
    numberLabel: 'Final 4 (Summer 2017–18) Q3, Q4 & Q5',
    sourceExam: 'Final 4: Summer 2017–2018 Final',
    sourceYear: '2017–2018',
    sourceFileUrl: '/assets/aistudio/Final_4___1__ea25ee9a.pdf',
    points: 40,
    category: Category.LAPLACE_THEOREMS,
    subCategory: 'Laplace & Inverse Laplace',
    methodTag: 'Laplace Transforms + Inverse Laplace + Fourier Sine (x² on [0,π]) + Legendre',
    arabicMethodTag: 'شامل لابلاس ولابلاس العكسي ومتسلسلة فورييه وليجندر في Final 4',
    difficulty: 'Trick',
    problemLatex: '\\text{Q3(b): } t^5+7e^{6t}+8\\cosh 2t,\\; \\int_0^t e^{\\tau}\\sin 4\\tau\\,d\\tau,\\; u_3(t)\\sin^2(t-3),\\; \\frac{\\sin t}{t} \\quad | \\quad \\text{Q4(a): } \\ln\\left(\\frac{s^2+16}{(s-1)^2}\\right),\\; \\frac{s}{s^2+10s+8},\\; e^{-4s}\\frac{3s}{s^2+11}',
    problemStatement: 'Solve Questions 3(b), 4(a,b), and 5(b,c) in Final 4 (Solved in Ans.Final_4 page 4):',
    visualRecognitionTrigger: 'Covers the complete second half of the Summer 2018 Final Exam.',
    arabicVisualTrigger: 'تغطية شاملة للنصف الثاني من امتحان فاينل صيف ٢٠١٨ مع تصحيح الهفوات البسيطة في الحل اليدوي.',
    examinerTrap: 'HANDWRITTEN NOTE WARNINGS (Ans.Final_4 p.4): (1) In Q3(b)(iv), L{(sin t)/t} = [tan⁻¹ z]_s^∞ = π/2 - tan⁻¹(s) (the student wrote "∞ - tan⁻¹ s" instead of π/2 - tan⁻¹ s!). (2) In Q4(a)(ii), for s/(s^2+10s+8) = [(s+5)-5]/[(s+5)^2-17], the student forgot the "-5" term in the numerator when shifting!',
    arabicExaminerTrap: 'تصحيح خطأين في الورقة اليدوية (Ans.Final_4 ص٤): (١) قيمة tan⁻¹(∞) هي π/2 وليست ∞! (٢) في s/(s^2+10s+8) عند إكمال المربع إلى (s+5)^2 - 17 يجب كتابة البسط (s+5) - 5 وعدم نسيان الحد الثاني (-5/√17 sinh √17 t)!',
    secretShortcut: 'In Q4(a)(i), use log power law BEFORE differentiating: ln[(s^2+16)/(s-1)^2] = ln(s^2+16) - 2 ln(s-1)!',
    steps: [
      {
        stepNumber: 1,
        title: 'Q3(b) [i–iv]: Forward Laplace Transforms',
        arabicTitle: 'السؤال الثالث (b): تحويلات لابلاس الأربعة',
        formula: '\\text{(i) } \\frac{120}{s^6}+\\frac{7}{s-6}+\\frac{8s}{s^2-4}, \\quad \\text{(ii) } \\frac{4}{s((s-1)^2+16)}, \\quad \\text{(iii) } e^{-3s}\\left(\\frac{1}{2s}-\\frac{s}{2(s^2+4)}\\right), \\quad \\text{(iv) } \\frac{\\pi}{2}-\\tan^{-1}(s)',
        explanation: 'In (iii), pull out e^{-3s} first, then transform sin^2(t) = ½(1 - cos 2t).',
        arabicExplanation: 'في (iii) نخرج e^{-3s} أولاً ثم نحول sin^2(t)، وفي (iv) نضع tan⁻¹(∞) = π/2.'
      },
      {
        stepNumber: 2,
        title: 'Q4(a) [i–iii]: Inverse Laplace Transforms',
        arabicTitle: 'السؤال الرابع (a): تحويلات لابلاس العكسية الثلاثة',
        formula: '\\text{(i) } \\frac{2e^t - 2\\cos 4t}{t}, \\quad \\text{(ii) } e^{-5t}\\left(\\cosh\\sqrt{17}t - \\frac{5}{\\sqrt{17}}\\sinh\\sqrt{17}t\\right), \\quad \\text{(iii) } 3u_4(t)\\cos\\big(\\sqrt{11}(t-4)\\big)',
        explanation: 'In (ii), align numerator s = (s+5) - 5 over (s+5)^2 - 17.',
        arabicExplanation: 'في (ii) نضبط البسط (s+5) - 5 ليعطي cosh و sinh معاً.'
      },
      {
        stepNumber: 3,
        title: 'Q4(b) Fourier Sine of x² on [0,π] & Q5(b,c) Legendre Integrals',
        arabicTitle: 'السؤال الرابع (b) متسلسلة الجيب لـ x² والسؤال الخامس تكاملات ليجندر',
        formula: '\\text{Q4(b): } b_n = \\frac{2}{\\pi}\\left[\\frac{-\\pi^2(-1)^n}{n} + \\frac{2((-1)^n-1)}{n^3}\\right], \\qquad \\text{Q5(b): } \\int_{-1}^1 xP_1\\,dx = \\frac{2}{3}, \\quad \\text{Q5(c): } \\int_{-1}^1 xP_2 P_3\\,dx = \\frac{3}{5}\\cdot\\frac{2}{7} = \\frac{6}{35}',
        explanation: 'For Q5(c), put n = 2 in the recurrence relation: (3/5) ∫_{-1}^1 P_3^2 dx = (3/5)(2/7) = 6/35.',
        arabicExplanation: 'في Q5(c) نضع n=2 في علاقة التكرار فنحصل على (3/5) × (2/7) = 6/35.'
      }
    ],
    finalAnswerLatex: '\\text{Q4a(i): } \\frac{2e^t-2\\cos 4t}{t} \\; | \\; \\text{(ii): } e^{-5t}\\left(\\cosh\\sqrt{17}t-\\frac{5}{\\sqrt{17}}\\sinh\\sqrt{17}t\\right) \\; | \\; \\text{Q5(b,c): } \\frac{2}{3},\\; \\frac{6}{35}',
    drillOptions: {
      methodChoices: [
        'Use tan⁻¹(∞) = π/2 in Q3b(iv), and align s = (s+5) - 5 in Q4a(ii)',
        'Write tan⁻¹(∞) = ∞',
        'Omit the sinh term in Q4a(ii)',
        'Expand P_2 and P_3 manually in Q5(c)'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the value of ∫_{-1}^1 x P_2(x) P_3(x) dx using the Legendre recurrence relation?',
      keyStepChoices: [
        '[(2 + 1) / (2(2) + 1)] · [2 / (2(3) + 1)] = (3/5) · (2/7) = 6/35',
        '0 by orthogonality',
        '2/5 · 2/7 = 4/35',
        '2/7'
      ],
      correctKeyStepIndex: 0
    }
  },

  // ============================================================================
  // FINAL EXAM 5 & 6: FALL 2019–2020 (MTHN103, 29/12/2019, 2 Hours)
  // (Final_5___1__2a029b34.pdf, Final_6___1__2a029b34.pdf & Ans.Final_6)
  // ============================================================================
  {
    id: 'fin5-q1a',
    numberLabel: 'Final 5/6 (Fall 2019–20) Q1(a)',
    sourceExam: 'Final 5/6: Fall 2019–2020 Final (2hr)',
    sourceYear: '2019–2020',
    sourceFileUrl: '/assets/aistudio/Final_5___1__2a029b34.pdf',
    points: 2,
    category: Category.SEPARATION,
    subCategory: 'First-Order ODE',
    methodTag: 'Disguised Logarithm Cancellation Trap (ln(x/y) + ln y = ln x)',
    arabicMethodTag: 'فصل المتغيرات المتخفي (خدعة اختصار اللوغاريتمات ln(x/y) + ln y = ln x)',
    difficulty: 'Trick',
    problemLatex: 'y\\frac{dy}{dx} = \\frac{1}{x}\\left(\\ln\\frac{x}{y} + \\ln y\\right)',
    problemStatement: 'Solve the following differential equation (Solved in Ans.Final_6 page 1):',
    visualRecognitionTrigger: 'Looks like a Homogeneous ODE because of ln(x/y), but has + ln(y) right next to it!',
    arabicVisualTrigger: 'تبدو وكأنها متجانسة بسبب وجود ln(x/y)، ولكن بجوارها (+ ln y) الذي يختصر (- ln y) فوراً!',
    examinerTrap: 'BRILLIANT EXAMINER DECOY! Students see ln(x/y) and try Homogeneous substitution y = vx! Wait — expand ln(x/y) + ln(y) = ln(x) - ln(y) + ln(y) = ln(x)! The y on the RHS disappears completely, leaving a 10-second Separable ODE: y dy = (ln x / x) dx! Also watch Ans.Final_6 p.1: ∫ y dy = ½y^2 and ∫ (ln x)(1/x) dx = ½(ln x)^2 (NOT ln(x^{-2}))!',
    arabicExaminerTrap: 'خدعة عبقرية من واضع الامتحان! بفك اللوغاريتم ln(x/y) = ln x - ln y تختصر (-ln y) مع (+ln y) ويتبقى ln x فقط! (انتبه في الحل اليدوي ص١: تكامل (ln x / x) dx هو ½(ln x)^2 لأنه دالة في مشتقتها!).',
    secretShortcut: 'ln(x/y) + ln y = ln x ⇒ ∫ y dy = ∫ (ln x)(1/x) dx ⇒ ½y^2 = ½(ln x)^2 + C!',
    steps: [
      {
        stepNumber: 1,
        title: 'Simplify the Logarithm Bracket Using Log Laws',
        arabicTitle: 'تبسيط القوس اللوغاريتمي بخواص اللوغاريتمات',
        formula: '\\ln\\left(\\frac{x}{y}\\right) + \\ln y = \\ln x - \\cancel{\\ln y} + \\cancel{\\ln y} = \\ln x \\implies y\\frac{dy}{dx} = \\frac{\\ln x}{x}',
        explanation: 'Using log(a/b) = log a - log b eliminates y from the right-hand side completely!',
        arabicExplanation: 'بفك لوغاريتم القسمة إلى طرح تختصر ln y تماماً وتتحول المعادلة إلى فصل متغيرات بسيط.'
      },
      {
        stepNumber: 2,
        title: 'Separate Variables and Integrate Using ∫ u du (u = ln x)',
        arabicTitle: 'فصل المتغيرات والتكامل بقاعدة دالة في مشتقتها (u = ln x)',
        formula: '\\int y\\,dy = \\int (\\ln x)\\left(\\frac{1}{x}\\right)dx \\implies \\frac{1}{2}y^2 = \\frac{1}{2}(\\ln x)^2 + C',
        explanation: 'Recall Math 2 Solved #31 (page 5): ∫ (ln x / x) dx = ½(ln x)^2 + C because d/dx(ln x) = 1/x!',
        arabicExplanation: 'تكامل (ln x)(1/x) هو دالة مرفوعة لأس ١ مضروبة في مشتقتها (1/x) فيعطي ½(ln x)^2 + C.'
      }
    ],
    finalAnswerLatex: '\\frac{1}{2}y^2 = \\frac{1}{2}(\\ln x)^2 + C \\quad \\left(\\text{or } y^2 = (\\ln x)^2 + K\\right)',
    drillOptions: {
      methodChoices: [
        'Use Log Law ln(x/y) + ln y = ln x → Separable ODE: ∫ y dy = ∫ (ln x / x) dx',
        'Homogeneous Substitution y = vx',
        'Bernoulli ODE',
        'Integration by Parts on ln(x/y)'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What does ln(x/y) + ln(y) simplify to, and what is ∫ (ln x / x) dx?',
      keyStepChoices: [
        'It simplifies to ln(x), and ∫ (ln x)(1/x) dx = (1/2)(ln x)² + C',
        'It simplifies to ln(x), and ∫ (ln x / x) dx = ln(x⁻²) + C',
        'It requires y = vx',
        'It simplifies to ln(x + y)'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'fin5-q1b-c-d',
    numberLabel: 'Final 5/6 (Fall 2019–20) Q1(b,c,d)',
    sourceExam: 'Final 5/6: Fall 2019–2020 Final (2hr)',
    sourceYear: '2019–2020',
    sourceFileUrl: '/assets/aistudio/Final_5___1__2a029b34.pdf',
    points: 8,
    category: Category.REDUCIBLE_SEPARATION,
    subCategory: 'First-Order ODE',
    methodTag: 'Bernoulli (n=7) + Exact ODE + Linear Substitution z = x - y',
    arabicMethodTag: 'برنولي (n=7) + معادلة تامة + التعويض الخطي z = x - y',
    difficulty: 'Core',
    problemLatex: '\\text{(b) } x\\frac{dy}{dx} - y = xy^7 \\qquad \\text{(c) } (3x^2 + y\\cos x)dx + (\\sin x - 4y^3)dy = 0 \\qquad \\text{(d) } \\frac{dy}{dx} = \\frac{x-y+1}{x-y-1}',
    problemStatement: 'Solve Question 1(b), 1(c), and 1(d) in Final 5/6 (Solved in Ans.Final_6 page 1):',
    visualRecognitionTrigger: '(b) Bernoulli n=7 (divide by x first!). (c) Exact ODE M_y = cos x = N_x. (d) Repeated linear block (x - y) in numerator and denominator!',
    arabicVisualTrigger: '(b) برنولي بعد القسمة على x، (c) معادلة تامة M_y = N_x = cos x، (d) تكرار المقدار (x - y) بسطاً ومقاماً.',
    examinerTrap: 'In (d), let z = x - y ⇒ dy/dx = 1 - dz/dx. Then dz/dx = 1 - (z+1)/(z-1) = [(z-1) - (z+1)]/(z-1) = -2/(z-1)! The z in the numerator cancels out!',
    arabicExaminerTrap: 'في (d) نفرض z = x - y فتكون dy/dx = 1 - dz/dx، وعند توحيد المقامات تختصر z في البسط ويتبقى dz/dx = -2/(z-1)!',
    secretShortcut: 'In (d): ∫ (z - 1) dz = ∫ -2 dx ⇒ ½(x - y - 1)^2 = -2x + C (or ½z^2 - z = -2x + C).',
    steps: [
      {
        stepNumber: 1,
        title: 'Part (b): Bernoulli ODE with n = 7 (1 - n = -6)',
        arabicTitle: 'الجزء (b): معادلة برنولي بعد القسمة على x (1 - n = -6)',
        formula: 'y\' - \\frac{1}{x}y = y^7 \\implies P^* = \\frac{6}{x}, \\; Q^* = -6, \\; \\mu = x^6 \\implies y^{-6} = x^{-6}\\left[\\int -6x^6\\,dx + C\\right] = -\\frac{6}{7}x + Cx^{-6}',
        explanation: 'Divide by x first so Q(x) = 1. Note: in Ans.Final_6 p.1, ∫ -6x^{-6} dx is (-6/(-5))x^{-5} = (6/5)x^{-5} if P* was -6/x, wait: since P = -1/x and 1-n = -6, P* = (-6)(-1/x) = +6/x, so μ = x^{+6}!',
        arabicExplanation: 'انتبه للإشارة: P(x) = -1/x وعند ضربها في (1-n = -6) تصبح P*(x) = +6/x وعامل التكامل هو x^6!'
      },
      {
        stepNumber: 2,
        title: 'Part (c): Exact ODE (3x² + y cos x)dx + (sin x - 4y³)dy = 0',
        arabicTitle: 'الجزء (c): معادلة تامة لأن M_y = N_x = cos x',
        formula: '\\frac{\\partial M}{\\partial y} = \\cos x = \\frac{\\partial N}{\\partial x} \\implies x^3 + y\\sin x - y^4 = C',
        explanation: 'Strike out the duplicate y sin x term.',
        arabicExplanation: 'نشطب الحد المكرر y sin x فنحصل على الحل في سطر واحد.'
      },
      {
        stepNumber: 3,
        title: 'Part (d): Substitute z = x - y into dy/dx = (x - y + 1)/(x - y - 1)',
        arabicTitle: 'الجزء (d): التعويض بـ z = x - y وفصل المتغيرات',
        formula: '1 - \\frac{dz}{dx} = \\frac{z+1}{z-1} \\implies \\frac{dz}{dx} = 1 - \\frac{z+1}{z-1} = \\frac{-2}{z-1} \\implies \\int (z-1)\\,dz = \\int -2\\,dx \\implies \\frac{1}{2}(x-y)^2 - (x-y) = -2x + C',
        explanation: 'Separate variables by multiplying by (z - 1) dx.',
        arabicExplanation: 'نضرب في (z-1) ونكامل الطرفين ثم نرجع z = x - y.'
      }
    ],
    finalAnswerLatex: '\\text{(b) } y^{-6} = -\\frac{6}{7}x + Cx^{-6} \\quad | \\quad \\text{(c) } x^3 + y\\sin x - y^4 = C \\quad | \\quad \\text{(d) } \\frac{1}{2}(x-y)^2 - (x-y) = -2x + C',
    drillOptions: {
      methodChoices: [
        'For (d), substitute z = x - y (so dy/dx = 1 - dz/dx) to get ∫ (z - 1) dz = ∫ -2 dx',
        'Treat (d) as Homogeneous y = vx',
        'Treat (d) as Bernoulli',
        'Treat (c) as Non-Exact'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'In dy/dx = (x - y + 1) / (x - y - 1), what equation in z do you get after substituting z = x - y?',
      keyStepChoices: [
        'dz/dx = 1 - (z + 1)/(z - 1) = -2 / (z - 1)   ⇒   ∫ (z - 1) dz = ∫ -2 dx',
        'dz/dx = (z + 1)/(z - 1)',
        'dz/dx = 2z / (z - 1)',
        'z dz = dx'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'fin5-q2a-b-c',
    numberLabel: 'Final 5/6 (Fall 2019–20) Q2(a,b,c)',
    sourceExam: 'Final 5/6: Fall 2019–2020 Final (2hr)',
    sourceYear: '2019–2020',
    sourceFileUrl: '/assets/aistudio/Final_5___1__2a029b34.pdf',
    points: 10,
    category: Category.UNDETERMINED_COEFFS,
    subCategory: 'Higher-Order ODE',
    methodTag: 'Cubic ODE + Wronskian (sec x csc x) + Missing-y Resonance (y\'\' - y\' = 5x + e^{3x})',
    arabicMethodTag: 'معادلة تكعيبية + تغيير البارامترات لـ sec x csc x + رنين غياب y في y\'\' - y\' = 5x + e^{3x}',
    difficulty: 'Boss',
    problemLatex: '\\text{(a) } y\'\'\'-3y\'\'+6y\'-4y=0 \\qquad \\text{(b) } y\'\'+y=\\sec(x)\\csc(x) \\qquad \\text{(c) } y\'\'-y\'=5x+e^{3x}',
    problemStatement: 'Find the general solution of Question 2(a), 2(b), and 2(c) in Final 5/6 (Fall 2019–2020):',
    visualRecognitionTrigger: '(a) Sum of coeffs = 0 ⇒ m = 1! (b) RHS = sec x csc x = 1/(sin x cos x). (c) y term is MISSING in y\'\' - y\' = 5x + e^{3x}!',
    arabicVisualTrigger: '(a) مجموع المعاملات = 0، (b) الطرف الأيمن sec x csc x يحل بفرونسكي، (c) غياب الحد y يجعل m = 0 جذراً فيحدث رنين مع 5x!',
    examinerTrap: 'THREE CRITICAL HANDWRITTEN NOTE CORRECTIONS (Ans.Final_6 p.2–3): (1) In Q2(a), m^3 - 3m^2 + 6m - 4 = (m-1)(m^2-2m+4) = 0 has roots m = 1 and m = 1 ± √3 i (the handwritten sheet wrongly factored out m as if -4 wasn\'t there!). (2) In Q2(b), A(x) = ∫ -sin x / (cos x sin x) dx = ∫ -sec x dx = -ln|sec x + tan x|, and B(x) = ∫ csc x dx = ln|csc x - cot x|! (3) In Q2(c), y\'\' - y\' = 0 gives m^2 - m = 0 ⇒ m = 0, 1 (NOT m^2 - 1 = 0!). Because m = 0 is a root, 5x MUST be boosted by x to y_p = Ax^2 + Bx + Ce^{3x}!',
    arabicExaminerTrap: 'ثلاثة تصحيحات جوهرية لأخطاء الورقة اليدوية (Ans.Final_6 ص٢–٣): (١) في Q2a المعادلة تحلل بـ (m-1)(m^2-2m+4)=0 فتعطي m=1 و 1±√3i! (٢) في Q2b تختصر sin x مع sin x فيتبقى تكامل (-sec x) وتكامل (csc x) بلوغاريتمات! (٣) في Q2c المعادلة المساعدة لـ y\'\' - y\' = 0 هي m^2 - m = 0 أي m = 0, 1 (وليس m^2 - 1 = 0!)، وبما أن m = 0 جذر فيجب ضرب فرض 5x في x ليصبح y_p = Ax^2 + Bx + Ce^{3x}!',
    secretShortcut: 'In (b), sec x csc x = 1/(cos x sin x), so multiplying by u_1 = cos x or u_2 = sin x immediately cancels one trig factor!',
    steps: [
      {
        stepNumber: 1,
        title: 'Part (a): Solve m³ - 3m² + 6m - 4 = 0',
        arabicTitle: 'الجزء (a): تحليل المعادلة المساعدة عند m = 1',
        formula: '(m-1)(m^2 - 2m + 4) = 0 \\implies m = 1, \\; 1 \\pm \\sqrt{3}i \\implies y = C_1 e^x + e^x(C_2\\cos\\sqrt{3}x + C_3\\sin\\sqrt{3}x)',
        explanation: 'Sum of coefficients 1 - 3 + 6 - 4 = 0 gives m = 1.',
        arabicExplanation: 'القسمة على (m-1) تعطي قوساً تربيعياً جذوره مركبة 1 ± √3 i.'
      },
      {
        stepNumber: 2,
        title: 'Part (b): Variation of Parameters for y\'\' + y = sec(x) csc(x)',
        arabicTitle: 'الجزء (b): تغيير البارامترات للمعادلة y\'\' + y = sec(x) csc(x)',
        formula: 'A(x) = \\int \\frac{-\\cancel{\\sin x}}{\\cos x\\,\\cancel{\\sin x}}\\,dx = -\\int \\sec x\\,dx = -\\ln|\\sec x+\\tan x|, \\quad B(x) = \\int \\frac{\\cancel{\\cos x}}{\\cancel{\\cos x}\\,\\sin x}\\,dx = \\int \\csc x\\,dx = \\ln|\\csc x-\\cot x|',
        explanation: 'Then y_p = -cos(x)ln|sec x + tan x| + sin(x)ln|csc x - cot x|.',
        arabicExplanation: 'تختصر الدوال المثلثية ويتبقى تكامل sec x وتكامل csc x القياسيان.'
      },
      {
        stepNumber: 3,
        title: 'Part (c): Undetermined Coefficients for y\'\' - y\' = 5x + e^{3x} (Resonance at m = 0!)',
        arabicTitle: 'الجزء (c): المعاملات غير المعينة مع الرنين عند m = 0',
        formula: 'm(m-1) = 0 \\implies y_c = C_1 + C_2 e^x, \\quad y_p = x(Ax+B) + Ce^{3x} = Ax^2 + Bx + Ce^{3x} \\implies (2A + 6Ce^{3x}) - (2Ax + B + 3Ce^{3x}) = 5x + e^{3x}',
        explanation: 'Equating coefficients: -2A = 5 ⇒ A = -5/2; 2A - B = 0 ⇒ B = -5; 6C - 3C = 1 ⇒ C = 1/3.',
        arabicExplanation: 'بما أن m=0 جذر نضرب كثيرة الحدود في x لتصبح Ax^2 + Bx، وبمساواة المعاملات نجد A = -5/2 و B = -5 و C = 1/3.'
      }
    ],
    finalAnswerLatex: '\\text{(a) } C_1e^x+e^x(C_2\\cos\\sqrt{3}x+C_3\\sin\\sqrt{3}x) \\; | \\; \\text{(b) } y_c - \\cos x\\ln|\\sec x+\\tan x| + \\sin x\\ln|\\csc x-\\cot x| \\; | \\; \\text{(c) } C_1+C_2e^x - \\frac{5}{2}x^2 - 5x + \\frac{1}{3}e^{3x}',
    drillOptions: {
      methodChoices: [
        'In (c), characteristic equation is m² - m = 0 (m = 0, 1), so boost 5x to x(Ax + B) = Ax² + Bx!',
        'In (c), write m² - 1 = 0 and use y_p = Ax + B + Ce^{3x}',
        'In (b), ∫ sec x dx = sec x tan x',
        'In (a), factor out m from the constant -4'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the auxiliary equation and correct trial particular solution y_p for y\'\' - y\' = 5x + e^{3x}?',
      keyStepChoices: [
        'm² - m = 0 (roots m = 0, 1), so y_p = x(Ax + B) + Ce^{3x} = Ax² + Bx + Ce^{3x}',
        'm² - 1 = 0 (roots m = ±1), so y_p = Ax + B + Ce^{3x}',
        'm² - m = 0, so y_p = Ax + B + C x e^{3x}',
        'm² + m = 0, so y_p = Ax² + Ce^{3x}'
      ],
      correctKeyStepIndex: 0
    }
  },
  {
    id: 'fin5-q3-q4',
    numberLabel: 'Final 5/6 (Fall 2019–20) Q3 & Q4',
    sourceExam: 'Final 5/6: Fall 2019–2020 Final (2hr)',
    sourceYear: '2019–2020',
    sourceFileUrl: '/assets/aistudio/Final_5___1__2a029b34.pdf',
    points: 20,
    category: Category.LAPLACE_THEOREMS,
    subCategory: 'Laplace & Inverse Laplace',
    methodTag: 'Laplace IVP + Transforms + Inverse Laplace + Fourier Sine (x⁴) + Legendre (x P_5 P_4)',
    arabicMethodTag: 'شامل لابلاس ولابلاس العكسي ومتسلسلة الجيب لـ x⁴ وتكامل ليجندر x P_5 P_4',
    difficulty: 'Trick',
    problemLatex: '\\text{Q3(a): } y\'\'-3y\'+2y=0,\\; y(0)=0, y\'(0)=1 \\quad \\text{Q3(b): } u_2(t)e^3\\sin(t-2)+\\sin t\\cos 2t,\\; t^7e^{2t}+\\int_0^t\\sinh\\tau\\,d\\tau \\quad \\text{Q3(c): } e^{-3s}\\frac{s}{s^2+10s+5},\\; \\ln\\left(\\frac{s+1}{s}\\right)',
    problemStatement: 'Solve Question 3(a,b,c) and Question 4(a,b,c) in Final 5/6 (Fall 2019–2020):',
    visualRecognitionTrigger: 'Look at Q3(b)(i): u_2(t) e^3 sin(t-2) — here e^3 is ALREADY a constant (not e^t)!',
    arabicVisualTrigger: 'لاحظ في Q3(b)(i): المقدار e^3 هو رقم ثابت أصلاً (وليس دالة e^{3t})! فلا توجد إزاحة أولى هنا بل إزاحة ثانية فقط!',
    examinerTrap: 'TWO HANDWRITTEN NOTE WARNINGS (Ans.Final_6 p.4): (1) In Q3(b)(i), the exam printed e^3 (a constant!), NOT e^{3t}! The student in Ans.Final_6 misread e^3 as e^{3t} and shifted s → s-3! Because e^3 has no t, it is just a constant multiplier: e^3 e^{-2s} / (s^2+1)! (2) In Q3(c)(i), s^2 + 10s + 5 = (s+5)^2 - 20, and after inverting to e^{-5t}[cosh √20 t - (5/√20)sinh √20 t], you MUST shift every t to (t - 3) for u_3(t)!',
    arabicExaminerTrap: 'تنبيهان هامان من الورقة اليدوية (Ans.Final_6 ص٤): (١) في Q3(b)(i) المكتوب في ورقة الامتحان هو الثابت e^3 وليس e^{3t}! لذا لا توجد إزاحة (s-3) بل يخرج الثابت e^3 كما هو: e^3 e^{-2s}/(s^2+1)! (٢) في Q3(c)(i) المقام (s+5)^2 - 20 (وليس -17) ويجب استبدال كل t بـ (t-3) بعد تطبيق u_3(t)!',
    secretShortcut: 'In Q4(c): ∫_{-1}^1 x P_5(x) P_4(x) dx — set n = 4 in x P_4 = (5/9)P_5 + (4/9)P_3 to get (5/9) ∫_{-1}^1 P_5^2 dx = (5/9) × (2/11) = 10/99!',
    steps: [
      {
        stepNumber: 1,
        title: 'Q3(a) & Q3(b): Laplace IVP and Forward Transforms',
        arabicTitle: 'السؤال الثالث (a) و (b): المعادلة التفاضلية وتحويلات لابلاس',
        formula: '\\text{Q3(a): } Y(s) = \\frac{1}{(s-1)(s-2)} = \\frac{-1}{s-1}+\\frac{1}{s-2} \\implies y(t) = e^{2t}-e^t, \\qquad \\text{Q3(b-i): } \\frac{e^3 e^{-2s}}{s^2+1} + \\frac{1}{2}\\left(\\frac{3}{s^2+9}-\\frac{1}{s^2+1}\\right), \\qquad \\text{Q3(b-ii): } \\frac{7!}{(s-2)^8} + \\frac{1}{s(s^2-1)}',
        explanation: 'In Q3(b-i), sin t cos 2t = ½[sin 3t + sin(-t)] = ½[sin 3t - sin t].',
        arabicExplanation: 'في Q3(b-i) نفك sin t cos 2t إلى ½(sin 3t - sin t)، والثابت e^3 يظل ثابتاً.'
      },
      {
        stepNumber: 2,
        title: 'Q3(c): Inverse Laplace of e^{-3s} s/(s²+10s+5) and ln((s+1)/s)',
        arabicTitle: 'السؤال الثالث (c): تحويلات لابلاس العكسية',
        formula: '\\text{(i) } G(s) = \\frac{(s+5)-5}{(s+5)^2-20} \\implies f(t) = u_3(t)e^{-5(t-3)}\\left[\\cosh\\big(\\sqrt{20}(t-3)\\big) - \\frac{5}{\\sqrt{20}}\\sinh\\big(\\sqrt{20}(t-3)\\big)\\right], \\qquad \\text{(ii) } f(t) = \\frac{1 - e^{-t}}{t}',
        explanation: 'In (ii), F\'(s) = 1/(s+1) - 1/s ⇒ -t f(t) = e^{-t} - 1 ⇒ f(t) = (1 - e^{-t})/t.',
        arabicExplanation: 'في (ii) نشتق اللوغاريتم ثم نقسم على (-t).'
      },
      {
        stepNumber: 3,
        title: 'Q4(a) Fourier Sine of x⁴ on [0,π] & Q4(c) ∫_{-1}^1 x P_5(x) P_4(x) dx',
        arabicTitle: 'السؤال الرابع: متسلسلة الجيب لـ x⁴ وتكامل ليجندر x P_5 P_4',
        formula: '\\text{Q4(a): } b_n = \\frac{2}{\\pi}(-1)^n\\left(-\\frac{\\pi^3}{n}+\\frac{12\\pi}{n^3}\\right) + \\frac{48((-1)^{n+1}+1)}{\\pi n^5}, \\qquad \\text{Q4(c): } \\int_{-1}^1 xP_4 P_5\\,dx = \\frac{5}{9}\\int_{-1}^1 P_5^2\\,dx = \\frac{5}{9}\\cdot\\frac{2}{11} = \\frac{10}{99}',
        explanation: 'Using n = 4 in x P_4 = (5/9)P_5 + (4/9)P_3 (or n = 5 in x P_5 = (6/11)P_6 + (5/11)P_4 → (5/11)(2/9) = 10/99) gives the exact same value 10/99!',
        arabicExplanation: 'سواء عوضت بـ n=4 أو n=5 في علاقة التكرار، الناتج هو (5/9)×(2/11) = (5/11)×(2/9) = 10/99!'
      }
    ],
    finalAnswerLatex: '\\text{Q3(a): } e^{2t}-e^t \\; | \\; \\text{Q3(c-i): } u_3(t)e^{-5(t-3)}\\left[\\cosh\\sqrt{20}(t-3)-\\frac{5}{\\sqrt{20}}\\sinh\\sqrt{20}(t-3)\\right] \\; | \\; \\text{Q3(c-ii): } \\frac{1-e^{-t}}{t} \\; | \\; \\text{Q4(c): } \\frac{10}{99}',
    drillOptions: {
      methodChoices: [
        'In Q3b(i), e³ is a constant multiplier; in Q4(c), ∫_{-1}^1 x P_5 P_4 dx = (5/9)(2/11) = 10/99',
        'Shift s → s - 3 for the constant e³',
        '∫_{-1}^1 x P_5 P_4 dx = 0 by orthogonality',
        'Leave t unshifted in Q3c(i)'
      ],
      correctMethodIndex: 0,
      keyStepPrompt: 'What is the value of ∫_{-1}^1 x P_5(x) P_4(x) dx?',
      keyStepChoices: [
        '(5/9) · (2/11) = (5/11) · (2/9) = 10/99',
        '0',
        '2/9',
        '2/11'
      ],
      correctKeyStepIndex: 0
    }
  }
];
