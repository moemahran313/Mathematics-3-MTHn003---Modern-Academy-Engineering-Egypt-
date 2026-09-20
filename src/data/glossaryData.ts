import { Category, GlossaryTerm } from '../types';

export const GLOSSARY_DATA: GlossaryTerm[] = [
  // CHAPTER 1 & FOUNDATIONS
  {
    id: 'term_ode',
    term: 'Ordinary Differential Equation (ODE)',
    arabicTerm: 'معادلة تفاضلية عادية',
    category: Category.BASIC_ODE,
    chapter: 'Ch. 1: Foundations',
    definition:
      'An equation containing an unknown function of a single independent variable and one or more of its derivatives.',
    formula: 'F\\left(x, y, y\', y\'\', \\dots, y^{(n)}\\right) = 0',
    example: {
      problem: 'Classify $y\'\' + 3y\' + 2y = \\sin(x)$ as an ODE or PDE.',
      formula: 'y\'\' + 3y\' + 2y = \\sin(x)',
      solution:
        'This is an Ordinary Differential Equation (ODE) because it involves derivatives with respect to only one independent variable $x$, with unknown function $y(x)$.',
    },
    noteOrTrap: 'If derivatives are partial (e.g., $\\frac{\\partial u}{\\partial t}$), it is a PDE, not an ODE.',
    relatedTerms: ['Order of an ODE', 'Linearity', 'Initial Value Problem (IVP)'],
  },
  {
    id: 'term_order',
    term: 'Order of a Differential Equation',
    arabicTerm: 'رتبة المعادلة التفاضلية',
    category: Category.BASIC_ODE,
    chapter: 'Ch. 1: Foundations',
    definition:
      'The order of the highest derivative of the dependent variable appearing in the differential equation.',
    formula: '\\text{Order} = n \\iff \\max\\{k : y^{(k)} \\text{ is present in } F\\} = n',
    example: {
      problem: 'Find the order of $\\left(\\frac{d^3y}{dx^3}\\right)^2 + \\left(\\frac{dy}{dx}\\right)^5 = x^2$.',
      formula: '\\left(\\frac{d^3y}{dx^3}\\right)^2 + \\left(\\frac{dy}{dx}\\right)^5 = x^2',
      solution:
        'The derivatives present are $y\'\'\'$ (3rd derivative) and $y\'$ (1st derivative). The highest derivative is the 3rd derivative, so the order is 3.',
    },
    noteOrTrap: 'Do not confuse the power (exponent) with the derivative order. Exponent 5 does not affect the order.',
    relatedTerms: ['Degree of an ODE', 'Linearity'],
  },
  {
    id: 'term_degree',
    term: 'Degree of a Differential Equation',
    arabicTerm: 'درجة المعادلة التفاضلية',
    category: Category.BASIC_ODE,
    chapter: 'Ch. 1: Foundations',
    definition:
      'The algebraic power (exponent) of the highest-order derivative appearing in the equation, after the equation has been cleared of fractional powers and radicals with respect to all derivatives.',
    formula: '\\left( y^{(n)} \\right)^k + \\dots = 0 \\implies \\text{Degree} = k',
    example: {
      problem: 'Find the degree of $y\'\' = \\sqrt{1 + (y\')^3}$.',
      formula: '(y\'\')^2 = 1 + (y\')^3',
      solution:
        'Square both sides to remove the radical: $(y\'\')^2 = 1 + (y\')^3$. The highest derivative is $y\'\'$, which is raised to power 2. Hence, Order = 2, Degree = 2.',
    },
    noteOrTrap: 'Always eliminate fractional powers/radicals around derivatives before reading the degree.',
    relatedTerms: ['Order of an ODE', 'Linearity'],
  },
  {
    id: 'term_linearity',
    term: 'Linearity of an ODE',
    arabicTerm: 'خطية المعادلة التفاضلية',
    category: Category.BASIC_ODE,
    chapter: 'Ch. 1: Foundations',
    definition:
      'An ODE is linear if the dependent variable $y$ and all its derivatives appear to the first power only, there are no products of $y$ and/or its derivatives, and no transcendental functions of $y$ (like $\\sin y, e^y, \\ln y$).',
    formula: 'a_n(x) y^{(n)} + a_{n-1}(x) y^{(n-1)} + \\dots + a_1(x) y\' + a_0(x) y = g(x)',
    example: {
      problem: 'Is $y\' + x y^2 = 0$ linear or non-linear?',
      formula: 'y\' + x y^2 = 0',
      solution:
        'Non-linear, because the dependent variable $y$ is raised to power 2 ($y^2$).',
    },
    noteOrTrap: 'Coefficients can be non-linear functions of $x$ (e.g., $x^2, \\sin x$), which does not violate linearity.',
    relatedTerms: ['Linear First-Order ODE', 'Bernoulli Differential Equation'],
  },
  {
    id: 'term_ivp_bvp',
    term: 'Initial Value Problem (IVP) vs. BVP',
    arabicTerm: 'مسألة القيمة الابتدائية والقيمة الحدية',
    category: Category.BASIC_ODE,
    chapter: 'Ch. 1: Foundations',
    definition:
      'An IVP specifies conditions on $y$ and its derivatives at a SINGLE point $x_0$ (e.g., $y(0) = 1, y\'(0) = 2$). A Boundary Value Problem (BVP) specifies conditions at TWO OR MORE distinct points (e.g., $y(0) = 0, y(L) = 0$).',
    formula: '\\text{IVP: } y(x_0) = y_0, \\, y\'(x_0) = y_1 \\quad \\text{vs.} \\quad \\text{BVP: } y(a) = y_a, \\, y(b) = y_b',
    example: {
      problem: 'Determine if $y\'\' + y = 0$ with $y(0) = 1, y(\\pi) = 0$ is an IVP or BVP.',
      formula: 'y(0) = 1, \\quad y(\\pi) = 0',
      solution:
        'Because the conditions are specified at two distinct points ($x = 0$ and $x = \\pi$), this is a Boundary Value Problem (BVP).',
    },
    noteOrTrap: 'Laplace transform is naturally suited for IVPs specified at $t = 0$.',
    relatedTerms: ['Laplace Transform', 'Fourier Series'],
  },

  // CHAPTER 2: FIRST-ORDER ODEs
  {
    id: 'term_separable',
    term: 'Separable Differential Equation',
    arabicTerm: 'معادلة قابلة لفصل المتغيرات',
    category: Category.SEPARATION,
    chapter: 'Ch. 2: First-Order ODEs',
    definition:
      'A first-order ODE where the derivative $\\frac{dy}{dx}$ can be factored as a product of a function of $x$ only and a function of $y$ only: $\\frac{dy}{dx} = g(x) h(y)$.',
    formula: '\\frac{1}{h(y)} \\, dy = g(x) \\, dx \\implies \\int \\frac{dy}{h(y)} = \\int g(x) \\, dx + C',
    example: {
      problem: 'Separate variables for $y\' = \\frac{x}{y}$.',
      formula: 'y \\, dy = x \\, dx',
      solution:
        'Multiplying both sides by $y \\, dx$ yields $y \\, dy = x \\, dx$. Integrating both sides gives $\\frac{1}{2}y^2 = \\frac{1}{2}x^2 + C_1 \\implies y^2 - x^2 = C$.',
    },
    noteOrTrap: 'Look out for exponential additions: $e^{x+y} = e^x \\cdot e^y$ immediately allows separation.',
    relatedTerms: ['Reducible to Separable', 'Exact Differential Equation'],
  },
  {
    id: 'term_homogeneous_ode',
    term: 'Homogeneous First-Order ODE',
    arabicTerm: 'معادلة تفاضلية متجانسة',
    category: Category.HOMOGENEOUS,
    chapter: 'Ch. 2: First-Order ODEs',
    definition:
      'An equation $\\frac{dy}{dx} = f(x, y)$ where $f(x, y)$ is homogeneous of degree zero, meaning $f(tx, ty) = f(x, y)$, or equivalently $\\frac{dy}{dx} = g\\left(\\frac{y}{x}\\right)$.',
    formula: 'y = u \\cdot x \\implies \\frac{dy}{dx} = u + x \\frac{du}{dx}',
    example: {
      problem: 'Solve $(x^2 + y^2) dx - 2xy \\, dy = 0$ using $y = ux$.',
      formula: '\\frac{dy}{dx} = \\frac{x^2 + y^2}{2xy} = \\frac{1 + u^2}{2u}',
      solution:
        'Substitute $y = ux, y\' = u + x u\'$. Then $u + x\\frac{du}{dx} = \\frac{1+u^2}{2u} \\implies x\\frac{du}{dx} = \\frac{1-u^2}{2u}$, which separates cleanly.',
    },
    noteOrTrap: 'Always remember to substitute back $u = \\frac{y}{x}$ at the very end of your derivation.',
    relatedTerms: ['Separable Differential Equation', 'Bernoulli Differential Equation'],
  },
  {
    id: 'term_exact_ode',
    term: 'Exact Differential Equation',
    arabicTerm: 'معادلة تفاضلية تامة',
    category: Category.EXACT_EQUATIONS,
    chapter: 'Ch. 2: First-Order ODEs',
    definition:
      'A differential equation $M(x, y) dx + N(x, y) dy = 0$ representing the total differential $d\\Phi = 0$ of some potential function $\\Phi(x, y)$, which occurs if and only if $\\frac{\\partial M}{\\partial y} = \\frac{\\partial N}{\\partial x}$.',
    formula: '\\frac{\\partial M}{\\partial y} = \\frac{\\partial N}{\\partial x} \\iff \\Phi(x, y) = C',
    example: {
      problem: 'Test $(2xy + 3) dx + (x^2 - 1) dy = 0$ for exactness.',
      formula: 'M = 2xy + 3, \\quad N = x^2 - 1',
      solution:
        '$\\frac{\\partial M}{\\partial y} = 2x$ and $\\frac{\\partial N}{\\partial x} = 2x$. Since $\\frac{\\partial M}{\\partial y} = \\frac{\\partial N}{\\partial x} = 2x$, the equation is exact. Solution: $\\Phi(x, y) = x^2 y + 3x - y = C$.',
    },
    noteOrTrap: 'Euler-Cauchy reciprocity test: $M$ is with $dx$ so test with $\\partial/\\partial y$; $N$ is with $dy$ so test with $\\partial/\\partial x$.',
    relatedTerms: ['Integrating Factor', 'Separable Differential Equation'],
  },
  {
    id: 'term_integrating_factor',
    term: 'Integrating Factor (I.F.)',
    arabicTerm: 'معامل التكامل',
    category: Category.EXACT_EQUATIONS,
    chapter: 'Ch. 2: First-Order ODEs',
    definition:
      'A non-zero function $\\mu(x, y)$ that multiplies a non-exact differential equation to transform it into an exact differential equation, or multiplies a first-order linear ODE to make the left-hand side a product derivative.',
    formula: '\\mu(x) = \\exp\\left(\\int \\frac{M_y - N_x}{N} \\, dx\\right) \\quad \\text{or} \\quad \\mu(y) = \\exp\\left(\\int \\frac{N_x - M_y}{M} \\, dy\\right)',
    example: {
      problem: 'Find the integrating factor for $y\' + 2y = e^{-x}$.',
      formula: '\\mu(x) = e^{\\int 2 \\, dx} = e^{2x}',
      solution:
        'Multiplying both sides by $e^{2x}$ produces $\\frac{d}{dx}\\left(e^{2x} y\\right) = e^x$. Integrating gives $e^{2x} y = e^x + C \\implies y = e^{-x} + C e^{-2x}$.',
    },
    noteOrTrap: 'In $\\mu(x) = e^{\\int P(x)dx}$, never add an integration constant $+ C$ to the exponent.',
    relatedTerms: ['Linear First-Order ODE', 'Exact Differential Equation'],
  },
  {
    id: 'term_linear_first_order',
    term: 'Linear First-Order ODE',
    arabicTerm: 'معادلة خطية من الرتبة الأولى',
    category: Category.LINEAR_FIRST_ORDER,
    chapter: 'Ch. 2: First-Order ODEs',
    definition:
      'An equation expressing a linear relationship between $y$ and its first derivative $y\'$, written in canonical standard form as $y\' + P(x) y = Q(x)$.',
    formula: 'y(x) = \\frac{1}{\\mu(x)} \\left[ \\int \\mu(x) Q(x) \\, dx + C \\right], \\quad \\mu(x) = e^{\\int P(x) \\, dx}',
    example: {
      problem: 'Solve $x y\' + 2y = 4x^2$.',
      formula: 'y\' + \\frac{2}{x}y = 4x',
      solution:
        'Standard form: $P(x) = 2/x, Q(x) = 4x$. Integrating factor: $\\mu(x) = e^{\\int (2/x)dx} = e^{\\ln(x^2)} = x^2$. Then $y = \\frac{1}{x^2} \\left[ \\int x^2 (4x) dx + C \\right] = x^2 + \\frac{C}{x^2}$.',
    },
    noteOrTrap: 'Always divide through by any coefficient multiplying $y\'$ (like $x$) before identifying $P(x)$!',
    relatedTerms: ['Bernoulli Differential Equation', 'Integrating Factor'],
  },
  {
    id: 'term_bernoulli',
    term: 'Bernoulli Differential Equation',
    arabicTerm: 'معادلة برنولي التفاضلية',
    category: Category.BERNOULLI,
    chapter: 'Ch. 2: First-Order ODEs',
    definition:
      'A famous non-linear first-order differential equation having the specific power-form $y\' + P(x) y = Q(x) y^n$, solvable by substitution $z = y^{1-n}$.',
    formula: 'z = y^{1-n} \\implies \\frac{dz}{dx} + (1-n) P(x) z = (1-n) Q(x)',
    example: {
      problem: 'Transform $y\' - y = x y^3$ into linear form.',
      formula: 'z = y^{1 - 3} = y^{-2}',
      solution:
        'Here $n = 3$. Set $z = y^{-2}$, so $z\' = -2 y^{-3} y\'$. Dividing original equation by $y^3$ gives $y^{-3}y\' - y^{-2} = x$. Substituting: $-\\frac{1}{2} z\' - z = x \\implies z\' + 2z = -2x$, which is linear in $z$.',
    },
    noteOrTrap: 'Cases $n = 0$ and $n = 1$ are already linear and separable, so Bernoulli is only needed for $n \\neq 0, 1$.',
    relatedTerms: ['Linear First-Order ODE', 'Homogeneous First-Order ODE'],
  },

  // CHAPTER 3: HIGHER-ORDER LINEAR ODEs
  {
    id: 'term_auxiliary_eq',
    term: 'Auxiliary (Characteristic) Equation',
    arabicTerm: 'المعادلة المميزة (المساعدة)',
    category: Category.HIGHER_ORDER_HOMOGENEOUS,
    chapter: 'Ch. 3: Higher-Order ODEs',
    definition:
      'An algebraic polynomial equation obtained by substituting the exponential ansatz $y = e^{mx}$ into a homogeneous linear differential equation with constant coefficients $a y\'\' + b y\' + c y = 0$.',
    formula: 'a m^2 + b m + c = 0 \\implies m = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
    example: {
      problem: 'Find the general solution of $y\'\' - 6y\' + 9y = 0$.',
      formula: 'm^2 - 6m + 9 = (m-3)^2 = 0 \\implies m_1 = m_2 = 3',
      solution:
        'Repeated real roots $m = 3, 3$. The general solution includes a multiplying factor of $x$: $y_h(x) = (C_1 + C_2 x) e^{3x}$.',
    },
    noteOrTrap: 'For complex conjugate roots $\\alpha \\pm i\\beta$, solution is $e^{\\alpha x}[C_1 \\cos(\\beta x) + C_2 \\sin(\\beta x)]$. Do not write imaginary $i$ in the solution.',
    relatedTerms: ['Wronskian Determinant', 'Complementary vs. Particular Solution'],
  },
  {
    id: 'term_wronskian',
    term: 'Wronskian Determinant',
    arabicTerm: 'محدد رونسكي',
    category: Category.VARIATION_OF_PARAMETERS,
    chapter: 'Ch. 3: Higher-Order ODEs',
    definition:
      'A determinant function used to test whether a set of $n$ solutions $y_1, y_2, \\dots, y_n$ to an $n$-th order linear ODE are linearly independent over an interval.',
    formula: 'W(y_1, y_2) = \\begin{vmatrix} y_1 & y_2 \\\\ y_1\' & y_2\' \\end{vmatrix} = y_1 y_2\' - y_2 y_1\'',
    example: {
      problem: 'Compute $W(e^{2x}, e^{-2x})$.',
      formula: 'W = \\begin{vmatrix} e^{2x} & e^{-2x} \\\\ 2e^{2x} & -2e^{-2x} \\end{vmatrix}',
      solution:
        '$W = e^{2x}(-2e^{-2x}) - e^{-2x}(2e^{2x}) = -2 - 2 = -4 \\neq 0$. Because $W \\neq 0$, the functions are linearly independent.',
    },
    noteOrTrap: 'If $W = 0$ on the interval, the functions are linearly dependent and cannot form a fundamental set of solutions.',
    relatedTerms: ['Method of Variation of Parameters', 'Reduction of Order'],
  },
  {
    id: 'term_complementary_particular',
    term: 'Complementary Solution ($y_h$) vs. Particular Integral ($y_p$)',
    arabicTerm: 'الحل المتمم والحل الخاص',
    category: Category.UNDETERMINED_COEFFS,
    chapter: 'Ch. 3: Higher-Order ODEs',
    definition:
      'The complete general solution of a non-homogeneous linear ODE $L[y] = f(x)$ is the sum $y(x) = y_h(x) + y_p(x)$, where $y_h$ satisfies the homogeneous equation $L[y] = 0$, and $y_p$ is any single specific solution satisfying $L[y] = f(x)$.',
    formula: 'y(x) = y_h(x) + y_p(x) = \\sum_{i=1}^n C_i y_i(x) + y_p(x)',
    example: {
      problem: 'Solve $y\'\' + y = 2$.',
      formula: 'y\'\' + y = 2',
      solution:
        'Homogeneous part: $m^2 + 1 = 0 \\implies y_h = C_1 \\cos x + C_2 \\sin x$. Particular guess: $y_p = A \\implies 0 + A = 2 \\implies A = 2$. Complete solution: $y = C_1 \\cos x + C_2 \\sin x + 2$.',
    },
    noteOrTrap: 'Never determine arbitrary constants $C_1, C_2$ using initial conditions until AFTER you have added $y_p$ to $y_h$!',
    relatedTerms: ['Method of Undetermined Coefficients', 'Method of Variation of Parameters'],
  },
  {
    id: 'term_undetermined_coeffs',
    term: 'Method of Undetermined Coefficients',
    arabicTerm: 'طريقة المعاملات غير المحددة',
    category: Category.UNDETERMINED_COEFFS,
    chapter: 'Ch. 3: Higher-Order ODEs',
    definition:
      'A method for finding a particular integral $y_p$ of a constant-coefficient linear ODE when the non-homogeneous driving term $f(x)$ is composed of polynomials, exponentials, sines, and/or cosines.',
    formula: 'y_p = x^s \\cdot [\\text{trial family based on } f(x)]',
    example: {
      problem: 'Set up the trial form of $y_p$ for $y\'\' - 4y = e^{2x}$.',
      formula: 'y_h = C_1 e^{2x} + C_2 e^{-2x}',
      solution:
        'Normally for $e^{2x}$, guess $A e^{2x}$. But $e^{2x}$ already appears in $y_h$ (root multiplicity $s=1$). Therefore, multiply by $x$: $y_p = A x e^{2x}$.',
    },
    noteOrTrap: 'Modification rule: If any term in your initial guess for $y_p$ duplicates a term in $y_h$, multiply the entire guess by $x^s$.',
    relatedTerms: ['Method of Variation of Parameters', 'Complementary vs. Particular Solution'],
  },
  {
    id: 'term_variation_of_params',
    term: 'Method of Variation of Parameters',
    arabicTerm: 'طريقة تغيير الثوابت (المعالم)',
    category: Category.VARIATION_OF_PARAMETERS,
    chapter: 'Ch. 3: Higher-Order ODEs',
    definition:
      'A universal method for finding $y_p$ of any linear second-order ODE $y\'\' + P(x) y\' + Q(x) y = f(x)$, even when $f(x)$ contains functions like $\\tan x, \\sec x, \\frac{1}{x}$, where undetermined coefficients fails.',
    formula: 'y_p = -y_1 \\int \\frac{y_2 f(x)}{W} \\, dx + y_2 \\int \\frac{y_1 f(x)}{W} \\, dx',
    example: {
      problem: 'Find $y_p$ for $y\'\' + y = \\sec(x)$.',
      formula: 'y_1 = \\cos x, \\, y_2 = \\sin x, \\, W = 1',
      solution:
        '$y_p = -\\cos x \\int \\frac{\\sin x \\sec x}{1} dx + \\sin x \\int \\frac{\\cos x \\sec x}{1} dx = -\\cos x \\int \\tan x \\, dx + \\sin x \\int 1 \\, dx = \\cos x \\ln|\\cos x| + x \\sin x$.',
    },
    noteOrTrap: 'The ODE must have coefficient 1 in front of $y\'\'$. If it is $a(x) y\'\'$, divide everything by $a(x)$ first so $f(x)$ is correct.',
    relatedTerms: ['Wronskian Determinant', 'Method of Undetermined Coefficients'],
  },
  {
    id: 'term_reduction_of_order',
    term: 'Reduction of Order',
    arabicTerm: 'طريقة تخفيض الرتبة',
    category: Category.REDUCTION_OF_ORDER,
    chapter: 'Ch. 3: Higher-Order ODEs',
    definition:
      'A technique that uses one known non-trivial solution $y_1(x)$ of a homogeneous linear 2nd-order ODE to construct a second linearly independent solution $y_2(x) = v(x) y_1(x)$, reducing the order from 2 to 1.',
    formula: 'y_2(x) = y_1(x) \\int \\frac{e^{-\\int P(x) \\, dx}}{[y_1(x)]^2} \\, dx',
    example: {
      problem: 'Given $y_1 = x$ is a solution of $x^2 y\'\' - x y\' + y = 0$, find $y_2$.',
      formula: 'y\'\' - \\frac{1}{x}y\' + \\frac{1}{x^2}y = 0 \\implies P(x) = -1/x',
      solution:
        '$e^{-\\int P dx} = e^{\\int (1/x) dx} = x$. Then $y_2 = x \\int \\frac{x}{x^2} dx = x \\int \\frac{1}{x} dx = x \\ln x$. General solution: $y = C_1 x + C_2 x \\ln x$.',
    },
    noteOrTrap: 'Do not forget to normalize the equation by dividing by the coefficient of $y\'\'$ before reading $P(x)$.',
    relatedTerms: ['Wronskian Determinant', 'Auxiliary Equation'],
  },

  // CHAPTER 4: LAPLACE TRANSFORMS
  {
    id: 'term_laplace_transform',
    term: 'Laplace Transform',
    arabicTerm: 'تحويل لابلاس',
    category: Category.LAPLACE_TRANSFORMS,
    chapter: 'Ch. 4: Laplace Transforms',
    definition:
      'An integral transform converting a function of time $f(t)$ defined for $t \\ge 0$ into a function of complex frequency $s$, transforming differential equations into simple algebraic equations.',
    formula: '\\mathcal{L}\\{f(t)\\} = F(s) = \\int_0^\\infty e^{-st} f(t) \\, dt',
    example: {
      problem: 'Find the Laplace transform of $f(t) = e^{3t}$.',
      formula: '\\mathcal{L}\\{e^{3t}\\} = \\int_0^\\infty e^{-st} e^{3t} dt = \\int_0^\\infty e^{-(s-3)t} dt',
      solution:
        'Evaluating the improper integral for $s > 3$: $\\left[ \\frac{e^{-(s-3)t}}{-(s-3)} \\right]_0^\\infty = 0 - \\left( -\\frac{1}{s-3} \\right) = \\frac{1}{s-3}$.',
    },
    noteOrTrap: 'The transform exists only for functions that are piecewise continuous and of exponential order $|f(t)| \\le M e^{kt}$.',
    relatedTerms: ['First Shift Theorem', 'Inverse Laplace Transform'],
  },
  {
    id: 'term_first_shift',
    term: 'First Shift Theorem (Frequency Shift)',
    arabicTerm: 'نظرية الإزاحة الأولى',
    category: Category.LAPLACE_THEOREMS,
    chapter: 'Ch. 4: Laplace Transforms',
    definition:
      'Multiplying a time-domain function $f(t)$ by an exponential $e^{at}$ corresponds to translating its Laplace transform $F(s)$ along the real $s$-axis by $a$: replace every $s$ with $s - a$.',
    formula: '\\mathcal{L}\\{e^{at} f(t)\\} = F(s - a), \\quad \\text{where } F(s) = \\mathcal{L}\\{f(t)\\}',
    example: {
      problem: 'Find $\\mathcal{L}\\{e^{-2t} \\cos(3t)\\}$.',
      formula: '\\mathcal{L}\\{\\cos(3t)\\} = \\frac{s}{s^2 + 9}',
      solution:
        'Here $a = -2$. Shift $s \\to s - (-2) = s + 2$. Therefore: $\\mathcal{L}\\{e^{-2t} \\cos(3t)\\} = \\frac{s+2}{(s+2)^2 + 9}$.',
    },
    noteOrTrap: 'Watch the sign: $e^{+at}$ yields $s - a$, while $e^{-at}$ yields $s + a$.',
    relatedTerms: ['Second Shift Theorem', 'Laplace Transform'],
  },
  {
    id: 'term_heaviside_second_shift',
    term: 'Heaviside Unit Step Function & 2nd Shift',
    arabicTerm: 'دالة الخطوة لهيفسايد ونظرية الإزاحة الثانية',
    category: Category.LAPLACE_THEOREMS,
    chapter: 'Ch. 4: Laplace Transforms',
    definition:
      'The unit step function $u(t - a)$ represents a switch turning on at $t = a$. The Second Shift Theorem states that delaying a function by $a$ units corresponds to multiplying its transform by $e^{-as}$.',
    formula: 'u(t - a) = \\begin{cases} 0, & t < a \\\\ 1, & t \\ge a \\end{cases}, \\quad \\mathcal{L}\\{f(t - a) u(t - a)\\} = e^{-as} F(s)',
    example: {
      problem: 'Find $\\mathcal{L}\\{(t - 3)^2 u(t - 3)\\}$.',
      formula: 'f(t) = t^2 \\implies F(s) = \\frac{2}{s^3}',
      solution:
        'Applying the 2nd Shift Theorem with $a = 3$: $\\mathcal{L}\\{(t - 3)^2 u(t - 3)\\} = e^{-3s} F(s) = \\frac{2 e^{-3s}}{s^3}$.',
    },
    noteOrTrap: 'If given $g(t) u(t - a)$, you must first express $g(t)$ as a function of $(t - a)$ before taking the transform.',
    relatedTerms: ['First Shift Theorem', 'Inverse Laplace Transform'],
  },
  {
    id: 'term_frequency_differentiation',
    term: 'Multiplication by $t^n$ (Frequency Differentiation)',
    arabicTerm: 'الضرب في t وتفاضل تحويل لابلاس',
    category: Category.LAPLACE_THEOREMS,
    chapter: 'Ch. 4: Laplace Transforms',
    definition:
      'Multiplying a function $f(t)$ by $t^n$ in the time domain corresponds to differentiating its Laplace transform $F(s)$ $n$ times with respect to $s$ and multiplying by $(-1)^n$.',
    formula: '\\mathcal{L}\\{t^n f(t)\\} = (-1)^n \\frac{d^n}{ds^n} [F(s)]',
    example: {
      problem: 'Find $\\mathcal{L}\\{t \\sin(2t)\\}$.',
      formula: '\\mathcal{L}\\{\\sin(2t)\\} = \\frac{2}{s^2 + 4}',
      solution:
        '$\\mathcal{L}\\{t \\sin(2t)\\} = -\\frac{d}{ds}\\left(\\frac{2}{s^2 + 4}\\right) = -\\left( \\frac{-2(2s)}{(s^2 + 4)^2} \\right) = \\frac{4s}{(s^2 + 4)^2}$.',
    },
    noteOrTrap: 'Do not forget the alternating minus sign $(-1)^n$ when differentiating with respect to $s$.',
    relatedTerms: ['First Shift Theorem', 'Laplace Transform'],
  },
  {
    id: 'term_inverse_laplace',
    term: 'Inverse Laplace Transform',
    arabicTerm: 'معكوس تحويل لابلاس',
    category: Category.INVERSE_LAPLACE,
    chapter: 'Ch. 4: Laplace Transforms',
    definition:
      'The operation $\\mathcal{L}^{-1}\\{F(s)\\} = f(t)$ recovering the unique continuous time-domain function $f(t)$ from its frequency-domain representation $F(s)$, typically achieved using partial fractions, completing the square, or shift theorems.',
    formula: '\\mathcal{L}^{-1}\\{F(s)\\} = \\frac{1}{2\\pi i} \\int_{\\gamma - i\\infty}^{\\gamma + i\\infty} e^{st} F(s) \\, ds',
    example: {
      problem: 'Find $\\mathcal{L}^{-1}\\left\\{\\frac{s+1}{s^2 + 4s + 13}\\right\\}$.',
      formula: 's^2 + 4s + 13 = (s+2)^2 + 9',
      solution:
        'Complete the square: $\\frac{(s+2) - 1}{(s+2)^2 + 3^2} = \\frac{s+2}{(s+2)^2 + 3^2} - \\frac{1}{3} \\frac{3}{(s+2)^2 + 3^2}$. Taking inverse: $e^{-2t} \\cos(3t) - \\frac{1}{3} e^{-2t} \\sin(3t)$.',
    },
    noteOrTrap: 'When completing the square $(s+a)^2 + b^2$, ensure the numerator is also adjusted to match $(s+a)$.',
    relatedTerms: ['First Shift Theorem', 'Laplace Transform'],
  },
  {
    id: 'term_convolution',
    term: 'Convolution Theorem',
    arabicTerm: 'نظرية الالتفاف (الطي)',
    category: Category.INVERSE_LAPLACE,
    chapter: 'Ch. 4: Laplace Transforms',
    definition:
      'The inverse Laplace transform of a product of two transforms $F(s) \\cdot G(s)$ equals the convolution integral $(f * g)(t)$ of their individual inverses $f(t)$ and $g(t)$.',
    formula: '(f * g)(t) = \\int_0^t f(\\tau) g(t - \\tau) \\, d\\tau \\iff \\mathcal{L}\\{(f * g)(t)\\} = F(s) G(s)',
    example: {
      problem: 'Evaluate $\\mathcal{L}^{-1}\\left\\{\\frac{1}{s(s^2 + 1)}\\right\\}$ using convolution.',
      formula: 'F(s) = \\frac{1}{s} \\implies f(t) = 1, \\quad G(s) = \\frac{1}{s^2+1} \\implies g(t) = \\sin t',
      solution:
        '$(f * g)(t) = \\int_0^t 1 \\cdot \\sin(t - \\tau) \\, d\\tau = [\\cos(t - \\tau)]_0^t = \\cos(0) - \\cos(t) = 1 - \\cos(t)$.',
    },
    noteOrTrap: 'Convolution is commutative: $f * g = g * f$. Choose the simpler function as $f(\\tau)$.',
    relatedTerms: ['Inverse Laplace Transform', 'Laplace Transform'],
  },

  // CHAPTER 5: FOURIER SERIES & LEGENDRE
  {
    id: 'term_fourier_series',
    term: 'Fourier Series',
    arabicTerm: 'متسلسلة فورير',
    category: Category.FOURIER_SERIES,
    chapter: 'Ch. 5: Fourier & Legendre',
    definition:
      'An expansion of a periodic function $f(x)$ with period $2L$ as an infinite linear combination of orthogonal harmonics (sine and cosine functions).',
    formula: 'f(x) = \\frac{a_0}{2} + \\sum_{n=1}^\\infty \\left[ a_n \\cos\\left(\\frac{n\\pi x}{L}\\right) + b_n \\sin\\left(\\frac{n\\pi x}{L}\\right) \\right]',
    example: {
      problem: 'State the formula for Euler-Fourier coefficient $a_n$ over $[-L, L]$.',
      formula: 'a_n = \\frac{1}{L} \\int_{-L}^L f(x) \\cos\\left(\\frac{n\\pi x}{L}\\right) \\, dx',
      solution:
        'The formula calculates the projection of $f(x)$ onto the $n$-th cosine basis function. If $f(x)$ is odd, $a_n = 0$. If $f(x)$ is even, $a_n = \\frac{2}{L} \\int_0^L f(x) \\cos\\left(\\frac{n\\pi x}{L}\\right) dx$.',
    },
    noteOrTrap: 'Remember the constant term is $\\frac{a_0}{2}$, where $a_0 = \\frac{1}{L} \\int_{-L}^L f(x) dx$. Do not divide by 2 twice!',
    relatedTerms: ['Half-Range Fourier Expansions', 'Dirichlet Conditions'],
  },
  {
    id: 'term_dirichlet_conditions',
    term: 'Dirichlet Conditions',
    arabicTerm: 'شروط ديريكليه لتقارب فورير',
    category: Category.FOURIER_SERIES,
    chapter: 'Ch. 5: Fourier & Legendre',
    definition:
      'Sufficient conditions for a periodic function $f(x)$ to be represented by a convergent Fourier series: (1) $f(x)$ is single-valued and piecewise continuous with a finite number of jump discontinuities; (2) $f(x)$ has a finite number of local extrema per period; (3) $f(x)$ is absolutely integrable: $\\int_{-L}^L |f(x)| dx < \\infty$.',
    formula: '\\text{At a jump discontinuity } x_0: \\quad \\text{Series converges to } \\frac{f(x_0^+) + f(x_0^-)}{2}',
    example: {
      problem: 'A periodic square wave jumps from $-1$ to $+1$ at $x = 0$. What value does its Fourier series converge to at $x = 0$?',
      formula: '\\lim_{x \\to 0^-} f(x) = -1, \\quad \\lim_{x \\to 0^+} f(x) = 1',
      solution:
        'By Dirichlet\'s theorem, the series converges to the arithmetic mean of the left-hand and right-hand limits: $\\frac{f(0^+) + f(0^-)}{2} = \\frac{1 + (-1)}{2} = 0$.',
    },
    noteOrTrap: 'Exam favorite question: At endpoints or jump points, the Fourier series always converges to the average of the jump!',
    relatedTerms: ['Fourier Series', 'Half-Range Fourier Expansions'],
  },
  {
    id: 'term_half_range_expansions',
    term: 'Half-Range Fourier Cosine & Sine Expansions',
    arabicTerm: 'متسلسلات نصف المدى (جيب وجيب تمام)',
    category: Category.FOURIER_SERIES,
    chapter: 'Ch. 5: Fourier & Legendre',
    definition:
      'A method to expand a function defined only on $(0, L)$ into a Fourier series by creating an even periodic extension (yielding a Cosine series with $b_n = 0$) or an odd periodic extension (yielding a Sine series with $a_0 = a_n = 0$).',
    formula: '\\text{Cosine: } f(x) = \\frac{a_0}{2} + \\sum_{n=1}^\\infty a_n \\cos\\left(\\frac{n\\pi x}{L}\\right) \\quad | \\quad \\text{Sine: } f(x) = \\sum_{n=1}^\\infty b_n \\sin\\left(\\frac{n\\pi x}{L}\\right)',
    example: {
      problem: 'Expand $f(x) = x$ on $(0, \\pi)$ as a Fourier Sine Series.',
      formula: 'b_n = \\frac{2}{\\pi} \\int_0^\\pi x \\sin(nx) \\, dx',
      solution:
        'Since this is a Sine Series, $a_0 = 0$ and $a_n = 0$. Integrating by parts yields $b_n = \\frac{2(-1)^{n+1}}{n}$. Thus, $x = 2\\sum_{n=1}^\\infty \\frac{(-1)^{n+1}}{n} \\sin(nx)$.',
    },
    noteOrTrap: 'For a half-range expansion over $(0, L)$, the period of the extension is $2L$ and the integration factor in front is $\\frac{2}{L}$!',
    relatedTerms: ['Fourier Series', 'Dirichlet Conditions'],
  },
  {
    id: 'term_legendre_equation',
    term: 'Legendre Differential Equation',
    arabicTerm: 'معادلة ليجاندر التفاضلية',
    category: Category.LEGENDRE_POLYNOMIALS,
    chapter: 'Ch. 5: Fourier & Legendre',
    definition:
      'A fundamental second-order ODE appearing in spherical coordinate boundary value problems (Laplace equation in electrostatics, gravitation, and quantum mechanics).',
    formula: '(1 - x^2) y\'\' - 2x y\' + n(n + 1) y = 0, \\quad -1 \\le x \\le 1',
    example: {
      problem: 'Identify the parameter $n$ in $(1 - x^2)y\'\' - 2x y\' + 12 y = 0$.',
      formula: 'n(n + 1) = 12',
      solution:
        'Solve the quadratic $n^2 + n - 12 = 0 \\implies (n + 4)(n - 3) = 0$. Taking the non-negative integer degree gives $n = 3$. The polynomial solution is $P_3(x)$.',
    },
    noteOrTrap: 'Regular singular points occur at $x = \\pm 1$. Only integer $n \\ge 0$ gives solutions bounded on $[-1, 1]$.',
    relatedTerms: ['Legendre Polynomials', 'Rodrigues\' Formula'],
  },
  {
    id: 'term_legendre_polynomials',
    term: 'Legendre Polynomials ($P_n(x)$)',
    arabicTerm: 'كثيرات حدود ليجاندر',
    category: Category.LEGENDRE_POLYNOMIALS,
    chapter: 'Ch. 5: Fourier & Legendre',
    definition:
      'The bounded polynomial solutions to Legendre\'s differential equation for integer $n \\ge 0$, normalized such that $P_n(1) = 1$ for all $n$.',
    formula: 'P_0(x) = 1, \\quad P_1(x) = x, \\quad P_2(x) = \\frac{1}{2}(3x^2 - 1), \\quad P_3(x) = \\frac{1}{2}(5x^3 - 3x)',
    example: {
      problem: 'Express $f(x) = x^2$ in terms of Legendre polynomials.',
      formula: 'P_2(x) = \\frac{3}{2}x^2 - \\frac{1}{2} \\implies x^2 = \\frac{2}{3}P_2(x) + \\frac{1}{3}P_0(x)',
      solution:
        'Since $P_0(x) = 1$ and $P_2(x) = \\frac{1}{2}(3x^2 - 1)$, we have $3x^2 = 2P_2(x) + 1$. Dividing by 3 gives $x^2 = \\frac{2}{3}P_2(x) + \\frac{1}{3}P_0(x)$.',
    },
    noteOrTrap: '$P_n(x)$ has parity $(-1)^n$: $P_n(-x) = (-1)^n P_n(x)$. For even $n$, $P_n(x)$ is even; for odd $n$, $P_n(x)$ is odd.',
    relatedTerms: ['Orthogonality of Legendre Polynomials', 'Rodrigues\' Formula'],
  },
  {
    id: 'term_rodrigues_formula',
    term: 'Rodrigues\' Formula',
    arabicTerm: 'صيغة رودريجز لكثيرات حدود ليجاندر',
    category: Category.LEGENDRE_POLYNOMIALS,
    chapter: 'Ch. 5: Fourier & Legendre',
    definition:
      'A compact formula that generates the $n$-th degree Legendre polynomial $P_n(x)$ through the $n$-th derivative of $(x^2 - 1)^n$.',
    formula: 'P_n(x) = \\frac{1}{2^n n!} \\frac{d^n}{dx^n}\\left[(x^2 - 1)^n\\right]',
    example: {
      problem: 'Use Rodrigues\' formula to compute $P_2(x)$.',
      formula: 'P_2(x) = \\frac{1}{2^2 \\cdot 2!} \\frac{d^2}{dx^2}\\left[(x^2 - 1)^2\\right]',
      solution:
        '$(x^2 - 1)^2 = x^4 - 2x^2 + 1$. First derivative: $4x^3 - 4x$. Second derivative: $12x^2 - 4$. Multiplying by $\\frac{1}{8}$ gives $P_2(x) = \\frac{12x^2 - 4}{8} = \\frac{1}{2}(3x^2 - 1)$.',
    },
    noteOrTrap: 'Always divide by $2^n n!$. Forgetting the factorial or power of 2 ruins the normalization.',
    relatedTerms: ['Legendre Polynomials', 'Bonnet\'s Recurrence Relations'],
  },
  {
    id: 'term_legendre_orthogonality',
    term: 'Orthogonality of Legendre Polynomials',
    arabicTerm: 'تعامد كثيرات حدود ليجاندر',
    category: Category.LEGENDRE_POLYNOMIALS,
    chapter: 'Ch. 5: Fourier & Legendre',
    definition:
      'Legendre polynomials form an orthogonal basis on $[-1, 1]$ with weight function $w(x) = 1$. The integral of the product of two different Legendre polynomials is identically zero.',
    formula: '\\int_{-1}^1 P_n(x) P_m(x) \\, dx = \\begin{cases} 0, & n \\neq m \\\\ \\frac{2}{2n + 1}, & n = m \\end{cases}',
    example: {
      problem: 'Evaluate $\\int_{-1}^1 (5x^3 - 3x) P_1(x) \\, dx$.',
      formula: '5x^3 - 3x = 2 P_3(x)',
      solution:
        'The integral becomes $2 \\int_{-1}^1 P_3(x) P_1(x) dx$. By orthogonality with $n=3 \\neq m=1$, the integral is identically $0$.',
    },
    noteOrTrap: 'Exam trap: Whenever $n \\neq m$, the answer is ALWAYS 0! When $n = m$, the answer is $\\frac{2}{2n+1}$.',
    relatedTerms: ['Legendre Polynomials', 'Generating Function for Legendre Polynomials'],
  },
  {
    id: 'term_bonnet_recurrence',
    term: 'Bonnet\'s Recurrence Relations',
    arabicTerm: 'علاقة بونيه التكرارية لليجاندر',
    category: Category.LEGENDRE_POLYNOMIALS,
    chapter: 'Ch. 5: Fourier & Legendre',
    definition:
      'Fundamental recurrence identities connecting consecutive Legendre polynomials and their derivatives, derived from the generating function.',
    formula: '(n + 1) P_{n+1}(x) = (2n + 1) x P_n(x) - n P_{n-1}(x)',
    example: {
      problem: 'Use Bonnet\'s formula with $n = 1$ to find $P_2(x)$, knowing $P_0(x) = 1$ and $P_1(x) = x$.',
      formula: '(1 + 1) P_2(x) = (2(1) + 1) x P_1(x) - 1 P_0(x)',
      solution:
        '$2 P_2(x) = 3x(x) - 1(1) = 3x^2 - 1 \\implies P_2(x) = \\frac{1}{2}(3x^2 - 1)$.',
    },
    noteOrTrap: 'Another useful recurrence relation for derivatives: $x P_n\'(x) - P_{n-1}\'(x) = n P_n(x)$.',
    relatedTerms: ['Legendre Polynomials', 'Generating Function for Legendre Polynomials'],
  },
  {
    id: 'term_generating_function',
    term: 'Generating Function for Legendre Polynomials',
    arabicTerm: 'الدالة المولدة لكثيرات حدود ليجاندر',
    category: Category.LEGENDRE_POLYNOMIALS,
    chapter: 'Ch. 5: Fourier & Legendre',
    definition:
      'A two-variable analytic function whose Taylor series expansion in powers of $t$ has Legendre polynomials $P_n(x)$ as its coefficients.',
    formula: '\\Phi(x, t) = \\frac{1}{\\sqrt{1 - 2xt + t^2}} = \\sum_{n=0}^\\infty P_n(x) t^n, \\quad |t| < 1',
    example: {
      problem: 'Prove that $P_n(1) = 1$ using the generating function.',
      formula: '\\Phi(1, t) = \\frac{1}{\\sqrt{1 - 2t + t^2}} = \\frac{1}{\\sqrt{(1 - t)^2}} = \\frac{1}{1 - t}',
      solution:
        'Expanding $\\frac{1}{1 - t} = \\sum_{n=0}^\\infty t^n$. Equating coefficients with $\\sum_{n=0}^\\infty P_n(1) t^n$ reveals $P_n(1) = 1$ for all $n \\ge 0$.',
    },
    noteOrTrap: 'Setting $x = -1$ gives $\\frac{1}{1+t} = \\sum (-1)^n t^n$, proving that $P_n(-1) = (-1)^n$.',
    relatedTerms: ['Legendre Polynomials', 'Bonnet\'s Recurrence Relations'],
  },
];
