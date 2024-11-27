import React, { useState } from 'react';
import { Exercise } from '@/types/lesson';
import { ListChecks, HelpCircle } from 'lucide-react';

interface ExercisesSectionProps {
  exercises: Exercise[];
}

const ExercisesSection: React.FC<ExercisesSectionProps> = ({ exercises }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      {exercises.map((exercise, index) => (
        <ExerciseItem key={exercise.id} exercise={exercise} index={index} />
      ))}
    </div>
  );
};

const ExerciseItem: React.FC<{ exercise: Exercise; index: number }> = ({ exercise, index }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const isAnswerSelected = selectedOption !== null;
  const isCorrect = selectedOption === exercise.correctOptionIndex;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100 hover:shadow-md transition-all duration-200">
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
              className={`flex items-center gap-4 p-4 rounded-xl border ${
                isAnswerSelected
                  ? optionIndex === exercise.correctOptionIndex
                    ? 'border-green-500 bg-green-50'
                    : optionIndex === selectedOption
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200'
                  : 'border-blue-100 bg-white hover:bg-blue-50'
              } transition-colors cursor-pointer group`}
            >
              <input
                type="radio"
                name={`exercise-${exercise.id}`}
                value={optionIndex}
                onChange={() => setSelectedOption(optionIndex)}
                disabled={isAnswerSelected}
                className="hidden"
              />
              <div
                className={`w-6 h-6 rounded-full border-2 ${
                  isAnswerSelected
                    ? optionIndex === exercise.correctOptionIndex
                      ? 'border-green-500 bg-green-500'
                      : optionIndex === selectedOption
                      ? 'border-red-500 bg-red-500'
                      : 'border-gray-300'
                    : 'border-[#396afc] group-hover:bg-[#396afc]'
                } flex items-center justify-center transition-colors`}
              >
                {isAnswerSelected && (optionIndex === exercise.correctOptionIndex || optionIndex === selectedOption) && (
                  <div className="w-3 h-3 rounded-full bg-white" />
                )}
              </div>
              <span
                className={`text-gray-700 group-hover:text-gray-900 transition-colors ${
                  isAnswerSelected && optionIndex === exercise.correctOptionIndex
                    ? 'text-green-700 font-semibold'
                    : isAnswerSelected && optionIndex === selectedOption
                    ? 'text-red-700'
                    : ''
                }`}
              >
                {option}
              </span>
            </label>
          ))}
        </div>
      )}

      {/* Show hint or feedback */}
      {isAnswerSelected && !isCorrect && exercise.hint && (
        <div className="flex items-start gap-4 bg-blue-50/50 rounded-xl p-4 border border-blue-100 mt-4">
          <HelpCircle className="w-6 h-6 text-[#396afc] flex-shrink-0 mt-1" />
          <div>
            <p className="text-sm font-medium text-[#396afc] mb-1">Need a hint?</p>
            <p className="text-gray-600">{exercise.hint}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExercisesSection;