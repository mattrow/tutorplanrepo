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

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [role, setRole] = useState<string | null>(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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

      // Add this check
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

      // Update state based on user data
      setRole(checkData.userData?.role || 'Free User');
      setSubscriptionStatus(checkData.userData?.subscriptionStatus || null);

    } catch (error) {
      console.error('❌ Error in fetchUserData:', error);
    }
  };

  if (loading || (!user && typeof window !== 'undefined')) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#FFFFFF]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#396afc]"></div>
      </div>
    );
  }

  const renderContent = () => {
    if (subscriptionStatus === 'active' || role === 'Pro User') {
      return (
        <Card className="w-full max-w-md bg-[#FFE5E5] border-none">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Welcome to your dashboard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center">{user?.email}</p>
            <div className="flex flex-col space-y-4">
              <Button
                onClick={() => auth.signOut()}
                className="bg-[#FF6F61] text-white hover:bg-[#FFB3B0]"
              >
                Sign Out
              </Button>
              {role === 'Free User' ? (
                <Button
                  onClick={() => handleUpgrade(process.env.NEXT_PUBLIC_STRIPE_PRICE_ID as string)}
                  className="bg-[#FF6F61] text-white hover:bg-[#FFB3B0]"
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : 'Upgrade Account'}
                </Button>
              ) : (
                <Button
                  className="bg-[#FFB3B0] text-[#333333] cursor-not-allowed"
                  disabled
                >
                  You are already "{role}"
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#396afc] to-[#2948ff] text-white flex flex-col">
      <Navigation isAuthenticated={true} />
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}
