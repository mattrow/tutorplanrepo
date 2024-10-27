import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/stripe/config';
import { firestore as db } from '@/firebase/admin'; // Changed from db to firestore

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get('stripe-signature');

  console.log('🎯 Webhook received');
  console.log('Signature:', sig?.slice(0, 20) + '...');

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    console.log('✅ Webhook verified, Event Type:', event.type);

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        const userId = session.metadata?.userId;
        
        console.log('💳 Processing checkout session:', {
          sessionId: session.id,
          userId,
          metadata: session.metadata,
        });

        try {
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
          );
          
          console.log('📦 Retrieved subscription:', {
            id: subscription.id,
            status: subscription.status,
          });

          if (userId) {
            const userRef = db.collection('users').doc(userId);
            const userDoc = await userRef.get();
            
            if (!userDoc.exists) {
              console.error('❌ User document not found:', userId);
              return;
            }

            await userRef.update({
              role: 'Pro User',
              stripeId: session.customer as string,
              subscriptionId: session.subscription as string,
              subscriptionStatus: subscription.status,
              updatedAt: new Date().toISOString(),
            });
            
            console.log('✅ Updated user document:', userId);
          }
        } catch (error) {
          console.error('❌ Error processing checkout:', error);
        }
        break;

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        const updatedSubscription = event.data.object;
        const customerId = updatedSubscription.customer as string;
        
        // Find user by stripeId
        const userSnapshot = await db
          .collection('users')
          .where('stripeId', '==', customerId)
          .get();

        if (!userSnapshot.empty) {
          const userDoc = userSnapshot.docs[0];
          await userDoc.ref.update({
            subscriptionStatus: updatedSubscription.status,
            updatedAt: new Date().toISOString(),
            // If subscription is deleted, reset role
            ...(event.type === 'customer.subscription.deleted' && {
              role: 'Free User',
              subscriptionId: null,
            }),
          });
          
          console.log('Updated subscription status for user:', userDoc.id);
        }
        break;
    }

    return NextResponse.json({ 
      received: true,
      type: event.type,
      eventId: event.id 
    });
  } catch (err) {
    console.error('🚨 Webhook Error:', err);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
}
