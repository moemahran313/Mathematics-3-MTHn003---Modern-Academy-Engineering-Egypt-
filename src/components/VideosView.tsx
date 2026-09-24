import React, { useState } from 'react';
import {
  ExternalLink,
  FolderOpen,
  Sparkles,
  Search,
  CheckCircle2,
  Copy,
  Check,
  GraduationCap,
  ChevronRight,
  Maximize2,
  Play,
  FileVideo,
  Youtube,
  Tv,
} from 'lucide-react';
import {
  GOOGLE_DRIVE_FOLDER_URL,
  GOOGLE_DRIVE_FOLDER_ID,
  DR_ASHRAF_LECTURES,
  DrAshrafLecture,
  ENG_SAMIR_TOPICS,
  EngSamirTopic,
} from '../data/videosData';
import { MathView } from './MathView';

export const VideosView: React.FC = () => {
  const [activeInstructor, setActiveInstructor] = useState<'ashraf' | 'samir'>('ashraf');
  const [selectedAshrafLecture, setSelectedAshrafLecture] = useState<DrAshrafLecture>(DR_ASHRAF_LECTURES[0]);
  const [selectedSamirTopic, setSelectedSamirTopic] = useState<EngSamirTopic>(ENG_SAMIR_TOPICS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>({});

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const toggleCompleted = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedTopics((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredAshrafLectures = DR_ASHRAF_LECTURES.filter((lec) => {
    const query = searchQuery.toLowerCase();
    return (
      lec.title.toLowerCase().includes(query) ||
      lec.author.toLowerCase().includes(query) ||
      lec.category.toLowerCase().includes(query)
    );
  });

  const filteredSamirTopics = ENG_SAMIR_TOPICS.filter((t) => {
    const query = searchQuery.toLowerCase();
    return (
      t.title.toLowerCase().includes(query) ||
      t.arabicTitle.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query) ||
      t.arabicDescription.toLowerCase().includes(query) ||
      t.keyTopics.some((k) => k.toLowerCase().includes(query))
    );
  });

  const samirEmbedUrl = `https://drive.google.com/embeddedfolderview?id=${GOOGLE_DRIVE_FOLDER_ID}#${viewMode}`;

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* 1. Instructor Tab Switcher */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-2 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-850">
          <button
            onClick={() => {
              setActiveInstructor('ashraf');
              setSearchQuery('');
            }}
            className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeInstructor === 'ashraf'
                ? 'bg-red-500 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Youtube className="w-4 h-4 text-white" />
            <span>شرح د. أشرف طه (YouTube)</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
              activeInstructor === 'ashraf' ? 'bg-black/30 text-white' : 'bg-slate-800 text-slate-400'
            }`}>
              5 Videos
            </span>
          </button>

          <button
            onClick={() => {
              setActiveInstructor('samir');
              setSearchQuery('');
            }}
            className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeInstructor === 'samir'
                ? 'bg-teal-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <FolderOpen className="w-4 h-4" />
            <span>شرح م. سمير (Google Drive)</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
              activeInstructor === 'samir' ? 'bg-slate-950/40 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'
            }`}>
              Drive Folder
            </span>
          </button>
        </div>

        {/* Global Search within active instructor */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="البحث في المحاضرات والشروحات..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500/60 transition-all font-sans"
          />
        </div>
      </div>

      {/* ======================= DR. ASHRAF TAHA VIEW ======================= */}
      {activeInstructor === 'ashraf' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Header Banner */}
          <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-red-500/10 text-red-400 border border-red-500/30 flex items-center gap-1.5">
                    <Youtube className="w-3.5 h-3.5 text-red-400" />
                    <span>شرح الدكتور اشرف طه</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono text-slate-400 bg-slate-800 border border-slate-700">
                    Modern Academy for Engineering & Technology
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-100">
                  شرح الدكتور اشرف طه - MTHN103
                </h1>

                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  فيديوهات المحاضرات الرسمية المسجلة على YouTube لمقرر الرياضيات (MTHN103).
                </p>

                <div className="flex items-center gap-3 pt-1 flex-wrap">
                  <span className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
                    <GraduationCap className="w-4 h-4 text-red-400" />
                    <span>{DR_ASHRAF_LECTURES.length} YouTube Videos</span>
                  </span>
                  <span className="text-slate-600 font-mono">•</span>
                  <span className="text-xs text-red-400 font-mono font-bold">
                    Now Playing: {selectedAshrafLecture.title}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                <a
                  href={selectedAshrafLecture.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-lg hover:shadow-red-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Youtube className="w-4 h-4 text-white" />
                  <span>فتح على YouTube</span>
                  <ExternalLink className="w-4 h-4 opacity-80" />
                </a>

                <button
                  onClick={() => handleCopyLink(selectedAshrafLecture.youtubeUrl)}
                  className="px-4 py-3 rounded-2xl bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-750 font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-teal-400" />
                      <span className="text-teal-300">تم نسخ رابط الفيديو!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-400" />
                      <span>نسخ رابط الفيديو</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Embedded YouTube Theatre Player */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Tv className="w-5 h-5 text-red-400" />
                <h2 className="text-sm sm:text-base font-bold text-slate-100 font-mono">
                  {selectedAshrafLecture.title}
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-400/10 text-red-300 border border-red-400/20 font-mono">
                  YouTube
                </span>
              </div>

              <a
                href={selectedAshrafLecture.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-red-400 hover:border-red-500/40 transition-colors flex items-center gap-1.5 text-xs font-mono self-start sm:self-auto"
                title="Open on YouTube"
              >
                <span>Watch on YouTube</span>
                <Maximize2 className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Video Container (16:9 Aspect Ratio) */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-slate-800 bg-black shadow-2xl aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${selectedAshrafLecture.youtubeId}?autoplay=0&rel=0`}
                title={selectedAshrafLecture.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Current Video Details Bar */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-100 font-mono">
                  {selectedAshrafLecture.title}
                </h3>
                <p className="text-xs text-slate-400 font-sans mt-0.5">
                  {selectedAshrafLecture.author}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                  {selectedAshrafLecture.category}
                </span>
                <a
                  href={selectedAshrafLecture.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>YouTube Link</span>
                </a>
              </div>
            </div>
          </div>

          {/* YouTube Video Selector Grid */}
          <div className="space-y-4 pt-2">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-red-400" />
              <span>قائمة المحاضرات (YouTube Videos)</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {filteredAshrafLectures.map((lec) => {
                const isSelected = selectedAshrafLecture.id === lec.id;
                const isCompleted = !!completedTopics[lec.id];

                return (
                  <div
                    key={lec.id}
                    onClick={() => {
                      setSelectedAshrafLecture(lec);
                      window.scrollTo({ top: 320, behavior: 'smooth' });
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 group relative overflow-hidden ${
                      isSelected
                        ? 'bg-slate-900 border-red-500/50 ring-1 ring-red-500/20 shadow-lg'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                    }`}
                  >
                    {/* YouTube Thumbnail Preview */}
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                      <img
                        src={`https://img.youtube.com/vi/${lec.youtubeId}/hqdefault.jpg`}
                        alt={lec.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${
                          isSelected ? 'bg-red-500 text-white' : 'bg-slate-900/90 text-red-400 border border-red-500/40'
                        }`}>
                          <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono text-red-400 font-semibold uppercase">
                          YouTube
                        </span>
                        <button
                          onClick={(e) => toggleCompleted(lec.id, e)}
                          title={isCompleted ? 'Completed' : 'Mark as completed'}
                          className={`p-1 rounded-lg transition-colors cursor-pointer ${
                            isCompleted ? 'text-teal-400 bg-teal-500/10' : 'text-slate-600 hover:text-slate-400'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h3 className="text-sm font-bold text-slate-100 group-hover:text-red-300 transition-colors font-mono">
                        {lec.title}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-sans line-clamp-1">
                        {lec.author}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                      <span className="font-mono text-[11px] text-red-400 group-hover:underline">
                        {isSelected ? '▶ Playing' : 'Click to Play'}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-red-400 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ======================= ENG. SAMIR GOOGLE DRIVE VIEW ======================= */}
      {activeInstructor === 'samir' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Header Banner */}
          <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-teal-500/10 text-teal-300 border border-teal-500/30 flex items-center gap-1.5">
                    <FileVideo className="w-3.5 h-3.5" />
                    <span>شرح باشمهندس سمير</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono text-slate-400 bg-slate-800 border border-slate-700">
                    Math 3 Recorded Lectures
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-100">
                  تسجيلات وفيديوهات شرح باشمهندس سمير
                </h1>

                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  جميع محاضرات وتسجيلات الشرح لمقرر الرياضيات ٣ (المعادلات التفاضلية، تحويلات لابلاس، ومتسلسلات فورييه) مرفوعة ومحدثة على Google Drive بروابط مباشرة.
                </p>

                <div className="flex items-center gap-3 pt-1 flex-wrap">
                  <span className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
                    <GraduationCap className="w-4 h-4 text-teal-400" />
                    <span>{ENG_SAMIR_TOPICS.length} محاور ومحاضرات دراسية</span>
                  </span>
                  <span className="text-slate-600 font-mono">•</span>
                  <span className="text-xs text-teal-300 font-mono font-bold">
                    مجلد درايف سحابي تفاعلي
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                <a
                  href={GOOGLE_DRIVE_FOLDER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-lg hover:shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <FolderOpen className="w-4 h-4 text-slate-950" />
                  <span>فتح المجلد في Google Drive</span>
                  <ExternalLink className="w-4 h-4 opacity-80" />
                </a>

                <button
                  onClick={() => handleCopyLink(GOOGLE_DRIVE_FOLDER_URL)}
                  className="px-4 py-3 rounded-2xl bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-750 font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-teal-400" />
                      <span className="text-teal-300">تم نسخ رابط Drive!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-400" />
                      <span>نسخ رابط الفولدر</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Embedded Drive Viewer */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-teal-400" />
                <h2 className="text-sm sm:text-base font-bold text-slate-100 font-mono">
                  Google Drive Interactive Cloud Viewer
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-400/10 text-teal-300 border border-teal-400/20 font-mono">
                  Live Stream
                </span>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-teal-500 text-slate-950'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Grid View
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    viewMode === 'list'
                      ? 'bg-teal-500 text-slate-950'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  List View
                </button>
                <a
                  href={GOOGLE_DRIVE_FOLDER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-teal-300 hover:border-teal-500/40 transition-colors"
                  title="Open full-screen in Google Drive"
                >
                  <Maximize2 className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="relative w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
              <div className="w-full h-[480px] sm:h-[540px]">
                <iframe
                  src={samirEmbedUrl}
                  title="شرح باشمهندس سمير - Google Drive Folder"
                  className="w-full h-full border-0 bg-slate-950"
                  allow="autoplay"
                  loading="lazy"
                />
              </div>

              <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                  <span>يمكنك تشغيل واستعراض كافة فيديوهات باشمهندس سمير مباشرة أو فتح الفولدر في Google Drive.</span>
                </div>
                <a
                  href={GOOGLE_DRIVE_FOLDER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-300 hover:underline font-bold font-mono flex items-center gap-1 shrink-0"
                >
                  <span>فتح الفولدر</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Samir Topics Index */}
          <div className="space-y-4 pt-2">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>فهرس ومحاور شروحات باشمهندس سمير</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSamirTopics.map((topic) => {
                const isSelected = selectedSamirTopic.id === topic.id;
                const isCompleted = !!completedTopics[topic.id];

                return (
                  <div
                    key={topic.id}
                    onClick={() => setSelectedSamirTopic(topic)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 group ${
                      isSelected
                        ? 'bg-slate-900 border-teal-500/50 ring-1 ring-teal-500/20 shadow-lg'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-teal-500/10 text-teal-300 border border-teal-500/30">
                            {topic.lectureNumber === 10 ? 'Exam Revision' : `Lecture ${topic.lectureNumber}`}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            {topic.category}
                          </span>
                        </div>

                        <button
                          onClick={(e) => toggleCompleted(topic.id, e)}
                          title={isCompleted ? 'Mark as studying' : 'Mark as completed'}
                          className={`p-1 rounded-lg transition-colors cursor-pointer ${
                            isCompleted
                              ? 'text-teal-400 bg-teal-500/10'
                              : 'text-slate-600 hover:text-slate-400'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-slate-100 group-hover:text-teal-300 transition-colors font-sans leading-snug">
                          {topic.arabicTitle}
                        </h3>
                        <p className="text-xs text-slate-400 font-sans mt-1.5 leading-relaxed line-clamp-2">
                          {topic.arabicDescription}
                        </p>
                      </div>

                      {topic.formulaPreview && (
                        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-850 text-xs text-teal-300 overflow-x-auto no-scrollbar">
                          <MathView math={topic.formulaPreview} inline />
                        </div>
                      )}

                      <div className="flex items-center gap-1.5 flex-wrap pt-1">
                        {topic.keyTopics.map((k, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-950 border border-slate-800 text-slate-400"
                          >
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <a
                        href={GOOGLE_DRIVE_FOLDER_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1.5 transition-colors"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>مشاهدة التسجيل على Drive</span>
                      </a>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-teal-400 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
