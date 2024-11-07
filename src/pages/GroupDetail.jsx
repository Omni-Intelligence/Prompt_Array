import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Plus } from 'lucide-react';
import { toast } from "sonner";
import CreatePromptSheet from '@/components/CreatePromptSheet';
import PromptDetailCard from '@/components/prompt/PromptDetailCard';
import { groupPrompts } from '@/data/mockPrompts';
import { useGroupDetails } from '@/hooks/useGroupDetails';

const GroupDetail = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [selectedPrompt, setSelectedPrompt] = React.useState(null);
  const [isEditSheetOpen, setIsEditSheetOpen] = React.useState(false);
  
  const { group } = useGroupDetails(groupId);
  const prompts = groupPrompts[groupId] || [];

  const handleCopyPrompt = (content) => {
    navigator.clipboard.writeText(content);
    toast.success("Prompt copied to clipboard!");
  };

  const handleDeletePrompt = (id) => {
    toast.success("Prompt deleted successfully!");
  };

  const handleEditClick = (prompt) => {
    setSelectedPrompt(prompt);
    setIsEditSheetOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/groups')}
            className="hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-4">
            <span className="text-4xl animate-in fade-in slide-in-from-left-5 duration-500">
              {group.icon}
            </span>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                {group.title}
              </h1>
              <p className="text-muted-foreground">{group.description}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Prompts</h2>
          <CreatePromptSheet 
            trigger={
              <Button className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 transition-colors group">
                <Plus className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Create Prompt
              </Button>
            }
          />
        </div>

        <ScrollArea className="h-[calc(100vh-250px)]">
          <div className="grid gap-4">
            {prompts.map((prompt) => (
              <PromptDetailCard
                key={prompt.id}
                prompt={prompt}
                onCopy={handleCopyPrompt}
                onEdit={handleEditClick}
                onDelete={handleDeletePrompt}
              />
            ))}
          </div>
        </ScrollArea>
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

export default GroupDetail;