import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, ArrowRight, Inbox } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const RegisterSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resendVerificationEmail } = useAuth();
  const [isResending, setIsResending] = useState(false);

  // Get email from location state or localStorage
  const email = location.state?.email || localStorage.getItem('registrationEmail');

  const handleResendVerification = async () => {
    if (!email) {
      // toast.error("Email address not found. Please try signing up again."); // toast is not defined
      console.error("Email address not found. Please try signing up again.");
      return;
    }

    try {
      setIsResending(true);
      await resendVerificationEmail(email);
    } catch (error) {
      console.error('Failed to resend verification:', error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col justify-center items-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center space-y-6">
            {/* Email Icon */}
            <div className="flex justify-center">
              <div className="bg-primary/10 p-3 rounded-full">
                <Mail className="h-12 w-12 text-primary" />
              </div>
            </div>

            {/* Title and Description */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Check your email</h1>
              <p className="text-gray-500 dark:text-gray-400">
                We've sent you a verification link to {email ? <strong>{email}</strong> : 'your email address'}.
                Please click the link to activate your account.
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full mt-1">
                  <Inbox className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">1. Check your inbox</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Open the email from Prompt Array and click the verification link
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full mt-1">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">2. Start using Prompt Array</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    After verification, you can sign in and start using all features
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/signin")}
              >
                Go to Sign In
              </Button>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Didn't receive the email?{" "}
                <button 
                  className="text-primary hover:underline disabled:opacity-50"
                  onClick={handleResendVerification}
                  disabled={isResending}
                >
                  {isResending ? 'Resending...' : 'Click to resend'}
                </button>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterSuccess;
