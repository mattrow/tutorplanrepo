import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { firestore as db } from '@/firebase/admin';
import { verifyToken } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const authHeader = headers().get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'No auth header' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await verifyToken(token);
    
    const userDoc = await db.collection('users').doc(decodedToken.uid).get();
    const userData = userDoc.data();

    console.log('📊 User Data Check:', {
      uid: decodedToken.uid,
      data: userData,
    });

    return NextResponse.json({
      userData,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ User check error:', error);
    return NextResponse.json({ error: 'Failed to check user' }, { status: 500 });
  }
}
