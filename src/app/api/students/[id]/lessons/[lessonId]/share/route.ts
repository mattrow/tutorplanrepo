// src/app/api/students/[id]/lessons/[lessonId]/share/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, firestore } from '@/firebase/admin';
import { slugify } from '@/utils/slugify';
import { Lesson } from '@/types/lesson';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; lessonId: string } }
) {
  try {
    const studentId = params.id;
    const lessonId = params.lessonId;

    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await adminAuth.verifyIdToken(token);
    const userId = decodedToken.uid;

    // Fetch the lesson data
    const lessonRef = firestore
      .collection('users')
      .doc(userId)
      .collection('students')
      .doc(studentId)
      .collection('lessons')
      .doc(lessonId);

    const lessonDoc = await lessonRef.get();

    if (!lessonDoc.exists) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    const lessonData = lessonDoc.data()! as Lesson;

    // Extract necessary data
    const { subject, level, generatedTopics } = lessonData;

    // Get the topic titles
    const topicTitles = generatedTopics.map((topic: any) => topic.title);

    // Join the topic titles with ' & '
    const combinedTopicTitles = topicTitles.join(' & ');

    // Construct the new lesson title
    const newLessonTitle = `${subject} ${level} - ${combinedTopicTitles}`;

    // Update lessonData with the new title
    lessonData.title = newLessonTitle;

    // Generate slug from the new lesson title
    let baseSlug = await slugify(newLessonTitle);
    let slug = baseSlug;
    let counter = 1;

    // Ensure uniqueness
    while (true) {
      const slugRef = firestore.collection('publicLessons').doc(slug);
      const slugDoc = await slugRef.get();
      if (!slugDoc.exists) {
        break; // Unique slug found
      }
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Copy lesson data to publicLessons collection
    const publicLessonRef = firestore.collection('publicLessons').doc(slug);
    await publicLessonRef.set({
      ...lessonData,
      slug,
      sharedAt: new Date().toISOString(),
    });

    // Optionally update the original lesson to note it has been shared
    await lessonRef.update({
      public: true,
      sharedSlug: slug,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error('Error sharing lesson:', error);
    return NextResponse.json({ error: 'Failed to share lesson' }, { status: 500 });
  }
}