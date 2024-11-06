import React from 'react';
import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Bars3Icon, TrashIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Topic } from '@/types/lesson';

interface TopicItemDemoProps {
  topic: Topic;
  lessonId: UniqueIdentifier | null;
  onDeleteTopic?: (lessonId: string, topicId: string) => void;
}

const TopicItemDemo = ({ topic, lessonId, onDeleteTopic }: TopicItemDemoProps) => {
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
    opacity: isDragging ? 0.7 : 1,
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering other events
    if (onDeleteTopic && lessonId) {
      onDeleteTopic(lessonId.toString(), topic.id);
    }
  };

  const typeColors: Record<Topic['type'], string> = {
    communication: 'bg-purple-100 text-purple-800',
    vocabulary: 'bg-green-100 text-green-800',
    grammar: 'bg-red-100 text-red-800',
  };

  // Function to get background color based on status
  const getBackgroundColor = (status: Topic['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50';
      case 'in progress':
        return 'bg-yellow-50';
      default:
        return 'bg-white';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`flex items-center justify-between gap-2 p-4 rounded-lg border border-gray-200 shadow-sm ${
        getBackgroundColor(topic.status)
      } ${isDragging ? 'z-50' : ''} cursor-grab active:cursor-grabbing`}
    >
      <div className="flex items-start gap-2">
        {/* Drag handle icon */}
        <div>
          <Bars3Icon className="w-5 h-5 text-gray-400" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-800">{topic.topicName}</span>
            {/* Conditionally render the green check icon */}
            {topic.status === 'completed' && (
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
            )}
          </div>
          <p className="text-sm text-gray-600">{topic.topicDescription}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Topic Type Badge */}
        <span
          className={`flex-shrink-0 px-3 py-1 text-sm font-semibold rounded-full ${
            typeColors[topic.type]
          }`}
        >
          {topic.type.charAt(0).toUpperCase() + topic.type.slice(1)}
        </span>

        {/* Conditionally render Delete button */}
        {topic.isUserAdded && (
          <button
            onClick={handleDelete}
            onPointerDown={(e) => e.stopPropagation()} // Prevent drag start
            className="border-2 border-red-400 hover:bg-red-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400 group"
            aria-label="Delete Topic"
          >
            <TrashIcon className="w-5 h-5 text-red-400 group-hover:text-white" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TopicItemDemo;
