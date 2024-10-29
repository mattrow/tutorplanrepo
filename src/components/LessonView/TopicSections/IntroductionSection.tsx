import React from 'react';
import { GeneratedTopic } from '@/types/lesson';
import { ArrowRight } from 'lucide-react';

interface IntroductionSectionProps {
  topic: GeneratedTopic;
}

const IntroductionSection: React.FC<IntroductionSectionProps> = ({ topic }) => {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 leading-relaxed">{topic.introduction.explanation}</p>

      <div className="bg-indigo-50 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-3">Key Points</h4>
        <ul className="space-y-2">
          {topic.introduction.keyPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-2">
              <ArrowRight className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IntroductionSection; 