"use client";
import { useEffect, useState, createContext, useContext } from 'react';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { analytics } from '@/firebase/config';
import { setUserId, setUserProperties } from 'firebase/analytics';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, logout: async () => {} });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

      if (analytics && firebaseUser) {
        // Set the user ID
        setUserId(analytics, firebaseUser.uid);

        // Set user properties
        setUserProperties(analytics, {
          email: firebaseUser.email || '',
          subscription_status: 'free', // You can update this based on actual status
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, loading, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);