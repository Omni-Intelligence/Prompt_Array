-- Add unique constraint to stripe_subscription_id
ALTER TABLE subscriptions
ADD CONSTRAINT subscriptions_stripe_subscription_id_key UNIQUE (stripe_subscription_id);
