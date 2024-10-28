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

    const levelDoc = await levelRef.get();
    const levelData = levelDoc.data();

    if (!levelData || !levelData.topics) {
      return NextResponse.json({ error: 'No topics found' }, { status: 404 });
    }

    const { lessons } = await request.json();

    const existingTopics = levelData.topics;

    const updatedTopics = existingTopics.map((curriculumTopic: any) => {
      const updatedTopic = lessons
        .flatMap((lesson: any) => lesson.topics)
        .find((topic: any) => topic.id === curriculumTopic.id);

      if (updatedTopic) {
        return {
          ...curriculumTopic,
          order: updatedTopic.order,
          status: updatedTopic.status,
        };
      }

      return curriculumTopic;
    });

    const userAddedTopics = lessons
      .flatMap((lesson: any) => lesson.topics)
      .filter((topic: any) => topic.isUserAdded);

    const allTopics = [...updatedTopics, ...userAddedTopics];

    await levelRef.update({
      topics: allTopics,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating topic order:', error);
    return NextResponse.json(
      { error: 'Failed to update topic order' },
      { status: 500 }
    );
  }
}
