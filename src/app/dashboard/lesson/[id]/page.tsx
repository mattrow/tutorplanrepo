'use client';
import { useRouter } from 'next/navigation';
import LessonView from '@/components/LessonView/LessonView';
import Sidebar from '@/components/ui/Sidebar';

export default function LessonPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full">
        <LessonView
          lessonId={params.id}
          onClose={() => router.push('/dashboard')}
        />
      </div>
    </div>
  );
}
