'use client';
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Plus, Shield } from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { loadStripe } from "@stripe/stripe-js";

interface PricingProps {
  userId: string;
  userEmail: string;
  onSubscribe: (priceId: string) => Promise<void>;
  trialEligible?: boolean;
}

export default function Pricing({ userId, userEmail, onSubscribe, trialEligible = true }: PricingProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (priceId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          metadata: {
            userId,
            email: userEmail,
            role: 'Pro User',
          },
        }),
      });

      const { sessionId, error } = await response.json();
      
      if (error) {
        throw new Error(error);
      }

      // Redirect to checkout
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      await stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Error:', error);
      // Add error handling UI here
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    'Unlimited AI personalized lesson plans',
    'Unlimited students',
    'Post-lesson feedback system',
    'Personalized homework for each lesson',
    'Priority support',
  ];

  const faqs = [
    {
      question: "How does the free trial work?",
      answer: "You get full access to all features for 7 days. Cancel anytime before the trial ends and you won't be charged."
    },
    {
      question: "Can I cancel my subscription?",
      answer: "Yes, you can cancel your subscription at any time. If you cancel, you'll continue to have access until the end of your billing period."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express) and PayPal."
    },
    {
      question: "Is there a long-term contract?",
      answer: "No, our service is month-to-month. You can cancel anytime without any long-term commitment."
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-white/10 rounded-full px-4 py-2 text-white mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            <span>Simple, Transparent Pricing</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">
            Start Transforming Your Teaching Today
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Try TutorPlan risk-free with our 7-day trial. Experience the power of AI-driven lesson planning.
          </p>
        </div>

        <div className="max-w-lg mx-auto mb-16">
          {/* Pricing Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Professional Plan</h3>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-4xl font-bold text-gray-900">$29</span>
                <span className="text-gray-500">/month</span>
              </div>
              <div className="text-[#396afc] font-medium">7-day free trial</div>
            </div>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-[#396afc]/10 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-[#396afc]" />
                  </div>
                  <span className="text-gray-600">{feature}</span>
                </div>
              ))}
            </div>

            <div className="text-center mb-4">
              {trialEligible ? (
                <div className="text-[#396afc] font-medium">
                  Start with a 7-day free trial
                </div>
              ) : (
                <div className="text-gray-500">
                  Subscribe now
                </div>
              )}
            </div>

            <Button
              onClick={() => handleSubscribe(process.env.NEXT_PUBLIC_STRIPE_PRICE_ID!)}
              disabled={isLoading}
              className="w-full bg-[#396afc] text-white py-6 px-8 text-2xl rounded-2xl font-bold hover:bg-[#2948ff] transition-colors duration-200 h-auto"
            >
              {isLoading ? 'Processing...' : trialEligible ? 'Start Free Trial' : 'Subscribe Now'}
            </Button>

            <div className="mt-4 flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Secure Payment Processing</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h3>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4"
              >
                <AccordionTrigger className="text-white hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/80">
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
