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
      const prompt = `Generate a detailed lesson plan for the topic "${topic.topicName}". Include:
- Topic Title
- Topic Brief
- Example of how to explain this topic
- Example exercises`;

      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an expert educator.' },
          { role: 'user', content: prompt },
        ],
      });

      const content = response.choices[0].message?.content;

      generatedTopics.push({
        id: topic.id,
        title: topic.topicName,
        content,
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

    await lessonRef.set({
      generated: true,
      generatedTopics, // Store the generated topics here
      createdAt: new Date().toISOString(),
      title: `Lesson ${params.lessonId}`, // You can adjust the title as needed
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error generating lesson:', error);
    return NextResponse.json(
      { error: 'Failed to generate lesson' },
      { status: 500 }
    );
  }
}