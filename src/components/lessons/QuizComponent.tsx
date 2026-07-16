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
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h3 className="font-semibold text-lg text-foreground mb-4">{question}</h3>
      
      <div className="space-y-3 mb-6">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => !hasSubmitted && setSelectedId(option.id)}
            className={cn(
              "w-full flex items-center justify-between p-4 rounded-lg border text-left transition-all",
              hasSubmitted
                ? option.id === correctOptionId
                  ? "border-success bg-success/10 text-success"
                  : selectedId === option.id
                    ? "border-destructive bg-destructive/10 text-destructive"
                    : "border-border bg-secondary/50 text-muted-foreground"
                : selectedId === option.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:border-primary/50 hover:bg-secondary text-foreground"
            )}
            disabled={hasSubmitted}
          >
            <span className="font-medium text-sm">{option.text}</span>
            {hasSubmitted && option.id === correctOptionId && (
              <CheckCircle2 className="h-5 w-5 text-success" />
            )}
            {hasSubmitted && selectedId === option.id && selectedId !== correctOptionId && (
              <XCircle className="h-5 w-5 text-destructive" />
            )}
          </button>
        ))}
      </div>

      {!hasSubmitted ? (
        <Button 
          onClick={handleSubmit} 
          disabled={!selectedId}
          className="w-full"
        >
          Submit Answer
        </Button>
      ) : (
        <div className={cn(
          "p-4 rounded-lg text-sm font-medium",
          isCorrect ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
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
