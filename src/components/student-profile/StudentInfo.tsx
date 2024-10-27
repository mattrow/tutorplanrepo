import React from 'react';
import { MapPin, Book } from 'lucide-react';

interface StudentInfoProps {
  student: {
    firstName: string;
    lastName: string;
    country: string;
    language: string;
    level: string;
  };
}

const languageFlags: Record<string, string> = {
  English: '🇬🇧',
  Spanish: '🇪🇸',
  French: '🇫🇷',
  German: '🇩🇪',
  Italian: '🇮🇹',
  Portuguese: '🇵🇹',
  Japanese: '🇯🇵',
  Chinese: '🇨🇳',
  Korean: '🇰🇷',
  Russian: '🇷🇺',
};

const StudentInfo = ({ student }: StudentInfoProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-6">
        {/* Student Avatar */}
        <div className="w-16 h-16 rounded-full bg-[#396afc] flex items-center justify-center text-white text-xl font-semibold">
          {student.firstName[0]}{student.lastName[0]}
        </div>

        {/* Student Details */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {student.firstName} {student.lastName}
          </h1>
          <div className="flex items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#396afc]" />
              <span>{student.country}</span>
            </div>
            <div className="flex items-center gap-2">
              <Book className="w-4 h-4 text-[#396afc]" />
              <span>Learning {student.language}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl" role="img" aria-label={`${student.language} flag`}>
                {languageFlags[student.language]}
              </span>
              <div className="px-3 py-1 rounded-lg bg-blue-50 text-[#396afc] font-medium">
                {student.level}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentInfo;
