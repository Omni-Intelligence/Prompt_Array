import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ResetPassword = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    try {
      // TODO: Implement password reset logic
      toast.success("Password reset instructions sent to your email");
      navigate('/signin');
    } catch (error) {
      toast.error("Failed to send reset instructions. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Animated Background */}
      <div className="hidden lg:block lg:w-[60%] relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900" />
        <div className="absolute inset-0">
          <img 
            src="/images/signin-cosmos.svg" 
            alt="Interactive Prompt Cosmos" 
            className="w-full h-full"
            style={{
              transform: 'scale(1.1)',
              animation: 'float 20s ease-in-out infinite'
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />
      </div>

      {/* Right side - Reset Password form */}
      <div className="flex-1 flex flex-col justify-center items-center p-4 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Reset Password
            </h1>
            <p className="mt-2 text-gray-600">Enter your email to receive reset instructions</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Password Reset</CardTitle>
              <CardDescription>
                We'll send you instructions to reset your password
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="m@example.com" 
                    required 
                  />
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90">
                  Send Reset Instructions
                </Button>

                <div className="text-center text-sm text-gray-600">
                  Remember your password?{" "}
                  <Button
                    variant="link"
                    className="text-primary hover:text-primary/80 p-0"
                    onClick={() => navigate('/signin')}
                    type="button"
                  >
                    Sign in
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: scale(1.1) rotate(0deg); }
          50% { transform: scale(1.15) rotate(1deg); }
        }
      `}</style>
    </div>
  );
};

export default ResetPassword;
