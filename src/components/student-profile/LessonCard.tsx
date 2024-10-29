import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lesson } from '@/types/lesson';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import TopicItem from './TopicItem';
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/hooks/useAuth';

interface LessonCardProps {
  lesson: Lesson;
  isClickable: boolean;
  onAddTopic: (lessonId: string, newTopic: any) => void;
  onDeleteTopic: (lessonId: string, topicId: string) => void;
  studentId: string;
  onLessonGenerated: (lessonId: string) => void;
}

const LessonCard = ({
  lesson,
  isClickable,
  onAddTopic,
  onDeleteTopic,
  studentId,
  onLessonGenerated,
}: LessonCardProps) => {
  const router = useRouter();
  const lessonId = lesson.id;

  // Get the user object from your authentication hook
  const { user } = useAuth(); // Add this line

  const [showForm, setShowForm] = useState(false);
  const [newTopicName, setNewTopicName] = useState('');
  const [newTopicDescription, setNewTopicDescription] = useState('');

  const [isGenerating, setIsGenerating] = useState(false);

  const handleClick = () => {
    if (isClickable) {
      // Additional click logic if needed
    }
  };

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
      id: `user-topic-${Date.now()}`,
      topicName: newTopicName,
      topicDescription: newTopicDescription,
      order: lesson.topics.length + 1,
      status: 'not started',
      isUserAdded: true,
    };
    onAddTopic(lessonId, newTopic);
    setNewTopicName('');
    setNewTopicDescription('');
    setShowForm(false);
  };

  // Function to handle lesson generation
  const handleGenerateLesson = async () => {
    setIsGenerating(true);
    try {
      const token = await user?.getIdToken();
      const response = await fetch(
        `/api/students/${studentId}/lessons/${lessonId}/generate`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ topics: lesson.topics }),
        }
      );

      if (response.ok) {
        onLessonGenerated(lessonId);
      } else {
        console.error('Failed to generate lesson');
        // Optionally handle error
      }
    } catch (error) {
      console.error('Error generating lesson:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 ${
        isClickable ? 'cursor-pointer' : ''
      } flex justify-between items-start`}
      onClick={handleClick}
    >
      <div className="flex-1">
        <h2 className="text-xl font-semibold">{lesson.title}</h2>

        <SortableContext
          id={lessonId}
          items={lesson.topics.map((topic) => topic.id)}
          strategy={verticalListSortingStrategy}
        >
          <div ref={setNodeRef} className="mt-2 space-y-2 min-h-[50px]">
            {lesson.topics.map((topic) => (
              <TopicItem
                key={topic.id}
                topic={topic}
                lessonId={lessonId}
                onDeleteTopic={onDeleteTopic}
              />
            ))}

            {showForm ? (
              <div className="p-2 border border-gray-200 rounded-lg">
                <form onSubmit={handleFormSubmit} className="space-y-2">
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
              </div>
            ) : (
              <div
                className="flex items-center justify-center p-2 rounded-lg border border-dashed border-blue-300 bg-blue-50 text-blue-500 cursor-pointer hover:bg-blue-100"
                onClick={handleAddTopicClick}
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Add New Topic
              </div>
            )}
          </div>
        </SortableContext>
      </div>

      {/* Generate/View Lesson Button */}
      <div className="ml-4">
        {lesson.generated ? (
          <Button
            onClick={() => router.push(`/dashboard/student/${studentId}/lesson/${lessonId}`)}
          >
            View Lesson
          </Button>
        ) : (
          <Button onClick={handleGenerateLesson} disabled={isGenerating}>
            {isGenerating ? 'Generating...' : 'Generate Lesson'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default LessonCard;
