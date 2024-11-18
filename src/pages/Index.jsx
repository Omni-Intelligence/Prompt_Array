import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { navItems } from '../nav-items';
import CreatePromptSheet from '@/components/CreatePromptSheet';
import CreateGroupSheet from '@/components/CreateGroupSheet';

const Index = () => {
  const [isCreatePromptOpen, setIsCreatePromptOpen] = useState(false);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-gray-200 dark:border-gray-800">
        <div className="p-4">
          <img src="/logo.svg" alt="Logo" className="h-8 mb-6" />
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link 
                key={item.to}
                to={item.to}
                className="group w-full"
              >
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start group relative overflow-hidden transition-all duration-300
                    hover:bg-gradient-to-r hover:from-primary/10 hover:to-purple-500/10 dark:hover:from-primary/20 dark:hover:to-purple-500/20
                    ${location.pathname === `/app/${item.to}` ? 'bg-primary/10' : ''}`}
                >
                  <span className="relative z-10 flex items-center">
                    <span className="mr-3 text-primary">{item.icon}</span>
                    <span className="font-medium">{item.title}</span>
                  </span>
                </Button>
              </Link>
            ))}
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
        initialData={selectedPrompt}
      />

      <CreateGroupSheet
        isOpen={isCreateGroupOpen}
        onOpenChange={setIsCreateGroupOpen}
      />
    </div>
  );
};

export default Index;