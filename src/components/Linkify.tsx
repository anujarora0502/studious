import React from 'react';

interface LinkifyProps {
  text: string;
  className?: string;
}

export default function Linkify({ text, className }: LinkifyProps) {
  // Regex to find URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  const parts = text.split(urlRegex);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.match(urlRegex)) {
          return (
            <a
              key={index}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#9CAF88', textDecoration: 'underline' }}
              className="hover:opacity-80 font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              {part}
            </a>
          );
        }
        return part;
      })}
    </span>
  );
}
