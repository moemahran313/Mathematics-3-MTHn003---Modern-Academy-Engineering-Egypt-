import React, { useState } from 'react';
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Layers,
  Lightbulb,
  Sparkles,
  Check,
  X,
  Bookmark,
  FileSpreadsheet,
  Calendar,
  GraduationCap,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LECTURE_1_PAGES } from '../data/lecture1Data';
import { LECTURE_2_PAGES } from '../data/lecture2Data';
import { LECTURE_3_PAGES } from '../data/lecture3Data';
import { LECTURE_4_PAGES } from '../data/lecture4Data';
import { LECTURE_5_PAGES } from '../data/lecture5Data';
import { LECTURE_6_PAGES } from '../data/lecture6Data';
import { LECTURE_7_PAGES } from '../data/lecture7Data';
import { LECTURE_8_PAGES } from '../data/lecture8Data';
import { LECTURE_9_PAGES } from '../data/lecture9Data';
import { MathView, FormattedText } from './MathView';
import { LecturePage } from '../types';

export const ALL_LECTURE_PAGES: LecturePage[] = [
  ...LECTURE_1_PAGES,
  ...LECTURE_2_PAGES,
  ...LECTURE_3_PAGES,
  ...LECTURE_4_PAGES,
  ...LECTURE_5_PAGES,
  ...LECTURE_6_PAGES,
  ...LECTURE_7_PAGES,
  ...LECTURE_8_PAGES,
  ...LECTURE_9_PAGES,
];

interface LectureMeta {
  num: number;
  label: string;
  fullTitle: string;
  arabicTitle: string;
  pageRange: string;
  pages: LecturePage[];
}

const LECTURE_CATALOG: LectureMeta[] = [
  {
    num: 1,
    label: 'L1: Foundations & Separable',
    fullTitle: 'Foundations, Separable & Homogeneous ODEs',
    arabicTitle: 'المحاضرة الأولى: الرتبة والدرجة والخطية، وفصل المتغيرات والمتجانسة',
    pageRange: 'Pages 1–4',
    pages: LECTURE_1_PAGES,
  },
  {
    num: 2,
    label: 'L2: Exact & Bernoulli',
    fullTitle: 'Exact, Linear, and Bernoulli Differential Equations',
    arabicTitle: 'المحاضرة الثانية: المعادلات التامة (Exact)، والخطية (Linear)، ومعادلة برنولي (Bernoulli)',
    pageRange: 'Pages 5–7',
    pages: LECTURE_2_PAGES,
  },
  {
    num: 3,
    label: 'L3: Higher-Order ODEs',
    fullTitle: 'Higher-Order Homogeneous ODEs & Reduction of Order',
    arabicTitle: 'المحاضرة الثالثة: معادلات الرتب العليا المتجانسة وتخفيض الرتبة (Reduction of Order)',
    pageRange: 'Pages 8–11',
    pages: LECTURE_3_PAGES,
  },
  {
    num: 4,
    label: 'L4: Undetermined Coeffs',
    fullTitle: 'Non-Homogeneous ODEs & Undetermined Coefficients',
    arabicTitle: 'المحاضرة الرابعة: المعادلات غير المتجانسة، والمعاملات غير المحددة، وقاعدة التعديل والضرب في x',
    pageRange: 'Pages 12–14',
    pages: LECTURE_4_PAGES,
  },
  {
    num: 5,
    label: 'L5: Variation & Euler',
    fullTitle: 'Variation of Parameters & Euler-Cauchy ODEs',
    arabicTitle: 'المحاضرة الخامسة: طريقة تغير الثوابت (لاجرانج)، ومعادلة أويلر والمؤثر التفاضلي θ',
    pageRange: 'Pages 15–18',
    pages: LECTURE_5_PAGES,
  },
  {
    num: 6,
    label: 'L6: Laplace (Shifting I)',
    fullTitle: 'Laplace Transforms, First Shifting Theorem & Completing Square',
    arabicTitle: 'المحاضرة السادسة: تحويل لابلاس، الدوال المثلثية والزائدية، ونظرية الإزاحة الأولى وإكمال المربع',
    pageRange: 'Pages 19–21',
    pages: LECTURE_6_PAGES,
  },
  {
    num: 7,
    label: 'L7: Heaviside & Shifting II',
    fullTitle: 'Second Shifting Theorem, Heaviside Functions & Integrals / s',
    arabicTitle: 'المحاضرة السابعة: نظرية الإزاحة الثانية، دالة الخطوة لـ هيفيزيد، وتحويل لابلاس للتكاملات والقسمة على s',
    pageRange: 'Pages 22–25',
    pages: LECTURE_7_PAGES,
  },
  {
    num: 8,
    label: 'L8: Transform Calculus',
    fullTitle: 'Differentiation & Integration of Transforms, Log Inversion & ODEs',
    arabicTitle: 'المحاضرة الثامنة: تفاضل وتكامل تحويل لابلاس (الضرب والقسمة على t)، وتريك معكوس اللوغاريتمات، وحل المعادلات التفاضلية',
    pageRange: 'Pages 26–29',
    pages: LECTURE_8_PAGES,
  },
  {
    num: 9,
    label: 'L9: Fourier Series',
    fullTitle: 'Fourier Series Foundations, Parity Symmetry & Half-Range Expansions',
    arabicTitle: 'المحاضرة التاسعة: متسلسلات فورييه (Fourier Series)، الدوال الزوجية والفردية، ومتسلسلات نصف المدى (Sine & Cosine Series)',
    pageRange: 'Pages 30–33',
    pages: LECTURE_9_PAGES,
  },
];

export const LectureHandoutView: React.FC = () => {
  const [selectedLecture, setSelectedLecture] = useState<'all' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9>(9);
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
    eg_p9_1: true,
    eg_p9_2: true,
    eg_p9_3: true,
    eg_p9_4: true,
    eg_p10_1: true,
    eg_p11_1: true,
    eg_p12_1: true,
    eg_p13_1: true,
    eg_p13_2: true,
    eg_p14_1: true,
    eg_p14_2: true,
    eg_p15_1: true,
    eg_p16_1: true,
    eg_p16_2: true,
    eg_p17_1: true,
    eg_p18_1: true,
    eg_p18_2: true,
    eg_p19_1: true,
    eg_p19_3: true,
    eg_p19_4: true,
    eg_p20_1: true,
    eg_p20_2: true,
    eg_p20_6: true,
    eg_p20_7: true,
    eg_p21_1: true,
    eg_p21_4: true,
    eg_p21_5: true,
    eg_p21_7: true,
    eg_p22_1: true,
    eg_p22_3: true,
    eg_p22_5: true,
    eg_p23_1: true,
    eg_p23_5: true,
    eg_p23_6: true,
    eg_p24_1: true,
    eg_p24_4: true,
    eg_p25_2: true,
    eg_p25_3: true,
    eg_p26_1: true,
    eg_p26_2: true,
    eg_p27_1: true,
    eg_p27_3: true,
    eg_p27_4: true,
    eg_p27_5: true,
    eg_p28_1: true,
    eg_p28_2: true,
    eg_p28_3: true,
    eg_p29_1: true,
    eg_p29_2: true,
    eg_p30_1: true,
    eg_p31_1: true,
    eg_p31_2: true,
    eg_p32_1: true,
    eg_p32_2: true,
    eg_p33_1: true,
  });

  const toggleExample = (id: string) => {
    setExpandedExamples((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const goToLecture = (lectureNum: number | 'all') => {
    setSelectedLecture(lectureNum as any);
    setSelectedPageNumber('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeMeta = selectedLecture === 'all'
    ? null
    : LECTURE_CATALOG.find((l) => l.num === selectedLecture);

  const currentLectureNumber = typeof selectedLecture === 'number' ? selectedLecture : null;
  const prevLectureNumber = currentLectureNumber && currentLectureNumber > 1 ? currentLectureNumber - 1 : null;
  const nextLectureNumber = currentLectureNumber && currentLectureNumber < 9
    ? currentLectureNumber + 1
    : selectedLecture === 'all'
    ? 1
    : null;

  const currentLecturePages = selectedLecture === 'all'
    ? ALL_LECTURE_PAGES
    : activeMeta?.pages || ALL_LECTURE_PAGES;

  const pagesToDisplay =
    selectedPageNumber === 'all'
      ? currentLecturePages
      : currentLecturePages.filter((p) => p.pageNumber === selectedPageNumber);

  return (
    <div className="space-y-6 animate-fadeIn pb-16 sm:pb-6">
      {/* 1. Sleek Horizontal Lecture Switcher Bar */}
      <div className="p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 min-w-max">
          <button
            onClick={() => goToLecture('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
              selectedLecture === 'all'
                ? 'bg-teal-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span>All Lectures (33)</span>
          </button>

          {LECTURE_CATALOG.map((lec) => (
            <button
              key={lec.num}
              onClick={() => goToLecture(lec.num as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                selectedLecture === lec.num
                  ? 'bg-teal-500 text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <span>{lec.label}</span>
              {lec.num === 9 && selectedLecture !== 9 && (
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-teal-400/20 text-teal-300 border border-teal-400/40">
                  New
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Focused Lecture Details Card with Quick Prev / Next Arrows */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 shadow-md space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800/70">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-teal-500/10 text-teal-300 border border-teal-500/30 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {selectedLecture === 'all'
                  ? 'FULL CURRICULUM • WEEKS 1 TO 9'
                  : `WEEK ${activeMeta?.num} • ${activeMeta?.pageRange}`}
              </span>

              <span className="text-[11px] font-mono text-slate-400">
                {selectedLecture === 'all'
                  ? '33 Transcribed Pages'
                  : `${activeMeta?.pages.length} Solved Pages`}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight flex items-center gap-2.5">
              <GraduationCap className="w-6 h-6 text-teal-400 shrink-0" />
              <span>
                {selectedLecture === 'all'
                  ? 'Complete Lecture Handouts & Formula Notebook (Lectures 1–9)'
                  : `Lecture ${activeMeta?.num}: ${activeMeta?.fullTitle}`}
              </span>
            </h2>

            <p
              className="text-xs sm:text-sm text-amber-300/90 font-sans leading-relaxed pt-0.5"
              dir="rtl"
            >
              {selectedLecture === 'all'
                ? 'سجل المحاضرات الشامل لمادة الرياضيات ٣ (من المحاضرة ١ إلى المحاضرة ٩) شاملاً القوانين والشروحات والأمثلة المحلولة.'
                : activeMeta?.arabicTitle}
            </p>
          </div>

          {/* Quick Prev / Next Lecture Switcher Buttons in Header */}
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <button
              onClick={() => prevLectureNumber && goToLecture(prevLectureNumber)}
              disabled={!prevLectureNumber}
              aria-label="Previous Lecture"
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                prevLectureNumber
                  ? 'bg-slate-950 border-slate-800 hover:border-teal-500/50 hover:bg-slate-900 text-slate-200 cursor-pointer shadow-xs active:scale-95'
                  : 'bg-slate-950/40 border-slate-850 text-slate-600 cursor-not-allowed opacity-40'
              }`}
            >
              <ChevronLeft className="w-4 h-4 text-teal-400" />
              <span>Prev Lecture</span>
              {prevLectureNumber && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-400/10 text-teal-300 font-mono">
                  L{prevLectureNumber}
                </span>
              )}
            </button>

            <button
              onClick={() => nextLectureNumber && goToLecture(nextLectureNumber)}
              disabled={!nextLectureNumber}
              aria-label="Next Lecture"
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                nextLectureNumber
                  ? 'bg-slate-950 border-slate-800 hover:border-teal-500/50 hover:bg-slate-900 text-slate-200 cursor-pointer shadow-xs active:scale-95'
                  : 'bg-slate-950/40 border-slate-850 text-slate-600 cursor-not-allowed opacity-40'
              }`}
            >
              <span>Next Lecture</span>
              {nextLectureNumber && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-400/10 text-teal-300 font-mono">
                  L{nextLectureNumber}
                </span>
              )}
              <ChevronRight className="w-4 h-4 text-teal-400" />
            </button>
          </div>
        </div>

        {/* 3. Page Jumper Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          <span className="text-xs font-mono text-slate-400 font-bold uppercase shrink-0 mr-1">
            Jump to Page:
          </span>

          <button
            onClick={() => setSelectedPageNumber('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer shrink-0 ${
              selectedPageNumber === 'all'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/50 shadow-xs'
                : 'text-slate-400 hover:text-slate-200 bg-slate-950/80 border border-slate-800'
            }`}
          >
            All Pages ({currentLecturePages.length})
          </button>

          {currentLecturePages.map((p) => (
            <button
              key={p.pageNumber}
              onClick={() => setSelectedPageNumber(p.pageNumber)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer shrink-0 ${
                selectedPageNumber === p.pageNumber
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/50 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-950/80 border border-slate-800'
              }`}
            >
              Page {p.pageNumber}
            </button>
          ))}
        </div>
      </div>

      {/* Pages Content List */}
      <div className="space-y-8">
        {pagesToDisplay.map((page) => {
          const lectureNum =
            page.pageNumber <= 4
              ? 1
              : page.pageNumber <= 7
              ? 2
              : page.pageNumber <= 11
              ? 3
              : page.pageNumber <= 14
              ? 4
              : page.pageNumber <= 18
              ? 5
              : page.pageNumber <= 21
              ? 6
              : page.pageNumber <= 25
              ? 7
              : page.pageNumber <= 29
              ? 8
              : 9;
          const weekPageNum =
            page.pageNumber <= 4
              ? page.pageNumber
              : page.pageNumber <= 7
              ? page.pageNumber - 4
              : page.pageNumber <= 11
              ? page.pageNumber - 7
              : page.pageNumber <= 14
              ? page.pageNumber - 11 + 4 // notebook pages are 5, 6, 7 in week 4
              : page.pageNumber <= 18
              ? page.pageNumber - 15 + 8 // notebook pages are 8, 9, 10, 11 in week 5
              : page.pageNumber <= 21
              ? page.pageNumber - 18 // notebook pages are 1, 2, 3 in week 6
              : page.pageNumber <= 25
              ? page.pageNumber - 21 // notebook pages are 1, 2, 3, 4 in week 7
              : page.pageNumber <= 29
              ? page.pageNumber - 25 // notebook pages are 1, 2, 3, 4 in week 8
              : page.pageNumber - 29; // notebook pages are 1, 2, 3, 4 in week 9

          return (
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
                      Page [{page.pageNumber}] • Week {lectureNum} Notebook [p.{weekPageNum}]
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
          );
        })}
      </div>

      {/* 4. Bottom Lecture Progression / Next Lecture Transition Card */}
      <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 shadow-lg flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {prevLectureNumber ? (
          <button
            onClick={() => goToLecture(prevLectureNumber)}
            className="flex-1 flex items-center justify-start gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-teal-500/50 hover:bg-slate-900 text-left transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-slate-950 transition-colors shrink-0">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-mono uppercase text-slate-500 block">Previous Lecture</span>
              <span className="text-xs font-bold text-slate-200 group-hover:text-teal-300 truncate block">
                Lecture {prevLectureNumber}: {LECTURE_CATALOG[prevLectureNumber - 1]?.fullTitle}
              </span>
            </div>
          </button>
        ) : (
          <div className="flex-1 hidden sm:block" />
        )}

        {nextLectureNumber ? (
          <button
            onClick={() => goToLecture(nextLectureNumber)}
            className="flex-1 flex items-center justify-end gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-teal-500/50 hover:bg-slate-900 text-right transition-all cursor-pointer group"
          >
            <div className="min-w-0">
              <span className="text-[10px] font-mono uppercase text-slate-500 block">Next Lecture</span>
              <span className="text-xs font-bold text-slate-200 group-hover:text-teal-300 truncate block">
                Lecture {nextLectureNumber}: {LECTURE_CATALOG[nextLectureNumber - 1]?.fullTitle}
              </span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-slate-950 transition-colors shrink-0">
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        ) : (
          <button
            onClick={() => goToLecture(1)}
            className="flex-1 flex items-center justify-end gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-teal-500/50 hover:bg-slate-900 text-right transition-all cursor-pointer group"
          >
            <div className="min-w-0">
              <span className="text-[10px] font-mono uppercase text-slate-500 block">All 9 Lectures Completed</span>
              <span className="text-xs font-bold text-slate-200 group-hover:text-teal-300 truncate block">
                Return to Lecture 1 (Week 1)
              </span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-slate-950 transition-colors shrink-0">
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        )}
      </div>

      {/* 5. Floating Quick Navigation Bar for Mobile Phones */}
      <div className="sm:hidden fixed bottom-3 left-3 right-3 z-30 flex items-center justify-between gap-2 p-2 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-800 shadow-2xl">
        <button
          onClick={() => prevLectureNumber && goToLecture(prevLectureNumber)}
          disabled={!prevLectureNumber}
          aria-label="Previous Lecture"
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs font-bold font-mono transition-all ${
            prevLectureNumber
              ? 'bg-slate-900 border border-slate-700 text-slate-200 active:scale-95 text-teal-300'
              : 'bg-slate-950/50 border border-slate-900 text-slate-600 opacity-40 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Prev</span>
          {prevLectureNumber && <span>(L{prevLectureNumber})</span>}
        </button>

        <span className="px-2 py-1 text-[11px] font-mono text-slate-400 font-bold">
          {selectedLecture === 'all' ? 'All (33)' : `L${selectedLecture}/9`}
        </span>

        <button
          onClick={() => nextLectureNumber && goToLecture(nextLectureNumber)}
          disabled={!nextLectureNumber}
          aria-label="Next Lecture"
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs font-bold font-mono transition-all ${
            nextLectureNumber
              ? 'bg-teal-500 text-slate-950 font-black shadow-md active:scale-95'
              : 'bg-slate-950/50 border border-slate-900 text-slate-600 opacity-40 cursor-not-allowed'
          }`}
        >
          <span>Next</span>
          {nextLectureNumber && <span>(L{nextLectureNumber})</span>}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export const Lecture1HandoutView = LectureHandoutView;
