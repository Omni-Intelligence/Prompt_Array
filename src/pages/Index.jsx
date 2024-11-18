import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { navItems } from '../nav-items';
import UserNav from '@/components/UserNav';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.svg" alt="PromptHub Logo" className="h-8" />
            </Link>
          </div>
          <UserNav />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        <aside className="w-64 flex-shrink-0 hidden md:block">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link 
                key={item.title}
                to={item.to}
                className="group w-full"
              >
                <button 
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200
                    text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white
                    hover:bg-gradient-to-r hover:from-primary/10 hover:to-purple-500/10 
                    dark:hover:from-primary/20 dark:hover:to-purple-500/20"
                >
                  <span className="text-primary">{item.icon}</span>
                  {item.title}
                </button>
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Index;