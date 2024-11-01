import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, firestore } from '@/firebase/admin';
import { englishCurriculum } from '@/data/english-curriculum';
import { portugueseCurriculum } from '@/data/portuguese-curriculum';

// Define the order of levels
const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authenticate the user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await adminAuth.verifyIdToken(token);
    const userId = decodedToken.uid;

    const studentId = params.id;

    // Fetch the student document to get current level and language
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

    const currentLevel = studentData?.currentLevel || studentData?.level;
    const language = studentData?.language?.toLowerCase();

    // Determine the next level
    const currentLevelIndex = LEVELS.indexOf(currentLevel);
    if (currentLevelIndex === -1 || currentLevelIndex >= LEVELS.length - 1) {
      return NextResponse.json(
        { error: 'No next level available' },
        { status: 400 }
      );
    }
    const nextLevel = LEVELS[currentLevelIndex + 1];

    // Load the curriculum for the next level
    const curriculums: Record<string, any> = {
      english: englishCurriculum,
      portuguese: portugueseCurriculum,
      // Add more languages here as needed
    };

    const curriculum = curriculums[language];
    if (!curriculum) {
      return NextResponse.json(
        { error: 'Curriculum not found for the selected language' },
        { status: 400 }
      );
    }

    const curriculumData = curriculum[nextLevel];
    if (!curriculumData) {
      return NextResponse.json(
        { error: 'Curriculum data not found for the next level' },
        { status: 400 }
      );
    }

    // Process the curriculum data to create lessons

    // Sort topics by order
    const sortedTopics = curriculumData.sort((a: { order: number }, b: { order: number }) => a.order - b.order);

    // Group topics into lessons
    const topicsPerLesson = 2;
    const totalLessons = Math.ceil(sortedTopics.length / topicsPerLesson);
    const lessons = [];

    const now = new Date().toISOString();

    for (let i = 0; i < totalLessons; i++) {
      const lessonTopics = sortedTopics.slice(
        i * topicsPerLesson,
        (i + 1) * topicsPerLesson
      );

      lessons.push({
        id: (i + 1).toString(),
        number: i + 1,
        title: `Lesson ${i + 1}: ${lessonTopics
          .map((t: { topicName: string }) => t.topicName)
          .join(' & ')}`,
        date: new Date(
          Date.now() + i * 7 * 24 * 60 * 60 * 1000
        ).toISOString(),
        status: i === 0 ? 'upcoming' : 'planned',
        brief: lessonTopics.map((t: { topicDescription: string }) => t.topicDescription).join('\n'),
        topics: lessonTopics.map((t: { order: number; topicName: string; topicDescription: string; type: string }) => ({
          id: `topic-${t.order}`,
          topicName: t.topicName,
          topicDescription: t.topicDescription,
          order: t.order,
          status: 'not started',
          type: t.type,
          isUserAdded: false,
        })),
      });
    }

    // Save the new level lessons to Firestore under student's levels
    const subjectRef = studentRef.collection('subject');
    const languageRef = subjectRef.doc(language);
    const levelsRef = languageRef.collection('levels');

    await levelsRef.doc(nextLevel).set({
      lessons,
      startDate: now,
      completedTopics: 0,
      totalTopics: sortedTopics.length,
    });

    // Update student's currentLevel field
    await studentRef.update({
      currentLevel: nextLevel,
      level: nextLevel,
      // Reset any progress fields if needed
      completedLessons: 0,
      updatedAt: now,
    });

    return NextResponse.json({
      success: true,
      message: `Advanced to level ${nextLevel}`,
      newLevel: nextLevel,
    });

  } catch (error) {
    console.error('Error advancing to next level:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error advancing to next level' },
      { status: 500 }
    );
  }
}