import { Category, PracticeProblem } from '../types';

export const PRACTICE_PROBLEMS_DATA: PracticeProblem[] = [
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
];
