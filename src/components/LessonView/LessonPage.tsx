import React, { useState } from 'react';
import {
  CheckCircle,
  ThumbsUp,
  ThumbsDown,
  BookOpen,
  Lightbulb,
  Dumbbell,
  HomeIcon,
  CheckSquare,
  ArrowLeft
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

interface TopicStatus {
  completed: boolean;
  understood: boolean | null;
}

interface GeneratedTopic {
  id: string;
  title: string;
  description: string;
  teachingTips: string;
  exercises: string[];
}

interface LessonPageProps {
  lesson: {
    generatedTopics: GeneratedTopic[];
    title: string;
    // Add other lesson properties as needed
  };
}

const TopicModule = ({
  topic,
  status,
  onStatusChange,
}: {
  topic: GeneratedTopic;
  status: TopicStatus;
  onStatusChange: (status: Partial<TopicStatus>) => void;
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-start gap-4">
        <button
          onClick={() => onStatusChange({ completed: !status.completed })}
          className={`mt-1 transition-colors ${
            status.completed ? 'text-[#396afc]' : 'text-gray-300 hover:text-gray-400'
          }`}
        >
          <CheckCircle className="w-6 h-6" />
        </button>

        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">{topic.title}</h3>

          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-[#396afc] mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Description</h4>
                <p className="text-gray-600">{topic.description}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-[#396afc] mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Teaching Tips</h4>
                <p className="text-gray-600">{topic.teachingTips}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Dumbbell className="w-5 h-5 text-[#396afc] mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Practice Exercises</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  {topic.exercises.map((exercise, index) => (
                    <li key={index}>{exercise}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {status.completed && (
            <div className="mt-6 flex items-center gap-4 border-t pt-4">
              <span className="text-sm text-gray-600">
                Did the student understand this topic?
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => onStatusChange({ understood: true })}
                  className={`p-2 rounded-full transition-colors ${
                    status.understood === true
                      ? 'bg-blue-50 text-[#396afc]'
                      : 'hover:bg-gray-100 text-gray-400'
                  }`}
                >
                  <ThumbsUp className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onStatusChange({ understood: false })}
                  className={`p-2 rounded-full transition-colors ${
                    status.understood === false
                      ? 'bg-red-100 text-red-600'
                      : 'hover:bg-gray-100 text-gray-400'
                  }`}
                >
                  <ThumbsDown className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const LessonPage = ({ lesson }: LessonPageProps) => {
  const router = useRouter();
  const [topicStatuses, setTopicStatuses] = useState<Record<string, TopicStatus>>(() =>
    lesson.generatedTopics.reduce(
      (acc, topic) => ({
        ...acc,
        [topic.id]: { completed: false, understood: null },
      }),
      {}
    )
  );

  const updateTopicStatus = (topicId: string, status: Partial<TopicStatus>) => {
    setTopicStatuses((prev) => ({
      ...prev,
      [topicId]: { ...prev[topicId], ...status },
    }));
  };

  const allTopicsCompleted = Object.values(topicStatuses).every(
    (status) => status.completed
  );

  return (
    <div className="p-8 bg-[#f8f9fc] min-h-screen">
      {/* Back Button */}
      <Button
        onClick={() => router.back()}
        variant="ghost"
        className="text-gray-600 hover:bg-gray-100 mb-6 flex items-center"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Student
      </Button>

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center gap-4 mb-2">
          <BookOpen className="w-6 h-6 text-[#396afc]" />
          <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
        </div>
        <p className="text-gray-600 ml-10">
          Track progress and understanding as you cover each topic.
        </p>
      </div>

      {/* Topics */}
      <div className="space-y-6">
        {lesson.generatedTopics.map((topic) => (
          <TopicModule
            key={topic.id}
            topic={topic}
            status={topicStatuses[topic.id]}
            onStatusChange={(status) => updateTopicStatus(topic.id, status)}
          />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-8 right-8 flex gap-4">
        <Button
          disabled={!allTopicsCompleted}
          onClick={() => {/* handle completion */}}
          className="bg-[#396afc] text-white hover:bg-[#2948ff] font-satoshi-bold rounded-full flex items-center gap-2"
        >
          <CheckSquare className="w-5 h-5" />
          Complete Lesson
        </Button>
        <Button
          disabled={!allTopicsCompleted}
          onClick={() => {/* handle homework generation */}}
          className="bg-white text-[#396afc] hover:bg-gray-50 font-satoshi-bold rounded-full flex items-center gap-2 border-2 border-[#396afc]"
        >
          <HomeIcon className="w-5 h-5" />
          Generate Homework
        </Button>
      </div>
    </div>
  );
};

export default LessonPage;