import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Lesson } from '@/types/lesson';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import TopicItem from './TopicItem';
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Sparkles, BookOpen, RefreshCw } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { CSSTransition, SwitchTransition } from 'react-transition-group'

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

  const { user } = useAuth();

  const [showForm, setShowForm] = useState(false);
  const [newTopicName, setNewTopicName] = useState('');
  const [newTopicDescription, setNewTopicDescription] = useState('');
  const [newTopicType, setNewTopicType] = useState<
    'communication' | 'vocabulary' | 'grammar' | ''
  >('');

  const [isGenerating, setIsGenerating] = useState(false);

  // New state variables for message switching
  const messages = ["It's a big file...",'Generating...',];
  const [messageIndex, setMessageIndex] = useState(0);
  const [showAlternateMessage, setShowAlternateMessage] = useState(false);

  const nodeRef = useRef(null);

  useEffect(() => {
    let initialTimer: NodeJS.Timeout;
    let messageTimer: NodeJS.Timeout;
    if (isGenerating) {
      initialTimer = setTimeout(() => {
        setShowAlternateMessage(true);
        // Start toggling messages every few seconds
        messageTimer = setInterval(() => {
          setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 7000); // Switch messages every 3 seconds
      }, 7000); // Wait 5 seconds before starting to alternate messages
    }

    return () => {
      // Cleanup timers when isGenerating changes or component unmounts
      clearTimeout(initialTimer);
      clearInterval(messageTimer);
      setShowAlternateMessage(false);
      setMessageIndex(0);
    };
  }, [isGenerating]);

  const handleClick = () => {
    if (isClickable) {
      router.push(`/dashboard/student/${studentId}/lesson/${lessonId}`);
    }
  };

  const handleGenerateLesson = async (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent the card click event
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
        // Update the lesson generated status
        onLessonGenerated(lessonId);
      } else {
        console.error('Failed to generate lesson');
      }
    } catch (error) {
      console.error('Error generating lesson:', error);
    } finally {
      setIsGenerating(false);
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
      type: newTopicType, // Include the selected topic type
      isUserAdded: true,
    };

    onAddTopic(lessonId, newTopic);

    // Reset form fields
    setNewTopicName('');
    setNewTopicDescription('');
    setNewTopicType('');
    setShowForm(false);
  };

  return (
    <div
      className={`bg-white rounded-lg p-4 shadow-sm border border-gray-200 flex`}
    >
      {/* Left Side: Topics */}
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
              <div
                className="p-2 border border-gray-200 rounded-lg"
                onClick={(e) => e.stopPropagation()}
              >
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
                    onChange={(e) =>
                      setNewTopicDescription(e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />

                  {/* New Topic Type Select Dropdown */}
                  <select
                    value={newTopicType}
                    onChange={(e) =>
                      setNewTopicType(
                        e.target.value as
                          | 'communication'
                          | 'vocabulary'
                          | 'grammar'
                      )
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  >
                    <option value="" disabled>
                      Select Topic Type
                    </option>
                    <option value="communication">Communication</option>
                    <option value="vocabulary">Vocabulary</option>
                    <option value="grammar">Grammar</option>
                  </select>

                  <div className="flex gap-2">
                    <Button type="submit">Add</Button>
                    <Button
                      type="button"
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              <div
                className="flex items-center justify-center p-2 rounded-lg border border-dashed border-blue-300 bg-blue-50 text-blue-500 cursor-pointer hover:bg-blue-100"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowForm(true);
                }}
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Add New Topic
              </div>
            )}
          </div>
        </SortableContext>
      </div>

      {/* Right Side: Action Buttons */}
      <div className="flex flex-col items-center justify-center ml-4">
        {isGenerating ? (
          <Button
            disabled
            className="bg-gray-300 text-gray-500 flex items-center w-52"
            onClick={(e) => e.stopPropagation()}
          >
            <SwitchTransition mode="out-in">
              <CSSTransition
                nodeRef={nodeRef}
                key={showAlternateMessage ? messageIndex : -1}
                timeout={500}
                classNames="fade"
              >
                <span ref={nodeRef}>
                  {showAlternateMessage
                    ? messages[messageIndex]
                    : 'Generating...'}
                </span>
              </CSSTransition>
            </SwitchTransition>
            <svg
              className="w-4 h-4 ml-2 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          </Button>
        ) : lesson.generated ? (
          <div className="space-y-2">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                router.push(
                  `/dashboard/student/${studentId}/lesson/${lessonId}`
                );
              }}
              className="bg-green-500 text-white hover:bg-green-600 flex items-center w-52"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              View Lesson
            </Button>
            <Button
              onClick={handleGenerateLesson}
              className="bg-red-500 text-white hover:bg-red-600 flex items-center w-52"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Regenerate Lesson
            </Button>
          </div>
        ) : (
          <Button
            onClick={handleGenerateLesson}
            className="bg-blue-500 text-white hover:bg-blue-600 flex items-center w-52"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Generate Lesson
          </Button>
        )}
      </div>
    </div>
  );
};

export default LessonCard;