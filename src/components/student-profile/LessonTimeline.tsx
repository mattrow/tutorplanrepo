import React, { useEffect, useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragStartEvent,
  DragOverlay,
  DragOverEvent,
  UniqueIdentifier,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import LessonCard from './LessonCard';
import TopicItem from './TopicItem';
import { useAuth } from '@/hooks/useAuth';
import { Lesson } from '@/types/lesson';
import LoadingSpinner from '../ui/LoadingSpinner';

const LessonTimeline = ({ studentId }: { studentId: string }) => {
  const { user } = useAuth();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [activeTopic, setActiveTopic] = useState<any>(null);

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

  const findContainer = (id: UniqueIdentifier) => {
    for (const lesson of lessons) {
      if (id === lesson.id) {
        return lesson.id;
      }
      if (lesson.topics.some((topic) => topic.id === id)) {
        return lesson.id;
      }
    }
    return null;
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id);

    const activeLessonId = findContainer(active.id);
    if (activeLessonId) {
      const lesson = lessons.find((l) => l.id === activeLessonId);
      const topic = lesson?.topics.find((t) => t.id === active.id);
      setActiveTopic(topic);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id);

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }

    setLessons((prevLessons) => {
      const sourceLessonIndex = prevLessons.findIndex((lesson) => lesson.id === activeContainer);
      const destinationLessonIndex = prevLessons.findIndex((lesson) => lesson.id === overContainer);

      if (sourceLessonIndex === -1 || destinationLessonIndex === -1) return prevLessons;

      const sourceLesson = prevLessons[sourceLessonIndex];
      const destinationLesson = prevLessons[destinationLessonIndex];

      const activeIndex = sourceLesson.topics.findIndex((topic) => topic.id === active.id);

      if (activeIndex === -1) return prevLessons;

      const newSourceTopics = [...sourceLesson.topics];
      const [movedTopic] = newSourceTopics.splice(activeIndex, 1);

      const newDestinationTopics = [...destinationLesson.topics];
      newDestinationTopics.push(movedTopic);

      const newLessons = [...prevLessons];
      newLessons[sourceLessonIndex] = {
        ...sourceLesson,
        topics: newSourceTopics,
      };
      newLessons[destinationLessonIndex] = {
        ...destinationLesson,
        topics: newDestinationTopics,
      };

      return newLessons;
    });
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveId(null);
    setActiveTopic(null);

    if (!over) return;

    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id);

    if (!activeContainer || !overContainer) return;

    if (activeContainer === overContainer) {
      const lessonIndex = lessons.findIndex((lesson) => lesson.id === activeContainer);
      const lesson = lessons[lessonIndex];
      const activeIndex = lesson.topics.findIndex((topic) => topic.id === active.id);
      const overIndex = lesson.topics.findIndex((topic) => topic.id === over.id);

      if (activeIndex !== overIndex) {
        setLessons((prevLessons) => {
          const newTopics = arrayMove(lesson.topics, activeIndex, overIndex);
          const newLessons = [...prevLessons];
          newLessons[lessonIndex] = {
            ...lesson,
            topics: newTopics,
          };
          return newLessons;
        });
      }
    }

    // Update backend
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
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="mt-8 space-y-4">
        {lessons.map((lesson) => (
          <SortableContext
            key={lesson.id}
            id={lesson.id}
            items={lesson.topics.map((topic) => topic.id)}
            strategy={verticalListSortingStrategy}
          >
            <LessonCard
              lesson={lesson}
              isClickable={
                lesson.status === 'completed' ||
                (lesson.status === 'upcoming' &&
                  lessons.filter((l) => l.status === 'upcoming')[0].id === lesson.id)
              }
            />
          </SortableContext>
        ))}
      </div>
      <DragOverlay>
        {activeTopic ? (
          <TopicItem
            topic={activeTopic}
            lessonId={findContainer(activeId!)}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default LessonTimeline;
