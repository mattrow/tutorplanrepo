import React, { useState, useEffect } from 'react';
import { BookOpen, Save } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface TeachingNotesProps {
  lessonId: string;
  onSave: (notes: string) => void;
}

const TeachingNotes = ({ lessonId, onSave }: TeachingNotesProps) => {
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const placeholderSuggestions = [
    "Student's pronunciation challenges",
    "Areas where additional practice is needed",
    "Successful teaching strategies used",
    "Cultural aspects discussed",
    "Homework assignments given",
    "Plans for next lesson"
  ].join('\n• ');

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(notes);
      // You could add a success toast here
    } catch (error) {
      console.error('Error saving notes:', error);
      // You could add an error toast here
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-[#396afc]" />
        <h3 className="text-lg font-semibold text-gray-900">Teaching Notes</h3>
      </div>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder={`Consider noting:\n• ${placeholderSuggestions}`}
        className="w-full h-48 p-4 border border-gray-200 rounded-lg text-gray-700 
                 focus:ring-2 focus:ring-[#396afc] focus:border-[#396afc]
                 placeholder:text-gray-400"
      />

      <div className="flex justify-end mt-4">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#396afc] text-white hover:bg-[#2948ff] font-satoshi-bold rounded-lg flex items-center gap-2"
        >
          {isSaving ? (
            'Saving...'
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Notes
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default TeachingNotes;
