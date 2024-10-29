import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, firestore } from '@/firebase/admin';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await adminAuth.verifyIdToken(token);
    const userId = decodedToken.uid;

    const studentRef = firestore
      .collection('users')
      .doc(userId)
      .collection('students')
      .doc(params.id);

    const studentDoc = await studentRef.get();
    const studentData = studentDoc.data();

    if (!studentData) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    const { currentLevel, language } = studentData;

    const levelRef = studentRef
      .collection('subject')
      .doc(language.toLowerCase())
      .collection('levels')
      .doc(currentLevel);

    const { lessons } = await request.json();

    // Update the level document to include the lessons as they are
    await levelRef.update({
      lessons: lessons.map((lesson: any) => ({
        id: lesson.id,
        number: lesson.number,
        title: lesson.title,
        date: lesson.date,
        status: lesson.status,
        brief: lesson.brief,
        topics: lesson.topics.map((topic: any) => ({
          id: topic.id,
          topicName: topic.topicName,
          topicDescription: topic.topicDescription,
          order: topic.order,
          status: topic.status,
          isUserAdded: topic.isUserAdded || false,
        })),
      })),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating lesson data:', error);
    return NextResponse.json(
      { error: 'Failed to update lesson data' },
      { status: 500 }
    );
  }
}
