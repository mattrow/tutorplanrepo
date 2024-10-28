import React from 'react';
import { useRouter } from 'next/navigation';
import { Lesson } from '@/types/lesson';
import { useDroppable, useDraggable } from '@dnd-kit/core';

interface LessonCardProps {
  lesson: Lesson;
  isClickable: boolean;
}

const LessonCard = ({ lesson, isClickable }: LessonCardProps) => {
  const router = useRouter();
  const lessonId = lesson.id;

  const { setNodeRef } = useDroppable({
    id: lessonId,
    data: {
      type: 'lesson',
      lessonId: lessonId,
    },
  });

  const handleClick = () => {
    if (isClickable) {
      router.push(`/dashboard/lessons/${lesson.id}`);
    }
  };

  return (
    <div
      ref={setNodeRef}
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

interface TopicItemProps {
  topic: any;
  lessonId: string;
}

const TopicItem = ({ topic, lessonId }: TopicItemProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: topic.id,
    data: {
      type: 'topic',
      lessonId,
      topicId: topic.id,
      topicName: topic.topicName,
      topicDescription: topic.topicDescription,
      status: topic.status,
      order: topic.order,
    },
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center gap-2 p-2 rounded-lg border border-gray-200 bg-white shadow-sm"
    >
      <div className="w-1.5 h-1.5 rounded-full bg-[#396afc]" />
      <div>
        <span>{topic.topicName}</span>
        <p className="text-sm text-gray-500">{topic.topicDescription}</p>
      </div>
    </div>
  );
};