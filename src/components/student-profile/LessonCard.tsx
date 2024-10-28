import React from 'react';
import { useRouter } from 'next/navigation';
import { Lesson } from '@/types/lesson';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TopicItem from './TopicItem';

interface LessonCardProps {
  lesson: Lesson;
  isClickable: boolean;
}

const LessonCard = ({ lesson, isClickable }: LessonCardProps) => {
  const router = useRouter();
  const lessonId = lesson.id;

  const handleClick = () => {
    if (isClickable) {
      router.push(`/dashboard/lessons/${lesson.id}`);
    }
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 ${isClickable ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
    >
      {/* Render lesson details */}
      <h2 className="text-xl font-semibold">{lesson.title}</h2>
      <div className="mt-2 space-y-2">
        {lesson.topics.map((topic) => (
          <TopicItem key={topic.id} topic={topic} lessonId={lessonId} />
        ))}
      </div>
    </div>
  );
};

export default LessonCard;
