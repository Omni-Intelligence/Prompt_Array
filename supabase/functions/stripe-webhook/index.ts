import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { stripe } from '../_shared/stripe.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? ''
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false
    }
  }
)

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Parse the webhook payload
    const payload = await req.text()
    const event = JSON.parse(payload)
    
    console.log('Received webhook event:', event.type)

    // Handle subscription events
    if (event.type.startsWith('customer.subscription.')) {
      const subscription = event.data.object
      const customerId = subscription.customer
      
      // Get the customer to find the user ID
      const customer = await stripe.customers.retrieve(customerId)
      const userId = customer.metadata?.supabaseUUID
      
      if (!userId) {
        throw new Error('No user ID found in customer metadata')
      }

      // Update subscription in database
      const { error } = await supabase
        .from('subscriptions')
        .upsert(
          {
            user_id: userId,
            stripe_customer_id: customerId,
            stripe_subscription_id: subscription.id,
            price_id: subscription.items.data[0].price.id,
            status: subscription.status,
          },
          {
            onConflict: 'stripe_subscription_id',
            ignoreDuplicates: false
          }
        )

      if (error) throw error
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error('Error processing webhook:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
