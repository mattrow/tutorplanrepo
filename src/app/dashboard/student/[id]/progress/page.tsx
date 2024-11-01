// src/app/dashboard/student/[id]/progress/page.tsx

'use client';

import React from 'react';
import Sidebar from '@/components/ui/Sidebar';
import ProgressPage from '@/components/dashboard/ProgressPage';

const Progress = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 w-full">
        <ProgressPage params={params} />
      </div>
    </div>
  );
};

export default Progress;