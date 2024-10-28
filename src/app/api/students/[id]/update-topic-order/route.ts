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

    // Flatten the topics and update their orders
    const updatedTopics = lessons.flatMap((lesson: any, lessonIndex: number) =>
      lesson.topics.map((topic: any, topicIndex: number) => ({
        id: topic.id, // Include the ID
        topicName: topic.topicName,
        topicDescription: topic.topicDescription,
        order: lessonIndex * 2 + topicIndex + 1, // Recalculate order
        status: topic.status,
      }))
    );

    // Update the topics in Firestore
    await levelRef.update({
      topics: updatedTopics,
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
