-- Function to add constraint if it doesn't exist
CREATE OR REPLACE FUNCTION add_subscription_constraint()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Check if constraint exists
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'subscriptions_stripe_subscription_id_key'
    ) THEN
        -- Add unique constraint
        ALTER TABLE subscriptions
        ADD CONSTRAINT subscriptions_stripe_subscription_id_key 
        UNIQUE (stripe_subscription_id);
    END IF;
END;
$$;
