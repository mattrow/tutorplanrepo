import React from 'react';
import { useRouter } from 'next/navigation';
import { Lesson } from '@/types/lesson';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
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

  // Use the useDroppable hook
  const { setNodeRef } = useDroppable({
    id: lessonId,
    data: {
      type: 'lesson',
    },
  });

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 ${isClickable ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
    >
      {/* Render lesson details */}
      <h2 className="text-xl font-semibold">{lesson.title}</h2>
      
      <SortableContext
        id={lessonId}
        items={lesson.topics.map((topic) => topic.id)}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className="mt-2 space-y-2 min-h-[50px]">
          {lesson.topics.length > 0 ? (
            lesson.topics.map((topic) => (
              <TopicItem key={topic.id} topic={topic} lessonId={lessonId} />
            ))
          ) : (
            // Placeholder for empty lessons
            <div
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 text-center"
            >
              Drag topics here
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
};

export default LessonCard;
