import React from 'react';
import { Globe, Book } from 'lucide-react';
import * as CountryFlags from 'country-flag-icons/react/3x2';

interface StudentInfoProps {
  student: {
    firstName: string;
    lastName: string;
    nativeLanguage: string;
    language: string;
    level: string;
  };
}

const languageFlags: Record<string, { countryCode: keyof typeof CountryFlags }> = {
  English: { countryCode: 'GB' },
  Spanish: { countryCode: 'ES' },
  French: { countryCode: 'FR' },
  German: { countryCode: 'DE' },
  Italian: { countryCode: 'IT' },
  Portuguese: { countryCode: 'PT' },
  Japanese: { countryCode: 'JP' },
  Chinese: { countryCode: 'CN' },
  Korean: { countryCode: 'KR' },
  Russian: { countryCode: 'RU' },
};

const getLevelColor = (level: string) => {
  if (level.startsWith('A')) return 'bg-green-50 text-green-600';
  if (level.startsWith('B')) return 'bg-blue-50 text-[#396afc]';
  if (level.startsWith('C')) return 'bg-red-50 text-red-600';
  return 'bg-gray-50 text-gray-600';
};

const StudentInfo = ({ student }: StudentInfoProps) => {
  return (
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
            <Globe className="w-4 h-4 text-[#396afc]" />
            <span>Native Language: {student.nativeLanguage}</span>
          </div>
          <div className="flex items-center gap-2">
            <Book className="w-4 h-4 text-[#396afc]" />
            <span>Learning {student.language}</span>
          </div>
          <div className="flex items-center gap-2">
            <span role="img" aria-label={`${student.language} flag`}>
              {(() => {
                const FlagComponent = CountryFlags[languageFlags[student.language].countryCode];
                return <FlagComponent className="w-6 h-6" />;
              })()}
            </span>
            <div className={`px-3 py-1 rounded-lg ${getLevelColor(student.level)} font-medium`}>
              {student.level}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentInfo;
