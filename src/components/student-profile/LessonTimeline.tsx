import React from 'react';
import { Calendar, CheckCircle, Clock, ChevronRight } from 'lucide-react';
import LessonCard from './LessonCard';

interface LessonTimelineProps {
  studentId: string;
}

const LessonTimeline = ({ studentId }: LessonTimelineProps) => {
  // Mock data for demonstration - this could be fetched from your API later
  const lessons = [
    {
      id: 1,
      number: 1,
      title: "Introduction & Basics",
      date: "2024-02-01",
      status: "completed",
      topics: [
        "Basic greetings and introductions",
        "Numbers 1-20",
        "Simple present tense",
        "Question words: what, where, who"
      ]
    },
    {
      id: 2,
      number: 2,
      title: "Daily Routines & Time",
      date: "2024-02-08",
      status: "completed",
      topics: [
        "Telling time",
        "Common daily activities",
        "Regular verbs in present tense",
        "Days of the week and months"
      ]
    },
    {
      id: 3,
      number: 3,
      title: "Food & Dining",
      date: "2024-02-15",
      status: "completed",
      topics: [
        "Restaurant vocabulary",
        "Ordering food and drinks",
        "Food preferences",
        "Cultural dining customs"
      ]
    },
    {
      id: 4,
      number: 4,
      title: "Travel & Directions",
      date: "2024-02-22",
      status: "upcoming",
      topics: [
        "Transportation vocabulary",
        "Asking for directions",
        "Reading maps and signs",
        "Making travel arrangements"
      ]
    },
    {
      id: 5,
      number: 5,
      title: "Shopping & Commerce",
      date: "2024-02-29",
      status: "planned",
      topics: [
        "Shopping vocabulary",
        "Currency and numbers",
        "Bargaining and prices",
        "Clothing and sizes"
      ]
    }
  ];

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Lesson Timeline</h2>
        <div className="flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-gray-600">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#396afc]" />
            <span className="text-gray-600">Upcoming</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson, index) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            isClickable={lesson.status === 'completed' || 
              (lesson.status === 'upcoming' && 
               lessons.filter(l => l.status === 'upcoming')[0].id === lesson.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default LessonTimeline;
