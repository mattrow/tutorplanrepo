import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, firestore } from '@/firebase/admin';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; lessonId: string } }
) {
  try {
    const studentId = params.id;
    const lessonId = params.lessonId;

    const authHeader = request.headers.get('Authorization');
    let userId = null;

    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split('Bearer ')[1];
      const decodedToken = await adminAuth.verifyIdToken(token);
      userId = decodedToken.uid;
    }

    const lessonRef = firestore
      .collection('users')
      .doc(userId || 'unknown')
      .collection('students')
      .doc(studentId)
      .collection('lessons')
      .doc(lessonId);

    const lessonDoc = await lessonRef.get();

    if (!lessonDoc.exists) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    const lessonData = lessonDoc.data();

    if (!lessonData) {
      return NextResponse.json({ error: 'Lesson data not found' }, { status: 404 });
    }

    if (lessonData.public !== true && (!userId || userId !== lessonData.ownerId)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ lesson: lessonData });
  } catch (error) {
    console.error('Error fetching lesson:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lesson' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string; lessonId: string } }
) {
  try {
    const studentId = params.id;
    const lessonId = params.lessonId;

    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await adminAuth.verifyIdToken(token);
    const userId = decodedToken.uid;

    const lessonRef = firestore
      .collection('users')
      .doc(userId)
      .collection('students')
      .doc(studentId)
      .collection('lessons')
      .doc(lessonId);

    const lessonDoc = await lessonRef.get();

    if (!lessonDoc.exists) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    const { public: isPublic } = await request.json();

    await lessonRef.update({ public: isPublic, updatedAt: new Date().toISOString() });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating lesson:', error);
    return NextResponse.json({ error: 'Failed to update lesson' }, { status: 500 });
  }
}