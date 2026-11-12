import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  className?: string;
}

export const TypewriterText = ({
  phrases,
  typingSpeed = 90,
  deletingSpeed = 50,
  pauseTime = 2000,
  className = '',
}: TypewriterTextProps) => {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex % phrases.length];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentPhrase.substring(0, text.length + 1));

          if (text === currentPhrase) {
            setTimeout(() => setIsDeleting(true), pauseTime);
          }
        } else {
          setText(currentPhrase.substring(0, text.length - 1));

          if (text === '') {
            setIsDeleting(false);
            setPhraseIndex((prev) => prev + 1);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span>{text}</span>
      <span className="w-0.5 h-6 ml-1 bg-red-500 animate-pulse font-mono" />
    </span>
  );
};
