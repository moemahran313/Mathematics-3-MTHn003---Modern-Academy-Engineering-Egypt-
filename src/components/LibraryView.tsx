import React, { useState, useMemo, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, BookOpen, CheckCircle, Lightbulb, Zap, ArrowRight, Layers, FileText, Sparkles, BookmarkCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Category, Topic, PracticeProblem } from '../types';
import { TOPICS_DATA } from '../data/topicsData';
import { PRACTICE_PROBLEMS_DATA } from '../data/practiceProblemsData';
import { MathView, FormattedText } from './MathView';
import { Lecture1HandoutView } from './Lecture1HandoutView';

interface LibraryViewProps {
  initialCategory?: Category;
  onNavigateToVideos: () => void;
  onNavigateToExams: () => void;
  onNavigateToQuiz: () => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  initialCategory,
  onNavigateToVideos,
  onNavigateToExams,
  onNavigateToQuiz,
}) => {
  const [activeTab, setActiveTab] = useState<'standard' | 'lecture1'>('lecture1');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({
    ch1_classification: true,
    ch2_separation: true,
  });
  const [expandedProblems, setExpandedProblems] = useState<Record<string, boolean>>({
    pr_sep_1: true,
  });

  const toggleTopic = (id: string) => {
    setExpandedTopics((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleProblem = (id: string) => {
    setExpandedProblems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter topics
  const filteredTopics = useMemo(() => {
    return TOPICS_DATA.filter((topic) => {
      const matchesCat =
        selectedCategory === 'All' || topic.category === selectedCategory;

      if (!searchQuery.trim()) return matchesCat;

      const query = searchQuery.toLowerCase();
      const matchesSearch =
        topic.summary.toLowerCase().includes(query) ||
        topic.arabicTitle.toLowerCase().includes(query) ||
        topic.category.toLowerCase().includes(query) ||
        topic.details.toLowerCase().includes(query) ||
        topic.equations.some(
          (eq) =>
            eq.formula.toLowerCase().includes(query) ||
            eq.description.toLowerCase().includes(query)
        ) ||
        topic.tricks.some((trick) => trick.toLowerCase().includes(query));

      return matchesCat && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Filter practice problems
  const filteredProblems = useMemo(() => {
    return PRACTICE_PROBLEMS_DATA.filter((prob) => {
      const matchesCat =
        selectedCategory === 'All' || prob.category === selectedCategory;

      if (!searchQuery.trim()) return matchesCat;

      const query = searchQuery.toLowerCase();
      const matchesSearch =
        prob.question.toLowerCase().includes(query) ||
        prob.category.toLowerCase().includes(query) ||
        prob.finalAnswer.toLowerCase().includes(query) ||
        prob.techniques.some((t) => t.toLowerCase().includes(query)) ||
        prob.steps.some(
          (s) =>
            s.title.toLowerCase().includes(query) ||
            s.explanation.toLowerCase().includes(query)
        );

      return matchesCat && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const categories = Object.values(Category).filter((c) => c !== Category.ALL);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Switcher: Lecture 1 Handout vs Full Chapters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-2 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div className="flex items-center gap-2 p-1 bg-slate-950/80 rounded-xl border border-slate-850 flex-1">
          <button
            onClick={() => setActiveTab('lecture1')}
            className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-bold font-mono flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'lecture1'
                ? 'bg-teal-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>📝 LECTURE NOTEBOOK & LAWS (WEEKS 1 & 2)</span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] bg-slate-950/40 border border-teal-600/30 text-teal-950 font-sans" dir="rtl">
              المحاضرات ١ و ٢
            </span>
          </button>

          <button
            onClick={() => setActiveTab('standard')}
            className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-bold font-mono flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'standard'
                ? 'bg-teal-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>📚 ALL CHAPTERS & FORMULAS ({TOPICS_DATA.length})</span>
          </button>
        </div>
      </div>

      {activeTab === 'lecture1' ? (
        <Lecture1HandoutView />
      ) : (
        <>
          {/* Top Search & Filter Bar */}
          <div className="p-6 rounded-2xl border bg-slate-900/70 border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search ODEs, Laplace transforms, Fourier series, exactness, auxiliary eq, formulas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-20 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all font-sans"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300 font-semibold cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 uppercase font-mono whitespace-nowrap">
                  Filter:
                </span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="p-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs font-semibold focus:outline-none focus:border-teal-400 text-slate-200 cursor-pointer max-w-[240px]"
                >
                  <option value="All">All Topics / Categories</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Pills Bar */}
            <div className="flex items-center gap-2 pt-1 overflow-x-auto no-scrollbar pb-1">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono border transition-all shrink-0 cursor-pointer ${
                  selectedCategory === 'All'
                    ? 'bg-teal-500/10 text-teal-400 border-teal-500/40'
                    : 'bg-transparent text-slate-400 border-slate-800 hover:text-slate-300 hover:border-slate-700'
                }`}
              >
                ALL TOPICS ({TOPICS_DATA.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono border transition-all shrink-0 cursor-pointer truncate max-w-[220px] ${
                    selectedCategory === cat
                      ? 'bg-teal-500/10 text-teal-400 border-teal-500/40 shadow-xs'
                      : 'bg-transparent text-slate-400 border-slate-800 hover:text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

      {/* Main Grid: Left Topics & Problems (2 cols), Right Habit & Tips (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Topics List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-slate-100 flex items-center gap-2">
                <Layers className="w-5 h-5 text-teal-400" />
                <span>Reference Chapters & Core Identities ({filteredTopics.length})</span>
              </h2>
            </div>

            {filteredTopics.length === 0 ? (
              <div className="p-12 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/20">
                <BookOpen className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-300">No chapters matched your search</h3>
                <p className="text-xs text-slate-500 mt-1">Try another keyword or select "All Topics".</p>
              </div>
            ) : (
              filteredTopics.map((topic) => {
                const isExpanded = !!expandedTopics[topic.id];
                return (
                  <motion.div
                    key={topic.id}
                    layout="position"
                    className="rounded-2xl border transition-all bg-slate-900/60 border-slate-800/90 shadow-md hover:border-slate-700 overflow-hidden"
                  >
                    {/* Header */}
                    <div
                      onClick={() => toggleTopic(topic.id)}
                      className="p-5 flex items-start justify-between cursor-pointer gap-4"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] uppercase font-bold font-mono tracking-widest text-teal-400 px-2 py-0.5 rounded bg-teal-400/10 border border-teal-500/20">
                            {topic.category}
                          </span>
                          <span className="text-[11px] font-sans text-slate-400 bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800" dir="rtl">
                            {topic.arabicTitle}
                          </span>
                        </div>
                        <h3 className="text-base font-bold tracking-tight text-slate-100">
                          {topic.summary}
                        </h3>
                      </div>
                      <button className="text-slate-400 hover:text-slate-200 p-1">
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                    </div>

                    {/* Accordion Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-5 pb-6 pt-2 border-t border-slate-800/70 space-y-5"
                        >
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                            {topic.details}
                          </p>

                          {/* Equations Grid */}
                          <div>
                            <span className="text-[11px] text-slate-400 uppercase font-mono font-bold tracking-wider block mb-2.5">
                              Core Formula Identities:
                            </span>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                              {topic.equations.map((eq) => (
                                <div
                                  key={eq.id}
                                  className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex flex-col justify-between"
                                >
                                  <div className="text-teal-300 text-xs sm:text-sm overflow-x-auto py-1 no-scrollbar">
                                    <MathView math={eq.formula} block />
                                  </div>
                                  <div className="mt-2 pt-2 border-t border-slate-900 text-[11px] text-slate-400 leading-snug">
                                    <span>{eq.description}</span>
                                    {eq.arabicTip && (
                                      <span className="block text-[10px] text-amber-300/80 mt-1 font-sans" dir="rtl">
                                        💡 {eq.arabicTip}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Study Tricks */}
                          {topic.tricks.length > 0 && (
                            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                              <span className="text-[10px] uppercase font-mono font-bold text-amber-400 tracking-wider flex items-center gap-1.5 mb-2">
                                <Lightbulb className="w-3.5 h-3.5" />
                                <span>Exam Insights & Instructor Traps:</span>
                              </span>
                              <ul className="space-y-2">
                                {topic.tricks.map((trick, i) => (
                                  <li
                                    key={i}
                                    className="text-xs text-slate-300 leading-relaxed flex items-start gap-2"
                                  >
                                    <span className="text-amber-400 shrink-0 mt-0.5">•</span>
                                    <FormattedText text={trick} className="flex-1" />
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* Practice Sheet Solutions Section */}
          <div className="space-y-5 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold tracking-tight text-slate-100 flex items-center gap-2">
                <FileText className="w-5 h-5 text-teal-400" />
                <span>Revision Practice Sheet Solutions ({filteredProblems.length})</span>
              </h3>
            </div>

            {filteredProblems.length === 0 ? (
              <div className="p-8 text-center rounded-xl border border-dashed border-slate-800 text-xs text-slate-500">
                No practice problems found matching current search.
              </div>
            ) : (
              <div className="space-y-3.5">
                {filteredProblems.map((prob) => {
                  const isExpanded = !!expandedProblems[prob.id];
                  const diffColor =
                    prob.difficulty === 'Easy'
                      ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
                      : prob.difficulty === 'Medium'
                      ? 'text-amber-400 border-amber-500/30 bg-amber-500/10'
                      : 'text-rose-400 border-rose-500/30 bg-rose-500/10';

                  return (
                    <div
                      key={prob.id}
                      className="rounded-xl border transition-all overflow-hidden bg-slate-900/50 border-slate-800 hover:border-slate-700"
                    >
                      {/* Clickable Card Header */}
                      <div
                        onClick={() => toggleProblem(prob.id)}
                        className="p-4 flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer gap-3"
                      >
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold font-mono border ${diffColor}`}>
                              {prob.difficulty.toUpperCase()}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {prob.category}
                            </span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-semibold text-slate-200">
                            <FormattedText text={prob.question} />
                          </h4>
                        </div>

                        <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                          <div className="text-xs font-semibold text-teal-400 bg-teal-400/10 border border-teal-500/20 px-2.5 py-1 rounded-lg">
                            <MathView math={prob.finalAnswer} inline />
                          </div>
                          <button className="text-slate-400 hover:text-slate-200">
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Step-by-Step Resolution */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="p-4 bg-slate-950/80 border-t border-slate-850 space-y-3"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                                Analytical Derivation Steps:
                              </span>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                {prob.techniques.map((t, idx) => (
                                  <span
                                    key={idx}
                                    className="text-[9px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 font-mono"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <ol className="space-y-2.5">
                              {prob.steps.map((step, idx) => (
                                <li
                                  key={idx}
                                  className="bg-slate-900/40 p-3 rounded-xl border border-slate-850"
                                >
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center text-[10px] font-mono font-bold shrink-0">
                                      {idx + 1}
                                    </span>
                                    <p className="text-xs font-bold text-slate-200">
                                      {step.title}
                                    </p>
                                  </div>
                                  <p className="text-xs text-slate-400 leading-relaxed ml-7 font-sans">
                                    <FormattedText text={step.explanation} />
                                  </p>
                                  {step.mathFormula && (
                                    <div className="mt-2 ml-7 p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 overflow-x-auto text-teal-300 no-scrollbar">
                                      <MathView math={step.mathFormula} block />
                                    </div>
                                  )}
                                </li>
                              ))}
                            </ol>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar Widget Column */}
        <div className="space-y-6">
          {/* Study Habiteer Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-teal-500/20 text-slate-100 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-teal-400 font-bold">
              <Zap className="w-5 h-5" />
              <h3 className="text-base font-extrabold tracking-tight">
                Active Revision Cadence
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Analyzing past exams from 2016 to 2024 reveals that practicing 3 differential equations each day improves exam speed and prevents algebraic sign errors under exam conditions.
            </p>
            <div className="space-y-2 pt-2">
              <button
                onClick={onNavigateToQuiz}
                className="w-full py-2.5 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>Launch Quizzing Arena</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onNavigateToExams}
                className="w-full py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-all border border-slate-700 cursor-pointer"
              >
                <span>Browse Solved Exams (2016-2024)</span>
              </button>
            </div>
          </div>

          {/* Quick Laplace Reference Cheat Sheet */}
          <div className="p-5 rounded-2xl border bg-slate-900/50 border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-teal-400 uppercase tracking-wider">
                ⚡ FAST LAPLACE LOOKUP
              </span>
              <span className="text-[9px] text-slate-500 font-mono">Ch. 4</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-300"><MathView math="t^n" inline /></span>
                <span className="text-teal-400 font-mono"><MathView math="\frac{n!}{s^{n+1}}" inline /></span>
              </div>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-300"><MathView math="e^{at}" inline /></span>
                <span className="text-teal-400 font-mono"><MathView math="\frac{1}{s-a}" inline /></span>
              </div>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-300"><MathView math="\sin(at)" inline /></span>
                <span className="text-teal-400 font-mono"><MathView math="\frac{a}{s^2+a^2}" inline /></span>
              </div>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-300"><MathView math="\cos(at)" inline /></span>
                <span className="text-teal-400 font-mono"><MathView math="\frac{s}{s^2+a^2}" inline /></span>
              </div>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-300"><MathView math="u_a(t)f(t-a)" inline /></span>
                <span className="text-teal-400 font-mono"><MathView math="e^{-as}F(s)" inline /></span>
              </div>
            </div>
          </div>

          {/* Active Study Method Tip */}
          <div className="p-5 rounded-2xl border bg-slate-900/40 border-slate-800">
            <h4 className="text-[10px] font-extrabold text-teal-400 uppercase font-mono tracking-widest mb-2">
              💡 VIDEO PLAYLIST INTEGRATION
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Check out the{' '}
              <strong
                onClick={onNavigateToVideos}
                className="text-teal-400 cursor-pointer hover:underline"
              >
                🎬 Video Explanations
              </strong>{' '}
              tab! It includes full playlist walkthroughs and tracks your problem completion stats directly in the application.
            </p>
          </div>
        </div>
      </div>
        </>
      )}
    </div>
  );
};
