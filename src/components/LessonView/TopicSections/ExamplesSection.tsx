import React from 'react';
import { Example } from '@/types/lesson';

interface ExamplesSectionProps {
  examples: Example[];
}

const ExamplesSection: React.FC<ExamplesSectionProps> = ({ examples }) => {
  return (
    <div className="space-y-6">
      {examples.map((example, index) => (
        <div key={index} className="bg-blue-50/50 rounded-xl p-6">
          {example.context && (
            <h4 className="font-semibold text-gray-900 mb-2">{example.context}</h4>
          )}
          <div className="space-y-2">
            <p className="text-green-600 font-medium">✓ {example.correct}</p>
            {example.incorrect && (
              <p className="text-red-600 font-medium">✗ {example.incorrect}</p>
            )}
            <p className="text-gray-600 italic">{example.explanation}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExamplesSection; 