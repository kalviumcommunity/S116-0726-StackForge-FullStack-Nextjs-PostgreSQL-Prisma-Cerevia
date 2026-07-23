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
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-6 shadow-2xl">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
            <Code2 className="h-3.5 w-3.5" />
            <span>AI Code Workbench</span>
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight">
            Intelligent Code Assistant
          </h3>
        </div>

        {/* Action Modes */}
        <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 p-1 rounded-xl text-xs font-semibold overflow-x-auto">
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
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-xs shrink-0',
                activeTab === tab.id
                  ? 'bg-emerald-500 text-zinc-950 font-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              )}
            >
              <tab.icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Side by Side Code & Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Input Code Editor */}
        <div className="space-y-3 flex flex-col">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1.5">
              <FileCode className="h-3.5 w-3.5 text-blue-400" />
              <span>Source Code Input</span>
            </span>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-[11px] text-zinc-300 focus:outline-none"
            >
              <option value="TypeScript">TypeScript</option>
              <option value="Python">Python</option>
              <option value="Go">Go</option>
              <option value="SQL">SQL</option>
            </select>
          </div>

          <div className="relative flex-1 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 font-mono text-xs text-emerald-400">
            <textarea
              value={codeSnippet}
              onChange={(e) => setCodeSnippet(e.target.value)}
              className="w-full h-44 bg-transparent resize-none text-emerald-400 focus:outline-none font-mono"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white font-mono"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied Snippet' : 'Copy Snippet'}</span>
            </button>

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 text-zinc-950 font-black text-xs hover:bg-emerald-400 transition-colors shadow-lg"
            >
              <Play className="h-3.5 w-3.5 fill-zinc-950" />
              <span>{isAnalyzing ? 'Analyzing...' : 'Run AI Analysis'}</span>
            </button>
          </div>
        </div>

        {/* Right: AI Output Pane */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <span className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                <span>AI Mentor Breakdown</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Mode: {activeTab}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              {mockExplanations[activeTab]}
            </p>
          </div>

          <div className="p-3 rounded-xl border border-zinc-800 bg-zinc-950/80 text-[11px] text-zinc-400 font-mono space-y-1">
            <p className="text-emerald-400 font-bold">Suggested Refactoring Pattern:</p>
            <p className="text-zinc-500">Use async middleware wrapper for centralized logging & tracing.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
