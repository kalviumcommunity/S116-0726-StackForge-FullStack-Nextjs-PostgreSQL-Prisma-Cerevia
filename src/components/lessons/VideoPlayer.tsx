'use client';

import { useState, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  CheckCircle2,
  Subtitles,
} from 'lucide-react';

interface VideoPlayerProps {
  url: string;
  title: string;
  onPlay?: () => void;
}

export function VideoPlayer({ url, title, onPlay }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [showSubtitles, setShowSubtitles] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
      if (onPlay) onPlay();
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setHasEnded(true);
    if (onPlay) onPlay();
  };

  const changeSpeed = (speed: number) => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = speed;
    setPlaybackSpeed(speed);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="group relative select-none overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl">
      {/* Video Element */}
      <video
        ref={videoRef}
        src={url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onClick={togglePlay}
        className="h-auto max-h-[480px] w-full cursor-pointer object-cover"
      />

      {/* Video Title Header Overlay */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-zinc-950/90 via-zinc-950/40 to-transparent p-4 text-xs font-semibold text-white opacity-90 backdrop-blur-sm transition-opacity group-hover:opacity-100">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-ping rounded-full bg-blue-500" />
          <span className="max-w-sm truncate">{title}</span>
        </div>

        {hasEnded && (
          <span className="flex items-center gap-1.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" /> Video Complete
          </span>
        )}
      </div>

      {/* Center Play Overlay Trigger Button */}
      {!isPlaying && (
        <div
          onClick={togglePlay}
          className="absolute inset-0 flex cursor-pointer items-center justify-center bg-zinc-950/30 backdrop-blur-[2px]"
        >
          <button className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-zinc-950 shadow-2xl transition-transform hover:scale-110">
            <Play className="ml-1 h-7 w-7 fill-zinc-950" />
          </button>
        </div>
      )}

      {/* Subtitles Overlay Banner */}
      {isPlaying && showSubtitles && (
        <div className="pointer-events-none absolute inset-x-0 bottom-16 flex justify-center px-4">
          <span className="max-w-md rounded-xl border border-zinc-800 bg-zinc-950/90 px-4 py-1.5 text-center text-xs font-semibold text-zinc-200 backdrop-blur-md">
            &quot;In this module, we will explore asynchronous evaluation
            patterns...&quot;
          </span>
        </div>
      )}

      {/* Bottom Control Bar */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent p-4">
        {/* Progress Bar Track */}
        <div className="h-1.5 w-full cursor-pointer overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-400 transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Action Controls Row */}
        <div className="flex items-center justify-between pt-1 text-xs font-semibold text-zinc-300">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="rounded-lg p-1 transition-colors hover:bg-zinc-800 hover:text-white"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4 fill-white" />
              )}
            </button>

            <button
              onClick={toggleMute}
              className="rounded-lg p-1 transition-colors hover:bg-zinc-800 hover:text-white"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4 text-rose-400" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Speed Selector */}
            <div className="flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900 px-2 py-0.5 text-[10px]">
              {[1.0, 1.25, 1.5, 2.0].map((s) => (
                <button
                  key={s}
                  onClick={() => changeSpeed(s)}
                  className={
                    s === playbackSpeed
                      ? 'font-bold text-blue-400'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }
                >
                  {s}x
                </button>
              ))}
            </div>

            {/* Subtitles Toggle */}
            <button
              onClick={() => setShowSubtitles(!showSubtitles)}
              className={
                showSubtitles
                  ? 'text-blue-400'
                  : 'text-zinc-500 hover:text-zinc-300'
              }
              title="Toggle Subtitles"
            >
              <Subtitles className="h-4 w-4" />
            </button>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="rounded-lg p-1 transition-colors hover:bg-zinc-800 hover:text-white"
              aria-label="Fullscreen"
            >
              <Maximize className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
