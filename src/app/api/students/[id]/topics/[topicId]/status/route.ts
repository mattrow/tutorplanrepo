import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, firestore } from '@/firebase/admin';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; topicId: string } }
) {
  const studentId = params.id;
  const topicId = params.topicId;

  // Verify Firebase token
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split('Bearer ')[1];
  let decodedToken;
  try {
    decodedToken = await adminAuth.verifyIdToken(token);
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userId = decodedToken.uid;

  try {
    // Fetch the student's level document
    const studentRef = firestore
      .collection('users')
      .doc(userId)
      .collection('students')
      .doc(studentId);

    const studentDoc = await studentRef.get();

    if (!studentDoc.exists) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    const studentData = studentDoc.data();

    const subject = studentData?.language?.toLowerCase() || 'default_subject';
    const level = studentData?.level || 'default_level';

    // Fetch the level document
    const levelRef = studentRef
      .collection('subject')
      .doc(subject)
      .collection('levels')
      .doc(level);

    const levelDoc = await levelRef.get();

    if (!levelDoc.exists) {
      return NextResponse.json({ error: 'Level not found' }, { status: 404 });
    }

    const levelData = levelDoc.data();
    const existingLessons = levelData?.lessons || [];

    // Get the new status from the request body
    const { status } = await request.json();

    // Find and update the topic status
    let topicFound = false;

    const updatedLessons = existingLessons.map((lesson: any) => {
      const updatedTopics = lesson.topics.map((topic: any) => {
        if (topic.id === topicId) {
          topicFound = true;
          return { ...topic, status };
        }
        return topic;
      });
      return { ...lesson, topics: updatedTopics };
    });

    if (!topicFound) {
      return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
    }

    // Update the level document
    await levelRef.update({
      lessons: updatedLessons,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating topic status:', error);
    return NextResponse.json({ error: 'Failed to update topic status' }, { status: 500 });
  }
} 