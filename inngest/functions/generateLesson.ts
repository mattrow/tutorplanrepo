import { inngest } from '../client';
import { firestore } from '@/firebase/admin';
import { Topic } from '@/types/lesson';
import OpenAI from 'openai';

export const generateLesson = inngest.createFunction(
  { id: 'Generate Lesson' },
  { event: 'app/lesson.generate' },
  async ({ event, step }) => {
    const { userId, studentId, lessonId, topics } = event.data;

    try {
      // Initialize OpenAI API
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      // Fetch student's current level, native language, and learning language
      const studentRef = firestore
        .collection('users')
        .doc(userId)
        .collection('students')
        .doc(studentId);

      const studentDoc = await studentRef.get();

      if (!studentDoc.exists) {
        throw new Error('Student not found');
      }

      const studentData = studentDoc.data();
      const studentLevel = studentData?.level || 'A1';
      const studentNativeLanguage = studentData?.nativeLanguage || 'English';
      const studentLearningLanguage = studentData?.language || 'English';

      const generatedTopics = [];

      for (const topic of topics) {
        // Construct your OpenAI prompt
        const prompt = `You are an expert ${studentLearningLanguage} tutor specializing in teaching students at the ${studentLevel} level. Your student's native language is ${studentNativeLanguage}.

**Important Instructions:**
- **All explanations must be in English.**
- **All content (vocabulary words, phrases, grammar points, example sentences, and exercises) must be in ${studentLearningLanguage}.**
- Provide **translations or brief explanations in ${studentNativeLanguage}** where particularly helpful.
- The lesson should be appropriate for a student at level **${studentLevel}**.
- **The "inDepth" section must be entirely in English except for examples and specific terms in ${studentLearningLanguage}. Do not include full sentences or paragraphs in ${studentLearningLanguage} in this section.**

Generate detailed online one-to-one lesson content for an adult learner on the topic "**${topic.topicName}**".

Provide the following information in **JSON format only**, with keys exactly as specified:

{
  "id": "${topic.id}",
  "title": "Title of the topic",
  "introduction": {
    "explanation": "An explanation of the topic in English suitable for ${studentLevel} level.",
    "keyPoints": ["Key point 1 in English", "Key point 2 in English", "Key point 3 in English"]
  },
  "inDepth": "In-depth content in **English** explaining the **${studentLearningLanguage}** concepts related to the topic. Generate no less than 1000 words of content in this section.

- **Structure the content with appropriate headings and subheadings using Markdown syntax**:
  - Use \`#\` for main titles.
  - Use \`##\` for section titles.
  - Use \`###\` for subsection titles.
- **Include examples in ${studentLearningLanguage}** with explanations in English.
- **Include extra line breaks between sections to improve readability**.
- **Use bullet points (using -, *, or +) where appropriate**.
- **Break up the text into short paragraphs (2-3 sentences per paragraph)**.
- **Use bold text for key terms or important concepts in ${studentLearningLanguage}** (enclosed in \`**bold**\`).
- **Provide translations or explanations in ${studentNativeLanguage}** where particularly helpful.
- **Use language appropriate for ${studentLevel} level students**.

**Example Usage**:

- "**Olá** (Hello): Used to greet someone in Portuguese."
- "**Bom dia** (Good morning): A polite way to greet in the morning."

Ensure the content follows this structure. Do not include the example in the output.",
  "examples": [
    {
      "context": "Optional context or scenario in English",
      "correct": "Correct example sentence or usage in ${studentLearningLanguage}",
      "incorrect": "Incorrect example sentence or common mistake in ${studentLearningLanguage}",
      "explanation": "Explanation in English of why it's correct or incorrect. Include translations in ${studentNativeLanguage} where helpful."
    }
    // Include around 5-7 examples in this format
  ],
  "exercises": [
    {
      "id": "Unique ID for the exercise",
      "question": "Exercise question in English.",
      "type": "multiple-choice",
      "options": ["Option 1 in ${studentLearningLanguage}", "Option 2 in ${studentLearningLanguage}", "Option 3 in ${studentLearningLanguage}"],
      "hint": "Optional hint for the exercise, in English. Provide translations in ${studentNativeLanguage} where helpful."
    }
    // Include around 5-7 exercises in this format
  ]
}

Ensure the JSON is properly formatted, uses double quotes for keys and strings, and can be parsed by JSON parsers. Do not include any comments, code fences, extra text, or explanations within or outside the JSON. Only output the JSON object.`;

        // OpenAI API call with updated system message
        const response = await openai.chat.completions.create({
          model: 'gpt-4o-mini', // or whichever model you are using
          messages: [
            {
              role: 'system',
              content: `You are an assistant that only replies in JSON format.

**Instructions**:
- **All explanations must be in English.**
- **All content (vocabulary words, phrases, grammar points, example sentences, and exercises) must be in ${studentLearningLanguage}.**
- **The "inDepth" section must be entirely in English except for examples and specific terms in ${studentLearningLanguage}. Do not include full sentences or paragraphs in ${studentLearningLanguage} in this section.**
- Ensure that the JSON is properly formatted, uses double quotes for keys and strings, and can be parsed by JSON parsers.
- Do not include any code fences, backticks, or comments outside of the JSON content.
- The "inDepth" field should be a string containing Markdown-formatted text.
- Only output the JSON object with no additional text.`,
            },
            { role: 'user', content: prompt },
          ],
          temperature: 0.7,
          max_tokens: 4000,
          top_p: 1,
        });

        let content = response.choices[0].message?.content?.trim() ?? '';

        // Process the response to extract JSON content
        // Since the assistant is instructed to only output the JSON, we can try parsing it directly
        let parsedContent;
        try {
          parsedContent = JSON.parse(content);
        } catch (parseError) {
          // If parsing fails, try to extract JSON snippet from the response
          const jsonMatch = content.match(/{[\s\S]*}/);
          if (jsonMatch) {
            try {
              parsedContent = JSON.parse(jsonMatch[0]);
            } catch (jsonParseError) {
              throw new Error('Failed to parse JSON from OpenAI response');
            }
          } else {
            throw new Error('No JSON found in OpenAI response');
          }
        }

        // Push the parsed content to generatedTopics
        generatedTopics.push({
          id: parsedContent.id || topic.id,
          title: parsedContent.title || topic.topicName,
          introduction: parsedContent.introduction || {},
          inDepth: parsedContent.inDepth || '',
          examples: parsedContent.examples || [],
          exercises: parsedContent.exercises || [],
        });
      }

      // Save the generated lesson to Firestore
      const lessonRef = studentRef.collection('lessons').doc(lessonId);

      await lessonRef.set(
        {
          generated: true,
          ownerId: userId,
          generatedTopics,
          public: false,
          createdAt: new Date().toISOString(),
          title: `Lesson ${lessonId}`,
        },
        { merge: true }
      );
    } catch (error) {
      console.error('Error generating lesson:', error);
      // Optionally, update Firestore with an error status
      const lessonRef = firestore
        .collection('users')
        .doc(userId)
        .collection('students')
        .doc(studentId)
        .collection('lessons')
        .doc(lessonId);

      await lessonRef.set(
        {
          generated: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    }
  }
);
