import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#396afc] to-[#2948ff] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Value Proposition */}
          <div className="inline-flex items-center bg-white/10 rounded-full px-6 py-2 text-white mb-8">
            <Clock className="w-5 h-5 mr-2" />
            <span>Save 30+ hours every month on lesson planning</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your<br />Teaching Experience?
          </h2>

          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Join thousands of tutors delivering better results, saving time, and growing their business with TutorPlan.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/signup">
              <Button className="w-full sm:w-auto bg-white text-[#396afc] hover:bg-white/90 font-satoshi-bold text-lg px-8 py-6 rounded-full h-auto hover:scale-105 transition-all duration-300 flex items-center gap-2">
                Get Started for Free
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Upgrade anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}