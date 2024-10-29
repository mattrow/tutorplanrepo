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
      // Sort topics by order
      const sortedTopics = curriculumData.sort((a, b) => a.order - b.order);

      // Group topics into initial lessons based on your preference
      const topicsPerLesson = 2;
      const totalLessons = Math.ceil(sortedTopics.length / topicsPerLesson);
      const lessons = [];

      for (let i = 0; i < totalLessons; i++) {
        const lessonTopics = sortedTopics.slice(
          i * topicsPerLesson,
          (i + 1) * topicsPerLesson
        );

        lessons.push({
          id: (i + 1).toString(),
          number: i + 1,
          title: `Lesson ${i + 1}: ${lessonTopics
            .map((t) => t.topicName)
            .join(' & ')}`,
          date: new Date(
            Date.now() + i * 7 * 24 * 60 * 60 * 1000
          ).toISOString(),
          status: i === 0 ? 'upcoming' : 'planned',
          brief: lessonTopics.map((t) => t.topicDescription).join('\n'),
          topics: lessonTopics.map((t) => ({
            id: `topic-${t.order}`,
            topicName: t.topicName,
            topicDescription: t.topicDescription,
            order: t.order,
            status: 'not started',
            isUserAdded: false,
          })),
        });
      }

      // Save the lessons to Firestore
      await levelsRef.doc(studentData.level).set({
        lessons,
        startDate: now,
        completedTopics: 0,
        totalTopics: sortedTopics.length,
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