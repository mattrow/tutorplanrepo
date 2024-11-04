import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, firestore } from '@/firebase/admin';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; lessonId: string } }
) {
  try {
    const studentId = params.id;
    const lessonId = params.lessonId;

    console.log(`[${new Date().toISOString()}] Received GET request for lesson:`, { studentId, lessonId });

    let userId: string | null = null;

    // Attempt to authenticate the user
    const authHeader = request.headers.get('Authorization');
    console.log('Authorization header:', authHeader);

    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split('Bearer ')[1];
      console.log('Token from header:', token);

      try {
        const decodedToken = await adminAuth.verifyIdToken(token);
        userId = decodedToken.uid;
        console.log('Token verified successfully, userId:', userId);
      } catch (error) {
        console.error('Error verifying token:', error);
        // Proceed as unauthenticated
      }
    } else {
      console.log('No valid Authorization header found, proceeding as unauthenticated');
    }

    // Log the query parameters
    console.log('Querying lessons collection group with:', {
      'id ==': lessonId,
      'studentId ==': studentId,
    });

    // Directly access the lesson document
    const lessonRef = firestore
      .collectionGroup('lessons')
      .where('id', '==', lessonId)
      .where('studentId', '==', studentId)
      .limit(1);

    const lessonSnapshot = await lessonRef.get();
    console.log('Lesson query results count:', lessonSnapshot.size);

    if (lessonSnapshot.empty) {
      console.error('Lesson not found with given id and studentId.');
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    const lessonDoc = lessonSnapshot.docs[0];
    const lessonData = lessonDoc.data();

    console.log('Retrieved lesson data:', lessonData);

    // Get the ownerId from the lesson data
    const ownerId = lessonData.ownerId;
    const isPublic = lessonData.public;

    console.log('Access control info:', {
      userId,
      ownerId,
      isPublic,
    });

    // Check if the lesson is public or if the user is the owner
    if (isPublic !== true && (!userId || userId !== ownerId)) {
      console.warn('Unauthorized access attempt.', {
        userId,
        ownerId,
        isPublic,
      });
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Include sharedSlug if the lesson is public
    const lessonResponseData = {
      ...lessonData,
      sharedSlug: lessonData.public ? lessonData.sharedSlug : undefined,
    };

    console.log('Lesson access granted, sending lesson data.');
    return NextResponse.json({ lesson: lessonResponseData }, { status: 200 });
  } catch (error) {
    console.error('Error fetching lesson:', error);

    let errorMessage = 'An unexpected error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    return NextResponse.json(
      { error: 'Failed to fetch lesson', details: errorMessage },
      { status: 500 }
    );
  }
}

export async function PATCH(
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

    const { public: isPublic } = await request.json();

    await lessonRef.update({ public: isPublic, updatedAt: new Date().toISOString() });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating lesson:', error);
    return NextResponse.json({ error: 'Failed to update lesson' }, { status: 500 });
  }
}