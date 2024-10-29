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

    // Initialize OpenAI API
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const generatedTopics = [];

    for (const topic of topics) {
      // For each topic, generate the lesson content
      const prompt = `You are an expert language tutor. Generate a detailed online one to one lesson plan for an adult learner for the topic "${topic.topicName}". Provide the following information in JSON format only, with keys exactly as specified:

{
  "title": "Title of the topic",
  "description": "Brief description of the topic",
  "teachingTips": "Suggestions on how to teach this topic effectively",
  "exercises": ["Exercise 1", "Exercise 2", "Exercise 3"]
}

Ensure the JSON is properly formatted, uses double quotes for keys and strings, and can be parsed by JSON parsers.
`;

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
        id: topic.id,
        title: parsedContent.title || topic.topicName,
        description: parsedContent.description || '',
        teachingTips: parsedContent.teachingTips || '',
        exercises: parsedContent.exercises || [],
      });
    }

    // Save the generated lesson to Firestore
    const lessonRef = firestore
      .collection('users')
      .doc(userId)
      .collection('students')
      .doc(studentId)
      .collection('lessons')
      .doc(params.lessonId);

    await lessonRef.set(
      {
        generated: true,
        generatedTopics, // Store the structured generated topics here
        createdAt: new Date().toISOString(),
        title: `Lesson ${params.lessonId}`, // You can adjust the title as needed
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