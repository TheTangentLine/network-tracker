import React, { useState, useEffect } from 'react';
import { MarkdownRenderer } from './MarkdownRenderer';

interface TypingAnimationProps {
  content: string;
  speed?: number; // milliseconds per character
  className?: string;
  onComplete?: () => void;
}

export const TypingAnimation: React.FC<TypingAnimationProps> = ({
  content,
  speed = 30,
  className = "",
  onComplete
}) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!content) return;

    setDisplayedContent('');
    setIsTyping(true);
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < content.length) {
        setDisplayedContent(content.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [content, speed, onComplete]);

  return (
    <div className={`typing-animation ${className}`}>
      <MarkdownRenderer content={displayedContent} />
      {isTyping && (
        <span className="inline-block w-2 h-4 bg-emerald-500 ml-1 animate-pulse">
          &nbsp;
        </span>
      )}
    </div>
  );
}; 