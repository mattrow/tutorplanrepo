import React from 'react';
import { GeneratedTopic } from '@/types/lesson';
import { ArrowRight } from 'lucide-react';

interface IntroductionSectionProps {
  topic: GeneratedTopic;
}

const IntroductionSection: React.FC<IntroductionSectionProps> = ({ topic }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <p className="text-gray-700 leading-relaxed text-lg">
        {topic.introduction.explanation}
      </p>

      {topic.introduction.keyPoints && topic.introduction.keyPoints.length > 0 && (
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100">
          <h4 className="font-bold text-gray-900 mb-6 text-xl">Key Points</h4>
          <ul className="space-y-4">
            {topic.introduction.keyPoints.map((point, index) => (
              <li
                key={index}
                className="flex items-start gap-4 transform hover:translate-x-2 transition-transform duration-200"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-[#396afc] rounded-full flex items-center justify-center text-white">
                  <ArrowRight className="w-5 h-5" />
                </div>
                <span className="text-gray-700 leading-relaxed pt-1">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IntroductionSection;