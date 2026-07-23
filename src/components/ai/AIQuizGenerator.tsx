'use client';

import { useState } from 'react';
import { HelpCircle, Sparkles, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AIQuizGenerator() {
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const sampleQuestion = {
    title: 'Next.js 15 Server Actions Execution Context',
    question: 'How are Server Actions executed when invoked from a Client Component in Next.js 15?',
    options: [
      'They are compiled into WebAssembly and executed locally inside the browser.',
      'They execute as secure POST HTTP API endpoints on the server runtime.',
      'They block the client main thread until WebSocket synchronization finishes.',
      'They require an external GraphQL server proxy.',
    ],
    correctIndex: 1,
    explanation: 'Server Actions automatically create hidden POST HTTP endpoints handled by the Next.js server runtime.',
  };

  const handleSelectOption = (idx: number) => {
    if (submitted) return;
    setSelectedOption(idx);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSelectedOption(null);
    setSubmitted(false);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-blue-700 uppercase tracking-wider">
            <HelpCircle className="h-3.5 w-3.5 text-blue-600" />
            <span>Interactive AI Evaluator</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
            AI Quiz & Assessment Suite
          </h3>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 p-1 rounded-xl text-xs font-semibold">
          {(['Beginner', 'Intermediate', 'Advanced'] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={cn(
                'px-3 py-1 rounded-lg transition-all text-xs cursor-pointer',
                difficulty === d ? 'bg-blue-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
              )}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 space-y-5">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-blue-700 font-bold uppercase tracking-wider">
            {difficulty} • Question 1 of 5
          </span>
          <button
            onClick={handleReset}
            className="text-slate-500 hover:text-slate-900 flex items-center gap-1 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Reset Question
          </button>
        </div>

        <div className="space-y-2">
          <h4 className="text-base font-extrabold text-slate-900">{sampleQuestion.title}</h4>
          <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
            {sampleQuestion.question}
          </p>
        </div>

        <div className="space-y-2.5">
          {sampleQuestion.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === sampleQuestion.correctIndex;

            let borderStyle = 'border-slate-200 bg-white text-slate-800 hover:border-slate-300';
            if (submitted) {
              if (isCorrect) borderStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900';
              else if (isSelected) borderStyle = 'border-rose-500 bg-rose-50 text-rose-900';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={cn(
                  'w-full text-left p-3.5 rounded-xl border text-xs font-medium transition-all duration-200 flex items-center justify-between gap-3 shadow-xs cursor-pointer',
                  borderStyle
                )}
              >
                <span>{opt}</span>
                {submitted && isCorrect && <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />}
                {submitted && isSelected && !isCorrect && <XCircle className="h-4 w-4 text-rose-600 shrink-0" />}
              </button>
            );
          })}
        </div>

        {submitted && (
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-xs font-mono text-emerald-900 space-y-1 animate-fade-in">
            <p className="font-bold flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" /> AI Evaluation Feedback:
            </p>
            <p className="text-emerald-800">{sampleQuestion.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}
