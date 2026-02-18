import React, { useState, useEffect, useCallback } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
  triggerOnHover?: boolean;
}

const chars = '!@#$%^&*()_+{}:"<>?-=[];,./';

const GlitchText: React.FC<GlitchTextProps> = ({ text, className, scrambleSpeed = 30, triggerOnHover = false }) => {
  const [displayText, setDisplayText] = useState('');

  const scramble = useCallback(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((_, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, scrambleSpeed);

    return () => clearInterval(interval);
  }, [text, scrambleSpeed]);

  useEffect(() => {
    scramble();
  }, [scramble]);

  return (
    <span 
      className={className} 
      aria-label={text}
      onMouseEnter={triggerOnHover ? scramble : undefined}
    >
      {displayText}
    </span>
  );
};

export default GlitchText;
