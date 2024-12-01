import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { navItems } from '../nav-items';
import CreatePromptSheet from '@/components/CreatePromptSheet';
import CreateGroupSheet from '@/components/CreateGroupSheet';

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
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Decorative background shapes */}
      <DecorativeShapes />

      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-gray-200/50 dark:border-gray-800/50 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
        <div className="p-4">
          <img src="/logo.svg" alt="Logo" className="h-8 mb-6" />
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === `/app/${item.to}`;
              return (
                <Link 
                  key={item.to}
                  to={`/app/${item.to}`}
                  className="group w-full"
                >
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start group relative overflow-hidden transition-all duration-300
                      ${isActive 
                        ? 'bg-primary/10 text-primary hover:bg-primary/15 dark:bg-primary/20 dark:hover:bg-primary/25' 
                        : 'hover:bg-primary/5 dark:hover:bg-primary/10'}`}
                  >
                    <span className="relative z-10 flex items-center">
                      <span className={`mr-3 ${isActive ? 'text-primary' : ''}`}>
                        {item.icon}
                      </span>
                      <span className="font-medium">{item.title}</span>
                    </span>
                  </Button>
                </Link>
              );
            })}
          </nav>
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