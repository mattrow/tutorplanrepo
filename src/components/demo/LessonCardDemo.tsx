// src/components/demo/LessonCardDemo.tsx

import React, { useState, useEffect, useRef } from 'react';
import { Lesson, Topic } from '@/types/lesson';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import TopicItemDemo from './TopicItemDemo';
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Sparkles, BookOpen, RefreshCw, CheckCircle2 } from 'lucide-react';
import { CSSTransition } from 'react-transition-group';

interface LessonCardDemoProps {
  lesson: Lesson;
}

const LessonCardDemo: React.FC<LessonCardDemoProps> = ({ lesson }) => {
  const [showForm, setShowForm] = useState(false);
  const [newTopicName, setNewTopicName] = useState('');
  const [newTopicDescription, setNewTopicDescription] = useState('');
  const [newTopicType, setNewTopicType] = useState<'communication' | 'vocabulary' | 'grammar' | ''>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lessonGenerated, setLessonGenerated] = useState(false);
  const [topics, setTopics] = useState(lesson.topics);
  const successTimeoutRef = useRef<NodeJS.Timeout>();

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
    };
  }, []);

  const handleGenerateLesson = (event: React.MouseEvent) => {
    event.stopPropagation();

    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setLessonGenerated(true);
      setIsGenerating(false);
      // Show success state
      setShowSuccess(true);
      // Reset after 2 seconds
      successTimeoutRef.current = setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    }, 1000);
  };

  const { setNodeRef } = useDroppable({
    id: lesson.id,
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
      order: topics.length + 1,
      status: 'not started',
      type: newTopicType,
      isUserAdded: true,
    };

    setTopics([...topics, newTopic as Topic]);
    setNewTopicName('');
    setNewTopicDescription('');
    setNewTopicType('');
    setShowForm(false);
  };

  const handleDeleteTopic = (lessonId: string, topicId: string) => {
    setTopics(topics.filter((topic) => topic.id !== topicId));
  };

  const renderActionButton = () => {
    if (isGenerating) {
      return (
        <Button
          disabled
          className="bg-gray-100 text-gray-500 w-52 h-12 relative overflow-hidden group"
        >
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer"
              style={{
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite linear',
              }}
            />
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </div>
          <div className="relative flex items-center justify-center gap-3">
            <svg
              className="animate-spin h-5 w-5 text-gray-500"
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
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="animate-pulse">Generating...</span>
          </div>
        </Button>
      );
    }

    if (showSuccess) {
      return (
        <Button className="bg-green-500 hover:bg-green-600 text-white w-52 h-12 transform transition-all duration-300">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5 animate-bounce" />
            <span>Generated!</span>
          </div>
        </Button>
      );
    }

    if (lessonGenerated) {
      return (
        <div className="flex flex-col gap-2 w-52">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              // Simulate navigation to lesson view
            }}
            className="bg-[#396afc] hover:bg-[#2948ff] text-white w-full h-12 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <div className="flex items-center justify-center gap-2">
              <BookOpen className="w-5 h-5" />
              <span>View Lesson</span>
            </div>
          </Button>
          <Button
            onClick={handleGenerateLesson}
            className="bg-white border-2 border-[#396afc] text-[#396afc] hover:bg-[#396afc] hover:text-white w-full h-12 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <div className="flex items-center justify-center gap-2">
              <RefreshCw className="w-5 h-5" />
              <span>Regenerate</span>
            </div>
          </Button>
        </div>
      );
    }

    return (
      <Button
        onClick={handleGenerateLesson}
        className="bg-[#396afc] hover:bg-[#2948ff] text-white w-52 h-12 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg group"
      >
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
          <span>Generate Lesson</span>
        </div>
      </Button>
    );
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 flex">
      {/* Left Side: Topics */}
      <div className="flex-1">
        <h2 className="text-xl font-semibold">{lesson.title}</h2>

        <SortableContext
          id={lesson.id}
          items={topics.map((topic) => topic.id)}
          strategy={verticalListSortingStrategy}
        >
          <div ref={setNodeRef} className="mt-2 space-y-2 min-h-[50px]">
            {topics.map((topic) => (
              <TopicItemDemo
                key={topic.id}
                topic={topic}
                lessonId={lesson.id}
                onDeleteTopic={handleDeleteTopic}
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
                    onChange={(e) => setNewTopicDescription(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                  <select
                    value={newTopicType}
                    onChange={(e) =>
                      setNewTopicType(
                        e.target.value as 'communication' | 'vocabulary' | 'grammar'
                      )
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  >
                    <option value="">Select Topic Type</option>
                    <option value="communication">Communication</option>
                    <option value="vocabulary">Vocabulary</option>
                    <option value="grammar">Grammar</option>
                  </select>
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
        {renderActionButton()}
      </div>
    </div>
  );
};

export default LessonCardDemo;