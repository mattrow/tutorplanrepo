'use client';
import { useAuth } from '../../hooks/useAuth';
import { auth } from '@/firebase/config';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Flame } from 'lucide-react'
import Link from 'next/link'
import Navigation from '@/components/ui/Navigation'
// import Pricing from '@/components/Pricing';
import Footer from '@/components/ui/Footer';
import Sidebar from '@/components/ui/Sidebar'
import DashboardHome from '@/components/dashboard/DashboardHome';
import AddStudentForm from '@/components/dashboard/AddStudentForm';
import StudentProfile from '@/components/student-profile/StudentProfile';
// import LessonView from '@/components/LessonView/LessonView';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import LessonPage from '@/components/LessonView/LessonPage';
import SuggestionsPage from '@/components/dashboard/SuggestionsPage';
import { analytics } from '@/firebase/config';
import { logEvent } from 'firebase/analytics';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const getFirebaseToken = async () => {
    try {
      if (!user) {
        console.log('❌ No user found');
        return null;
      }
      const token = await user.getIdToken(true);
      return token;
    } catch (error) {
      console.error("🚨 Error getting Firebase token:", error);
      return null;
    }
  };

  const handleUpgrade = async (priceId: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        body: JSON.stringify({ 
          priceId: priceId,
          metadata: {
            userId: user?.uid,
            role: 'Pro User',
          },
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await res.json();
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId: data.sessionId });
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isSuccess = urlParams.get('success');
    
    if (isSuccess === 'true') {
      router.replace('/dashboard');
      if (user) {
        setTimeout(() => {
          fetchUserData();
        }, 2000);
      }
    }
  }, [user, router]);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      if (!user) return;

      const token = await getFirebaseToken();
      if (!token) return;

      const checkRes = await fetch('/api/user/check', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!checkRes.ok) {
        throw new Error(`User check failed: ${checkRes.status}`);
      }
      
      const checkData = await checkRes.json();
      setRole(checkData.userData?.role || 'Free User');
      setDataFetched(true);

    } catch (error) {
      console.error('❌ Error in fetchUserData:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (analytics) {
      logEvent(analytics, 'purchase', {
        transaction_id: 'subscription_' + user?.uid,
        value: 29.99, // Replace with actual price
        currency: 'USD',
        items: [
          {
            item_id: 'pro_subscription',
            item_name: 'Pro Subscription',
          },
        ],
      });
    }
  }, [analytics]);

  const renderContent = () => {
    if (authLoading || isLoading || !dataFetched) {
      return (
        <div className="flex">
          <Sidebar />
          <div className="ml-64 w-full">
            <LoadingSpinner />
          </div>
        </div>
      );
    }

    if (!user) {
      router.push('/login');
      return null;
    }

    return (
      <div className="flex">
        <Sidebar />
        <div className="ml-64 w-full">
          <DashboardHome 
            onAddStudent={() => router.push('/dashboard/add-student')}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] flex flex-col">
      <main className="flex-grow">
        {renderContent()}
      </main>
    </div>
  );
}
