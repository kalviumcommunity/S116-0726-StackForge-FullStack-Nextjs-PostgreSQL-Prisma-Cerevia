'use client';

import { useState } from 'react';
import { Code2, Bug, Zap, Sparkles, Copy, Check, Play, FileCode } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AICodeAssistant() {
  const [activeTab, setActiveTab] = useState<'explain' | 'debug' | 'optimize' | 'generate'>('explain');
  const [language, setLanguage] = useState('TypeScript');
  const [codeSnippet, setCodeSnippet] = useState(
    `async function fetchUserData(userId: string) {\n  const res = await fetch(\`/api/user/\${userId}\`);\n  if (!res.ok) throw new Error("Failed to fetch user");\n  return await res.json();\n}`
  );
  const [copied, setCopied] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const mockExplanations = {
    explain:
      'This asynchronous TypeScript function fetches student profile data using the native `fetch` API. It includes HTTP status validation and propagates runtime errors cleanly.',
    debug:
      'No critical syntax bugs detected. Suggestion: Add a try-catch block or set an explicit request timeout parameter to prevent hanging connections.',
    optimize:
      'Optimization Tip: Wrap response parsing with Zod schema validation to guarantee strict runtime type safety for user properties.',
    generate:
      'Generated helper function with caching and exponential backoff retry support.',
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 800);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-blue-700 uppercase tracking-wider">
            <Code2 className="h-3.5 w-3.5 text-blue-600" />
            <span>AI Code Workbench</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Intelligent Code Assistant
          </h3>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 p-1 rounded-xl text-xs font-semibold overflow-x-auto">
          {[
            { id: 'explain', label: 'Explain', icon: Sparkles },
            { id: 'debug', label: 'Debug', icon: Bug },
            { id: 'optimize', label: 'Optimize', icon: Zap },
            { id: 'generate', label: 'Generate', icon: FileCode },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-xs shrink-0 cursor-pointer',
                activeTab === tab.id
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              )}
            >
              <tab.icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3 flex flex-col">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500">
            <span className="flex items-center gap-1.5">
              <FileCode className="h-3.5 w-3.5 text-blue-600" />
              <span>Source Code Input</span>
            </span>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1 text-[11px] text-slate-700 focus:outline-none"
            >
              <option value="TypeScript">TypeScript</option>
              <option value="Python">Python</option>
              <option value="Go">Go</option>
              <option value="SQL">SQL</option>
            </select>
          </div>

          <div className="relative flex-1 rounded-2xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-emerald-400">
            <textarea
              value={codeSnippet}
              onChange={(e) => setCodeSnippet(e.target.value)}
              className="w-full h-44 bg-transparent resize-none text-emerald-400 focus:outline-none font-mono"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 font-mono"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied Snippet' : 'Copy Snippet'}</span>
            </button>

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors shadow-xs"
            >
              <Play className="h-3.5 w-3.5 fill-white" />
              <span>{isAnalyzing ? 'Analyzing...' : 'Run AI Analysis'}</span>
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                <span>AI Mentor Breakdown</span>
              </span>
              <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                Mode: {activeTab}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              {mockExplanations[activeTab]}
            </p>
          </div>

          <div className="p-3 rounded-xl border border-slate-200 bg-white text-[11px] text-slate-600 font-mono space-y-1">
            <p className="text-blue-700 font-bold">Suggested Refactoring Pattern:</p>
            <p className="text-slate-500">Use async middleware wrapper for centralized logging & tracing.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
