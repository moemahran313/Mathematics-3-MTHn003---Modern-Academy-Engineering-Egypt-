export enum Category {
  ALL = 'All',
  BASIC_ODE = 'Classification & Order/Degree',
  SEPARATION = 'Separable Differential Equations',
  REDUCIBLE_SEPARATION = 'Reducible to Separable',
  HOMOGENEOUS = 'Homogeneous Equations',
  EXACT_EQUATIONS = 'Exact Differential Equations',
  LINEAR_FIRST_ORDER = 'First-Order Linear ODEs',
  BERNOULLI = 'Bernoulli Non-Linear ODEs',
  HIGHER_ORDER_HOMOGENEOUS = 'Higher-Order Homogeneous (Auxiliary Eq.)',
  UNDETERMINED_COEFFS = 'Non-Homogeneous: Undetermined Coefficients',
  VARIATION_OF_PARAMETERS = 'Variation of Parameters (Wronskian)',
  REDUCTION_OF_ORDER = 'Reduction of Order Method',
  LAPLACE_TRANSFORMS = 'Laplace Transform Foundations',
  LAPLACE_THEOREMS = 'Laplace Shift & Derivative Theorems',
  INVERSE_LAPLACE = 'Inverse Laplace Transforms',
  LAPLACE_ODE = 'Solving ODEs via Laplace Transform',
  FOURIER_SERIES = 'Fourier Series & Half-Range Expansions',
  LEGENDRE_POLYNOMIALS = 'Legendre Polynomials & Special Functions',
}

export interface FormulaItem {
  id: string;
  formula: string;
  description: string;
  arabicTip?: string;
}

export interface Topic {
  id: string;
  category: Category;
  summary: string;
  arabicTitle: string;
  details: string;
  equations: FormulaItem[];
  tricks: string[];
}

export interface PracticeStep {
  title: string;
  explanation: string;
  mathFormula?: string;
}

export interface PracticeProblem {
  id: string;
  topicId: string;
  category: Category;
  question: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  techniques: string[];
  finalAnswer: string;
  steps: PracticeStep[];
}

export interface ExamSolutionStep {
  stepNumber: number;
  title: string;
  explanation: string;
  formula?: string;
}

export interface ExamQuestion {
  id: string;
  questionNumber: string;
  title: string;
  points: number;
  category: Category;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  problemFormula: string;
  problemText?: string;
  tricksAndMistakes?: string;
  solutionSteps: ExamSolutionStep[];
  finalAnswer: string;
}

export interface Exam {
  id: string;
  title: string;
  year: string;
  semester: 'Fall' | 'Summer' | 'Midterm';
  courseCode: string;
  duration: string;
  totalPoints: number;
  examiners?: string;
  questions: ExamQuestion[];
}

export interface VideoItem {
  id: string;
  title: string;
  duration?: string;
  problemFormula?: string;
  isCompleted?: boolean;
}

export type PlaylistItem = VideoItem;

export interface VideoPlaylist {
  id: string;
  title: string;
  category: Category;
  channel: string;
  description: string;
  playlistUrl?: string;
  embedId: string;
  items: VideoItem[];
}

export interface StandaloneVideo {
  id: string;
  title: string;
  category: Category;
  channel: string;
  embedId: string;
  description: string;
}

export interface QuizQuestion {
  id: string;
  category: Category;
  question: string;
  mathFormula?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  trick?: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  arabicTerm?: string;
  category: Category;
  chapter: string;
  definition: string;
  formula?: string;
  example: {
    problem: string;
    formula?: string;
    solution: string;
  };
  noteOrTrap?: string;
  relatedTerms?: string[];
}

export interface TopicProgress {
  category: Category;
  attempted: number;
  correct: number;
  lastAttempted?: string;
  mastered: boolean;
}

export interface SearchResultItem {
  id: string;
  title: string;
  type: 'topic' | 'formula' | 'practice' | 'exam' | 'glossary' | 'video';
  category: Category;
  subtitle: string;
  snippet: string;
  formula?: string;
  targetTab: string;
  targetId?: string;
}
