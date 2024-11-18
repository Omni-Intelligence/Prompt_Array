import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Folder } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';
import { navItems } from '../nav-items';
import CreatePromptSheet from '@/components/CreatePromptSheet';
import CreateGroupSheet from '@/components/CreateGroupSheet';
import UserNav from '@/components/UserNav';

const Index = () => {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);

  const handleSignOut = () => {
    setIsSignedIn(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="PromptHub Logo" className="h-8 w-8" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              PromptHub
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <UserNav isSignedIn={isSignedIn} onSignOut={handleSignOut} />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        <aside className="w-64 flex-shrink-0 hidden md:block">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link 
                key={item.title}
                to={item.to.replace('/app/', '')}
                className="group w-full"
              >
                <Button 
                  variant="ghost" 
                  className="w-full justify-start group relative overflow-hidden transition-all duration-300
                    hover:bg-gradient-to-r hover:from-primary/10 hover:to-purple-500/10 dark:hover:from-primary/20 dark:hover:to-purple-500/20"
                >
                  <span className="relative z-10 flex items-center">
                    <span className="mr-3 text-primary">{item.icon}</span>
                    <span className="font-medium">{item.title}</span>
                  </span>
                </Button>
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1">
          <Outlet />
        </main>
      </div>

      <CreatePromptSheet 
        trigger={<div />}
        isOpen={isEditSheetOpen}
        onOpenChange={setIsEditSheetOpen}
        initialData={selectedPrompt}
      />
    </div>
  );
};

export default Index;