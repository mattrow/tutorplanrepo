'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import LessonPage from '@/components/LessonView/LessonPage';
import { useAuth } from '@/hooks/useAuth';
import Sidebar from '@/components/ui/Sidebar';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function LessonViewPage() {
  const router = useRouter();
  const { id: studentId, lessonId } = useParams();
  const { user } = useAuth();
  const [lessonData, setLessonData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    const fetchLessonData = async () => {
      const authHeaders: Record<string, string> = {};

      if (user) {
        authHeaders['Authorization'] = `Bearer ${await user.getIdToken()}`;
        authHeaders['Content-Type'] = 'application/json';
      }

      return fetch(`/api/students/${studentId}/lessons/${lessonId}`, {
        headers: authHeaders,
      });
    };

    const fetchLesson = async () => {
      try {
        const response = await fetchLessonData();
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
    };

    fetchLesson();
  }, [user, studentId, lessonId]);

  const handleShareLesson = async () => {
    if (!user) {
      // Handle unauthenticated case if necessary
      return;
    }

    setSharing(true);
    try {
      const token = await user.getIdToken();
      const response = await fetch(`/api/students/${studentId}/lessons/${lessonId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ public: true }),
      });

      if (response.ok) {
        // Update lessonData to reflect the lesson is now public
        setLessonData((prevData: any) => ({ ...prevData, public: true }));

        // Copy the lesson URL to clipboard
        const lessonUrl = `${window.location.origin}/dashboard/student/${studentId}/lesson/${lessonId}`;
        await navigator.clipboard.writeText(lessonUrl);
        alert('Lesson link copied to clipboard!');
      } else {
        console.error('Failed to make lesson public');
      }
    } catch (error) {
      console.error('Error sharing lesson:', error);
    } finally {
      setSharing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen">
        {user && <Sidebar />}
        <div className={`flex-1 ${user ? 'ml-64' : ''}`}>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (!lessonData) {
    return (
      <div className="flex h-screen">
        {user && <Sidebar />}
        <div className={`flex-1 ${user ? 'ml-64' : ''} p-8`}>Lesson not found.</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {user && <Sidebar />}
      <div className={`flex-1 ${user ? 'ml-64' : ''}`}>
        <LessonPage
          lesson={lessonData}
          user={user}
          onShareLesson={handleShareLesson}
          sharing={sharing}
        />
      </div>
    </div>
  );
}