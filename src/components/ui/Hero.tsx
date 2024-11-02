import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Sparkles, Clock, Brain, LineChart } from 'lucide-react'
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
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#396afc] to-[#2948ff]">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-300"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 pt-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-8 py-2 text-white mb-8 animate-fade-in-up">
          <Sparkles className="w-4 h-4 mr-2" />
          <span className="font-satoshi-medium">AI-Powered CEFR-Aligned Lesson Planning</span>
        </div>
        
        {/* Main heading */}
        <h1 className="font-satoshi-black text-5xl md:text-7xl lg:text-8xl tracking-tight text-white mb-6 animate-fade-in-up delay-100">
          Teach{" "}
          <span className="highlight-word animate-glow font-black">Smarter</span>,<br></br>{" "}
          <span className="gradient-text bg-gradient-to-r from-blue-100 to-white">Not Harder</span>
        </h1>

        {/* Subheading */}
        <p className="mt-6 text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 animate-fade-in-up delay-200">
          Generate personalized lesson plans, track student progress, and create engaging homework—all aligned with CEFR levels.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 animate-fade-in-up delay-300">
            <div className="flex items-center justify-center gap-2 text-3xl font-bold text-white mb-2">
              <Clock className="w-6 h-6" />
              <span>30hrs</span>
            </div>
            <p className="text-white/90">Saved per month on lesson planning</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 animate-fade-in-up delay-400">
            <div className="flex items-center justify-center gap-2 text-3xl font-bold text-white mb-2">
              <Brain className="w-6 h-6" />
              <span>100%</span>
            </div>
            <p className="text-white/90">CEFR-aligned curriculum</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 animate-fade-in-up delay-500">
            <div className="flex items-center justify-center gap-2 text-3xl font-bold text-white mb-2">
              <LineChart className="w-6 h-6" />
              <span>2x</span>
            </div>
            <p className="text-white/90">Faster student progress</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up delay-600">
          <Link href="/signup">
            <Button
              onClick={launchConfetti}
              className="w-full sm:w-auto bg-white text-[#396afc] hover:bg-white/90 
                         font-satoshi-black rounded-full px-8 py-6 text-xl h-auto
                         hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start 7-day free trial
            </Button>
          </Link>
          <p className="text-white/90">
            Only <span className="font-bold">$29/month</span> after
          </p>
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/80 text-sm animate-fade-in-up delay-700">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Instant access</span>
          </div>
        </div>
      </div>
    </div>
  )
}