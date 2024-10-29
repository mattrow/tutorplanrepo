import React from 'react';
import ReactMarkdown from 'react-markdown';

interface InDepthSectionProps {
  content: string;
}

const InDepthSection: React.FC<InDepthSectionProps> = ({ content }) => {
  return (
    <div className="prose prose-indigo max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default InDepthSection; 