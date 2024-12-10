import { Link } from "react-router-dom";
import UserNav from "@/components/UserNav";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { BackgroundElements } from "./BackgroundElements";

export function HomeLayout({ children }) {
  const { user } = useAuth();
  const { isSubscribed, isLoading, subscription } = useSubscription();

  console.log('HomeLayout Debug:', {
    user: !!user,
    userId: user?.id,
    isSubscribed,
    isLoading
  });

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-950">
      
      {/* Fixed background that stays in view while scrolling */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <BackgroundElements />
      </div>

      {/* Navigation */}
      <header className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm relative z-10">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center">
              <Link to="/" className="font-mono text-2xl font-semibold bg-gradient-to-r from-[#9333EA] to-[#C084FC] bg-clip-text text-transparent">
                Prompt[Array]
              </Link>
            </div>

            <div className="flex items-center space-x-8">
              {user && !isLoading && !isSubscribed && (
                <>
                  {/* Debug element */}
                  <div className="hidden">
                    User: {!!user ? 'yes' : 'no'}, 
                    Subscribed: {isSubscribed ? 'yes' : 'no'}
                  </div>
                  <Link to="/pricing" className="text-base text-gray-600 dark:text-gray-300 hover:text-[#9333EA] transition-colors">
                    Pricing
                  </Link>
                </>
              )}
              {!user ? (
                <>
                  <Link to="/signup" className="text-base text-gray-600 dark:text-gray-300 hover:text-[#9333EA] transition-colors">
                    Sign Up
                  </Link>
                  <Link 
                    to="/signin" 
                    className="inline-flex items-center justify-center px-6 py-2.5 text-base font-medium text-white bg-[#9333EA] hover:bg-[#9333EA]/90 rounded-md transition-all hover:translate-y-[-1px] hover:shadow-lg hover:shadow-[#9333EA]/25"
                  >
                    Sign In
                  </Link>
                </>
              ) : (
                <UserNav />
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
