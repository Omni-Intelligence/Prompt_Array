import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Registration successful!");
    navigate('/register-success');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">PromptHub</h1>
        <p className="text-gray-600 mt-2">Create your account to get started</p>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName" 
                type="text" 
                placeholder="Enter your full name" 
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email" 
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Create a password" 
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                placeholder="Confirm your password" 
                required 
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <label 
                htmlFor="terms" 
                className="text-sm text-gray-600"
              >
                I agree to the{" "}
                <a href="#" className="text-primary hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            <Button type="submit" className="w-full">
              Create Account
            </Button>

            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/');
                }}
                className="text-primary hover:underline"
              >
                Sign in
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;