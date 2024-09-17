import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Register = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="mb-8">
        <img src="/placeholder.svg" alt="PromptHub Logo" className="h-12 w-auto" />
        <h1 className="text-3xl font-bold mt-2">PromptHub</h1>
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
              <Input id="fullName" type="text" placeholder="Enter your full name" className="mt-1" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <Input id="email" type="email" placeholder="Enter your email" className="mt-1" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <Input id="password" type="password" placeholder="Enter your password" className="mt-1" />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <Input id="confirmPassword" type="password" placeholder="Confirm your password" className="mt-1" />
            </div>
            <div className="flex items-center">
              <Checkbox id="terms" />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
              </label>
            </div>
            <Button className="w-full">REGISTER</Button>
          </form>
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-blue-600 hover:underline">Already registered?</a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;