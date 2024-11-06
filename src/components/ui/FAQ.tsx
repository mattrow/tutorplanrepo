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
      answer:
        "TutorPlan is specifically designed for online language tutors who want to streamline their lesson planning process and deliver more effective, structured lessons. Whether you're a private tutor, online teacher, or language school instructor, our platform helps you create professional, CEFR-aligned lesson plans in minutes.",
    },
    {
      question: "How does TutorPlan work?",
      answer:
        "TutorPlan uses advanced AI to generate personalized lesson plans based on your student's level, learning goals, and CEFR standards. Simply input your student's details, and our system will create a structured curriculum with detailed lesson plans, exercises, and homework assignments. You can easily customize any content to match your teaching style.",
    },
    {
      question: "How will TutorPlan help me save time?",
      answer:
        "Our AI-powered system automates the most time-consuming aspects of teaching: lesson planning, resource creation, and progress tracking. On average, tutors save 30+ hours per month, allowing them to focus more on actual teaching and growing their business. The platform also ensures consistent quality across all lessons.",
    },
    {
      question: "Can I customize the generated lessons?",
      answer:
        "Absolutely! While our AI generates comprehensive lesson plans, you maintain full control. You can modify, add, or remove any content to match your teaching style and your student's needs. Think of it as having a highly efficient teaching assistant who does the groundwork while leaving the final touches to you.",
    },
  ];

  return (
    <section
      className="py-24 bg-gray-50"
      data-animate
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-[#396afc] text-white rounded-full px-4 py-2 mb-6">
            <HelpCircle className="w-4 h-4 mr-2" />
            <span className="font-satoshi-medium">Common Questions</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-satoshi-black text-gray-900 mb-6">
            Got questions?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get answers to the most common questions about TutorPlan
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="bg-white rounded-2xl px-6 py-4 border border-gray-200 shadow-sm"
              >
                <AccordionTrigger className="text-gray-900 hover:no-underline text-xl font-bold">
                  <span className="text-left">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-lg">
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