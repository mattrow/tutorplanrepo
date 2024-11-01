"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/config";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut, CreditCard, User } from "lucide-react";
import Sidebar from "@/components/ui/Sidebar";

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [billingStatus, setBillingStatus] = useState<string>("Loading...");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchBillingStatus = async () => {
      try {
        const token = await user?.getIdToken();
        const response = await fetch('/api/billing/status', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setBillingStatus(data.status);
        } else {
          setBillingStatus("Error fetching status");
          console.error("Failed to fetch billing status:", data.error);
        }
      } catch (error) {
        setBillingStatus("Error fetching status");
        console.error("Error fetching billing status:", error);
      }
    };

    if (user) {
      fetchBillingStatus();
    }
  }, [user]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading || !user) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-[#f8f9fc]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64"> {/* ml-64 matches Sidebar width */}
        <div className="p-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Settings</h1>

              {/* User Information */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-gray-600" />
                  Account Information
                </h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Email:</span>
                    <span className="text-gray-900 font-medium">{user.email}</span>
                  </div>
                </div>
              </div>

              {/* Billing Information */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
                  <CreditCard className="w-5 h-5 text-gray-600" />
                  Billing Information
                </h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Subscription Status:</span>
                    <span className="text-gray-900 font-medium">{billingStatus}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href="https://billing.stripe.com/p/login/cN2g16gFF6aZgmc5kk" passHref>
                    <Button className="w-full bg-[#396afc] text-white hover:bg-[#396afc]/90 font-satoshi-bold rounded-full flex items-center justify-center gap-2">
                      Manage Subscription
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Sign Out Button */}
              <div className="mt-8">
                <Button
                  onClick={handleSignOut}
                  className="w-full bg-red-500 text-white hover:bg-red-600 font-satoshi-bold rounded-full flex items-center justify-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 