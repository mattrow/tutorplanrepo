import React, { useEffect, useState } from 'react';
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import LessonCard from './LessonCard';
import { useAuth } from '@/hooks/useAuth';
import { Lesson } from '@/types/lesson';
import LoadingSpinner from '../ui/LoadingSpinner';

const LessonTimeline = ({ studentId }: { studentId: string }) => {
  const { user } = useAuth();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor)
  );

  useEffect(() => {
    fetchLessonPlan();
  }, []);

  const fetchLessonPlan = async () => {
    try {
      const token = await user?.getIdToken();
      const response = await fetch(`/api/students/${studentId}/lesson-plan`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch lesson plan');
      }

      const data = await response.json();
      setLessons(data.lessons);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching lesson plan:', error);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    if (!activeData || activeData.type !== 'topic') return; // We're only handling topics
    if (!overData || overData.type !== 'lesson') return; // We're only dropping onto lessons

    const activeLessonId = activeData.lessonId;
    const activeTopicId = activeData.topicId;
    const overLessonId = overData.lessonId;

    if (activeLessonId === overLessonId) return;

    // Find source and destination lessons
    const sourceLessonIndex = lessons.findIndex(lesson => lesson.id === activeLessonId);
    const destinationLessonIndex = lessons.findIndex(lesson => lesson.id === overLessonId);

    if (sourceLessonIndex === -1 || destinationLessonIndex === -1) return;

    const sourceLesson = lessons[sourceLessonIndex];
    const destinationLesson = lessons[destinationLessonIndex];

    // Find the topic in the source lesson
    const topicIndex = sourceLesson.topics.findIndex(topic => topic.id === activeTopicId);

    if (topicIndex === -1) return;

    // Remove topic from source lesson
    const [movedTopic] = sourceLesson.topics.splice(topicIndex, 1);

    // Add topic to destination lesson
    destinationLesson.topics.push(movedTopic);

    // Update state
    setLessons([...lessons]);

    // Update the backend
    try {
      const token = await user?.getIdToken();
      await fetch(`/api/students/${studentId}/update-topic-order`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lessons }),
      });
    } catch (error) {
      console.error('Error updating topic order:', error);
      // Optionally refresh the original data
      fetchLessonPlan();
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="mt-8">
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              isClickable={
                lesson.status === 'completed' ||
                (lesson.status === 'upcoming' &&
                  lessons.filter(l => l.status === 'upcoming')[0].id === lesson.id)
              }
            />
          ))}
        </div>
      </div>
    </DndContext>
  );
};

export default LessonTimeline;