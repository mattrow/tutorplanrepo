import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, firestore } from '@/firebase/admin';
import { Lesson, Topic } from '@/types/lesson';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; lessonId: string } }
) {
  console.log('API route called with params:', params);

  try {
    const studentId = params.id;
    const lessonId = params.lessonId;

    // Verify Firebase token
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      console.error('Unauthorized: Missing or invalid Authorization header');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    let decodedToken;
    try {
      decodedToken = await adminAuth.verifyIdToken(token);
    } catch (error) {
      console.error('Invalid token:', error);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = decodedToken.uid;

    console.log('User ID:', userId);

    // Fetch the student document to get subject and level
    const studentRef = firestore
      .collection('users')
      .doc(userId)
      .collection('students')
      .doc(studentId);

    const studentDoc = await studentRef.get();

    if (!studentDoc.exists) {
      console.error('Student not found:', studentId);
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    const studentData = studentDoc.data();

    const subject = studentData?.language?.toLowerCase() || 'default_subject'; // e.g., 'portuguese'
    const level = studentData?.level || 'default_level'; // e.g., 'B2'

    console.log('Subject:', subject, 'Level:', level);

    // Now fetch the lesson document
    const lessonRef = studentRef.collection('lessons').doc(lessonId);
    const lessonDoc = await lessonRef.get();

    if (!lessonDoc.exists) {
      console.error('Lesson not found:', lessonId);
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    const lessonData = lessonDoc.data() as Lesson;

    // Get the updated topics and confirmation status from the request body
    const { updatedTopics, confirmLesson } = await request.json();

    console.log('Received updated topics:', updatedTopics);
    console.log('Confirm Lesson:', confirmLesson);

    // Update the topics and confirmation status in the lesson document
    const updateData: Partial<Lesson> = {
      updatedAt: new Date().toISOString(),
    };

    if (updatedTopics) {
      updateData.generatedTopics = updatedTopics;
    }

    if (confirmLesson) {
      updateData.confirmed = true;
    }

    await lessonRef.update(updateData);
    console.log('Updated lesson in Firestore with:', updateData);

    // Proceed to update the topics in the student's level document only if topics are provided
    if (updatedTopics) {
      const levelRef = studentRef
        .collection('subject')
        .doc(subject)
        .collection('levels')
        .doc(level);

      const levelDoc = await levelRef.get();
      console.log('Level document exists:', levelDoc.exists);

      if (levelDoc.exists) {
        const levelData = levelDoc.data();
        const existingLessons = levelData?.lessons || [];

        console.log('Existing lessons:', existingLessons);

        // Update topics in the matching lesson within the level
        const updatedLessons = existingLessons.map((lesson: any) => {
          if (lesson.id === lessonId) {
            const updatedLessonTopics = lesson.topics.map((topic: Topic) => {
              const updatedTopic = updatedTopics.find((ut: Topic) => ut.id === topic.id);
              if (updatedTopic) {
                console.log(
                  `Updating topic ${topic.id} status to ${updatedTopic.status}`
                );
                return { ...topic, status: updatedTopic.status };
              }
              return topic;
            });
            return { ...lesson, topics: updatedLessonTopics };
          }
          return lesson;
        });

        console.log('Updated lessons to be saved:', updatedLessons);

        try {
          await levelRef.update({
            lessons: updatedLessons,
            updatedAt: new Date().toISOString(),
          });
          console.log('Updated level lessons in Firestore');
        } catch (error) {
          console.error('Error updating level lessons:', error);
        }
      } else {
        console.error('Level document not found for level:', level);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error completing lesson:', error);
    return NextResponse.json({ error: 'Failed to complete lesson' }, { status: 500 });
  }
}