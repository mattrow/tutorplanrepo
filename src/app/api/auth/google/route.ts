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
    const { email, uid, displayName, photoURL } = await req.json();

    const userDoc = db.collection('users').doc(uid);
    const userSnapshot = await userDoc.get();

    if (!userSnapshot.exists) {
      // Create new user document if it doesn't exist
      await userDoc.set({
        email,
        displayName,
        photoURL,
        role: "user",
        stripeId: null,
        subscriptionId: null,
        subscriptionStatus: null,
        createdAt: Date.now(),
      });
    } else {
      // Update existing user document
      await userDoc.update({
        email,
        displayName,
        photoURL,
        lastLoginAt: Date.now(),
      });
    }

    return NextResponse.json({ success: true, uid });
  } catch (error) {
    console.error('Error registering Google user:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred during registration' },
      { status: 400 }
    );
  }
}
