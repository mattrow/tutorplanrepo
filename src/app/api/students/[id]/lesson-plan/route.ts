import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, firestore } from '@/firebase/admin';

export async function GET(
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

    // Fetch student's current level and language
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

    // Fetch lessons from Firestore
    const levelRef = studentRef
      .collection('subject')
      .doc(language.toLowerCase())
      .collection('levels')
      .doc(currentLevel);

    const levelDoc = await levelRef.get();
    const levelData = levelDoc.data();

    if (!levelData || !levelData.lessons) {
      return NextResponse.json({ error: 'No lessons found' }, { status: 404 });
    }

    // Get the lessons as stored
    const lessons = levelData.lessons.map((lesson: any) => ({
      id: lesson.id,
      number: lesson.number,
      title: lesson.title,
      date: lesson.date,
      status: lesson.status,
      brief: lesson.brief,
      topics: lesson.topics.map((t: any) => ({
        id: t.id,
        topicName: t.topicName,
        topicDescription: t.topicDescription,
        order: t.order,
        status: t.status,
        isUserAdded: t.isUserAdded || false,
      })),
    }));

    return NextResponse.json({ lessons });
  } catch (error) {
    console.error('Error fetching lesson plan:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lesson plan' },
      { status: 500 }
    );
  }
}