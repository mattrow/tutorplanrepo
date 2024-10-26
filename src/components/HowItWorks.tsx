export default function HowItWorks() {
  return (
    <section className="py-20 bg-blue-50" id="how-it-works">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
              alt="Teacher using laptop"
              className="w-full h-[300px] object-cover"
            />
          </div>
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[#396afc] rounded-full flex items-center justify-center text-white font-bold">1</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Input Student Details</h3>
                <p className="text-gray-600">Enter your student's current level, goals, and learning preferences.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[#396afc] rounded-full flex items-center justify-center text-white font-bold">2</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Generate Plan</h3>
                <p className="text-gray-600">Our AI creates a personalized lesson plan optimized for level progression.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[#396afc] rounded-full flex items-center justify-center text-white font-bold">3</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Teach & Adapt</h3>
                <p className="text-gray-600">Conduct your lesson and provide feedback to improve future plans.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
