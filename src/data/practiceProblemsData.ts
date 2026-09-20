import { Category, PracticeProblem } from '../types';

export const PRACTICE_PROBLEMS_DATA: PracticeProblem[] = [
  // --- Lecture 1 (Week 1) Practice Problems ---
  {
    id: 'pr_lec1_sep_1',
    topicId: 'ch2_separation',
    category: Category.SEPARATION,
    question: 'Solve the differential equation from Lecture 1: $x y\' = 1 + y^2$',
    difficulty: 'Easy',
    techniques: ['Separation of variables', 'Standard arctan integral'],
    finalAnswer: '\\tan^{-1}(y) = \\ln|x| + C',
    steps: [
      {
        title: 'Rewrite in differential form',
        explanation: 'Write derivative y\' as dy/dx: x(dy/dx) = 1 + y².',
        mathFormula: 'x \\frac{dy}{dx} = 1 + y^2 \\implies x \\, dy = (1 + y^2) \\, dx',
      },
      {
        title: 'Separate variables',
        explanation: 'Divide both sides by x(1 + y²).',
        mathFormula: '\\frac{1}{1 + y^2} \\, dy = \\frac{1}{x} \\, dx',
      },
      {
        title: 'Integrate both sides',
        explanation: 'Use the standard anti-derivative for inverse tangent and natural log.',
        mathFormula: '\\int \\frac{1}{1 + y^2} \\, dy = \\int \\frac{1}{x} \\, dx \\implies \\tan^{-1}(y) = \\ln|x| + C',
      },
    ],
  },
  {
    id: 'pr_lec1_sep_radicals',
    topicId: 'ch2_separation',
    category: Category.SEPARATION,
    question: 'Solve the differential equation from Lecture 1: $\\sqrt{1-x^2}\\,dy - \\sqrt{1-y^2}\\,dx = 0$',
    difficulty: 'Medium',
    techniques: ['Separation of variables', 'Standard arcsin integral'],
    finalAnswer: '\\sin^{-1}(y) = \\sin^{-1}(x) + C',
    steps: [
      {
        title: 'Isolate differentials',
        explanation: 'Move the dx term to the right-hand side.',
        mathFormula: '\\sqrt{1-x^2} \\, dy = \\sqrt{1-y^2} \\, dx',
      },
      {
        title: 'Separate variables',
        explanation: 'Divide both sides by √(1-x²) · √(1-y²).',
        mathFormula: '\\frac{1}{\\sqrt{1-y^2}} \\, dy = \\frac{1}{\\sqrt{1-x^2}} \\, dx',
      },
      {
        title: 'Integrate both sides',
        explanation: 'Apply the standard integral identity ∫ 1/√(1-u²) du = sin⁻¹(u).',
        mathFormula: '\\int \\frac{1}{\\sqrt{1-y^2}} \\, dy = \\int \\frac{1}{\\sqrt{1-x^2}} \\, dx \\implies \\sin^{-1}(y) = \\sin^{-1}(x) + C',
      },
    ],
  },
  {
    id: 'pr_lec1_sep_sin_parts',
    topicId: 'ch2_separation',
    category: Category.SEPARATION,
    question: 'Solve the differential equation from Lecture 1: $\\sin\\left(\\frac{dy}{dx}\\right) = x$',
    difficulty: 'Hard',
    techniques: ['Trigonometric inversion', 'Integration by parts'],
    finalAnswer: 'y = x \\sin^{-1}(x) + \\sqrt{1-x^2} + C',
    steps: [
      {
        title: 'Take arcsine of both sides',
        explanation: 'Invert the sine function on the left to isolate dy/dx.',
        mathFormula: '\\frac{dy}{dx} = \\sin^{-1}(x)',
      },
      {
        title: 'Separate variables',
        explanation: 'Multiply both sides by dx.',
        mathFormula: 'dy = \\sin^{-1}(x) \\, dx \\implies \\int dy = \\int \\sin^{-1}(x) \\, dx',
      },
      {
        title: 'Integrate arcsin(x) by parts',
        explanation: 'Let u = sin⁻¹(x), dv = dx -> du = 1/√(1-x²) dx, v = x. Then ∫ u dv = uv - ∫ v du.',
        mathFormula: '\\int \\sin^{-1}(x) \\, dx = x \\sin^{-1}(x) - \\int \\frac{x}{\\sqrt{1-x^2}} \\, dx',
      },
      {
        title: 'Complete the integral',
        explanation: 'The integral ∫ -x/√(1-x²) dx evaluates directly to √(1-x²).',
        mathFormula: 'y = x \\sin^{-1}(x) + \\sqrt{1-x^2} + C',
      },
    ],
  },
  {
    id: 'pr_lec1_sep_log_quotient',
    topicId: 'ch2_separation',
    category: Category.SEPARATION,
    question: 'Solve the differential equation from Lecture 1: $y\\,dx + x\\ln x\\,dy = 0$',
    difficulty: 'Medium',
    techniques: ['Separation of variables', 'Logarithmic differentiation trick'],
    finalAnswer: '\\ln|\\ln x| = -\\ln|y| + C',
    steps: [
      {
        title: 'Separate differentials',
        explanation: 'Move y dx to the RHS and divide by y · x ln x.',
        mathFormula: '\\frac{1}{x \\ln x} \\, dx = -\\frac{1}{y} \\, dy',
      },
      {
        title: 'Recognize derivative over function',
        explanation: 'The term 1/(x ln x) is (1/x)/ln(x), where numerator is derivative of denominator.',
        mathFormula: '\\int \\frac{1/x}{\\ln x} \\, dx = -\\int \\frac{1}{y} \\, dy',
      },
      {
        title: 'Integrate both sides',
        explanation: 'Integration yields nested natural logarithms.',
        mathFormula: '\\ln|\\ln x| = -\\ln|y| + C \\iff y \\ln x = C_1',
      },
    ],
  },
  {
    id: 'pr_lec1_red_sum',
    topicId: 'ch2_reducible_separation',
    category: Category.REDUCIBLE_SEPARATION,
    question: 'Solve the reducible ODE from Lecture 1: $\\frac{dy}{dx} = x + y$',
    difficulty: 'Easy',
    techniques: ['Substitution z = x + y', 'Separation of variables'],
    finalAnswer: '\\ln|1 + x + y| = x + C',
    steps: [
      {
        title: 'Define substitution variable z',
        explanation: 'Let z = x + y. Differentiating with respect to x gives dz/dx = 1 + dy/dx -> dy/dx = z\' - 1.',
        mathFormula: 'z = x + y \\implies z\' = 1 + y\' \\implies y\' = z\' - 1',
      },
      {
        title: 'Substitute into the ODE',
        explanation: 'Replace y\' with z\' - 1 and (x+y) with z.',
        mathFormula: 'z\' - 1 = z \\implies \\frac{dz}{dx} = 1 + z',
      },
      {
        title: 'Separate and integrate',
        explanation: 'Separate variables and integrate both sides.',
        mathFormula: '\\int \\frac{1}{1 + z} \\, dz = \\int dx \\implies \\ln|1 + z| = x + C',
      },
      {
        title: 'Back-substitute z = x + y',
        explanation: 'Restore the original variables.',
        mathFormula: '\\ln|1 + x + y| = x + C',
      },
    ],
  },
  {
    id: 'pr_lec1_hom_cos',
    topicId: 'ch2_homogeneous',
    category: Category.HOMOGENEOUS,
    question: 'Solve the homogeneous ODE from Lecture 1: $(x y\' - y) \\cos\\left(\\frac{2y}{x}\\right) = -3x^4$',
    difficulty: 'Hard',
    techniques: ['Homogeneous substitution u = y/x', 'Trigonometric integration'],
    finalAnswer: '\\frac{1}{2}\\sin\\left(\\frac{2y}{x}\\right) = -x^3 + C',
    steps: [
      {
        title: 'Divide by x',
        explanation: 'Divide both sides by x to expose the (y\' - y/x) group.',
        mathFormula: '\\left(y\' - \\frac{y}{x}\\right) \\cos\\left(\\frac{2y}{x}\\right) = -3x^3',
      },
      {
        title: 'Substitute y = ux and y\' = u + x u\'',
        explanation: 'Note that y\' - y/x = (u + x u\') - u = x u\'.',
        mathFormula: '(x u\') \\cos(2u) = -3x^3 \\implies u\' \\cos(2u) = -3x^2',
      },
      {
        title: 'Separate variables and integrate',
        explanation: 'Separate variables u and x and integrate both sides.',
        mathFormula: '\\int \\cos(2u) \\, du = -\\int 3x^2 \\, dx \\implies \\frac{1}{2}\\sin(2u) = -x^3 + C',
      },
      {
        title: 'Back-substitute u = y/x',
        explanation: 'Replace u with (y/x).',
        mathFormula: '\\frac{1}{2}\\sin\\left(\\frac{2y}{x}\\right) = -x^3 + C',
      },
    ],
  },
  // --- Lecture 2 (Week 2) Practice Problems ---
  {
    id: 'pr_lec2_exact_1',
    topicId: 'ch2_exact',
    category: Category.EXACT_EQUATIONS,
    question: 'Solve the exact differential equation from Lecture 2: $(y^2 + x^2)\\,dx + 2xy\\,dy = 0$',
    difficulty: 'Easy',
    techniques: ['Euler exactness test', 'Partial integration'],
    finalAnswer: 'y^2 x + \\frac{x^3}{3} = C',
    steps: [
      {
        title: 'Test for exactness',
        explanation: 'Identify M = y² + x² and N = 2xy. Check My = 2y and Nx = 2y.',
        mathFormula: 'M_y = 2y, \\quad N_x = 2y \\implies M_y = N_x \\quad (\\text{Exact})',
      },
      {
        title: 'Integrate M with respect to x',
        explanation: 'Integrate M dx with y held constant.',
        mathFormula: '① \\int (y^2 + x^2)\\,dx = y^2 x + \\frac{x^3}{3}',
      },
      {
        title: 'Integrate N with respect to y',
        explanation: 'Integrate N dy with x held constant.',
        mathFormula: '② \\int 2xy\\,dy = x y^2',
      },
      {
        title: 'Combine without duplicate terms',
        explanation: 'Combine unique terms from both integrals and set equal to constant C.',
        mathFormula: 'y^2 x + \\frac{x^3}{3} = C',
      },
    ],
  },
  {
    id: 'pr_lec2_exact_trig',
    topicId: 'ch2_exact',
    category: Category.EXACT_EQUATIONS,
    question: 'Solve the trigonometric exact ODE from Lecture 2: $(2xy - \\tan y)\\,dx + (x^2 - x\\sec^2 y)\\,dy = 0$',
    difficulty: 'Medium',
    techniques: ['Trigonometric partial derivatives', 'Euler condition', 'Potential function'],
    finalAnswer: 'x^2 y - x\\tan y = C',
    steps: [
      {
        title: 'Verify exactness',
        explanation: 'M = 2xy - tan(y) -> My = 2x - sec²(y). N = x² - x sec²(y) -> Nx = 2x - sec²(y).',
        mathFormula: 'M_y = 2x - \\sec^2 y, \\quad N_x = 2x - \\sec^2 y \\implies M_y = N_x',
      },
      {
        title: 'Integrate M with respect to x',
        explanation: '∫ (2xy - tan y) dx = x²y - x tan y.',
        mathFormula: '① \\int (2xy - \\tan y)\\,dx = x^2 y - x\\tan y',
      },
      {
        title: 'Integrate N with respect to y',
        explanation: '∫ (x² - x sec² y) dy = x²y - x tan y.',
        mathFormula: '② \\int (x^2 - x\\sec^2 y)\\,dy = x^2 y - x\\tan y',
      },
      {
        title: 'Write general solution',
        explanation: 'Set the merged potential function equal to C.',
        mathFormula: 'x^2 y - x\\tan y = C',
      },
    ],
  },
  {
    id: 'pr_lec2_linear_di',
    topicId: 'ch2_linear',
    category: Category.LINEAR_FIRST_ORDER,
    question: 'Solve the 1st-order linear ODE from Lecture 2: $y\' - 4y = 2x - 4x^2$',
    difficulty: 'Medium',
    techniques: ['Integrating factor', 'Tabular integration (DI method)'],
    finalAnswer: 'y = \\frac{1}{e^{-4x}} \\left[ (2x - 4x^2)\\frac{e^{-4x}}{-4} - (2 - 8x)\\frac{e^{-4x}}{16} + \\frac{8e^{-4x}}{64} + C \\right]',
    steps: [
      {
        title: 'Calculate Integrating Factor',
        explanation: 'P(x) = -4, so M(x) = exp(∫ -4 dx) = e^(-4x).',
        mathFormula: 'M(x) = e^{\\int -4\\,dx} = e^{-4x}',
      },
      {
        title: 'Tabular integration for polynomial × exponential',
        explanation: 'Differentiate (2x - 4x²) down to 0 while integrating e^(-4x) repeatedly.',
        mathFormula: '\\int e^{-4x}(2x - 4x^2)\\,dx = (2x - 4x^2)\\frac{e^{-4x}}{-4} - (2 - 8x)\\frac{e^{-4x}}{16} + (-8)\\frac{e^{-4x}}{-64}',
      },
      {
        title: 'Form the general solution',
        explanation: 'Multiply by 1/M(x) = e^(4x) and include constant C inside bracket.',
        mathFormula: 'y = \\frac{1}{e^{-4x}} \\left[ (2x - 4x^2)\\frac{e^{-4x}}{-4} - (2 - 8x)\\frac{e^{-4x}}{16} + \\frac{8e^{-4x}}{64} + C \\right]',
      },
    ],
  },
  {
    id: 'pr_lec2_linear_radical',
    topicId: 'ch2_linear',
    category: Category.LINEAR_FIRST_ORDER,
    question: 'Solve the linear ODE with radical from Lecture 2: $(2x + 3)y\' - y = \\sqrt{2x + 3}$',
    difficulty: 'Hard',
    techniques: ['Division to standard form', 'Logarithmic integrating factor', 'Radical cancellation'],
    finalAnswer: 'y = \\sqrt{2x+3}\\left(\\frac{1}{2}\\ln|2x+3| + C\\right)',
    steps: [
      {
        title: 'Normalize into standard linear form',
        explanation: 'Divide both sides by (2x + 3).',
        mathFormula: 'y\' - \\frac{1}{2x+3} y = \\frac{\\sqrt{2x+3}}{2x+3} = \\frac{1}{\\sqrt{2x+3}}',
      },
      {
        title: 'Compute Integrating Factor M(x)',
        explanation: 'M(x) = exp(∫ -1/(2x+3) dx) = exp(-(1/2)ln(2x+3)) = (2x+3)^(-1/2).',
        mathFormula: 'M(x) = (2x + 3)^{-1/2} = \\frac{1}{\\sqrt{2x+3}}',
      },
      {
        title: 'Integrate M(x) · q(x)',
        explanation: 'Multiply M(x) with q(x): (1/√(2x+3)) · (1/√(2x+3)) = 1/(2x+3).',
        mathFormula: '\\int \\frac{1}{2x+3}\\,dx = \\frac{1}{2}\\ln|2x+3|',
      },
      {
        title: 'Multiply by 1/M(x) = √(2x+3)',
        explanation: 'Obtain final general solution.',
        mathFormula: 'y = \\sqrt{2x+3}\\left(\\frac{1}{2}\\ln|2x+3| + C\\right)',
      },
    ],
  },
  {
    id: 'pr_lec2_bernoulli_1',
    topicId: 'ch2_bernoulli',
    category: Category.BERNOULLI,
    question: 'Solve Bernoulli ODE from Lecture 2: $2xy\' = 10x^3 y^5 + y$',
    difficulty: 'Hard',
    techniques: ['Bernoulli standard form', 'Shortcut integrating factor (1-n)', 'Polynomial integration'],
    finalAnswer: 'y^{-4} = \\frac{1}{x^2} \\left[ -4x^5 + C \\right] = -4x^3 + \\frac{C}{x^2}',
    steps: [
      {
        title: 'Put into standard Bernoulli form',
        explanation: 'Divide by 2x: y\' - (1/(2x))y = 5x² y⁵. Here n = 5, so 1 - n = -4.',
        mathFormula: 'y\' - \\frac{1}{2x} y = 5x^2 y^5 \\implies n=5, \\; 1-n = -4',
      },
      {
        title: 'Calculate integrating factor M(x)',
        explanation: 'M(x) = exp(∫ (1-n) P(x) dx) = exp(∫ -4(-1/(2x)) dx) = exp(∫ 2/x dx) = x².',
        mathFormula: 'M(x) = e^{\\int -4\\left(-\\frac{1}{2x}\\right)dx} = e^{2\\ln x} = x^2',
      },
      {
        title: 'Apply Bernoulli direct solution law',
        explanation: 'y^(1-n) = (1/M(x)) [ ∫ (1-n) M(x) q(x) dx + C ].',
        mathFormula: 'y^{-4} = \\frac{1}{x^2} \\left[ \\int -4 \\cdot x^2 \\cdot 5x^2 \\, dx + C \\right] = \\frac{1}{x^2} \\left[ \\int -20x^4 \\, dx + C \\right]',
      },
      {
        title: 'Integrate and simplify',
        explanation: 'Integrate -20x⁴ to get -4x⁵.',
        mathFormula: 'y^{-4} = \\frac{1}{x^2} \\left[ -4x^5 + C \\right] = -4x^3 + \\frac{C}{x^2}',
      },
    ],
  },
  {
    id: 'pr_lec2_bernoulli_exp',
    topicId: 'ch2_bernoulli',
    category: Category.BERNOULLI,
    question: 'Solve Bernoulli ODE from Lecture 2: $x y\' = y + e^x y^3$',
    difficulty: 'Hard',
    techniques: ['Bernoulli standard form', 'Shortcut power n=3', 'Tabular integration'],
    finalAnswer: 'y^{-2} = \\frac{1}{x^2} \\left[ -2x^2 e^x + 4x e^x - 4e^x + C \\right]',
    steps: [
      {
        title: 'Put into standard form',
        explanation: 'Divide by x: y\' - (1/x)y = eˣ y³. Here n = 3, so 1 - n = -2.',
        mathFormula: 'y\' - \\frac{1}{x} y = e^x y^3 \\implies n=3, \\; 1-n = -2',
      },
      {
        title: 'Calculate M(x)',
        explanation: 'M(x) = exp(∫ -2(-1/x) dx) = exp(2 ln x) = x².',
        mathFormula: 'M(x) = e^{\\int -2\\left(-\\frac{1}{x}\\right)dx} = x^2',
      },
      {
        title: 'Tabular integration for ∫ -2x² eˣ dx',
        explanation: 'Integration by parts yields -2x² eˣ + 4x eˣ - 4eˣ.',
        mathFormula: '\\int -2x^2 e^x \\, dx = -2x^2 e^x + 4x e^x - 4e^x',
      },
      {
        title: 'Formulate final y^(-2) solution',
        explanation: 'Substitute into the Bernoulli closed-form equation.',
        mathFormula: 'y^{-2} = \\frac{1}{x^2} \\left[ -2x^2 e^x + 4x e^x - 4e^x + C \\right]',
      },
    ],
  },
  {
    id: 'pr_sep_1',
    topicId: 'ch2_separation',
    category: Category.SEPARATION,
    question: 'Solve the differential equation: $\\frac{dy}{dx} = \\frac{x}{y}$',
    difficulty: 'Easy',
    techniques: ['Cross-multiplication', 'Direct integration'],
    finalAnswer: 'y^2 - x^2 = C',
    steps: [
      {
        title: 'Separate variables',
        explanation: 'Cross-multiply to group all terms in y with dy, and x with dx.',
        mathFormula: 'y \\, dy = x \\, dx',
      },
      {
        title: 'Integrate both sides',
        explanation: 'Integrate both sides using the power rule.',
        mathFormula: '\\int y \\, dy = \\int x \\, dx \\implies \\frac{1}{2}y^2 = \\frac{1}{2}x^2 + C_1',
      },
      {
        title: 'Multiply by 2',
        explanation: 'Multiply throughout by 2 and absorb into arbitrary constant C.',
        mathFormula: 'y^2 = x^2 + C \\iff y^2 - x^2 = C',
      },
    ],
  },
  {
    id: 'pr_sep_2',
    topicId: 'ch2_separation',
    category: Category.SEPARATION,
    question: 'Solve the differential equation: $y\' = \\frac{y^2 + 1}{2xy}$',
    difficulty: 'Medium',
    techniques: ['Separation of variables', 'Logarithmic integration'],
    finalAnswer: 'y^2 + 1 = C x',
    steps: [
      {
        title: 'Rewrite derivative and cross-multiply',
        explanation: 'Replace y\' with dy/dx and isolate the differential terms.',
        mathFormula: '\\frac{dy}{dx} = \\frac{y^2 + 1}{2xy} \\implies 2xy \\, dy = (y^2 + 1) \\, dx',
      },
      {
        title: 'Divide by x(y^2 + 1)',
        explanation: 'Isolate functions of y on the left and functions of x on the right.',
        mathFormula: '\\frac{2y}{y^2 + 1} \\, dy = \\frac{1}{x} \\, dx',
      },
      {
        title: 'Integrate both sides',
        explanation: 'The numerator on the left is the derivative of the denominator, yielding logarithms.',
        mathFormula: '\\int \\frac{2y}{y^2 + 1} \\, dy = \\int \\frac{1}{x} \\, dx \\implies \\ln(y^2 + 1) = \\ln|x| + \\ln C',
      },
      {
        title: 'Exponentiate',
        explanation: 'Apply exponential to both sides using logarithmic product properties.',
        mathFormula: 'y^2 + 1 = C x',
      },
    ],
  },
  {
    id: 'pr_sep_3',
    topicId: 'ch2_separation',
    category: Category.SEPARATION,
    question: 'Solve the differential equation: $\\frac{dy}{dx} = e^{x+y} + x^2 e^y$',
    difficulty: 'Medium',
    techniques: ['Exponential factoring', 'Separation of variables'],
    finalAnswer: '-e^{-y} = e^x + \\frac{1}{3}x^3 + C',
    steps: [
      {
        title: 'Factor out e^y',
        explanation: 'Use the exponential identity e^(x+y) = e^x · e^y to factor out e^y from both terms.',
        mathFormula: '\\frac{dy}{dx} = e^x e^y + x^2 e^y = e^y (e^x + x^2)',
      },
      {
        title: 'Separate variables',
        explanation: 'Divide both sides by e^y and multiply by dx.',
        mathFormula: 'e^{-y} \\, dy = (e^x + x^2) \\, dx',
      },
      {
        title: 'Integrate both sides',
        explanation: 'Perform standard integration on each side.',
        mathFormula: '\\int e^{-y} \\, dy = \\int (e^x + x^2) \\, dx \\implies -e^{-y} = e^x + \\frac{1}{3}x^3 + C',
      },
    ],
  },
  {
    id: 'pr_red_1',
    topicId: 'ch2_reducible_separation',
    category: Category.REDUCIBLE_SEPARATION,
    question: 'Solve: $\\frac{dy}{dx} = \\tan(x+y) - 1$',
    difficulty: 'Medium',
    techniques: ['Linear argument substitution', 'Trigonometric integration'],
    finalAnswer: '\\ln|\\sin(x+y)| = x + C',
    steps: [
      {
        title: 'Define substitution z',
        explanation: 'The argument inside the tangent is composite, so let z = x + y.',
        mathFormula: 'z = x + y \\implies \\frac{dz}{dx} = 1 + \\frac{dy}{dx} \\implies \\frac{dy}{dx} = \\frac{dz}{dx} - 1',
      },
      {
        title: 'Substitute into the ODE',
        explanation: 'Replace dy/dx with dz/dx - 1 in the differential equation.',
        mathFormula: '\\frac{dz}{dx} - 1 = \\tan(z) - 1 \\implies \\frac{dz}{dx} = \\tan(z)',
      },
      {
        title: 'Separate and integrate',
        explanation: 'Divide by tan(z) to obtain cot(z) = cos(z)/sin(z).',
        mathFormula: '\\cot(z) \\, dz = dx \\implies \\int \\frac{\\cos z}{\\sin z} \\, dz = \\int dx',
      },
      {
        title: 'Compute integral and substitute back',
        explanation: 'The numerator is the derivative of sin(z), giving a natural log.',
        mathFormula: '\\ln|\\sin z| = x + C \\implies \\ln|\\sin(x+y)| = x + C',
      },
    ],
  },
  {
    id: 'pr_hom_1',
    topicId: 'ch2_homogeneous',
    category: Category.HOMOGENEOUS,
    question: 'Solve the homogeneous ODE: $2xy y\' - y^2 + x^2 = 0$',
    difficulty: 'Hard',
    techniques: ['Homogeneous substitution u = y/x', 'Separable transformation'],
    finalAnswer: 'x^2 + y^2 = C x',
    steps: [
      {
        title: 'Express y\' in terms of ratio y/x',
        explanation: 'Isolate y\' and divide both numerator and denominator by x^2.',
        mathFormula: 'y\' = \\frac{y^2 - x^2}{2xy} = \\frac{(y/x)^2 - 1}{2(y/x)}',
      },
      {
        title: 'Substitute y = u·x',
        explanation: 'Using the product rule, y\' = x(du/dx) + u.',
        mathFormula: 'x \\frac{du}{dx} + u = \\frac{u^2 - 1}{2u}',
      },
      {
        title: 'Subtract u and find common denominator',
        explanation: 'Combine the right side into a single fraction.',
        mathFormula: 'x \\frac{du}{dx} = \\frac{u^2 - 1 - 2u^2}{2u} = \\frac{-(u^2 + 1)}{2u}',
      },
      {
        title: 'Separate variables and integrate',
        explanation: 'Move all terms in u to the left and x to the right.',
        mathFormula: '\\int \\frac{2u}{u^2 + 1} \\, du = -\\int \\frac{1}{x} \\, dx \\implies \\ln(u^2 + 1) = -\\ln|x| + \\ln C',
      },
      {
        title: 'Simplify and back-substitute',
        explanation: 'Exponentiate and replace u with y/x.',
        mathFormula: 'u^2 + 1 = \\frac{C}{x} \\implies \\left(\\frac{y}{x}\\right)^2 + 1 = \\frac{C}{x} \\implies y^2 + x^2 = C x',
      },
    ],
  },
  {
    id: 'pr_exact_1',
    topicId: 'ch2_exact',
    category: Category.EXACT_EQUATIONS,
    question: 'Solve the exact equation: $(2yx - 3x^3)dx + (x^2 + y^2)dy = 0$',
    difficulty: 'Medium',
    techniques: ['Exactness test My = Nx', 'Partial integration'],
    finalAnswer: 'x^2 y - \\frac{3}{4}x^4 + \\frac{1}{3}y^3 = C',
    steps: [
      {
        title: 'Identify M and N',
        explanation: 'Identify M as coefficient of dx and N as coefficient of dy.',
        mathFormula: 'M(x,y) = 2yx - 3x^3, \\quad N(x,y) = x^2 + y^2',
      },
      {
        title: 'Test for exactness',
        explanation: 'Compute partial derivatives ∂M/∂y and ∂N/∂x.',
        mathFormula: '\\frac{\\partial M}{\\partial y} = 2x, \\quad \\frac{\\partial N}{\\partial x} = 2x \\implies \\frac{\\partial M}{\\partial y} = \\frac{\\partial N}{\\partial x} \\quad (\\text{Exact!})',
      },
      {
        title: 'Integrate M with respect to x',
        explanation: 'Integrate M treating y as a constant.',
        mathFormula: '\\int (2yx - 3x^3) \\, dx = y x^2 - \\frac{3}{4}x^4 + g(y)',
      },
      {
        title: 'Determine g(y)',
        explanation: 'Differentiate with respect to y and set equal to N: x^2 + g\'(y) = x^2 + y^2 => g\'(y) = y^2 => g(y) = (1/3)y^3.',
        mathFormula: 'x^2 y - \\frac{3}{4}x^4 + \\frac{1}{3}y^3 = C',
      },
    ],
  },
  {
    id: 'pr_lin_1',
    topicId: 'ch2_linear',
    category: Category.LINEAR_FIRST_ORDER,
    question: 'Solve: $y\' \\cos x + y \\sin x = 1$',
    difficulty: 'Medium',
    techniques: ['Dividing by leading coeff', 'Integrating factor', 'Trigonometric integration'],
    finalAnswer: 'y = \\sin x + C \\cos x',
    steps: [
      {
        title: 'Put into standard linear form',
        explanation: 'Divide the entire equation by cos(x) so that the coefficient of y\' is 1.',
        mathFormula: 'y\' + y \\tan x = \\sec x \\implies P(x) = \\tan x, \\quad Q(x) = \\sec x',
      },
      {
        title: 'Compute the integrating factor μ(x)',
        explanation: 'Calculate μ(x) = exp(∫ tan x dx) = exp(ln|sec x|) = sec x.',
        mathFormula: '\\mu(x) = e^{\\int \\tan x \\, dx} = e^{\\ln|\\sec x|} = \\sec x',
      },
      {
        title: 'Apply the general solution formula',
        explanation: 'Substitute μ(x) and Q(x) into the solution formula.',
        mathFormula: 'y = \\frac{1}{\\sec x} \\left[ \\int \\sec x \\cdot \\sec x \\, dx + C \\right] = \\cos x \\left[ \\int \\sec^2 x \\, dx + C \\right]',
      },
      {
        title: 'Integrate and expand',
        explanation: 'Recall that ∫ sec^2 x dx = tan x.',
        mathFormula: 'y = \\cos x (\\tan x + C) = \\sin x + C \\cos x',
      },
    ],
  },
  {
    id: 'pr_bern_1',
    topicId: 'ch2_bernoulli',
    category: Category.BERNOULLI,
    question: 'Solve the Bernoulli equation: $x y\' + 2y = x^3 e^x y^2$',
    difficulty: 'Hard',
    techniques: ['Bernoulli identification n=2', 'Substitution z = y^-1', 'Integrating factor'],
    finalAnswer: 'y^{-1} = x^2 [-2e^x + C] \\iff \\frac{1}{y} = x^2 (C - 2e^x)',
    steps: [
      {
        title: 'Standard Bernoulli format',
        explanation: 'Divide by x: y\' + (2/x)y = x^2 e^x y^2. Here n = 2, so 1 - n = -1.',
        mathFormula: 'y\' + \\frac{2}{x}y = x^2 e^x y^2, \\quad n = 2, \\; 1-n = -1',
      },
      {
        title: 'Substitute z = y^(-1)',
        explanation: 'Differentiating yields z\' = -y^(-2) y\'. Multiply the ODE by -y^(-2).',
        mathFormula: 'z\' - \\frac{2}{x}z = -x^2 e^x',
      },
      {
        title: 'Integrating factor for z',
        explanation: 'Compute μ(x) = exp(∫ -2/x dx) = exp(-2 ln x) = x^(-2).',
        mathFormula: '\\mu(x) = e^{\\int -\\frac{2}{x}\\,dx} = x^{-2}',
      },
      {
        title: 'Integrate to solve for z',
        explanation: 'Apply the linear formula to find z(x).',
        mathFormula: 'z = x^2 \\left[ \\int x^{-2} (-x^2 e^x) \\, dx + C \\right] = x^2 \\left[ -\\int e^x \\, dx + C \\right] = x^2 (-e^x + C)',
      },
      {
        title: 'Back-substitute z = 1/y',
        explanation: 'Convert back to y.',
        mathFormula: 'y^{-1} = x^2 (C - e^x)',
      },
    ],
  },
  {
    id: 'pr_high_homo_1',
    topicId: 'ch3_higher_order_homo',
    category: Category.HIGHER_ORDER_HOMOGENEOUS,
    question: 'Find the general solution: $y\'\' - 2y\' + 10y = 0$',
    difficulty: 'Medium',
    techniques: ['Characteristic auxiliary equation', 'Complex conjugate roots'],
    finalAnswer: 'y = e^x [C_1 \\cos(3x) + C_2 \\sin(3x)]',
    steps: [
      {
        title: 'Write the auxiliary equation',
        explanation: 'Replace derivatives with powers of m.',
        mathFormula: 'm^2 - 2m + 10 = 0',
      },
      {
        title: 'Solve for roots using quadratic formula',
        explanation: 'Compute the discriminant and find the complex roots.',
        mathFormula: 'm = \\frac{2 \\pm \\sqrt{4 - 40}}{2} = \\frac{2 \\pm \\sqrt{-36}}{2} = 1 \\pm 3i',
      },
      {
        title: 'Apply Euler formula for complex roots',
        explanation: 'With α = 1 and β = 3, write the complementary solution.',
        mathFormula: 'y = e^{\\alpha x} [C_1 \\cos(\\beta x) + C_2 \\sin(\\beta x)] = e^x [C_1 \\cos(3x) + C_2 \\sin(3x)]',
      },
    ],
  },
  {
    id: 'pr_var_param_1',
    topicId: 'ch3_variation_params',
    category: Category.VARIATION_OF_PARAMETERS,
    question: 'Solve using Variation of Parameters: $y\'\' + y = \\sec x \\tan x$',
    difficulty: 'Hard',
    techniques: ['Auxiliary equation', 'Wronskian determinant', 'Lagrange integrals'],
    finalAnswer: 'y = C_1 \\cos x + C_2 \\sin x - \\tan x \\cos x + \\cos x \\cdot x + \\sin x \\ln|\\sec x|',
    steps: [
      {
        title: 'Find complementary solution yh',
        explanation: 'Solve m^2 + 1 = 0 => m = ±i.',
        mathFormula: 'y_h = C_1 \\cos x + C_2 \\sin x \\implies u(x) = \\cos x, \\; v(x) = \\sin x',
      },
      {
        title: 'Compute Wronskian W',
        explanation: 'Compute the determinant u v\' - v u\'.',
        mathFormula: 'W = \\cos x (\\cos x) - \\sin x (-\\sin x) = \\cos^2 x + \\sin^2 x = 1',
      },
      {
        title: 'Compute integral A(x)',
        explanation: 'A(x) = ∫ [-v(x) f(x) / W] dx = ∫ -sin x sec x tan x dx = -∫ tan^2 x dx = -∫(sec^2 x - 1)dx = -tan x + x.',
        mathFormula: 'A(x) = -\\tan x + x',
      },
      {
        title: 'Compute integral B(x)',
        explanation: 'B(x) = ∫ [u(x) f(x) / W] dx = ∫ cos x sec x tan x dx = ∫ tan x dx = ln|sec x|.',
        mathFormula: 'B(x) = \\ln|\\sec x|',
      },
      {
        title: 'Form yp and general solution',
        explanation: 'yp = A(x) u(x) + B(x) v(x) = (-tan x + x) cos x + sin x ln|sec x|.',
        mathFormula: 'y = C_1 \\cos x + C_2 \\sin x - \\sin x + x\\cos x + \\sin x \\ln|\\sec x|',
      },
    ],
  },
  {
    id: 'pr_lap_trans_1',
    topicId: 'ch4_laplace_theorems',
    category: Category.LAPLACE_THEOREMS,
    question: 'Find the Laplace transform of: $f(t) = t \\sinh(2t)$',
    difficulty: 'Medium',
    techniques: ['Multiplication by t theorem', 'Frequency differentiation'],
    finalAnswer: 'F(s) = \\frac{4s}{(s^2 - 4)^2}',
    steps: [
      {
        title: 'Identify base function and theorem',
        explanation: 'The function is t · g(t) where g(t) = sinh(2t). Use L{t g(t)} = -d/ds [L{g(t)}].',
        mathFormula: 'G(s) = \\mathcal{L}\\{\\sinh(2t)\\} = \\frac{2}{s^2 - 4}',
      },
      {
        title: 'Differentiate with respect to s',
        explanation: 'Apply the quotient rule to G(s).',
        mathFormula: '\\frac{d}{ds}\\left( \\frac{2}{s^2 - 4} \\right) = \\frac{0 - 2(2s)}{(s^2 - 4)^2} = \\frac{-4s}{(s^2 - 4)^2}',
      },
      {
        title: 'Multiply by (-1)',
        explanation: 'The theorem states L{t g(t)} = (-1)^1 G\'(s).',
        mathFormula: 'F(s) = -\\left( \\frac{-4s}{(s^2 - 4)^2} \\right) = \\frac{4s}{(s^2 - 4)^2}',
      },
    ],
  },
  {
    id: 'pr_inv_lap_log_1',
    topicId: 'ch4_inverse_laplace',
    category: Category.INVERSE_LAPLACE,
    question: 'Find the inverse Laplace transform: $F(s) = \\ln\\left( \\frac{s+6}{s+2} \\right)$',
    difficulty: 'Hard',
    techniques: ['Logarithmic derivative trick', 'Inverse First Shift'],
    finalAnswer: 'f(t) = \\frac{e^{-2t} - e^{-6t}}{t}',
    steps: [
      {
        title: 'Expand the logarithm',
        explanation: 'Use log properties ln(A/B) = ln(A) - ln(B).',
        mathFormula: 'F(s) = \\ln(s+6) - \\ln(s+2)',
      },
      {
        title: 'Differentiate F(s)',
        explanation: 'Recall the derivative identity: L{ -t f(t) } = F\'(s).',
        mathFormula: 'F\'(s) = \\frac{1}{s+6} - \\frac{1}{s+2}',
      },
      {
        title: 'Take the inverse Laplace of F\'(s)',
        explanation: 'Apply L^(-1){1/(s-a)} = e^(at).',
        mathFormula: '\\mathcal{L}^{-1}\\{F\'(s)\\} = e^{-6t} - e^{-2t}',
      },
      {
        title: 'Divide by -t',
        explanation: 'Since -t f(t) = e^(-6t) - e^(-2t), divide both sides by -t.',
        mathFormula: 'f(t) = \\frac{e^{-6t} - e^{-2t}}{-t} = \\frac{e^{-2t} - e^{-6t}}{t}',
      },
    ],
  },
  {
    id: 'pr_leg_int_1',
    topicId: 'ch5_legendre_polynomials',
    category: Category.LEGENDRE_POLYNOMIALS,
    question: 'Evaluate the integral: $\\int_{-1}^1 x P_5(x) P_4(x) \\, dx$',
    difficulty: 'Hard',
    techniques: ['Legendre recurrence relation', 'Orthogonality property'],
    finalAnswer: '\\frac{10}{99}',
    steps: [
      {
        title: 'Apply recurrence relation for x P_n(x)',
        explanation: 'Use the identity (2n+1) x P_n(x) = (n+1) P_(n+1)(x) + n P_(n-1)(x) with n = 5.',
        mathFormula: '11 x P_5(x) = 6 P_6(x) + 5 P_4(x) \\implies x P_5(x) = \\frac{6}{11}P_6(x) + \\frac{5}{11}P_4(x)',
      },
      {
        title: 'Substitute into the integral',
        explanation: 'Split into two integrals with P4(x).',
        mathFormula: '\\int_{-1}^1 x P_5(x) P_4(x) \\, dx = \\frac{6}{11}\\int_{-1}^1 P_6(x)P_4(x)\\,dx + \\frac{5}{11}\\int_{-1}^1 [P_4(x)]^2 \\, dx',
      },
      {
        title: 'Apply orthogonality',
        explanation: 'Since 6 ≠ 4, ∫_-1^1 P6(x) P4(x) dx = 0 by orthogonality.',
        mathFormula: '\\int_{-1}^1 P_6(x)P_4(x)\\,dx = 0',
      },
      {
        title: 'Evaluate the squared integral',
        explanation: 'Use the normalization formula ∫_-1^1 [Pn(x)]^2 dx = 2 / (2n+1) with n = 4.',
        mathFormula: '\\int_{-1}^1 [P_4(x)]^2 \\, dx = \\frac{2}{2(4)+1} = \\frac{2}{9}',
      },
      {
        title: 'Multiply coefficients',
        explanation: 'Calculate the final numeric value.',
        mathFormula: '\\frac{5}{11} \\cdot \\frac{2}{9} = \\frac{10}{99}',
      },
    ],
  },
  // --- Lecture 9 (Week 9) Practice Problems: Fourier Series ---
  {
    id: 'pr_lec9_fourier_x',
    topicId: 'ch5_fourier_series',
    category: Category.FOURIER_SERIES,
    question: 'Find the Fourier series for $f(x) = x$ on the symmetric interval $-\\pi < x < \\pi$ (from Lecture 9)',
    difficulty: 'Medium',
    techniques: ['Odd function parity', 'Tabular integration by parts', 'Harmonic evaluation cos(nπ)=(-1)ⁿ'],
    finalAnswer: 'f(x) = \\sum_{n=1}^\\infty \\frac{2(-1)^{n+1}}{n}\\sin(nx)',
    steps: [
      {
        title: 'Determine function parity and zero coefficients',
        explanation: 'Since f(-x) = -x = -f(x), f(x) is an odd function on [-π, π]. Thus a₀ = 0 and aₙ = 0.',
        mathFormula: 'f(-x) = -f(x) \\implies a_0 = a_n = 0, \\quad T = \\pi',
      },
      {
        title: 'Set up the sine coefficient integral bn',
        explanation: 'Use the odd function formula integrating from 0 to π.',
        mathFormula: 'b_n = \\frac{2}{\\pi}\\int_0^\\pi x \\sin(nx)\\,dx',
      },
      {
        title: 'Integrate by parts',
        explanation: 'Apply tabular integration to x sin(nx).',
        mathFormula: '\\int x \\sin(nx)\\,dx = -\\frac{x\\cos(nx)}{n} + \\frac{\\sin(nx)}{n^2}',
      },
      {
        title: 'Evaluate bounds at π and 0',
        explanation: 'Substitute bounds with cos(nπ) = (-1)ⁿ and sin(nπ) = 0.',
        mathFormula: 'b_n = \\frac{2}{\\pi}\\left[-\\frac{\\pi(-1)^n}{n}\\right] = -\\frac{2}{n}(-1)^n = \\frac{2(-1)^{n+1}}{n}',
      },
      {
        title: 'Write the Fourier series',
        explanation: 'Assemble the final sine series.',
        mathFormula: 'f(x) = \\sum_{n=1}^\\infty \\frac{2(-1)^{n+1}}{n}\\sin(nx)',
      },
    ],
  },
  {
    id: 'pr_lec9_cosine_x',
    topicId: 'ch5_fourier_series',
    category: Category.FOURIER_SERIES,
    question: 'Find the Half-Range Fourier Cosine series for $f(x) = x$ on the interval $0 < x < 1$ (from Lecture 9)',
    difficulty: 'Medium',
    techniques: ['Fourier Cosine half-range', 'Even extension', 'Lower bound cos(0)=1 evaluation'],
    finalAnswer: 'f(x) = \\frac{1}{2} + \\sum_{n=1}^\\infty \\frac{2\\left((-1)^n - 1\\right)}{n^2\\pi^2}\\cos(n\\pi x)',
    steps: [
      {
        title: 'Identify half-range parameters and zero coefficients',
        explanation: 'For Fourier Cosine series on [0, 1], set T = 1 and bn = 0.',
        mathFormula: 'T = 1, \\quad b_n = 0',
      },
      {
        title: 'Compute constant term a0',
        explanation: 'Integrate f(x) = x from 0 to 1 multiplied by 2/T.',
        mathFormula: 'a_0 = \\frac{2}{1}\\int_0^1 x\\,dx = 2\\left[\\frac{x^2}{2}\\right]_0^1 = 1 \\implies \\frac{a_0}{2} = \\frac{1}{2}',
      },
      {
        title: 'Set up an integral with tabular integration',
        explanation: 'Integrate 2 x cos(nπx) from 0 to 1.',
        mathFormula: 'a_n = 2\\int_0^1 x \\cos(n\\pi x)\\,dx = 2\\left[\\frac{x\\sin(n\\pi x)}{n\\pi} + \\frac{\\cos(n\\pi x)}{n^2\\pi^2}\\right]_0^1',
      },
      {
        title: 'Evaluate upper bound x=1 and lower bound x=0',
        explanation: 'At x=1, cos(nπ) = (-1)ⁿ. At x=0, cos(0) = 1.',
        mathFormula: 'a_n = 2\\left[\\frac{(-1)^n}{n^2\\pi^2} - \\frac{1}{n^2\\pi^2}\\right] = \\frac{2\\left((-1)^n - 1\\right)}{n^2\\pi^2}',
      },
      {
        title: 'Construct the Fourier Cosine series',
        explanation: 'Combine the constant term and cosine harmonics.',
        mathFormula: 'f(x) = \\frac{1}{2} + \\sum_{n=1}^\\infty \\frac{2\\left((-1)^n - 1\\right)}{n^2\\pi^2}\\cos(n\\pi x)',
      },
    ],
  },
  {
    id: 'pr_lec9_sine_x2',
    topicId: 'ch5_fourier_series',
    category: Category.FOURIER_SERIES,
    question: 'Find the Half-Range Fourier Sine series for $f(x) = x^2$ on the interval $0 < x < 2$ (from Lecture 9)',
    difficulty: 'Hard',
    techniques: ['Fourier Sine half-range', '3-step tabular integration', 'Fraction power simplification'],
    finalAnswer: 'f(x) = \\sum_{n=1}^\\infty \\left[ -\\frac{8(-1)^n}{n\\pi} + \\frac{16\\left((-1)^n - 1\\right)}{n^3\\pi^3} \\right] \\sin\\left(\\frac{n\\pi}{2}x\\right)',
    steps: [
      {
        title: 'Identify parameters and vanishing coefficients',
        explanation: 'For Fourier Sine series on [0, 2], set T = 2 and a₀ = aₙ = 0.',
        mathFormula: 'T = 2, \\quad a_0 = a_n = 0',
      },
      {
        title: 'Set up the integral for bn',
        explanation: 'Multiply by 2/T = 2/2 = 1.',
        mathFormula: 'b_n = \\frac{2}{2}\\int_0^2 x^2 \\sin\\left(\\frac{n\\pi}{2}x\\right)dx = \\int_0^2 x^2 \\sin\\left(\\frac{n\\pi}{2}x\\right)dx',
      },
      {
        title: 'Tabular integration by parts (3 steps)',
        explanation: 'Differentiate x² down to 0 and integrate sin(nπx/2) with k = nπ/2.',
        mathFormula: '\\int x^2 \\sin(kx)\\,dx = -\\frac{x^2\\cos(kx)}{k} + \\frac{2x\\sin(kx)}{k^2} + \\frac{2\\cos(kx)}{k^3}',
      },
      {
        title: 'Evaluate at upper limit x = 2 and lower limit x = 0',
        explanation: 'Substitute bounds and simplify: at x=2, cos(nπ)=(-1)ⁿ; at x=0, cos(0)=1.',
        mathFormula: 'b_n = -\\frac{4(-1)^n}{\\frac{n\\pi}{2}} + \\frac{2(-1)^n}{\\left(\\frac{n\\pi}{2}\\right)^3} - \\frac{2}{\\left(\\frac{n\\pi}{2}\\right)^3} = -\\frac{8(-1)^n}{n\\pi} + \\frac{16\\left((-1)^n - 1\\right)}{n^3\\pi^3}',
      },
      {
        title: 'Assemble the Fourier Sine series',
        explanation: 'Write out the full summation in terms of sine harmonics.',
        mathFormula: 'f(x) = \\sum_{n=1}^\\infty \\left[ -\\frac{8(-1)^n}{n\\pi} + \\frac{16\\left((-1)^n - 1\\right)}{n^3\\pi^3} \\right] \\sin\\left(\\frac{n\\pi}{2}x\\right)',
      },
    ],
  },
];
