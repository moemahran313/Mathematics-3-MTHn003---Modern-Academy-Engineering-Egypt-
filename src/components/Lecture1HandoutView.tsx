import React, { useState } from 'react';
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Layers,
  Lightbulb,
  Sparkles,
  Check,
  X,
  Bookmark,
  FileSpreadsheet,
  Calendar,
  GraduationCap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LECTURE_1_PAGES } from '../data/lecture1Data';
import { LECTURE_2_PAGES } from '../data/lecture2Data';
import { MathView, FormattedText } from './MathView';
import { LecturePage } from '../types';

export const ALL_LECTURE_PAGES: LecturePage[] = [...LECTURE_1_PAGES, ...LECTURE_2_PAGES];

export const LectureHandoutView: React.FC = () => {
  const [selectedLecture, setSelectedLecture] = useState<'all' | 1 | 2>(2);
  const [selectedPageNumber, setSelectedPageNumber] = useState<number | 'all'>('all');
  const [expandedExamples, setExpandedExamples] = useState<Record<string, boolean>>({
    eg_p2_1: true,
    eg_p2_2: true,
    eg_p3_1: true,
    eg_p4_1: true,
    eg_p5_1: true,
    eg_p5_3: true,
    eg_p6_1: true,
    eg_p6_2: true,
    eg_p7_1: true,
    eg_p7_2: true,
  });

  const toggleExample = (id: string) => {
    setExpandedExamples((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const currentLecturePages =
    selectedLecture === 1
      ? LECTURE_1_PAGES
      : selectedLecture === 2
      ? LECTURE_2_PAGES
      : ALL_LECTURE_PAGES;

  const pagesToDisplay =
    selectedPageNumber === 'all'
      ? currentLecturePages
      : currentLecturePages.filter((p) => p.pageNumber === selectedPageNumber);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner & Lecture Selector */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-950/80 via-slate-900 to-indigo-950/80 border border-teal-500/30 shadow-xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-teal-400/20 text-teal-300 border border-teal-400/40 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {selectedLecture === 1
                  ? 'WEEK 1 • LECTURE 1'
                  : selectedLecture === 2
                  ? 'WEEK 2 • LECTURE 2'
                  : 'WEEKS 1 & 2 • ALL LECTURES'}
              </span>
              <span
                className="px-2.5 py-0.5 rounded-full text-[10px] font-sans text-amber-300 bg-amber-400/10 border border-amber-400/30"
                dir="rtl"
              >
                {selectedLecture === 1
                  ? 'المحاضرة الأولى: الرتبة والدرجة والخطية، وفصل المتغيرات والمتجانسة'
                  : selectedLecture === 2
                  ? 'المحاضرة الثانية: المعادلات التامة (Exact)، والخطية (Linear)، ومعادلة برنولي (Bernoulli)'
                  : 'سجل المحاضرات الكامل: الأسبوع الأول والثاني'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-teal-400" />
              <span>
                {selectedLecture === 1
                  ? 'Lecture 1: Foundations, Separable & Homogeneous ODEs'
                  : selectedLecture === 2
                  ? 'Lecture 2: Exact, Linear, and Bernoulli Differential Equations'
                  : 'Complete Lecture Handouts & Laws Reference (Lectures 1 & 2)'}
              </span>
            </h2>
            <p className="text-xs text-slate-400 font-sans max-w-3xl leading-relaxed">
              Complete transcribed reference directly from your handwritten notebook pages, featuring exact mathematical laws, Arabic explanations, Euler exactness tests, integrating factor shortcuts, and step-by-step derivations.
            </p>
          </div>

          {/* Lecture Switcher Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-slate-950/90 p-1.5 rounded-xl border border-slate-800 shrink-0">
            <button
              onClick={() => {
                setSelectedLecture(1);
                setSelectedPageNumber('all');
              }}
              className={`px-3 py-2 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                selectedLecture === 1
                  ? 'bg-teal-500 text-slate-950 shadow-sm font-black'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Lecture 1 (Pages 1-4)</span>
            </button>
            <button
              onClick={() => {
                setSelectedLecture(2);
                setSelectedPageNumber('all');
              }}
              className={`px-3 py-2 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                selectedLecture === 2
                  ? 'bg-teal-500 text-slate-950 shadow-sm font-black'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Lecture 2 (Pages 5-7)</span>
            </button>
            <button
              onClick={() => {
                setSelectedLecture('all');
                setSelectedPageNumber('all');
              }}
              className={`px-3 py-2 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                selectedLecture === 'all'
                  ? 'bg-teal-500 text-slate-950 shadow-sm font-black'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>All 7 Pages</span>
            </button>
          </div>
        </div>

        {/* Page Filter Tabs */}
        <div className="flex items-center gap-1.5 pt-2 border-t border-slate-800/80 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-mono text-slate-400 font-bold uppercase mr-1">
            Jump to Page:
          </span>
          <button
            onClick={() => setSelectedPageNumber('all')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold transition-all cursor-pointer shrink-0 ${
              selectedPageNumber === 'all'
                ? 'bg-teal-400/20 text-teal-300 border border-teal-400/50'
                : 'text-slate-400 hover:text-slate-200 bg-slate-950 border border-slate-800'
            }`}
          >
            All Pages
          </button>
          {currentLecturePages.map((p) => (
            <button
              key={p.pageNumber}
              onClick={() => setSelectedPageNumber(p.pageNumber)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold transition-all cursor-pointer shrink-0 ${
                selectedPageNumber === p.pageNumber
                  ? 'bg-teal-400/20 text-teal-300 border border-teal-400/50'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-950 border border-slate-800'
              }`}
            >
              Page [{p.pageNumber}]
            </button>
          ))}
        </div>
      </div>

      {/* Pages Content List */}
      <div className="space-y-8">
        {pagesToDisplay.map((page) => (
          <div
            key={page.pageNumber}
            id={`lecture-page-${page.pageNumber}`}
            className="rounded-2xl border bg-slate-900/70 border-slate-800/90 shadow-lg overflow-hidden space-y-6 p-6"
          >
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center text-xs font-mono font-bold">
                    {page.pageNumber}
                  </span>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400">
                    Page [{page.pageNumber}] • {page.pageNumber <= 4 ? 'Lecture 1' : 'Lecture 2'}
                  </span>
                  <span className="text-xs text-slate-400 font-sans" dir="rtl">
                    {page.arabicTitle}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-100">
                  {page.title}
                </h3>
              </div>

              <span className="text-[10px] uppercase font-mono font-bold text-slate-400 px-2.5 py-1 rounded bg-slate-950 border border-slate-800 self-start sm:self-auto">
                {page.topicCategory}
              </span>
            </div>

            {/* Page Summary */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans bg-slate-950/50 p-4 rounded-xl border border-slate-850">
              {page.summary}
            </p>

            {/* Laws & Rules Section */}
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold uppercase font-mono tracking-wider text-teal-400 flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-teal-400" />
                <span>Lecture Laws & Formula Rules (القوانين والشروط)</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {page.laws.map((law) => (
                  <div
                    key={law.id}
                    className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-xs font-bold text-slate-200">
                          {law.name}
                        </span>
                        {law.arabicName && (
                          <span className="text-xs text-teal-400 font-sans" dir="rtl">
                            {law.arabicName}
                          </span>
                        )}
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-teal-300 text-xs sm:text-sm my-2 overflow-x-auto no-scrollbar">
                        <MathView math={law.formula} block />
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed font-sans">
                        {law.explanation}
                      </p>

                      {law.arabicExplanation && (
                        <p
                          className="text-xs text-amber-300/90 font-sans mt-2 leading-relaxed bg-amber-500/5 p-2 rounded-lg border border-amber-500/20"
                          dir="rtl"
                        >
                          💡 <strong>الشرح:</strong> {law.arabicExplanation}
                        </p>
                      )}
                    </div>

                    {law.conditions && law.conditions.length > 0 && (
                      <div className="pt-2 border-t border-slate-850 space-y-1.5">
                        <span className="text-[10px] font-mono uppercase font-bold text-slate-500">
                          Key Conditions & Instructions:
                        </span>
                        <ul className="space-y-1">
                          {law.conditions.map((cond, idx) => (
                            <li
                              key={idx}
                              className="text-[11px] text-slate-300 flex items-start gap-1.5"
                            >
                              <span className="text-teal-400">•</span>
                              <span className="font-sans leading-snug">
                                <FormattedText text={cond} />
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Classification Exercises Table (Specific to Page 1) */}
            {page.exercises && page.exercises.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold uppercase font-mono tracking-wider text-teal-400 flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-teal-400" />
                    <span>Exercises 1: Order, Degree, and Linearity Table (تمارين التصنيف)</span>
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono">
                    6 Problems from Handout
                  </span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px]">
                      <tr>
                        <th className="p-3">#</th>
                        <th className="p-3">Differential Equation</th>
                        <th className="p-3 text-center">Order (الرتبة)</th>
                        <th className="p-3 text-center">Degree (الدرجة)</th>
                        <th className="p-3 text-center">Linear? (خطية؟)</th>
                        <th className="p-3">Analytical Reason & Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 font-sans">
                      {page.exercises.map((ex, idx) => (
                        <tr key={ex.id} className="hover:bg-slate-900/40 transition-colors">
                          <td className="p-3 text-slate-400 font-mono">{idx + 1}</td>
                          <td className="p-3 font-semibold text-teal-300 font-mono whitespace-nowrap">
                            <MathView math={ex.formula} inline />
                          </td>
                          <td className="p-3 text-center font-mono font-bold text-slate-200">
                            {ex.order}
                          </td>
                          <td className="p-3 text-center font-mono font-bold text-slate-200">
                            {ex.degree}
                          </td>
                          <td className="p-3 text-center">
                            {ex.isLinear ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
                                <Check className="w-3 h-3" /> YES (خطية)
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/30 px-2 py-0.5 rounded-full font-mono">
                                <X className="w-3 h-3" /> NO (غير خطية)
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-slate-300 text-xs leading-relaxed max-w-xs">
                            {ex.reason}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Solved Examples with Step-by-Step Proofs */}
            {page.examples && page.examples.length > 0 && (
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-extrabold uppercase font-mono tracking-wider text-teal-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-400" />
                  <span>Handout Worked Examples with Step-by-Step Derivation</span>
                </h4>

                <div className="space-y-3.5">
                  {page.examples.map((eg) => {
                    const isExpanded = !!expandedExamples[eg.id];
                    return (
                      <div
                        key={eg.id}
                        className="rounded-xl border bg-slate-950/70 border-slate-800 overflow-hidden hover:border-slate-700 transition-all"
                      >
                        {/* Example Header */}
                        <div
                          onClick={() => toggleExample(eg.id)}
                          className="p-4 flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer gap-3 bg-slate-900/40"
                        >
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono font-bold text-teal-400 uppercase tracking-wider">
                              {eg.title}
                            </span>
                            <div className="text-xs sm:text-sm font-semibold text-slate-200 flex items-center gap-2 flex-wrap">
                              <span>
                                <FormattedText text={eg.problem} />
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                            <div className="text-xs font-semibold text-teal-300 bg-teal-500/10 border border-teal-500/20 px-2.5 py-1 rounded-lg">
                              <MathView math={eg.finalAnswer} inline />
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

                        {/* Derivation Steps */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="p-4 bg-slate-950 border-t border-slate-850 space-y-3.5"
                            >
                              <ol className="space-y-2.5">
                                {eg.steps.map((step, sIdx) => (
                                  <li
                                    key={sIdx}
                                    className="p-3 rounded-lg bg-slate-900/50 border border-slate-850 space-y-1.5"
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                                        {sIdx + 1}
                                      </span>
                                      <span className="text-xs font-bold text-slate-200">
                                        {step.step}
                                      </span>
                                    </div>
                                    <p className="text-xs text-slate-400 ml-7 leading-relaxed font-sans">
                                      {step.explanation}
                                    </p>
                                    {step.formula && (
                                      <div className="ml-7 p-2 rounded bg-slate-950 border border-slate-800 text-teal-300 text-xs overflow-x-auto no-scrollbar">
                                        <MathView math={step.formula} block />
                                      </div>
                                    )}
                                  </li>
                                ))}
                              </ol>

                              {eg.arabicNote && (
                                <div
                                  className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-amber-300 leading-relaxed font-sans"
                                  dir="rtl"
                                >
                                  💡 <strong>ملاحظة هامة من المحاضرة:</strong> {eg.arabicNote}
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Exam Tricks on Page */}
            {page.examTricks && page.examTricks.length > 0 && (
              <div className="p-4 rounded-xl bg-slate-950/90 border border-amber-500/20 space-y-2">
                <span className="text-[10px] uppercase font-mono font-bold text-amber-400 tracking-wider flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Key Exam Traps & Tricks from Lecture Notebook:</span>
                </span>
                <ul className="space-y-1.5">
                  {page.examTricks.map((trick, tIdx) => (
                    <li
                      key={tIdx}
                      className="text-xs text-slate-300 leading-relaxed flex items-start gap-2"
                    >
                      <span className="text-amber-400 shrink-0">•</span>
                      <span className="font-sans flex-1">{trick}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const Lecture1HandoutView = LectureHandoutView;
