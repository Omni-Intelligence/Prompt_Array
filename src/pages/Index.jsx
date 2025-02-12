import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, ChevronLeft, ChevronRight, MessageSquareIcon, Sparkles } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { navItems } from '../nav-items';
import CreatePromptSheet from '@/components/CreatePromptSheet';
import CreateGroupSheet from '@/components/CreateGroupSheet';
import UserNav from '@/components/UserNav';
import { useSubscription } from '@/hooks/useSubscription';

const DecorativeShapes = () => (
  <>
    {/* Large gradient circle in top-right */}
    <div className="gradient-shape gradient-circle w-96 h-96 -top-48 -right-48" />
    
    {/* Blob shape in bottom-left */}
    <div className="gradient-shape gradient-blob w-80 h-80 -bottom-40 -left-40" />
    
    {/* Wave shape in middle-right */}
    <div className="gradient-shape gradient-wave w-64 h-64 top-1/2 -right-32 transform -translate-y-1/2" />
  </>
);

const Index = () => {
  const [isCreatePromptOpen, setIsCreatePromptOpen] = useState(false);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { subscription } = useSubscription();
  const isPremium = subscription?.status === 'active';

  // Add mobile detection and handling
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setIsCollapsed(isMobile);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Decorative background shapes */}
      <DecorativeShapes />

      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-20"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`${
        isCollapsed ? 'w-16' : 'w-64'
      } transition-all duration-300 border-r border-gray-200/50 dark:border-gray-800/50 md:backdrop-blur-sm md:bg-white/50 md:dark:bg-gray-900/50 bg-white dark:bg-gray-900 fixed md:relative z-30 h-full`}>
        <div className="flex flex-col h-full">
          <div className="p-4 flex-1">
            <div className="flex items-center justify-between mb-6">
              <span className={`font-mono text-xl font-semibold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent ${isCollapsed ? 'hidden' : 'block'}`}>
                Prompt[Array]
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-1 md:hover:bg-gray-100 dark:md:hover:bg-gray-800"
              >
                {isCollapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </Button>
            </div>
            <nav className="space-y-2">
              {navItems
                .filter(item => {
                  // Include all items except external ones, feedback, and Why Free
                  const isExternal = item.external && item.to.includes('loom.com');
                  const isFeedback = item.to.includes('feedback');
                  const isWhyFree = item.title === 'Why Free?';
                  return !isExternal && !isFeedback && !isWhyFree;
                })
                .map((item) => {
                  const isActive = location.pathname === `/app/${item.to}`;
                  let Component = item.disabled ? 'div' : Link;
                  let componentProps = item.disabled ? {} : { 
                    to: item.to.startsWith('/') ? item.to : `/app/${item.to}`
                  };

                  return (
                    <Component 
                      key={item.to}
                      {...componentProps}
                      className={`group w-full ${item.disabled ? 'cursor-not-allowed' : ''}`}
                    >
                      <Button 
                        variant="ghost" 
                        className={`w-full group relative overflow-hidden transition-all duration-300
                          ${isActive 
                            ? 'bg-primary/10 text-primary hover:bg-primary/15 dark:bg-primary/20 dark:hover:bg-primary/25' 
                            : 'hover:bg-primary/5 dark:hover:bg-primary/10'}
                          ${item.disabled ? 'opacity-80' : ''}
                          ${isCollapsed ? 'px-0 justify-center' : 'justify-start'}`}
                        disabled={item.disabled}
                      >
                        <span className={`relative z-10 flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
                          <span className={`${isActive ? 'text-primary' : ''} ${isCollapsed ? 'mr-0' : 'mr-3'}`}>
                            {item.icon}
                          </span>
                          {!isCollapsed && <span className="font-medium text-gray-700 dark:text-gray-200">{item.title}</span>}
                        </span>
                      </Button>
                    </Component>
                  );
                })}
            </nav>
          </div>
          
          {/* Bottom Links */}
          <div className="mt-auto space-y-2 p-4">
            <Button
              variant="ghost"
              className="w-full bg-violet-100 hover:bg-violet-200 dark:bg-violet-900/20 dark:hover:bg-violet-900/30 text-violet-700 dark:text-violet-300"
              onClick={() => window.open('https://www.loom.com/share/952fd364c4c945ce8b6218b1cefd9915', '_blank')}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Tutorial
            </Button>

            {navItems
              .filter(item => item.title === 'Why Free?')
              .map((item) => (
                <Link key={item.to} to={`/app/${item.to}`} className="block">
                  <Button 
                    variant="ghost"
                    className="w-full bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/20 dark:hover:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                  >
                    {item.icon}
                    <span className="ml-2">Why Free?</span>
                  </Button>
                </Link>
              ))}

            <Button
              variant="ghost"
              className="w-full bg-primary/10 hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30 text-primary"
              onClick={() => window.open('https://forms.gle/8JpZKaGvQrRhYY8y6', '_blank')}
            >
              <MessageSquareIcon className="h-4 w-4 mr-2" />
              Send Feedback
            </Button>
          </div>
          <div className="p-4 border-t border-gray-200/50 dark:border-gray-800/50">
            <UserNav isCollapsed={isCollapsed} />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>

      <CreatePromptSheet
        isOpen={isCreatePromptOpen}
        onOpenChange={setIsCreatePromptOpen}
      />

      <CreateGroupSheet
        isOpen={isCreateGroupOpen}
        onOpenChange={setIsCreateGroupOpen}
      />
    </div>
  );
};

export default Index;