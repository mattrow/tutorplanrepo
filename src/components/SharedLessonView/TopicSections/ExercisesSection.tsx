import React from 'react';
import { Exercise } from '@/types/lesson';
import { ListChecks, Lightbulb, HelpCircle } from 'lucide-react';

interface ExercisesSectionProps {
  exercises: Exercise[];
}

const ExercisesSection: React.FC<ExercisesSectionProps> = ({ exercises }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      {exercises.map((exercise, index) => (
        <div
          key={exercise.id}
          className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100 hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 bg-[#396afc] rounded-xl flex items-center justify-center text-white">
              <ListChecks className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-gray-900 text-xl">Exercise {index + 1}</h4>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 text-lg leading-relaxed">{exercise.question}</p>
          </div>

          {exercise.type === 'multiple-choice' && exercise.options && (
            <div className="space-y-3 mb-6">
              {exercise.options.map((option, optionIndex) => (
                <label
                  key={optionIndex}
                  className="flex items-center gap-4 p-4 rounded-xl border border-blue-100 bg-white hover:bg-blue-50 transition-colors cursor-pointer group"
                >
                  <div className="w-6 h-6 rounded-full border-2 border-[#396afc] flex items-center justify-center group-hover:bg-[#396afc] group-hover:border-transparent transition-colors">
                    <div className="w-3 h-3 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          )}

          {exercise.hint && (
            <div className="flex items-start gap-4 bg-blue-50/50 rounded-xl p-4 border border-blue-100">
              <HelpCircle className="w-6 h-6 text-[#396afc] flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm font-medium text-[#396afc] mb-1">Need a hint?</p>
                <p className="text-gray-600">{exercise.hint}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExercisesSection;