import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, RefreshCw } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { toast } from 'sonner';

export function BillingSection() {
  const [isLoading, setIsLoading] = useState(false);
  const { subscription, refreshSubscription } = useSubscription();

  const handleManageBilling = () => {
    window.location.href = 'https://billing.stripe.com/p/login/3cs7vN4WK6QO1l64gg';
  };

  const handleRefreshSubscription = async () => {
    setIsLoading(true);
    try {
      await refreshSubscription();
      toast.success('Subscription status refreshed successfully');
    } catch (error) {
      console.error('Error refreshing subscription:', error);
      toast.error('Failed to refresh subscription status');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription & Billing</CardTitle>
        <CardDescription>Manage your subscription and billing details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Current Plan</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {subscription?.status === 'active' ? 'Premium Plan' : 'Free Plan'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {subscription?.status === 'active' && (
              <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                Active
              </p>
            )}
            <Button
              onClick={handleRefreshSubscription}
              disabled={isLoading}
              variant="ghost"
              size="sm"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        {subscription?.current_period_end && (
          <div>
            <h3 className="font-medium">Next billing date</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(subscription.current_period_end).toLocaleDateString()}
            </p>
          </div>
        )}

        <Button
          onClick={handleManageBilling}
          disabled={isLoading}
          variant="outline"
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            'Manage Billing'
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
