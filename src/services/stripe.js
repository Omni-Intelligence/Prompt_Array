import { loadStripe } from '@stripe/stripe-js';
import { supabase } from '@/lib/supabase';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const createCheckoutSession = async () => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw new Error('You must be logged in to subscribe');
    }

    // Create a checkout session via your Supabase function
    const { data, error } = await supabase.functions.invoke('create-checkout-session', {
      body: {
        priceId: import.meta.env.VITE_STRIPE_PRICE_ID, // Your annual subscription price ID
        userId: user.id,
        customerEmail: user.email
      }
    });

    if (error) throw error;

    // Redirect to Stripe Checkout
    const stripe = await stripePromise;
    const { error: stripeError } = await stripe.redirectToCheckout({
      sessionId: data.sessionId
    });

    if (stripeError) throw stripeError;

  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};
