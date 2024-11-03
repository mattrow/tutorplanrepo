import React from 'react';
import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const faqs = [
    {
      question: "Who is TutorPlan designed for?",
      answer: "TutorPlan is specifically designed for online language tutors who want to streamline their lesson planning process and deliver more effective, structured lessons. Whether you're a private tutor, online teacher, or language school instructor, our platform helps you create professional, CEFR-aligned lesson plans in minutes."
    },
    {
      question: "How does TutorPlan work?",
      answer: "TutorPlan uses advanced AI to generate personalized lesson plans based on your student's level, learning goals, and CEFR standards. Simply input your student's details, and our system will create a structured curriculum with detailed lesson plans, exercises, and homework assignments. You can easily customize any content to match your teaching style."
    },
    {
      question: "How will TutorPlan help me save time?",
      answer: "Our AI-powered system automates the most time-consuming aspects of teaching: lesson planning, resource creation, and progress tracking. On average, tutors save 30+ hours per month, allowing them to focus more on actual teaching and growing their business. The platform also ensures consistent quality across all lessons."
    },
    // {
    //   question: "What makes TutorPlan different from other teaching tools?",
    //   answer: "TutorPlan stands out with its CEFR alignment, AI-powered personalization, and comprehensive approach. Unlike generic lesson planning tools, we specifically cater to language teachers, providing structured learning paths, progress tracking, and automated homework generation—all designed to work together seamlessly."
    // },
    // {
    //   question: "Do I need technical expertise to use TutorPlan?",
    //   answer: "Not at all! TutorPlan is designed to be intuitive and user-friendly. If you can use email, you can use TutorPlan. We provide a simple interface that guides you through each step, from adding students to generating lessons and tracking progress."
    // },
    // {
    //   question: "How does the CEFR alignment work?",
    //   answer: "Every lesson plan and exercise is automatically aligned with CEFR (Common European Framework of Reference) standards. The system ensures that content matches your student's current level (A1-C2) and builds progressively towards their learning goals, following internationally recognized language learning standards."
    // },
    {
      question: "Can I customize the generated lessons?",
      answer: "Absolutely! While our AI generates comprehensive lesson plans, you maintain full control. You can modify, add, or remove any content to match your teaching style and your student's needs. Think of it as having a highly efficient teaching assistant who does the groundwork while leaving the final touches to you."
    },
    // {
    //   question: "What if I need help or support?",
    //   answer: "We provide comprehensive support through our help center, email support, and regular webinars. Our team is committed to helping you make the most of TutorPlan, and we typically respond to support queries within 24 hours."
    // }
  ];

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
            <HelpCircle className="w-4 h-4 mr-2" />
            <span className="font-satoshi-medium">Common Questions</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-satoshi-black text-white mb-6">
            Everything You Need to Know
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Get answers to the most common questions about TutorPlan
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20"
              >
                <AccordionTrigger className="text-white hover:no-underline text-2xl">
                  <span className="text-left">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-white/80 text-xl">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}