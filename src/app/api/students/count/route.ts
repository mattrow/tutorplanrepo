import { NextResponse } from 'next/server';
import { adminAuth, firestore } from '../../../../firebase/admin';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const idToken = req.headers.get('Authorization')?.split('Bearer ')[1];
    if (!idToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const uid = decodedToken.uid;

    const userDoc = await firestore.collection('users').doc(uid).get();
    const userData = userDoc.data();
    const role = userData?.role || 'Free User';

    const studentsSnapshot = await firestore
      .collection('students')
      .where('userId', '==', uid)
      .get();
    const count = studentsSnapshot.size;

    return NextResponse.json({ count, role }, { status: 200 });

  } catch (error) {
    console.error('Error fetching student count:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 