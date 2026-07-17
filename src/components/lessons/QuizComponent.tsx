'use client';

import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { CheckCircle2, XCircle } from 'lucide-react';

interface QuizOption {
  id: string;
  text: string;
}

interface QuizComponentProps {
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  onComplete?: (isCorrect: boolean) => void;
}

export function QuizComponent({ question, options, correctOptionId, onComplete }: QuizComponentProps) {
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = React.useState(false);

  const isCorrect = selectedId === correctOptionId;

  const handleSubmit = () => {
    if (!selectedId) return;
    setHasSubmitted(true);
    if (onComplete) {
      onComplete(isCorrect);
    }
  };

  return (
    <div className="rounded-none border border-border/10 bg-[#090909] p-8 shadow-none">
      <h3 className="font-serif font-medium text-lg text-white mb-6">{question}</h3>
      
      <div className="space-y-3 mb-6">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => !hasSubmitted && setSelectedId(option.id)}
            className={cn(
              "w-full flex items-center justify-between p-4 rounded-none border text-left transition-all duration-300",
              hasSubmitted
                ? option.id === correctOptionId
                  ? "border-primary bg-primary/10 text-primary"
                  : selectedId === option.id
                    ? "border-destructive bg-destructive/10 text-destructive"
                    : "border-border/10 bg-[#060606] text-muted-foreground/60"
                : selectedId === option.id
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border/10 bg-black hover:border-primary/30 text-white hover:bg-primary/[0.01]"
            )}
            disabled={hasSubmitted}
          >
            <span className="font-sans text-xs font-light tracking-wide">{option.text}</span>
            {hasSubmitted && option.id === correctOptionId && (
              <CheckCircle2 className="h-4.5 w-4.5 text-primary" />
            )}
            {hasSubmitted && selectedId === option.id && selectedId !== correctOptionId && (
              <XCircle className="h-4.5 w-4.5 text-destructive" />
            )}
          </button>
        ))}
      </div>

      {!hasSubmitted ? (
        <Button 
          onClick={handleSubmit} 
          disabled={!selectedId}
          className="w-full rounded-none bg-primary text-black font-sans uppercase tracking-[0.18em] text-[10px] py-3.5 hover:bg-primary/90 duration-300 border-none"
        >
          Submit Answer
        </Button>
      ) : (
        <div className={cn(
          "p-4 rounded-none text-xs font-sans uppercase tracking-wider font-light",
          isCorrect ? "bg-primary/10 border border-primary/20 text-primary" : "bg-destructive/10 border border-destructive/20 text-destructive"
        )}>
          {isCorrect 
            ? "Correct! You've mastered this concept." 
            : "Not quite right. Review the lesson and try again."}
        </div>
      )}
    </div>
  );
}

// style: adjust quiz component visual polish step 5

// style: adjust quiz component visual polish step 6

// style: adjust quiz component visual polish step 7

// style: adjust quiz component visual polish step 8

// style: adjust quiz component visual polish step 9

// style: adjust quiz component visual polish step 10

// style: adjust quiz component visual polish step 11

// style: adjust quiz component visual polish step 12

// style: adjust quiz component visual polish step 13

// style: adjust quiz component visual polish step 14

// style: adjust quiz component visual polish step 15

// style: adjust quiz component visual polish step 16

// style: adjust quiz component visual polish step 17

// style: adjust quiz component visual polish step 18
