import React, { useState, useEffect } from 'react';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import LessonTimeline from './LessonTimeline';
import StudentInfo from './StudentInfo';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useRouter } from 'next/navigation';

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  nativeLanguage: string;
  language: string;
  level: string;
  createdAt: string;
  completedLessons: number;
  startDate: string;
}

interface StudentProfileProps {
  studentId: string;
  onBack: () => void;
}

const StudentProfile = ({ studentId, onBack }: StudentProfileProps) => {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [levelData, setLevelData] = useState<any>(null);
  const [progressPercentage, setProgressPercentage] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const fetchStudentAndLevel = async () => {
      try {
        const token = await user?.getIdToken();

        // Fetch student data
        const response = await fetch(`/api/students/${studentId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch student');
        }

        const data = await response.json();
        const studentData = {
          ...data.student,
          completedLessons: data.student.completedLessons || 0,
          startDate: data.student.startDate || data.student.createdAt,
          nativeLanguage: data.student.nativeLanguage || 'Not specified',
        };
        setStudent(studentData);

        // Now fetch level data
        const levelResponse = await fetch(`/api/students/${studentId}/level`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!levelResponse.ok) {
          throw new Error('Failed to fetch level data');
        }

        const levelDataJson = await levelResponse.json();
        setLevelData(levelDataJson.levelData);

        // Calculate the progress
        if (levelDataJson.levelData) {
          calculateProgress(levelDataJson.levelData);
        }
      } catch (error) {
        console.error('Error fetching student or level data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user && studentId) {
      fetchStudentAndLevel();
    }
  }, [studentId, user]);

  const calculateProgress = (levelData: any) => {
    const lessons = levelData.lessons || [];

    let totalTopics = 0;
    let completedTopics = 0;

    lessons.forEach((lesson: any) => {
      const topics = lesson.topics || [];
      topics.forEach((topic: any) => {
        if (!topic.isUserAdded) {
          totalTopics += 1;
          if (topic.status === 'completed') {
            completedTopics += 1;
          }
        }
      });
    });

    const progress = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;
    setProgressPercentage(progress);
  };

  const getLevelColor = (level: string) => {
    const colors: Record<'A' | 'B' | 'C', string> = {
      'A': 'bg-green-50 text-green-600 border-green-200',
      'B': 'bg-blue-50 text-[#396afc] border-blue-200',
      'C': 'bg-red-50 text-red-600 border-red-200'
    };

    const firstLetter = level.charAt(0) as keyof typeof colors;
    return colors[firstLetter] || 'bg-gray-50 text-gray-600 border-gray-200';
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!student) {
    return <div>Student not found</div>;
  }

  if (!levelData) {
    return <div>Level data not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Back Button */}
      <Button
        onClick={onBack}
        variant="ghost"
        className="text-gray-600 hover:bg-gray-100 flex items-center px-4 py-2 rounded-lg"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Students
      </Button>

      {/* Student Info Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {/* Use StudentInfo component */}
        <StudentInfo student={student} />
      </div>

      {/* Learning Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-5 h-5 text-[#396afc]" />
            <h2 className="text-lg font-semibold text-gray-900">Learning Overview</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          {/* Level Progress */}
          <div
            className="group p-4 hover:bg-blue-50 transition-colors cursor-pointer relative"
            onClick={() => router.push(`/dashboard/student/${studentId}/progress`)}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-[#396afc] font-medium">Level Progress</div>
                <div className="text-2xl font-bold text-gray-900 mt-1">
                  {progressPercentage.toFixed(0)}%
                </div>
              </div>
              <svg className="w-5 h-5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#396afc] transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Current Level */}
          <div className="p-4">
            <div className="text-sm text-[#396afc] font-medium">Current Level</div>
            <div className={`mt-1 inline-flex items-center px-3 py-1 rounded-lg ${getLevelColor(student.level)} border`}>
              <span className="text-2xl font-bold">{student.level}</span>
            </div>
          </div>

          {/* Learning Since */}
          <div className="p-4">
            <div className="text-sm text-[#396afc] font-medium">Learning Since</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              {student.startDate
                ? new Date(student.startDate).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric'
                  })
                : 'Not available'}
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Timeline */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Timeline</h3>
        <LessonTimeline studentId={student.id} studentLevel={student.level} />
      </div>
    </div>
  );
};

export default StudentProfile;
