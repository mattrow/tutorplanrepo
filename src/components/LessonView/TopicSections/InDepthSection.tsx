import React from 'react';
import ReactMarkdown from 'react-markdown';

interface InDepthSectionProps {
  content: string;
}

const InDepthSection: React.FC<InDepthSectionProps> = ({ content }) => {
  return (
    <div className="animate-fade-in">
      <div
        className="prose prose-lg max-w-none
          prose-headings:text-gray-900 prose-headings:font-bold
          prose-h1:text-3xl prose-h1:mb-8 prose-h1:mt-8
          prose-h2:text-2xl prose-h2:mb-6 prose-h2:mt-8
          prose-h3:text-xl prose-h3:mb-4 prose-h3:mt-6
          prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
          prose-ul:mb-6 prose-ul:mt-2
          prose-li:text-gray-700 prose-li:mb-2
          prose-strong:text-[#396afc] prose-strong:font-bold
          prose-blockquote:border-l-4 prose-blockquote:border-[#396afc] prose-blockquote:pl-4 prose-blockquote:italic
          [&>*+*]:mt-6"
      >
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default InDepthSection; 