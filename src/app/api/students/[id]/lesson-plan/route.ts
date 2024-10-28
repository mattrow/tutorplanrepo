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

    // Fetch topics from Firestore
    const levelRef = studentRef
      .collection('subject')
      .doc(language.toLowerCase())
      .collection('levels')
      .doc(currentLevel);

    const levelDoc = await levelRef.get();
    const levelData = levelDoc.data();

    if (!levelData || !levelData.topics) {
      return NextResponse.json({ error: 'No topics found' }, { status: 404 });
    }

    // Sort topics by order
    const sortedTopics = levelData.topics
      .sort((a: any, b: any) => a.order - b.order)
      .filter((topic: any) => !topic.isDeleted);

    // Group topics into lessons with 2 topics each
    const lessons = [];
    const topicsPerLesson = 2;
    const totalLessons = Math.ceil(sortedTopics.length / topicsPerLesson);

    for (let i = 0; i < totalLessons; i++) {
      const lessonTopics = sortedTopics.slice(i * topicsPerLesson, (i + 1) * topicsPerLesson);

      lessons.push({
        id: (i + 1).toString(),
        number: i + 1,
        title: `Lesson ${i + 1}: ${lessonTopics.map((t: any) => t.topicName).join(' & ')}`,
        date: new Date(Date.now() + i * 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: i === 0 ? 'upcoming' : 'planned',
        topics: lessonTopics.map((t: any) => ({
          id: t.id || `topic-${t.order}`,
          topicName: t.topicName,
          topicDescription: t.topicDescription,
          order: t.order,
          status: t.status,
        })),
        brief: lessonTopics.map((t: any) => t.topicDescription).join('\n'),
      });
    }

    return NextResponse.json({ lessons });
  } catch (error) {
    console.error('Error fetching lesson plan:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lesson plan' },
      { status: 500 }
    );
  }
}