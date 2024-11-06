import React, { useState, useEffect } from 'react';
import { GeneratedTopic } from '@/types/lesson';
import IntroductionSection from './IntroductionSection';
import InDepthSection from './InDepthSection';
import ExamplesSection from './ExamplesSection';
import ExercisesSection from './ExercisesSection';
import TopicNavigation from './TopicNavigation';

interface TopicStatus {
  completed: boolean;
  understood: boolean | null;
}

interface TopicModuleProps {
  topic: GeneratedTopic;
  status: TopicStatus;
  onStatusChange: (status: Partial<TopicStatus>) => void;
}

const TopicModule: React.FC<TopicModuleProps> = ({ topic, status, onStatusChange }) => {
  const [activeSection, setActiveSection] = useState('introduction');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8 hover:shadow-md transition-shadow">
        <div className="flex items-start gap-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-[#396afc] to-[#2948ff] bg-clip-text text-transparent">
              {topic.title}
            </h3>

            <TopicNavigation
              activeSection={activeSection}
              onSectionChange={setActiveSection}
              topic={topic}
            />

            <div className="mt-8">
              {activeSection === 'introduction' && <IntroductionSection topic={topic} />}
              {activeSection === 'in-depth' && <InDepthSection content={topic.inDepth} />}
              {activeSection === 'examples' && <ExamplesSection examples={topic.examples} />}
              {activeSection === 'exercises' && <ExercisesSection exercises={topic.exercises} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicModule;