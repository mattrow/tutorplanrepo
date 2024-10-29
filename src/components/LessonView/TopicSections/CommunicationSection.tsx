import React from 'react';
import { Dialogue, Scenario } from '@/types/lesson';

interface CommunicationSectionProps {
  dialogues: Dialogue[];
  scenarios: Scenario[];
  tips: string[];
}

const CommunicationSection: React.FC<CommunicationSectionProps> = ({
  dialogues,
  scenarios,
  tips,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Dialogues</h3>
        {dialogues.map((dialogue, index) => (
          <div key={index} className="mb-4">
            <p>
              <strong>{dialogue.role}:</strong> {dialogue.text}
            </p>
          </div>
        ))}
      </div>
      <div>
        <h3 className="text-lg font-semibold">Scenarios</h3>
        {scenarios.map((scenario, index) => (
          <div key={index} className="mb-4">
            <p className="font-semibold">{scenario.description}</p>
            <ul className="list-disc pl-5">
              {scenario.steps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div>
        <h3 className="text-lg font-semibold">Tips</h3>
        <ul className="list-disc pl-5">
          {tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommunicationSection; 