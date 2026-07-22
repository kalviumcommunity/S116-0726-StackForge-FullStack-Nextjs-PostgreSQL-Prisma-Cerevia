'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, RotateCcw, Award, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizOption {
  id: string;
  text: string;
}

interface QuizComponentProps {
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  onComplete: (correct: boolean) => void;
}

export function QuizComponent({ question, options, correctOptionId, onComplete }: QuizComponentProps) {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    if (!selectedOptionId) return;
    const correct = selectedOptionId === correctOptionId;
    setIsCorrect(correct);
    setSubmitted(true);
    onComplete(correct);
  };

  const handleRetry = () => {
    setSelectedOptionId(null);
    setSubmitted(false);
    setIsCorrect(false);
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
      
      {/* Quiz Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <HelpCircle className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
              Concept Check Quiz
            </span>
            <p className="text-xs font-bold text-white">Question 1 of 1</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl">
          <Clock className="h-3.5 w-3.5 text-amber-400" />
          <span>Timer: 02:00</span>
        </div>
      </div>

      {/* Question Title */}
      <div className="space-y-2">
        <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
          {question}
        </h3>
        <p className="text-xs text-zinc-400 font-normal">
          Select the most accurate answer below to verify your topic understanding.
        </p>
      </div>

      {/* Options List */}
      <div className="space-y-3">
        {options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          let optionStyle = 'border-zinc-800/80 bg-zinc-900/60 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900';

          if (submitted) {
            if (opt.id === correctOptionId) {
              optionStyle = 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300 font-bold';
            } else if (isSelected && !isCorrect) {
              optionStyle = 'border-rose-500/50 bg-rose-500/10 text-rose-300 font-bold';
            } else {
              optionStyle = 'border-zinc-800/40 bg-zinc-950/40 text-zinc-600 opacity-50';
            }
          } else if (isSelected) {
            optionStyle = 'border-blue-500 bg-blue-500/10 text-white font-bold ring-2 ring-blue-500/20';
          }

          return (
            <button
              key={opt.id}
              disabled={submitted}
              onClick={() => setSelectedOptionId(opt.id)}
              className={cn(
                'flex items-center justify-between w-full p-4 rounded-2xl border text-xs text-left transition-all duration-200 cursor-pointer select-none',
                optionStyle
              )}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-950 text-[10px] font-extrabold shrink-0">
                  {String.fromCharCode(65 + Number(opt.id))}
                </span>
                <span className="leading-snug">{opt.text}</span>
              </div>

              {submitted && opt.id === correctOptionId && (
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              )}
              {submitted && isSelected && !isCorrect && (
                <XCircle className="h-4 w-4 text-rose-400 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Instant Feedback Banner */}
      {submitted && (
        <div
          className={cn(
            'p-4 rounded-2xl border text-xs flex items-center justify-between gap-4 animate-fade-in',
            isCorrect
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
          )}
        >
          <div className="flex items-center gap-2">
            {isCorrect ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <XCircle className="h-5 w-5 shrink-0" />}
            <div>
              <p className="font-bold">{isCorrect ? 'Correct Answer! Reward Claimable.' : 'Incorrect Answer'}</p>
              <p className="text-[11px] opacity-90">
                {isCorrect
                  ? 'Excellent job! You are ready to submit the module and claim your XP.'
                  : 'Please review the concept notes above and retry the quiz question.'}
              </p>
            </div>
          </div>

          {!isCorrect && (
            <button
              onClick={handleRetry}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold text-white hover:bg-zinc-800 shrink-0"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Retry</span>
            </button>
          )}
        </div>
      )}

      {/* Action Footer */}
      {!submitted && (
        <div className="pt-2">
          <button
            onClick={handleSubmit}
            disabled={!selectedOptionId}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white text-xs font-bold text-zinc-950 shadow-lg hover:bg-zinc-100 transition-all disabled:opacity-50"
          >
            <span>Submit Quiz Answer</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

    </div>
  );
}
