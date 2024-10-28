import React, { useState } from 'react';
import { ArrowLeft, Calendar, BookOpen, GraduationCap, ThumbsUp, ThumbsDown, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import TopicProgress from './TopicProgress';
import TeachingNotes from './TeachingNotes';

interface LessonViewProps {
  lessonId: string;
  onClose: () => void;
}

interface Topic {
  id: number;
  title: string;
  teachingStrategy: string;
  exercises: string[];
  status?: 'completed' | 'in-progress' | 'pending';
  understanding?: 'good' | 'needs-review';
}

interface Lesson {
  id: string;
  number: number;
  title: string;
  summary: string;
  date: string;
  topics: Topic[];
  status: 'completed' | 'upcoming' | 'planned';
}

const LessonView = ({ lessonId, onClose }: LessonViewProps) => {
  const [lessonDate, setLessonDate] = useState(new Date().toISOString().split('T')[0]);
  const [isGeneratingHomework, setIsGeneratingHomework] = useState(false);

  // Mock lesson data - this would eventually come from your Firebase database
  const lesson = {
    id: lessonId,
    number: 2,
    title: "Daily Routines & Time",
    summary: "This lesson focuses on teaching students how to discuss their daily activities and tell time. Students will learn essential vocabulary and grammar structures needed for describing their daily routines.",
    date: lessonDate,
    status: 'upcoming',
    topics: [
      {
        id: 1,
        title: "Telling Time",
        teachingStrategy: "Start with a large clock visual aid. Practice both digital and analog time formats. Focus on the difference between formal and informal time expressions.",
        exercises: [
          "Match digital times with written expressions",
          "Role-play asking and telling time in different scenarios",
          "Time bingo game with numbers"
        ]
      },
      {
        id: 2,
        title: "Common Daily Activities",
        teachingStrategy: "Use picture cards or simple drawings to introduce daily routine verbs. Create a typical daily schedule together.",
        exercises: [
          "Order daily activities cards chronologically",
          "Fill in the blanks with appropriate routine verbs",
          "Create and present their own daily routine"
        ]
      },
      {
        id: 3,
        title: "Regular Verbs in Present Tense",
        teachingStrategy: "Introduce regular verb conjugations using daily routine verbs as examples. Create conjugation charts together.",
        exercises: [
          "Conjugation practice with common regular verbs",
          "Sentence building with subject + verb + time",
          "Written diary entry using learned verbs"
        ]
      },
      {
        id: 4,
        title: "Days of the Week and Months",
        teachingStrategy: "Use a calendar to introduce vocabulary. Point out patterns and similarities with English words where applicable.",
        exercises: [
          "Calendar-based activities and games",
          "Create weekly schedule",
          "Practice saying important dates"
        ]
      }
    ]
  };

  const generateHomework = async () => {
    setIsGeneratingHomework(true);
    try {
      // This would be replaced with your actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Here you would typically:
      // 1. Generate homework based on completed topics
      // 2. Save to Firebase
      // 3. Notify the student
      alert('Homework has been generated and will be sent to the student!');
    } catch (error) {
      console.error('Error generating homework:', error);
      alert('Failed to generate homework. Please try again.');
    } finally {
      setIsGeneratingHomework(false);
    }
  };

  return (
    <div className="p-8 bg-[#f8f9fc]">
      {/* Header */}
      <Button
        onClick={onClose}
        variant="ghost"
        className="text-gray-600 hover:bg-gray-100 mb-6 flex items-center"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Timeline
      </Button>

      {/* Lesson Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Lesson {lesson.number} - {lesson.title}
            </h1>
            <div className="flex items-center gap-2 text-gray-500 mt-2">
              <Calendar className="w-4 h-4" />
              <input
                type="date"
                value={lessonDate}
                onChange={(e) => setLessonDate(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-[#396afc] focus:border-[#396afc]"
              />
            </div>
          </div>
          <Button
            onClick={generateHomework}
            disabled={isGeneratingHomework}
            className="bg-[#396afc] text-white hover:bg-[#2948ff] font-satoshi-bold rounded-lg flex items-center gap-2"
          >
            {isGeneratingHomework ? (
              'Generating...'
            ) : (
              <>
                <GraduationCap className="w-4 h-4" />
                Generate Homework
              </>
            )}
          </Button>
        </div>
        <p className="text-gray-600">{lesson.summary}</p>
      </div>

      {/* Lesson Content */}
      <div className="space-y-6">
        {lesson.topics.map((topic: Topic) => {
          console.log('Topic:', topic);
          return (
            <TopicProgress 
              key={topic.id} 
              topic={topic}
              onStatusChange={(status) => {
                // Here you would update the topic status in Firebase
                console.log(`Topic ${topic.id} status changed to ${status}`);
              }}
              onUnderstandingChange={(understanding) => {
                // Here you would update the understanding level in Firebase
                console.log(`Topic ${topic.id} understanding changed to ${understanding}`);
              }}
            />
          );
        })}
      </div>

      {/* Teaching Notes */}
      <TeachingNotes 
        lessonId={lessonId}
        onSave={(notes) => {
          // Here you would save the notes to Firebase
          console.log('Saving notes:', notes);
        }}
      />
    </div>
  );
};

export default LessonView;
