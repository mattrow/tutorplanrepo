'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { BookOpen, MessageSquare, Pencil, ArrowLeft } from 'lucide-react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Button } from '@/components/ui/button';

interface Topic {
  id: string;
  topicName: string;
  topicDescription: string;
  status: 'not started' | 'in progress' | 'completed';
  type: 'communication' | 'vocabulary' | 'grammar';
  isUserAdded: boolean;
}

interface Column {
  title: string;
  icon: React.ReactNode;
  topics: Topic[];
}

interface ProgressPageProps {
  params: { id: string };
}

const ProgressPage = ({ params }: ProgressPageProps) => {
  const { user } = useAuth();
  const router = useRouter();
  const [columns, setColumns] = useState<Column[]>([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<{
    firstName: string;
    lastName: string;
    language: string;
    level: string;
  } | null>(null);

  const studentId = params.id;

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const token = await user?.getIdToken();

        // Fetch student data to get level and language
        const studentResponse = await fetch(`/api/students/${studentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!studentResponse.ok) {
          throw new Error('Failed to fetch student data');
        }

        const studentData = await studentResponse.json();
        const studentInfo = studentData.student;

        // Set the student state
        setStudent({
          firstName: studentInfo.firstName,
          lastName: studentInfo.lastName,
          language: studentInfo.language,
          level: studentInfo.level,
        });

        // Fetch level data
        const levelResponse = await fetch(
          `/api/students/${studentId}/level`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!levelResponse.ok) {
          throw new Error('Failed to fetch level data');
        }

        const levelDataJson = await levelResponse.json();
        const levelData = levelDataJson.levelData;

        // Process topics into columns
        processTopics(levelData);
      } catch (error) {
        console.error('Error fetching progress data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProgressData();
    }
  }, [user, studentId]);

  const processTopics = (levelData: any) => {
    const lessons = levelData.lessons || [];

    let totalTopics = 0;
    let completedTopics = 0;

    const topicTypes = {
      vocabulary: [] as Topic[],
      grammar: [] as Topic[],
      communication: [] as Topic[],
    };

    lessons.forEach((lesson: any) => {
      const topics = lesson.topics || [];
      topics.forEach((topic: Topic) => {
        if (!topic.isUserAdded) {
          totalTopics += 1;
          if (topic.status === 'completed') {
            completedTopics += 1;
          }

          const topicData = {
            id: topic.id,
            topicName: topic.topicName,
            topicDescription: topic.topicDescription,
            status: topic.status,
            type: topic.type,
            isUserAdded: topic.isUserAdded,
          };

          if (topic.type === 'vocabulary') {
            topicTypes.vocabulary.push(topicData);
          } else if (topic.type === 'grammar') {
            topicTypes.grammar.push(topicData);
          } else if (topic.type === 'communication') {
            topicTypes.communication.push(topicData);
          }
        }
      });
    });

    // Sort topics within each type based on status
    const statusOrder = ['completed', 'in progress', 'not started'];

    const sortTopics = (topics: Topic[]) => {
      return topics.sort((a, b) => {
        return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
      });
    };

    topicTypes.vocabulary = sortTopics(topicTypes.vocabulary);
    topicTypes.grammar = sortTopics(topicTypes.grammar);
    topicTypes.communication = sortTopics(topicTypes.communication);

    const progressPercentage =
      totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;
    setProgress(Math.round(progressPercentage));

    const columnsData: Column[] = [
      {
        title: 'Vocabulary',
        icon: <BookOpen className="w-5 h-5" />,
        topics: topicTypes.vocabulary,
      },
      {
        title: 'Grammar',
        icon: <Pencil className="w-5 h-5" />,
        topics: topicTypes.grammar,
      },
      {
        title: 'Communication',
        icon: <MessageSquare className="w-5 h-5" />,
        topics: topicTypes.communication,
      },
    ];

    setColumns(columnsData);
  };

  const getStatusColor = (status: Topic['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in progress':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getStatusText = (status: Topic['status']) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in progress':
        return 'In Progress';
      default:
        return 'Not Started';
    }
  };

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

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="p-8">
        {/* Back Button */}
        <Button
          onClick={() => router.push(`/dashboard/student/${params.id}`)}
          variant="ghost"
          className="text-gray-600 hover:bg-gray-100 mb-6 flex items-center"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Student
        </Button>

        <div className="max-w-7xl mx-auto">
          {/* Progress Header */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h1 className="text-2xl font-bold text-blue-900 mb-4">
              {student
                ? `${student.firstName} ${student.lastName} ${student.level} ${student.language} Learning Progress`
                : 'Learning Progress'}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-xl font-bold text-blue-900">
                {progress}%
              </span>
            </div>
          </div>

          {/* Topics Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {columns.map((column, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    {column.icon}
                  </div>
                  <h2 className="text-xl font-semibold text-blue-900">
                    {column.title}
                  </h2>
                </div>

                <div className="space-y-4">
                  {column.topics.length > 0 ? (
                    column.topics.map((topic) => (
                      <div
                        key={topic.id}
                        className={`p-4 rounded-lg border border-gray-200 hover:border-blue-200 transition ${getBackgroundColor(
                          topic.status
                        )}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {topic.topicName}
                          </h3>
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-2 h-2 rounded-full ${getStatusColor(
                                topic.status
                              )}`}
                            ></div>
                            <span className="text-sm text-gray-600">
                              {getStatusText(topic.status)}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          {topic.topicDescription}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No topics available.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;