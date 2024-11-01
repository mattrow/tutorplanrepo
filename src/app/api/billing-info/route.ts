import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/firebase/admin';
import Stripe from 'stripe';

export const runtime = 'nodejs';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
});

export async function GET(req: NextRequest) {
  try {
    // Verify the Firebase token
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await adminAuth.verifyIdToken(token);
    const userId = decodedToken.uid;

    // Get the user's email from Firebase Auth
    const userRecord = await adminAuth.getUser(userId);
    const email = userRecord.email;

    if (!email) {
      return NextResponse.json({ error: 'User email not found' }, { status: 400 });
    }

    // Fetch the customer from Stripe using the email
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (customers.data.length === 0) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    const customer = customers.data[0];

    // Fetch the subscriptions for the customer
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'all',
      limit: 1,
    });

    if (subscriptions.data.length === 0) {
      return NextResponse.json({ error: 'No subscriptions found' }, { status: 404 });
    }

    const subscription = subscriptions.data[0];

    // Access the plan information from subscription items
    const subscriptionItem = subscription.items.data[0];

    if (!subscriptionItem) {
      return NextResponse.json({ error: 'No subscription items found' }, { status: 404 });
    }

    const planNickname = subscriptionItem.plan.nickname || 'N/A';

    return NextResponse.json({
      subscriptionStatus: subscription.status,
      currentPeriodEnd: subscription.current_period_end,
      plan: planNickname,
    });
  } catch (error) {
    console.error('Error fetching billing info:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error fetching billing info' },
      { status: 500 }
    );
  }
} 