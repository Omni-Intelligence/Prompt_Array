import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <span className="font-mono text-xl font-semibold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Prompt[Array]
            </span>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Organize, create, and master your AI prompts
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/signup" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  Get Started
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/app/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/app/techniques" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  Techniques
                </Link>
              </li>
              <li>
                <Link to="/app/templates" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link to="/app/chains" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  Prompt Chains
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Account</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/signin" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <Link to="/reset-password" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  Reset Password
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} PromptArray. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 sm:mt-0">
            <Link to="/app/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link to="/app/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
              Terms
            </Link>
            <Link
              to="/why-free"
              className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
            >
              Why Free?
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
