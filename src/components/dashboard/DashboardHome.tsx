import React from 'react';
import { useEffect, useState } from 'react';
import { ChevronRight, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import * as CountryFlags from 'country-flag-icons/react/3x2';

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  nativeLanguage: string;
  language: string;
  level: string;
  createdAt: string;
}

const languageFlags: Record<string, { countryCode: keyof typeof CountryFlags }> = {
  English: { countryCode: 'US' },
  Spanish: { countryCode: 'ES' },
  French: { countryCode: 'FR' },
  German: { countryCode: 'DE' },
  Italian: { countryCode: 'IT' },
  Portuguese: { countryCode: 'BR' },
  Japanese: { countryCode: 'JP' },
  Chinese: { countryCode: 'CN' },
  Korean: { countryCode: 'KR' },
  Russian: { countryCode: 'RU' },
};

const getLevelColor = (level: string) => {
  if (level.startsWith('A')) return 'bg-green-50 text-green-600';
  if (level.startsWith('B')) return 'bg-blue-50 text-[#396afc]';
  if (level.startsWith('C')) return 'bg-red-50 text-red-600';
  return 'bg-gray-50 text-gray-600';
};

export default function DashboardHome({ onAddStudent }: { onAddStudent: () => void }) {
  const { user } = useAuth();
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string>('user');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = await user?.getIdToken();
        const userInfoResponse = await fetch('/api/user/check', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const userInfo = await userInfoResponse.json();
        setRole(userInfo.userData?.role || 'user');

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

  const handleStudentClick = (student: Student) => {
    router.push(`/dashboard/student/${student.id}`);
  };

  const handleAddStudent = () => {
    if ((role === 'user' || role === 'Free User') && students.length >= 5) {
      router.push('/checkout');
    } else {
      onAddStudent();
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-8 bg-[#f8f9fc]">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your Students</h1>
        <Button 
          onClick={handleAddStudent}
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
              onClick={() => handleStudentClick(student)}
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
                  <p className="text-sm text-gray-500">Native Language: {student.nativeLanguage}</p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <span role="img" aria-label={`${student.language} flag`}>
                    {(() => {
                      const FlagComponent = CountryFlags[languageFlags[student.language].countryCode];
                      return <FlagComponent className="w-6 h-6" />;
                    })()}
                  </span>
                  <div className={`px-3 py-1 rounded-lg ${getLevelColor(student.level)} font-medium`}>
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
            onClick={handleAddStudent}
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
