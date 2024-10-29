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
} from 'lucide-react';

interface TopicStatus {
  completed: boolean;
  understood: boolean | null;
}

interface GeneratedTopic {
  id: string;
  title: string;
  content: string;
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
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
      <div className="flex items-start gap-4">
        <button
          onClick={() => onStatusChange({ completed: !status.completed })}
          className={`mt-1 transition-colors ${
            status.completed ? 'text-green-500' : 'text-gray-300 hover:text-gray-400'
          }`}
        >
          <CheckCircle className="w-6 h-6" />
        </button>

        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">{topic.title}</h3>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: topic.content }}
          ></div>

          {status.completed && (
            <div className="mt-6 flex items-center gap-4 border-t pt-4">
              <span className="text-sm text-gray-600">Did the student understand this topic?</span>
              <div className="flex gap-2">
                <button
                  onClick={() => onStatusChange({ understood: true })}
                  className={`p-2 rounded-full transition-colors ${
                    status.understood === true
                      ? 'bg-green-100 text-green-600'
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

  const allTopicsCompleted = Object.values(topicStatuses).every((status) => status.completed);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-indigo-100 rounded-full px-4 py-2 text-indigo-600 mb-4">
            <BookOpen className="w-4 h-4 mr-2" />
            <span>Current Lesson</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>
          <p className="mt-2 text-gray-600">
            Track progress and understanding as you cover each topic.
          </p>
        </div>

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

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className={`flex-1 sm:flex-initial px-8 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${
              allTopicsCompleted
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            disabled={!allTopicsCompleted}
          >
            <CheckSquare className="w-5 h-5" />
            Confirm Lesson Completion
          </button>

          <button
            className={`flex-1 sm:flex-initial px-8 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${
              allTopicsCompleted
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            disabled={!allTopicsCompleted}
          >
            <HomeIcon className="w-5 h-5" />
            Generate Homework
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;