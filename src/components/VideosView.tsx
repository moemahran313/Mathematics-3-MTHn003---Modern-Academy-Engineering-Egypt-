import React, { useState } from 'react';
import { Play, CheckCircle2, Circle, ExternalLink, Film, ListOrdered, Sparkles, ChevronRight, ChevronLeft, Plus } from 'lucide-react';
import { PLAYLISTS_DATA, STANDALONE_VIDEOS_DATA } from '../data/videosData';
import { VideoPlaylist, PlaylistItem, StandaloneVideo } from '../types';
import { MathView } from './MathView';

export const VideosView: React.FC = () => {
  const [playlists, setPlaylists] = useState<VideoPlaylist[]>(PLAYLISTS_DATA);
  const [activePlaylistIndex, setActivePlaylistIndex] = useState(0);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});
  const [customEmbedId, setCustomEmbedId] = useState<string | null>(null);
  const [customTitle, setCustomTitle] = useState<string | null>(null);

  // Add video dialog state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');

  const currentPlaylist = playlists[activePlaylistIndex];
  const currentItem = currentPlaylist?.items[activeItemIndex];

  // Helper to extract YouTube ID
  const extractYoutubeId = (urlOrId: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = urlOrId.match(regExp);
    return match && match[2].length === 11 ? match[2] : urlOrId;
  };

  const toggleComplete = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const activeVideoId = customEmbedId || currentPlaylist?.embedId || '768wGzV6W2M';

  // Calculate completion percentage for current playlist
  const totalItems = currentPlaylist ? currentPlaylist.items.length : 0;
  const completedCount = currentPlaylist
    ? currentPlaylist.items.filter((item) => completedItems[item.id]).length
    : 0;
  const progressPercent = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  const handleSelectStandalone = (video: StandaloneVideo) => {
    setCustomEmbedId(video.embedId);
    setCustomTitle(video.title);
  };

  const handleAddCustomVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideoTitle.trim() || !newVideoUrl.trim()) return;
    const id = extractYoutubeId(newVideoUrl.trim());
    setCustomEmbedId(id);
    setCustomTitle(newVideoTitle.trim());
    setShowAddModal(false);
    setNewVideoTitle('');
    setNewVideoUrl('');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner & Header */}
      <div className="p-6 rounded-2xl border bg-slate-900/70 border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-red-400 font-bold mb-1">
            <Film className="w-5 h-5" />
            <h2 className="text-base font-extrabold tracking-tight text-slate-100">
              Interactive Video Explanations & Course Deck
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-sans max-w-2xl">
            Watch curated breakdowns of Math 3 ODE methods, Laplace transforms, and exam-grade problems with synchronized interactive playlists.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 border border-slate-700 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-teal-400" />
          <span>Add Custom Video</span>
        </button>
      </div>

      {/* Course Playlists Selector */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
        {playlists.map((pl, idx) => {
          const isActive = activePlaylistIndex === idx && !customEmbedId;
          return (
            <button
              key={pl.id}
              onClick={() => {
                setActivePlaylistIndex(idx);
                setActiveItemIndex(0);
                setCustomEmbedId(null);
                setCustomTitle(null);
              }}
              className={`px-4 py-3 rounded-xl border text-left shrink-0 transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-800 border-teal-500/50 shadow-md ring-1 ring-teal-500/20'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] uppercase font-mono font-bold text-teal-400">
                  {pl.category}
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-950 text-slate-500 border border-slate-850 font-mono">
                  {pl.items.length} Lessons
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-200 truncate max-w-[200px]">
                {pl.title}
              </h4>
            </button>
          );
        })}
      </div>

      {/* Main Video Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Player & Details */}
        <div className="lg:col-span-2 space-y-4">
          {/* Responsive 16:9 Video Frame */}
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-800 bg-black shadow-2xl">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${activeVideoId}?rel=0&modestbranding=1`}
              title="Math 3 Lecture Video"
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* Current Lesson Bar */}
          <div className="p-5 rounded-2xl border bg-slate-900/60 border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1 flex-1">
              <span className="text-[10px] font-mono font-bold text-teal-400 uppercase tracking-widest">
                {customTitle ? 'CUSTOM WALKTHROUGH' : currentPlaylist?.channel}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-100">
                {customTitle || currentItem?.title || currentPlaylist?.title}
              </h3>
              {currentItem?.problemFormula && !customTitle && (
                <div className="pt-1 text-xs text-teal-300">
                  <MathView math={currentItem.problemFormula} inline />
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              {!customEmbedId && (
                <>
                  <button
                    disabled={activeItemIndex === 0}
                    onClick={() => setActiveItemIndex((prev) => Math.max(0, prev - 1))}
                    className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    title="Previous Lesson"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    disabled={activeItemIndex === currentPlaylist.items.length - 1}
                    onClick={() =>
                      setActiveItemIndex((prev) =>
                        Math.min(currentPlaylist.items.length - 1, prev + 1)
                      )
                    }
                    className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    title="Next Lesson"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
              <a
                href={`https://www.youtube.com/watch?v=${activeVideoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-red-600/10 text-red-400 border border-red-500/20 hover:bg-red-600/20 flex items-center gap-1 text-xs font-bold"
              >
                <ExternalLink className="w-4 h-4" />
                <span>YouTube</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Playlist items and progress */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl border bg-slate-900/80 border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ListOrdered className="w-4 h-4 text-teal-400" />
                <h4 className="text-xs font-bold uppercase font-mono tracking-wider text-slate-200">
                  Playlist Syllabus
                </h4>
              </div>
              <span className="text-xs font-mono font-bold text-teal-400">
                {progressPercent}% Done
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-teal-400 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Items list */}
            <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
              {currentPlaylist?.items.map((item, idx) => {
                const isSelected = activeItemIndex === idx && !customEmbedId;
                const isDone = !!completedItems[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setActiveItemIndex(idx);
                      setCustomEmbedId(null);
                      setCustomTitle(null);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-slate-800 border-teal-500/40 text-slate-100 shadow-sm'
                        : 'bg-slate-950/60 border-slate-850 hover:border-slate-700 text-slate-400'
                    }`}
                  >
                    <button
                      onClick={(e) => toggleComplete(item.id, e)}
                      className="mt-0.5 text-slate-500 hover:text-teal-400 transition-colors"
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-teal-400" />
                      ) : (
                        <Circle className="w-4 h-4" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-mono text-slate-500">
                          Lesson {idx + 1}
                        </span>
                        <span className="text-[9px] font-mono text-slate-500">
                          {item.duration}
                        </span>
                      </div>
                      <h5
                        className={`text-xs font-semibold leading-snug line-clamp-2 ${
                          isDone ? 'line-through opacity-75' : ''
                        }`}
                      >
                        {item.title}
                      </h5>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick study alert */}
          <div className="p-4 rounded-xl border border-teal-500/20 bg-teal-500/5 text-xs text-slate-300 leading-relaxed font-sans">
            <span className="font-bold text-teal-400 block mb-1">💡 Pro-tip:</span>
            Watch videos on 1.25x speed and pause at each practice problem to solve the differential equation before the instructor writes the answer!
          </div>
        </div>
      </div>

      {/* Standalone Videos Grid */}
      <div className="space-y-4 pt-4">
        <h3 className="text-base font-extrabold tracking-tight text-slate-100 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span>Curated Standalone Topic Walkthroughs</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {STANDALONE_VIDEOS_DATA.map((vid) => (
            <div
              key={vid.id}
              onClick={() => handleSelectStandalone(vid)}
              className="p-5 rounded-2xl border bg-slate-900/60 border-slate-800 hover:border-teal-500/40 hover:bg-slate-900 transition-all cursor-pointer flex flex-col justify-between group space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase font-bold text-teal-400 px-2 py-0.5 rounded bg-teal-400/10 border border-teal-400/20">
                    {vid.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {vid.channel}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-teal-300 transition-colors">
                  {vid.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {vid.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-850 flex items-center justify-between text-xs font-bold text-teal-400">
                <span className="flex items-center gap-1">
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Play in Player</span>
                </span>
                <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Custom Video Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-extrabold text-slate-100">
              Add Custom YouTube Video
            </h3>
            <p className="text-xs text-slate-400">
              Enter any YouTube video link or ID to stream directly in the Math 3 viewer.
            </p>

            <form onSubmit={handleAddCustomVideo} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  Video Title / Topic
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Laplace Inverse Complete Review"
                  value={newVideoTitle}
                  onChange={(e) => setNewVideoTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  YouTube URL or ID
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., https://youtu.be/... or 11-char ID"
                  value={newVideoUrl}
                  onChange={(e) => setNewVideoUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-teal-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold transition-all cursor-pointer"
                >
                  Load in Deck
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
