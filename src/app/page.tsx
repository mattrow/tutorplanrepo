'use client';
import Navigation from '@/components/ui/Navigation'
import Hero from '@/components/ui/Hero'
import VideoDemo from '@/components/ui/VideoDemo'
import Features from '@/components/ui/Features'
import HowItWorks from '@/components/ui/HowItWorks'
import CTASection from '@/components/ui/CTASection'
import Footer from '@/components/ui/Footer'
import FAQ from '@/components/ui/FAQ'
import TrustedBy from '@/components/ui/TrustedBy'
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { analytics } from '@/firebase/config';
import { logEvent } from 'firebase/analytics';
import ProcessDemo from '@/components/ui/ProcessDemo';
import Testimonials from '@/components/ui/Testimonials';

export default function ModernLandingPage() {
  const { user, loading } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(user !== null);
  }, [user]);

  useEffect(() => {
    if (analytics) {
      logEvent(analytics, 'page_view', {
        page_title: 'Home',
        page_location: window.location.href,
        page_path: window.location.pathname,
      });
    }
  }, []);

  // Add scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    document.querySelectorAll('[data-animate]').forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="hero-section relative w-full bg-gradient-to-br from-[#396afc] to-[#2948ff]">
        <div className="relative z-10">
          <Navigation isAuthenticated={isAuthenticated ?? false} />
          <Hero />
          <TrustedBy />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow w-full">
        <div data-animate>
          <ProcessDemo />
        </div>
        
        {/* <div data-animate>
          <Features />
        </div> */}
        <div data-animate>
          <Testimonials />
        </div>
        <div data-animate>
          <FAQ />
        </div>
        {/* <div data-animate>
          <HowItWorks />
        </div> */}
        <div data-animate>
          <CTASection />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}