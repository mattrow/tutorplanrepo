'use client';
import { useAuth } from '../../hooks/useAuth';
import { auth } from '@/firebase/config';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Flame } from 'lucide-react'
import Link from 'next/link'
import Navigation from '@/components/ui/Navigation'
import Pricing from '@/components/Pricing';
import Footer from '@/components/ui/Footer';
import Sidebar from '@/components/ui/Sidebar'
import DashboardHome from '@/components/dashboard/DashboardHome';
import AddStudentForm from '@/components/dashboard/AddStudentForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const [role, setRole] = useState<string | null>(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false); // Add this line
  const [currentView, setCurrentView] = useState('home'); // Add this

  const router = useRouter();

  const getFirebaseToken = async () => {
    try {
      if (!user) {
        console.log('❌ No user found');
        return null;
      }

      console.log('👤 User found:', user.uid);
      const token = await user.getIdToken(true); // Force token refresh
      console.log('🎫 Token retrieved:', token ? 'Yes' : 'No');
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
    
    console.log('🔍 Checking URL params:', { isSuccess });
    
    if (isSuccess === 'true') {
      console.log('✅ Checkout successful, refreshing data...');
      // Clear the URL parameter first
      router.replace('/dashboard');
      
      // Wait for user to be available
      if (user) {
        console.log('👤 User available, fetching data...');
        // Add a slight delay to ensure Stripe has processed everything
        setTimeout(() => {
          fetchUserData();
        }, 2000);
      } else {
        console.log('⏳ Waiting for user...');
      }
    }
  }, [user, router]);

  // Add this effect to fetch data when user becomes available
  useEffect(() => {
    if (user) {
      console.log('👤 User became available, fetching initial data...');
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    setIsLoading(true);
    console.log('🔄 Starting fetchUserData');
    try {
      if (!user) {
        console.log('❌ No user available');
        return;
      }

      const token = await getFirebaseToken();
      if (!token) {
        console.error('❌ No token available');
        return;
      }

      console.log('📡 Checking user data directly...');
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
      console.log('📊 User data:', checkData);

      setRole(checkData.userData?.role || 'Free User');
      setSubscriptionStatus(checkData.userData?.subscriptionStatus || null);
      setDataFetched(true); // Add this line

    } catch (error) {
      console.error('❌ Error in fetchUserData:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Create a loading component
  const LoadingSpinner = () => (
    <div className="flex-grow flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
    </div>
  );

  const renderDashboardContent = () => {
    switch (currentView) {
      case 'add-student':
        return <AddStudentForm onBack={() => setCurrentView('home')} />;
      default:
        return <DashboardHome onAddStudent={() => setCurrentView('add-student')} />;
    }
  };

  // Modify the render logic
  const renderContent = () => {
    if (authLoading || isLoading || !dataFetched) {
      return <LoadingSpinner />;
    }

    if (subscriptionStatus === 'active' || role === 'Pro User') {
      return (
        <div className="flex">
          <Sidebar />
          <div className="ml-64 w-full">
            {renderDashboardContent()}
          </div>
        </div>
      );
    }

    return (
      <div className="w-full max-w-6xl">
        <Pricing 
          userId={user?.uid || ''}
          userEmail={user?.email || ''}
          onSubscribe={handleUpgrade}
        />
      </div>
    );
  };

  // Always render the layout, only content changes
  return (
    <div className="min-h-screen bg-[#f8f9fc] flex flex-col"> {/* Changed to soft blue-gray */}
      <main className="flex-grow">
        {renderContent()}
      </main>
    </div>
  );
}
