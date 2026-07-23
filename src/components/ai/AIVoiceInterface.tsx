'use client';

import { useState } from 'react';
import { Mic, Square } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AIVoiceInterface() {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-xs text-center flex flex-col items-center justify-center">
      <div className="space-y-1">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-red-700 uppercase tracking-wider bg-red-50 border border-red-200 px-3 py-1 rounded-full">
          <Mic className="h-3.5 w-3.5 text-red-600" />
          <span>Realtime Voice Assistant</span>
        </span>
        <h3 className="text-xl font-black text-slate-900 tracking-tight">
          Speak with your AI Mentor
        </h3>
        <p className="text-xs text-slate-600">
          Ask questions verbally and listen to step-by-step concept explanations.
        </p>
      </div>

      <div className="relative my-4">
        <button
          onClick={() => setIsRecording(!isRecording)}
          className={cn(
            'h-24 w-24 rounded-full border-4 flex items-center justify-center transition-all duration-300 shadow-md select-none cursor-pointer',
            isRecording
              ? 'border-red-500 bg-red-600 text-white animate-pulse ring-8 ring-red-100'
              : 'border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white'
          )}
        >
          {isRecording ? <Square className="h-8 w-8 fill-white" /> : <Mic className="h-10 w-10" />}
        </button>
      </div>

      {isRecording && (
        <div className="flex items-center justify-center gap-1 h-8 my-2">
          {[40, 70, 30, 90, 50, 80, 40].map((h, i) => (
            <span
              key={i}
              className="w-1.5 bg-red-500 rounded-full animate-bounce"
              style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      )}

      <p className="text-xs font-mono text-slate-500">
        {isRecording ? 'Listening to your voice prompt...' : 'Click microphone to start hands-free voice mode'}
      </p>
    </div>
  );
}
