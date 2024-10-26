export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { stripe } from '@/stripe/config';

export async function POST(req: Request) {
  const { priceId, metadata } = await req.json();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: metadata,
      mode: 'subscription',
      subscription_data: {
        trial_period_days: 7, // 7-day free trial
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?canceled=true`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error('Checkout error:', err);
    return NextResponse.json({ 
      error: err instanceof Error ? err.message : 'An error occurred',
      code: 'checkout_error' 
    }, { status: 500 });
  }
}
