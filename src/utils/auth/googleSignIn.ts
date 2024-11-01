import { auth, googleProvider } from '@/firebase/config';
import { signInWithPopup } from 'firebase/auth';

export const handleGoogleAuth = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Create or update user in your backend
    const response = await fetch('/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email: user.email,
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to register Google user');
    }

    return { success: true };
  } catch (error) {
    console.error('Error with Google authentication:', error);
    throw error;
  }
}; 