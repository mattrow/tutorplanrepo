import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/firebase/admin';
import { inngest } from '../../../../../../../../inngest/client';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; lessonId: string } }
) {
  try {
    const studentId = params.id;
    const lessonId = params.lessonId;

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

    // Enqueue an Inngest event to trigger the background function
    await inngest.send({
      name: 'app/lesson.generate',
      data: {
        userId,
        studentId,
        lessonId,
        topics,
      },
    });

    // Respond immediately to the client
    return NextResponse.json({ message: 'Lesson generation initiated.' });
  } catch (error) {
    console.error('Error initiating lesson generation:', error);
    return NextResponse.json(
      { error: 'Failed to initiate lesson generation' },
      { status: 500 }
    );
  }
}