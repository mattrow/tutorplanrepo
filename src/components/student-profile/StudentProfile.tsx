import React from 'react';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import LessonTimeline from './LessonTimeline';
import StudentInfo from './StudentInfo';

interface StudentProfileProps {
  student: {
    id: string;
    firstName: string;
    lastName: string;
    country: string;
    language: string;
    level: string;
    startDate: string;
    totalLessons: number;
    completedLessons: number;
  };
  onBack: () => void;
}

const StudentProfile = ({ student, onBack }: StudentProfileProps) => {
  return (
    <div className="p-8">
      {/* Header with back button */}
      <Button
        onClick={onBack}
        variant="ghost"
        className="text-gray-600 hover:bg-gray-100 mb-6 flex items-center"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Students
      </Button>

      {/* Student Overview */}
      <StudentInfo student={student} />

      {/* Progress Overview */}
      <div className="mt-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="flex items-center gap-4 mb-6">
          <GraduationCap className="w-6 h-6 text-[#396afc]" />
          <h2 className="text-xl font-semibold text-gray-900">Learning Progress</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-xl">
            <div className="text-sm text-[#396afc] mb-1">Completed Lessons</div>
            <div className="text-2xl font-bold text-gray-900">{student.completedLessons}</div>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl">
            <div className="text-sm text-[#396afc] mb-1">Current Level</div>
            <div className="text-2xl font-bold text-gray-900">{student.level}</div>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl">
            <div className="text-sm text-[#396afc] mb-1">Learning Since</div>
            <div className="text-2xl font-bold text-gray-900">
              {new Date(student.startDate).toLocaleDateString('en-US', { 
                month: 'long', 
                year: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Timeline */}
      <LessonTimeline studentId={student.id} />
    </div>
  );
};

export default StudentProfile;
