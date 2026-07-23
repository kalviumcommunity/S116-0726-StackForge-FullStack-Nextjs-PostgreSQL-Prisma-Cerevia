'use client';

import { useState } from 'react';
import { Mic, Volume2, Sparkles, Square } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AIVoiceInterface() {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-6 shadow-2xl text-center flex flex-col items-center justify-center">
      <div className="space-y-1">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-red-400 uppercase tracking-widest bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full">
          <Mic className="h-3.5 w-3.5" />
          <span>Realtime Voice Assistant</span>
        </span>
        <h3 className="text-xl font-black text-white tracking-tight">
          Speak with your AI Mentor
        </h3>
        <p className="text-xs text-zinc-400">
          Ask questions verbally and listen to step-by-step concept explanations.
        </p>
      </div>

      {/* Mic Trigger */}
      <div className="relative my-4">
        <button
          onClick={() => setIsRecording(!isRecording)}
          className={cn(
            'h-24 w-24 rounded-full border-4 flex items-center justify-center transition-all duration-300 shadow-2xl select-none cursor-pointer',
            isRecording
              ? 'border-red-500 bg-red-600 text-white animate-pulse ring-8 ring-red-500/20'
              : 'border-blue-500/40 bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white'
          )}
        >
          {isRecording ? <Square className="h-8 w-8 fill-white" /> : <Mic className="h-10 w-10" />}
        </button>
      </div>

      {/* Waveform Animation */}
      {isRecording && (
        <div className="flex items-center justify-center gap-1 h-8 my-2">
          {[40, 70, 30, 90, 50, 80, 40].map((h, i) => (
            <span
              key={i}
              className="w-1.5 bg-red-400 rounded-full animate-bounce"
              style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      )}

      <p className="text-xs font-mono text-zinc-400">
        {isRecording ? 'Listening to your voice prompt...' : 'Click microphone to start hands-free voice mode'}
      </p>
    </div>
  );
}
