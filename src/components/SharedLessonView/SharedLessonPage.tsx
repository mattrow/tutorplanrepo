'use client';

import React, { useState, useEffect } from 'react';
import IntroductionSection from './TopicSections/IntroductionSection';
import InDepthSection from './TopicSections/InDepthSection';
import ExamplesSection from './TopicSections/ExamplesSection';
import ExercisesSection from './TopicSections/ExercisesSection';
import TopicNavigation from './TopicSections/TopicNavigation';
import PublicNavigation from '../ui/PublicNavigation';
import Footer from '../ui/Footer';
import { GeneratedTopic, Lesson } from '@/types/lesson';
import * as CountryFlags from 'country-flag-icons/react/3x2';
import { BookOpen, GraduationCap, Clock } from 'lucide-react';

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
};

const TopicModule = ({ topic }: { topic: GeneratedTopic }) => {
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

const SharedLessonPage = ({ lesson }: { lesson: Lesson }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <PublicNavigation />

      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-xl">
                  <BookOpen className="w-8 h-8 text-[#396afc]" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>
                  <div className="flex items-center gap-3 mt-2">
                    {lesson.subject && languageFlags[lesson.subject] && (
                      <span className="flex items-center gap-2">
                        {(() => {
                          const FlagComponent = CountryFlags[languageFlags[lesson.subject].countryCode];
                          return (
                            <FlagComponent
                              className="w-5 h-5 rounded shadow-sm"
                              title={lesson.subject}
                            />
                          );
                        })()}
                        <span className="text-gray-600">{lesson.subject}</span>
                      </span>
                    )}
                    <span className="text-gray-300">•</span>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-[#396afc]" />
                      <span className="text-gray-600">Level {lesson.level}</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-[#396afc]" />
                      <span className="text-gray-600">60 min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {lesson.brief && (
              <p className="text-gray-600 leading-relaxed max-w-3xl">
                {lesson.brief}
              </p>
            )}
          </div>

          {/* Topics */}
          <div className="space-y-8">
            {lesson.generatedTopics?.map((topic) => (
              <TopicModule key={topic.id} topic={topic} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SharedLessonPage;