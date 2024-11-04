// src/components/SharedLessonView/SharedLessonPage.tsx

'use client';

import React, { useState, useEffect } from 'react';
import IntroductionSection from './TopicSections/IntroductionSection';
import InDepthSection from './TopicSections/InDepthSection';
import ExamplesSection from './TopicSections/ExamplesSection';
import ExercisesSection from './TopicSections/ExercisesSection';
import TopicNavigation from './TopicSections/TopicNavigation';
import Navigation from '../ui/Navigation';
import Footer from '../ui/Footer';
import { GeneratedTopic, Lesson } from '@/types/lesson';
import * as CountryFlags from 'country-flag-icons/react/3x2';

interface SharedLessonPageProps {
  lesson: Lesson;
}

interface TopicStatus {
  completed: boolean;
  understood: boolean | null;
}

// Language to country code mapping
const languageFlags: Record<string, { countryCode: keyof typeof CountryFlags }> = {
  English: { countryCode: 'GB' },
  Spanish: { countryCode: 'ES' },
  French: { countryCode: 'FR' },
  German: { countryCode: 'DE' },
  Italian: { countryCode: 'IT' },
  Portuguese: { countryCode: 'BR' },
  Japanese: { countryCode: 'JP' },
  Chinese: { countryCode: 'CN' },
  Korean: { countryCode: 'KR' },
  Russian: { countryCode: 'RU' },
  // Add more languages as needed
};

const TopicModule = ({
  topic,
  status,
  onStatusChange,
}: {
  topic: GeneratedTopic;
  status: TopicStatus;
  onStatusChange: (status: Partial<TopicStatus>) => void;
}) => {
  const [activeSection, setActiveSection] = useState('introduction');

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">{topic.title}</h3>

          <TopicNavigation
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            topic={topic}
          />

          {activeSection === 'introduction' && <IntroductionSection topic={topic} />}

          {activeSection === 'in-depth' && <InDepthSection content={topic.inDepth} />}

          {activeSection === 'examples' && <ExamplesSection examples={topic.examples} />}

          {activeSection === 'exercises' && <ExercisesSection exercises={topic.exercises} />}
        </div>
      </div>
    </div>
  );
};

const SharedLessonPage: React.FC<SharedLessonPageProps> = ({ lesson }) => {
  // Initialize topic statuses
  const [topicStatuses, setTopicStatuses] = useState<Record<string, TopicStatus>>({});

  useEffect(() => {
    if (lesson) {
      const generatedTopics = lesson.generatedTopics ?? [];
      const statuses = generatedTopics.reduce(
        (acc, topic) => ({
          ...acc,
          [topic.id]: { completed: false, understood: null },
        }),
        {}
      );
      setTopicStatuses(statuses);
    }
  }, [lesson]);

  // Handle status change locally (no API calls)
  const updateTopicStatus = (topicId: string, status: Partial<TopicStatus>) => {
    setTopicStatuses((prev) => ({
      ...prev,
      [topicId]: { ...prev[topicId], ...status },
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <Navigation />

      <div className="flex-grow">
        {/* Background */}
        <div className="p-8 bg-gradient-to-br from-[#4d7fff] to-[#2948ff] min-h-screen">
          {/* Header */}
          <div className="bg-white mt-12 rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              {lesson.title}
              {/* Flag Icon */}
              {lesson.subject && languageFlags[lesson.subject] && (
                <span className="ml-3">
                  {(() => {
                    const FlagComponent = CountryFlags[languageFlags[lesson.subject].countryCode];
                    return (
                      <FlagComponent
                        className="w-8 h-8"
                        title={lesson.subject}
                      />
                    );
                  })()}
                </span>
              )}
            </h1>
            {lesson.brief && <p className="text-gray-700 mt-2">{lesson.brief}</p>}
            <p className="text-gray-700 mt-2 flex items-center">
              {/* Include subject and level */}
              {lesson.subject} - {lesson.level}
            </p>
          </div>

          {/* Topics */}
          <div className="space-y-6">
            {lesson.generatedTopics?.map((topic) => (
              <TopicModule
                key={topic.id}
                topic={topic}
                status={topicStatuses[topic.id] || { completed: false, understood: null }}
                onStatusChange={(status) => updateTopicStatus(topic.id, status)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SharedLessonPage;