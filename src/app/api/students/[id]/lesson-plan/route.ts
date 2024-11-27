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

    const levelDoc = await levelRef.get();
    const levelData = levelDoc.data();

    if (!levelData || !levelData.lessons) {
      return NextResponse.json({ error: 'No lessons found' }, { status: 404 });
    }

    const lessons = await Promise.all(
      levelData.lessons.map(async (lesson: any) => {
        const lessonRef = studentRef.collection('lessons').doc(lesson.id);
        const lessonDoc = await lessonRef.get();
        const generated = lessonDoc.exists && lessonDoc.data()?.generated === true;

        return {
          id: lesson.id,
          number: lesson.number,
          title: lesson.title,
          date: lesson.date,
          status: lesson.status,
          brief: lesson.brief,
          generated,
          topics: lesson.topics.map((t: any) => ({
            id: t.id,
            topicName: t.topicName,
            topicDescription: t.topicDescription,
            order: t.order,
            status: t.status,
            type: t.type,
            isUserAdded: t.isUserAdded || false,
          })),
        };
      })
    );

    lessons.sort((a, b) => a.number - b.number);

    return NextResponse.json({ lessons });
  } catch (error) {
    console.error('Error fetching lesson plan:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lesson plan' },
      { status: 500 }
    );
  }
}