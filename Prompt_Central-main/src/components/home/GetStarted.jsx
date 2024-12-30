import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight } from "lucide-react";

export function GetStarted() {
  return (
    <div className="mt-32">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#9333EA] via-[#9333EA] to-[#9333EA] bg-clip-text text-transparent mb-4">
          Get Started Today
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Begin your prompt engineering journey in minutes
        </p>
      </div>

      {/* Simple Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center p-6"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#9333EA]/10 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-[#9333EA] flex items-center justify-center text-white font-semibold">
              1
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Create Account</h3>
          <p className="text-gray-600">
            Sign up for free and set up your profile in less than a minute
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center p-6"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#9333EA]/10 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-[#9333EA] flex items-center justify-center text-white font-semibold">
              2
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Explore Templates</h3>
          <p className="text-gray-600">
            Browse our collection of pre-built templates and prompts
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center p-6"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#9333EA]/10 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-[#9333EA] flex items-center justify-center text-white font-semibold">
              3
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Start Creating</h3>
          <p className="text-gray-600">
            Build your first prompt or customize existing templates
          </p>
        </motion.div>
      </div>

      {/* Features Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
      >
        {/* Free Features */}
        <div className="p-8 rounded-xl bg-[#9333EA]/5 border border-[#9333EA]/10">
          <Badge variant="secondary" className="mb-6 bg-[#9333EA]/10 text-[#9333EA]">
            Free
          </Badge>
          <ul className="space-y-4">
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-3 text-[#9333EA]" />
              <span className="text-gray-600">Save and use up to 10 prompts</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-3 text-[#9333EA]" />
              <span className="text-gray-600">Access to basic templates</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-3 text-[#9333EA]" />
              <span className="text-gray-600">Community access</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-3 text-[#9333EA]" />
              <span className="text-gray-600">Basic learning resources</span>
            </li>
          </ul>
          <Button asChild className="w-full mt-6">
            <Link to="/signup">Get Started Free</Link>
          </Button>
        </div>

        {/* Premium Features */}
        <div className="relative p-8 rounded-xl bg-[#9333EA]/10 border border-[#9333EA]/10">
          <div className="absolute -top-3 -right-3 px-3 py-1 bg-[#9333EA] rounded-full text-white text-sm">
            Recommended
          </div>
          <Badge variant="secondary" className="mb-6 bg-[#9333EA]/10 text-[#9333EA]">
            Premium
          </Badge>
          <ul className="space-y-4">
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-3 text-[#9333EA]" />
              <span className="text-gray-600">Unlimited prompts and groups</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-3 text-[#9333EA]" />
              <span className="text-gray-600">Version control</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-3 text-[#9333EA]" />
              <span className="text-gray-600">Advanced prompt chains</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-3 text-[#9333EA]" />
              <span className="text-gray-600">Priority support</span>
            </li>
          </ul>
          <Button asChild className="w-full mt-6 bg-[#9333EA] hover:bg-[#9333EA]/90">
            <Link to="/pricing">Upgrade to Premium</Link>
          </Button>
        </div>
      </motion.div>

      {/* Final CTA */}
      <div className="mt-32 mb-32 text-center max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#9333EA] via-[#9333EA] to-[#9333EA] bg-clip-text text-transparent mb-8">
          Ready to transform your AI workflow?
        </h2>
        <p className="text-gray-600 text-lg mb-12">
          Join prompt engineers who are already creating, sharing and mastering AI prompts with Prompt Array
        </p>
        <Button asChild size="lg" className="bg-[#9333EA] hover:bg-[#9333EA]/90">
          <Link to="/signup">
            Get Started Free
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
