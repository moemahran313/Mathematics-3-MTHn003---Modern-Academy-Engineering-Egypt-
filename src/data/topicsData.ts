import { Category, Topic } from '../types';

export const TOPICS_DATA: Topic[] = [
  {
    id: 'ch1_classification',
    category: Category.BASIC_ODE,
    summary: 'Foundations: Definitions, Order, Degree & Linearity',
    arabicTitle: 'تصنيف المعادلات التفاضلية: الرتبة والدرجة والخطية',
    details: 'A differential equation (DE) is an equation involving derivatives of an unknown function y with respect to one or more independent variables. The Order is the order of the highest derivative present. The Degree is the algebraic exponent (power) of that highest derivative after removing any fractional powers or radicals from derivatives.',
    equations: [
      {
        id: 'eq_order_def',
        formula: 'y^{(n)} + a_{n-1}(x) y^{(n-1)} + \\dots + a_0(x) y = f(x)',
        description: 'General linear n-th order Ordinary Differential Equation (ODE)',
        arabicTip: 'الرتبة (Order): هي رتبة أعلى مشتقة موجودة بالمعادلة',
      },
      {
        id: 'eq_order_eg1',
        formula: 'y\'\' + (y\')^3 = x \\implies \\text{Order} = 2, \\; \\text{Degree} = 1',
        description: 'Caution: Degree is the power of y\'\', NOT the power of y\'',
        arabicTip: 'انتبه: الدرجة تؤخذ من أعلى مشتقة (الرتبة 2 أسها 1 وليست 3!)',
      },
      {
        id: 'eq_order_eg2',
        formula: '\\left(\\frac{d^3y}{dx^3}\\right)^2 + \\sqrt{1 + \\left(\\frac{dy}{dx}\\right)^2} = y \\implies \\text{Order} = 3, \\; \\text{Degree} = 4',
        description: 'Remove radicals before determining degree by squaring both sides',
      },
    ],
    tricks: [
      'Degree trap: Never look at powers of lower derivatives or dependent variables. Look ONLY at the highest derivative.',
      'Linearity check: An ODE is linear if y and all its derivatives appear to the first power only, and no products like y·y\' or non-linear functions like sin(y), e^y appear.',
      'In Arabic notes: رتبة المعادلة هي أعلى مشتقة موجودة، والدرجة هي أس أعلى مشتقة.',
    ],
  },
  {
    id: 'ch2_separation',
    category: Category.SEPARATION,
    summary: 'Separation of Variables Method',
    arabicTitle: 'طريقة فصل المتغيرات',
    details: 'Applicable when the differential equation can be rewritten so that all terms containing x are multiplied by dx on one side, and all terms containing y are multiplied by dy on the other side. That is, g(y) dy = f(x) dx.',
    equations: [
      {
        id: 'sep_standard',
        formula: '\\frac{dy}{dx} = g(x) h(y) \\implies \\frac{1}{h(y)} \\, dy = g(x) \\, dx',
        description: 'Standard variable separation form',
        arabicTip: 'نستخدم هذه الطريقة عندما تكون حدود x و y مضروبة أو مقسومة وليست مجموعة',
      },
      {
        id: 'sep_integrated',
        formula: '\\int \\frac{1}{h(y)} \\, dy = \\int g(x) \\, dx + C',
        description: 'Integration on both sides yields the implicit or explicit general solution',
      },
      {
        id: 'sep_exp_rule',
        formula: 'e^{x+y} = e^x \\cdot e^y, \\quad x^{a+b} = x^a \\cdot x^b',
        description: 'Core exponential splitting trick to achieve separation',
        arabicTip: 'أشهر خدعة: فك الأسس e^(x+y) = e^x · e^y لأخذ عامل مشترك',
      },
      {
        id: 'sep_log_rule',
        formula: '\\ln(x \\cdot y) = \\ln x + \\ln y, \\quad \\ln(x/y) = \\ln x - \\ln y, \\quad \\ln x^a = a\\ln x',
        description: 'Logarithmic decomposition identities used for separating logs',
      },
    ],
    tricks: [
      'If you see terms like e^(3x+2y) or e^(x+y) + x^2 e^y, ALWAYS factor out e^y: e^y(e^x + x^2). Then divide by e^y to get e^(-y) dy = (e^x + x^2) dx.',
      'Always remember: ∫ (1 / (1+y^2)) dy = arctan(y) + C.',
      'For y\' = (y^2 + 1) / (2xy), cross-multiply: 2y / (y^2 + 1) dy = (1/x) dx, giving ln(y^2+1) = ln|x| + ln C => y^2 + 1 = C x.',
    ],
  },
  {
    id: 'ch2_reducible_separation',
    category: Category.REDUCIBLE_SEPARATION,
    summary: 'Equations Reducible to Separable Form',
    arabicTitle: 'معادلات تؤول إلى فصل المتغيرات',
    details: 'Equations of the form dy/dx = f(ax + by + c) or linear rational functions dy/dx = (a1 x + b1 y + c1) / (a2 x + b2 y + c2). When lines are parallel (a1/a2 = b1/b2), we substitute z = a1 x + b1 y.',
    equations: [
      {
        id: 'red_linear_arg',
        formula: '\\frac{dy}{dx} = f(ax + by + c) \\implies \\text{Let } z = ax + by + c, \\; \\frac{dz}{dx} = a + b\\frac{dy}{dx}',
        description: 'Substitution converts the ODE into a separable equation in z and x',
        arabicTip: 'نسمي المقدار المركب z ثم نفاضل بالنسبة لـ x ونعوض',
      },
      {
        id: 'red_tangent_eg',
        formula: '\\frac{dy}{dx} = \\tan(x+y) - 1 \\implies z = x+y \\implies \\frac{dz}{dx} = \\tan z \\implies \\ln|\\sin(x+y)| = x + C',
        description: 'Classic exam question: substitution yields cot(z) dz = dx',
      },
      {
        id: 'red_ratio_parallel',
        formula: '\\frac{dy}{dx} = \\frac{a_1 x + b_1 y + c_1}{k(a_1 x + b_1 y) + c_2} \\implies \\text{Let } u = a_1 x + b_1 y',
        description: 'Parallel lines ratio: substitute the common linear combination u',
      },
    ],
    tricks: [
      'Whenever the argument inside sin, cos, tan or ln is (x+y) or (ax+by), that argument is your substitution z!',
      'Exam example from Modern Academy: y\' = - (2x + 3y - 1) / (4x + 6y - 5). Notice that (4x+6y) = 2(2x+3y). Let z = 2x+3y!',
      'Do not forget to substitute back z = ax + by + c at the very end of your solution.',
    ],
  },
  {
    id: 'ch2_homogeneous',
    category: Category.HOMOGENEOUS,
    summary: 'Homogeneous First-Order ODEs',
    arabicTitle: 'المعادلات التفاضلية المتجانسة',
    details: 'A first-order ODE is homogeneous if dy/dx can be written purely as a function of the single ratio (y/x), or if M(x,y)dx + N(x,y)dy = 0 where M and N are homogeneous polynomials of the same degree. Solved via substitution y = u·x or z = y/x.',
    equations: [
      {
        id: 'hom_substitution',
        formula: 'y = u \\cdot x \\implies \\frac{dy}{dx} = x \\frac{du}{dx} + u',
        description: 'Fundamental product rule substitution for homogeneous ODEs',
        arabicTip: 'نضع u = y/x ومنها y = u·x و y\' = x·u\' + u',
      },
      {
        id: 'hom_separable_form',
        formula: 'x \\frac{du}{dx} + u = F(u) \\implies \\frac{du}{F(u) - u} = \\frac{dx}{x}',
        description: 'Separable form in terms of variables u and x',
      },
      {
        id: 'hom_angle_ratio',
        formula: 'y\' = \\cos\\left(\\frac{y}{x}\\right) + \\frac{y}{x}, \\quad x y\' - y = x^2 \\cos^2\\left(\\frac{y}{x}\\right)',
        description: 'Trig functions containing (y/x) indicate immediate homogeneous substitution',
      },
    ],
    tricks: [
      'Quick test: Check the sum of powers in each monomial. In x^2 y\' = y^2 + 5xy + 4x^2, every term has total degree 2.',
      'When simplifying (F(u) - u), watch out for algebraic common denominators (توحيد مقامات).',
      'If you reach ∫ (u+2)^(-2) du = ∫ (1/x) dx, then -1/(u+2) = ln|x| + C, and plug back u = y/x to get -1 / (y/x + 2) = ln|x| + C.',
    ],
  },
  {
    id: 'ch2_exact',
    category: Category.EXACT_EQUATIONS,
    summary: 'Exact Differential Equations',
    arabicTitle: 'المعادلات التفاضلية التامة',
    details: 'An equation M(x, y) dx + N(x, y) dy = 0 is exact if and only if ∂M/∂y = ∂N/∂x. This guarantees the existence of a potential function Φ(x,y) such that dΦ = 0, giving the general implicit solution Φ(x,y) = C.',
    equations: [
      {
        id: 'exact_condition',
        formula: '\\frac{\\partial M}{\\partial y} = \\frac{\\partial N}{\\partial x}',
        description: 'Condition for exactness (Euler-Cauchy reciprocity)',
        arabicTip: 'نفاضل M بالنسبة لـ y (مع اعتبار x ثابتاً) ونفاضل N بالنسبة لـ x (مع اعتبار y ثابتاً)',
      },
      {
        id: 'exact_solution_formula',
        formula: '\\int M(x,y) \\, dx \\; \\text{(treat } y \\text{ as const)} + \\int [N(x,y) \\text{ terms free of } x] \\, dy = C',
        description: 'Direct shortcut formula for exact solutions',
      },
      {
        id: 'exact_union_trick',
        formula: '\\int M \\, dx \\; \\bigcup \\; \\int N \\, dy = C \\quad (\\text{take common terms only once})',
        description: 'Integration of both components taking union of non-repeating terms',
        arabicTip: 'نكامل الأول بالنسبة لـ x والثاني بالنسبة لـ y وناخذ العناصر بدون تكرار',
      },
    ],
    tricks: [
      'Sign trap: In M dx + N dy = 0, make sure the plus sign connects dx and dy! If written as M dx - N dy = 0, distribute the negative sign into N.',
      'Partial derivative tip: When differentiating with respect to y, treat x as an ordinary constant number like 5.',
      'Example from exam: (2xy - tan y) dx + (x^2 - x sec^2 y) dy = 0. Here My = 2x - sec^2 y and Nx = 2x - sec^2 y. Both match! Solution: x^2 y - x tan y = C.',
    ],
  },
  {
    id: 'ch2_linear',
    category: Category.LINEAR_FIRST_ORDER,
    summary: 'First-Order Linear Differential Equations',
    arabicTitle: 'المعادلات التفاضلية الخطية من الرتبة الأولى',
    details: 'A first-order linear ODE can always be arranged in standard form y\' + P(x) y = Q(x). It is solved using the integrating factor μ(x) = exp(∫ P(x) dx). If the equation is non-linear in y but linear in x, swap variables to dx/dy + P(y) x = Q(y).',
    equations: [
      {
        id: 'lin_std_form',
        formula: 'y\' + P(x) \\, y = Q(x)',
        description: 'Standard form of first-order linear ODE (coefficient of y\' must be 1)',
        arabicTip: 'يجب أن يكون معامل y\' مساوياً للواحد قبل استخراج P(x) و Q(x)',
      },
      {
        id: 'lin_integrating_factor',
        formula: '\\mu(x) = e^{\\int P(x) \\, dx}',
        description: 'Integrating factor formula',
      },
      {
        id: 'lin_general_sol',
        formula: 'y = \\frac{1}{\\mu(x)} \\left[ \\int \\mu(x) \\cdot Q(x) \\, dx + C \\right]',
        description: 'Complete closed-form general solution',
      },
      {
        id: 'lin_reversed_form',
        formula: '\\frac{dx}{dy} + P(y) \\, x = Q(y) \\implies \\mu(y) = e^{\\int P(y) \\, dy}, \\; x = \\frac{1}{\\mu(y)} \\left[ \\int \\mu(y) Q(y) \\, dy + C \\right]',
        description: 'Reversed form when ODE is linear in x(y) instead of y(x)',
        arabicTip: 'إذا وجدت y\' = 1/(e^y + x) اقلب الكسر: dx/dy = e^y + x لتصبح خطية في x!',
      },
    ],
    tricks: [
      'Log power cancellation: e^(k ln(f(x))) = e^(ln [f(x)]^k) = [f(x)]^k. Very common with μ(x) = e^(3 ln x) = x^3 or e^(-2 ln x) = x^(-2).',
      'If y\' has a coefficient (e.g. cos x · y\' + y sin x = 1), divide by cos x first to get y\' + y tan x = sec x.',
      'Integration by parts (DI Method / Tabular): frequently required inside ∫ μ(x) Q(x) dx when multiplying polynomials by exponentials.',
    ],
  },
  {
    id: 'ch2_bernoulli',
    category: Category.BERNOULLI,
    summary: 'Bernoulli Non-Linear Differential Equations',
    arabicTitle: 'معادلة برنولي غير الخطية',
    details: 'A famous non-linear first-order ODE of the form y\' + P(x) y = Q(x) y^n (where n ≠ 0, 1). It is converted into a standard linear ODE via the substitution z = y^(1-n).',
    equations: [
      {
        id: 'bern_std_form',
        formula: 'y\' + P(x) \\, y = Q(x) \\, y^n \\quad (n \\neq 0, 1)',
        description: 'Bernoulli differential equation standard form',
        arabicTip: 'نقسم المعادلة كلها على y^n ونفرض z = y^(1-n)',
      },
      {
        id: 'bern_substitution',
        formula: 'z = y^{1-n} \\implies z\' = (1-n) y^{-n} y\'',
        description: 'Transformation reducing Bernoulli to Linear',
      },
      {
        id: 'bern_linearized',
        formula: 'z\' + (1-n) P(x) \\, z = (1-n) Q(x)',
        description: 'Resulting linear ODE in variable z(x)',
      },
      {
        id: 'bern_shortcut',
        formula: 'y^{1-n} = \\frac{1}{\\mu(x)} \\left[ \\int (1-n) \\mu(x) Q(x) \\, dx + C \\right], \\quad \\mu(x) = e^{\\int (1-n) P(x) \\, dx}',
        description: 'Direct one-step integrating formula for Bernoulli equations',
      },
    ],
    tricks: [
      'Identify n accurately: For x y\' - y = x y^7, dividing by x gives y\' - (1/x)y = y^7, so n = 7, and 1 - n = -6.',
      'Negative power alert: If y\' + xy = x/y, write x/y as x·y^(-1), so n = -1, and 1 - n = 1 - (-1) = 2. Then z = y^2.',
      'Always remember to replace z back with y^(1-n) in your final line of working.',
    ],
  },
  {
    id: 'ch3_higher_order_homo',
    category: Category.HIGHER_ORDER_HOMOGENEOUS,
    summary: 'Higher-Order Linear Homogeneous ODEs (Auxiliary Eq.)',
    arabicTitle: 'معادلات الرتب العليا المتجانسة: المعادلة المساعدة',
    details: 'Linear differential equations with constant coefficients of the form a y\'\' + b y\' + c y = 0 or a_n y^(n) + ... + a_0 y = 0. Solved by seeking solutions of the form y = e^(mx), yielding the auxiliary (characteristic) polynomial.',
    equations: [
      {
        id: 'aux_poly',
        formula: 'a m^2 + b m + c = 0 \\quad \\text{or} \\quad a_n m^n + \\dots + a_1 m + a_0 = 0',
        description: 'Characteristic auxiliary algebraic equation',
        arabicTip: 'نستبدل كل y\'\' بـ m^2 وكل y\' بـ m وكل y بـ 1',
      },
      {
        id: 'aux_case1_distinct',
        formula: 'm_1 \\neq m_2 \\in \\mathbb{R} \\implies y_h = C_1 e^{m_1 x} + C_2 e^{m_2 x}',
        description: 'Case 1: Real and distinct roots',
      },
      {
        id: 'aux_case2_repeated',
        formula: 'm_1 = m_2 = m \\implies y_h = (C_1 + C_2 x) e^{m x}',
        description: 'Case 2: Real and repeated roots (multiply repeated terms by x)',
        arabicTip: 'إذا تكرر الجذر نضرب في x: (C1 + C2 x) e^(mx)',
      },
      {
        id: 'aux_case3_complex',
        formula: 'm_{1,2} = \\alpha \\pm i \\beta \\implies y_h = e^{\\alpha x} \\left[ C_1 \\cos(\\beta x) + C_2 \\sin(\\beta x) \\right]',
        description: 'Case 3: Complex conjugate roots',
      },
      {
        id: 'aux_higher_degree',
        formula: 'y^{(4)} - y = 0 \\implies m^4 - 1 = 0 \\implies (m^2-1)(m^2+1)=0 \\implies m = \\pm 1, \\pm i',
        description: 'Higher-order factoring example (yields combination of exp and trig)',
      },
    ],
    tricks: [
      'Repeated complex roots: If m = α ± iβ repeats twice, yh = e^(αx) [(C1 + C2 x) cos(βx) + (C3 + C4 x) sin(βx)].',
      'Factoring higher order: For m^5 - 3m^4 + 6m^3 - 4m^2 = 0, factor out m^2: m^2(m^3 - 3m^2 + 6m - 4) = 0. Notice m=1 is a root: (m-1)(m^2 - 2m + 4).',
      'Constant term pitfall: When y has no derivative (like +4y), the auxiliary term is +4, NOT 4m!',
    ],
  },
  {
    id: 'ch3_undetermined_coeffs',
    category: Category.UNDETERMINED_COEFFS,
    summary: 'Non-Homogeneous: Method of Undetermined Coefficients',
    arabicTitle: 'المعادلات غير المتجانسة: طريقة المعاملات غير المحددة (الجدول)',
    details: 'Finds the particular solution yp for linear ODEs when the forcing function f(x) consists of polynomials, exponentials, sines, cosines, or their products and sums. Total solution is y = yh + yp.',
    equations: [
      {
        id: 'und_table_poly',
        formula: 'f(x) = A_n x^n + \\dots + A_0 \\implies y_p = C_n x^n + \\dots + C_1 x + C_0',
        description: 'Polynomial forcing function trial solution',
      },
      {
        id: 'und_table_exp',
        formula: 'f(x) = A e^{p x} \\implies y_p = C e^{p x} \\quad (\\text{or } C x^s e^{p x} \\text{ if } p \\text{ is root of aux eq})',
        description: 'Exponential trial solution with resonance adjustment factor x^s',
        arabicTip: 'إذا كان p جذراً في المعادلة المساعدة نضرب في x أو x^2 لمنع التكرار',
      },
      {
        id: 'und_table_trig',
        formula: 'f(x) = A\\cos(\\beta x) + B\\sin(\\beta x) \\implies y_p = C_1 \\cos(\\beta x) + C_2 \\sin(\\beta x)',
        description: 'Harmonic trial solution (must include both sine and cosine)',
      },
      {
        id: 'und_superposition',
        formula: 'y_{\\text{general}} = y_h(x) + y_p(x)',
        description: 'Complete general solution is the sum of complementary and particular parts',
      },
    ],
    tricks: [
      'Even if f(x) has only cos(2x), your trial yp MUST contain BOTH C1 cos(2x) + C2 sin(2x) because differentiating cosine produces sine.',
      'Resonance rule: Compare each term of yp with yh. If any term in yp is already present in yh, multiply the entire yp trial block by x (or x^2 if double root).',
      'Polynomial trial tip: If f(x) = 5x, trial must be C1 x + C0 (never omit the constant term C0!).',
    ],
  },
  {
    id: 'ch3_variation_params',
    category: Category.VARIATION_OF_PARAMETERS,
    summary: 'Variation of Parameters (Lagrange Method & Wronskian)',
    arabicTitle: 'طريقة تغير الثوابت (لاجرانج ومحدد فرونسكي)',
    details: 'A universal method to find yp when f(x) is not suitable for undetermined coefficients (e.g. f(x) = sec x, tan x, csc x, 1/x). Uses the Wronskian determinant W(u, v) = u v\' - v u\'.',
    equations: [
      {
        id: 'var_wronskian',
        formula: 'W(u, v) = \\begin{vmatrix} u & v \\\\ u\' & v\' \\end{vmatrix} = u v\' - v u\'',
        description: 'Wronskian determinant of the two complementary solutions u(x) and v(x)',
        arabicTip: 'محدد فرونسكي: W = u·v\' - v·u\' (لا يساوي صفراً)',
      },
      {
        id: 'var_a_func',
        formula: 'A(x) = \\int \\frac{-v(x) \\cdot f(x)}{W(u, v)} \\, dx',
        description: 'First parameter function integral',
      },
      {
        id: 'var_b_func',
        formula: 'B(x) = \\int \\frac{u(x) \\cdot f(x)}{W(u, v)} \\, dx',
        description: 'Second parameter function integral',
      },
      {
        id: 'var_yp_formula',
        formula: 'y_p(x) = A(x) \\cdot u(x) + B(x) \\cdot v(x)',
        description: 'Particular solution composed from parameter functions',
      },
    ],
    tricks: [
      'For y\'\' + y = sec x tan x: yh = C1 cos x + C2 sin x, so u = cos x, v = sin x, and W = cos^2 x + sin^2 x = 1.',
      'Integration trick: ∫ -sin x · sec x tan x dx = -∫ tan^2 x dx = -∫ (sec^2 x - 1) dx = -tan x + x.',
      'Integration trick 2: ∫ cos x · sec x tan x dx = ∫ tan x dx = ln|sec x|.',
      'Leading coefficient: The equation MUST be written with coefficient of y\'\' equal to 1 before reading off f(x).',
    ],
  },
  {
    id: 'ch3_reduction_of_order',
    category: Category.REDUCTION_OF_ORDER,
    summary: 'Reduction of Order Method',
    arabicTitle: 'طريقة تخفيض الرتبة',
    details: 'Used when one non-trivial solution y1 of the homogeneous linear ODE is known. Substituting y = u(x)·y1 transforms the 2nd-order ODE into a 1st-order linear ODE in z = u\'.',
    equations: [
      {
        id: 'red_ansatz',
        formula: 'y(x) = u(x) \\cdot y_1(x) \\implies y\' = u\' y_1 + u y_1\', \\quad y\'\' = u\'\' y_1 + 2u\' y_1\' + u y_1\'\'',
        description: 'Reduction of order transformation substitution',
        arabicTip: 'نفرض y = u·y1 ونفاضل مرتين ثم نعوض بالمعادلة، حد u يختفي دائماً!',
      },
      {
        id: 'red_substitution_z',
        formula: 'z = u\' \\implies z\' = u\'\' \\implies a_2(x) y_1 z\' + [2a_2 y_1\' + a_1 y_1] z = f(x)',
        description: 'Substitution reduces the ODE to a 1st order linear differential equation in z',
      },
      {
        id: 'red_integrate_back',
        formula: 'u(x) = \\int z(x) \\, dx + C_2 \\implies y(x) = u(x) \\cdot y_1(x)',
        description: 'Integrating z yields u, which gives the final general solution',
      },
    ],
    tricks: [
      'Verification check: When you substitute y, y\', y\'\' into the differential equation, all terms containing bare u (without derivatives) MUST completely cancel out! If they do not cancel, check your algebra.',
      'Exam problem from Modern Academy: x^2 y\'\' + x y\' - y = x given y1 = x. Substituting y = u·x yields x^3 u\'\' + 3x^2 u\' = x => u\'\' + (3/x)u\' = 1/x^2. Let z = u\' => z\' + (3/x)z = 1/x^2 (1st order linear!).',
      'Do not forget the constant of integration when integrating z to find u: u = ∫ z dx + C2.',
    ],
  },
  {
    id: 'ch4_laplace_foundations',
    category: Category.LAPLACE_TRANSFORMS,
    summary: 'Laplace Transform Foundations & Standard Table',
    arabicTitle: 'تحويلات لابلاس الأساسية وجدول التحويلات',
    details: 'The Laplace transform converts a function f(t) from the time domain into a function F(s) in the frequency (complex s) domain. Defined by the improper integral L{f(t)} = ∫_0^∞ e^(-st) f(t) dt for s > 0.',
    equations: [
      {
        id: 'lap_def',
        formula: '\\mathcal{L}\\{f(t)\\} = \\int_0^\\infty e^{-st} f(t) \\, dt = F(s)',
        description: 'Definition of the one-sided Laplace Transform',
      },
      {
        id: 'lap_const',
        formula: '\\mathcal{L}\\{C\\} = \\frac{C}{s}, \\quad \\mathcal{L}\\{e^{at}\\} = \\frac{1}{s - a}',
        description: 'Transforms of constant and exponential functions',
        arabicTip: 'تحويل e^(at) يغير إشارة a في المقام: 1 / (s - a)',
      },
      {
        id: 'lap_power',
        formula: '\\mathcal{L}\\{t^n\\} = \\frac{n!}{s^{n+1}} \\quad (n \\in \\mathbb{N})',
        description: 'Power function transform',
      },
      {
        id: 'lap_trig',
        formula: '\\mathcal{L}\\{\\sin(at)\\} = \\frac{a}{s^2 + a^2}, \\quad \\mathcal{L}\\{\\cos(at)\\} = \\frac{s}{s^2 + a^2}',
        description: 'Sine (constant on top) and Cosine (s on top) transforms',
      },
      {
        id: 'lap_hyp',
        formula: '\\mathcal{L}\\{\\sinh(at)\\} = \\frac{a}{s^2 - a^2}, \\quad \\mathcal{L}\\{\\cosh(at)\\} = \\frac{s}{s^2 - a^2}',
        description: 'Hyperbolic sine and cosine transforms (minus in denominator)',
      },
      {
        id: 'lap_trig_identities',
        formula: '\\cos^2 t = \\frac{1}{2} + \\frac{1}{2}\\cos(2t), \\quad \\sin^2 t = \\frac{1}{2} - \\frac{1}{2}\\cos(2t)',
        description: 'Trig power reduction identities required before taking Laplace transform',
        arabicTip: 'لا يوجد تحويل مباشر لـ sin^2(t) أو cos^2(t)، يجب تحويلها بمتطابقات نصف الزاوية أولاً',
      },
    ],
    tricks: [
      'Product of sines/cosines: Use product-to-sum identities: sin(A)cos(B) = 1/2 [sin(A+B) + sin(A-B)]. For example, L{sin(5t)cos(3t)} = 1/2 L{sin(8t) + sin(2t)}.',
      'Mnemonic for sine vs cosine: Cosine has "s" on top (Co-s -> s). Sine has the constant "a" on top.',
      'Hyperbolic vs Trigonometric: Trigonometric functions have (+) in denominator (s^2 + a^2); Hyperbolic functions have (-) in denominator (s^2 - a^2).',
    ],
  },
  {
    id: 'ch4_laplace_theorems',
    category: Category.LAPLACE_THEOREMS,
    summary: 'Laplace Shift & Derivative Theorems',
    arabicTitle: 'نظريات الإزاحة والتفاضل والتكامل في لابلاس',
    details: 'Key operational properties that dramatically simplify computing Laplace transforms of composite functions: First Shift Theorem (exponential modulation), Multiplication by t^n (differentiation in s), Integration in t domain, and Heaviside Unit Step function (Second Shift Theorem).',
    equations: [
      {
        id: 'lap_first_shift',
        formula: '\\mathcal{L}\\{e^{at} f(t)\\} = F(s - a)',
        description: 'First Shift Theorem: multiply by e^(at) shifts s to (s - a)',
        arabicTip: 'الحالة الثانية (First Shift): نحسب تحويل f(t) ثم نستبدل كل s بـ (s - a)',
      },
      {
        id: 'lap_diff_theorem',
        formula: '\\mathcal{L}\\{t^n f(t)\\} = (-1)^n \\frac{d^n}{ds^n} F(s)',
        description: 'Differentiation in frequency domain (Multiplication by t^n)',
        arabicTip: 'الحالة الثالثة: الضرب في t يعني تفاضل F(s) بالنسبة لـ s وضرب في (-1)',
      },
      {
        id: 'lap_int_theorem',
        formula: '\\mathcal{L}\\left\\{ \\int_0^t f(\\tau) \\, d\\tau \\right\\} = \\frac{1}{s} F(s)',
        description: 'Integration in time domain corresponds to division by s',
      },
      {
        id: 'lap_div_t_theorem',
        formula: '\\mathcal{L}\\left\\{ \\frac{f(t)}{t} \\right\\} = \\int_s^\\infty F(z) \\, dz',
        description: 'Division by t corresponds to improper integration from s to infinity',
      },
      {
        id: 'lap_second_shift',
        formula: '\\mathcal{L}\\{u_a(t) f(t - a)\\} = e^{-as} F(s), \\quad u_a(t) = \\begin{cases} 0, & t < a \\\\ 1, & t \\ge a \\end{cases}',
        description: 'Second Shift Theorem (Heaviside Unit Step Function ua(t))',
        arabicTip: 'دالة الدرجة ua(t): تحول إلى e^(-as) بشرط أن تكون الدالة المرافقة متأخرة f(t-a)',
      },
    ],
    tricks: [
      'Second shift adjustment: If you have u_a(t) · g(t) where g(t) is not already shifted, write g(t) = g((t-a) + a) or use L{u_a(t) g(t)} = e^(-as) L{g(t+a)}.',
      'Example: L{u_2(t) (t-7)} = L{u_2(t) [(t-2) - 5]} = e^(-2s) [1/s^2 - 5/s].',
      'For division by t: L{sin(t) / t} = ∫_s^∞ (1 / (z^2 + 1)) dz = [arctan(z)]_s^∞ = π/2 - arctan(s) = arccot(s).',
    ],
  },
  {
    id: 'ch4_inverse_laplace',
    category: Category.INVERSE_LAPLACE,
    summary: 'Inverse Laplace Transforms & Special Tricks',
    arabicTitle: 'تحويل لابلاس العكسي والتريكات الرياضية',
    details: 'Finding the original time function f(t) = L^(-1){F(s)}. Core methods include completing the square for irreducible quadratics, partial fraction expansion, inverse shift theorems, and the logarithmic/arctangent derivative shortcut.',
    equations: [
      {
        id: 'inv_shift',
        formula: '\\mathcal{L}^{-1}\\{F(s - a)\\} = e^{at} \\mathcal{L}^{-1}\\{F(s)\\} = e^{at} f(t)',
        description: 'Inverse First Shift: extract e^(at) and invert the unshifted F(s)',
      },
      {
        id: 'inv_complete_square',
        formula: 's^2 + bs + c = \\left(s + \\frac{b}{2}\\right)^2 + \\left(c - \\frac{b^2}{4}\\right)',
        description: 'Completing the square in denominator to match shifted sine/cosine/sinh/cosh',
        arabicTip: 'إكمال المربع: (s + نصف معامل s)^2 - مربع نصف المعامل + الحد الثابت',
      },
      {
        id: 'inv_log_trick',
        formula: '-t f(t) = \\mathcal{L}^{-1}\\{F\'(s)\\} \\implies f(t) = -\\frac{1}{t} \\mathcal{L}^{-1}\\left\\{ \\frac{d}{ds} F(s) \\right\\}',
        description: 'Logarithmic & Arctangent Derivative Trick (Golden exam question!)',
        arabicTip: 'تريك الامتحان للدوال اللوغاريتمية ln و tan^(-1): نفاضل F(s) ثم نوجد العكسي ونقسم على (-t)',
      },
      {
        id: 'inv_step_second_shift',
        formula: '\\mathcal{L}^{-1}\\{e^{-as} F(s)\\} = u_a(t) \\cdot f(t - a)',
        description: 'Inverse Second Shift: e^(-as) produces unit step u_a(t) and delays f by a',
      },
    ],
    tricks: [
      'Log trick breakdown: If F(s) = ln((s+3)/(s+1)) = ln(s+3) - ln(s+1), then F\'(s) = 1/(s+3) - 1/(s+1). The inverse of F\'(s) is e^(-3t) - e^(-t). Therefore, f(t) = - (e^(-3t) - e^(-t)) / t = (e^(-t) - e^(-3t)) / t.',
      'Numerator adjustment: In F(s) = s / (s^2 + 10s + 1), complete denominator: (s+5)^2 - 24. Since s is shifted to (s+5), write numerator as (s+5) - 5!',
      'Then F(s) = (s+5)/((s+5)^2 - 24) - 5/((s+5)^2 - 24) => e^(-5t) [cosh(√24 t) - (5/√24) sinh(√24 t)].',
    ],
  },
  {
    id: 'ch4_laplace_ode',
    category: Category.LAPLACE_ODE,
    summary: 'Solving Initial Value Problems via Laplace Transform',
    arabicTitle: 'حل المعادلات التفاضلية باستخدام تحويل لابلاس',
    details: 'Transforms an ODE with given initial conditions into an ordinary algebraic equation for Y(s) = L{y(t)}. After solving for Y(s) algebraically, apply partial fractions and inverse Laplace to directly obtain the unique IVP solution.',
    equations: [
      {
        id: 'lap_deriv_1',
        formula: '\\mathcal{L}\\{y\'(t)\\} = s Y(s) - y(0)',
        description: 'First derivative Laplace transform',
        arabicTip: 'تحويل المشتقة الأولى: s Y(s) - y(0)',
      },
      {
        id: 'lap_deriv_2',
        formula: '\\mathcal{L}\\{y\'\'(t)\\} = s^2 Y(s) - s y(0) - y\'(0)',
        description: 'Second derivative Laplace transform',
        arabicTip: 'تحويل المشتقة الثانية: s^2 Y(s) - s y(0) - y\'(0)',
      },
      {
        id: 'lap_deriv_3',
        formula: '\\mathcal{L}\\{y\'\'\'(t)\\} = s^3 Y(s) - s^2 y(0) - s y\'(0) - y\'\'(0)',
        description: 'Third derivative Laplace transform',
      },
      {
        id: 'lap_ivp_example',
        formula: 'y\'\' - 6y\' + 8y = e^{3t}, \\quad y(0) = 0, \\; y\'(0) = 2',
        description: 'Canonical exam problem: isolate Y(s) and decompose by partial fractions',
      },
    ],
    tricks: [
      'Initial conditions check: Plug in y(0) and y\'(0) immediately after writing down the derivative formulas so terms simplify quickly.',
      'Partial fraction shortcut (Heaviside Cover-up): For Y(s) = (2s - 5) / [(s-3)(s-4)(s-2)], cover (s-3) and substitute s=3: A = (6-5)/[(3-4)(3-2)] = -1.',
      'Zero initial conditions: If y(0) = 0 and y\'(0) = 0, L{y\'\'} simplifies purely to s^2 Y(s).',
    ],
  },
  {
    id: 'ch5_fourier_series',
    category: Category.FOURIER_SERIES,
    summary: 'Fourier Series & Half-Range Sine/Cosine Expansions',
    arabicTitle: 'متسلسلات فورييه والتوسيعات نصف المدى (جيب وجيب تمام)',
    details: 'Represents periodic piecewise continuous functions as an infinite series of sines and cosines. For functions defined on (0, L), we construct either an even half-range expansion (Fourier Cosine Series) or an odd half-range expansion (Fourier Sine Series).',
    equations: [
      {
        id: 'fs_full_formula',
        formula: 'f(x) = \\frac{a_0}{2} + \\sum_{n=1}^\\infty \\left[ a_n \\cos\\left(\\frac{n\\pi x}{L}\\right) + b_n \\sin\\left(\\frac{n\\pi x}{L}\\right) \\right]',
        description: 'Full Fourier Series on interval (-L, L)',
      },
      {
        id: 'fs_cosine_series',
        formula: 'a_0 = \\frac{2}{L}\\int_0^L f(x) \\, dx, \\quad a_n = \\frac{2}{L}\\int_0^L f(x) \\cos\\left(\\frac{n\\pi x}{L}\\right) \\, dx, \\quad b_n = 0',
        description: 'Fourier Cosine Series (Even half-range expansion on [0, L])',
        arabicTip: 'متسلسلة جيب التمام (Cosine): نعتبر الدالة زوجية، bn = 0 ونحسب a0 و an فقط',
      },
      {
        id: 'fs_sine_series',
        formula: 'a_0 = 0, \\quad a_n = 0, \\quad b_n = \\frac{2}{L}\\int_0^L f(x) \\sin\\left(\\frac{n\\pi x}{L}\\right) \\, dx',
        description: 'Fourier Sine Series (Odd half-range expansion on [0, L])',
        arabicTip: 'متسلسلة الجيب (Sine): نعتبر الدالة فردية، a0 = an = 0 ونحسب bn فقط',
      },
      {
        id: 'fs_trig_values',
        formula: '\\cos(n\\pi) = (-1)^n, \\quad \\sin(n\\pi) = 0, \\quad \\cos(2n\\pi) = 1',
        description: 'Crucial integer evaluation values for Fourier coefficients',
      },
    ],
    tricks: [
      'Tabular Integration (DI Method): Crucial for evaluating ∫ x^2 sin(nπx/L) dx. Make a D column (differentiating x^2 -> 2x -> 2 -> 0) and an I column (integrating trig with alternating signs).',
      'Odd vs Even prompt: When the question asks for "Fourier Sine Series", write immediately: a0 = 0, an = 0, and focus only on computing bn!',
      'When asked for "Fourier Cosine Series", write immediately: bn = 0, and compute a0 and an.',
    ],
  },
  {
    id: 'ch5_legendre_polynomials',
    category: Category.LEGENDRE_POLYNOMIALS,
    summary: 'Legendre Polynomials, Recurrence Relations & Integrals',
    arabicTitle: 'كثيرات حدود ليجاندر والعلاقات التكرارية والتكاملات',
    details: 'Solutions to Legendre\'s differential equation (1 - x^2) y\'\' - 2xy\' + n(n+1)y = 0. Satisfy key recurrence formulas relating P_(n+1), P_n, and P_(n-1), and satisfy an orthogonality property over the interval [-1, 1].',
    equations: [
      {
        id: 'leg_recurrence_1',
        formula: '(2n + 1) x P_n(x) = (n + 1) P_{n+1}(x) + n P_{n-1}(x)',
        description: 'First fundamental Bonnet recurrence relation',
        arabicTip: 'أهم علاقة تكرارية: x P_n(x) = [(n+1)/(2n+1)] P_(n+1)(x) + [n/(2n+1)] P_(n-1)(x)',
      },
      {
        id: 'leg_recurrence_2',
        formula: 'P_n(x) + 2x P_n\'(x) = P_{n+1}\'(x) + P_{n-1}\'(x)',
        description: 'Second derivative recurrence relation (frequently asked to prove in finals)',
      },
      {
        id: 'leg_orthogonality',
        formula: '\\int_{-1}^1 P_n(x) P_m(x) \\, dx = \\begin{cases} 0, & n \\neq m \\\\ \\frac{2}{2n + 1}, & n = m \\end{cases}',
        description: 'Orthogonality property over interval [-1, 1]',
        arabicTip: 'إذا كان n ≠ m فالتكامل = 0 مباشرة بسبب التعامد (Orthogonality)!',
      },
      {
        id: 'leg_integral_product',
        formula: '\\int_{-1}^1 x P_n(x) P_{n-1}(x) \\, dx = \\frac{n}{2n + 1} \\int_{-1}^1 [P_{n-1}(x)]^2 \\, dx = \\frac{2n}{(2n+1)(2n-1)}',
        description: 'Evaluated exam integral combining recurrence relation and orthogonality',
      },
    ],
    tricks: [
      'Integral evaluation trick: If asked to evaluate ∫_-1^1 P1(x) P2(x) dx, since 1 ≠ 2, the answer is immediately 0 by orthogonality!',
      'For ∫_-1^1 x P5(x) P4(x) dx: Substitute x P5(x) = 6/11 P6(x) + 5/11 P4(x). Then ∫ P6 P4 dx = 0, leaving 5/11 ∫_-1^1 [P4(x)]^2 dx = 5/11 · (2 / (2(4)+1)) = 5/11 · 2/9 = 10/99.',
      'Base values: P0(x) = 1, P1(x) = x, P2(x) = 1/2 (3x^2 - 1), P3(x) = 1/2 (5x^3 - 3x).',
    ],
  },
];
