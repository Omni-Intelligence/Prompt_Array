import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';
import { navItems } from '../nav-items';
import CreatePromptSheet from '@/components/CreatePromptSheet';
import CreateGroupSheet from '@/components/CreateGroupSheet';
import QuickAccessGroups from '@/components/dashboard/QuickAccessGroups';
import PromptsList from '@/components/dashboard/PromptsList';

const Index = () => {
  const [isCreatePromptOpen, setIsCreatePromptOpen] = useState(false);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState(null);

  // Mock data for quick access groups (replace with real data from your API)
  const quickAccessGroups = [
    { id: 1, name: 'SEO Content', count: 12 },
    { id: 2, name: 'Technical Writing', count: 8 },
    { id: 3, name: 'Creative Stories', count: 15 },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-gray-200 dark:border-gray-800">
        <div className="p-4">
          <img src="/logo.svg" alt="Logo" className="h-8 mb-6" />
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link 
                key={item.title}
                to={item.to}
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
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 space-y-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="flex gap-2">
              <Button
                onClick={() => setIsCreateGroupOpen(true)}
                variant="outline"
                className="hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Plus className="mr-2 h-4 w-4" />
                New Group
              </Button>
              <Button
                onClick={() => setIsCreatePromptOpen(true)}
                className="bg-primary hover:bg-primary/90 transition-colors"
              >
                <Plus className="mr-2 h-4 w-4" />
                New Prompt
              </Button>
            </div>
          </div>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Quick Access Groups</h2>
            <QuickAccessGroups groups={quickAccessGroups} />
          </section>

          <PromptsList onPromptClick={setSelectedPrompt} />

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
      </main>
    </div>
  );
};

export default Index;