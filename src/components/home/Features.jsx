import { motion } from "framer-motion";
import { BookOpen, Network, Users, CheckCircle } from "lucide-react";

export function Features() {
  return (
    <div className="mt-32">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
          Powerful Features for Prompt Engineers
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Everything you need to create, organize, and master AI prompts in one place
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Templates Feature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="group p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
        >
          <div className="mb-4 inline-flex p-3 bg-primary/10 rounded-xl">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Professional Templates</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Access our curated library of professional prompt templates and techniques.
          </p>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-primary" />
              Pre-built templates for common use cases
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-primary" />
              Customizable prompt structures
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-primary" />
              Best practices and examples included
            </li>
          </ul>
        </motion.div>

        {/* Chains Feature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="group p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
        >
          <div className="mb-4 inline-flex p-3 bg-primary/10 rounded-xl">
            <Network className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Prompt Chains</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Build powerful prompt chains for complex workflows and advanced use cases.
          </p>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-primary" />
              Connect prompts for complex tasks
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-primary" />
              Visual chain builder interface
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-primary" />
              Reusable workflow templates
            </li>
          </ul>
        </motion.div>

        {/* Community Feature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="group p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
        >
          <div className="mb-4 inline-flex p-3 bg-primary/10 rounded-xl">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Community & Learning</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Share prompts, learn techniques, and grow with our community of prompt engineers.
          </p>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-primary" />
              Share and discover prompts
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-primary" />
              Learn from the community
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-primary" />
              Advanced techniques library
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
