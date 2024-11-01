import { NextRequest, NextResponse } from 'next/server';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps, cert } from 'firebase-admin/app';

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = getFirestore();

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const { email, uid } = await req.json();

    const userDoc = db.collection('users').doc(uid);
    const userSnapshot = await userDoc.get();

    if (!userSnapshot.exists) {
      // Create new user document
      await userDoc.set({
        email,
        role: "user",
        stripeId: null,
        subscriptionId: null,
        subscriptionStatus: null,
        createdAt: Date.now(),
      });
    } else {
      // User already exists (this shouldn't happen on registration)
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    return NextResponse.json({ success: true, uid });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred during registration' },
      { status: 400 }
    );
  }
}
