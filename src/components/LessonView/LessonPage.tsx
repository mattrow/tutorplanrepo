import React, { useState, useEffect, useCallback } from 'react';
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
import { useRouter, useParams } from 'next/navigation';
import IntroductionSection from './TopicSections/IntroductionSection';
import InDepthSection from './TopicSections/InDepthSection';
import ExamplesSection from './TopicSections/ExamplesSection';
import ExercisesSection from './TopicSections/ExercisesSection';
import TopicNavigation from './TopicSections/TopicNavigation';
import { GeneratedTopic, Topic, Lesson } from '@/types/lesson';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-toastify';
import confetti from 'canvas-confetti';

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
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900">{topic.title}</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onStatusChange({ completed: !status.completed })}
                className={`transition-colors ${
                  status.completed
                    ? 'text-green-500'
                    : 'text-blue-500 hover:text-blue-600'
                }`}
              >
                {status.completed ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <CheckSquare className="w-6 h-6" />
                )}
              </button>

              {status.completed && (
                <>
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
                </>
              )}
            </div>
          </div>

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
        </div>
      </div>
    </div>
  );
};

const LessonPage = ({ lesson, user, onShareLesson, sharing }: LessonPageProps) => {
  const router = useRouter();

  const params = useParams();
  const studentId = params.id;
  const lessonId = params.lessonId;

  const [lessonData, setLessonData] = useState<Lesson | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    const fetchLesson = async () => {
      if (!user || !studentId || !lessonId) return;

      try {
        const token = await user.getIdToken();
        const response = await fetch(`/api/students/${studentId}/lessons/${lessonId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setLessonData(data.lesson);

          // Set confirmation status
          setIsConfirmed(data.lesson.confirmed || false);
        } else {
          console.error('Failed to fetch lesson');
        }
      } catch (error) {
        console.error('Error fetching lesson:', error);
      }
    };

    fetchLesson();
  }, [user, studentId, lessonId]);

  // Initialize topic statuses with an empty object
  const [topicStatuses, setTopicStatuses] = useState<Record<string, TopicStatus>>({});

  // Update topic statuses when lessonData is loaded
  useEffect(() => {
    if (lessonData) {
      const generatedTopics = lessonData.generatedTopics ?? [];
      const statuses = generatedTopics.reduce(
        (acc, topic) => ({
          ...acc,
          [topic.id]: { completed: false, understood: null },
        }),
        {}
      );
      setTopicStatuses(statuses);
    }
  }, [lessonData]);

  const updateTopicStatus = (topicId: string, status: Partial<TopicStatus>) => {
    setTopicStatuses((prev) => ({
      ...prev,
      [topicId]: { ...prev[topicId], ...status },
    }));
  };

  // Check if at least one topic is marked as completed
  const hasCompletedTopics = Object.values(topicStatuses).some(
    (status) => status.completed
  );

  // Function to handle lesson completion
  const handleCompleteLesson = async () => {
    try {
      const token = await user.getIdToken();
      const response = await fetch(
        `/api/students/${lesson.studentId}/lessons/${lesson.id}/complete`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ updatedTopics: lesson.topics }),
        }
      );

      if (!response.ok) {
        console.error('Failed to complete lesson');
      } else {
        console.log('Lesson completed successfully');
        // Optionally, update local state or redirect
      }
    } catch (error) {
      console.error('Error completing lesson:', error);
    }
  };

  // Function to copy lesson URL
  const copyLessonUrl = () => {
    const lessonUrl = window.location.href;
    navigator.clipboard.writeText(lessonUrl);
    alert('Lesson link copied to clipboard!');
  };

  const [generatingHomework, setGeneratingHomework] = useState(false);
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

  // Function to launch confetti
  const launchConfetti = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  // Function to handle lesson confirmation
  const handleConfirmLesson = async () => {
    if (isConfirmed || !user || !lessonData) return;

    if (!hasCompletedTopics) {
      toast.error(
        'Make sure that you check off which topics you covered during the lesson and if the student understood.'
      );
      return;
    }

    setIsConfirming(true);
    try {
      const token = await user.getIdToken();

      // Prepare the updated topics array
      const updatedTopics = lessonData.generatedTopics.map((topic) => {
        const status = topicStatuses[topic.id];
        return {
          ...topic,
          status: status.completed ? 'completed' : 'not started',
          understood: status.understood,
        };
      });

      const requestBody = {
        confirmLesson: true,
        updatedTopics,
      };

      const response = await fetch(
        `/api/students/${lessonData.studentId}/lessons/${lessonData.id}/complete`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to confirm lesson');
      }

      setIsConfirmed(true); // Mark as confirmed
      launchConfetti();     // Trigger confetti effect
      toast.success('Lesson Confirmed');
    } catch (error) {
      console.error('Error confirming lesson:', error);
      toast.error('Failed to confirm lesson');
    } finally {
      setIsConfirming(false);
    }
  };

  // Construct the lesson title
  const lessonNumber = lessonData?.number || 'N/A'; // Handle undefined numbers
  const topicTitles = lessonData?.topics.map((topic: Topic) => topic.topicName).join(', ');
  const lessonTitle = `Lesson ${lessonNumber}: ${topicTitles}`;

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
              <h1 className="text-2xl font-bold text-gray-900">{lessonTitle}</h1>
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
        {lessonData?.generatedTopics?.map((topic) => (
          <TopicModule
            key={topic.id}
            topic={topic}
            status={topicStatuses[topic.id] || { completed: false, understood: null }}
            onStatusChange={(status) => updateTopicStatus(topic.id, status)}
          />
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleConfirmLesson}
          disabled={isConfirming || isConfirmed || !lessonData}
          className={`mt-4 px-4 py-2 rounded-md text-white ${
            isConfirmed
              ? 'bg-green-500 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isConfirming ? (
            <div className="flex items-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
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
              Confirming...
            </div>
          ) : isConfirmed ? (
            'Lesson Confirmed'
          ) : (
            'Confirm Lesson'
          )}
        </button>
      </div>
    </div>
  );
};

export default LessonPage;