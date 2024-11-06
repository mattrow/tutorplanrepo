import React from 'react';
import { MessageSquare } from 'lucide-react';

const testimonials = [
  {
    text: "TutorPlan has transformed how I manage my lessons. The AI-generated content is spot-on, and my students love the personalized approach.",
    name: "Emma Rodriguez",
    role: "English Tutor on iTalki",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop&q=80"
  },
  {
    text: "The CEFR alignment is perfect. It helps me ensure my students are progressing according to international standards. Worth every penny!",
    name: "Michael Chen",
    role: "Language School Owner",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&auto=format&fit=crop&q=80"
  },
  {
    text: "I save hours of preparation time each week. The homework generation feature is brilliant, and my students are making fantastic progress.",
    name: "Sophie Martin",
    role: "French Tutor on Preply",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&auto=format&fit=crop&q=80"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#396afc] to-[#2948ff] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 text-white mb-6">
            <MessageSquare className="w-4 h-4 mr-2" />
            <span className="font-satoshi-medium">Testimonials</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-satoshi-black text-white mb-6">
            What People Are Saying About TutorPlan
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Join thousands of tutors who are already transforming their teaching with TutorPlan
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:border-white/40 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1"
            >
              {/* Quote */}
              <p className="text-white/90 text-lg leading-relaxed mb-8 font-satoshi-medium">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                />
                <div>
                  <h4 className="text-white font-satoshi-bold">{testimonial.name}</h4>
                  <p className="text-white/70 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}