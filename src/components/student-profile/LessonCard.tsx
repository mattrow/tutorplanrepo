import React from 'react';
import { Calendar, ChevronRight, CheckCircle, Clock, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Using Next.js router

interface LessonCardProps {
  lesson: {
    id: number;
    number: number;
    title: string;
    date: string;
    status: string;
    topics: string[];
  };
  isClickable: boolean;
}

const LessonCard = ({ lesson, isClickable }: LessonCardProps) => {
  const router = useRouter();

  const getStatusIcon = () => {
    switch (lesson.status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'upcoming':
        return <Clock className="w-5 h-5 text-[#396afc]" />;
      default:
        return <Lock className="w-5 h-5 text-gray-400" />;
    }
  };

  const handleClick = () => {
    if (isClickable) {
      router.push(`/dashboard/lesson/${lesson.id}`);
    }
  };

  const cardClasses = `
    bg-white rounded-xl shadow-sm border border-gray-200 p-6
    ${isClickable ? 'cursor-pointer hover:border-[#396afc] hover:shadow-md transition-all duration-200' : 'opacity-75'}
  `;

  return (
    <div className={cardClasses} onClick={handleClick}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date(lesson.date).toLocaleDateString('en-US', { 
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Lesson {lesson.number} - {lesson.title}
          </h3>
        </div>
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          {isClickable && <ChevronRight className="w-5 h-5 text-gray-400" />}
        </div>
      </div>

      <div className="space-y-2">
        {lesson.topics.map((topic, index) => (
          <div key={index} className="flex items-center gap-2 text-gray-600">
            <div className="w-1.5 h-1.5 rounded-full bg-[#396afc]" />
            <span>{topic}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonCard;
