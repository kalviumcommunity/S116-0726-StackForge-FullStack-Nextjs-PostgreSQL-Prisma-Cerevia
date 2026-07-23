'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  Send,
  Bot,
  User,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Paperclip,
  Mic,
  Code2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  codeSnippet?: string;
  codeLanguage?: string;
  timestamp: string;
}

interface AIChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isGenerating?: boolean;
}

export function AIChatInterface({
  messages,
  onSendMessage,
  isGenerating = false,
}: AIChatInterfaceProps) {
  const [inputText, setInputText] = useState('');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  const handleSend = () => {
    if (!inputText.trim() || isGenerating) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleCopyCode = (msgId: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(msgId);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  return (
    <div className="flex flex-col h-[620px] rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden">
      
      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6 scrollbar-none">
        {messages.map((msg) => {
          const isAI = msg.sender === 'ai';

          return (
            <div
              key={msg.id}
              className={cn(
                'flex items-start gap-3 max-w-3xl animate-fade-in',
                isAI ? 'mr-auto' : 'ml-auto flex-row-reverse'
              )}
            >
              {/* Avatar Icon */}
              <div
                className={cn(
                  'h-9 w-9 rounded-2xl flex items-center justify-center shrink-0 shadow-md border',
                  isAI
                    ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                    : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                )}
              >
                {isAI ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
              </div>

              {/* Bubble Body */}
              <div className="space-y-2 max-w-xl">
                <div
                  className={cn(
                    'p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-3 shadow-md',
                    isAI
                      ? 'bg-zinc-900/90 border border-zinc-800 text-zinc-200'
                      : 'bg-blue-600 text-white font-medium'
                  )}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Code Snippet Card */}
                  {msg.codeSnippet && (
                    <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden font-mono text-xs my-2">
                      <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-900 border-b border-zinc-800 text-zinc-400 text-[11px]">
                        <span className="flex items-center gap-1.5">
                          <Code2 className="h-3.5 w-3.5 text-blue-400" />
                          <span>{msg.codeLanguage || 'typescript'}</span>
                        </span>
                        <button
                          onClick={() => handleCopyCode(msg.id, msg.codeSnippet!)}
                          className="flex items-center gap-1 text-[10px] font-bold text-zinc-400 hover:text-white"
                        >
                          {copiedCodeId === msg.id ? (
                            <Check className="h-3 w-3 text-emerald-400" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                          <span>{copiedCodeId === msg.id ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>

                      <pre className="p-3 text-emerald-400 overflow-x-auto">
                        <code>{msg.codeSnippet}</code>
                      </pre>
                    </div>
                  )}
                </div>

                <div
                  className={cn(
                    'flex items-center gap-2 text-[10px] font-mono text-zinc-500 px-1',
                    !isAI && 'justify-end'
                  )}
                >
                  <span>{msg.timestamp}</span>
                  {isAI && (
                    <button
                      onClick={() => onSendMessage(msg.text)}
                      className="hover:text-zinc-300 transition-colors flex items-center gap-1"
                    >
                      <RotateCcw className="h-3 w-3" /> Retry
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Streaming / Generating Typing Indicator */}
        {isGenerating && (
          <div className="flex items-center gap-3 mr-auto max-w-xl">
            <div className="h-9 w-9 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
              <Bot className="h-5 w-5 animate-pulse" />
            </div>
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-400 animate-spin" />
              <span>AI Copilot is synthesizing explanation...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-4 bg-zinc-950 border-t border-zinc-800 space-y-2">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Ask your AI Mentor anything about code, syllabus, or concept notes..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isGenerating}
            className="w-full h-12 pl-4 pr-24 rounded-2xl border border-zinc-800 bg-zinc-900/90 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="absolute right-2 flex items-center gap-1.5">
            <button
              onClick={handleSend}
              disabled={!inputText.trim() || isGenerating}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-all disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>

        <p className="text-[10px] text-zinc-500 text-center font-mono">
          Powered by Cerevia AI Engine v2.4 • Press Enter to send query
        </p>
      </div>

    </div>
  );
}
