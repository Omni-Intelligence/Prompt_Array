import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight } from "lucide-react";

export function GetStarted() {
  return (
    <div className="mt-32">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
          Get Started Today
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
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
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
              1
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Create Account</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Sign up for free and set up your profile in less than a minute
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center p-6"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
              2
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Explore Templates</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Browse our collection of pre-built templates and prompts
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center p-6"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
              3
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Start Creating</h3>
          <p className="text-gray-600 dark:text-gray-300">
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
        <div className="p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
          <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary">
            Free
          </Badge>
          <ul className="space-y-4">
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-3 text-primary" />
              <span className="text-gray-600 dark:text-gray-300">Save and use up to 10 prompts</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-3 text-primary" />
              <span className="text-gray-600 dark:text-gray-300">Access to basic templates</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-3 text-primary" />
              <span className="text-gray-600 dark:text-gray-300">Community access</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-3 text-primary" />
              <span className="text-gray-600 dark:text-gray-300">Basic learning resources</span>
            </li>
          </ul>
          <Button asChild className="w-full mt-6">
            <Link to="/signup">Get Started Free</Link>
          </Button>
        </div>

        {/* Premium Features */}
        <div className="relative p-8 rounded-xl bg-gradient-to-b from-primary/10 to-transparent backdrop-blur-sm border border-white/10">
          <div className="absolute -top-3 -right-3 px-3 py-1 bg-gradient-to-r from-primary to-purple-500 rounded-full text-white text-sm">
            Recommended
          </div>
          <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary">
            Premium
          </Badge>
          <ul className="space-y-4">
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-3 text-primary" />
              <span className="text-gray-600 dark:text-gray-300">Unlimited prompts and groups</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-3 text-primary" />
              <span className="text-gray-600 dark:text-gray-300">Version control</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-3 text-primary" />
              <span className="text-gray-600 dark:text-gray-300">Advanced prompt chains</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-3 text-primary" />
              <span className="text-gray-600 dark:text-gray-300">Priority support</span>
            </li>
          </ul>
          <Button asChild className="w-full mt-6 bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90">
            <Link to="/pricing">Upgrade to Premium</Link>
          </Button>
        </div>
      </motion.div>

      {/* Final CTA */}
      <div className="mt-32 mb-32 text-center max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent mb-8">
          Ready to transform your AI workflow?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-12">
          Join prompt engineers who are already creating, sharing and mastering AI prompts with Prompt Array
        </p>
        <Button asChild size="lg" className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90">
          <Link to="/signup">
            Get Started Free
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
