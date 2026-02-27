import { useState } from 'react';
import { Film, Video, Clock, CheckCircle2, Sparkles, Target, TrendingUp, AlertTriangle } from 'lucide-react';
import { ATHLETES } from '../../lib/mockData';
import { getStoredUser } from '../../lib/mockAuth';
import PageLayout from '../../components/layout/PageLayout';
import VideoUpload from '../../components/athlete/VideoUpload';
import VideoAnalysisResults from '../../components/athlete/VideoAnalysisResults';
import { getMockAnalysis } from '../../lib/videoAnalysis';
import type { FormAnalysis, VideoUpload as VideoUploadType } from '../../lib/videoAnalysis';

const WORKOUT_CATEGORIES = [
  'Speed & Agility',
  'Upper Body Strength',
  'Lower Body Strength',
  'Position Drills',
  'Plyometrics',
  'Route Running',
];

// Mock past analyses
const PAST_ANALYSES = [
  {
    id: 'past-1',
    date: '2026-02-06',
    type: 'Position Drills',
    score: 91,
    label: 'ELITE FORM',
    highlights: 3,
    corrections: 1,
  },
  {
    id: 'past-2',
    date: '2026-02-03',
    type: 'Speed & Agility',
    score: 87,
    label: 'STRONG FORM',
    highlights: 2,
    corrections: 2,
  },
  {
    id: 'past-3',
    date: '2026-01-28',
    type: 'Upper Body Strength',
    score: 83,
    label: 'STRONG FORM',
    highlights: 2,
    corrections: 1,
  },
];

export default function FilmRoomPage() {
  const user = getStoredUser();
  const athlete = ATHLETES.find(a => a.id === user?.id) || ATHLETES[0];
  const [selectedCategory, setSelectedCategory] = useState(WORKOUT_CATEGORIES[0]);
  const [analysisResult, setAnalysisResult] = useState<FormAnalysis | null>(null);
  const [_uploadedVideos, setUploadedVideos] = useState<VideoUploadType[]>([]);

  const handleUploadComplete = (video: VideoUploadType) => {
    setUploadedVideos(prev => [...prev, video]);
  };

  const handleAnalysisRequest = (_videoId: string) => {
    const mockResult = getMockAnalysis(selectedCategory);
    setAnalysisResult({
      ...mockResult,
      id: `analysis-${Date.now()}`,
      videoId: _videoId,
    });
  };

  const handleViewPastAnalysis = (type: string) => {
    const mockResult = getMockAnalysis(type);
    setAnalysisResult({
      ...mockResult,
      id: `past-${Date.now()}`,
      videoId: 'past',
    });
  };

  return (
    <>
      <PageLayout
        role="athlete"
        title="Film Room"
        userName={athlete.name}
        userPhoto={athlete.photoUrl}
        notificationCount={3}
      >
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <Film size={24} className="text-gold-primary" />
            <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">Film Room</h2>
          </div>
          <p className="text-gray-500 text-sm">Upload workout videos for AI-powered form analysis and feedback.</p>
        </div>

        {/* Feature callout */}
        <div className="bg-gradient-to-r from-gold-primary/[0.08] to-transparent border border-gold-primary/20 rounded-xl p-4 md:p-5 mb-6 md:mb-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-gold-primary/10 flex items-center justify-center shrink-0">
              <Sparkles size={20} className="text-gold-primary" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm mb-1">AI Vision Analysis</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Our AI analyzes your workout videos frame-by-frame, detecting body landmarks, movement patterns,
                and form breakdowns. Get instant feedback on technique, speed metrics, and comparison to D1 athletes.
              </p>
              <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-3">
                <span className="flex items-center gap-1.5 text-gold-primary text-[10px] font-bold uppercase tracking-wider">
                  <Target size={10} /> Form scoring
                </span>
                <span className="flex items-center gap-1.5 text-gold-primary text-[10px] font-bold uppercase tracking-wider">
                  <TrendingUp size={10} /> Pro comparison
                </span>
                <span className="flex items-center gap-1.5 text-gold-primary text-[10px] font-bold uppercase tracking-wider">
                  <AlertTriangle size={10} /> Correction alerts
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Left: Upload section */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Category selector */}
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wider mb-3 font-medium">
                Workout Type
              </label>
              <div className="flex flex-wrap gap-2">
                {WORKOUT_CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-gold-primary text-black-pure font-bold'
                        : 'bg-black-elevated text-gray-400 border border-gray-700 hover:border-gray-500'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Video upload */}
            <VideoUpload
              workoutType={selectedCategory}
              onUploadComplete={handleUploadComplete}
              onAnalysisRequest={handleAnalysisRequest}
            />

            {/* How it works */}
            <div className="bg-black-card border border-gray-800 rounded-xl p-4 md:p-5">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">How It Works</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-gold-primary/10 flex items-center justify-center mx-auto mb-2">
                    <Video size={18} className="text-gold-primary" />
                  </div>
                  <p className="text-white text-xs font-bold mb-1">1. Upload</p>
                  <p className="text-gray-500 text-[10px]">Record and upload your workout video</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-gold-primary/10 flex items-center justify-center mx-auto mb-2">
                    <Sparkles size={18} className="text-gold-primary" />
                  </div>
                  <p className="text-white text-xs font-bold mb-1">2. Analyze</p>
                  <p className="text-gray-500 text-[10px]">AI detects landmarks & movement patterns</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-gold-primary/10 flex items-center justify-center mx-auto mb-2">
                    <TrendingUp size={18} className="text-gold-primary" />
                  </div>
                  <p className="text-white text-xs font-bold mb-1">3. Improve</p>
                  <p className="text-gray-500 text-[10px]">Get scored, compared, & coached up</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Past analyses */}
          <div className="space-y-4">
            <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Recent Analyses</h4>

            {/* Stats summary */}
            <div className="bg-black-card border border-gray-800 rounded-lg p-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <p className="text-gold-primary font-mono text-xl font-bold">3</p>
                  <p className="text-gray-500 text-[10px] uppercase tracking-wider">Videos</p>
                </div>
                <div className="text-center">
                  <p className="text-gold-bright font-mono text-xl font-bold">87</p>
                  <p className="text-gray-500 text-[10px] uppercase tracking-wider">Avg Score</p>
                </div>
                <div className="text-center">
                  <p className="text-gold-bronze font-mono text-xl font-bold">7</p>
                  <p className="text-gray-500 text-[10px] uppercase tracking-wider">Highlights</p>
                </div>
              </div>
            </div>

            {/* Past analysis cards */}
            {PAST_ANALYSES.map(past => (
              <button
                key={past.id}
                onClick={() => handleViewPastAnalysis(past.type)}
                className="w-full bg-black-card border border-gray-800 rounded-lg p-4 text-left hover:border-gold-primary/50 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm font-medium group-hover:text-gold-primary transition-colors">{past.type}</span>
                  <span className="font-mono font-bold text-sm" style={{
                    color: past.score >= 90 ? '#FFD700' : past.score >= 80 ? '#D4AF37' : '#CD7F32'
                  }}>
                    {past.score}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock size={10} />
                    {new Date(past.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1 text-gold-primary/60">
                    <CheckCircle2 size={10} />
                    {past.highlights} highlights
                  </span>
                  {past.corrections > 0 && (
                    <span className="flex items-center gap-1 text-red-400/60">
                      <AlertTriangle size={10} />
                      {past.corrections} fixes
                    </span>
                  )}
                </div>
              </button>
            ))}

            {/* Tip */}
            <div className="p-3 bg-gold-primary/[0.03] border border-gold-primary/10 rounded-lg">
              <p className="text-gray-400 text-[10px] leading-relaxed">
                <span className="text-gold-primary font-medium">Coach tip:</span>{' '}
                Upload videos regularly to track your form improvement over time. AI analysis works best with clear, well-lit footage from a side or 45° angle.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-700 text-sm uppercase tracking-[0.3em]">
            Film don't lie. Neither does AI.
          </p>
        </div>
      </PageLayout>

      {/* Analysis results modal */}
      {analysisResult && (
        <VideoAnalysisResults
          analysis={analysisResult}
          onClose={() => setAnalysisResult(null)}
        />
      )}
    </>
  );
}
