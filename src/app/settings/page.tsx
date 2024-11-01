 "use client";

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/ui/Sidebar';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [billingInfo, setBillingInfo] = useState<any>(null);
  const stripeCustomerPortalLink = 'https://billing.stripe.com/p/login/cN2g16gFF6aZgmc5kk';

  useEffect(() => {
    const fetchBillingInfo = async () => {
      try {
        const token = await user?.getIdToken();
        const response = await fetch('/api/billing-info', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBillingInfo(data);
        } else {
          console.error('Failed to fetch billing info');
        }
      } catch (error) {
        console.error('Error fetching billing info:', error);
      }
    };

    if (user) {
      fetchBillingInfo();
    }
  }, [user]);

  const handleSignOut = async () => {
    try {
      await logout();
      router.push('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1 p-8 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>

        {/* Account Information Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>

          <div className="mb-4">
            <div className="text-gray-700">
              <strong>Email:</strong> {user?.email}
            </div>
            <div className="text-gray-700">
              <strong>Name:</strong> {user?.displayName || 'N/A'}
            </div>
          </div>

          <Button onClick={handleSignOut} className="bg-red-500 hover:bg-red-600">
            Sign Out
          </Button>
        </div>

        {/* Billing Information Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-semibold mb-4">Billing Information</h2>

          {billingInfo ? (
            <div className="mb-4">
              <div className="text-gray-700">
                <strong>Subscription Status:</strong> {billingInfo.subscriptionStatus}
              </div>
              <div className="text-gray-700">
                <strong>Plan:</strong> {billingInfo.plan}
              </div>
              <div className="text-gray-700">
                <strong>Current Period End:</strong>{' '}
                {new Date(billingInfo.currentPeriodEnd * 1000).toLocaleDateString()}
              </div>
            </div>
          ) : (
            <div>Loading billing information...</div>
          )}

          <Button
            onClick={() => window.open(stripeCustomerPortalLink, '_blank')}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Manage Subscription
          </Button>
        </div>
      </div>
    </div>
  );
}