import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="py-6">
          <img src="/logo.svg" alt="Prompt Central Logo" className="h-10" />
        </header>
        
        <main className="py-20 sm:py-32">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
            <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Your Central Hub for AI Prompts
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
              Create, organize, and share powerful AI prompts. Boost your productivity with our intuitive prompt management platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link to="/signin">
                <Button size="lg" className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 transition-colors">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/community">
                <Button size="lg" variant="outline" className="border-primary/20">
                  Explore Community
                </Button>
              </Link>
            </div>
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