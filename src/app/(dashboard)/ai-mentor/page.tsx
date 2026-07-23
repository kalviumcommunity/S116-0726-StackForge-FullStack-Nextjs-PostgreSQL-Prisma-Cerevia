'use client';

import { useState } from 'react';
import { AIMentorHero } from '@/components/ai/AIMentorHero';
import { AIStudyModes, AIStudyModeId } from '@/components/ai/AIStudyModes';
import { AIChatInterface, ChatMessage } from '@/components/ai/AIChatInterface';
import { SuggestedPrompts } from '@/components/ai/SuggestedPrompts';
import { AICodeAssistant } from '@/components/ai/AICodeAssistant';
import { AIQuizGenerator } from '@/components/ai/AIQuizGenerator';
import { AIStudyPlanner } from '@/components/ai/AIStudyPlanner';
import { AIVoiceInterface } from '@/components/ai/AIVoiceInterface';
import { AILearningInsights } from '@/components/ai/AILearningInsights';
import { FileUploadZone } from '@/components/ai/FileUploadZone';
import { AIChatHistory } from '@/components/ai/AIChatHistory';

export default function AIMentorPage() {
  const [activeMode, setActiveMode] = useState<AIStudyModeId>('learn');
  const [isGenerating, setIsGenerating] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: 'Hello! I am your Cerevia AI Learning Companion. Ask me any question on backend engineering, algorithm design, or syllabus topics!',
      timestamp: '10:00 AM',
    },
    {
      id: 'm2',
      sender: 'user',
      text: 'How do Next.js 15 Server Actions revalidate cache tags after updating PostgreSQL database records via Prisma?',
      timestamp: '10:02 AM',
    },
    {
      id: 'm3',
      sender: 'ai',
      text: 'In Next.js 15, Server Actions revalidate cached data by invoking `revalidateTag("tag_name")` or `revalidatePath("/path")` on the server runtime. Here is an architectural pattern using Prisma ORM:',
      codeSnippet: `import { revalidatePath } from 'next/cache';\nimport { prisma } from '@/lib/prisma';\n\nexport async function updateStudentXP(userId: string, xpAmount: number) {\n  const updated = await prisma.user.update({\n    where: { id: userId },\n    data: { xp: { increment: xpAmount } },\n  });\n\n  revalidatePath('/xp');\n  return { success: true, newXP: updated.xp };\n}`,
      codeLanguage: 'typescript',
      timestamp: '10:02 AM',
    },
  ]);

  const handleSendMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsGenerating(true);

    setTimeout(() => {
      const aiReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `Here is a comprehensive breakdown for "${text}": Cerevia AI recommends structuring your logic with clean async error boundaries, caching layers, and TypeScript interfaces.`,
        codeSnippet: `// Cerevia AI Generated Snippet\nexport function verifyLogic() {\n  console.log("Processing study query for syllabus mastery...");\n}`,
        codeLanguage: 'typescript',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiReply]);
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto w-full pb-16 px-4 md:px-0">
      
      {/* Hero Header */}
      <AIMentorHero onQuickAction={(prompt) => handleSendMessage(prompt)} />

      {/* Mode Selector Tabs */}
      <AIStudyModes activeMode={activeMode} onModeChange={setActiveMode} />

      {/* Mode View Routing */}
      {activeMode === 'learn' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          <div className="lg:col-span-3 space-y-6">
            <AIChatInterface
              messages={messages}
              onSendMessage={handleSendMessage}
              isGenerating={isGenerating}
            />
            <SuggestedPrompts onSelectPrompt={handleSendMessage} />
          </div>

          <div className="space-y-6">
            <AIChatHistory />
            <FileUploadZone />
          </div>
        </div>
      )}

      {activeMode === 'coding' && <AICodeAssistant />}

      {activeMode === 'quiz' && <AIQuizGenerator />}

      {activeMode === 'planner' && <AIStudyPlanner />}

      {activeMode === 'voice' && <AIVoiceInterface />}

      {activeMode === 'files' && <FileUploadZone />}

      {activeMode === 'interview' && (
        <div className="space-y-6">
          <AIChatInterface
            messages={messages}
            onSendMessage={handleSendMessage}
            isGenerating={isGenerating}
          />
        </div>
      )}

      {activeMode === 'insights' && <AILearningInsights />}

    </div>
  );
}
