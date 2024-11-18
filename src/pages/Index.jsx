import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { Outlet } from 'react-router-dom';
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
  );
};

export default Index;