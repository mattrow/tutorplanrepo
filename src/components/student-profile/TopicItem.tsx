// src/components/student-profile/TopicItem.tsx

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { UniqueIdentifier } from '@dnd-kit/core';
import { Bars3Icon } from '@heroicons/react/24/outline';


interface TopicItemProps {
  topic: any;
  lessonId: UniqueIdentifier | null;
}

const TopicItem = ({ topic, lessonId }: TopicItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: topic.id,
    data: {
      type: 'topic',
      lessonId,
      topicId: topic.id,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    cursor: 'grab',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 p-2 rounded-lg border border-gray-200 bg-white shadow-sm ${
        isDragging ? 'z-50' : ''
      }`}
    >
      {/* Drag handle icon */}
      <div
        {...listeners}
        {...attributes}
        className="cursor-grab active:cursor-grabbing"
      >
        <Bars3Icon className="w-5 h-5 text-gray-400" />
      </div>
      <div>
        <span>{topic.topicName}</span>
        <p className="text-sm text-gray-500">{topic.topicDescription}</p>
      </div>
    </div>
  );
};

export default TopicItem;