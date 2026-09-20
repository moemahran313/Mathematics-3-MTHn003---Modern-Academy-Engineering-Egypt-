import React, { useMemo } from 'react';
import katex from 'katex';

interface MathViewProps {
  math: string;
  block?: boolean;
  inline?: boolean;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({
  math,
  block = false,
  inline = false,
  className = '',
}) => {
  const isDisplayMode = block && !inline;

  const html = useMemo(() => {
    if (!math) return '';
    try {
      return katex.renderToString(math.trim(), {
        displayMode: isDisplayMode,
        throwOnError: false,
        strict: false,
      });
    } catch (err) {
      console.error('KaTeX parse error for:', math, err);
      return `<span class="text-red-400 font-mono text-xs">[Formula: ${math}]</span>`;
    }
  }, [math, isDisplayMode]);

  return (
    <span
      className={`inline-block select-text ${isDisplayMode ? 'w-full text-center my-1.5 overflow-x-auto overflow-y-hidden py-1' : ''} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

interface FormattedTextProps {
  text: string;
  className?: string;
}

/**
 * Parses a string that may contain inline math $...$ or block math $$...$$
 */
export const FormattedText: React.FC<FormattedTextProps> = ({ text, className = '' }) => {
  if (!text) return null;

  // Split by $$ for blocks, then $ for inline
  const parts = useMemo(() => {
    const segments: Array<{ type: 'text' | 'inline-math' | 'block-math'; content: string }> = [];
    const blockSplit = text.split(/\$\$(.*?)\$\$/gs);

    for (let i = 0; i < blockSplit.length; i++) {
      if (i % 2 === 1) {
        segments.push({ type: 'block-math', content: blockSplit[i] });
      } else {
        const inlineSplit = blockSplit[i].split(/\$(.*?)\$/g);
        for (let j = 0; j < inlineSplit.length; j++) {
          if (j % 2 === 1) {
            segments.push({ type: 'inline-math', content: inlineSplit[j] });
          } else if (inlineSplit[j]) {
            segments.push({ type: 'text', content: inlineSplit[j] });
          }
        }
      }
    }
    return segments;
  }, [text]);

  return (
    <span className={className}>
      {parts.map((p, idx) => {
        if (p.type === 'block-math') {
          return <MathView key={idx} math={p.content} block />;
        }
        if (p.type === 'inline-math') {
          return <MathView key={idx} math={p.content} inline />;
        }
        return <span key={idx}>{p.content}</span>;
      })}
    </span>
  );
};
