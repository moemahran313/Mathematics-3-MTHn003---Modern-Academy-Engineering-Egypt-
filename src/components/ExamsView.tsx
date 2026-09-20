import React, { useState } from 'react';
import { Trophy, Calendar, Clock, Award, ChevronDown, ChevronUp, Download, AlertTriangle, CheckCircle, Sparkles } from 'lucide-react';
import { EXAMS_DATA } from '../data/examsData';
import { Exam, ExamQuestion } from '../types';
import { MathView, FormattedText } from './MathView';
import { motion, AnimatePresence } from 'motion/react';

export const ExamsView: React.FC = () => {
  const [selectedExamId, setSelectedExamId] = useState<string>(EXAMS_DATA[0].id);
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({
    q1a_2023: true,
    q1b_2023: true,
  });

  const selectedExam = EXAMS_DATA.find((e) => e.id === selectedExamId) || EXAMS_DATA[0];

  const toggleQuestion = (qId: string) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  const handleExportMarkdown = (exam: Exam) => {
    let md = `# ${exam.title}\n`;
    md += `**Course:** ${exam.courseCode} | **Semester:** ${exam.semester} ${exam.year} | **Duration:** ${exam.duration} | **Total Points:** ${exam.totalPoints}\n`;
    md += `**Examiners:** ${exam.examiners}\n\n---\n\n`;

    exam.questions.forEach((q) => {
      md += `## Question ${q.questionNumber}: ${q.title} (${q.points} Marks - ${q.difficulty})\n`;
      md += `**Topic:** ${q.category}\n\n`;
      md += `**Problem Statement:**\n$$${q.problemFormula}$$\n\n`;
      if (q.tricksAndMistakes) {
        md += `> **Examiner Trick & Pitfall:** ${q.tricksAndMistakes}\n\n`;
      }
      md += `### Step-by-Step Solution:\n`;
      q.solutionSteps.forEach((s) => {
        md += `#### Step ${s.stepNumber}: ${s.title}\n`;
        md += `${s.explanation}\n\n`;
        if (s.formula) {
          md += `$$${s.formula}$$\n\n`;
        }
      });
      md += `**Final Answer:** $${q.finalAnswer}$\n\n---\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${exam.id}_study_guide.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl border bg-slate-900/70 border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-bold mb-1">
            <Trophy className="w-5 h-5" />
            <h2 className="text-base font-extrabold tracking-tight text-slate-100">
              Modern Academy Solved Exams & Official Model Answers
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-sans max-w-2xl">
            Real past examination papers from MTH203 and MTHn103, featuring official faculty model answers, scoring criteria, and highlighted traps.
          </p>
        </div>

        <button
          onClick={() => handleExportMarkdown(selectedExam)}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 border border-slate-700 transition-all cursor-pointer shrink-0"
        >
          <Download className="w-4 h-4 text-teal-400" />
          <span>Export Exam Analysis (.md)</span>
        </button>
      </div>

      {/* Exam Selector Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {EXAMS_DATA.map((exam) => {
          const isSelected = selectedExam.id === exam.id;
          return (
            <button
              key={exam.id}
              onClick={() => setSelectedExamId(exam.id)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-800 border-amber-500/50 shadow-md ring-1 ring-amber-500/20'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-[10px] font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
                    {exam.courseCode}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500">
                    {exam.semester}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-200 line-clamp-2">
                  {exam.title}
                </h4>
              </div>

              <div className="pt-3 mt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>{exam.totalPoints} Marks</span>
                <span>{exam.duration}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Exam Information Deck */}
      <div className="p-6 rounded-2xl border bg-slate-900/50 border-slate-800 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
          <div>
            <span className="text-[10px] uppercase font-mono font-bold text-teal-400 tracking-wider">
              {selectedExam.courseCode} • {selectedExam.semester} {selectedExam.year}
            </span>
            <h3 className="text-lg font-extrabold text-slate-100">
              {selectedExam.title}
            </h3>
          </div>
          <div className="text-xs font-mono text-slate-400">
            Examiners: <span className="text-slate-200">{selectedExam.examiners}</span>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4 pt-2">
          {selectedExam.questions.map((q) => {
            const isExpanded = !!expandedQuestions[q.id];
            const diffColor =
              q.difficulty === 'Easy'
                ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
                : q.difficulty === 'Medium'
                ? 'text-amber-400 border-amber-500/30 bg-amber-500/10'
                : 'text-rose-400 border-rose-500/30 bg-rose-500/10';

            return (
              <div
                key={q.id}
                className="rounded-2xl border bg-slate-900/60 border-slate-800 hover:border-slate-700 transition-all overflow-hidden"
              >
                {/* Clickable Header */}
                <div
                  onClick={() => toggleQuestion(q.id)}
                  className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between cursor-pointer gap-4"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-extrabold text-teal-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        Q{q.questionNumber}
                      </span>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold font-mono border ${diffColor}`}>
                        {q.difficulty}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {q.category}
                      </span>
                      <span className="text-[10px] text-amber-400 font-mono font-bold">
                        [{q.points} Points]
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-200">
                      {q.title}
                    </h4>

                    <div className="text-xs text-teal-300 py-1 overflow-x-auto no-scrollbar">
                      <MathView math={q.problemFormula} block />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                    <button className="px-3 py-1.5 rounded-lg bg-slate-850 hover:bg-slate-800 text-xs font-bold text-slate-300 flex items-center gap-1.5 border border-slate-750">
                      <span>{isExpanded ? 'Hide Model Answer' : 'View Model Answer'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Collapsible Model Answer & Breakdown */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-5 bg-slate-950/90 border-t border-slate-850 space-y-4"
                    >
                      {/* Examiner Traps / Tricks */}
                      {q.tricksAndMistakes && (
                        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-start gap-2.5">
                          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-amber-400 block mb-0.5">
                              Examiner Trick / Pitfall to Avoid:
                            </span>
                            <FormattedText text={q.tricksAndMistakes} />
                          </div>
                        </div>
                      )}

                      {/* Official Steps */}
                      <div className="space-y-3">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                          Official Model Derivation Steps:
                        </span>

                        <div className="space-y-2.5">
                          {q.solutionSteps.map((step) => (
                            <div
                              key={step.stepNumber}
                              className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1.5"
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center text-[10px] font-mono font-bold shrink-0">
                                  {step.stepNumber}
                                </span>
                                <h5 className="text-xs font-bold text-slate-200">
                                  {step.title}
                                </h5>
                              </div>
                              <p className="text-xs text-slate-400 ml-7 leading-relaxed font-sans">
                                <FormattedText text={step.explanation} />
                              </p>
                              {step.formula && (
                                <div className="ml-7 p-2 rounded-lg bg-slate-950 border border-slate-800 text-teal-300 text-xs overflow-x-auto no-scrollbar">
                                  <MathView math={step.formula} block />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Final Answer Banner */}
                      <div className="p-3.5 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-between flex-wrap gap-2">
                        <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4" />
                          <span>Final General Solution:</span>
                        </span>
                        <div className="text-xs sm:text-sm font-bold text-teal-200">
                          <MathView math={q.finalAnswer} inline />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
