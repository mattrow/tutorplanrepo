import React from 'react';
import ReactMarkdown from 'react-markdown';

interface InDepthSectionProps {
  content: string;
}

const InDepthSection: React.FC<InDepthSectionProps> = ({ content }) => {
  return (
    <div className="prose prose-indigo max-w-none 
      prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6 prose-h1:mt-8
      prose-h2:text-2xl prose-h2:font-semibold prose-h2:mb-4 prose-h2:mt-8
      prose-h3:text-xl prose-h3:font-medium prose-h3:mb-3 prose-h3:mt-6
      prose-p:mb-4 prose-p:leading-relaxed
      prose-ul:mb-6 prose-ul:mt-2
      prose-li:mb-2
      [&>*+*]:mt-6"
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default InDepthSection; 