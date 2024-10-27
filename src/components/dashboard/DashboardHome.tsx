import { useEffect, useState } from 'react';
import { ChevronRight, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';
import StudentProfile from '../student-profile/StudentProfile';

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  country: string;
  language: string;
  level: string;
  createdAt: string;
}

const languageFlags: Record<string, string> = {
  English: '🇬🇧',
  Spanish: '🇪🇸',
  French: '🇫🇷',
  German: '🇩🇪',
  Italian: '🇮🇹',
  Portuguese: '🇵🇹',
  Japanese: '🇯🇵',
  Chinese: '🇨🇳',
  Korean: '🇰🇷',
  Russian: '🇷🇺',
};

export default function DashboardHome({ onAddStudent }: { onAddStudent: () => void }) {
  const { user } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = await user?.getIdToken();
        const response = await fetch('/api/students/list', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }

        const data = await response.json();
        setStudents(data.students);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchStudents();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="p-8 bg-[#f8f9fc] flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#396afc]"></div>
      </div>
    );
  }

  // If a student is selected, show their profile
  if (selectedStudent) {
    return (
      <div className="bg-[#f8f9fc]">
        <StudentProfile 
          student={{
            ...selectedStudent,
            startDate: selectedStudent.createdAt, // Use creation date as start date
            totalLessons: 8, // Placeholder
            completedLessons: 3, // Placeholder
          }}
          onBack={() => setSelectedStudent(null)}
        />
      </div>
    );
  }

  return (
    <div className="p-8 bg-[#f8f9fc]">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your Students</h1>
        <Button 
          onClick={onAddStudent}
          className="bg-[#396afc] text-white hover:bg-[#2948ff] font-satoshi-bold rounded-full flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Student
        </Button>
      </div>

      {/* Student List */}
      {students.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-md border border-gray-200">
          {students.map((student, index) => (
            <div
              key={student.id}
              onClick={() => setSelectedStudent(student)}
              className={`flex items-center justify-between p-6 hover:bg-gray-50 transition-colors duration-150 cursor-pointer ${
                index !== students.length - 1 ? 'border-b border-gray-200' : ''
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#396afc] flex items-center justify-center text-white font-semibold">
                  {student.firstName[0]}{student.lastName[0]}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {student.firstName} {student.lastName[0]}.
                  </h3>
                  <p className="text-sm text-gray-500">{student.country}</p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl" role="img" aria-label={`${student.language} flag`}>
                    {languageFlags[student.language]}
                  </span>
                  <div className="px-3 py-1 rounded-lg bg-blue-50 text-[#396afc] font-medium">
                    {student.level}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-12 text-center">
          <div className="text-gray-500 mb-4">No students added yet</div>
          <Button
            onClick={onAddStudent}
            className="bg-[#396afc] text-white hover:bg-[#2948ff] font-satoshi-bold rounded-full flex items-center gap-2 mx-auto"
          >
            <Plus className="w-5 h-5" />
            Add Your First Student
          </Button>
        </div>
      )}
    </div>
  );
}
