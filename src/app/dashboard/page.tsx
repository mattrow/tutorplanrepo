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
      if (user) {
        const token = await auth.currentUser?.getIdToken();
        return token;
      }
    } catch (error) {
      console.error("Error getting Firebase token:", error);
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
    const fetchUserData = async () => {
      try {
        const token = await getFirebaseToken();
        if (token) {
          // Fetch role
          const roleRes = await fetch('/api/user/role', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const roleData = await roleRes.json();
          setRole(roleData.role);

          // Fetch subscription status
          const subRes = await fetch('/api/user/subscription', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const subData = await subRes.json();
          setSubscriptionStatus(subData.subscriptionStatus);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

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
