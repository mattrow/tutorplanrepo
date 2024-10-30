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
    <div className="flex flex-wrap gap-2 mb-6">
      {sections.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onSectionChange(id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            activeSection === id
              ? 'bg-[#396afc] text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </button>
      ))}
    </div>
  );
};

export default TopicNavigation;