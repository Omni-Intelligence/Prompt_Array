import { loadStripe } from '@stripe/stripe-js';
import { supabase } from '@/lib/supabase';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const createCheckoutSession = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout-session`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        priceId: import.meta.env.VITE_STRIPE_PRICE_ID,
        userId: user.id,
        customerEmail: user.email,
      }),
    }
  );

  const { sessionId } = await response.json();
  const stripe = await stripePromise;
  const { error } = await stripe.redirectToCheckout({ sessionId });
  if (error) throw error;
};
