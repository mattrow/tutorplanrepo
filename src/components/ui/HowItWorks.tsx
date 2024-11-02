import { ArrowRight } from 'lucide-react'

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gray-50" id="how-it-works">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Start Teaching Smarter Today
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started in minutes and transform your teaching experience with our intuitive platform.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Image/Demo Section */}
          <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
                alt="TutorPlan dashboard demonstration"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Feature Cards */}
            <div className="absolute -right-8 -bottom-8 bg-white rounded-xl shadow-lg p-4 max-w-xs">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-medium text-gray-900">AI generates personalized lesson plans in seconds</span>
              </div>
            </div>
          </div>

          {/* Steps List */}
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-[#396afc] rounded-full flex items-center justify-center text-white font-bold">1</div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Add Your Student</h3>
                <p className="text-gray-600 mb-2">Enter your student's current level, goals, and learning preferences.</p>
                <div className="flex items-center text-[#396afc] font-medium">
                  <span>Automatic CEFR level assessment</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-[#396afc] rounded-full flex items-center justify-center text-white font-bold">2</div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Generate Lesson Plan</h3>
                <p className="text-gray-600 mb-2">Our AI creates a personalized curriculum optimized for level progression.</p>
                <div className="flex items-center text-[#396afc] font-medium">
                  <span>CEFR-aligned content generation</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-[#396afc] rounded-full flex items-center justify-center text-white font-bold">3</div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Teach & Track Progress</h3>
                <p className="text-gray-600 mb-2">Conduct lessons and monitor student progress with detailed analytics.</p>
                <div className="flex items-center text-[#396afc] font-medium">
                  <span>Real-time progress tracking</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}