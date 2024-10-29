import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, firestore } from '@/firebase/admin';
import OpenAI from 'openai';
import { v4 as uuidv4 } from 'uuid';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; lessonId: string } }
) {
  try {
    // Extract studentId from params
    const studentId = params.id;

    // Verify Firebase token
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await adminAuth.verifyIdToken(token);
    const userId = decodedToken.uid;

    // Parse request body
    const { topics } = await request.json();

    // **Fetch student's current level**
    const studentRef = firestore
      .collection('users')
      .doc(userId)
      .collection('students')
      .doc(studentId);

    const studentDoc = await studentRef.get();

    if (!studentDoc.exists) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    const studentData = studentDoc.data();
    const studentLevel = studentData?.level || 'A1'; // Default to 'A1' if level not found

    // Initialize OpenAI API
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const generatedTopics = [];

    for (const topic of topics) {
      // **Updated OpenAI prompt**
      const prompt = `You are an expert language tutor specializing in teaching students at the ${studentLevel} level. Generate detailed online one-to-one lesson content for an adult learner on the topic "${topic.topicName}". The lesson should be appropriate for a student at level ${studentLevel}.

Provide the following information in JSON format only, with keys exactly as specified:

{
  "id": "${topic.id}",
  "title": "Title of the topic",
  "introduction": {
    "explanation": "An explanation of the topic suitable for ${studentLevel} level",
    "keyPoints": ["Key point 1", "Key point 2", "Key point 3"]
  },
  "inDepth": "In-depth content to gain a solid understanding of the topic. Include subheadings, bullet points, and break up the text into short paragraphs. Use language appropriate for ${studentLevel} level students.",
  "examples": [
    // Provide around 10 examples in the following format
    {
      "context": "Optional context or scenario",
      "correct": "Correct example sentence or usage",
      "incorrect": "Incorrect example sentence or common mistake",
      "explanation": "Explanation of why it's correct or incorrect"
    }
    // More examples as needed
  ],
  "exercises": [
    // Provide around 10 exercises in the following format
    {
      "id": "Unique ID for the exercise",
      "question": "Exercise question",
      "type": "multiple-choice", // or "fill-in-the-blank", etc.
      "options": ["Option 1", "Option 2", "Option 3"], // For multiple-choice questions
      "hint": "Optional hint for the exercise"
    }
    // More exercises as needed
  ]
}

Ensure the JSON is properly formatted, uses double quotes for keys and strings, and can be parsed by JSON parsers. Don't include any explanations outside the JSON.`;

      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an assistant that only replies in JSON format.' },
          { role: 'user', content: prompt },
        ],
      });

      const content = response.choices[0].message?.content?.trim();

      // Parse the JSON content
      let parsedContent;
      try {
        parsedContent = JSON.parse(content || '');
      } catch (e) {
        console.error('Failed to parse OpenAI response as JSON:', e);
        return NextResponse.json(
          { error: 'Failed to parse OpenAI response' },
          { status: 500 }
        );
      }

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
    const lessonRef = studentRef
      .collection('lessons')
      .doc(params.lessonId);

    await lessonRef.set(
      {
        generated: true,
        generatedTopics,
        createdAt: new Date().toISOString(),
        title: `Lesson ${params.lessonId}`,
      },
      { merge: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error generating lesson:', error);
    return NextResponse.json(
      { error: 'Failed to generate lesson' },
      { status: 500 }
    );
  }
}