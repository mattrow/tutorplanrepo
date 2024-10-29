'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LessonPage from '@/components/LessonView/LessonPage';
import { useAuth } from '@/hooks/useAuth';
import { useParams } from 'next/navigation';
import Sidebar from '@/components/ui/Sidebar';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function LessonViewPage() {
  const router = useRouter();
  const { id: studentId, lessonId } = useParams();
  const { user } = useAuth();
  const [lessonData, setLessonData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLesson = async () => {
      if (user) {
        try {
          const token = await user.getIdToken();
          const response = await fetch(
            `/api/students/${studentId}/lessons/${lessonId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setLessonData(data.lesson);
          } else {
            console.error('Failed to fetch lesson');
          }
        } catch (error) {
          console.error('Error fetching lesson:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchLesson();
  }, [user, studentId, lessonId]);

  if (loading) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 ml-64">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (!lessonData) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 ml-64 p-8">
          Lesson not found.
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 ml-64">
        <LessonPage lesson={lessonData} />
      </div>
    </div>
  );
}