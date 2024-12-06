import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PromptsList from "@/components/dashboard/PromptsList";
import CreatePromptSheet from "@/components/CreatePromptSheet";
import { usePromptLimits } from '@/hooks/usePromptLimits';

const Library = () => {
  const navigate = useNavigate();
  const [isCreatePromptOpen, setIsCreatePromptOpen] = React.useState(false);
  const [selectedPrompt, setSelectedPrompt] = React.useState(null);
  const { promptCount, promptLimit, isSubscribed } = usePromptLimits();

  const handlePromptClick = (prompt) => {
    console.log('Library - Navigating to prompt:', prompt);
    if (!prompt || !prompt.id) {
      console.error('Library - Invalid prompt data:', prompt);
      return;
    }
    navigate(`/app/library/prompt/${prompt.id}`);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 space-y-8 md:ml-0 ml-16">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Library
            </h1>
            {!isSubscribed && (
              <p className="text-xs md:text-sm text-muted-foreground">
                {promptCount}/{promptLimit} prompts used in free tier
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {!isSubscribed && promptCount >= promptLimit - 3 && (
            <Button 
              variant="outline" 
              onClick={() => navigate('/pricing')}
              className="bg-primary/10 text-primary hover:bg-primary/20"
            >
              Upgrade to Premium
            </Button>
          )}
          <Button 
            onClick={() => setIsCreatePromptOpen(true)} 
            className="bg-primary hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Prompt
          </Button>
        </div>
      </div>

      <PromptsList onPromptClick={handlePromptClick} />

      <CreatePromptSheet
        isOpen={isCreatePromptOpen}
        onOpenChange={setIsCreatePromptOpen}
        initialData={selectedPrompt}
      />
    </div>
  );
};

export default Library;