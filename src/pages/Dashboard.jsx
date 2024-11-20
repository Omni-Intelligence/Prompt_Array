import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import QuickAccessGroups from '@/components/dashboard/QuickAccessGroups';
import PromptsList from '@/components/dashboard/PromptsList';
import CreatePromptSheet from '@/components/CreatePromptSheet';
import CreateGroupSheet from '@/components/CreateGroupSheet';
import { useGroups } from '@/hooks/useGroups';

const DashboardShapes = () => (
  <>
    <div className="floating-shape w-56 h-56 top-20 right-[10%]" 
         style={{ animationDelay: "-2s" }} />
    <div className="floating-shape floating-shape-alt w-48 h-48 bottom-32 left-[15%]" 
         style={{ animationDelay: "-7s" }} />
    <div className="floating-shape w-40 h-40 top-[40%] right-[20%]" 
         style={{ animationDelay: "-4s" }} />
    <div className="floating-shape floating-shape-alt w-32 h-32 top-[60%] left-[25%]" 
         style={{ animationDelay: "-9s" }} />
  </>
);

const Dashboard = () => {
  const [isCreatePromptOpen, setIsCreatePromptOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const navigate = useNavigate();
  const { groups, isLoading: isLoadingGroups } = useGroups();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <DashboardShapes />
      <div className="container mx-auto p-6 space-y-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Dashboard</h1>
          <div className="flex gap-2">
            <CreateGroupSheet
              trigger={
                <Button
                  variant="outline"
                  className="hover:bg-primary/10 hover:text-primary transition-colors backdrop-blur-sm bg-white/50"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Group
                </Button>
              }
            />
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
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Quick Access Groups</h2>
          {isLoadingGroups ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <QuickAccessGroups groups={groups} />
          )}
        </section>

        <PromptsList onPromptClick={(prompt) => {
          setSelectedPrompt(prompt);
          navigate(`/app/prompts/${prompt.id}`);
        }} />

        <CreatePromptSheet
          isOpen={isCreatePromptOpen}
          onOpenChange={setIsCreatePromptOpen}
          initialData={selectedPrompt}
        />
      </div>
    </div>
  );
};

export default Dashboard;