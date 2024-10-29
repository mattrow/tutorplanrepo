import React from 'react';
import ReactMarkdown from 'react-markdown';
import { GrammarExample } from '@/types/lesson';

interface GrammarSectionProps {
  explanation: string;
  rulesTable: string;
  examples: GrammarExample[];
}

const GrammarSection: React.FC<GrammarSectionProps> = ({
  explanation,
  rulesTable,
  examples,
}) => {
  return (
    <div className="space-y-6">
      <div className="prose prose-indigo max-w-none">
        <ReactMarkdown>{explanation}</ReactMarkdown>
      </div>
      <div className="prose prose-indigo max-w-none">
        <ReactMarkdown>{rulesTable}</ReactMarkdown>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Examples</h3>
        {examples.map((example, index) => (
          <div key={index} className="mb-4">
            <p className="text-gray-700">{example.sentence}</p>
            <p className="text-sm text-gray-500">{example.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrammarSection; 