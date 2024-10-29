import React from 'react';
import { VocabularyWord } from '@/types/lesson';
import ReactMarkdown from 'react-markdown';

interface VocabularySectionProps {
  vocabularyList: VocabularyWord[];
}

const VocabularySection: React.FC<VocabularySectionProps> = ({ vocabularyList }) => {
  const markdownTable = `
| Word | Translation | Example Sentence |
|------|-------------|------------------|
${vocabularyList
  .map(
    (word) =>
      `| ${word.word} | ${word.translation} | ${word.exampleSentence} |`
  )
  .join('\n')}
`;

  return (
    <div className="prose prose-indigo max-w-none">
      <ReactMarkdown>{markdownTable}</ReactMarkdown>
    </div>
  );
};

export default VocabularySection; 