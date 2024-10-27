'use client';
import { useRouter } from 'next/navigation';
import AddStudentForm from '@/components/dashboard/AddStudentForm';
import Sidebar from '@/components/ui/Sidebar';

export default function AddStudentPage() {
  const router = useRouter();
  
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full">
        <AddStudentForm
          onBack={() => router.push('/dashboard')}
        />
      </div>
    </div>
  );
}
