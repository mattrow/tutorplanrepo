import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Sparkles, ArrowRight } from 'lucide-react'
import { useCallback } from 'react'
import confetti from 'canvas-confetti'

export default function Hero() {
  // Function to launch confetti
  const launchConfetti = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }, [])

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden bg-gradient-to-br from-[#4d7fff] to-[#2948ff]">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-300"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-8 flex flex-col lg:flex-row items-center gap-16">
        {/* Left Column - Text Content */}
        <div className="flex-1 text-left">
          {/* Badge
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-8 py-2 text-white mb-8 animate-fade-in-up">
            <Sparkles className="w-4 h-4 mr-2" />
            <span className="font-satoshi-medium">AI-Powered CEFR-Aligned Lesson Planning</span>
          </div> */}
          
          {/* Main heading */}
          <h1 className="font-satoshi-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white mb-6 animate-fade-in-up delay-100">
            Your all-in-one lesson management platform
          </h1>

          {/* Subheading */}
          <p className="text-xl text-white/90 max-w-2xl mb-8 animate-fade-in-up delay-200">
            Generate personalized lesson plans, track student progress, and create engaging homework—all aligned with CEFR levels.
          </p>

          {/* CTA Button */}
          <div className="flex items-center gap-6 animate-fade-in-up delay-300">
            <Link href="/signup">
              <Button
                onClick={launchConfetti}
                className="bg-white text-[#4d7fff] hover:bg-white/90 
                         font-satoshi-black rounded-full px-8 py-6 text-xl h-auto
                         hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Started for Free
              </Button>
            </Link>
            {/* <p className="text-white/90">
              Upgrade to Pro for <span className="font-bold">$29/month</span>
            </p> */}
          </div>
        </div>

        {/* Right Column - Video */}
        <div className="flex-1 w-full max-w-2xl">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
            <div className="w-full relative" style={{ paddingTop: '56.25%' }}>
              <iframe
                src="https://www.youtube.com/embed/oNSko9CGdKA"
                className="absolute top-0 left-0 w-full h-full rounded-2xl"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}