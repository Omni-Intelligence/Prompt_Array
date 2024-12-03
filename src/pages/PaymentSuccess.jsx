import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const handleSuccess = async () => {
      try {
        // Show success message
        toast.success('Thank you for your subscription!', {
          description: 'Welcome to Prompt Central Premium'
        });

        // If user is logged in, redirect to dashboard
        // If not, redirect to sign in
        if (user) {
          navigate('/app/dashboard');
        } else {
          navigate('/signin', { 
            state: { 
              from: '/app/dashboard',
              message: 'Please sign in to access your premium features'
            }
          });
        }
      } catch (error) {
        console.error('Error handling payment success:', error);
        toast.error('There was an issue processing your payment');
      }
    };

    handleSuccess();
  }, [navigate, user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center">
        <div className="mb-4">
          <svg
            className="mx-auto h-12 w-12 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Processing your subscription...
        </p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
