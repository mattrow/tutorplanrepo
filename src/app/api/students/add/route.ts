import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, firestore } from '@/firebase/admin';
import { englishCurriculum } from '@/data/english-curriculum';
import { portugueseCurriculum } from '@/data/portuguese-curriculum';

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

    // Create a mapping of curriculums
    const curriculums: Record<string, any> = {
      english: englishCurriculum,
      portuguese: portugueseCurriculum,
      // Add more languages here as needed
    };

    // Get the student data from the request
    const studentData = await req.json();

    // Validate startDate
    if (!studentData.startDate) {
      return NextResponse.json(
        { error: 'Start date is required' },
        { status: 400 }
      );
    }

    // Parse the startDate to a valid date string
    const startDate = new Date(`${studentData.startDate}-01T00:00:00Z`).toISOString();

    // Get curriculum data based on language and level
    const languageKey = studentData.language.toLowerCase();
    const curriculum = curriculums[languageKey];

    if (curriculum) {
      const curriculumData = curriculum[studentData.level];

      if (curriculumData) {
        // Sort topics by order
        const sortedTopics = curriculumData.sort((a: { order: number; }, b: { order: number; }) => a.order - b.order);

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
              .map((t: { topicName: any; }) => t.topicName)
              .join(' & ')}`,
            date: new Date(
              Date.now() + i * 7 * 24 * 60 * 60 * 1000
            ).toISOString(),
            status: i === 0 ? 'upcoming' : 'planned',
            brief: lessonTopics.map((t: { topicDescription: any; }) => t.topicDescription).join('\n'),
            topics: lessonTopics.map((t: { order: any; topicName: any; topicDescription: any; type: any; }) => ({
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

        // Save the lessons to Firestore
        const studentRef = await firestore
          .collection('users')
          .doc(userId)
          .collection('students')
          .add({
            ...studentData,
            completedLessons: 0,
            startDate: startDate,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            currentLevel: studentData.level,
          });

        const subjectRef = studentRef.collection('subject');
        const languageRef = subjectRef.doc(languageKey);
        const levelsRef = languageRef.collection('levels');

        await levelsRef.doc(studentData.level).set({
          lessons,
          startDate: startDate,
          completedTopics: 0,
          totalTopics: sortedTopics.length,
        });

        return NextResponse.json({
          success: true,
          studentId: studentRef.id,
        });
      } else {
        return NextResponse.json(
          { error: 'Curriculum data not found for the selected level' },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { error: 'Curriculum not found for the selected language' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Error adding student:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error adding student' },
      { status: 500 }
    );
  }
}