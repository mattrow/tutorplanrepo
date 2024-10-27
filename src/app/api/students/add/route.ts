import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, firestore } from '@/firebase/admin';

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

    // Add timestamp
    const studentWithTimestamp = {
      ...studentData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Add to Firestore
    const studentRef = await firestore
      .collection('users')
      .doc(userId)
      .collection('students')
      .add(studentWithTimestamp);

    return NextResponse.json({ 
      success: true, 
      studentId: studentRef.id 
    });

  } catch (error) {
    console.error('Error adding student:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error adding student' },
      { status: 500 }
    );
  }
}
