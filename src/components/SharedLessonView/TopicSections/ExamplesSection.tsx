import React from 'react';
import { Example } from '@/types/lesson';
import { CheckCircle, XCircle } from 'lucide-react';

interface ExamplesSectionProps {
  examples: Example[];
}

const ExamplesSection: React.FC<ExamplesSectionProps> = ({ examples }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      {examples.map((example, index) => (
        <div
          key={index}
          className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100 hover:shadow-md transition-all duration-200"
        >
          {example.context && (
            <h4 className="font-bold text-gray-900 mb-4 text-lg">{example.context}</h4>
          )}
          <div className="space-y-4">
            <div className="flex items-start gap-4 bg-white rounded-xl p-4 border border-green-100">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <p className="text-green-700 font-medium text-lg">{example.correct}</p>
              </div>
            </div>

            {example.incorrect && (
              <div className="flex items-start gap-4 bg-white rounded-xl p-4 border border-red-100">
                <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-red-700 font-medium text-lg">{example.incorrect}</p>
                </div>
              </div>
            )}

            <div className="mt-4 pl-10">
              <p className="text-gray-600 italic leading-relaxed">
                {example.explanation}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExamplesSection;