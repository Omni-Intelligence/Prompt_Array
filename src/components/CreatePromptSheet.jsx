import React from 'react';
import PromptForm from './prompt/PromptForm';
import { toast } from "sonner";
import { createPrompt } from '@/services/prompts';
import { useQueryClient } from '@tanstack/react-query';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const CreatePromptSheet = ({ trigger, isOpen, onOpenChange, initialData }) => {
  const queryClient = useQueryClient();
  const [newPrompt, setNewPrompt] = React.useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    description: initialData?.description || '',
    tags: initialData?.tags || [],
    isPublic: initialData?.isPublic || false,
    teamId: initialData?.teamId || '',
    groupId: initialData?.groupId || '',
    changeDescription: ''
  });

  React.useEffect(() => {
    if (initialData) {
      setNewPrompt({
        title: initialData.title || '',
        content: initialData.content || '',
        description: initialData.description || '',
        tags: initialData.tags || [],
        isPublic: initialData.isPublic || false,
        teamId: initialData.teamId || '',
        groupId: initialData.groupId || '',
        changeDescription: ''
      });
    }
  }, [initialData]);

  const handleCreatePrompt = async (e) => {
    e.preventDefault();
    if (!newPrompt.title || !newPrompt.content) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    try {
      const createdPrompt = await createPrompt(newPrompt);
      toast.success(initialData ? "Prompt updated successfully!" : "Prompt created successfully!");
      
      // Invalidate both prompts and group-prompts queries
      queryClient.invalidateQueries({ queryKey: ['prompts'] });
      if (newPrompt.groupId) {
        queryClient.invalidateQueries({ queryKey: ['group-prompts', newPrompt.groupId] });
      }
      
      onOpenChange?.(false);
      setNewPrompt({ 
        title: '', 
        content: '', 
        description: '', 
        tags: [],
        isPublic: false,
        teamId: '',
        groupId: '',
        changeDescription: ''
      });
    } catch (error) {
      console.error('Error creating prompt:', error);
      toast.error("Failed to create prompt. Please try again.");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent 
        className="w-[95vw] max-w-[2400px] sm:w-[2400px] overflow-y-auto"
        side="right"
      >
        <SheetHeader>
          <SheetTitle>{initialData ? 'Edit Prompt' : 'Create New Prompt'}</SheetTitle>
          <SheetDescription>
            {initialData ? 'Edit your prompt details' : 'Add a new prompt to your library'}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <PromptForm
            newPrompt={newPrompt}
            setNewPrompt={setNewPrompt}
            onSubmit={handleCreatePrompt}
            initialData={initialData}
            isEditing={!!initialData}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreatePromptSheet;