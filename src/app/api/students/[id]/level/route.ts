import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, firestore } from '@/firebase/admin';

export async function GET(
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

    // Fetch the student document to get language and level
    const studentDoc = await firestore
      .collection('users')
      .doc(userId)
      .collection('students')
      .doc(studentId)
      .get();

    if (!studentDoc.exists) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    const student = studentDoc.data();

    const language = student?.language?.toLowerCase() || 'default_subject';
    const level = student?.level || 'default_level';

    // Fetch the level document
    const levelRef = firestore
      .collection('users')
      .doc(userId)
      .collection('students')
      .doc(studentId)
      .collection('subject')
      .doc(language)
      .collection('levels')
      .doc(level);

    const levelDoc = await levelRef.get();

    if (!levelDoc.exists) {
      return NextResponse.json({ error: 'Level not found' }, { status: 404 });
    }

    const levelData = levelDoc.data();

    return NextResponse.json({ levelData });
  } catch (error) {
    console.error('Error fetching level data:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error fetching level data' },
      { status: 500 }
    );
  }
}
