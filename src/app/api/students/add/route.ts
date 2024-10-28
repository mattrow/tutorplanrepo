import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, firestore } from '@/firebase/admin';
import { englishCurriculum } from '@/data/english-curriculum';

export async function POST(req: NextRequest) {
  try {
    // Verify the Firebase token
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await adminAuth.verifyIdToken(token);
    const userId = decodedToken.uid;

    // Get the student data from the request
    const studentData = await req.json();
    const now = new Date().toISOString();

    // Add timestamp and initial values
    const studentWithTimestamp = {
      ...studentData,
      completedLessons: 0,
      startDate: now,
      createdAt: now,
      updatedAt: now,
      currentLevel: studentData.level, // Store the current level
    };

    // Add to Firestore
    const studentRef = await firestore
      .collection('users')
      .doc(userId)
      .collection('students')
      .add(studentWithTimestamp);

    // Create the subject > language > levels structure
    const subjectRef = studentRef.collection('subject');
    const languageRef = subjectRef.doc(studentData.language.toLowerCase());
    const levelsRef = languageRef.collection('levels');

    // Get curriculum data based on language and level
    let curriculumData;
    if (studentData.language.toLowerCase() === 'english') {
      curriculumData = englishCurriculum[studentData.level];
    }
    // Add more language curriculum conditions here as needed

    if (curriculumData) {
      // Create the level document with its topics
      await levelsRef.doc(studentData.level).set({
        topics: curriculumData.map(topic => ({
          id: `topic-${topic.order}`,
          topicName: topic.topicName,
          topicDescription: topic.topicDescription,
          order: topic.order,
          status: 'not started',
        })),
        startDate: now,
        completedTopics: 0,
        totalTopics: curriculumData.length,
      });
    }

    return NextResponse.json({
      success: true,
      studentId: studentRef.id,
    });

  } catch (error) {
    console.error('Error adding student:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error adding student' },
      { status: 500 }
    );
  }
}