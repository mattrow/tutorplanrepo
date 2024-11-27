'use client';

import React, { useEffect, useState, useRef } from 'react';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  pointerWithin,
  DragStartEvent,
  DragOverlay,
  UniqueIdentifier,
  DragOverEvent,
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
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface LessonTimelineProps {
  studentId: string;
  studentLevel: string;
  onLevelChange?: (newLevel: string) => void;
}

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

type ActiveItem =
  | { type: 'lesson'; lesson: Lesson }
  | { type: 'topic'; topic: any; lessonId: string };

const LessonTimeline = ({ studentId, studentLevel, onLevelChange }: LessonTimelineProps) => {
  const { user } = useAuth();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [activeItem, setActiveItem] = useState<ActiveItem | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const initialLessonsRef = useRef<Lesson[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(studentLevel);

  const router = useRouter();
  const pathname = usePathname();
  const [previousPathname, setPreviousPathname] = useState(pathname);

  const sensors = useSensors(
    useSensor(PointerSensor)
  );

  const [isGeneratingGlobal, setIsGeneratingGlobal] = useState(false);

  const fetchLessonPlan = async () => {
    try {
      setLoading(true);
      const token = await user?.getIdToken();
      const res = await fetch(`/api/students/${studentId}/lesson-plan`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        throw new Error('Failed to fetch lesson plan');
      }
      const data = await res.json();
      console.log('Fetched lessons:', data.lessons);
      setLessons(data.lessons);
      initialLessonsRef.current = data.lessons;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchLessonPlan();
    }
  }, [user]);

  useEffect(() => {
    if (pathname !== previousPathname) {
      if (hasChanges) {
        const confirmLeave = confirm('You have unsaved changes. Do you really want to leave?');
        if (!confirmLeave) {
          router.replace(previousPathname);
        } else {
          setPreviousPathname(pathname);
        }
      } else {
        setPreviousPathname(pathname);
      }
    }
  }, [pathname]);

  useEffect(() => {
    fetchLessons();
  }, [currentLevel]);

  const fetchLessons = async () => {
    try {
      setLoading(true);
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
    } catch (error) {
      console.error('Error fetching lessons:', error);
    } finally {
      setLoading(false);
    }
  };

  const findContainer = (id: UniqueIdentifier): UniqueIdentifier | null => {
    if (lessons.some((lesson) => lesson.id === id)) {
      return id;
    }

    for (const lesson of lessons) {
      if (lesson.topics.some((topic) => topic.id === id)) {
        return lesson.id;
      }
    }
    return null;
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeType = active.data.current?.type;

    setActiveId(active.id);

    if (activeType === 'lesson') {
      const lesson = lessons.find((l) => l.id === active.id);
      if (lesson) {
        setActiveItem({ type: 'lesson', lesson });
      }
    } else if (activeType === 'topic') {
      const activeLessonId = findContainer(active.id);
      if (activeLessonId) {
        const lesson = lessons.find((l) => l.id === activeLessonId);
        const topic = lesson?.topics.find((t) => t.id === active.id);
        if (topic && lesson) {
          setActiveItem({ type: 'topic', topic, lessonId: activeLessonId as string });
        }
      }
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id);

    if (!activeContainer || !overContainer) return;

    if (activeContainer !== overContainer) {
      setLessons((prevLessons) => {
        const activeLessonIndex = prevLessons.findIndex(
          (lesson) => lesson.id === activeContainer
        );
        const overLessonIndex = prevLessons.findIndex(
          (lesson) => lesson.id === overContainer
        );

        if (activeLessonIndex === -1 || overLessonIndex === -1) return prevLessons;

        const activeLesson = prevLessons[activeLessonIndex];
        const overLesson = prevLessons[overLessonIndex];

        const activeTopicIndex = activeLesson.topics.findIndex(
          (topic) => topic.id === active.id
        );

        if (activeTopicIndex === -1) return prevLessons;

        const activeTopic = activeLesson.topics[activeTopicIndex];

        const newActiveTopics = activeLesson.topics.filter(
          (topic) => topic.id !== active.id
        );
        const newOverTopics = [...overLesson.topics];

        let overIndex = overLesson.topics.findIndex((topic) => topic.id === over.id);

        if (overIndex === -1) {
          overIndex = newOverTopics.length;
        }

        newOverTopics.splice(overIndex, 0, activeTopic);

        const newLessons = [...prevLessons];
        newLessons[activeLessonIndex] = { ...activeLesson, topics: newActiveTopics };
        newLessons[overLessonIndex] = { ...overLesson, topics: newOverTopics };

        return newLessons;
      });
      setHasChanges(true);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveId(null);
    setActiveItem(null);

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
        setHasChanges(true);
      }
    } else if (active.data.current?.type === 'lesson' && over.data.current?.type === 'lesson') {
      const activeIndex = lessons.findIndex((lesson) => lesson.id === active.id);
      const overIndex = lessons.findIndex((lesson) => lesson.id === over.id);

      if (activeIndex !== overIndex) {
        setLessons((prevLessons) => {
          const newLessons = arrayMove(prevLessons, activeIndex, overIndex).map((lesson, index) => ({
            ...lesson,
            number: index + 1,
          }));
          return newLessons;
        });
        setHasChanges(true);
      }
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
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
      setHasChanges(false);

      await fetchLessonPlan();
    } catch (error) {
      console.error('Error updating topic order:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setLessons(initialLessonsRef.current);
    setHasChanges(false);
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasChanges) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasChanges]);

  const handleAddTopic = (lessonId: string, newTopic: any) => {
    setLessons((prevLessons) =>
      prevLessons.map((lesson) =>
        lesson.id === lessonId
          ? {
              ...lesson,
              topics: [...lesson.topics, newTopic],
            }
          : lesson
      )
    );
    setHasChanges(true);
  };

  const handleDeleteTopic = (lessonId: string, topicId: string) => {
    setLessons((prevLessons) =>
      prevLessons.map((lesson) => {
        if (lesson.id === lessonId) {
          const topicToDelete = lesson.topics.find((topic) => topic.id === topicId);
          if (topicToDelete && topicToDelete.isUserAdded) {
            return {
              ...lesson,
              topics: lesson.topics.filter((topic) => topic.id !== topicId),
            };
          }
        }
        return lesson;
      })
    );
    setHasChanges(true);
  };

  const handleLessonGenerated = (lessonId: string) => {
    setLessons((prevLessons) =>
      prevLessons.map((lesson) =>
        lesson.id === lessonId ? { ...lesson, generated: true } : lesson
      )
    );
  };

  const getNextLevel = (currentLevel: string): string => {
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const currentIndex = levels.indexOf(currentLevel);
    return currentIndex < levels.length - 1 ? levels[currentIndex + 1] : currentLevel;
  };

  const handleAdvanceLevel = async () => {
    const confirmAdvance = window.confirm(
      'Are you sure? This action will erase all the data of your current level.'
    );
    if (!confirmAdvance) return;

    try {
      if (isAdvancing) return;
      setIsAdvancing(true);
      const token = await user?.getIdToken();

      const response = await fetch(`/api/students/${studentId}/advance-level`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to advance to next level');
      }

      const data = await response.json();
      console.log(data.message);
      setCurrentLevel(data.newLevel);
      await fetchLessons();
      if (onLevelChange) {
        onLevelChange(data.newLevel);
      }
    } catch (error) {
      console.error('Error advancing to next level:', error);
    } finally {
      setIsAdvancing(false);
    }
  };

  const hasNextLevel = () => {
    const currentLevelIndex = LEVELS.indexOf(currentLevel);
    return currentLevelIndex >= 0 && currentLevelIndex < LEVELS.length - 1;
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col">
      <DndContext
        sensors={sensors}
        collisionDetection={pointerWithin}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={lessons.map(lesson => lesson.id)}
          strategy={verticalListSortingStrategy}
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
                  onAddTopic={handleAddTopic}
                  onDeleteTopic={handleDeleteTopic}
                  studentId={studentId}
                  onLessonGenerated={handleLessonGenerated}
                  isGeneratingGlobal={isGeneratingGlobal}
                  setIsGeneratingGlobal={setIsGeneratingGlobal}
                />
              </SortableContext>
            ))}
          </div>
        </SortableContext>

        <DragOverlay>
          {activeItem && activeId ? (
            activeItem.type === 'lesson' ? (
              <LessonCard
                lesson={activeItem.lesson}
                isClickable={false}
                isDraggingOverlay={true}
                onAddTopic={() => {}}
                onDeleteTopic={() => {}}
                studentId={studentId}
                onLessonGenerated={() => {}}
                isGeneratingGlobal={isGeneratingGlobal}
                setIsGeneratingGlobal={setIsGeneratingGlobal}
              />
            ) : activeItem.type === 'topic' ? (
              <TopicItem
                topic={activeItem.topic}
                lessonId={activeItem.lessonId}
              />
            ) : null
          ) : null}
        </DragOverlay>
      </DndContext>

      {hasChanges && (
        <div className="fixed bottom-8 right-8 flex gap-4 animate-fade-in">
          <Button
            onClick={handleCancel}
            className="font-satoshi-bold bg-white text-md text-[#396afc] hover:bg-white/90 hover:scale-105 transition-transform duration-300 ease-out rounded-full px-8 py-5 flex items-center gap-2"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className={`font-satoshi-bold bg-blue-600 text-white text-md hover:bg-blue-700 hover:scale-105 transition-transform duration-300 ease-out rounded-full px-8 py-5 flex items-center gap-2 ${
              isSaving ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <svg
                  className="w-5 h-5 animate-spin text-white"
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
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      )}

      {hasNextLevel() ? (
        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleAdvanceLevel}
            disabled={isAdvancing}
            className="mt-4 bg-[#396afc] text-white hover:bg-[#396afc]/90 font-satoshi-bold rounded-full flex items-center justify-center gap-2 py-6 disabled:opacity-50"
          >
            {isAdvancing ? 'Advancing...' : 'Advance to Next Level'}
          </Button>
        </div>
      ) : (
        <p className="mt-4 text-center">You have completed all levels!</p>
      )}
    </div>
  );
};

export default LessonTimeline;
