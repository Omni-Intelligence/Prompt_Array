import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, ChevronLeft, ChevronRight, MessageSquareIcon } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { navItems } from '../nav-items';
import CreatePromptSheet from '@/components/CreatePromptSheet';
import CreateGroupSheet from '@/components/CreateGroupSheet';
import UserNav from '@/components/UserNav';

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
              <img src="/logo.svg" alt="Logo" className={`h-8 ${isCollapsed ? 'hidden' : 'block'}`} />
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
              {navItems.filter(item => !item.to.includes('feedback')).map((item) => {
                const isActive = location.pathname === `/app/${item.to}`;
                let Component;
                let componentProps = {};
                
                if (item.external) {
                  Component = 'a';
                  componentProps = {
                    href: item.to,
                    target: '_blank',
                    rel: 'noopener noreferrer'
                  };
                } else {
                  Component = item.disabled ? 'div' : Link;
                  componentProps = item.disabled ? {} : { to: `/app/${item.to}` };
                }

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
                        {!isCollapsed && <span className="font-medium">{item.title}</span>}
                      </span>
                    </Button>
                  </Component>
                );
              })}
            </nav>
          </div>
          <div className="p-4 border-t border-gray-200/50 dark:border-gray-800/50">
            <a
              href="https://airtable.com/appa0Z1i2sjlaw5ZD/pagr7AN73UNC8NQjR/form"
              target="_blank"
              rel="noopener noreferrer"
              className="block mb-3"
            >
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-white flex items-center gap-2 justify-center"
                size="sm"
              >
                <MessageSquareIcon className="h-4 w-4" />
                {!isCollapsed && "Send Feedback"}
              </Button>
            </a>
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