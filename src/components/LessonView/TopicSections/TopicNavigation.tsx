// src/components/LessonView/TopicSections/TopicNavigation.tsx

import React from 'react';
import { BookOpen, FileText, ListChecks, Lightbulb } from 'lucide-react';
import { GeneratedTopic } from '@/types/lesson';

interface TopicNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  topic: GeneratedTopic;
}

const TopicNavigation: React.FC<TopicNavigationProps> = ({
  activeSection,
  onSectionChange,
}) => {
  const sections = [
    { id: 'introduction', label: 'Introduction', icon: BookOpen },
    { id: 'in-depth', label: 'In-Depth', icon: FileText },
    { id: 'examples', label: 'Examples', icon: Lightbulb },
    { id: 'exercises', label: 'Exercises', icon: ListChecks },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {sections.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onSectionChange(id)}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
            activeSection === id
              ? 'bg-[#396afc] text-white shadow-md transform scale-105'
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Icon className={`w-5 h-5 ${activeSection === id ? 'animate-pulse' : ''}`} />
          {label}
        </button>
      ))}
    </div>
  );
};

export default TopicNavigation;