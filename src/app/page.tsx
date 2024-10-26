'use client';
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import VideoDemo from '@/components/VideoDemo'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';

export default function ModernLandingPage() {
  const { user, loading } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(user !== null);
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="hero-section relative w-full bg-gradient-to-br from-[#396afc] to-[#2948ff]">
        <div className="relative z-10">
          <Navigation isAuthenticated={isAuthenticated ?? false} />
          <Hero />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow w-full">
        <VideoDemo />
        <Features />
        <HowItWorks />
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
