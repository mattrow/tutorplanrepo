import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl mx-auto px-4 pt-24 text-center min-h-[60vh] bg-transparent">
      <div className="inline-flex items-center bg-white/10 rounded-full px-4 py-2 text-white mb-6">
        <Sparkles className="w-4 h-4 mr-2 text-white" />
        <span className="font-satoshi-medium">AI-Powered Lesson Planning</span>
      </div>
      
      <h1 className="font-satoshi-black text-5xl md:text-6xl lg:text-7xl tracking-tight text-white">
        Personalized lessons<br />
        with one click
      </h1>
      <p className="mt-6 font-satoshi-bold text-xl md:text-2xl text-white/80 max-w-3xl">
        Instantly generate tailored learning paths to keep students motivated.
      </p>
      <Link href="/signup">
        <Button 
          className="mt-10 font-satoshi-black bg-white text-blue-800 hover:bg-white/90 hover:scale-105 transition-transform duration-300 ease-out rounded-full px-8 py-6 text-2xl h-auto"
        >
          Start for free
        </Button>
      </Link>
    </div>
  )
}
