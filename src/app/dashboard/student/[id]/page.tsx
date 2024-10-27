'use client';
import { useRouter } from 'next/navigation';
import StudentProfile from '@/components/student-profile/StudentProfile';
import Sidebar from '@/components/ui/Sidebar';

export default function StudentPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full">
        <StudentProfile
          studentId={params.id}
          onBack={() => router.push('/dashboard')}
        />
      </div>
    </div>
  );
}
