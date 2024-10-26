export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { stripe } from '@/stripe/config';

export async function POST(req: Request) {
  const { priceId, metadata } = await req.json();
  const { userId, email } = metadata; // Add email to metadata

  try {
    // Create or retrieve a customer
    let customer;
    const existingCustomers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({
        email: email,
        metadata: { userId },
      });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
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
        trial_period_days: 7,
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
