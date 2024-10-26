import { Brain, GraduationCap, Edit3 } from 'lucide-react'

export default function Features() {
  return (
    <section className="py-20 bg-white" id="features">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Brain className="w-8 h-8 text-[#396afc]" />
            </div>
            <h3 className="text-xl font-bold mb-4">AI-Powered Planning</h3>
            <p className="text-gray-600">Generate comprehensive lesson plans tailored to your student's current level and learning goals.</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="w-8 h-8 text-[#396afc]" />
            </div>
            <h3 className="text-xl font-bold mb-4">Level Progression</h3>
            <p className="text-gray-600">Structured paths to help students advance from one proficiency level to the next with confidence.</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Edit3 className="w-8 h-8 text-[#396afc]" />
            </div>
            <h3 className="text-xl font-bold mb-4">Customizable Plans</h3>
            <p className="text-gray-600">Modify and adapt lesson plans based on student feedback and progress after each session.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
