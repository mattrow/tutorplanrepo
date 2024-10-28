// src/components/student-profile/TopicItem.tsx

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { UniqueIdentifier } from '@dnd-kit/core';

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
    opacity: isDragging ? 0.5 : 1,
    cursor: 'move',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`flex items-center gap-2 p-2 rounded-lg border border-gray-200 bg-white shadow-sm ${isDragging ? 'z-50' : ''}`}
    >
      <div className="w-1.5 h-1.5 rounded-full bg-[#396afc]" />
      <div>
        <span>{topic.topicName}</span>
        <p className="text-sm text-gray-500">{topic.topicDescription}</p>
      </div>
    </div>
  );
};

export default TopicItem;
