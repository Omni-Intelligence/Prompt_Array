import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, PenTool, FolderTree, GitBranch, MessageSquare } from "lucide-react";

export function HowItWorks() {
  return (
    <div className="mt-32">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
          How It Works
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Get started with Prompt Array in four simple steps
        </p>
      </div>

      <div className="relative">
        {/* Connection Arrows */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full transform -translate-y-1/2 z-10">
          <div className="flex justify-around w-full px-8">
            <div className="translate-x-12">
              <ArrowRight className="w-8 h-8 text-primary/60" />
            </div>
            <div>
              <ArrowRight className="w-8 h-8 text-primary/60" />
            </div>
            <div className="-translate-x-12">
              <ArrowRight className="w-8 h-8 text-primary/60" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative bg-[#9333EA]/5 rounded-xl p-6 border border-[#9333EA]/10 hover:bg-[#9333EA]/10 transition-all duration-300"
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-4 rounded-full bg-[#9333EA]/10 flex items-center justify-center relative z-10">
                <PenTool className="w-8 h-8 text-[#9333EA]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Create</h3>
              <p className="text-sm text-gray-600 text-center">
                Start with our templates or create your own custom prompts for your specific needs
              </p>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative bg-[#9333EA]/5 rounded-xl p-6 border border-[#9333EA]/10 hover:bg-[#9333EA]/10 transition-all duration-300"
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-4 rounded-full bg-[#9333EA]/10 flex items-center justify-center relative z-10">
                <FolderTree className="w-8 h-8 text-[#9333EA]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Organize</h3>
              <p className="text-sm text-gray-600 text-center">
                Keep your prompts organized in groups and categories for easy access
              </p>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="relative bg-[#9333EA]/5 rounded-xl p-6 border border-[#9333EA]/10 hover:bg-[#9333EA]/10 transition-all duration-300"
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-4 rounded-full bg-[#9333EA]/10 flex items-center justify-center relative z-10">
                <GitBranch className="w-8 h-8 text-[#9333EA]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect</h3>
              <p className="text-sm text-gray-600 text-center">
                Link related prompts together to build reusable prompt sequences
              </p>
            </div>
          </motion.div>

          {/* Step 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="relative bg-[#9333EA]/5 rounded-xl p-6 border border-[#9333EA]/10 hover:bg-[#9333EA]/10 transition-all duration-300"
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-4 rounded-full bg-[#9333EA]/10 flex items-center justify-center relative z-10">
                <MessageSquare className="w-8 h-8 text-[#9333EA]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Use</h3>
              <p className="text-sm text-gray-600 text-center">
                Copy and use your prompts directly in your favorite AI tools and platforms
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Button asChild size="lg" className="group">
          <Link to="/app/dashboard">
            Get Started
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
