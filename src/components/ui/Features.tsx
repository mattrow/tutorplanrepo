import { Brain, GraduationCap, Clock, ChartLine, Sparkles, FileText } from 'lucide-react'

export default function Features() {
  return (
    <section className="py-24 bg-white" id="features">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Be an Exceptional Tutor
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Save time, improve student outcomes, and grow your tutoring business with our comprehensive suite of tools.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          <div className="group hover:scale-105 transition-transform duration-300">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <div className="w-16 h-16 bg-[#396afc] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">AI-Powered Planning</h3>
              <p className="text-gray-600">Generate comprehensive, CEFR-aligned lessons tailored to each student's level and goals.</p>
            </div>
          </div>

          <div className="group hover:scale-105 transition-transform duration-300">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <ChartLine className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Progress Analytics</h3>
              <p className="text-gray-600">Track student progress with detailed analytics and insights to optimize their learning journey.</p>
            </div>
          </div>

          <div className="group hover:scale-105 transition-transform duration-300">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8">
              <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Automated Homework</h3>
              <p className="text-gray-600">Generate personalized homework assignments that reinforce lesson concepts.</p>
            </div>
          </div>

          <div className="group hover:scale-105 transition-transform duration-300">
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8">
              <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Time-Saving Tools</h3>
              <p className="text-gray-600">Save up to 30 hours monthly on lesson planning and resource creation with our efficient tools.</p>
            </div>
          </div>

          <div className="group hover:scale-105 transition-transform duration-300">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8">
              <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">CEFR Alignment</h3>
              <p className="text-gray-600">Ensure your teaching aligns with international standards and help students progress systematically.</p>
            </div>
          </div>

          <div className="group hover:scale-105 transition-transform duration-300">
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8">
              <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Full Customization</h3>
              <p className="text-gray-600">Edit your students learning plan in any way you want, moving or adding your own topics.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}