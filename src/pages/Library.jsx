import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PromptsList from "@/components/dashboard/PromptsList";
import CreatePromptSheet from "@/components/CreatePromptSheet";

const Library = () => {
  const navigate = useNavigate();
  const [isCreatePromptOpen, setIsCreatePromptOpen] = React.useState(false);
  const [selectedPrompt, setSelectedPrompt] = React.useState(null);

  const handlePromptClick = (prompt) => {
    navigate(`/app/prompts/${prompt.id}`);
  };

  return (
    <div className="min-h-screen p-8 space-y-8">
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Library
          </h1>
        </div>
        
        <Button 
          onClick={() => setIsCreatePromptOpen(true)} 
          className="bg-primary hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Prompt
        </Button>
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