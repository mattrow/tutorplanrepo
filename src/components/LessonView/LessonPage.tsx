import React, { useState } from 'react';
import {
  CheckCircle,
  ThumbsUp,
  ThumbsDown,
  BookOpen,
  ArrowLeft,
  CheckSquare,
  HomeIcon,
  Share2,
  Link as LinkIcon,
  Download,
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import IntroductionSection from './TopicSections/IntroductionSection';
import InDepthSection from './TopicSections/InDepthSection';
import ExamplesSection from './TopicSections/ExamplesSection';
import ExercisesSection from './TopicSections/ExercisesSection';
import TopicNavigation from './TopicSections/TopicNavigation';
import { GeneratedTopic } from '@/types/lesson';
import { Lesson } from '@/types/lesson';

interface TopicStatus {
  completed: boolean;
  understood: boolean | null;
}

interface LessonPageProps {
  lesson: Lesson;
  user: any;
  onShareLesson: () => void;
  sharing: boolean;
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
  const [activeSection, setActiveSection] = useState('introduction');

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

          <TopicNavigation
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            topic={topic}
          />

          {activeSection === 'introduction' && (
            <IntroductionSection topic={topic} />
          )}

          {activeSection === 'in-depth' && (
            <InDepthSection content={topic.inDepth} />
          )}

          {activeSection === 'examples' && (
            <ExamplesSection examples={topic.examples} />
          )}

          {activeSection === 'exercises' && (
            <ExercisesSection exercises={topic.exercises} />
          )}

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

const LessonPage = ({ lesson, user, onShareLesson, sharing }: LessonPageProps) => {
  const router = useRouter();
  const [topicStatuses, setTopicStatuses] = useState<Record<string, TopicStatus>>(() => {
    const generatedTopics = lesson.generatedTopics ?? [];
    return generatedTopics.reduce(
      (acc, topic) => ({
        ...acc,
        [topic.id]: { completed: false, understood: null },
      }),
      {}
    );
  });

  const updateTopicStatus = (topicId: string, status: Partial<TopicStatus>) => {
    setTopicStatuses((prev) => ({
      ...prev,
      [topicId]: { ...prev[topicId], ...status },
    }));
  };

  const allTopicsCompleted = Object.values(topicStatuses).every(
    (status) => status.completed
  );

  // Function to copy lesson URL
  const copyLessonUrl = () => {
    const lessonUrl = window.location.href;
    navigator.clipboard.writeText(lessonUrl);
    alert('Lesson link copied to clipboard!');
  };

  const [generatingHomework, setGeneratingHomework] = useState(false);

  // Add state variable to track homework generation status
  const [homeworkGenerated, setHomeworkGenerated] = useState(false);

  const handleGenerateHomework = async () => {
    if (!user) {
      // Handle unauthenticated case if necessary
      return;
    }

    setGeneratingHomework(true);
    try {
      const token = await user.getIdToken();
      const response = await fetch(
        `/api/students/${lesson.studentId}/lessons/${lesson.id}/homework`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.error('Failed to generate homework');
        // Handle error appropriately
        return;
      }

      // Extract filename from Content-Disposition header
      const disposition = response.headers.get('Content-Disposition');
      let filename = 'homework.pdf'; // Default filename
      if (disposition && disposition.includes('filename=')) {
        const matches = /filename[^;=\n]*=((['"]).*?\[^;\n]*)/.exec(disposition);
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, '');
        }
      }

      // Get the blob from the response
      const blob = await response.blob();

      // Create a link and trigger the download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename; // Use the extracted filename
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      // Set homework as generated
      setHomeworkGenerated(true);
    } catch (error) {
      console.error('Error generating homework:', error);
      // Handle error appropriately
    } finally {
      setGeneratingHomework(false);
    }
  };

  // Function to download homework without regenerating
  const handleDownloadHomework = async () => {
    if (!user) {
      return;
    }

    try {
      const token = await user.getIdToken();
      const response = await fetch(
        `/api/students/${lesson.studentId}/lessons/${lesson.id}/homework`,
        {
          method: 'POST', // Assuming the same endpoint
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.error('Failed to download homework');
        // Handle error appropriately
        return;
      }

      // Extract filename from Content-Disposition header
      const disposition = response.headers.get('Content-Disposition');
      let filename = 'homework.pdf'; // Default filename
      if (disposition && disposition.includes('filename=')) {
        const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(disposition);
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, '');
        }
      }

      // Get the blob from the response
      const blob = await response.blob();

      // Create a link and trigger the download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename; // Use the extracted filename
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading homework:', error);
    }
  };

  return (
    <div className="p-8 bg-[#f8f9fc] min-h-screen">
      {/* Back Button */}
      {user && (
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="text-gray-600 hover:bg-gray-100 mb-6 flex items-center"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Student
        </Button>
      )}

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <BookOpen className="w-6 h-6 text-[#396afc]" />
              <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
            </div>
            <p className="text-gray-600 ml-10">
              Track progress and understanding as you cover each topic.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2">
            {/* Share Button */}
            {user ? (
              lesson.public ? (
                <Button
                  onClick={copyLessonUrl}
                  className="flex-1 bg-green-500 text-white hover:bg-green-600 font-satoshi-bold rounded-full flex items-center justify-center gap-2"
                >
                  <LinkIcon className="w-5 h-5" />
                  Copy Lesson URL
                </Button>
              ) : (
                <Button
                  onClick={onShareLesson}
                  disabled={sharing}
                  className="flex-1 bg-[#396afc] text-white hover:bg-[#2948ff] font-satoshi-bold rounded-full flex items-center justify-center gap-2"
                >
                  <Share2 className="w-5 h-5" />
                  Share Lesson
                </Button>
              )
            ) : lesson.public ? (
              // For unauthenticated users viewing a public lesson
              <Button
                onClick={copyLessonUrl}
                className="flex-1 bg-green-500 text-white hover:bg-green-600 font-satoshi-bold rounded-full flex items-center justify-center gap-2"
              >
                <LinkIcon className="w-5 h-5" />
                Copy Lesson URL
              </Button>
            ) : null}

            {/* Generate/Download Homework Button */}
            <Button
              disabled={generatingHomework}
              onClick={homeworkGenerated ? handleDownloadHomework : handleGenerateHomework}
              className={`flex-1 ${
                homeworkGenerated
                  ? 'bg-white text-[#396afc] border-2 border-[#396afc] hover:bg-gray-100'
                  : 'bg-[#396afc] text-white hover:bg-[#2948ff]'
              } font-satoshi-bold rounded-full flex items-center justify-center gap-2`}
            >
              {generatingHomework ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-current"
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
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Generating...
                </>
              ) : homeworkGenerated ? (
                <>
                  <Download className="w-5 h-5" />
                  Download Homework
                </>
              ) : (
                <>
                  <HomeIcon className="w-5 h-5" />
                  Generate Homework
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Topics */}
      <div className="space-y-6">
        {lesson.generatedTopics && lesson.generatedTopics.map((topic) => (
          <TopicModule
            key={topic.id}
            topic={topic}
            status={topicStatuses[topic.id]}
            onStatusChange={(status) => updateTopicStatus(topic.id, status)}
          />
        ))}
      </div>
    </div>
  );
};

export default LessonPage;