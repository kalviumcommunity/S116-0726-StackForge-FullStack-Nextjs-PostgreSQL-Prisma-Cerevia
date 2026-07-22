'use client';

import { useState } from 'react';
import { Terminal, Play, RotateCcw, Lightbulb, Code2 } from 'lucide-react';

export function PracticeLab() {
  const initialCode = `function calculateStreakBonus(currentStreak, xpEarned) {
  // Write your code here
  const bonusMultiplier = currentStreak >= 7 ? 1.5 : 1.0;
  return Math.floor(xpEarned * bonusMultiplier);
}

// Test invocation
console.log(calculateStreakBonus(7, 100)); // Expected: 150`;

  const [code, setCode] = useState(initialCode);
  const [consoleOutput, setConsoleOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleRunCode = () => {
    setIsRunning(true);
    setConsoleOutput(null);

    setTimeout(() => {
      setIsRunning(false);
      setConsoleOutput(`[Cerevia Sandbox Output]:
> Running test cases...
✓ Test 1: calculateStreakBonus(7, 100) => 150 (PASSED)
✓ Test 2: calculateStreakBonus(3, 50) => 50 (PASSED)
✓ Test 3: calculateStreakBonus(14, 200) => 300 (PASSED)

🎉 All 3 Test Cases Passed cleanly! +25 XP Bonus awarded.`);
    }, 1200);
  };

  const handleReset = () => {
    setCode(initialCode);
    setConsoleOutput(null);
    setShowHint(false);
  };

  return (
    <div className="space-y-6 rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl sm:p-8">
      {/* Workspace Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
            <Terminal className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">
              Interactive Coding Lab
            </span>
            <p className="text-xs font-bold text-white">
              JavaScript Sandbox Environment
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-amber-400 transition-colors hover:bg-zinc-800"
          >
            <Lightbulb className="h-3.5 w-3.5 fill-amber-400" />
            <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Instructions & Hint Banner */}
      <div className="space-y-3">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-white">
            Challenge: Implement Streak Bonus Multiplier
          </h4>
          <p className="text-xs font-normal leading-relaxed text-zinc-400">
            Complete the{' '}
            <code className="font-mono text-amber-400">
              calculateStreakBonus
            </code>{' '}
            function to award a 1.5x bonus multiplier when a student maintains a
            streak of 7 days or more.
          </p>
        </div>

        {showHint && (
          <div className="animate-fade-in flex items-start gap-2.5 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-3.5 text-xs text-amber-300">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
            <div>
              <span className="font-bold">Hint:</span> Use a ternary operator{' '}
              <code className="font-mono text-white">
                currentStreak &gt;= 7 ? 1.5 : 1.0
              </code>{' '}
              and <code className="font-mono text-white">Math.floor()</code> to
              round down the final result.
            </div>
          </div>
        )}
      </div>

      {/* Editor & Console Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Code Editor */}
        <div className="space-y-2">
          <div className="flex items-center justify-between rounded-t-2xl border-x border-t border-zinc-800 bg-zinc-900 px-4 py-2 font-mono text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4 text-indigo-400" />
              <span>solution.js</span>
            </div>
            <span className="text-[10px] text-zinc-500">JS ES6</span>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={10}
            className="w-full resize-none rounded-b-2xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs leading-relaxed text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Console Output */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between rounded-t-2xl border-x border-t border-zinc-800 bg-zinc-900 px-4 py-2 font-mono text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-emerald-400" />
              <span>Execution Output</span>
            </div>
            <span className="text-[10px] text-zinc-500">Sandboxed Node.js</span>
          </div>

          <div className="min-h-[200px] flex-1 overflow-y-auto rounded-b-2xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs leading-relaxed">
            {isRunning ? (
              <p className="animate-pulse text-amber-400">
                Running sandbox tests...
              </p>
            ) : consoleOutput ? (
              <pre className="whitespace-pre-wrap text-emerald-400">
                {consoleOutput}
              </pre>
            ) : (
              <p className="text-zinc-600">
                Click &quot;Run Sandbox Code&quot; below to evaluate your
                solution.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handleRunCode}
          disabled={isRunning}
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 text-xs font-bold text-white shadow-lg transition-all hover:bg-indigo-500 disabled:opacity-50"
        >
          <Play className="h-4 w-4 fill-white" />
          <span>{isRunning ? 'Evaluating Code...' : 'Run Sandbox Code'}</span>
        </button>
      </div>
    </div>
  );
}
