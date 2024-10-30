'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LessonPage from '@/components/LessonView/LessonPage';
import { useAuth } from '@/hooks/useAuth';
import { useParams } from 'next/navigation';
import Sidebar from '@/components/ui/Sidebar';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';

export default function LessonViewPage() {
  const router = useRouter();
  const { id: studentId, lessonId } = useParams();
  const { user } = useAuth();
  const [lessonData, setLessonData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sharing, setSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  useEffect(() => {
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

    const fetchLessonData = async () => {
      if (user) {
        const token = await user.getIdToken();
        return fetch(`/api/students/${studentId}/lessons/${lessonId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      } else {
        return fetch(`/api/students/${studentId}/lessons/${lessonId}`);
      }
    };

    fetchLesson();
  }, [user, studentId, lessonId]);

  const handleShareLesson = async () => {
    if (!user) {
      // Redirect to login or show a message
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
        // Copy the lesson URL to clipboard
        const lessonUrl = `${window.location.origin}/dashboard/student/${studentId}/lesson/${lessonId}`;
        await navigator.clipboard.writeText(lessonUrl);
        setShareSuccess(true);
        // Optionally, show a toast notification
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
        {/* Share Button */}
        <div className="fixed bottom-8 left-8">
          <Button
            onClick={handleShareLesson}
            disabled={sharing || lessonData.public}
            className="bg-[#396afc] text-white hover:bg-[#2948ff] font-satoshi-bold rounded-full flex items-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            {lessonData.public ? 'Lesson is Public' : 'Share Lesson'}
          </Button>
        </div>
      </div>
    </div>
  );
}