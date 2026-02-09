import { useState, useRef, useCallback } from 'react';
import { Upload, Video, X, Film, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import type { VideoUpload as VideoUploadType } from '../../lib/videoAnalysis';
import { PROCESSING_STAGES } from '../../lib/videoAnalysis';

interface VideoUploadProps {
  workoutType?: string;
  onUploadComplete: (video: VideoUploadType) => void;
  onAnalysisRequest: (videoId: string) => void;
}

export default function VideoUpload({ workoutType, onUploadComplete, onAnalysisRequest }: VideoUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState<VideoUploadType | null>(null);
  const [processingStage, setProcessingStage] = useState(0);
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const simulateUpload = useCallback((fileName: string, fileSize: number) => {
    setUploading(true);

    const video: VideoUploadType = {
      id: `vid-${Date.now()}`,
      filename: fileName,
      type: fileName.endsWith('.mov') ? 'mov' : fileName.endsWith('.webm') ? 'webm' : 'mp4',
      size: fileSize > 1024 * 1024 ? `${(fileSize / (1024 * 1024)).toFixed(1)} MB` : `${(fileSize / 1024).toFixed(0)} KB`,
      duration: `0:${Math.floor(Math.random() * 40 + 20)}`,
      thumbnailColor: `from-gold-primary/20 to-gold-bronze/20`,
      uploadedAt: new Date().toISOString(),
      workoutType: workoutType || 'General Training',
      status: 'uploading',
      progress: 0,
    };

    setUploadedVideo(video);

    // Simulate upload progress
    let progress = 0;
    const uploadInterval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(uploadInterval);
        video.status = 'analyzed';
        video.progress = 100;
        setUploadedVideo({ ...video });
        setUploading(false);
        onUploadComplete(video);
      } else {
        video.progress = Math.min(progress, 99);
        setUploadedVideo({ ...video });
      }
    }, 300);
  }, [workoutType, onUploadComplete]);

  const handleAnalyze = () => {
    if (!uploadedVideo) return;
    setProcessing(true);
    setProcessingStage(0);

    // Step through AI processing stages
    let stage = 0;
    const stageInterval = setInterval(() => {
      stage++;
      if (stage >= PROCESSING_STAGES.length) {
        clearInterval(stageInterval);
        setProcessing(false);
        onAnalysisRequest(uploadedVideo.id);
      } else {
        setProcessingStage(stage);
      }
    }, 800);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      const file = e.dataTransfer.files[0];
      simulateUpload(file.name, file.size);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      simulateUpload(file.name, file.size);
    }
  };

  const handleRemove = () => {
    setUploadedVideo(null);
    setProcessing(false);
    setProcessingStage(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // AI Processing view
  if (processing) {
    const currentStage = PROCESSING_STAGES[processingStage];
    return (
      <div className="bg-black-card border border-gold-primary/30 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-gold-primary/10 flex items-center justify-center">
            <Film className="text-gold-primary animate-pulse" size={20} />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wide">AI Form Analysis</h3>
            <p className="text-gray-500 text-xs">Powered by UChamp Vision AI</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gold-primary text-xs font-medium">{currentStage.label}</span>
            <span className="text-gold-primary font-mono font-bold text-xs">{currentStage.percent}%</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gold-primary to-gold-bright rounded-full transition-all duration-500"
              style={{ width: `${currentStage.percent}%` }}
            />
          </div>
        </div>

        {/* Stage list */}
        <div className="space-y-2">
          {PROCESSING_STAGES.map((stage, i) => (
            <div key={i} className={`flex items-center gap-2 text-xs ${
              i < processingStage ? 'text-gold-primary' : i === processingStage ? 'text-white' : 'text-gray-600'
            }`}>
              {i < processingStage ? (
                <CheckCircle2 size={12} className="text-gold-primary shrink-0" />
              ) : i === processingStage ? (
                <Loader2 size={12} className="text-gold-primary animate-spin shrink-0" />
              ) : (
                <div className="w-3 h-3 rounded-full border border-gray-700 shrink-0" />
              )}
              <span>{stage.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Uploaded video preview
  if (uploadedVideo && !uploading) {
    return (
      <div className="bg-black-card border border-gray-800 rounded-xl overflow-hidden">
        {/* Video preview placeholder */}
        <div className={`relative h-40 bg-gradient-to-br ${uploadedVideo.thumbnailColor} flex items-center justify-center`}>
          <div className="absolute inset-0 bg-black-pure/40" />
          <div className="relative z-10 text-center">
            <Video size={40} className="text-gold-primary/60 mx-auto mb-2" />
            <p className="text-white/80 text-sm font-mono">{uploadedVideo.duration}</p>
          </div>
          <button
            onClick={handleRemove}
            className="absolute top-3 right-3 z-10 w-8 h-8 bg-black-pure/60 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-white text-sm font-medium truncate">{uploadedVideo.filename}</p>
              <p className="text-gray-500 text-xs">{uploadedVideo.size} · {uploadedVideo.workoutType}</p>
            </div>
            <CheckCircle2 size={16} className="text-gold-primary shrink-0" />
          </div>

          <button
            onClick={handleAnalyze}
            className="w-full flex items-center justify-center gap-2 bg-gold-primary text-black-pure px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-gold-bright transition-colors cursor-pointer"
          >
            <Film size={16} />
            Analyze with AI
          </button>

          <p className="text-gray-600 text-[10px] text-center mt-2 uppercase tracking-wider">
            AI will analyze form, technique, and movement patterns
          </p>
        </div>
      </div>
    );
  }

  // Upload area (with uploading state)
  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => !uploading && fileInputRef.current?.click()}
      className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
        uploading
          ? 'border-gold-primary/50 bg-gold-primary/5'
          : dragActive
            ? 'border-gold-primary bg-gold-primary/10'
            : 'border-gray-700 hover:border-gold-primary/50 hover:bg-black-elevated'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="video/mp4,video/quicktime,video/webm,.mp4,.mov,.webm"
        onChange={handleFileSelect}
        className="hidden"
      />

      {uploading ? (
        <>
          <Loader2 size={32} className="text-gold-primary mx-auto mb-3 animate-spin" />
          <p className="text-gold-primary text-sm font-bold mb-1">Uploading...</p>
          <div className="w-48 mx-auto h-1.5 bg-gray-800 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-gold-primary rounded-full transition-all duration-300"
              style={{ width: `${uploadedVideo?.progress || 0}%` }}
            />
          </div>
          <p className="text-gray-500 text-xs">{uploadedVideo?.filename}</p>
        </>
      ) : (
        <>
          <div className="w-14 h-14 rounded-full bg-gold-primary/10 flex items-center justify-center mx-auto mb-4">
            <Upload size={24} className="text-gold-primary" />
          </div>
          <p className="text-white font-bold text-sm mb-1">Upload Workout Video</p>
          <p className="text-gray-500 text-xs mb-3">
            Drag & drop or click to select
          </p>
          <div className="flex items-center justify-center gap-3 text-gray-600 text-[10px] uppercase tracking-wider">
            <span>MP4</span>
            <span className="w-1 h-1 bg-gray-700 rounded-full" />
            <span>MOV</span>
            <span className="w-1 h-1 bg-gray-700 rounded-full" />
            <span>WEBM</span>
            <span className="w-1 h-1 bg-gray-700 rounded-full" />
            <span>Max 500MB</span>
          </div>
          {workoutType && (
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-gold-primary/10 rounded-full">
              <AlertCircle size={10} className="text-gold-primary" />
              <span className="text-gold-primary text-[10px] font-medium">{workoutType} analysis ready</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
