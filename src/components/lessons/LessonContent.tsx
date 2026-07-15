import * as React from 'react';

interface LessonContentProps {
  content: string;
}

export function LessonContent({ content }: LessonContentProps) {
  return (
    <div className="prose prose-invert max-w-none prose-p:text-muted-foreground prose-headings:text-foreground">
      {/* We are rendering plain text here as a mock. Real implementation would parse MD or HTML. */}
      <h3>About this lesson</h3>
      <p>{content}</p>
      
      <h4>Key Takeaways</h4>
      <ul>
        <li>Understand the core principles.</li>
        <li>Learn how to apply them in practice.</li>
        <li>Review common pitfalls and how to avoid them.</li>
      </ul>
    </div>
  );
}
