import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, firestore } from '@/firebase/admin';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await adminAuth.verifyIdToken(token);
    const userId = decodedToken.uid;

    // Get the specific student document
    const studentDoc = await firestore
      .collection('users')
      .doc(userId)
      .collection('students')
      .doc(params.id)
      .get();

    if (!studentDoc.exists) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    const student = {
      id: studentDoc.id,
      ...studentDoc.data()
    };

    return NextResponse.json({ student });

  } catch (error) {
    console.error('Error fetching student:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error fetching student' },
      { status: 500 }
    );
  }
}
