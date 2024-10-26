import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#396afc] to-[#2948ff] text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-8">Ready to Transform Your Teaching?</h2>
        <p className="text-xl mb-8 text-white/80">Join thousands of tutors who are already using TutorPlan</p>
        <Link href="/signup">
          <Button className="bg-white text-blue-800 px-8 py-6 rounded-full text-lg font-semibold hover:bg-white/90 hover:scale-105 transition-all duration-300">
            Start Your Free Trial
          </Button>
        </Link>
      </div>
    </section>
  )
}
