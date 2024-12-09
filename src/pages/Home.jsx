import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import UserNav from "@/components/UserNav";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { motion } from "framer-motion";

const ArrayElement = ({ index, text }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="relative group"
  >
    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
    <div className="relative px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
      <span className="text-sm font-mono text-gray-600 dark:text-gray-300">{text}</span>
      <div className="absolute -top-3 -left-3 px-2 py-1 bg-primary/10 rounded-md">
        <span className="text-xs text-primary">[{index}]</span>
      </div>
    </div>
  </motion.div>
);

const HomePage = () => {
  const { user } = useAuth();
  const { data: { isSubscribed } = { isSubscribed: false } } = useSubscription();
  const showPricingButton = !user || !isSubscribed;

  const arrayElements = [
    "Create",
    "Organize",
    "Chain",
    "Share",
    "Iterate"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-2xl font-semibold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Prompt[Array]
            </span>
          </div>
          <div className="flex items-center gap-4">
            {showPricingButton && (
              <Link to="/pricing">
                <Button variant="ghost" className="hover:text-primary transition-colors">
                  Pricing
                </Button>
              </Link>
            )}
            <UserNav />
          </div>
        </header>
        
        <main className="py-20 sm:py-32">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight tracking-tight">
                <span className="block bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent pb-2 mb-1">
                  Your AI Prompts,
                </span>
                <span className="block bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent pb-2">
                  Perfectly Arranged
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                Create, organize, and share powerful AI prompts. Boost your productivity with our intuitive prompt management platform.
              </p>
            </motion.div>

            {/* Animated Array Visualization */}
            <div className="w-full max-w-2xl mx-auto">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-xl blur-xl"></div>
                <div className="relative grid grid-cols-5 gap-4 p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  {arrayElements.map((text, index) => (
                    <ArrayElement key={index} index={index} text={text} />
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Link to="/signin">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 transition-colors group"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/app/dashboard">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-primary/20 hover:bg-primary/5 transition-colors"
                >
                  Go to Dashboard
                </Button>
              </Link>
            </motion.div>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-xl font-semibold mb-2">Organize</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Create groups and folders to keep your prompts organized and accessible
              </p>
            </div>
            <div className="p-6 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-xl font-semibold mb-2">Collaborate</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Share prompts with your team and discover community favorites
              </p>
            </div>
            <div className="p-6 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-xl font-semibold mb-2">Iterate</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Track versions and improvements with built-in version control
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;