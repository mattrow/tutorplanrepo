'use client';

import Sidebar from '@/components/ui/Sidebar';
import SuggestionsPage from '@/components/dashboard/SuggestionsPage';

export default function Suggestions() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full">
        <SuggestionsPage />
      </div>
    </div>
  );
}