import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, firestore } from '@/firebase/admin';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await adminAuth.verifyIdToken(token);
    const userId = decodedToken.uid;

    // Get all students for this user
    const studentsSnapshot = await firestore
      .collection('users')
      .doc(userId)
      .collection('students')
      .orderBy('createdAt', 'desc')
      .get();

    const students = studentsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ students });

  } catch (error) {
    console.error('Error listing students:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error listing students' },
      { status: 500 }
    );
  }
}
