import React, { useState } from 'react';
import { Check, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface Topic {
  id: number;
  title: string;
  teachingStrategy: string;
  exercises: string[];
  status?: 'completed' | 'in-progress' | 'pending';
  understanding?: 'good' | 'needs-review';
}

interface TopicProgressProps {
  topic: Topic;
  onStatusChange: (status: 'completed' | 'in-progress' | 'pending') => void;
  onUnderstandingChange: (understanding: 'good' | 'needs-review') => void;
}

const TopicProgress = ({ topic, onStatusChange, onUnderstandingChange }: TopicProgressProps) => {
  const [isCovered, setIsCovered] = useState(topic.status === 'completed');
  const [understanding, setUnderstanding] = useState<'good' | 'needs-review' | null>(
    topic.understanding || null
  );

  const handleStatusChange = (checked: boolean) => {
    setIsCovered(checked);
    onStatusChange(checked ? 'completed' : 'pending');
  };

  const handleUnderstanding = (value: 'good' | 'needs-review') => {
    setUnderstanding(value);
    onUnderstandingChange(value);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          <div className="pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isCovered}
                onChange={(e) => handleStatusChange(e.target.checked)}
                className="w-5 h-5 rounded-lg border-gray-300 text-[#396afc] 
                         focus:ring-[#396afc] cursor-pointer"
              />
            </label>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{topic.title}</h3>
            <p className="text-gray-600 mb-4">{topic.teachingStrategy}</p>
            
            <div className="space-y-2">
              <h4 className="font-medium text-gray-700">Suggested Exercises:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {topic.exercises.map((exercise, index) => (
                  <li key={index} className="pl-2">{exercise}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {isCovered && (
          <div className="flex gap-2">
            <Button
              onClick={() => handleUnderstanding('good')}
              variant="outline"
              className={`p-2 rounded-lg ${
                understanding === 'good'
                  ? 'bg-green-50 border-green-200 text-green-600 hover:bg-green-100'
                  : 'border-gray-200 text-gray-400 hover:bg-gray-50'
              }`}
            >
              <ThumbsUp className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => handleUnderstanding('needs-review')}
              variant="outline"
              className={`p-2 rounded-lg ${
                understanding === 'needs-review'
                  ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'
                  : 'border-gray-200 text-gray-400 hover:bg-gray-50'
              }`}
            >
              <ThumbsDown className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicProgress;
