import React from 'react';
import { Exercise } from '@/types/lesson';
import { ListChecks, Lightbulb } from 'lucide-react';

interface ExercisesSectionProps {
  exercises: Exercise[];
}

const ExercisesSection: React.FC<ExercisesSectionProps> = ({ exercises }) => {
  return (
    <div className="space-y-6">
      {exercises.map((exercise, index) => (
        <div key={exercise.id} className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-start gap-2 mb-4">
            <ListChecks className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
            <h4 className="font-semibold text-gray-900">Exercise {index + 1}</h4>
          </div>

          <p className="text-gray-700 mb-4">{exercise.question}</p>

          {exercise.type === 'multiple-choice' && exercise.options && (
            <div className="space-y-2 mb-4">
              {exercise.options.map((option, optionIndex) => (
                <label key={optionIndex} className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100">
                  <input type="radio" name={`exercise-${exercise.id}`} className="text-indigo-600" />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          )}

          {exercise.hint && (
            <div className="flex items-center gap-2 text-indigo-600 text-sm">
              <Lightbulb className="w-4 h-4" />
              <span>Hint: {exercise.hint}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExercisesSection; 