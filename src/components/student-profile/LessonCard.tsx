import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lesson } from '@/types/lesson';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import TopicItem from './TopicItem';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component

interface LessonCardProps {
  lesson: Lesson;
  isClickable: boolean;
  onAddTopic: (lessonId: string, newTopic: any) => void;
  onDeleteTopic: (lessonId: string, topicId: string) => void; // Add this prop
}

const LessonCard = ({ lesson, isClickable, onAddTopic, onDeleteTopic }: LessonCardProps) => {
  const router = useRouter();
  const lessonId = lesson.id;
  const [showForm, setShowForm] = useState(false);
  const [newTopicName, setNewTopicName] = useState('');
  const [newTopicDescription, setNewTopicDescription] = useState('');

  const handleClick = () => {
    if (isClickable) {
      // router.push(`/dashboard/lessons/${lesson.id}`);
    }
  };

  // Use the useDroppable hook
  const { setNodeRef } = useDroppable({
    id: lessonId,
    data: {
      type: 'lesson',
    },
  });

  const handleAddTopicClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTopic = {
      id: `user-topic-${Date.now()}`, // Generate a unique ID with a prefix
      topicName: newTopicName,
      topicDescription: newTopicDescription,
      order: lesson.topics.length + 1,
      status: 'not started',
      isUserAdded: true, // Set this property
    };
    onAddTopic(lessonId, newTopic);
    // Reset form state
    setNewTopicName('');
    setNewTopicDescription('');
    setShowForm(false);
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 ${
        isClickable ? 'cursor-pointer' : ''
      }`}
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
              <TopicItem
                key={topic.id}
                topic={topic}
                lessonId={lessonId}
                onDeleteTopic={onDeleteTopic} // Pass the prop
              />
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

      {/* Add Topic Button */}
      <div className="mt-4">
        {!showForm ? (
          <Button onClick={handleAddTopicClick}>Add Topic</Button>
        ) : (
          <form onSubmit={handleFormSubmit} className="mt-2 space-y-2">
            <input
              type="text"
              placeholder="Topic Title"
              value={newTopicName}
              onChange={(e) => setNewTopicName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <textarea
              placeholder="Topic Description"
              value={newTopicDescription}
              onChange={(e) => setNewTopicDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <div className="flex gap-2">
              <Button type="submit">Add</Button>
              <Button type="button" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LessonCard;
